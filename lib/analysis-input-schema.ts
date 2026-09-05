// import { z } from 'zod'

// /**
//  * Shared validation for a completed T94 Roof Index™ quiz answer set.
//  * Used by every server route that receives raw quiz answers from the
//  * client (notify-analysis, unlock-offer) so the accepted shape can never
//  * drift between them — both must reject the same malformed input before
//  * it reaches calcolaRischio() or the database.
//  */
// export const analysisInputSchema = z.object({
//   zona: z.enum(['costiera', 'pianura', 'alpina']),
//   superficie: z.number().int().min(1).max(100000),
//   fasciaEta: z.enum(['0-10', '11-20', '21-30', '30+']),
//   problema: z.enum(['nessuno', 'tegole', 'infiltrazioni_leggere', 'infiltrazioni_attive', 'strutturali']),
//   durata: z.enum(['recente', '6-12', 'oltre_1_anno', 'non_applicabile']),
//   materiale: z.enum(['tegole_coppi', 'guaina', 'lamiera', 'misto']),
//   ultimoIntervento: z.enum(['mai', 'oltre_5_anni', '1-5_anni', 'recentemente']),
//   // Optional, free-typed by the visitor — used only for the public
//   // aggregate map (and, if present, shown to the team). Length-capped
//   // defensively; never trusted as an address.
//   citta: z.string().trim().min(1).max(100).optional(),
// })

// export type AnalysisInputPayload = z.infer<typeof analysisInputSchema>

// /**
//  * Loose Italian phone number check: strips spaces/dashes/dots, then
//  * requires an optional +39/0039 prefix followed by 6–11 digits. Loose on
//  * purpose — this is a lead capture field, not a carrier-verified number,
//  * and over-strict validation just loses real leads who format their
//  * number unusually. Real validation happens when the team calls back.
//  */
// export const italianPhoneSchema = z
//   .string()
//   .trim()
//   .min(6, 'Numero di telefono non valido.')
//   .max(20, 'Numero di telefono non valido.')
//   .refine((val) => {
//     const digitsOnly = val.replace(/[\s.\-()]/g, '')
//     return /^(\+39|0039)?\d{6,11}$/.test(digitsOnly)
//   }, 'Inserisci un numero di telefono italiano valido.')

import { z } from 'zod'

/**
 * Loose Italian phone number check: strips spaces/dashes/dots, then
 * requires an optional +39/0039 prefix followed by 6–11 digits. Loose on
 * purpose — this is a lead capture field, not a carrier-verified number,
 * and over-strict validation just loses real leads who format their
 * number unusually. Real validation happens when the team calls back.
 */
export const italianPhoneSchema = z
  .string()
  .trim()
  .min(6, 'Numero di telefono non valido.')
  .max(20, 'Numero di telefono non valido.')
  .refine((val) => {
    const digitsOnly = val.replace(/[\s.\-()]/g, '')
    return /^(\+39|0039)?\d{6,11}$/.test(digitsOnly)
  }, 'Inserisci un numero di telefono italiano valido.')

/**
 * Shared validation for a completed T94 Roof Index™ quiz answer set.
 * Used by the notify-analysis route, which now doubles as the lead-capture
 * endpoint: the phone number is collected in the same step as città (the
 * last step of the quiz) and is required, so every completed analysis is
 * a callable lead.
 */
export const analysisInputSchema = z.object({
  zona: z.enum(['costiera', 'pianura', 'alpina']),
  superficie: z.number().int().min(1).max(100000),
  fasciaEta: z.enum(['0-10', '11-20', '21-30', '30+']),
  problema: z.enum(['nessuno', 'tegole', 'infiltrazioni_leggere', 'infiltrazioni_attive', 'strutturali']),
  durata: z.enum(['recente', '6-12', 'oltre_1_anno', 'non_applicabile']),
  materiale: z.enum(['tegole_coppi', 'guaina', 'lamiera', 'misto']),
  ultimoIntervento: z.enum(['mai', 'oltre_5_anni', '1-5_anni', 'recentemente']),
  // Optional, free-typed by the visitor — used only for the public
  // aggregate map (and, if present, shown to the team). Length-capped
  // defensively; never trusted as an address.
  citta: z.string().trim().min(1).max(100).optional(),
  // Required lead-capture phone number — validated with the same loose
  // Italian-phone rule used client-side, so acceptance can never drift
  // between the UI and this route.
  telefono: italianPhoneSchema,
})

export type AnalysisInputPayload = z.infer<typeof analysisInputSchema>
