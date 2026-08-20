import Navbar from '@/components/tetto94/navbar'
import ContactSection from '@/components/tetto94/contact-section'
import Footer from '@/components/tetto94/footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Richiedi Preventivo Gratuito Tetto | Ispezione Drone Venezia — Tetto94',
  description:
    'Contatta Tetto94 per un preventivo gratuito sul tuo tetto. Ispezione gratuita con drone a Venezia, Mestre, Padova, Treviso e province. Rispondiamo entro 24 ore. Garanzia 10 anni su tutti i lavori.',
  keywords: [
    'preventivo tetto gratuito Venezia',
    'contatta tetto94',
    'ispezione drone tetto gratuita Venezia',
    'riparazione tetto preventivo Venezia',
    'preventivo rifacimento tetto Mestre',
    'preventivo impermeabilizzazione tetto Venezia',
    'richiedi preventivo tetto Padova',
    'preventivo tetto Treviso',
    'contatto impresa tetti Venezia',
  ],
  alternates: {
    canonical: 'https://www.tetto94.it/contatti',
    languages: {
      'it-IT': 'https://www.tetto94.it/contatti',
    },
  },
  openGraph: {
    title: 'Preventivo Gratuito Tetto a Venezia | Ispezione Drone — Tetto94',
    description:
      'Richiedi un preventivo gratuito. Ispezione con drone inclusa. Operiamo a Venezia, Mestre, Padova, Treviso e province. Risposta entro 24 ore.',
    url: 'https://www.tetto94.it/contatti',
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: 'https://www.tetto94.it/images/hero-roof-mobile.png',
        width: 1200,
        height: 630,
        alt: 'Tetto94 — Richiedi preventivo gratuito per riparazione tetto a Venezia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preventivo Gratuito Tetto Venezia — Tetto94',
    description:
      'Ispezione gratuita con drone. Preventivo entro 24 ore. Garanzia 10 anni. Operiamo a Venezia, Mestre, Padova, Treviso.',
    images: ['https://www.tetto94.it/images/hero-roof-mobile.png'],
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

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.tetto94.it/contatti#webpage',
  name: 'Contatti — Tetto94',
  description: 'Richiedi un preventivo gratuito per riparazione, rifacimento o ispezione tetto con drone a Venezia e province.',
  url: 'https://www.tetto94.it/contatti',
  inLanguage: 'it-IT',
  isPartOf: { '@id': 'https://www.tetto94.it/#website' },
  about: { '@id': 'https://www.tetto94.it/#business' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
      { '@type': 'ListItem', position: 2, name: 'Contatti', item: 'https://www.tetto94.it/contatti' },
    ],
  },
}

export default function ContattiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <Navbar />
      <main className="bg-[#161616] pt-24">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
