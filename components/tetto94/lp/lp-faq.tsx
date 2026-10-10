import { CheckCircle2, Plus } from 'lucide-react'
import { LP_PHONE_TEL } from '@/components/tetto94/lp/lp-parts'

const FAQS = [
  {
    q: 'Il sopralluogo costa qualcosa?',
    a: "No. L'ispezione con drone e il preventivo sono gratuiti e senza impegno.",
  },
  {
    q: 'Davvero non serve il ponteggio?',
    a: 'No. Lavoriamo con accesso su fune certificato: risparmi il ponteggio e i permessi.',
  },
  {
    q: 'Quanto dura la garanzia?',
    a: '10 anni scritti su rifacimento e impermeabilizzazione, su materiali e manodopera.',
  },
  {
    q: 'In quanto tempo mi richiamate?',
    a: 'Entro 24 ore. Se preferisci, chiamaci subito al',
    phone: true,
  },
]

export const INCLUDED_ITEMS = [
  'Linea vita provvisoria',
  'Sostituzione di tegole e coppi rotti',
  'Fissaggio 1 a 1 di tegole e coppi',
  'Impermeabilizzazione lucernari',
  'Impermeabilizzazione canne fumarie',
  'Pulizia e sigillatura grondaie',
  'POS (piano operativo di sicurezza)',
  'Pulizia del cantiere e smaltimento',
  'Certificato di garanzia firmato',
]

export function LPIncludedList() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {INCLUDED_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-3 rounded-[14px] border border-t94-border bg-white px-4 py-3.5"
        >
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-t94-green/10">
            <CheckCircle2 className="size-[18px] text-t94-green" aria-hidden="true" />
          </span>
          <span className="t94-body font-medium text-t94-dark">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LPFaq() {
  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((item) => (
        <details
          key={item.q}
          className="group rounded-[14px] border border-t94-border bg-white transition-colors open:border-t94-dark/30"
        >
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-t94 text-[17px] font-semibold text-t94-dark marker:hidden [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-t94-grey transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-[18px] text-t94-red" aria-hidden="true" />
            </span>
          </summary>
          <p className="t94-body px-5 pb-5 text-t94-text-secondary">
            {item.a}
            {item.phone ? (
              <>
                {' '}
                <a href={LP_PHONE_TEL} className="font-semibold text-t94-dark underline underline-offset-4">
                  351 651 9363
                </a>
                .
              </>
            ) : null}
          </p>
        </details>
      ))}
    </div>
  )
}
