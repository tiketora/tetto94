// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView } from 'framer-motion'
// import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react'

// const services = [
//   'Riparazione tegole',
//   'Rifacimento completo',
//   'Stop infiltrazioni',
//   'Isolamento termico',
//   'Impermeabilizzazione',
//   'Pulizia grondaie',
//   'Ispezione con drone',
// ]

// interface FormData {
//   nome: string
//   cognome: string
//   telefono: string
//   citta: string
//   servizio: string
//   messaggio: string
// }

// export default function ContactSection() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })
//   const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
//   const [form, setForm] = useState<FormData>({
//     nome: '',
//     cognome: '',
//     telefono: '',
//     citta: '',
//     servizio: '',
//     messaggio: '',
//   })

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setStatus('loading')
//     // Simulate submission
//     await new Promise((r) => setTimeout(r, 1500))
//     setStatus('success')
//   }

//   const inputClass =
//     'w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#EB1C26] focus:outline-none focus:ring-1 focus:ring-[#EB1C26] transition-colors'

//   return (
//     <section id="contatti" className="bg-[#161616] py-24 lg:py-32 border-t border-white/5" ref={ref}>
//       <div className="mx-auto max-w-7xl px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.65 }}
//           className="text-center mb-14"
//         >
//           <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Contattaci</span>
//           <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
//             IL TUO TETTO CI STA{' '}
//             <span className="text-[#EB1C26]">A CUORE</span>
//           </h2>
//           <p className="mt-4 text-base text-[#494949] max-w-xl mx-auto">
//             Compila il modulo per ricevere un preventivo gratuito. Ti ricontattiamo entro 24 ore.
//           </p>
//         </motion.div>

//         <div className="grid gap-10 lg:grid-cols-2">
//           {/* Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -40 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//           >
//             {status === 'success' ? (
//               <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-[#EB1C26]/20 bg-[#EB1C26]/5 py-20 text-center">
//                 <CheckCircle2 className="size-12 text-[#EB1C26]" />
//                 <h3 className="font-display text-2xl text-white">Richiesta Inviata!</h3>
//                 <p className="text-sm text-[#494949] max-w-xs">
//                   Grazie per averci contattato. Ti ricontattiamo entro 24 ore lavorative.
//                 </p>
//                 <button
//                   onClick={() => {
//                     setStatus('idle')
//                     setForm({ nome: '', cognome: '', telefono: '', citta: '', servizio: '', messaggio: '' })
//                   }}
//                   className="mt-4 text-sm text-[#EB1C26] underline underline-offset-4"
//                 >
//                   Invia un&apos;altra richiesta
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="nome" className="sr-only">Nome</label>
//                     <input
//                       id="nome"
//                       name="nome"
//                       type="text"
//                       required
//                       placeholder="Nome *"
//                       value={form.nome}
//                       onChange={handleChange}
//                       className={inputClass}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="cognome" className="sr-only">Cognome</label>
//                     <input
//                       id="cognome"
//                       name="cognome"
//                       type="text"
//                       required
//                       placeholder="Cognome *"
//                       value={form.cognome}
//                       onChange={handleChange}
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="telefono" className="sr-only">Telefono</label>
//                   <input
//                     id="telefono"
//                     name="telefono"
//                     type="tel"
//                     required
//                     placeholder="Numero di Telefono *"
//                     value={form.telefono}
//                     onChange={handleChange}
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="citta" className="sr-only">Città / Indirizzo</label>
//                   <input
//                     id="citta"
//                     name="citta"
//                     type="text"
//                     placeholder="Città / Indirizzo"
//                     value={form.citta}
//                     onChange={handleChange}
//                     className={inputClass}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="servizio" className="sr-only">Tipo di Servizio</label>
//                   <select
//                     id="servizio"
//                     name="servizio"
//                     value={form.servizio}
//                     onChange={handleChange}
//                     className={`${inputClass} appearance-none`}
//                   >
//                     <option value="" disabled className="bg-[#161616]">
//                       Tipo di Servizio
//                     </option>
//                     {services.map((s) => (
//                       <option key={s} value={s} className="bg-[#161616]">
//                         {s}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="messaggio" className="sr-only">Messaggio</label>
//                   <textarea
//                     id="messaggio"
//                     name="messaggio"
//                     rows={4}
//                     placeholder="Descrivi brevemente la situazione..."
//                     value={form.messaggio}
//                     onChange={handleChange}
//                     className={`${inputClass} resize-none`}
//                   />
//                 </div>

