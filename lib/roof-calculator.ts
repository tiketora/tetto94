// /**
//  * T94 Roof Index™ — Tetto94 Scoring Engine
//  * Pure functions, no side effects, fully testable.
//  * v1.0 — 70€/m² base coefficient (adjustable in COST_COEFFICIENTS)
//  */

// // ─── Types ──────────────────────────────────────────────────────────────────

// export type ZonaClimatica = 'costiera' | 'pianura' | 'alpina'
// export type FasciaEta = '0-10' | '11-20' | '21-30' | '30+'
// export type TipoProblema = 'nessuno' | 'tegole' | 'infiltrazioni_leggere' | 'infiltrazioni_attive' | 'strutturali'
// export type DurataProblema = 'recente' | '6-12' | 'oltre_1_anno' | 'non_applicabile'
// export type TipoMateriale = 'tegole_coppi' | 'guaina' | 'lamiera' | 'misto'
// export type UltimoIntervento = 'mai' | 'oltre_5_anni' | '1-5_anni' | 'recentemente'

// export interface CalcoloInput {
//   zona: ZonaClimatica
//   superficie: number           // m² — free numeric input
//   fasciaEta: FasciaEta
//   problema: TipoProblema
//   durata: DurataProblema
//   materiale: TipoMateriale
//   ultimoIntervento: UltimoIntervento
// }

// export interface RiskBand {
//   label: string
//   labelShort: string
//   color: string                // Tailwind bg class
//   textColor: string            // Tailwind text class
//   hex: string                  // Raw hex for SVG/canvas
//   urgency: string              // CTA tone
//   description: string
//   recommendation: string
// }

// export interface CalcoloOutput {
//   score: number                // 0–100
//   band: RiskBand
//   estimatedCostMin: number     // € — 0 for Verde
//   estimatedCostMax: number     // € — 0 for Verde/Emergenza
//   isEmergenza: boolean
//   breakdown: ScoreBreakdown    // per-factor scores for transparency display
// }

// export interface ScoreBreakdown {
//   eta: number
//   problema: number
//   durata: number
//   materiale: number
//   ultimoIntervento: number
//   zona: number
//   total: number
//   hardOverrideApplied: boolean
// }

// // ─── Constants ───────────────────────────────────────────────────────────────

// /** Base cost coefficient €/m². Update here when pricing changes. */
// const COST_COEFFICIENTS: Record<string, number> = {
//   verde:     0,
//   giallo:    70 * 0.40,   // 28€/m²
//   arancione: 70 * 0.78,   // ~55€/m²
//   rosso:     70 * 1.29,   // ~90€/m²
//   emergenza: 0,           // Valutazione in loco
// }

// const RISK_BANDS: Record<string, RiskBand> = {
//   verde: {
//     label:          'Tetto in ottimo stato',
//     labelShort:     'Ottimo',
//     color:          'bg-emerald-500',
//     textColor:      'text-emerald-500',
//     hex:            '#10b981',
//     urgency:        'low',
//     description:    'Il tuo tetto non mostra segni di deterioramento significativo.',
//     recommendation: 'Ti consigliamo un controllo annuale preventivo con ispezione drone gratuita.',
//   },
//   giallo: {
//     label:          'Attenzione consigliata',
//     labelShort:     'Attenzione',
//     color:          'bg-yellow-400',
//     textColor:      'text-yellow-400',
//     hex:            '#facc15',
//     urgency:        'medium',
//     description:    'Sono presenti alcuni segnali da monitorare con attenzione nei prossimi mesi.',
//     recommendation: 'Un sopralluogo tecnico gratuito ci permetterà di valutare la situazione con precisione.',
//   },
//   arancione: {
//     label:          'Intervento necessario',
//     labelShort:     'Necessario',
//     color:          'bg-orange-500',
//     textColor:      'text-orange-500',
//     hex:            '#f97316',
//     urgency:        'high',
//     description:    'Il tuo tetto richiede un intervento a breve termine per evitare danni maggiori.',
//     recommendation: 'Contattaci subito per un sopralluogo gratuito — ogni settimana di attesa aumenta i costi.',
//   },
//   rosso: {
//     label:          'Intervento urgente',
//     labelShort:     'Urgente',
//     color:          'bg-[#EB1C26]',
//     textColor:      'text-[#EB1C26]',
//     hex:            '#EB1C26',
//     urgency:        'urgent',
//     description:    'La situazione richiede un intervento rapido per proteggere la struttura dell\'edificio.',
//     recommendation: 'Chiama ora — garantiamo intervento entro 24 ore per situazioni urgenti.',
//   },
//   emergenza: {
//     label:          'Emergenza strutturale',
//     labelShort:     'Emergenza',
//     color:          'bg-red-950',
//     textColor:      'text-red-400',
//     hex:            '#7f1d1d',
//     urgency:        'emergency',
//     description:    'Possibili danni strutturali rilevati. La sicurezza dell\'edificio potrebbe essere compromessa.',
//     recommendation: 'Contattaci immediatamente — sopralluogo gratuito entro oggi.',
//   },
// }

