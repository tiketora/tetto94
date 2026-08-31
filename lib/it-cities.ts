// /**
//  * Lightweight offline geocoder for Italian provincial capitals.
//  *
//  * Why not a geocoding API: the quiz's "città" field is free text typed by a
//  * visitor on a marketing quiz, not an address form — calling an external
//  * geocoding API per submission would add latency, a new API key/integration,
//  * and a new failure mode to a fire-and-forget notification path. A static
//  * lookup of Italy's ~107 provincial capitals covers the overwhelming
//  * majority of real answers (people name their city, not a hamlet) with zero
//  * network calls and zero cost. Unmatched names are still stored as free
//  * text (so nothing is lost) but simply aren't plotted as a pin.
//  *
//  * Coordinates are approximate (city-center-ish) — fine for a marketing
//  * aggregate map, not intended for survey-grade precision.
//  */

// export interface CityCoords {
//   lat: number
//   lng: number
//   /** Canonical display name, properly capitalized. */
//   label: string
// }

// // Comuni capoluogo di provincia — one representative point per city.
// const ITALIAN_CITIES: Record<string, CityCoords> = {
//   torino: { lat: 45.0703, lng: 7.6869, label: 'Torino' },
//   aosta: { lat: 45.7372, lng: 7.315, label: 'Aosta' },
//   genova: { lat: 44.4056, lng: 8.9463, label: 'Genova' },
//   imperia: { lat: 43.8891, lng: 8.0327, label: 'Imperia' },
//   laspezia: { lat: 44.1024, lng: 9.8241, label: 'La Spezia' },
//   savona: { lat: 44.3096, lng: 8.4813, label: 'Savona' },
//   milano: { lat: 45.4642, lng: 9.19, label: 'Milano' },
//   bergamo: { lat: 45.6947, lng: 9.6696, label: 'Bergamo' },
//   brescia: { lat: 45.5416, lng: 10.2118, label: 'Brescia' },
//   como: { lat: 45.8081, lng: 9.0852, label: 'Como' },
//   cremona: { lat: 45.1327, lng: 10.0227, label: 'Cremona' },
//   lecco: { lat: 45.8566, lng: 9.3931, label: 'Lecco' },
//   lodi: { lat: 45.3141, lng: 9.5033, label: 'Lodi' },
//   mantova: { lat: 45.1564, lng: 10.7914, label: 'Mantova' },
//   monza: { lat: 45.5845, lng: 9.2744, label: 'Monza' },
//   pavia: { lat: 45.1847, lng: 9.1582, label: 'Pavia' },
//   sondrio: { lat: 46.1712, lng: 9.8721, label: 'Sondrio' },
//   varese: { lat: 45.8206, lng: 8.8251, label: 'Varese' },
//   venezia: { lat: 45.4408, lng: 12.3155, label: 'Venezia' },
//   chioggia: { lat: 45.2185, lng: 12.2794, label: 'Chioggia' },
//   jesolo: { lat: 45.5304, lng: 12.6423, label: 'Jesolo' },
//   belluno: { lat: 46.1391, lng: 12.2158, label: 'Belluno' },
//   padova: { lat: 45.4064, lng: 11.8768, label: 'Padova' },
//   rovigo: { lat: 45.0705, lng: 11.7905, label: 'Rovigo' },
//   treviso: { lat: 45.6669, lng: 12.2431, label: 'Treviso' },
//   verona: { lat: 45.4384, lng: 10.9916, label: 'Verona' },
//   vicenza: { lat: 45.5477, lng: 11.5458, label: 'Vicenza' },
//   trento: { lat: 46.0679, lng: 11.1211, label: 'Trento' },
//   bolzano: { lat: 46.4983, lng: 11.3548, label: 'Bolzano' },
//   udine: { lat: 46.0693, lng: 13.2346, label: 'Udine' },
//   gorizia: { lat: 45.9407, lng: 13.6208, label: 'Gorizia' },
//   pordenone: { lat: 45.9564, lng: 12.6558, label: 'Pordenone' },
//   trieste: { lat: 45.6495, lng: 13.7768, label: 'Trieste' },
//   bologna: { lat: 44.4949, lng: 11.3426, label: 'Bologna' },
//   ferrara: { lat: 44.8381, lng: 11.6198, label: 'Ferrara' },
//   forlì: { lat: 44.2226, lng: 12.0407, label: 'Forlì' },
//   modena: { lat: 44.6471, lng: 10.9252, label: 'Modena' },
//   parma: { lat: 44.8015, lng: 10.3279, label: 'Parma' },
//   piacenza: { lat: 45.0526, lng: 9.6929, label: 'Piacenza' },
//   ravenna: { lat: 44.4184, lng: 12.2035, label: 'Ravenna' },
//   reggioemilia: { lat: 44.6989, lng: 10.6297, label: "Reggio nell'Emilia" },
//   rimini: { lat: 44.0678, lng: 12.5695, label: 'Rimini' },
//   firenze: { lat: 43.7696, lng: 11.2558, label: 'Firenze' },
//   arezzo: { lat: 43.4633, lng: 11.8797, label: 'Arezzo' },
//   grosseto: { lat: 42.7603, lng: 11.1136, label: 'Grosseto' },
//   livorno: { lat: 43.5485, lng: 10.3106, label: 'Livorno' },
//   lucca: { lat: 43.8429, lng: 10.5027, label: 'Lucca' },
//   massa: { lat: 44.0357, lng: 10.1409, label: 'Massa' },
//   pisa: { lat: 43.7228, lng: 10.4017, label: 'Pisa' },
//   pistoia: { lat: 43.9334, lng: 10.9177, label: 'Pistoia' },
//   prato: { lat: 43.8777, lng: 11.1023, label: 'Prato' },
//   siena: { lat: 43.3188, lng: 11.3308, label: 'Siena' },
//   perugia: { lat: 43.1122, lng: 12.3888, label: 'Perugia' },
//   terni: { lat: 42.5636, lng: 12.6427, label: 'Terni' },
//   ancona: { lat: 43.6158, lng: 13.5189, label: 'Ancona' },
//   ascolipiceno: { lat: 42.8536, lng: 13.5754, label: 'Ascoli Piceno' },
//   fermo: { lat: 43.1596, lng: 13.7166, label: 'Fermo' },
//   macerata: { lat: 43.3006, lng: 13.4531, label: 'Macerata' },
//   pesaro: { lat: 43.9102, lng: 12.9133, label: 'Pesaro' },
//   roma: { lat: 41.9028, lng: 12.4964, label: 'Roma' },
//   frosinone: { lat: 41.64, lng: 13.3506, label: 'Frosinone' },
//   latina: { lat: 41.4677, lng: 12.9037, label: 'Latina' },
//   rieti: { lat: 42.4009, lng: 12.8621, label: 'Rieti' },
//   viterbo: { lat: 42.4207, lng: 12.1069, label: 'Viterbo' },
//   laquila: { lat: 42.3498, lng: 13.3995, label: "L'Aquila" },
//   chieti: { lat: 42.351, lng: 14.1678, label: 'Chieti' },
//   pescara: { lat: 42.4643, lng: 14.2142, label: 'Pescara' },
//   teramo: { lat: 42.6589, lng: 13.7042, label: 'Teramo' },
//   campobasso: { lat: 41.5602, lng: 14.6626, label: 'Campobasso' },
//   isernia: { lat: 41.5967, lng: 14.2298, label: 'Isernia' },
//   napoli: { lat: 40.8518, lng: 14.2681, label: 'Napoli' },
//   avellino: { lat: 40.9146, lng: 14.7906, label: 'Avellino' },
//   benevento: { lat: 41.1298, lng: 14.7826, label: 'Benevento' },
//   caserta: { lat: 41.0722, lng: 14.3323, label: 'Caserta' },
//   salerno: { lat: 40.6824, lng: 14.7681, label: 'Salerno' },
//   bari: { lat: 41.1171, lng: 16.8719, label: 'Bari' },
//   barletta: { lat: 41.3181, lng: 16.2811, label: 'Barletta' },
//   brindisi: { lat: 40.6327, lng: 17.9366, label: 'Brindisi' },
//   foggia: { lat: 41.4622, lng: 15.5446, label: 'Foggia' },
//   lecce: { lat: 40.3519, lng: 18.1720, label: 'Lecce' },
//   taranto: { lat: 40.4644, lng: 17.2470, label: 'Taranto' },
//   potenza: { lat: 40.6404, lng: 15.8054, label: 'Potenza' },
//   matera: { lat: 40.6664, lng: 16.6043, label: 'Matera' },
//   catanzaro: { lat: 38.9098, lng: 16.5877, label: 'Catanzaro' },
//   cosenza: { lat: 39.2989, lng: 16.2539, label: 'Cosenza' },
//   crotone: { lat: 39.0808, lng: 17.1269, label: 'Crotone' },
//   reggiocalabria: { lat: 38.1097, lng: 15.6482, label: 'Reggio Calabria' },
//   vibovalentia: { lat: 38.6753, lng: 16.1039, label: 'Vibo Valentia' },
//   palermo: { lat: 38.1157, lng: 13.3615, label: 'Palermo' },
//   agrigento: { lat: 37.3111, lng: 13.5765, label: 'Agrigento' },
//   caltanissetta: { lat: 37.4903, lng: 14.0623, label: 'Caltanissetta' },
//   catania: { lat: 37.5079, lng: 15.083, label: 'Catania' },
//   enna: { lat: 37.5674, lng: 14.2814, label: 'Enna' },
//   messina: { lat: 38.1938, lng: 15.5540, label: 'Messina' },
//   ragusa: { lat: 36.9269, lng: 14.7255, label: 'Ragusa' },
//   siracusa: { lat: 37.0755, lng: 15.2866, label: 'Siracusa' },
//   trapani: { lat: 38.0176, lng: 12.5365, label: 'Trapani' },
//   cagliari: { lat: 39.2238, lng: 9.1217, label: 'Cagliari' },
//   nuoro: { lat: 40.3211, lng: 9.3306, label: 'Nuoro' },
//   oristano: { lat: 39.9033, lng: 8.5919, label: 'Oristano' },
//   sassari: { lat: 40.7259, lng: 8.5557, label: 'Sassari' },
// }

