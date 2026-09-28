import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import ServiziContent from '@/components/tetto94/servizi-content'
import { SERVICES } from '@/data/services'

export const metadata: Metadata = {
  title: 'Servizi Tetto Veneto | Rifacimento, Riparazione, Impermeabilizzazione — Tetto94',
  description:
    'Tutti i servizi Tetto94: rifacimento tetto, riparazione, impermeabilizzazione, stop infiltrazioni, pulizia grondaie e coibentazione. Ispezione drone gratuita, materiali certificati CE, garanzia scritta. Preventivo entro 24 ore in Veneto, Emilia-Romagna e Friuli-Venezia Giulia.',
  alternates: {
    canonical: 'https://www.tetto94.it/servizi',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Servizi Tetto Veneto | Rifacimento, Riparazione, Impermeabilizzazione — Tetto94',
    description:
      'Rifacimento, riparazione, impermeabilizzazione, stop infiltrazioni, pulizia grondaie e coibentazione tetto. Ispezione drone gratuita e garanzia scritta su ogni intervento.',
    url: 'https://www.tetto94.it/servizi',
    type: 'website',
  },
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servizi Tetto94',
  url: 'https://www.tetto94.it/servizi',
  itemListElement: SERVICES.map((service, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: service.name,
      description: service.description,
      url: `https://www.tetto94.it/${service.slug}`,
      provider: {
        '@type': ['LocalBusiness', 'RoofingContractor'],
        '@id': 'https://www.tetto94.it/#business',
        name: 'Tetto94',
      },
      areaServed: ['Veneto', 'Emilia-Romagna', 'Friuli-Venezia Giulia'],
    },
  })),
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
    { '@type': 'ListItem', position: 2, name: 'Servizi', item: 'https://www.tetto94.it/servizi' },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SERVICES.map((service) => ({
    '@type': 'Question',
    name: service.faqItems[0]?.q,
    acceptedAnswer: { '@type': 'Answer', text: service.faqItems[0]?.a },
  })),
}

export default function ServiziPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <ServiziContent />
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  )
}