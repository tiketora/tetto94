// import { ArrowRight, MapPin } from 'lucide-react'
// import RiskMap from '@/components/tetto94/risk-map'
// import { getRoofMapStats } from '@/lib/roof-map-data'
// import { RiskMapCtaLink } from '@/components/tetto94/risk-map-cta-link'

// function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
//   return (
//     <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
//       <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35">{label}</p>
//       <p className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[#161616]">{value}</p>
//       {sub && <p className="mt-2 text-xs text-[#494949] leading-relaxed">{sub}</p>}
//     </div>
//   )
// }

// export default async function RiskMapContent() {
//   const stats = await getRoofMapStats()
//   const { totalAnalyses, nationalAvgScore, cities, zone } = stats

//   const topCities = [...cities].sort((a, b) => b.avgScore - a.avgScore).slice(0, 8)

//   return (
//     <>
//       {/* ── Hero ─────────────────────────────────────────────── */}
//       <section className="border-b border-[#161616]/10 bg-white px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
//         <div className="mx-auto max-w-5xl">
//           <span className="text-xs font-bold tracking-[0.35em] text-[#161616]/30 uppercase">
//             T94 Roof Index™ — Dati Aggregati
//           </span>
//           <h1 className="font-display mt-3 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-[#161616]">
//             MAPPA DEL<br />RISCHIO
//           </h1>
//           <p className="mt-6 max-w-xl text-base text-[#494949] leading-relaxed">
//             Ogni analisi completata con il T94 Roof Index™ contribuisce, in forma anonima e aggregata, a
//             questa mappa. Nessun dato personale — solo zona, città e punteggio di rischio.
//           </p>
//         </div>
//       </section>

//       {/* ── Stats + Map ──────────────────────────────────────── */}
//       <section className="bg-[#F5F5F5] px-6 py-16 lg:py-20">
//         <div className="mx-auto max-w-5xl">
//           {totalAnalyses === 0 ? (
//             <div className="border border-[#161616]/10 bg-white p-12 text-center shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
//               <MapPin className="mx-auto size-8 text-[#161616]/20" />
//               <p className="font-display mt-4 text-xl text-[#161616]">Nessun dato ancora disponibile</p>
//               <p className="mt-2 text-sm text-[#494949]">
//                 La mappa si popolerà man mano che i visitatori completano il T94 Roof Index™.
//               </p>
//             </div>
//           ) : (
//             <>
//               <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
//                 <StatCard label="Analisi Totali" value={String(totalAnalyses)} sub="Test completati in tutta Italia" />
//                 <StatCard
//                   label="Score Medio Nazionale"
//                   value={`${nationalAvgScore}/100`}
//                   sub="Su scala di rischio 0–100"
//                 />
//                 <StatCard
//                   label="Città Monitorate"
//                   value={String(cities.length)}
//                   sub="Con almeno 3 analisi registrate"
//                 />
//               </div>

//               <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
//                 {/* Map */}
//                 <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)] lg:p-8">
//                   <RiskMap cities={cities} />
//                 </div>

//                 {/* Ranking + zone breakdown */}
//                 <div className="flex flex-col gap-6">
//                   {topCities.length > 0 && (
//                     <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
//                       <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35 mb-4">
//                         Città a Rischio Più Elevato
//                       </p>
//                       <div className="space-y-3">
//                         {topCities.map((city, i) => (
//                           <div key={city.citta} className="flex items-center gap-3">
//                             <span className="w-5 shrink-0 text-right text-[11px] font-mono text-[#161616]/30">
//                               {String(i + 1).padStart(2, '0')}
//                             </span>
//                             <span className="flex-1 text-sm text-[#161616]">{city.citta}</span>
//                             <span className="text-xs font-mono text-[#161616]/45">{city.avgScore}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
//                     <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35 mb-4">Per Zona Climatica</p>
//                     <div className="space-y-4">
//                       {zone.map((z) => (
//                         <div key={z.zona}>
//                           <div className="flex items-baseline justify-between">
//                             <span className="text-sm capitalize text-[#161616]">{z.zona}</span>
//                             <span className="text-xs font-mono text-[#161616]/45">{z.avgScore}/100</span>
//                           </div>
//                           <div className="mt-1.5 h-px bg-[#161616]/10 relative overflow-hidden">
//                             <div
//                               className="absolute inset-y-0 left-0 bg-[#EB1C26]"
//                               style={{ width: `${z.avgScore}%` }}
//                             />
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="border-l-2 border-[#EB1C26] bg-[#EB1C26]/[0.04] px-5 py-4">
//                     <p className="text-sm text-[#161616]/80 leading-relaxed">
//                       Vuoi sapere il rischio del tuo tetto specifico? Completa il T94 Roof Index™ in 2 minuti.
//                     </p>
//                     <RiskMapCtaLink
//                       source="mappa_rischio"
//                       className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#EB1C26] hover:text-[#161616] transition-colors"
//                     >
//                       Calcola il tuo Roof Index
//                       <ArrowRight className="size-3.5" />
//                     </RiskMapCtaLink>
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}

