// import { Fragment, type ReactNode } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight, CheckCircle2, Plus } from 'lucide-react'
// import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
// import { T94Button } from '@/components/tetto94/ds/t94-button'
// import { LPEyebrow, LPStars } from '@/components/tetto94/lp/lp-parts'
// import { LPScaffoldingVisual } from '@/components/tetto94/lp/lp-scaffolding-visual'
// import {
//   LPGoogleBadge,
//   LPReadAllLink,
//   LPReviewCards,
//   formatRating,
// } from '@/components/tetto94/lp/lp-reviews'
// import { PHONE_LABEL, PHONE_TEL, sentence, toReviews } from '@/components/tetto94/service/service-utils'
// import { LOCATIONS, SERVICES, type ServiceConfig } from '@/data/services'
// import { getServiceWorks } from '@/data/works-gallery'
// import type { GoogleReviewsData } from '@/lib/google-reviews'

// type Tone = 'white' | 'grey'

// interface SectionProps {
//   service: ServiceConfig
//   tone: Tone
// }

// const NO_SCAFFOLDING_POINTS = [
//   "Risparmio fino all'80% sul costo del ponteggio",
//   'Nessun permesso comunale da aspettare',
//   'Cantiere più rapido, facciata libera',
// ]

// function SectionIntro({
//   eyebrow,
//   title,
//   titleId,
//   children,
//   center = false,
// }: {
//   eyebrow: string
//   title: string
//   titleId: string
//   children?: ReactNode
//   center?: boolean
// }) {
//   return (
//     <div className={`mb-10 flex max-w-[44rem] flex-col gap-4 md:mb-12 ${center ? 'mx-auto items-center text-center' : ''}`}>
//       <LPEyebrow>{eyebrow}</LPEyebrow>
//       <T94Heading id={titleId}>{title}</T94Heading>
//       {children}
//     </div>
//   )
// }

// function CheckItem({ children }: { children: ReactNode }) {
//   return (
//     <li className="flex items-start gap-4 rounded-[14px] border border-t94-border bg-white p-5">
//       <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//         <CheckCircle2 className="size-5 text-t94-green" aria-hidden="true" />
//       </span>
//       <span className="t94-body font-medium text-t94-dark">{children}</span>
//     </li>
//   )
// }

// /* ── Trust strip ─────────────────────────────────────────── */
// export function ServiceTrustStrip({ google }: { google: GoogleReviewsData | null }) {
//   const numbers = [
//     { value: '32+', label: 'Anni di esperienza' },
//     { value: '500+', label: 'Lavori completati' },
//     { value: '10 anni', label: 'Garanzia scritta' },
//     { value: '24h', label: 'Risposta garantita' },
//   ]
//   return (
//     <section className="t94-type border-y border-t94-border bg-t94-grey py-10 md:py-12" aria-label="Numeri Tetto94">
//       <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-6 gap-y-8 px-5 md:px-8 lg:grid-cols-5">
//         <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1">
//           <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">
//             {formatRating(google)}
//           </span>
//           <span className="mt-3">
//             <LPStars value={Math.round(google?.rating ?? 5)} />
//           </span>
//           <span className="t94-body mt-2 font-medium text-t94-text-secondary">Valutazione su Google</span>
//         </div>
//         {numbers.map((item) => (
//           <div key={item.label} className="flex flex-col items-center text-center">
//             <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">{item.value}</span>
//             <span className="t94-body mt-2 font-medium text-t94-text-secondary">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// /* ── Quanto costa ────────────────────────────────────────── */
// function CostSection({ service, tone }: SectionProps) {
//   const rows = service.prezziTable ?? []
//   const heading = service.costHeading
//     ? `${service.costHeading.white} ${service.costHeading.red}`
//     : `QUANTO COSTA IL ${service.name.toUpperCase()}?`
//   const intro =
//     service.costIntro ??
//     `Ecco i prezzi indicativi per ${service.name.toLowerCase()} in Veneto, IVA esclusa. Il costo finale dipende da metratura, materiali e stato del tetto.`
//   const note =
//     service.costNote ??
//     'I prezzi sono indicativi e variano in base alla metratura, ai materiali scelti e alle condizioni del tetto. Il preventivo definitivo arriva dopo il sopralluogo gratuito con drone.'

//   return (
//     <T94Section tone={tone} labelledBy="svc-cost-title">
//       <SectionIntro eyebrow="Prezzi" title={sentence(heading)} titleId="svc-cost-title">
//         <p className="t94-lead">{intro}</p>
//       </SectionIntro>

//       <div className="overflow-hidden rounded-[14px] border border-t94-border bg-white">
//         <table className="w-full border-collapse text-left">
//           <caption className="sr-only">Prezzi indicativi per {service.name.toLowerCase()}</caption>
//           <thead className="bg-t94-grey">
//             <tr className="font-t94 text-[15px] font-semibold text-t94-text-secondary">
//               <th scope="col" className="px-4 py-4 md:px-6">Tipo di intervento</th>
//               <th scope="col" className="px-3 py-4 text-right">Da</th>
//               <th scope="col" className="px-3 py-4 text-right md:px-6">A</th>
//               <th scope="col" className="hidden px-6 py-4 md:table-cell">Note</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, i) => (
//               <tr key={row.tipo} className="border-t border-t94-border align-top">
//                 <th scope="row" className="px-4 py-4 text-left font-normal md:px-6 md:py-5">
//                   <span className="flex flex-wrap items-center gap-2 font-t94 text-[17px] font-semibold text-t94-dark">
//                     {row.tipo}
//                     {i === 0 ? (
//                       <span className="rounded-full bg-t94-red/10 px-2.5 py-0.5 font-t94 text-[15px] font-semibold text-t94-red">
//                         Top
//                       </span>
//                     ) : null}
//                   </span>
//                   <span className="t94-small mt-1 block md:hidden">{row.note}</span>
//                 </th>
//                 <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-dark md:py-5">
//                   {row.prezzoMin}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-red md:px-6 md:py-5">
//                   {row.prezzoMax}
//                 </td>
//                 <td className="t94-small hidden px-6 py-5 md:table-cell">{row.note}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <p className="t94-small mt-6 max-w-[44rem]">{note}</p>
//     </T94Section>
//   )
// }

// /* ── Il servizio ─────────────────────────────────────────── */
// function IntroSection({ service, tone }: SectionProps) {
//   return (
//     <T94Section tone={tone} labelledBy="svc-intro-title">
//       <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
//         <div className="flex flex-col gap-4">
//           <LPEyebrow>Il servizio</LPEyebrow>
//           <T94Heading id="svc-intro-title">{sentence(service.nameFull)}</T94Heading>
//           <p className="t94-body text-t94-text-secondary">{service.longDescription}</p>
//         </div>

//         <div className="flex flex-col gap-5">
//           <p className="t94-h3">Perché sceglierci</p>
//           <ul className="flex flex-col gap-3">
//             {service.benefits.map((benefit) => (
//               <CheckItem key={benefit}>{benefit}</CheckItem>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Sezioni extra (es. coibentazione) ───────────────────── */
// function ExtraSection({
//   extra,
//   index,
//   tone,
// }: {
//   extra: NonNullable<ServiceConfig['extraSections']>[number]
//   index: number
//   tone: Tone
// }) {
//   const id = `svc-extra-${index}-title`
//   return (
//     <T94Section tone={tone} labelledBy={id}>
//       <SectionIntro
//         eyebrow={sentence(extra.kicker)}
//         title={sentence(`${extra.heading.white} ${extra.heading.red}`)}
//         titleId={id}
//       >
//         {extra.intro ? <p className="t94-lead">{extra.intro}</p> : null}
//         {extra.body ? <p className="t94-body text-t94-text-secondary">{extra.body}</p> : null}
//       </SectionIntro>

//       {extra.blocks ? (
//         <div className="grid gap-5 md:grid-cols-3">
//           {extra.blocks.map((block) => (
//             <div key={block.title} className="flex flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6">
//               <h3 className="t94-h3">{block.title}</h3>
//               <p className="t94-body text-t94-text-secondary">{block.body}</p>
//             </div>
//           ))}
//         </div>
//       ) : null}
//     </T94Section>
//   )
// }

