'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marco Ferretti',
    city: 'Venezia',
    rating: 5,
    text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile — abbiamo visto tutto prima di toccare un solo mattone.",
  },
  {
    name: 'Giulia Marchetti',
    city: 'Mestre',
    rating: 5,
    text: "Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Il drone ci ha tranquillizzati subito mostrando esattamente cosa c'era da fare.",
  },
  {
    name: 'Roberto Conti',
    city: 'Treviso',
    rating: 5,
    text: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro. Professionisti seri.",
  },
  {
    name: 'Anna Vitali',
    city: 'Padova',
    rating: 5,
    text: "Abbiamo richiesto l'ispezione gratuita senza aspettarci molto. Il report con le foto del drone è stato una rivelazione — problemi che non sapevamo di avere. Preventivo onesto, lavoro perfetto.",
  },
]

export default function RoofIndexTestimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]
  const behind1 = testimonials[(current + 1) % testimonials.length]

  return (
    <section
      ref={ref}
      id="testimonianze"
      className="bg-[#f5f5f5] py-20 lg:py-28 border-t border-[#161616]/8"
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading + aggregate rating */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            Testimonianze
          </span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.6rem)] leading-none text-[#161616]">
            COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
          </h2>
        </motion.div>

        {/* Stacked card deck */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mt-14"
          style={{ perspective: 1000 }}
        >
          {/* Peeking card behind — static, gives depth without extra animation cost */}
          <div
            aria-hidden="true"
            className="absolute inset-x-4 top-3 -z-10 rounded-sm border border-[#161616]/10 bg-white/70 p-8 opacity-60"
            style={{ transform: 'scale(0.96)' }}
          >
            <p className="line-clamp-2 text-lg italic text-transparent">{behind1.text}</p>
          </div>

          <div className="relative rounded-sm border border-[#161616]/10 bg-white p-8 md:p-12">
            <div
              className="absolute -top-8 -left-2 font-display text-[110px] leading-none text-[#EB1C26]/10 pointer-events-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#EB1C26] text-[#EB1C26]" />
                  ))}
                </div>

                <p className="text-lg leading-relaxed italic text-[#333]">&ldquo;{t.text}&rdquo;</p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#EB1C26] font-display text-lg text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#161616]">{t.name}</p>
                    <p className="text-xs text-[#494949]">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#EB1C26]' : 'w-2 bg-[#161616]/20 hover:bg-[#161616]/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Testimonianza precedente"
                className="flex size-10 items-center justify-center rounded-sm border border-[#161616]/15 text-[#494949] transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Testimonianza successiva"
                className="flex size-10 items-center justify-center rounded-sm border border-[#161616]/15 text-[#494949] transition-colors hover:border-[#EB1C26] hover:text-[#EB1C26]"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
