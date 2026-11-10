import { NextResponse } from 'next/server'
import { getClientIp } from '@/lib/auth/rate-limit'
import { isPublicReadAllowed } from '@/lib/public-rate-limit'
import { getRecentActivity } from '@/lib/contacts/social-proof'

export async function GET(req: Request) {
  if (!(await isPublicReadAllowed(getClientIp(req)))) {
    return NextResponse.json({ offers: [], analyses: [] }, { status: 429 })
  }

  try {
    const data = await getRecentActivity()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch (err) {
    console.error('[recent-activity] failed:', err)
    return NextResponse.json({ offers: [], analyses: [] })
  }
}
