// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion, useInView, animate } from 'framer-motion'
// import Image from 'next/image'
// import {
//   Phone,
//   CheckCircle2,
//   Star,
//   Shield,
//   Clock,
//   Award,
//   Wind,
//   Layers,
//   PanelsTopLeft,
//   Percent,
//   ThermometerSun,
// } from 'lucide-react'
// import LPForm from '@/components/tetto94/lp-form'
// import WhatsAppButton from '@/components/tetto94/whatsapp-button'
// import Tetto94Logo from '@/components/tetto94/logo'
// import { trackPhoneClick } from '@/lib/gtag'
// import type { LandingPageConfig } from '@/data/landing-pages'

// const PHONE = '+39 351 651 9363'
// const PHONE_TEL = 'tel:+393516519363'

// const USP_BULLETS = [
//   'Lavoriamo senza ponteggi',
//   'Ispezione con drone gratuita',
//   'Meno dispersione di calore, fino al 30-40%',
// ]

// const STATS = [
//   { value: 30, suffix: '+', label: 'Anni di esperienza' },
//   { value: 500, suffix: '+', label: 'Lavori completati' },
// ]

// const REVIEWS = [
//   {
//     name: 'Marco Ferretti',
//     city: 'Venezia',
//     rating: 5,
//     text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile. Consigliato al 100%.",
//   },
//   {
//     name: 'Giulia Marchetti',
//     city: 'Mestre',
//     rating: 5,
//     text: 'Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità, rispetto dei tempi. Ottimo rapporto qualità/prezzo.',
//   },
// ]

// const NO_SCAFFOLDING_BULLETS = [
//   'Nessun permesso comunale necessario: interveniamo subito',
//   'Zero rischio cantiere: tecniche avanzate e certificate',
//   "Risparmio fino all'80% sui costi di ponteggio",
// ]

// const METHOD_CARDS = [
//   {
//     icon: PanelsTopLeft,
//     label: "Dall'esterno",
//     title: "Coibentazione dall'esterno",
//     text: 'Pannelli isolanti posati sopra la copertura durante il rifacimento del manto. La soluzione più efficace, senza togliere spazio interno.',
//   },
//   {
//     icon: Layers,
//     label: "Dall'interno",
//     title: 'Isolamento dall\'interno',
//     text: 'Pannelli applicati sul lato interno della copertura o del solaio. Ideale quando non si vuole intervenire sul manto esterno.',
//   },
//   {
//     icon: Wind,
//     label: 'Insufflaggio',
//     title: 'Insufflaggio del sottotetto',
//     text: 'Materiale isolante insufflato nel sottotetto non abitato. Rapido, economico e senza opere murarie.',
//   },
// ]

// const TRUST_STRIP = [
//   'Materiali isolanti certificati CE',
//   'Garanzia scritta 10 anni',
//   'Oltre 500 lavori completati',
//   'Assistenza sulle detrazioni fiscali',
//   'Sopralluogo con drone gratuito',
//   'Preventivo entro 24 ore',
// ]

// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {Array.from({ length: rating }).map((_, i) => (
//         <Star key={i} className="size-3.5 fill-[#EB1C26] text-[#EB1C26]" />
//       ))}
//     </div>
//   )
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//       <span className="size-1.5 rounded-full bg-[#EB1C26]" />
//       {children}
//     </span>
//   )
// }

// function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
//   const ref = useRef<HTMLSpanElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-10%' })
//   const [value, setValue] = useState(0)

//   useEffect(() => {
//     if (!inView) return
//     const controls = animate(0, to, {
//       duration: 1.6,
//       ease: [0.22, 1, 0.36, 1],
//       onUpdate: (v) => setValue(Math.round(v)),
//     })
//     return () => controls.stop()
//   }, [inView, to])

//   return (
//     <span ref={ref}>
//       {value}
//       {suffix}
//     </span>
//   )
// }

// interface Props {
//   config: LandingPageConfig
// }

// export default function InsulationLandingPageTemplate({ config }: Props) {
//   const methodsRef = useRef(null)
//   const methodsInView = useInView(methodsRef, { once: true, margin: '-10%' })

//   const noScaffRef = useRef(null)
//   const noScaffInView = useInView(noScaffRef, { once: true, margin: '-10%' })

//   const statsRef = useRef(null)
//   const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

//   const reviewsRef = useRef(null)
//   const reviewsInView = useInView(reviewsRef, { once: true, margin: '-10%' })

//   const pricingRef = useRef(null)
//   const pricingInView = useInView(pricingRef, { once: true, margin: '-10%' })

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       {/* ─────────────────────────────────────────────────────
//           MOBILE STICKY PHONE BAR
//       ───────────────────────────────────────────────────── */}
//       <a
//         href={PHONE_TEL}
//         onClick={() => trackPhoneClick('lp_mobile_sticky')}
//         className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_-8px_24px_rgba(0,0,0,0.15)] sm:hidden"
//         aria-label={`Chiama Tetto94: ${PHONE}`}
//       >
//         <Phone className="size-4" />
//         Chiama ora · {PHONE}
//       </a>

//       {/* ─────────────────────────────────────────────────────
//           01 · HEADER — Logo only + phone, zero nav, dark (matches site-wide navbar)
//       ───────────────────────────────────────────────────── */}
//       <header className="sticky top-0 z-50 border-b border-white/8 bg-[#161616]/95 backdrop-blur-md">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
//           <Tetto94Logo className="h-16 w-auto md:h-20" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_header')}
//             className="flex items-center gap-2 rounded-full bg-[#EB1C26] px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(235,28,38,0.35)] transition-transform hover:scale-[1.03] sm:text-sm"
//             aria-label={`Chiama Tetto94: ${PHONE}`}
//           >
//             <Phone className="size-3.5" />
//             <span className="hidden sm:inline">{PHONE}</span>
//             <span className="sm:hidden">Chiama ora</span>
//           </a>
//         </div>
//       </header>

//       {/* ─────────────────────────────────────────────────────
//           02 · HERO — light gradient mesh + H1 + form
//       ───────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-[#FBFAF9]">
//         {/* Ambient light mesh */}
//         <div className="pointer-events-none absolute inset-0" aria-hidden="true">
//           <div className="absolute -left-32 -top-40 size-[32rem] rounded-full bg-[#EB1C26]/10 blur-[110px]" />
//           <div className="absolute -right-24 top-10 size-[26rem] rounded-full bg-[#EB1C26]/[0.07] blur-[100px]" />
//           <div
//             className="absolute inset-0 opacity-[0.035]"
//             style={{
//               backgroundImage:
//                 'linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)',
//               backgroundSize: '56px 56px',
//             }}
//           />
//         </div>

