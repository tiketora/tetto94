/**
 * CSRF defence-in-depth for admin mutations: browsers always send an Origin
 * header on cross-site POST/PATCH/DELETE, so a mismatching Origin is rejected.
 * Requests with no Origin header (non-browser clients) are allowed through
 * because they still need the signed session cookie.
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (!origin) return true
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (!host) return false
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}