// /** Strip accents/diacritics and non-letters, lowercase, for lookup keys. */
// function normalize(input: string): string {
//   return input
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .toLowerCase()
//     .replace(/[^a-z]/g, '')
// }

// /**
//  * Resolves a free-text città input to approximate coordinates, if it
//  * matches (or contains) a known provincial capital. Returns null for
//  * unrecognized input — the raw text is still stored, just not plotted.
//  */
// export function geocodeItalianCity(input: string | undefined | null): CityCoords | null {
//   if (!input) return null
//   const key = normalize(input)
//   if (!key) return null
//   if (ITALIAN_CITIES[key]) return ITALIAN_CITIES[key]
//   // Fall back to a substring match (e.g. "Padova (PD)" or "Roma centro").
//   const match = Object.keys(ITALIAN_CITIES).find((city) => key.includes(city))
//   return match ? ITALIAN_CITIES[match] : null
// }


// /**
//  * Offline geocoder covering every Italian comune (100% coverage), using a
//  * two-level resolution:
//  *
//  *   1. Free text -> comune (exact match against all 7,896 comuni names, or
//  *      a 5-digit CAP if the visitor typed a postal code instead of/with a
//  *      city name).
//  *   2. comune -> province -> province capital coordinates (lib/it-provinces.ts).
//  *
//  * Why not a geocoding API: the quiz's "città" field is free text typed by a
//  * visitor on a marketing quiz, not an address form — calling an external
//  * geocoding API per submission would add latency, a new API key/integration,
//  * and a new failure mode to a fire-and-forget notification path. This static
//  * two-table lookup gets every real Italian comune (not just the ~100
//  * largest cities) with zero network calls and zero cost.
//  *
//  * Plotting at the province capital (rather than the comune's own
//  * coordinates, which this dataset doesn't include) is a deliberate
//  * trade-off: it's coarser, but it's also more private — a single visitor
//  * from a small hamlet is never pinpointed on the public map, only their
//  * province-level area. The original comune name is still stored as the
//  * display label for the "Città a Rischio" list.
//  *
//  * Unmatched input (e.g. a typo, or a non-Italian city) is still stored as
//  * free text — nothing is lost — but simply isn't plotted as a pin.
//  */

