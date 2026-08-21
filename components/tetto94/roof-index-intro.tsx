// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import {
//   motion,
//   useInView,
//   useMotionValue,
//   useScroll,
//   useSpring,
//   useTransform,
//   animate,
// } from 'framer-motion'
// import { ShieldCheck, Camera, FileCheck2, ArrowDown, ArrowRight } from 'lucide-react'
// import { trackCTAClick } from '@/lib/gtag'

// /* ─────────────────────────────────────────────────────────────────────────
//    Count-up number — animates from 0 to `value` once the element scrolls
//    into view. Kept dependency-free (framer-motion only, already installed).
//    ───────────────────────────────────────────────────────────────────────── */
// function CountUp({
//   value,
//   suffix = '',
//   duration = 1.6,
//   className,
// }: {
//   value: number
//   suffix?: string
//   duration?: number
//   className?: string
// }) {
//   const ref = useRef<HTMLSpanElement>(null)
//   const inView = useInView(ref, { once: true, margin: '-10%' })
//   const motionValue = useMotionValue(0)
//   const [display, setDisplay] = useState(0)

//   useEffect(() => {
//     if (!inView) return
//     const controls = animate(motionValue, value, {
//       duration,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     })
//     return () => controls.stop()
//   }, [inView, value, duration, motionValue])

//   return (
//     <span ref={ref} className={className}>
//       {display}
//       {suffix}
//     </span>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────────────
//    Kinetic heading — each word reveals with a staggered clip/translate,
//    simulating the "text builds itself" effect on first paint.
//    ───────────────────────────────────────────────────────────────────────── */
// function KineticHeading({
//   words,
//   className,
// }: {
//   words: { text: string; accent?: boolean }[]
//   className?: string
// }) {
//   return (
//     <h1 className={className}>
//       {words.map((w, i) => (
//         <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
//           <motion.span
//             initial={{ y: '110%' }}
//             animate={{ y: '0%' }}
//             transition={{ duration: 0.85, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
//             className={`inline-block ${w.accent ? 'text-[#EB1C26]' : ''}`}
//           >
//             {w.text}
//           </motion.span>
//         </span>
//       ))}
//     </h1>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────────────
//    Steps — "Come funziona" with a scroll-driven connecting line that draws
//    itself as the section crosses the viewport.
//    ───────────────────────────────────────────────────────────────────────── */
// const STEPS = [
//   {
//     icon: ShieldCheck,
//     tag: '01',
//     title: 'Analisi Tecnica',
//     desc: 'Rispondi a 7 domande guidate sul tuo tetto: zona, età, materiale, problemi visibili.',
//   },
//   {
//     icon: Camera,
//     tag: '02',
//     title: 'Sopralluogo con Drone',
//     desc: 'Un nostro tecnico programma un\u2019ispezione gratuita con drone certificato, senza ponteggi.',
//   },
//   {
//     icon: FileCheck2,
//     tag: '03',
//     title: 'Preventivo in 24h',
//     desc: 'Ricevi una stima scritta e trasparente, con garanzia 10 anni, entro un giorno lavorativo.',
//   },
// ]

// function HowItWorks({ onCtaClick }: { onCtaClick: () => void }) {
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const inView = useInView(sectionRef, { once: true, margin: '-15%' })
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ['start 75%', 'end 55%'],
//   })
//   const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

//   return (
//     <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//         className="mb-14 text-center lg:mb-20"
//       >
//         <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">
//           Come Funziona
//         </span>
//         <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/50">
//           Un percorso semplice, pensato per darti una risposta chiara sullo stato del tuo tetto —
//           senza sopralluoghi invasivi né impegni.
//         </p>
//       </motion.div>

//       {/* Connecting line — desktop only, draws on scroll */}
//       <div className="pointer-events-none absolute inset-x-[16%] top-[7.5rem] hidden h-px lg:block">
//         <div className="h-px w-full bg-white/10" />
//         <motion.div
//           style={{ scaleX: lineScale }}
//           className="absolute inset-0 h-px origin-left bg-[#EB1C26]"
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
//         {STEPS.map((step, i) => {
//           const Icon = step.icon
//           return (
//             <motion.div
//               key={step.tag}
//               initial={{ opacity: 0, y: 32 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
//             >
//               <div className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-full border border-white/15 bg-[#0d0d0d]">
//                 <Icon className="size-6 text-[#EB1C26]" strokeWidth={1.75} />
//               </div>
//               <span className="font-display text-xs tracking-[0.3em] text-white/30">
//                 {step.tag}
//               </span>
//               <h3 className="mt-2 font-sans text-lg font-bold text-white">{step.title}</h3>
//               <p className="mt-2 text-sm leading-relaxed text-white/50">{step.desc}</p>
//             </motion.div>
//           )
//         })}
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 16 }}
//         animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.6, delay: 0.65 }}
//         className="mt-16 flex justify-center lg:mt-20"
//       >
//         <button
//           onClick={onCtaClick}
//           className="group inline-flex items-center gap-2 border border-white/20 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-[#EB1C26] hover:bg-[#EB1C26]"
//         >
//           Inizia l&apos;Analisi Gratuita
//           <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
//         </button>
//       </motion.div>
//     </div>
//   )
// }

