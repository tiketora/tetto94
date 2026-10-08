// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import Link from 'next/link'
// import Image from 'next/image'
// import {
//   ShieldCheck,
//   Microscope,
//   Clock,
//   Award,
//   Hammer,
//   Users,
//   MapPin,
//   ArrowRight,
//   Phone,
// } from 'lucide-react'
// import ServiceWorksGallery from './service-works-gallery'
// import { trackPhoneClick } from '@/lib/gtag'

// const fadeUp = (d = 0) => ({
//   hidden: { opacity: 0, y: 28 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
// })

// /* ── Timeline — storia aziendale ─────────────────────────── */
// const timeline = [
//   { year: '1994', title: 'La Fondazione', desc: 'Tetto94 nasce a Venezia come piccola impresa artigiana specializzata in coperture in cotto e laterizio, con un impegno chiaro: qualità del lavoro prima di tutto.' },
//   { year: '2008', title: 'Espansione Regionale', desc: "L'attività si estende alle province di Padova, Treviso e Vicenza. Il team cresce e si specializza in impermeabilizzazione e rifacimento di coperture complesse." },
//   { year: '2019', title: "Ispezione con Drone", desc: 'Tetto94 introduce la diagnosi aerea con drone per ogni sopralluogo: precisione millimetrica, zero rischi per il cliente, report fotografico completo e gratuito.' },
//   { year: '2026', title: 'Leader nel Nord-Est', desc: 'Oltre 500 tetti completati e più di 30 anni di esperienza. Oggi operiamo in tutto il Nord-Est Italia con garanzia scritta su ogni intervento.' },
// ]

// /* ── Pillars — perché siamo diversi ──────────────────────── */
// const pillars = [
//   {
//     icon: Microscope,
//     num: '01',
//     title: 'Diagnosi con Drone, Non a Occhio',
//     desc: 'Prima di ogni preventivo, ispezioniamo la copertura con drone professionale: ogni tegola, ogni giunto, ogni possibile infiltrazione viene documentata in un report fotografico gratuito. Nessuna supposizione, solo dati reali.',
//   },
//   {
//     icon: ShieldCheck,
//     num: '02',
//     title: 'Garanzia Scritta su Ogni Intervento',
//     desc: "Ogni lavoro è coperto da garanzia scritta consegnata a fine cantiere: materiali, manodopera e infiltrazioni post-intervento. Se qualcosa non va, torniamo senza alcun costo aggiuntivo.",
//   },
//   {
//     icon: Clock,
//     num: '03',
//     title: 'Intervento Rapido, Zero Attese',
//     desc: 'Rispondiamo entro 24 ore e, in caso di emergenza (temporali, grandinate, infiltrazioni attive), organizziamo il sopralluogo il prima possibile. Un tetto danneggiato non può aspettare settimane.',
//   },
//   {
//     icon: Award,
//     num: '04',
//     title: 'Materiali Certificati, Standard ISO',
//     desc: 'Utilizziamo esclusivamente materiali certificati CE — tegole in cotto naturale, guaine bituminose e polimeriche, membrane traspiranti — selezionati in base al tipo di copertura e al clima locale.',
//   },
//   {
//     icon: Hammer,
//     num: '05',
//     title: "Trent'anni di Esperienza Artigiana",
//     desc: 'Dal 1994 lavoriamo esclusivamente su coperture: non siamo generalisti. Ogni tecnico Tetto94 è formato specificamente su tegole, guaine, coibentazione e gestione delle infiltrazioni.',
//   },
//   {
//     icon: Users,
//     num: '06',
//     title: 'Un Solo Referente, Zero Sorprese',
//     desc: 'Dal primo sopralluogo alla consegna del certificato di garanzia, un unico tecnico segue il tuo cantiere. Preventivo trasparente e dettagliato, nessun costo nascosto in corso d\'opera.',
//   },
// ]

// /* ── Coverage area ────────────────────────────────────────── */
// const regions = [
//   { region: 'Veneto', cities: 'Venezia, Mestre, Padova, Treviso, Vicenza, Verona, Rovigo, Belluno, Chioggia, Mirano' },
//   { region: 'Friuli-Venezia Giulia', cities: 'Udine, Trieste, Pordenone' },
//   { region: 'Emilia-Romagna', cities: 'Bologna, Modena, Parma, Ferrara' },
// ]

