import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getSession } from '@/lib/auth/session'
import { isSameOrigin } from '@/lib/auth/origin'
import { contactPatchSchema } from '@/lib/contacts/schema'
import { deleteContact, updateContact, type ContactWriteInput } from '@/lib/contacts/queries'
import { SOCIAL_PROOF_TAG } from '@/lib/contacts/social-proof'
import { geocodeItalianCity } from '@/lib/it-cities'
import { db } from '@/lib/db'
import { contactLog } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

function parseId(raw: string): number | null {
  const id = Number(raw)
  return Number.isInteger(id) && id > 0 ? id : null
}

async function guard(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  return null
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await guard(req)
  if (denied) return denied

  const id = parseId((await ctx.params).id)
  if (!id) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })

  const body = await req.json().catch(() => null)
  const parsed = contactPatchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const patch: Partial<ContactWriteInput> = parsed.data

  // A row is only allowed to go public if its city resolves to a real comune.
  if (patch.showPublic || patch.citta !== undefined) {
    const [existing] = await db
      .select({ citta: contactLog.citta, showPublic: contactLog.showPublic })
      .from(contactLog)
      .where(eq(contactLog.id, id))
    if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

    const nextCity = patch.citta !== undefined ? patch.citta : existing.citta
    const nextPublic = patch.showPublic ?? existing.showPublic
    const canonical = geocodeItalianCity(nextCity)?.label ?? null
    if (nextPublic && !canonical) {
      return NextResponse.json(
        { error: 'Per mostrarlo sul sito serve una città italiana riconosciuta.' },
        { status: 400 },
      )
    }
    if (patch.citta !== undefined) patch.citta = canonical ?? patch.citta
  }

  const contact = await updateContact(id, patch)
  if (!contact) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  revalidateTag(SOCIAL_PROOF_TAG, 'max')
  return NextResponse.json({ contact })
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await guard(req)
  if (denied) return denied

  const id = parseId((await ctx.params).id)
  if (!id) return NextResponse.json({ error: 'Invalid id.' }, { status: 400 })

  const removed = await deleteContact(id)
  if (!removed) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  revalidateTag(SOCIAL_PROOF_TAG, 'max')
  return NextResponse.json({ success: true })
}
