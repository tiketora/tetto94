// import { notFound } from 'next/navigation'
// import type { Metadata } from 'next'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
// import ServiceCityHero from '@/components/tetto94/service/service-city-hero'
// import ServiceCityBody from '@/components/tetto94/service/service-city-body'
// import { ServiceTrustStrip } from '@/components/tetto94/service/service-body'
// import { getGoogleReviews } from '@/lib/google-reviews'
// import { SERVICES, LOCATIONS, getService, getLocation, CITY_PAGE_SERVICES, INDEXED_CITY_PAGES, INDEXABLE_CITY_PAGES } from '@/data/services'
// import { getCitySeoData } from '@/data/city-seo'
// import { getCoibentazioneCityParagraph } from '@/data/coibentazione-city-content'

// interface Props {
//   params: Promise<{ servizio: string; citta: string }>
// }

// /* ── Static generation ──────────────────────────────────────────────────
//    Pre-render at build time ONLY the pages that are actually indexed
//    (see INDEXED_CITY_PAGES in data/services.ts) — these are the ones
//    Google needs served instantly. All other service×city combinations
//    (6 services × 19 cities = 114 total, mostly noindex long-tail pages) are
//    NOT pre-rendered: Next.js still serves them correctly on first request
//    (dynamicParams defaults to true) and caches the result afterwards, so
//    nothing 404s — it just skips wasting build memory/time on pages that
//    don't need to be indexed anyway.
//    Pre-rendering all combos at once previously caused the build worker
//    to run out of memory ("JavaScript heap out of memory"). */
// export async function generateStaticParams() {
//   return Object.entries(INDEXED_CITY_PAGES).flatMap(([servizio, cities]) =>
//     LOCATIONS.filter((l) => cities.has(l.slug)).map((l) => ({ servizio, citta: l.slug }))
//   )
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { servizio, citta } = await params
//   const service = getService(servizio)
//   const location = getLocation(citta)
//   if (!service || !location || !CITY_PAGE_SERVICES.has(servizio)) return {}

//   /* City-specific pricing/FAQ content only exists in the context of a full
//      roof rebuild — only attach it on rifacimento-tetto pages. Other services
//      fall back to the generic service+location template. */
//   const citySeoData = servizio === 'rifacimento-tetto' ? getCitySeoData(citta) : undefined
//   const isIndexed = INDEXABLE_CITY_PAGES[servizio]?.has(citta) ?? false

//   const title =
//     servizio === 'rifacimento-tetto'
//       ? `Rifacimento Tetto ${citta === 'san-dona-di-piave' ? '' : 'a '}${location.name} | Prezzi 2026 | Tetto94`
//       : `${service.name} a ${location.name} | Preventivo Gratuito — Tetto94`
//   const description = servizio === 'rifacimento-tetto'
//     ? citySeoData?.metaDescription ?? `Rifacimento tetto a ${location.name} da 6.500€. Garanzia scritta 10 anni, materiali certificati CE, ispezione drone gratuita. Preventivo entro 24 ore. Tetto94 dal 1994.`
//     : `${service.metaDescription.replace(/\.$/, '')} a ${location.name}. Preventivo gratuito entro 24 ore. Tetto94 dal 1994.`
//   const url = `https://www.tetto94.it/${service.slug}/${location.slug}`

//   /* City-specific OG image if available, otherwise fallback */
//   const ogImageUrl = citySeoData
//     ? `https://www.tetto94.it${citySeoData.ogImage}`
//     : 'https://www.tetto94.it/images/hero-roof-mobile.png'

//   return {
//     title,
//     description,
//     keywords: [
//       `${service.name} ${location.name}`,
//       `rifacimento tetto ${location.name} prezzi`,
//       `costo rifacimento tetto ${location.name}`,
//       `${service.name} ${location.province}`,
//       `${service.name} ${location.region}`,
//       `tetto ${location.name}`,
//       `copertura tetto ${location.name}`,
//       `riparazione tetto ${location.name}`,
//       `preventivo tetto ${location.name}`,
//       `artigiani tetto ${location.name}`,
//       `impermeabilizzazione tetto ${location.name}`,
//       ...(location.nearbyCity ? location.nearbyCity.split(', ').map((c) => `${service.name} ${c}`) : []),
//     ],
//     alternates: { canonical: url },
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: 'Tetto94',
//       locale: 'it_IT',
//       type: 'website',
//       images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${service.name} a ${location.name} — Tetto94` }],
//     },
//     twitter: { card: 'summary_large_image', title, description, images: [ogImageUrl] },
//     /* Indexed for the 6 priority rifacimento-tetto cities; noindex for everything else */
//     robots: isIndexed
//       ? { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 } }
//       : { index: false, follow: true, googleBot: { index: false, follow: true } },
//     /* Geo meta tags — standard for local SEO, only emitted for indexed city pages */
//     ...(isIndexed && location.lat && location.lng
//       ? {
//           other: {
//             'geo.placename':  `${location.name}, ${location.province}, Italia`,
//             'geo.region':     `IT-${location.province}`,
//             'geo.position':   `${location.lat};${location.lng}`,
//             'ICBM':           `${location.lat}, ${location.lng}`,
//           },
//         }
//       : {}),
//   }
// }

// export default async function ServiceLocationPage({ params }: Props) {
//   const { servizio, citta } = await params
//   const service = getService(servizio)
//   const location = getLocation(citta)
//   if (!service || !location || !CITY_PAGE_SERVICES.has(servizio)) notFound()