//         <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
//           <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
//             {/* Left — copy */}
//             <div className="flex flex-col gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: -12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-flex items-center gap-2 self-start rounded-full border border-[#EB1C26]/20 bg-[#EB1C26]/8 px-3.5 py-1.5"
//               >
//                 <span className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
//                 <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26]">
//                   Dal 1994 · {config.region}
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//                 className="font-display text-[clamp(2.2rem,5.2vw,3.8rem)] leading-[0.98] text-[#161616] text-balance"
//               >
//                 Coibentazione tetto in{' '}
//                 <span className="text-[#EB1C26]">{config.region}</span>? Interveniamo senza ponteggi.
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.65, delay: 0.2 }}
//                 className="max-w-md text-base leading-relaxed text-[#161616]/60"
//               >
//                 Isoliamo tetto e sottotetto con sopralluogo drone gratuito e garanzia scritta 10 anni. Meno
//                 dispersione di calore, bollette più leggere.
//               </motion.p>

//               <motion.ul
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 className="flex flex-col gap-2.5"
//               >
//                 {USP_BULLETS.map((usp, i) => (
//                   <motion.li
//                     key={usp}
//                     initial={{ opacity: 0, x: -16 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
//                     className="flex items-center gap-2.5 text-sm text-[#161616]/75"
//                   >
//                     <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
//                       <CheckCircle2 className="size-3.5 text-[#EB1C26]" />
//                     </span>
//                     {usp}
//                   </motion.li>
//                 ))}
//               </motion.ul>

//               {/* Micro trust row */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.45 }}
//                 className="flex flex-wrap items-center gap-4 border-t border-[#161616]/8 pt-5"
//               >
//                 <div className="flex items-center gap-1.5">
//                   <StarRating rating={5} />
//                   <span className="text-xs font-semibold text-[#161616]/50">4.9 su Google</span>
//                 </div>
//                 <span className="hidden h-4 w-px bg-[#161616]/10 sm:block" aria-hidden="true" />
//                 <a
//                   href={PHONE_TEL}
//                   onClick={() => trackPhoneClick('lp_hero')}
//                   className="flex items-center gap-2 text-sm text-[#161616]/45 transition-colors hover:text-[#161616]"
//                 >
//                   <Phone className="size-3.5" />
//                   Preferisci chiamare? {PHONE}
//                 </a>
//               </motion.div>
//             </div>

//             {/* Right — form (above fold on desktop) */}
//             <motion.div
//               initial={{ opacity: 0, x: 32 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative"
//             >
//               {/* Floating trust chip */}
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.7 }}
//                 className="absolute -top-4 right-6 z-10 hidden items-center gap-1.5 rounded-full bg-[#161616] px-3.5 py-2 shadow-xl sm:flex"
//               >
//                 <Clock className="size-3.5 text-[#EB1C26]" />
//                 <span className="text-xs font-bold text-white">Risposta in 24h</span>
//               </motion.div>

//               <div className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]">
//                 <div className="mb-4 px-5 pt-5">
//                   <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
//                     Sopralluogo gratuito in {config.region}
//                   </p>
//                   <p className="text-sm text-[#161616]/55">Compila il modulo, ti richiamiamo entro 24 ore.</p>
//                 </div>
//                 <div className="px-5 pb-5">
//                   <LPForm
//                     region={config.region}
//                     formId="lp-form-top"
//                     pageId={config.pageId}
//                     service="Coibentazione Tetto"
//                   />
//                 </div>
//               </div>

//               {/* Floating drone trust card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.9 }}
//                 className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-2.5 pr-4 shadow-xl lg:flex"
//               >
//                 <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
//                   <Image
//                     src="/images/drone-inspection.jpg"
//                     alt="Sopralluogo con drone Tetto94"
//                     fill
//                     sizes="44px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-[#161616]">Sopralluogo via drone</p>
//                   <p className="text-[11px] text-[#161616]/45">Incluso, senza costi</p>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Trust marquee strip */}
//         <div className="relative mt-10 overflow-hidden border-t border-[#161616]/8 bg-white py-4 lg:mt-14">
//           <div className="flex w-max animate-marquee gap-10">
//             {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
//               <div key={i} className="flex items-center gap-2 whitespace-nowrap">
//                 <CheckCircle2 className="size-3.5 shrink-0 text-[#EB1C26]" />
//                 <span className="text-xs font-semibold uppercase tracking-wide text-[#161616]/45">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           03 · 3 MODI PER COIBENTARE IL TETTO — new section
//       ───────────────────────────────────────────────────── */}
//       <section ref={methodsRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="mb-10 text-center"
//           >
//             <SectionLabel>Come Interveniamo</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               3 MODI PER <span className="text-[#EB1C26]">COIBENTARE</span> IL TETTO
//             </h2>
//           </motion.div>