// import { CAP_TO_PROVINCE, COMUNE_TO_PROVINCE } from '@/lib/it-comuni-data'
// import { PROVINCE_CAPITALS } from '@/lib/it-provinces'

// export interface CityCoords {
//   lat: number
//   lng: number
//   /** Display label — the comune name as typed/matched, not the province capital. */
//   label: string
// }

// /** Strip accents/diacritics and non-letters, lowercase, for lookup keys. */
// function normalize(input: string): string {
//   return input
//     .normalize('NFD')
//     .replace(/[\u0300-\u036f]/g, '')
//     .toLowerCase()
//     .replace(/[^a-z]/g, '')
// }

// /** Extracts the first standalone 5-digit sequence, e.g. from "Venezia, 30100". */
// function extractCap(input: string): string | null {
//   const match = input.match(/\b\d{5}\b/)
//   return match ? match[0] : null
// }

// /** Title-cases a normalized/raw comune name for display (best-effort). */
// function toDisplayLabel(input: string): string {
//   const trimmed = input.replace(/\d/g, '').trim()
//   return trimmed
//     .split(/\s+/)
//     .filter(Boolean)
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(' ')
// }

// /**
//  * Resolves a CAP to a province. Tries the exact 5-digit code first; if the
//  * dataset doesn't have that exact code (postal codes get subdivided over
//  * time — e.g. old "30100" Venezia has since split into "30121"–"30176"),
//  * falls back to the first 3 digits, which in the Italian CAP system always
//  * map to a single province.
//  */
// function resolveCapToSigla(cap: string): string | undefined {
//   if (CAP_TO_PROVINCE[cap]) return CAP_TO_PROVINCE[cap]
//   const prefix3 = cap.slice(0, 3)
//   const prefixMatch = Object.keys(CAP_TO_PROVINCE).find((k) => k.startsWith(prefix3))
//   return prefixMatch ? CAP_TO_PROVINCE[prefixMatch] : undefined
// }

