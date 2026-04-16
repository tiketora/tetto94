
// import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
// import Tetto94Logo from './logo'

// const navLinks = [
//   { label: 'Servizi', href: '#servizi' },
//   { label: 'Perche Noi', href: '#perche-noi' },
//   { label: 'Galleria', href: '#galleria' },
//   { label: 'Contatti', href: '#contatti' },
// ]

// export default function Footer() {
//   return (
//     <footer className="bg-[#0E0E0E] border-t border-white/5 pt-16 pb-8">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/5">
//           {/* Brand */}
//           <div className="lg:col-span-2">
//             <Tetto94Logo className="h-14 md:h-16 w-auto" />
//             <p className="mt-4 text-sm text-[#494949] leading-relaxed max-w-sm">
//               Artigiani del tetto dal 1994. Oltre 30 anni al servizio delle abitazioni italiane,
//               con professionalità, materiali certificati e garanzia scritta su ogni lavoro.
//             </p>
//             {/* Social */}
//             <div className="mt-6 flex gap-3">
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram Tetto94"
//                 className="flex size-9 items-center justify-center rounded-sm border border-white/10 text-white/40 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
//               >
//                 <Instagram className="size-4" />
//               </a>
//               <a
//                 href="https://facebook.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook Tetto94"
//                 className="flex size-9 items-center justify-center rounded-sm border border-white/10 text-white/40 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
//               >
//                 <Facebook className="size-4" />
//               </a>
//             </div>
//           </div>

//           {/* Navigation */}
//           <div>
//             <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
//               Navigazione
//             </h3>
//             <ul className="flex flex-col gap-3">
//               {navLinks.map((link) => (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     className="text-sm text-[#494949] hover:text-white transition-colors"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
//               Contatti
//             </h3>
//             <ul className="flex flex-col gap-3">
//               <li className="flex items-center gap-2 text-sm text-[#494949]">
//                 <Phone className="size-3.5 text-[#EB1C26] flex-shrink-0" />
//                 <a href="tel:+393160362909" className="hover:text-white transition-colors">
//                   +39 160 36282909
//                 </a>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-[#494949]">
//                 <Mail className="size-3.5 text-[#EB1C26] flex-shrink-0" />
//                 <a href="mailto:info@tetto94.it" className="hover:text-white transition-colors">
//                   info@tetto94.it
//                 </a>
//               </li>
//               <li className="flex items-start gap-2 text-sm text-[#494949]">
//                 <MapPin className="size-3.5 text-[#EB1C26] flex-shrink-0 mt-0.5" />
//                 <span>Lombardia e province limitrofe</span>
//               </li>
//               <li className="flex items-center gap-2 text-sm text-[#494949]">
//                 <span className="size-3.5 flex-shrink-0" />
//                 <span>www.tetto94.it</span>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-xs text-white/20">
//             &copy; {new Date().getFullYear()} Tetto94. Tutti i diritti riservati.
//           </p>
//           <p className="text-xs text-white/20">
//             P.IVA 12345678901 &mdash; Iscritto alla CCIAA di Milano
//           </p>
//         </div>
//       </div>
//     </footer>
//   )
// }


'use client'

import { Instagram, Facebook } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Perche Noi', href: '#perche-noi' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Contatti', href: '#contatti' },
]

const contacts = [
  '+39 160 36282909',
  'info@tetto94.it',
  'Lombardia e province limitrofe',
  'www.tetto94.it',
]

export default function Footer() {
  return (
    <footer className="bg-[#EB1C26] pt-10 pb-6">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Main grid: 4 columns ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">

          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/logo-white.png"
              alt="Tetto94 logo"
              width={140}
              height={48}
              className="object-contain object-left"
            />
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">
              Artigiani del tetto dal 1994. Oltre 30 anni al servizio
              delle abitazioni italiane, con professionalità, materiali
              certificati e garanzia scritta su ogni lavoro.
            </p>
          </div>

          {/* Col 2 — Navigazione */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">
              Navigazione
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/85 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contatti */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">
              Contatti
            </h3>
            <ul className="flex flex-col gap-2.5">
              {contacts.map((c) => (
                <li key={c} className="text-sm text-white/85">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Seguici + Newsletter */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">
              Seguici
            </h3>

            {/* Social icons */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Tetto94"
                className="flex size-9 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#EB1C26] transition-colors"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Tetto94"
                className="flex size-9 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-[#EB1C26] transition-colors"
              >
                <Facebook className="size-4" />
              </a>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex"
            >
              <input
                type="email"
                placeholder="Il tuo indirizzo email"
                className="flex-1 min-w-0 bg-white text-[#161616] placeholder:text-[#888] text-xs px-3 py-2.5 outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#161616] text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 hover:bg-black transition-colors"
              >
                Iscriviti
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-5 border-t border-white/20">
          <p className="text-xs text-white/80 text-right">
            &copy; 2026 Tetto94. Tutti i diritti riservati.
          </p>
        </div>

      </div>
    </footer>
  )
}

