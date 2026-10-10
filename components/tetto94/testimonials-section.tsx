// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView, AnimatePresence } from 'framer-motion'
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// const testimonials = [
//   {
//     name: 'Marco Ferretti',
//     city: 'Venezia',
//     rating: 5,
//     text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile — abbiamo visto tutto prima di toccare un solo mattone. Consigliato al 100%.",
//   },
//   {
//     name: 'Giulia Marchetti',
//     city: 'Mestre',
//     rating: 5,
//     text: "Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Il drone ci ha tranquillizzati subito mostrando esattamente cosa c'era da fare. Ottimo rapporto qualità/prezzo.",
//   },
//   {
//     name: 'Roberto Conti',
//     city: 'Treviso',
//     rating: 5,
//     text: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro. Professionisti seri.",
//   },
//   {
//     name: 'Anna Vitali',
//     city: 'Padova',
//     rating: 5,
//     text: "Abbiamo richiesto l'ispezione gratuita senza aspettarci molto. Il report con le foto del drone è stato una rivelazione — problemi che non sapevamo di avere. Preventivo onesto, lavoro perfetto. Li richiamerò senza dubbio.",
//   },
// ]

// export default function TestimonialsSection() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })
//   const [current, setCurrent] = useState(0)

//   const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
//   const next = () => setCurrent((c) => (c + 1) % testimonials.length)

//   const t = testimonials[current]

//   return (
//     <section className="bg-[#f5f5f5] py-24 lg:py-32 border-t border-black/5" ref={ref}>
//       <div className="mx-auto max-w-4xl px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-14"
//         >
//           <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//             Testimonianze
//           </span>
//           <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none text-[#161616]">
//             COSA DICONO I NOSTRI{' '}
//             <span className="text-[#EB1C26]">CLIENTI</span>
//           </h2>
//         </motion.div>

//         {/* Testimonial card */}
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="relative"
//         >
//           <div
//             className="absolute -top-8 -left-2 font-display text-[120px] leading-none text-[#EB1C26]/15 pointer-events-none select-none"
//             aria-hidden="true"
//           >
//             &ldquo;
//           </div>

//           <div className="relative rounded-sm border border-black/10 bg-white p-8 md:p-12">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current}
//                 initial={{ opacity: 0, x: 24 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -24 }}
//                 transition={{ duration: 0.35 }}
//               >
//                 <div className="flex gap-1 mb-5">
//                   {Array.from({ length: t.rating }).map((_, i) => (
//                     <Star key={i} className="size-4 fill-[#EB1C26] text-[#EB1C26]" />
//                   ))}
//                 </div>

//                 <p className="text-lg text-[#333] leading-relaxed italic">
//                   &ldquo;{t.text}&rdquo;
//                 </p>

//                 <div className="mt-8 flex items-center gap-3">
//                   <div className="flex size-10 items-center justify-center rounded-full bg-[#EB1C26] font-display text-lg text-white">
//                     {t.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-[#161616] text-sm">{t.name}</p>
//                     <p className="text-xs text-[#494949]">{t.city}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Controls */}
//           <div className="mt-6 flex items-center justify-between">
//             <div className="flex gap-2">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrent(i)}
//                   aria-label={`Vai alla testimonianza ${i + 1}`}
//                     className={`h-1.5 rounded-full transition-all duration-300 ${
//                     i === current ? 'w-8 bg-[#EB1C26]' : 'w-2 bg-black/20 hover:bg-black/40'
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={prev}
//                 aria-label="Testimonianza precedente"
//                 className="flex size-10 items-center justify-center rounded-sm border border-black/15 text-[#494949] hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
//               >
//                 <ChevronLeft className="size-4" />
//               </button>
//               <button
//                 onClick={next}
//                 aria-label="Testimonianza successiva"
//                 className="flex size-10 items-center justify-center rounded-sm border border-black/15 text-[#494949] hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
//               >
//                 <ChevronRight className="size-4" />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }


// 'use client'

// import { useRef, useState } from 'react'
// import { motion, useInView, AnimatePresence } from 'framer-motion'
// import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

// const testimonials = [
//   {
//     name: 'Marco Ferretti',
//     city: 'Venezia',
//     rating: 5,
//     text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile — abbiamo visto tutto prima di toccare un solo mattone. Consigliato al 100%.",
//   },
//   {
//     name: 'Giulia Marchetti',
//     city: 'Mestre',
//     rating: 5,
//     text: "Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Il drone ci ha tranquillizzati subito mostrando esattamente cosa c'era da fare. Ottimo rapporto qualità/prezzo.",
//   },
//   {
//     name: 'Roberto Conti',
//     city: 'Treviso',
//     rating: 5,
//     text: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro. Professionisti seri.",
//   },
//   {
//     name: 'Anna Vitali',
//     city: 'Padova',
//     rating: 5,
//     text: "Abbiamo richiesto l'ispezione gratuita senza aspettarci molto. Il report con le foto del drone è stato una rivelazione — problemi che non sapevamo di avere. Preventivo onesto, lavoro perfetto. Li richiamerò senza dubbio.",
//   },
// ]

// export default function TestimonialsSection() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })
//   const [current, setCurrent] = useState(0)

//   const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
//   const next = () => setCurrent((c) => (c + 1) % testimonials.length)

//   const t = testimonials[current]