// /**
//  * Finds the most specific (longest) comune name that appears in `key`.
//  * Using the longest match — rather than the first one found — avoids short
//  * comune names (e.g. "roma", "asti") incorrectly matching as a substring of
//  * an unrelated longer input, such as "Via Roma, Sesto San Giovanni".
//  */
// function findBestComuneMatch(key: string): string | undefined {
//   let best: string | undefined
//   for (const comune in COMUNE_TO_PROVINCE) {
//     if (key.includes(comune) && (!best || comune.length > best.length)) {
//       best = comune
//     }
//   }
//   return best
// }

// /**
//  * Resolves free-text città input (a comune name, a CAP, or both mixed
//  * together) to a province and its representative coordinates. Returns
//  * null only when nothing in the input matches any of Italy's 7,896
//  * comuni or postal codes.
//  */
// export function geocodeItalianCity(input: string | undefined | null): CityCoords | null {
//   if (!input) return null

//   // 1. Try the comune name first — exact match, then longest-substring
//   // fallback (e.g. "Padova (PD)" or "Via Roma, Sesto San Giovanni"). Name
//   // match takes priority over CAP because it's what carries the display
//   // label; CAP is only a fallback signal when no name matches.
//   const key = normalize(input)
//   const exactComune = key && COMUNE_TO_PROVINCE[key] ? key : undefined
//   const bestComune = exactComune ?? (key ? findBestComuneMatch(key) : undefined)
//   const siglaFromName = bestComune ? COMUNE_TO_PROVINCE[bestComune] : undefined