// /* ─────────────────────────────────────────────────────────────────────────
//    Main export
//    ───────────────────────────────────────────────────────────────────────── */
// export default function RoofIndexIntro({ targetId }: { targetId: string }) {
//   const heroRef = useRef<HTMLDivElement>(null)
//   const rootRef = useRef<HTMLDivElement>(null)
//   const heroInView = useInView(heroRef, { margin: '-40% 0px 0px 0px' })
//   const [calculatorReached, setCalculatorReached] = useState(false)
//   const showSticky = !heroInView && !calculatorReached

//   const { scrollYProgress } = useScroll({ target: rootRef })
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.3])
//   const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -40])

//   useEffect(() => {
//     // The calculator itself lives outside this component (rendered by the
//     // page below the intro), so we watch it by id: once it enters the
//     // viewport the floating "Vai all'Analisi" CTA hides — it would
//     // otherwise float redundantly on top of the quiz UI it just led to.
//     const target = document.getElementById(targetId)
//     if (!target) return
//     const observer = new IntersectionObserver(
//       ([entry]) => setCalculatorReached(entry.isIntersecting),
//       { threshold: 0.15 }
//     )
//     observer.observe(target)
//     return () => observer.disconnect()
//   }, [targetId])

//   function scrollToCalculator(source: 'roof_index_intro_hero' | 'roof_index_intro_steps' | 'roof_index_intro_sticky') {
//     trackCTAClick(source)
//     document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
//   }

//   return (
//     <div ref={rootRef} className="relative bg-[#0d0d0d]">
//       {/* ── HERO ──────────────────────────────────────────────────────── */}
//       <motion.div
//         ref={heroRef}
//         style={{ opacity: heroOpacity, y: heroY }}
//         className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
//       >
//         {/* subtle red glow, anchored (not decorative-only: reinforces the brand accent behind the kinetic headline) */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EB1C26]/10 blur-[120px]"
//         />

//         <motion.span
//           initial={{ opacity: 0, y: 12 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.05 }}
//           className="relative z-10 mb-6 inline-flex items-center gap-2 border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white/60"
//         >
//           <span className="size-1.5 rounded-full bg-[#EB1C26]" style={{ animation: 'pulse-ring 2s infinite' }} />
//           Analisi Tecnica Gratuita
//         </motion.span>

//         <KineticHeading
//           className="relative z-10 font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.94] text-white"
//           words={[
//             { text: 'T94' },
//             { text: 'ROOF' },
//             { text: 'INDEX' },
//             { text: '\u2122', accent: true },
//           ]}
//         />

//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.65 }}
//           className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 lg:text-lg"
//         >
//           Scopri in 2 minuti il livello di rischio del tuo tetto, con la stessa metodologia che
//           usiamo da 32 anni sui tetti del Nord-Est Italia.
//         </motion.p>

//         {/* Trust stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.8 }}
//           className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
//         >
//           <div className="flex flex-col items-center">
//             <span className="font-display text-3xl text-white lg:text-4xl">
//               <CountUp value={32} />
//             </span>
//             <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
//               Anni di Esperienza
//             </span>
//           </div>
//           <div className="hidden h-10 w-px bg-white/10 sm:block" />
//           <div className="flex flex-col items-center">
//             <span className="font-display text-3xl text-white lg:text-4xl">
//               <CountUp value={1200} suffix="+" />
//             </span>
//             <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
//               Tetti Analizzati
//             </span>
//           </div>
//           <div className="hidden h-10 w-px bg-white/10 sm:block" />
//           <div className="flex flex-col items-center">
//             <span className="font-display text-3xl text-white lg:text-4xl">
//               <CountUp value={10} suffix=" anni" />
//             </span>
//             <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
//               Garanzia Scritta
//             </span>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.95 }}
//           className="relative z-10 mt-10 flex flex-col items-center gap-3"
//         >
//           <button
//             onClick={() => scrollToCalculator('roof_index_intro_hero')}
//             className="group inline-flex items-center gap-2 bg-[#EB1C26] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
//           >
//             Inizia l&apos;Analisi Gratuita
//             <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
//           </button>
//           <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/35">
//             Gratuito &middot; 2 minuti &middot; Nessun impegno
//           </span>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 1.3 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2"
//         >
//           <ArrowDown className="size-5 text-white/30" style={{ animation: 'bob 2s ease-in-out infinite' }} />
//         </motion.div>
//       </motion.div>

