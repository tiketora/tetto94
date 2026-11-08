// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import { useInView, animate } from 'framer-motion'
// import Image from 'next/image'
// import {
//   Phone,
//   CheckCircle2,
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
// import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
// import {
//   LPEyebrow,
//   LPFooter,
//   LPFormCard,
//   LPHeader,
//   LPPill,
//   LPStars,
//   LPStickyCallBar,
//   LP_PHONE,
//   LP_PHONE_TEL,
// } from '@/components/tetto94/lp/lp-parts'
// import {
//   FALLBACK_REVIEWS,
//   LPGoogleBadge,
//   LPReadAllLink,
//   LPReviewCards,
//   formatRating,
//   type LPReview,
// } from '@/components/tetto94/lp/lp-reviews'
// import { trackPhoneClick } from '@/lib/gtag'
// import type { LandingPageConfig } from '@/data/landing-pages'
// import type { GoogleReviewsData } from '@/lib/google-reviews'

// const USP_BULLETS = [
//   'Lavoriamo senza ponteggi',
//   'Ispezione con drone gratuita',
//   'Meno dispersione di calore, fino al 30-40%',
// ]

// const STATS = [
//   { value: 32, suffix: '+', label: 'Anni di esperienza' },
//   { value: 500, suffix: '+', label: 'Lavori completati' },
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
//     title: "Isolamento dall'interno",
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

// const PRICE_FACTS = [
//   { icon: Shield, text: 'Garanzia scritta 10 anni' },
//   { icon: Award, text: 'Materiali certificati CE' },
//   { icon: Clock, text: 'Preventivo entro 24 ore' },
// ]

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
//   google?: GoogleReviewsData | null
// }

// export default function InsulationLandingPageTemplate({ config, google = null }: Props) {
//   const ratingLabel = formatRating(google)
//   const reviews: LPReview[] = google
//     ? google.reviews.slice(0, 3).map((r) => ({
//         id: r.id,
//         name: r.name,
//         subtitle: r.when,
//         photoUrl: r.photoUrl,
//         authorUrl: r.authorUrl,
//         rating: r.rating,
//         text: r.text,
//       }))
//     : FALLBACK_REVIEWS

//   return (
//     <div className="t94-type min-h-screen bg-white">
//       <LPStickyCallBar label={`Chiama ora · ${LP_PHONE}`} />
//       <LPHeader mobileLabel="Chiama ora" />

//       <main>
//         {/* Hero + form */}
//         <section className="bg-white pt-10 md:pt-12 lg:pt-14" aria-labelledby="lp-hero-title">
//           <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-5 pb-10 md:px-8 md:pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
//             <div className="flex flex-col gap-6">
//               <LPPill>
//                 Dal 1994 · {config.region}
//               </LPPill>

//               <T94Heading as="h1" id="lp-hero-title" className="lg:max-w-none">
//                 Coibentazione tetto in {config.region}? Interveniamo senza ponteggi.
//               </T94Heading>

//               <p className="t94-lead max-w-[34rem]">
//                 Isoliamo tetto e sottotetto con sopralluogo drone gratuito e garanzia scritta 10 anni. Meno
//                 dispersione di calore, bollette più leggere.
//               </p>

//               <ul className="flex flex-col gap-3">
//                 {USP_BULLETS.map((usp) => (
//                   <li key={usp} className="t94-body flex items-center gap-3 font-medium text-t94-dark">
//                     <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//                       <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
//                     </span>
//                     {usp}
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-t94-border pt-5">
//                 <div className="flex items-center gap-2">
//                   <LPStars value={Math.round(google?.rating ?? 5)} />
//                   <span className="font-t94 text-[16px] font-semibold text-t94-dark">{ratingLabel} su Google</span>
//                 </div>
//                 <a
//                   href={LP_PHONE_TEL}
//                   onClick={() => trackPhoneClick('lp_hero')}
//                   className="t94-body hidden min-h-[48px] items-center gap-2 font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red sm:inline-flex"
//                 >
//                   <Phone className="size-[18px] text-t94-red" aria-hidden="true" />
//                   Preferisci chiamare? {LP_PHONE}
//                 </a>
//               </div>
//             </div>

