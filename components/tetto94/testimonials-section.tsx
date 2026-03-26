'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Marco Ferretti',
    city: 'Milano',
    rating: 5,
    text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile — abbiamo visto tutto prima di toccare un solo mattone. Consigliato al 100%.",
  },
  {
    name: 'Giulia Marchetti',
    city: 'Bergamo',
    rating: 5,
    text: "Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Il drone ci ha tranquillizzati subito mostrando esattamente cosa c'era da fare. Ottimo rapporto qualità/prezzo.",
  },
  {
    name: 'Roberto Conti',
    city: 'Como',
    rating: 5,
    text: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro. Professionisti seri.",
  },
  {
    name: 'Anna Vitali',
    city: 'Monza',
    rating: 5,
    text: "Abbiamo richiesto l'ispezione gratuita senza aspettarci molto. Il report con le foto del drone è stato una rivelazione — problemi che non sapevamo di avere. Preventivo onesto, lavoro perfetto. Li richiamerò senza dubbio.",
  },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  const next = () => setCurrent((c) => (c + 1) % testimonials.length)

  const t = testimonials[current]

  return (
    <section className="bg-[#161616] py-24 lg:py-32 border-t border-white/5" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            Testimonianze
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-white">
            COSA DICONO I NOSTRI{' '}
            <span className="text-[#EB1C26]">CLIENTI</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          {/* Large quote mark */}
          <div
            className="absolute -top-8 -left-2 font-display text-[120px] leading-none text-[#EB1C26]/15 pointer-events-none select-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <div className="relative rounded-sm border border-white/8 bg-white/3 p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35 }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[#EB1C26] text-[#EB1C26]" />
                  ))}
                </div>

                <p className="text-lg text-white/80 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#EB1C26] font-display text-lg text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-xs text-[#494949]">{t.city}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Vai alla testimonianza ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? 'w-8 bg-[#EB1C26]' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Testimonianza precedente"
                className="flex size-10 items-center justify-center rounded-sm border border-white/15 text-white/60 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Testimonianza successiva"
                className="flex size-10 items-center justify-center rounded-sm border border-white/15 text-white/60 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
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
