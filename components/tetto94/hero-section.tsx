// 'use client'

// import { motion } from 'framer-motion'
// import { ChevronDown } from 'lucide-react'
// import Image from 'next/image'

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: { staggerChildren: 0.15, delayChildren: 0.3 },
//   },
// }

// const lineVariants = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//   },
// }

// const fadeUp = {
//   hidden: { opacity: 0, y: 32 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.7, ease: 'easeOut' },
//   },
// }

// const stats = [
//   { value: '32+', label: 'Anni di Esperienza' },
//   { value: '500+', label: 'Tetti Completati' },
//   { value: '100%', label: 'Garanzia Post-Lavoro' },
//   { value: '0€', label: 'Ispezione Drone' },
// ]

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
//       {/* Background image with parallax-like scale */}
//       <motion.div
//         className="absolute inset-0 z-0"
//         initial={{ scale: 1.08 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
//       >
//         <Image
//           src="/images/hero-roof.jpg"
//           alt="Tetto italiano in cotto restaurato da Tetto94"
//           fill
//           priority
//           className="object-cover object-center"
//           sizes="100vw"
//         />
//       </motion.div>

//       {/* Gradient overlay — dark from bottom, lighter on top */}
//       <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#161616] via-[#161616]/60 to-[#161616]/30" />

//       {/* Subtle diagonal red accent */}
//       <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-[#EB1C26]" />

//       {/* Content */}
//       <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="inline-flex items-center gap-2 rounded-full border border-[#EB1C26]/40 bg-[#EB1C26]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#EB1C26] mb-6"
//         >
//           <span className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
//           Esperti del Tetto dal 1994
//         </motion.div>

//         {/* Main heading — stagger lines */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="overflow-hidden"
//         >
//           <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-white text-balance">
//             MAESTRIA
//           </motion.h1>
//           <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-[#EB1C26] text-balance">
//             IN OGNI DETTAGLIO
//           </motion.h1>
//           <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-white text-balance">
//             SICUREZZA SU OGNI TETTO
//           </motion.h1>
//         </motion.div>

//         {/* Subtitle */}
//         <motion.p
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 0.9 }}
//           className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed text-pretty"
//         >
//           Riparazioni, rifacimenti, impermeabilizzazione e ispezione gratuita con drone.
//           Oltre 30 anni al servizio dei tetti italiani.
//         </motion.p>

//         {/* CTA Buttons */}
//         <motion.div
//           variants={fadeUp}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 1.1 }}
//           className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <motion.a
//             href="#contatti"
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.97 }}
//             className="relative rounded-sm bg-[#EB1C26] px-8 py-4 text-base font-bold text-white uppercase tracking-wider animate-pulse-ring shadow-lg shadow-[#EB1C26]/30"
//           >
//             Ispezione GRATUITA con Drone
//           </motion.a>
//           <motion.a
//             href="#galleria"
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.97 }}
//             className="rounded-sm border border-white/40 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white uppercase tracking-wider hover:bg-white/10 transition-colors"
//           >
//             Guarda i Lavori
//           </motion.a>
//         </motion.div>
//       </div>

//       {/* Stats bar */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
//         className="relative z-20 w-full max-w-5xl mx-auto px-6 mt-16"
//       >
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-sm overflow-hidden">
//           {stats.map((stat) => (
//             <div key={stat.label} className="bg-[#161616]/80 backdrop-blur-sm px-6 py-5 text-center">
//               <div className="font-display text-4xl text-[#EB1C26] leading-none">{stat.value}</div>
//               <div className="mt-1 text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       {/* Scroll caret */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
//       >
//         <ChevronDown className="size-6 text-white/40 animate-scroll-caret" />
//       </motion.div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative bg-[#161616] overflow-hidden pt-[72px]">

      {/* ══ DESKTOP (≥ lg): 2-col side-by-side — unchanged ══ */}
      <div className="hidden lg:flex flex-row min-h-[calc(100vh-72px)]">

        {/* LEFT — text */}
        <div className="relative z-10 flex flex-col justify-center pt-16 pb-14 pl-16 xl:pl-24 w-[54%] pr-6">
          <div>
            <motion.div
              custom={0.2} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] text-white"
            >
              MAESTRIA <span className="text-[#EB1C26]">IN OGNI</span>
            </motion.div>
            <motion.div
              custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95]"
            >
              <span className="text-[#EB1C26]">DETTAGLIO</span>
              <span className="text-white"> SICUREZZA</span>
            </motion.div>
            <motion.div
              custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
              className="font-display text-[clamp(2.6rem,5.5vw,5rem)] leading-[0.95] text-white"
            >
              SU OGNI TETTO
            </motion.div>
          </div>
          <motion.p
            custom={0.7} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-6 text-sm text-white/60 max-w-sm leading-relaxed"
          >
            Riparazioni, rifacimenti, impermeabilizzazione
            e ispezione gratuita con drone. Oltre 30 anni al
            servizio dei tetti italiani.
          </motion.p>
          <motion.div
            custom={0.9} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.a href="#contatti" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center bg-[#EB1C26] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider"
            >
              Ispezione gratuita con drone
            </motion.a>
            <motion.a href="#galleria" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center border border-white/30 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wider hover:border-white/60 transition-colors"
            >
              Guarda i Lavori
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT — diagonal PNG */}
        <div className="relative w-[46%] bg-[#161616]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/hero-roof-diagonal.png"
              alt="Tetto italiano restaurato da Tetto94"
              fill priority
              className="object-contain object-right-top"
              sizes="46vw"
            />
          </motion.div>
        </div>
      </div>

      {/* ══ MOBILE (< lg): stacked — heading → photo → text + CTA ══ */}
      <div className="flex flex-col lg:hidden">

        {/* 1) Heading */}
        <motion.div
          custom={0.1} variants={fadeUp} initial="hidden" animate="visible"
          className="px-5 pt-8"
        >
          <div className="font-display text-[2.4rem] leading-[0.93] text-white">
            MAESTRIA <span className="text-[#EB1C26]">IN OGNI</span>
          </div>
          <div className="font-display text-[2.4rem] leading-[0.93]">
            <span className="text-[#EB1C26]">DETTAGLIO</span>
            <span className="text-white"> SICUREZZA</span>
          </div>
          <div className="font-display text-[2.4rem] leading-[0.93] text-white">
            SU OGNI TETTO
          </div>
        </motion.div>

        {/* 2) Full-width clean roof photo with red top border */}
        <motion.div
          className="relative w-full mt-5 border-t-[3px] border-[#EB1C26]"
          style={{ height: '56vw', minHeight: 200 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Image
            src="/images/hero-roof-mobile.jpg"
            alt="Tetto italiano restaurato da Tetto94"
            fill priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        {/* 3) Description + CTA */}
        <motion.div
          custom={0.45} variants={fadeUp} initial="hidden" animate="visible"
          className="px-5 pt-6 pb-10"
        >
          <p className="text-sm text-white/60 leading-relaxed max-w-sm">
            Riparazioni, rifacimenti, impermeabilizzazione
            e ispezione gratuita con drone. Oltre 30 anni al
            servizio dei tetti italiani.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contatti"
              className="inline-flex items-center justify-center bg-[#EB1C26] px-5 py-3 text-sm font-bold text-white uppercase tracking-wider"
            >
              Ispezione gratuita con drone
            </a>
            <a href="#galleria"
              className="inline-flex items-center justify-center border border-white/30 px-5 py-3 text-sm font-semibold text-white uppercase tracking-wider"
            >
              Guarda i lavori
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
