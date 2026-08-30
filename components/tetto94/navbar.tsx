// 'use client'

// import { useState, useEffect, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, X, Phone, MapPin, ChevronDown, ChevronLeft, ArrowRight, Layers, Droplets, Hammer, CloudRain, Wind, Gauge } from 'lucide-react'
// import type { LucideIcon } from 'lucide-react'
// import Tetto94Logo from './logo'
// import { trackPhoneClick, trackCTAClick } from '@/lib/gtag'
// import { SERVICES, type ServiceConfig } from '@/data/services'

// /* ── Zone geografiche — verificate su fonti ufficiali (Wikipedia, L.R. 16/1993) ─ */
// const ZONES = [
//   {
//     id: 'venezia-laguna',
//     // Venezia e Mestre sono la stessa città metropolitana; Chioggia è laguna sud ufficiale
//     label: 'Venezia & Laguna',
//     subtitle: 'Città Metropolitana di Venezia',
//     cities: [
//       { slug: 'venezia',  name: 'Venezia',  province: 'VE', landmark: 'Laguna Veneta' },
//       { slug: 'mestre',   name: 'Mestre',   province: 'VE', landmark: 'Terraferma Veneziana' },
//       { slug: 'chioggia', name: 'Chioggia', province: 'VE', landmark: 'Laguna Sud' },
//     ],
//   },
//   {
//     id: 'entroterra-marca',
//     // Mirano = Miranese (entroterra veneziano ufficiale); San Donà = Venezia Orientale (L.R. 16/1993);
//     // Mogliano e Treviso = Marca Trevigiana (nome storico ufficiale); Padova = provincia PD
//     label: 'Entroterra & Marca Trevigiana',
//     subtitle: 'Venezia Orientale, Miranese & Trevigiano',
//     cities: [
//       { slug: 'mirano',            name: 'Mirano',            province: 'VE', landmark: 'Miranese' },
//       { slug: 'san-dona-di-piave', name: 'San Donà di Piave', province: 'VE', landmark: 'Venezia Orientale' },
//       { slug: 'mogliano-veneto',   name: 'Mogliano Veneto',   province: 'TV', landmark: 'Marca Trevigiana' },
//       { slug: 'treviso',           name: 'Treviso',           province: 'TV', landmark: 'Marca Trevigiana' },
//       { slug: 'padova',            name: 'Padova',            province: 'PD', landmark: 'Padovano' },
//     ],
//   },
//   {
//     id: 'province-dolomiti-polesine',
//     // Verona e Vicenza = province occidentali venete (pianura/colli);
//     // Belluno = unica provincia interamente montana del Veneto, Dolomiti UNESCO;
//     // Rovigo = Polesine, pianura padana meridionale
//     label: 'Province Venete, Dolomiti & Polesine',
//     subtitle: 'Verona, Vicenza, Belluno & Rovigo',
//     cities: [
//       { slug: 'verona',  name: 'Verona',  province: 'VR', landmark: 'Arena Romana' },
//       { slug: 'vicenza', name: 'Vicenza', province: 'VI', landmark: 'Ville Palladiane UNESCO' },
//       { slug: 'belluno', name: 'Belluno', province: 'BL', landmark: 'Dolomiti UNESCO' },
//       { slug: 'rovigo',  name: 'Rovigo',  province: 'RO', landmark: 'Polesine & Delta del Po' },
//     ],
//   },
// ]

// /* flat list for mobile / preview default */
// const ALL_CITIES = ZONES.flatMap((z) => z.cities)

// const navLinks = [
//   { label: 'Servizi',    href: '/#servizi' },
//   { label: 'Perché Noi', href: '/#perche-noi' },
//   { label: 'Garanzie',   href: '/garanzie' },
//   { label: 'Galleria',   href: '/#galleria' },
//   { label: 'Contatti',   href: '/contatti' },
// ]

// /* ── Service picker — step 1 of the città dropdown ──────────────
//    Maps the data-layer icon name (string) to the actual Lucide component,
//    and supplies a short nav-only subtitle + thumbnail per service. Only
//    'rifacimento-tetto' has per-city photography (og/rifacimento-tetto-{city}),
//    so every other service falls back to its generic service thumbnail. */
// const SERVICE_ICONS: Record<string, LucideIcon> = { Layers, Droplets, Hammer, CloudRain, Wind }

// const SERVICE_THUMBNAILS: Record<string, string> = {
//   'rifacimento-tetto':            '/images/service-rifacimento.png',
//   'impermeabilizzazione-tetto':   '/images/service-impermeabilizzazione.png',
//   'riparazione-tetto':            '/images/service-riparazione.png',
//   'infiltrazioni-tetto':          '/images/service-infiltrazioni.png',
//   'pulizia-grondaie':             '/images/service-grondaie.png',
// }

// const SERVICE_SHORT_DESC: Record<string, string> = {
//   'rifacimento-tetto':            'Sostituzione completa, garanzia 10 anni',
//   'impermeabilizzazione-tetto':   'Stop a infiltrazioni e umidità',
//   'riparazione-tetto':            'Interventi rapidi e localizzati',
//   'infiltrazioni-tetto':          "Diagnosi e blocco perdite d'acqua",
//   'pulizia-grondaie':             'Pulizia e sigillatura canali di scarico',
// }

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen]           = useState(false)
//   const [dropdownOpen, setDropdownOpen]       = useState(false)
//   /* Hide-on-scroll-down / reveal-on-scroll-up — the fixed header gets out
//      of the way while reading, and comes back the instant the visitor
//      scrolls back up looking for it (nav, phone, CTA). Always pinned
//      visible near the top of the page so it never disappears mid-hero. */
//   const [headerVisible, setHeaderVisible]     = useState(true)
//   const lastScrollY = useRef(0)
//   /* Two-step città flow: pick the service first, then the city — every
//      link built from this state points at /{service.slug}/{city.slug}. */
//   const [citySelectStep, setCitySelectStep]   = useState<'service' | 'city'>('service')
//   const [activeService, setActiveService]     = useState<ServiceConfig | null>(null)
//   const [activeZone, setActiveZone]           = useState(ZONES[0].id)
//   const [hoveredCity, setHoveredCity]         = useState(ALL_CITIES[0])
//   const [mobileZoneOpen, setMobileZoneOpen]   = useState<string | null>(null)
//   const dropdownRef = useRef<HTMLDivElement>(null)
//   const triggerRef  = useRef<HTMLButtonElement>(null)

