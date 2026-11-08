export const SITE_URL = 'https://www.tetto94.it'

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'RoofingContractor'],
  '@id': `${SITE_URL}/#business`,
  name: 'Tetto94',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-white.png`,
  image: `${SITE_URL}/images/hero-roof-mobile.png`,
  telephone: '+393516519363',
  email: 'info@tetto94.it',
  foundingDate: '1994',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Benedetto Veruda',
    addressLocality: 'Venezia',
    postalCode: '30100',
    addressRegion: 'VE',
    addressCountry: 'IT',
  },
  areaServed: [
    { '@type': 'State', name: 'Veneto' },
    { '@type': 'State', name: 'Friuli-Venezia Giulia' },
    { '@type': 'State', name: 'Emilia-Romagna' },
  ],
} as const

export interface FaqSchemaItem {
  question: string
  answer: string
}

/** FAQPage built word for word from the questions visible on the page. */
export function faqPageSchema(items: FaqSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
