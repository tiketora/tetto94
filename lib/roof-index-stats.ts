/**
 * "Tetti Analizzati" counter — no database, so growth is simulated
 * client-side: every time a visitor's browser completes the T94 Roof
 * Index quiz, we persist +1 to that browser's localStorage and broadcast
 * a custom event so any mounted counter on the page updates live.
 *
 * This is intentionally a per-browser tally on top of a fixed public
 * baseline, not a real cross-visitor aggregate — there is no backend to
 * count actual global completions without adding a database.
 */

const STORAGE_KEY = 't94-roof-index-analyses-completed'
export const BASE_ANALYZED_COUNT = 1247
export const ANALYSES_UPDATED_EVENT = 'roof-index:analyses-updated'

function readIncrement(): number {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(STORAGE_KEY)
  const parsed = Number(raw)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

/** Current displayed total (baseline + this browser's completed analyses). */
export function getAnalyzedCount(): number {
  return BASE_ANALYZED_COUNT + readIncrement()
}

/** Call once when a user reaches the final quiz step and gets a result. */
export function incrementAnalyzedCount(): number {
  if (typeof window === 'undefined') return BASE_ANALYZED_COUNT
  const next = readIncrement() + 1
  window.localStorage.setItem(STORAGE_KEY, String(next))
  const total = BASE_ANALYZED_COUNT + next
  window.dispatchEvent(new CustomEvent<number>(ANALYSES_UPDATED_EVENT, { detail: total }))
  return total
}
