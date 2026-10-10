// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import Image from 'next/image'
// import { Phone, CheckCircle2, Star, Shield, Clock, Award, ChevronRight } from 'lucide-react'
// import Tetto94Logo from '@/components/tetto94/logo'
// import LPForm from '@/components/tetto94/lp-form'
// import BeforeAfterSlider from '@/components/tetto94/before-after-slider'
// import { trackPhoneClick } from '@/lib/gtag'
// import WhatsAppButton from '@/components/tetto94/whatsapp-button'
// import type { LandingPageConfig } from '@/data/landing-pages'

// const PHONE = '+39 351 651 9363'
// const PHONE_TEL = 'tel:+393516519363'

// const USP_BULLETS = [
//   'Lavoriamo senza ponteggi',
//   'Ispezione con drone gratuita',
//   '32+ anni di esperienza',
// ]

// const STATS = [
//   { value: '32+', label: 'Anni di esperienza' },
//   { value: '500+', label: 'Lavori completati' },
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
//   'Nessun permesso comunale necessario — interveniamo subito',
//   'Zero rischio cantiere — tecniche avanzate e certificate',
//   'Risparmio fino all\'80% sui costi di ponteggio',
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
//     <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//       {children}
//     </span>
//   )
// }

// interface Props {
//   config: LandingPageConfig
// }

// export default function LandingPageTemplate({ config }: Props) {
//   const statsRef = useRef(null)
//   const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

//   const beforeAfterRef = useRef(null)
//   const beforeAfterInView = useInView(beforeAfterRef, { once: true, margin: '-10%' })

//   const noScaffRef = useRef(null)
//   const noScaffInView = useInView(noScaffRef, { once: true, margin: '-10%' })

//   const reviewsRef = useRef(null)
//   const reviewsInView = useInView(reviewsRef, { once: true, margin: '-10%' })

//   const pricingRef = useRef(null)
//   const pricingInView = useInView(pricingRef, { once: true, margin: '-10%' })

//   return (
//     <div className="bg-white min-h-screen font-sans">

//       {/* ─────────────────────────────────────────────────────
//           MOBILE STICKY PHONE BAR
//       ───────────────────────────────────────────────────── */}
//       <a
//         href={PHONE_TEL}
//         onClick={() => trackPhoneClick('lp_mobile_sticky')}
//         className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white sm:hidden"
//         aria-label={`Chiama Tetto94: ${PHONE}`}
//       >
//         <Phone className="size-4" />
//         Chiama ora — {PHONE}
//       </a>

//       {/* ─────────────────────────────────────────────────────
//           01 · HEADER — Logo only + phone, zero nav
//       ───────────────────────────────────────────────────── */}
//       <header className="border-b border-white/8 bg-[#161616]/95 backdrop-blur-sm">
//         <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
//           <Tetto94Logo className="h-12 w-auto" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_header')}
//             className="hidden sm:flex items-center gap-2 text-sm font-bold text-white hover:text-[#EB1C26] transition-colors"
//             aria-label={`Chiama Tetto94: ${PHONE}`}
//           >
//             <div className="flex size-8 items-center justify-center bg-[#EB1C26]">
//               <Phone className="size-3.5 text-white" />
//             </div>
//             {PHONE}
//           </a>
//         </div>
//       </header>

//       {/* ─────────────────────────────────────────────────────
//           02 · HERO — H1 + subheadline + USPs + form (above fold)
//       ───────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden">
//         {/* Background image */}
//         <div className="absolute inset-0">
//           <Image
//             src="/images/hero-roof-mobile.png"
//             alt={`Rifacimento tetto in ${config.region} — Tetto94`}
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-[#161616]/80" />
//           <div className="absolute inset-0 bg-linear-to-r from-[#161616]/95 via-[#161616]/65 to-[#161616]/25" />
//         </div>

//         <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
//           <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">

//             {/* Left — copy */}
//             <div className="flex flex-col gap-6">
//               {/* Badge */}
//               <motion.div
//                 initial={{ opacity: 0, y: -12 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-flex items-center gap-2 border border-[#EB1C26]/30 bg-[#EB1C26]/10 px-3 py-1.5 self-start"
//               >
//                 <div className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
//                 <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26]">
//                   Dal 1994 · {config.region}
//                 </span>
//               </motion.div>

//               {/* H1 */}
//               <motion.h1
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
//                 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-white text-balance"
//               >
//                 {config.h1}
//               </motion.h1>

//               {/* Subheadline */}
//               <motion.p
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.65, delay: 0.2 }}
//                 className="text-base text-white/70 leading-relaxed max-w-md"
//               >
//                 {config.subheadline}
//               </motion.p>