//           <div className="grid gap-5 sm:grid-cols-3">
//             {METHOD_CARDS.map((card, i) => (
//               <motion.div
//                 key={card.title}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.55, delay: i * 0.12 }}
//                 className="group flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6 transition-colors hover:border-[#EB1C26]/30 hover:bg-white hover:shadow-[0_20px_45px_-24px_rgba(22,22,22,0.2)]"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="flex size-11 items-center justify-center rounded-xl bg-[#EB1C26]/10 text-[#EB1C26] transition-colors group-hover:bg-[#EB1C26] group-hover:text-white">
//                     <card.icon className="size-5" />
//                   </span>
//                   <span className="text-[11px] font-bold uppercase tracking-widest text-[#161616]/30">
//                     {card.label}
//                   </span>
//                 </div>
//                 <h3 className="font-display text-lg leading-tight text-[#161616]">{card.title}</h3>
//                 <p className="text-sm leading-relaxed text-[#161616]/55">{card.text}</p>
//               </motion.div>
//             ))}
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-5 text-center text-sm leading-relaxed text-[#161616]/70"
//           >
//             Non sai quale fa per te? Con il sopralluogo drone gratuito ti indichiamo la soluzione giusta per la tua
//             copertura, con preventivo entro 24 ore.
//           </motion.p>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           04 · LAVORIAMO SENZA PONTEGGI
//       ───────────────────────────────────────────────────── */}
//       <section ref={noScaffRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//               className="relative order-2 lg:order-1"
//             >
//               <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(22,22,22,0.35)]">
//                 <Image
//                   src="/images/coibentazione-hero.png"
//                   alt={`Posa di isolamento termico sul tetto in ${config.region} — Tetto94`}
//                   width={720}
//                   height={540}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <motion.div
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-3 pr-5 shadow-xl sm:left-6"
//               >
//                 <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
//                   <ThermometerSun className="size-4 text-[#EB1C26]" />
//                 </span>
//                 <div>
//                   <p className="font-display text-lg leading-none text-[#161616]">-30/40%</p>
//                   <p className="text-[11px] text-[#161616]/45">dispersione di calore</p>
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="order-1 flex flex-col gap-5 lg:order-2"
//             >
//               <div>
//                 <SectionLabel>Il Nostro Vantaggio</SectionLabel>
//                 <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.3rem)] leading-[0.98] text-[#161616]">
//                   LAVORIAMO <span className="text-[#EB1C26]">SENZA</span> PONTEGGI.
//                 </h2>
//                 <p className="mt-4 max-w-md text-sm leading-relaxed text-[#161616]/55">
//                   In {config.region} coibentiamo tetti e sottotetti da 30 anni senza ponteggi. Tecniche avanzate,
//                   attrezzature certificate e zero compromessi sulla sicurezza.
//                 </p>
//               </div>

//               <ul className="flex flex-col gap-3">
//                 {NO_SCAFFOLDING_BULLETS.map((bullet, i) => (
//                   <motion.li
//                     key={bullet}
//                     initial={{ opacity: 0, y: 14 }}
//                     animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
//                     className="flex items-start gap-3 rounded-xl border border-[#161616]/8 bg-white p-4"
//                   >
//                     <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]">
//                       <CheckCircle2 className="size-3 text-white" />
//                     </span>
//                     <span className="text-sm leading-snug text-[#161616]/70">{bullet}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           05 · ECOBONUS STRIP
//       ───────────────────────────────────────────────────── */}
//       <section className="border-t border-[#161616]/8 bg-white py-10">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-6 text-center sm:flex-row sm:text-left">
//             <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/12 text-[#EB1C26]">
//               <Percent className="size-5" />
//             </span>
//             <p className="text-sm leading-relaxed text-[#161616]/70">
//               La coibentazione del tetto può accedere alle detrazioni fiscali per l&apos;efficienza energetica. Ti
//               aiutiamo a capire quale agevolazione si applica al tuo caso e prepariamo la documentazione.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           06 · STATS BAR
//       ───────────────────────────────────────────────────── */}
//       <section ref={statsRef} className="border-t border-[#c91520] bg-[#EB1C26] py-10">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
//             {STATS.map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={statsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 className="flex flex-col items-center text-center"
//               >
//                 <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-white">
//                   <CountUp to={stat.value} suffix={stat.suffix} />
//                 </span>
//                 <span className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
//                   {stat.label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           07 · 2 CLIENT REVIEWS
//       ───────────────────────────────────────────────────── */}
//       <section ref={reviewsRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="mb-10 text-center"
//           >
//             <SectionLabel>Testimonianze</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
//             </h2>
//           </motion.div>

//           <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:gap-6">
//             {REVIEWS.map((review, i) => (
//               <motion.div
//                 key={review.name}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.12 }}
//                 className="flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(22,22,22,0.25)]"
//               >
//                 <StarRating rating={review.rating} />
//                 <p className="text-sm italic leading-relaxed text-[#161616]/65">&ldquo;{review.text}&rdquo;</p>
//                 <div className="mt-auto flex items-center gap-3 border-t border-[#161616]/8 pt-2">
//                   <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26] font-display text-base text-white">
//                     {review.name[0]}
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-[#161616]">{review.name}</p>
//                     <p className="text-xs text-[#161616]/40">{review.city}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           08 · PRICING ANCHOR + FINAL CTA FORM (repeated)
//       ───────────────────────────────────────────────────── */}
//       <section ref={pricingRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//               className="flex flex-col gap-6"
//             >
//               <div>
//                 <SectionLabel>Prezzi Trasparenti</SectionLabel>
//                 <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.98] text-[#161616]">
//                   COIBENTAZIONE IN {config.region.toUpperCase()} A PARTIRE DA:
//                 </h2>
//               </div>

//               <div className="rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6">
//                 <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40">
//                   Interventi a partire da
//                 </p>
//                 <div className="mb-4 flex items-baseline gap-3">
//                   <span className="font-sans text-sm text-[#161616]/35 line-through">€ 1.990</span>
//                   <span className="font-display text-[3.5rem] leading-none text-[#EB1C26]">€ 1.490</span>
//                 </div>
//                 <ul className="mt-4 flex flex-col gap-2 border-t border-[#161616]/8 pt-4">
//                   {[
//                     { icon: Shield, text: 'Garanzia scritta 10 anni' },
//                     { icon: Award, text: 'Materiali certificati CE' },
//                     { icon: Clock, text: 'Preventivo entro 24 ore' },
//                   ].map(({ icon: Icon, text }) => (
//                     <li key={text} className="flex items-center gap-2 text-xs text-[#161616]/55">
//                       <Icon className="size-3.5 shrink-0 text-[#EB1C26]" />
//                       {text}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="text-xs leading-relaxed text-[#161616]/35">
//                 Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]"
//             >
//               <div className="mb-4 px-5 pt-5">
//                 <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
//                   Richiedi il tuo sopralluogo
//                 </p>
//                 <p className="text-sm text-[#161616]/55">
//                   Sopralluogo gratuito con drone in {config.region}. Nessun impegno.
//                 </p>
//               </div>
//               <div className="px-5 pb-5">
//                 <LPForm
//                   region={config.region}
//                   formId="lp-form-bottom"
//                   pageId={config.pageId}
//                   service="Coibentazione Tetto"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           09 · MINIMAL FOOTER — Logo + phone only, dark (matches site-wide footer)
//       ───────────────────────────────────────────────────── */}
//       <footer className="border-t border-white/8 bg-[#0d0d0d] py-8 pb-24 sm:pb-8">
//         <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
//           <Tetto94Logo className="h-16 w-auto opacity-80 md:h-20" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_footer')}
//             className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
//           >
//             <Phone className="size-3.5" />
//             {PHONE}
//           </a>
//         </div>
//       </footer>

//       <WhatsAppButton />
//     </div>
//   )
// }


// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { motion, useInView, animate } from 'framer-motion'
// import Image from 'next/image'
// import {
//   Phone,
//   CheckCircle2,
//   Star,
//   Shield,
//   Clock,
//   Award,
//   Wind,
//   Layers,
//   PanelsTopLeft,
//   Percent,
//   ThermometerSun,
// } from 'lucide-react'
// import LPForm from '@/components/tetto94/lp-form'
// import WhatsAppButton from '@/components/tetto94/whatsapp-button'
// import Tetto94Logo from '@/components/tetto94/logo'
// import { trackPhoneClick } from '@/lib/gtag'
// import type { LandingPageConfig } from '@/data/landing-pages'

// const PHONE = '+39 351 651 9363'
// const PHONE_TEL = 'tel:+393516519363'

// const USP_BULLETS = [
//   'Lavoriamo senza ponteggi',
//   'Ispezione con drone gratuita',
//   'Meno dispersione di calore, fino al 30-40%',
// ]

// const STATS = [
//   { value: 30, suffix: '+', label: 'Anni di esperienza' },
//   { value: 500, suffix: '+', label: 'Lavori completati' },
// ]

// const REVIEWS = [
//   {
//     name: 'Marco Ferretti',
//     city: 'Venezia',
//     rating: 5,
//     text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile. Consigliato al 100%.",
//   },
//   {
//     name: 'Giulia Marchetti',
//     city: 'Mestre',
//     rating: 5,
//     text: 'Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità, rispetto dei tempi. Ottimo rapporto qualità/prezzo.',
//   },
// ]

// const NO_SCAFFOLDING_BULLETS = [
//   'Nessun permesso comunale necessario: interveniamo subito',
//   'Zero rischio cantiere: tecniche avanzate e certificate',
//   "Risparmio fino all'80% sui costi di ponteggio",
// ]

// const METHOD_CARDS = [
//   {
//     icon: PanelsTopLeft,
//     label: "Dall'esterno",
//     title: "Coibentazione dall'esterno",
//     text: 'Pannelli isolanti posati sopra la copertura durante il rifacimento del manto. La soluzione più efficace, senza togliere spazio interno.',
//   },
//   {
//     icon: Layers,
//     label: "Dall'interno",
//     title: 'Isolamento dall\'interno',
//     text: 'Pannelli applicati sul lato interno della copertura o del solaio. Ideale quando non si vuole intervenire sul manto esterno.',
//   },
//   {
//     icon: Wind,
//     label: 'Insufflaggio',
//     title: 'Insufflaggio del sottotetto',
//     text: 'Materiale isolante insufflato nel sottotetto non abitato. Rapido, economico e senza opere murarie.',
//   },
// ]

// const TRUST_STRIP = [
//   'Materiali isolanti certificati CE',
//   'Garanzia scritta 10 anni',
//   'Oltre 500 lavori completati',
//   'Assistenza sulle detrazioni fiscali',
//   'Sopralluogo con drone gratuito',
//   'Preventivo entro 24 ore',
// ]

// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {Array.from({ length: rating }).map((_, i) => (
//         <Star key={i} className="size-3.5 fill-[#EB1C26] text-[#EB1C26]" />
//       ))}
//     </div>
//   )
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//       <span className="size-1.5 rounded-full bg-[#EB1C26]" />
//       {children}
//     </span>
//   )
// }

// function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
//   const ref = useRef<HTMLSpanElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-10%' })
//   const [value, setValue] = useState(0)

//   useEffect(() => {
//     if (!inView) return
//     const controls = animate(0, to, {
//       duration: 1.6,
//       ease: [0.22, 1, 0.36, 1],
//       onUpdate: (v) => setValue(Math.round(v)),
//     })
//     return () => controls.stop()
//   }, [inView, to])

//   return (
//     <span ref={ref}>
//       {value}
//       {suffix}
//     </span>
//   )
// }

// interface Props {
//   config: LandingPageConfig
// }

// export default function InsulationLandingPageTemplate({ config }: Props) {
//   const methodsRef = useRef(null)
//   const methodsInView = useInView(methodsRef, { once: true, margin: '-10%' })

//   const noScaffRef = useRef(null)
//   const noScaffInView = useInView(noScaffRef, { once: true, margin: '-10%' })

//   const statsRef = useRef(null)
//   const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

//   const reviewsRef = useRef(null)
//   const reviewsInView = useInView(reviewsRef, { once: true, margin: '-10%' })

//   const pricingRef = useRef(null)
//   const pricingInView = useInView(pricingRef, { once: true, margin: '-10%' })

//   return (
//     <div className="min-h-screen bg-white font-sans">
//       {/* ─────────────────────────────────────────────────────
//           MOBILE STICKY PHONE BAR
//       ───────────────────────────────────────────────────── */}
//       <a
//         href={PHONE_TEL}
//         onClick={() => trackPhoneClick('lp_mobile_sticky')}
//         className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_-8px_24px_rgba(0,0,0,0.15)] sm:hidden"
//         aria-label={`Chiama Tetto94: ${PHONE}`}
//       >
//         <Phone className="size-4" />
//         Chiama ora · {PHONE}
//       </a>

//       {/* ─────────────────────────────────────────────────────
//           01 · HEADER — Logo only + phone, zero nav, dark (matches site-wide navbar)
//           Solid background, no backdrop-blur: `sticky` + `backdrop-filter` forces the
//           browser to recompute a blurred copy of everything scrolling underneath on
//           every frame, which is exactly what caused the mobile scroll jank on the
//           homepage navbar. Fixed there with a solid bg; same fix here.
//       ───────────────────────────────────────────────────── */}
//       <header className="sticky top-0 z-50 border-b border-white/8 bg-[#161616]">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
//           <Tetto94Logo className="h-16 w-auto md:h-20" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_header')}
//             className="flex items-center gap-2 rounded-full bg-[#EB1C26] px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(235,28,38,0.35)] transition-transform hover:scale-[1.03] sm:text-sm"
//             aria-label={`Chiama Tetto94: ${PHONE}`}
//           >
//             <Phone className="size-3.5" />
//             <span className="hidden sm:inline">{PHONE}</span>
//             <span className="sm:hidden">Chiama ora</span>
//           </a>
//         </div>
//       </header>

//       {/* ─────────────────────────────────────────────────────
//           02 · HERO — light gradient mesh + H1 + form
//       ───────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-[#FBFAF9]">
//         {/* Ambient light mesh */}
//         <div className="pointer-events-none absolute inset-0" aria-hidden="true">
//           <div className="absolute -left-32 -top-40 size-[32rem] rounded-full bg-[#EB1C26]/10 blur-[110px]" />
//           <div className="absolute -right-24 top-10 size-[26rem] rounded-full bg-[#EB1C26]/[0.07] blur-[100px]" />
//           <div
//             className="absolute inset-0 opacity-[0.035]"
//             style={{
//               backgroundImage:
//                 'linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)',
//               backgroundSize: '56px 56px',
//             }}
//           />
//         </div>

//         <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
//           <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
//             {/* Left — copy */}
//             <div className="flex flex-col gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: -12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-flex items-center gap-2 self-start rounded-full border border-[#EB1C26]/20 bg-[#EB1C26]/8 px-3.5 py-1.5"
//               >
//                 <span className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
//                 <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26]">
//                   Dal 1994 · {config.region}
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//                 className="font-display text-[clamp(2.2rem,5.2vw,3.8rem)] leading-[0.98] text-[#161616] text-balance"
//               >
//                 Coibentazione tetto in{' '}
//                 <span className="text-[#EB1C26]">{config.region}</span>? Interveniamo senza ponteggi.
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.65, delay: 0.2 }}
//                 className="max-w-md text-base leading-relaxed text-[#161616]/60"
//               >
//                 Isoliamo tetto e sottotetto con sopralluogo drone gratuito e garanzia scritta 10 anni. Meno
//                 dispersione di calore, bollette più leggere.
//               </motion.p>

