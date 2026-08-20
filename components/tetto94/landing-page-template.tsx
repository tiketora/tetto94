'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Phone, CheckCircle2, Star, Shield, Clock, Award, ChevronRight } from 'lucide-react'
import Tetto94Logo from '@/components/tetto94/logo'
import LPForm from '@/components/tetto94/lp-form'
import BeforeAfterSlider from '@/components/tetto94/before-after-slider'
import { trackPhoneClick } from '@/lib/gtag'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import type { LandingPageConfig } from '@/data/landing-pages'

const PHONE = '+39 351 651 9363'
const PHONE_TEL = 'tel:+393516519363'

const USP_BULLETS = [
  'Lavoriamo senza ponteggi',
  'Ispezione con drone gratuita',
  '32+ anni di esperienza',
]

const STATS = [
  { value: '32+', label: 'Anni di esperienza' },
  { value: '500+', label: 'Lavori completati' },
]

const REVIEWS = [
  {
    name: 'Marco Ferretti',
    city: 'Venezia',
    rating: 5,
    text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile. Consigliato al 100%.",
  },
  {
    name: 'Giulia Marchetti',
    city: 'Mestre',
    rating: 5,
    text: 'Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità, rispetto dei tempi. Ottimo rapporto qualità/prezzo.',
  },
]

const NO_SCAFFOLDING_BULLETS = [
  'Nessun permesso comunale necessario — interveniamo subito',
  'Zero rischio cantiere — tecniche avanzate e certificate',
  'Risparmio fino all\'80% sui costi di ponteggio',
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="size-3.5 fill-[#EB1C26] text-[#EB1C26]" />
      ))}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
      {children}
    </span>
  )
}

interface Props {
  config: LandingPageConfig
}

