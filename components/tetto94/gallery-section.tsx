// 'use client'

// import { useRef } from 'react'
// import { motion, useInView } from 'framer-motion'
// import Image from 'next/image'
// import WorksCarousel from './works-carousel'

// const projects = [
//   {
//     src: '/images/project-1.jpg',
//     label: 'Rifacimento completo — Milano',
//     tag: 'Rifacimento',
//   },
//   {
//     src: '/images/project-2.jpg',
//     label: 'Copertura in cotto — Bergamo',
//     tag: 'Copertura',
//   },
//   {
//     src: '/images/project-3.jpg',
//     label: 'Impermeabilizzazione — Venezia',
//     tag: 'Impermeabilizzazione',
//   },
// ]

// export default function GallerySection() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })

//   return (
//     <section id="galleria" className="bg-[#f5f5f5] py-12 lg:py-16" ref={ref}>
//       <div className="mx-auto max-w-7xl px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7 }}
//           className="mb-10"
//         >
//           {/* Label */}
//           <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
//             Lavori Eseguiti
//           </span>

//           {/* Heading row — titles left, description right on desktop */}
//           <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-8">
//             <h2 className="font-display leading-none shrink-0">
//               <span className="block text-[clamp(2rem,5vw,4.2rem)] text-[#161616] font-black">
//                 OGNI TETTO.
//               </span>
//               <span className="block text-[clamp(2rem,5vw,4.2rem)] text-[#EB1C26] font-black leading-none">
//                 UNA STORIA DI CURA.
//               </span>
//             </h2>
//             <p className="mt-4 lg:mt-0 lg:pb-1 lg:text-right text-sm text-[#494949] leading-relaxed font-sans font-normal max-w-xs">
//               Una selezione dei nostri interventi più recenti,
//               in tutto il Nord-Est Italia.
//             </p>
//           </div>
//         </motion.div>

//         {/* Project grid */}
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {projects.map((p, i) => (
//             <motion.div
//               key={p.src}
//               initial={{ opacity: 0, y: 40 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.55, delay: 0.3 + i * 0.1 }}
//               whileHover={{ scale: 1.02 }}
//               className="group relative overflow-hidden rounded-sm aspect-[4/3]"
//             >
//               <Image
//                 src={p.src}
//                 alt={p.label}
//                 fill
//                 className="object-cover transition-transform duration-500 group-hover:scale-110"
//                 sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//               />
//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
//               {/* Tag */}
//               <div className="absolute top-4 left-4 rounded-sm bg-[#EB1C26] px-3 py-1">
//                 <span className="text-[10px] font-bold uppercase tracking-widest text-white">
//                   {p.tag}
//                 </span>
//               </div>
//               {/* Label on hover */}
//               <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-5">
//                 <p className="text-sm font-semibold text-white">{p.label}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Works carousel with real project photos */}
//         <WorksCarousel />
//       </div>
//     </section>
//   )
// }


'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import WorksCarousel from './works-carousel'

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
    label: 'Impermeabilizzazione — Venezia',
    tag: 'Impermeabilizzazione',
  },
]

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })

  return (
    <section id="galleria" className="t94-type bg-white py-14 lg:py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          {/* Label */}
          <span className="font-t94 text-[15px] font-semibold text-t94-red">
            Lavori eseguiti
          </span>

          {/* Heading row — titles left, description right on desktop */}
          <div className="mt-2 flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <h2 className="font-t94 leading-[1.1] shrink-0 text-balance">
              <span className="block text-[clamp(2rem,4.2vw,3.25rem)] text-t94-dark font-bold">
                Ogni tetto.
              </span>
              <span className="block text-[clamp(2rem,4.2vw,3.25rem)] text-t94-red font-bold">
                Una storia di cura.
              </span>
            </h2>
            <p className="mt-4 lg:mt-0 lg:pb-1 lg:text-right font-t94 text-[17px] lg:text-[18px] text-t94-text-secondary leading-[1.6] font-normal max-w-sm">
              Una selezione dei nostri interventi più recenti,
              in tutto il Nord-Est Italia.
            </p>
          </div>
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
              className="group relative overflow-hidden rounded-t94 aspect-[4/3]"
            >
              <Image
                src={p.src}
                alt={p.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Tag */}
              <div className="absolute top-4 left-4 rounded-t94 bg-white px-3 py-1">
                <span className="font-t94 text-[15px] font-semibold text-t94-dark">
                  {p.tag}
                </span>
              </div>
              {/* Label on hover */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-5">
                <p className="font-t94 text-[17px] font-semibold text-white">{p.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Works carousel with real project photos */}
        <WorksCarousel />
      </div>
    </section>
  )
}
