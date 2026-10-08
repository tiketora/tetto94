// 'use client'

// import { useRef, useState, useEffect, useCallback } from 'react'
// import { motion, useInView, AnimatePresence } from 'framer-motion'
// import Image from 'next/image'
// import { ArrowLeft, ArrowRight } from 'lucide-react'
// import { WORKS as works } from '@/data/works-gallery'

// const slideVariants = {
//   enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
//   center: { x: 0, opacity: 1 },
//   exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
// }

// export default function WorksCarousel() {
//   const ref = useRef(null)
//   const inView = useInView(ref, { once: true, margin: '-8%' })
//   const [current, setCurrent] = useState(0)
//   const [direction, setDirection] = useState(1)
//   const [isDragging, setIsDragging] = useState(false)
//   const dragStartX = useRef(0)
//   const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

//   const go = useCallback((idx: number, dir: number) => {
//     setDirection(dir)
//     setCurrent((idx + works.length) % works.length)
//   }, [])

//   const next = useCallback(() => go(current + 1, 1), [current, go])
//   const prev = useCallback(() => go(current - 1, -1), [current, go])

//   useEffect(() => {
//     autoPlayRef.current = setInterval(next, 5000)
//     return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
//   }, [next])

//   const resetAutoPlay = useCallback(() => {
//     if (autoPlayRef.current) clearInterval(autoPlayRef.current)
//     autoPlayRef.current = setInterval(next, 5000)
//   }, [next])

//   const onDragStart = (x: number) => {
//     setIsDragging(true)
//     dragStartX.current = x
//   }

//   const onDragEnd = (x: number) => {
//     if (!isDragging) return
//     setIsDragging(false)
//     const delta = dragStartX.current - x
//     if (Math.abs(delta) > 40) {
//       delta > 0 ? next() : prev()
//       resetAutoPlay()
//     }
//   }

//   const w = works[current]
//   const progressPct = ((current + 1) / works.length) * 100

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay: 0.2 }}
//       className="mt-20 w-full"
//     >
//       {/* Section label */}
//       <div className="mb-6">
//         <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#494949]">
//           I Nostri Lavori
//         </span>
//         <h2 className="mt-1 font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-black text-[#161616] leading-none">
//           LAVORI <span className="text-[#EB1C26]">ESEGUITI.</span>
//         </h2>
//       </div>

//       {/* Carousel image area — uses padding-top trick for responsive ratio */}
//       <div
//         className="relative w-full overflow-hidden rounded-sm bg-[#0E0E0E] cursor-grab active:cursor-grabbing select-none"
//         style={{ paddingTop: 'min(125%, 75vh)' }}
//         onMouseDown={(e) => onDragStart(e.clientX)}
//         onMouseUp={(e) => onDragEnd(e.clientX)}
//         onMouseLeave={() => { if (isDragging) setIsDragging(false) }}
//         onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
//         onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
//       >
//         <div className="absolute inset-0">
//           <AnimatePresence custom={direction} initial={false}>
//             <motion.div
//               key={current}
//               custom={direction}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
//               className="absolute inset-0"
//             >
//               <Image
//                 src={w.src}
//                 alt={w.alt}
//                 fill
//                 className="object-contain"
//                 sizes="(max-width: 768px) 100vw, 80vw"
//                 priority={current < 2}
//               />
//             </motion.div>
//           </AnimatePresence>

//           {/* Progress bar at bottom of image */}
//           <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 pointer-events-none">
//             <motion.div
//               key={current}
//               className="h-full bg-[#EB1C26]"
//               initial={{ width: '0%' }}
//               animate={{ width: '100%' }}
//               transition={{ duration: 5, ease: 'linear' }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Controls — always full width, never overflow */}
//       <div className="mt-4 flex items-center gap-3 w-full">
//         {/* Progress track fills all available space */}
//         <div className="flex-1 min-w-0 flex items-center gap-3">
//           <div className="flex-1 h-[2px] bg-[#E5E5E5] rounded-full overflow-hidden">
//             <motion.div
//               className="h-full bg-[#EB1C26] rounded-full"
//               animate={{ width: `${progressPct}%` }}
//               transition={{ duration: 0.3, ease: 'easeOut' }}
//             />
//           </div>
//           {/* Counter */}
//           <div className="flex items-baseline gap-0.5 shrink-0">
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={current}
//                 initial={{ opacity: 0, y: -5 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 5 }}
//                 transition={{ duration: 0.18 }}
//                 className="font-display text-base font-black text-[#161616] leading-none tabular-nums"
//               >
//                 {w.index}
//               </motion.span>
//             </AnimatePresence>
//             <span className="font-display text-sm font-black text-[#888] leading-none">
//               /{String(works.length).padStart(2, '0')}
//             </span>
//           </div>
//         </div>

