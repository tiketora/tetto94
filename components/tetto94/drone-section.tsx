'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ScanEye, RadioTower } from 'lucide-react'
import Image from 'next/image'

const benefits = [
  {
    icon: ScanEye,
    title: "Visione completa al 100%",
    desc: "Il drone raggiunge ogni angolo del tetto, anche quelli inaccessibili in sicurezza dall'operaio.",
  },
  {
    icon: RadioTower,
    title: "Reportage fotografico incluso",
    desc: "Ricevi un report dettagliato con foto ad alta risoluzione di ogni area del tetto.",
  },
  {
    icon: CheckCircle2,
    title: "Zero costi, zero vincoli",
    desc: "L'ispezione è completamente gratuita e senza obbligo di acquisto. Decidi tu dopo.",
  },
]

export default function DroneSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="bg-[#EB1C26] py-24 lg:py-32 overflow-hidden relative" ref={ref}>
      {/* Subtle roof-tile pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            135deg,
            #fff 0px,
            #fff 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-6">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              Tecnologia Avanzata
            </span>

            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-none text-white">
              ISPEZIONE CON DRONE
              <span className="block text-white/60 text-[clamp(2rem,4vw,3.5rem)] mt-1">COMPLETAMENTE GRATUITA</span>
            </h2>

            <p className="mt-6 text-base text-white/80 leading-relaxed max-w-lg">
              Prima di qualsiasi intervento, sappiamo esattamente cosa c&apos;è. Il nostro drone
              identifica infiltrazioni, tegole rotte e deterioramenti invisibili a occhio nudo.
              <strong className="text-white"> Senza salire sul tetto. Senza costi.</strong>
            </p>

            <ul className="mt-8 flex flex-col gap-5">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 flex size-10 items-center justify-center rounded-sm bg-white/20">
                      <Icon className="size-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{b.title}</p>
                      <p className="text-sm text-white/70 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.li>
                )
              })}
            </ul>

            <motion.a
              href="#contatti"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10 inline-flex items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-[#EB1C26] shadow-xl hover:bg-white/90 transition-colors"
            >
              Prenota Ora — Senza Costi
            </motion.a>
          </motion.div>

          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden aspect-[4/3] shadow-2xl shadow-black/30">
              <Image
                src="/images/drone-inspection.jpg"
                alt="Ispezione tetto con drone professionale"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Corner tag */}
              <div className="absolute top-5 left-5 rounded-sm bg-[#161616]/80 backdrop-blur-sm px-4 py-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Ispezione Drone</p>
                <p className="text-[10px] text-[#EB1C26] font-bold uppercase">GRATUITA</p>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 rounded-sm bg-[#161616] px-6 py-4 shadow-xl"
            >
              <p className="font-display text-3xl text-[#EB1C26]">0 €</p>
              <p className="text-xs text-white/60 uppercase tracking-wider mt-0.5">Costo ispezione</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
