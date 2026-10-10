export type GoogleReview = {
  id: string
  name: string
  photoUrl?: string
  authorUrl?: string
  rating: number
  text: string
  when?: string
}

export type GoogleReviewsData = {
  rating: number
  total: number
  mapsUrl?: string
  writeReviewUrl: string
  reviews: GoogleReview[]
}

type PlacesResponse = {
  rating?: number
  userRatingCount?: number
  googleMapsUri?: string
  reviews?: Array<{
    name?: string
    rating?: number
    relativePublishTimeDescription?: string
    publishTime?: string
    text?: { text?: string }
    originalText?: { text?: string }
    authorAttribution?: {
      displayName?: string
      uri?: string
      photoUri?: string
    }
  }>
}

const REVALIDATE_SECONDS = 60 * 60 * 24

// Derived from the Maps feature id 0xa4004d9b1fc0931d:0x374d9e31b089a52d of the
// "Tetto94" service-area profile, which has no public address to search for.
const DEFAULT_PLACE_ID = 'ChIJHZPAH5tNAKQRLaWJsDGeTTc'

/**
 * Fetches rating, total count and up to 5 reviews from Places API (New).
 * Returns null when not configured or on any failure so the page never breaks.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID || DEFAULT_PLACE_ID
  if (!apiKey || !placeId) return null

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=it`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'rating,userRatingCount,googleMapsUri,reviews',
        },
        next: { revalidate: REVALIDATE_SECONDS },
      },
    )
    if (!res.ok) return null

    const data = (await res.json()) as PlacesResponse
    if (typeof data.rating !== 'number' || !data.userRatingCount) return null

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((r, i) => ({
        id: r.name ?? `review-${i}`,
        name: r.authorAttribution?.displayName ?? 'Utente Google',
        photoUrl: r.authorAttribution?.photoUri,
        authorUrl: r.authorAttribution?.uri,
        rating: Math.round(r.rating ?? 5),
        text: (r.originalText?.text ?? r.text?.text ?? '').trim(),
        when: r.relativePublishTimeDescription,
        publishedAt: r.publishTime ? Date.parse(r.publishTime) || 0 : 0,
      }))
      .filter((r) => r.text.length > 0)
      .sort((a, b) => b.publishedAt - a.publishedAt)
      .map(({ publishedAt: _publishedAt, ...review }) => review)

    if (reviews.length === 0) return null

    return {
      rating: data.rating,
      total: data.userRatingCount,
      mapsUrl: data.googleMapsUri,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    }
  } catch {
    return null
  }
}