//   return (
//     <section className="t94-type bg-t94-grey py-16 lg:py-24" ref={ref}>
//       <div className="mx-auto max-w-4xl px-6">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <span className="font-t94 text-[15px] font-semibold text-t94-red">
//             Testimonianze
//           </span>
//           <h2 className="mt-2 font-t94 text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.1] text-t94-dark text-balance">
//             Cosa dicono i nostri{' '}
//             <span className="text-t94-red">clienti</span>
//           </h2>
//         </motion.div>

//         {/* Testimonial card */}
//         <motion.div
//           initial={{ opacity: 0, y: 32 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.6, delay: 0.15 }}
//           className="relative"
//         >
//           <div className="relative rounded-t94 border border-t94-border bg-white p-7 md:p-12">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={current}
//                 initial={{ opacity: 0, x: 24 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -24 }}
//                 transition={{ duration: 0.35 }}
//               >
//                 <div className="flex gap-1 mb-5" role="img" aria-label={`Valutazione ${t.rating} su 5`}>
//                   {Array.from({ length: t.rating }).map((_, i) => (
//                     <Star key={i} className="size-5 fill-t94-red text-t94-red" aria-hidden="true" />
//                   ))}
//                 </div>

//                 <p className="font-t94 text-[18px] lg:text-[20px] text-t94-text leading-[1.6]">
//                   &ldquo;{t.text}&rdquo;
//                 </p>

//                 <div className="mt-8 flex items-center gap-3">
//                   <div className="flex size-12 items-center justify-center rounded-full bg-t94-dark font-t94 text-[18px] font-semibold text-white">
//                     {t.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-t94 font-semibold text-t94-dark text-[17px] leading-tight">{t.name}</p>
//                     <p className="font-t94 text-[15px] text-t94-text-secondary">{t.city}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Controls */}
//           <div className="mt-6 flex items-center justify-between">
//             <div className="flex gap-2">
//               {testimonials.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrent(i)}
//                   aria-label={`Vai alla testimonianza ${i + 1}`}
//                     className={`h-2 rounded-full transition-all duration-300 ${
//                     i === current ? 'w-8 bg-t94-red' : 'w-2 bg-t94-dark/20 hover:bg-t94-dark/40'
//                   }`}
//                 />
//               ))}
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={prev}
//                 aria-label="Testimonianza precedente"
//                 className="flex size-12 items-center justify-center rounded-t94 border border-t94-border bg-white text-t94-dark hover:border-t94-dark transition-colors"
//               >
//                 <ChevronLeft className="size-5" />
//               </button>
//               <button
//                 onClick={next}
//                 aria-label="Testimonianza successiva"
//                 className="flex size-12 items-center justify-center rounded-t94 border border-t94-border bg-white text-t94-dark hover:border-t94-dark transition-colors"
//               >
//                 <ChevronRight className="size-5" />
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }


import { getGoogleReviews } from '@/lib/google-reviews'
import TestimonialsCarousel, { type CarouselReview } from './testimonials-carousel'

// Shown only until GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID are configured
// (or if the Google request fails). Remove once real reviews are live.
const fallbackReviews: CarouselReview[] = [
  {
    id: 'marco-ferretti',
    name: 'Marco Ferretti',
    subtitle: 'Venezia',
    rating: 5,
    text: "Squadra puntuale e professionale. Hanno risolto un'infiltrazione cronica che nessun altro riusciva a trovare. Ispezione con drone incredibile — abbiamo visto tutto prima di toccare un solo mattone. Consigliato al 100%.",
  },
  {
    id: 'giulia-marchetti',
    name: 'Giulia Marchetti',
    subtitle: 'Mestre',
    rating: 5,
    text: "Rifacimento completo del tetto di una villa storica. Lavoro impeccabile, materiali di qualità e rispetto per i tempi. Il drone ci ha tranquillizzati subito mostrando esattamente cosa c'era da fare. Ottimo rapporto qualità/prezzo.",
  },
  {
    id: 'roberto-conti',
    name: 'Roberto Conti',
    subtitle: 'Treviso',
    rating: 5,
    text: "Dopo il temporale avevo urgenza. Hanno risposto in poche ore, intervento d'emergenza gestito perfettamente. Garanzia scritta su tutto il lavoro. Professionisti seri.",
  },
  {
    id: 'anna-vitali',
    name: 'Anna Vitali',
    subtitle: 'Padova',
    rating: 5,
    text: "Abbiamo richiesto l'ispezione gratuita senza aspettarci molto. Il report con le foto del drone è stato una rivelazione — problemi che non sapevamo di avere. Preventivo onesto, lavoro perfetto. Li richiamerò senza dubbio.",
  },
]

export default async function TestimonialsSection() {
  const google = await getGoogleReviews()

  if (!google) {
    return <TestimonialsCarousel reviews={fallbackReviews} />
  }

  const reviews: CarouselReview[] = google.reviews.map((r) => ({
    id: r.id,
    name: r.name,
    subtitle: r.when,
    photoUrl: r.photoUrl,
    authorUrl: r.authorUrl,
    rating: r.rating,
    text: r.text,
  }))

  return (
    <TestimonialsCarousel
      reviews={reviews}
      google={{
        rating: google.rating,
        total: google.total,
        mapsUrl: google.mapsUrl,
        writeReviewUrl: google.writeReviewUrl,
      }}
    />
  )
}
