// import { after, NextResponse } from 'next/server'
// import { Resend } from 'resend'
// import { Redis } from '@upstash/redis'
// import { Ratelimit } from '@upstash/ratelimit'
// import { z } from 'zod'
// import { calcolaRischio } from '@/lib/roof-calculator'
// import { buildAnalysisEmailHtml, buildAnalysisEmailText } from '@/lib/email-template-analysis'

// /**
//  * Fires once per completed T94 Roof Index™ quiz and emails the internal team
//  * with the visitor's answers + computed result. No visitor contact info is
//  * involved — this is an operational notification, not a lead capture form.
//  *
//  * Security & correctness:
//  * - The client sends only the raw quiz answers, never the score/band/cost.
//  *   Everything shown in the email is recomputed here with calcolaRischio(),
//  *   the same pure function the UI uses — so a visitor cannot spoof an
//  *   "Emergenza" alert (or any other result) by tampering with the request.
//  * - zod validates every field against the exact enum/range the calculator
//  *   accepts, rejecting anything malformed before it reaches business logic.
//  * - IP-based sliding-window rate limiting (Upstash Redis) caps this at a
//  *   handful of requests per IP per window — a real visitor only ever
//  *   triggers this once, so the limit only blocks abuse/bots, never
//  *   legitimate use.
//  *
//  * Performance: the route responds immediately after the checks above;
//  * the actual Resend call runs in `after()`, which lets Next.js flush the
//  * response to the client first and finish the email send in the background
//  * — the quiz UI never waits on outbound email latency.
//  */

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
//       limiter: Ratelimit.slidingWindow(5, '10 m'),
//       prefix: 'ratelimit:notify-analysis',
//     })
//   }
//   return ratelimit
// }

// const analysisInputSchema = z.object({
//   zona: z.enum(['costiera', 'pianura', 'alpina']),
//   superficie: z.number().int().min(1).max(100000),
//   fasciaEta: z.enum(['0-10', '11-20', '21-30', '30+']),
//   problema: z.enum(['nessuno', 'tegole', 'infiltrazioni_leggere', 'infiltrazioni_attive', 'strutturali']),
//   durata: z.enum(['recente', '6-12', 'oltre_1_anno', 'non_applicabile']),
//   materiale: z.enum(['tegole_coppi', 'guaina', 'lamiera', 'misto']),
//   ultimoIntervento: z.enum(['mai', 'oltre_5_anni', '1-5_anni', 'recentemente']),
// })

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
//       // Silently reject over-limit callers — this endpoint is fire-and-forget
//       // from the client's perspective, so there's no UX to show an error in.
//       return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })
//     }

//     const body = await req.json()
//     const parsed = analysisInputSchema.safeParse(body)
//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       )
//     }

//     if (!process.env.RESEND_API_KEY) {
//       console.error('[notify-analysis] RESEND_API_KEY is not configured.')
//       // Don't fail the request over a missing notification channel — the
//       // visitor's quiz result must never be affected by this side-channel.
//       return NextResponse.json({ success: true })
//     }

//     const input = parsed.data
//     const output = calcolaRischio(input)

//     after(async () => {
//       const { error } = await getResendClient().emails.send({
//         from: 'Tetto94 <noreply@tetto94.it>',
//         to: ['info@tetto94.it'],
//         subject: `Nuova analisi Roof Index — ${output.band.labelShort} (${output.score}/100)`,
//         html: buildAnalysisEmailHtml(input, output),
//         text: buildAnalysisEmailText(input, output),
//       })
//       if (error) {
//         console.error('[notify-analysis] Resend error:', error)
//       }
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error('[notify-analysis] Unexpected error:', err)
//     return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
//   }
// }


// import { after, NextResponse } from 'next/server'
// import { Resend } from 'resend'
// import { Redis } from '@upstash/redis'
// import { Ratelimit } from '@upstash/ratelimit'
// import { z } from 'zod'
// import { calcolaRischio } from '@/lib/roof-calculator'
// import { buildAnalysisEmailHtml, buildAnalysisEmailText } from '@/lib/email-template-analysis'
// import { db } from '@/lib/db'
// import { roofAnalyses } from '@/lib/db/schema'
// import { geocodeItalianCity } from '@/lib/it-cities'

