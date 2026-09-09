import { cookies } from 'next/headers'
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'crypto'

/**
 * Custom, dependency-free session system for the single static admin
 * account (no auth vendor). A session is a signed, stateless token:
 *
 *   base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, SESSION_SECRET))
 *
 * It cannot be forged or tampered with without knowing SESSION_SECRET, and
 * it carries its own expiry, so there is no server-side session store to
 * manage. Stored in an httpOnly, secure, sameSite=strict cookie so it can
 * never be read or replayed cross-site by client JS.
 */

const SESSION_COOKIE = 'tetto94_admin_session'
const SESSION_TTL_SECONDS = 8 * 60 * 60 // 8 hours

interface SessionPayload {
  sub: string // admin username
  iat: number
  exp: number
}

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return secret
}

function base64url(input: Buffer): string {
  return input.toString('base64url')
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('base64url')
}

export function createSessionToken(username: string): string {
  const now = Math.floor(Date.now() / 1000)
  const payload: SessionPayload = { sub: username, iat: now, exp: now + SESSION_TTL_SECONDS }
  const encodedPayload = base64url(Buffer.from(JSON.stringify(payload)))
  const signature = sign(encodedPayload)
  return `${encodedPayload}.${signature}`
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null
  const [encodedPayload, signature] = token.split('.')
  if (!encodedPayload || !signature) return null

  const expectedSignature = sign(encodedPayload)
  // Constant-time comparison — never use === on secrets/signatures.
  const a = Buffer.from(signature)
  const b = Buffer.from(expectedSignature)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'))
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

/**
 * Verifies a plaintext password against the configured admin credential.
 * Supports two formats for ADMIN_PASSWORD_HASH, auto-detected:
 *
 *  - "salt:hash" (64-byte hex scrypt digest) — the preferred, memory-hard
 *    format, produced by hashPassword() below.
 *  - a plain password string — accepted as a fallback because the admin
 *    sets this value through a UI env-var form with no terminal access to
 *    run a hashing script. Still never logged or sent to the client, and
 *    compared in constant time; only readable to project admins via the
 *    encrypted-at-rest environment variable store.
 */
export function verifyPassword(plaintext: string, storedValue: string): boolean {
  const [salt, hash] = storedValue.split(':')
  const looksLikeScryptHash = Boolean(salt && hash && /^[0-9a-f]+$/i.test(hash) && hash.length === 128)

  if (looksLikeScryptHash) {
    const derived = scryptSync(plaintext, salt, 64)
    const expected = Buffer.from(hash, 'hex')
    if (derived.length !== expected.length) return false
    return timingSafeEqual(derived, expected)
  }

  const a = Buffer.from(plaintext)
  const b = Buffer.from(storedValue)
  if (a.length !== b.length) {
    // Still run a constant-time compare against a same-length dummy so
    // this branch takes comparable time either way.
    timingSafeEqual(Buffer.from(plaintext.padEnd(storedValue.length, ' ').slice(0, storedValue.length)), b)
    return false
  }
  return timingSafeEqual(a, b)
}

export function hashPassword(plaintext: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(plaintext, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export async function setSessionCookie(token: string) {
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  return verifySessionToken(store.get(SESSION_COOKIE)?.value)
}

export { SESSION_COOKIE }
