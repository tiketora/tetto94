'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

const benefits = [
  {
    number: '01',
    problem: 'Nessun Permesso Comunale',
    detail:
      'I ponteggi richiedono autorizzazioni comunali che possono richiedere settimane. Noi operiamo senza burocrazia — interveniamo subito.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <rect x="4" y="18" width="32" height="4" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="18" y="4" width="4" height="32" rx="2" fill="currentColor" opacity="0.15" />
        <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 14L26 26M26 14L14 26" stroke="#EB1C26" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    problem: 'Zero Rischio per Cantiere',
    detail:
      'I ponteggi aumentano esponenzialmente il rischio di cadute e incidenti. Le nostre tecniche avanzate eliminano questa esposizione al pericolo.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <path d="M20 4L34 11V20C34 27.7 27.8 34.9 20 37C12.2 34.9 6 27.7 6 20V11L20 4Z" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M20 10L28 14V20C28 24.4 24.4 28.5 20 30C15.6 28.5 12 24.4 12 20V14L20 10Z" stroke="#EB1C26" strokeWidth="1.5" />
        <path d="M15 19L18.5 22.5L25 16" stroke="#EB1C26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    problem: 'Risparmio fino al 80%',
    detail:
      'Il montaggio e smontaggio dei ponteggi può costare da €3.000 a €15.000. Senza ponteggi, quei soldi rimangono in tasca tua.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M20 8V12M20 28V32M12 20H8M32 20H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <path d="M17 15C17 15 17 13 20 13C23 13 23 15.5 23 16.5C23 19 20 19 20 22M20 25V26" stroke="#EB1C26" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="20" cy="27" r="1" fill="#EB1C26" />
      </svg>
    ),
  },
  {
    number: '04',
    problem: 'Tempi Dimezzati',
    detail:
      'Montare e smontare un ponteggio richiede 2–5 giorni. Noi iniziamo il lavoro il giorno stesso del sopralluogo.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="22" r="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M20 6V10M14 8L16 11.5M8 14L11.5 16M6 20H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        <circle cx="20" cy="22" r="9" stroke="#EB1C26" strokeWidth="1.5" />
        <path d="M20 15V22L25 25" stroke="#EB1C26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

/* Real scaffolding photo with animated red circle + X overlay */
function ScaffoldingIcon({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full aspect-square overflow-hidden">
      {/* Real photo — desaturated and dark */}
      <Image
        src="/images/scaffolding.jpg"
        alt="Ponteggi complessi e costosi — Tetto94 lavora senza ponteggi"
        fill
        className="object-cover grayscale brightness-[0.8] contrast-[1.1]"
        sizes="(max-width: 768px) 90vw, 380px"
      />
      {/* Light vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#f5f5f5_100%)]" />
      {/* SVG overlay — only X and circle, perfectly centered */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {/* Animated red circle */}
        <circle
          cx="100"
          cy="100"
          r="82"
          stroke="#EB1C26"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="515"
          strokeDashoffset="0"
          className={`scaffold-circle${inView ? ' scaffold-in-view-circle' : ''}`}
        />
        {/* X — two bold diagonal lines */}
        <motion.line
          x1="35" y1="35" x2="165" y2="165"
          stroke="#EB1C26"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.line
          x1="165" y1="35" x2="35" y2="165"
          stroke="#EB1C26"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  )
}

const ticker = Array(8).fill('SENZA PONTEGGI · LAVORIAMO IN SICUREZZA · NESSUNA BUROCRAZIA · RISPARMIA FINO ALL\'80% · 10 ANNI DI GARANZIA · ')

export default function NoScaffoldingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-20%' })



  return (
    <section
      ref={sectionRef}
      id="senza-ponteggi"
      className="relative bg-[#f5f5f5] overflow-hidden"
    >
      {/* Top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#EB1C26]/60 to-transparent" />

      {/* ── HEADER ───────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 lg:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left — label + title */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#494949]">
              Il Nostro Vantaggio
            </span>
            <h2 className="mt-3 font-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] text-[#161616]">
              LAVORIAMO <span className="text-[#EB1C26]">SENZA</span><br />
              PONTEGGI.
            </h2>
          </motion.div>

          {/* Right — sub text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-sm text-sm leading-relaxed text-[#888] lg:text-right"
          >
            Da 32 anni operiamo in quota senza necessità di ponteggi.
            Tecniche avanzate, attrezzature certificate e zero compromessi
            sulla sicurezza — per te significa meno burocrazia, meno costi,
            più velocità.
          </motion.p>
        </div>
      </div>

      {/* ── MAIN CONTENT: icon left + cards right ────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">

          {/* Scaffolding icon — animated on scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6"
          >
            {/* Icon container — photo + X overlay */}
            <div className="relative w-full max-w-[320px] mx-auto">
              <ScaffoldingIcon inView={inView} />
            </div>

            {/* Badge below icon */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 border border-[#EB1C26]/30 bg-[#EB1C26]/5 px-5 py-3"
            >
              <div className="size-2 rounded-full bg-[#EB1C26] animate-pulse" />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#EB1C26]">
                Nessun ponteggio necessario
              </span>
            </motion.div>
          </motion.div>

          {/* Benefits cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border border-black/10 bg-white p-6 hover:border-[#EB1C26]/40 hover:bg-[#fff8f8] transition-all duration-300"
              >
                {/* Number */}
                <span className="font-display text-[3.5rem] leading-none text-black/5 select-none absolute top-3 right-4">
                  {b.number}
                </span>

                {/* Icon */}
                <div className="mb-4 text-[#494949] group-hover:text-[#161616] transition-colors duration-300">
                  {b.icon}
                </div>

                {/* Title */}
                <h3 className="font-sans text-sm font-bold text-[#161616] leading-snug mb-2 group-hover:text-[#EB1C26] transition-colors duration-300">
                  {b.problem}
                </h3>

                {/* Detail */}
                <p className="text-sm leading-relaxed text-[#494949]">
                  {b.detail}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-[#EB1C26] to-[#EB1C26] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TICKER STRIP ─────────────────────────────────── */}
      <div className="border-t border-black/8 py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -2400] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex gap-0 whitespace-nowrap"
        >
          {ticker.map((t, i) => (
            <span
              key={i}
              className="font-display text-[clamp(0.85rem,1.5vw,1rem)] tracking-[0.2em] text-[#494949] px-0"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-black/10 to-transparent" />
    </section>
  )
}


