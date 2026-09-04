// 'use client'

// import { useState, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ArrowRight, ArrowLeft, RotateCcw, Phone, MessageCircle, MapPin } from 'lucide-react'
// import {
//   type CalcoloInput,
//   type CalcoloOutput,
//   type ZonaClimatica,
//   type FasciaEta,
//   type TipoProblema,
//   type DurataProblema,
//   type TipoMateriale,
//   type UltimoIntervento,
//   calcolaRischio,
//   formatCost,
// } from '@/lib/roof-calculator'
// import { trackCTAClick } from '@/lib/gtag'
// import { incrementAnalyzedCount } from '@/lib/roof-index-stats'

// /**
//  * Fire-and-forget internal notification — tells the team a visitor just
//  * completed the quiz, with their answers. Never awaited by the UI: this is
//  * a background side-effect, not part of the user-facing result flow, so a
//  * slow/failed request here must never delay or break the on-screen result.
//  * The server recomputes score/band/cost itself (see the route handler) —
//  * we intentionally send only the raw input, nothing computed.
//  */
// function notifyAnalysisCompleted(input: CalcoloInput) {
//   fetch('/api/notify-analysis', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(input),
//   }).catch(() => {
//     // Swallow errors — best-effort notification, no user-facing impact.
//   })
// }

// // ─── Step definitions ─────────────────────────────────────────────────────────

// type FieldKey = keyof CalcoloInput

// interface Option {
//   value: string
//   label: string
//   sub?: string
// }

// interface Step {
//   id: number
//   field: FieldKey
//   question: string
//   tag: string
//   type: 'choice' | 'number' | 'text'
//   options?: Option[]
//   unit?: string
//   placeholder?: string
//   min?: number
//   max?: number
//   optional?: boolean
//   helperText?: string
// }