//               <motion.ul
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//                 className="flex flex-col gap-2.5"
//               >
//                 {USP_BULLETS.map((usp, i) => (
//                   <motion.li
//                     key={usp}
//                     initial={{ opacity: 0, x: -16 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
//                     className="flex items-center gap-2.5 text-sm text-[#161616]/75"
//                   >
//                     <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
//                       <CheckCircle2 className="size-3.5 text-[#EB1C26]" />
//                     </span>
//                     {usp}
//                   </motion.li>
//                 ))}
//               </motion.ul>

//               {/* Micro trust row */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.45 }}
//                 className="flex flex-wrap items-center gap-4 border-t border-[#161616]/8 pt-5"
//               >
//                 <div className="flex items-center gap-1.5">
//                   <StarRating rating={5} />
//                   <span className="text-xs font-semibold text-[#161616]/50">4.9 su Google</span>
//                 </div>
//                 <span className="hidden h-4 w-px bg-[#161616]/10 sm:block" aria-hidden="true" />
//                 <a
//                   href={PHONE_TEL}
//                   onClick={() => trackPhoneClick('lp_hero')}
//                   className="flex items-center gap-2 text-sm text-[#161616]/45 transition-colors hover:text-[#161616]"
//                 >
//                   <Phone className="size-3.5" />
//                   Preferisci chiamare? {PHONE}
//                 </a>
//               </motion.div>
//             </div>

