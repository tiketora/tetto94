import { NextResponse } from 'next/server'
import { verifyPassword, createSessionToken, setSessionCookie } from '@/lib/auth/session'
import { checkLoginRateLimit, getClientIp } from '@/lib/auth/rate-limit'

/**
 * Verifies the single static admin account and issues a signed session
 * cookie. Rate-limited per IP (see lib/auth/rate-limit.ts) and always
 * returns a generic error — this endpoint never reveals whether the
 * username or the password was wrong, removing the user-enumeration
 * surface entirely (there is only one account anyway).
 */
export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)
    const { success } = await checkLoginRateLimit(ip)
    if (!success) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
    }

    const body = await req.json().catch(() => null)
    const username = typeof body?.username === 'string' ? body.username : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    const adminUsername = process.env.ADMIN_USERNAME
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

    if (!adminUsername || !adminPasswordHash) {
      console.error('[admin-login] ADMIN_USERNAME or ADMIN_PASSWORD_HASH is not configured')
      return NextResponse.json({ error: 'Login is not available.' }, { status: 500 })
    }

    // Constant-time-ish: always run the password verify (scrypt) even if
    // the username is wrong, so response timing doesn't leak which check
    // failed.
    const usernameMatches = username === adminUsername
    const passwordMatches = verifyPassword(password || ' ', adminPasswordHash)

    if (!usernameMatches || !passwordMatches) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const token = createSessionToken(adminUsername)
    await setSessionCookie(token)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin-login] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