// const STEPS: Step[] = [
//   {
//     id: 1,
//     field: 'zona',
//     question: 'In quale zona si trova il tetto?',
//     tag: '01 — ZONA',
//     type: 'choice',
//     options: [
//       { value: 'costiera', label: 'Zona Costiera', sub: 'Venezia, Chioggia, Lido, Jesolo...' },
//       { value: 'alpina',   label: 'Zona Alpina',   sub: 'Belluno, Cadore, montagna...' },
//       { value: 'pianura',  label: 'Zona Pianura',  sub: 'Padova, Verona, Bologna, Treviso...' },
//     ],
//   },
//   {
//     id: 2,
//     field: 'superficie',
//     question: 'Qual è la superficie del tetto?',
//     tag: '02 — SUPERFICIE',
//     type: 'number',
//     unit: 'm²',
//     placeholder: 'es. 120',
//     min: 10,
//     max: 2000,
//   },
//   {
//     id: 3,
//     field: 'fasciaEta',
//     question: 'Quanti anni ha il tetto?',
//     tag: '03 — ETÀ',
//     type: 'choice',
//     options: [
//       { value: '0-10',  label: '0 – 10 anni',  sub: 'Tetto relativamente nuovo' },
//       { value: '11-20', label: '11 – 20 anni', sub: 'Manutenzione ordinaria consigliata' },
//       { value: '21-30', label: '21 – 30 anni', sub: 'Intervento preventivo raccomandato' },
//       { value: '30+',   label: 'Oltre 30 anni', sub: 'Valutazione urgente necessaria' },
//     ],
//   },
//   {
//     id: 4,
//     field: 'problema',
//     question: 'Qual è il problema principale?',
//     tag: '04 — PROBLEMA',
//     type: 'choice',
//     options: [
//       { value: 'nessuno',               label: 'Nessun problema',         sub: 'Solo controllo preventivo' },
//       { value: 'tegole',                label: 'Tegole rotte o spostate', sub: 'Danni visivi alla copertura' },
//       { value: 'infiltrazioni_leggere', label: 'Infiltrazioni leggere',   sub: 'Umidità o macchie occasionali' },
//       { value: 'infiltrazioni_attive',  label: 'Infiltrazioni attive',    sub: 'Acqua che entra attivamente' },
//       { value: 'strutturali',           label: 'Danni strutturali',       sub: 'Deformazioni o cedimenti visibili' },
//     ],
//   },
//   {
//     id: 5,
//     field: 'durata',
//     question: 'Da quanto tempo esiste il problema?',
//     tag: '05 — DURATA',
//     type: 'choice',
//     options: [
//       { value: 'non_applicabile', label: 'Non applicabile',   sub: 'Nessun problema presente' },
//       { value: 'recente',         label: 'Da poco',           sub: 'Comparso nelle ultime settimane' },
//       { value: '6-12',            label: '6 – 12 mesi',       sub: 'Problema in evoluzione' },
//       { value: 'oltre_1_anno',    label: 'Oltre 1 anno',      sub: 'Problema cronico' },
//     ],
//   },
//   {
//     id: 6,
//     field: 'materiale',
//     question: 'Qual è il materiale della copertura?',
//     tag: '06 — MATERIALE',
//     type: 'choice',
//     options: [
//       { value: 'tegole_coppi', label: 'Tegole / Coppi',   sub: 'Copertura in laterizio tradizionale' },
//       { value: 'guaina',       label: 'Guaina',            sub: 'Membrana impermeabilizzante' },
//       { value: 'lamiera',      label: 'Lamiera / Metallo', sub: 'Copertura metallica' },
//       { value: 'misto',        label: 'Misto',             sub: 'Combinazione di materiali' },
//     ],
//   },
//   {
//     id: 7,
//     field: 'ultimoIntervento',
//     question: "Quando è stato l'ultimo intervento?",
//     tag: '07 — STORIA',
//     type: 'choice',
//     options: [
//       { value: 'recentemente',  label: 'Recentemente',     sub: 'Negli ultimi 12 mesi' },
//       { value: '1-5_anni',      label: '1 – 5 anni fa',    sub: 'Manutenzione recente' },
//       { value: 'oltre_5_anni',  label: 'Oltre 5 anni fa',  sub: 'Intervento datato' },
//       { value: 'mai',           label: 'Mai',              sub: 'Nessun intervento registrato' },
//     ],
//   },
//   {
//     id: 8,
//     field: 'citta',
//     question: 'In quale città si trova il tetto?',
//     tag: '08 — LOCALITÀ',
//     type: 'text',
//     placeholder: 'es. Venezia, Chioggia, Roma...',
//     optional: true,
//     helperText: 'Facoltativo — scrivi solo il nome della città o del comune. Usato solo per la Mappa del Rischio pubblica, in forma aggregata e anonima.',
//   },
// ]

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function ProgressBar({ current, total }: { current: number; total: number }) {
//   const pct = ((current) / total) * 100
//   return (
//     <div className="flex items-center gap-4 mb-8 lg:mb-12">
//       <div className="flex-1 h-px bg-[#161616]/10 relative overflow-hidden">
//         {/* Animating scaleX (GPU-composited) instead of width (layout-triggering)
//             avoids forced reflow on every frame — the main cause of jank on mobile. */}
//         <motion.div
//           className="absolute inset-y-0 left-0 w-full bg-[#EB1C26] origin-left"
//           initial={{ scaleX: 0 }}
//           animate={{ scaleX: pct / 100 }}
//           transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         />
//       </div>
//       <span className="text-xs font-bold tracking-[0.3em] text-[#161616]/30 shrink-0 font-mono">
//         {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
//       </span>
//     </div>
//   )
// }

// function RiskGauge({ score, hex }: { score: number; hex: string }) {
//   // SVG arc gauge: radius 80, circumference ~ 502
//   const radius = 80
//   const circumference = 2 * Math.PI * radius
//   const halfCirc = circumference / 2 // semicircle
//   const dashOffset = halfCirc - (score / 100) * halfCirc

//   return (
//     <div className="relative flex items-center justify-center">
//       <svg width="220" height="120" viewBox="0 0 220 120" className="overflow-visible">
//         {/* Track */}
//         <path
//           d="M 20 110 A 90 90 0 0 1 200 110"
//           fill="none"
//           stroke="rgba(22,22,22,0.08)"
//           strokeWidth="8"
//           strokeLinecap="round"
//         />
//         {/* Animated fill */}
//         <motion.path
//           d="M 20 110 A 90 90 0 0 1 200 110"
//           fill="none"
//           stroke={hex}
//           strokeWidth="8"
//           strokeLinecap="round"
//           strokeDasharray={`${Math.PI * 90}`}
//           initial={{ strokeDashoffset: Math.PI * 90 }}
//           animate={{ strokeDashoffset: Math.PI * 90 * (1 - score / 100) }}
//           transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
//         />
//         {/* Tick marks */}
//         {[0, 25, 50, 75, 100].map((tick) => {
//           const angle = -180 + (tick / 100) * 180
//           const rad = (angle * Math.PI) / 180
//           const cx = 110 + 90 * Math.cos(rad)
//           const cy = 110 + 90 * Math.sin(rad)
//           return (
//             <circle key={tick} cx={cx} cy={cy} r={2} fill="rgba(22,22,22,0.18)" />
//           )
//         })}
//       </svg>
//       {/* Score number */}
//       <div className="absolute bottom-0 flex flex-col items-center">
//         <motion.span
//           className="font-display text-[3.5rem] leading-none font-black"
//           style={{ color: hex }}
//           initial={{ opacity: 0, scale: 0.5 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
//         >
//           {score}
//         </motion.span>
//         <span className="text-[10px] tracking-[0.35em] text-[#161616]/30 font-bold uppercase">/ 100</span>
//       </div>
//     </div>
//   )
// }

// function ResultPanel({ output, onReset }: { output: CalcoloOutput; onReset: () => void }) {
//   const { score, band, estimatedCostMin, estimatedCostMax, isEmergenza, breakdown } = output

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full"
//     >
//       {/* Header */}
//       <div className="mb-8">
//         <motion.span
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-xs font-bold tracking-[0.35em] text-[#161616]/30 uppercase"
//         >
//           T94 Roof Index™
//         </motion.span>
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none mt-2 text-[#161616]"
//         >
//           ANALISI<br />COMPLETATA
//         </motion.h2>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8">

//         {/* Left: Gauge + band */}
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           className="flex flex-col items-center gap-6 border border-[#161616]/10 bg-white p-8 shadow-[0_2px_24px_rgba(22,22,22,0.05)]"
//         >
//           <RiskGauge score={score} hex={band.hex} />

//           <div className="text-center">
//             <div
//               className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-3"
//               style={{ backgroundColor: band.hex, color: '#fff' }}
//             >
//               {band.labelShort}
//             </div>
//             <p className="font-display text-xl text-[#161616]">{band.label}</p>
//             <p className="text-sm text-[#494949] mt-2 leading-relaxed max-w-xs mx-auto">
//               {band.description}
//             </p>
//           </div>

//           {/* Score breakdown — collapsible mini bars */}
//           <div className="w-full space-y-2 pt-4 border-t border-[#161616]/10">
//             <p className="text-[10px] uppercase tracking-[0.3em] text-[#161616]/35 mb-3">Fattori di rischio</p>
//             {[
//               { label: 'Età copertura', value: breakdown.eta, max: 38 },
//               { label: 'Tipo problema', value: breakdown.problema, max: 40 },
//               { label: 'Durata problema', value: breakdown.durata, max: 14 },
//               { label: 'Materiale', value: breakdown.materiale, max: 12 },
//               { label: 'Storico interventi', value: breakdown.ultimoIntervento, max: 20 },
//               { label: 'Zona climatica', value: breakdown.zona, max: 15 },
//             ].map((item, i) => (
//               <div key={item.label} className="flex items-center gap-3">
//                 <span className="text-[10px] text-[#161616]/40 w-32 shrink-0">{item.label}</span>
//                 <div className="flex-1 h-px bg-[#161616]/10 relative">
//                   {/* scaleX instead of width: 6 bars animate at once here, and
//                       width animation forces layout recalc every frame — scaleX
//                       is GPU-composited and was the main source of jank when the
//                       result panel appears, especially on mobile. */}
//                   <motion.div
//                     className="absolute inset-y-0 left-0 w-full origin-left"
//                     style={{ backgroundColor: band.hex }}
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: item.value / item.max }}
//                     transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
//                   />
//                 </div>
//                 <span className="text-[10px] font-mono text-[#161616]/45 w-6 text-right">{item.value}</span>
//               </div>
//             ))}
//             {breakdown.hardOverrideApplied && (
//               <p className="text-[10px] text-[#EB1C26]/80 pt-1">
//                 * Override applicato: combinazione critica rilevata
//               </p>
//             )}
//           </div>
//         </motion.div>

//         {/* Right: Cost + recommendation + CTA */}
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//           className="flex flex-col gap-6"
//         >
//           {/* Cost estimate */}
//           <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
//             <p className="text-xs uppercase tracking-[0.3em] text-[#161616]/35 mb-4">Stima intervento</p>
//             {score <= 25 ? (
//               <div>
//                 <p className="font-display text-xl text-[#161616]">Solo ispezione annuale</p>
//                 <p className="text-sm text-[#494949] mt-1">Nessun intervento urgente necessario</p>
//               </div>
//             ) : isEmergenza ? (
//               <div>
//                 <p className="font-display text-xl text-[#161616]">Valutazione in loco necessaria</p>
//                 <p className="text-sm text-[#494949] mt-1">La complessità richiede un sopralluogo immediato</p>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex items-baseline gap-3">
//                   <span className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-[#161616]">
//                     {formatCost(estimatedCostMin)}
//                   </span>
//                   <span className="text-[#161616]/30">—</span>
//                   <span className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-[#161616]">
//                     {formatCost(estimatedCostMax)}
//                   </span>
//                 </div>
//                 <p className="text-xs text-[#161616]/40 mt-2">
//                   Stima orientativa basata su {output.estimatedCostMin > 0 ? '60€/m²' : '—'}. Preventivo esatto gratuito entro 24h.
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Recommendation */}
//           <div className="border-l-2 border-[#EB1C26] bg-[#EB1C26]/[0.04] pl-5 py-3 pr-4">
//             <p className="text-sm text-[#161616]/80 leading-relaxed">{band.recommendation}</p>
//           </div>