//             {/* Right — form (above fold on desktop) */}
//             <motion.div
//               initial={{ opacity: 0, x: 32 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative"
//             >
//               {/* Floating trust chip */}
//               <motion.div
//                 initial={{ opacity: 0, y: -10, scale: 0.9 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 transition={{ duration: 0.5, delay: 0.7 }}
//                 className="absolute -top-4 right-6 z-10 hidden items-center gap-1.5 rounded-full bg-[#161616] px-3.5 py-2 shadow-xl sm:flex"
//               >
//                 <Clock className="size-3.5 text-[#EB1C26]" />
//                 <span className="text-xs font-bold text-white">Risposta in 24h</span>
//               </motion.div>

//               <div className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]">
//                 <div className="mb-4 px-5 pt-5">
//                   <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
//                     Sopralluogo gratuito in {config.region}
//                   </p>
//                   <p className="text-sm text-[#161616]/55">Compila il modulo, ti richiamiamo entro 24 ore.</p>
//                 </div>
//                 <div className="px-5 pb-5">
//                   <LPForm
//                     region={config.region}
//                     formId="lp-form-top"
//                     pageId={config.pageId}
//                     service="Coibentazione Tetto"
//                   />
//                 </div>
//               </div>

//               {/* Floating drone trust card */}
//               <motion.div
//                 initial={{ opacity: 0, y: 12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.9 }}
//                 className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-2.5 pr-4 shadow-xl lg:flex"
//               >
//                 <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
//                   <Image
//                     src="/images/drone-inspection.jpg"
//                     alt="Sopralluogo con drone Tetto94"
//                     fill
//                     sizes="44px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="text-xs font-bold text-[#161616]">Sopralluogo via drone</p>
//                   <p className="text-[11px] text-[#161616]/45">Incluso, senza costi</p>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </div>
//         </div>

//         {/* Trust marquee strip */}
//         <div className="relative mt-10 overflow-hidden border-t border-[#161616]/8 bg-white py-4 lg:mt-14">
//           <div className="flex w-max animate-marquee gap-10">
//             {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
//               <div key={i} className="flex items-center gap-2 whitespace-nowrap">
//                 <CheckCircle2 className="size-3.5 shrink-0 text-[#EB1C26]" />
//                 <span className="text-xs font-semibold uppercase tracking-wide text-[#161616]/45">{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           03 · 3 MODI PER COIBENTARE IL TETTO — new section
//       ───────────────────────────────────────────────────── */}
//       <section ref={methodsRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="mb-10 text-center"
//           >
//             <SectionLabel>Come Interveniamo</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               3 MODI PER <span className="text-[#EB1C26]">COIBENTARE</span> IL TETTO
//             </h2>
//           </motion.div>

//           <div className="grid gap-5 sm:grid-cols-3">
//             {METHOD_CARDS.map((card, i) => (
//               <motion.div
//                 key={card.title}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.55, delay: i * 0.12 }}
//                 className="group flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6 transition-colors hover:border-[#EB1C26]/30 hover:bg-white hover:shadow-[0_20px_45px_-24px_rgba(22,22,22,0.2)]"
//               >
//                 <div className="flex items-center justify-between">
//                   <span className="flex size-11 items-center justify-center rounded-xl bg-[#EB1C26]/10 text-[#EB1C26] transition-colors group-hover:bg-[#EB1C26] group-hover:text-white">
//                     <card.icon className="size-5" />
//                   </span>
//                   <span className="text-[11px] font-bold uppercase tracking-widest text-[#161616]/30">
//                     {card.label}
//                   </span>
//                 </div>
//                 <h3 className="font-display text-lg leading-tight text-[#161616]">{card.title}</h3>
//                 <p className="text-sm leading-relaxed text-[#161616]/55">{card.text}</p>
//               </motion.div>
//             ))}
//           </div>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={methodsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-5 text-center text-sm leading-relaxed text-[#161616]/70"
//           >
//             Non sai quale fa per te? Con il sopralluogo drone gratuito ti indichiamo la soluzione giusta per la tua
//             copertura, con preventivo entro 24 ore.
//           </motion.p>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           04 · LAVORIAMO SENZA PONTEGGI
//       ───────────────────────────────────────────────────── */}
//       <section ref={noScaffRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//               className="relative order-2 lg:order-1"
//             >
//               <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(22,22,22,0.35)]">
//                 <Image
//                   src="/images/coibentazione-hero.png"
//                   alt={`Posa di isolamento termico sul tetto in ${config.region} — Tetto94`}
//                   width={720}
//                   height={540}
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <motion.div
//                 initial={{ opacity: 0, y: 14 }}
//                 animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: 0.4 }}
//                 className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-3 pr-5 shadow-xl sm:left-6"
//               >
//                 <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
//                   <ThermometerSun className="size-4 text-[#EB1C26]" />
//                 </span>
//                 <div>
//                   <p className="font-display text-lg leading-none text-[#161616]">-30/40%</p>
//                   <p className="text-[11px] text-[#161616]/45">dispersione di calore</p>
//                 </div>
//               </motion.div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="order-1 flex flex-col gap-5 lg:order-2"
//             >
//               <div>
//                 <SectionLabel>Il Nostro Vantaggio</SectionLabel>
//                 <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.3rem)] leading-[0.98] text-[#161616]">
//                   LAVORIAMO <span className="text-[#EB1C26]">SENZA</span> PONTEGGI.
//                 </h2>
//                 <p className="mt-4 max-w-md text-sm leading-relaxed text-[#161616]/55">
//                   In {config.region} coibentiamo tetti e sottotetti da 30 anni senza ponteggi. Tecniche avanzate,
//                   attrezzature certificate e zero compromessi sulla sicurezza.
//                 </p>
//               </div>

