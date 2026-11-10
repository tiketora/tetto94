'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Plus } from 'lucide-react'
import { CONTACT_CHANNELS, CONTACT_STATUSES } from '@/lib/db/schema'

const CHANNEL_LABELS: Record<(typeof CONTACT_CHANNELS)[number], string> = {
  telefono: 'Telefono',
  whatsapp: 'WhatsApp',
  email: 'Email',
  form: 'Modulo sito',
}

export const STATUS_LABELS: Record<(typeof CONTACT_STATUSES)[number], string> = {
  nuovo: 'Nuovo',
  contattato: 'Contattato',
  preventivo: 'Preventivo inviato',
  chiuso: 'Chiuso',
}

export { CHANNEL_LABELS }

function nowLocalInput(): string {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

const fieldClass =
  'w-full border border-white/15 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#EB1C26] focus:outline-none'
const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.15em] text-white/50'

export default function ContactForm() {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setPending(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      channel: fd.get('channel'),
      status: fd.get('status'),
      contactedAt: new Date(String(fd.get('contactedAt'))).toISOString(),
      citta: fd.get('citta'),
      servizio: fd.get('servizio'),
      contactName: fd.get('contactName'),
      contactValue: fd.get('contactValue'),
      notes: fd.get('notes'),
      showPublic: fd.get('showPublic') === 'on',
    }
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Errore durante il salvataggio.')
        return
      }
      setFormKey((k) => k + 1)
      router.refresh()
    } catch {
      setError('Errore di rete. Riprova.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="grid gap-4 border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div>
        <label htmlFor="channel" className={labelClass}>
          Canale
        </label>
        <select id="channel" name="channel" defaultValue="telefono" className={fieldClass}>
          {CONTACT_CHANNELS.map((c) => (
            <option key={c} value={c} className="bg-[#161616]">
              {CHANNEL_LABELS[c]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contactedAt" className={labelClass}>
          Data e ora reale
        </label>
        <input
          id="contactedAt"
          name="contactedAt"
          type="datetime-local"
          required
          defaultValue={nowLocalInput()}
          max={nowLocalInput()}
          className={fieldClass}
        />
      </div>
      <div>
        <label htmlFor="status" className={labelClass}>
          Stato
        </label>
        <select id="status" name="status" defaultValue="nuovo" className={fieldClass}>
          {CONTACT_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-[#161616]">
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="citta" className={labelClass}>
          Citta
        </label>
        <input id="citta" name="citta" maxLength={120} placeholder="es. Mestre" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="servizio" className={labelClass}>
          Servizio
        </label>
        <input id="servizio" name="servizio" maxLength={120} placeholder="es. Rifacimento tetto" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="contactName" className={labelClass}>
          Nome (interno)
        </label>
        <input id="contactName" name="contactName" maxLength={120} autoComplete="off" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="contactValue" className={labelClass}>
          Telefono o email (interno)
        </label>
        <input id="contactValue" name="contactValue" maxLength={120} autoComplete="off" className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="notes" className={labelClass}>
          Note (interne)
        </label>
        <input id="notes" name="notes" maxLength={2000} className={fieldClass} />
      </div>
      <div className="flex flex-col justify-end gap-3 sm:col-span-2 lg:col-span-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-start gap-2.5 text-sm text-white/70">
          <input type="checkbox" name="showPublic" className="mt-0.5 size-4 accent-[#EB1C26]" />
          <span>
            Mostra sul sito in forma anonima (solo citta e giorno).
            <span className="block text-xs text-white/40">
              Spunta solo se la richiesta e reale e il cliente ha dato il consenso.
            </span>
          </span>
        </label>
        <button
          type="submit"
          disabled={pending}
          className="flex items-center justify-center gap-1.5 bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
          Aggiungi contatto
        </button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-400 sm:col-span-2 lg:col-span-3">
          {error}
        </p>
      )}
    </form>
  )
}
