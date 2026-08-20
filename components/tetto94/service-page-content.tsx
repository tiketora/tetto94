'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { trackCTAClick } from '@/lib/gtag'
import type { ServiceConfig, LocationConfig } from '@/data/services'
import { SERVICES, LOCATIONS } from '@/data/services'
import type { CitySeoData } from '@/data/city-seo'
import CitySeoSections from '@/components/tetto94/city-seo-sections'

interface Props {
  service: ServiceConfig
  location?: LocationConfig
  citySeoData?: CitySeoData
}

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

/* ── FAQ Accordion ─────────────────────────────────────────── */
function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="divide-y divide-black/8">
      {items.map((item, i) => (
        <div key={i} className="py-4">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 text-left"
            aria-expanded={open === i}
          >
            <span className="text-sm font-semibold text-[#161616] leading-snug">{item.q}</span>
            <ChevronDown
              className={`size-4 shrink-0 text-[#EB1C26] transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          {open === i && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-sm text-[#494949] leading-relaxed overflow-hidden"
            >
              {item.a}
            </motion.p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function ServicePageContent({ service, location, citySeoData }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })
  const cityLabel = location ? ` a ${location.name}` : ' nel Nord-Est Italia'

  /* Related locations for internal linking */
  const relatedLocations = LOCATIONS.filter((l) => l.slug !== location?.slug).slice(0, 6)

  /* Related services for internal linking */
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug)

  return (
    <div ref={ref} className="bg-white">

      {/* ── City SEO Sections — price table first, then zone/materiali/bonus/gallery/maps/faq ── */}
      {/* Positioned BEFORE "Il Servizio" per SEO doc: price must appear before content block */}
      {citySeoData && location && (
        <CitySeoSections data={citySeoData} location={location} />
      )}

      {/* ── QUANTO COSTA — price table (service pages only, no city SEO data) ── */}
      {!citySeoData && service.prezziTable && service.prezziTable.length > 0 && (
        <section className="bg-[#111] py-14 lg:py-18 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Prezzi</span>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-white">
                QUANTO COSTA IL{' '}
                <span className="text-[#EB1C26]">{service.name.toUpperCase()}?</span>
              </h2>
              <p className="mt-3 text-sm text-white/50 max-w-xl leading-relaxed">
                Prezzi indicativi per il Veneto — IVA inclusa. Il preventivo definitivo è gratuito e include sopralluogo drone entro 24 ore.
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-[10px] font-black uppercase tracking-[0.25em] text-white/30 pb-3 pr-4">Tipo intervento</th>
                    <th className="text-right text-[10px] font-black uppercase tracking-[0.25em] text-white/30 pb-3 px-4">Da</th>
                    <th className="text-right text-[10px] font-black uppercase tracking-[0.25em] text-white/30 pb-3 px-4">A</th>
                    <th className="text-left text-[10px] font-black uppercase tracking-[0.25em] text-white/30 pb-3 pl-4 hidden sm:table-cell">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {service.prezziTable.map((row, i) => (
                    <motion.tr
                      key={row.tipo}
                      variants={fadeUp(0.05 + i * 0.06)}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      className={i === 0 ? 'bg-[#EB1C26]/8' : 'hover:bg-white/2 transition-colors'}
                    >
                      <td className="py-3.5 pr-4 text-sm text-white font-medium leading-snug">
                        {i === 0 && <span className="mr-2 text-[9px] font-black bg-[#EB1C26] text-white px-1.5 py-0.5 uppercase tracking-wider">Top</span>}
                        {row.tipo}
                      </td>
                      <td className="py-3.5 px-4 text-right font-display text-base text-white/70 whitespace-nowrap">{row.prezzoMin}</td>
                      <td className="py-3.5 px-4 text-right font-display text-base text-[#EB1C26] whitespace-nowrap">{row.prezzoMax}</td>
                      <td className="py-3.5 pl-4 text-xs text-white/35 hidden sm:table-cell leading-snug">{row.note}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.p
              variants={fadeUp(0.35)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mt-5 text-xs text-white/30 leading-relaxed"
            >
              I prezzi sono indicativi e possono variare in base alla superficie, alla tipologia dell&apos;edificio e alla complessità dell&apos;intervento.
              Preventivo gratuito entro 24 ore con ispezione drone inclusa.
            </motion.p>
          </div>
        </section>
      )}

      {/* ── 1. Long description ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
              Il Servizio
            </span>
            <h2 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none text-[#161616]">
              {service.nameFull.toUpperCase()}
              {location && (
                <span className="block text-[#EB1C26]">A {location.name.toUpperCase()}</span>
              )}
            </h2>
            {/* City-specific intro text if available, otherwise generic */}
            <p className="mt-5 text-sm text-[#333] leading-relaxed">
              {citySeoData?.heroLongText
                ? citySeoData.heroLongText
                : location
                  ? `${service.longDescription} Operiamo a ${location.name}${location.nearbyCity ? `, ${location.nearbyCity}` : ''} e in tutta la provincia di ${location.province}.`
                  : service.longDescription
              }
            </p>
            {!citySeoData && location && (
              <p className="mt-3 text-sm text-[#494949] leading-relaxed">
                {location.description}
              </p>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
              Perché Sceglierci
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {service.benefits.map((b, i) => (
                <motion.li
                  key={b}
                  variants={fadeUp(0.15 + i * 0.06)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex items-start gap-3 border border-black/8 p-4 bg-[#fafafa]"
                >
                  <CheckCircle2 className="size-4 text-[#EB1C26] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#333]">{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ── 2. Checklist + Pricing — only for services with a defined package ── */}
      {service.checklistItems && service.checklistItems.length > 0 && (
        <section className="bg-[#f5f5f5] py-16 lg:py-20 border-t border-black/5">
          <div className="mx-auto max-w-7xl px-6">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Checklist */}
              <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
                  Cosa include il pacchetto
                </span>
                <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]">
                  MA QUANTO COSTEREBBE<br />
                  <span className="text-[#EB1C26]">TUTTO QUESTO?</span>
                </h2>

                <ul className="mt-8 flex flex-col gap-0 divide-y divide-black/8">
                  {service.checklistItems.map((item, i) => (
                    <motion.li
                      key={item}
                      variants={fadeUp(i * 0.05)}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      className="flex items-center gap-3 py-3"
                    >
                      <div className="size-5 shrink-0 rounded-full bg-[#EB1C26] flex items-center justify-center">
                        <CheckCircle2 className="size-3 text-white" />
                      </div>
                      {item === 'Certificato di garanzia' ? (
                        <Link
                          href="/garanzie"
                          className="text-sm text-[#161616] leading-snug underline underline-offset-2 hover:text-[#EB1C26] transition-colors"
                        >
                          {item}
                        </Link>
                      ) : (
                        <span className="text-sm text-[#161616] leading-snug">{item}</span>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Pricing */}
              <motion.div
                variants={fadeUp(0.2)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="lg:sticky lg:top-24"
              >
                <div className="border border-black/10 bg-white p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949] mb-6">
                    Con Tetto94 puoi avere tutto questo a partire da:
                  </p>

                  {/* Prices */}
                  <div className="flex flex-col gap-1 mb-8">
                    {service.oldPrice && (
                      <span className="text-xl text-[#494949] line-through font-sans">
                        {service.oldPrice}
                      </span>
                    )}
                    <div className="inline-flex items-center justify-center bg-[#EB1C26] px-6 py-4 self-start">
                      <span className="font-display text-[clamp(2.4rem,4vw,3.2rem)] font-black text-white leading-none">
                        {service.priceFrom}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href="/contatti"
                    onClick={() => trackCTAClick('hero_desktop', '/contatti')}
                    className="flex items-center justify-center gap-2 bg-[#161616] text-white px-6 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#EB1C26] transition-colors w-full"
                  >
                    Richiedi Preventivo Gratuito
                    <ArrowRight className="size-4" />
                  </a>

                  <p className="mt-4 text-xs text-[#494949] text-center leading-relaxed">
                    Ispezione drone gratuita · Preventivo entro 24h · Garanzia scritta 10 anni
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* ── 3. How it works — Steps ──────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">Come Lavoriamo</span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]">
              IL PROCESSO IN <span className="text-[#EB1C26]">4 STEP</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp(i * 0.1)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="relative bg-white border border-black/8 p-6"
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 font-display text-[3rem] leading-none text-black/5 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Red top bar */}
                <div className="w-8 h-0.5 bg-[#EB1C26] mb-4" />
                <h3 className="font-sans font-bold text-sm text-[#161616] leading-snug mb-2">{step.title}</h3>
                <p className="text-xs text-[#494949] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FAQ ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">FAQ</span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.8rem)] leading-none text-[#161616]">
              DOMANDE FREQUENTI SU{' '}
              <span className="text-[#EB1C26]">
                {service.name.toUpperCase()}{cityLabel !== ' nel Nord-Est Italia' ? ` ${cityLabel.toUpperCase()}` : ''}
              </span>
            </h2>
            <p className="mt-3 text-sm text-[#494949] leading-relaxed">
              Hai domande sul servizio di {service.name.toLowerCase()}{cityLabel}?
              Ecco le risposte alle domande più frequenti dei nostri clienti.
            </p>
          </motion.div>

          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <FAQAccordion items={service.faqItems} />
          </motion.div>

        </div>
      </section>

      {/* ── 4. CTA Banner ────────────────────────────────────── */}
      <section className="bg-[#EB1C26] py-14">
        <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-[clamp(1.6rem,3vw,2.4rem)] text-white leading-tight">
              PRONTO PER IL TUO {service.name.toUpperCase()}{location ? ` A ${location.name.toUpperCase()}` : ''}?
            </p>
            <p className="mt-1 text-sm text-white/80">
              Preventivo gratuito entro 24 ore · Ispezione drone inclusa · Garanzia scritta 10 anni
            </p>
          </div>
          <a
            href="/contatti"
            onClick={() => trackCTAClick('hero_desktop', '/contatti')}
            className="inline-flex items-center gap-2 bg-white text-[#EB1C26] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white/90 transition-colors whitespace-nowrap shrink-0"
          >
            Richiedi Preventivo
            <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      {/* ── 5. Dove Operiamo — shown on service pages (no location context) ── */}
      {!location && (
        <section className="bg-[#f5f5f5] py-14 border-t border-black/5">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="size-4 text-[#EB1C26]" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">Dove Operiamo</span>
              </div>
              <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-none text-[#161616]">
                {service.name.toUpperCase()} IN{' '}
                <span className="text-[#EB1C26]">TUTTO IL VENETO</span>
              </h2>
              {service.doveOperiamoIntro && (
                <p className="mt-3 text-sm text-[#494949] leading-relaxed max-w-2xl">
                  {service.doveOperiamoIntro}
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {relatedLocations.concat(LOCATIONS.filter(l => !relatedLocations.find(r => r.slug === l.slug)).slice(0, 8)).slice(0, 12).map((loc, i) => (
                <motion.a
                  key={loc.slug}
                  href={`/${service.slug}/${loc.slug}`}
                  variants={fadeUp(0.05 + i * 0.04)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="flex items-center justify-between border border-black/10 bg-white px-4 py-3 group hover:border-[#EB1C26] hover:bg-[#EB1C26]/3 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-black text-[#EB1C26] w-5 shrink-0">{loc.province}</span>
                    <span className="text-sm text-[#161616] group-hover:text-[#EB1C26] transition-colors font-medium">{loc.name}</span>
                  </div>
                  <ArrowRight className="size-3 text-[#EB1C26] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5b. Internal Links — Other Locations (city pages only) ── */}
      {location && (
        <section className="bg-[#f5f5f5] py-12">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949] mb-6">
              {service.name} anche in altre città
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedLocations.map((loc) => (
                <a
                  key={loc.slug}
                  href={`/${service.slug}/${loc.slug}`}
                  className="inline-flex items-center gap-1.5 border border-black/10 bg-white px-4 py-2 text-xs text-[#333] hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
                >
                  {service.name} a {loc.name}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Internal Links — Other Services ───────────────── */}
      <section className="bg-white py-12 border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949] mb-6">
            Altri servizi Tetto94{location ? ` a ${location.name}` : ''}
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedServices.map((s) => (
              <a
                key={s.slug}
                href={location ? `/${s.slug}/${location.slug}` : `/${s.slug}`}
                className="flex items-center justify-between border border-black/10 p-4 group hover:border-[#EB1C26] transition-colors"
              >
                <div>
                  <p className="text-sm font-bold text-[#161616] group-hover:text-[#EB1C26] transition-colors">{s.name}</p>
                  <p className="text-xs text-[#494949] mt-0.5 line-clamp-1">{s.description}</p>
                </div>
                <ArrowRight className="size-4 text-[#EB1C26] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
