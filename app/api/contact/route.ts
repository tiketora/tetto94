import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { buildContactEmailHtml, buildContactEmailText } from '@/lib/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  nome:      z.string().min(1, 'Nome obbligatorio').max(80),
  cognome:   z.string().min(1, 'Cognome obbligatorio').max(80),
  telefono:  z.string().min(6, 'Telefono non valido').max(30),
  citta:     z.string().max(120).optional().default(''),
  servizio:  z.string().max(120).optional().default(''),
  messaggio: z.string().max(2000).optional().default(''),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    const fullName = `${data.nome} ${data.cognome}`

    const { error } = await resend.emails.send({
      from:     'Tetto94 <noreply@tetto94.it>',
      to:       ['info@tetto94.it'],
      replyTo:  undefined,
      subject:  `Nuova richiesta da ${fullName} – ${data.servizio || 'Preventivo'}`,
      html:     buildContactEmailHtml(data),
      text:     buildContactEmailText(data),
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: 'Invio fallito. Riprova tra qualche minuto.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Errore interno del server.' },
      { status: 500 }
    )
  }
}
