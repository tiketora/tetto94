'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
import { trackFormSubmit, trackPhoneClick } from '@/lib/gtag'

interface LPFormData {
  nome_cognome: string
  telefono: string
  citta: string
  messaggio: string
}

interface Props {
  region: string
  formId: string  // unique per page instance (top/bottom)
  pageId: string  // e.g. 'lp_veneto' — sent to GA4/Ads for attribution
}

export default function LPForm({ region, formId, pageId }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState<LPFormData>({
    nome_cognome: '',
    telefono: '',
    citta: '',
    messaggio: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome_cognome.split(' ')[0] ?? form.nome_cognome,
          cognome: form.nome_cognome.split(' ').slice(1).join(' ') ?? '',
          telefono: form.telefono,
          citta: form.citta,
          messaggio: form.messaggio,
          servizio: `Rifacimento Tetto — ${region}`,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? "Errore durante l'invio. Riprova.")
        setStatus('error')
        return
      }
      setStatus('success')
      trackFormSubmit({ service: `Rifacimento Tetto — ${region}`, city: form.citta, page_id: pageId })
    } catch {
      setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-[#161616]/15 bg-[#F5F5F5] px-4 py-3.5 text-sm text-[#161616] placeholder-[#161616]/40 focus:border-[#EB1C26] focus:outline-none focus:ring-1 focus:ring-[#EB1C26] transition-colors'

  return (
    <div className="bg-white border border-[#161616]/10 p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <div className="size-16 rounded-full bg-[#EB1C26]/10 flex items-center justify-center">
              <CheckCircle2 className="size-8 text-[#EB1C26]" />
            </div>
            <h3 className="font-display text-2xl text-[#161616]">Richiesta Inviata!</h3>
            <p className="text-sm text-[#161616]/60 max-w-xs leading-relaxed">
              Grazie! Un nostro tecnico ti contatterà entro 24 ore per organizzare il sopralluogo gratuito in {region}.
            </p>
            <a
              href="tel:+393516519363"
              onClick={() => trackPhoneClick('lp_success')}
              className="mt-2 flex items-center gap-2 text-sm font-bold text-[#EB1C26]"
            >
              <Phone className="size-4" />
              Oppure chiamaci subito: +39 351 651 9363
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            id={formId}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div>
              <label htmlFor={`${formId}-nome`} className="sr-only">Nome e Cognome</label>
              <input
                id={`${formId}-nome`}
                name="nome_cognome"
                type="text"
                required
                placeholder="Nome e Cognome *"
                value={form.nome_cognome}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-tel`} className="sr-only">Numero di telefono</label>
              <input
                id={`${formId}-tel`}
                name="telefono"
                type="tel"
                required
                placeholder="Numero di telefono *"
                value={form.telefono}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-citta`} className="sr-only">Città</label>
              <input
                id={`${formId}-citta`}
                name="citta"
                type="text"
                required
                placeholder="Città *"
                value={form.citta}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-msg`} className="sr-only">Descrivi il problema</label>
              <textarea
                id={`${formId}-msg`}
                name="messaggio"
                rows={3}
                placeholder="Descrivi il problema (opzionale)"
                value={form.messaggio}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && errorMsg && (
              <div className="border border-[#EB1C26]/40 bg-[#EB1C26]/8 px-4 py-3 text-sm text-[#EB1C26]">
                {errorMsg}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="mt-1 flex w-full items-center justify-center gap-2 bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60 transition-opacity"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Invio in corso...
                </>
              ) : (
                <>
                  Richiedi un sopralluogo gratuito
                  <ArrowRight className="size-4" />
                </>
              )}
            </motion.button>

            <p className="text-center text-xs text-[#161616]/35">
              Nessun vincolo · Risposta entro 24 ore · Garanzia 10 anni
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
