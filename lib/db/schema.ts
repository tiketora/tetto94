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


import { bigserial, doublePrecision, index, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

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
