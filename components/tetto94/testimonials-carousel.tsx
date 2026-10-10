'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Star } from 'lucide-react'

export type CarouselReview = {
  id: string
  name: string
  subtitle?: string
  photoUrl?: string
  authorUrl?: string
  rating: number
  text: string
}

export type GoogleSummary = {
  rating: number
  total: number
  mapsUrl?: string
  writeReviewUrl: string
}

function GoogleLogo({ className }: { className?: string }) {
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

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className ?? 'size-5'} ${
            i < Math.round(value) ? 'fill-t94-red text-t94-red' : 'fill-transparent text-t94-border'
          }`}
        />
      ))}
    </span>
  )
}

export default function TestimonialsCarousel({
  reviews,
  google,
}: {
  reviews: CarouselReview[]
  google?: GoogleSummary
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent((c) => (c + 1) % reviews.length)

  const t = reviews[current]
  const ratingLabel = google ? google.rating.toFixed(1).replace('.', ',') : ''

  return (
    <section className="t94-type bg-t94-grey py-16 lg:py-24" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-t94 text-[15px] font-semibold text-t94-red">
            Testimonianze
          </span>
          <h2 className="mt-2 font-t94 text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.1] text-t94-dark text-balance">
            Cosa dicono i nostri{' '}
            <span className="text-t94-red">clienti</span>
          </h2>

          {google && (
            <a
              href={google.mapsUrl ?? google.writeReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-6 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-t94 border border-t94-border bg-white px-5 py-3 transition-colors hover:border-t94-dark"
              aria-label={`Valutazione ${ratingLabel} su 5 su Google`}
            >
              <GoogleLogo className="size-6" />
              <span className="font-t94 text-[20px] font-bold leading-none text-t94-dark">
                {ratingLabel}
              </span>
              <Stars value={google.rating} className="size-[18px]" />
              <span className="font-t94 text-[15px] text-t94-text-secondary">
                su Google
              </span>
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-t94 border border-t94-border bg-white p-7 md:p-12">
            {google && (
              <GoogleLogo className="absolute right-6 top-6 size-5 opacity-80 md:right-8 md:top-8" />
            )}
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                <div role="img" aria-label={`Valutazione ${t.rating} su 5`} className="mb-5">
                  <Stars value={t.rating} />
                </div>

                <p className="font-t94 text-[18px] lg:text-[20px] text-t94-text leading-[1.6] line-clamp-[9]">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-3">
                  {t.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.photoUrl}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-12 rounded-full bg-t94-grey object-cover"
                    />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-full bg-t94-dark font-t94 text-[18px] font-semibold text-white">
                      {t.name[0]}
                    </div>
                  )}
                  <div>
                    {t.authorUrl ? (
                      <a
                        href={t.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-t94 font-semibold text-t94-dark text-[17px] leading-tight hover:underline"
                      >
                        {t.name}
                      </a>
                    ) : (
                      <p className="font-t94 font-semibold text-t94-dark text-[17px] leading-tight">
                        {t.name}
                      </p>
                    )}
                    {t.subtitle && (
                      <p className="font-t94 text-[15px] text-t94-text-secondary">{t.subtitle}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {reviews.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setCurrent(i)}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-t94-red' : 'w-2 bg-t94-dark/20 hover:bg-t94-dark/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Testimonianza precedente"
                className="flex size-12 items-center justify-center rounded-t94 border border-t94-border bg-white text-t94-dark hover:border-t94-dark transition-colors"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={next}
                aria-label="Testimonianza successiva"
                className="flex size-12 items-center justify-center rounded-t94 border border-t94-border bg-white text-t94-dark hover:border-t94-dark transition-colors"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>

          {google && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
              {google.mapsUrl && (
                <a
                  href={google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-t94 text-[16px] font-semibold text-t94-dark underline-offset-4 hover:underline"
                >
                  Vedi tutte le recensioni su Google
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              )}
              <a
                href={google.writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-t94 text-[16px] font-semibold text-t94-red underline-offset-4 hover:underline"
              >
                Scrivi una recensione
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
