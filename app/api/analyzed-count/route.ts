// import { Redis } from '@upstash/redis'
// import { NextResponse } from 'next/server'

// /**
//  * Global "Tetti Analizzati" counter, backed by a single Redis key.
//  * No database schema needed — just an atomic INCR so every visitor,
//  * on every device, sees the same real total instead of a per-browser tally.
//  */

// const BASE_ANALYZED_COUNT = 1247
// const REDIS_KEY = 't94:roof-index:analyses-completed'

// // This project's Upstash for Redis integration exposes KV_REST_API_URL /
// // KV_REST_API_TOKEN (not the UPSTASH_REDIS_REST_* names Redis.fromEnv() looks for).
// const redis = new Redis({
//   url: process.env.KV_REST_API_URL!,
//   token: process.env.KV_REST_API_TOKEN!,
// })

// export async function GET() {
//   const increments = (await redis.get<number>(REDIS_KEY)) ?? 0
//   return NextResponse.json({ count: BASE_ANALYZED_COUNT + increments })
// }

// export async function POST() {
//   const increments = await redis.incr(REDIS_KEY)
//   return NextResponse.json({ count: BASE_ANALYZED_COUNT + increments })
// }

// import { Redis } from '@upstash/redis'
// import { NextResponse } from 'next/server'

// /**
//  * Global "Tetti Analizzati" counter, backed by a single Redis key.
//  * No database schema needed — just an atomic INCR so every visitor,
//  * on every device, sees the same real total instead of a per-browser tally.
//  *
//  * `dynamic = 'force-dynamic'` is required here: this GET handler has no
//  * dynamic APIs (no cookies/headers), so without this flag Next.js would
//  * treat it as static and cache the response at build time — meaning the
//  * count would appear "frozen" in production even though increments work
//  * fine in `next dev` (which never statically caches route handlers).
//  */
// export const dynamic = 'force-dynamic'

// const BASE_ANALYZED_COUNT = 1247
// const REDIS_KEY = 't94:roof-index:analyses-completed'

// // This project's Upstash for Redis integration exposes KV_REST_API_URL /
// // KV_REST_API_TOKEN (not the UPSTASH_REDIS_REST_* names Redis.fromEnv() looks for).
// const redis = new Redis({
//   url: process.env.KV_REST_API_URL!,
//   token: process.env.KV_REST_API_TOKEN!,
// })

// export async function GET() {
//   const increments = (await redis.get<number>(REDIS_KEY)) ?? 0
//   return NextResponse.json({ count: BASE_ANALYZED_COUNT + increments })
// }

// export async function POST() {
//   const increments = await redis.incr(REDIS_KEY)
//   return NextResponse.json({ count: BASE_ANALYZED_COUNT + increments })
// }


import { count } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { roofAnalyses } from '@/lib/db/schema'

/**
 * "Tetti Analizzati" is the real number of analyses stored in the database,
 * with no baseline added. Rows are inserted by /api/notify-analysis, so the
 * counter can never drift from the data behind the public map.
 *
 * `dynamic = 'force-dynamic'` keeps this handler from being statically
 * cached at build time.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [row] = await db.select({ total: count() }).from(roofAnalyses)
    return NextResponse.json(
      { count: row?.total ?? 0 },
      { headers: { 'Cache-Control': 'public, s-maxage=20, stale-while-revalidate=60' } },
    )
  } catch (err) {
    console.error('[analyzed-count] failed:', err)
    return NextResponse.json({ count: null }, { status: 500 })
  }
}