//               {/* USP bullets */}
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
//                     className="flex items-center gap-2.5 text-sm text-white/85"
//                   >
//                     <CheckCircle2 className="size-4 shrink-0 text-[#EB1C26]" />
//                     {usp}
//                   </motion.li>
//                 ))}
//               </motion.ul>

//               {/* Desktop phone link */}
//               <motion.a
//                 href={PHONE_TEL}
//                 onClick={() => trackPhoneClick('lp_hero')}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.5 }}
//                 className="hidden sm:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors self-start"
//               >
//                 <Phone className="size-3.5" />
//                 Preferisci chiamare? {PHONE}
//               </motion.a>
//             </div>

//             {/* Right — form (above fold on desktop) */}
//             <motion.div
//               initial={{ opacity: 0, x: 32 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <div className="mb-4">
//                 <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
//                   Sopralluogo gratuito in {config.region}
//                 </p>
//                 <p className="text-white/60 text-sm">
//                   Compila il modulo — ti richiamiamo entro 24 ore.
//                 </p>
//               </div>
//               <LPForm region={config.region} formId="lp-form-top" pageId={config.pageId} />
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           05 · BEFORE / AFTER PHOTOS (static, side-by-side)
//       ───────────────────────────────────────────────────── */}
//       <section ref={beforeAfterRef} className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-[#161616]/8">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-10"
//           >
//             <SectionLabel>I Nostri Lavori</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               PRIMA E <span className="text-[#EB1C26]">DOPO</span>
//             </h2>
//             <p className="mt-3 text-sm text-[#161616]/50 max-w-md mx-auto">
//               Ogni intervento eseguito in {config.region} è documentato con foto professionali prima e dopo i lavori.
//             </p>
//           </motion.div>

//           {/* Static side-by-side — faster than slider, better conversion */}
//           <motion.div
//             initial={{ opacity: 0, y: 32 }}
//             animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//           >
//             <BeforeAfterSlider
//               beforeSrc="/images/before-roof.jpg"
//               afterSrc="/images/after-roof.jpg"
//               beforeAlt={`Tetto prima del rifacimento in ${config.region}`}
//               afterAlt={`Tetto dopo il rifacimento in ${config.region} — Tetto94`}
//             />
//           </motion.div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           06 · SENZA PONTEGGI — repurposed, 2-3 bullets
//       ───────────────────────────────────────────────────── */}
//       <section ref={noScaffRef} className="bg-white py-16 lg:py-20 border-t border-[#161616]/8">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//             >
//               <SectionLabel>Il Nostro Vantaggio</SectionLabel>
//               <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-[#161616]">
//                 LAVORIAMO{' '}
//                 <span className="text-[#EB1C26]">SENZA</span>{' '}
//                 PONTEGGI.
//               </h2>
//               <p className="mt-4 text-sm text-[#161616]/55 leading-relaxed max-w-md">
//                 In {config.region} operiamo da 32 anni senza ponteggi. Tecniche avanzate, attrezzature certificate e zero compromessi sulla sicurezza.
//               </p>
//             </motion.div>

//             <motion.ul
//               initial={{ opacity: 0, x: 24 }}
//               animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="flex flex-col gap-4"
//             >
//               {NO_SCAFFOLDING_BULLETS.map((bullet, i) => (
//                 <motion.li
//                   key={bullet}
//                   initial={{ opacity: 0, y: 16 }}
//                   animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
//                   className="flex items-start gap-3 border border-[#161616]/10 bg-[#161616]/4 p-4"
//                 >
//                   <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-[#EB1C26]">
//                     <CheckCircle2 className="size-3 text-white" />
//                   </div>
//                   <span className="text-sm text-[#161616]/70 leading-snug">{bullet}</span>
//                 </motion.li>
//               ))}
//             </motion.ul>

