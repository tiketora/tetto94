// import Image from 'next/image'
// import Link from 'next/link'
// import {
//   ArrowRight,
//   Check,
//   ChevronRight,
//   CloudRain,
//   Droplets,
//   Hammer,
//   Layers,
//   Thermometer,
//   Wind,
//   type LucideIcon,
// } from 'lucide-react'
// import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
// import { T94Button } from '@/components/tetto94/ds/t94-button'
// import { LPEyebrow } from '@/components/tetto94/lp/lp-parts'
// import ServiziHeroActions from '@/components/tetto94/service/servizi-hero-actions'
// import { SERVICES } from '@/data/services'

// const SERVICE_ICONS: Record<string, LucideIcon> = { Layers, Droplets, Hammer, CloudRain, Wind, Thermometer }

// const TICKS = ['32+ anni di esperienza', 'Garanzia scritta su ogni lavoro', 'Preventivo gratuito entro 24h']

// function ServicesHero() {
//   return (
//     <section aria-labelledby="servizi-hero-title" className="t94-type bg-white pt-[88px] md:pt-[132px]">
//       <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-14">
//         <nav aria-label="Breadcrumb">
//           <ol className="t94-small flex flex-wrap items-center gap-1.5">
//             <li>
//               <Link href="/" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-t94-dark hover:underline">
//                 Home
//               </Link>
//             </li>
//             <li aria-hidden="true">
//               <ChevronRight className="size-4" />
//             </li>
//             <li aria-current="page" className="font-semibold text-t94-dark">
//               Servizi
//             </li>
//           </ol>
//         </nav>

//         <h1 id="servizi-hero-title" className="t94-h1 max-w-[20ch] text-balance">
//           Servizi per ogni <span className="text-t94-red">tipo di tetto</span>
//         </h1>

//         <p className="t94-lead max-w-2xl">
//           Rifacimento tetto, riparazione, impermeabilizzazione, stop infiltrazioni, pulizia grondaie e coibentazione:
//           Tetto94 interviene su ogni problema della tua copertura in Veneto, Emilia-Romagna e Friuli-Venezia Giulia,
//           con ispezione drone gratuita, materiali certificati CE e garanzia scritta su ogni intervento.
//         </p>

//         <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
//           {TICKS.map((tick) => (
//             <li key={tick} className="flex items-center gap-3 font-t94 text-[18px] font-medium text-t94-dark">
//               <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/12 text-t94-green">
//                 <Check className="size-4" strokeWidth={3} aria-hidden="true" />
//               </span>
//               {tick}
//             </li>
//           ))}
//         </ul>

//         <ServiziHeroActions />
//       </div>
//     </section>
//   )
// }

// function ServiceCard({ slug, priority }: { slug: string; priority: boolean }) {
//   const service = SERVICES.find((s) => s.slug === slug)!
//   const Icon = SERVICE_ICONS[service.icon] ?? Layers

//   return (
//     <li>
//       <Link
//         href={`/${service.slug}`}
//         className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-t94-border bg-white transition-colors hover:border-t94-dark"
//       >
//         <div className="relative aspect-[16/10] overflow-hidden bg-t94-grey">
//           <Image
//             src={service.image}
//             alt={service.name}
//             fill
//             priority={priority}
//             sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
//             className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//           />
//           <span className="absolute left-4 top-4 inline-flex rounded-full bg-white px-3.5 py-1.5 font-t94 text-[15px] font-semibold text-t94-dark shadow-sm">
//             {service.priceFrom ? `Da ${service.priceFrom}` : 'Preventivo gratis'}
//           </span>
//         </div>

//         <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
//           <span className="flex size-11 items-center justify-center rounded-full bg-t94-red/10 text-t94-red">
//             <Icon className="size-5" aria-hidden="true" />
//           </span>
//           <h2 className="t94-h3">{service.name}</h2>
//           <p className="t94-body line-clamp-3 text-t94-text-secondary">{service.subheadline}</p>
//           <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[17px] font-semibold text-t94-red">
//             Scopri di più
//             <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
//           </span>
//         </div>
//       </Link>
//     </li>
//   )
// }

// function ServicesGrid() {
//   return (
//     <T94Section tone="grey" labelledBy="servizi-grid-title" className="py-12 md:py-20">
//       <h2 id="servizi-grid-title" className="sr-only">
//         Tutti i servizi Tetto94
//       </h2>
//       <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//         {SERVICES.map((service, i) => (
//           <ServiceCard key={service.slug} slug={service.slug} priority={i < 3} />
//         ))}
//       </ul>
//     </T94Section>
//   )
// }