// function useSectionInView() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })
//   return { ref, inView }
// }

// export default function PercheNoiContent() {
//   const hero = useSectionInView()
//   const timelineSection = useSectionInView()
//   const pillarsSection = useSectionInView()
//   const areaSection = useSectionInView()
//   const ctaSection = useSectionInView()

//   return (
//     <>
//       {/* ── 1. Hero ─────────────────────────────────────────── */}
//       <section ref={hero.ref} className="relative overflow-hidden bg-[#161616] pt-[100px] pb-16 lg:pt-[140px] lg:pb-24">
//         <div
//           className="absolute inset-0 opacity-[0.04]"
//           style={{
//             backgroundImage:
//               'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
//             backgroundSize: '48px 48px',
//           }}
//         />
//         <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[#EB1C26]/10 blur-[140px]" />

//         <div className="relative mx-auto max-w-5xl px-6 text-center">
//           <motion.span
//             variants={fadeUp(0)}
//             initial="hidden"
//             animate={hero.inView ? 'visible' : 'hidden'}
//             className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]"
//           >
//             Chi Siamo — Dal 1994
//           </motion.span>
//           <motion.h1
//             variants={fadeUp(0.1)}
//             initial="hidden"
//             animate={hero.inView ? 'visible' : 'hidden'}
//             className="mt-3 font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.98] text-white"
//           >
//             NON SOLO ARTIGIANI.{' '}
//             <span className="text-[#EB1C26]">ESPERTI DI COPERTURE.</span>
//           </motion.h1>
//           <motion.p
//             variants={fadeUp(0.2)}
//             initial="hidden"
//             animate={hero.inView ? 'visible' : 'hidden'}
//             className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed"
//           >
//             Tetto94 è specializzata in riparazione, rifacimento e impermeabilizzazione di tetti
//             nel Nord-Est Italia dal 1994. Oltre 30 anni di esperienza artigiana, ispezione con
//             drone gratuita su ogni sopralluogo e garanzia scritta su ogni intervento — perché la
//             fiducia si costruisce con la trasparenza, non con le promesse.
//           </motion.p>

//           {/* Stats row */}
//           <motion.div
//             variants={fadeUp(0.3)}
//             initial="hidden"
//             animate={hero.inView ? 'visible' : 'hidden'}
//             className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 max-w-2xl mx-auto"
//           >
//             {[
//               { value: '32+', label: 'Anni di Esperienza' },
//               { value: '500+', label: 'Tetti Completati' },
//               { value: '0€', label: 'Ispezione Drone' },
//               { value: '10', label: 'Anni di Garanzia' },
//             ].map((s) => (
//               <div key={s.label} className="bg-[#161616] px-4 py-5 flex flex-col items-center gap-1">
//                 <span className="font-display text-2xl sm:text-3xl font-black text-[#EB1C26]">{s.value}</span>
//                 <span className="text-[10px] uppercase tracking-wider text-white/45">{s.label}</span>
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ── 2. Storia — Timeline ────────────────────────────── */}
//       <section ref={timelineSection.ref} className="bg-white py-16 lg:py-24">
//         <div className="mx-auto max-w-5xl px-6">
//           <motion.div
//             variants={fadeUp(0)}
//             initial="hidden"
//             animate={timelineSection.inView ? 'visible' : 'hidden'}
//             className="mb-12"
//           >
//             <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">La Nostra Storia</span>
//             <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               TRENT&apos;ANNI SUI TETTI DEL VENETO
//             </h2>
//           </motion.div>

