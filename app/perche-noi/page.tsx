import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import PercheNoiContent from '@/components/tetto94/perche-noi-content'

export const metadata: Metadata = {
  title: 'Chi Siamo — 30+ Anni di Esperienza su Tetti e Coperture | Tetto94',
  description:
    'Tetto94: dal 1994 esperti in riparazione, rifacimento e impermeabilizzazione tetti nel Nord-Est Italia. Ispezione drone gratuita, garanzia scritta, oltre 500 tetti completati.',
  alternates: {
    canonical: 'https://www.tetto94.it/perche-noi',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Chi Siamo — 30+ Anni di Esperienza su Tetti e Coperture | Tetto94',
    description:
      'Dal 1994 esperti in riparazione, rifacimento e impermeabilizzazione tetti nel Nord-Est Italia. Ispezione drone gratuita, garanzia scritta su ogni intervento.',
    url: 'https://www.tetto94.it/perche-noi',
    type: 'website',
  },
}

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Chi Siamo — Tetto94',
  url: 'https://www.tetto94.it/perche-noi',
  description:
    'Tetto94 è specializzata in riparazione tetti, rifacimento coperture e impermeabilizzazione dal 1994, con ispezione drone gratuita e garanzia scritta su ogni intervento nel Nord-Est Italia.',
  mainEntity: {
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': 'https://www.tetto94.it/#business',
    name: 'Tetto94',
    foundingDate: '1994',
    slogan: 'Maestria in ogni dettaglio, sicurezza su ogni tetto.',
  },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
    { '@type': 'ListItem', position: 2, name: 'Perché Noi', item: 'https://www.tetto94.it/perche-noi' },
  ],
}

export default function PercheNoiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      <main>
        <PercheNoiContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  )
}