//           <p className="mt-10 text-xs text-[#161616]/35 leading-relaxed max-w-2xl">
//             I dati mostrati sono aggregati per città (minimo 3 analisi) e non sono in alcun modo collegabili a
//             singoli utenti o indirizzi. Le coordinate geografiche rappresentano il centro della città indicata,
//             non un indirizzo specifico.
//           </p>
//         </div>
//       </section>

//       {/* ── CTA band ─────────────────────────────────────────── */}
//       <section className="bg-[#161616] px-6 py-16 text-center lg:py-20">
//         <div className="mx-auto max-w-2xl">
//           <h2 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight text-white">
//             SCOPRI IL RISCHIO<br />DEL TUO TETTO
//           </h2>
//           <p className="mt-4 text-sm text-white/60 leading-relaxed">
//             Analisi gratuita in 2 minuti, sopralluogo tecnico senza impegno.
//           </p>
//           <RiskMapCtaLink
//             source="mappa_rischio_footer"
//             className="mt-8 inline-flex items-center justify-center gap-2 bg-[#EB1C26] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.25)] hover:bg-white hover:text-[#161616] transition-colors duration-300"
//           >
//             Calcola il T94 Roof Index™
//             <ArrowRight className="size-4" />
//           </RiskMapCtaLink>
//         </div>
//       </section>
//     </>
//   )
// }


import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import RiskMapDashboard from '@/components/tetto94/risk-map-dashboard'
import { RiskMapCtaLink } from '@/components/tetto94/risk-map-cta-link'
import { getRoofMapStats } from '@/lib/roof-map-data'
import { RISK_BANDS, getRiskBand } from '@/lib/risk-bands'
import { RISK_MAP_FAQ } from '@/data/risk-map-faq'
import { SITE_URL, breadcrumbSchema, faqPageSchema } from '@/lib/schema'

const RELATED_LINKS = [
  { href: '/ripasso-tetto-senza-ponteggi', title: 'Ripasso tetto senza ponteggi', text: 'Manutenzione e controllo della copertura con ispezione drone.' },
  { href: '/tetto-condominio', title: 'Tetto del condominio', text: 'Interventi su coperture condominiali, dalla diagnosi al cantiere.' },
  { href: '/servizi', title: 'Tutti i servizi', text: 'Rifacimento, impermeabilizzazione, coibentazione e altro.' },
  { href: '/blog', title: 'Guide e consigli', text: 'Articoli pratici su manutenzione, costi e bonus per il tetto.' },
]