//           <div className="relative">
//             <div className="absolute left-[1px] top-2 bottom-2 w-px bg-[#E5E5E5] hidden sm:block" />
//             <div className="space-y-10">
//               {timeline.map((t, i) => (
//                 <motion.div
//                   key={t.year}
//                   variants={fadeUp(0.1 + i * 0.1)}
//                   initial="hidden"
//                   animate={timelineSection.inView ? 'visible' : 'hidden'}
//                   className="relative sm:pl-10"
//                 >
//                   <div className="absolute left-[-3px] top-1.5 size-[7px] rounded-full bg-[#EB1C26] hidden sm:block" />
//                   <span className="font-display text-lg font-black text-[#EB1C26]">{t.year}</span>
//                   <h3 className="mt-1 font-display text-lg text-[#161616]">{t.title}</h3>
//                   <p className="mt-1.5 max-w-2xl text-sm text-[#888] leading-relaxed">{t.desc}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── 3. Pillars — perché siamo diversi ──────────────── */}
//       <section ref={pillarsSection.ref} className="bg-[#0B0B0B] py-16 lg:py-24">
//         <div className="mx-auto max-w-7xl px-6">
//           <motion.div
//             variants={fadeUp(0)}
//             initial="hidden"
//             animate={pillarsSection.inView ? 'visible' : 'hidden'}
//             className="mb-12 max-w-2xl"
//           >
//             <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Perché Scegliere Tetto94</span>
//             <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-white">
//               SEI RAGIONI PER CUI I NOSTRI CLIENTI TORNANO
//             </h2>
//           </motion.div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
//             {pillars.map((p, i) => {
//               const Icon = p.icon
//               return (
//                 <motion.div
//                   key={p.title}
//                   variants={fadeUp(0.08 * i)}
//                   initial="hidden"
//                   animate={pillarsSection.inView ? 'visible' : 'hidden'}
//                   className="group bg-[#0B0B0B] p-7 flex flex-col gap-4 hover:bg-[#161616] transition-colors duration-500"
//                 >
//                   <div className="flex items-center justify-between">
//                     <div className="size-10 border border-white/10 group-hover:border-[#EB1C26]/40 flex items-center justify-center transition-colors duration-500">
//                       <Icon className="size-5 text-white/70 group-hover:text-[#EB1C26] transition-colors duration-500" />
//                     </div>
//                     <span className="font-display text-xs text-white/25">{p.num}</span>
//                   </div>
//                   <h3 className="font-display text-base leading-snug text-white">{p.title}</h3>
//                   <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
//                 </motion.div>
//               )
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ── 4. Galleria lavori ──────────────────────────────── */}
//       <ServiceWorksGallery serviceSlug="rifacimento-tetto" serviceName="I Nostri Lavori" />

//       {/* ── 5. Area operativa ───────────────────────────────── */}
//       <section ref={areaSection.ref} className="bg-white py-16 lg:py-24">
//         <div className="mx-auto max-w-5xl px-6">
//           <motion.div
//             variants={fadeUp(0)}
//             initial="hidden"
//             animate={areaSection.inView ? 'visible' : 'hidden'}
//             className="mb-10"
//           >
//             <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Dove Operiamo</span>
//             <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
//               PRESENTI IN TUTTO IL NORD-EST ITALIA
//             </h2>
//             <p className="mt-4 max-w-2xl text-sm text-[#888] leading-relaxed">
//               Da Venezia siamo cresciuti fino a coprire Veneto, Friuli-Venezia Giulia ed
//               Emilia-Romagna, sempre con lo stesso standard: sopralluogo con drone gratuito
//               entro 24 ore e garanzia scritta su ogni intervento.
//             </p>
//           </motion.div>

