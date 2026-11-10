import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

let limiter: Ratelimit | null = null

/**
 * Generous per-IP limiter for cheap public read endpoints. Fails open: if
 * Redis is unreachable the endpoint stays up rather than blocking visitors.
 */
export async function isPublicReadAllowed(ip: string): Promise<boolean> {
  try {
    if (!limiter) {
      limiter = new Ratelimit({
        redis: new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! }),
        limiter: Ratelimit.slidingWindow(30, '1 m'),
        prefix: 'ratelimit:public-read',
      })
    }
    const { success } = await limiter.limit(ip)
    return success
  } catch {
    return true
  }
}