//           {/* Disclaimer */}
//           <p className="text-xs text-[#161616]/35 leading-relaxed">
//             Il T94 Roof Index™ è uno strumento orientativo basato su parametri statistici. 
//             La valutazione definitiva richiede un sopralluogo tecnico in loco.
//           </p>

//           {/* CTAs */}
//           <div className="flex flex-col gap-3 mt-auto">
//             <a
//               href={`/contatti?risk=${score}&band=${band.labelShort}`}
//               onClick={() => trackCTAClick('hero_desktop', '/contatti')}
//               className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.2)] hover:bg-[#161616] transition-colors duration-300"
//             >
//               Richiedi Sopralluogo Gratuito
//               <ArrowRight className="size-4" />
//             </a>
//             <div className="grid grid-cols-2 gap-3">
//               <a
//                 href="tel:+393516519363"
//                 className="flex items-center justify-center gap-2 border border-[#161616]/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#161616]/60 hover:text-[#161616] hover:border-[#161616]/35 transition-colors"
//               >
//                 <Phone className="size-3.5" />
//                 Chiama ora
//               </a>
//               <a
//                 href="https://wa.me/393516519363"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 border border-[#161616]/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#161616]/60 hover:text-[#161616] hover:border-[#161616]/35 transition-colors"
//               >
//                 <MessageCircle className="size-3.5" />
//                 WhatsApp
//               </a>
//             </div>
//           </div>

//           {/* Secondary links: reset + map funnel. The map link closes the
//               loop — this visitor's (anonymized) answer just fed the public
//               aggregate map, so we offer them the chance to see it. */}
//           <div className="flex flex-wrap items-center gap-4">
//             <button
//               onClick={onReset}
//               className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
//             >
//               <RotateCcw className="size-3" />
//               Ricomincia analisi
//             </button>
//             <a
//               href="/mappa-rischio"
//               onClick={() => trackCTAClick('quiz_result_map_link', '/mappa-rischio')}
//               className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
//             >
//               <MapPin className="size-3" />
//               Vedi la Mappa del Rischio nazionale
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// // ─── Main Calculator �����─────────────────────────────────────────────────────────

// const TOTAL_STEPS = STEPS.length

// const slideVariants = {
//   enter: (dir: number) => ({
//     x: dir > 0 ? 80 : -80,
//     opacity: 0,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//   },
//   exit: (dir: number) => ({
//     x: dir > 0 ? -80 : 80,
//     opacity: 0,
//   }),
// }

// export default function RoofCalculator() {
//   const [currentStep, setCurrentStep] = useState(0)
//   const [direction, setDirection] = useState(1)
//   const [answers, setAnswers] = useState<Partial<CalcoloInput>>({})
//   const [numberInput, setNumberInput] = useState('')
//   const [numberError, setNumberError] = useState('')
//   const [textInput, setTextInput] = useState('')
//   const [result, setResult] = useState<CalcoloOutput | null>(null)

//   const step = STEPS[currentStep]

//   const goNext = useCallback(() => {
//     if (currentStep < TOTAL_STEPS - 1) {
//       setDirection(1)
//       setCurrentStep(s => s + 1)
//       setNumberInput('')
//       setNumberError('')
//       setTextInput('')
//     } else {
//       // Calculate result
//       const input = answers as CalcoloInput
//       setResult(calcolaRischio(input))
//       incrementAnalyzedCount()
//       notifyAnalysisCompleted(input)
//     }
//   }, [currentStep, answers])

//   const goBack = useCallback(() => {
//     if (currentStep > 0) {
//       setDirection(-1)
//       setCurrentStep(s => s - 1)
//       setNumberError('')
//     }
//   }, [currentStep])

//   const selectChoice = useCallback((field: FieldKey, value: string) => {
//     setAnswers(prev => ({ ...prev, [field]: value }))
//     // Auto-advance after a short delay for choice steps
//     setTimeout(() => {
//       setDirection(1)
//       if (currentStep < TOTAL_STEPS - 1) {
//         setCurrentStep(s => s + 1)
//         setNumberInput('')
//         setNumberError('')
//         setTextInput('')
//       } else {
//         const input = { ...answers, [field]: value } as CalcoloInput
//         setResult(calcolaRischio(input))
//         incrementAnalyzedCount()
//         notifyAnalysisCompleted(input)
//       }
//     }, 280)
//   }, [currentStep, answers])

//   const handleNumberNext = useCallback(() => {
//     const val = parseFloat(numberInput)
//     if (!numberInput || isNaN(val) || val < (step.min ?? 1)) {
//       setNumberError(`Inserisci un valore valido (minimo ${step.min ?? 1} m²)`)
//       return
//     }
//     if (step.max && val > step.max) {
//       setNumberError(`Valore massimo: ${step.max} m²`)
//       return
//     }
//     setAnswers(prev => ({ ...prev, [step.field]: val }))
//     setNumberError('')
//     goNext()
//   }, [numberInput, step, goNext])

//   // Text steps (currently just "città") build the final input explicitly
//   // instead of calling goNext(), which would read the `answers` closure
//   // before this step's own setAnswers() has flushed — the same reason
//   // selectChoice above does the same thing rather than reusing goNext().
//   const handleTextNext = useCallback((skip: boolean) => {
//     const value = skip ? undefined : (textInput.trim() || undefined)
//     setAnswers(prev => ({ ...prev, [step.field]: value }))
//     setDirection(1)
//     if (currentStep < TOTAL_STEPS - 1) {
//       setCurrentStep(s => s + 1)
//       setTextInput('')
//     } else {
//       const input = { ...answers, [step.field]: value } as CalcoloInput
//       setResult(calcolaRischio(input))
//       incrementAnalyzedCount()
//       notifyAnalysisCompleted(input)
//     }
//   }, [textInput, step, currentStep, answers])

//   const reset = useCallback(() => {
//     setCurrentStep(0)
//     setAnswers({})
//     setNumberInput('')
//     setNumberError('')
//     setResult(null)
//     setDirection(1)
//   }, [])

//   const currentAnswer = answers[step?.field]

//   return (
//     <div className="min-h-screen bg-white flex flex-col">

//       {/* Top bar */}
//       <div className="border-b border-[#161616]/8 px-6 lg:px-12 py-5 flex items-center justify-between">
//         <a href="/" className="text-xs font-bold tracking-[0.3em] text-[#161616]/35 hover:text-[#161616]/70 transition-colors uppercase">
//           ← Tetto94
//         </a>
//         {!result && (
//           <span className="text-xs tracking-[0.3em] text-[#161616]/25 uppercase font-mono">
//             T94 Roof Index™
//           </span>
//         )}
//       </div>

//       <div className="flex-1 flex flex-col lg:flex-row">