//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           07 · STATS BAR — 2 numbers only
//       ───────────────────────────────────────────────────── */}
//       <section ref={statsRef} className="bg-[#EB1C26] py-10 border-t border-[#c91520]">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24">
//             {STATS.map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={statsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.15 }}
//                 className="flex flex-col items-center text-center"
//               >
//                 <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-white">
//                   {stat.value}
//                 </span>
//                 <span className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
//                   {stat.label}
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ────────────────────────����────────────────────────────
//           08 · 2 CLIENT REVIEWS
//       ───────────────────────────────────────────────────── */}
//       <section ref={reviewsRef} className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-[#161616]/8">
//         <div className="mx-auto max-w-6xl px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6 }}
//             className="text-center mb-10"
//           >
//             <SectionLabel>Testimonianze</SectionLabel>
//             <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
//             </h2>
//           </motion.div>

//           <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
//             {REVIEWS.map((review, i) => (
//               <motion.div
//                 key={review.name}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.6, delay: i * 0.12 }}
//                 className="border border-[#161616]/10 bg-white p-6 flex flex-col gap-4"
//               >
//                 <StarRating rating={review.rating} />
//                 <p className="text-sm text-[#161616]/65 leading-relaxed italic">
//                   &ldquo;{review.text}&rdquo;
//                 </p>
//                 <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#161616]/8">
//                   <div className="flex size-9 items-center justify-center bg-[#EB1C26] font-display text-base text-white shrink-0">
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
//           09 · PRICING ANCHOR + FINAL CTA FORM (repeated)
//       ───────────────────────────────────────────────────── */}
//       <section ref={pricingRef} className="bg-white py-16 lg:py-20 border-t border-[#161616]/8">
//         <div className="mx-auto max-w-6xl px-6">
//           <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

//             {/* Pricing anchor */}
//             <motion.div
//               initial={{ opacity: 0, x: -24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7 }}
//               className="flex flex-col gap-6"
//             >
//               <div>
//                 <SectionLabel>Prezzi Trasparenti</SectionLabel>
//                 <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] text-[#161616]">
//                   INTERVENTI IN {config.region.toUpperCase()} A PARTIRE DA:
//                 </h2>
//               </div>

//               {/* Price display */}
//               <div className="border border-[#161616]/10 bg-[#F5F5F5] p-6">
//                 <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40 mb-3">
//                   Interventi a partire da
//                 </p>
//                 <div className="flex items-baseline gap-3 mb-4">
//                   <span className="text-sm text-[#161616]/35 line-through font-sans">€ 1.600</span>
//                   <span className="font-display text-[3.5rem] leading-none text-[#EB1C26]">€ 1.100</span>
//                 </div>
//                 <ul className="flex flex-col gap-2 mt-4 border-t border-[#161616]/8 pt-4">
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

//               <p className="text-xs text-[#161616]/35 leading-relaxed">
//                 Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
//               </p>
//             </motion.div>

//             {/* Repeated CTA form */}
//             <motion.div
//               initial={{ opacity: 0, x: 24 }}
//               animate={pricingInView ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 0.7, delay: 0.1 }}
//             >
//               <div className="mb-4">
//                 <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40 mb-1">
//                   Richiedi il tuo sopralluogo
//                 </p>
//                 <p className="text-[#161616]/60 text-sm">
//                   Sopralluogo gratuito con drone in {config.region}. Nessun impegno.
//                 </p>
//               </div>
//               <LPForm region={config.region} formId="lp-form-bottom" pageId={config.pageId} />
//             </motion.div>

//           </div>
//         </div>
//       </section>

//       {/* ─────────────────────────────────────────────────────
//           10 · MINIMAL FOOTER — Logo + phone + P.IVA only
//       ───────────────────────────────────────────────────── */}
//       <footer className="border-t border-white/8 bg-[#0d0d0d] py-8 pb-20 sm:pb-8">
//         <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <Tetto94Logo className="h-11 w-auto opacity-80" alt="Tetto94" />
//           <a
//             href={PHONE_TEL}
//             onClick={() => trackPhoneClick('lp_footer')}
//             className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
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