// // ─── Per-factor scoring ───────────────────────────────────────────────────────

// function scoreEta(fascia: FasciaEta): number {
//   return { '0-10': 5, '11-20': 15, '21-30': 28, '30+': 38 }[fascia]
// }

// function scoreProblema(problema: TipoProblema): number {
//   return {
//     nessuno:               0,
//     tegole:               12,
//     infiltrazioni_leggere: 18,
//     infiltrazioni_attive:  30,
//     strutturali:           40,
//   }[problema]
// }

// function scoreDurata(durata: DurataProblema): number {
//   return {
//     non_applicabile: 0,
//     recente:         3,
//     '6-12':          8,
//     oltre_1_anno:   14,
//   }[durata]
// }

// function scoreMateriale(materiale: TipoMateriale): number {
//   return {
//     tegole_coppi: 8,
//     guaina:      12,   // more dependent on maintenance history
//     lamiera:      6,
//     misto:       10,
//   }[materiale]
// }

// function scoreUltimoIntervento(intervento: UltimoIntervento): number {
//   return {
//     recentemente:   0,
//     '1-5_anni':     5,
//     oltre_5_anni:  10,
//     mai:           20,
//   }[intervento]
// }

// function scoreZona(zona: ZonaClimatica): number {
//   return { costiera: 15, alpina: 10, pianura: 0 }[zona]
// }

// // ─── Main calculation function ────────────────────────────────────────────────

// export function calcolaRischio(input: CalcoloInput): CalcoloOutput {
//   const eta            = scoreEta(input.fasciaEta)
//   const problema       = scoreProblema(input.problema)
//   const durata         = scoreDurata(input.durata)
//   const materiale      = scoreMateriale(input.materiale)
//   const ultimoIntervento = scoreUltimoIntervento(input.ultimoIntervento)
//   const zona           = scoreZona(input.zona)

//   let raw = eta + problema + durata + materiale + ultimoIntervento + zona

//   // Hard override: active leak + age > 20 years → minimum score 72
//   const hardOverride =
//     input.problema === 'infiltrazioni_attive' &&
//     (input.fasciaEta === '21-30' || input.fasciaEta === '30+')

//   if (hardOverride && raw < 72) raw = 72

//   // Hard override: structural damage → minimum 86
//   if (input.problema === 'strutturali' && raw < 86) raw = 86

//   const score = Math.min(100, raw)

//   // Determine band
//   let bandKey: string
//   if (score <= 25)      bandKey = 'verde'
//   else if (score <= 45) bandKey = 'giallo'
//   else if (score <= 65) bandKey = 'arancione'
//   else if (score <= 85) bandKey = 'rosso'
//   else                  bandKey = 'emergenza'

//   const band = RISK_BANDS[bandKey]
//   const coeff = COST_COEFFICIENTS[bandKey]

//   // Cost estimate: ±20% range around coefficient × m²
//   const baseCost = coeff * input.superficie
//   const estimatedCostMin = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 0.85 / 100) * 100
//   const estimatedCostMax = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 1.15 / 100) * 100

//   return {
//     score,
//     band,
//     estimatedCostMin,
//     estimatedCostMax,
//     isEmergenza: bandKey === 'emergenza',
//     breakdown: {
//       eta,
//       problema,
//       durata,
//       materiale,
//       ultimoIntervento,
//       zona,
//       total: score,
//       hardOverrideApplied: hardOverride || input.problema === 'strutturali',
//     },
//   }
// }

// // ─── Formatter helpers ────────────────────────────────────────────────────────

// export function formatCost(n: number): string {
//   return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
// }

// export function getBandKey(score: number): string {
//   if (score <= 25) return 'verde'
//   if (score <= 45) return 'giallo'
//   if (score <= 65) return 'arancione'
//   if (score <= 85) return 'rosso'
//   return 'emergenza'
// }


// /**
//  * T94 Roof Index™ — Tetto94 Scoring Engine
//  * Pure functions, no side effects, fully testable.
//  * v1.1 — fixed 60€/m² company-wide rate (see FIXED_RATE_PER_SQM below).
//  *         Zone/age/problem/etc. drive the risk score & band only — never
//  *         the price, per management decision.
//  */

// // ─── Types ──────────────────────────────────────────────────────────────────

