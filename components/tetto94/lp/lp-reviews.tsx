import Image from 'next/image'
import { ExternalLink, Star } from 'lucide-react'
import { LPStars } from '@/components/tetto94/lp/lp-parts'
import { WORKS } from '@/data/works-gallery'
import type { GoogleReviewsData } from '@/lib/google-reviews'

export type LPReview = {
  id: string
  name: string
  subtitle?: string
  photoUrl?: string
  authorUrl?: string
  rating: number
  text: string
}

export const FALLBACK_REVIEWS: LPReview[] = [
  {
    id: 'antonio-t',
    name: 'Antonio T.',
    subtitle: 'Recensione Google',
    rating: 5,
    text: 'Esperienza molto positiva. Il titolare è una persona seria e competente. Consiglia con professionalità ciò che è meglio per la situazione che si presenta. I suoi ragazzi lavorano bene. Lo consigliamo vivamente.',
  },
  {
    id: 'enis-r',
    name: 'Enis R.',
    subtitle: 'Recensione Google',
    rating: 5,
    text: 'Comunicazione eccellente durante tutto il processo e un risultato finale perfetto.',
  },
  {
    id: 'viron-h',
    name: 'Viron H.',
    subtitle: 'Recensione Google',
    rating: 5,
    text: 'Personale serio e onesto.',
  },
]

const PHOTO_OFFSETS: Record<string, number> = {
  lp_veneto: 0,
  lp_emilia: 6,
  lp_friuli: 12,
}

export function getLPPhotos(pageId: string, count = 6) {
  const start = PHOTO_OFFSETS[pageId] ?? 0
  return WORKS.slice(start, start + count)
}

export function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

export function formatRating(google: GoogleReviewsData | null) {
  return (google?.rating ?? 5).toFixed(1).replace('.', ',')
}

export function LPGoogleBadge({ google }: { google: GoogleReviewsData | null }) {
  const label = formatRating(google)
  const content = (
    <>
      <GoogleLogo className="size-6" />
      <span className="font-t94 text-[20px] font-bold leading-none text-t94-dark">{label}</span>
      <span className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-[18px] ${
              i < Math.round(google?.rating ?? 5) ? 'fill-t94-red text-t94-red' : 'fill-transparent text-t94-border'
            }`}
          />
        ))}
      </span>
      <span className="font-t94 text-[15px] text-t94-text-secondary">su Google</span>
    </>
  )
  const className =
    'inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-[14px] border border-t94-border bg-white px-5 py-3 transition-colors hover:border-t94-dark'

  if (google?.mapsUrl) {
    return (
      <a
        href={google.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Valutazione ${label} su 5 su Google`}
        className={className}
      >
        {content}
      </a>
    )
  }
  return (
    <div role="img" aria-label={`Valutazione ${label} su 5 su Google`} className={className}>
      {content}
    </div>
  )
}

export function LPReviewCards({ reviews }: { reviews: LPReview[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {reviews.map((review) => (
        <figure
          key={review.id}
          className="relative flex flex-col gap-4 rounded-[14px] border border-t94-border bg-white p-6 shadow-[0_16px_40px_-28px_rgba(27,27,27,0.3)]"
        >
          <GoogleLogo className="absolute right-5 top-5 size-5 opacity-80" />
          <LPStars value={review.rating} />
          <blockquote className="t94-body line-clamp-[8] text-t94-text">
            &ldquo;{review.text}&rdquo;
          </blockquote>
          <figcaption className="mt-auto flex items-center gap-3 border-t border-t94-border pt-4">
            {review.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={review.photoUrl}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="size-11 shrink-0 rounded-full bg-t94-grey object-cover"
              />
            ) : (
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-t94-dark font-t94 text-[18px] font-semibold text-white">
                {review.name[0]}
              </span>
            )}
            <span className="flex min-w-0 flex-col">
              {review.authorUrl ? (
                <a
                  href={review.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-t94 text-[16px] font-semibold text-t94-dark hover:underline"
                >
                  {review.name}
                </a>
              ) : (
                <span className="truncate font-t94 text-[16px] font-semibold text-t94-dark">{review.name}</span>
              )}
              {review.subtitle ? <span className="t94-small">{review.subtitle}</span> : null}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function LPPhotoStrip({ pageId }: { pageId: string }) {
  const photos = getLPPhotos(pageId)
  return (
    <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden">
      {photos.map((photo, i) => (
        <li
          key={photo.src}
          className="group relative aspect-[4/5] w-[62vw] max-w-[260px] shrink-0 snap-center overflow-hidden rounded-[14px] border border-t94-border bg-t94-grey md:w-auto md:max-w-none"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 62vw, (max-width: 1024px) 33vw, 190px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-t94-dark/35 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span className="absolute bottom-2.5 left-3 font-t94 text-[15px] font-semibold text-white tabular-nums">
            {String(i + 1).padStart(2, '0')}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function LPReadAllLink({ google }: { google: GoogleReviewsData | null }) {
  if (!google?.mapsUrl) return null
  return (
    <a
      href={google.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[48px] items-center gap-2 font-t94 text-[16px] font-semibold text-t94-dark underline-offset-4 hover:underline"
    >
      Leggi tutte le recensioni su Google
      <ExternalLink className="size-4" aria-hidden="true" />
    </a>
  )
}
