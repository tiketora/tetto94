
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react'
import Tetto94Logo from './logo'

const navLinks = [
  { label: 'Servizi', href: '#servizi' },
  { label: 'Perche Noi', href: '#perche-noi' },
  { label: 'Galleria', href: '#galleria' },
  { label: 'Contatti', href: '#contatti' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0E0E0E] border-t border-white/5 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Tetto94Logo className="h-14 md:h-16 w-auto" />
            <p className="mt-4 text-sm text-[#494949] leading-relaxed max-w-sm">
              Artigiani del tetto dal 1994. Oltre 30 anni al servizio delle abitazioni italiane,
              con professionalità, materiali certificati e garanzia scritta su ogni lavoro.
            </p>
            {/* Social */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Tetto94"
                className="flex size-9 items-center justify-center rounded-sm border border-white/10 text-white/40 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Tetto94"
                className="flex size-9 items-center justify-center rounded-sm border border-white/10 text-white/40 hover:border-[#EB1C26] hover:text-[#EB1C26] transition-colors"
              >
                <Facebook className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
              Navigazione
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#494949] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white/40 mb-5">
              Contatti
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-[#494949]">
                <Phone className="size-3.5 text-[#EB1C26] flex-shrink-0" />
                <a href="tel:+393160362909" className="hover:text-white transition-colors">
                  +39 160 36282909
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#494949]">
                <Mail className="size-3.5 text-[#EB1C26] flex-shrink-0" />
                <a href="mailto:info@tetto94.it" className="hover:text-white transition-colors">
                  info@tetto94.it
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#494949]">
                <MapPin className="size-3.5 text-[#EB1C26] flex-shrink-0 mt-0.5" />
                <span>Lombardia e province limitrofe</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[#494949]">
                <span className="size-3.5 flex-shrink-0" />
                <span>www.tetto94.it</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Tetto94. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-white/20">
            P.IVA 12345678901 &mdash; Iscritto alla CCIAA di Milano
          </p>
        </div>
      </div>
    </footer>
  )
}