// export type ZonaClimatica = 'costiera' | 'pianura' | 'alpina'
// export type FasciaEta = '0-10' | '11-20' | '21-30' | '30+'
// export type TipoProblema = 'nessuno' | 'tegole' | 'infiltrazioni_leggere' | 'infiltrazioni_attive' | 'strutturali'
// export type DurataProblema = 'recente' | '6-12' | 'oltre_1_anno' | 'non_applicabile'
// export type TipoMateriale = 'tegole_coppi' | 'guaina' | 'lamiera' | 'misto'
// export type UltimoIntervento = 'mai' | 'oltre_5_anni' | '1-5_anni' | 'recentemente'

// export interface CalcoloInput {
//   zona: ZonaClimatica
//   superficie: number           // m² — free numeric input
//   fasciaEta: FasciaEta
//   problema: TipoProblema
//   durata: DurataProblema
//   materiale: TipoMateriale
//   ultimoIntervento: UltimoIntervento
// }

// export interface RiskBand {
//   label: string
//   labelShort: string
//   color: string                // Tailwind bg class
//   textColor: string            // Tailwind text class
//   hex: string                  // Raw hex for SVG/canvas
//   urgency: string              // CTA tone
//   description: string
//   recommendation: string
// }

// export interface CalcoloOutput {
//   score: number                // 0–100
//   band: RiskBand
//   estimatedCostMin: number     // € — 0 for Verde
//   estimatedCostMax: number     // € — 0 for Verde/Emergenza
//   isEmergenza: boolean
//   breakdown: ScoreBreakdown    // per-factor scores for transparency display
// }

// export interface ScoreBreakdown {
//   eta: number
//   problema: number
//   durata: number
//   materiale: number
//   ultimoIntervento: number
//   zona: number
//   total: number
//   hardOverrideApplied: boolean
// }

// // ─── Constants ───────────────────────────────────────────────────────────────

// /**
//  * Base cost coefficient €/m² — fixed company-wide rate, per management
//  * decision. It intentionally does NOT vary with band/zone/risk factors:
//  * those still drive the risk score and color classification below, but
//  * the price itself is always area × 60€/m² (±10% range), for every band
//  * that shows a price. Update this single constant when pricing changes.
//  */
// const FIXED_RATE_PER_SQM = 60

// const COST_COEFFICIENTS: Record<string, number> = {
//   verde:     0,                 // Ottimo — no intervention needed, no price shown
//   giallo:    FIXED_RATE_PER_SQM,
//   arancione: FIXED_RATE_PER_SQM,
//   rosso:     FIXED_RATE_PER_SQM,
//   emergenza: 0,                  // Valutazione in loco — needs on-site inspection
// }

// const RISK_BANDS: Record<string, RiskBand> = {
//   verde: {
//     label:          'Tetto in ottimo stato',
//     labelShort:     'Ottimo',
//     color:          'bg-emerald-500',
//     textColor:      'text-emerald-500',
//     hex:            '#10b981',
//     urgency:        'low',
//     description:    'Il tuo tetto non mostra segni di deterioramento significativo.',
//     recommendation: 'Ti consigliamo un controllo annuale preventivo con ispezione drone gratuita.',
//   },
//   giallo: {
//     label:          'Attenzione consigliata',
//     labelShort:     'Attenzione',
//     color:          'bg-yellow-400',
//     textColor:      'text-yellow-400',
//     hex:            '#facc15',
//     urgency:        'medium',
//     description:    'Sono presenti alcuni segnali da monitorare con attenzione nei prossimi mesi.',
//     recommendation: 'Un sopralluogo tecnico gratuito ci permetterà di valutare la situazione con precisione.',
//   },
//   arancione: {
//     label:          'Intervento necessario',
//     labelShort:     'Necessario',
//     color:          'bg-orange-500',
//     textColor:      'text-orange-500',
//     hex:            '#f97316',
//     urgency:        'high',
//     description:    'Il tuo tetto richiede un intervento a breve termine per evitare danni maggiori.',
//     recommendation: 'Contattaci subito per un sopralluogo gratuito — ogni settimana di attesa aumenta i costi.',
//   },
//   rosso: {
//     label:          'Intervento urgente',
//     labelShort:     'Urgente',
//     color:          'bg-[#EB1C26]',
//     textColor:      'text-[#EB1C26]',
//     hex:            '#EB1C26',
//     urgency:        'urgent',
//     description:    'La situazione richiede un intervento rapido per proteggere la struttura dell\'edificio.',
//     recommendation: 'Chiama ora — garantiamo intervento entro 24 ore per situazioni urgenti.',
//   },
//   emergenza: {
//     label:          'Emergenza strutturale',
//     labelShort:     'Emergenza',
//     color:          'bg-red-950',
//     textColor:      'text-red-400',
//     hex:            '#7f1d1d',
//     urgency:        'emergency',
//     description:    'Possibili danni strutturali rilevati. La sicurezza dell\'edificio potrebbe essere compromessa.',
//     recommendation: 'Contattaci immediatamente — sopralluogo gratuito entro oggi.',
//   },
// }

