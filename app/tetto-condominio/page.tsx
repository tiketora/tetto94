import type { Metadata } from 'next'
import InfoPage, { type InfoPageSpec } from '@/components/tetto94/service/info-page'

const URL = 'https://www.tetto94.it/tetto-condominio'
const TITLE = 'Tetto del Condominio: Spese, Delibere e Detrazioni | Tetto94'
const DESCRIPTION =
  'Lavori sul tetto del condominio: chi paga e come si ripartiscono le spese, che maggioranza serve, quali detrazioni valgono nel 2026. Lavori senza ponteggi.'

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

const SPEC: InfoPageSpec = {
  slug: 'tetto-condominio',
  breadcrumb: 'Tetto del condominio',
  h1: 'Lavori sul tetto del condominio',
  subtitle: 'Ripasso, riparazione e rifacimento del tetto condominiale, senza ponteggi.',
  shortAnswer:
    'Il tetto è una parte comune dell’edificio (art. 1117 del Codice civile): le spese per ripararlo o rifarlo si dividono tra i condòmini in base ai millesimi di proprietà. Le riparazioni straordinarie di notevole entità vanno approvate dall’assemblea con la maggioranza degli intervenuti e almeno metà del valore dell’edificio. Anche la manutenzione ordinaria delle parti comuni può accedere al bonus ristrutturazione.',
  ticks: [
    'Sopralluogo con drone gratuito',
    'Preventivo scritto voce per voce entro 24 ore',
    'Lavoro su fune, senza ponteggi',
  ],
  formService: '',
  sections: [
    {
      kind: 'text',
      id: 'info-chi-paga-title',
      title: 'Chi paga i lavori sul tetto del condominio?',
      body: [
        'Le spese per le parti comuni si ripartiscono in proporzione al valore della proprietà di ciascuno, cioè in base ai millesimi (art. 1123 del Codice civile), salvo un accordo diverso. Per il lastrico solare a uso esclusivo di un solo condòmino vale una regola diversa (art. 1126): chi ne ha l’uso esclusivo paga un terzo della spesa, gli altri due terzi sono a carico dei condòmini a cui il lastrico fa da copertura.',
      ],
    },
    {
      kind: 'text',
      id: 'info-maggioranza-title',
      title: 'Che maggioranza serve in assemblea?',
      body: [
        'Per le riparazioni straordinarie di notevole entità, come il rifacimento del tetto, la delibera deve essere approvata con la maggioranza degli intervenuti che rappresenti almeno la metà del valore dell’edificio (art. 1136, commi 2 e 4, del Codice civile). Il preventivo scritto voce per voce e la relazione fotografica del drone aiutano l’assemblea a decidere.',
      ],
    },
    {
      kind: 'text',
      id: 'info-detrazioni-title',
      title: 'Detrazioni per il tetto condominiale',
      body: [
        'Nei condomini il bonus ristrutturazione vale anche per la manutenzione ordinaria delle parti comuni, mentre sulla singola abitazione la manutenzione ordinaria non è detraibile. La detrazione si divide tra i condòmini in base ai millesimi.',
      ],
    },
    {
      kind: 'text',
      id: 'info-senza-ponteggi-title',
      title: 'Perché lavorare senza ponteggi in condominio',
      body: [
        'Senza ponteggio non ci sono impalcature sulle facciate comuni per settimane, né occupazione del suolo pubblico da chiedere al Comune, e il costo del ponteggio non entra nella spesa da ripartire. Lavoriamo su fune con linea vita provvisoria; se il tetto richiede interventi sulla struttura, lo segnaliamo all’amministratore dopo il sopralluogo.',
      ],
    },
    {
      kind: 'list',
      id: 'info-amministratore-title',
      title: 'Cosa riceve l’amministratore',
      items: [
        'Report fotografico del sopralluogo con drone',
        'Preventivo scritto voce per voce entro 24 ore',
        'POS (piano operativo di sicurezza)',
        'Certificato di garanzia scritto a fine lavoro',
      ],
    },
  ],
  faqTitle: 'Domande frequenti',
  faq: [
    {
      q: 'Chi paga il rifacimento del tetto in condominio?',
      a: 'Tutti i condòmini, in proporzione ai millesimi di proprietà (art. 1123 del Codice civile), perché il tetto è una parte comune dell’edificio.',
    },
    {
      q: 'Come si dividono le spese del lastrico solare a uso esclusivo?',
      a: 'Un terzo a chi ne ha l’uso esclusivo, due terzi agli altri condòmini a cui il lastrico fa da copertura, in proporzione al valore della loro proprietà (art. 1126 del Codice civile).',
    },
    {
      q: 'Che maggioranza serve per rifare il tetto del condominio?',
      a: 'Per le riparazioni straordinarie di notevole entità serve la maggioranza degli intervenuti che rappresenti almeno la metà del valore dell’edificio (art. 1136 del Codice civile).',
    },
    {
      q: 'Il condòmino può detrarre la sua quota?',
      a: 'Sì. Per i lavori sulle parti comuni ogni condòmino detrae la propria quota, calcolata in base ai millesimi. Nei condomini è detraibile anche la manutenzione ordinaria delle parti comuni.',
    },
    {
      q: 'Serve il ponteggio per il tetto del condominio?',
      a: 'Per i lavori sul manto no: lavoriamo su fune con linea vita provvisoria. Se vanno rifatte parti strutturali, lo valutiamo al sopralluogo.',
    },
  ],
}

export default function TettoCondominioPage() {
  return <InfoPage spec={SPEC} />
}