// function ChooseSection() {
//   return (
//     <T94Section tone="white" labelledBy="servizi-choose-title">
//       <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
//         <div className="flex flex-col gap-4">
//           <LPEyebrow>Come scegliere</LPEyebrow>
//           <T94Heading id="servizi-choose-title">Qual è il servizio giusto per il tuo tetto?</T94Heading>
//           <p className="t94-body text-t94-text-secondary">
//             Ogni tetto ha un&apos;età, un materiale e una storia diversa. Prima di scegliere tra{' '}
//             <Link
//               href="/rifacimento-tetto"
//               className="font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-4 hover:decoration-t94-red"
//             >
//               rifacimento completo
//             </Link>{' '}
//             e un intervento localizzato, il nostro team esegue sempre un&apos;ispezione con drone gratuita per
//             individuare la causa reale del problema — infiltrazione, tegola rotta, guaina usurata o isolamento
//             insufficiente — e proporre la soluzione più efficace, non necessariamente la più costosa.
//           </p>
//         </div>

//         <ul className="flex flex-col gap-3">
//           {SERVICES.map((service) => (
//             <li key={service.slug}>
//               <Link
//                 href={`/${service.slug}`}
//                 className="group flex items-start justify-between gap-4 rounded-[14px] border border-t94-border bg-white p-5 transition-colors hover:border-t94-dark"
//               >
//                 <span className="flex flex-col gap-1">
//                   <span className="font-t94 text-[18px] font-semibold text-t94-dark">{service.name}</span>
//                   <span className="t94-small">{service.faqItems[0]?.q}</span>
//                 </span>
//                 <ArrowRight
//                   className="mt-1 size-5 shrink-0 text-t94-red transition-transform group-hover:translate-x-1"
//                   aria-hidden="true"
//                 />
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </T94Section>
//   )
// }

// function FinalCta() {
//   return (
//     <section aria-labelledby="servizi-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
//       <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
//         <h2 id="servizi-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
//           Non sai da dove iniziare? Chiedi un sopralluogo gratuito.
//         </h2>
//         <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
//           Ispezione drone gratuita e preventivo dettagliato entro 24 ore, su qualsiasi servizio di cui hai bisogno.
//         </p>
//         <T94Button href="/calcola-preventivo" variant="outline" className="border-white">
//           Richiedi preventivo
//         </T94Button>
//       </div>
//     </section>
//   )
// }

// export default function ServiziIndex() {
//   return (
//     <main>
//       <ServicesHero />
//       <ServicesGrid />
//       <ChooseSection />
//       <FinalCta />
//     </main>
//   )
// }


import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Check,
  ChevronRight,
  CloudRain,
  Droplets,
  Hammer,
  Layers,
  Thermometer,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import { T94Section, T94Heading } from '@/components/tetto94/ds/t94-section'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { LPEyebrow } from '@/components/tetto94/lp/lp-parts'
import ServiziHeroActions from '@/components/tetto94/service/servizi-hero-actions'
import { SERVICES } from '@/data/services'

const SERVICE_ICONS: Record<string, LucideIcon> = { Layers, Droplets, Hammer, CloudRain, Wind, Thermometer }

const TICKS = ['32+ anni di esperienza', 'Garanzia scritta su ogni lavoro', 'Preventivo gratuito entro 24h']

function ServicesHero() {
  return (
    <section aria-labelledby="servizi-hero-title" className="t94-type bg-white pt-[88px] md:pt-[132px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 pb-12 pt-8 md:px-8 md:pb-16 md:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="t94-small flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="inline-flex min-h-[32px] items-center underline-offset-4 hover:text-t94-dark hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-semibold text-t94-dark">
              Servizi
            </li>
          </ol>
        </nav>

        <h1 id="servizi-hero-title" className="t94-h1 max-w-[20ch] text-balance">
          Servizi per ogni <span className="text-t94-red">tipo di tetto</span>
        </h1>

        <p className="t94-lead max-w-2xl">
          Rifacimento tetto, riparazione, impermeabilizzazione, stop infiltrazioni, pulizia grondaie e coibentazione:
          Tetto94 interviene su ogni problema della tua copertura in Veneto, Emilia-Romagna e Friuli-Venezia Giulia,
          con ispezione drone gratuita, materiali certificati CE e garanzia scritta su ogni intervento.
        </p>

        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {TICKS.map((tick) => (
            <li key={tick} className="flex items-center gap-3 font-t94 text-[18px] font-medium text-t94-dark">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-t94-green/12 text-t94-green">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              {tick}
            </li>
          ))}
        </ul>

        <ServiziHeroActions />
      </div>
    </section>
  )
}