// // ─── Per-factor scoring ───────────────────────────────────────────────────────

// function scoreEta(fascia: FasciaEta): number {
//   return { '0-10': 5, '11-20': 15, '21-30': 28, '30+': 38 }[fascia]
// }

// function scoreProblema(problema: TipoProblema): number {
//   return {
//     nessuno:               0,
//     tegole:               12,
//     infiltrazioni_leggere: 18,
//     infiltrazioni_attive:  30,
//     strutturali:           40,
//   }[problema]
// }

// function scoreDurata(durata: DurataProblema): number {
//   return {
//     non_applicabile: 0,
//     recente:         3,
//     '6-12':          8,
//     oltre_1_anno:   14,
//   }[durata]
// }

// function scoreMateriale(materiale: TipoMateriale): number {
//   return {
//     tegole_coppi: 8,
//     guaina:      12,   // more dependent on maintenance history
//     lamiera:      6,
//     misto:       10,
//   }[materiale]
// }

// function scoreUltimoIntervento(intervento: UltimoIntervento): number {
//   return {
//     recentemente:   0,
//     '1-5_anni':     5,
//     oltre_5_anni:  10,
//     mai:           20,
//   }[intervento]
// }

// function scoreZona(zona: ZonaClimatica): number {
//   return { costiera: 15, alpina: 10, pianura: 0 }[zona]
// }

// // ─── Main calculation function ────────────────────────────────────────────────

// export function calcolaRischio(input: CalcoloInput): CalcoloOutput {
//   const eta            = scoreEta(input.fasciaEta)
//   const problema       = scoreProblema(input.problema)
//   const durata         = scoreDurata(input.durata)
//   const materiale      = scoreMateriale(input.materiale)
//   const ultimoIntervento = scoreUltimoIntervento(input.ultimoIntervento)
//   const zona           = scoreZona(input.zona)

//   let raw = eta + problema + durata + materiale + ultimoIntervento + zona

//   // Hard override: active leak + age > 20 years → minimum score 72
//   const hardOverride =
//     input.problema === 'infiltrazioni_attive' &&
//     (input.fasciaEta === '21-30' || input.fasciaEta === '30+')

//   if (hardOverride && raw < 72) raw = 72

//   // Hard override: structural damage → minimum 86
//   if (input.problema === 'strutturali' && raw < 86) raw = 86

//   const score = Math.min(100, raw)

//   // Determine band
//   let bandKey: string
//   if (score <= 25)      bandKey = 'verde'
//   else if (score <= 45) bandKey = 'giallo'
//   else if (score <= 65) bandKey = 'arancione'
//   else if (score <= 85) bandKey = 'rosso'
//   else                  bandKey = 'emergenza'

//   const band = RISK_BANDS[bandKey]
//   const coeff = COST_COEFFICIENTS[bandKey]

//   // Cost estimate: fixed 60€/m² rate ± 10% range around it — the range
//   // reflects normal quote variance (access, material choice on-site,
//   // etc.), not a different per-band rate. Verde (no work needed) and
//   // Emergenza (requires in-person inspection) never show a price.
//   const baseCost = coeff * input.superficie
//   const estimatedCostMin = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 0.90 / 100) * 100
//   const estimatedCostMax = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 1.10 / 100) * 100

//   return {
//     score,
//     band,
//     estimatedCostMin,
//     estimatedCostMax,
//     isEmergenza: bandKey === 'emergenza',
//     breakdown: {
//       eta,
//       problema,
//       durata,
//       materiale,
//       ultimoIntervento,
//       zona,
//       total: score,
//       hardOverrideApplied: hardOverride || input.problema === 'strutturali',
//     },
//   }
// }

// // ─── Formatter helpers ────────────────────────────────────────────────────────

// export function formatCost(n: number): string {
//   return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
// }

// export function getBandKey(score: number): string {
//   if (score <= 25) return 'verde'
//   if (score <= 45) return 'giallo'
//   if (score <= 65) return 'arancione'
//   if (score <= 85) return 'rosso'
//   return 'emergenza'
// }


// /**
//  * T94 Roof Index™ — Tetto94 Scoring Engine
//  * Pure functions, no side effects, fully testable.
//  * v1.1 — fixed 60€/m² company-wide rate (see FIXED_RATE_PER_SQM below).
//  *         Zone/age/problem/etc. drive the risk score & band only — never
//  *         the price, per management decision.
//  */