//   /* City-specific pricing/FAQ content only exists in the context of a full
//      roof rebuild — only attach it on rifacimento-tetto pages. Other services
//      fall back to the generic service+location template already built for
//      this case in ServiceCityHero / ServiceCityBody. */
//   const citySeoData = servizio === 'rifacimento-tetto' ? getCitySeoData(citta) : undefined
//   /* Lightweight unique paragraph for coibentazione-tetto's indexed city pages
//      (no full CitySeoData package for this service, per team decision). */
//   const cityParagraph = servizio === 'coibentazione-tetto' ? getCoibentazioneCityParagraph(citta) : undefined
//   const pageUrl = `https://www.tetto94.it/${service.slug}/${location.slug}`
//   const google = await getGoogleReviews()

//   const breadcrumbSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: [
//       { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
//       { '@type': 'ListItem', position: 2, name: service.name, item: `https://www.tetto94.it/${service.slug}` },
//       { '@type': 'ListItem', position: 3, name: location.name, item: pageUrl },
//     ],
//   }

//   /* Word for word the same questions the FaqSection renders on screen */
//   const allFaqItems = [...service.faqItems, ...(citySeoData?.faqExtra ?? [])].map((f) => ({
//     '@type': 'Question',
//     name: f.q,
//     acceptedAnswer: { '@type': 'Answer', text: f.a },
//   }))

//   const faqSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'FAQPage',
//     mainEntity: allFaqItems,
//   }

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
//       <Navbar />
//       <main>
//         <ServiceCityHero service={service} location={location} />
//         <ServiceTrustStrip google={google} />
//         <ServiceCityBody
//           service={service}
//           location={location}
//           google={google}
//           citySeoData={citySeoData ?? undefined}
//           cityParagraph={cityParagraph}
//         />
//       </main>
//       <Footer />
//       <MobileStickyBar />
//     </>
//   )
// }


import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
import ServiceCityHero from '@/components/tetto94/service/service-city-hero'
import ServiceCityBody from '@/components/tetto94/service/service-city-body'
import { ServiceTrustStrip } from '@/components/tetto94/service/service-body'
import { getGoogleReviews } from '@/lib/google-reviews'
import { SERVICES, LOCATIONS, getService, getLocation, CITY_PAGE_SERVICES, INDEXED_CITY_PAGES, INDEXABLE_CITY_PAGES } from '@/data/services'
import { getCitySeoData } from '@/data/city-seo'
import { getCoibentazioneCityParagraph } from '@/data/coibentazione-city-content'

interface Props {
  params: Promise<{ servizio: string; citta: string }>
}

/* ── Static generation ──────────────────────────────────────────────────
   Pre-render at build time ONLY the pages that are actually indexed
   (see INDEXED_CITY_PAGES in data/services.ts) — these are the ones
   Google needs served instantly. All other service×city combinations
   (6 services × 19 cities = 114 total, mostly noindex long-tail pages) are
   NOT pre-rendered: Next.js still serves them correctly on first request
   (dynamicParams defaults to true) and caches the result afterwards, so
   nothing 404s — it just skips wasting build memory/time on pages that
   don't need to be indexed anyway.
   Pre-rendering all combos at once previously caused the build worker
   to run out of memory ("JavaScript heap out of memory"). */
export async function generateStaticParams() {
  return Object.entries(INDEXED_CITY_PAGES).flatMap(([servizio, cities]) =>
    LOCATIONS.filter((l) => cities.has(l.slug)).map((l) => ({ servizio, citta: l.slug }))
  )
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
  const isIndexed = INDEXABLE_CITY_PAGES[servizio]?.has(citta) ?? false

  const title =
    servizio === 'rifacimento-tetto'
      ? `Rifacimento Tetto ${citta === 'san-dona-di-piave' ? '' : 'a '}${location.name} | Prezzi 2026 | Tetto94`
      : `${service.name} a ${location.name} | Preventivo Gratuito — Tetto94`
  const description = servizio === 'rifacimento-tetto'
    ? citySeoData?.metaDescription ?? `Rifacimento tetto a ${location.name} da 4.500 a 6.500€. Garanzia scritta 10 anni, materiali certificati CE, ispezione drone gratuita. Preventivo entro 24 ore. Tetto94 dal 1994.`
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
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
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
     this case in ServiceCityHero / ServiceCityBody. */
  const citySeoData = servizio === 'rifacimento-tetto' ? getCitySeoData(citta) : undefined
  /* Lightweight unique paragraph for coibentazione-tetto's indexed city pages
     (no full CitySeoData package for this service, per team decision). */
  const cityParagraph = servizio === 'coibentazione-tetto' ? getCoibentazioneCityParagraph(citta) : undefined
  const pageUrl = `https://www.tetto94.it/${service.slug}/${location.slug}`
  const google = await getGoogleReviews()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
      { '@type': 'ListItem', position: 2, name: service.name, item: `https://www.tetto94.it/${service.slug}` },
      { '@type': 'ListItem', position: 3, name: location.name, item: pageUrl },
    ],
  }

  /* Word for word the same questions the FaqSection renders on screen */
  const allFaqItems = [...service.faqItems, ...(citySeoData?.faqExtra ?? [])].map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }))

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqItems,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <ServiceCityHero service={service} location={location} />
        <ServiceTrustStrip google={google} />
        <ServiceCityBody
          service={service}
          location={location}
          google={google}
          citySeoData={citySeoData ?? undefined}
          cityParagraph={cityParagraph}
        />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
