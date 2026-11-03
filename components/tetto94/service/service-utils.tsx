import type { GoogleReviewsData } from '@/lib/google-reviews'
import { FALLBACK_REVIEWS, type LPReview } from '@/components/tetto94/lp/lp-reviews'

export const PHONE_TEL = 'tel:+393516519363'
export const PHONE_LABEL = '351 651 9363'

/** Service slug -> option value of the shared lead-form dropdown (lib/form-options). */
export const FORM_SERVICE: Record<string, string> = {
  'rifacimento-tetto': 'Rifacimento completo',
  'impermeabilizzazione-tetto': 'Impermeabilizzazione',
  'riparazione-tetto': 'Riparazione tegole',
  'infiltrazioni-tetto': 'Stop infiltrazioni',
  'coibentazione-tetto': 'Isolamento termico',
  'pulizia-grondaie': 'Pulizia grondaie',
}

/** The data layer stores headings in capitals; the redesign uses sentence case. */
export function sentence(value: string) {
  const lower = value.toLocaleLowerCase('it-IT')
  return lower.charAt(0).toLocaleUpperCase('it-IT') + lower.slice(1)
}

export function toReviews(google: GoogleReviewsData | null): LPReview[] {
  if (!google) return FALLBACK_REVIEWS
  return google.reviews.slice(0, 3).map((r) => ({
    id: r.id,
    name: r.name,
    subtitle: r.when,
    photoUrl: r.photoUrl,
    authorUrl: r.authorUrl,
    rating: r.rating,
    text: r.text,
  }))
}