//                 <motion.button
//                   type="submit"
//                   disabled={status === 'loading'}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   className="flex items-center justify-center gap-2 rounded-sm bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#EB1C26]/20 disabled:opacity-60 transition-opacity"
//                 >
//                   {status === 'loading' ? (
//                     <>
//                       <Loader2 className="size-4 animate-spin" />
//                       Invio in corso...
//                     </>
//                   ) : (
//                     'Invia Richiesta Gratuita'
//                   )}
//                 </motion.button>

//                 <p className="text-center text-xs text-[#494949]">
//                   Nessun vincolo. Rispondiamo entro 24 ore.
//                 </p>
//               </form>
//             )}
//           </motion.div>

//           {/* Contact info */}
//           <motion.div
//             initial={{ opacity: 0, x: 40 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="flex flex-col gap-8"
//           >
//             {/* Info cards */}
//             {[
//               { icon: Phone, label: 'Telefono', value: '+39 160 36282909', href: 'tel:+393160362909' },
//               { icon: Mail, label: 'Email', value: 'info@tetto94.com', href: 'mailto:info@tetto94.com' },
//               { icon: MapPin, label: 'Zona di Intervento', value: 'Lombardia e province limitrofe', href: undefined },
//               { icon: Clock, label: 'Orari', value: 'Lun – Sab: 8:00 – 18:00', href: undefined },
//             ].map((item) => {
//               const Icon = item.icon
//               const content = (
//                 <div className="flex items-start gap-4 rounded-sm border border-white/8 bg-white/3 p-5 hover:border-[#EB1C26]/30 transition-colors">
//                   <div className="flex-shrink-0 flex size-10 items-center justify-center rounded-sm bg-[#EB1C26]/10">
//                     <Icon className="size-5 text-[#EB1C26]" />
//                   </div>
//                   <div>
//                     <p className="text-xs text-[#494949] uppercase tracking-wider">{item.label}</p>
//                     <p className="mt-0.5 text-sm font-semibold text-white">{item.value}</p>
//                   </div>
//                 </div>
//               )
//               return item.href ? (
//                 <a key={item.label} href={item.href}>
//                   {content}
//                 </a>
//               ) : (
//                 <div key={item.label}>{content}</div>
//               )
//             })}

