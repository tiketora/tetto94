// import { bigserial, doublePrecision, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// /**
//  * Anonymized record of one completed T94 Roof Index™ analysis, used only to
//  * power the public "Mappa del Rischio" aggregate map. Deliberately contains
//  * NO personal data (no name/email/phone/IP) — only the quiz answers, the
//  * computed score, and a coarse location (città/CAP, not a street address).
//  * Contact details live entirely in the separate lead-capture flow at
//  * /contatti and are never joined to this table.
//  */
// export const roofAnalyses = pgTable(
//   'roof_analyses',
//   {
//     id: bigserial('id', { mode: 'number' }).primaryKey(),
//     zona: text('zona').notNull(),
//     citta: text('citta'),
//     cap: text('cap'),
//     lat: doublePrecision('lat'),
//     lng: doublePrecision('lng'),
//     superficie: integer('superficie').notNull(),
//     fasciaEta: text('fascia_eta').notNull(),
//     problema: text('problema').notNull(),
//     durata: text('durata').notNull(),
//     materiale: text('materiale').notNull(),
//     ultimoIntervento: text('ultimo_intervento').notNull(),
//     score: integer('score').notNull(),
//     band: text('band').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [index('idx_roof_analyses_citta').on(table.citta), index('idx_roof_analyses_created_at').on(table.createdAt)],
// )


// import { bigserial, doublePrecision, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

// /**
//  * Anonymized record of one completed T94 Roof Index™ analysis, used only to
//  * power the public "Mappa del Rischio" aggregate map. Deliberately contains
//  * NO personal data (no name/email/phone/IP) — only the quiz answers, the
//  * computed score, and a coarse location (città/CAP, not a street address).
//  * Contact details live entirely in the separate lead-capture flow at
//  * /contatti and are never joined to this table.
//  */
// export const roofAnalyses = pgTable(
//   'roof_analyses',
//   {
//     id: bigserial('id', { mode: 'number' }).primaryKey(),
//     zona: text('zona').notNull(),
//     citta: text('citta'),
//     cap: text('cap'),
//     lat: doublePrecision('lat'),
//     lng: doublePrecision('lng'),
//     superficie: integer('superficie').notNull(),
//     fasciaEta: text('fascia_eta').notNull(),
//     problema: text('problema').notNull(),
//     durata: text('durata').notNull(),
//     materiale: text('materiale').notNull(),
//     ultimoIntervento: text('ultimo_intervento').notNull(),
//     score: integer('score').notNull(),
//     band: text('band').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [index('idx_roof_analyses_citta').on(table.citta), index('idx_roof_analyses_created_at').on(table.createdAt)],
// )

// /**
//  * Contact lead captured when a visitor "unlocks" their best-price offer on
//  * the T94 Roof Index™ result by submitting a phone number. Deliberately a
//  * separate table from roof_analyses: that one stays anonymized (no PII) to
//  * back the public Mappa del Rischio, while this one exists specifically to
//  * hold a phone number and is never joined back to the public map data.
//  */
// export const roofIndexLeads = pgTable(
//   'roof_index_leads',
//   {
//     id: bigserial('id', { mode: 'number' }).primaryKey(),
//     telefono: text('telefono').notNull(),
//     citta: text('citta'),
//     zona: text('zona').notNull(),
//     superficie: integer('superficie').notNull(),
//     fasciaEta: text('fascia_eta').notNull(),
//     problema: text('problema').notNull(),
//     durata: text('durata').notNull(),
//     materiale: text('materiale').notNull(),
//     ultimoIntervento: text('ultimo_intervento').notNull(),
//     score: integer('score').notNull(),
//     band: text('band').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [index('idx_roof_index_leads_created_at').on(table.createdAt)],
// )


// import { bigserial, doublePrecision, index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

// /**
//  * Anonymized record of one completed T94 Roof Index™ analysis, used only to
//  * power the public "Mappa del Rischio" aggregate map. Deliberately contains
//  * NO personal data (no name/email/phone/IP) — only the quiz answers, the
//  * computed score, and a coarse location (città/CAP, not a street address).
//  * Contact details live entirely in the separate lead-capture flow at
//  * /contatti and are never joined to this table.
//  */
// export const roofAnalyses = pgTable(
//   'roof_analyses',
//   {
//     id: bigserial('id', { mode: 'number' }).primaryKey(),
//     zona: text('zona').notNull(),
//     citta: text('citta'),
//     cap: text('cap'),
//     lat: doublePrecision('lat'),
//     lng: doublePrecision('lng'),
//     superficie: integer('superficie').notNull(),
//     fasciaEta: text('fascia_eta').notNull(),
//     problema: text('problema').notNull(),
//     durata: text('durata').notNull(),
//     materiale: text('materiale').notNull(),
//     ultimoIntervento: text('ultimo_intervento').notNull(),
//     score: integer('score').notNull(),
//     band: text('band').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [index('idx_roof_analyses_citta').on(table.citta), index('idx_roof_analyses_created_at').on(table.createdAt)],
// )