// /* ── Pacchetto completo ──────────────────────────────────── */
// function PackageSection({ service, tone }: SectionProps) {
//   const items = service.checklistItems ?? []
//   return (
//     <T94Section tone={tone} labelledBy="svc-package-title">
//       <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col gap-3">
//             <LPEyebrow>Tutto compreso</LPEyebrow>
//             <T94Heading id="svc-package-title">Ma quanto costerebbe tutto questo?</T94Heading>
//           </div>
//           <ul className="grid gap-3 sm:grid-cols-2">
//             {items.map((item) => (
//               <li
//                 key={item}
//                 className="flex items-center gap-3 rounded-[14px] border border-t94-border bg-white px-4 py-3.5"
//               >
//                 <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//                   <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
//                 </span>
//                 <span className="t94-body font-medium text-t94-dark">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {service.priceFrom ? (
//           <div className="flex flex-col gap-5 rounded-[14px] border border-t94-border bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,27,27,0.25)] md:p-8 lg:sticky lg:top-32">
//             <p className="t94-body font-semibold text-t94-dark">Con Tetto94 puoi avere tutto questo a partire da:</p>
//             <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
//               <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">{service.priceFrom}</span>
//               {service.oldPrice ? (
//                 <span className="font-t94 text-[22px] text-t94-text-secondary line-through">{service.oldPrice}</span>
//               ) : null}
//             </div>
//             <p className="t94-small border-t border-t94-border pt-5">
//               Ispezione drone gratuita · Preventivo entro 24 ore · Garanzia scritta 10 anni
//             </p>
//             <T94Button href="/contatti" fullWidth>
//               Richiedi preventivo gratuito
//             </T94Button>
//           </div>
//         ) : null}
//       </div>
//     </T94Section>
//   )
// }

// /* ── Senza ponteggi (versione breve) ─────────────────────── */
// function NoScaffoldingSection({ service, tone }: SectionProps) {
//   const linkLabel =
//     service.slug === 'rifacimento-tetto'
//       ? 'Come funziona il rifacimento senza ponteggi'
//       : 'Come lavoriamo senza ponteggi'
//   return (
//     <T94Section tone={tone} labelledBy="svc-scaffold-title">
//       <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
//         <div className="flex flex-col gap-8">
//           <div className="flex flex-col gap-4">
//             <LPEyebrow>Il nostro vantaggio</LPEyebrow>
//             <T94Heading id="svc-scaffold-title">Perché senza ponteggi conviene</T94Heading>
//           </div>
//           <ul className="flex flex-col gap-3">
//             {NO_SCAFFOLDING_POINTS.map((point) => (
//               <CheckItem key={point}>{point}</CheckItem>
//             ))}
//           </ul>
//           <Link
//             href="/#senza-ponteggi"
//             className="inline-flex min-h-[48px] items-center gap-2 self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red"
//           >
//             {linkLabel}
//             <ArrowRight className="size-5 text-t94-red" aria-hidden="true" />
//           </Link>
//         </div>
//         <LPScaffoldingVisual />
//       </div>
//     </T94Section>
//   )
// }

// /* ── Come lavoriamo ──────────────────────────────────────── */
// function StepsSection({ service, tone }: SectionProps) {
//   return (
//     <T94Section tone={tone} labelledBy="svc-steps-title">
//       <SectionIntro eyebrow="Come lavoriamo" title="Il processo in 4 step" titleId="svc-steps-title" center />
//       <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {service.steps.map((step, i) => (
//           <li key={step.title} className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6">
//             <span className="flex size-12 items-center justify-center rounded-full bg-t94-red font-t94 text-[20px] font-bold text-white">
//               {i + 1}
//             </span>
//             <h3 className="t94-h3">{step.title}</h3>
//             <p className="t94-body text-t94-text-secondary">{step.desc}</p>
//           </li>
//         ))}
//       </ol>
//     </T94Section>
//   )
// }

// /* ── Lavori eseguiti + recensioni ────────────────────────── */
// function WorksReviewsSection({
//   service,
//   tone,
//   google,
// }: SectionProps & { google: GoogleReviewsData | null }) {
//   const photos = getServiceWorks(service.slug)
//   return (
//     <T94Section tone={tone} labelledBy="svc-works-title">
//       {photos.length > 0 ? (
//         <>
//           <SectionIntro eyebrow="Lavori eseguiti" title={service.name} titleId="svc-works-title">
//             <p className="t94-lead">
//               Una selezione di interventi reali documentati con ispezione drone — ogni tetto, una storia di cura.
//             </p>
//           </SectionIntro>
//           <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
//             {photos.map((photo, i) => (
//               <li
//                 key={photo.src}
//                 className="group relative aspect-[4/5] overflow-hidden rounded-[14px] border border-t94-border bg-t94-grey"
//               >
//                 <Image
//                   src={photo.src}
//                   alt={photo.alt}
//                   fill
//                   loading="lazy"
//                   sizes="(max-width: 1024px) 50vw, 285px"
//                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//                 <span
//                   className="absolute inset-0 bg-gradient-to-t from-t94-dark/35 via-transparent to-transparent"
//                   aria-hidden="true"
//                 />
//                 <span className="absolute bottom-2.5 left-3 font-t94 text-[15px] font-semibold text-white tabular-nums">
//                   {String(i + 1).padStart(2, '0')}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : null}

//       <div className={photos.length > 0 ? 'mt-14 border-t border-t94-border pt-12 md:mt-16' : ''}>
//         <div className="mb-10 flex flex-col items-center gap-4 text-center">
//           <LPEyebrow>Testimonianze</LPEyebrow>
//           {photos.length > 0 ? (
//             <h2 className="t94-h2 text-balance">Cosa dicono i nostri clienti</h2>
//           ) : (
//             <T94Heading id="svc-works-title">Cosa dicono i nostri clienti</T94Heading>
//           )}
//           <LPGoogleBadge google={google} />
//         </div>
//         <LPReviewCards reviews={toReviews(google)} />
//         <div className="mt-6 flex justify-center">
//           <LPReadAllLink google={google} />
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Dove operiamo ───────────────────────────────────────── */
// function LocationsSection({ service, tone }: SectionProps) {
//   const cities = LOCATIONS.slice(0, 12)
//   return (
//     <T94Section tone={tone} labelledBy="svc-locations-title">
//       <SectionIntro
//         eyebrow="Dove operiamo"
//         title={`${service.name} in tutto il Veneto`}
//         titleId="svc-locations-title"
//       >
//         {service.doveOperiamoIntro ? <p className="t94-lead">{service.doveOperiamoIntro}</p> : null}
//       </SectionIntro>
//       <ul className="flex flex-wrap gap-3">
//         {cities.map((city) => (
//           <li key={city.slug}>
//             <Link
//               href={`/${service.slug}/${city.slug}`}
//               prefetch={false}
//               className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-t94-border bg-white px-5 font-t94 text-[17px] font-medium text-t94-dark transition-colors hover:border-t94-dark"
//             >
//               {city.name}
//               <span className="text-[15px] font-semibold text-t94-red">{city.province}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </T94Section>
//   )
// }

// /* ── FAQ ─────────────────────────────────────────────────── */
// function FaqSection({ service, tone }: SectionProps) {
//   return (
//     <T94Section tone={tone} labelledBy="svc-faq-title">
//       <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
//         <div className="flex flex-col gap-4 lg:sticky lg:top-32">
//           <LPEyebrow>Hai dubbi?</LPEyebrow>
//           <T94Heading id="svc-faq-title">{`Domande frequenti su ${service.name.toLowerCase()}`}</T94Heading>
//           <p className="t94-lead">
//             Hai domande sul servizio di {service.name.toLowerCase()} nel Nord-Est Italia? Ecco le risposte alle
//             domande più frequenti dei nostri clienti.
//           </p>
//           <a
//             href={PHONE_TEL}
//             className="inline-flex min-h-[48px] items-center self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] hover:decoration-t94-red"
//           >
//             Oppure chiamaci: {PHONE_LABEL}
//           </a>
//         </div>
//         <div className="flex flex-col gap-3">
//           {service.faqItems.map((item, i) => (
//             <details
//               key={item.q}
//               open={i === 0}
//               className="group rounded-[14px] border border-t94-border bg-white transition-colors open:border-t94-dark/30"
//             >
//               <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-t94 text-[17px] font-semibold text-t94-dark marker:hidden [&::-webkit-details-marker]:hidden">
//                 {item.q}
//                 <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-t94-grey transition-transform duration-300 group-open:rotate-45">
//                   <Plus className="size-[18px] text-t94-red" aria-hidden="true" />
//                 </span>
//               </summary>
//               <p className="t94-body px-5 pb-5 text-t94-text-secondary">{item.a}</p>
//             </details>
//           ))}
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Altri servizi ───────────────────────────────────────── */
// function RelatedSection({ service, tone }: SectionProps) {
//   const others = SERVICES.filter((s) => s.slug !== service.slug)
//   return (
//     <T94Section tone={tone} labelledBy="svc-related-title">
//       <SectionIntro eyebrow="Altri servizi" title="Scopri gli altri servizi Tetto94" titleId="svc-related-title" center />
//       <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {others.map((other) => (
//           <li key={other.slug}>
//             <Link
//               href={`/${other.slug}`}
//               className="group flex h-full flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6 transition-colors hover:border-t94-dark"
//             >
//               <h3 className="t94-h3">{other.name}</h3>
//               <p className="t94-small line-clamp-3">{other.description}</p>
//               <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[16px] font-semibold text-t94-red">
//                 Scopri di più
//                 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </T94Section>
//   )
// }