//       {/* ── COME FUNZIONA ────────────────────────────────────────────── */}
//       <HowItWorks onCtaClick={() => scrollToCalculator('roof_index_intro_steps')} />

//       {/* ── Sticky CTA — visible once hero scrolls out, hidden again once
//              the calculator itself is reached (avoids a duplicate CTA) ── */}
//       <motion.button
//         onClick={() => scrollToCalculator('roof_index_intro_sticky')}
//         initial={false}
//         animate={{ opacity: showSticky ? 1 : 0, y: showSticky ? 0 : 16 }}
//         transition={{ duration: 0.3 }}
//         style={{ pointerEvents: showSticky ? 'auto' : 'none' }}
//         className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap bg-[#EB1C26] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:scale-[1.04] sm:bottom-8"
//       >
//         Vai all&apos;Analisi
//         <ArrowRight className="size-3.5" />
//       </motion.button>
//     </div>
//   )
// }

'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  animate,
} from 'framer-motion'
import { ShieldCheck, Camera, FileCheck2, ArrowDown, ArrowRight } from 'lucide-react'
import { trackCTAClick } from '@/lib/gtag'

/* ─────────────────────────────────────────────────────────────────────────
   Count-up number — animates from 0 to `value` once the element scrolls
   into view. Kept dependency-free (framer-motion only, already installed).
   ───────────────────────────────────────────────────────────────────────── */
function CountUp({
  value,
  suffix = '',
  duration = 1.6,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, motionValue])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Kinetic heading — each word reveals with a staggered clip/translate,
   simulating the "text builds itself" effect on first paint.
   ───────────────────────────────────────────────────────────────────────── */