//             {/* WhatsApp quick */}
//             <a
//               href="https://wa.me/393160362909?text=Salve%2C%20vorrei%20richiedere%20un%27ispezione%20gratuita%20del%20tetto."
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-3 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 px-5 py-4 hover:bg-[#25D366]/15 transition-colors"
//             >
//               <div className="flex size-10 items-center justify-center rounded-full bg-[#25D366]">
//                 <svg viewBox="0 0 24 24" className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
//                 </svg>
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-[#25D366]">Scrivici su WhatsApp</p>
//                 <p className="text-xs text-white/50">Risposta rapida garantita</p>
//               </div>
//             </a>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react'

const services = [
  'Riparazione tegole',
  'Rifacimento completo',
  'Stop infiltrazioni',
  'Isolamento termico',
  'Impermeabilizzazione',
  'Pulizia grondaie',
  'Ispezione con drone',
]

interface FormData {
  nome: string
  cognome: string
  telefono: string
  citta: string
  servizio: string
  messaggio: string
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [form, setForm] = useState<FormData>({
    nome: '',
    cognome: '',
    telefono: '',
    citta: '',
    servizio: '',
    messaggio: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  const inputClass =
    'w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#EB1C26] focus:outline-none focus:ring-1 focus:ring-[#EB1C26] transition-colors'

  return (
    <section id="contatti" className="bg-[#161616] py-24 lg:py-32 border-t border-white/5" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">Contattaci</span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            IL TUO TETTO CI STA{' '}
            <span className="text-[#EB1C26]">A CUORE</span>
          </h2>
          <p className="mt-4 text-base text-[#494949] max-w-xl mx-auto">
            Compila il modulo per ricevere un preventivo gratuito. Ti ricontattiamo entro 24 ore.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-sm border border-[#EB1C26]/20 bg-[#EB1C26]/5 py-20 text-center">
                <CheckCircle2 className="size-12 text-[#EB1C26]" />
                <h3 className="font-display text-2xl text-white">Richiesta Inviata!</h3>
                <p className="text-sm text-[#494949] max-w-xs">
                  Grazie per averci contattato. Ti ricontattiamo entro 24 ore lavorative.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle')
                    setForm({ nome: '', cognome: '', telefono: '', citta: '', servizio: '', messaggio: '' })
                  }}
                  className="mt-4 text-sm text-[#EB1C26] underline underline-offset-4"
                >
                  Invia un&apos;altra richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="sr-only">Nome</label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      placeholder="Nome *"
                      value={form.nome}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="cognome" className="sr-only">Cognome</label>
                    <input
                      id="cognome"
                      name="cognome"
                      type="text"
                      required
                      placeholder="Cognome *"
                      value={form.cognome}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefono" className="sr-only">Telefono</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    placeholder="Numero di Telefono *"
                    value={form.telefono}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="citta" className="sr-only">Città / Indirizzo</label>
                  <input
                    id="citta"
                    name="citta"
                    type="text"
                    placeholder="Città / Indirizzo"
                    value={form.citta}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="servizio" className="sr-only">Tipo di Servizio</label>
                  <select
                    id="servizio"
                    name="servizio"
                    value={form.servizio}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled className="bg-[#161616]">
                      Tipo di Servizio
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#161616]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="messaggio" className="sr-only">Messaggio</label>
                  <textarea
                    id="messaggio"
                    name="messaggio"
                    rows={4}
                    placeholder="Descrivi brevemente la situazione..."
                    value={form.messaggio}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 rounded-sm bg-[#EB1C26] py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#EB1C26]/20 disabled:opacity-60 transition-opacity"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    'Invia Richiesta Gratuita'
                  )}
                </motion.button>

                <p className="text-center text-xs text-[#494949]">
                  Nessun vincolo. Rispondiamo entro 24 ore.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Info cards */}
            {[
              { icon: Phone, label: 'Telefono', value: '+39 329 829 7679', href: 'tel:+393298297679' },
              { icon: Mail, label: 'Email', value: 'info@tetto94.it', href: 'mailto:info@tetto94.it' },
              { icon: MapPin, label: 'Indirizzo', value: 'Via Benedetto Veruda, 30100 Venezia VE, Italia', href: 'https://maps.app.goo.gl/dzGd69uJaH4x34W9A' },
              { icon: Clock, label: 'Orari', value: 'Lun – Sab: 8:00 – 18:00', href: undefined },
            ].map((item) => {
              const Icon = item.icon
              const content = (
                <div className="flex items-start gap-4 rounded-sm border border-white/8 bg-white/3 p-5 hover:border-[#EB1C26]/30 transition-colors">
                  <div className="flex-shrink-0 flex size-10 items-center justify-center rounded-sm bg-[#EB1C26]/10">
                    <Icon className="size-5 text-[#EB1C26]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#494949] uppercase tracking-wider">{item.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.label}>{content}</div>
              )
            })}

            {/* WhatsApp quick */}
            <a
              href="https://wa.me/393298297679?text=Salve%2C%20vorrei%20richiedere%20un%27ispezione%20gratuita%20del%20tetto."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-sm bg-[#25D366]/10 border border-[#25D366]/30 px-5 py-4 hover:bg-[#25D366]/15 transition-colors"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[#25D366]">
                <svg viewBox="0 0 24 24" className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#25D366]">Scrivici su WhatsApp</p>
                <p className="text-xs text-white/50">Risposta rapida garantita</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