// /* ── CTA finale ──────────────────────────────────────────── */
// function CtaBand({ service }: { service: ServiceConfig }) {
//   const title = service.ctaHeading
//     ? sentence(`${service.ctaHeading.white} ${service.ctaHeading.red}`)
//     : `Pronto per il tuo ${service.name.toLowerCase()}?`
//   return (
//     <section aria-labelledby="svc-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
//       <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
//         <h2 id="svc-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
//           {title}
//         </h2>
//         <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
//           Preventivo gratuito entro 24 ore · Ispezione drone inclusa · Garanzia scritta 10 anni
//         </p>
//         <T94Button href="/contatti" variant="outline" className="border-white">
//           Richiedi preventivo gratuito
//         </T94Button>
//       </div>
//     </section>
//   )
// }

// /**
//  * Everything below the hero + trust strip. Sections alternate white / grey in
//  * render order, so optional blocks (price table, package, extras) never leave
//  * two same-colour sections touching.
//  */
// export default function ServiceBody({
//   service,
//   google,
// }: {
//   service: ServiceConfig
//   google: GoogleReviewsData | null
// }) {
//   const blocks: { key: string; render: (tone: Tone) => ReactNode }[] = []

//   if (service.prezziTable?.length) {
//     blocks.push({ key: 'cost', render: (tone) => <CostSection service={service} tone={tone} /> })
//   }
//   blocks.push({ key: 'intro', render: (tone) => <IntroSection service={service} tone={tone} /> })
//   service.extraSections?.forEach((extra, index) => {
//     blocks.push({
//       key: `extra-${index}`,
//       render: (tone) => <ExtraSection extra={extra} index={index} tone={tone} />,
//     })
//   })
//   if (service.checklistItems?.length) {
//     blocks.push({ key: 'package', render: (tone) => <PackageSection service={service} tone={tone} /> })
//   }
//   blocks.push(
//     { key: 'scaffold', render: (tone) => <NoScaffoldingSection service={service} tone={tone} /> },
//     { key: 'steps', render: (tone) => <StepsSection service={service} tone={tone} /> },
//     { key: 'works', render: (tone) => <WorksReviewsSection service={service} tone={tone} google={google} /> },
//     { key: 'locations', render: (tone) => <LocationsSection service={service} tone={tone} /> },
//     { key: 'faq', render: (tone) => <FaqSection service={service} tone={tone} /> },
//     { key: 'related', render: (tone) => <RelatedSection service={service} tone={tone} /> },
//   )

//   return (
//     <>
//       {blocks.map((block, i) => (
//         <Fragment key={block.key}>{block.render(i % 2 === 0 ? 'white' : 'grey')}</Fragment>
//       ))}
//       <CtaBand service={service} />
//     </>
//   )
// }

// import { Fragment, type ReactNode } from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowRight, CheckCircle2, Plus } from 'lucide-react'
// import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
// import { T94Button } from '@/components/tetto94/ds/t94-button'
// import { LPEyebrow, LPStars } from '@/components/tetto94/lp/lp-parts'
// import { LPScaffoldingVisual } from '@/components/tetto94/lp/lp-scaffolding-visual'
// import {
//   LPGoogleBadge,
//   LPReadAllLink,
//   LPReviewCards,
//   formatRating,
// } from '@/components/tetto94/lp/lp-reviews'
// import { PHONE_LABEL, PHONE_TEL, sentence, toReviews } from '@/components/tetto94/service/service-utils'
// import { LOCATIONS, SERVICES, type ServiceConfig } from '@/data/services'
// import { getServiceWorks } from '@/data/works-gallery'
// import type { GoogleReviewsData } from '@/lib/google-reviews'

// export type Tone = 'white' | 'grey'

// export interface SectionProps {
//   service: ServiceConfig
//   tone: Tone
// }

// const NO_SCAFFOLDING_POINTS = [
//   "Risparmio fino all'80% sul costo del ponteggio",
//   'Nessun permesso comunale da aspettare',
//   'Cantiere più rapido, facciata libera',
// ]

// export function SectionIntro({
//   eyebrow,
//   title,
//   titleId,
//   children,
//   center = false,
// }: {
//   eyebrow: string
//   title: string
//   titleId: string
//   children?: ReactNode
//   center?: boolean
// }) {
//   return (
//     <div className={`mb-10 flex max-w-[44rem] flex-col gap-4 md:mb-12 ${center ? 'mx-auto items-center text-center' : ''}`}>
//       <LPEyebrow>{eyebrow}</LPEyebrow>
//       <T94Heading id={titleId}>{title}</T94Heading>
//       {children}
//     </div>
//   )
// }

// export function CheckItem({ children }: { children: ReactNode }) {
//   return (
//     <li className="flex items-start gap-4 rounded-[14px] border border-t94-border bg-white p-5">
//       <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//         <CheckCircle2 className="size-5 text-t94-green" aria-hidden="true" />
//       </span>
//       <span className="t94-body font-medium text-t94-dark">{children}</span>
//     </li>
//   )
// }

// /* ── Trust strip ─────────────────────────────────────────── */
// export function ServiceTrustStrip({ google }: { google: GoogleReviewsData | null }) {
//   const numbers = [
//     { value: '32+', label: 'Anni di esperienza' },
//     { value: '500+', label: 'Lavori completati' },
//     { value: '10 anni', label: 'Garanzia scritta' },
//     { value: '24h', label: 'Risposta garantita' },
//   ]
//   return (
//     <section className="t94-type border-y border-t94-border bg-t94-grey py-10 md:py-12" aria-label="Numeri Tetto94">
//       <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-6 gap-y-8 px-5 md:px-8 lg:grid-cols-5">
//         <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1">
//           <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">
//             {formatRating(google)}
//           </span>
//           <span className="mt-3">
//             <LPStars value={Math.round(google?.rating ?? 5)} />
//           </span>
//           <span className="t94-body mt-2 font-medium text-t94-text-secondary">Valutazione su Google</span>
//         </div>
//         {numbers.map((item) => (
//           <div key={item.label} className="flex flex-col items-center text-center">
//             <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">{item.value}</span>
//             <span className="t94-body mt-2 font-medium text-t94-text-secondary">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// /* ── Quanto costa ────────────────────────────────────────── */
// export function CostSection({
//   service,
//   tone,
//   override,
// }: SectionProps & {
//   override?: {
//     eyebrow: string
//     title: string
//     intro: string
//     note: string
//     rows: { tipo: string; prezzoMin: string; prezzoMax: string; note: string }[]
//   }
// }) {
//   const rows = override?.rows ?? service.prezziTable ?? []
//   const heading = service.costHeading
//     ? `${service.costHeading.white} ${service.costHeading.red}`
//     : `QUANTO COSTA IL ${service.name.toUpperCase()}?`
//   const intro =
//     override?.intro ??
//     service.costIntro ??
//     `Ecco i prezzi indicativi per ${service.name.toLowerCase()} in Veneto, IVA esclusa. Il costo finale dipende da metratura, materiali e stato del tetto.`
//   const note =
//     override?.note ??
//     service.costNote ??
//     'I prezzi sono indicativi e variano in base alla metratura, ai materiali scelti e alle condizioni del tetto. Il preventivo definitivo arriva dopo il sopralluogo gratuito con drone.'

