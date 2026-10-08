// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Loader2, CheckCircle2, ArrowRight, Phone } from 'lucide-react'
// import { trackFormSubmit, trackPhoneClick } from '@/lib/gtag'
// import { SERVICE_OPTIONS } from '@/lib/form-options'

// interface HeroFormData {
//   nome: string
//   telefono: string
//   citta: string
//   servizio: string
//   messaggio: string
// }

// const EMPTY_FORM: HeroFormData = {
//   nome: '',
//   telefono: '',
//   citta: '',
//   servizio: '',
//   messaggio: '',
// }

// /**
//  * Hero lead-capture form — shown in the homepage hero (desktop: right column,
//  * mobile: directly below the H1). Same /api/contact contract as ContactSection
//  * and LPForm, so no backend changes are required.
//  */
// export default function HeroForm() {
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
//   const [errorMsg, setErrorMsg] = useState('')
//   const [form, setForm] = useState<HeroFormData>(EMPTY_FORM)

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setStatus('loading')
//     setErrorMsg('')
//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           nome: form.nome,
//           telefono: form.telefono,
//           citta: form.citta,
//           servizio: form.servizio,
//           messaggio: form.messaggio,
//         }),
//       })
//       const json = await res.json()
//       if (!res.ok) {
//         setErrorMsg(json.error ?? "Errore durante l'invio. Riprova.")
//         setStatus('error')
//         return
//       }
//       setStatus('success')
//       trackFormSubmit({ service: form.servizio, city: form.citta, page_id: 'homepage_hero' })
//     } catch {
//       setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
//       setStatus('error')
//     }
//   }

//   const inputClass =
//     'w-full border border-[#161616]/15 bg-[#F5F5F5] px-4 py-3.5 text-sm text-[#161616] placeholder-[#161616]/40 focus:border-[#EB1C26] focus:outline-none focus:ring-1 focus:ring-[#EB1C26] transition-colors'

//   return (
//     <div id="hero-form" className="bg-white border border-[#161616]/10 p-6 lg:p-7 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.18)]">
//       <AnimatePresence mode="wait">
//         {status === 'success' ? (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex flex-col items-center justify-center gap-4 py-10 text-center"
//           >
//             <div className="size-16 rounded-full bg-[#EB1C26]/10 flex items-center justify-center">
//               <CheckCircle2 className="size-8 text-[#EB1C26]" />
//             </div>
//             <h3 className="font-display text-2xl text-[#161616]">Richiesta Inviata!</h3>
//             <p className="text-sm text-[#161616]/60 max-w-xs leading-relaxed">
//               Grazie! Un nostro tecnico ti contatterà entro 24 ore per organizzare il sopralluogo gratuito.
//             </p>
//             <a
//               href="tel:+393516519363"
//               onClick={() => trackPhoneClick('lp_success')}
//               className="mt-2 flex items-center gap-2 text-sm font-bold text-[#EB1C26]"
//             >
//               <Phone className="size-4" />
//               Oppure chiamaci subito: +39 351 651 9363
//             </a>
//           </motion.div>
//         ) : (
//           <motion.form
//             key="form"
//             id="hero-lead-form"
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//           >
//             <p className="font-display text-lg leading-none text-[#161616] mb-1">
//               Richiedi un preventivo gratuito
//             </p>

//             <div>
//               <label htmlFor="hero-nome" className="sr-only">Nome</label>
//               <input
//                 id="hero-nome"
//                 name="nome"
//                 type="text"
//                 required
//                 placeholder="Nome *"
//                 value={form.nome}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label htmlFor="hero-telefono" className="sr-only">Telefono</label>
//               <input
//                 id="hero-telefono"
//                 name="telefono"
//                 type="tel"
//                 required
//                 placeholder="Telefono *"
//                 value={form.telefono}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label htmlFor="hero-citta" className="sr-only">Città</label>
//               <input
//                 id="hero-citta"
//                 name="citta"
//                 type="text"
//                 required
//                 placeholder="Città *"
//                 value={form.citta}
//                 onChange={handleChange}
//                 className={inputClass}
//               />
//             </div>

//             <div>
//               <label htmlFor="hero-servizio" className="sr-only">Tipo di Servizio</label>
//               <select
//                 id="hero-servizio"
//                 name="servizio"
//                 required
//                 value={form.servizio}
//                 onChange={handleChange}
//                 className={`${inputClass} appearance-none`}
//               >
//                 <option value="" disabled className="bg-white">
//                   Tipo di Servizio *
//                 </option>
//                 {SERVICE_OPTIONS.map((s) => (
//                   <option key={s} value={s} className="bg-white">
//                     {s}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="hero-messaggio" className="sr-only">Messaggio</label>
//               <textarea
//                 id="hero-messaggio"
//                 name="messaggio"
//                 rows={2}
//                 placeholder="Messaggio (opzionale)"
//                 value={form.messaggio}
//                 onChange={handleChange}
//                 className={`${inputClass} resize-none`}
//               />
//             </div>

//             {status === 'error' && errorMsg && (
//               <div className="border border-[#EB1C26]/40 bg-[#EB1C26]/8 px-4 py-3 text-sm text-[#EB1C26]">
//                 {errorMsg}
//               </div>
//             )}

//             <motion.button
//               type="submit"
//               disabled={status === 'loading'}
//               whileHover={{ scale: 1.015 }}
//               whileTap={{ scale: 0.985 }}
//               className="mt-1 flex w-full items-center justify-center gap-2 bg-[#EB1C26] py-3.5 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60 transition-opacity"
//             >
//               {status === 'loading' ? (
//                 <>
//                   <Loader2 className="size-4 animate-spin" />
//                   Invio in corso...
//                 </>
//               ) : (
//                 <>
//                   Invia richiesta gratuita
//                   <ArrowRight className="size-4" />
//                 </>
//               )}
//             </motion.button>

