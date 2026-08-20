'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    num: '01',
    title: 'Riparazione Tetto',
    short: 'Riparazione',
    desc: "Interventi mirati e riparazioni specializzate. Operiamo con la massima competenza su ogni tipo di copertura.",
    href: '/riparazione-tetto',
    img: '/images/service-riparazione.png',
    tag: 'Intervento rapido',
  },
  {
    num: '02',
    title: 'Rifacimento Tetto',
    short: 'Rifacimento',
    desc: "Rifacimento completo della copertura con materiali certificati CE di prima scelta e garanzia scritta 10 anni.",
    href: '/rifacimento-tetto',
    img: '/images/service-rifacimento.png',
    tag: 'Garanzia 10 anni',
  },
  {
    num: '03',
    title: 'Stop Infiltrazioni',
    short: 'Infiltrazioni',
    desc: "Individuazione accurata e risoluzione definitiva di ogni problema di infiltrazione d'acqua.",
    href: '/infiltrazioni-tetto',
    img: '/images/service-infiltrazioni.png',
    tag: 'Diagnosi precisa',
  },
  {
    num: '04',
    title: 'Impermeabilizzazione',
    short: 'Impermeabilizz.',
    desc: 'Applicazione di guaine e membrane di alta qualità per una protezione totale e duratura nel tempo.',
    href: '/impermeabilizzazione-tetto',
    img: '/images/service-impermeabilizzazione.png',
    tag: 'Protezione totale',
  },
  {
    num: '05',
    title: 'Pulizia Grondaie',
    short: 'Grondaie',
    desc: 'Rimozione di foglie, detriti e muschi per garantire il corretto deflusso delle acque in ogni stagione.',
    href: '/pulizia-grondaie',
    img: '/images/service-grondaie.png',
    tag: 'Manutenzione',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.scrollWidth / services.length
    const index = Math.round(el.scrollLeft / cardWidth)
    setActiveCard(Math.min(index, services.length - 1))
  }, [])

  return (
    <section id="servizi" className="bg-[#161616] pb-16 lg:pb-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-0 lg:pt-20">

        {/* ── Heading ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 lg:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
              I Nostri Servizi
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none">
              <span className="text-[#EB1C26]">TUTTO CIO CHE IL</span><br />
              <span className="text-white">TUO TETTO MERITA</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-sm text-white/50 leading-relaxed max-w-sm lg:text-right"
          >
            Dalla piccola riparazione al rifacimento completo. Interveniamo con
            professionalità, materiali certificati e tempi certi su ogni tipo di tetto.
          </motion.p>
        </div>

        {/* ── Cards ───────────────────────────────────────── */}
        {/*
          Mobile:  horizontal snap-scroll — each card 80vw wide, peek of next card visible
          Tablet:  2-column grid
          Desktop: 3-column grid
        */}

        {/* Mobile scroll hint */}
        <div className="flex items-center gap-2 mb-3 sm:hidden">
          <div className="flex gap-1.5">
            {services.map((_, i) => (
              <div
                key={i}
                className="h-px transition-all duration-300"
                style={{
                  width: i === activeCard ? '24px' : '10px',
                  backgroundColor: i === activeCard ? '#EB1C26' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-white/35 font-bold">Scorri</span>
          <ArrowRight className="size-3 text-white/35" />
        </div>

        {/* Mobile: horizontal scroll container */}
        <div className="sm:hidden -mx-6 px-6">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="shrink-0 w-[78vw] snap-start"
              >
                <Link
                  href={service.href}
                  className="group relative flex flex-col overflow-hidden bg-[#0d0d0d] block"
                  style={{ aspectRatio: '3/4' }}
                >
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    sizes="78vw"
                    className="object-cover transition-transform duration-700 group-active:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-[#0d0d0d]/30 to-transparent" />

                  <span className="absolute top-4 left-4 font-display text-xs text-white/25 tracking-[0.3em] z-10">{service.num}</span>
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/15 px-2.5 py-1 z-10 bg-black/30 backdrop-blur-sm">{service.tag}</span>

                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-2">
                    <p className="text-xs text-white/70 leading-relaxed">{service.desc}</p>
                    <div className="flex items-end justify-between">
                      <h3 className="font-display text-xl leading-none text-white">{service.title}</h3>
                      <div className="size-8 bg-[#EB1C26] flex items-center justify-center shrink-0">
                        <ArrowRight className="size-3.5 text-white" />
                      </div>
                    </div>
                    <div className="h-px w-full bg-[#EB1C26]" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tablet + Desktop: grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={service.href}
                className="group relative flex flex-col overflow-hidden bg-[#0d0d0d]"
                style={{ aspectRatio: i < 2 ? '4/3' : '3/4' }}
              >
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent" />
                <div className="absolute inset-0 bg-[#EB1C26]/0 group-hover:bg-[#EB1C26]/20 transition-colors duration-500" />

                <span className="absolute top-4 left-4 font-display text-xs text-white/25 tracking-[0.3em] z-10">{service.num}</span>
                <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-white/60 border border-white/15 px-2.5 py-1 z-10 bg-black/30 backdrop-blur-sm">{service.tag}</span>

                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-2">
                  <p className="text-xs text-white/70 leading-relaxed max-w-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {service.desc}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-display text-[clamp(1.1rem,2.2vw,1.5rem)] leading-none text-white">{service.title}</h3>
                    <div className="size-8 border border-white/20 flex items-center justify-center translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] bg-[#EB1C26] shrink-0">
                      <ArrowRight className="size-3.5 text-white" />
                    </div>
                  </div>
                  <div className="h-px w-0 bg-[#EB1C26] group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