// // ─── Types ──────────────────────────────────────────────────────────────────

// export type ZonaClimatica = 'costiera' | 'pianura' | 'alpina'
// export type FasciaEta = '0-10' | '11-20' | '21-30' | '30+'
// export type TipoProblema = 'nessuno' | 'tegole' | 'infiltrazioni_leggere' | 'infiltrazioni_attive' | 'strutturali'
// export type DurataProblema = 'recente' | '6-12' | 'oltre_1_anno' | 'non_applicabile'
// export type TipoMateriale = 'tegole_coppi' | 'guaina' | 'lamiera' | 'misto'
// export type UltimoIntervento = 'mai' | 'oltre_5_anni' | '1-5_anni' | 'recentemente'

// export interface CalcoloInput {
//   zona: ZonaClimatica
//   superficie: number           // m² — free numeric input
//   fasciaEta: FasciaEta
//   problema: TipoProblema
//   durata: DurataProblema
//   materiale: TipoMateriale
//   ultimoIntervento: UltimoIntervento
//   /** Optional, user-typed città/CAP — used only to place this analysis on the
//    *  public "Mappa del Rischio" aggregate map. Never affects the score. */
//   citta?: string
// }

// export interface RiskBand {
//   label: string
//   labelShort: string
//   color: string                // Tailwind bg class
//   textColor: string            // Tailwind text class
//   hex: string                  // Raw hex for SVG/canvas
//   urgency: string              // CTA tone
//   description: string
//   recommendation: string
// }

// export interface CalcoloOutput {
//   score: number                // 0–100
//   band: RiskBand
//   estimatedCostMin: number     // € — 0 for Verde
//   estimatedCostMax: number     // € — 0 for Verde/Emergenza
//   isEmergenza: boolean
//   breakdown: ScoreBreakdown    // per-factor scores for transparency display
// }

// export interface ScoreBreakdown {
//   eta: number
//   problema: number
//   durata: number
//   materiale: number
//   ultimoIntervento: number
//   zona: number
//   total: number
//   hardOverrideApplied: boolean
// }

// // ─── Constants ───────────────────────────────────────────────────────────────

// /**
//  * Base cost coefficient €/m² — fixed company-wide rate, per management
//  * decision. It intentionally does NOT vary with band/zone/risk factors:
//  * those still drive the risk score and color classification below, but
//  * the price itself is always area × 60€/m² (±10% range), for every band
//  * that shows a price. Update this single constant when pricing changes.
//  */
// const FIXED_RATE_PER_SQM = 60

// const COST_COEFFICIENTS: Record<string, number> = {
//   verde:     0,                 // Ottimo — no intervention needed, no price shown
//   giallo:    FIXED_RATE_PER_SQM,
//   arancione: FIXED_RATE_PER_SQM,
//   rosso:     FIXED_RATE_PER_SQM,
//   emergenza: 0,                  // Valutazione in loco — needs on-site inspection
// }

// const RISK_BANDS: Record<string, RiskBand> = {
//   verde: {
//     label:          'Tetto in ottimo stato',
//     labelShort:     'Ottimo',
//     color:          'bg-emerald-500',
//     textColor:      'text-emerald-500',
//     hex:            '#10b981',
//     urgency:        'low',
//     description:    'Il tuo tetto non mostra segni di deterioramento significativo.',
//     recommendation: 'Ti consigliamo un controllo annuale preventivo con ispezione drone gratuita.',
//   },
//   giallo: {
//     label:          'Attenzione consigliata',
//     labelShort:     'Attenzione',
//     color:          'bg-yellow-400',
//     textColor:      'text-yellow-400',
//     hex:            '#facc15',
//     urgency:        'medium',
//     description:    'Sono presenti alcuni segnali da monitorare con attenzione nei prossimi mesi.',
//     recommendation: 'Un sopralluogo tecnico gratuito ci permetterà di valutare la situazione con precisione.',
//   },
//   arancione: {
//     label:          'Intervento necessario',
//     labelShort:     'Necessario',
//     color:          'bg-orange-500',
//     textColor:      'text-orange-500',
//     hex:            '#f97316',
//     urgency:        'high',
//     description:    'Il tuo tetto richiede un intervento a breve termine per evitare danni maggiori.',
//     recommendation: 'Contattaci subito per un sopralluogo gratuito — ogni settimana di attesa aumenta i costi.',
//   },
//   rosso: {
//     label:          'Intervento urgente',
//     labelShort:     'Urgente',
//     color:          'bg-[#EB1C26]',
//     textColor:      'text-[#EB1C26]',
//     hex:            '#EB1C26',
//     urgency:        'urgent',
//     description:    'La situazione richiede un intervento rapido per proteggere la struttura dell\'edificio.',
//     recommendation: 'Chiama ora — garantiamo intervento entro 24 ore per situazioni urgenti.',
//   },
//   emergenza: {
//     label:          'Emergenza strutturale',
//     labelShort:     'Emergenza',
//     color:          'bg-red-950',
//     textColor:      'text-red-400',
//     hex:            '#7f1d1d',
//     urgency:        'emergency',
//     description:    'Possibili danni strutturali rilevati. La sicurezza dell\'edificio potrebbe essere compromessa.',
//     recommendation: 'Contattaci immediatamente — sopralluogo gratuito entro oggi.',
//   },
// }

