// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X, Phone } from 'lucide-react'
// import Tetto94Logo from './logo'

// const navLinks = [
//   { label: 'Servizi', href: '#servizi' },
//   { label: 'Perché Noi', href: '#perche-noi' },
//   { label: 'Galleria', href: '#galleria' },
//   { label: 'Contatti', href: '#contatti' },
// ]

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? 'bg-[#161616]/95 backdrop-blur-md shadow-2xl border-b border-white/5'
//             : 'bg-transparent'
//         }`}
//       >
//         <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//           {/* Logo */}
//           <a href="#" className="flex items-center gap-2 group" aria-label="Tetto94 - Homepage">
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//               className="flex items-center h-14 md:h-16"
//             >
//               <Tetto94Logo className="h-14 md:h-16 w-auto" />
//             </motion.div>
//           </a>

//           {/* Desktop links */}
//           <ul className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <a
//                   href={link.href}
//                   className="relative text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#EB1C26] after:transition-all after:duration-300 hover:after:w-full"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           {/* Desktop CTA */}
//           <div className="hidden md:flex items-center gap-4">
//             <a
//               href="tel:+393160362909"
//               className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
//             >
//               <Phone className="size-3.5" />
//               <span>+39 160 36282909</span>
//             </a>
//             <motion.a
//               href="#contatti"
//               className="relative rounded-sm bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white animate-pulse-ring"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               Preventivo Gratuito
//             </motion.a>
//           </div>

//           {/* Mobile hamburger */}
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="md:hidden text-white p-1"
//             aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
//           >
//             <AnimatePresence mode="wait">
//               {mobileOpen ? (
//                 <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
//                   <X className="size-6" />
//                 </motion.div>
//               ) : (
//                 <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
//                   <Menu className="size-6" />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </button>
//         </nav>
//       </header>

//       {/* Mobile drawer */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//             className="fixed inset-x-0 top-[68px] z-40 bg-[#161616] border-b border-white/10 px-6 py-6 md:hidden"
//           >
//             <ul className="flex flex-col gap-5">
//               {navLinks.map((link, i) => (
//                 <motion.li
//                   key={link.href}
//                   initial={{ opacity: 0, x: -16 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.07 }}
//                 >
//                   <a
//                     href={link.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="text-xl font-display text-white/80 hover:text-[#EB1C26] transition-colors tracking-wider uppercase"
//                   >
//                     {link.label}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//             <a
//               href="#contatti"
//               onClick={() => setMobileOpen(false)}
//               className="mt-8 block rounded-sm bg-[#EB1C26] py-3 text-center text-sm font-semibold text-white"
//             >
//               Richiedi Preventivo Gratuito
//             </a>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Tetto94Logo from './logo'

const navLinks = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Perché Noi', href: '#perche-noi' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Contatti', href: '#contatti' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#161616]/95 backdrop-blur-md shadow-2xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="Tetto94 - Homepage">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="flex items-center"
            >
              <Tetto94Logo className="w-36 md:w-auto md:h-20 h-auto" />
            </motion.div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#EB1C26] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+393516519363"
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Phone className="size-3.5" />
              <span>+39 351 651 9363</span>
            </a>
            <motion.a
              href="#contatti"
              className="relative rounded-sm bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white animate-pulse-ring"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Preventivo Gratuito
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-1"
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="size-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="size-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[68px] z-40 bg-[#161616] border-b border-white/10 px-6 py-6 md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xl font-display text-white/80 hover:text-[#EB1C26] transition-colors tracking-wider uppercase"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contatti"
              onClick={() => setMobileOpen(false)}
              className="mt-8 block rounded-sm bg-[#EB1C26] py-3 text-center text-sm font-semibold text-white"
            >
              Richiedi Preventivo Gratuito
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