//   // 2. Fall back to a CAP in the text if no comune name matched (e.g. a
//   // visitor who only typed their postal code).
//   const cap = extractCap(input)
//   const siglaFromCap = !siglaFromName && cap ? resolveCapToSigla(cap) : undefined

//   const sigla = siglaFromName ?? siglaFromCap
//   if (!sigla) return null

//   const province = PROVINCE_CAPITALS[sigla]
//   if (!province) return null

//   const label = siglaFromName ? toDisplayLabel(input) || province.label : province.label

//   return { lat: province.lat, lng: province.lng, label }
// }


/**
 * Offline geocoder covering every Italian comune (100% coverage), using a
 * two-level resolution:
 *
 *   1. Free text -> comune (exact match against all 7,896 comuni names, or
 *      a 5-digit CAP if the visitor typed a postal code instead of/with a
 *      city name).
 *   2. comune -> province -> province capital coordinates (lib/it-provinces.ts).
 *
 * Why not a geocoding API: the quiz's "città" field is free text typed by a
 * visitor on a marketing quiz, not an address form — calling an external
 * geocoding API per submission would add latency, a new API key/integration,
 * and a new failure mode to a fire-and-forget notification path. This static
 * two-table lookup gets every real Italian comune (not just the ~100
 * largest cities) with zero network calls and zero cost.
 *
 * Plotting at the province capital (rather than the comune's own
 * coordinates, which this dataset doesn't include) is a deliberate
 * trade-off: it's coarser, but it's also more private — a single visitor
 * from a small hamlet is never pinpointed on the public map, only their
 * province-level area. The original comune name is still stored as the
 * display label for the "Città a Rischio" list.
 *
 * Unmatched input (e.g. a typo, or a non-Italian city) is still stored as
 * free text — nothing is lost — but simply isn't plotted as a pin.
 */

import { CAP_TO_PROVINCE, COMUNE_TO_PROVINCE } from '@/lib/it-comuni-data'
import { PROVINCE_CAPITALS } from '@/lib/it-provinces'

export interface CityCoords {
  lat: number
  lng: number
  /** Display label — the comune name as typed/matched, not the province capital. */
  label: string
}

/**
 * Well-known Italian localities that visitors commonly type as if they were
 * a city, but that aren't an independent comune in the ISTAT dataset — most
 * often because they were absorbed into a larger comune decades ago (e.g.
 * Mestre and Marghera have been part of the comune of Venezia since 1926).
 * Checked as exact matches before the general comune lookup, since no
 * substring/name heuristic could ever derive these from the comuni list.
 *
 * Keep this list short and curated — it exists only for localities common
 * enough that visitors would realistically type them instead of the parent
 * comune name.
 */
const FRAZIONI_OVERRIDES: Record<string, { sigla: string; label: string }> = {
  mestre: { sigla: 'VE', label: 'Mestre' },
  marghera: { sigla: 'VE', label: 'Marghera' },
}

/**
 * Comune names this short are common substrings of unrelated words (e.g.
 * the comune "Re" is a substring of "mestre", "Bra" of "abbracciare"), so
 * they're excluded from substring matching — only an exact match on one of
 * these short names is trusted. Longer names are specific enough that a
 * substring match is safe.
 */
const MIN_SUBSTRING_MATCH_LENGTH = 4

/** Strip accents/diacritics and non-letters, lowercase, for lookup keys. */
function normalize(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
}