// // ─── Per-factor scoring ───────────────────────────────────────────────────────

// function scoreEta(fascia: FasciaEta): number {
//   return { '0-10': 5, '11-20': 15, '21-30': 28, '30+': 38 }[fascia]
// }

// function scoreProblema(problema: TipoProblema): number {
//   return {
//     nessuno:               0,
//     tegole:               12,
//     infiltrazioni_leggere: 18,
//     infiltrazioni_attive:  30,
//     strutturali:           40,
//   }[problema]
// }

// function scoreDurata(durata: DurataProblema): number {
//   return {
//     non_applicabile: 0,
//     recente:         3,
//     '6-12':          8,
//     oltre_1_anno:   14,
//   }[durata]
// }

// function scoreMateriale(materiale: TipoMateriale): number {
//   return {
//     tegole_coppi: 8,
//     guaina:      12,   // more dependent on maintenance history
//     lamiera:      6,
//     misto:       10,
//   }[materiale]
// }

// function scoreUltimoIntervento(intervento: UltimoIntervento): number {
//   return {
//     recentemente:   0,
//     '1-5_anni':     5,
//     oltre_5_anni:  10,
//     mai:           20,
//   }[intervento]
// }

// function scoreZona(zona: ZonaClimatica): number {
//   return { costiera: 15, alpina: 10, pianura: 0 }[zona]
// }

// // ─── Main calculation function ────────────────────────────────────────────────

// export function calcolaRischio(input: CalcoloInput): CalcoloOutput {
//   const eta            = scoreEta(input.fasciaEta)
//   const problema       = scoreProblema(input.problema)
//   const durata         = scoreDurata(input.durata)
//   const materiale      = scoreMateriale(input.materiale)
//   const ultimoIntervento = scoreUltimoIntervento(input.ultimoIntervento)
//   const zona           = scoreZona(input.zona)

//   let raw = eta + problema + durata + materiale + ultimoIntervento + zona

//   // Hard override: active leak + age > 20 years → minimum score 72
//   const hardOverride =
//     input.problema === 'infiltrazioni_attive' &&
//     (input.fasciaEta === '21-30' || input.fasciaEta === '30+')

//   if (hardOverride && raw < 72) raw = 72

//   // Hard override: structural damage → minimum 86
//   if (input.problema === 'strutturali' && raw < 86) raw = 86

//   const score = Math.min(100, raw)

//   // Determine band
//   let bandKey: string
//   if (score <= 25)      bandKey = 'verde'
//   else if (score <= 45) bandKey = 'giallo'
//   else if (score <= 65) bandKey = 'arancione'
//   else if (score <= 85) bandKey = 'rosso'
//   else                  bandKey = 'emergenza'

//   const band = RISK_BANDS[bandKey]
//   const coeff = COST_COEFFICIENTS[bandKey]

//   // Cost estimate: fixed 60€/m² rate ± 10% range around it — the range
//   // reflects normal quote variance (access, material choice on-site,
//   // etc.), not a different per-band rate. Verde (no work needed) and
//   // Emergenza (requires in-person inspection) never show a price.
//   const baseCost = coeff * input.superficie
//   const estimatedCostMin = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 0.90 / 100) * 100
//   const estimatedCostMax = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 1.10 / 100) * 100

//   return {
//     score,
//     band,
//     estimatedCostMin,
//     estimatedCostMax,
//     isEmergenza: bandKey === 'emergenza',
//     breakdown: {
//       eta,
//       problema,
//       durata,
//       materiale,
//       ultimoIntervento,
//       zona,
//       total: score,
//       hardOverrideApplied: hardOverride || input.problema === 'strutturali',
//     },
//   }
// }

// // ─── Formatter helpers ────────────────────────────────────────────────────────

// export function formatCost(n: number): string {
//   return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
// }

// export function getBandKey(score: number): string {
//   if (score <= 25) return 'verde'
//   if (score <= 45) return 'giallo'
//   if (score <= 65) return 'arancione'
//   if (score <= 85) return 'rosso'
//   return 'emergenza'
// }