//   return (
//     <T94Section tone={tone} labelledBy="svc-cost-title">
//       <SectionIntro
//         eyebrow={override?.eyebrow ?? 'Prezzi'}
//         title={override?.title ?? sentence(heading)}
//         titleId="svc-cost-title"
//       >
//         <p className="t94-lead">{intro}</p>
//       </SectionIntro>

//       <div className="overflow-hidden rounded-[14px] border border-t94-border bg-white">
//         <table className="w-full border-collapse text-left">
//           <caption className="sr-only">Prezzi indicativi per {service.name.toLowerCase()}</caption>
//           <thead className="bg-t94-grey">
//             <tr className="font-t94 text-[15px] font-semibold text-t94-text-secondary">
//               <th scope="col" className="px-4 py-4 md:px-6">Tipo di intervento</th>
//               <th scope="col" className="px-3 py-4 text-right">Da</th>
//               <th scope="col" className="px-3 py-4 text-right md:px-6">A</th>
//               <th scope="col" className="hidden px-6 py-4 md:table-cell">Note</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, i) => (
//               <tr key={row.tipo} className="border-t border-t94-border align-top">
//                 <th scope="row" className="px-4 py-4 text-left font-normal md:px-6 md:py-5">
//                   <span className="flex flex-wrap items-center gap-2 font-t94 text-[17px] font-semibold text-t94-dark">
//                     {row.tipo}
//                     {i === 0 ? (
//                       <span className="rounded-full bg-t94-red/10 px-2.5 py-0.5 font-t94 text-[15px] font-semibold text-t94-red">
//                         Top
//                       </span>
//                     ) : null}
//                   </span>
//                   <span className="t94-small mt-1 block md:hidden">{row.note}</span>
//                 </th>
//                 <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-dark md:py-5">
//                   {row.prezzoMin === '€ 0' ? 'Gratis' : row.prezzoMin}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-red md:px-6 md:py-5">
//                   {row.prezzoMax === '€ 0' ? '—' : row.prezzoMax}
//                 </td>
//                 <td className="t94-small hidden px-6 py-5 md:table-cell">{row.note}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <p className="t94-small mt-6 max-w-[44rem]">{note}</p>
//     </T94Section>
//   )
// }

// /* ── Il servizio ─────────────────────────────────────────── */
// function IntroSection({ service, tone }: SectionProps) {
//   return (
//     <T94Section tone={tone} labelledBy="svc-intro-title">
//       <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
//         <div className="flex flex-col gap-4">
//           <LPEyebrow>Il servizio</LPEyebrow>
//           <T94Heading id="svc-intro-title">{sentence(service.nameFull)}</T94Heading>
//           <p className="t94-body text-t94-text-secondary">{service.longDescription}</p>
//         </div>

//         <div className="flex flex-col gap-5">
//           <p className="t94-h3">Perché sceglierci</p>
//           <ul className="flex flex-col gap-3">
//             {service.benefits.map((benefit) => (
//               <CheckItem key={benefit}>{benefit}</CheckItem>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Sezioni extra (es. coibentazione) ───────────────────── */
// export function ExtraSection({
//   extra,
//   index,
//   tone,
// }: {
//   extra: NonNullable<ServiceConfig['extraSections']>[number]
//   index: number
//   tone: Tone
// }) {
//   const id = `svc-extra-${index}-title`
//   return (
//     <T94Section tone={tone} labelledBy={id}>
//       <SectionIntro
//         eyebrow={sentence(extra.kicker)}
//         title={sentence(`${extra.heading.white} ${extra.heading.red}`)}
//         titleId={id}
//       >
//         {extra.intro ? <p className="t94-lead">{extra.intro}</p> : null}
//         {extra.body ? <p className="t94-body text-t94-text-secondary">{extra.body}</p> : null}
//       </SectionIntro>

//       {extra.blocks ? (
//         <div className="grid gap-5 md:grid-cols-3">
//           {extra.blocks.map((block) => (
//             <div key={block.title} className="flex flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6">
//               <h3 className="t94-h3">{block.title}</h3>
//               <p className="t94-body text-t94-text-secondary">{block.body}</p>
//             </div>
//           ))}
//         </div>
//       ) : null}
//     </T94Section>
//   )
// }

// /* ── Pacchetto completo ──────────────────────────────────── */
// export function PackageSection({ service, tone }: SectionProps) {
//   const items = service.checklistItems ?? []
//   return (
//     <T94Section tone={tone} labelledBy="svc-package-title">
//       <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col gap-3">
//             <LPEyebrow>Tutto compreso</LPEyebrow>
//             <T94Heading id="svc-package-title">Ma quanto costerebbe tutto questo?</T94Heading>
//           </div>
//           <ul className="grid gap-3 sm:grid-cols-2">
//             {items.map((item) => (
//               <li
//                 key={item}
//                 className="flex items-center gap-3 rounded-[14px] border border-t94-border bg-white px-4 py-3.5"
//               >
//                 <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
//                   <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
//                 </span>
//                 <span className="t94-body font-medium text-t94-dark">{item}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {service.priceFrom ? (
//           <div className="flex flex-col gap-5 rounded-[14px] border border-t94-border bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,27,27,0.25)] md:p-8 lg:sticky lg:top-32">
//             <p className="t94-body font-semibold text-t94-dark">Con Tetto94 puoi avere tutto questo a partire da:</p>
//             <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
//               <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">{service.priceFrom}</span>
//               {service.oldPrice ? (
//                 <span className="font-t94 text-[22px] text-t94-text-secondary line-through">{service.oldPrice}</span>
//               ) : null}
//             </div>
//             <p className="t94-small border-t border-t94-border pt-5">
//               Ispezione drone gratuita · Preventivo entro 24 ore · Garanzia scritta 10 anni
//             </p>
//             <T94Button href="/contatti" fullWidth>
//               Richiedi preventivo gratuito
//             </T94Button>
//           </div>
//         ) : null}
//       </div>
//     </T94Section>
//   )
// }

// /* ── Senza ponteggi (versione breve) ─────────────────────── */
// function NoScaffoldingSection({ service, tone }: SectionProps) {
//   const linkLabel =
//     service.slug === 'rifacimento-tetto'
//       ? 'Come funziona il rifacimento senza ponteggi'
//       : 'Come lavoriamo senza ponteggi'
//   return (
//     <T94Section tone={tone} labelledBy="svc-scaffold-title">
//       <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
//         <div className="flex flex-col gap-8">
//           <div className="flex flex-col gap-4">
//             <LPEyebrow>Il nostro vantaggio</LPEyebrow>
//             <T94Heading id="svc-scaffold-title">Perché senza ponteggi conviene</T94Heading>
//           </div>
//           <ul className="flex flex-col gap-3">
//             {NO_SCAFFOLDING_POINTS.map((point) => (
//               <CheckItem key={point}>{point}</CheckItem>
//             ))}
//           </ul>
//           <Link
//             href="/#senza-ponteggi"
//             className="inline-flex min-h-[48px] items-center gap-2 self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red"
//           >
//             {linkLabel}
//             <ArrowRight className="size-5 text-t94-red" aria-hidden="true" />
//           </Link>
//         </div>
//         <LPScaffoldingVisual />
//       </div>
//     </T94Section>
//   )
// }

// /* ── Come lavoriamo ──────────────────────────────────────── */
// export function StepsSection({ service, tone }: SectionProps) {
//   return (
//     <T94Section tone={tone} labelledBy="svc-steps-title">
//       <SectionIntro eyebrow="Come lavoriamo" title="Il processo in 4 step" titleId="svc-steps-title" center />
//       <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {service.steps.map((step, i) => (
//           <li key={step.title} className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6">
//             <span className="flex size-12 items-center justify-center rounded-full bg-t94-red font-t94 text-[20px] font-bold text-white">
//               {i + 1}
//             </span>
//             <h3 className="t94-h3">{step.title}</h3>
//             <p className="t94-body text-t94-text-secondary">{step.desc}</p>
//           </li>
//         ))}
//       </ol>
//     </T94Section>
//   )
// }

