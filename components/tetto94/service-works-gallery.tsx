'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getServiceWorks } from '@/data/works-gallery'

interface Props {
  serviceSlug: string
  serviceName: string
  cityName?: string
}

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

/**
 * Bento-style preview of real project photos, scoped to a single service.
 * Shown on both the service page and its city pages (same component,
 * zero duplication) — a lightweight, on-brand alternative to the removed
 * global "Galleria" nav link.
 */
export default function ServiceWorksGallery({ serviceSlug, serviceName, cityName }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const photos = getServiceWorks(serviceSlug)

  if (photos.length === 0) return null

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0B0B0B] py-20 lg:py-24">
      {/* Ambient grid + glow — matches the site's "advanced" dark sections */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -top-32 right-0 size-[36rem] rounded-full bg-[#EB1C26]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
              Lavori Eseguiti
            </span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-white">
              {serviceName.toUpperCase()}
              {cityName ? <span className="text-[#EB1C26]"> A {cityName.toUpperCase()}</span> : null}
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/45 leading-relaxed">
            Una selezione di interventi reali documentati con ispezione drone —
            ogni tetto, una storia di cura.
          </p>
        </motion.div>

        {/* Bento grid — 1 hero shot + 3 supporting shots */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              variants={fadeUp(0.08 + i * 0.08)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className={`group relative overflow-hidden rounded-sm border border-white/10 ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square lg:aspect-auto' : 'aspect-square'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={i === 0 ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 50vw, 25vw'}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              {/* Gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              {/* Corner index */}
              <div className="absolute top-3 left-3 flex items-center gap-1">
                <span className="font-display text-[10px] font-black text-white/70 tabular-nums">
                  {photo.index}
                </span>
              </div>
              {/* Hover reveal icon */}
              <div className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full border border-white/20 bg-white/5 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:opacity-100 group-hover:border-[#EB1C26]/50">
                <ArrowUpRight className="size-3.5 text-white" />
              </div>
              {/* Bottom scan line accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#EB1C26] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
