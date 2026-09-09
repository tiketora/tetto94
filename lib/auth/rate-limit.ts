import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

/**
 * Brute-force protection for the hidden /login route. Deliberately tight
 * (unlike the generous public-form limiter in notify-analysis) since this
 * endpoint guards the single admin account: 5 attempts / 5 min per IP.
 */
let loginRatelimit: Ratelimit | null = null

function getLoginRatelimit() {
  if (!loginRatelimit) {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
    loginRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '5 m'),
      prefix: 'ratelimit:admin-login',
    })
  }
  return loginRatelimit
}

export async function checkLoginRateLimit(ip: string) {
  return getLoginRatelimit().limit(ip)
}

export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
