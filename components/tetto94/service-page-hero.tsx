'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { trackCTAClick, trackPhoneClick } from '@/lib/gtag'
import type { ServiceConfig, LocationConfig } from '@/data/services'
import type { CitySeoData } from '@/data/city-seo'
import LPForm from '@/components/tetto94/lp-form'

interface Props {
  service: ServiceConfig
  location?: LocationConfig
  citySeoData?: CitySeoData
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function ServicePageHero({ service, location, citySeoData }: Props) {
  const cityLabel = location ? ` a ${location.name}` : ' nel Nord-Est Italia'
  const hasForm = !!citySeoData && !!location

  /* Page ID for GA4 attribution — e.g. 'city_venezia' */
  const pageId = location ? `city_${location.slug}` : 'city_unknown'

  return (
    <>
    <section className="relative bg-[#161616] overflow-hidden pt-[72px]">

      {/* Background image for city pages — OG image (cinematic aerial per city) */}
      {hasForm && (
        <>
          {/* Image positioned to show the best aerial portion — top area of OG images is richest */}
          <Image
            src={`/images/og/rifacimento-tetto-${location!.slug}.png`}
            alt={`Rifacimento tetto a ${location!.name} - Tetto94`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_30%] scale-105"
          />
          {/* Single smart gradient: opaque left (text readable) → transparent right (image visible) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(105deg, #161616 0%, #161616 38%, rgba(22,22,22,0.82) 55%, rgba(22,22,22,0.38) 75%, rgba(22,22,22,0.18) 100%)',
            }}
          />
          {/* Subtle vignette top + bottom for depth */}
          <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#161616]/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#161616]/70 to-transparent" />
        </>
      )}

      {/* Diagonal red accent line — only on non-form variant */}
      {!hasForm && (
        <div
          className="absolute inset-y-0 right-[42%] w-[3px] z-10 pointer-events-none hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #EB1C26 20%, #EB1C26 80%, transparent 100%)',
            transform: 'skewX(-4deg)',
          }}
        />
      )}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }}
      />

      <div className={`relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24 grid gap-12 ${hasForm ? 'lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-start' : 'lg:grid-cols-2 lg:gap-0'}`}>

        {/* LEFT — Content */}
        <div className="flex flex-col justify-center">

          {/* Breadcrumb pill */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-6 flex items-center gap-2"
          >
            <a href="/" className="text-xs text-white/40 hover:text-white/60 transition-colors">Home</a>
            <span className="text-white/20 text-xs">/</span>
            <a href={`/${service.slug}`} className="text-xs text-white/40 hover:text-white/60 transition-colors">{service.name}</a>
            {location && (
              <>
                <span className="text-white/20 text-xs">/</span>
                <span className="text-xs text-[#EB1C26]">{location.name}</span>
              </>
            )}
          </motion.div>

          {/* Eyebrow */}
          <motion.span
            custom={0.1} variants={fadeUp} initial="hidden" animate="visible"
            className="text-xs font-bold uppercase tracking-[0.35em] text-[#EB1C26] mb-3"
          >
            {location ? `${location.region}` : 'Nord-Est Italia'} · Dal 1994
          </motion.span>

          {/* H1 */}
          <motion.h1
            custom={0.2} variants={fadeUp} initial="hidden" animate="visible"
            className="font-display text-[clamp(2.6rem,5.5vw,5.2rem)] leading-[0.92] text-white"
          >
            {service.headline}
            <span className="block text-[#EB1C26]">
              {cityLabel.toUpperCase()}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={0.35} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-5 text-sm text-white/60 max-w-md leading-relaxed"
          >
            {location
              ? `${service.subheadline} Operiamo a ${location.name}${location.nearbyCity ? `, ${location.nearbyCity}` : ''} e province.`
              : service.subheadline
            }
          </motion.p>

          {/* Region note */}
          <motion.p
            custom={0.42} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-2 text-xs font-semibold text-[#EB1C26] uppercase tracking-wider"
          >
            Veneto, Emilia-Romagna e Friuli-Venezia Giulia
          </motion.p>
          <motion.p
            custom={0.46} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-0.5 text-xs text-white/40 tracking-wide"
          >
            Garanzia scritta 10 anni su ogni intervento
          </motion.p>

          {/* Benefits list */}
          <motion.ul
            custom={0.5} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-6 flex flex-col gap-2"
          >
            {service.benefits.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <CheckCircle2 className="size-4 text-[#EB1C26] shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{b}</span>
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div
            custom={0.65} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="/contatti"
              onClick={() => trackCTAClick('hero_desktop', '/contatti')}
              className="inline-flex items-center gap-2 bg-[#EB1C26] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider hover:bg-[#c9151e] transition-colors"
            >
              Preventivo Gratuito
              <ArrowRight className="size-4" />
            </a>
            <a
              href="tel:+393516519363"
              onClick={() => trackPhoneClick('contact_section')}
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wider hover:border-white/50 transition-colors"
            >
              <Phone className="size-4" />
              351 651 9363
            </a>
          </motion.div>

        </div>

        {/* RIGHT — LPForm (city SEO pages) or Stats+Price (other pages) */}
        {hasForm ? (
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-1">
                Sopralluogo gratuito a {location!.name}
              </p>
              <p className="text-white/60 text-sm">
                Compila il modulo — ti richiamiamo entro 24 ore.
              </p>
            </div>
            <LPForm region={location!.name} formId="city-hero-form" pageId={pageId} />
          </motion.div>
        ) : (
          <div className="hidden lg:flex flex-col items-end justify-center gap-6">

            {/* Price from badge — shown only when priceFrom is set */}
            {service.priceFrom && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="border border-white/10 p-8 text-right"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">A partire da</p>
                {service.oldPrice && (
                  <p className="text-lg text-white/35 line-through font-sans mb-1">{service.oldPrice}</p>
                )}
                <p className="font-display text-[4rem] leading-none text-white">{service.priceFrom}</p>
                <p className="text-xs text-white/40 mt-1">Preventivo gratuito entro 24 ore</p>
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-px border border-white/10 overflow-hidden"
            >
              {[
                { value: '32+', label: 'anni esperienza' },
                { value: '500+', label: 'tetti completati' },
                { value: '24h', label: 'risposta garantita' },
                { value: '10', label: 'anni garanzia' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center justify-center p-5 bg-white/3">
                  <p className="font-display text-2xl text-[#EB1C26] leading-none">{s.value}</p>
                  <p className="text-[10px] uppercase tracking-wider text-white/40 mt-1 text-center">{s.label}</p>
                </div>
              ))}
            </motion.div>

          </div>
        )}

      </div>

      {/* Hidden SEO image — provides alt text for crawlers without affecting visual layout */}
      {location && citySeoData && (
        <img
          src={`/images/og/rifacimento-tetto-${location.slug}.png`}
          alt={`Rifacimento tetto a ${location.name} - Tetto94`}
          className="sr-only"
          width={1200}
          height={630}
          loading="eager"
        />
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />

    </section>

    {/* ── Stats + Price bar — city pages only, below hero ── */}
    {hasForm && service.priceFrom && (
      <div className="relative bg-[#111] overflow-hidden">
        {/* red left border accent */}
        <div className="absolute left-0 inset-y-0 w-1 bg-[#EB1C26]" />

        <div className="mx-auto max-w-7xl px-6 py-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-white/8">

            {/* Price — spans 2 cols on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-2 sm:col-span-1 lg:col-span-2 flex items-center gap-4 px-6 py-5 border-r border-white/8"
            >
              <div className="flex size-10 shrink-0 items-center justify-center bg-[#EB1C26]">
                <span className="font-display text-xs text-white leading-none">€</span>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-0.5">A partire da</p>
                <div className="flex items-baseline gap-2">
                  {service.oldPrice && (
                    <span className="text-xs text-white/25 line-through">{service.oldPrice}</span>
                  )}
                  <span className="font-display text-2xl text-white leading-none">{service.priceFrom}</span>
                </div>
              </div>
            </motion.div>

            {/* 4 stat cells */}
            {[
              { value: '32+', label: 'Anni esperienza' },
              { value: '500+', label: 'Tetti completati' },
              { value: '24h', label: 'Risposta garantita' },
              { value: '10', label: 'Anni garanzia' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center px-4 py-5 gap-0.5"
              >
                <span className="font-display text-2xl text-[#EB1C26] leading-none">{s.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/35 text-center">{s.label}</span>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    )}
    </>
  )
}
