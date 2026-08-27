'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const works = [
  { src: '/images/works/work-1.jpg', label: 'Rifacimento tegole', city: 'Venezia' },
  { src: '/images/works/work-3.jpg', label: 'Sostituzione cotto', city: 'Mestre' },
  { src: '/images/works/work-5.jpg', label: 'Rifacimento completo', city: 'Treviso' },
  { src: '/images/works/work-9.jpg', label: 'Stop infiltrazioni', city: 'Padova' },
  { src: '/images/works/work-15.jpg', label: 'Impermeabilizzazione', city: 'Venezia' },
  { src: '/images/works/work-17.jpg', label: 'Copertura restaurata', city: 'Mestre' },
  { src: '/images/works/work-21.jpg', label: 'Vista panoramica', city: 'Venezia' },
  { src: '/images/works/work-13.jpg', label: 'Manutenzione tetto', city: 'Treviso' },
]

export default function RoofIndexWorks() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8%' })
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  // Track which card is centered using IntersectionObserver — one lightweight
  // observer instead of a scroll listener, so this never fires per-frame and
  // can't reintroduce the mobile jank found earlier in the width-based carousel.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.findIndex((el) => el === entry.target)
            if (idx !== -1) setActive(idx)
          }
        })
      },
      { root: track, threshold: 0.6 },
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToIndex = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(works.length - 1, idx))
    cardRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="lavori-eseguiti"
      className="bg-background py-20 lg:py-28 border-t border-[#161616]/8"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
              I Nostri Lavori
            </span>
            <h2 className="mt-2 font-display leading-none text-[clamp(2rem,4.5vw,3.6rem)] font-black text-[#161616]">
              LAVORI <span className="text-[#EB1C26]">ESEGUITI.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#494949]">
            Interventi reali, in tutto il Nord-Est Italia — dalla prima ispezione con drone
            al collaudo finale. Nessuna foto stock.
          </p>
        </motion.div>

        {/* Scroll-snap filmstrip — native browser scrolling (no JS drag loop),
            so it stays smooth on low-end mobile devices */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {works.map((w, i) => (
              <div
                key={w.src}
                ref={(el) => { cardRefs.current[i] = el }}
                className="group relative shrink-0 snap-center overflow-hidden rounded-sm bg-[#161616]/5"
                style={{ width: 'min(78vw, 340px)', aspectRatio: '4 / 5' }}
              >
                <Image
                  src={w.src}
                  alt={`${w.label} — Tetto94 ${w.city}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 78vw, 340px"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                <div className="absolute left-4 top-4 flex size-8 items-center justify-center rounded-sm bg-white/90 font-display text-xs font-black text-[#161616]">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm font-semibold text-white">{w.label}</p>
                  <p className="text-xs text-white/70">{w.city}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {works.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Vai al lavoro ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-6 bg-[#EB1C26]' : 'w-1.5 bg-[#161616]/15 hover:bg-[#161616]/30'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollToIndex(active - 1)}
                aria-label="Lavoro precedente"
                className="flex size-10 items-center justify-center rounded-sm border border-[#161616]/15 text-[#494949] transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                onClick={() => scrollToIndex(active + 1)}
                aria-label="Lavoro successivo"
                className="flex size-10 items-center justify-center rounded-sm border border-[#161616]/15 text-[#494949] transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
