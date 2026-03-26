'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Hammer,
  Layers,
  Droplets,
  Thermometer,
  Shield,
  Wind,
  ScanLine,
} from 'lucide-react'

const services = [
  {
    icon: Hammer,
    title: 'Riparazione e Costruzione',
    desc: "Interventi mirati o rifacimento completo del tetto. Lavoriamo su ogni tipo di copertura.",
    highlight: false,
  },
  {
    icon: Layers,
    title: 'Sostituzione Tegole',
    desc: 'Rimpiazzo di tegole danneggiate, rotte o mancanti con materiali di prima scelta.',
    highlight: false,
  },
  {
    icon: Droplets,
    title: 'Stop alle Infiltrazioni',
    desc: "Individuazione e risoluzione definitiva di perdite e infiltrazioni d'acqua.",
    highlight: false,
  },
  {
    icon: Thermometer,
    title: 'Isolamento Termico',
    desc: "Miglioramento dell'efficienza energetica con isolamento termico e acustico professionale.",
    highlight: false,
  },
  {
    icon: Shield,
    title: 'Impermeabilizzazione',
    desc: 'Guaine e membrane impermeabili di alta qualità per una protezione duratura nel tempo.',
    highlight: false,
  },
  {
    icon: Wind,
    title: 'Pulizia Grondaie',
    desc: 'Rimozione foglie, detriti e muschi. Manutenzione grondaie e pluviali.',
    highlight: false,
  },
  {
    icon: ScanLine,
    title: 'Ispezione con Drone',
    desc: 'Rileviamo ogni anomalia prima che diventi un problema. Il tuo primo sopralluogo è completamente gratuito.',
    highlight: true,
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="servizi" className="bg-[#161616] py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            I Nostri Servizi
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            TUTTO CIO CHE IL TUO <br />
            <span className="text-[#EB1C26]">TETTO MERITA</span>
          </h2>
          <p className="mt-4 text-base text-[#494949] leading-relaxed">
            Dalla piccola riparazione al rifacimento completo. Interveniamo con professionalità,
            materiali certificati e tempi certi.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className={`group relative flex flex-col gap-4 rounded-sm p-7 border transition-colors duration-300 cursor-default ${
                  service.highlight
                    ? 'bg-[#EB1C26] border-[#EB1C26] text-white'
                    : 'bg-white/3 border-white/8 hover:border-[#EB1C26]/50 hover:bg-white/5'
                }`}
              >
                {service.highlight && (
                  <span className="absolute top-5 right-5 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                    GRATUITO
                  </span>
                )}
                <div
                  className={`flex size-12 items-center justify-center rounded-sm ${
                    service.highlight ? 'bg-white/20' : 'bg-[#EB1C26]/10 group-hover:bg-[#EB1C26]/20 transition-colors'
                  }`}
                >
                  <Icon
                    className={`size-5 ${service.highlight ? 'text-white' : 'text-[#EB1C26]'}`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-display text-xl tracking-wide ${
                      service.highlight ? 'text-white' : 'text-white'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      service.highlight ? 'text-white/80' : 'text-[#494949]'
                    }`}
                  >
                    {service.desc}
                  </p>
                </div>
                {service.highlight && (
                  <a
                    href="#contatti"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-white underline-offset-4 hover:underline"
                  >
                    Prenota ora &rarr;
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
