import type { Metadata, Viewport } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import CookieBanner from '@/components/tetto94/cookie-banner'
import StructuredData from '@/components/tetto94/structured-data'
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
  metadataBase: new URL('https://www.tetto94.it'),
  title: {
    default: 'Tetto94 — Riparazione e Rifacimento Tetti nel Nord-Est Italia | Dal 1994',
    template: '%s | Tetto94',
  },
  description:
    'Tetto94: esperti in riparazione tetti, rifacimento coperture, impermeabilizzazione e ispezione gratuita con drone a Venezia, Verona, Trento, Bologna, Udine, Trieste e tutto il Nord-Est Italia. 32+ anni di esperienza, 500+ lavori completati. Preventivo gratuito entro 24 ore.',
  keywords: [
    // Core services
    'riparazione tetto Venezia',
    'rifacimento tetto Venezia',
    'impermeabilizzazione tetto Venezia',
    'ispezione drone tetto gratuita',
    'sostituzione tegole Venezia',
    'stop infiltrazioni tetto Venezia',
    'pulizia grondaie Venezia',
    'manutenzione tetto Venezia',
    'guaina impermeabilizzante tetto',
    'preventivo tetto gratis Venezia',
    // Longtail Veneto
    'riparazione tetto Mestre',
    'rifacimento tetto Mestre',
    'riparazione tetto Padova',
    'rifacimento tetto Padova',
    'riparazione tetto Treviso',
    'riparazione tetto Vicenza',
    'riparazione tetto Verona',
    'rifacimento tetto Verona',
    'riparazione tetto Rovigo',
    'riparazione tetto Belluno',
    'riparazione tetto Chioggia',
    'riparazione tetto Mirano',
    'riparazione tetto San Donà di Piave',
    'riparazione tetto Jesolo',
    'riparazione tetto Portogruaro',
    'copertura tetto provincia Venezia',
    // Longtail Friuli-Venezia Giulia
    'riparazione tetto Udine',
    'rifacimento tetto Udine',
    'riparazione tetto Trieste',
    'riparazione tetto Pordenone',
    'riparazione tetto Gorizia',
    // Longtail Trentino-Alto Adige
    'riparazione tetto Trento',
    'rifacimento tetto Trento',
    'riparazione tetto Bolzano',
    'riparazione tetto Bozen',
    // Longtail Emilia-Romagna
    'riparazione tetto Bologna',
    'rifacimento tetto Bologna',
    'riparazione tetto Modena',
    'riparazione tetto Parma',
    'riparazione tetto Ferrara',
    'riparazione tetto Ravenna',
    // Longtail Lombardia
    'riparazione tetto Bergamo',
    'riparazione tetto Brescia',
    // Brand
    'Tetto94',
    'tetto artigiani Venezia',
    // Longtail specifici
    'perdite acqua tetto Venezia',
    'tegole rotte Venezia',
    'tetto che perde acqua Venezia',
    'rifacimento copertura villa Venezia',
    'ispezione tetto drone Veneto',
    'impermeabilizzazione lastrico solare Venezia',
    'stop infiltrazioni copertura Veneto',
    'riparazione tetto urgente Venezia',
  ],
  authors: [{ name: 'Tetto94', url: 'https://www.tetto94.it' }],
  creator: 'Tetto94',
  publisher: 'Tetto94',
  category: 'Costruzioni e Coperture',
  alternates: {
    canonical: 'https://www.tetto94.it',
    languages: {
      'it-IT': 'https://www.tetto94.it',
    },
  },
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'Tetto94 — Riparazione e Rifacimento Tetti nel Nord-Est Italia | Dal 1994',
    description:
      'Ispezione GRATUITA con drone. Riparazione, rifacimento coperture, impermeabilizzazione a Venezia, Mestre, Treviso, Padova e province. 32+ anni di esperienza. Preventivo gratuito entro 24 ore.',
    url: 'https://www.tetto94.it',
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: '/images/hero-roof-mobile.png',
        width: 1200,
        height: 630,
        alt: 'Tetto94 — Riparazione e rifacimento tetti a Venezia e province',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tetto94 — Riparazione e Rifacimento Tetti nel Nord-Est Italia',
    description:
      'Ispezione GRATUITA con drone. Riparazione e rifacimento tetti a Venezia, Mestre, Treviso, Padova. 32+ anni di esperienza.',
    images: ['/images/hero-roof-mobile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // Geo meta tags per SEO locale
    'geo.region': 'IT-VE',
    'geo.placename': 'Venezia',
    'geo.position': '45.4408;12.3155',
    'ICBM': '45.4408, 12.3155',
    // Revisit dopo indexing
    'revisit-after': '7 days',
    'rating': 'general',
    'language': 'Italian',
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
    <html lang="it" className={`${inter.variable} ${bebasNeue.variable} bg-white`}>
      <body className="font-sans antialiased bg-white">
        <StructuredData />
        {children}
        <Analytics />
        {/* Cookie consent banner — loads Google scripts only after user accepts */}
        <CookieBanner />
      </body>
    </html>
  )
}