interface CardData {
  href: string
  name: string
  image: string
  badge: string
  text: string
  icon: LucideIcon
}

/** 7th card from the marketing brief: the ripasso guide page, shown after the six services. */
const RIPASSO_CARD: CardData = {
  href: '/ripasso-tetto-senza-ponteggi',
  name: 'Ripasso Tetto',
  image: '/images/service-riparazione.png',
  badge: 'Da 6.500€',
  text: 'Tegole fissate una a una e rotte sostituite, senza ponteggi.',
  icon: Hammer,
}

function toCard(slug: string): CardData {
  const service = SERVICES.find((s) => s.slug === slug)!
  return {
    href: `/${service.slug}`,
    name: service.name,
    image: service.image,
    badge: service.priceFrom ? `Da ${service.priceFrom}` : 'Preventivo gratis',
    text: service.subheadline,
    icon: SERVICE_ICONS[service.icon] ?? Layers,
  }
}

function ServiceCard({ card, priority }: { card: CardData; priority: boolean }) {
  const Icon = card.icon

  return (
    <li>
      <Link
        href={card.href}
        className="group flex h-full flex-col overflow-hidden rounded-[14px] border border-t94-border bg-white transition-colors hover:border-t94-dark"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-t94-grey">
          <Image
            src={card.image}
            alt={card.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 inline-flex rounded-full bg-white px-3.5 py-1.5 font-t94 text-[15px] font-semibold text-t94-dark shadow-sm">
            {card.badge}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <span className="flex size-11 items-center justify-center rounded-full bg-t94-red/10 text-t94-red">
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <h2 className="t94-h3">{card.name}</h2>
          <p className="t94-body line-clamp-3 text-t94-text-secondary">{card.text}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-t94 text-[17px] font-semibold text-t94-red">
            Scopri di più
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  )
}

function ServicesGrid() {
  return (
    <T94Section tone="grey" labelledBy="servizi-grid-title" className="py-12 md:py-20">
      <h2 id="servizi-grid-title" className="sr-only">
        Tutti i servizi Tetto94
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.slug} card={toCard(service.slug)} priority={i < 3} />
        ))}
        <ServiceCard card={RIPASSO_CARD} priority={false} />
      </ul>
    </T94Section>
  )
}

function ChooseSection() {
  return (
    <T94Section tone="white" labelledBy="servizi-choose-title">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <LPEyebrow>Come scegliere</LPEyebrow>
          <T94Heading id="servizi-choose-title">Qual è il servizio giusto per il tuo tetto?</T94Heading>
          <p className="t94-body text-t94-text-secondary">
            Ogni tetto ha un&apos;età, un materiale e una storia diversa. Prima di scegliere tra{' '}
            <Link
              href="/rifacimento-tetto"
              className="font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-4 hover:decoration-t94-red"
            >
              rifacimento completo
            </Link>{' '}
            e un intervento localizzato, il nostro team esegue sempre un&apos;ispezione con drone gratuita per
            individuare la causa reale del problema (infiltrazione, tegola rotta, guaina usurata o isolamento
            insufficiente) e proporre la soluzione più efficace, non necessariamente la più costosa.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}`}
                className="group flex items-start justify-between gap-4 rounded-[14px] border border-t94-border bg-white p-5 transition-colors hover:border-t94-dark"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-t94 text-[18px] font-semibold text-t94-dark">{service.name}</span>
                  <span className="t94-small">{service.faqItems[0]?.q}</span>
                </span>
                <ArrowRight
                  className="mt-1 size-5 shrink-0 text-t94-red transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </T94Section>
  )
}

function FinalCta() {
  return (
    <section aria-labelledby="servizi-cta-title" className="t94-type bg-t94-red py-16 md:py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 px-5 text-center md:px-8">
        <h2 id="servizi-cta-title" className="t94-h2 max-w-[28ch] text-balance" style={{ color: '#fff' }}>
          Non sai da dove iniziare? Chiedi un sopralluogo gratuito.
        </h2>
        <p className="t94-lead max-w-xl" style={{ color: 'rgba(255,255,255,0.9)' }}>
          Ispezione drone gratuita e preventivo dettagliato entro 24 ore, su qualsiasi servizio di cui hai bisogno.
        </p>
        <T94Button href="/calcola-preventivo" variant="outline" className="border-white">
          Richiedi preventivo
        </T94Button>
      </div>
    </section>
  )
}

export default function ServiziIndex() {
  return (
    <main>
      <ServicesHero />
      <ServicesGrid />
      <ChooseSection />
      <FinalCta />
    </main>
  )
}