// /* ── Lavori eseguiti + recensioni ────────────────────────── */
// export function WorksReviewsSection({
//   service,
//   tone,
//   google,
//   cityName,
// }: SectionProps & { google: GoogleReviewsData | null; cityName?: string }) {
//   const photos = getServiceWorks(service.slug)
//   return (
//     <T94Section tone={tone} labelledBy="svc-works-title">
//       {photos.length > 0 ? (
//         <>
//           <SectionIntro
//             eyebrow="Lavori eseguiti"
//             title={cityName ? `${service.name} a ${cityName}` : service.name}
//             titleId="svc-works-title"
//           >
//             <p className="t94-lead">
//               Una selezione di interventi reali documentati con ispezione drone — ogni tetto, una storia di cura.
//             </p>
//           </SectionIntro>
//           <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
//             {photos.map((photo, i) => (
//               <li
//                 key={photo.src}
//                 className="group relative aspect-[4/5] overflow-hidden rounded-[14px] border border-t94-border bg-t94-grey"
//               >
//                 <Image
//                   src={photo.src}
//                   alt={photo.alt}
//                   fill
//                   loading="lazy"
//                   sizes="(max-width: 1024px) 50vw, 285px"
//                   className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//                 <span
//                   className="absolute inset-0 bg-gradient-to-t from-t94-dark/35 via-transparent to-transparent"
//                   aria-hidden="true"
//                 />
//                 <span className="absolute bottom-2.5 left-3 font-t94 text-[15px] font-semibold text-white tabular-nums">
//                   {String(i + 1).padStart(2, '0')}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </>
//       ) : null}

//       <div className={photos.length > 0 ? 'mt-14 border-t border-t94-border pt-12 md:mt-16' : ''}>
//         <div className="mb-10 flex flex-col items-center gap-4 text-center">
//           <LPEyebrow>Testimonianze</LPEyebrow>
//           {photos.length > 0 ? (
//             <h2 className="t94-h2 text-balance">Cosa dicono i nostri clienti</h2>
//           ) : (
//             <T94Heading id="svc-works-title">Cosa dicono i nostri clienti</T94Heading>
//           )}
//           <LPGoogleBadge google={google} />
//         </div>
//         <LPReviewCards reviews={toReviews(google)} />
//         <div className="mt-6 flex justify-center">
//           <LPReadAllLink google={google} />
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Dove operiamo ───────────────────────────────────────── */
// function LocationsSection({ service, tone }: SectionProps) {
//   const cities = LOCATIONS.slice(0, 12)
//   return (
//     <T94Section tone={tone} labelledBy="svc-locations-title">
//       <SectionIntro
//         eyebrow="Dove operiamo"
//         title={`${service.name} in tutto il Veneto`}
//         titleId="svc-locations-title"
//       >
//         {service.doveOperiamoIntro ? <p className="t94-lead">{service.doveOperiamoIntro}</p> : null}
//       </SectionIntro>
//       <ul className="flex flex-wrap gap-3">
//         {cities.map((city) => (
//           <li key={city.slug}>
//             <Link
//               href={`/${service.slug}/${city.slug}`}
//               prefetch={false}
//               className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-t94-border bg-white px-5 font-t94 text-[17px] font-medium text-t94-dark transition-colors hover:border-t94-dark"
//             >
//               {city.name}
//               <span className="text-[15px] font-semibold text-t94-red">{city.province}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </T94Section>
//   )
// }

// /* ── FAQ ─────────────────────────────────────────────────── */
// export function FaqSection({
//   service,
//   tone,
//   cityName,
//   extraItems = [],
// }: SectionProps & { cityName?: string; extraItems?: { q: string; a: string }[] }) {
//   const where = cityName ? `a ${cityName}` : 'nel Nord-Est Italia'
//   const items = [...service.faqItems, ...extraItems]
//   return (
//     <T94Section tone={tone} labelledBy="svc-faq-title">
//       <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
//         <div className="flex flex-col gap-4 lg:sticky lg:top-32">
//           <LPEyebrow>{cityName ? `FAQ ${cityName}` : 'Hai dubbi?'}</LPEyebrow>
//           <T94Heading id="svc-faq-title">
//             {`Domande frequenti su ${service.name.toLowerCase()}${cityName ? ` a ${cityName}` : ''}`}
//           </T94Heading>
//           <p className="t94-lead">
//             Hai domande sul servizio di {service.name.toLowerCase()} {where}? Ecco le risposte alle domande più
//             frequenti dei nostri clienti.
//           </p>
//           <a
//             href={PHONE_TEL}
//             className="inline-flex min-h-[48px] items-center self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] hover:decoration-t94-red"
//           >
//             Oppure chiamaci: {PHONE_LABEL}
//           </a>
//         </div>
//         <div className="flex flex-col gap-3">
//           {items.map((item, i) => (
//             <details
//               key={item.q}
//               open={i === 0}
//               className="group rounded-[14px] border border-t94-border bg-white transition-colors open:border-t94-dark/30"
//             >
//               <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-t94 text-[17px] font-semibold text-t94-dark marker:hidden [&::-webkit-details-marker]:hidden">
//                 {item.q}
//                 <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-t94-grey transition-transform duration-300 group-open:rotate-45">
//                   <Plus className="size-[18px] text-t94-red" aria-hidden="true" />
//                 </span>
//               </summary>
//               <p className="t94-body px-5 pb-5 text-t94-text-secondary">{item.a}</p>
//             </details>
//           ))}
//         </div>
//       </div>
//     </T94Section>
//   )
// }

// /* ── Altri servizi ───────────────────────────────────────── */
// function RelatedSection({ service, tone }: SectionProps) {
//   const others = SERVICES.filter((s) => s.slug !== service.slug)
//   return (
//     <T94Section tone={tone} labelledBy="svc-related-title">
//       <SectionIntro eyebrow="Altri servizi" title="Scopri gli altri servizi Tetto94" titleId="svc-related-title" center />
//       <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//         {others.map((other) => (
//           <li key={other.slug}>
//             <Link
//               href={`/${other.slug}`}
//               className="group flex h-full flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6 transition-colors hover:border-t94-dark"
//             >
//               <h3 className="t94-h3">{other.name}</h3>
//               <p className="t94-small line-clamp-3">{other.description}</p>
//               <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[16px] font-semibold text-t94-red">
//                 Scopri di più
//                 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </T94Section>
//   )
// }

// /* ── CTA finale ──────────────────────────────────────────── */
// export function CtaBand({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
//   const title = service.ctaHeading
//     ? sentence(`${service.ctaHeading.white} ${service.ctaHeading.red}`)
//     : `Pronto per il tuo ${service.name.toLowerCase()}${cityName ? ` a ${cityName}` : ''}?`
//   return (
//     <section aria-labelledby="svc-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
//       <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
//         <h2 id="svc-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
//           {title}
//         </h2>
//         <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
//           Preventivo gratuito entro 24 ore · Ispezione drone inclusa · Garanzia scritta 10 anni
//         </p>
//         <T94Button href="/contatti" variant="outline" className="border-white">
//           Richiedi preventivo gratuito
//         </T94Button>
//       </div>
//     </section>
//   )
// }

// /**
//  * Everything below the hero + trust strip. Sections alternate white / grey in
//  * render order, so optional blocks (price table, package, extras) never leave
//  * two same-colour sections touching.
//  */
// export default function ServiceBody({
//   service,
//   google,
// }: {
//   service: ServiceConfig
//   google: GoogleReviewsData | null
// }) {
//   const blocks: { key: string; render: (tone: Tone) => ReactNode }[] = []

//   if (service.prezziTable?.length) {
//     blocks.push({ key: 'cost', render: (tone) => <CostSection service={service} tone={tone} /> })
//   }
//   blocks.push({ key: 'intro', render: (tone) => <IntroSection service={service} tone={tone} /> })
//   service.extraSections?.forEach((extra, index) => {
//     blocks.push({
//       key: `extra-${index}`,
//       render: (tone) => <ExtraSection extra={extra} index={index} tone={tone} />,
//     })
//   })
//   if (service.checklistItems?.length) {
//     blocks.push({ key: 'package', render: (tone) => <PackageSection service={service} tone={tone} /> })
//   }
//   blocks.push(
//     { key: 'scaffold', render: (tone) => <NoScaffoldingSection service={service} tone={tone} /> },
//     { key: 'steps', render: (tone) => <StepsSection service={service} tone={tone} /> },
//     { key: 'works', render: (tone) => <WorksReviewsSection service={service} tone={tone} google={google} /> },
//     { key: 'locations', render: (tone) => <LocationsSection service={service} tone={tone} /> },
//     { key: 'faq', render: (tone) => <FaqSection service={service} tone={tone} /> },
//     { key: 'related', render: (tone) => <RelatedSection service={service} tone={tone} /> },
//   )