//   /* Close dropdown on outside click */
//   useEffect(() => {
//     function handler(e: MouseEvent) {
//       if (
//         dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
//         triggerRef.current  && !triggerRef.current.contains(e.target as Node)
//       ) setDropdownOpen(false)
//     }
//     document.addEventListener('mousedown', handler)
//     return () => document.removeEventListener('mousedown', handler)
//   }, [])

//   /* Always re-open on the service-picker step — never assume the last
//      service the visitor viewed is still the one they want. */
//   useEffect(() => {
//     if (dropdownOpen) { setCitySelectStep('service'); setActiveService(null) }
//   }, [dropdownOpen])

//   useEffect(() => {
//     if (mobileOpen) { setCitySelectStep('service'); setActiveService(null); setMobileZoneOpen(null) }
//   }, [mobileOpen])

//   /* Lock body scroll when mobile menu open */
//   useEffect(() => {
//     document.body.style.overflow = mobileOpen ? 'hidden' : ''
//     return () => { document.body.style.overflow = '' }
//   }, [mobileOpen])

//   /* Hide the header on scroll-down, reveal it on scroll-up. Ignored while
//      any menu/dropdown is open so the header can't vanish out from under
//      an open mega-menu or the mobile drawer. */
//   useEffect(() => {
//     lastScrollY.current = window.scrollY
//     function handleScroll() {
//       const y = window.scrollY
//       const delta = y - lastScrollY.current
//       if (mobileOpen || dropdownOpen) {
//         setHeaderVisible(true)
//       } else if (y < 96) {
//         setHeaderVisible(true) // always pinned near the top
//       } else if (delta > 4) {
//         setHeaderVisible(false) // scrolling down
//       } else if (delta < -4) {
//         setHeaderVisible(true) // scrolling up
//       }
//       lastScrollY.current = y
//     }
//     window.addEventListener('scroll', handleScroll, { passive: true })
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [mobileOpen, dropdownOpen])

//   const currentZone = ZONES.find((z) => z.id === activeZone) ?? ZONES[0]

//   function selectService(service: ServiceConfig) {
//     setActiveService(service)
//     setCitySelectStep('city')
//   }

//   return (
//     <>
//       <motion.header
//         animate={{ y: headerVisible ? 0 : '-100%' }}
//         transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
//         className="fixed top-0 left-0 right-0 z-50 bg-[#161616] shadow-2xl border-b border-white/5"
//       >
//         <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 md:py-4 overflow-visible">

//           {/* Logo */}
//           <a href="/" className="flex items-center gap-2 group" aria-label="Tetto94 - Homepage">
//             <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
//               <Tetto94Logo className="h-16 md:h-20 w-auto" />
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

//             {/* Cities dropdown trigger */}
//             <li className="relative">
//               <button
//                 ref={triggerRef}
//                 onClick={() => setDropdownOpen((v) => !v)}
//                 className="relative flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
//                 aria-expanded={dropdownOpen}
//                 aria-haspopup="true"
//               >
//                 <MapPin className="size-3.5 text-[#EB1C26]" />
//                 Città
//                 <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
//                   <ChevronDown className="size-3.5 text-white/40" />
//                 </motion.span>
//                 <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#EB1C26] transition-all duration-300 ${dropdownOpen ? 'w-full' : 'w-0'}`} />
//               </button>
//             </li>
//           </ul>

//           {/* Desktop CTA */}
//           <div className="hidden md:flex items-center gap-3">
//             <a
//               href="tel:+393516519363"
//               onClick={() => trackPhoneClick('navbar')}
//               className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
//             >
//               <Phone className="size-3.5" />
//               <span>+39 351 651 9363</span>
//             </a>
//             <motion.a
//               href="/calcola-preventivo"
//               onClick={() => trackCTAClick('navbar_desktop', '/calcola-preventivo')}
//               className="relative flex items-center gap-2 rounded-sm border border-[#EB1C26]/50 bg-[#EB1C26]/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EB1C26]/20 hover:border-[#EB1C26]"
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//             >
//               <Gauge className="size-4 text-[#EB1C26]" />
//               T94 Roof Index
//             </motion.a>
//             <motion.a
//               href="/contatti"
//               onClick={() => trackCTAClick('navbar_desktop', '/contatti')}
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
//       </motion.header>

//       {/* ── Mega-dropdown — step 1: servizio → step 2: zone + città ─── */}
//       <AnimatePresence>
//         {dropdownOpen && (
//           <motion.div
//             ref={dropdownRef}
//             key="city-dropdown"
//             initial={{ opacity: 0, y: -8, scaleY: 0.97 }}
//             animate={{ opacity: 1, y: 0, scaleY: 1 }}
//             exit={{ opacity: 0, y: -8, scaleY: 0.97 }}
//             transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
//             style={{ transformOrigin: 'top' }}
//             className="fixed left-0 right-0 top-[72px] md:top-[88px] z-40 bg-[#111] border-b border-white/8 shadow-2xl"
//           >
//             <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#EB1C26]" />

//             <div className="mx-auto max-w-7xl px-6 py-6">
//               <AnimatePresence mode="wait">

//                 {citySelectStep === 'service' ? (
//                   /* ── STEP 1 — choose the service ─────────────── */
//                   <motion.div
//                     key="step-service"
//                     initial={{ opacity: 0, x: -12 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: -12 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     <div className="flex items-baseline justify-between mb-4">
//                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
//                         Passo 1 — Seleziona il Servizio
//                       </p>
//                       <p className="text-[10px] text-white/25">poi scegli la città</p>
//                     </div>

