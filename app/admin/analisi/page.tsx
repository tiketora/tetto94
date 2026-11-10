import { count, desc, gte, isNotNull, sql } from 'drizzle-orm'
import { Download } from 'lucide-react'
import { db } from '@/lib/db'
import { roofAnalyses, roofIndexLeads } from '@/lib/db/schema'

const dateFormat = new Intl.DateTimeFormat('it-IT', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Rome',
})

export default async function AdminAnalysesPage() {
  const weekAgo = new Date(Date.now() - 7 * 86_400_000)

  const [leads, [totals], [weekly], topCities] = await Promise.all([
    db.select().from(roofIndexLeads).orderBy(desc(roofIndexLeads.createdAt)).limit(100),
    db.select({ n: count() }).from(roofAnalyses),
    db.select({ n: count() }).from(roofAnalyses).where(gte(roofAnalyses.createdAt, weekAgo)),
    db
      .select({ citta: roofAnalyses.citta, n: count() })
      .from(roofAnalyses)
      .where(isNotNull(roofAnalyses.citta))
      .groupBy(roofAnalyses.citta)
      .orderBy(sql`count(*) desc`)
      .limit(15),
  ])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Analisi del tetto</h1>
        <a
          href="/api/admin/analyses/export"
          className="flex items-center gap-1.5 border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
        >
          <Download className="size-3.5" />
          Esporta lead CSV
        </a>
      </div>

      <section aria-label="Riepilogo" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Analisi totali" value={totals?.n ?? 0} />
        <Stat label="Ultimi 7 giorni" value={weekly?.n ?? 0} />
        <Stat label="Lead con telefono" value={leads.length} />
      </section>

      <section aria-labelledby="top-cities">
        <h2 id="top-cities" className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/60">
          Citta con piu analisi
        </h2>
        {topCities.length === 0 ? (
          <p className="border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/50">
            Ancora nessuna analisi.
          </p>
        ) : (
          <ul className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {topCities.map((row) => (
              <li key={row.citta} className="flex items-center justify-between bg-[#161616] px-4 py-3 text-sm">
                <span className="truncate text-white/80">{row.citta}</span>
                <span className="font-semibold text-white">{row.n}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="leads">
        <h2 id="leads" className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/60">
          Ultimi lead dal calcolatore (solo admin)
        </h2>
        {leads.length === 0 ? (
          <p className="border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/50">
            Nessun lead ricevuto.
          </p>
        ) : (
          <div className="overflow-x-auto border border-white/10 bg-white/[0.03]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.15em] text-white/40">
                  <th scope="col" className="px-4 py-3 font-bold">Data</th>
                  <th scope="col" className="px-4 py-3 font-bold">Telefono</th>
                  <th scope="col" className="px-4 py-3 font-bold">Citta</th>
                  <th scope="col" className="px-4 py-3 font-bold">Superficie</th>
                  <th scope="col" className="px-4 py-3 font-bold">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white/80">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-4 py-3 text-white/50">{dateFormat.format(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <a href={`tel:${lead.telefono}`} className="text-white hover:text-[#EB1C26]">
                        {lead.telefono}
                      </a>
                    </td>
                    <td className="px-4 py-3">{lead.citta ?? '-'}</td>
                    <td className="px-4 py-3">{lead.superficie} m²</td>
                    <td className="px-4 py-3">
                      {lead.score} <span className="text-white/40">· {lead.band}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-4">
      <p className="font-display text-3xl text-white">{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">{label}</p>
    </div>
  )
}
