import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth/session'
import { csvResponse, toCsv } from '@/lib/csv'
import { listContacts, type ContactChannel, type ContactStatus } from '@/lib/contacts/queries'
import { CONTACT_CHANNELS, CONTACT_STATUSES } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const params = new URL(req.url).searchParams
  const channel = params.get('channel')
  const status = params.get('status')
  const days = Number(params.get('days'))

  const rows = await listContacts(
    {
      channel: CONTACT_CHANNELS.includes(channel as ContactChannel) ? (channel as ContactChannel) : undefined,
      status: CONTACT_STATUSES.includes(status as ContactStatus) ? (status as ContactStatus) : undefined,
      days: Number.isFinite(days) && days > 0 ? days : undefined,
    },
    5000,
  )

  const csv = toCsv(
    ['Data contatto', 'Canale', 'Stato', 'Città', 'Servizio', 'Nome', 'Contatto', 'Note', 'Pubblico'],
    rows.map((r) => [
      r.contactedAt,
      r.channel,
      r.status,
      r.citta,
      r.servizio,
      r.contactName,
      r.contactValue,
      r.notes,
      r.showPublic ? 'si' : 'no',
    ]),
  )
  return csvResponse(`contatti-tetto94-${new Date().toISOString().slice(0, 10)}.csv`, csv)
}
