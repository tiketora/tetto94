// import { ArrowRight, MapPin, Radar } from 'lucide-react'
// import RiskMap from '@/components/tetto94/risk-map'
// import { RiskMapCtaLink } from '@/components/tetto94/risk-map-cta-link'
// import { getRiskBand } from '@/lib/risk-bands'
// import type { RoofMapStats } from '@/lib/roof-map-data'

// type Source = 'home_risk_map' | 'mappa_rischio'

// function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md sm:p-5">
//       <p className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
//       <p className="mt-2 font-t94 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-none tabular-nums text-white">
//         {value}
//         {suffix && <span className="ml-1 text-base font-semibold text-white/40">{suffix}</span>}
//       </p>
//     </div>
//   )
// }

// export default function RiskMapDashboard({
//   stats,
//   source,
//   rankingSize = 5,
//   showZones = true,
// }: {
//   stats: RoofMapStats
//   source: Source
//   rankingSize?: number
//   showZones?: boolean
// }) {
//   const { totalAnalyses, nationalAvgScore, cities, zone } = stats
//   const ranking = [...cities].sort((a, b) => b.avgScore - a.avgScore).slice(0, rankingSize)
//   const nationalBand = getRiskBand(nationalAvgScore)

//   if (totalAnalyses === 0) {
//     return (
//       <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-md">
//         <MapPin className="mx-auto size-8 text-white/30" aria-hidden="true" />
//         <p className="mt-4 font-t94 text-xl font-bold text-white">La mappa si sta popolando</p>
//         <p className="mx-auto mt-2 max-w-md font-t94 text-sm text-white/55">
//           Ogni analisi T94 Roof Index™ completata aggiunge un punto. Sii tra i primi a calcolare il rischio del tuo tetto.
//         </p>
//         <RiskMapCtaLink
//           source={source}
//           className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#EB1C26] px-6 py-3 font-t94 text-sm font-semibold text-white transition hover:bg-white hover:text-[#161616]"
//         >
//           Calcola il tuo Roof Index
//           <ArrowRight className="size-4" aria-hidden="true" />
//         </RiskMapCtaLink>
//       </div>
//     )
//   }

//   return (
//     <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-5">
//       {/* Map panel */}
//       <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 shadow-[0_30px_80px_-30px_rgba(235,28,38,0.35)] sm:p-5">
//         <div className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-[#EB1C26]/20 blur-3xl" aria-hidden="true" />
//         <div className="relative mb-3 flex items-center justify-between gap-3 px-1">
//           <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-t94 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
//             <span className="relative flex size-2" aria-hidden="true">
//               <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
//               <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
//             </span>
//             Dati reali
//           </span>
//           <span className="font-t94 text-[11px] text-white/40">Tocca una città per i dettagli</span>
//         </div>
//         <div className="relative">
//           <RiskMap cities={cities} theme="dark" />
//         </div>
//       </div>

//       {/* Side column */}
//       <div className="flex flex-col gap-4 lg:gap-5">
//         <div className="grid grid-cols-3 gap-3">
//           <Stat label="Analisi" value={String(totalAnalyses)} />
//           <Stat label="Score medio" value={String(nationalAvgScore)} suffix="/100" />
//           <Stat label="Città" value={String(cities.length)} />
//         </div>

//         <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
//           <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: nationalBand.color }} aria-hidden="true" />
//           <p className="font-t94 text-sm text-white/75">
//             Livello medio nazionale: <strong className="text-white">{nationalBand.label}</strong>
//           </p>
//         </div>

//         {ranking.length > 0 && (
//           <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
//             <h3 className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
//               Città a rischio più elevato
//             </h3>
//             <ol className="mt-4 space-y-3">
//               {ranking.map((city, i) => {
//                 const band = getRiskBand(city.avgScore)
//                 return (
//                   <li key={city.citta} className="flex items-center gap-3">
//                     <span className="w-5 shrink-0 text-right font-mono text-[11px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-baseline justify-between gap-2">
//                         <span className="truncate font-t94 text-sm text-white">{city.citta}</span>
//                         <span className="font-mono text-xs tabular-nums text-white/50">{city.avgScore}</span>
//                       </div>
//                       <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
//                         <div className="h-full rounded-full" style={{ width: `${city.avgScore}%`, backgroundColor: band.color }} />
//                       </div>
//                     </div>
//                   </li>
//                 )
//               })}
//             </ol>
//           </div>
//         )}

//         {showZones && zone.length > 0 && (
//           <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
//             <h3 className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Per zona climatica</h3>
//             <div className="mt-4 space-y-3">
//               {zone.map((z) => (
//                 <div key={z.zona}>
//                   <div className="flex items-baseline justify-between">
//                     <span className="font-t94 text-sm capitalize text-white">{z.zona}</span>
//                     <span className="font-mono text-xs tabular-nums text-white/50">{z.avgScore}/100</span>
//                   </div>
//                   <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
//                     <div className="h-full rounded-full" style={{ width: `${z.avgScore}%`, backgroundColor: getRiskBand(z.avgScore).color }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="relative overflow-hidden rounded-2xl bg-[#EB1C26] p-5">
//           <Radar className="absolute -right-3 -top-3 size-24 text-white/10" aria-hidden="true" />
//           <p className="relative font-t94 text-base font-semibold leading-snug text-white">
//             E il tuo tetto? Calcola il tuo Roof Index in 2 minuti, gratis.
//           </p>
//           <RiskMapCtaLink
//             source={source}
//             className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-t94 text-sm font-semibold text-[#161616] transition hover:bg-[#161616] hover:text-white"
//           >
//             Calcola ora
//             <ArrowRight className="size-4" aria-hidden="true" />
//           </RiskMapCtaLink>
//         </div>
//       </div>
//     </div>
//   )
// }