//         {/* Left column — fixed brand panel */}
//         <div className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-[#161616]/8 bg-[#FAFAF9] p-10 xl:p-14">
//           <div className="flex-1">
//             <motion.div
//               key={result ? 'result' : currentStep}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               {result ? (
//                 <>
//                   <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">Analisi completata</span>
//                   <h2 className="font-display text-4xl text-[#161616] leading-none mt-3">
//                     ROOF<br />RISK<br />INDEX™
//                   </h2>
//                   <div className="mt-6 h-px bg-[#161616]/10" />
//                   <p className="mt-6 text-sm text-[#494949] leading-relaxed">
//                     Il tuo indice di rischio personale, calcolato su 7 parametri tecnici.
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">Valutazione gratuita</span>
//                   <h2 className="font-display text-4xl text-[#161616] leading-none mt-3">
//                     ROOF<br />RISK<br />INDEX™
//                   </h2>
//                   <div className="mt-6 h-px bg-[#161616]/10" />
//                   <p className="mt-6 text-sm text-[#494949] leading-relaxed">
//                     7 domande per una diagnosi precisa del tuo tetto e una stima realistica dei costi.
//                   </p>
//                   <div className="mt-8 space-y-3">
//                     {STEPS.map((s, i) => (
//                       <div key={s.id} className="flex items-center gap-3">
//                         <div className={`size-1.5 rounded-full transition-colors duration-300 ${
//                           i < currentStep ? 'bg-[#EB1C26]' :
//                           i === currentStep ? 'bg-[#161616]' :
//                           'bg-[#161616]/15'
//                         }`} />
//                         <span className={`text-xs transition-colors duration-300 ${
//                           i === currentStep ? 'text-[#161616] font-bold' :
//                           i < currentStep ? 'text-[#161616]/45' :
//                           'text-[#161616]/25'
//                         }`}>
//                           {s.tag.split('— ')[1]}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </>
//               )}
//             </motion.div>
//           </div>

//           <div className="text-[10px] text-[#161616]/30 leading-relaxed">
//             Tetto94 dal 1994<br />
//             Garanzia scritta 10 anni
//           </div>
//         </div>

//         {/* Right column — main content */}
//         <div className="flex-1 flex flex-col px-6 py-8 lg:px-14 lg:py-12 xl:px-20 xl:py-16 max-w-3xl">

//           {result ? (
//             <ResultPanel output={result} onReset={reset} />
//           ) : (
//             <>
//               <ProgressBar current={currentStep + 1} total={TOTAL_STEPS} />

//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={currentStep}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                   transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//                   className="flex-1"
//                 >
//                   {/* Step tag */}
//                   <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">
//                     {step.tag}
//                   </span>

//                   {/* Question */}
//                   <h3 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-tight text-[#161616] mt-3 mb-10">
//                     {step.question}
//                   </h3>

//                   {/* Choices */}
//                   {step.type === 'choice' && step.options && (
//                     <div className="flex flex-col gap-3">
//                       {step.options.map((opt, i) => {
//                         const isSelected = currentAnswer === opt.value
//                         return (
//                           <motion.button
//                             key={opt.value}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.07, duration: 0.4 }}
//                             onClick={() => selectChoice(step.field, opt.value)}
//                             className={`group flex items-center justify-between gap-4 border px-6 py-5 text-left transition-all duration-200
//                               ${isSelected
//                                 ? 'border-[#EB1C26] bg-[#EB1C26]/[0.06]'
//                                 : 'border-[#161616]/10 hover:border-[#161616]/25 bg-white hover:bg-[#FAFAF9]'
//                               }`}
//                           >
//                             <div className="flex flex-col gap-0.5">
//                               <span className={`font-display text-lg leading-snug transition-colors ${isSelected ? 'text-[#161616]' : 'text-[#161616]/80 group-hover:text-[#161616]'}`}>
//                                 {opt.label}
//                               </span>
//                               {opt.sub && (
//                                 <span className="text-xs text-[#161616]/40">{opt.sub}</span>
//                               )}
//                             </div>
//                             <div className={`size-5 shrink-0 border rounded-full flex items-center justify-center transition-all ${
//                               isSelected ? 'border-[#EB1C26] bg-[#EB1C26]' : 'border-[#161616]/20 group-hover:border-[#161616]/40'
//                             }`}>
//                               {isSelected && (
//                                 <motion.div
//                                   initial={{ scale: 0 }}
//                                   animate={{ scale: 1 }}
//                                   className="size-2 rounded-full bg-white"
//                                 />
//                               )}
//                             </div>
//                           </motion.button>
//                         )
//                       })}
//                     </div>
//                   )}

//                   {/* Number input */}
//                   {step.type === 'number' && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 }}
//                       className="flex flex-col gap-4"
//                     >
//                       <div className="relative flex items-center border border-[#161616]/15 bg-white focus-within:border-[#EB1C26] transition-colors">
//                         <input
//                           type="number"
//                           inputMode="numeric"
//                           placeholder={step.placeholder}
//                           value={numberInput}
//                           onChange={e => { setNumberInput(e.target.value); setNumberError('') }}
//                           onKeyDown={e => e.key === 'Enter' && handleNumberNext()}
//                           autoFocus
//                           className="flex-1 bg-transparent px-6 py-5 text-2xl font-display text-[#161616] placeholder:text-[#161616]/25 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
//                         />
//                         {step.unit && (
//                           <span className="px-6 text-lg text-[#161616]/35 font-display border-l border-[#161616]/10">
//                             {step.unit}
//                           </span>
//                         )}
//                       </div>
//                       {numberError && (
//                         <p className="text-xs text-[#EB1C26]">{numberError}</p>
//                       )}
//                       <button
//                         onClick={handleNumberNext}
//                         className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#161616] transition-colors self-start"
//                       >
//                         Continua
//                         <ArrowRight className="size-4" />
//                       </button>
//                     </motion.div>
//                   )}

//                   {/* Text input (optional — currently just "città") */}
//                   {step.type === 'text' && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.1 }}
//                       className="flex flex-col gap-4"
//                     >
//                       <div className="relative flex items-center border border-[#161616]/15 bg-white focus-within:border-[#EB1C26] transition-colors">
//                         <input
//                           type="text"
//                           placeholder={step.placeholder}
//                           value={textInput}
//                           onChange={e => setTextInput(e.target.value)}
//                           onKeyDown={e => e.key === 'Enter' && handleTextNext(false)}
//                           autoFocus
//                           className="flex-1 bg-transparent px-6 py-5 text-2xl font-display text-[#161616] placeholder:text-[#161616]/25 outline-none"
//                         />
//                       </div>
//                       {step.helperText && (
//                         <p className="text-xs text-[#161616]/40">{step.helperText}</p>
//                       )}
//                       <div className="flex items-center gap-4">
//                         <button
//                           onClick={() => handleTextNext(false)}
//                           className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#161616] transition-colors"
//                         >
//                           Continua
//                           <ArrowRight className="size-4" />
//                         </button>
//                         {step.optional && (
//                           <button
//                             onClick={() => handleTextNext(true)}
//                             className="text-xs text-[#161616]/40 hover:text-[#161616]/70 transition-colors underline"
//                           >
//                             Salta, preferisco non dirlo
//                           </button>
//                         )}
//                       </div>
//                     </motion.div>
//                   )}
//                 </motion.div>
//               </AnimatePresence>

