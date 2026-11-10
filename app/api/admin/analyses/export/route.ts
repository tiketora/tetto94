import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { getSession } from '@/lib/auth/session'
import { csvResponse, toCsv } from '@/lib/csv'
import { db } from '@/lib/db'
import { roofIndexLeads } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  const rows = await db.select().from(roofIndexLeads).orderBy(desc(roofIndexLeads.createdAt)).limit(5000)

  const csv = toCsv(
    ['Data', 'Telefono', 'Città', 'Zona', 'Superficie', 'Età', 'Problema', 'Durata', 'Materiale', 'Ultimo intervento', 'Score', 'Fascia'],
    rows.map((r) => [
      r.createdAt,
      r.telefono,
      r.citta,
      r.zona,
      r.superficie,
      r.fasciaEta,
      r.problema,
      r.durata,
      r.materiale,
      r.ultimoIntervento,
      r.score,
      r.band,
    ]),
  )
  return csvResponse(`lead-calcolatore-tetto94-${new Date().toISOString().slice(0, 10)}.csv`, csv)
}