//         {/* Arrows — always visible, fixed size */}
//         <div className="flex gap-2 shrink-0">
//           <button
//             onClick={() => { prev(); resetAutoPlay() }}
//             aria-label="Lavoro precedente"
//             className="flex size-10 items-center justify-center border border-[#E5E5E5] text-[#494949] hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors rounded-sm"
//           >
//             <ArrowLeft className="size-4" />
//           </button>
//           <button
//             onClick={() => { next(); resetAutoPlay() }}
//             aria-label="Lavoro successivo"
//             className="flex size-10 items-center justify-center border border-[#E5E5E5] text-[#494949] hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors rounded-sm"
//           >
//             <ArrowRight className="size-4" />
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { WORKS as works } from '@/data/works-gallery'

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function WorksCarousel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir)
    setCurrent((idx + works.length) % works.length)
  }, [])

  const next = useCallback(() => go(current + 1, 1), [current, go])
  const prev = useCallback(() => go(current - 1, -1), [current, go])

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 5000)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [next])

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(next, 5000)
  }, [next])

  const onDragStart = (x: number) => {
    setIsDragging(true)
    dragStartX.current = x
  }

  const onDragEnd = (x: number) => {
    if (!isDragging) return
    setIsDragging(false)
    const delta = dragStartX.current - x
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev()
      resetAutoPlay()
    }
  }

  const w = works[current]
  const progressPct = ((current + 1) / works.length) * 100

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-20 w-full"
    >
      {/* Section label */}
      <div className="mb-6">
        <span className="font-t94 text-[15px] font-semibold text-t94-red">
          I nostri lavori
        </span>
        <h2 className="mt-2 font-t94 text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold text-t94-dark leading-[1.15]">
          Lavori <span className="text-t94-red">eseguiti.</span>
        </h2>
      </div>

      {/* Carousel image area — uses padding-top trick for responsive ratio */}
      <div
        className="relative w-full overflow-hidden rounded-t94 bg-t94-dark cursor-grab active:cursor-grabbing select-none"
        style={{ paddingTop: 'min(125%, 75vh)' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseUp={(e) => onDragEnd(e.clientX)}
        onMouseLeave={() => { if (isDragging) setIsDragging(false) }}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => onDragEnd(e.changedTouches[0].clientX)}
      >
        <div className="absolute inset-0">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={w.src}
                alt={w.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={current < 2}
              />
            </motion.div>
          </AnimatePresence>

          {/* Progress bar at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 pointer-events-none">
            <motion.div
              key={current}
              className="h-full bg-[#EB1C26]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
        </div>
      </div>

      {/* Controls — always full width, never overflow */}
      <div className="mt-4 flex items-center gap-3 w-full">
        {/* Progress track fills all available space */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="flex-1 h-[2px] bg-[#E5E5E5] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#EB1C26] rounded-full"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          {/* Counter */}
          <div className="flex items-baseline gap-0.5 shrink-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={current}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.18 }}
                className="font-t94 text-[17px] font-semibold text-t94-dark leading-none tabular-nums"
              >
                {w.index}
              </motion.span>
            </AnimatePresence>
            <span className="font-t94 text-[15px] font-medium text-t94-text-secondary leading-none">
              /{String(works.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Arrows — always visible, fixed size */}
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => { prev(); resetAutoPlay() }}
            aria-label="Lavoro precedente"
            className="flex size-12 items-center justify-center border border-t94-border text-t94-dark hover:border-t94-dark transition-colors rounded-t94"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            onClick={() => { next(); resetAutoPlay() }}
            aria-label="Lavoro successivo"
            className="flex size-12 items-center justify-center border border-t94-border text-t94-dark hover:border-t94-dark transition-colors rounded-t94"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
