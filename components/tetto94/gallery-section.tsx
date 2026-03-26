'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import BeforeAfterSlider from './before-after-slider'

const projects = [
  {
    src: '/images/project-1.jpg',
    label: 'Rifacimento completo — Milano',
    tag: 'Rifacimento',
  },
  {
    src: '/images/project-2.jpg',
    label: 'Copertura in cotto — Bergamo',
    tag: 'Copertura',
  },
  {
    src: '/images/project-3.jpg',
    label: 'Isolamento termico — Como',
    tag: 'Isolamento',
  },
]

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="galleria" className="bg-[#161616] py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
            I Nostri Lavori
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-none text-white">
            PRIMA E DOPO.{' '}
            <span className="text-[#EB1C26]">LA DIFFERENZA SI VEDE.</span>
          </h2>
          <p className="mt-4 text-base text-[#494949] max-w-xl mx-auto leading-relaxed">
            Trascina il cursore per vedere la trasformazione. Ogni lavoro racconta una storia di cura e professionalità.
          </p>
        </motion.div>

        {/* Before / After slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-16"
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

        {/* Project grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#161616]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Tag */}
              <div className="absolute top-4 left-4 rounded-sm bg-[#EB1C26] px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  {p.tag}
                </span>
              </div>
              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-5">
                <p className="text-sm font-semibold text-white">{p.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
