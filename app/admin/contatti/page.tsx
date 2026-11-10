import { Download } from 'lucide-react'
import ContactForm, { CHANNEL_LABELS, STATUS_LABELS } from '@/components/admin/contact-form'
import ContactRow from '@/components/admin/contact-row'
import { CONTACT_CHANNELS, CONTACT_STATUSES } from '@/lib/db/schema'
import { getContactKpis, listContacts, type ContactChannel, type ContactStatus } from '@/lib/contacts/queries'

type SearchParams = Promise<{ channel?: string; status?: string; days?: string }>

const PERIODS = [
  { value: '', label: 'Sempre' },
  { value: '7', label: 'Ultimi 7 giorni' },
  { value: '30', label: 'Ultimi 30 giorni' },
  { value: '90', label: 'Ultimi 90 giorni' },
]

const selectClass =
  'border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white focus:border-[#EB1C26] focus:outline-none'

export default async function AdminContactsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const channel = CONTACT_CHANNELS.find((c) => c === params.channel) as ContactChannel | undefined
  const status = CONTACT_STATUSES.find((s) => s === params.status) as ContactStatus | undefined
  const days = PERIODS.some((p) => p.value === params.days) && params.days ? Number(params.days) : undefined

  const [contacts, kpis] = await Promise.all([listContacts({ channel, status, days }), getContactKpis()])

  const exportQuery = new URLSearchParams()
  if (channel) exportQuery.set('channel', channel)
  if (status) exportQuery.set('status', status)
  if (days) exportQuery.set('days', String(days))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Registro contatti</h1>
        <a
          href={`/api/admin/contacts/export${exportQuery.size ? `?${exportQuery}` : ''}`}
          className="flex items-center gap-1.5 border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
        >
          <Download className="size-3.5" />
          Esporta CSV
        </a>
      </div>

      <section aria-label="Riepilogo ultimi 7 giorni" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Kpi label="Ultimi 7 giorni" value={kpis.weekTotal} />
        {CONTACT_CHANNELS.map((c) => (
          <Kpi key={c} label={CHANNEL_LABELS[c]} value={kpis.perChannel[c]} />
        ))}
        <Kpi label="Da gestire" value={kpis.pending} highlight />
      </section>

      <section aria-labelledby="new-contact">
        <h2 id="new-contact" className="mb-3 text-sm font-bold uppercase tracking-[0.15em] text-white/60">
          Registra un contatto
        </h2>
        <ContactForm />
      </section>

      <section aria-labelledby="contact-list">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 id="contact-list" className="text-sm font-bold uppercase tracking-[0.15em] text-white/60">
            Contatti ({contacts.length})
          </h2>
          <form method="GET" className="flex flex-wrap items-center gap-2">
            <select name="channel" defaultValue={channel ?? ''} aria-label="Canale" className={selectClass}>
              <option value="" className="bg-[#161616]">
                Tutti i canali
              </option>
              {CONTACT_CHANNELS.map((c) => (
                <option key={c} value={c} className="bg-[#161616]">
                  {CHANNEL_LABELS[c]}
                </option>
              ))}
            </select>
            <select name="status" defaultValue={status ?? ''} aria-label="Stato" className={selectClass}>
              <option value="" className="bg-[#161616]">
                Tutti gli stati
              </option>
              {CONTACT_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#161616]">
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <select name="days" defaultValue={days ? String(days) : ''} aria-label="Periodo" className={selectClass}>
              {PERIODS.map((p) => (
                <option key={p.value} value={p.value} className="bg-[#161616]">
                  {p.label}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">
              Filtra
            </button>
          </form>
        </div>

        {contacts.length === 0 ? (
          <p className="border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/50">
            Nessun contatto trovato.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-white/10 border border-white/10 bg-white/[0.03]">
            {contacts.map((contact) => (
              <ContactRow key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function Kpi({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="border border-white/10 bg-white/[0.03] p-4">
      <p className={`font-display text-3xl ${highlight ? 'text-[#EB1C26]' : 'text-white'}`}>{value}</p>
      <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-white/40">{label}</p>
    </div>
  )
}
