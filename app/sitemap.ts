import type { MetadataRoute } from 'next'
import { SERVICES, getAllCombinations } from '@/data/services'
import { CITY_SEO_DATA } from '@/data/city-seo'

/**
 * Indexed priority cities for rifacimento-tetto.
 * Add slugs here when new cities have full SEO data ready.
 */
const INDEXED_CITIES_RIFACIMENTO = new Set(Object.keys(CITY_SEO_DATA))

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.tetto94.it'
  const now = new Date('2026-07-22')

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/contatti`,                lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/calcola-preventivo`,      lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${base}/privacy`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ]

  /* Service pages — 5 services: rifacimento, impermeabilizzazione, riparazione, infiltrazioni, pulizia-grondaie */
  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  /* Location pages — only the rifacimento-tetto city pages that are actually
     indexable (robots: index,follow in app/[servizio]/[citta]/page.tsx).
     Every other service+city combo renders (so internal links never 404)
     but is marked noindex,nofollow, so it must be excluded here — listing a
     noindex URL in the sitemap is an SEO anti-pattern flagged by Search
     Console. Extend INDEXED_CITIES_RIFACIMENTO as more cities go live. */
  const locationPages: MetadataRoute.Sitemap = getAllCombinations()
    .filter(({ servizio, citta }) => servizio === 'rifacimento-tetto' && INDEXED_CITIES_RIFACIMENTO.has(citta))
    .map(({ servizio, citta }) => ({
      url: `${base}/${servizio}/${citta}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    }))

  return [...staticPages, ...servicePages, ...locationPages]
}
