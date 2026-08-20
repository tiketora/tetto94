'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BeforeAfterSlider from './before-after-slider'

/**
 * Standalone "Prima e Dopo" section — positioned high on the homepage
 * (right after the trust strip) so visitors see proof of results
 * before anything else. Reuses the existing BeforeAfterSlider component.
 */
export default function BeforeAfterSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section className="bg-[#f5f5f5] py-12 lg:py-16" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
            I nostri risultati
          </span>

          <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <h2 className="font-display leading-none shrink-0">
              <span className="block text-[clamp(2rem,5vw,4.2rem)] text-[#161616] font-black">
                PRIMA E DOPO.
              </span>
              <span className="block text-[clamp(2rem,5vw,4.2rem)] text-[#EB1C26] font-black leading-none">
                LA DIFFERENZA SI VEDE.
              </span>
            </h2>
            <p className="mt-4 lg:mt-0 lg:pb-1 lg:text-right text-sm text-[#494949] leading-relaxed font-sans font-normal max-w-xs">
              Trascina il cursore per vedere la trasformazione.<br />
              Ogni lavoro racconta una storia di cura e professionalità.
            </p>
          </div>
        </motion.div>

        {/* Before / After slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <BeforeAfterSlider
            beforeSrc="/images/before-roof.jpg"
            afterSrc="/images/after-roof.jpg"
            beforeAlt="Tetto danneggiato prima dell'intervento Tetto94"
            afterAlt="Tetto restaurato dopo l'intervento Tetto94"
          />
          <p className="mt-3 text-center text-xs text-[#494949] uppercase tracking-wider">
            Trascina il cursore per confrontare &larr; &rarr;
          </p>
        </motion.div>

        {/* CTA — scroll back up to hero form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <motion.a
            href="#hero-form"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center bg-[#EB1C26] px-8 py-3.5 text-sm font-bold text-white uppercase tracking-wider"
          >
            Richiedi la tua trasformazione
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