//             <p className="text-center text-xs text-[#161616]/40">
//               Nessun vincolo. Rispondiamo entro 24 ore.
//             </p>
//           </motion.form>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


'use client'

import { useId, useState } from 'react'
import { Loader2, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { trackFormSubmit, trackPhoneClick, trackWhatsAppClick } from '@/lib/gtag'
import { SERVICE_OPTIONS } from '@/lib/form-options'
import { T94Button } from '@/components/tetto94/ds/t94-button'
import { T94Field, T94Textarea } from '@/components/tetto94/ds/t94-field'

interface HeroFormData {
  nome: string
  telefono: string
  citta: string
  servizio: string
  messaggio: string
}

const EMPTY_FORM: HeroFormData = { nome: '', telefono: '', citta: '', servizio: '', messaggio: '' }

const selectClasses =
  'w-full min-h-[54px] appearance-none rounded-t94 border border-t94-border bg-white px-4 pr-11 font-t94 text-[18px] ' +
  'text-t94-text transition-colors focus-visible:outline-none focus-visible:border-t94-dark ' +
  'focus-visible:ring-2 focus-visible:ring-t94-dark/20'

/**
 * Homepage hero lead form — 4 required fields as per the redesign spec, plus an
 * optional free-text message. Same /api/contact contract as ContactSection and LPForm.
 */
export default function HeroForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState<HeroFormData>(EMPTY_FORM)
  const selectId = useId()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
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
          nome: form.nome,
          telefono: form.telefono,
          citta: form.citta,
          servizio: form.servizio,
          messaggio: form.messaggio.trim(),
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? "Errore durante l'invio. Riprova.")
        setStatus('error')
        return
      }
      setStatus('success')
      trackFormSubmit({ service: form.servizio, city: form.citta, page_id: 'homepage_hero' })
    } catch {
      setErrorMsg('Errore di rete. Controlla la connessione e riprova.')
      setStatus('error')
    }
  }

  return (
    <div
      id="hero-form"
      className="scroll-mt-40 rounded-t94 border border-t94-border bg-white p-6 shadow-[0_20px_50px_-24px_rgba(27,27,27,0.25)] md:p-8"
    >
      {status === 'success' ? (
        <div role="status" className="flex flex-col items-center gap-4 py-8 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-t94-green/10">
            <CheckCircle2 className="size-8 text-t94-green" aria-hidden="true" />
          </span>
          <h2 className="t94-h3">Richiesta inviata</h2>
          <p className="t94-small max-w-xs">
            Grazie! Un nostro tecnico ti richiama entro 24 ore per organizzare il sopralluogo gratuito.
          </p>
          <a
            href="tel:+393516519363"
            onClick={() => trackPhoneClick('lp_success')}
            className="mt-2 inline-flex items-center gap-2 font-t94 text-[18px] font-semibold text-t94-red"
          >
            <Phone className="size-5" aria-hidden="true" />
            Oppure chiamaci: 351 651 9363
          </a>
        </div>
      ) : (
        <form id="hero-lead-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="t94-h3">Richiedi il sopralluogo gratuito</h2>
            <p className="t94-small">Ti richiamiamo entro 24 ore. Nessun impegno.</p>
          </div>

          <T94Field
            label="Nome e cognome"
            name="nome"
            type="text"
            autoComplete="name"
            required
            placeholder="Es. Mario Rossi"
            value={form.nome}
            onChange={handleChange}
          />
          <T94Field
            label="Telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="Es. 333 123 4567"
            value={form.telefono}
            onChange={handleChange}
          />
          <T94Field
            label="Città"
            name="citta"
            type="text"
            autoComplete="address-level2"
            required
            placeholder="Es. Padova"
            value={form.citta}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor={selectId} className="font-t94 text-[15px] font-semibold text-t94-dark">
              Cosa ti serve?<span className="text-t94-red" aria-hidden="true"> *</span>
            </label>
            <div className="relative">
              <select
                id={selectId}
                name="servizio"
                required
                value={form.servizio}
                onChange={handleChange}
                className={selectClasses}
              >
                <option value="" disabled>
                  Rifacimento, riparazione, infiltrazioni...
                </option>
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-t94-text-secondary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 8 5 5 5-5" />
              </svg>
            </div>
          </div>

          <T94Textarea
            label="Messaggio"
            optionalLabel="facoltativo"
            name="messaggio"
            maxLength={2000}
            placeholder="Descrivi in breve il problema o la richiesta..."
            value={form.messaggio}
            onChange={handleChange}
          />

          {status === 'error' && errorMsg ? (
            <p role="alert" className="rounded-t94 border border-t94-red/40 bg-t94-red/5 px-4 py-3 font-t94 text-[16px] text-t94-red">
              {errorMsg}
            </p>
          ) : null}

          <T94Button type="submit" fullWidth disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                Invio in corso...
              </>
            ) : (
              'Richiedi il sopralluogo gratuito'
            )}
          </T94Button>

          <p className="t94-small text-center">
            Oppure chiama{' '}
            <a
              href="tel:+393516519363"
              onClick={() => trackPhoneClick('lp_hero')}
              className="font-semibold text-t94-dark underline underline-offset-4"
            >
              351 651 9363
            </a>{' '}
            o scrivici su{' '}
            <a
              href="https://wa.me/393516519363"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contact_section')}
              className="inline-flex items-center gap-1 font-semibold text-t94-green underline underline-offset-4"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </p>
        </form>
      )}
    </div>
  )
}
