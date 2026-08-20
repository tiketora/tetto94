export interface LandingPageConfig {
  slug: string
  pageId: string                   // GA4/Ads attribution key e.g. 'lp_veneto'
  region: string                   // "Veneto" — used in H1, meta, body copy
  regionShort: string              // "Veneto" — for breadcrumb/footer
  h1: string                       // Exact H1 from brief
  subheadline: string              // One sentence USP reinforcement
  metaTitle: string
  metaDescription: string
  url: string                      // Canonical — noindex so no SEO risk
}

export const LANDING_PAGES: LandingPageConfig[] = [
  {
    slug: 'rifacimento-tetto-veneto',
    pageId: 'lp_veneto',
    region: 'Veneto',
    regionShort: 'Veneto',
    h1: 'Rifacimento tetto in Veneto? Interveniamo senza ponteggi.',
    subheadline: 'Sopralluogo gratuito con drone incluso. Preventivo entro 24 ore. Garanzia scritta 10 anni.',
    metaTitle: 'Rifacimento Tetto Veneto — Tetto94 | Senza Ponteggi',
    metaDescription: 'Rifacimento tetto in Veneto senza ponteggi. Ispezione drone gratuita, preventivo in 24h, garanzia scritta 10 anni. 32+ anni di esperienza. Richiedi ora.',
    url: 'https://www.tetto94.it/rifacimento-tetto-veneto',
  },
  {
    slug: 'rifacimento-tetto-emilia-romagna',
    pageId: 'lp_emilia',
    region: 'Emilia-Romagna',
    regionShort: 'Emilia-Romagna',
    h1: "Rifacimento tetto in Emilia-Romagna? Interveniamo senza ponteggi.",
    subheadline: 'Sopralluogo gratuito con drone incluso. Preventivo entro 24 ore. Garanzia scritta 10 anni.',
    metaTitle: 'Rifacimento Tetto Emilia-Romagna — Tetto94 | Senza Ponteggi',
    metaDescription: "Rifacimento tetto in Emilia-Romagna senza ponteggi. Ispezione drone gratuita, preventivo in 24h, garanzia scritta 10 anni. Richiedi ora.",
    url: 'https://www.tetto94.it/rifacimento-tetto-emilia-romagna',
  },
  {
    slug: 'rifacimento-tetto-friuli',
    pageId: 'lp_friuli',
    region: 'Friuli',
    regionShort: 'Friuli-Venezia Giulia',
    h1: 'Rifacimento tetto in Friuli? Interveniamo senza ponteggi.',
    subheadline: 'Sopralluogo gratuito con drone incluso. Preventivo entro 24 ore. Garanzia scritta 10 anni.',
    metaTitle: 'Rifacimento Tetto Friuli — Tetto94 | Senza Ponteggi',
    metaDescription: 'Rifacimento tetto in Friuli-Venezia Giulia senza ponteggi. Ispezione drone gratuita, preventivo in 24h, garanzia scritta 10 anni. Richiedi ora.',
    url: 'https://www.tetto94.it/rifacimento-tetto-friuli',
  },
]

export function getLandingPage(slug: string): LandingPageConfig | undefined {
  return LANDING_PAGES.find((lp) => lp.slug === slug)
}
