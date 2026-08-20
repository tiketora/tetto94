import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import ServicePageHero from '@/components/tetto94/service-page-hero'
import ServicePageContent from '@/components/tetto94/service-page-content'
import { SERVICES, LOCATIONS, getService, getLocation, CITY_PAGE_SERVICES } from '@/data/services'
import { getCitySeoData } from '@/data/city-seo'

interface Props {
  params: Promise<{ servizio: string; citta: string }>
}

/* Cities enabled for indexing on rifacimento-tetto — extend as more cities are ready */
const INDEXED_CITIES_RIFACIMENTO = new Set([
  // Batch 1
  'venezia', 'mestre', 'padova', 'treviso', 'verona', 'vicenza',
  // Batch 2
  'rovigo', 'belluno', 'chioggia', 'mirano', 'san-dona-di-piave', 'mogliano-veneto',
])

/* ── Static generation ──────────────────────────────────────────────────
   Pre-render at build time ONLY the pages that are actually indexed
   (rifacimento-tetto × the 12 priority cities above) — these are the ones
   Google needs served instantly. All other service×city combinations
   (5 services × 19 cities = 95 total, mostly noindex long-tail pages) are
   NOT pre-rendered: Next.js still serves them correctly on first request
   (dynamicParams defaults to true) and caches the result afterwards, so
   nothing 404s — it just skips wasting build memory/time on pages that
   don't need to be indexed anyway.
   Pre-rendering all 95 combos at once previously caused the build worker
   to run out of memory ("JavaScript heap out of memory"). */