//               <ul className="flex flex-col gap-3">
//                 {NO_SCAFFOLDING_BULLETS.map((bullet, i) => (
//                   <motion.li
//                     key={bullet}
//                     initial={{ opacity: 0, y: 14 }}
//                     animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
//                     transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
//                     className="flex items-start gap-3 rounded-xl border border-[#161616]/8 bg-white p-4"
//                   >
//                     <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]">
//                       <CheckCircle2 className="size-3 text-white" />
//                     </span>
//                     <span className="text-sm leading-snug text-[#161616]/70">{bullet}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           05 · ECOBONUS STRIP
//       ───────────────────────────────────────────────────── */}
//       <section className="border-t border-[#161616]/8 bg-white py-10">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-6 text-center sm:flex-row sm:text-left">
//             <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/12 text-[#EB1C26]">
//               <Percent className="size-5" />
//             </span>
//             <p className="text-sm leading-relaxed text-[#161616]/70">
//               La coibentazione del tetto può accedere alle detrazioni fiscali per l&apos;efficienza energetica. Ti
//               aiutiamo a capire quale agevolazione si applica al tuo caso e prepariamo la documentazione.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           06 · STATS BAR
//       ───────────────────────────────────────────────────── */}
//       <section ref={statsRef} className="border-t border-[#c91520] bg-[#EB1C26] py-10">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
//             {STATS.map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={statsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 className="flex flex-col items-center text-center"
//               >
//                 <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-white">
//                   <CountUp to={stat.value} suffix={stat.suffix} />
//                 </span>
//                 <span className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
//                   {stat.label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           07 · 2 CLIENT REVIEWS
//       ───────────────────────────────────────────────────── */}
//       <section ref={reviewsRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="mb-10 text-center"
//           >
//             <SectionLabel>Testimonianze</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
//             </h2>
//           </motion.div>

//           <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:gap-6">
//             {REVIEWS.map((review, i) => (
//               <motion.div
//                 key={review.name}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.12 }}
//                 className="flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(22,22,22,0.25)]"
//               >
//                 <StarRating rating={review.rating} />
//                 <p className="text-sm italic leading-relaxed text-[#161616]/65">&ldquo;{review.text}&rdquo;</p>
//                 <div className="mt-auto flex items-center gap-3 border-t border-[#161616]/8 pt-2">
//                   <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26] font-display text-base text-white">
//                     {review.name[0]}
//                   </div>
//                   <div>
//                     <p className="text-xs font-bold text-[#161616]">{review.name}</p>
//                     <p className="text-xs text-[#161616]/40">{review.city}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           08 · PRICING ANCHOR + FINAL CTA FORM (repeated)
//       ───────────────────────────────────────────────────── */}
//       <section ref={pricingRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//               className="flex flex-col gap-6"
//             >
//               <div>
//                 <SectionLabel>Prezzi Trasparenti</SectionLabel>
//                 <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.98] text-[#161616]">
//                   COIBENTAZIONE IN {config.region.toUpperCase()} A PARTIRE DA:
//                 </h2>
//               </div>

//               <div className="rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6">
//                 <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40">
//                   Interventi a partire da
//                 </p>
//                 <div className="mb-4 flex items-baseline gap-3">
//                   <span className="font-sans text-sm text-[#161616]/35 line-through">€ 1.990</span>
//                   <span className="font-display text-[3.5rem] leading-none text-[#EB1C26]">€ 1.490</span>
//                 </div>
//                 <ul className="mt-4 flex flex-col gap-2 border-t border-[#161616]/8 pt-4">
//                   {[
//                     { icon: Shield, text: 'Garanzia scritta 10 anni' },
//                     { icon: Award, text: 'Materiali certificati CE' },
//                     { icon: Clock, text: 'Preventivo entro 24 ore' },
//                   ].map(({ icon: Icon, text }) => (
//                     <li key={text} className="flex items-center gap-2 text-xs text-[#161616]/55">
//                       <Icon className="size-3.5 shrink-0 text-[#EB1C26]" />
//                       {text}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="text-xs leading-relaxed text-[#161616]/35">
//                 Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
//               </p>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]"
//             >
//               <div className="mb-4 px-5 pt-5">
//                 <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
//                   Richiedi il tuo sopralluogo
//                 </p>
//                 <p className="text-sm text-[#161616]/55">
//                   Sopralluogo gratuito con drone in {config.region}. Nessun impegno.
//                 </p>
//               </div>
//               <div className="px-5 pb-5">
//                 <LPForm
//                   region={config.region}
//                   formId="lp-form-bottom"
//                   pageId={config.pageId}
//                   service="Coibentazione Tetto"
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           09 · MINIMAL FOOTER — Logo + phone only, dark (matches site-wide footer)
//       ───────────────────────────────────────────────────── */}
//       <footer className="border-t border-white/8 bg-[#0d0d0d] py-8 pb-24 sm:pb-8">
//         <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
//           <Tetto94Logo className="h-16 w-auto opacity-80 md:h-20" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_footer')}
//             className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
//           >
//             <Phone className="size-3.5" />
//             {PHONE}
//           </a>
//         </div>
//       </footer>

//       <WhatsAppButton />
//     </div>
//   )
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import Image from 'next/image'
import {
  Phone,
  CheckCircle2,
  Star,
  Shield,
  Clock,
  Award,
  Wind,
  Layers,
  PanelsTopLeft,
  Percent,
  ThermometerSun,
} from 'lucide-react'
import LPForm from '@/components/tetto94/lp-form'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import Tetto94Logo from '@/components/tetto94/logo'
import { trackPhoneClick } from '@/lib/gtag'
import type { LandingPageConfig } from '@/data/landing-pages'

const PHONE = '+39 351 651 9363'
const PHONE_TEL = 'tel:+393516519363'

const USP_BULLETS = [
  'Lavoriamo senza ponteggi',
  'Ispezione con drone gratuita',
  'Meno dispersione di calore, fino al 30-40%',
]

const STATS = [
  { value: 30, suffix: '+', label: 'Anni di esperienza' },
  { value: 500, suffix: '+', label: 'Lavori completati' },
]

const REVIEWS = [
  {
    name: 'Marco Ferretti',
    city: 'Venezia',
    rating: 5,
    text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile. Consigliato al 100%.",
  },
  {
    name: 'Giulia Marchetti',
    city: 'Mestre',
    rating: 5,
    text: 'Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità, rispetto dei tempi. Ottimo rapporto qualità/prezzo.',
  },
]

const NO_SCAFFOLDING_BULLETS = [
  'Nessun permesso comunale necessario: interveniamo subito',
  'Zero rischio cantiere: tecniche avanzate e certificate',
  "Risparmio fino all'80% sui costi di ponteggio",
]