//               {/* Navigation */}
//               {currentStep > 0 && (
//                 <div className="mt-8 pt-6 border-t border-[#161616]/8">
//                   <button
//                     onClick={goBack}
//                     className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
//                   >
//                     <ArrowLeft className="size-3.5" />
//                     Domanda precedente
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, RotateCcw, Phone, MessageCircle, MapPin, Lock, Loader2, CheckCircle2 } from 'lucide-react'
import {
  type CalcoloInput,
  type CalcoloOutput,
  type ZonaClimatica,
  type FasciaEta,
  type TipoProblema,
  type DurataProblema,
  type TipoMateriale,
  type UltimoIntervento,
  calcolaRischio,
} from '@/lib/roof-calculator'
import { trackCTAClick } from '@/lib/gtag'
import { incrementAnalyzedCount } from '@/lib/roof-index-stats'
import { italianPhoneSchema } from '@/lib/analysis-input-schema'

/**
 * Fire-and-forget internal notification — tells the team a visitor just
 * completed the quiz, with their answers. Never awaited by the UI: this is
 * a background side-effect, not part of the user-facing result flow, so a
 * slow/failed request here must never delay or break the on-screen result.
 * The server recomputes score/band/cost itself (see the route handler) —
 * we intentionally send only the raw input, nothing computed.
 */
function notifyAnalysisCompleted(input: CalcoloInput) {
  fetch('/api/notify-analysis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }).catch(() => {
    // Swallow errors — best-effort notification, no user-facing impact.
  })
}

// ─── Step definitions ─────────────────────────────────────────────────────────

type FieldKey = keyof CalcoloInput

interface Option {
  value: string
  label: string
  sub?: string
}

interface Step {
  id: number
  field: FieldKey
  question: string
  tag: string
  type: 'choice' | 'number' | 'text'
  options?: Option[]
  unit?: string
  placeholder?: string
  min?: number
  max?: number
  optional?: boolean
  helperText?: string
}