//                     <div className="grid grid-cols-5 gap-3">
//                       {SERVICES.map((service, i) => {
//                         const Icon = SERVICE_ICONS[service.icon] ?? Layers
//                         return (
//                           <motion.button
//                             key={service.slug}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.05 }}
//                             onClick={() => selectService(service)}
//                             className="group relative flex flex-col overflow-hidden border border-white/8 bg-white/2 text-left transition-all duration-200 hover:border-[#EB1C26]/50 hover:bg-white/4"
//                           >
//                             <div className="relative h-24 w-full overflow-hidden">
//                               <img
//                                 src={SERVICE_THUMBNAILS[service.slug] || '/images/service-rifacimento.png'}
//                                 alt=""
//                                 className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                               />
//                               <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/25 to-transparent" />
//                               <div className="absolute bottom-2 left-2 flex size-7 items-center justify-center bg-[#EB1C26]">
//                                 <Icon className="size-3.5 text-white" />
//                               </div>
//                             </div>
//                             <div className="p-3">
//                               <p className="text-xs font-bold uppercase tracking-wide text-white leading-snug">
//                                 {service.name}
//                               </p>
//                               <p className="mt-1 text-[10px] text-white/40 leading-snug">
//                                 {SERVICE_SHORT_DESC[service.slug]}
//                               </p>
//                             </div>
//                             <ArrowRight className="absolute right-2 bottom-2 size-3.5 text-white/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#EB1C26]" />
//                           </motion.button>
//                         )
//                       })}
//                     </div>
//                   </motion.div>
//                 ) : activeService && (
//                   /* ── STEP 2 — zone + città for the chosen service ─ */
//                   <motion.div
//                     key="step-city"
//                     initial={{ opacity: 0, x: 12 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 12 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     {/* Back bar */}
//                     <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
//                       <button
//                         onClick={() => setCitySelectStep('service')}
//                         className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50 transition-colors hover:text-white"
//                       >
//                         <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
//                         Servizi
//                       </button>
//                       <div className="flex items-center gap-2">
//                         <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">Stai cercando</span>
//                         <span className="flex items-center gap-1.5 border border-[#EB1C26]/30 bg-[#EB1C26]/10 px-2.5 py-1 text-xs font-bold text-[#EB1C26]">
//                           {(() => { const Icon = SERVICE_ICONS[activeService.icon] ?? Layers; return <Icon className="size-3" /> })()}
//                           {activeService.name}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-0">

//                       {/* COL A — Zone tabs (vertical) */}
//                       <div className="flex flex-col border-r border-white/8 pr-6 mr-6 min-w-[200px]">
//                         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
//                           Zona
//                         </p>
//                         {ZONES.map((zone, i) => (
//                           <motion.button
//                             key={zone.id}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.06 }}
//                             onMouseEnter={() => { setActiveZone(zone.id); setHoveredCity(zone.cities[0]) }}
//                             onClick={() => setActiveZone(zone.id)}
//                             className={`group text-left px-4 py-3.5 border-l-2 transition-all duration-200 mb-1 ${
//                               activeZone === zone.id
//                                 ? 'border-[#EB1C26] bg-white/5'
//                                 : 'border-transparent hover:border-white/20 hover:bg-white/3'
//                             }`}
//                           >
//                             <p className={`text-sm font-bold tracking-wide transition-colors ${activeZone === zone.id ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
//                               {zone.label}
//                             </p>
//                             <p className={`text-[10px] mt-0.5 transition-colors ${activeZone === zone.id ? 'text-white/50' : 'text-white/25'}`}>
//                               {zone.subtitle}
//                             </p>
//                           </motion.button>
//                         ))}

//                         {/* count badge */}
//                         <div className="mt-auto pt-4 border-t border-white/8">
//                           <span className="text-[10px] font-bold text-[#EB1C26]">12 comuni</span>
//                           <span className="text-[10px] text-white/25 ml-1">in 3 zone</span>
//                         </div>
//                       </div>

//                       {/* COL B — City list for active zone */}
//                       <div className="pr-6 mr-6 border-r border-white/8">
//                         <AnimatePresence mode="wait">
//                           <motion.div
//                             key={activeZone}
//                             initial={{ opacity: 0, x: 10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -10 }}
//                             transition={{ duration: 0.18 }}
//                           >
//                             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
//                               {currentZone.label}
//                             </p>
//                             <ul className="flex flex-col gap-1.5">
//                               {currentZone.cities.map((city, i) => (
//                                 <motion.li
//                                   key={city.slug}
//                                   initial={{ opacity: 0, y: 6 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: i * 0.05 }}
//                                 >
//                                   <a
//                                     href={`/${activeService.slug}/${city.slug}`}
//                                     onClick={() => { setDropdownOpen(false); trackCTAClick(`navbar_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
//                                     onMouseEnter={() => setHoveredCity(city)}
//                                     className={`group flex items-center justify-between px-4 py-3 border transition-all duration-150 ${
//                                       hoveredCity.slug === city.slug
//                                         ? 'border-[#EB1C26]/50 bg-[#EB1C26]/8 text-white'
//                                         : 'border-white/6 bg-white/2 text-white/65 hover:border-white/15 hover:bg-white/4 hover:text-white'
//                                     }`}
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <span className={`text-[10px] font-black px-1.5 py-0.5 transition-colors ${hoveredCity.slug === city.slug ? 'bg-[#EB1C26] text-white' : 'bg-white/8 text-white/35'}`}>
//                                         {city.province}
//                                       </span>
//                                       <div>
//                                         <p className="text-sm font-bold leading-none">{city.name}</p>
//                                         <p className="text-[10px] text-white/30 mt-0.5">{city.landmark}</p>
//                                       </div>
//                                     </div>
//                                     <ArrowRight className={`size-3.5 transition-all duration-150 shrink-0 ${hoveredCity.slug === city.slug ? 'text-[#EB1C26] translate-x-0.5' : 'text-white/15'}`} />
//                                   </a>
//                                 </motion.li>
//                               ))}
//                             </ul>
//                           </motion.div>
//                         </AnimatePresence>
//                       </div>

//                       {/* COL C — City preview card */}
//                       <div className="hidden lg:block">
//                         <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
//                           Anteprima
//                         </p>
//                         <AnimatePresence mode="wait">
//                           <motion.div
//                             key={`${activeService.slug}-${hoveredCity.slug}`}
//                             initial={{ opacity: 0, scale: 0.98 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.98 }}
//                             transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
//                             className="relative overflow-hidden border border-white/8 h-[200px]"
//                           >
//                             <img
//                               src={
//                                 activeService.slug === 'rifacimento-tetto'
//                                   ? `/images/og/rifacimento-tetto-${hoveredCity.slug}.png`
//                                   : SERVICE_THUMBNAILS[activeService.slug] || '/images/service-rifacimento.png'
//                               }
//                               alt={`${activeService.name} a ${hoveredCity.name}`}
//                               className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
//                             />
//                             <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #111 0%, #111 20%, rgba(17,17,17,0.65) 50%, rgba(17,17,17,0.1) 100%)' }} />
//                             <div className="absolute left-0 inset-y-0 w-[3px] bg-[#EB1C26]" />
//                             <div className="absolute inset-0 flex flex-col justify-between p-5">
//                               <div>
//                                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
//                                   {hoveredCity.province} — {hoveredCity.landmark}
//                                 </p>
//                                 <h3 className="mt-1.5 font-display text-2xl text-white leading-none">
//                                   {hoveredCity.name.toUpperCase()}
//                                 </h3>
//                               </div>
//                               <a
//                                 href={`/${activeService.slug}/${hoveredCity.slug}`}
//                                 onClick={() => { setDropdownOpen(false); trackCTAClick(`navbar_city_cta_${hoveredCity.slug}`, `/${activeService.slug}/${hoveredCity.slug}`) }}
//                                 className="inline-flex items-center gap-2 bg-[#EB1C26] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white self-start hover:bg-[#c8111a] transition-colors"
//                               >
//                                 {activeService.name}
//                                 <ArrowRight className="size-3.5" />
//                               </a>
//                             </div>
//                           </motion.div>
//                         </AnimatePresence>
//                       </div>