import { ArrowRight, MapPin, Radar } from 'lucide-react'
import RiskMap from '@/components/tetto94/risk-map'
import { RiskMapCtaLink } from '@/components/tetto94/risk-map-cta-link'
import { getRiskBand } from '@/lib/risk-bands'
import type { RoofMapStats } from '@/lib/roof-map-data'

type Source = 'home_risk_map' | 'mappa_rischio'

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <p className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-2 font-t94 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-none tabular-nums text-white">
        {value}
        {suffix && <span className="ml-1 text-base font-semibold text-white/40">{suffix}</span>}
      </p>
    </div>
  )
}

export default function RiskMapDashboard({
  stats,
  source,
  rankingSize = 5,
  showZones = true,
}: {
  stats: RoofMapStats
  source: Source
  rankingSize?: number
  showZones?: boolean
}) {
  const { totalAnalyses, nationalAvgScore, cities, zone } = stats
  const ranking = [...cities].sort((a, b) => b.avgScore - a.avgScore).slice(0, rankingSize)
  const nationalBand = getRiskBand(nationalAvgScore)

  if (totalAnalyses === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center">
        <MapPin className="mx-auto size-8 text-white/30" aria-hidden="true" />
        <p className="mt-4 font-t94 text-xl font-bold text-white">La mappa si sta popolando</p>
        <p className="mx-auto mt-2 max-w-md font-t94 text-sm text-white/55">
          Ogni analisi T94 Roof Index™ completata aggiunge un punto. Sii tra i primi a calcolare il rischio del tuo tetto.
        </p>
        <RiskMapCtaLink
          source={source}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#EB1C26] px-6 py-3 font-t94 text-sm font-semibold text-white transition hover:bg-white hover:text-[#161616]"
        >
          Calcola il tuo Roof Index
          <ArrowRight className="size-4" aria-hidden="true" />
        </RiskMapCtaLink>
      </div>
    )
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-5">
      {/* Map panel */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 shadow-[0_30px_80px_-30px_rgba(235,28,38,0.35)] sm:p-5">
        <div className="pointer-events-none absolute -top-32 -right-16 size-96 [background-image:radial-gradient(closest-side,rgba(235,28,38,0.2),rgba(235,28,38,0.08)_55%,transparent)]" aria-hidden="true" />
        <div className="relative mb-3 flex items-center justify-between gap-3 px-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 font-t94 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
<span className="inline-flex size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Dati reali
          </span>
          <span className="font-t94 text-[11px] text-white/40">Tocca una città per i dettagli</span>
        </div>
        <div className="relative">
          <RiskMap cities={cities} theme="dark" />
        </div>
      </div>

      {/* Side column */}
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="grid grid-cols-3 gap-3">
          <Stat label="Analisi" value={String(totalAnalyses)} />
          <Stat label="Score medio" value={String(nationalAvgScore)} suffix="/100" />
          <Stat label="Città" value={String(cities.length)} />
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
          <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: nationalBand.color }} aria-hidden="true" />
          <p className="font-t94 text-sm text-white/75">
            Livello medio nazionale: <strong className="text-white">{nationalBand.label}</strong>
          </p>
        </div>

        {ranking.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
              Città a rischio più elevato
            </h3>
            <ol className="mt-4 space-y-3">
              {ranking.map((city, i) => {
                const band = getRiskBand(city.avgScore)
                return (
                  <li key={city.citta} className="flex items-center gap-3">
                    <span className="w-5 shrink-0 text-right font-mono text-[11px] text-white/30">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-t94 text-sm text-white">{city.citta}</span>
                        <span className="font-mono text-xs tabular-nums text-white/50">{city.avgScore}</span>
                      </div>
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full" style={{ width: `${city.avgScore}%`, backgroundColor: band.color }} />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        )}

        {showZones && zone.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="font-t94 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">Per zona climatica</h3>
            <div className="mt-4 space-y-3">
              {zone.map((z) => (
                <div key={z.zona}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-t94 text-sm capitalize text-white">{z.zona}</span>
                    <span className="font-mono text-xs tabular-nums text-white/50">{z.avgScore}/100</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${z.avgScore}%`, backgroundColor: getRiskBand(z.avgScore).color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="relative overflow-hidden rounded-2xl bg-[#EB1C26] p-5">
          <Radar className="absolute -right-3 -top-3 size-24 text-white/10" aria-hidden="true" />
          <p className="relative font-t94 text-base font-semibold leading-snug text-white">
            E il tuo tetto? Calcola il tuo Roof Index in 2 minuti, gratis.
          </p>
          <RiskMapCtaLink
            source={source}
            className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-t94 text-sm font-semibold text-[#161616] transition hover:bg-[#161616] hover:text-white"
          >
            Calcola ora
            <ArrowRight className="size-4" aria-hidden="true" />
          </RiskMapCtaLink>
        </div>
      </div>
    </div>
  )
}