const STEPS: Step[] = [
  {
    id: 1,
    field: 'zona',
    question: 'In quale zona si trova il tetto?',
    tag: '01 — ZONA',
    type: 'choice',
    options: [
      { value: 'costiera', label: 'Zona Costiera', sub: 'Venezia, Chioggia, Lido, Jesolo...' },
      { value: 'alpina',   label: 'Zona Alpina',   sub: 'Belluno, Cadore, montagna...' },
      { value: 'pianura',  label: 'Zona Pianura',  sub: 'Padova, Verona, Bologna, Treviso...' },
    ],
  },
  {
    id: 2,
    field: 'superficie',
    question: 'Qual è la superficie del tetto?',
    tag: '02 — SUPERFICIE',
    type: 'number',
    unit: 'm²',
    placeholder: 'es. 120',
    min: 10,
    max: 2000,
  },
  {
    id: 3,
    field: 'fasciaEta',
    question: 'Quanti anni ha il tetto?',
    tag: '03 — ETÀ',
    type: 'choice',
    options: [
      { value: '0-10',  label: '0 – 10 anni',  sub: 'Tetto relativamente nuovo' },
      { value: '11-20', label: '11 – 20 anni', sub: 'Manutenzione ordinaria consigliata' },
      { value: '21-30', label: '21 – 30 anni', sub: 'Intervento preventivo raccomandato' },
      { value: '30+',   label: 'Oltre 30 anni', sub: 'Valutazione urgente necessaria' },
    ],
  },
  {
    id: 4,
    field: 'problema',
    question: 'Qual è il problema principale?',
    tag: '04 — PROBLEMA',
    type: 'choice',
    options: [
      { value: 'nessuno',               label: 'Nessun problema',         sub: 'Solo controllo preventivo' },
      { value: 'tegole',                label: 'Tegole rotte o spostate', sub: 'Danni visivi alla copertura' },
      { value: 'infiltrazioni_leggere', label: 'Infiltrazioni leggere',   sub: 'Umidità o macchie occasionali' },
      { value: 'infiltrazioni_attive',  label: 'Infiltrazioni attive',    sub: 'Acqua che entra attivamente' },
      { value: 'strutturali',           label: 'Danni strutturali',       sub: 'Deformazioni o cedimenti visibili' },
    ],
  },
  {
    id: 5,
    field: 'durata',
    question: 'Da quanto tempo esiste il problema?',
    tag: '05 — DURATA',
    type: 'choice',
    options: [
      { value: 'non_applicabile', label: 'Non applicabile',   sub: 'Nessun problema presente' },
      { value: 'recente',         label: 'Da poco',           sub: 'Comparso nelle ultime settimane' },
      { value: '6-12',            label: '6 – 12 mesi',       sub: 'Problema in evoluzione' },
      { value: 'oltre_1_anno',    label: 'Oltre 1 anno',      sub: 'Problema cronico' },
    ],
  },
  {
    id: 6,
    field: 'materiale',
    question: 'Qual è il materiale della copertura?',
    tag: '06 — MATERIALE',
    type: 'choice',
    options: [
      { value: 'tegole_coppi', label: 'Tegole / Coppi',   sub: 'Copertura in laterizio tradizionale' },
      { value: 'guaina',       label: 'Guaina',            sub: 'Membrana impermeabilizzante' },
      { value: 'lamiera',      label: 'Lamiera / Metallo', sub: 'Copertura metallica' },
      { value: 'misto',        label: 'Misto',             sub: 'Combinazione di materiali' },
    ],
  },
  {
    id: 7,
    field: 'ultimoIntervento',
    question: "Quando è stato l'ultimo intervento?",
    tag: '07 — STORIA',
    type: 'choice',
    options: [
      { value: 'recentemente',  label: 'Recentemente',     sub: 'Negli ultimi 12 mesi' },
      { value: '1-5_anni',      label: '1 – 5 anni fa',    sub: 'Manutenzione recente' },
      { value: 'oltre_5_anni',  label: 'Oltre 5 anni fa',  sub: 'Intervento datato' },
      { value: 'mai',           label: 'Mai',              sub: 'Nessun intervento registrato' },
    ],
  },
  {
    id: 8,
    field: 'citta',
    question: 'In quale città si trova il tetto?',
    tag: '08 — LOCALITÀ',
    type: 'text',
    placeholder: 'es. Venezia, Chioggia, Roma...',
    optional: true,
    helperText: 'Facoltativo — scrivi solo il nome della città o del comune. Usato solo per la Mappa del Rischio pubblica, in forma aggregata e anonima.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current) / total) * 100
  return (
    <div className="flex items-center gap-4 mb-8 lg:mb-12">
      <div className="flex-1 h-px bg-[#161616]/10 relative overflow-hidden">
        {/* Animating scaleX (GPU-composited) instead of width (layout-triggering)
            avoids forced reflow on every frame — the main cause of jank on mobile. */}
        <motion.div
          className="absolute inset-y-0 left-0 w-full bg-[#EB1C26] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: pct / 100 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="text-xs font-bold tracking-[0.3em] text-[#161616]/30 shrink-0 font-mono">
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}

function RiskGauge({ score, hex }: { score: number; hex: string }) {
  // SVG arc gauge: radius 80, circumference ~ 502
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const halfCirc = circumference / 2 // semicircle
  const dashOffset = halfCirc - (score / 100) * halfCirc

  return (
    <div className="relative flex items-center justify-center">
      <svg width="220" height="120" viewBox="0 0 220 120" className="overflow-visible">
        {/* Track */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="rgba(22,22,22,0.08)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Animated fill */}
        <motion.path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke={hex}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${Math.PI * 90}`}
          initial={{ strokeDashoffset: Math.PI * 90 }}
          animate={{ strokeDashoffset: Math.PI * 90 * (1 - score / 100) }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = -180 + (tick / 100) * 180
          const rad = (angle * Math.PI) / 180
          const cx = 110 + 90 * Math.cos(rad)
          const cy = 110 + 90 * Math.sin(rad)
          return (
            <circle key={tick} cx={cx} cy={cy} r={2} fill="rgba(22,22,22,0.18)" />
          )
        })}
      </svg>
      {/* Score number */}
      <div className="absolute bottom-0 flex flex-col items-center">
        <motion.span
          className="font-display text-[3.5rem] leading-none font-black"
          style={{ color: hex }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {score}
        </motion.span>
        <span className="text-[10px] tracking-[0.35em] text-[#161616]/30 font-bold uppercase">/ 100</span>
      </div>
    </div>
  )
}

/**
 * Sends the visitor's phone number + quiz answers to the lead-capture route.
 * Unlike notifyAnalysisCompleted, this IS awaited by the caller (the button
 * needs to show a pending/success/error state) — but the request itself
 * carries no computed price, only raw answers; the server recomputes score/
 * band/cost itself, exactly like notify-analysis does.
 */
async function submitUnlockOffer(input: CalcoloInput, telefono: string) {
  const res = await fetch('/api/unlock-offer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...input, telefono }),
  })
  if (!res.ok) {
    throw new Error('unlock-offer request failed')
  }
}

/**
 * Replaces the raw price range in the result panel. The T94 Roof Index™
 * result must never display an actual estimated cost in the UI, under any
 * circumstance — the "best price in Italy" is only ever communicated by a
 * human callback. This card shows a blurred, non-numeric teaser and asks
 * for a phone number to "unlock" that offer; submitting never reveals a
 * number on screen, it just confirms the team will call back.
 */
function OfferUnlockCard({ input }: { input: CalcoloInput }) {
  const [stage, setStage] = useState<'teaser' | 'form' | 'success'>('teaser')
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = useCallback(async () => {
    const parsed = italianPhoneSchema.safeParse(phone)
    if (!parsed.success) {
      setPhoneError(parsed.error.issues[0]?.message ?? 'Numero di telefono non valido.')
      return
    }
    setPhoneError('')
    setSubmitting(true)
    try {
      await submitUnlockOffer(input, parsed.data)
      trackCTAClick('roof_index_unlock_offer')
      setStage('success')
    } catch {
      setPhoneError('Si è verificato un errore. Riprova o chiamaci direttamente.')
    } finally {
      setSubmitting(false)
    }
  }, [phone, input])

  if (stage === 'success') {
    return (
      <div className="flex items-start gap-3">
        <CheckCircle2 className="size-5 text-[#EB1C26] shrink-0 mt-0.5" />
        <div>
          <p className="font-display text-lg text-[#161616] leading-tight">Richiesta ricevuta</p>
          <p className="text-sm text-[#494949] mt-1.5 leading-relaxed">
            Ti richiamiamo entro 24h al numero indicato con la tua offerta migliore, senza impegno.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Blurred, non-numeric teaser — never the real estimated cost */}
      <div className="relative mb-1 select-none" aria-hidden="true">
        <div className="flex items-baseline gap-3 blur-[6px] pointer-events-none">
          <span className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-[#161616]">€ ••••</span>
          <span className="text-[#161616]/30">—</span>
          <span className="font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-none text-[#161616]">€ ••••</span>
        </div>
        <div className="absolute inset-0 flex items-center gap-2">
          <Lock className="size-4 text-[#EB1C26] shrink-0" />
          <p className="text-sm font-bold text-[#161616]">Il prezzo più competitivo in Italia è pronto</p>
        </div>
      </div>

      <p className="text-xs text-[#161616]/50 mt-3 leading-relaxed">
        Abbiamo calcolato l&apos;offerta migliore per il tuo profilo. Lascia il tuo numero per sbloccarla — ti
        richiamiamo entro 24h, senza impegno.
      </p>

      <AnimatePresence mode="wait">
        {stage === 'teaser' ? (
          <motion.button
            key="cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setStage('form')}
            className="mt-4 flex w-full items-center justify-center gap-2 bg-[#EB1C26] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.2)] hover:bg-[#161616] transition-colors duration-300"
          >
            Sblocca la mia offerta migliore
            <ArrowRight className="size-4" />
          </motion.button>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (phoneError) setPhoneError('')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
                placeholder="Il tuo numero di telefono"
                disabled={submitting}
                className="flex-1 border border-[#161616]/15 bg-white px-4 py-3.5 text-sm text-[#161616] placeholder:text-[#161616]/35 focus:outline-none focus:border-[#EB1C26] transition-colors disabled:opacity-60"
              />
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.2)] hover:bg-[#161616] transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
              >
                {submitting ? <Loader2 className="size-4 animate-spin" /> : <Lock className="size-4" />}
                {submitting ? 'Invio...' : 'Sblocca'}
              </button>
            </div>
            {phoneError && <p className="text-xs text-[#EB1C26] mt-2">{phoneError}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ResultPanel({ output, input, onReset }: { output: CalcoloOutput; input: CalcoloInput; onReset: () => void }) {
  const { score, band, isEmergenza, breakdown } = output

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xs font-bold tracking-[0.35em] text-[#161616]/30 uppercase"
        >
          T94 Roof Index™
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none mt-2 text-[#161616]"
        >
          ANALISI<br />COMPLETATA
        </motion.h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Left: Gauge + band */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 border border-[#161616]/10 bg-white p-8 shadow-[0_2px_24px_rgba(22,22,22,0.05)]"
        >
          <RiskGauge score={score} hex={band.hex} />

          <div className="text-center">
            <div
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-3"
              style={{ backgroundColor: band.hex, color: '#fff' }}
            >
              {band.labelShort}
            </div>
            <p className="font-display text-xl text-[#161616]">{band.label}</p>
            <p className="text-sm text-[#494949] mt-2 leading-relaxed max-w-xs mx-auto">
              {band.description}
            </p>
          </div>

          {/* Score breakdown — collapsible mini bars */}
          <div className="w-full space-y-2 pt-4 border-t border-[#161616]/10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#161616]/35 mb-3">Fattori di rischio</p>
            {[
              { label: 'Età copertura', value: breakdown.eta, max: 38 },
              { label: 'Tipo problema', value: breakdown.problema, max: 40 },
              { label: 'Durata problema', value: breakdown.durata, max: 14 },
              { label: 'Materiale', value: breakdown.materiale, max: 12 },
              { label: 'Storico interventi', value: breakdown.ultimoIntervento, max: 20 },
              { label: 'Zona climatica', value: breakdown.zona, max: 15 },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-[10px] text-[#161616]/40 w-32 shrink-0">{item.label}</span>
                <div className="flex-1 h-px bg-[#161616]/10 relative">
                  {/* scaleX instead of width: 6 bars animate at once here, and
                      width animation forces layout recalc every frame — scaleX
                      is GPU-composited and was the main source of jank when the
                      result panel appears, especially on mobile. */}
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full origin-left"
                    style={{ backgroundColor: band.hex }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: item.value / item.max }}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-[10px] font-mono text-[#161616]/45 w-6 text-right">{item.value}</span>
              </div>
            ))}
            {breakdown.hardOverrideApplied && (
              <p className="text-[10px] text-[#EB1C26]/80 pt-1">
                * Override applicato: combinazione critica rilevata
              </p>
            )}
          </div>
        </motion.div>

        {/* Right: Cost + recommendation + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Cost estimate */}
          <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#161616]/35 mb-4">Stima intervento</p>
            {score <= 25 ? (
              <div>
                <p className="font-display text-xl text-[#161616]">Solo ispezione annuale</p>
                <p className="text-sm text-[#494949] mt-1">Nessun intervento urgente necessario</p>
              </div>
            ) : isEmergenza ? (
              <div>
                <p className="font-display text-xl text-[#161616]">Valutazione in loco necessaria</p>
                <p className="text-sm text-[#494949] mt-1">La complessità richiede un sopralluogo immediato</p>
              </div>
            ) : (
              <OfferUnlockCard input={input} />
            )}
          </div>

          {/* Recommendation */}
          <div className="border-l-2 border-[#EB1C26] bg-[#EB1C26]/[0.04] pl-5 py-3 pr-4">
            <p className="text-sm text-[#161616]/80 leading-relaxed">{band.recommendation}</p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-[#161616]/35 leading-relaxed">
            Il T94 Roof Index™ è uno strumento orientativo basato su parametri statistici. 
            La valutazione definitiva richiede un sopralluogo tecnico in loco.
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-3 mt-auto">
            <a
              href={`/contatti?risk=${score}&band=${band.labelShort}`}
              onClick={() => trackCTAClick('hero_desktop', '/contatti')}
              className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.2)] hover:bg-[#161616] transition-colors duration-300"
            >
              Richiedi Sopralluogo Gratuito
              <ArrowRight className="size-4" />
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:+393516519363"
                className="flex items-center justify-center gap-2 border border-[#161616]/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#161616]/60 hover:text-[#161616] hover:border-[#161616]/35 transition-colors"
              >
                <Phone className="size-3.5" />
                Chiama ora
              </a>
              <a
                href="https://wa.me/393516519363"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-[#161616]/15 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#161616]/60 hover:text-[#161616] hover:border-[#161616]/35 transition-colors"
              >
                <MessageCircle className="size-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Secondary links: reset + map funnel. The map link closes the
              loop — this visitor's (anonymized) answer just fed the public
              aggregate map, so we offer them the chance to see it. */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onReset}
              className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
            >
              <RotateCcw className="size-3" />
              Ricomincia analisi
            </button>
            <a
              href="/mappa-rischio"
              onClick={() => trackCTAClick('quiz_result_map_link', '/mappa-rischio')}
              className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
            >
              <MapPin className="size-3" />
              Vedi la Mappa del Rischio nazionale
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Main Calculator �����─────────────────────────────────────────────────────────

const TOTAL_STEPS = STEPS.length

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export default function RoofCalculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [answers, setAnswers] = useState<Partial<CalcoloInput>>({})
  const [numberInput, setNumberInput] = useState('')
  const [numberError, setNumberError] = useState('')
  const [textInput, setTextInput] = useState('')
  const [result, setResult] = useState<CalcoloOutput | null>(null)
  // Mirrors `answers` at the exact moment the quiz completes — kept
  // separate so OfferUnlockCard has a stable, fully-typed CalcoloInput to
  // submit, without depending on the (partial, still-mutable) `answers`
  // state shape.
  const [finalInput, setFinalInput] = useState<CalcoloInput | null>(null)

  const step = STEPS[currentStep]

  const goNext = useCallback(() => {
    if (currentStep < TOTAL_STEPS - 1) {
      setDirection(1)
      setCurrentStep(s => s + 1)
      setNumberInput('')
      setNumberError('')
      setTextInput('')
    } else {
      // Calculate result
      const input = answers as CalcoloInput
      setResult(calcolaRischio(input))
      setFinalInput(input)
      incrementAnalyzedCount()
      notifyAnalysisCompleted(input)
    }
  }, [currentStep, answers])

  const goBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(s => s - 1)
      setNumberError('')
    }
  }, [currentStep])

  const selectChoice = useCallback((field: FieldKey, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }))
    // Auto-advance after a short delay for choice steps
    setTimeout(() => {
      setDirection(1)
      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep(s => s + 1)
        setNumberInput('')
        setNumberError('')
        setTextInput('')
      } else {
        const input = { ...answers, [field]: value } as CalcoloInput
        setResult(calcolaRischio(input))
        setFinalInput(input)
        incrementAnalyzedCount()
        notifyAnalysisCompleted(input)
      }
    }, 280)
  }, [currentStep, answers])

  const handleNumberNext = useCallback(() => {
    const val = parseFloat(numberInput)
    if (!numberInput || isNaN(val) || val < (step.min ?? 1)) {
      setNumberError(`Inserisci un valore valido (minimo ${step.min ?? 1} m²)`)
      return
    }
    if (step.max && val > step.max) {
      setNumberError(`Valore massimo: ${step.max} m²`)
      return
    }
    setAnswers(prev => ({ ...prev, [step.field]: val }))
    setNumberError('')
    goNext()
  }, [numberInput, step, goNext])

  // Text steps (currently just "città") build the final input explicitly
  // instead of calling goNext(), which would read the `answers` closure
  // before this step's own setAnswers() has flushed — the same reason
  // selectChoice above does the same thing rather than reusing goNext().
  const handleTextNext = useCallback((skip: boolean) => {
    const value = skip ? undefined : (textInput.trim() || undefined)
    setAnswers(prev => ({ ...prev, [step.field]: value }))
    setDirection(1)
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(s => s + 1)
      setTextInput('')
    } else {
      const input = { ...answers, [step.field]: value } as CalcoloInput
      setResult(calcolaRischio(input))
      setFinalInput(input)
      incrementAnalyzedCount()
      notifyAnalysisCompleted(input)
    }
  }, [textInput, step, currentStep, answers])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setAnswers({})
    setNumberInput('')
    setNumberError('')
    setResult(null)
    setFinalInput(null)
    setDirection(1)
  }, [])

  const currentAnswer = answers[step?.field]

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top bar */}
      <div className="border-b border-[#161616]/8 px-6 lg:px-12 py-5 flex items-center justify-between">
        <a href="/" className="text-xs font-bold tracking-[0.3em] text-[#161616]/35 hover:text-[#161616]/70 transition-colors uppercase">
          ← Tetto94
        </a>
        {!result && (
          <span className="text-xs tracking-[0.3em] text-[#161616]/25 uppercase font-mono">
            T94 Roof Index™
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">

        {/* Left column — fixed brand panel */}
        <div className="hidden lg:flex lg:w-80 xl:w-96 flex-col border-r border-[#161616]/8 bg-[#FAFAF9] p-10 xl:p-14">
          <div className="flex-1">
            <motion.div
              key={result ? 'result' : currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {result ? (
                <>
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">Analisi completata</span>
                  <h2 className="font-display text-4xl text-[#161616] leading-none mt-3">
                    ROOF<br />RISK<br />INDEX™
                  </h2>
                  <div className="mt-6 h-px bg-[#161616]/10" />
                  <p className="mt-6 text-sm text-[#494949] leading-relaxed">
                    Il tuo indice di rischio personale, calcolato su 7 parametri tecnici.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">Valutazione gratuita</span>
                  <h2 className="font-display text-4xl text-[#161616] leading-none mt-3">
                    ROOF<br />RISK<br />INDEX™
                  </h2>
                  <div className="mt-6 h-px bg-[#161616]/10" />
                  <p className="mt-6 text-sm text-[#494949] leading-relaxed">
                    7 domande per una diagnosi precisa del tuo tetto e una stima realistica dei costi.
                  </p>
                  <div className="mt-8 space-y-3">
                    {STEPS.map((s, i) => (
                      <div key={s.id} className="flex items-center gap-3">
                        <div className={`size-1.5 rounded-full transition-colors duration-300 ${
                          i < currentStep ? 'bg-[#EB1C26]' :
                          i === currentStep ? 'bg-[#161616]' :
                          'bg-[#161616]/15'
                        }`} />
                        <span className={`text-xs transition-colors duration-300 ${
                          i === currentStep ? 'text-[#161616] font-bold' :
                          i < currentStep ? 'text-[#161616]/45' :
                          'text-[#161616]/25'
                        }`}>
                          {s.tag.split('— ')[1]}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>

          <div className="text-[10px] text-[#161616]/30 leading-relaxed">
            Tetto94 dal 1994<br />
            Garanzia scritta 10 anni
          </div>
        </div>

        {/* Right column — main content */}
        <div className="flex-1 flex flex-col px-6 py-8 lg:px-14 lg:py-12 xl:px-20 xl:py-16 max-w-3xl">

          {result && finalInput ? (
            <ResultPanel output={result} input={finalInput} onReset={reset} />
          ) : (
            <>
              <ProgressBar current={currentStep + 1} total={TOTAL_STEPS} />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1"
                >
                  {/* Step tag */}
                  <span className="text-[10px] font-bold tracking-[0.4em] text-[#EB1C26] uppercase">
                    {step.tag}
                  </span>

                  {/* Question */}
                  <h3 className="font-display text-[clamp(1.8rem,4.5vw,3rem)] leading-tight text-[#161616] mt-3 mb-10">
                    {step.question}
                  </h3>

                  {/* Choices */}
                  {step.type === 'choice' && step.options && (
                    <div className="flex flex-col gap-3">
                      {step.options.map((opt, i) => {
                        const isSelected = currentAnswer === opt.value
                        return (
                          <motion.button
                            key={opt.value}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.4 }}
                            onClick={() => selectChoice(step.field, opt.value)}
                            className={`group flex items-center justify-between gap-4 border px-6 py-5 text-left transition-all duration-200
                              ${isSelected
                                ? 'border-[#EB1C26] bg-[#EB1C26]/[0.06]'
                                : 'border-[#161616]/10 hover:border-[#161616]/25 bg-white hover:bg-[#FAFAF9]'
                              }`}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className={`font-display text-lg leading-snug transition-colors ${isSelected ? 'text-[#161616]' : 'text-[#161616]/80 group-hover:text-[#161616]'}`}>
                                {opt.label}
                              </span>
                              {opt.sub && (
                                <span className="text-xs text-[#161616]/40">{opt.sub}</span>
                              )}
                            </div>
                            <div className={`size-5 shrink-0 border rounded-full flex items-center justify-center transition-all ${
                              isSelected ? 'border-[#EB1C26] bg-[#EB1C26]' : 'border-[#161616]/20 group-hover:border-[#161616]/40'
                            }`}>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="size-2 rounded-full bg-white"
                                />
                              )}
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  )}

                  {/* Number input */}
                  {step.type === 'number' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative flex items-center border border-[#161616]/15 bg-white focus-within:border-[#EB1C26] transition-colors">
                        <input
                          type="number"
                          inputMode="numeric"
                          placeholder={step.placeholder}
                          value={numberInput}
                          onChange={e => { setNumberInput(e.target.value); setNumberError('') }}
                          onKeyDown={e => e.key === 'Enter' && handleNumberNext()}
                          autoFocus
                          className="flex-1 bg-transparent px-6 py-5 text-2xl font-display text-[#161616] placeholder:text-[#161616]/25 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {step.unit && (
                          <span className="px-6 text-lg text-[#161616]/35 font-display border-l border-[#161616]/10">
                            {step.unit}
                          </span>
                        )}
                      </div>
                      {numberError && (
                        <p className="text-xs text-[#EB1C26]">{numberError}</p>
                      )}
                      <button
                        onClick={handleNumberNext}
                        className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#161616] transition-colors self-start"
                      >
                        Continua
                        <ArrowRight className="size-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Text input (optional — currently just "città") */}
                  {step.type === 'text' && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="relative flex items-center border border-[#161616]/15 bg-white focus-within:border-[#EB1C26] transition-colors">
                        <input
                          type="text"
                          placeholder={step.placeholder}
                          value={textInput}
                          onChange={e => setTextInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleTextNext(false)}
                          autoFocus
                          className="flex-1 bg-transparent px-6 py-5 text-2xl font-display text-[#161616] placeholder:text-[#161616]/25 outline-none"
                        />
                      </div>
                      {step.helperText && (
                        <p className="text-xs text-[#161616]/40">{step.helperText}</p>
                      )}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleTextNext(false)}
                          className="flex items-center justify-center gap-2 bg-[#EB1C26] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-[#161616] transition-colors"
                        >
                          Continua
                          <ArrowRight className="size-4" />
                        </button>
                        {step.optional && (
                          <button
                            onClick={() => handleTextNext(true)}
                            className="text-xs text-[#161616]/40 hover:text-[#161616]/70 transition-colors underline"
                          >
                            Salta, preferisco non dirlo
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep > 0 && (
                <div className="mt-8 pt-6 border-t border-[#161616]/8">
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 text-xs text-[#161616]/35 hover:text-[#161616]/70 transition-colors"
                  >
                    <ArrowLeft className="size-3.5" />
                    Domanda precedente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
