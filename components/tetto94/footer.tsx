import { MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SERVICES } from '@/data/services'


const navLinks = [
  { label: 'Servizi', href: '/#servizi' },
  { label: 'Perche Noi', href: '/#perche-noi' },
  { label: 'Garanzie', href: '/garanzie' },
  { label: 'Galleria', href: '/#galleria' },
  { label: 'Contatti', href: '/contatti' },
]

const contacts = [
  '+39 351 651 9363',
  'info@tetto94.it',
  'Veneto, Emilia-Romagna e Friuli-Venezia Giulia',
]

const FOOTER_ZONES = [
  {
    // Venezia + Mestre = stessa Città Metropolitana; Chioggia = Laguna Sud (ufficiale)
    label: 'Venezia & Laguna',
    cities: [
      { slug: 'venezia',  name: 'Venezia',  province: 'VE' },
      { slug: 'mestre',   name: 'Mestre',   province: 'VE' },
      { slug: 'chioggia', name: 'Chioggia', province: 'VE' },
    ],
  },
  {
    // Mirano = Miranese (entroterra veneziano); San Donà = Venezia Orientale (L.R. 16/1993);
    // Mogliano + Treviso = Marca Trevigiana (nome storico ufficiale); Padova = capoluogo PD
    label: 'Entroterra & Marca Trevigiana',
    cities: [
      { slug: 'mirano',            name: 'Mirano',            province: 'VE' },
      { slug: 'san-dona-di-piave', name: 'San Donà di Piave', province: 'VE' },
      { slug: 'mogliano-veneto',   name: 'Mogliano Veneto',   province: 'TV' },
      { slug: 'treviso',           name: 'Treviso',           province: 'TV' },
      { slug: 'padova',            name: 'Padova',            province: 'PD' },
    ],
  },
  {
    // Verona + Vicenza = province occidentali venete; Belluno = unica provincia
    // interamente montana del Veneto (Dolomiti UNESCO); Rovigo = Polesine / Pianura Padana
    label: 'Province Venete, Dolomiti & Polesine',
    cities: [
      { slug: 'verona',  name: 'Verona',  province: 'VR' },
      { slug: 'vicenza', name: 'Vicenza', province: 'VI' },
      { slug: 'belluno', name: 'Belluno', province: 'BL' },
      { slug: 'rovigo',  name: 'Rovigo',  province: 'RO' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#EB1C26] pt-10 pb-6">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">

          {/* Col 1 — Logo + tagline (spans 2 on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Image
              src="/images/logo-white.png"
              alt="Tetto94 logo"
              width={140}
              height={48}
              className="object-contain object-left"
            />
            <p className="text-xs text-white/80 leading-relaxed max-w-[240px]">
              Artigiani del tetto dal 1994. Da oltre 32 anni al servizio
              delle abitazioni italiane, con professionalità, materiali
              certificati e garanzia scritta su ogni lavoro.
            </p>
            {/* Social links intentionally omitted — pending confirmed
                Instagram/Facebook profile URLs from the client. */}
          </div>

          {/* Col 2 — Navigazione */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">Navigazione</h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/85 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Servizi */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">Servizi</h3>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="text-sm text-white/85 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contatti */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white mb-4">Contatti</h3>
            <ul className="flex flex-col gap-2.5">
              {contacts.map((c) => (
                <li key={c} className="text-sm text-white/85">{c}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Zone e citta ── */}
        <div className="border-t border-white/15 pt-8 pb-2">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="size-3.5 text-white/60" />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Rifacimento Tetto — 12 zone servite</p>
          </div>

          {/* Desktop: 3 zone in row */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6">
            {FOOTER_ZONES.map((zone) => (
              <div key={zone.label}>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3 pb-2 border-b border-white/10">
                  {zone.label}
                </p>
                <ul className="flex flex-col gap-2">
                  {zone.cities.map((city) => (
                    <li key={city.slug} className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-white/30 w-5 shrink-0">{city.province}</span>
                      <Link
                        href={`/rifacimento-tetto/${city.slug}`}
                        className="text-xs text-white/70 hover:text-white transition-colors"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile: compact chip grid */}
          <div className="sm:hidden flex flex-wrap gap-2">
            {FOOTER_ZONES.flatMap((zone) =>
              zone.cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/rifacimento-tetto/${city.slug}`}
                  className="flex items-center gap-1.5 border border-white/15 bg-white/5 px-2.5 py-1.5 hover:border-white/35 hover:bg-white/10 transition-colors"
                >
                  <span className="text-[9px] font-black text-white/40">{city.province}</span>
                  <span className="text-xs text-white/80">{city.name}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-2">
          <Link href="/privacy" className="text-xs text-white/60 hover:text-white transition-colors underline underline-offset-2">
            Informativa sulla Privacy
          </Link>
          <p className="text-xs text-white/80 text-center">
            &copy; 2026 Tetto94 &middot; Via Benedetto Veruda, 30100 Venezia VE. Tutti i diritti riservati.
          </p>
        </div>

      </div>
    </footer>
  )
}
