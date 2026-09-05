// import { after, NextResponse } from 'next/server'
// import { Resend } from 'resend'
// import { Redis } from '@upstash/redis'
// import { Ratelimit } from '@upstash/ratelimit'
// import { analysisInputSchema, italianPhoneSchema } from '@/lib/analysis-input-schema'
// import { calcolaRischio } from '@/lib/roof-calculator'
// import { buildLeadEmailHtml, buildLeadEmailText } from '@/lib/email-template-lead'
// import { db } from '@/lib/db'
// import { roofIndexLeads } from '@/lib/db/schema'

// /**
//  * Fires when a visitor "unlocks" their best-price offer on the T94 Roof
//  * Index™ result by submitting a phone number. This is the hot-lead capture
//  * step — unlike notify-analysis (fired on quiz completion, no contact
//  * info), this route persists a phone number and should trigger a real
//  * follow-up.
//  *
//  * Deliberately a separate table (roof_index_leads) and a separate route
//  * from notify-analysis / roof_analyses: the public Mappa del Rischio is
//  * backed by roof_analyses, which is documented as carrying zero PII. Phone
//  * numbers must never end up in that table or its map-facing queries, so
//  * this route writes only to roof_index_leads and never touches
//  * roof_analyses.
//  *
//  * Security & correctness mirrors notify-analysis:
//  * - Score/band/cost are always recomputed server-side from the raw answers
//  *   via calcolaRischio() — never trust a client-supplied result.
//  * - zod validates the quiz answers plus the phone number via the shared
//  *   analysisInputSchema / italianPhoneSchema, so acceptance rules can never
//  *   drift from the rest of the funnel.
//  * - IP rate limiting, generous for the same Google Ads traffic reasons as
//  *   notify-analysis, but tighter than that route's since a phone submission
//  *   is a deliberate, one-per-visitor action rather than routine background
//  *   telemetry.
//  */

// const unlockOfferSchema = analysisInputSchema.extend({
//   telefono: italianPhoneSchema,
// })

// let resendClient: Resend | null = null
// function getResendClient() {
//   if (!resendClient) {
//     resendClient = new Resend(process.env.RESEND_API_KEY)
//   }
//   return resendClient
// }

// let ratelimit: Ratelimit | null = null
// function getRatelimit() {
//   if (!ratelimit) {
//     const redis = new Redis({
//       url: process.env.KV_REST_API_URL!,
//       token: process.env.KV_REST_API_TOKEN!,
//     })
//     ratelimit = new Ratelimit({
//       redis,
//       // 15 requests / 10 min per IP — generous enough for shared/CGNAT IPs
//       // during paid traffic spikes, tight enough to stop a scripted flood
//       // of fake leads.
//       limiter: Ratelimit.slidingWindow(15, '10 m'),
//       prefix: 'ratelimit:unlock-offer',
//     })
//   }
//   return ratelimit
// }

// function getClientIp(req: Request): string {
//   const forwardedFor = req.headers.get('x-forwarded-for')
//   if (forwardedFor) return forwardedFor.split(',')[0].trim()
//   return req.headers.get('x-real-ip') ?? 'unknown'
// }

// export async function POST(req: Request) {
//   try {
//     const ip = getClientIp(req)
//     const { success } = await getRatelimit().limit(ip)
//     if (!success) {
//       return NextResponse.json({ error: 'Troppe richieste. Riprova più tardi.' }, { status: 429 })
//     }

//     const body = await req.json()
//     const parsed = unlockOfferSchema.safeParse(body)
//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       )
//     }

//     const { citta, telefono, ...calcInput } = parsed.data
//     const output = calcolaRischio(calcInput)

//     after(async () => {
//       try {
//         await db.insert(roofIndexLeads).values({
//           telefono,
//           citta: citta ?? null,
//           zona: calcInput.zona,
//           superficie: calcInput.superficie,
//           fasciaEta: calcInput.fasciaEta,
//           problema: calcInput.problema,
//           durata: calcInput.durata,
//           materiale: calcInput.materiale,
//           ultimoIntervento: calcInput.ultimoIntervento,
//           score: output.score,
//           band: output.band.labelShort,
//         })
//       } catch (err) {
//         console.error('[unlock-offer] DB insert error:', err)
//       }
//     })

//     after(async () => {
//       if (!process.env.RESEND_API_KEY) return
//       const { error } = await getResendClient().emails.send({
//         from: 'Tetto94 <noreply@tetto94.it>',
//         to: ['info@tetto94.it'],
//         subject: `🔥 Lead caldo — offerta richiesta — ${output.band.labelShort} (${output.score}/100)`,
//         html: buildLeadEmailHtml(calcInput, output, telefono, citta),
//         text: buildLeadEmailText(calcInput, output, telefono, citta),
//       })
//       if (error) {
//         console.error('[unlock-offer] Resend error:', error)
//       }
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error('[unlock-offer] Unexpected error:', err)
//     return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
//   }
// }