// /**
//  * Fires once per completed T94 Roof Index™ quiz and emails the internal team
//  * with the visitor's answers + computed result. No visitor contact info is
//  * involved — this is an operational notification, not a lead capture form.
//  *
//  * Security & correctness:
//  * - The client sends only the raw quiz answers, never the score/band/cost.
//  *   Everything shown in the email is recomputed here with calcolaRischio(),
//  *   the same pure function the UI uses — so a visitor cannot spoof an
//  *   "Emergenza" alert (or any other result) by tampering with the request.
//  * - zod validates every field against the exact enum/range the calculator
//  *   accepts, rejecting anything malformed before it reaches business logic.
//  * - IP-based sliding-window rate limiting (Upstash Redis) caps this at a
//  *   handful of requests per IP per window — a real visitor only ever
//  *   triggers this once, so the limit only blocks abuse/bots, never
//  *   legitimate use.
//  *
//  * Performance: the route responds immediately after the checks above;
//  * the actual Resend call runs in `after()`, which lets Next.js flush the
//  * response to the client first and finish the email send in the background
//  * — the quiz UI never waits on outbound email latency.
//  */

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
//       limiter: Ratelimit.slidingWindow(5, '10 m'),
//       prefix: 'ratelimit:notify-analysis',
//     })
//   }
//   return ratelimit
// }

// const analysisInputSchema = z.object({
//   zona: z.enum(['costiera', 'pianura', 'alpina']),
//   superficie: z.number().int().min(1).max(100000),
//   fasciaEta: z.enum(['0-10', '11-20', '21-30', '30+']),
//   problema: z.enum(['nessuno', 'tegole', 'infiltrazioni_leggere', 'infiltrazioni_attive', 'strutturali']),
//   durata: z.enum(['recente', '6-12', 'oltre_1_anno', 'non_applicabile']),
//   materiale: z.enum(['tegole_coppi', 'guaina', 'lamiera', 'misto']),
//   ultimoIntervento: z.enum(['mai', 'oltre_5_anni', '1-5_anni', 'recentemente']),
//   // Optional, free-typed by the visitor — used only for the public
//   // aggregate map. Length-capped defensively; never trusted as an address.
//   citta: z.string().trim().min(1).max(100).optional(),
// })

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
//       // Silently reject over-limit callers — this endpoint is fire-and-forget
//       // from the client's perspective, so there's no UX to show an error in.
//       return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })
//     }

//     const body = await req.json()
//     const parsed = analysisInputSchema.safeParse(body)
//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors },
//         { status: 400 }
//       )
//     }

//     const { citta, ...calcInput } = parsed.data
//     const output = calcolaRischio(calcInput)

//     after(async () => {
//       if (!process.env.RESEND_API_KEY) return
//       const { error } = await getResendClient().emails.send({
//         from: 'Tetto94 <noreply@tetto94.it>',
//         to: ['info@tetto94.it'],
//         subject: `Nuova analisi Roof Index — ${output.band.labelShort} (${output.score}/100)`,
//         html: buildAnalysisEmailHtml(calcInput, output),
//         text: buildAnalysisEmailText(calcInput, output),
//       })
//       if (error) {
//         console.error('[notify-analysis] Resend error:', error)
//       }
//     })

//     // Anonymized record for the public "Mappa del Rischio" aggregate map.
//     // Deliberately its own after() + try/catch: a DB hiccup must never take
//     // down the email notification above, and vice versa — these are two
//     // independent, best-effort side effects of the same event.
//     after(async () => {
//       try {
//         const coords = geocodeItalianCity(citta)
//         await db.insert(roofAnalyses).values({
//           zona: calcInput.zona,
//           citta: coords?.label ?? citta ?? null,
//           cap: null,
//           lat: coords?.lat ?? null,
//           lng: coords?.lng ?? null,
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
//         console.error('[notify-analysis] DB insert error:', err)
//       }
//     })

//     return NextResponse.json({ success: true })
//   } catch (err) {
//     console.error('[notify-analysis] Unexpected error:', err)
//     return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
//   }
// }


