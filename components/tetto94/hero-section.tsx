// 'use client'

// import { motion } from 'framer-motion'
// import { trackCTAClick } from '@/lib/gtag'
// import HeroForm from './hero-form'

// const fadeUp = {
//   hidden: { opacity: 0, y: 32 },
//   visible: (delay = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
//   }),
// }

// /**
//  * Single CSS Grid with named areas. Every child (H1, form, copy, CTAs,
//  * pricing line) is mounted exactly once in the DOM — only its grid-area
//  * placement changes between mobile (single column, form under the H1)
//  * and desktop (two columns, form pinned to the right rail). This avoids
//  * duplicate <h1> / duplicate form ids that a mobile+desktop copy would
//  * otherwise create.
//  */
// export default function HeroSection() {
//   return (
//     <section className="relative bg-white overflow-hidden pt-[72px]">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 lg:py-16">
//         <div
//           className="hero-grid grid gap-x-16 gap-y-6 lg:gap-y-10"
//           style={{
//             gridTemplateColumns: '1.15fr 1fr',
//             gridTemplateAreas: `"heading heading" "form form" "copy copy" "ctas ctas" "pricing pricing"`,
//           }}
//         >
//           <style>{`
//             @media (min-width: 1024px) {
//               .hero-grid {
//                 grid-template-areas:
//                   "heading form"
//                   "copy form"
//                   "ctas form"
//                   "pricing form" !important;
//               }
//             }
//           `}</style>

//           <motion.h1
//             custom={0.2}
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             style={{ gridArea: 'heading' }}
//             className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95]"
//           >
//             <span className="block text-[#161616]">
//               MAESTRIA <span className="text-[#EB1C26]">IN OGNI</span>
//             </span>
//             <span className="block">
//               <span className="text-[#EB1C26]">DETTAGLIO</span>
//               <span className="text-[#161616]"> SICUREZZA</span>
//             </span>
//             <span className="block text-[#161616]">SU OGNI TETTO</span>
//           </motion.h1>

//           <motion.div
//             custom={0.3}
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             style={{ gridArea: 'form' }}
//             className="lg:self-start"
//           >
//             <HeroForm />
//           </motion.div>

//           <motion.div style={{ gridArea: 'copy' }} className="flex flex-col">
//             <motion.p
//               custom={0.45}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="text-sm text-[#494949] max-w-sm leading-relaxed"
//             >
//               Riparazioni, rifacimenti, impermeabilizzazione e ispezione
//               gratuita con drone. Oltre 32 anni al servizio dei tetti italiani.
//             </motion.p>

//             <motion.p
//               custom={0.5}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="mt-2 text-xs font-semibold text-[#EB1C26] uppercase tracking-wider"
//             >
//               Veneto, Emilia-Romagna e Friuli-Venezia Giulia
//             </motion.p>

//             <motion.p
//               custom={0.55}
//               variants={fadeUp}
//               initial="hidden"
//               animate="visible"
//               className="mt-1 text-xs text-[#494949] tracking-wide"
//             >
//               Garanzia scritta 10 anni su ogni intervento
//             </motion.p>
//           </motion.div>

//           <motion.div
//             custom={0.65}
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             style={{ gridArea: 'ctas' }}
//             className="flex flex-wrap gap-3"
//           >
//             <motion.a
//               href="#hero-form"
//               onClick={() => trackCTAClick('hero_desktop', '#hero-form')}
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center justify-center bg-[#EB1C26] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider"
//             >
//               Ispezione gratuita con drone
//             </motion.a>
//             <motion.a
//               href="#galleria"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="inline-flex items-center justify-center border border-[#161616]/30 px-6 py-3 text-sm font-semibold text-[#161616] uppercase tracking-wider hover:border-[#161616]/60 transition-colors"
//             >
//               Guarda i Lavori
//             </motion.a>
//           </motion.div>

//           <motion.p
//             custom={0.75}
//             variants={fadeUp}
//             initial="hidden"
//             animate="visible"
//             style={{ gridArea: 'pricing' }}
//             className="text-xs text-[#494949]"
//           >
//             Rifacimento completo a partire da{' '}
//             <span className="font-bold text-[#161616]">6.500€</span>{' '}
//             <span className="line-through text-[#999]">(anziché 9.500€)</span>
//             {' '}&middot;{' '}
//             <span className="font-bold text-[#161616]">Garanzia scritta 10 anni</span>
//           </motion.p>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { motion } from 'framer-motion'
import { trackCTAClick } from '@/lib/gtag'
import HeroForm from './hero-form'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  }),
}