/** Extracts the first standalone 5-digit sequence, e.g. from "Venezia, 30100". */
function extractCap(input: string): string | null {
  const match = input.match(/\b\d{5}\b/)
  return match ? match[0] : null
}

/** Title-cases a normalized/raw comune name for display (best-effort). */
function toDisplayLabel(input: string): string {
  const trimmed = input.replace(/\d/g, '').trim()
  return trimmed
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Resolves a CAP to a province. Tries the exact 5-digit code first; if the
 * dataset doesn't have that exact code (postal codes get subdivided over
 * time — e.g. old "30100" Venezia has since split into "30121"–"30176"),
 * falls back to the first 3 digits, which in the Italian CAP system always
 * map to a single province.
 */
function resolveCapToSigla(cap: string): string | undefined {
  if (CAP_TO_PROVINCE[cap]) return CAP_TO_PROVINCE[cap]
  const prefix3 = cap.slice(0, 3)
  const prefixMatch = Object.keys(CAP_TO_PROVINCE).find((k) => k.startsWith(prefix3))
  return prefixMatch ? CAP_TO_PROVINCE[prefixMatch] : undefined
}

/**
 * Finds the most specific (longest) comune name that appears in `key`.
 * Using the longest match — rather than the first one found — avoids short
 * comune names (e.g. "roma", "asti") incorrectly matching as a substring of
 * an unrelated longer input, such as "Via Roma, Sesto San Giovanni". Names
 * shorter than MIN_SUBSTRING_MATCH_LENGTH are skipped entirely — at that
 * length they're too likely to appear inside an unrelated word (e.g. the
 * comune "Re" inside "mestre") to trust as a substring match.
 */
function findBestComuneMatch(key: string): string | undefined {
  let best: string | undefined
  for (const comune in COMUNE_TO_PROVINCE) {
    if (
      comune.length >= MIN_SUBSTRING_MATCH_LENGTH &&
      key.includes(comune) &&
      (!best || comune.length > best.length)
    ) {
      best = comune
    }
  }
  return best
}

/**
 * Resolves free-text città input (a comune name, a CAP, or both mixed
 * together) to a province and its representative coordinates. Returns
 * null only when nothing in the input matches any of Italy's 7,896
 * comuni or postal codes.
 */
export function geocodeItalianCity(input: string | undefined | null): CityCoords | null {
  if (!input) return null

  const key = normalize(input)
  if (!key) return null

  // 1. Check known frazioni/localities that aren't independent comuni
  // (e.g. Mestre) before anything else — these can only ever be an exact
  // match, since they're not derivable from the comuni list at all.
  const override = FRAZIONI_OVERRIDES[key]
  if (override) {
    return { lat: PROVINCE_CAPITALS[override.sigla].lat, lng: PROVINCE_CAPITALS[override.sigla].lng, label: override.label }
  }

  // 2. Try the comune name — exact match, then longest-substring fallback
  // (e.g. "Padova (PD)" or "Via Roma, Sesto San Giovanni"). Name match
  // takes priority over CAP because it's what carries the display label;
  // CAP is only a fallback signal when no name matches.
  const exactComune = COMUNE_TO_PROVINCE[key] ? key : undefined
  const bestComune = exactComune ?? findBestComuneMatch(key)
  const siglaFromName = bestComune ? COMUNE_TO_PROVINCE[bestComune] : undefined

  // 3. Fall back to a CAP in the text if no comune name matched (e.g. a
  // visitor who only typed their postal code).
  const cap = extractCap(input)
  const siglaFromCap = !siglaFromName && cap ? resolveCapToSigla(cap) : undefined

  const sigla = siglaFromName ?? siglaFromCap
  if (!sigla) return null

  const province = PROVINCE_CAPITALS[sigla]
  if (!province) return null

  const label = siglaFromName ? toDisplayLabel(input) || province.label : province.label

  return { lat: province.lat, lng: province.lng, label }
}