//           <div className="grid sm:grid-cols-3 gap-px bg-[#E5E5E5]">
//             {regions.map((r, i) => (
//               <motion.div
//                 key={r.region}
//                 variants={fadeUp(0.1 + i * 0.1)}
//                 initial="hidden"
//                 animate={areaSection.inView ? 'visible' : 'hidden'}
//                 className="bg-white p-6 flex flex-col gap-3 border border-[#EB1C26]"
//               >
//                 <div className="flex items-center gap-2">
//                   <MapPin className="size-4 text-[#EB1C26]" />
//                   <h3 className="font-display text-sm text-[#161616]">{r.region}</h3>
//                 </div>
//                 <p className="text-xs text-[#888] leading-relaxed">{r.cities}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── 6. CTA finale ────────────────────────────────────── */}
//       <section ref={ctaSection.ref} className="relative overflow-hidden bg-[#161616] py-16 lg:py-24">
//         <div className="absolute -bottom-32 right-0 size-[30rem] rounded-full bg-[#EB1C26]/10 blur-[120px]" />
//         <div className="relative mx-auto max-w-3xl px-6 text-center">
//           <motion.h2
//             variants={fadeUp(0)}
//             initial="hidden"
//             animate={ctaSection.inView ? 'visible' : 'hidden'}
//             className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-white"
//           >
//             PARLIAMO DEL TUO TETTO
//           </motion.h2>
//           <motion.p
//             variants={fadeUp(0.1)}
//             initial="hidden"
//             animate={ctaSection.inView ? 'visible' : 'hidden'}
//             className="mt-4 text-sm text-white/60 leading-relaxed"
//           >
//             Sopralluogo con drone gratuito, preventivo entro 24 ore, garanzia scritta su ogni intervento.
//           </motion.p>
//           <motion.div
//             variants={fadeUp(0.2)}
//             initial="hidden"
//             animate={ctaSection.inView ? 'visible' : 'hidden'}
//             className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
//           >
//             <Link
//               href="/calcola-preventivo"
//               className="inline-flex items-center gap-2 bg-[#EB1C26] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#c91620] transition-colors"
//             >
//               Richiedi Preventivo Gratuito <ArrowRight className="size-4" />
//             </Link>
//             <a
//               href="tel:+393516519363"
//               onClick={trackPhoneClick}
//               className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/5 transition-colors"
//             >
//               <Phone className="size-4" /> +39 351 651 9363
//             </a>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   )
// }

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShieldCheck,
  Microscope,
  Clock,
  Award,
  Hammer,
  Users,
  MapPin,
  ArrowRight,
  Phone,
} from 'lucide-react'
import ServiceWorksGallery from './service-works-gallery'
import { trackPhoneClick } from '@/lib/gtag'

const fadeUp = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

/* ── Timeline — storia aziendale ─────────────────────────── */
const timeline = [
  { year: '1994', title: 'La Fondazione', desc: 'Tetto94 nasce a Venezia come piccola impresa artigiana specializzata in coperture in cotto e laterizio, con un impegno chiaro: qualità del lavoro prima di tutto.' },
  { year: '2008', title: 'Espansione Regionale', desc: "L'attività si estende alle province di Padova, Treviso e Vicenza. Il team cresce e si specializza in impermeabilizzazione e rifacimento di coperture complesse." },
  { year: '2019', title: "Ispezione con Drone", desc: 'Tetto94 introduce la diagnosi aerea con drone per ogni sopralluogo: precisione millimetrica, zero rischi per il cliente, report fotografico completo e gratuito.' },
  { year: '2026', title: 'Leader nel Nord-Est', desc: 'Oltre 500 tetti completati e più di 30 anni di esperienza. Oggi operiamo in tutto il Nord-Est Italia con garanzia scritta su ogni intervento.' },
]

/* ── Pillars — perché siamo diversi ──────────────────────── */
const pillars = [
  {
    icon: Microscope,
    num: '01',
    title: 'Diagnosi con Drone, Non a Occhio',
    desc: 'Prima di ogni preventivo, ispezioniamo la copertura con drone professionale: ogni tegola, ogni giunto, ogni possibile infiltrazione viene documentata in un report fotografico gratuito. Nessuna supposizione, solo dati reali.',
  },
  {
    icon: ShieldCheck,
    num: '02',
    title: 'Garanzia Scritta su Ogni Intervento',
    desc: "Ogni lavoro è coperto da garanzia scritta consegnata a fine cantiere: materiali, manodopera e infiltrazioni post-intervento. Se qualcosa non va, torniamo senza alcun costo aggiuntivo.",
  },
  {
    icon: Clock,
    num: '03',
    title: 'Intervento Rapido, Zero Attese',
    desc: 'Rispondiamo entro 24 ore e, in caso di emergenza (temporali, grandinate, infiltrazioni attive), organizziamo il sopralluogo il prima possibile. Un tetto danneggiato non può aspettare settimane.',
  },
  {
    icon: Award,
    num: '04',
    title: 'Materiali Certificati, Standard ISO',
    desc: 'Utilizziamo esclusivamente materiali certificati CE — tegole in cotto naturale, guaine bituminose e polimeriche, membrane traspiranti — selezionati in base al tipo di copertura e al clima locale.',
  },
  {
    icon: Hammer,
    num: '05',
    title: "Trent'anni di Esperienza Artigiana",
    desc: 'Dal 1994 lavoriamo esclusivamente su coperture: non siamo generalisti. Ogni tecnico Tetto94 è formato specificamente su tegole, guaine, coibentazione e gestione delle infiltrazioni.',
  },
  {
    icon: Users,
    num: '06',
    title: 'Un Solo Referente, Zero Sorprese',
    desc: 'Dal primo sopralluogo alla consegna del certificato di garanzia, un unico tecnico segue il tuo cantiere. Preventivo trasparente e dettagliato, nessun costo nascosto in corso d\'opera.',
  },
]

