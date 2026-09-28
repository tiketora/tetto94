'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Layers,
  Droplets,
  Hammer,
  CloudRain,
  Wind,
  Thermometer,
  ShieldCheck,
  Clock,
  Award,
  type LucideIcon,
} from 'lucide-react'
import { SERVICES } from '@/data/services'

const SERVICE_ICONS: Record<string, LucideIcon> = { Layers, Droplets, Hammer, CloudRain, Wind, Thermometer }

/* Bento layout — service 1 (Rifacimento) and service 6 (Coibentazione) get the
   large "featured" slots; the other 4 fill the standard grid slots. Purely a
   presentation pattern — all copy/data still comes from SERVICES (0 duplication). */
const FEATURED_SLUGS = new Set(['rifacimento-tetto', 'coibentazione-tetto'])

const TRUST_STRIP = [
  { icon: Award, label: '32+ anni di esperienza' },
  { icon: ShieldCheck, label: 'Garanzia scritta su ogni lavoro' },
  { icon: Clock, label: 'Preventivo gratuito entro 24h' },
]

function ServiceCard({ slug, featured, index }: { slug: string; featured: boolean; index: number }) {
  const service = SERVICES.find((s) => s.slug === slug)!
  const Icon = SERVICE_ICONS[service.icon] ?? Layers

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={featured ? 'sm:col-span-2 lg:col-span-2' : ''}
    >
      <Link
        href={`/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden border border-white/10 bg-[#0d0d0d]"
        style={{ aspectRatio: featured ? '16/10' : '4/5' }}
      >
        <Image
          src={service.image}
          alt={service.name}
          fill
          sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 50vw, 33vw'}
          className="object-cover opacity-70 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0d0d0d] via-[#0d0d0d]/50 to-[#0d0d0d]/10" />
        <div className="absolute inset-0 bg-[#EB1C26]/0 transition-colors duration-500 group-hover:bg-[#EB1C26]/10" />

        {/* Grid overlay pattern for the "advanced" texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top row: icon + price badge */}
        <div className="relative z-10 flex items-start justify-between p-5">
          <div className="flex size-11 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm transition-colors duration-500 group-hover:border-[#EB1C26]/60 group-hover:bg-[#EB1C26]/20">
            <Icon className="size-5 text-white" />
          </div>
          <span className="border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
            {service.priceFrom ? `Da ${service.priceFrom}` : 'Preventivo gratis'}
          </span>
        </div>

        {/* Bottom content */}
        <div className="relative z-10 mt-auto flex flex-col gap-2.5 p-5">
          <p className="max-w-sm translate-y-3 text-xs leading-relaxed text-white/70 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
            {service.subheadline}
          </p>
          <div className="flex items-end justify-between gap-3">
            <h3
              className={`font-display leading-none text-white ${
                featured ? 'text-[clamp(1.5rem,2.6vw,2.1rem)]' : 'text-[clamp(1.05rem,1.9vw,1.35rem)]'
              }`}
            >
              {service.name}
            </h3>
            <div className="flex size-8 shrink-0 items-center justify-center border border-white/20 bg-[#EB1C26] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
              <ArrowRight className="size-3.5 text-white" />
            </div>
          </div>
          <div className="h-px w-0 bg-[#EB1C26] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
        </div>
      </Link>
    </motion.div>
  )
}

export default function ServiziContent() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-10%' })

  return (
    <main className="bg-[#161616]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-14 lg:pt-40 lg:pb-20" ref={heroRef}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 right-[-10%] size-[520px] rounded-full bg-[#EB1C26]/15 blur-[120px]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-bold uppercase tracking-[0.35em] text-white/40"
          >
            I Nostri Servizi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.98]"
          >
            <span className="text-white">SERVIZI PER OGNI</span>
            <br />
            <span className="text-[#EB1C26]">TIPO DI TETTO</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 lg:text-base"
          >
            Rifacimento tetto, riparazione, impermeabilizzazione, stop infiltrazioni, pulizia
            grondaie e coibentazione: Tetto94 interviene su ogni problema della tua copertura in
            Veneto, Emilia-Romagna e Friuli-Venezia Giulia, con ispezione drone gratuita,
            materiali certificati CE e garanzia scritta su ogni intervento.
          </motion.p>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-x-8 gap-y-3"
          >
            {TRUST_STRIP.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <item.icon className="size-4 text-[#EB1C26]" />
                <span className="text-xs font-medium text-white/70">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bento service grid ───────────────────────────────── */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.slug} slug={service.slug} featured={FEATURED_SLUGS.has(service.slug)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO-rich guidance block ─────────────────────────── */}
      <section className="border-t border-white/10 bg-[#121212] py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-white/40">Come Scegliere</span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] leading-tight text-white">
              QUAL È IL SERVIZIO <span className="text-[#EB1C26]">GIUSTO PER IL TUO TETTO?</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Ogni tetto ha un&apos;età, un materiale e una storia diversa. Prima di scegliere tra{' '}
              <Link href="/rifacimento-tetto" className="text-white underline underline-offset-2 hover:text-[#EB1C26]">
                rifacimento completo
              </Link>{' '}
              e un intervento localizzato, il nostro team esegue sempre un&apos;ispezione con drone
              gratuita per individuare la causa reale del problema — infiltrazione, tegola rotta,
              guaina usurata o isolamento insufficiente — e proporre la soluzione più efficace, non
              necessariamente la più costosa.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {SERVICES.map((service) => (
              <div key={service.slug} className="border-l-2 border-[#EB1C26]/40 pl-4">
                <p className="text-sm font-bold text-white">{service.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">{service.faqItems[0]?.q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────── */}
      <section className="border-t border-white/10 bg-[#161616] py-16 lg:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-tight text-white">
              NON SAI DA DOVE INIZIARE?
              <br />
              <span className="text-[#EB1C26]">CHIEDI UN SOPRALLUOGO GRATUITO.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
              Ispezione drone gratuita e preventivo dettagliato entro 24 ore, su qualsiasi servizio
              di cui hai bisogno.
            </p>
          </div>
          <Link
            href="/calcola-preventivo"
            className="group flex shrink-0 items-center gap-3 bg-[#EB1C26] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#161616]"
          >
            Richiedi Preventivo
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  )
}