//   return (
//     <>
//       {blocks.map((block, i) => (
//         <Fragment key={block.key}>{block.render(i % 2 === 0 ? 'white' : 'grey')}</Fragment>
//       ))}
//       <CtaBand service={service} />
//     </>
//   )
// }


import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Plus } from 'lucide-react'
import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { LPEyebrow, LPStars } from '@/components/tetto94/lp/lp-parts'
import { LPScaffoldingVisual } from '@/components/tetto94/lp/lp-scaffolding-visual'
import {
  LPGoogleBadge,
  LPReadAllLink,
  LPReviewCards,
  formatRating,
} from '@/components/tetto94/lp/lp-reviews'
import { PHONE_LABEL, PHONE_TEL, sentence, toReviews } from '@/components/tetto94/service/service-utils'
import { LOCATIONS, SERVICES, type ServiceConfig } from '@/data/services'
import { getServiceWorks } from '@/data/works-gallery'
import type { GoogleReviewsData } from '@/lib/google-reviews'

export type Tone = 'white' | 'grey'

export interface SectionProps {
  service: ServiceConfig
  tone: Tone
}

const NO_SCAFFOLDING_POINTS = [
  'Nessun costo di ponteggio da pagare',
  'Nessun permesso comunale da aspettare',
  'Cantiere più rapido, facciata libera',
]

export function SectionIntro({
  eyebrow,
  title,
  titleId,
  children,
  center = false,
}: {
  eyebrow: string
  title: string
  titleId: string
  children?: ReactNode
  center?: boolean
}) {
  return (
    <div className={`mb-10 flex max-w-[44rem] flex-col gap-4 md:mb-12 ${center ? 'mx-auto items-center text-center' : ''}`}>
      <LPEyebrow>{eyebrow}</LPEyebrow>
      <T94Heading id={titleId}>{title}</T94Heading>
      {children}
    </div>
  )
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 rounded-[14px] border border-t94-border bg-white p-5">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
        <CheckCircle2 className="size-5 text-t94-green" aria-hidden="true" />
      </span>
      <span className="t94-body font-medium text-t94-dark">{children}</span>
    </li>
  )
}