import { Phone, CheckCircle2, Shield, Clock, Award } from 'lucide-react'
import LPForm from '@/components/tetto94/lp-form'
import BeforeAfterSlider from '@/components/tetto94/before-after-slider'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
import {
  LPEyebrow,
  LPFooter,
  LPFormCard,
  LPHeader,
  LPPill,
  LPStars,
  LPStickyCallBar,
  LP_PHONE,
  LP_PHONE_TEL,
} from '@/components/tetto94/lp/lp-parts'
import { LPScaffoldingVisual } from '@/components/tetto94/lp/lp-scaffolding-visual'
import { LPFaq, LPIncludedList } from '@/components/tetto94/lp/lp-faq'
import {
  FALLBACK_REVIEWS,
  LPGoogleBadge,
  LPPhotoStrip,
  LPReadAllLink,
  LPReviewCards,
  formatRating,
  type LPReview,
} from '@/components/tetto94/lp/lp-reviews'
import { trackPhoneClick } from '@/lib/gtag'
import type { GoogleReviewsData } from '@/lib/google-reviews'
import type { LandingPageConfig } from '@/data/landing-pages'

const USP_BULLETS = [
  'Lavoriamo senza ponteggi',
  'Ispezione con drone gratuita',
  '32+ anni di esperienza',
]

const NO_SCAFFOLDING_BULLETS = [
  'Nessun permesso comunale necessario — interveniamo subito',
  'Zero rischio cantiere — tecniche avanzate e certificate',
  "Risparmio fino all'80% sui costi di ponteggio",
]

const PRICE_FACTS = [
  { icon: Shield, text: 'Garanzia scritta 10 anni' },
  { icon: Award, text: 'Materiali certificati CE' },
  { icon: Clock, text: 'Preventivo entro 24 ore' },
]

interface Props {
  config: LandingPageConfig
  google?: GoogleReviewsData | null
}

