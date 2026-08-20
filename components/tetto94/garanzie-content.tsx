'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck,
  FileCheck2,
  Wrench,
  Phone,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import HeroForm from './hero-form'
import { trackPhoneClick } from '@/lib/gtag'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
})

/* ── Section 2 — Cosa copre ─────────────────────────────── */
const coverage = [
  {
    title: 'Materiali',
    desc: 'Tegole, coppi, guaine impermeabilizzanti, membrane e sistemi di fissaggio: se un materiale installato da Tetto94 presenta un difetto, lo sostituiamo senza costi.',
  },
  {
    title: 'Manodopera',
    desc: 'Ogni intervento eseguito dai nostri tecnici è garantito. Un errore di posa o di lavorazione viene corretto interamente a nostro carico.',
  },
  {
    title: 'Infiltrazioni post-intervento',
    desc: "Se, dopo un rifacimento o un'impermeabilizzazione, si verifica una nuova infiltrazione nella stessa area trattata, torniamo per risolverla senza alcun costo aggiuntivo.",
  },
]

/* ── Section 4 — Come funziona ──────────────────────────── */
const steps = [
  {
    num: '01',
    title: 'Segnali il problema',
    desc: 'Ci contatti per telefono, WhatsApp o modulo. Ci basta il tuo nome, il tuo numero e una breve descrizione di cosa hai notato.',
  },
  {
    num: '02',
    title: 'Sopralluogo gratuito',
    desc: 'Un tecnico verifica di persona (o con ispezione drone) se il problema è coperto dalla garanzia scritta rilasciata a fine lavoro.',
  },
  {
    num: '03',
    title: 'Interveniamo senza costi',
    desc: "Se il problema rientra nella garanzia, programmiamo l'intervento e lo risolviamo. Nessuna fattura aggiuntiva, nessuna sorpresa.",
  },
]

/* ── Section 6 — FAQ ─────────────────────────────────────── */
const faqs = [
  {
    q: 'Quanto dura la garanzia scritta di Tetto94?',
    a: 'La garanzia è di 10 anni su rifacimento completo del tetto e impermeabilizzazione. Per riparazioni puntuali la durata è indicata nel certificato consegnato a fine lavoro, in base al tipo di intervento.',
  },
  {
    q: 'Cosa devo fare per attivare la garanzia?',
    a: 'Non serve nessuna registrazione. Il certificato di garanzia ti viene consegnato automaticamente a fine lavoro insieme alla documentazione del cantiere. Basta conservarlo e contattarci se si presenta un problema.',
  },
  {
    q: 'Cosa non è coperto dalla garanzia?',
    a: "La garanzia non coprire danni causati da eventi eccezionali (grandinate estreme, calamità naturali riconosciute), interventi di terzi non autorizzati sulla copertura dopo il nostro lavoro, o normale usura di elementi non trattati durante l'intervento originale. Le condizioni specifiche sono sempre indicate nel contratto e nel certificato di garanzia.",
  },
  {
    q: "L'intervento in garanzia ha davvero costo zero?",
    a: 'Sì. Se il sopralluogo confirma che il problema rientra nelle condizioni della garanzia scritta, non paghi né la manodopera né i materiali necessari per la correzione.',
  },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base sm:text-lg text-white leading-snug">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown className="size-5 text-[#EB1C26]" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-white/60 leading-relaxed max-w-2xl">{a}</p>
      </motion.div>
    </div>
  )
}

