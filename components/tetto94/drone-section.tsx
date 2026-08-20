'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ScanEye, RadioTower } from 'lucide-react'
import Image from 'next/image'
import { trackCTAClick } from '@/lib/gtag'
import { triggerDroneFly } from '@/components/tetto94/drone-fly'

const benefits = [
  {
    icon: ScanEye,
    title: 'Visione completa al 100%',
    desc: 'Il drone raggiunge ogni angolo del tetto, anche quelli inaccessibili in sicurezza per un operatore.',
  },
  {
    icon: RadioTower,
    title: 'Reportage fotografico incluso',
    desc: 'Ricevi un report dettagliato con foto ad alta risoluzione di ogni area del tetto.',
  },
  {
    icon: CheckCircle2,
    title: 'Zero costi, zero vincoli',
    desc: "L'ispezione è completamente gratuita e senza obbligo di acquisto. Decidi tu dopo la visione.",
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
})

/**
 * Single responsive markup (mobile-first, no separate desktop/mobile DOM
 * trees) — avoids duplicate <h2>/content in the page source, per SEO
 * recommendation. Layout adapts purely via Tailwind breakpoints.
 */
export default function DroneSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="bg-[#EB1C26] overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-8 lg:pt-10 pb-10 lg:pb-12">
        {/* Heading — full width above image+text on all breakpoints */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-6 lg:mb-8">
          <span className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-[#161616] block mb-1 lg:mb-2">
            Tecnologia Avanzata
          </span>
          <h2 className="font-display leading-none text-white">
            <span className="block text-[1.9rem] lg:text-[clamp(2.4rem,4.5vw,4.2rem)] font-black">ISPEZIONE CON DRONE.</span>
            <span className="block text-[1.35rem] lg:text-[clamp(1.8rem,3.2vw,3rem)] font-normal text-[#161616] mt-0.5 lg:mt-1">COMPLETAMENTE GRATUITA</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] border-2 border-white overflow-hidden"
          >
            <Image
              src="/images/drone-inspection.jpg"
              alt="Ispezione tetto con drone professionale"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </motion.div>

          {/* Description + benefits + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-start lg:pt-2"
          >
            <p className="text-sm text-white/85 leading-relaxed">
              Prima di qualsiasi intervento, analizziamo esattamente lo stato della copertura. Il nostro drone
              identifica infiltrazioni, tegole rotte e deterioramenti invisibili a occhio nudo.{' '}
              <strong className="text-white">Senza salire sul tetto. Senza costi.</strong>
            </p>

            <ul className="mt-5 lg:mt-6 flex flex-col gap-4">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.li
                    key={b.title}
                    variants={fadeUp(0.3 + i * 0.1)}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="flex items-start gap-3"
                  >
                    <div className="shrink-0 flex size-8 items-center justify-center rounded-full border border-white/50">
                      <Icon className="size-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">{b.title}</p>
                      <p className="text-xs text-white/70 leading-relaxed mt-0.5">{b.desc}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ul>

            <motion.a
              href="#contatti"
              variants={fadeUp(0.65)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-7 lg:mt-8 self-start inline-flex items-center justify-center bg-white px-6 lg:px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#161616] hover:bg-white/90 transition-colors"
              onClick={(e) => { trackCTAClick('drone_section', '/contatti'); triggerDroneFly(e) }}
            >
              Prenota Ora — Senza Costi
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
