'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MapPin, Euro, CheckCircle2, ChevronDown, Shield, Star, ArrowRight, Building2, Layers, Wrench } from 'lucide-react'
import Image from 'next/image'
import type { CitySeoData } from '@/data/city-seo'
import type { LocationConfig } from '@/data/services'

interface Props {
  data: CitySeoData
  location: LocationConfig
}

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

const fadeLeft = (d = 0) => ({
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

const fadeRight = (d = 0) => ({
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

/* ── Section Label ───────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
      <span className="inline-block w-4 h-px bg-[#EB1C26]" />
      {children}
    </span>
  )
}

/* ── Before / After Slider for city-specific images ─────── */
function CityBeforeAfter({ beforeSrc, afterSrc, cityName }: { beforeSrc: string; afterSrc: string; cityName: string }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const move = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98)
    setPosition(pct)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] overflow-hidden cursor-col-resize select-none group"
      onMouseMove={(e) => move(e.clientX)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      aria-label={`Prima e dopo rifacimento tetto a ${cityName}`}
    >
      {/* After image (base) */}
      <Image src={afterSrc} alt={`Tetto rifatto a ${cityName} — Dopo`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />

      {/* Before image (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <Image src={beforeSrc} alt={`Tetto da rifare a ${cityName} — Prima`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-10" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 bg-white rounded-full shadow-xl flex items-center justify-center">
          <svg className="size-5 text-[#EB1C26]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider z-10">Prima</div>
      <div className="absolute bottom-3 right-3 bg-[#EB1C26] text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider z-10">Dopo</div>

      {/* Drag hint */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-full z-10 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
        Trascina per confrontare
      </div>
    </div>
  )
}

/* ── FAQ Accordion (extra items) ─────────────────────────── */
function FaqExtra({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="divide-y divide-black/8">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={open === i}
          >
            <span className="text-sm font-semibold text-[#161616] leading-snug">{item.q}</span>
            <ChevronDown className={`size-4 shrink-0 text-[#EB1C26] transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 text-sm text-[#494949] leading-relaxed overflow-hidden"
              >
                {item.a}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────── */
export default function CitySeoSections({ data, location }: Props) {

  /* Intersection observers per section */
  const priceRef = useRef(null)
  const priceInView = useInView(priceRef, { once: true, margin: '-8%' })

  const zoneRef = useRef(null)
  const zoneInView = useInView(zoneRef, { once: true, margin: '-8%' })

  const materialiRef = useRef(null)
  const materialiInView = useInView(materialiRef, { once: true, margin: '-8%' })

  const bonusRef = useRef(null)
  const bonusInView = useInView(bonusRef, { once: true, margin: '-8%' })

  const galleryRef = useRef(null)
  const galleryInView = useInView(galleryRef, { once: true, margin: '-8%' })

  const mapsRef = useRef(null)
  const mapsInView = useInView(mapsRef, { once: true, margin: '-8%' })

  const faqRef = useRef(null)
  const faqInView = useInView(faqRef, { once: true, margin: '-8%' })

  return (
    <>
      {/* ── SECTION 1: Tabella Prezzi ─────────────────────── */}
      <section
        ref={priceRef}
        id="prezzi"
        className="bg-[#161616] py-16 lg:py-20 border-t border-white/5"
        aria-labelledby="prezzi-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">

            <motion.div
              variants={fadeLeft(0)}
              initial="hidden"
              animate={priceInView ? 'visible' : 'hidden'}
            >
              <SectionLabel>Prezzi {location.name}</SectionLabel>
              <h2
                id="prezzi-heading"
                className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-white"
              >
                QUANTO COSTA RIFARE IL TETTO A{' '}
                <span className="text-[#EB1C26]">{location.name.toUpperCase()}?</span>
              </h2>
              <p className="mt-4 text-sm text-white/60 leading-relaxed">
                {data.priceIntro}
              </p>

              <a
                href="/contatti"
                className="mt-6 inline-flex items-center gap-2 bg-[#EB1C26] text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-[#c41520] transition-colors"
              >
                Preventivo Gratuito
                <ArrowRight className="size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeRight(0.1)}
              initial="hidden"
              animate={priceInView ? 'visible' : 'hidden'}
            >
              <div className="border border-white/8 overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-[#EB1C26] px-5 py-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Tipo intervento</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white text-right">Da</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white text-right">A</span>
                </div>
                {/* Table rows */}
                <div className="divide-y divide-white/5">
                  {data.prezzi.map((row, i) => (
                    <motion.div
                      key={row.tipo}
                      variants={fadeUp(0.1 + i * 0.07)}
                      initial="hidden"
                      animate={priceInView ? 'visible' : 'hidden'}
                      className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 items-start hover:bg-white/3 transition-colors"
                    >
                      <div>
                        <p className="text-sm text-white/90 font-medium leading-snug">{row.tipo}</p>
                        <p className="text-xs text-white/35 mt-0.5">{row.note}</p>
                      </div>
                      <span className="text-sm font-bold text-white/70 text-right whitespace-nowrap">
                        {row.prezzoMin === '€ 0' ? (
                          <span className="text-[#EB1C26] font-black">GRATIS</span>
                        ) : row.prezzoMin}
                      </span>
                      <span className="text-sm font-bold text-white text-right whitespace-nowrap">
                        {row.prezzoMax === '€ 0' ? '' : row.prezzoMax}
                      </span>
                    </motion.div>
                  ))}
                </div>
                {/* Footer note */}
                <div className="bg-white/3 px-5 py-3 border-t border-white/5">
                  <p className="text-xs text-white/35 flex items-center gap-1.5">
                    <Shield className="size-3 text-[#EB1C26] shrink-0" />
                    Prezzi indicativi IVA inclusa. Preventivo definitivo dopo sopralluogo drone gratuito.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 1b: Costi Totali (Batch 2 cities only) ── */}
      {data.costiTotali && data.costiTotali.length > 0 && (
        <section className="bg-[#1a1a1a] py-14 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate={priceInView ? 'visible' : 'hidden'}
              className="mb-8"
            >
              <SectionLabel>Esempi di Costo</SectionLabel>
              <h3 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-white">
                COSTO TOTALE PER SUPERFICIE A{' '}
                <span className="text-[#EB1C26]">{location.name.toUpperCase()}</span>
              </h3>
              <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-xl">
                Stime indicative per superfici tipo nella provincia di {location.province}. Il preventivo definitivo è gratuito e include sopralluogo drone.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {data.costiTotali.map((row, i) => (
                <motion.div
                  key={row.superficie}
                  variants={fadeUp(0.05 + i * 0.07)}
                  initial="hidden"
                  animate={priceInView ? 'visible' : 'hidden'}
                  className="relative border border-white/8 bg-white/3 p-5 hover:border-[#EB1C26]/40 hover:bg-white/5 transition-colors"
                >
                  {i === 2 && (
                    <span className="absolute -top-2.5 left-4 text-[10px] font-black uppercase tracking-wider bg-[#EB1C26] text-white px-2 py-0.5">
                      Piu richiesto
                    </span>
                  )}
                  <p className="text-xs font-bold uppercase tracking-wider text-white/35 mb-3">{row.superficie}</p>
                  <p className="font-display text-xl text-white leading-none">{row.prezzoMin}</p>
                  <p className="text-xs text-white/35 my-1">fino a</p>
                  <p className="font-display text-2xl text-[#EB1C26] leading-none">{row.prezzoMax}</p>
                  <p className="text-[10px] text-white/30 mt-3 leading-snug">{row.note}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 1c: Senza Ponteggi ───────────────────────── */}
      <section className="relative bg-[#161616] py-16 lg:py-20 border-t border-white/5 overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #EB1C26 0, #EB1C26 1px, transparent 0, transparent 50%)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              variants={fadeLeft(0)}
              initial="hidden"
              animate={priceInView ? 'visible' : 'hidden'}
            >
              <SectionLabel>Il Nostro Vantaggio</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] leading-none text-white">
                {data.senzaPonteggi.titolo.toUpperCase().replace('LAVORIAMO ', '')}
              </h2>
              <p className="mt-5 text-sm text-white/60 leading-relaxed">
                {data.senzaPonteggi.intro}
              </p>
              <a
                href="/contatti"
                className="mt-6 inline-flex items-center gap-2 border border-[#EB1C26] text-[#EB1C26] px-6 py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-[#EB1C26] hover:text-white transition-colors"
              >
                Richiedi Intervento Senza Ponteggi
                <ArrowRight className="size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeRight(0.15)}
              initial="hidden"
              animate={priceInView ? 'visible' : 'hidden'}
              className="flex flex-col gap-4"
            >
              {/* Risparmio badge */}
              <div className="flex items-center gap-4 border border-[#EB1C26]/30 bg-[#EB1C26]/8 p-5">
                <div className="flex size-14 shrink-0 items-center justify-center bg-[#EB1C26]">
                  <Wrench className="size-6 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40">Risparmio garantito</p>
                  <p className="font-display text-3xl text-[#EB1C26] leading-none mt-0.5">{data.senzaPonteggi.risparmio}</p>
                  <p className="text-xs text-white/40 mt-0.5">rispetto al ponteggio tradizionale</p>
                </div>
              </div>
              {/* Vantaggi */}
              {data.senzaPonteggi.vantaggi.map((v, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.2 + i * 0.08)}
                  initial="hidden"
                  animate={priceInView ? 'visible' : 'hidden'}
                  className="flex items-start gap-4 border border-white/8 bg-white/3 px-5 py-4"
                >
                  <CheckCircle2 className="size-4 text-[#EB1C26] shrink-0 mt-0.5" />
                  <p className="text-sm text-white/70 leading-snug">{v}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Zone Coperte ────────────────────────── */}
      <section
        ref={zoneRef}
        className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-black/5"
        aria-labelledby="zone-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={zoneInView ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <SectionLabel>Interveniamo In</SectionLabel>
            <h2
              id="zone-heading"
              className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]"
            >
              COMUNI COPERTI VICINO A{' '}
              <span className="text-[#EB1C26]">{location.name.toUpperCase()}</span>
            </h2>
            <p className="mt-3 text-sm text-[#494949] max-w-2xl leading-relaxed">
              Tetto94 opera a {location.name} e in tutti i comuni della provincia di {location.province}.
              Interveniamo entro 24 ore dall&apos;accettazione del preventivo in tutta l&apos;area indicata.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            {data.comuniCoperti.map((comune, i) => (
              <motion.div
                key={comune}
                variants={fadeUp(0.05 + i * 0.03)}
                initial="hidden"
                animate={zoneInView ? 'visible' : 'hidden'}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border transition-colors ${
                  comune === location.name
                    ? 'bg-[#EB1C26] text-white border-[#EB1C26]'
                    : 'bg-white text-[#333] border-black/10 hover:border-[#EB1C26] hover:text-[#EB1C26]'
                }`}
              >
                <MapPin className="size-3 shrink-0" />
                {comune}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Materiali ──────────────────────────── */}
      <section
        ref={materialiRef}
        className="bg-white py-16 lg:py-20 border-t border-black/5"
        aria-labelledby="materiali-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={materialiInView ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <SectionLabel>Materiali</SectionLabel>
            <h2
              id="materiali-heading"
              className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]"
            >
              MATERIALI CONSIGLIATI PER IL CLIMA DI{' '}
              <span className="text-[#EB1C26]">{location.name.toUpperCase()}</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.materiali.map((mat, i) => (
              <motion.div
                key={mat.nome}
                variants={fadeUp(0.1 + i * 0.1)}
                initial="hidden"
                animate={materialiInView ? 'visible' : 'hidden'}
                className="group border border-black/8 bg-[#FAFAFA] p-6 flex flex-col gap-3 hover:border-[#EB1C26] hover:bg-white transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 bg-[#EB1C26]/10 group-hover:bg-[#EB1C26] flex items-center justify-center transition-colors duration-300">
                    <Layers className="size-4 text-[#EB1C26] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-sm font-bold text-[#161616] leading-snug">{mat.nome}</h3>
                </div>
                <p className="text-xs text-[#494949] leading-relaxed">{mat.descrizione}</p>
                <div className="mt-auto pt-3 border-t border-black/6">
                  <p className="text-xs text-[#EB1C26] font-medium leading-snug flex items-start gap-1.5">
                    <CheckCircle2 className="size-3.5 shrink-0 mt-0.5" />
                    {mat.adatto}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Bonus e Detrazioni Fiscali 2026 ─────── */}
      <section
        ref={bonusRef}
        className="bg-[#161616] py-16 lg:py-20 border-t border-white/5"
        aria-labelledby="bonus-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={bonusInView ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <SectionLabel>Agevolazioni Fiscali 2026</SectionLabel>
            <h2
              id="bonus-heading"
              className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-white"
            >
              BONUS E DETRAZIONI PER IL{' '}
              <span className="text-[#EB1C26]">RIFACIMENTO TETTO</span>
            </h2>
            <p className="mt-3 text-sm text-white/55 max-w-2xl leading-relaxed">
              Approfitta delle detrazioni fiscali disponibili per il rifacimento tetto a {location.name}.
              Tetto94 gestisce tutta la documentazione necessaria: fatture, bonifici parlanti e pratiche con l&apos;Agenzia delle Entrate.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.bonus.map((b, i) => (
              <motion.div
                key={b.nome}
                variants={fadeUp(0.1 + i * 0.1)}
                initial="hidden"
                animate={bonusInView ? 'visible' : 'hidden'}
                className="border border-white/8 bg-white/3 p-6 flex flex-col gap-4 hover:border-[#EB1C26]/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-white leading-snug">{b.nome}</h3>
                  <span className="shrink-0 font-display text-2xl leading-none text-[#EB1C26] font-black">
                    {b.percentuale}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Massimale</span>
                    <span className="text-xs font-bold text-white/80">{b.massimale}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">Scadenza</span>
                    <span className="text-xs font-bold text-[#EB1C26]">{b.scadenza}</span>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed border-t border-white/8 pt-4">
                  {b.note}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp(0.4)}
            initial="hidden"
            animate={bonusInView ? 'visible' : 'hidden'}
            className="mt-8 bg-[#EB1C26]/10 border border-[#EB1C26]/20 p-5"
          >
            <p className="text-sm text-white/70 leading-relaxed">
              <span className="font-bold text-white">Nota importante:</span> Le aliquote e i massimali possono variare con la Legge di Bilancio annuale.
              Tetto94 aggiorna costantemente le proprie informazioni fiscali. Contattateci per verificare le agevolazioni applicabili al vostro caso specifico a {location.name}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: Gallery Prima/Dopo città specifica ─── */}
      <section
        ref={galleryRef}
        className="bg-white py-16 lg:py-20 border-t border-black/5"
        aria-labelledby="gallery-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={galleryInView ? 'visible' : 'hidden'}
            className="mb-10 text-center"
          >
            <SectionLabel>Lavori a {location.name}</SectionLabel>
            <h2
              id="gallery-heading"
              className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]"
            >
              PRIMA E <span className="text-[#EB1C26]">DOPO</span> A {location.name.toUpperCase()}
            </h2>
            <p className="mt-3 text-sm text-[#494949] max-w-xl mx-auto leading-relaxed">
              Ogni intervento di rifacimento tetto a {location.name} è documentato con foto professionali.
              Trascina il cursore per confrontare lo stato prima e dopo i lavori.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp(0.15)}
            initial="hidden"
            animate={galleryInView ? 'visible' : 'hidden'}
            className="max-w-4xl mx-auto"
          >
            <CityBeforeAfter
              beforeSrc={data.beforeImage}
              afterSrc={data.afterImage}
              cityName={location.name}
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-[#494949]">
                Rifacimento tetto a {location.name} ({location.province}) — Tetto94
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="size-3.5 fill-[#EB1C26] text-[#EB1C26]" />
                ))}
                <span className="ml-1 text-xs text-[#494949]">5.0 — Qualità garantita</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: Google Maps ────────────────────────── */}
      <section
        ref={mapsRef}
        className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-black/5"
        aria-labelledby="mappa-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">

            <motion.div
              variants={fadeLeft(0)}
              initial="hidden"
              animate={mapsInView ? 'visible' : 'hidden'}
            >
              <SectionLabel>Dove Siamo</SectionLabel>
              <h2
                id="mappa-heading"
                className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]"
              >
                TETTO94 OPERA A{' '}
                <span className="text-[#EB1C26]">{location.name.toUpperCase()}</span>
              </h2>
              <p className="mt-4 text-sm text-[#494949] leading-relaxed">
                Interveniamo in tutta la provincia di {location.name}.
                La nostra sede è a Venezia ma operiamo a {location.name}{location.nearbyCity ? `, ${location.nearbyCity}` : ''} e in tutti i comuni della provincia di {location.province} senza costi aggiuntivi di trasferta.
              </p>

              <ul className="mt-6 flex flex-col gap-3">
                {[
                  { icon: Building2, text: `Operativi a ${location.name} dal 1994` },
                  { icon: MapPin, text: `Copertura totale provincia ${location.province}` },
                  { icon: CheckCircle2, text: 'Zero costi di trasferta' },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-[#333]">
                    <div className="size-7 bg-[#EB1C26]/10 flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-[#EB1C26]" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeRight(0.15)}
              initial="hidden"
              animate={mapsInView ? 'visible' : 'hidden'}
              className="h-[350px] lg:h-[420px] border border-black/10 overflow-hidden"
            >
              {mapsInView && (
                <iframe
                  src={data.mapsEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Tetto94 — Rifacimento Tetto a ${location.name}`}
                  aria-label={`Mappa di ${location.name} con area di servizio Tetto94`}
                />
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ Extra (city-specific) ─────────── */}
      <section
        ref={faqRef}
        className="bg-white py-16 lg:py-20 border-t border-black/5"
        aria-labelledby="faq-extra-heading"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

            <motion.div
              variants={fadeUp(0)}
              initial="hidden"
              animate={faqInView ? 'visible' : 'hidden'}
            >
              <SectionLabel>FAQ {location.name}</SectionLabel>
              <h2
                id="faq-extra-heading"
                className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]"
              >
                DOMANDE SPECIFICHE SU{' '}
                <span className="text-[#EB1C26]">{location.name.toUpperCase()}</span>
              </h2>
              <p className="mt-4 text-sm text-[#494949] leading-relaxed">
                Le domande più frequenti dei nostri clienti a {location.name} e in provincia di {location.province}.
              </p>

              <a
                href="/contatti"
                className="mt-6 inline-flex items-center gap-2 border border-[#161616] text-[#161616] px-5 py-3 text-sm font-bold uppercase tracking-wider hover:bg-[#161616] hover:text-white transition-colors"
              >
                Hai altre domande?
                <ArrowRight className="size-4" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp(0.15)}
              initial="hidden"
              animate={faqInView ? 'visible' : 'hidden'}
            >
              <FaqExtra items={data.faqExtra} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Servizi Correlati — internal links to other services ─── */}
      <section className="bg-[#F5F5F5] py-12 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949] mb-6">
            Altri Servizi a {location.name}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              {
                slug: 'impermeabilizzazione-tetto',
                name: 'Impermeabilizzazione Tetto',
                desc: `Soluzioni impermeabilizzanti certificate per tetti piani e a falda a ${location.name}.`,
              },
              {
                slug: 'riparazione-tetto',
                name: 'Riparazione Tetto',
                desc: `Riparazione rapida di perdite, tegole rotte e infiltrazioni a ${location.name}.`,
              },
            ].map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}/${location.slug}`}
                className="group flex flex-col gap-2 border border-black/10 bg-white p-5 hover:border-[#EB1C26]/40 transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26] flex items-center gap-1.5">
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                  {s.name}
                </span>
                <p className="text-sm text-[#494949] leading-snug">{s.desc}</p>
                <span className="text-xs text-[#161616]/40 mt-auto">
                  {s.name} a {location.name} &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
