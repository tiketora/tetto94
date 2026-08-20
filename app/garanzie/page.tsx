import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import GaranzieContent from '@/components/tetto94/garanzie-content'

export const metadata: Metadata = {
  title: 'Garanzia Scritta 10 Anni su Ogni Intervento — Tetto94',
  description:
    'Garanzia scritta 10 anni su materiali e manodopera, certificato consegnato a fine lavoro. Se serve, torniamo senza costi aggiuntivi. Tetto94 dal 1994.',
  alternates: {
    canonical: 'https://www.tetto94.it/garanzie',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Garanzia Scritta 10 Anni su Ogni Intervento — Tetto94',
    description:
      'Garanzia scritta 10 anni su materiali e manodopera, certificato consegnato a fine lavoro. Se serve, torniamo senza costi aggiuntivi.',
    url: 'https://www.tetto94.it/garanzie',
    type: 'website',
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto dura la garanzia scritta di Tetto94?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La garanzia è di 10 anni su rifacimento completo del tetto e impermeabilizzazione. Per riparazioni puntuali la durata è indicata nel certificato consegnato a fine lavoro, in base al tipo di intervento.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cosa devo fare per attivare la garanzia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non serve nessuna registrazione. Il certificato di garanzia ti viene consegnato automaticamente a fine lavoro insieme alla documentazione del cantiere. Basta conservarlo e contattarci se si presenta un problema.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cosa non è coperto dalla garanzia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La garanzia non coprire danni causati da eventi eccezionali (grandinate estreme, calamità naturali riconosciute), interventi di terzi non autorizzati sulla copertura dopo il nostro lavoro, o normale usura di elementi non trattati durante l'intervento originale. Le condizioni specifiche sono sempre indicate nel contratto e nel certificato di garanzia.",
      },
    },
    {
      '@type': 'Question',
      name: "L'intervento in garanzia ha davvero costo zero?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì. Se il sopralluogo confirma che il problema rientra nelle condizioni della garanzia scritta, non paghi né la manodopera né i materiali necessari per la correzione.',
      },
    },
  ],
}

export default function GaranziePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <GaranzieContent />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileStickyBar />
    </>
  )
}
