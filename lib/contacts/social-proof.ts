import { and, desc, eq, isNotNull } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import { db } from '@/lib/db'
import { contactLog, roofAnalyses } from '@/lib/db/schema'
import { geocodeItalianCity } from '@/lib/it-cities'

export const SOCIAL_PROOF_TAG = 'social-proof'

/** Below this many real events in total the widget stays hidden, so a lone event never looks odd. */
const MIN_TOTAL_EVENTS = 3
const OFFER_POOL = 15
const ANALYSIS_POOL = 30

export interface OfferEvent {
  type: 'offer'
  city: string
  /** Europe/Rome calendar day (YYYY-MM-DD). Deliberately no time of day for manual contacts. */
  day: string
}

export interface AnalysisEvent {
  type: 'analysis'
  city: string
  /** ISO timestamp of the real analysis. */
  ts: string
}

export interface RecentActivity {
  offers: OfferEvent[]
  analyses: AnalysisEvent[]
}

const romeDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' })

/*
 * Only explicit columns are selected: contactName, contactValue and notes
 * must never leave the server through this public path.
 */
async function loadRecentActivity(): Promise<RecentActivity> {
  const [offerRows, analysisRows] = await Promise.all([
    db
      .select({ citta: contactLog.citta, contactedAt: contactLog.contactedAt })
      .from(contactLog)
      .where(and(eq(contactLog.showPublic, true), isNotNull(contactLog.citta)))
      .orderBy(desc(contactLog.contactedAt))
      .limit(OFFER_POOL),
    db
      .select({ citta: roofAnalyses.citta, createdAt: roofAnalyses.createdAt })
      .from(roofAnalyses)
      .where(and(isNotNull(roofAnalyses.citta), isNotNull(roofAnalyses.lat)))
      .orderBy(desc(roofAnalyses.createdAt))
      .limit(ANALYSIS_POOL * 3),
  ])

  const offers: OfferEvent[] = []
  for (const row of offerRows) {
    const city = geocodeItalianCity(row.citta)?.label
    if (city) offers.push({ type: 'offer', city, day: romeDay.format(row.contactedAt) })
  }

  // Free-text input is only shown when it resolves to a real Italian comune,
  // and only as the canonical comune label, never as typed.
  const analyses: AnalysisEvent[] = []
  let lastCity = ''
  for (const row of analysisRows) {
    const city = geocodeItalianCity(row.citta)?.label
    if (!city || city === lastCity) continue
    lastCity = city
    analyses.push({ type: 'analysis', city, ts: row.createdAt.toISOString() })
    if (analyses.length >= ANALYSIS_POOL) break
  }

  if (offers.length + analyses.length < MIN_TOTAL_EVENTS) return { offers: [], analyses: [] }
  return { offers, analyses }
}

export const getRecentActivity = unstable_cache(loadRecentActivity, ['recent-activity'], {
  revalidate: 300,
  tags: [SOCIAL_PROOF_TAG],
})
