'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const works = [
  { src: '/images/works/work-1.jpg', index: '01', alt: 'Rifacimento tegole tetto a Venezia — Tetto94' },
  { src: '/images/works/work-2.jpg', index: '02', alt: 'Manutenzione copertura tetto con ispezione drone — Tetto94 Venezia' },
  { src: '/images/works/work-3.jpg', index: '03', alt: 'Sostituzione tegole tetto in cotto — lavori eseguiti da Tetto94' },
  { src: '/images/works/work-4.jpg', index: '04', alt: 'Ripristino tegole rotte copertura — Tetto94 Venezia' },
  { src: '/images/works/work-5.jpg', index: '05', alt: 'Rifacimento completo tetto con tegole nuove — Tetto94' },
  { src: '/images/works/work-6.jpg', index: '06', alt: 'Ispezione drone copertura tetto — riparazione tetto Venezia' },
  { src: '/images/works/work-7.jpg', index: '07', alt: 'Copertura tetto in corso di rifacimento — Tetto94 Venezia province' },
  { src: '/images/works/work-8.jpg', index: '08', alt: 'Lavori di riparazione tetto completati — Tetto94' },
  { src: '/images/works/work-9.jpg', index: '09', alt: 'Stop infiltrazioni tetto — intervento Tetto94 Venezia' },
  { src: '/images/works/work-10.jpg', index: '10', alt: 'Drone ispezione tetto prima del rifacimento — Tetto94' },
  { src: '/images/works/work-11.jpg', index: '11', alt: 'Sostituzione tegole danneggiate tetto — Tetto94 Venezia' },
  { src: '/images/works/work-12.jpg', index: '12', alt: 'Riparazione tegole rotte tetto — lavori Tetto94' },
  { src: '/images/works/work-13.jpg', index: '13', alt: 'Manutenzione tetto e ripristino tegole — Tetto94 provincia Venezia' },
  { src: '/images/works/work-14.jpg', index: '14', alt: 'Tegole in cotto restaurate — copertura Tetto94 Venezia' },
  { src: '/images/works/work-15.jpg', index: '15', alt: 'Rifacimento tetto completo — impermeabilizzazione Tetto94' },
  { src: '/images/works/work-16.jpg', index: '16', alt: 'Ispezione tetto al tramonto — sopralluogo gratuito Tetto94' },
  { src: '/images/works/work-17.jpg', index: '17', alt: 'Copertura tetto restaurata con tegole nuove — Tetto94 Venezia' },
  { src: '/images/works/work-18.jpg', index: '18', alt: 'Riparazione tetto con lucernari — lavori Tetto94 Venezia' },
  { src: '/images/works/work-19.jpg', index: '19', alt: 'Tetto degradato prima del rifacimento — ispezione drone Tetto94' },
  { src: '/images/works/work-20.jpg', index: '20', alt: 'Tetto al tramonto — sopralluogo Tetto94 provincia Venezia' },
  { src: '/images/works/work-21.jpg', index: '21', alt: 'Vista panoramica tetto restaurato — Tetto94 Venezia' },
]

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function WorksCarousel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent((idx + works.length) % works.length)
  }, [])

  const next = useCallback(() => go(current + 1, 1), [current, go])
  const prev = useCallback(() => go(current - 1, -1), [current, go])

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [next])

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(next, 5000)
  }, [next])

  const onDragStart = (x: number) => {
    setIsDragging(true)
    dragStartX.current = x
  }

  const onDragEnd = (x: number) => {
    if (!isDragging) return
    setIsDragging(false)
    const delta = dragStartX.current - x
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev()
      resetAutoPlay()
    }
  }

  const w = works[current]
  const progressPct = ((current + 1) / works.length) * 100

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-20 w-full"
    >
      {/* Section label */}
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
          I Nostri Lavori
        </span>
        <h2 className="mt-1 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-white leading-none">
          LAVORI <span className="text-[#EB1C26]">ESEGUITI.</span>
        </h2>
      </div>

      {/* Carousel image area — uses padding-top trick for responsive ratio */}
      <div
        className="relative w-full overflow-hidden rounded-sm bg-[#0E0E0E] cursor-grab active:cursor-grabbing select-none"
        style={{ paddingTop: 'min(125%, 75vh)' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onMouseLeave={() => { if (isDragging) setIsDragging(false) }}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div className="absolute inset-0">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={w.src}
                alt={w.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={current < 2}
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 pointer-events-none">
            <motion.div
              key={current}
              className="h-full bg-[#EB1C26]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* Controls — always full width, never overflow */}
      <div className="mt-4 flex items-center gap-3 w-full">
        {/* Progress track fills all available space */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#EB1C26] rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          {/* Counter */}
          <div className="flex items-baseline gap-0.5 shrink-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.18 }}
                className="font-display text-base font-black text-white leading-none tabular-nums"
              >
                {w.index}
              </motion.span>
            </AnimatePresence>
            <span className="font-display text-sm font-black text-[#494949] leading-none">
              /{String(works.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Arrows — always visible, fixed size */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => { prev(); resetAutoPlay() }}
            aria-label="Lavoro precedente"
            className="flex size-10 items-center justify-center border border-white/15 text-white/60 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors rounded-sm"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={() => { next(); resetAutoPlay() }}
            aria-label="Lavoro successivo"
            className="flex size-10 items-center justify-center border border-white/15 text-white/60 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors rounded-sm"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
