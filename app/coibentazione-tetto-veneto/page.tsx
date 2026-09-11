import type { Metadata } from 'next'
import { getLandingPage } from '@/data/landing-pages'
import InsulationLandingPageTemplate from '@/components/tetto94/isulation-landing-page-template'
import { notFound } from 'next/navigation'

const config = getLandingPage('coibentazione-tetto-veneto')!

// Ads-only landing page: noindex/nofollow, no structured data, not linked
// from anywhere on the site. This is the paid-traffic twin of the future
// indexable /coibentazione-tetto service page — the two must never share copy.
export const metadata: Metadata = {
  title: config.metaTitle,
  description: config.metaDescription,
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    title: config.metaTitle,
    description: config.metaDescription,
    url: config.url,
    siteName: 'Tetto94',
    locale: 'it_IT',
    type: 'website',
    images: [
      {
        url: 'https://www.tetto94.it/images/hero-roof-mobile.png',
        width: 1200,
        height: 630,
        alt: `Coibentazione tetto in ${config.region} senza ponteggi — Tetto94`,
      },
    ],
  },
}

export default function Page() {
  if (!config) notFound()
  return <InsulationLandingPageTemplate config={config} />
}
