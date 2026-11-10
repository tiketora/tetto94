import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { getSession } from '@/lib/auth/session'
import { isSameOrigin } from '@/lib/auth/origin'
import { contactCreateSchema } from '@/lib/contacts/schema'
import { createContact } from '@/lib/contacts/queries'
import { SOCIAL_PROOF_TAG } from '@/lib/contacts/social-proof'
import { geocodeItalianCity } from '@/lib/it-cities'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  if (!isSameOrigin(req)) return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })

  const body = await req.json().catch(() => null)
  const parsed = contactCreateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors }, { status: 400 })
  }

  const data = parsed.data
  const canonicalCity = geocodeItalianCity(data.citta)?.label ?? null
  if (data.showPublic && !canonicalCity) {
    return NextResponse.json(
      { error: 'Per mostrarlo sul sito serve una città italiana riconosciuta.' },
      { status: 400 },
    )
  }

  const contact = await createContact({ ...data, citta: canonicalCity ?? data.citta })
  revalidateTag(SOCIAL_PROOF_TAG, 'max')
  return NextResponse.json({ contact }, { status: 201 })
}