// /**
//  * Contact lead captured when a visitor "unlocks" their best-price offer on
//  * the T94 Roof Index™ result by submitting a phone number. Deliberately a
//  * separate table from roof_analyses: that one stays anonymized (no PII) to
//  * back the public Mappa del Rischio, while this one exists specifically to
//  * hold a phone number and is never joined back to the public map data.
//  */
// export const roofIndexLeads = pgTable(
//   'roof_index_leads',
//   {
//     id: bigserial('id', { mode: 'number' }).primaryKey(),
//     telefono: text('telefono').notNull(),
//     citta: text('citta'),
//     zona: text('zona').notNull(),
//     superficie: integer('superficie').notNull(),
//     fasciaEta: text('fascia_eta').notNull(),
//     problema: text('problema').notNull(),
//     durata: text('durata').notNull(),
//     materiale: text('materiale').notNull(),
//     ultimoIntervento: text('ultimo_intervento').notNull(),
//     score: integer('score').notNull(),
//     band: text('band').notNull(),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [index('idx_roof_index_leads_created_at').on(table.createdAt)],
// )

// /**
//  * Tetto94 blog posts, managed exclusively through the hidden /admin panel
//  * (single static admin account — no third-party auth vendor). Content is
//  * authored as sanitized HTML (Tiptap output, allowlist-sanitized server
//  * side before every save) so stored XSS can never reach the public
//  * /blog/[slug] pages. Only `status = 'published'` rows are ever surfaced
//  * on public routes, the sitemap, or the RSS feed.
//  */
// export const blogPosts = pgTable(
//   'blog_posts',
//   {
//     id: uuid('id').primaryKey().defaultRandom(),
//     slug: text('slug').notNull(),
//     title: text('title').notNull(),
//     excerpt: text('excerpt'),
//     contentHtml: text('content_html').notNull(),
//     coverImageUrl: text('cover_image_url'),
//     coverImageAlt: text('cover_image_alt'),
//     status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
//     seoTitle: text('seo_title'),
//     seoDescription: text('seo_description'),
//     publishedAt: timestamp('published_at', { withTimezone: true }),
//     createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
//     updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
//   },
//   (table) => [
//     uniqueIndex('idx_blog_posts_slug').on(table.slug),
//     index('idx_blog_posts_status_published_at').on(table.status, table.publishedAt),
//   ],
// )


import { sql } from 'drizzle-orm'
import { bigserial, boolean, doublePrecision, index, integer, jsonb, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

/**
 * Anonymized record of one completed T94 Roof Index™ analysis, used only to
 * power the public "Mappa del Rischio" aggregate map. Deliberately contains
 * NO personal data (no name/email/phone/IP) — only the quiz answers, the
 * computed score, and a coarse location (città/CAP, not a street address).
 * Contact details live entirely in the separate lead-capture flow at
 * /contatti and are never joined to this table.
 */
export const roofAnalyses = pgTable(
  'roof_analyses',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    zona: text('zona').notNull(),
    citta: text('citta'),
    cap: text('cap'),
    lat: doublePrecision('lat'),
    lng: doublePrecision('lng'),
    superficie: integer('superficie').notNull(),
    fasciaEta: text('fascia_eta').notNull(),
    problema: text('problema').notNull(),
    durata: text('durata').notNull(),
    materiale: text('materiale').notNull(),
    ultimoIntervento: text('ultimo_intervento').notNull(),
    score: integer('score').notNull(),
    band: text('band').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('idx_roof_analyses_citta').on(table.citta), index('idx_roof_analyses_created_at').on(table.createdAt)],
)

/**
 * Contact lead captured when a visitor "unlocks" their best-price offer on
 * the T94 Roof Index™ result by submitting a phone number. Deliberately a
 * separate table from roof_analyses: that one stays anonymized (no PII) to
 * back the public Mappa del Rischio, while this one exists specifically to
 * hold a phone number and is never joined back to the public map data.
 */
export const roofIndexLeads = pgTable(
  'roof_index_leads',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    telefono: text('telefono').notNull(),
    citta: text('citta'),
    zona: text('zona').notNull(),
    superficie: integer('superficie').notNull(),
    fasciaEta: text('fascia_eta').notNull(),
    problema: text('problema').notNull(),
    durata: text('durata').notNull(),
    materiale: text('materiale').notNull(),
    ultimoIntervento: text('ultimo_intervento').notNull(),
    score: integer('score').notNull(),
    band: text('band').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('idx_roof_index_leads_created_at').on(table.createdAt)],
)

/**
 * Tetto94 blog posts, managed exclusively through the hidden /admin panel
 * (single static admin account — no third-party auth vendor). Content is
 * authored as sanitized HTML (Tiptap output, allowlist-sanitized server
 * side before every save) so stored XSS can never reach the public
 * /blog/[slug] pages. Only `status = 'published'` rows are ever surfaced
 * on public routes, the sitemap, or the RSS feed.
 */
export const blogPosts = pgTable(
  'blog_posts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    excerpt: text('excerpt'),
    contentHtml: text('content_html').notNull(),
    coverImageUrl: text('cover_image_url'),
    coverImageAlt: text('cover_image_alt'),
    status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
    /** Topical clustering + internal linking: powers /blog/tag/[tag] archive pages. */
    tags: text('tags').array().notNull().default(sql`ARRAY[]::text[]`),
    /** E-E-A-T signal: surfaced as the Article schema author + on-page byline. */
    authorName: text('author_name').notNull().default('Team Tetto94'),
    /** Lets the admin keep a post live but excluded from search indexing. */
    noindex: boolean('noindex').notNull().default(false),
    /** Optional Q&A pairs rendered as an on-page accordion + FAQPage schema for rich snippets. */
    faqItems: jsonb('faq_items').$type<{ question: string; answer: string }[]>().notNull().default(sql`'[]'::jsonb`),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex('idx_blog_posts_slug').on(table.slug),
    index('idx_blog_posts_status_published_at').on(table.status, table.publishedAt),
  ],
)