export default function LandingPageTemplate({ config, google = null }: Props) {
  const ratingLabel = formatRating(google)
  const reviews: LPReview[] = google
    ? google.reviews.slice(0, 3).map((r) => ({
        id: r.id,
        name: r.name,
        subtitle: r.when,
        photoUrl: r.photoUrl,
        authorUrl: r.authorUrl,
        rating: r.rating,
        text: r.text,
      }))
    : FALLBACK_REVIEWS

  return (
    <div className="t94-type min-h-screen bg-white">
      <LPStickyCallBar label={`Chiama ora — ${LP_PHONE}`} />
      <LPHeader />

      <main>
        {/* Hero + form (above the fold on desktop, right under the H1 on mobile) */}
        <section className="bg-white py-10 md:py-12 lg:py-14" aria-labelledby="lp-hero-title">
          <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-5 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <LPPill>
                Dal 1994 · {config.region}
              </LPPill>

              <T94Heading as="h1" id="lp-hero-title" className="max-w-[18ch] lg:max-w-none">
                {config.h1}
              </T94Heading>

              <p className="t94-lead max-w-[34rem]">{config.subheadline}</p>

              <ul className="flex flex-col gap-3">
                {USP_BULLETS.map((usp) => (
                  <li key={usp} className="t94-body flex items-center gap-3 font-medium text-t94-dark">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
                      <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
                    </span>
                    {usp}
                  </li>
                ))}
              </ul>

              <a
                href={LP_PHONE_TEL}
                onClick={() => trackPhoneClick('lp_hero')}
                className="t94-body hidden min-h-[48px] items-center gap-2 self-start font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red sm:inline-flex"
              >
                <Phone className="size-[18px] text-t94-red" aria-hidden="true" />
                Preferisci chiamare? {LP_PHONE}
              </a>
            </div>

            <LPFormCard
              title={`Sopralluogo gratuito in ${config.region}`}
              subtitle="Compila il modulo — ti richiamiamo entro 24 ore."
            >
              <LPForm region={config.region} formId="lp-form-top" pageId={config.pageId} bare />
            </LPFormCard>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-t94-border bg-t94-grey py-10" aria-label="Numeri Tetto94">
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start justify-items-center gap-8 px-5 sm:grid-cols-3 sm:gap-10 md:px-8">
            <div className="flex flex-col items-center text-center">
              <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">
                {ratingLabel}
              </span>
              <span className="mt-3">
                <LPStars value={Math.round(google?.rating ?? 5)} />
              </span>
              <span className="t94-body mt-2 font-medium text-t94-text-secondary">Valutazione su Google</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">32+</span>
              <span className="t94-body mt-2 font-medium text-t94-text-secondary">Anni di esperienza</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">500+</span>
              <span className="t94-body mt-2 font-medium text-t94-text-secondary">Lavori completati</span>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <T94Section labelledBy="lp-before-after-title">
          <div className="mx-auto mb-10 flex max-w-[40rem] flex-col items-center gap-3 text-center">
            <LPEyebrow>I nostri lavori</LPEyebrow>
            <T94Heading id="lp-before-after-title">Prima e dopo</T94Heading>
            <p className="t94-lead">
              Ogni intervento eseguito in {config.region} è documentato con foto professionali prima e dopo i lavori.
            </p>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-t94-border">
            <BeforeAfterSlider
              beforeSrc="/images/before-roof.jpg"
              afterSrc="/images/after-roof.jpg"
              beforeAlt={`Tetto prima del rifacimento in ${config.region}`}
              afterAlt={`Tetto dopo il rifacimento in ${config.region} — Tetto94`}
            />
          </div>
        </T94Section>

        {/* Senza ponteggi */}
        <T94Section tone="grey" labelledBy="lp-no-scaffolding-title">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <LPEyebrow>Il nostro vantaggio</LPEyebrow>
                <T94Heading id="lp-no-scaffolding-title">Lavoriamo senza ponteggi.</T94Heading>
                <p className="t94-lead max-w-[34rem]">
                  In {config.region} operiamo da 32 anni senza ponteggi. Tecniche avanzate, attrezzature certificate e
                  zero compromessi sulla sicurezza.
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {NO_SCAFFOLDING_BULLETS.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-4 rounded-[14px] border border-t94-border bg-white p-5"
                  >
                    <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
                      <CheckCircle2 className="size-5 text-t94-green" aria-hidden="true" />
                    </span>
                    <span className="t94-body font-medium text-t94-dark">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <LPScaffoldingVisual />
          </div>
        </T94Section>

        {/* Reviews */}
        <T94Section labelledBy="lp-reviews-title">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <LPEyebrow>Testimonianze</LPEyebrow>
            <T94Heading id="lp-reviews-title">Cosa dicono i nostri clienti</T94Heading>
            <LPGoogleBadge google={google} />
          </div>

          <LPReviewCards reviews={reviews} />

          <div className="mt-6 flex justify-center">
            <LPReadAllLink google={google} />
          </div>

          <div className="mt-14 flex flex-col gap-6 border-t border-t94-border pt-12">
            <div className="flex flex-col gap-2">
              <p className="t94-h3">Tetti rifatti in {config.region}</p>
              <p className="t94-body text-t94-text-secondary">
                Foto reali dei nostri cantieri e recensioni verificate su Google.
              </p>
            </div>
            <LPPhotoStrip pageId={config.pageId} />
          </div>
        </T94Section>

        {/* What is included + FAQ */}
        <T94Section tone="grey" labelledBy="lp-faq-title">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <LPEyebrow>Tutto compreso</LPEyebrow>
                <T94Heading id="lp-included-title">Cosa comprende il nostro intervento</T94Heading>
              </div>
              <LPIncludedList />
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <LPEyebrow>Hai dubbi?</LPEyebrow>
                <T94Heading id="lp-faq-title">Domande frequenti</T94Heading>
              </div>
              <LPFaq />
            </div>
          </div>
        </T94Section>

        {/* Price anchor + final form */}
        <T94Section labelledBy="lp-price-title">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <LPEyebrow>Prezzi trasparenti</LPEyebrow>
                <T94Heading id="lp-price-title">Interventi in {config.region} a partire da:</T94Heading>
              </div>

              <div className="rounded-[14px] border border-t94-border bg-white p-6 md:p-8">
                <p className="t94-small font-semibold">Interventi a partire da</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">€ 1.100</span>
                  <span className="font-t94 text-[20px] text-t94-text-secondary line-through">€ 1.600</span>
                </div>
                <ul className="mt-6 flex flex-col gap-3 border-t border-t94-border pt-5">
                  {PRICE_FACTS.map(({ icon: Icon, text }) => (
                    <li key={text} className="t94-body flex items-center gap-3 font-medium text-t94-dark">
                      <Icon className="size-5 shrink-0 text-t94-red" aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="t94-small">
                Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
              </p>
            </div>

            <LPFormCard
              title="Richiedi il tuo sopralluogo"
              subtitle={`Sopralluogo gratuito con drone in ${config.region}. Nessun impegno.`}
            >
              <LPForm region={config.region} formId="lp-form-bottom" pageId={config.pageId} bare />
            </LPFormCard>
          </div>
        </T94Section>
      </main>

      <LPFooter />
      <WhatsAppButton />
    </div>
  )
}