export default async function RiskMapContent() {
  const stats = await getRoofMapStats()
  const { totalAnalyses, nationalAvgScore, cities, updatedAt } = stats
  const ranked = [...cities].sort((a, b) => b.avgScore - a.avgScore)
  const hasData = totalAnalyses > 0
  const updatedLabel = new Date(updatedAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })

  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'Mappa del rischio dei tetti in Italia — T94 Roof Index™',
    description:
      'Punteggio medio di rischio dei tetti per città, calcolato in forma aggregata e anonima dalle analisi T94 Roof Index™ completate dai visitatori di Tetto94 (scala 0–100, città con almeno 3 analisi).',
    url: `${SITE_URL}/mappa-rischio`,
    inLanguage: 'it',
    creator: { '@type': 'Organization', name: 'Tetto94', url: SITE_URL },
    spatialCoverage: { '@type': 'Place', name: 'Italia' },
    variableMeasured: 'Punteggio di rischio del tetto (0–100)',
    ...(hasData ? { dateModified: updatedAt } : {}),
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/mappa-rischio#webpage`,
    url: `${SITE_URL}/mappa-rischio`,
    name: 'Mappa del rischio dei tetti in Italia',
    isPartOf: { '@id': `${SITE_URL}/#business` },
    inLanguage: 'it',
  }

  const schemas = [
    webPageSchema,
    datasetSchema,
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Mappa del rischio', path: '/mappa-rischio' },
    ]),
    faqPageSchema(RISK_MAP_FAQ),
  ]

  return (
    <div className="t94-type">
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* Hero + live dashboard */}
      <section className="relative isolate overflow-hidden bg-[#0B0B0D] px-6 pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div
          className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_top,transparent_30%,#0B0B0D_75%),linear-gradient(to_right,rgba(255,255,255,0.0175)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.0175)_1px,transparent_1px)] [background-size:100%_100%,56px_56px,56px_56px]"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -right-40 -top-10 -z-10 size-[42rem] [background-image:radial-gradient(closest-side,rgba(235,28,38,0.2),rgba(235,28,38,0.08)_55%,transparent)]" aria-hidden="true" />

        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="font-t94 text-xs text-white/45">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="transition hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">Mappa del rischio</li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
            <div>
              <span className="font-t94 text-[15px] font-semibold text-[#EB1C26]">T94 Roof Index™ · dati aggregati</span>
              <h1 className="mt-2 font-t94 text-[clamp(2.2rem,5.6vw,4.2rem)] font-bold leading-[1.05] text-balance text-white">
                Mappa del rischio dei tetti in Italia
              </h1>
            </div>
            <div>
              <p className="font-t94 text-[17px] leading-[1.6] text-white/65">
                Il livello di rischio dei tetti città per città, costruito con le analisi reali del T94 Roof Index™. Dati aggregati e anonimi, aggiornati automaticamente.
              </p>
              {hasData && <p className="mt-2 font-t94 text-xs text-white/40">Ultimo aggiornamento: {updatedLabel}</p>}
            </div>
          </div>

          <div className="mt-10">
            <RiskMapDashboard stats={stats} source="mappa_rischio" rankingSize={8} />
          </div>

          <p className="mt-8 max-w-2xl font-t94 text-xs leading-relaxed text-white/40">
            I dati sono aggregati per città (minimo 3 analisi) e non sono collegabili a singoli utenti o indirizzi. Le coordinate rappresentano il centro della città, non un indirizzo specifico.
          </p>
        </div>
      </section>

      {/* Crawlable city table */}
      {ranked.length > 0 && (
        <section className="bg-white px-6 py-16 lg:py-20" aria-labelledby="elenco-citta">
          <div className="mx-auto max-w-5xl">
            <span className="font-t94 text-[15px] font-semibold text-[#EB1C26]">Dati per città</span>
            <h2 id="elenco-citta" className="mt-2 font-t94 text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.1] text-[#161616]">
              Rischio dei tetti per città
            </h2>
            <p className="mt-3 max-w-2xl font-t94 text-[#494949]">
              Il punteggio medio nazionale è <strong>{nationalAvgScore}/100</strong> su {totalAnalyses} analisi. Ecco le città con almeno 3 analisi completate.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-[#161616]/10">
              <table className="w-full min-w-[480px] text-left font-t94 text-sm">
                <caption className="sr-only">Punteggio medio di rischio dei tetti per città</caption>
                <thead className="bg-[#F5F5F5] text-[11px] uppercase tracking-[0.16em] text-[#161616]/55">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Città</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Analisi</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Score medio</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Livello</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#161616]/10">
                  {ranked.map((c) => {
                    const band = getRiskBand(c.avgScore)
                    return (
                      <tr key={c.citta}>
                        <th scope="row" className="px-4 py-3 font-semibold text-[#161616]">{c.citta}</th>
                        <td className="px-4 py-3 tabular-nums text-[#494949]">{c.count}</td>
                        <td className="px-4 py-3 tabular-nums text-[#161616]">{c.avgScore}/100</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2 text-[#161616]">
                            <span className="size-2.5 rounded-full" style={{ backgroundColor: band.color }} aria-hidden="true" />
                            {band.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* How to read */}
      <section className="bg-[#F5F5F5] px-6 py-16 lg:py-20" aria-labelledby="come-leggere">
        <div className="mx-auto max-w-5xl">
          <span className="font-t94 text-[15px] font-semibold text-[#EB1C26]">Metodo</span>
          <h2 id="come-leggere" className="mt-2 font-t94 text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.1] text-[#161616]">
            Come leggere la mappa
          </h2>
          <p className="mt-3 max-w-2xl font-t94 text-[#494949]">
            Il T94 Roof Index™ assegna a ogni tetto un punteggio da 0 a 100 in base a zona climatica, età, materiale, problemi riscontrati e ultimo intervento. Più il punteggio è alto, maggiore è il rischio.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {RISK_BANDS.map((b) => (
              <div key={b.key} className="rounded-2xl border border-[#161616]/10 bg-white p-4">
                <span className="block h-1.5 w-10 rounded-full" style={{ backgroundColor: b.color }} aria-hidden="true" />
                <p className="mt-3 font-t94 text-base font-bold text-[#161616]">{b.label}</p>
                <p className="font-t94 text-xs tabular-nums text-[#161616]/50">Score {b.range}</p>
                <p className="mt-2 font-t94 text-sm leading-relaxed text-[#494949]">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-16 lg:py-20" aria-labelledby="faq-mappa">
        <div className="mx-auto max-w-3xl">
          <span className="font-t94 text-[15px] font-semibold text-[#EB1C26]">Domande frequenti</span>
          <h2 id="faq-mappa" className="mt-2 font-t94 text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-[1.1] text-[#161616]">
            Mappa del rischio: cosa devi sapere
          </h2>
          <div className="mt-8 divide-y divide-[#161616]/10 rounded-2xl border border-[#161616]/10">
            {RISK_MAP_FAQ.map((item) => (
              <details key={item.question} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-t94 text-base font-semibold text-[#161616] [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown className="size-4 shrink-0 text-[#161616]/40 transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-3 font-t94 text-sm leading-relaxed text-[#494949]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="bg-[#F5F5F5] px-6 py-16 lg:py-20" aria-labelledby="approfondisci">
        <div className="mx-auto max-w-5xl">
          <h2 id="approfondisci" className="font-t94 text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-[#161616]">Approfondisci</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {RELATED_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="group rounded-2xl border border-[#161616]/10 bg-white p-5 transition hover:border-[#EB1C26]/40 hover:shadow-md">
                <p className="flex items-center justify-between font-t94 text-base font-bold text-[#161616]">
                  {l.title}
                  <ArrowRight className="size-4 text-[#EB1C26] transition group-hover:translate-x-1" aria-hidden="true" />
                </p>
                <p className="mt-1 font-t94 text-sm text-[#494949]">{l.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-[#0B0B0D] px-6 py-16 text-center lg:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-t94 text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold leading-tight text-balance text-white">
            Scopri il rischio del <span className="text-[#EB1C26]">tuo</span> tetto
          </h2>
          <p className="mt-4 font-t94 text-sm leading-relaxed text-white/60">
            Analisi gratuita in 2 minuti, sopralluogo tecnico senza impegno.
          </p>
          <RiskMapCtaLink
            source="mappa_rischio_footer"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#EB1C26] px-8 py-4 font-t94 text-sm font-semibold text-white transition hover:bg-white hover:text-[#161616]"
          >
            Calcola il T94 Roof Index™
            <ArrowRight className="size-4" aria-hidden="true" />
          </RiskMapCtaLink>
        </div>
      </section>
    </div>
  )
}
