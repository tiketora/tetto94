import { ArrowRight, MapPin } from 'lucide-react'
import RiskMap from '@/components/tetto94/risk-map'
import { getRoofMapStats } from '@/lib/roof-map-data'
import { RiskMapCtaLink } from '@/components/tetto94/risk-map-cta-link'

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
      <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35">{label}</p>
      <p className="font-display mt-2 text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[#161616]">{value}</p>
      {sub && <p className="mt-2 text-xs text-[#494949] leading-relaxed">{sub}</p>}
    </div>
  )
}

export default async function RiskMapContent() {
  const stats = await getRoofMapStats()
  const { totalAnalyses, nationalAvgScore, cities, zone } = stats

  const topCities = [...cities].sort((a, b) => b.avgScore - a.avgScore).slice(0, 8)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-[#161616]/10 bg-white px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="mx-auto max-w-5xl">
          <span className="text-xs font-bold tracking-[0.35em] text-[#161616]/30 uppercase">
            T94 Roof Index™ — Dati Aggregati
          </span>
          <h1 className="font-display mt-3 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-[#161616]">
            MAPPA DEL<br />RISCHIO
          </h1>
          <p className="mt-6 max-w-xl text-base text-[#494949] leading-relaxed">
            Ogni analisi completata con il T94 Roof Index™ contribuisce, in forma anonima e aggregata, a
            questa mappa. Nessun dato personale — solo zona, città e punteggio di rischio.
          </p>
        </div>
      </section>

      {/* ── Stats + Map ──────────────────────────────────────── */}
      <section className="bg-[#F5F5F5] px-6 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl">
          {totalAnalyses === 0 ? (
            <div className="border border-[#161616]/10 bg-white p-12 text-center shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
              <MapPin className="mx-auto size-8 text-[#161616]/20" />
              <p className="font-display mt-4 text-xl text-[#161616]">Nessun dato ancora disponibile</p>
              <p className="mt-2 text-sm text-[#494949]">
                La mappa si popolerà man mano che i visitatori completano il T94 Roof Index™.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Analisi Totali" value={String(totalAnalyses)} sub="Test completati in tutta Italia" />
                <StatCard
                  label="Score Medio Nazionale"
                  value={`${nationalAvgScore}/100`}
                  sub="Su scala di rischio 0–100"
                />
                <StatCard
                  label="Città Monitorate"
                  value={String(cities.length)}
                  sub="Con almeno 3 analisi registrate"
                />
              </div>

              <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                {/* Map */}
                <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)] lg:p-8">
                  <RiskMap cities={cities} />
                </div>

                {/* Ranking + zone breakdown */}
                <div className="flex flex-col gap-6">
                  {topCities.length > 0 && (
                    <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35 mb-4">
                        Città a Rischio Più Elevato
                      </p>
                      <div className="space-y-3">
                        {topCities.map((city, i) => (
                          <div key={city.citta} className="flex items-center gap-3">
                            <span className="w-5 shrink-0 text-right text-[11px] font-mono text-[#161616]/30">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="flex-1 text-sm text-[#161616]">{city.citta}</span>
                            <span className="text-xs font-mono text-[#161616]/45">{city.avgScore}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="border border-[#161616]/10 bg-white p-6 shadow-[0_2px_24px_rgba(22,22,22,0.05)]">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-[#161616]/35 mb-4">Per Zona Climatica</p>
                    <div className="space-y-4">
                      {zone.map((z) => (
                        <div key={z.zona}>
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm capitalize text-[#161616]">{z.zona}</span>
                            <span className="text-xs font-mono text-[#161616]/45">{z.avgScore}/100</span>
                          </div>
                          <div className="mt-1.5 h-px bg-[#161616]/10 relative overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-[#EB1C26]"
                              style={{ width: `${z.avgScore}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-2 border-[#EB1C26] bg-[#EB1C26]/[0.04] px-5 py-4">
                    <p className="text-sm text-[#161616]/80 leading-relaxed">
                      Vuoi sapere il rischio del tuo tetto specifico? Completa il T94 Roof Index™ in 2 minuti.
                    </p>
                    <RiskMapCtaLink
                      source="mappa_rischio"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#EB1C26] hover:text-[#161616] transition-colors"
                    >
                      Calcola il tuo Roof Index
                      <ArrowRight className="size-3.5" />
                    </RiskMapCtaLink>
                  </div>
                </div>
              </div>
            </>
          )}

          <p className="mt-10 text-xs text-[#161616]/35 leading-relaxed max-w-2xl">
            I dati mostrati sono aggregati per città (minimo 3 analisi) e non sono in alcun modo collegabili a
            singoli utenti o indirizzi. Le coordinate geografiche rappresentano il centro della città indicata,
            non un indirizzo specifico.
          </p>
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="bg-[#161616] px-6 py-16 text-center lg:py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-[clamp(1.8rem,5vw,2.8rem)] leading-tight text-white">
            SCOPRI IL RISCHIO<br />DEL TUO TETTO
          </h2>
          <p className="mt-4 text-sm text-white/60 leading-relaxed">
            Analisi gratuita in 2 minuti, sopralluogo tecnico senza impegno.
          </p>
          <RiskMapCtaLink
            source="mappa_rischio_footer"
            className="mt-8 inline-flex items-center justify-center gap-2 bg-[#EB1C26] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(235,28,38,0.25)] hover:bg-white hover:text-[#161616] transition-colors duration-300"
          >
            Calcola il T94 Roof Index™
            <ArrowRight className="size-4" />
          </RiskMapCtaLink>
        </div>
      </section>
    </>
  )
}