function KineticHeading({
  words,
  className,
}: {
  words: { text: string; accent?: boolean }[]
  className?: string
}) {
  return (
    <h1 className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${w.accent ? 'text-[#EB1C26]' : ''}`}
          >
            {w.text}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Steps — "Come funziona" with a scroll-driven connecting line that draws
   itself as the section crosses the viewport.
   ───────────────────────────────────────────────────────────────────────── */
const STEPS = [
  {
    icon: ShieldCheck,
    tag: '01',
    title: 'Analisi Tecnica',
    desc: 'Rispondi a 7 domande guidate sul tuo tetto: zona, età, materiale, problemi visibili.',
  },
  {
    icon: Camera,
    tag: '02',
    title: 'Sopralluogo con Drone',
    desc: 'Un nostro tecnico programma un\u2019ispezione gratuita con drone certificato, senza ponteggi.',
  },
  {
    icon: FileCheck2,
    tag: '03',
    title: 'Preventivo in 24h',
    desc: 'Ricevi una stima scritta e trasparente, con garanzia 10 anni, entro un giorno lavorativo.',
  },
]

function HowItWorks({ onCtaClick }: { onCtaClick: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15%' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center lg:mb-20"
      >
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#161616]/40">
          Come Funziona
        </span>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#161616]/55">
          Un percorso semplice, pensato per darti una risposta chiara sullo stato del tuo tetto —
          senza sopralluoghi invasivi né impegni.
        </p>
      </motion.div>

      {/* Connecting line — desktop only, draws on scroll */}
      <div className="pointer-events-none absolute inset-x-[16%] top-[7.5rem] hidden h-px lg:block">
        <div className="h-px w-full bg-[#161616]/10" />
        <motion.div
          style={{ scaleX: lineScale }}
          className="absolute inset-0 h-px origin-left bg-[#EB1C26]"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
        {STEPS.map((step, i) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.tag}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <div className="relative z-10 mb-5 flex size-14 items-center justify-center rounded-full border border-[#161616]/12 bg-white shadow-[0_2px_16px_rgba(22,22,22,0.06)]">
                <Icon className="size-6 text-[#EB1C26]" strokeWidth={1.75} />
              </div>
              <span className="font-display text-xs tracking-[0.3em] text-[#161616]/30">
                {step.tag}
              </span>
              <h3 className="mt-2 font-sans text-lg font-bold text-[#161616]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#494949]">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="mt-16 flex justify-center lg:mt-20"
      >
        <button
          onClick={onCtaClick}
          className="group inline-flex items-center gap-2 border border-[#161616]/15 bg-transparent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-[#161616] transition-all duration-300 hover:border-[#EB1C26] hover:bg-[#EB1C26] hover:text-white"
        >
          Inizia l&apos;Analisi Gratuita
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   Main export
   ───────────────────────────────────────────────────────────────────────── */
export default function RoofIndexIntro({ targetId }: { targetId: string }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { margin: '-40% 0px 0px 0px' })
  const [calculatorReached, setCalculatorReached] = useState(false)
  const showSticky = !heroInView && !calculatorReached

  const { scrollYProgress } = useScroll({ target: rootRef })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0.3])
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, -40])

  useEffect(() => {
    // The calculator itself lives outside this component (rendered by the
    // page below the intro), so we watch it by id: once it enters the
    // viewport the floating "Vai all'Analisi" CTA hides — it would
    // otherwise float redundantly on top of the quiz UI it just led to.
    const target = document.getElementById(targetId)
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => setCalculatorReached(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetId])

  function scrollToCalculator(source: 'roof_index_intro_hero' | 'roof_index_intro_steps' | 'roof_index_intro_sticky') {
    trackCTAClick(source)
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div ref={rootRef} className="relative bg-white">
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-40 text-center md:pt-48"
      >
        {/* subtle red glow, anchored (not decorative-only: reinforces the brand accent behind the kinetic headline) */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EB1C26]/[0.06] blur-[120px]"
        />
        {/* faint architectural grid, grounds the light background so it doesn't feel empty */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #161616 1px, transparent 1px), linear-gradient(to bottom, #161616 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="relative z-10 mb-6 inline-flex items-center gap-2 border border-[#161616]/12 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-[#161616]/60 shadow-[0_2px_20px_rgba(22,22,22,0.05)]"
        >
          <span className="size-1.5 rounded-full bg-[#EB1C26]" style={{ animation: 'pulse-ring 2s infinite' }} />
          Analisi Tecnica Gratuita
        </motion.span>

        <KineticHeading
          className="relative z-10 font-display text-[clamp(2.6rem,9vw,7rem)] leading-[0.94] text-[#161616]"
          words={[
            { text: 'T94' },
            { text: 'ROOF' },
            { text: 'INDEX' },
            { text: '\u2122', accent: true },
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="relative z-10 mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#494949] lg:text-lg"
        >
          Scopri in 2 minuti il livello di rischio del tuo tetto, con la stessa metodologia che
          usiamo da 32 anni sui tetti del Nord-Est Italia.
        </motion.p>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl text-[#161616] lg:text-4xl">
              <CountUp value={32} />
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">
              Anni di Esperienza
            </span>
          </div>
          <div className="hidden h-10 w-px bg-[#161616]/10 sm:block" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl text-[#161616] lg:text-4xl">
              <CountUp value={1200} suffix="+" />
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">
              Tetti Analizzati
            </span>
          </div>
          <div className="hidden h-10 w-px bg-[#161616]/10 sm:block" />
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl text-[#161616] lg:text-4xl">
              <CountUp value={10} suffix=" anni" />
            </span>
            <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#161616]/40">
              Garanzia Scritta
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="relative z-10 mt-10 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => scrollToCalculator('roof_index_intro_hero')}
            className="group inline-flex items-center gap-2 bg-[#EB1C26] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_24px_rgba(235,28,38,0.25)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
          >
            Inizia l&apos;Analisi Gratuita
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#161616]/35">
            Gratuito &middot; 2 minuti &middot; Nessun impegno
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="size-5 text-[#161616]/25" style={{ animation: 'bob 2s ease-in-out infinite' }} />
        </motion.div>
      </motion.div>

      {/* ── COME FUNZIONA ────────────────────────────────────────────── */}
      <HowItWorks onCtaClick={() => scrollToCalculator('roof_index_intro_steps')} />

      {/* ── Sticky CTA — visible once hero scrolls out, hidden again once
             the calculator itself is reached (avoids a duplicate CTA) ── */}
      <motion.button
        onClick={() => scrollToCalculator('roof_index_intro_sticky')}
        initial={false}
        animate={{ opacity: showSticky ? 1 : 0, y: showSticky ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showSticky ? 'auto' : 'none' }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-2 whitespace-nowrap bg-[#EB1C26] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_8px_30px_rgba(22,22,22,0.25)] transition-transform duration-300 hover:scale-[1.04] sm:bottom-8"
      >
        Vai all&apos;Analisi
        <ArrowRight className="size-3.5" />
      </motion.button>
    </div>
  )
}