const METHOD_CARDS = [
  {
    icon: PanelsTopLeft,
    label: "Dall'esterno",
    title: "Coibentazione dall'esterno",
    text: 'Pannelli isolanti posati sopra la copertura durante il rifacimento del manto. La soluzione più efficace, senza togliere spazio interno.',
  },
  {
    icon: Layers,
    label: "Dall'interno",
    title: 'Isolamento dall\'interno',
    text: 'Pannelli applicati sul lato interno della copertura o del solaio. Ideale quando non si vuole intervenire sul manto esterno.',
  },
  {
    icon: Wind,
    label: 'Insufflaggio',
    title: 'Insufflaggio del sottotetto',
    text: 'Materiale isolante insufflato nel sottotetto non abitato. Rapido, economico e senza opere murarie.',
  },
]

const TRUST_STRIP = [
  'Materiali isolanti certificati CE',
  'Garanzia scritta 10 anni',
  'Oltre 500 lavori completati',
  'Assistenza sulle detrazioni fiscali',
  'Sopralluogo con drone gratuito',
  'Preventivo entro 24 ore',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-[#EB1C26] text-[#EB1C26]" />
      ))}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
      <span className="size-1.5 rounded-full bg-[#EB1C26]" />
      {children}
    </span>
  )
}

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  )
}

interface Props {
  config: LandingPageConfig
}

