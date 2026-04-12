// 'use client'

// import { motion, AnimatePresence } from 'framer-motion'
// import { MessageCircle } from 'lucide-react'

// export default function WhatsAppButton() {
//   return (
//     <motion.a
//       href="https://wa.me/393160362909?text=Salve%2C%20vorrei%20richiedere%20un%27ispezione%20gratuita%20del%20tetto."
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Scrivici su WhatsApp"
//       className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-2xl"
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}
//       whileHover={{ scale: 1.08 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       {/* Pulsing ring */}
//       <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
//       <MessageCircle className="relative z-10 size-5 fill-white" />
//       <span className="relative z-10 text-sm font-semibold leading-none hidden sm:block">
//         WhatsApp
//       </span>
//     </motion.a>
//   )
// }

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/393298297679?text=Salve%2C%20vorrei%20richiedere%20un%27ispezione%20gratuita%20del%20tetto."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-2xl"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <MessageCircle className="relative z-10 size-5 fill-white" />
      <span className="relative z-10 text-sm font-semibold leading-none hidden sm:block">
        WhatsApp
      </span>
    </motion.a>
  )
}
