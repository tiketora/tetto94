import { ArrowRight, ArrowUpRight } from 'lucide-react'
import RiskMapDashboard from '@/components/tetto94/risk-map-dashboard'
import { RiskMapCtaLink, RiskMapFullLink } from '@/components/tetto94/risk-map-cta-link'
import { getRoofMapStats } from '@/lib/roof-map-data'

export default async function RiskMapHomeSection() {
  const stats = await getRoofMapStats()

  return (
    <section id="mappa-rischio" className="t94-type relative isolate overflow-hidden bg-[#0B0B0D] py-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_center,transparent_30%,#0B0B0D_75%),linear-gradient(to_right,rgba(255,255,255,0.0175)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.0175)_1px,transparent_1px)] [background-size:100%_100%,56px_56px,56px_56px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-48 -top-16 -z-10 size-[40rem] [background-image:radial-gradient(closest-side,rgba(235,28,38,0.2),rgba(235,28,38,0.08)_55%,transparent)]" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="font-t94 text-[15px] font-semibold text-[#EB1C26]">Mappa del rischio</span>
            <h2 className="mt-2 font-t94 font-bold leading-[1.1] text-balance">
              <span className="block text-[clamp(2rem,4.2vw,3.25rem)] text-white">Come stanno i tetti d&apos;Italia?</span>
              <span className="block text-[clamp(2rem,4.2vw,3.25rem)] text-[#EB1C26]">Scoprilo sulla mappa.</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-t94 text-[17px] leading-[1.6] text-white/65">
              Ogni analisi T94 Roof Index™ completata aggiunge un punto alla mappa, in forma anonima. Calcola anche tu il Roof Index del tuo tetto: 7 domande, 2 minuti, gratis.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <RiskMapCtaLink
                source="home_risk_map"
                className="inline-flex items-center gap-2 rounded-full bg-[#EB1C26] px-6 py-3 font-t94 text-sm font-semibold text-white transition hover:bg-white hover:text-[#161616]"
              >
                Calcola il tuo Roof Index
                <ArrowRight className="size-4" aria-hidden="true" />
              </RiskMapCtaLink>
              <RiskMapFullLink className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-t94 text-sm font-semibold text-white transition hover:bg-white/10">
                Apri la mappa completa
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </RiskMapFullLink>
            </div>
          </div>
        </div>

        <RiskMapDashboard stats={stats} source="home_risk_map" rankingSize={5} showZones={false} />
      </div>
    </section>
  )
}
