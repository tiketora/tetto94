// 'use client'

// import type { ReactNode } from 'react'
// import { Phone, CheckCircle2, Shield, Clock, Award } from 'lucide-react'
// import LPForm from '@/components/tetto94/lp-form'
// import BeforeAfterSlider from '@/components/tetto94/before-after-slider'
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
// import { LPScaffoldingVisual } from '@/components/tetto94/lp/lp-scaffolding-visual'
// import { LPFaq, LPIncludedList } from '@/components/tetto94/lp/lp-faq'
// import {
//   FALLBACK_REVIEWS,
//   LPGoogleBadge,
//   LPPhotoStrip,
//   LPReadAllLink,
//   LPReviewCards,
//   formatRating,
//   type LPReview,
// } from '@/components/tetto94/lp/lp-reviews'
// import { trackPhoneClick } from '@/lib/gtag'
// import type { GoogleReviewsData } from '@/lib/google-reviews'
// import type { LandingPageConfig } from '@/data/landing-pages'

// const USP_BULLETS = [
//   'Lavoriamo senza ponteggi',
//   'Ispezione con drone gratuita',
//   '32+ anni di esperienza',
// ]

// const NO_SCAFFOLDING_BULLETS = [
//   'Nessun permesso comunale necessario — interveniamo subito',
//   'Zero rischio cantiere — tecniche avanzate e certificate',
//   "Risparmio fino all'80% sui costi di ponteggio",
// ]

// const PRICE_FACTS = [
//   { icon: Shield, text: 'Garanzia scritta 10 anni' },
//   { icon: Award, text: 'Materiali certificati CE' },
//   { icon: Clock, text: 'Preventivo entro 24 ore' },
// ]

// interface Props {
//   config: LandingPageConfig
//   google?: GoogleReviewsData | null
//   heroVisual?: ReactNode
// }

// export default function LandingPageTemplate({ config, google = null, heroVisual = null }: Props) {
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
//       <LPStickyCallBar label={`Chiama ora — ${LP_PHONE}`} />
//       <LPHeader />

//       <main>
//         {/* Hero + form (above the fold on desktop, right under the H1 on mobile) */}
//         <section className="bg-white py-8 md:py-12 lg:py-14" aria-labelledby="lp-hero-title">
//           <div className="mx-auto grid w-full max-w-[1200px] items-start gap-8 px-5 md:gap-10 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
//             <div className="flex flex-col gap-6">
//               <LPPill>
//                 Dal 1994 · {config.region}
//               </LPPill>

//               <T94Heading as="h1" id="lp-hero-title" className="max-w-[18ch] lg:max-w-none">
//                 {config.h1}
//               </T94Heading>

//               <p className="t94-lead max-w-[34rem]">{config.subheadline}</p>

//               {heroVisual && <div className="-my-1 md:my-0">{heroVisual}</div>}

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

//               <a
//                 href={LP_PHONE_TEL}
//                 onClick={() => trackPhoneClick('lp_hero')}
//                 className="t94-body hidden min-h-[48px] items-center gap-2 self-start font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red sm:inline-flex"
//               >
//                 <Phone className="size-[18px] text-t94-red" aria-hidden="true" />
//                 Preferisci chiamare? {LP_PHONE}
//               </a>
//             </div>

//             <LPFormCard
//               title={`Sopralluogo gratuito in ${config.region}`}
//               subtitle="Compila il modulo — ti richiamiamo entro 24 ore."
//             >
//               <LPForm region={config.region} formId="lp-form-top" pageId={config.pageId} bare />
//             </LPFormCard>
//           </div>
//         </section>

//         {/* Trust strip */}
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
//             <div className="flex flex-col items-center text-center">
//               <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">32+</span>
//               <span className="t94-body mt-2 font-medium text-t94-text-secondary">Anni di esperienza</span>
//             </div>
//             <div className="flex flex-col items-center text-center">
//               <span className="font-t94 text-[48px] font-bold leading-none text-t94-dark md:text-[56px]">500+</span>
//               <span className="t94-body mt-2 font-medium text-t94-text-secondary">Lavori completati</span>
//             </div>
//           </div>
//         </section>

//         {/* Before / after */}
//         <T94Section labelledBy="lp-before-after-title">
//           <div className="mx-auto mb-10 flex max-w-[40rem] flex-col items-center gap-3 text-center">
//             <LPEyebrow>I nostri lavori</LPEyebrow>
//             <T94Heading id="lp-before-after-title">Prima e dopo</T94Heading>
//             <p className="t94-lead">
//               Ogni intervento eseguito in {config.region} è documentato con foto professionali prima e dopo i lavori.
//             </p>
//           </div>