//             <div className="flex flex-col gap-4">
//               <LPFormCard
//                 title={`Sopralluogo gratuito in ${config.region}`}
//                 subtitle="Compila il modulo, ti richiamiamo entro 24 ore."
//                 badge={
//                   <span className="hidden shrink-0 items-center gap-2 rounded-full bg-t94-dark px-4 py-2 font-t94 text-[15px] font-semibold text-white sm:inline-flex">
//                     <Clock className="size-4 text-white" aria-hidden="true" />
//                     Risposta in 24h
//                   </span>
//                 }
//               >
//                 <LPForm
//                   region={config.region}
//                   formId="lp-form-top"
//                   pageId={config.pageId}
//                   service="Coibentazione Tetto"
//                   bare
//                 />
//               </LPFormCard>

//               <div className="hidden items-center gap-4 rounded-[14px] border border-t94-border bg-t94-grey p-3 pr-5 lg:flex">
//                 <div className="relative size-14 shrink-0 overflow-hidden rounded-t94">
//                   <Image
//                     src="/images/drone-inspection.jpg"
//                     alt="Sopralluogo con drone Tetto94"
//                     fill
//                     sizes="56px"
//                     className="object-cover"
//                   />
//                 </div>
//                 <div>
//                   <p className="font-t94 text-[16px] font-semibold text-t94-dark">Sopralluogo via drone</p>
//                   <p className="t94-small">Incluso, senza costi</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Trust marquee */}
//           <div className="overflow-hidden border-t border-t94-border bg-t94-grey py-4" aria-label="Garanzie Tetto94">
//             <div className="flex w-max animate-marquee gap-10">
//               {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
//                 <div key={i} className="flex items-center gap-2 whitespace-nowrap" aria-hidden={i >= TRUST_STRIP.length}>
//                   <CheckCircle2 className="size-[18px] shrink-0 text-t94-green" aria-hidden="true" />
//                   <span className="font-t94 text-[16px] font-medium text-t94-dark">{item}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* 3 modi per coibentare il tetto */}
//         <T94Section labelledBy="lp-methods-title">
//           <div className="mb-10 flex flex-col items-center gap-3 text-center">
//             <LPEyebrow>Come interveniamo</LPEyebrow>
//             <T94Heading id="lp-methods-title">3 modi per coibentare il tetto</T94Heading>
//           </div>

//           <div className="grid gap-5 md:grid-cols-3">
//             {METHOD_CARDS.map((card) => (
//               <article
//                 key={card.title}
//                 className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6 transition-shadow hover:shadow-[0_20px_45px_-28px_rgba(27,27,27,0.35)]"
//               >
//                 <div className="flex items-center justify-between gap-3">
//                   <span className="flex size-12 items-center justify-center rounded-t94 bg-t94-red/10 text-t94-red">
//                     <card.icon className="size-6" aria-hidden="true" />
//                   </span>
//                   <span className="t94-small font-semibold">{card.label}</span>
//                 </div>
//                 <h3 className="t94-h3">{card.title}</h3>
//                 <p className="t94-body text-t94-text-secondary">{card.text}</p>
//               </article>
//             ))}
//           </div>

//           <p className="t94-body mx-auto mt-8 max-w-[44rem] rounded-[14px] border border-t94-border bg-t94-grey p-5 text-center text-t94-text">
//             Non sai quale fa per te? Con il sopralluogo drone gratuito ti indichiamo la soluzione giusta per la tua
//             copertura, con preventivo entro 24 ore.
//           </p>
//         </T94Section>

//         {/* Senza ponteggi */}
//         <T94Section tone="grey" labelledBy="lp-no-scaffolding-title">
//           <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
//             <div className="relative order-2 lg:order-1">
//               <div className="overflow-hidden rounded-[14px] border border-t94-border">
//                 <Image
//                   src="/images/coibentazione-hero.jpeg"
//                   alt={`Posa di isolamento termico sul tetto in ${config.region} — Tetto94`}
//                   width={720}
//                   height={540}
//                   sizes="(min-width: 1024px) 560px, 100vw"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[14px] border border-t94-border bg-white p-3 pr-5 shadow-[0_16px_40px_-20px_rgba(27,27,27,0.4)] sm:left-6">
//                 <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-t94-red/10">
//                   <ThermometerSun className="size-5 text-t94-red" aria-hidden="true" />
//                 </span>
//                 <div>
//                   <p className="font-t94 text-[20px] font-bold leading-none text-t94-dark">-30/40%</p>
//                   <p className="t94-small mt-1">dispersione di calore</p>
//                 </div>
//               </div>
//             </div>