/**
 * T94 Roof Index™ — Tetto94 Scoring Engine
 * Pure functions, no side effects, fully testable.
 * v1.1 — fixed 60€/m² company-wide rate (see FIXED_RATE_PER_SQM below).
 *         Zone/age/problem/etc. drive the risk score & band only — never
 *         the price, per management decision.
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export type ZonaClimatica = 'costiera' | 'pianura' | 'alpina'
export type FasciaEta = '0-10' | '11-20' | '21-30' | '30+'
export type TipoProblema = 'nessuno' | 'tegole' | 'infiltrazioni_leggere' | 'infiltrazioni_attive' | 'strutturali'
export type DurataProblema = 'recente' | '6-12' | 'oltre_1_anno' | 'non_applicabile'
export type TipoMateriale = 'tegole_coppi' | 'guaina' | 'lamiera' | 'misto'
export type UltimoIntervento = 'mai' | 'oltre_5_anni' | '1-5_anni' | 'recentemente'

export interface CalcoloInput {
  zona: ZonaClimatica
  superficie: number           // m² — free numeric input
  fasciaEta: FasciaEta
  problema: TipoProblema
  durata: DurataProblema
  materiale: TipoMateriale
  ultimoIntervento: UltimoIntervento
  /** Optional, user-typed città/CAP — used only to place this analysis on the
   *  public "Mappa del Rischio" aggregate map. Never affects the score. */
  citta?: string
  /** Required lead-capture phone number, collected in the same step as
   *  città (the last step of the quiz). Never affects the score — used only
   *  for the internal callback/lead pipeline, never sent to roof_analyses. */
  telefono?: string
}

export interface RiskBand {
  label: string
  labelShort: string
  color: string                // Tailwind bg class
  textColor: string            // Tailwind text class
  hex: string                  // Raw hex for SVG/canvas
  urgency: string              // CTA tone
  description: string
  recommendation: string
}

export interface CalcoloOutput {
  score: number                // 0–100
  band: RiskBand
  estimatedCostMin: number     // € — 0 for Verde
  estimatedCostMax: number     // € — 0 for Verde/Emergenza
  isEmergenza: boolean
  breakdown: ScoreBreakdown    // per-factor scores for transparency display
}

export interface ScoreBreakdown {
  eta: number
  problema: number
  durata: number
  materiale: number
  ultimoIntervento: number
  zona: number
  total: number
  hardOverrideApplied: boolean
}

// ─── Constants ───────────────────────────────────────────────────────────────

/**
 * Base cost coefficient €/m² — fixed company-wide rate, per management
 * decision. It intentionally does NOT vary with band/zone/risk factors:
 * those still drive the risk score and color classification below, but
 * the price itself is always area × 60€/m² (±10% range), for every band
 * that shows a price. Update this single constant when pricing changes.
 */
const FIXED_RATE_PER_SQM = 60

const COST_COEFFICIENTS: Record<string, number> = {
  verde:     0,                 // Ottimo — no intervention needed, no price shown
  giallo:    FIXED_RATE_PER_SQM,
  arancione: FIXED_RATE_PER_SQM,
  rosso:     FIXED_RATE_PER_SQM,
  emergenza: 0,                  // Valutazione in loco — needs on-site inspection
}

const RISK_BANDS: Record<string, RiskBand> = {
  verde: {
    label:          'Tetto in ottimo stato',
    labelShort:     'Ottimo',
    color:          'bg-emerald-500',
    textColor:      'text-emerald-500',
    hex:            '#10b981',
    urgency:        'low',
    description:    'Il tuo tetto non mostra segni di deterioramento significativo.',
    recommendation: 'Ti consigliamo un controllo annuale preventivo con ispezione drone gratuita.',
  },
  giallo: {
    label:          'Attenzione consigliata',
    labelShort:     'Attenzione',
    color:          'bg-yellow-400',
    textColor:      'text-yellow-400',
    hex:            '#facc15',
    urgency:        'medium',
    description:    'Sono presenti alcuni segnali da monitorare con attenzione nei prossimi mesi.',
    recommendation: 'Un sopralluogo tecnico gratuito ci permetterà di valutare la situazione con precisione.',
  },
  arancione: {
    label:          'Intervento necessario',
    labelShort:     'Necessario',
    color:          'bg-orange-500',
    textColor:      'text-orange-500',
    hex:            '#f97316',
    urgency:        'high',
    description:    'Il tuo tetto richiede un intervento a breve termine per evitare danni maggiori.',
    recommendation: 'Contattaci subito per un sopralluogo gratuito — ogni settimana di attesa aumenta i costi.',
  },
  rosso: {
    label:          'Intervento urgente',
    labelShort:     'Urgente',
    color:          'bg-[#EB1C26]',
    textColor:      'text-[#EB1C26]',
    hex:            '#EB1C26',
    urgency:        'urgent',
    description:    'La situazione richiede un intervento rapido per proteggere la struttura dell\'edificio.',
    recommendation: 'Chiama ora — garantiamo intervento entro 24 ore per situazioni urgenti.',
  },
  emergenza: {
    label:          'Emergenza strutturale',
    labelShort:     'Emergenza',
    color:          'bg-red-950',
    textColor:      'text-red-400',
    hex:            '#7f1d1d',
    urgency:        'emergency',
    description:    'Possibili danni strutturali rilevati. La sicurezza dell\'edificio potrebbe essere compromessa.',
    recommendation: 'Contattaci immediatamente — sopralluogo gratuito entro oggi.',
  },
}