//                     </div>
//                   </motion.div>
//                 )}

//               </AnimatePresence>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── Mobile drawer ─────────────────────────────────────── */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.25, ease: 'easeOut' }}
//             className="fixed inset-x-0 top-[68px] bottom-0 z-40 bg-[#161616] overflow-y-auto px-6 py-6 md:hidden"
//           >
//             {/* Nav links */}
//             <ul className="flex flex-col gap-5">
//               {navLinks.map((link, i) => (
//                 <motion.li key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
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

//             {/* Mobile città — step 1: servizio → step 2: zone accordion */}
//             <div className="mt-8 border-t border-white/8 pt-8">
//               <AnimatePresence mode="wait">
//                 {citySelectStep === 'service' ? (
//                   <motion.div key="mobile-step-service" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Seleziona il Servizio</p>
//                       <span className="text-[10px] font-bold bg-[#EB1C26]/15 text-[#EB1C26] px-2 py-0.5">12 comuni</span>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                       {SERVICES.map((service, i) => {
//                         const Icon = SERVICE_ICONS[service.icon] ?? Layers
//                         return (
//                           <motion.button
//                             key={service.slug}
//                             initial={{ opacity: 0, x: -16 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: i * 0.06 }}
//                             onClick={() => selectService(service)}
//                             className="group flex items-center justify-between gap-3 border border-white/10 bg-white/3 px-4 py-3.5 text-left active:border-[#EB1C26]/50 active:bg-[#EB1C26]/8"
//                           >
//                             <div className="flex items-center gap-3">
//                               <div className="flex size-9 items-center justify-center border border-[#EB1C26]/30 bg-[#EB1C26]/15">
//                                 <Icon className="size-4 text-[#EB1C26]" />
//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold text-white">{service.name}</p>
//                                 <p className="text-[10px] text-white/35 mt-0.5">{SERVICE_SHORT_DESC[service.slug]}</p>
//                               </div>
//                             </div>
//                             <ArrowRight className="size-4 text-white/25 transition-colors group-active:text-[#EB1C26] shrink-0" />
//                           </motion.button>
//                         )
//                       })}
//                     </div>
//                   </motion.div>
//                 ) : activeService && (
//                   <motion.div key="mobile-step-city" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
//                     <button
//                       onClick={() => setCitySelectStep('service')}
//                       className="group mb-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50 active:text-white"
//                     >
//                       <ChevronLeft className="size-3.5" />
//                       Cambia servizio
//                       <span className="text-[#EB1C26]">· {activeService.name}</span>
//                     </button>

//                     <div className="flex items-center justify-between mb-2">
//                       <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Zone Servite</p>
//                       <span className="text-[10px] font-bold bg-[#EB1C26]/15 text-[#EB1C26] px-2 py-0.5">12 comuni</span>
//                     </div>

//                     <div className="flex flex-col gap-3">
//                       {ZONES.map((zone, zi) => (
//                         <motion.div
//                           key={zone.id}
//                           initial={{ opacity: 0, x: -16 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: zi * 0.08 }}
//                         >
//                           {/* Zone accordion header */}
//                           <button
//                             onClick={() => setMobileZoneOpen(mobileZoneOpen === zone.id ? null : zone.id)}
//                             className={`w-full flex items-center justify-between px-4 py-3.5 border transition-colors ${
//                               mobileZoneOpen === zone.id
//                                 ? 'border-[#EB1C26]/40 bg-[#EB1C26]/8'
//                                 : 'border-white/10 bg-white/3'
//                             }`}
//                           >
//                             <div className="text-left">
//                               <p className="text-sm font-bold text-white">{zone.label}</p>
//                               <p className="text-[10px] text-white/35 mt-0.5">{zone.subtitle}</p>
//                             </div>
//                             <motion.div animate={{ rotate: mobileZoneOpen === zone.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                               <ChevronDown className="size-4 text-white/40 shrink-0" />
//                             </motion.div>
//                           </button>

