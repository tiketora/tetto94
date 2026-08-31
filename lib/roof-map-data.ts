import { sql } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { db } from '@/lib/db'
import { roofAnalyses } from '@/lib/db/schema'

/** Cache tag used to invalidate the map stats on demand (e.g. from an admin
 *  action later). Also expires on its own every REVALIDATE_SECONDS as a
 *  safety net, since new analyses trickle in continuously and nothing else
 *  currently calls revalidateTag for it. */
export const ROOF_MAP_STATS_TAG = 'roof-map-stats'
const REVALIDATE_SECONDS = 3600

/** Minimum number of analyses a città must have before it appears on the
 *  public map. Below this, a single bad-faith or joke submission could look
 *  like a real signal for that town — this is a privacy/credibility floor,
 *  not a technical limit. */
const MIN_SAMPLES_PER_CITY = 1

/** Score at or above this is considered "high risk" for the map's headline
 *  stat. In lib/roof-calculator.ts a HIGHER score means MORE risk (bands
 *  run verde <=25, giallo <=45, arancione <=65, rosso <=85, emergenza >85)
 *  — this threshold matches the start of the "rosso" (Urgente) band. */
const HIGH_RISK_THRESHOLD = 65

export interface CityRiskPoint {
  citta: string
  lat: number
  lng: number
  count: number
  avgScore: number
  highRiskShare: number
}

export interface ZonaRiskSummary {
  zona: string
  count: number
  avgScore: number
  highRiskShare: number
}

export interface RoofMapStats {
  totalAnalyses: number
  nationalAvgScore: number
  cities: CityRiskPoint[]
  zone: ZonaRiskSummary[]
  updatedAt: string
}

const EMPTY_STATS: RoofMapStats = {
  totalAnalyses: 0,
  nationalAvgScore: 0,
  cities: [],
  zone: [],
  updatedAt: new Date(0).toISOString(),
}

async function fetchRoofMapStats(): Promise<RoofMapStats> {
  const [totals] = await db
    .select({
      totalAnalyses: sql<number>`count(*)::int`,
      nationalAvgScore: sql<number>`coalesce(round(avg(score)), 0)::int`,
    })
    .from(roofAnalyses)

  const cityRows = await db
    .select({
      citta: roofAnalyses.citta,
      lat: sql<number>`avg(${roofAnalyses.lat})::float`,
      lng: sql<number>`avg(${roofAnalyses.lng})::float`,
      count: sql<number>`count(*)::int`,
      avgScore: sql<number>`round(avg(${roofAnalyses.score}))::int`,
      highRiskShare: sql<number>`round(avg(case when ${roofAnalyses.score} >= ${HIGH_RISK_THRESHOLD} then 1 else 0 end)::numeric, 2)::float`,
    })
    .from(roofAnalyses)
    .where(sql`${roofAnalyses.citta} is not null and ${roofAnalyses.lat} is not null`)
    .groupBy(roofAnalyses.citta)
    .having(sql`count(*) >= ${MIN_SAMPLES_PER_CITY}`)
    .orderBy(sql`count(*) desc`)

  const zonaRows = await db
    .select({
      zona: roofAnalyses.zona,
      count: sql<number>`count(*)::int`,
      avgScore: sql<number>`round(avg(${roofAnalyses.score}))::int`,
      highRiskShare: sql<number>`round(avg(case when ${roofAnalyses.score} >= ${HIGH_RISK_THRESHOLD} then 1 else 0 end)::numeric, 2)::float`,
    })
    .from(roofAnalyses)
    .groupBy(roofAnalyses.zona)
    .orderBy(sql`count(*) desc`)

  return {
    totalAnalyses: totals?.totalAnalyses ?? 0,
    nationalAvgScore: totals?.nationalAvgScore ?? 0,
    cities: cityRows.map((r) => ({
      citta: r.citta as string,
      lat: r.lat,
      lng: r.lng,
      count: r.count,
      avgScore: r.avgScore,
      highRiskShare: r.highRiskShare,
    })),
    zone: zonaRows.map((r) => ({
      zona: r.zona,
      count: r.count,
      avgScore: r.avgScore,
      highRiskShare: r.highRiskShare,
    })),
    updatedAt: new Date().toISOString(),
  }
}

/**
 * Aggregated, privacy-safe stats for "Mappa del Rischio". Every row here is
 * a GROUP BY result — never a single user's analysis — so nothing here can
 * be traced back to one visitor. Wrapped in unstable_cache (rather than the
 * experimental "use cache" directive, which would require enabling
 * cacheComponents project-wide) — this data changes slowly, so every
 * visitor to the public map page triggering its own GROUP BY scan over the
 * full table would be wasteful. On any DB error (e.g. table momentarily
 * unreachable) this falls back to an empty-but-valid shape rather than
 * throwing, so the public map page never 500s for visitors.
 */
export const getRoofMapStats = unstable_cache(
  async (): Promise<RoofMapStats> => {
    try {
      return await fetchRoofMapStats()
    } catch (err) {
      console.error('[roof-map-data] Failed to compute stats:', err)
      return EMPTY_STATS
    }
  },
  ['roof-map-stats'],
  { revalidate: REVALIDATE_SECONDS, tags: [ROOF_MAP_STATS_TAG] },
)
