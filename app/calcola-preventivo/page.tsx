// import type { Metadata } from 'next'
// import RoofCalculator from '@/components/tetto94/roof-calculator'

// export const metadata: Metadata = {
//   title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis | Tetto94',
//   description:
//     'Scopri in 2 minuti lo stato del tuo tetto con il T94 Roof Index™ di Tetto94. 7 domande, analisi tecnica gratuita, stima costi immediata. Operiamo in tutto il Nord-Est Italia dal 1994.',
//   robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
//   openGraph: {
//     title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
//     description: 'Analisi gratuita in 7 domande. Stima costi immediata. Garanzia scritta 10 anni.',
//     url: 'https://www.tetto94.it/calcola-preventivo',
//     images: [{ url: 'https://www.tetto94.it/images/hero-roof-mobile.png', width: 1200, height: 630 }],
//   },
// }

// export default function CalcolaPage() {
//   return <RoofCalculator />
// }

// import type { Metadata } from 'next'
// import RoofCalculator from '@/components/tetto94/roof-calculator'
// import RoofIndexIntro from '@/components/tetto94/roof-index-intro'

// export const metadata: Metadata = {
//   title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis | Tetto94',
//   description:
//     'Scopri in 2 minuti lo stato del tuo tetto con il T94 Roof Index™ di Tetto94. 7 domande, analisi tecnica gratuita, stima costi immediata. Operiamo in tutto il Nord-Est Italia dal 1994.',
//   robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
//   openGraph: {
//     title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
//     description: 'Analisi gratuita in 7 domande. Stima costi immediata. Garanzia scritta 10 anni.',
//     url: 'https://www.tetto94.it/calcola-preventivo',
//     images: [{ url: 'https://www.tetto94.it/images/hero-roof-mobile.png', width: 1200, height: 630 }],
//   },
// }

// export default function CalcolaPage() {
//   return (
//     <>
//       <RoofIndexIntro targetId="roof-index-analisi" />
//       <div id="roof-index-analisi">
//         <RoofCalculator />
//       </div>
//     </>
//   )
// }

// import type { Metadata } from 'next'
// import Navbar from '@/components/tetto94/navbar'
// import RoofCalculator from '@/components/tetto94/roof-calculator'
// import RoofIndexIntro from '@/components/tetto94/roof-index-intro'

// export const metadata: Metadata = {
//   title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis | Tetto94',
//   description:
//     'Scopri in 2 minuti lo stato del tuo tetto con il T94 Roof Index™ di Tetto94. 7 domande, analisi tecnica gratuita, stima costi immediata. Operiamo in tutto il Nord-Est Italia dal 1994.',
//   robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
//   openGraph: {
//     title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
//     description: 'Analisi gratuita in 7 domande. Stima costi immediata. Garanzia scritta 10 anni.',
//     url: 'https://www.tetto94.it/calcola-preventivo',
//     images: [{ url: 'https://www.tetto94.it/images/hero-roof-mobile.png', width: 1200, height: 630 }],
//   },
// }

// export default function CalcolaPage() {
//   return (
//     <>
//       <Navbar />
//       <RoofIndexIntro targetId="roof-index-analisi" />
//       <div id="roof-index-analisi">
//         <RoofCalculator />
//       </div>
//     </>
//   )
// }


import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import RoofCalculator from '@/components/tetto94/roof-calculator'
import RoofIndexIntro from '@/components/tetto94/roof-index-intro'

const PAGE_URL = 'https://www.tetto94.it/calcola-preventivo'
const OG_IMAGE = 'https://www.tetto94.it/images/hero-roof-mobile.png'

export const metadata: Metadata = {
  title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
  description:
    'Scopri in 2 minuti lo stato del tuo tetto con il T94 Roof Index™ di Tetto94. 7 domande, analisi tecnica gratuita, stima costi immediata a 60€/m². Operiamo in tutto il Nord-Est Italia dal 1994.',
  keywords: [
    'calcolo preventivo tetto online',
    'stima costo riparazione tetto',
    'quanto costa rifare il tetto',
    'analisi rischio tetto gratuita',
    'preventivo tetto al metro quadro',
    'T94 Roof Index',
    'valutazione stato tetto Venezia',
    'calcolatore preventivo tetto Mestre',
    'costo tetto al m2 Padova',
    'diagnosi tetto online Treviso',
  ],
  alternates: {
    canonical: PAGE_URL,
    languages: {
      'it-IT': PAGE_URL,
    },
  },
  openGraph: {
    title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
    description:
      'Analisi gratuita in 7 domande. Stima costi immediata a 60€/m². Garanzia scritta 10 anni. Operiamo in tutto il Nord-Est Italia.',
    url: PAGE_URL,
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'T94 Roof Index — calcolatore gratuito di rischio e preventivo tetto Tetto94',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
    description:
      'Analisi gratuita in 7 domande. Stima costi immediata a 60€/m². Garanzia scritta 10 anni.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

/* ── Service + BreadcrumbList JSON-LD ──────────────────────────────────
   Describes the T94 Roof Index as a free Service offered by Tetto94
   (not a rated "app") and gives the page its own breadcrumb trail so
   it's indexed as a distinct, navigable page rather than orphaned
   content under the calculator's dynamic UI. */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'T94 Roof Index™ — Analisi Gratuita del Rischio Tetto',
  serviceType: 'Diagnosi e stima costi copertura',
  description:
    'Strumento gratuito online che analizza 7 parametri tecnici del tetto (zona climatica, superficie, età, problema, durata, materiale, storico interventi) e restituisce un indice di rischio con stima costi orientativa basata su 60€/m².',
  provider: { '@id': 'https://www.tetto94.it/#business' },
  areaServed: { '@id': 'https://www.tetto94.it/#business' },
  url: PAGE_URL,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    url: PAGE_URL,
  },
  isPartOf: { '@id': 'https://www.tetto94.it/#website' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
    { '@type': 'ListItem', position: 2, name: 'T94 Roof Index™', item: PAGE_URL },
  ],
}

export default function CalcolaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        <RoofIndexIntro targetId="roof-index-analisi" />
        <div id="roof-index-analisi">
          <RoofCalculator />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  )
}