export default function LandingPageTemplate({ config }: Props) {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

  const beforeAfterRef = useRef(null)
  const beforeAfterInView = useInView(beforeAfterRef, { once: true, margin: '-10%' })

  const noScaffRef = useRef(null)
  const noScaffInView = useInView(noScaffRef, { once: true, margin: '-10%' })

  const reviewsRef = useRef(null)
  const reviewsInView = useInView(reviewsRef, { once: true, margin: '-10%' })

  const pricingRef = useRef(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: '-10%' })

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ─────────────────────────────────────────────────────
          MOBILE STICKY PHONE BAR
      ───────────────────────────────────────────────────── */}
      <a
        href={PHONE_TEL}
        onClick={() => trackPhoneClick('lp_mobile_sticky')}
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white sm:hidden"
        aria-label={`Chiama Tetto94: ${PHONE}`}
      >
        <Phone className="size-4" />
        Chiama ora — {PHONE}
      </a>

      {/* ─────────────────────────────────────────────────────
          01 · HEADER — Logo only + phone, zero nav
      ───────────────────────────────────────────────────── */}
      <header className="border-b border-white/8 bg-[#161616]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <Tetto94Logo className="h-12 w-auto" alt="Tetto94" />
          <a
            href={PHONE_TEL}
            onClick={() => trackPhoneClick('lp_header')}
            className="hidden sm:flex items-center gap-2 text-sm font-bold text-white hover:text-[#EB1C26] transition-colors"
            aria-label={`Chiama Tetto94: ${PHONE}`}
          >
            <div className="flex size-8 items-center justify-center bg-[#EB1C26]">
              <Phone className="size-3.5 text-white" />
            </div>
            {PHONE}
          </a>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────
          02 · HERO — H1 + subheadline + USPs + form (above fold)
      ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-roof-mobile.png"
            alt={`Rifacimento tetto in ${config.region} — Tetto94`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#161616]/80" />
          <div className="absolute inset-0 bg-linear-to-r from-[#161616]/95 via-[#161616]/65 to-[#161616]/25" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">

            {/* Left — copy */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 border border-[#EB1C26]/30 bg-[#EB1C26]/10 px-3 py-1.5 self-start"
              >
                <div className="size-1.5 rounded-full bg-[#EB1C26] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#EB1C26]">
                  Dal 1994 · {config.region}
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-white text-balance"
              >
                {config.h1}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="text-base text-white/70 leading-relaxed max-w-md"
              >
                {config.subheadline}
              </motion.p>

              {/* USP bullets */}
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col gap-2.5"
              >
                {USP_BULLETS.map((usp, i) => (
                  <motion.li
                    key={usp}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
                    className="flex items-center gap-2.5 text-sm text-white/85"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-[#EB1C26]" />
                    {usp}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Desktop phone link */}
              <motion.a
                href={PHONE_TEL}
                onClick={() => trackPhoneClick('lp_hero')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="hidden sm:flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors self-start"
              >
                <Phone className="size-3.5" />
                Preferisci chiamare? {PHONE}
              </motion.a>
            </div>

            {/* Right — form (above fold on desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
                  Sopralluogo gratuito in {config.region}
                </p>
                <p className="text-white/60 text-sm">
                  Compila il modulo — ti richiamiamo entro 24 ore.
                </p>
              </div>
              <LPForm region={config.region} formId="lp-form-top" pageId={config.pageId} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          05 · BEFORE / AFTER PHOTOS (static, side-by-side)
      ───────────────────────────────────────────────────── */}
      <section ref={beforeAfterRef} className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-[#161616]/8">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <SectionLabel>I Nostri Lavori</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              PRIMA E <span className="text-[#EB1C26]">DOPO</span>
            </h2>
            <p className="mt-3 text-sm text-[#161616]/50 max-w-md mx-auto">
              Ogni intervento eseguito in {config.region} è documentato con foto professionali prima e dopo i lavori.
            </p>
          </motion.div>

          {/* Static side-by-side — faster than slider, better conversion */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={beforeAfterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <BeforeAfterSlider
              beforeSrc="/images/before-roof.jpg"
              afterSrc="/images/after-roof.jpg"
              beforeAlt={`Tetto prima del rifacimento in ${config.region}`}
              afterAlt={`Tetto dopo il rifacimento in ${config.region} — Tetto94`}
            />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          06 · SENZA PONTEGGI — repurposed, 2-3 bullets
      ───────────────────────────────────────────────────── */}
      <section ref={noScaffRef} className="bg-white py-16 lg:py-20 border-t border-[#161616]/8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Il Nostro Vantaggio</SectionLabel>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[0.95] text-[#161616]">
                LAVORIAMO{' '}
                <span className="text-[#EB1C26]">SENZA</span>{' '}
                PONTEGGI.
              </h2>
              <p className="mt-4 text-sm text-[#161616]/55 leading-relaxed max-w-md">
                In {config.region} operiamo da 32 anni senza ponteggi. Tecniche avanzate, attrezzature certificate e zero compromessi sulla sicurezza.
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, x: 24 }}
              animate={noScaffInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {NO_SCAFFOLDING_BULLETS.map((bullet, i) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, y: 16 }}
                  animate={noScaffInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex items-start gap-3 border border-[#161616]/10 bg-[#161616]/4 p-4"
                >
                  <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center bg-[#EB1C26]">
                    <CheckCircle2 className="size-3 text-white" />
                  </div>
                  <span className="text-sm text-[#161616]/70 leading-snug">{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          07 · STATS BAR — 2 numbers only
      ───────────────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-[#EB1C26] py-10 border-t border-[#c91520]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <span className="font-display text-[clamp(3rem,8vw,5rem)] leading-none text-white">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────����────────────────────────────
          08 · 2 CLIENT REVIEWS
      ───────────────────────────────────────────────────── */}
      <section ref={reviewsRef} className="bg-[#F5F5F5] py-16 lg:py-20 border-t border-[#161616]/8">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <SectionLabel>Testimonianze</SectionLabel>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              COSA DICONO I NOSTRI <span className="text-[#EB1C26]">CLIENTI</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
            {REVIEWS.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 28 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="border border-[#161616]/10 bg-white p-6 flex flex-col gap-4"
              >
                <StarRating rating={review.rating} />
                <p className="text-sm text-[#161616]/65 leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-[#161616]/8">
                  <div className="flex size-9 items-center justify-center bg-[#EB1C26] font-display text-base text-white shrink-0">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#161616]">{review.name}</p>
                    <p className="text-xs text-[#161616]/40">{review.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          09 · PRICING ANCHOR + FINAL CTA FORM (repeated)
      ───────────────────────────────────────────────────── */}
      <section ref={pricingRef} className="bg-white py-16 lg:py-20 border-t border-[#161616]/8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

            {/* Pricing anchor */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div>
                <SectionLabel>Prezzi Trasparenti</SectionLabel>
                <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-[0.95] text-[#161616]">
                  INTERVENTI IN {config.region.toUpperCase()} A PARTIRE DA:
                </h2>
              </div>

              {/* Price display */}
              <div className="border border-[#161616]/10 bg-[#F5F5F5] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40 mb-3">
                  Interventi a partire da
                </p>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-sm text-[#161616]/35 line-through font-sans">€ 1.600</span>
                  <span className="font-display text-[3.5rem] leading-none text-[#EB1C26]">€ 1.100</span>
                </div>
                <ul className="flex flex-col gap-2 mt-4 border-t border-[#161616]/8 pt-4">
                  {[
                    { icon: Shield, text: 'Garanzia scritta 10 anni' },
                    { icon: Award, text: 'Materiali certificati CE' },
                    { icon: Clock, text: 'Preventivo entro 24 ore' },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2 text-xs text-[#161616]/55">
                      <Icon className="size-3.5 shrink-0 text-[#EB1C26]" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-[#161616]/35 leading-relaxed">
                Il preventivo definitivo viene fornito dopo il sopralluogo gratuito con drone. Nessun costo nascosto.
              </p>
            </motion.div>

            {/* Repeated CTA form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#161616]/40 mb-1">
                  Richiedi il tuo sopralluogo
                </p>
                <p className="text-[#161616]/60 text-sm">
                  Sopralluogo gratuito con drone in {config.region}. Nessun impegno.
                </p>
              </div>
              <LPForm region={config.region} formId="lp-form-bottom" pageId={config.pageId} />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────
          10 · MINIMAL FOOTER — Logo + phone + P.IVA only
      ───────────────────────────────────────────────────── */}
      <footer className="border-t border-white/8 bg-[#0d0d0d] py-8 pb-20 sm:pb-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Tetto94Logo className="h-11 w-auto opacity-80" alt="Tetto94" />
          <a
            href={PHONE_TEL}
            onClick={() => trackPhoneClick('lp_footer')}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <Phone className="size-3.5" />
            {PHONE}
          </a>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  )
}