//             <div className="order-1 flex flex-col gap-6 lg:order-2">
//               <div className="flex flex-col gap-4">
//                 <LPEyebrow>Il nostro vantaggio</LPEyebrow>
//                 <T94Heading id="lp-no-scaffolding-title">Lavoriamo senza ponteggi.</T94Heading>
//                 <p className="t94-lead max-w-[34rem]">
//                   In {config.region} coibentiamo tetti e sottotetti da 30 anni senza ponteggi. Tecniche avanzate,
//                   attrezzature certificate e zero compromessi sulla sicurezza.
//                 </p>
//               </div>

//               <ul className="flex flex-col gap-3">
//                 {NO_SCAFFOLDING_BULLETS.map((bullet) => (
//                   <li
//                     key={bullet}
//                     className="flex items-start gap-4 rounded-[14px] border border-t94-border bg-white p-5"
//                   >
//                     <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//                       <CheckCircle2 className="size-5 text-t94-green" aria-hidden="true" />
//                     </span>
//                     <span className="t94-body font-medium text-t94-dark">{bullet}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </T94Section>

//         {/* Ecobonus */}
//         <section className="bg-white py-12 md:py-16" aria-label="Detrazioni fiscali">
//           <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
//             <div className="flex flex-col items-center gap-4 rounded-[14px] border border-t94-border bg-t94-grey p-6 text-center sm:flex-row sm:text-left md:p-8">
//               <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-t94-red/10 text-t94-red">
//                 <Percent className="size-6" aria-hidden="true" />
//               </span>
//               <p className="t94-body text-t94-text">
//                 La coibentazione del tetto può accedere alle detrazioni fiscali per l&apos;efficienza energetica. Ti
//                 aiutiamo a capire quale agevolazione si applica al tuo caso e prepariamo la documentazione.
//               </p>
//             </div>
//           </div>coibentazione-hero.jpeg
//         </section>

//         {/* Stats */}
//         <section className="border-y border-t94-border bg-t94-grey py-10" aria-label="Numeri Tetto94">
//           <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start justify-items-center gap-8 px-5 sm:grid-cols-3 sm:gap-10 md:px-8">
//             <div className="flex flex-col items-center text-center">
//               <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">
//                 {ratingLabel}
//               </span>
//               <span className="mt-3">
//                 <LPStars value={Math.round(google?.rating ?? 5)} />
//               </span>
//               <span className="t94-body mt-2 font-medium text-t94-text-secondary">Valutazione su Google</span>
//             </div>
//             {STATS.map((stat) => (
//               <div key={stat.label} className="flex flex-col items-center text-center">
//                 <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">
//                   <CountUp to={stat.value} suffix={stat.suffix} />
//                 </span>
//                 <span className="t94-body mt-2 font-medium text-t94-text-secondary">{stat.label}</span>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Reviews */}
//         <T94Section labelledBy="lp-reviews-title">
//           <div className="mb-10 flex flex-col items-center gap-4 text-center">
//             <LPEyebrow>Testimonianze</LPEyebrow>
//             <T94Heading id="lp-reviews-title">Cosa dicono i nostri clienti</T94Heading>
//             <LPGoogleBadge google={google} />
//           </div>

//           <LPReviewCards reviews={reviews} />

//           <div className="mt-6 flex justify-center">
//             <LPReadAllLink google={google} />
//           </div>
//         </T94Section>

//         {/* Price anchor + final form */}
//         <T94Section tone="grey" labelledBy="lp-price-title">
//           <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col gap-3">
//                 <LPEyebrow>Prezzi trasparenti</LPEyebrow>
//                 <T94Heading id="lp-price-title">Coibentazione in {config.region} a partire da:</T94Heading>
//               </div>

//               <div className="rounded-[14px] border border-t94-border bg-white p-6 md:p-8">
//                 <p className="t94-small font-semibold">Interventi a partire da</p>
//                 <div className="mt-2 flex items-baseline gap-2">
//                   <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">€ 35</span>
//                   <span className="font-t94 text-[20px] text-t94-text-secondary">/m²</span>
//                 </div>
//                 <ul className="mt-6 flex flex-col gap-3 border-t border-t94-border pt-5">
//                   {PRICE_FACTS.map(({ icon: Icon, text }) => (
//                     <li key={text} className="t94-body flex items-center gap-3 font-medium text-t94-dark">
//                       <Icon className="size-5 shrink-0 text-t94-red" aria-hidden="true" />
//                       {text}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="t94-small">
//                 Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
//               </p>
//             </div>

//             <LPFormCard
//               title="Richiedi il tuo sopralluogo"
//               subtitle={`Sopralluogo gratuito con drone in ${config.region}. Nessun impegno.`}
//             >
//               <LPForm
//                 region={config.region}
//                 formId="lp-form-bottom"
//                 pageId={config.pageId}
//                 service="Coibentazione Tetto"
//                 bare
//               />
//             </LPFormCard>
//           </div>
//         </T94Section>
//       </main>