/* ── Coverage area ────────────────────────────────────────── */
const regions = [
  { region: 'Veneto', cities: 'Venezia, Mestre, Padova, Treviso, Vicenza, Verona, Rovigo, Belluno, Chioggia, Mirano' },
  { region: 'Friuli-Venezia Giulia', cities: 'Udine, Trieste, Pordenone' },
  { region: 'Emilia-Romagna', cities: 'Bologna, Modena, Parma, Ferrara' },
]

function useSectionInView() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  return { ref, inView }
}

export default function PercheNoiContent() {
  const hero = useSectionInView()
  const timelineSection = useSectionInView()
  const pillarsSection = useSectionInView()
  const areaSection = useSectionInView()
  const ctaSection = useSectionInView()

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section ref={hero.ref} className="relative overflow-hidden bg-[#161616] pt-[100px] pb-16 lg:pt-[140px] lg:pb-24">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 size-[40rem] rounded-full bg-[#EB1C26]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.span
            variants={fadeUp(0)}
            initial="hidden"
            animate={hero.inView ? 'visible' : 'hidden'}
            className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]"
          >
            Chi Siamo — Dal 1994
          </motion.span>
          <motion.h1
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={hero.inView ? 'visible' : 'hidden'}
            className="mt-3 font-display text-[clamp(2.4rem,6vw,4.8rem)] leading-[0.98] text-white"
          >
            NON SOLO ARTIGIANI.{' '}
            <span className="text-[#EB1C26]">ESPERTI DI COPERTURE.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={hero.inView ? 'visible' : 'hidden'}
            className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-white/60 leading-relaxed"
          >
            Tetto94 è specializzata in riparazione, rifacimento e impermeabilizzazione di tetti
            nel Nord-Est Italia dal 1994. Oltre 30 anni di esperienza artigiana, ispezione con
            drone gratuita su ogni sopralluogo e garanzia scritta su ogni intervento — perché la
            fiducia si costruisce con la trasparenza, non con le promesse.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp(0.3)}
            initial="hidden"
            animate={hero.inView ? 'visible' : 'hidden'}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 max-w-2xl mx-auto"
          >
            {[
              { value: '32+', label: 'Anni di Esperienza' },
              { value: '500+', label: 'Tetti Completati' },
              { value: '0€', label: 'Ispezione Drone' },
              { value: '10', label: 'Anni di Garanzia' },
            ].map((s) => (
              <div key={s.label} className="bg-[#161616] px-4 py-5 flex flex-col items-center gap-1">
                <span className="font-display text-2xl sm:text-3xl font-black text-[#EB1C26]">{s.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-white/45">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Storia — Timeline ────────────────────────────── */}
      <section ref={timelineSection.ref} className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={timelineSection.inView ? 'visible' : 'hidden'}
            className="mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">La Nostra Storia</span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              TRENT&apos;ANNI SUI TETTI DEL VENETO
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[1px] top-2 bottom-2 w-px bg-[#E5E5E5] hidden sm:block" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  variants={fadeUp(0.1 + i * 0.1)}
                  initial="hidden"
                  animate={timelineSection.inView ? 'visible' : 'hidden'}
                  className="relative sm:pl-10"
                >
                  <div className="absolute left-[-3px] top-1.5 size-[7px] rounded-full bg-[#EB1C26] hidden sm:block" />
                  <span className="font-display text-lg font-black text-[#EB1C26]">{t.year}</span>
                  <h3 className="mt-1 font-display text-lg text-[#161616]">{t.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-sm text-[#888] leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Pillars — perché siamo diversi ──────────────── */}
      <section ref={pillarsSection.ref} className="bg-[#0B0B0B] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={pillarsSection.inView ? 'visible' : 'hidden'}
            className="mb-12 max-w-2xl"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Perché Scegliere Tetto94</span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-white">
              SEI RAGIONI PER CUI I NOSTRI CLIENTI TORNANO
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {pillars.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  variants={fadeUp(0.08 * i)}
                  initial="hidden"
                  animate={pillarsSection.inView ? 'visible' : 'hidden'}
                  className="group bg-[#0B0B0B] p-7 flex flex-col gap-4 hover:bg-[#161616] transition-colors duration-500"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-10 border border-white/10 group-hover:border-[#EB1C26]/40 flex items-center justify-center transition-colors duration-500">
                      <Icon className="size-5 text-white/70 group-hover:text-[#EB1C26] transition-colors duration-500" />
                    </div>
                    <span className="font-display text-xs text-white/25">{p.num}</span>
                  </div>
                  <h3 className="font-display text-base leading-snug text-white">{p.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed">{p.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Galleria lavori ──────────────────────────────── */}
      <ServiceWorksGallery serviceSlug="rifacimento-tetto" serviceName="I Nostri Lavori" />

      {/* ── 5. Area operativa ───────────────────────────────── */}
      <section ref={areaSection.ref} className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={areaSection.inView ? 'visible' : 'hidden'}
            className="mb-10"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Dove Operiamo</span>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-[#161616]">
              PRESENTI IN TUTTO IL NORD-EST ITALIA
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[#888] leading-relaxed">
              Da Venezia siamo cresciuti fino a coprire Veneto, Friuli-Venezia Giulia ed
              Emilia-Romagna, sempre con lo stesso standard: sopralluogo con drone gratuito
              entro 24 ore e garanzia scritta su ogni intervento.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-px bg-[#E5E5E5]">
            {regions.map((r, i) => (
              <motion.div
                key={r.region}
                variants={fadeUp(0.1 + i * 0.1)}
                initial="hidden"
                animate={areaSection.inView ? 'visible' : 'hidden'}
                className="bg-white p-6 flex flex-col gap-3 border border-[#EB1C26]"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#EB1C26]" />
                  <h3 className="font-display text-sm text-[#161616]">{r.region}</h3>
                </div>
                <p className="text-xs text-[#888] leading-relaxed">{r.cities}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA finale ────────────────────────────────────── */}
      <section ref={ctaSection.ref} className="relative overflow-hidden bg-[#161616] py-16 lg:py-24">
        <div className="absolute -bottom-32 right-0 size-[30rem] rounded-full bg-[#EB1C26]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            variants={fadeUp(0)}
            initial="hidden"
            animate={ctaSection.inView ? 'visible' : 'hidden'}
            className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-none text-white"
          >
            PARLIAMO DEL TUO TETTO
          </motion.h2>
          <motion.p
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={ctaSection.inView ? 'visible' : 'hidden'}
            className="mt-4 text-sm text-white/60 leading-relaxed"
          >
            Sopralluogo con drone gratuito, preventivo entro 24 ore, garanzia scritta su ogni intervento.
          </motion.p>
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={ctaSection.inView ? 'visible' : 'hidden'}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="/calcola-preventivo"
              className="inline-flex items-center gap-2 bg-[#EB1C26] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-[#c91620] transition-colors"
            >
              Richiedi Preventivo Gratuito <ArrowRight className="size-4" />
            </Link>
            <a
              href="tel:+393516519363"
              onClick={() => trackPhoneClick('contact_section')}
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/5 transition-colors"
            >
              <Phone className="size-4" /> +39 351 651 9363
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