// ─── Per-factor scoring ───────────────────────────────────────────────────────

function scoreEta(fascia: FasciaEta): number {
  return { '0-10': 5, '11-20': 15, '21-30': 28, '30+': 38 }[fascia]
}

function scoreProblema(problema: TipoProblema): number {
  return {
    nessuno:               0,
    tegole:               12,
    infiltrazioni_leggere: 18,
    infiltrazioni_attive:  30,
    strutturali:           40,
  }[problema]
}

function scoreDurata(durata: DurataProblema): number {
  return {
    non_applicabile: 0,
    recente:         3,
    '6-12':          8,
    oltre_1_anno:   14,
  }[durata]
}

function scoreMateriale(materiale: TipoMateriale): number {
  return {
    tegole_coppi: 8,
    guaina:      12,   // more dependent on maintenance history
    lamiera:      6,
    misto:       10,
  }[materiale]
}

function scoreUltimoIntervento(intervento: UltimoIntervento): number {
  return {
    recentemente:   0,
    '1-5_anni':     5,
    oltre_5_anni:  10,
    mai:           20,
  }[intervento]
}

function scoreZona(zona: ZonaClimatica): number {
  return { costiera: 15, alpina: 10, pianura: 0 }[zona]
}

// ─── Main calculation function ────────────────────────────────────────────────

export function calcolaRischio(input: CalcoloInput): CalcoloOutput {
  const eta            = scoreEta(input.fasciaEta)
  const problema       = scoreProblema(input.problema)
  const durata         = scoreDurata(input.durata)
  const materiale      = scoreMateriale(input.materiale)
  const ultimoIntervento = scoreUltimoIntervento(input.ultimoIntervento)
  const zona           = scoreZona(input.zona)

  let raw = eta + problema + durata + materiale + ultimoIntervento + zona

  // Hard override: active leak + age > 20 years → minimum score 72
  const hardOverride =
    input.problema === 'infiltrazioni_attive' &&
    (input.fasciaEta === '21-30' || input.fasciaEta === '30+')

  if (hardOverride && raw < 72) raw = 72

  // Hard override: structural damage → minimum 86
  if (input.problema === 'strutturali' && raw < 86) raw = 86

  const score = Math.min(100, raw)

  // Determine band
  let bandKey: string
  if (score <= 25)      bandKey = 'verde'
  else if (score <= 45) bandKey = 'giallo'
  else if (score <= 65) bandKey = 'arancione'
  else if (score <= 85) bandKey = 'rosso'
  else                  bandKey = 'emergenza'

  const band = RISK_BANDS[bandKey]
  const coeff = COST_COEFFICIENTS[bandKey]

  // Cost estimate: fixed 60€/m² rate ± 10% range around it — the range
  // reflects normal quote variance (access, material choice on-site,
  // etc.), not a different per-band rate. Verde (no work needed) and
  // Emergenza (requires in-person inspection) never show a price.
  const baseCost = coeff * input.superficie
  const estimatedCostMin = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 0.90 / 100) * 100
  const estimatedCostMax = bandKey === 'verde' || bandKey === 'emergenza' ? 0 : Math.round(baseCost * 1.10 / 100) * 100

  return {
    score,
    band,
    estimatedCostMin,
    estimatedCostMax,
    isEmergenza: bandKey === 'emergenza',
    breakdown: {
      eta,
      problema,
      durata,
      materiale,
      ultimoIntervento,
      zona,
      total: score,
      hardOverrideApplied: hardOverride || input.problema === 'strutturali',
    },
  }
}

// ─── Formatter helpers ────────────────────────────────────────────────────────

export function formatCost(n: number): string {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function getBandKey(score: number): string {
  if (score <= 25) return 'verde'
  if (score <= 45) return 'giallo'
  if (score <= 65) return 'arancione'
  if (score <= 85) return 'rosso'
  return 'emergenza'
}