//                           {/* Zone cities — revealed on open */}
//                           <AnimatePresence initial={false}>
//                             {mobileZoneOpen === zone.id && (
//                               <motion.div
//                                 initial={{ height: 0, opacity: 0 }}
//                                 animate={{ height: 'auto', opacity: 1 }}
//                                 exit={{ height: 0, opacity: 0 }}
//                                 transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
//                                 className="overflow-hidden"
//                               >
//                                 <div className="flex flex-col gap-1.5 pt-1.5 pl-2">
//                                   {zone.cities.map((city, ci) =>
//                                     activeService.slug === 'rifacimento-tetto' ? (
//                                       <motion.a
//                                         key={city.slug}
//                                         href={`/${activeService.slug}/${city.slug}`}
//                                         onClick={() => { setMobileOpen(false); trackCTAClick(`navbar_mobile_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
//                                         initial={{ opacity: 0, x: -12 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: ci * 0.05 }}
//                                         className="group relative h-[62px] overflow-hidden border border-white/8 active:border-[#EB1C26]/60"
//                                       >
//                                         <img
//                                           src={`/images/og/rifacimento-tetto-${city.slug}.png`}
//                                           alt={city.name}
//                                           className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-105 transition-transform duration-500 group-active:scale-100"
//                                         />
//                                         <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #161616 0%, #161616 28%, rgba(22,22,22,0.7) 58%, rgba(22,22,22,0.2) 100%)' }} />
//                                         <div className="absolute left-0 inset-y-0 w-[3px] bg-[#EB1C26]" />
//                                         <div className="relative flex items-center justify-between h-full px-4">
//                                           <div className="flex items-center gap-3">
//                                             <span className="text-[10px] font-black bg-[#EB1C26] text-white px-2 py-0.5 shrink-0">
//                                               {city.province}
//                                             </span>
//                                             <div>
//                                               <p className="font-display text-base text-white leading-none">{city.name.toUpperCase()}</p>
//                                               <p className="text-[10px] text-white/40 mt-0.5">{city.landmark}</p>
//                                             </div>
//                                           </div>
//                                           <ArrowRight className="size-3.5 text-white/25 group-active:text-[#EB1C26] transition-colors shrink-0" />
//                                         </div>
//                                       </motion.a>
//                                     ) : (
//                                       <motion.a
//                                         key={city.slug}
//                                         href={`/${activeService.slug}/${city.slug}`}
//                                         onClick={() => { setMobileOpen(false); trackCTAClick(`navbar_mobile_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
//                                         initial={{ opacity: 0, x: -12 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: ci * 0.05 }}
//                                         className="group relative flex h-[62px] items-center justify-between border border-white/8 bg-white/3 px-4 active:border-[#EB1C26]/60 active:bg-[#EB1C26]/8"
//                                       >
//                                         <div className="flex items-center gap-3">
//                                           <span className="text-[10px] font-black bg-[#EB1C26] text-white px-2 py-0.5 shrink-0">
//                                             {city.province}
//                                           </span>
//                                           <div>
//                                             <p className="font-display text-base text-white leading-none">{city.name.toUpperCase()}</p>
//                                             <p className="text-[10px] text-white/40 mt-0.5">{city.landmark}</p>
//                                           </div>
//                                         </div>
//                                         <ArrowRight className="size-3.5 text-white/25 group-active:text-[#EB1C26] transition-colors shrink-0" />
//                                       </motion.a>
//                                     )
//                                   )}
//                                 </div>
//                               </motion.div>
//                             )}
//                           </AnimatePresence>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             <div className="mt-8 flex flex-col gap-3">
//               <a
//                 href="/calcola-preventivo"
//                 onClick={() => { setMobileOpen(false); trackCTAClick('navbar_mobile', '/calcola-preventivo') }}
//                 className="flex items-center justify-center gap-2 rounded-sm border border-[#EB1C26]/50 bg-[#EB1C26]/10 py-3 text-center text-sm font-semibold text-white"
//               >
//                 <Gauge className="size-4 text-[#EB1C26]" />
//                 T94 Roof Index
//               </a>
//               <a
//                 href="/contatti"
//                 onClick={() => { setMobileOpen(false); trackCTAClick('navbar_mobile', '/contatti') }}
//                 className="block rounded-sm bg-[#EB1C26] py-3 text-center text-sm font-semibold text-white"
//               >
//                 Richiedi Preventivo Gratuito
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MapPin, ChevronDown, ChevronLeft, ArrowRight, Layers, Droplets, Hammer, CloudRain, Wind, Gauge } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Tetto94Logo from './logo'
import { trackPhoneClick, trackCTAClick } from '@/lib/gtag'
import { SERVICES, type ServiceConfig } from '@/data/services'

/* ── Zone geografiche — verificate su fonti ufficiali (Wikipedia, L.R. 16/1993) ─ */
const ZONES = [
  {
    id: 'venezia-laguna',
    // Venezia e Mestre sono la stessa città metropolitana; Chioggia è laguna sud ufficiale
    label: 'Venezia & Laguna',
    subtitle: 'Città Metropolitana di Venezia',
    cities: [
      { slug: 'venezia',  name: 'Venezia',  province: 'VE', landmark: 'Laguna Veneta' },
      { slug: 'mestre',   name: 'Mestre',   province: 'VE', landmark: 'Terraferma Veneziana' },
      { slug: 'chioggia', name: 'Chioggia', province: 'VE', landmark: 'Laguna Sud' },
    ],
  },
  {
    id: 'entroterra-marca',
    // Mirano = Miranese (entroterra veneziano ufficiale); San Donà = Venezia Orientale (L.R. 16/1993);
    // Mogliano e Treviso = Marca Trevigiana (nome storico ufficiale); Padova = provincia PD
    label: 'Entroterra & Marca Trevigiana',
    subtitle: 'Venezia Orientale, Miranese & Trevigiano',
    cities: [
      { slug: 'mirano',            name: 'Mirano',            province: 'VE', landmark: 'Miranese' },
      { slug: 'san-dona-di-piave', name: 'San Donà di Piave', province: 'VE', landmark: 'Venezia Orientale' },
      { slug: 'mogliano-veneto',   name: 'Mogliano Veneto',   province: 'TV', landmark: 'Marca Trevigiana' },
      { slug: 'treviso',           name: 'Treviso',           province: 'TV', landmark: 'Marca Trevigiana' },
      { slug: 'padova',            name: 'Padova',            province: 'PD', landmark: 'Padovano' },
    ],
  },
  {
    id: 'province-dolomiti-polesine',
    // Verona e Vicenza = province occidentali venete (pianura/colli);
    // Belluno = unica provincia interamente montana del Veneto, Dolomiti UNESCO;
    // Rovigo = Polesine, pianura padana meridionale
    label: 'Province Venete, Dolomiti & Polesine',
    subtitle: 'Verona, Vicenza, Belluno & Rovigo',
    cities: [
      { slug: 'verona',  name: 'Verona',  province: 'VR', landmark: 'Arena Romana' },
      { slug: 'vicenza', name: 'Vicenza', province: 'VI', landmark: 'Ville Palladiane UNESCO' },
      { slug: 'belluno', name: 'Belluno', province: 'BL', landmark: 'Dolomiti UNESCO' },
      { slug: 'rovigo',  name: 'Rovigo',  province: 'RO', landmark: 'Polesine & Delta del Po' },
    ],
  },
]

/* flat list for mobile / preview default */
const ALL_CITIES = ZONES.flatMap((z) => z.cities)

const navLinks = [
  { label: 'Servizi',    href: '/#servizi' },
  { label: 'Perché Noi', href: '/#perche-noi' },
  { label: 'Garanzie',   href: '/garanzie' },
  { label: 'Galleria',   href: '/#galleria' },
  { label: 'Contatti',   href: '/contatti' },
]

/* ── Service picker — step 1 of the città dropdown ──────────────
   Maps the data-layer icon name (string) to the actual Lucide component,
   and supplies a short nav-only subtitle + thumbnail per service. Only
   'rifacimento-tetto' has per-city photography (og/rifacimento-tetto-{city}),
   so every other service falls back to its generic service thumbnail. */
const SERVICE_ICONS: Record<string, LucideIcon> = { Layers, Droplets, Hammer, CloudRain, Wind }

const SERVICE_THUMBNAILS: Record<string, string> = {
  'rifacimento-tetto':            '/images/service-rifacimento.png',
  'impermeabilizzazione-tetto':   '/images/service-impermeabilizzazione.png',
  'riparazione-tetto':            '/images/service-riparazione.png',
  'infiltrazioni-tetto':          '/images/service-infiltrazioni.png',
  'pulizia-grondaie':             '/images/service-grondaie.png',
}

