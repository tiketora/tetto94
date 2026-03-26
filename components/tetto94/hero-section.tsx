'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const stats = [
  { value: '32+', label: 'Anni di Esperienza' },
  { value: '500+', label: 'Tetti Completati' },
  { value: '100%', label: 'Garanzia Post-Lavoro' },
  { value: '0€', label: 'Ispezione Drone' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image with parallax-like scale */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/images/hero-roof.jpg"
          alt="Tetto italiano in cotto restaurato da Tetto94"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay — dark from bottom, lighter on top */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#161616] via-[#161616]/60 to-[#161616]/30" />

      {/* Subtle diagonal red accent */}
      <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-[#EB1C26]" />

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#EB1C26]/40 bg-[#EB1C26]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#EB1C26] mb-6"
        >
          <span className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
          Esperti del Tetto dal 1994
        </motion.div>

        {/* Main heading — stagger lines */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden"
        >
          <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-white text-balance">
            MAESTRIA
          </motion.h1>
          <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-[#EB1C26] text-balance">
            IN OGNI DETTAGLIO
          </motion.h1>
          <motion.h1 variants={lineVariants} className="font-display text-[clamp(3.5rem,9vw,8rem)] leading-none text-white text-balance">
            SICUREZZA SU OGNI TETTO
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          Riparazioni, rifacimenti, impermeabilizzazione e ispezione gratuita con drone.
          Oltre 30 anni al servizio dei tetti italiani.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#contatti"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative rounded-sm bg-[#EB1C26] px-8 py-4 text-base font-bold text-white uppercase tracking-wider animate-pulse-ring shadow-lg shadow-[#EB1C26]/30"
          >
            Ispezione GRATUITA con Drone
          </motion.a>
          <motion.a
            href="#galleria"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-sm border border-white/40 bg-white/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Guarda i Lavori
          </motion.a>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-5xl mx-auto px-6 mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-sm overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#161616]/80 backdrop-blur-sm px-6 py-5 text-center">
              <div className="font-display text-4xl text-[#EB1C26] leading-none">{stat.value}</div>
              <div className="mt-1 text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll caret */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20"
      >
        <ChevronDown className="size-6 text-white/40 animate-scroll-caret" />
      </motion.div>
    </section>
  )
}
