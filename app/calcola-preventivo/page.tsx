import type { Metadata } from 'next'
import RoofCalculator from '@/components/tetto94/roof-calculator'

export const metadata: Metadata = {
  title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis | Tetto94',
  description:
    'Scopri in 2 minuti lo stato del tuo tetto con il T94 Roof Index™ di Tetto94. 7 domande, analisi tecnica gratuita, stima costi immediata. Operiamo in tutto il Nord-Est Italia dal 1994.',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  openGraph: {
    title: 'T94 Roof Index™ — Calcola il Rischio del Tuo Tetto Gratis',
    description: 'Analisi gratuita in 7 domande. Stima costi immediata. Garanzia scritta 10 anni.',
    url: 'https://www.tetto94.it/calcola-preventivo',
    images: [{ url: 'https://www.tetto94.it/images/hero-roof-mobile.png', width: 1200, height: 630 }],
  },
}

export default function CalcolaPage() {
  return <RoofCalculator />
}