//       <LPFooter />
//       <WhatsAppButton />
//     </div>
//   )
// }


'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import Image from 'next/image'
import {
  Phone,
  CheckCircle2,
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
import {
  FALLBACK_REVIEWS,
  LPGoogleBadge,
  LPReadAllLink,
  LPReviewCards,
  formatRating,
  type LPReview,
} from '@/components/tetto94/lp/lp-reviews'
import { trackPhoneClick } from '@/lib/gtag'
import type { LandingPageConfig } from '@/data/landing-pages'
import type { GoogleReviewsData } from '@/lib/google-reviews'

const USP_BULLETS = [
  'Lavoriamo senza ponteggi',
  'Ispezione con drone gratuita',
  'Meno dispersione di calore, bollette più leggere',
]

const STATS = [
  { value: 32, suffix: '+', label: 'Anni di esperienza' },
  { value: 500, suffix: '+', label: 'Lavori completati' },
]

const NO_SCAFFOLDING_BULLETS = [
  'Nessun permesso comunale necessario: interveniamo subito',
  'Zero rischio cantiere: tecniche avanzate e certificate',
  'Nessun costo di ponteggio da pagare',
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
    title: "Isolamento dall'interno",
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

const PRICE_FACTS = [
  { icon: Shield, text: 'Garanzia scritta 10 anni' },
  { icon: Award, text: 'Materiali certificati CE' },
  { icon: Clock, text: 'Preventivo entro 24 ore' },
]

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
  google?: GoogleReviewsData | null
}

export default function InsulationLandingPageTemplate({ config, google = null }: Props) {
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
      <LPStickyCallBar label={`Chiama ora · ${LP_PHONE}`} />
      <LPHeader mobileLabel="Chiama ora" />

      <main>
        {/* Hero + form */}
        <section className="bg-white pt-10 md:pt-12 lg:pt-14" aria-labelledby="lp-hero-title">
          <div className="mx-auto grid w-full max-w-[1200px] items-start gap-10 px-5 pb-10 md:px-8 md:pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <LPPill>
                Dal 1994 · {config.region}
              </LPPill>

              <T94Heading as="h1" id="lp-hero-title" className="lg:max-w-none">
                Coibentazione tetto in {config.region}? Interveniamo senza ponteggi.
              </T94Heading>

              <p className="t94-lead max-w-[34rem]">
                Isoliamo tetto e sottotetto con sopralluogo drone gratuito e garanzia scritta 10 anni. Meno
                dispersione di calore, bollette più leggere.
              </p>

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

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-t94-border pt-5">
                <div className="flex items-center gap-2">
                  <LPStars value={Math.round(google?.rating ?? 5)} />
                  <span className="font-t94 text-[16px] font-semibold text-t94-dark">{ratingLabel} su Google</span>
                </div>
                <a
                  href={LP_PHONE_TEL}
                  onClick={() => trackPhoneClick('lp_hero')}
                  className="t94-body hidden min-h-[48px] items-center gap-2 font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red sm:inline-flex"
                >
                  <Phone className="size-[18px] text-t94-red" aria-hidden="true" />
                  Preferisci chiamare? {LP_PHONE}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <LPFormCard
                title={`Sopralluogo gratuito in ${config.region}`}
                subtitle="Compila il modulo: ti richiamiamo entro 24 ore."
                badge={
                  <span className="hidden shrink-0 items-center gap-2 rounded-full bg-t94-dark px-4 py-2 font-t94 text-[15px] font-semibold text-white sm:inline-flex">
                    <Clock className="size-4 text-white" aria-hidden="true" />
                    Risposta in 24h
                  </span>
                }
              >
                <LPForm
                  region={config.region}
                  formId="lp-form-top"
                  pageId={config.pageId}
                  service="Coibentazione Tetto"
                  bare
                />
              </LPFormCard>

              <div className="hidden items-center gap-4 rounded-[14px] border border-t94-border bg-t94-grey p-3 pr-5 lg:flex">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-t94">
                  <Image
                    src="/images/drone-inspection.jpg"
                    alt="Sopralluogo con drone Tetto94"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-t94 text-[16px] font-semibold text-t94-dark">Sopralluogo via drone</p>
                  <p className="t94-small">Incluso, senza costi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust marquee */}
          <div className="overflow-hidden border-t border-t94-border bg-t94-grey py-4" aria-label="Garanzie Tetto94">
            <div className="flex w-max animate-marquee gap-10">
              {[...TRUST_STRIP, ...TRUST_STRIP].map((item, i) => (
                <div key={i} className="flex items-center gap-2 whitespace-nowrap" aria-hidden={i >= TRUST_STRIP.length}>
                  <CheckCircle2 className="size-[18px] shrink-0 text-t94-green" aria-hidden="true" />
                  <span className="font-t94 text-[16px] font-medium text-t94-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 modi per coibentare il tetto */}
        <T94Section labelledBy="lp-methods-title">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <LPEyebrow>Come interveniamo</LPEyebrow>
            <T94Heading id="lp-methods-title">3 modi per coibentare il tetto</T94Heading>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {METHOD_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6 transition-shadow hover:shadow-[0_20px_45px_-28px_rgba(27,27,27,0.35)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-12 items-center justify-center rounded-t94 bg-t94-red/10 text-t94-red">
                    <card.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="t94-small font-semibold">{card.label}</span>
                </div>
                <h3 className="t94-h3">{card.title}</h3>
                <p className="t94-body text-t94-text-secondary">{card.text}</p>
              </article>
            ))}
          </div>

          <p className="t94-body mx-auto mt-8 max-w-[44rem] rounded-[14px] border border-t94-border bg-t94-grey p-5 text-center text-t94-text">
            Non sai quale fa per te? Con il sopralluogo drone gratuito ti indichiamo la soluzione giusta per la tua
            copertura, con preventivo entro 24 ore.
          </p>
        </T94Section>

        {/* Senza ponteggi */}
        <T94Section tone="grey" labelledBy="lp-no-scaffolding-title">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-[14px] border border-t94-border">
                <Image
                  src="/images/coibentazione-hero.png"
                  alt={`Posa di isolamento termico sul tetto in ${config.region} — Tetto94`}
                  width={720}
                  height={540}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[14px] border border-t94-border bg-white p-3 pr-5 shadow-[0_16px_40px_-20px_rgba(27,27,27,0.4)] sm:left-6">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-t94-red/10">
                  <ThermometerSun className="size-5 text-t94-red" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-t94 text-[20px] font-bold leading-none text-t94-dark">-30/40%</p>
                  <p className="t94-small mt-1">dispersione di calore</p>
                </div>
              </div>
            </div>

            <div className="order-1 flex flex-col gap-6 lg:order-2">
              <div className="flex flex-col gap-4">
                <LPEyebrow>Il nostro vantaggio</LPEyebrow>
                <T94Heading id="lp-no-scaffolding-title">Lavoriamo senza ponteggi.</T94Heading>
                <p className="t94-lead max-w-[34rem]">
                  In {config.region} coibentiamo tetti e sottotetti da 30 anni senza ponteggi. Tecniche avanzate,
                  attrezzature certificate e zero compromessi sulla sicurezza.
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
          </div>
        </T94Section>

        {/* Ecobonus */}
        <section className="bg-white py-12 md:py-16" aria-label="Detrazioni fiscali">
          <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
            <div className="flex flex-col items-center gap-4 rounded-[14px] border border-t94-border bg-t94-grey p-6 text-center sm:flex-row sm:text-left md:p-8">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-t94-red/10 text-t94-red">
                <Percent className="size-6" aria-hidden="true" />
              </span>
              <p className="t94-body text-t94-text">
                La coibentazione del tetto può accedere alle detrazioni fiscali per l&apos;efficienza energetica. Ti
                aiutiamo a capire quale agevolazione si applica al tuo caso e prepariamo la documentazione.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
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
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="t94-body mt-2 font-medium text-t94-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

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
        </T94Section>

        {/* Price anchor + final form */}
        <T94Section tone="grey" labelledBy="lp-price-title">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <LPEyebrow>Prezzi trasparenti</LPEyebrow>
                <T94Heading id="lp-price-title">Coibentazione in {config.region} a partire da:</T94Heading>
              </div>

              <div className="rounded-[14px] border border-t94-border bg-white p-6 md:p-8">
                <p className="t94-small font-semibold">Interventi a partire da</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">€ 35</span>
                  <span className="font-t94 text-[20px] text-t94-text-secondary">/m²</span>
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
              <LPForm
                region={config.region}
                formId="lp-form-bottom"
                pageId={config.pageId}
                service="Coibentazione Tetto"
                bare
              />
            </LPFormCard>
          </div>
        </T94Section>
      </main>

      <LPFooter />
      <WhatsAppButton />
    </div>
  )
}