/* ── Trust strip ─────────────────────────────────────────── */
export function ServiceTrustStrip({ google }: { google: GoogleReviewsData | null }) {
  const numbers = [
    { value: '32+', label: 'Anni di esperienza' },
    { value: '500+', label: 'Lavori completati' },
    { value: '10 anni', label: 'Garanzia su rifacimento' },
    { value: '24h', label: 'Risposta garantita' },
  ]
  return (
    <section className="t94-type border-y border-t94-border bg-t94-grey py-10 md:py-12" aria-label="Numeri Tetto94">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-x-6 gap-y-8 px-5 md:px-8 lg:grid-cols-5">
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1">
          <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">
            {formatRating(google)}
          </span>
          <span className="mt-3">
            <LPStars value={Math.round(google?.rating ?? 5)} />
          </span>
          <span className="t94-body mt-2 font-medium text-t94-text-secondary">Valutazione su Google</span>
        </div>
        {numbers.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center">
            <span className="font-t94 text-[40px] font-bold leading-none text-t94-dark md:text-[48px]">{item.value}</span>
            <span className="t94-body mt-2 font-medium text-t94-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Quanto costa ────────────────────────────────────────── */
const COST_QUESTION: Record<string, string> = {
  'rifacimento-tetto': 'Quanto costa rifare il tetto',
  'riparazione-tetto': 'Quanto costa riparare il tetto',
  'infiltrazioni-tetto': "Quanto costa riparare un'infiltrazione",
  'impermeabilizzazione-tetto': 'Quanto costa impermeabilizzare il tetto',
  'pulizia-grondaie': 'Quanto costa la pulizia delle grondaie',
}

const TEN_YEAR_GUARANTEE = new Set(['rifacimento-tetto', 'impermeabilizzazione-tetto'])

/** Guarantee wording that matches /garanzie: 10 years only on rifacimento and impermeabilizzazione. */
export function guaranteeShort(slug: string) {
  return TEN_YEAR_GUARANTEE.has(slug) ? 'Garanzia scritta 10 anni' : 'Garanzia scritta fino a 10 anni'
}

export function CostSection({
  service,
  tone,
  override,
  cityName,
}: SectionProps & {
  cityName?: string
  override?: {
    eyebrow: string
    title: string
    intro: string
    note: string
    rows: { tipo: string; prezzoMin: string; prezzoMax: string; note: string }[]
  }
}) {
  const rows = override?.rows ?? service.prezziTable ?? []
  const question = COST_QUESTION[service.slug]
  const heading = service.costHeading
    ? sentence(`${service.costHeading.white} ${service.costHeading.red}`)
    : question
      ? `${question}${cityName ? ` a ${cityName}` : ''}?`
      : `Quanto costa ${service.name.toLowerCase()}?`
  const intro =
    override?.intro ??
    service.costIntro ??
    `Ecco i prezzi indicativi per ${service.name.toLowerCase()} in Veneto, IVA esclusa. Il costo finale dipende da metratura, materiali e stato del tetto.`
  const note =
    override?.note ??
    service.costNote ??
    'I prezzi sono indicativi e variano in base alla metratura, ai materiali scelti e alle condizioni del tetto. Il preventivo definitivo arriva dopo il sopralluogo gratuito con drone.'

  return (
    <T94Section tone={tone} labelledBy="svc-cost-title">
      <SectionIntro
        eyebrow={override?.eyebrow ?? 'Prezzi'}
        title={override?.title ?? heading}
        titleId="svc-cost-title"
      >
        <p className="t94-lead">{intro}</p>
      </SectionIntro>

      <div className="overflow-hidden rounded-[14px] border border-t94-border bg-white">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Prezzi indicativi per {service.name.toLowerCase()}</caption>
          <thead className="bg-t94-grey">
            <tr className="font-t94 text-[15px] font-semibold text-t94-text-secondary">
              <th scope="col" className="px-4 py-4 md:px-6">Tipo di intervento</th>
              <th scope="col" className="px-3 py-4 text-right">Da</th>
              <th scope="col" className="px-3 py-4 text-right md:px-6">A</th>
              <th scope="col" className="hidden px-6 py-4 md:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.tipo} className="border-t border-t94-border align-top">
                <th scope="row" className="px-4 py-4 text-left font-normal md:px-6 md:py-5">
                  <span className="flex flex-wrap items-center gap-2 font-t94 text-[17px] font-semibold text-t94-dark">
                    {row.tipo}
                    {i === 0 ? (
                      <span className="rounded-full bg-t94-red/10 px-2.5 py-0.5 font-t94 text-[15px] font-semibold text-t94-red">
                        Top
                      </span>
                    ) : null}
                  </span>
                  <span className="t94-small mt-1 block md:hidden">{row.note}</span>
                </th>
                <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-dark md:py-5">
                  {row.prezzoMin === '€ 0' ? 'Gratis' : row.prezzoMin}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-red md:px-6 md:py-5">
                  {row.prezzoMax === '€ 0' ? '—' : row.prezzoMax}
                </td>
                <td className="t94-small hidden px-6 py-5 md:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t94-small mt-6 max-w-[44rem]">{note}</p>

      {service.slug === 'rifacimento-tetto' && !cityName && !override ? <MarketPrices /> : null}
    </T94Section>
  )
}

const MARKET_PRICES = [
  { intervento: 'Rifacimento semplice della copertura (tegole o coppi, guaina, pulizia)', prezzo: '90-130 €', fonte: 'PreventiviFree, giugno 2025' },
  { intervento: 'Rifacimento completo non ventilato', prezzo: '130-180 €', fonte: 'Quotalo, febbraio 2026' },
  { intervento: 'Rifacimento completo con tetto ventilato', prezzo: '180-250 €', fonte: 'Quotalo, febbraio 2026' },
  { intervento: 'Solo isolamento termico', prezzo: '50-90 €', fonte: 'Quotalo, febbraio 2026' },
]

function MarketPrices() {
  return (
    <div className="mt-12 flex flex-col gap-4 md:mt-14">
      <h3 className="t94-h3">Prezzi medi di mercato in Italia</h3>
      <p className="t94-body max-w-[44rem] text-t94-text-secondary">
        Per confronto, le guide prezzi indicano queste medie al mq:
      </p>
      <div className="overflow-hidden rounded-[14px] border border-t94-border bg-white">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Prezzi medi di mercato al mq in Italia</caption>
          <thead className="bg-t94-grey">
            <tr className="font-t94 text-[15px] font-semibold text-t94-text-secondary">
              <th scope="col" className="px-4 py-4 md:px-6">Intervento</th>
              <th scope="col" className="px-3 py-4 text-right">Prezzo medio al mq</th>
              <th scope="col" className="hidden px-6 py-4 md:table-cell">Fonte</th>
            </tr>
          </thead>
          <tbody>
            {MARKET_PRICES.map((row) => (
              <tr key={row.intervento} className="border-t border-t94-border align-top">
                <th scope="row" className="px-4 py-4 text-left font-normal md:px-6 md:py-5">
                  <span className="font-t94 text-[17px] font-semibold text-t94-dark">{row.intervento}</span>
                  <span className="t94-small mt-1 block md:hidden">{row.fonte}</span>
                </th>
                <td className="whitespace-nowrap px-3 py-4 text-right font-t94 text-[17px] font-semibold text-t94-dark md:px-6 md:py-5">
                  {row.prezzo}
                </td>
                <td className="t94-small hidden px-6 py-5 md:table-cell">{row.fonte}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t94-small max-w-[44rem]">
        Quotalo indica questi prezzi IVA, ponteggi e pratiche esclusi. Lavorando su fune, la voce del ponteggio nel
        nostro preventivo non c&apos;è.
      </p>
    </div>
  )
}

/* ── Il servizio ─────────────────────────────────────────── */
function IntroSection({ service, tone }: SectionProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-intro-title">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <LPEyebrow>Il servizio</LPEyebrow>
          <T94Heading id="svc-intro-title">{sentence(service.nameFull)}</T94Heading>
          <p className="t94-body text-t94-text-secondary">{service.longDescription}</p>
        </div>

        <div className="flex flex-col gap-5">
          <p className="t94-h3">Perché sceglierci</p>
          <ul className="flex flex-col gap-3">
            {service.benefits.map((benefit) => (
              <CheckItem key={benefit}>{benefit}</CheckItem>
            ))}
          </ul>
          {service.slug === 'riparazione-tetto' ? (
            <p className="t94-body text-t94-text-secondary">
              Il tetto ha bisogno di una sistemazione completa?{' '}
              <Link
                href="/ripasso-tetto-senza-ponteggi"
                className="font-semibold text-t94-red underline underline-offset-4 hover:text-t94-dark"
              >
                Guarda il ripasso del tetto senza ponteggi.
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </T94Section>
  )
}

/* ── Sezioni extra (es. coibentazione) ───────────────────── */
export function ExtraSection({
  extra,
  index,
  tone,
}: {
  extra: NonNullable<ServiceConfig['extraSections']>[number]
  index: number
  tone: Tone
}) {
  const id = `svc-extra-${index}-title`
  return (
    <T94Section tone={tone} labelledBy={id}>
      <SectionIntro
        eyebrow={sentence(extra.kicker)}
        title={sentence(`${extra.heading.white} ${extra.heading.red}`)}
        titleId={id}
      >
        {extra.intro ? <p className="t94-lead">{extra.intro}</p> : null}
        {extra.body ? <p className="t94-body text-t94-text-secondary">{extra.body}</p> : null}
      </SectionIntro>

      {extra.blocks ? (
        <div className="grid gap-5 md:grid-cols-3">
          {extra.blocks.map((block) => (
            <div key={block.title} className="flex flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6">
              <h3 className="t94-h3">{block.title}</h3>
              <p className="t94-body text-t94-text-secondary">{block.body}</p>
            </div>
          ))}
        </div>
      ) : null}
    </T94Section>
  )
}

/* ── Ripasso o rifacimento (solo /rifacimento-tetto) ─────── */
function RipassoOrRifacimentoSection({ tone }: { tone: Tone }) {
  const linkClass =
    'font-semibold text-t94-red underline underline-offset-4 hover:text-t94-dark'
  return (
    <T94Section tone={tone} labelledBy="svc-ripasso-title">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <T94Heading id="svc-ripasso-title">Ripasso o rifacimento: quale serve al tuo tetto?</T94Heading>
        <p className="t94-body text-t94-text-secondary">
          Se la struttura è sana e il problema è il manto (tegole o coppi rotti, spostati, qualche perdita), spesso
          basta un ripasso: sostituiamo gli elementi rotti, fissiamo tutte le tegole e sigilliamo i punti critici,
          senza rifare il tetto. Se le tegole si sbriciolano su tutta la falda, la guaina sotto è da sostituire o le
          travi sono danneggiate, serve il rifacimento. Al sopralluogo con drone ti diciamo quale dei due serve, con le
          foto. Leggi anche{' '}
          <Link href="/blog/come-capire-se-il-tetto-va-rifatto" className={linkClass}>
            come capire se il tetto va rifatto
          </Link>{' '}
          e{' '}
          <Link href="/ripasso-tetto-senza-ponteggi" className={linkClass}>
            cosa comprende il ripasso del tetto
          </Link>
          .
        </p>
      </div>
    </T94Section>
  )
}

/* ── Pacchetto completo ──────────────────────────────────── */
export function PackageSection({ service, tone }: SectionProps) {
  const items = service.checklistItems ?? []
  return (
    <T94Section tone={tone} labelledBy="svc-package-title">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <LPEyebrow>Tutto compreso</LPEyebrow>
            <T94Heading id="svc-package-title">Ma quanto costerebbe tutto questo?</T94Heading>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-[14px] border border-t94-border bg-white px-4 py-3.5"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
                  <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
                </span>
                <span className="t94-body font-medium text-t94-dark">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {service.priceFrom ? (
          <div className="flex flex-col gap-5 rounded-[14px] border border-t94-border bg-white p-6 shadow-[0_20px_50px_-28px_rgba(27,27,27,0.25)] md:p-8 lg:sticky lg:top-32">
            <p className="t94-body font-semibold text-t94-dark">Con Tetto94 puoi avere tutto questo a partire da:</p>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-t94 text-[56px] font-bold leading-none text-t94-red">{service.priceFrom}</span>
              {service.oldPrice ? (
                <span className="font-t94 text-[22px] text-t94-text-secondary line-through">{service.oldPrice}</span>
              ) : null}
            </div>
            <p className="t94-small border-t border-t94-border pt-5">
              Ispezione drone gratuita · Preventivo entro 24 ore · {guaranteeShort(service.slug)}
            </p>
            <T94Button href="/contatti" fullWidth>
              Richiedi preventivo gratuito
            </T94Button>
          </div>
        ) : null}
      </div>
    </T94Section>
  )
}

/* ── Senza ponteggi (versione breve) ─────────────────────── */
function NoScaffoldingSection({ service, tone }: SectionProps) {
  const linkLabel =
    service.slug === 'rifacimento-tetto'
      ? 'Come funziona il rifacimento senza ponteggi'
      : 'Come lavoriamo senza ponteggi'
  return (
    <T94Section tone={tone} labelledBy="svc-scaffold-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <LPEyebrow>Il nostro vantaggio</LPEyebrow>
            <T94Heading id="svc-scaffold-title">Perché senza ponteggi conviene</T94Heading>
          </div>
          <ul className="flex flex-col gap-3">
            {NO_SCAFFOLDING_POINTS.map((point) => (
              <CheckItem key={point}>{point}</CheckItem>
            ))}
          </ul>
          <Link
            href="/#senza-ponteggi"
            className="inline-flex min-h-[48px] items-center gap-2 self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] transition-colors hover:decoration-t94-red"
          >
            {linkLabel}
            <ArrowRight className="size-5 text-t94-red" aria-hidden="true" />
          </Link>
        </div>
        <LPScaffoldingVisual />
      </div>
    </T94Section>
  )
}

/* ── Come lavoriamo ──────────────────────────────────────── */
export function StepsSection({ service, tone }: SectionProps) {
  return (
    <T94Section tone={tone} labelledBy="svc-steps-title">
      <SectionIntro eyebrow="Come lavoriamo" title="Il processo in 4 step" titleId="svc-steps-title" center />
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {service.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6">
            <span className="flex size-12 items-center justify-center rounded-full bg-t94-red font-t94 text-[20px] font-bold text-white">
              {i + 1}
            </span>
            <h3 className="t94-h3">{step.title}</h3>
            <p className="t94-body text-t94-text-secondary">{step.desc}</p>
          </li>
        ))}
      </ol>
    </T94Section>
  )
}

/* ── Lavori eseguiti + recensioni ────────────────────────── */
export function WorksReviewsSection({
  service,
  tone,
  google,
  cityName,
}: SectionProps & { google: GoogleReviewsData | null; cityName?: string }) {
  const photos = getServiceWorks(service.slug)
  return (
    <T94Section tone={tone} labelledBy="svc-works-title">
      {photos.length > 0 ? (
        <>
          <SectionIntro
            eyebrow="Lavori eseguiti"
            title={cityName ? `${service.name} a ${cityName}` : service.name}
            titleId="svc-works-title"
          >
            <p className="t94-lead">
              Una selezione di interventi reali documentati con ispezione drone — ogni tetto, una storia di cura.
            </p>
          </SectionIntro>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {photos.map((photo, i) => (
              <li
                key={photo.src}
                className="group relative aspect-[4/5] overflow-hidden rounded-[14px] border border-t94-border bg-t94-grey"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 50vw, 285px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-t94-dark/35 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute bottom-2.5 left-3 font-t94 text-[15px] font-semibold text-white tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <div className={photos.length > 0 ? 'mt-14 border-t border-t94-border pt-12 md:mt-16' : ''}>
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <LPEyebrow>Testimonianze</LPEyebrow>
          {photos.length > 0 ? (
            <h2 className="t94-h2 text-balance">Cosa dicono i nostri clienti</h2>
          ) : (
            <T94Heading id="svc-works-title">Cosa dicono i nostri clienti</T94Heading>
          )}
          <LPGoogleBadge google={google} />
        </div>
        <LPReviewCards reviews={toReviews(google)} />
        <div className="mt-6 flex justify-center">
          <LPReadAllLink google={google} />
        </div>
      </div>
    </T94Section>
  )
}

/* ── Dove operiamo ───────────────────────────────────────── */
function LocationsSection({ service, tone }: SectionProps) {
  const cities = LOCATIONS.slice(0, 12)
  return (
    <T94Section tone={tone} labelledBy="svc-locations-title">
      <SectionIntro
        eyebrow="Dove operiamo"
        title={`${service.name} in tutto il Veneto`}
        titleId="svc-locations-title"
      >
        {service.doveOperiamoIntro ? <p className="t94-lead">{service.doveOperiamoIntro}</p> : null}
      </SectionIntro>
      <ul className="flex flex-wrap gap-3">
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/${service.slug}/${city.slug}`}
              prefetch={false}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-t94-border bg-white px-5 font-t94 text-[17px] font-medium text-t94-dark transition-colors hover:border-t94-dark"
            >
              {city.name}
              <span className="text-[15px] font-semibold text-t94-red">{city.province}</span>
            </Link>
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/* ── FAQ ──────────────────────────────────────────────────��� */
export function FaqSection({
  service,
  tone,
  cityName,
  extraItems = [],
}: SectionProps & { cityName?: string; extraItems?: { q: string; a: string }[] }) {
  const where = cityName ? `a ${cityName}` : 'nel Nord-Est Italia'
  const items = [...service.faqItems, ...extraItems]
  return (
    <T94Section tone={tone} labelledBy="svc-faq-title">
      <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-32">
          <LPEyebrow>{cityName ? `FAQ ${cityName}` : 'Hai dubbi?'}</LPEyebrow>
          <T94Heading id="svc-faq-title">
            {`Domande frequenti su ${service.name.toLowerCase()}${cityName ? ` a ${cityName}` : ''}`}
          </T94Heading>
          <p className="t94-lead">
            Hai domande sul servizio di {service.name.toLowerCase()} {where}? Ecco le risposte alle domande più
            frequenti dei nostri clienti.
          </p>
          <a
            href={PHONE_TEL}
            className="inline-flex min-h-[48px] items-center self-start font-t94 text-[17px] font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-[6px] hover:decoration-t94-red"
          >
            Oppure chiamaci: {PHONE_LABEL}
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-[14px] border border-t94-border bg-white transition-colors open:border-t94-dark/30"
            >
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-t94 text-[17px] font-semibold text-t94-dark marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-t94-grey transition-transform duration-300 group-open:rotate-45">
                  <Plus className="size-[18px] text-t94-red" aria-hidden="true" />
                </span>
              </summary>
              <p className="t94-body px-5 pb-5 text-t94-text-secondary">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </T94Section>
  )
}

/* ── Altri servizi ───────────────────────────────────────── */
function RelatedSection({ service, tone }: SectionProps) {
  const others = SERVICES.filter((s) => s.slug !== service.slug)
  return (
    <T94Section tone={tone} labelledBy="svc-related-title">
      <SectionIntro eyebrow="Altri servizi" title="Scopri gli altri servizi Tetto94" titleId="svc-related-title" center />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((other) => (
          <li key={other.slug}>
            <Link
              href={`/${other.slug}`}
              className="group flex h-full flex-col gap-3 rounded-[14px] border border-t94-border bg-white p-6 transition-colors hover:border-t94-dark"
            >
              <h3 className="t94-h3">{other.name}</h3>
              <p className="t94-small line-clamp-3">{other.description}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[16px] font-semibold text-t94-red">
                Scopri di più
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </T94Section>
  )
}

/* ── CTA finale ──────────────────────────────────────────── */
export function CtaBand({ service, cityName }: { service: ServiceConfig; cityName?: string }) {
  const title = service.ctaHeading
    ? sentence(`${service.ctaHeading.white} ${service.ctaHeading.red}`)
    : `Vuoi un preventivo per il tuo tetto${cityName ? ` a ${cityName}` : ''}?`
  return (
    <section aria-labelledby="svc-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
        <h2 id="svc-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
          {title}
        </h2>
        <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Preventivo gratuito entro 24 ore · Ispezione drone inclusa · {guaranteeShort(service.slug)}
        </p>
        <T94Button href="/contatti" variant="outline" className="border-white">
          Richiedi preventivo gratuito
        </T94Button>
      </div>
    </section>
  )
}

/**
 * Everything below the hero + trust strip. Sections alternate white / grey in
 * render order, so optional blocks (price table, package, extras) never leave
 * two same-colour sections touching.
 */
export default function ServiceBody({
  service,
  google,
}: {
  service: ServiceConfig
  google: GoogleReviewsData | null
}) {
  const blocks: { key: string; render: (tone: Tone) => ReactNode }[] = []

  if (service.prezziTable?.length) {
    blocks.push({ key: 'cost', render: (tone) => <CostSection service={service} tone={tone} /> })
  }
  blocks.push({ key: 'intro', render: (tone) => <IntroSection service={service} tone={tone} /> })
  service.extraSections?.forEach((extra, index) => {
    blocks.push({
      key: `extra-${index}`,
      render: (tone) => <ExtraSection extra={extra} index={index} tone={tone} />,
    })
  })
  if (service.checklistItems?.length) {
    blocks.push({ key: 'package', render: (tone) => <PackageSection service={service} tone={tone} /> })
  }
  if (service.slug === 'rifacimento-tetto') {
    blocks.push({ key: 'ripasso', render: (tone) => <RipassoOrRifacimentoSection tone={tone} /> })
  }
  blocks.push(
    { key: 'scaffold', render: (tone) => <NoScaffoldingSection service={service} tone={tone} /> },
    { key: 'steps', render: (tone) => <StepsSection service={service} tone={tone} /> },
    { key: 'works', render: (tone) => <WorksReviewsSection service={service} tone={tone} google={google} /> },
    { key: 'locations', render: (tone) => <LocationsSection service={service} tone={tone} /> },
    { key: 'faq', render: (tone) => <FaqSection service={service} tone={tone} /> },
    { key: 'related', render: (tone) => <RelatedSection service={service} tone={tone} /> },
  )

  return (
    <>
      {blocks.map((block, i) => (
        <Fragment key={block.key}>{block.render(i % 2 === 0 ? 'white' : 'grey')}</Fragment>
      ))}
      <CtaBand service={service} />
    </>
  )
}