/**
 * Single CSS Grid with named areas. Every child (H1, form, copy, CTAs,
 * pricing line) is mounted exactly once in the DOM — only its grid-area
 * placement changes between mobile (single column, form under the H1)
 * and desktop (two columns, form pinned to the right rail). This avoids
 * duplicate <h1> / duplicate form ids that a mobile+desktop copy would
 * otherwise create.
 */
export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden pt-[72px]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10 lg:py-16">
        <div
          className="hero-grid grid gap-x-16 gap-y-6 lg:gap-y-10"
          style={{
            gridTemplateColumns: '1.15fr 1fr',
            gridTemplateAreas: `"heading heading" "copy copy" "ctas ctas" "pricing pricing" "form form"`,
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .hero-grid {
                grid-template-areas:
                  "heading form"
                  "copy form"
                  "ctas form"
                  "pricing form" !important;
              }
            }
          `}</style>

          <motion.h1
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'heading' }}
            className="font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.95]"
          >
            <span className="block text-[#161616]">
              MAESTRIA <span className="text-[#EB1C26]">IN OGNI</span>
            </span>
            <span className="block">
              <span className="text-[#EB1C26]">DETTAGLIO</span>
              <span className="text-[#161616]"> SICUREZZA</span>
            </span>
            <span className="block text-[#161616]">SU OGNI TETTO</span>
          </motion.h1>

          <motion.div
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'form' }}
            className="lg:self-start"
          >
            <HeroForm />
          </motion.div>

          <motion.div style={{ gridArea: 'copy' }} className="flex flex-col">
            <motion.p
              custom={0.45}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-sm text-[#494949] max-w-sm leading-relaxed"
            >
              Riparazioni, rifacimenti, impermeabilizzazione e ispezione
              gratuita con drone. Oltre 32 anni al servizio dei tetti italiani.
            </motion.p>

            <motion.p
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-2 text-xs font-semibold text-[#EB1C26] uppercase tracking-wider"
            >
              Veneto, Emilia-Romagna e Friuli-Venezia Giulia
            </motion.p>

            <motion.p
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-1 text-xs text-[#494949] tracking-wide"
            >
              Garanzia scritta 10 anni su ogni intervento
            </motion.p>
          </motion.div>

          <motion.div
            custom={0.65}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'ctas' }}
            className="flex flex-wrap gap-3"
          >
            <motion.a
              href="#hero-form"
              onClick={() => trackCTAClick('hero_desktop', '#hero-form')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center bg-[#EB1C26] px-6 py-3 text-sm font-bold text-white uppercase tracking-wider"
            >
              Ispezione gratuita con drone
            </motion.a>
            <motion.a
              href="#galleria"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center border border-[#161616]/30 px-6 py-3 text-sm font-semibold text-[#161616] uppercase tracking-wider hover:border-[#161616]/60 transition-colors"
            >
              Guarda i Lavori
            </motion.a>
          </motion.div>

          <motion.p
            custom={0.75}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ gridArea: 'pricing' }}
            className="text-xs text-[#494949]"
          >
            Rifacimento completo a partire da{' '}
            <span className="font-bold text-[#161616]">6.500€</span>{' '}
            <span className="line-through text-[#999]">(anziché 9.500€)</span>
            {' '}&middot;{' '}
            <span className="font-bold text-[#161616]">Garanzia scritta 10 anni</span>
          </motion.p>
        </div>
      </div>
    </section>
  )
}
