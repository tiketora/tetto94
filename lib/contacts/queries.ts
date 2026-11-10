import { and, count, desc, eq, gte } from 'drizzle-orm'
import { db } from '@/lib/db'
import { contactLog, CONTACT_CHANNELS, CONTACT_STATUSES } from '@/lib/db/schema'

export type ContactChannel = (typeof CONTACT_CHANNELS)[number]
export type ContactStatus = (typeof CONTACT_STATUSES)[number]
export type ContactRow = typeof contactLog.$inferSelect

export interface ContactFilters {
  channel?: ContactChannel
  status?: ContactStatus
  days?: number
}

export interface ContactWriteInput {
  channel: ContactChannel
  status: ContactStatus
  contactedAt: string
  citta: string | null
  servizio: string | null
  contactName: string | null
  contactValue: string | null
  notes: string | null
  showPublic: boolean
}

export async function listContacts(filters: ContactFilters = {}, limit = 300): Promise<ContactRow[]> {
  const conditions = []
  if (filters.channel) conditions.push(eq(contactLog.channel, filters.channel))
  if (filters.status) conditions.push(eq(contactLog.status, filters.status))
  if (filters.days) conditions.push(gte(contactLog.contactedAt, new Date(Date.now() - filters.days * 86_400_000)))

  return db
    .select()
    .from(contactLog)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(contactLog.contactedAt))
    .limit(limit)
}

export async function createContact(input: ContactWriteInput): Promise<ContactRow> {
  const [row] = await db
    .insert(contactLog)
    .values({ ...input, contactedAt: new Date(input.contactedAt) })
    .returning()
  return row
}

export async function updateContact(id: number, patch: Partial<ContactWriteInput>): Promise<ContactRow | null> {
  const { contactedAt, ...rest } = patch
  const [row] = await db
    .update(contactLog)
    .set({ ...rest, ...(contactedAt ? { contactedAt: new Date(contactedAt) } : {}) })
    .where(eq(contactLog.id, id))
    .returning()
  return row ?? null
}

export async function deleteContact(id: number): Promise<boolean> {
  const rows = await db.delete(contactLog).where(eq(contactLog.id, id)).returning({ id: contactLog.id })
  return rows.length > 0
}

/** Contact counts per channel over the last 7 days, plus how many are still untouched. */
export async function getContactKpis() {
  const since = new Date(Date.now() - 7 * 86_400_000)
  const [byChannel, [pending]] = await Promise.all([
    db
      .select({ channel: contactLog.channel, n: count() })
      .from(contactLog)
      .where(gte(contactLog.contactedAt, since))
      .groupBy(contactLog.channel),
    db.select({ n: count() }).from(contactLog).where(eq(contactLog.status, 'nuovo')),
  ])
  const perChannel = Object.fromEntries(CONTACT_CHANNELS.map((c) => [c, 0])) as Record<ContactChannel, number>
  for (const row of byChannel) perChannel[row.channel] = row.n
  return { perChannel, weekTotal: Object.values(perChannel).reduce((a, b) => a + b, 0), pending: pending?.n ?? 0 }
}
