'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { BadgeCheck, Clock, Microscope, Award } from 'lucide-react'

const features = [
  {
    icon: BadgeCheck,
    title: 'Garanzia Totale',
    desc: 'Ogni lavoro viene garantito per iscritto. Se qualcosa non va, torniamo senza costi aggiuntivi.',
  },
  {
    icon: Microscope,
    title: 'Ispezione con Drone',
    desc: 'Tecnologia al servizio della trasparenza. Vedi ogni angolo del tuo tetto prima di decidere.',
  },
  {
    icon: Clock,
    title: 'Intervento Rapido',
    desc: 'In caso di emergenza siamo operativi entro 24 ore. Perché un tetto non aspetta.',
  },
  {
    icon: Award,
    title: 'Certificazioni ISO',
    desc: 'Lavoriamo secondo gli standard europei di sicurezza e qualità. Materiali certificati.',
  },
]

const counters = [
  { end: 32, suffix: '+', label: 'Anni di Esperienza' },
  { end: 500, suffix: '+', label: 'Tetti Completati' },
  { end: 100, suffix: '%', label: 'Garanzia Soddisfazione' },
  { end: 24, suffix: 'h', label: 'Intervento Emergenza' },
]

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = Math.ceil(end / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return (
    <span ref={ref} className="font-display text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-[#EB1C26]">
      {count}
      {suffix}
    </span>
  )
}

const fadeVariant = (direction: 'left' | 'right' | 'up', delay = 0) => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    y: direction === 'up' ? 40 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="perche-noi" className="bg-[#FFFFFF] py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          variants={fadeVariant('up')}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            Perche Scegliere Noi
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-[#161616]">
            NON SOLO ARTIGIANI.{' '}
            <span className="text-[#EB1C26]">ESPERTI.</span>
          </h2>
        </motion.div>

        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E5E5E5] rounded-sm overflow-hidden mb-16">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              variants={fadeVariant('up', i * 0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="bg-white px-6 py-8 text-center"
            >
              <AnimatedCounter end={c.end} suffix={c.suffix} />
              <p className="mt-2 text-xs text-[#494949] uppercase tracking-wider">{c.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon
            const dir = i < 2 ? 'left' : 'right'
            return (
              <motion.div
                key={f.title}
                variants={fadeVariant(dir as 'left' | 'right', i * 0.1)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6 }}
                className="group flex flex-col gap-4 rounded-sm border border-[#E5E5E5] bg-white p-7 shadow-sm hover:border-[#EB1C26]/30 hover:shadow-md transition-all duration-300"
              >
                <div className="flex size-11 items-center justify-center rounded-sm bg-[#EB1C26]/8 group-hover:bg-[#EB1C26]/15 transition-colors">
                  <Icon className="size-5 text-[#EB1C26]" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-wide text-[#161616]">{f.title}</h3>
                  <p className="mt-2 text-sm text-[#494949] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
