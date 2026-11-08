import type { Metadata } from 'next'
import Link from 'next/link'
import InfoPage, { type InfoPageSpec } from '@/components/tetto94/service/info-page'
import { FORM_SERVICE } from '@/components/tetto94/service/service-utils'

const URL = 'https://www.tetto94.it/ripasso-tetto-senza-ponteggi'
const TITLE = 'Ripasso Tetto Senza Ponteggi: Cosa Comprende | Tetto94'
const DESCRIPTION =
  'Ripasso del tetto senza ponteggi in Veneto: tegole fissate una a una, rotte sostituite, lucernari e camini sigillati, grondaie pulite. Da 6.500 €, drone gratis.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
    images: [{ url: 'https://www.tetto94.it/images/hero-roof-mobile.png', width: 1200, height: 630, alt: TITLE }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

const linkClass =
  'font-semibold text-t94-dark underline decoration-t94-border decoration-2 underline-offset-4 hover:decoration-t94-red'

const SPEC: InfoPageSpec = {
  slug: 'ripasso-tetto-senza-ponteggi',
  breadcrumb: 'Ripasso tetto',
  smallLine: 'Nord-Est Italia · Dal 1994',
  h1: 'Ripasso del tetto senza ponteggi',
  subtitle: 'Sistemiamo il manto che hai, senza rifare il tetto e senza impalcature.',
  shortAnswer:
    'Il ripasso del tetto è la revisione completa del manto esistente: sostituiamo tegole e coppi rotti, fissiamo uno a uno tutti gli elementi, sigilliamo lucernari e canne fumarie e puliamo le grondaie. Lavoriamo su fune, con linea vita provvisoria compresa, quindi il ponteggio non lo paghi. Il pacchetto parte da 6.500 €.',
  ticks: [
    'Linea vita provvisoria compresa',
    'Sopralluogo con drone gratuito',
    'Preventivo scritto entro 24 ore',
    'Certificato di garanzia a fine lavoro',
  ],
  formService: FORM_SERVICE['riparazione-tetto'] ?? '',
  sections: [
    {
      kind: 'list',
      id: 'info-comprende-title',
      title: 'Cosa comprende il ripasso',
      items: [
        'Linea vita provvisoria compresa nel pacchetto',
        'Sostituzione di tegole e coppi rotti',
        'Fissaggio uno a uno di tutte le tegole o coppi',
        'Impermeabilizzazione dei lucernari',
        'Impermeabilizzazione delle canne fumarie',
        'Pulizia e sigillatura di grondaie e canali',
        'POS (piano operativo di sicurezza)',
        'Pulizia del cantiere a fine lavoro e smaltimento dei materiali di risulta',
        'Certificato di garanzia',
      ],
      price: { line: 'A partire da 6.500 €', cta: 'Richiedi il sopralluogo gratuito' },
    },
    {
      kind: 'text',
      id: 'info-ripasso-rifacimento-title',
      title: 'Ripasso o rifacimento: quale serve?',
      body: [
        <>
          Il ripasso è la scelta giusta quando la struttura del tetto è sana e il problema è il manto: tegole o coppi
          rotti o spostati, qualche infiltrazione, sigillature vecchie. Se invece le tegole si sbriciolano su tutta la
          falda, la guaina sotto è da sostituire o le travi sono danneggiate, serve un rifacimento del tetto. Al
          sopralluogo con drone ti diciamo quale dei due serve, con le foto. I segnali da controllare li trovi nella
          guida{' '}
          <Link href="/blog/come-capire-se-il-tetto-va-rifatto" className={linkClass}>
            come capire se il tetto va rifatto
          </Link>
          .
        </>,
      ],
    },
    {
      kind: 'steps',
      id: 'info-steps-title',
      title: 'Come lavoriamo senza ponteggi',
      steps: [
        {
          title: 'Sopralluogo con drone',
          desc: 'Controlliamo tutto il tetto dall’alto, gratis, e ti mandiamo il preventivo scritto voce per voce entro 24 ore.',
        },
        {
          title: 'Linea vita e accesso su fune',
          desc: 'Montiamo la linea vita provvisoria e lavoriamo su fune. Il D.Lgs. 81/2008 (art. 116) richiede almeno due funi ancorate separatamente, una di lavoro e una di sicurezza, e un’imbracatura collegata alla fune di sicurezza.',
        },
        {
          title: 'Il ripasso',
          desc: 'Sostituiamo gli elementi rotti, fissiamo tutte le tegole o i coppi, impermeabilizziamo lucernari e canne fumarie, puliamo e sigilliamo grondaie e canali.',
        },
        {
          title: 'Pulizia e garanzia',
          desc: 'Puliamo il cantiere, smaltiamo i materiali e ti consegniamo il certificato di garanzia scritto.',
        },
      ],
      after: (
        <>
          Più dettagli nella{' '}
          <Link href="/blog/rifacimento-tetto-senza-ponteggi" className={linkClass}>
            guida al rifacimento del tetto senza ponteggi
          </Link>
          .
        </>
      ),
    },
    {
      kind: 'text',
      id: 'info-permesso-title',
      title: 'Serve un permesso per il ripasso?',
      body: [
        'Di norma no. Il ripasso è manutenzione ordinaria: il Testo unico dell’edilizia (DPR 380/2001, art. 3) la definisce come riparazione, rinnovamento e sostituzione delle finiture degli edifici, e la manutenzione ordinaria non richiede autorizzazioni particolari. Se l’edificio è vincolato o se si cambiano materiali o struttura, al sopralluogo verifichiamo quali pratiche servono.',
      ],
    },
    {
      kind: 'text',
      id: 'info-detraibile-title',
      title: 'Il ripasso è detraibile?',
      body: [
        <>
          Sulla singola abitazione la manutenzione ordinaria non è detraibile. Nei condomini, invece, anche la
          manutenzione ordinaria delle parti comuni, come il tetto, rientra nel bonus ristrutturazione: le spese si
          ripartiscono tra i condòmini in base ai millesimi. Vedi i{' '}
          <Link href="/tetto-condominio" className={linkClass}>
            lavori sul tetto del condominio
          </Link>
          .
        </>,
      ],
    },
  ],
  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Cos’è il ripasso del tetto?',
      a: 'È la revisione completa del manto esistente: si sostituiscono tegole e coppi rotti, si fissano uno a uno tutti gli elementi e si sigillano lucernari, canne fumarie e grondaie, senza rifare il tetto.',
    },
    {
      q: 'Quanto costa il ripasso del tetto?',
      a: 'Con Tetto94 il pacchetto di ripasso senza ponteggi parte da 6.500 €, linea vita provvisoria compresa. Il prezzo finale dipende da superficie, numero di elementi da sostituire e punti da sigillare: lo trovi nel preventivo scritto, entro 24 ore dal sopralluogo con drone.',
    },
    {
      q: 'Serve il ponteggio per il ripasso?',
      a: 'No. I lavori sul manto si fanno su fune, con linea vita provvisoria. Se dal sopralluogo emerge che vanno rifatte travi o parti strutturali, ti diciamo come intervenire.',
    },
    {
      q: 'Serve un permesso per il ripasso del tetto?',
      a: 'Di norma no: è manutenzione ordinaria, che non richiede autorizzazioni particolari. In zona vincolata o se si cambiano materiali o struttura, verifichiamo al sopralluogo quali pratiche servono.',
    },
    {
      q: 'Il ripasso del tetto è detraibile?',
      a: 'Sulla singola abitazione no, perché è manutenzione ordinaria. In condominio sì: la manutenzione ordinaria delle parti comuni rientra nel bonus ristrutturazione.',
    },
    {
      q: 'C’è la garanzia sul ripasso?',
      a: 'Sì. A fine lavoro ricevi il certificato di garanzia scritto, con la durata indicata in base all’intervento.',
    },
  ],
}

export default function RipassoPage() {
  return <InfoPage spec={SPEC} />
}
