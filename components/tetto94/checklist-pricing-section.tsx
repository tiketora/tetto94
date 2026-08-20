'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const leftItems = [
  { text: 'Risanamento professionale', bold: null },
  { text: 'Linea vita provvisoria compresa nel pacchetto', bold: 'compresa nel pacchetto' },
  { text: 'Sostituzione di tegole e coppi rotti', bold: 'Sostituzione' },
  { text: 'Fissaggio 1 ad 1 di tutte le tegole/coppi', bold: 'Fissaggio 1 ad 1' },
  { text: 'Impermeabilizzazione lucernari', bold: 'lucernari' },
]

const rightItems = [
  { text: 'Impermeabilizzazione canne fumarie', bold: 'canne fumarie' },
  { text: 'Pulizia e sigillatura grondaie e canali', bold: 'Pulizia e sigillatura' },
  { text: 'Certificato di garanzia', bold: null, href: '/garanzie' },
  { text: 'POS (piano operativo di sicurezza)', bold: 'POS' },
  { text: 'Pulizia del cantiere a fine lavoro e smaltimento materiali di risulta', bold: 'Pulizia del cantiere a fine lavoro' },
]

function CheckItem({
  text,
  bold,
  delay,
  href,
}: {
  text: string
  bold: string | null
  delay: number
  href?: string
}) {
  const renderText = () => {
    if (href) {
      return (
        <Link href={href} className="text-sm text-[#161616] leading-snug underline underline-offset-2 hover:text-[#EB1C26] transition-colors">
          {text}
        </Link>
      )
    }
    if (!bold) return <span className="text-sm text-[#161616] leading-snug">{text}</span>
    const parts = text.split(bold)
    return (
      <span className="text-sm text-[#161616] leading-snug">
        {parts[0]}<strong className="font-bold">{bold}</strong>{parts[1]}
      </span>
    )
  }

  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-3"
    >
      <CheckCircle2 className="size-5 text-[#EB1C26] shrink-0 mt-0.5" />
      {renderText()}
    </motion.li>
  )
}

export default function ChecklistPricingSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="bg-[#f5f5f5] py-16 lg:py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">

        {/* Checklist grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-14">
          <ul className="flex flex-col gap-4">
            {leftItems.map((item, i) => (
              <CheckItem key={item.text} text={item.text} bold={item.bold} delay={i * 0.07} />
            ))}
          </ul>
          <ul className="flex flex-col gap-4">
            {rightItems.map((item, i) => (
              <CheckItem key={item.text} text={item.text} bold={item.bold} delay={0.35 + i * 0.07} href={'href' in item ? item.href : undefined} />
            ))}
          </ul>
        </div>

        {/* Pricing bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-black/10 pt-10"
        >
          <p className="text-sm text-[#494949] uppercase tracking-widest mb-3">
            MA QUANTO COSTEREBBE TUTTO QUESTO?
          </p>

          <div className="flex flex-wrap items-end gap-6">
            <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-[#161616] leading-tight">
              CON TETTO 94 PUOI AVERE<br />TUTTO QUESTO A PARTIRE DA:
            </h2>

            {/* Price badge */}
            <div className="flex flex-col shrink-0">
              {/* Old price strikethrough */}
              <span className="text-sm text-[#494949] line-through font-sans mb-1 self-center">
                9.500 &euro;
              </span>
              {/* Current price */}
              <div className="inline-flex items-center justify-center bg-[#EB1C26] px-6 py-3">
                <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-black text-white leading-none">
                  6.500 &euro;
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