export default function GaranzieContent() {
  const coverageRef = useRef(null)
  const coverageInView = useInView(coverageRef, { once: true, margin: '-8%' })
  const certRef = useRef(null)
  const certInView = useInView(certRef, { once: true, margin: '-8%' })
  const stepsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-8%' })
  const qualityRef = useRef(null)
  const qualityInView = useInView(qualityRef, { once: true, margin: '-8%' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-8%' })

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative bg-[#161616] overflow-hidden pt-[72px]">
        <div className="absolute inset-y-0 right-[42%] w-[3px] z-10 pointer-events-none hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #EB1C26 20%, #EB1C26 80%, transparent 100%)',
            transform: 'skewX(-4deg)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-24 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 flex items-center gap-2">
              <Link href="/" className="text-xs text-white/40 hover:text-white/60 transition-colors">Home</Link>
              <span className="text-white/20 text-xs">/</span>
              <span className="text-xs text-[#EB1C26]">Garanzie</span>
            </motion.div>

            <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-xs font-bold uppercase tracking-[0.35em] text-[#EB1C26] mb-3">
              Dal 1994 · Nord-Est Italia
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15 }} className="font-display text-[clamp(2.6rem,5.5vw,5.2rem)] leading-[0.92] text-white">
              GARANZIA SCRITTA<br />
              <span className="text-[#EB1C26]">10 ANNI</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.25 }} className="mt-5 text-sm text-white/60 max-w-md leading-relaxed">
              Garanzia scritta su materiali e manodopera, certificato consegnato a fine lavoro.
              Se serve, torniamo senza costi aggiuntivi.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-2 bg-[#EB1C26] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider hover:bg-[#c9151e] transition-colors"
              >
                Richiedi Preventivo
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

          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <HeroForm />
          </motion.div>
        </div>
      </section>

      {/* ── 2. Cosa copre ───────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24" ref={coverageRef}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={coverageInView ? 'visible' : 'hidden'} className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Cosa copre</span>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-[#161616]">
              TRE LIVELLI DI <span className="text-[#EB1C26]">PROTEZIONE</span>
            </h2>
          </motion.div>
          <div className="grid gap-px bg-[#E5E5E5] sm:grid-cols-3">
            {coverage.map((c, i) => (
              <motion.div key={c.title} variants={fadeUp(0.1 + i * 0.1)} initial="hidden" animate={coverageInView ? 'visible' : 'hidden'} className="bg-white p-8 flex flex-col gap-4">
                <div className="size-10 flex items-center justify-center border border-[#EB1C26]/30">
                  <ShieldCheck className="size-5 text-[#EB1C26]" />
                </div>
                <h3 className="font-display text-lg text-[#161616] leading-snug">{c.title}</h3>
                <p className="text-sm text-[#494949] leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Il certificato ───────────────────────────────── */}
      <section className="bg-[#f5f5f5] py-16 lg:py-24" ref={certRef}>
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={certInView ? 'visible' : 'hidden'}>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">Il certificato</span>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none text-[#161616]">
              UN DOCUMENTO SCRITTO. <span className="text-[#EB1C26]">NON UNA PROMESSA.</span>
            </h2>
            <p className="mt-5 text-sm text-[#494949] leading-relaxed max-w-md">
              A fine lavoro ricevi un certificato di garanzia firmato che indica il tipo di intervento,
              la data di esecuzione, i materiali utilizzati e la durata della copertura. È il documento
              che attiva automaticamente la garanzia — nessuna registrazione online, nessuna procedura.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {['Data e tipo di intervento', 'Materiali e fornitori certificati', 'Durata della garanzia', 'Contatti diretti per assistenza'].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="size-4 text-[#EB1C26] shrink-0" />
                  <span className="text-sm text-[#161616]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={certInView ? 'visible' : 'hidden'} className="border border-black/10 bg-white p-8 lg:p-10">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-black/8">
              <FileCheck2 className="size-8 text-[#EB1C26]" />
              <div>
                <p className="font-display text-lg text-[#161616] leading-none">Certificato di Garanzia</p>
                <p className="text-xs text-[#494949] mt-1">Rilasciato da Tetto94</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#494949]">Intervento</span>
                <span className="text-[#161616] font-semibold">Rifacimento / Impermeabilizzazione</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#494949]">Durata garanzia</span>
                <span className="text-[#161616] font-semibold">10 anni</span>
              </div>
              <div className="flex justify-between border-b border-black/5 pb-2">
                <span className="text-[#494949]">Copertura</span>
                <span className="text-[#161616] font-semibold">Materiali + Manodopera</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#494949]">Assistenza</span>
                <span className="text-[#161616] font-semibold">+39 351 651 9363</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Come funziona ────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24" ref={stepsRef}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={stepsInView ? 'visible' : 'hidden'} className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Come funziona</span>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-[#161616]">
              TRE PASSI. <span className="text-[#EB1C26]">ZERO BUROCRAZIA.</span>
            </h2>
          </motion.div>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp(0.1 + i * 0.1)} initial="hidden" animate={stepsInView ? 'visible' : 'hidden'} className="relative">
                <span className="font-display text-[3.5rem] leading-none text-black/5 select-none">{s.num}</span>
                <h3 className="mt-2 font-display text-lg text-[#161616] leading-snug">{s.title}</h3>
                <p className="mt-2 text-sm text-[#494949] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Qualità e certificazioni ─────────────────────── */}
      <section className="bg-[#161616] py-16 lg:py-24" ref={qualityRef}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={qualityInView ? 'visible' : 'hidden'} className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Qualità</span>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-white">
              MATERIALI CERTIFICATI. <span className="text-[#EB1C26]">SEMPRE.</span>
            </h2>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              Utilizziamo esclusivamente materiali certificati CE di prima scelta — tegole in cotto,
              guaine impermeabilizzanti e sistemi di fissaggio omologati. È la base su cui costruiamo
              ogni garanzia scritta che rilasciamo.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-px bg-white/8 sm:grid-cols-2">
            {[
              { icon: Wrench, title: 'Materiali certificati CE', desc: 'Ogni componente installato rispetta gli standard europei di qualità e sicurezza.' },
              { icon: ShieldCheck, title: 'Controllo a fine lavoro', desc: 'Verifica finale del cantiere prima della consegna del certificato di garanzia.' },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp(0.1 + i * 0.1)} initial="hidden" animate={qualityInView ? 'visible' : 'hidden'} className="bg-[#161616] p-8 flex flex-col gap-4 border border-white/8">
                  <Icon className="size-6 text-[#EB1C26]" />
                  <h3 className="font-display text-base text-white leading-snug">{f.title}</h3>
                  <p className="text-xs text-white/50 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Domande Frequenti</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-none text-white">
              TUTTO SULLA <span className="text-[#EB1C26]">GARANZIA</span>
            </h2>
          </div>
          <div>
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA finale + altri servizi ───────────────────── */}
      <section className="bg-[#EB1C26] py-16 lg:py-20" ref={ctaRef}>
        <div className="mx-auto max-w-7xl px-6">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={ctaInView ? 'visible' : 'hidden'} className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] leading-none text-white">
              RICHIEDI UN PREVENTIVO CON GARANZIA SCRITTA
            </h2>
            <p className="mt-4 text-sm text-white/85 leading-relaxed">
              Ispezione gratuita con drone, preventivo entro 24 ore, certificato di garanzia
              consegnato a fine lavoro.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/contatti" className="inline-flex items-center gap-2 bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#161616] hover:bg-white/90 transition-colors">
                Richiedi Preventivo
                <ArrowRight className="size-4" />
              </a>
              <a href="tel:+393516519363" onClick={() => trackPhoneClick('contact_section')} className="inline-flex items-center gap-2 border border-white/50 px-7 py-3.5 text-sm font-semibold text-white uppercase tracking-wider hover:border-white transition-colors">
                <Phone className="size-4" />
                351 651 9363
              </a>
            </div>
          </motion.div>

          <div className="mt-14 pt-10 border-t border-white/20">
            <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-white/70 mb-6">Altri Servizi</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Rifacimento Tetto', href: '/rifacimento-tetto' },
                { name: 'Riparazione Tetto', href: '/riparazione-tetto' },
                { name: 'Impermeabilizzazione', href: '/impermeabilizzazione-tetto' },
                { name: 'Stop Infiltrazioni', href: '/infiltrazioni-tetto' },
                { name: 'Pulizia Grondaie', href: '/pulizia-grondaie' },
              ].map((s) => (
                <Link key={s.href} href={s.href} className="text-xs font-semibold text-white border border-white/30 px-4 py-2 hover:bg-white/10 transition-colors">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