const SERVICE_SHORT_DESC: Record<string, string> = {
  'rifacimento-tetto':            'Sostituzione completa, garanzia 10 anni',
  'impermeabilizzazione-tetto':   'Stop a infiltrazioni e umidità',
  'riparazione-tetto':            'Interventi rapidi e localizzati',
  'infiltrazioni-tetto':          "Diagnosi e blocco perdite d'acqua",
  'pulizia-grondaie':             'Pulizia e sigillatura canali di scarico',
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen]           = useState(false)
  const [dropdownOpen, setDropdownOpen]       = useState(false)
  /* Hide-on-scroll-down / reveal-on-scroll-up — the fixed header gets out
     of the way while reading, and comes back the instant the visitor
     scrolls back up looking for it (nav, phone, CTA). Always pinned
     visible near the top of the page so it never disappears mid-hero. */
  const [headerVisible, setHeaderVisible]     = useState(true)
  const lastScrollY = useRef(0)
  /* Two-step città flow: pick the service first, then the city — every
     link built from this state points at /{service.slug}/{city.slug}. */
  const [citySelectStep, setCitySelectStep]   = useState<'service' | 'city'>('service')
  const [activeService, setActiveService]     = useState<ServiceConfig | null>(null)
  const [activeZone, setActiveZone]           = useState(ZONES[0].id)
  const [hoveredCity, setHoveredCity]         = useState(ALL_CITIES[0])
  const [mobileZoneOpen, setMobileZoneOpen]   = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef  = useRef<HTMLButtonElement>(null)

  /* Close dropdown on outside click */
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current  && !triggerRef.current.contains(e.target as Node)
      ) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* Always re-open on the service-picker step — never assume the last
     service the visitor viewed is still the one they want. */
  useEffect(() => {
    if (dropdownOpen) { setCitySelectStep('service'); setActiveService(null) }
  }, [dropdownOpen])

  useEffect(() => {
    if (mobileOpen) { setCitySelectStep('service'); setActiveService(null); setMobileZoneOpen(null) }
  }, [mobileOpen])

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /* Hide the header on scroll-down, reveal it on scroll-up. Ignored while
     any menu/dropdown is open so the header can't vanish out from under
     an open mega-menu or the mobile drawer. */
  useEffect(() => {
    lastScrollY.current = window.scrollY
    function handleScroll() {
      const y = window.scrollY
      const delta = y - lastScrollY.current
      if (mobileOpen || dropdownOpen) {
        setHeaderVisible(true)
      } else if (y < 96) {
        setHeaderVisible(true) // always pinned near the top
      } else if (delta > 4) {
        setHeaderVisible(false) // scrolling down
      } else if (delta < -4) {
        setHeaderVisible(true) // scrolling up
      }
      lastScrollY.current = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [mobileOpen, dropdownOpen])

  const currentZone = ZONES.find((z) => z.id === activeZone) ?? ZONES[0]

  function selectService(service: ServiceConfig) {
    setActiveService(service)
    setCitySelectStep('city')
  }

  return (
    <>
      <motion.header
        animate={{ y: headerVisible ? 0 : '-100%' }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#161616] shadow-2xl border-b border-white/5"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 md:py-4 overflow-visible">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group" aria-label="Tetto94 - Homepage">
            <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <Tetto94Logo className="h-16 md:h-20 w-auto" />
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

            {/* Cities dropdown trigger */}
            <li className="relative">
              <button
                ref={triggerRef}
                onClick={() => setDropdownOpen((v) => !v)}
                className="relative flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                <MapPin className="size-3.5 text-[#EB1C26]" />
                Città
                <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronDown className="size-3.5 text-white/40" />
                </motion.span>
                <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#EB1C26] transition-all duration-300 ${dropdownOpen ? 'w-full' : 'w-0'}`} />
              </button>
            </li>
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+393516519363"
              onClick={() => trackPhoneClick('navbar')}
              className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Phone className="size-3.5" />
              <span>+39 351 651 9363</span>
            </a>
            <motion.a
              href="/calcola-preventivo"
              onClick={() => trackCTAClick('navbar_desktop', '/calcola-preventivo')}
              className="relative flex items-center gap-2 rounded-sm border border-[#EB1C26]/50 bg-[#EB1C26]/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EB1C26]/20 hover:border-[#EB1C26]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Gauge className="size-4 text-[#EB1C26]" />
              T94 Roof Index
            </motion.a>
            <motion.a
              href="/contatti"
              onClick={() => trackCTAClick('navbar_desktop', '/contatti')}
              className="relative rounded-sm bg-[#EB1C26] px-5 py-2.5 text-sm font-semibold text-white animate-pulse-ring"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Preventivo Gratuito
            </motion.a>
          </div>

          {/* Mobile: Roof Index shortcut + hamburger — surfaced outside the
              drawer since it's the primary conversion tool and shouldn't be
              hidden an extra tap away behind the burger menu. */}
          <div className="flex md:hidden items-center gap-2">
            <motion.a
              href="/calcola-preventivo"
              onClick={() => trackCTAClick('navbar_mobile_header', '/calcola-preventivo')}
              className="flex items-center gap-1.5 rounded-sm border border-[#EB1C26]/50 bg-[#EB1C26]/10 px-2.5 py-1.5 text-xs font-semibold text-white"
              whileTap={{ scale: 0.96 }}
            >
              <Gauge className="size-3.5 text-[#EB1C26]" />
              Roof Index
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-1"
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
          </div>
        </nav>
      </motion.header>

      {/* ── Mega-dropdown — step 1: servizio → step 2: zone + città ─── */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            ref={dropdownRef}
            key="city-dropdown"
            initial={{ opacity: 0, y: -8, scaleY: 0.97 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'top' }}
            className="fixed left-0 right-0 top-[72px] md:top-[88px] z-40 bg-[#111] border-b border-white/8 shadow-2xl"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#EB1C26]" />

            <div className="mx-auto max-w-7xl px-6 py-6">
              <AnimatePresence mode="wait">

                {citySelectStep === 'service' ? (
                  /* ── STEP 1 — choose the service ─────────────── */
                  <motion.div
                    key="step-service"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-baseline justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">
                        Passo 1 — Seleziona il Servizio
                      </p>
                      <p className="text-[10px] text-white/25">poi scegli la città</p>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      {SERVICES.map((service, i) => {
                        const Icon = SERVICE_ICONS[service.icon] ?? Layers
                        return (
                          <motion.button
                            key={service.slug}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => selectService(service)}
                            className="group relative flex flex-col overflow-hidden border border-white/8 bg-white/2 text-left transition-all duration-200 hover:border-[#EB1C26]/50 hover:bg-white/4"
                          >
                            <div className="relative h-24 w-full overflow-hidden">
                              <img
                                src={SERVICE_THUMBNAILS[service.slug] || '/images/service-rifacimento.png'}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/25 to-transparent" />
                              <div className="absolute bottom-2 left-2 flex size-7 items-center justify-center bg-[#EB1C26]">
                                <Icon className="size-3.5 text-white" />
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="text-xs font-bold uppercase tracking-wide text-white leading-snug">
                                {service.name}
                              </p>
                              <p className="mt-1 text-[10px] text-white/40 leading-snug">
                                {SERVICE_SHORT_DESC[service.slug]}
                              </p>
                            </div>
                            <ArrowRight className="absolute right-2 bottom-2 size-3.5 text-white/0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#EB1C26]" />
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : activeService && (
                  /* ── STEP 2 — zone + città for the chosen service ─ */
                  <motion.div
                    key="step-city"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.18 }}
                  >
                    {/* Back bar */}
                    <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/8">
                      <button
                        onClick={() => setCitySelectStep('service')}
                        className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50 transition-colors hover:text-white"
                      >
                        <ChevronLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Servizi
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25">Stai cercando</span>
                        <span className="flex items-center gap-1.5 border border-[#EB1C26]/30 bg-[#EB1C26]/10 px-2.5 py-1 text-xs font-bold text-[#EB1C26]">
                          {(() => { const Icon = SERVICE_ICONS[activeService.icon] ?? Layers; return <Icon className="size-3" /> })()}
                          {activeService.name}
                        </span>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-[auto_1fr_1fr] gap-0">

                      {/* COL A — Zone tabs (vertical) */}
                      <div className="flex flex-col border-r border-white/8 pr-6 mr-6 min-w-[200px]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
                          Zona
                        </p>
                        {ZONES.map((zone, i) => (
                          <motion.button
                            key={zone.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onMouseEnter={() => { setActiveZone(zone.id); setHoveredCity(zone.cities[0]) }}
                            onClick={() => setActiveZone(zone.id)}
                            className={`group text-left px-4 py-3.5 border-l-2 transition-all duration-200 mb-1 ${
                              activeZone === zone.id
                                ? 'border-[#EB1C26] bg-white/5'
                                : 'border-transparent hover:border-white/20 hover:bg-white/3'
                            }`}
                          >
                            <p className={`text-sm font-bold tracking-wide transition-colors ${activeZone === zone.id ? 'text-white' : 'text-white/55 group-hover:text-white/80'}`}>
                              {zone.label}
                            </p>
                            <p className={`text-[10px] mt-0.5 transition-colors ${activeZone === zone.id ? 'text-white/50' : 'text-white/25'}`}>
                              {zone.subtitle}
                            </p>
                          </motion.button>
                        ))}

                        {/* count badge */}
                        <div className="mt-auto pt-4 border-t border-white/8">
                          <span className="text-[10px] font-bold text-[#EB1C26]">12 comuni</span>
                          <span className="text-[10px] text-white/25 ml-1">in 3 zone</span>
                        </div>
                      </div>

                      {/* COL B — City list for active zone */}
                      <div className="pr-6 mr-6 border-r border-white/8">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeZone}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.18 }}
                          >
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
                              {currentZone.label}
                            </p>
                            <ul className="flex flex-col gap-1.5">
                              {currentZone.cities.map((city, i) => (
                                <motion.li
                                  key={city.slug}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                >
                                  <a
                                    href={`/${activeService.slug}/${city.slug}`}
                                    onClick={() => { setDropdownOpen(false); trackCTAClick(`navbar_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
                                    onMouseEnter={() => setHoveredCity(city)}
                                    className={`group flex items-center justify-between px-4 py-3 border transition-all duration-150 ${
                                      hoveredCity.slug === city.slug
                                        ? 'border-[#EB1C26]/50 bg-[#EB1C26]/8 text-white'
                                        : 'border-white/6 bg-white/2 text-white/65 hover:border-white/15 hover:bg-white/4 hover:text-white'
                                    }`}
                                  >
                                    <div className="flex items-center gap-3">
                                      <span className={`text-[10px] font-black px-1.5 py-0.5 transition-colors ${hoveredCity.slug === city.slug ? 'bg-[#EB1C26] text-white' : 'bg-white/8 text-white/35'}`}>
                                        {city.province}
                                      </span>
                                      <div>
                                        <p className="text-sm font-bold leading-none">{city.name}</p>
                                        <p className="text-[10px] text-white/30 mt-0.5">{city.landmark}</p>
                                      </div>
                                    </div>
                                    <ArrowRight className={`size-3.5 transition-all duration-150 shrink-0 ${hoveredCity.slug === city.slug ? 'text-[#EB1C26] translate-x-0.5' : 'text-white/15'}`} />
                                  </a>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* COL C — City preview card */}
                      <div className="hidden lg:block">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/25 mb-4">
                          Anteprima
                        </p>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeService.slug}-${hoveredCity.slug}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="relative overflow-hidden border border-white/8 h-[200px]"
                          >
                            <img
                              src={
                                activeService.slug === 'rifacimento-tetto'
                                  ? `/images/og/rifacimento-tetto-${hoveredCity.slug}.png`
                                  : SERVICE_THUMBNAILS[activeService.slug] || '/images/service-rifacimento.png'
                              }
                              alt={`${activeService.name} a ${hoveredCity.name}`}
                              className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
                            />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #111 0%, #111 20%, rgba(17,17,17,0.65) 50%, rgba(17,17,17,0.1) 100%)' }} />
                            <div className="absolute left-0 inset-y-0 w-[3px] bg-[#EB1C26]" />
                            <div className="absolute inset-0 flex flex-col justify-between p-5">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
                                  {hoveredCity.province} — {hoveredCity.landmark}
                                </p>
                                <h3 className="mt-1.5 font-display text-2xl text-white leading-none">
                                  {hoveredCity.name.toUpperCase()}
                                </h3>
                              </div>
                              <a
                                href={`/${activeService.slug}/${hoveredCity.slug}`}
                                onClick={() => { setDropdownOpen(false); trackCTAClick(`navbar_city_cta_${hoveredCity.slug}`, `/${activeService.slug}/${hoveredCity.slug}`) }}
                                className="inline-flex items-center gap-2 bg-[#EB1C26] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white self-start hover:bg-[#c8111a] transition-colors"
                              >
                                {activeService.name}
                                <ArrowRight className="size-3.5" />
                              </a>
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[68px] bottom-0 z-40 bg-[#161616] overflow-y-auto px-6 py-6 md:hidden"
          >
            {/* Nav links */}
            <ul className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.li key={link.href} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
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

            {/* Mobile città — step 1: servizio → step 2: zone accordion */}
            <div className="mt-8 border-t border-white/8 pt-8">
              <AnimatePresence mode="wait">
                {citySelectStep === 'service' ? (
                  <motion.div key="mobile-step-service" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Seleziona il Servizio</p>
                      <span className="text-[10px] font-bold bg-[#EB1C26]/15 text-[#EB1C26] px-2 py-0.5">12 comuni</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {SERVICES.map((service, i) => {
                        const Icon = SERVICE_ICONS[service.icon] ?? Layers
                        return (
                          <motion.button
                            key={service.slug}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06 }}
                            onClick={() => selectService(service)}
                            className="group flex items-center justify-between gap-3 border border-white/10 bg-white/3 px-4 py-3.5 text-left active:border-[#EB1C26]/50 active:bg-[#EB1C26]/8"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex size-9 items-center justify-center border border-[#EB1C26]/30 bg-[#EB1C26]/15">
                                <Icon className="size-4 text-[#EB1C26]" />
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{service.name}</p>
                                <p className="text-[10px] text-white/35 mt-0.5">{SERVICE_SHORT_DESC[service.slug]}</p>
                              </div>
                            </div>
                            <ArrowRight className="size-4 text-white/25 transition-colors group-active:text-[#EB1C26] shrink-0" />
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : activeService && (
                  <motion.div key="mobile-step-city" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                    <button
                      onClick={() => setCitySelectStep('service')}
                      className="group mb-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/50 active:text-white"
                    >
                      <ChevronLeft className="size-3.5" />
                      Cambia servizio
                      <span className="text-[#EB1C26]">· {activeService.name}</span>
                    </button>

                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Zone Servite</p>
                      <span className="text-[10px] font-bold bg-[#EB1C26]/15 text-[#EB1C26] px-2 py-0.5">12 comuni</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {ZONES.map((zone, zi) => (
                        <motion.div
                          key={zone.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: zi * 0.08 }}
                        >
                          {/* Zone accordion header */}
                          <button
                            onClick={() => setMobileZoneOpen(mobileZoneOpen === zone.id ? null : zone.id)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 border transition-colors ${
                              mobileZoneOpen === zone.id
                                ? 'border-[#EB1C26]/40 bg-[#EB1C26]/8'
                                : 'border-white/10 bg-white/3'
                            }`}
                          >
                            <div className="text-left">
                              <p className="text-sm font-bold text-white">{zone.label}</p>
                              <p className="text-[10px] text-white/35 mt-0.5">{zone.subtitle}</p>
                            </div>
                            <motion.div animate={{ rotate: mobileZoneOpen === zone.id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown className="size-4 text-white/40 shrink-0" />
                            </motion.div>
                          </button>

                          {/* Zone cities — revealed on open */}
                          <AnimatePresence initial={false}>
                            {mobileZoneOpen === zone.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="flex flex-col gap-1.5 pt-1.5 pl-2">
                                  {zone.cities.map((city, ci) =>
                                    activeService.slug === 'rifacimento-tetto' ? (
                                      <motion.a
                                        key={city.slug}
                                        href={`/${activeService.slug}/${city.slug}`}
                                        onClick={() => { setMobileOpen(false); trackCTAClick(`navbar_mobile_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: ci * 0.05 }}
                                        className="group relative h-[62px] overflow-hidden border border-white/8 active:border-[#EB1C26]/60"
                                      >
                                        <img
                                          src={`/images/og/rifacimento-tetto-${city.slug}.png`}
                                          alt={city.name}
                                          className="absolute inset-0 w-full h-full object-cover object-[center_30%] scale-105 transition-transform duration-500 group-active:scale-100"
                                        />
                                        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #161616 0%, #161616 28%, rgba(22,22,22,0.7) 58%, rgba(22,22,22,0.2) 100%)' }} />
                                        <div className="absolute left-0 inset-y-0 w-[3px] bg-[#EB1C26]" />
                                        <div className="relative flex items-center justify-between h-full px-4">
                                          <div className="flex items-center gap-3">
                                            <span className="text-[10px] font-black bg-[#EB1C26] text-white px-2 py-0.5 shrink-0">
                                              {city.province}
                                            </span>
                                            <div>
                                              <p className="font-display text-base text-white leading-none">{city.name.toUpperCase()}</p>
                                              <p className="text-[10px] text-white/40 mt-0.5">{city.landmark}</p>
                                            </div>
                                          </div>
                                          <ArrowRight className="size-3.5 text-white/25 group-active:text-[#EB1C26] transition-colors shrink-0" />
                                        </div>
                                      </motion.a>
                                    ) : (
                                      <motion.a
                                        key={city.slug}
                                        href={`/${activeService.slug}/${city.slug}`}
                                        onClick={() => { setMobileOpen(false); trackCTAClick(`navbar_mobile_city_${city.slug}`, `/${activeService.slug}/${city.slug}`) }}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: ci * 0.05 }}
                                        className="group relative flex h-[62px] items-center justify-between border border-white/8 bg-white/3 px-4 active:border-[#EB1C26]/60 active:bg-[#EB1C26]/8"
                                      >
                                        <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-black bg-[#EB1C26] text-white px-2 py-0.5 shrink-0">
                                            {city.province}
                                          </span>
                                          <div>
                                            <p className="font-display text-base text-white leading-none">{city.name.toUpperCase()}</p>
                                            <p className="text-[10px] text-white/40 mt-0.5">{city.landmark}</p>
                                          </div>
                                        </div>
                                        <ArrowRight className="size-3.5 text-white/25 group-active:text-[#EB1C26] transition-colors shrink-0" />
                                      </motion.a>
                                    )
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/calcola-preventivo"
                onClick={() => { setMobileOpen(false); trackCTAClick('navbar_mobile', '/calcola-preventivo') }}
                className="flex items-center justify-center gap-2 rounded-sm border border-[#EB1C26]/50 bg-[#EB1C26]/10 py-3 text-center text-sm font-semibold text-white"
              >
                <Gauge className="size-4 text-[#EB1C26]" />
                T94 Roof Index
              </a>
              <a
                href="/contatti"
                onClick={() => { setMobileOpen(false); trackCTAClick('navbar_mobile', '/contatti') }}
                className="block rounded-sm bg-[#EB1C26] py-3 text-center text-sm font-semibold text-white"
              >
                Richiedi Preventivo Gratuito
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