export async function generateStaticParams() {
  return LOCATIONS.filter((l) => INDEXED_CITIES_RIFACIMENTO.has(l.slug)).map((l) => ({
    servizio: 'rifacimento-tetto',
    citta: l.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servizio, citta } = await params
  const service = getService(servizio)
  const location = getLocation(citta)
  if (!service || !location || !CITY_PAGE_SERVICES.has(servizio)) return {}

  /* City-specific pricing/FAQ content only exists in the context of a full
     roof rebuild — only attach it on rifacimento-tetto pages. Other services
     fall back to the generic service+location template. */
  const citySeoData = servizio === 'rifacimento-tetto' ? getCitySeoData(citta) : undefined
  const isIndexed = servizio === 'rifacimento-tetto' && INDEXED_CITIES_RIFACIMENTO.has(citta)

  const title = `${service.name} a ${location.name} | Preventivo Gratuito — Tetto94`
  const description = servizio === 'rifacimento-tetto'
    ? `Rifacimento tetto a ${location.name} da 6.500€. Garanzia scritta 10 anni, materiali certificati CE, ispezione drone gratuita. Preventivo entro 24 ore. Tetto94 dal 1994.`
    : `${service.metaDescription.replace(/\.$/, '')} a ${location.name}. Preventivo gratuito entro 24 ore. Tetto94 dal 1994.`
  const url = `https://www.tetto94.it/${service.slug}/${location.slug}`

  /* City-specific OG image if available, otherwise fallback */
  const ogImageUrl = citySeoData
    ? `https://www.tetto94.it${citySeoData.ogImage}`
    : 'https://www.tetto94.it/images/hero-roof-mobile.png'

  return {
    title,
    description,
    keywords: [
      `${service.name} ${location.name}`,
      `rifacimento tetto ${location.name} prezzi`,
      `costo rifacimento tetto ${location.name}`,
      `${service.name} ${location.province}`,
      `${service.name} ${location.region}`,
      `tetto ${location.name}`,
      `copertura tetto ${location.name}`,
      `riparazione tetto ${location.name}`,
      `preventivo tetto ${location.name}`,
      `artigiani tetto ${location.name}`,
      `impermeabilizzazione tetto ${location.name}`,
      ...(location.nearbyCity ? location.nearbyCity.split(', ').map((c) => `${service.name} ${c}`) : []),
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Tetto94',
      locale: 'it_IT',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${service.name} a ${location.name} — Tetto94` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [ogImageUrl] },
    /* Indexed for the 6 priority rifacimento-tetto cities; noindex for everything else */
    robots: isIndexed
      ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
    /* Geo meta tags — standard for local SEO, only emitted for indexed city pages */
    ...(isIndexed && location.lat && location.lng
      ? {
          other: {
            'geo.placename':  `${location.name}, ${location.province}, Italia`,
            'geo.region':     `IT-${location.province}`,
            'geo.position':   `${location.lat};${location.lng}`,
            'ICBM':           `${location.lat}, ${location.lng}`,
          },
        }
      : {}),
  }
}

export default async function ServiceLocationPage({ params }: Props) {
  const { servizio, citta } = await params
  const service = getService(servizio)
  const location = getLocation(citta)
  if (!service || !location || !CITY_PAGE_SERVICES.has(servizio)) notFound()

  /* City-specific pricing/FAQ content only exists in the context of a full
     roof rebuild — only attach it on rifacimento-tetto pages. Other services
     fall back to the generic service+location template already built for
     this case in ServicePageHero / ServicePageContent. */
  const citySeoData = servizio === 'rifacimento-tetto' ? getCitySeoData(citta) : undefined
  const pageUrl = `https://www.tetto94.it/${service.slug}/${location.slug}`

  /* JSON-LD — LocalBusiness + RoofingContractor */
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'RoofingContractor'],
    '@id': `${pageUrl}#business`,
    name: `Tetto94 — ${service.name} a ${location.name}`,
    description: `${service.name} a ${location.name}. ${service.description}`,
    url: pageUrl,
    telephone: '+393516519363',
    email: 'info@tetto94.it',
    image: citySeoData
      ? `https://www.tetto94.it${citySeoData.ogImage}`
      : 'https://www.tetto94.it/images/hero-roof-mobile.png',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Venezia',
      addressRegion: 'VE',
      postalCode: '30100',
      addressCountry: 'IT',
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      containedInPlace: { '@type': 'State', name: location.region },
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
    foundingDate: '1994',
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
    ],
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '6', bestRating: '5' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} a ${location.name}`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${service.nameFull} a ${location.name}`,
            description: service.longDescription,
            areaServed: location.name,
            ...(service.priceFrom
              ? {
                  offers: {
                    '@type': 'Offer',
                    priceCurrency: 'EUR',
                    price: service.priceFrom.replace(/[^\d]/g, ''),
                    priceSpecification: {
                      '@type': 'UnitPriceSpecification',
                      priceCurrency: 'EUR',
                      price: service.priceFrom.replace(/[^\d]/g, ''),
                      unitText: 'FLAT',
                      description: `${service.name} a ${location.name} a partire da ${service.priceFrom}`,
                    },
                  },
                }
              : {}),
          },
        },
        /* Add city-specific price rows to schema if available */
        ...(citySeoData
          ? citySeoData.prezzi
              .filter((p) => p.prezzoMin !== '€ 0')
              .map((p) => ({
                '@type': 'Offer',
                name: p.tipo,
                description: `${p.tipo} a ${location.name}: ${p.prezzoMin} – ${p.prezzoMax}. ${p.note}`,
                areaServed: location.name,
              }))
          : []),
      ],
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
      { '@type': 'ListItem', position: 2, name: service.name, item: `https://www.tetto94.it/${service.slug}` },
      { '@type': 'ListItem', position: 3, name: location.name, item: pageUrl },
    ],
  }

  /* Merge base FAQ + city-specific FAQ extra (if available) */
  const allFaqItems = [
    ...service.faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q.includes(location.name) ? f.q : `${f.q.replace(/\?$/, '')} a ${location.name}?`,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
    {
      '@type': 'Question',
      name: `Tetto94 opera a ${location.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Sì, Tetto94 opera a ${location.name} (${location.province}) e in tutta la provincia. ${location.description} Contattateci per un preventivo gratuito.`,
      },
    },
    ...(citySeoData
      ? citySeoData.faqExtra.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        }))
      : []),
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <ServicePageHero service={service} location={location} citySeoData={citySeoData ?? undefined} />
        <ServicePageContent service={service} location={location} citySeoData={citySeoData} />
      </main>
      <Footer />
    </>
  )
}
