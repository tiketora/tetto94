import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tetto94 — Esperti del Tetto dal 1994',
  description:
    'Tetto94 offre servizi professionali di riparazione, rifacimento e ispezione tetti con drone gratuita. Oltre 30 anni di esperienza, 500+ progetti completati. Preventivo gratuito.',
  keywords: [
    'tetto',
    'copertura',
    'riparazione tetto',
    'rifacimento tetto',
    'ispezione drone',
    'impermeabilizzazione',
    'tegole',
    'grondaie',
  ],
  authors: [{ name: 'Tetto94' }],
  openGraph: {
    title: 'Tetto94 — Esperti del Tetto dal 1994',
    description: 'Ispezione GRATUITA con drone. Riparazione, rifacimento e impermeabilizzazione tetti. 30+ anni di esperienza.',
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#EB1C26',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
