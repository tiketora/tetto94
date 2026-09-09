import { NextResponse, type NextRequest } from 'next/server'
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth/session'

/**
 * Guards every /admin/* route. Unauthenticated (or expired/tampered
 * session) requests are redirected to /login. /login itself is never
 * matched here — it must stay reachable for the sign-in POST + redirect.
 */
export function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  const session = verifySessionToken(token)

  if (!session) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
  // The signed-session verification below uses Node's crypto module
  // (HMAC-SHA256), which the default Edge runtime does not support.
  runtime: 'nodejs',
}