import { after, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { z } from 'zod'
import { calcolaRischio } from '@/lib/roof-calculator'
import { buildAnalysisEmailHtml, buildAnalysisEmailText } from '@/lib/email-template-analysis'
import { db } from '@/lib/db'
import { roofAnalyses } from '@/lib/db/schema'
import { geocodeItalianCity } from '@/lib/it-cities'
import { ROOF_MAP_STATS_TAG } from '@/lib/roof-map-data'

/**
 * Fires once per completed T94 Roof Index™ quiz and emails the internal team
 * with the visitor's answers + computed result. No visitor contact info is
 * involved — this is an operational notification, not a lead capture form.
 *
 * Security & correctness:
 * - The client sends only the raw quiz answers, never the score/band/cost.
 *   Everything shown in the email is recomputed here with calcolaRischio(),
 *   the same pure function the UI uses — so a visitor cannot spoof an
 *   "Emergenza" alert (or any other result) by tampering with the request.
 * - zod validates every field against the exact enum/range the calculator
 *   accepts, rejecting anything malformed before it reaches business logic.
 * - IP-based sliding-window rate limiting (Upstash Redis) caps this at a
 *   handful of requests per IP per window — a real visitor only ever
 *   triggers this once, so the limit only blocks abuse/bots, never
 *   legitimate use.
 *
 * Performance: the route responds immediately after the checks above;
 * the actual Resend call runs in `after()`, which lets Next.js flush the
 * response to the client first and finish the email send in the background
 * — the quiz UI never waits on outbound email latency.
 */

let resendClient: Resend | null = null
function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY)
  }
  return resendClient
}

let ratelimit: Ratelimit | null = null
function getRatelimit() {
  if (!ratelimit) {
    const redis = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      prefix: 'ratelimit:notify-analysis',
    })
  }
  return ratelimit
}

const analysisInputSchema = z.object({
  zona: z.enum(['costiera', 'pianura', 'alpina']),
  superficie: z.number().int().min(1).max(100000),
  fasciaEta: z.enum(['0-10', '11-20', '21-30', '30+']),
  problema: z.enum(['nessuno', 'tegole', 'infiltrazioni_leggere', 'infiltrazioni_attive', 'strutturali']),
  durata: z.enum(['recente', '6-12', 'oltre_1_anno', 'non_applicabile']),
  materiale: z.enum(['tegole_coppi', 'guaina', 'lamiera', 'misto']),
  ultimoIntervento: z.enum(['mai', 'oltre_5_anni', '1-5_anni', 'recentemente']),
  // Optional, free-typed by the visitor — used only for the public
  // aggregate map. Length-capped defensively; never trusted as an address.
  citta: z.string().trim().min(1).max(100).optional(),
})

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)
    const { success } = await getRatelimit().limit(ip)
    if (!success) {
      // Silently reject over-limit callers — this endpoint is fire-and-forget
      // from the client's perspective, so there's no UX to show an error in.
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 })
    }

    const body = await req.json()
    const parsed = analysisInputSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati non validi.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { citta, ...calcInput } = parsed.data
    const output = calcolaRischio(calcInput)

    after(async () => {
      if (!process.env.RESEND_API_KEY) return
      const { error } = await getResendClient().emails.send({
        from: 'Tetto94 <noreply@tetto94.it>',
        to: ['info@tetto94.it'],
        subject: `Nuova analisi Roof Index — ${output.band.labelShort} (${output.score}/100)`,
        html: buildAnalysisEmailHtml(calcInput, output),
        text: buildAnalysisEmailText(calcInput, output),
      })
      if (error) {
        console.error('[notify-analysis] Resend error:', error)
      }
    })

    // Anonymized record for the public "Mappa del Rischio" aggregate map.
    // Deliberately its own after() + try/catch: a DB hiccup must never take
    // down the email notification above, and vice versa — these are two
    // independent, best-effort side effects of the same event.
    after(async () => {
      try {
        const coords = geocodeItalianCity(citta)
        await db.insert(roofAnalyses).values({
          zona: calcInput.zona,
          citta: coords?.label ?? citta ?? null,
          cap: null,
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
          superficie: calcInput.superficie,
          fasciaEta: calcInput.fasciaEta,
          problema: calcInput.problema,
          durata: calcInput.durata,
          materiale: calcInput.materiale,
          ultimoIntervento: calcInput.ultimoIntervento,
          score: output.score,
          band: output.band.labelShort,
        })
        // Invalidate the cached map aggregates so /mappa-rischio reflects
        // this new analysis on next request, instead of waiting out the
        // hourly revalidate window. Only runs after a successful insert —
        // a failed write has nothing new for the map to show anyway.
        revalidateTag(ROOF_MAP_STATS_TAG, 'max')
      } catch (err) {
        console.error('[notify-analysis] DB insert error:', err)
      }
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[notify-analysis] Unexpected error:', err)
    return NextResponse.json({ error: 'Errore interno del server.' }, { status: 500 })
  }
}
