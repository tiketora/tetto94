// import { notFound } from 'next/navigation'
// import type { Metadata } from 'next'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
// import ServiceHero from '@/components/tetto94/service/service-hero'
// import ServiceBody, { ServiceTrustStrip } from '@/components/tetto94/service/service-body'
// import { getGoogleReviews } from '@/lib/google-reviews'
// import { SERVICES, getService } from '@/data/services'

// interface Props {
//   params: Promise<{ servizio: string }>
// }

// /* ── Static generation — build all 3 service pages at build time ── */
// export async function generateStaticParams() {
//   return SERVICES.map((s) => ({ servizio: s.slug }))
// }

// /* ── Metadata — fully dynamic per service ── */
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { servizio } = await params
//   const service = getService(servizio)
//   if (!service) return {}

//   const title = service.metaTitle
//   const description = service.metaDescription
//   const url = `https://www.tetto94.it/${service.slug}`

//   return {
//     title,
//     description,
//     keywords: [
//       service.name,
//       `${service.name} Venezia`,
//       `${service.name} Verona`,
//       `${service.name} Padova`,
//       `${service.name} Veneto`,
//       `${service.name} preventivo gratuito`,
//       `${service.name} garanzia`,
//       `${service.name} senza ponteggi`,
//       'Tetto94',
//       'artigiani tetto Veneto',
//     ],
//     alternates: { canonical: url },
//     openGraph: {
//       title,
//       description,
//       url,
//       siteName: 'Tetto94',
//       locale: 'it_IT',
//       type: 'website',
//       images: [{ url: `https://www.tetto94.it${service.ogImage ?? `/images/og/${service.slug}.png`}`, width: 1200, height: 630, alt: service.metaTitle }],
//     },
//     twitter: { card: 'summary_large_image', title, description },
//     robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
//   }
// }

// export default async function ServicePage({ params }: Props) {
//   const { servizio } = await params
//   const service = getService(servizio)
//   if (!service) notFound()

//   const google = await getGoogleReviews()

//   /* JSON-LD — Service block; the single LocalBusiness lives in the root layout */
//   const serviceSchema = {
//     '@type': 'Service',
//     '@id': `https://www.tetto94.it/${service.slug}#service`,
//     name: service.nameFull,
//     description: service.longDescription,
//     url: `https://www.tetto94.it/${service.slug}`,
//     provider: { '@id': 'https://www.tetto94.it/#business' },
//     areaServed: [
//       { '@type': 'AdministrativeArea', name: 'Veneto' },
//       { '@type': 'AdministrativeArea', name: 'Emilia-Romagna' },
//       { '@type': 'AdministrativeArea', name: 'Friuli-Venezia Giulia' },
//     ],
//     ...(service.priceFrom && {
//       hasOfferCatalog: {
//         '@type': 'OfferCatalog',
//         name: service.name,
//         itemListElement: [{
//           '@type': 'Offer',
//           priceCurrency: 'EUR',
//           priceSpecification: {
//             '@type': 'PriceSpecification',
//             minPrice: service.priceFrom.replace(/[^\d]/g, ''),
//             priceCurrency: 'EUR',
//           },
//         }],
//       },
//     }),
//   }

//   const graphSchema = {
//     '@context': 'https://schema.org',
//     '@graph': [serviceSchema],
//   }

//   const breadcrumbSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'BreadcrumbList',
//     itemListElement: [
//       { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
//       { '@type': 'ListItem', position: 2, name: service.name, item: `https://www.tetto94.it/${service.slug}` },
//     ],
//   }

//   const faqSchema = {
//     '@context': 'https://schema.org',
//     '@type': 'FAQPage',
//     mainEntity: service.faqItems.map((f) => ({
//       '@type': 'Question',
//       name: f.q,
//       acceptedAnswer: { '@type': 'Answer', text: f.a },
//     })),
//   }

//   return (
//     <>
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
//       <Navbar />
//       <main>
//         <ServiceHero service={service} />
//         <ServiceTrustStrip google={google} />
//         <ServiceBody service={service} google={google} />
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
import ServiceHero from '@/components/tetto94/service/service-hero'
import ServiceBody, { ServiceTrustStrip } from '@/components/tetto94/service/service-body'
import { getGoogleReviews } from '@/lib/google-reviews'
import { SERVICES, getService } from '@/data/services'

interface Props {
  params: Promise<{ servizio: string }>
}

/* ── Static generation — build all 3 service pages at build time ── */
export async function generateStaticParams() {
  return SERVICES.map((s) => ({ servizio: s.slug }))
}

/* ── Metadata — fully dynamic per service ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servizio } = await params
  const service = getService(servizio)
  if (!service) return {}

  const title = service.metaTitle
  const description = service.metaDescription
  const url = `https://www.tetto94.it/${service.slug}`

  return {
    title,
    description,
    keywords: [
      service.name,
      `${service.name} Venezia`,
      `${service.name} Verona`,
      `${service.name} Padova`,
      `${service.name} Veneto`,
      `${service.name} preventivo gratuito`,
      `${service.name} garanzia`,
      `${service.name} senza ponteggi`,
      'Tetto94',
      'artigiani tetto Veneto',
    ],
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Tetto94',
      locale: 'it_IT',
      type: 'website',
      images: [{ url: `https://www.tetto94.it${service.ogImage ?? `/images/og/${service.slug}.png`}`, width: 1200, height: 630, alt: service.metaTitle }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export default async function ServicePage({ params }: Props) {
  const { servizio } = await params
  const service = getService(servizio)
  if (!service) notFound()

  const google = await getGoogleReviews()

  /* JSON-LD — Service block; the single LocalBusiness lives in the root layout */
  const serviceSchema = {
    '@type': 'Service',
    '@id': `https://www.tetto94.it/${service.slug}#service`,
    name: service.nameFull,
    description: service.longDescription,
    url: `https://www.tetto94.it/${service.slug}`,
    provider: { '@id': 'https://www.tetto94.it/#business' },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Veneto' },
      { '@type': 'AdministrativeArea', name: 'Emilia-Romagna' },
      { '@type': 'AdministrativeArea', name: 'Friuli-Venezia Giulia' },
    ],
    ...(service.priceFrom && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: service.name,
        itemListElement: [{
          '@type': 'Offer',
          priceCurrency: 'EUR',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: (service.priceFrom.split('–')[0] ?? '').replace(/[^\d]/g, ''),
            ...(service.priceFrom.includes('–') && {
              maxPrice: (service.priceFrom.split('–')[1] ?? '').replace(/[^\d]/g, ''),
            }),
            priceCurrency: 'EUR',
          },
        }],
      },
    }),
  }

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [serviceSchema],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.tetto94.it' },
      { '@type': 'ListItem', position: 2, name: service.name, item: `https://www.tetto94.it/${service.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqItems.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main>
        <ServiceHero service={service} />
        <ServiceTrustStrip google={google} />
        <ServiceBody service={service} google={google} />
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  )
}