//           <div className="overflow-hidden rounded-[14px] border border-t94-border">
//             <BeforeAfterSlider
//               beforeSrc="/images/before-roof.jpg"
//               afterSrc="/images/after-roof.jpg"
//               beforeAlt={`Tetto prima del rifacimento in ${config.region}`}
//               afterAlt={`Tetto dopo il rifacimento in ${config.region} — Tetto94`}
//             />
//           </div>
//         </T94Section>

//         {/* Senza ponteggi */}
//         <T94Section tone="grey" labelledBy="lp-no-scaffolding-title">
//           <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
//             <div className="flex flex-col gap-8">
//               <div className="flex flex-col gap-4">
//                 <LPEyebrow>Il nostro vantaggio</LPEyebrow>
//                 <T94Heading id="lp-no-scaffolding-title">Lavoriamo senza ponteggi.</T94Heading>
//                 <p className="t94-lead max-w-[34rem]">
//                   In {config.region} operiamo da 32 anni senza ponteggi. Tecniche avanzate, attrezzature certificate e
//                   zero compromessi sulla sicurezza.
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

//             <LPScaffoldingVisual />
//           </div>
//         </T94Section>

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

//           <div className="mt-14 flex flex-col gap-6 border-t border-t94-border pt-12">
//             <div className="flex flex-col gap-2">
//               <p className="t94-h3">Tetti rifatti in {config.region}</p>
//               <p className="t94-body text-t94-text-secondary">
//                 Foto reali dei nostri cantieri e recensioni verificate su Google.
//               </p>
//             </div>
//             <LPPhotoStrip pageId={config.pageId} />
//           </div>
//         </T94Section>

//         {/* What is included + FAQ */}
//         <T94Section tone="grey" labelledBy="lp-faq-title">
//           <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col gap-3">
//                 <LPEyebrow>Tutto compreso</LPEyebrow>
//                 <T94Heading id="lp-included-title">Cosa comprende il nostro intervento</T94Heading>
//               </div>
//               <LPIncludedList />
//             </div>

//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col gap-3">
//                 <LPEyebrow>Hai dubbi?</LPEyebrow>
//                 <T94Heading id="lp-faq-title">Domande frequenti</T94Heading>
//               </div>
//               <LPFaq />
//             </div>
//           </div>
//         </T94Section>

//         {/* Price anchor + final form */}
//         <T94Section labelledBy="lp-price-title">
//           <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//             <div className="flex flex-col gap-6">
//               <div className="flex flex-col gap-3">
//                 <LPEyebrow>Prezzi trasparenti</LPEyebrow>
//                 <T94Heading id="lp-price-title">Interventi in {config.region} a partire da:</T94Heading>
//               </div>

//               <div className="rounded-[14px] border border-t94-border bg-white p-6 md:p-8">
//                 <p className="t94-small font-semibold">Interventi a partire da</p>
//                 <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
//                   <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">€ 1.100</span>
//                   <span className="font-t94 text-[20px] text-t94-text-secondary line-through">€ 1.600</span>
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
//               <LPForm region={config.region} formId="lp-form-bottom" pageId={config.pageId} bare />
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

import type { ReactNode } from 'react'
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
  'Nessun ponteggio da autorizzare: si parte prima',
  'Lavoro su fune con linea vita provvisoria',
  'Nessun costo di ponteggio da pagare',
]

const PRICE_FACTS = [
  { icon: Shield, text: 'Garanzia scritta 10 anni' },
  { icon: Award, text: 'Materiali certificati CE' },
  { icon: Clock, text: 'Preventivo entro 24 ore' },
]

interface Props {
  config: LandingPageConfig
  google?: GoogleReviewsData | null
  heroVisual?: ReactNode
}

export default function LandingPageTemplate({ config, google = null, heroVisual = null }: Props) {
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
        <section className="bg-white py-8 md:py-12 lg:py-14" aria-labelledby="lp-hero-title">
          <div className="mx-auto grid w-full max-w-[1200px] items-start gap-8 px-5 md:gap-10 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <LPPill>
                Dal 1994 · {config.region}
              </LPPill>

              <T94Heading as="h1" id="lp-hero-title" className="max-w-[18ch] lg:max-w-none">
                {config.h1}
              </T94Heading>

              <p className="t94-lead max-w-[34rem]">{config.subheadline}</p>

              {heroVisual && <div className="-my-1 md:my-0">{heroVisual}</div>}

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
              subtitle="Compila il modulo: ti richiamiamo entro 24 ore."
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
