'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2, Trash2 } from 'lucide-react'
import { CONTACT_STATUSES } from '@/lib/db/schema'
import type { ContactRow as ContactRecord } from '@/lib/contacts/queries'
import { CHANNEL_LABELS, STATUS_LABELS } from '@/components/admin/contact-form'

const dateFormat = new Intl.DateTimeFormat('it-IT', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Rome',
})

export default function ContactRow({ contact }: { contact: ContactRecord }) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function request(init: RequestInit) {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/contacts/${contact.id}`, {
        ...init,
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error ?? 'Operazione non riuscita.')
        return
      }
      router.refresh()
    } catch {
      setError('Errore di rete.')
    } finally {
      setBusy(false)
    }
  }

  function handleDelete() {
    if (!window.confirm('Eliminare definitivamente questo contatto?')) return
    void request({ method: 'DELETE' })
  }

  return (
    <div className="flex flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 space-y-1">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white/70">
            {CHANNEL_LABELS[contact.channel]}
          </span>
          <span className="font-semibold text-white">{contact.citta ?? 'Citta non indicata'}</span>
          {contact.servizio && <span className="text-white/50">· {contact.servizio}</span>}
        </div>
        <p className="text-xs text-white/40">
          {dateFormat.format(contact.contactedAt)}
          {contact.contactName && ` · ${contact.contactName}`}
          {contact.contactValue && ` · ${contact.contactValue}`}
        </p>
        {contact.notes && <p className="text-xs text-white/50">{contact.notes}</p>}
        {error && (
          <p role="alert" className="text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <label className="sr-only" htmlFor={`status-${contact.id}`}>
          Stato
        </label>
        <select
          id={`status-${contact.id}`}
          value={contact.status}
          disabled={busy}
          onChange={(e) => void request({ method: 'PATCH', body: JSON.stringify({ status: e.target.value }) })}
          className="border border-white/15 bg-white/[0.04] px-2 py-1.5 text-xs text-white focus:border-[#EB1C26] focus:outline-none"
        >
          {CONTACT_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-[#161616]">
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy}
          onClick={() => void request({ method: 'PATCH', body: JSON.stringify({ showPublic: !contact.showPublic }) })}
          aria-pressed={contact.showPublic}
          title={contact.showPublic ? 'Visibile sul sito (anonimo)' : 'Non visibile sul sito'}
          className={`flex items-center gap-1.5 border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            contact.showPublic
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-white/15 text-white/50 hover:text-white'
          }`}
        >
          {contact.showPublic ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
          {contact.showPublic ? 'Pubblico' : 'Privato'}
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={handleDelete}
          aria-label="Elimina contatto"
          className="p-1.5 text-white/40 transition-colors hover:text-red-400"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
        </button>
      </div>
    </div>
  )
}