export default function InsulationLandingPageTemplate({ config }: Props) {
  const methodsRef = useRef(null)
  const methodsInView = useInView(methodsRef, { once: true, margin: '-10%' })

  const noScaffRef = useRef(null)
  const noScaffInView = useInView(noScaffRef, { once: true, margin: '-10%' })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

  const reviewsRef = useRef(null)
  const reviewsInView = useInView(reviewsRef, { once: true, margin: '-10%' })

  const pricingRef = useRef(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: '-10%' })

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ─────────────────────────────────────────────────────
          MOBILE STICKY PHONE BAR
      ───────────────────────────────────────────────────── */}
      <a
        href={PHONE_TEL}
        onClick={() => trackPhoneClick('lp_mobile_sticky')}
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_-8px_24px_rgba(0,0,0,0.15)] sm:hidden"
        aria-label={`Chiama Tetto94: ${PHONE}`}
      >
        <Phone className="size-4" />
        Chiama ora · {PHONE}
      </a>

      {/* ─────────────────────────────────────────────────────
          01 · HEADER — Logo only + phone, zero nav, dark (matches site-wide navbar)
          Solid background, no backdrop-blur: `sticky` + `backdrop-filter` forces the
          browser to recompute a blurred copy of everything scrolling underneath on
          every frame, which is exactly what caused the mobile scroll jank on the
          homepage navbar. Fixed there with a solid bg; same fix here.
      ───────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#161616]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Tetto94Logo className="h-16 w-auto md:h-20" alt="Tetto94" />
          <a
            href={PHONE_TEL}
            onClick={() => trackPhoneClick('lp_header')}
            className="flex items-center gap-2 rounded-full bg-[#EB1C26] px-4 py-2.5 text-xs font-bold text-white shadow-[0_6px_20px_rgba(235,28,38,0.35)] transition-transform hover:scale-[1.03] sm:text-sm"
            aria-label={`Chiama Tetto94: ${PHONE}`}
          >
            <Phone className="size-3.5" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Chiama ora</span>
          </a>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────
          02 · HERO — light gradient mesh + H1 + form
      ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#FBFAF9]">
        {/* Ambient light mesh */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 -top-40 size-[32rem] rounded-full bg-[#EB1C26]/10 blur-[110px]" />
          <div className="absolute -right-24 top-10 size-[26rem] rounded-full bg-[#EB1C26]/[0.07] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(#161616 1px, transparent 1px), linear-gradient(90deg, #161616 1px, transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-14 lg:py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            {/* Left — copy */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 self-start rounded-full border border-[#EB1C26]/20 bg-[#EB1C26]/8 px-3.5 py-1.5"
              >
                <span className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26]">
                  Dal 1994 · {config.region}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.2rem,5.2vw,3.8rem)] leading-[0.98] text-[#161616] text-balance"
              >
                Coibentazione tetto in{' '}
                <span className="text-[#EB1C26]">{config.region}</span>? Interveniamo senza ponteggi.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="max-w-md text-base leading-relaxed text-[#161616]/60"
              >
                Isoliamo tetto e sottotetto con sopralluogo drone gratuito e garanzia scritta 10 anni. Meno
                dispersione di calore, bollette più leggere.
              </motion.p>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-2.5"
              >
                {USP_BULLETS.map((usp, i) => (
                  <motion.li
                    key={usp}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
                    className="flex items-center gap-2.5 text-sm text-[#161616]/75"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
                      <CheckCircle2 className="size-3.5 text-[#EB1C26]" />
                    </span>
                    {usp}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Micro trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap items-center gap-4 border-t border-[#161616]/8 pt-5"
              >
                <div className="flex items-center gap-1.5">
                  <StarRating rating={5} />
                  <span className="text-xs font-semibold text-[#161616]/50">4.9 su Google</span>
                </div>
                <span className="hidden h-4 w-px bg-[#161616]/10 sm:block" aria-hidden="true" />
                <a
                  href={PHONE_TEL}
                  onClick={() => trackPhoneClick('lp_hero')}
                  className="flex items-center gap-2 text-sm text-[#161616]/45 transition-colors hover:text-[#161616]"
                >
                  <Phone className="size-3.5" />
                  Preferisci chiamare? {PHONE}
                </a>
              </motion.div>
            </div>

            {/* Right — form (above fold on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Floating trust chip */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -top-4 right-6 z-10 hidden items-center gap-1.5 rounded-full bg-[#161616] px-3.5 py-2 shadow-xl sm:flex"
              >
                <Clock className="size-3.5 text-[#EB1C26]" />
                <span className="text-xs font-bold text-white">Risposta in 24h</span>
              </motion.div>

              <div className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]">
                <div className="mb-4 px-5 pt-5">
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
                    Sopralluogo gratuito in {config.region}
                  </p>
                  <p className="text-sm text-[#161616]/55">Compila il modulo, ti richiamiamo entro 24 ore.</p>
                </div>
                <div className="px-5 pb-5">
                  <LPForm
                    region={config.region}
                    formId="lp-form-top"
                    pageId={config.pageId}
                    service="Coibentazione Tetto"
                  />
                </div>
              </div>

              {/* Floating drone trust card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute -bottom-6 -left-6 hidden items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-2.5 pr-4 shadow-xl lg:flex"
              >
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="/images/drone-inspection.jpg"
                    alt="Sopralluogo con drone Tetto94"
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#161616]">Sopralluogo via drone</p>
                  <p className="text-[11px] text-[#161616]/45">Incluso, senza costi</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Trust marquee strip */}
        <div className="relative mt-10 overflow-hidden border-t border-[#161616]/8 bg-white py-4 lg:mt-14">
          <div className="flex w-max animate-marquee gap-10">
            {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
              <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                <CheckCircle2 className="size-3.5 shrink-0 text-[#EB1C26]" />
                <span className="text-xs font-semibold uppercase tracking-wide text-[#161616]/45">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          03 · 3 MODI PER COIBENTARE IL TETTO — new section
      ────────��──────────────────────────────────────────── */}
      <section ref={methodsRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={methodsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <SectionLabel>Come Interveniamo</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              3 MODI PER <span className="text-[#EB1C26]">COIBENTARE</span> IL TETTO
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-3">
            {METHOD_CARDS.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 28 }}
                animate={methodsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                className="group flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6 transition-colors hover:border-[#EB1C26]/30 hover:bg-white hover:shadow-[0_20px_45px_-24px_rgba(22,22,22,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#EB1C26]/10 text-[#EB1C26] transition-colors group-hover:bg-[#EB1C26] group-hover:text-white">
                    <card.icon className="size-5" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#161616]/30">
                    {card.label}
                  </span>
                </div>
                <h3 className="font-display text-lg leading-tight text-[#161616]">{card.title}</h3>
                <p className="text-sm leading-relaxed text-[#161616]/55">{card.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={methodsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-8 max-w-2xl rounded-xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-5 text-center text-sm leading-relaxed text-[#161616]/70"
          >
            Non sai quale fa per te? Con il sopralluogo drone gratuito ti indichiamo la soluzione giusta per la tua
            copertura, con preventivo entro 24 ore.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          04 · LAVORIAMO SENZA PONTEGGI
      ───────────────────────────────────────────────────── */}
      <section ref={noScaffRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(22,22,22,0.35)]">
                <Image
                  src="/images/coibentazione-hero.jpeg"
                  alt={`Posa di isolamento termico sul tetto in ${config.region} — Tetto94`}
                  width={720}
                  height={540}
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl border border-[#161616]/8 bg-white p-3 pr-5 shadow-xl sm:left-6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/10">
                  <ThermometerSun className="size-4 text-[#EB1C26]" />
                </span>
                <div>
                  <p className="font-display text-lg leading-none text-[#161616]">-30/40%</p>
                  <p className="text-[11px] text-[#161616]/45">dispersione di calore</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 flex flex-col gap-5 lg:order-2"
            >
              <div>
                <SectionLabel>Il Nostro Vantaggio</SectionLabel>
                <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.3rem)] leading-[0.98] text-[#161616]">
                  LAVORIAMO <span className="text-[#EB1C26]">SENZA</span> PONTEGGI.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#161616]/55">
                  In {config.region} coibentiamo tetti e sottotetti da 30 anni senza ponteggi. Tecniche avanzate,
                  attrezzature certificate e zero compromessi sulla sicurezza.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {NO_SCAFFOLDING_BULLETS.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    initial={{ opacity: 0, y: 14 }}
                    animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                    className="flex items-start gap-3 rounded-xl border border-[#161616]/8 bg-white p-4"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]">
                      <CheckCircle2 className="size-3 text-white" />
                    </span>
                    <span className="text-sm leading-snug text-[#161616]/70">{bullet}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          05 · ECOBONUS STRIP
      ───────────────────────────────────────────────────── */}
      <section className="border-t border-[#161616]/8 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#EB1C26]/15 bg-[#EB1C26]/5 p-6 text-center sm:flex-row sm:text-left">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EB1C26]/12 text-[#EB1C26]">
              <Percent className="size-5" />
            </span>
            <p className="text-sm leading-relaxed text-[#161616]/70">
              La coibentazione del tetto può accedere alle detrazioni fiscali per l&apos;efficienza energetica. Ti
              aiutiamo a capire quale agevolazione si applica al tuo caso e prepariamo la documentazione.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          06 · STATS BAR
      ───────────────────────────────────────────────────── */}
      <section ref={statsRef} className="border-t border-[#c91520] bg-[#EB1C26] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16 lg:gap-24">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-white">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          07 · 2 CLIENT REVIEWS
      ───────────────────────────────────────────────────── */}
      <section ref={reviewsRef} className="border-t border-[#161616]/8 bg-[#FBFAF9] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <SectionLabel>Testimonianze</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:gap-6">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 28 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex flex-col gap-4 rounded-2xl border border-[#161616]/8 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(22,22,22,0.25)]"
              >
                <StarRating rating={review.rating} />
                <p className="text-sm italic leading-relaxed text-[#161616]/65">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-auto flex items-center gap-3 border-t border-[#161616]/8 pt-2">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EB1C26] font-display text-base text-white">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#161616]">{review.name}</p>
                    <p className="text-xs text-[#161616]/40">{review.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          08 · PRICING ANCHOR + FINAL CTA FORM (repeated)
      ───────────────────────────────────────────────────── */}
      <section ref={pricingRef} className="border-t border-[#161616]/8 bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div>
                <SectionLabel>Prezzi Trasparenti</SectionLabel>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[0.98] text-[#161616]">
                  COIBENTAZIONE IN {config.region.toUpperCase()} A PARTIRE DA:
                </h2>
              </div>

              <div className="rounded-2xl border border-[#161616]/8 bg-[#FBFAF9] p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40">
                  Interventi a partire da
                </p>
                <div className="mb-4 flex items-baseline gap-2">
                  <span className="font-display text-[3.5rem] leading-none text-[#EB1C26]">€ 35</span>
                  <span className="font-sans text-lg text-[#161616]/50">/m²</span>
                </div>
                <ul className="mt-4 flex flex-col gap-2 border-t border-[#161616]/8 pt-4">
                  {[
                    { icon: Shield, text: 'Garanzia scritta 10 anni' },
                    { icon: Award, text: 'Materiali certificati CE' },
                    { icon: Clock, text: 'Preventivo entro 24 ore' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2 text-xs text-[#161616]/55">
                      <Icon className="size-3.5 shrink-0 text-[#EB1C26]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs leading-relaxed text-[#161616]/35">
                Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl border border-[#161616]/8 bg-white p-1 shadow-[0_24px_60px_-20px_rgba(22,22,22,0.18)]"
            >
              <div className="mb-4 px-5 pt-5">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/35">
                  Richiedi il tuo sopralluogo
                </p>
                <p className="text-sm text-[#161616]/55">
                  Sopralluogo gratuito con drone in {config.region}. Nessun impegno.
                </p>
              </div>
              <div className="px-5 pb-5">
                <LPForm
                  region={config.region}
                  formId="lp-form-bottom"
                  pageId={config.pageId}
                  service="Coibentazione Tetto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          09 · MINIMAL FOOTER — Logo + phone only, dark (matches site-wide footer)
      ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 bg-[#0d0d0d] py-8 pb-24 sm:pb-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Tetto94Logo className="h-16 w-auto opacity-80 md:h-20" alt="Tetto94" />
          <a
            href={PHONE_TEL}
            onClick={() => trackPhoneClick('lp_footer')}
            className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            <Phone className="size-3.5" />
            {PHONE}
          </a>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
