'use client'

import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { BadgeCheck, Clock, Microscope, Award, Play, Volume2, VolumeX, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    icon: BadgeCheck,
    title: 'Garanzia Totale',
    desc: 'Ogni intervento è garantito per iscritto. In caso di necessità, torniamo tempestivamente senza alcun costo aggiuntivo.',
    num: '01',
    href: '/garanzie',
  },
  {
    icon: Microscope,
    title: 'Ispezione con Drone',
    desc: 'Tecnologia al servizio della trasparenza: analizziamo ogni angolo del tuo tetto per una diagnosi precisa prima di decidere.',
    num: '02',
  },
  {
    icon: Clock,
    title: 'Intervento Rapido',
    desc: "In caso di emergenza garantiamo l'uscita entro 24 ore. Perché un tetto danneggiato non può aspettare.",
    num: '03',
  },
  {
    icon: Award,
    title: 'Certificazioni ISO e Qualità',
    desc: 'Operiamo secondo i più alti standard di sicurezza e qualità, utilizzando esclusivamente materiali certificati e garantiti.',
    num: '04',
  },
]

const counters = [
  { value: '32+', label: 'Anni di\nEsperienza' },
  { value: '500+', label: 'Tetti\nCompletati' },
  { value: '100%', label: 'Garanzia\nPost-Lavoro' },
  { value: '0€', label: 'Ispezione\nDrone' },
  { value: '10', label: 'Anni di\nGaranzia' },
]

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function WhyUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  // Video state — video only loads when user clicks play (preload="none")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handlePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setPlaying(true)
    v.play()
  }, [])

  const handlePause = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    setPlaying(false)
    v.pause()
  }, [])

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  const openExpanded = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(true)
    videoRef.current?.pause()
    setPlaying(false)
  }, [])

  const closeExpanded = useCallback(() => {
    setExpanded(false)
  }, [])

  return (
    <section id="perche-noi" className="bg-white pt-10 pb-10 lg:pt-12 lg:pb-12" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-8"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            Perché Scegliere Noi
          </span>
          <h2 className="mt-2 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-[#161616]">
            NON SOLO ARTIGIANI.{' '}
            <span className="text-[#EB1C26]">ESPERTI.</span>
          </h2>
        </motion.div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 mb-10 divide-x divide-[#E5E5E5]">
          {counters.map((c, i) => (
            <motion.div
              key={c.label}
              variants={fadeUp(i * 0.08)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex flex-row items-center gap-3 px-6 py-5"
            >
              <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-[#EB1C26] font-black shrink-0">
                {c.value}
              </span>
              <p className="text-xs text-[#888] leading-snug whitespace-pre-line">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Main content: Video left — Cards right ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">

          {/* ── Video column ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Aspect ratio wrapper */}
            <div className="relative overflow-hidden bg-[#161616]" style={{ aspectRatio: '9/16' }}>

              {/* Poster — visible before play */}
              {!playing && (
                <Image
                  src="/images/video-poster.png"
                  alt="Tetto94 — Video promozionale"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={false}
                />
              )}

              {/* Video element — preload none = zero network cost until play */}
              <video
                ref={videoRef}
                src="/videos/tetto94-promo.mp4"
                preload="none"
                playsInline
                loop
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? 'opacity-100' : 'opacity-0'}`}
                onEnded={() => setPlaying(false)}
              />

              {/* Dark overlay — fades out when playing */}
              <div
                className={`absolute inset-0 bg-[#161616]/50 transition-opacity duration-500 ${playing ? 'opacity-0' : 'opacity-100'}`}
              />

              {/* Red accent line — top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#EB1C26] z-10" />

              {/* Label — top left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 border border-white/15 px-2.5 py-1 bg-black/40 backdrop-blur-sm">
                  Tetto94 — Dal 1994
                </span>
              </div>

              {/* Expand button — top right */}
              <button
                onClick={openExpanded}
                aria-label="Guarda a schermo intero"
                className="absolute top-4 right-4 z-10 size-8 border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 4V1h3M8 1h3v3M11 8v3H8M4 11H1V8" />
                </svg>
              </button>

              {/* Center play button — visible when paused */}
              <AnimatePresence>
                {!playing && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    onClick={handlePlay}
                    aria-label="Riproduci video"
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 group"
                  >
                    {/* Pulsing ring */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute size-20 rounded-full bg-[#EB1C26]/20 animate-ping" />
                      <div className="relative size-16 rounded-full bg-[#EB1C26] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Play className="size-6 text-white fill-white translate-x-0.5" />
                      </div>
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/70">
                      Guarda il Video
                    </p>
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Controls — visible when playing */}
              <AnimatePresence>
                {playing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between"
                  >
                    <button
                      onClick={handlePause}
                      aria-label="Pausa"
                      className="size-9 border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                        <rect x="0" y="0" width="3.5" height="12" />
                        <rect x="6.5" y="0" width="3.5" height="12" />
                      </svg>
                    </button>
                    <button
                      onClick={toggleMute}
                      aria-label={muted ? 'Attiva audio' : 'Silenzia'}
                      className="size-9 border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                      {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Caption below video */}
            <p className="mt-3 text-xs text-[#888] leading-relaxed">
              Risanamento professionale senza ponteggi —{' '}
              <span className="text-[#161616] font-semibold">garanzia certificata fino a 10 anni.</span>
            </p>
          </motion.div>

          {/* ── Cards column ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E5E5E5]">
            {features.map((f, i) => {
              const Icon = f.icon
              const cardClass =
                'group bg-white p-6 flex flex-col gap-4 border border-[#EB1C26] hover:bg-[#161616] transition-colors duration-500'
              const cardContent = (
                <>
                  {/* Icon */}
                  <div className="size-10 border border-[#E5E5E5] group-hover:border-[#EB1C26]/30 flex items-center justify-center transition-colors duration-500">
                    <Icon className="size-5 text-[#161616] group-hover:text-[#EB1C26] transition-colors duration-500" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-base leading-snug text-[#EB1C26] group-hover:text-white transition-colors duration-500">
                    {f.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px bg-[#E5E5E5] group-hover:bg-[#EB1C26]/20 transition-colors duration-500" />

                  {/* Description */}
                  <p className="text-xs text-[#888] group-hover:text-white/60 leading-relaxed transition-colors duration-500">
                    {f.desc}
                  </p>
                </>
              )

              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp(0.15 + i * 0.1)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                >
                  {f.href ? (
                    <Link href={f.href} className={cardClass}>
                      {cardContent}
                    </Link>
                  ) : (
                    <div className={`${cardClass} cursor-default`}>{cardContent}</div>
                  )}
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>

      {/* ── Expanded / fullscreen modal ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeExpanded}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md"
              onClick={e => e.stopPropagation()}
              style={{ aspectRatio: '9/16' }}
            >
              <video
                src="/videos/tetto94-promo.mp4"
                autoPlay
                playsInline
                controls
                className="w-full h-full object-contain"
              />
              <button
                onClick={closeExpanded}
                aria-label="Chiudi"
                className="absolute -top-10 right-0 size-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
