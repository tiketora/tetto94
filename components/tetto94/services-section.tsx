// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import {
//   Hammer,
//   Layers,
//   Droplets,
//   Thermometer,
//   Shield,
//   Wind,
//   ScanLine,
// } from 'lucide-react'

// const services = [
//   {
//     icon: Hammer,
//     title: 'Riparazione e Costruzione',
//     desc: "Interventi mirati o rifacimento completo del tetto. Lavoriamo su ogni tipo di copertura.",
//     highlight: false,
//   },
//   {
//     icon: Layers,
//     title: 'Sostituzione Tegole',
//     desc: 'Rimpiazzo di tegole danneggiate, rotte o mancanti con materiali di prima scelta.',
//     highlight: false,
//   },
//   {
//     icon: Droplets,
//     title: 'Stop alle Infiltrazioni',
//     desc: "Individuazione e risoluzione definitiva di perdite e infiltrazioni d'acqua.",
//     highlight: false,
//   },
//   {
//     icon: Thermometer,
//     title: 'Isolamento Termico',
//     desc: "Miglioramento dell'efficienza energetica con isolamento termico e acustico professionale.",
//     highlight: false,
//   },
//   {
//     icon: Shield,
//     title: 'Impermeabilizzazione',
//     desc: 'Guaine e membrane impermeabili di alta qualità per una protezione duratura nel tempo.',
//     highlight: false,
//   },
//   {
//     icon: Wind,
//     title: 'Pulizia Grondaie',
//     desc: 'Rimozione foglie, detriti e muschi. Manutenzione grondaie e pluviali.',
//     highlight: false,
//   },
//   {
//     icon: ScanLine,
//     title: 'Ispezione con Drone',
//     desc: 'Rileviamo ogni anomalia prima che diventi un problema. Il tuo primo sopralluogo è completamente gratuito.',
//     highlight: true,
//   },
// ]

// const cardVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
//   }),
// }

// export default function ServicesSection() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-10%' })

//   return (
//     <section id="servizi" className="bg-[#161616] py-24 lg:py-32" ref={ref}>
//       <div className="mx-auto max-w-7xl px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           className="max-w-2xl"
//         >
//           <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//             I Nostri Servizi
//           </span>
//           <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
//             TUTTO CIO CHE IL TUO <br />
//             <span className="text-[#EB1C26]">TETTO MERITA</span>
//           </h2>
//           <p className="mt-4 text-base text-[#494949] leading-relaxed">
//             Dalla piccola riparazione al rifacimento completo. Interveniamo con professionalità,
//             materiali certificati e tempi certi.
//           </p>
//         </motion.div>

//         {/* Grid */}
//         <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service, i) => {
//             const Icon = service.icon
//             return (
//               <motion.div
//                 key={service.title}
//                 custom={i}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate={inView ? 'visible' : 'hidden'}
//                 whileHover={{ y: -8, transition: { duration: 0.25 } }}
//                 className={`group relative flex flex-col gap-4 rounded-sm p-7 border transition-colors duration-300 cursor-default ${
//                   service.highlight
//                     ? 'bg-[#EB1C26] border-[#EB1C26] text-white'
//                     : 'bg-white/3 border-white/8 hover:border-[#EB1C26]/50 hover:bg-white/5'
//                 }`}
//               >
//                 {service.highlight && (
//                   <span className="absolute top-5 right-5 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
//                     GRATUITO
//                   </span>
//                 )}
//                 <div
//                   className={`flex size-12 items-center justify-center rounded-sm ${
//                     service.highlight ? 'bg-white/20' : 'bg-[#EB1C26]/10 group-hover:bg-[#EB1C26]/20 transition-colors'
//                   }`}
//                 >
//                   <Icon
//                     className={`size-5 ${service.highlight ? 'text-white' : 'text-[#EB1C26]'}`}
//                   />
//                 </div>
//                 <div>
//                   <h3
//                     className={`font-display text-xl tracking-wide ${
//                       service.highlight ? 'text-white' : 'text-white'
//                     }`}
//                   >
//                     {service.title}
//                   </h3>
//                   <p
//                     className={`mt-2 text-sm leading-relaxed ${
//                       service.highlight ? 'text-white/80' : 'text-[#494949]'
//                     }`}
//                   >
//                     {service.desc}
//                   </p>
//                 </div>
//                 {service.highlight && (
//                   <a
//                     href="#contatti"
//                     className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-white underline-offset-4 hover:underline"
//                   >
//                     Prenota ora &rarr;
//                   </a>
//                 )}
//               </motion.div>
//             )
//           })}
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Hammer, Layers, Droplets, Thermometer, Shield, Wind, ScanLine } from 'lucide-react'

import { ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Hammer,
    title: 'Riparazione e Costruzione',
    desc: "Interventi mirati e rifacimento completo. Lavoriamo su ogni tipo di copertura con eccellenza.",
  },
  {
    icon: Layers,
    title: 'Sostituzione Tegole',
    desc: 'Rimpiazzo di tegole danneggiate, rotte o mancanti con materiali certificati di prima scelta.',
  },
  {
    icon: Droplets,
    title: 'Stop alle Infiltrazioni',
    desc: "Individuazione e risoluzione definitiva di perdite e infiltrazioni d'acqua.",
  },
  {
    icon: Thermometer,
    title: 'Isolamento Termico',
    desc: "Miglioramento dell'efficienza energetica con isolamento termico e acustico professionale.",
  },
  {
    icon: Shield,
    title: 'Impermeabilizzazione',
    desc: 'Guaine e membrane impermeabili di alta qualità per una protezione duratura nel tempo.',
  },
  {
    icon: Wind,
    title: 'Pulizia Grondaie',
    desc: 'Rimozione foglie, detriti e muschi. Manutenzione grondaie e pluviali in ogni stagione.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="servizi" className="bg-[#161616]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-0 lg:pt-10 lg:pb-0">

        {/* ── 2-column heading ─────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-16 mb-8">
          {/* Left: label + large title */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/50">
              I Nostri Servizi
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-none">
              <span className="text-[#EB1C26]">TUTTO CIO CHE IL</span><br />
              <span className="text-white">TUO TETTO MERITA</span>
            </h2>
          </motion.div>

          {/* Right: description text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 lg:mt-0 lg:w-1/2 text-sm text-white/50 leading-relaxed max-w-md"
          >
            Dalla piccola riparazione al rifacimento completo. Interveniamo con
            professionalità, materiali certificati e tempi certi su ogni tipo di tetto.
          </motion.p>
        </div>

        {/* ── 6-card grid: 3 cols desktop, equal gap H + V, each card has its own border ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ backgroundColor: 'rgba(235,28,38,0.05)' }}
                className="group flex flex-col gap-4 p-6 cursor-default transition-colors duration-300 border border-white/15"
              >
                {/* Icon + Title on the same row */}
                <div className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-white" />
                  <h3 className="font-sans font-bold text-sm text-white leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-white leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* ── Red CTA banner — same width as grid, mt-4 gap above ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 mb-10 bg-[#EB1C26] flex items-center justify-between gap-4 px-6 py-4"
        >
          {/* Left: icon box + title + description */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="shrink-0 flex size-9 items-center justify-center border-2 border-white/60">
              <ScanLine className="size-4 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-sans font-bold text-sm text-white uppercase tracking-wider leading-none">
                Ispezione con Drone
              </p>
              <p className="text-xs text-white/75 mt-1 leading-snug">
                Rileviamo ogni anomalia prima che diventi un problema.
                Il tuo primo sopralluogo è completamente gratuito.
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <a
            href="#contatti"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Prenota ora
            <ArrowRight className="size-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
