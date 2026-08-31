// 'use client'

// import { useMemo, useState } from 'react'
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
// import { motion } from 'framer-motion'
// import type { CityRiskPoint } from '@/lib/roof-map-data'

// const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// // Same score → band → hex mapping as lib/roof-calculator.ts (getBandKey),
// // duplicated here as plain thresholds since the map only needs the color,
// // not the full RiskBand copy/labels.
// function scoreToHex(score: number): string {
//   if (score <= 25) return '#10b981' // verde
//   if (score <= 45) return '#facc15' // giallo
//   if (score <= 65) return '#f97316' // arancione
//   if (score <= 85) return '#EB1C26' // rosso
//   return '#7f1d1d' // emergenza
// }

// function scoreToLabel(score: number): string {
//   if (score <= 25) return 'Ottimo'
//   if (score <= 45) return 'Attenzione'
//   if (score <= 65) return 'Necessario'
//   if (score <= 85) return 'Urgente'
//   return 'Emergenza'
// }

// // Italy's bounding box roughly spans lng 6.6–18.5, lat 36.6–47.1. Centering
// // the projection here (rather than react-simple-maps' default globe center)
// // is what makes the whole country fill the SVG viewport.
// const PROJECTION_CONFIG = { center: [12.3, 42.3] as [number, number], scale: 2100 }

// export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
//   const [hovered, setHovered] = useState<CityRiskPoint | null>(null)

//   // Marker radius scales with sample count (sqrt so area, not radius, is
//   // proportional to count — otherwise a città with 10x the reports looks
//   // 10x the *diameter*, wildly overstating it) but stays clamped so one
//   // very-reported city can't visually swallow the map.
//   const maxCount = useMemo(() => Math.max(1, ...cities.map((c) => c.count)), [cities])
//   const radiusFor = (count: number) => {
//     const t = Math.sqrt(count / maxCount)
//     return 4 + t * 10
//   }

//   return (
//     <div className="relative w-full">
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={520}
//         height={620}
//         style={{ width: '100%', height: 'auto' }}
//       >
//         <Geographies geography={ITALY_TOPOJSON}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#F5F5F5"
//                 stroke="#16161622"
//                 strokeWidth={0.75}
//                 style={{
//                   default: { outline: 'none' },
//                   hover: { outline: 'none', fill: '#EFEFEF' },
//                   pressed: { outline: 'none' },
//                 }}
//               />
//             ))
//           }
//         </Geographies>

//         {cities.map((city) => (
//           <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
//             <motion.circle
//               r={radiusFor(city.count)}
//               fill={scoreToHex(city.avgScore)}
//               fillOpacity={0.75}
//               stroke="#FFFFFF"
//               strokeWidth={1.5}
//               initial={{ scale: 0, opacity: 0 }}
//               animate={{ scale: 1, opacity: 0.75 }}
//               transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//               style={{ cursor: 'pointer' }}
//               onMouseEnter={() => setHovered(city)}
//               onMouseLeave={() => setHovered(null)}
//             />
//           </Marker>
//         ))}
//       </ComposableMap>

//       {/* Tooltip — fixed position card rather than following the cursor,
//           matching the brand's sharp-edged, no-radius card language. */}
//       {hovered && (
//         <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 border border-[#161616]/10 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(22,22,22,0.12)] sm:left-4 sm:translate-x-0">
//           <p className="font-display text-lg leading-none text-[#161616]">{hovered.citta}</p>
//           <div className="mt-2 flex items-center gap-2">
//             <span
//               className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
//               style={{ backgroundColor: scoreToHex(hovered.avgScore) }}
//             >
//               {scoreToLabel(hovered.avgScore)}
//             </span>
//             <span className="text-xs text-[#494949]">Score medio {hovered.avgScore}/100</span>
//           </div>
//           <p className="mt-1 text-[11px] text-[#161616]/40">
//             {hovered.count} {hovered.count === 1 ? 'analisi' : 'analisi'} · {Math.round(hovered.highRiskShare * 100)}% a rischio
//           </p>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#161616]/10 pt-5">
//         {[
//           { hex: '#10b981', label: 'Ottimo' },
//           { hex: '#facc15', label: 'Attenzione' },
//           { hex: '#f97316', label: 'Necessario' },
//           { hex: '#EB1C26', label: 'Urgente' },
//           { hex: '#7f1d1d', label: 'Emergenza' },
//         ].map((item) => (
//           <div key={item.label} className="flex items-center gap-2">
//             <span className="size-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
//             <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useMemo, useState } from 'react'
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
// import { motion } from 'framer-motion'
// import type { CityRiskPoint } from '@/lib/roof-map-data'

// const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// // Same score → band → hex mapping as lib/roof-calculator.ts (getBandKey),
// // duplicated here as plain thresholds since the map only needs the color,
// // not the full RiskBand copy/labels.
// function scoreToHex(score: number): string {
//   if (score <= 25) return '#10b981' // verde
//   if (score <= 45) return '#facc15' // giallo
//   if (score <= 65) return '#f97316' // arancione
//   if (score <= 85) return '#EB1C26' // rosso
//   return '#7f1d1d' // emergenza
// }

// function scoreToLabel(score: number): string {
//   if (score <= 25) return 'Ottimo'
//   if (score <= 45) return 'Attenzione'
//   if (score <= 65) return 'Necessario'
//   if (score <= 85) return 'Urgente'
//   return 'Emergenza'
// }

// // Italy's bounding box roughly spans lng 6.6–18.5, lat 36.6–47.1. Centering
// // the projection here (rather than react-simple-maps' default globe center)
// // is what makes the whole country fill the SVG viewport.
// const PROJECTION_CONFIG = { center: [12.3, 42.3] as [number, number], scale: 2100 }

// export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
//   // `hovered` is desktop-only (real mouse), transient. `selected` is set by
//   // tap/click and persists — this is what makes the tooltip work on touch
//   // devices, where "hover" never fires at all. Whichever is set wins, with
//   // a tap/click taking priority so touch users get a stable, dismissable
//   // card rather than something that vanishes the instant their finger lifts.
//   const [hovered, setHovered] = useState<CityRiskPoint | null>(null)
//   const [selected, setSelected] = useState<CityRiskPoint | null>(null)
//   const active = selected ?? hovered

//   // Marker radius scales with sample count (sqrt so area, not radius, is
//   // proportional to count — otherwise a città with 10x the reports looks
//   // 10x the *diameter*, wildly overstating it) but stays clamped so one
//   // very-reported city can't visually swallow the map.
//   const maxCount = useMemo(() => Math.max(1, ...cities.map((c) => c.count)), [cities])
//   const radiusFor = (count: number) => {
//     const t = Math.sqrt(count / maxCount)
//     return 4 + t * 10
//   }
//   // The visible dot can be tiny (as small as ~4px radius for low-count
//   // cities), far below the ~22px radius (44px diameter) touch targets need
//   // per mobile a11y guidelines. Hit area is a separate, invisible circle
//   // sized independently from the visible dot so small markers stay easy to
//   // read but are just as easy to tap as large ones.
//   const hitRadiusFor = (count: number) => Math.max(radiusFor(count), 22)

//   function selectCity(city: CityRiskPoint) {
//     setSelected((prev) => (prev?.citta === city.citta ? null : city))
//   }

//   return (
//     <div className="relative w-full">
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={520}
//         height={620}
//         style={{ width: '100%', height: 'auto' }}
//         // Tapping/clicking empty map area (not a marker) dismisses the
//         // pinned tooltip. Marker clicks stop propagation so they don't
//         // immediately re-trigger this and close what they just opened.
//         onClick={() => setSelected(null)}
//       >
//         <Geographies geography={ITALY_TOPOJSON}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#F5F5F5"
//                 stroke="#16161622"
//                 strokeWidth={0.75}
//                 style={{
//                   default: { outline: 'none' },
//                   hover: { outline: 'none', fill: '#EFEFEF' },
//                   pressed: { outline: 'none' },
//                 }}
//               />
//             ))
//           }
//         </Geographies>

//         {cities.map((city) => {
//           const isActive = active?.citta === city.citta
//           return (
//             <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
//               {/* Invisible, larger hit target — carries all interaction so
//                   the tap area is generous even when the visible dot is small. */}
//               <circle
//                 r={hitRadiusFor(city.count)}
//                 fill="transparent"
//                 style={{ cursor: 'pointer' }}
//                 onMouseEnter={() => setHovered(city)}
//                 onMouseLeave={() => setHovered(null)}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   selectCity(city)
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault()
//                     selectCity(city)
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${city.citta}: score medio ${city.avgScore} su 100, ${scoreToLabel(city.avgScore)}`}
//                 aria-pressed={isActive}
//               />
//               {/* Visible dot — purely decorative, sits on top and never
//                   intercepts pointer events itself. */}
//               <motion.circle
//                 r={radiusFor(city.count)}
//                 fill={scoreToHex(city.avgScore)}
//                 fillOpacity={isActive ? 0.95 : 0.75}
//                 stroke="#FFFFFF"
//                 strokeWidth={isActive ? 2.5 : 1.5}
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: isActive ? 1.15 : 1, opacity: isActive ? 0.95 : 0.75 }}
//                 transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                 pointerEvents="none"
//               />
//             </Marker>
//           )
//         })}
//       </ComposableMap>

//       {/* Tooltip — fixed position card rather than following the cursor,
//           matching the brand's sharp-edged, no-radius card language. Shows
//           on desktop hover and on tap/click (any device); the close button
//           gives touch users an explicit, discoverable way to dismiss it
//           without having to know "tap elsewhere on the map" works too. */}
//       {active && (
//         <div className="absolute left-1/2 top-4 -translate-x-1/2 border border-[#161616]/10 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(22,22,22,0.12)] sm:left-4 sm:translate-x-0">
//           <div className="flex items-start gap-3">
//             <div>
//               <p className="font-display text-lg leading-none text-[#161616]">{active.citta}</p>
//               <div className="mt-2 flex items-center gap-2">
//                 <span
//                   className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
//                   style={{ backgroundColor: scoreToHex(active.avgScore) }}
//                 >
//                   {scoreToLabel(active.avgScore)}
//                 </span>
//                 <span className="text-xs text-[#494949]">Score medio {active.avgScore}/100</span>
//               </div>
//               <p className="mt-1 text-[11px] text-[#161616]/40">
//                 {active.count} {active.count === 1 ? 'analisi' : 'analisi'} · {Math.round(active.highRiskShare * 100)}% a rischio
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() => setSelected(null)}
//               className="shrink-0 text-[#161616]/40 transition hover:text-[#161616]"
//               aria-label="Chiudi dettagli città"
//             >
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//                 <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#161616]/10 pt-5">
//         {[
//           { hex: '#10b981', label: 'Ottimo' },
//           { hex: '#facc15', label: 'Attenzione' },
//           { hex: '#f97316', label: 'Necessario' },
//           { hex: '#EB1C26', label: 'Urgente' },
//           { hex: '#7f1d1d', label: 'Emergenza' },
//         ].map((item) => (
//           <div key={item.label} className="flex items-center gap-2">
//             <span className="size-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
//             <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// 'use client'

// import { useMemo, useState } from 'react'
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
// import { motion } from 'framer-motion'
// import type { CityRiskPoint } from '@/lib/roof-map-data'

// const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// // Same score → band → hex mapping as lib/roof-calculator.ts (getBandKey),
// // duplicated here as plain thresholds since the map only needs the color,
// // not the full RiskBand copy/labels.
// function scoreToHex(score: number): string {
//   if (score <= 25) return '#10b981' // verde
//   if (score <= 45) return '#facc15' // giallo
//   if (score <= 65) return '#f97316' // arancione
//   if (score <= 85) return '#EB1C26' // rosso
//   return '#7f1d1d' // emergenza
// }

// function scoreToLabel(score: number): string {
//   if (score <= 25) return 'Ottimo'
//   if (score <= 45) return 'Attenzione'
//   if (score <= 65) return 'Necessario'
//   if (score <= 85) return 'Urgente'
//   return 'Emergenza'
// }

// // Italy's bounding box roughly spans lng 6.6–18.5, lat 36.6–47.1. Centering
// // the projection here (rather than react-simple-maps' default globe center)
// // is what makes the whole country fill the SVG viewport.
// const PROJECTION_CONFIG = { center: [12.3, 42.3] as [number, number], scale: 2100 }

// export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
//   // `hovered` is desktop-only (real mouse), transient. `selected` is set by
//   // tap/click and persists — this is what makes the tooltip work on touch
//   // devices, where "hover" never fires at all. Whichever is set wins, with
//   // a tap/click taking priority so touch users get a stable, dismissable
//   // card rather than something that vanishes the instant their finger lifts.
//   const [hovered, setHovered] = useState<CityRiskPoint | null>(null)
//   const [selected, setSelected] = useState<CityRiskPoint | null>(null)
//   const active = selected ?? hovered

//   // Marker radius scales with sample count (sqrt so area, not radius, is
//   // proportional to count — otherwise a città with 10x the reports looks
//   // 10x the *diameter*, wildly overstating it) but stays clamped so one
//   // very-reported city can't visually swallow the map.
//   const maxCount = useMemo(() => Math.max(1, ...cities.map((c) => c.count)), [cities])
//   const radiusFor = (count: number) => {
//     const t = Math.sqrt(count / maxCount)
//     return 4 + t * 10
//   }
//   // The visible dot can be tiny (as small as ~4px radius for low-count
//   // cities), far below the ~22px radius (44px diameter) touch targets need
//   // per mobile a11y guidelines. Hit area is a separate, invisible circle
//   // sized independently from the visible dot so small markers stay easy to
//   // read but are just as easy to tap as large ones.
//   const hitRadiusFor = (count: number) => Math.max(radiusFor(count), 22)

//   function selectCity(city: CityRiskPoint) {
//     setSelected((prev) => (prev?.citta === city.citta ? null : city))
//   }

//   return (
//     <div className="relative w-full">
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={520}
//         height={620}
//         style={{ width: '100%', height: 'auto' }}
//         // Tapping/clicking empty map area (not a marker) dismisses the
//         // pinned tooltip. Marker clicks stop propagation so they don't
//         // immediately re-trigger this and close what they just opened.
//         onClick={() => setSelected(null)}
//       >
//         <Geographies geography={ITALY_TOPOJSON}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#F5F5F5"
//                 stroke="#16161622"
//                 strokeWidth={0.75}
//                 style={{
//                   default: { outline: 'none' },
//                   hover: { outline: 'none', fill: '#EFEFEF' },
//                   pressed: { outline: 'none' },
//                 }}
//               />
//             ))
//           }
//         </Geographies>

//         {cities.map((city) => {
//           const isActive = active?.citta === city.citta
//           return (
//             <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
//               {/* Invisible, larger hit target — carries all interaction so
//                   the tap area is generous even when the visible dot is small.
//                   `pointerEvents="all"` is required, not decorative: by
//                   default SVG shapes only hit-test against *painted* fill
//                   ("visiblePainted"), and mobile WebKit in particular treats
//                   fill="transparent" as unpainted — a tap can silently miss
//                   the element entirely even though it renders and looks
//                   tappable. Forcing `all` makes hit-testing independent of
//                   the fill value on every engine. `touchAction: manipulation`
//                   stops the browser from waiting to see if a tap is the start
//                   of a double-tap-to-zoom gesture, which otherwise delays or
//                   swallows the click on touch devices. */}
//               <circle
//                 r={hitRadiusFor(city.count)}
//                 fill="transparent"
//                 pointerEvents="all"
//                 style={{ cursor: 'pointer', touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
//                 onMouseEnter={() => setHovered(city)}
//                 onMouseLeave={() => setHovered(null)}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   selectCity(city)
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault()
//                     selectCity(city)
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${city.citta}: score medio ${city.avgScore} su 100, ${scoreToLabel(city.avgScore)}`}
//                 aria-pressed={isActive}
//               />
//               {/* Visible dot — purely decorative, sits on top and never
//                   intercepts pointer events itself. */}
//               <motion.circle
//                 r={radiusFor(city.count)}
//                 fill={scoreToHex(city.avgScore)}
//                 fillOpacity={isActive ? 0.95 : 0.75}
//                 stroke="#FFFFFF"
//                 strokeWidth={isActive ? 2.5 : 1.5}
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: isActive ? 1.15 : 1, opacity: isActive ? 0.95 : 0.75 }}
//                 transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                 pointerEvents="none"
//               />
//             </Marker>
//           )
//         })}
//       </ComposableMap>

//       {/* Tooltip — fixed position card rather than following the cursor,
//           matching the brand's sharp-edged, no-radius card language. Shows
//           on desktop hover and on tap/click (any device); the close button
//           gives touch users an explicit, discoverable way to dismiss it
//           without having to know "tap elsewhere on the map" works too. */}
//       {active && (
//         <div className="absolute left-1/2 top-4 -translate-x-1/2 border border-[#161616]/10 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(22,22,22,0.12)] sm:left-4 sm:translate-x-0">
//           <div className="flex items-start gap-3">
//             <div>
//               <p className="font-display text-lg leading-none text-[#161616]">{active.citta}</p>
//               <div className="mt-2 flex items-center gap-2">
//                 <span
//                   className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
//                   style={{ backgroundColor: scoreToHex(active.avgScore) }}
//                 >
//                   {scoreToLabel(active.avgScore)}
//                 </span>
//                 <span className="text-xs text-[#494949]">Score medio {active.avgScore}/100</span>
//               </div>
//               <p className="mt-1 text-[11px] text-[#161616]/40">
//                 {active.count} {active.count === 1 ? 'analisi' : 'analisi'} · {Math.round(active.highRiskShare * 100)}% a rischio
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() => setSelected(null)}
//               className="shrink-0 text-[#161616]/40 transition hover:text-[#161616]"
//               aria-label="Chiudi dettagli città"
//             >
//               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//                 <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#161616]/10 pt-5">
//         {[
//           { hex: '#10b981', label: 'Ottimo' },
//           { hex: '#facc15', label: 'Attenzione' },
//           { hex: '#f97316', label: 'Necessario' },
//           { hex: '#EB1C26', label: 'Urgente' },
//           { hex: '#7f1d1d', label: 'Emergenza' },
//         ].map((item) => (
//           <div key={item.label} className="flex items-center gap-2">
//             <span className="size-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
//             <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">{item.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



// 'use client'

// import { useMemo, useState } from 'react'
// import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
// import { motion } from 'framer-motion'
// import type { CityRiskPoint } from '@/lib/roof-map-data'

// const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// // Same score → band → hex mapping as lib/roof-calculator.ts (getBandKey),
// // duplicated here as plain thresholds since the map only needs the color,
// // not the full RiskBand copy/labels.
// function scoreToHex(score: number): string {
//   if (score <= 25) return '#10b981' // verde
//   if (score <= 45) return '#facc15' // giallo
//   if (score <= 65) return '#f97316' // arancione
//   if (score <= 85) return '#EB1C26' // rosso
//   return '#7f1d1d' // emergenza
// }

// function scoreToLabel(score: number): string {
//   if (score <= 25) return 'Ottimo'
//   if (score <= 45) return 'Attenzione'
//   if (score <= 65) return 'Necessario'
//   if (score <= 85) return 'Urgente'
//   return 'Emergenza'
// }

// // Italy's bounding box roughly spans lng 6.6–18.5, lat 36.6–47.1. Centering
// // the projection here (rather than react-simple-maps' default globe center)
// // is what makes the whole country fill the SVG viewport.
// const PROJECTION_CONFIG = {
//   center: [12.3, 42.3] as [number, number],
//   scale: 2100,
// }

// export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
//   // `hovered` is desktop-only (real mouse), transient.
//   // `selected` is set by tap/click and persists.
//   // This makes the tooltip work reliably on touch devices.
//   const [hovered, setHovered] = useState<CityRiskPoint | null>(null)
//   const [selected, setSelected] = useState<CityRiskPoint | null>(null)

//   const active = selected ?? hovered

//   // Marker radius scales with sample count.
//   // sqrt means the AREA, rather than the diameter, grows proportionally
//   // to the number of reports.
//   const maxCount = useMemo(
//     () => Math.max(1, ...cities.map((c) => c.count)),
//     [cities],
//   )

//   const radiusFor = (count: number) => {
//     const t = Math.sqrt(count / maxCount)
//     return 4 + t * 10
//   }

//   // The visible dot can be small, but the invisible hit area stays large
//   // enough for comfortable touch interaction on mobile.
//   const hitRadiusFor = (count: number) =>
//     Math.max(radiusFor(count), 22)

//   function selectCity(city: CityRiskPoint) {
//     setSelected((prev) =>
//       prev?.citta === city.citta ? null : city,
//     )

//     // If a city is selected by touch/click, remove any desktop hover state.
//     setHovered(null)
//   }

//   return (
//     <div className="relative w-full">
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={520}
//         height={620}
//         style={{
//           width: '100%',
//           height: 'auto',
//           touchAction: 'manipulation',
//         }}
//         // Clicking/tapping empty map space dismisses the selected city.
//         // Marker pointer events stop propagation, so selecting a marker
//         // does not immediately trigger this handler.
//         onPointerDown={(e) => {
//           if (e.target === e.currentTarget) {
//             setSelected(null)
//             setHovered(null)
//           }
//         }}
//       >
//         <Geographies geography={ITALY_TOPOJSON}>
//           {({ geographies }) =>
//             geographies.map((geo) => (
//               <Geography
//                 key={geo.rsmKey}
//                 geography={geo}
//                 fill="#F5F5F5"
//                 stroke="#16161622"
//                 strokeWidth={0.75}
//                 style={{
//                   default: {
//                     outline: 'none',
//                   },
//                   hover: {
//                     outline: 'none',
//                     fill: '#EFEFEF',
//                   },
//                   pressed: {
//                     outline: 'none',
//                   },
//                 }}
//               />
//             ))
//           }
//         </Geographies>

//         {cities.map((city) => {
//           const isActive = active?.citta === city.citta
//           const radius = radiusFor(city.count)
//           const hitRadius = hitRadiusFor(city.count)

//           return (
//             <Marker
//               key={city.citta}
//               coordinates={[city.lng, city.lat]}
//             >
//               {/* Invisible hit target.
//                   This is intentionally larger than the visible point
//                   so that small cities remain easy to tap on mobile. */}
//               <circle
//                 r={hitRadius}
//                 fill="transparent"
//                 pointerEvents="all"
//                 style={{
//                   cursor: 'pointer',
//                   touchAction: 'manipulation',
//                   WebkitTapHighlightColor: 'transparent',
//                 }}
//                 // Desktop hover only.
//                 // Touch devices do not use hover state.
//                 onPointerEnter={(e) => {
//                   if (e.pointerType === 'mouse') {
//                     setHovered(city)
//                   }
//                 }}
//                 onPointerLeave={(e) => {
//                   if (e.pointerType === 'mouse') {
//                     setHovered(null)
//                   }
//                 }}
//                 // Important for mobile:
//                 // pointerdown fires immediately on touch and prevents
//                 // the map-level handler from closing the popup.
//                 onPointerDown={(e) => {
//                   e.stopPropagation()

//                   if (e.pointerType === 'touch') {
//                     e.preventDefault()
//                   }

//                   selectCity(city)
//                 }}
//                 // Prevent any synthetic click from bubbling to the map.
//                 onClick={(e) => {
//                   e.stopPropagation()
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     e.preventDefault()
//                     selectCity(city)
//                   }
//                 }}
//                 role="button"
//                 tabIndex={0}
//                 aria-label={`${city.citta}: score medio ${city.avgScore} su 100, ${scoreToLabel(city.avgScore)}`}
//                 aria-pressed={isActive}
//               />

//               {/* Visible dot.
//                   This circle is purely decorative and never intercepts
//                   pointer events. */}
//               <motion.circle
//                 r={radius}
//                 fill={scoreToHex(city.avgScore)}
//                 fillOpacity={isActive ? 0.95 : 0.75}
//                 stroke="#FFFFFF"
//                 strokeWidth={isActive ? 2.5 : 1.5}
//                 initial={{
//                   scale: 0,
//                   opacity: 0,
//                 }}
//                 animate={{
//                   // Keep scale at 1 even when active.
//                   // This prevents the active point from becoming larger.
//                   scale: 1,
//                   opacity: isActive ? 0.95 : 0.75,
//                 }}
//                 transition={{
//                   duration: 0.3,
//                   ease: [0.22, 1, 0.36, 1],
//                 }}
//                 pointerEvents="none"
//               />

//               {/* Active border.
//                   Uses exactly the same radius as the visible point,
//                   so the border stays around the point instead of
//                   becoming a larger circle. */}
//               {isActive && (
//                 <motion.circle
//                   r={radius}
//                   fill="none"
//                   stroke="#161616"
//                   strokeWidth={2}
//                   initial={{
//                     scale: 0.9,
//                     opacity: 0,
//                   }}
//                   animate={{
//                     scale: 1,
//                     opacity: 1,
//                   }}
//                   transition={{
//                     duration: 0.2,
//                     ease: 'easeOut',
//                   }}
//                   pointerEvents="none"
//                 />
//               )}
//             </Marker>
//           )
//         })}
//       </ComposableMap>

//       {/* Tooltip.
//           Fixed position card rather than following the cursor.
//           It stays visible after tapping a point on mobile. */}
//       {active && (
//         <div
//           className="
//             absolute
//             left-1/2
//             top-4
//             z-10
//             -translate-x-1/2
//             border
//             border-[#161616]/10
//             bg-white
//             px-4
//             py-3
//             shadow-[0_8px_24px_rgba(22,22,22,0.12)]
//             sm:left-4
//             sm:translate-x-0
//           "
//         >
//           <div className="flex items-start gap-3">
//             <div>
//               <p className="font-display text-lg leading-none text-[#161616]">
//                 {active.citta}
//               </p>

//               <div className="mt-2 flex items-center gap-2">
//                 <span
//                   className="
//                     inline-block
//                     px-2
//                     py-0.5
//                     text-[10px]
//                     font-bold
//                     uppercase
//                     tracking-widest
//                     text-white
//                   "
//                   style={{
//                     backgroundColor: scoreToHex(active.avgScore),
//                   }}
//                 >
//                   {scoreToLabel(active.avgScore)}
//                 </span>

//                 <span className="text-xs text-[#494949]">
//                   Score medio {active.avgScore}/100
//                 </span>
//               </div>

//               <p className="mt-1 text-[11px] text-[#161616]/40">
//                 {active.count}{' '}
//                 {active.count === 1 ? 'analisi' : 'analisi'} ·{' '}
//                 {Math.round(active.highRiskShare * 100)}% a rischio
//               </p>
//             </div>

//             <button
//               type="button"
//               onPointerDown={(e) => {
//                 e.stopPropagation()
//                 e.preventDefault()

//                 setSelected(null)
//                 setHovered(null)
//               }}
//               onClick={(e) => {
//                 e.stopPropagation()
//               }}
//               className="
//                 shrink-0
//                 text-[#161616]/40
//                 transition
//                 hover:text-[#161616]
//               "
//               aria-label="Chiudi dettagli città"
//             >
//               <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 14 14"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M1 1L13 13M13 1L1 13"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#161616]/10 pt-5">
//         {[
//           {
//             hex: '#10b981',
//             label: 'Ottimo',
//           },
//           {
//             hex: '#facc15',
//             label: 'Attenzione',
//           },
//           {
//             hex: '#f97316',
//             label: 'Necessario',
//           },
//           {
//             hex: '#EB1C26',
//             label: 'Urgente',
//           },
//           {
//             hex: '#7f1d1d',
//             label: 'Emergenza',
//           },
//         ].map((item) => (
//           <div
//             key={item.label}
//             className="flex items-center gap-2"
//           >
//             <span
//               className="size-2.5 rounded-full"
//               style={{
//                 backgroundColor: item.hex,
//               }}
//             />

//             <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">
//               {item.label}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }



'use client'

import { useMemo, useState, useRef } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import type { CityRiskPoint } from '@/lib/roof-map-data'

const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

function scoreToHex(score: number): string {
  if (score <= 25) return '#10b981'
  if (score <= 45) return '#facc15'
  if (score <= 65) return '#f97316'
  if (score <= 85) return '#EB1C26'
  return '#7f1d1d'
}

function scoreToLabel(score: number): string {
  if (score <= 25) return 'Ottimo'
  if (score <= 45) return 'Attenzione'
  if (score <= 65) return 'Necessario'
  if (score <= 85) return 'Urgente'
  return 'Emergenza'
}

const PROJECTION_CONFIG = {
  center: [12.3, 42.3] as [number, number],
  scale: 2100,
}

const MIN_ZOOM = 1
const MAX_ZOOM = 8
const DEFAULT_POSITION = {
  coordinates: [12.3, 42.3] as [number, number],
  zoom: 1,
}

function vibrate(pattern: number | number[]) {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern)
    } catch {
      // disa browser nuk e mbështesin - injorohet
    }
  }
}

export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
  const [hovered, setHovered] = useState<CityRiskPoint | null>(null)
  const [selected, setSelected] = useState<CityRiskPoint | null>(null)
  const [position, setPosition] = useState(DEFAULT_POSITION)
  const lastTapRef = useRef<{ citta: string; time: number } | null>(null)

  const active = selected ?? hovered

  const maxCount = useMemo(
    () => Math.max(1, ...cities.map((c) => c.count)),
    [cities],
  )

  const radiusFor = (count: number) => {
    const t = Math.sqrt(count / maxCount)
    return 4 + t * 10
  }

  const hitRadiusFor = (count: number) => Math.max(radiusFor(count), 22)

  // Markerat mbajnë madhësi pak a shumë konstante pavarësisht zoom-it.
  const zoomCompensation = 1 / Math.sqrt(position.zoom)

  function selectCity(city: CityRiskPoint) {
    const isReselect = selected?.citta === city.citta
    setSelected(isReselect ? null : city)
    setHovered(null)
    vibrate(isReselect ? 6 : 12)
  }

  function focusCity(city: CityRiskPoint) {
    setPosition({
      coordinates: [city.lng, city.lat],
      zoom: Math.min(MAX_ZOOM, 4),
    })
    setSelected(city)
    vibrate([10, 30, 10])
  }

  function handleMarkerTap(city: CityRiskPoint) {
    const now = Date.now()
    const last = lastTapRef.current

    if (last && last.citta === city.citta && now - last.time < 320) {
      focusCity(city)
      lastTapRef.current = null
      return
    }

    lastTapRef.current = { citta: city.citta, time: now }
    selectCity(city)
  }

  function zoomBy(factor: number) {
    setPosition((prev) => ({
      ...prev,
      zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.zoom * factor)),
    }))
    vibrate(8)
  }

  function resetView() {
    setPosition(DEFAULT_POSITION)
    setSelected(null)
    setHovered(null)
    vibrate(8)
  }

  return (
    <div className="relative w-full select-none">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={520}
        height={620}
        style={{ width: '100%', height: 'auto', touchAction: 'none' }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            setSelected(null)
            setHovered(null)
          }
        }}
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={(pos) => setPosition(pos)}
        >
          <Geographies geography={ITALY_TOPOJSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F5F5F5"
                  stroke="#16161622"
                  strokeWidth={0.75 * zoomCompensation}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: '#EFEFEF' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {cities.map((city) => {
            const isActive = active?.citta === city.citta
            const isCritical = city.avgScore > 85
            const radius = radiusFor(city.count) * zoomCompensation
            const hitRadius = hitRadiusFor(city.count) * zoomCompensation

            return (
              <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
                {isCritical && !isActive && (
                  <motion.circle
                    r={radius}
                    fill="none"
                    stroke={scoreToHex(city.avgScore)}
                    strokeWidth={1.5 * zoomCompensation}
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    pointerEvents="none"
                  />
                )}

                <motion.circle
                  r={hitRadius}
                  fill="transparent"
                  pointerEvents="all"
                  whileTap={{ scale: 0.85 }}
                  style={{
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setHovered(city)
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setHovered(null)
                  }}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    if (e.pointerType === 'touch') e.preventDefault()
                    handleMarkerTap(city)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      selectCity(city)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${city.citta}: score medio ${city.avgScore} su 100, ${scoreToLabel(city.avgScore)}. Tocca due volte per ingrandire.`}
                  aria-pressed={isActive}
                />

                <motion.circle
                  r={radius}
                  fill={scoreToHex(city.avgScore)}
                  fillOpacity={isActive ? 0.95 : 0.75}
                  stroke="#FFFFFF"
                  strokeWidth={(isActive ? 2.5 : 1.5) * zoomCompensation}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isActive ? 0.95 : 0.75 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  pointerEvents="none"
                />

                {isActive && (
                  <motion.circle
                    r={radius}
                    fill="none"
                    stroke="#161616"
                    strokeWidth={2 * zoomCompensation}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    pointerEvents="none"
                  />
                )}
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>

      {/* Zoom controls */}
      <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => zoomBy(1.6)}
          className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[#161616] shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
          aria-label="Ingrandisci"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.6)}
          className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[#161616] shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
          aria-label="Riduci"
        >
          −
        </button>
        {position.zoom !== DEFAULT_POSITION.zoom && (
          <button
            type="button"
            onClick={resetView}
            className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[10px] font-bold uppercase text-[#161616]/60 shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
            aria-label="Reimposta vista"
          >
            ⟲
          </button>
        )}
      </div>

      {/* Bottom-sheet tooltip: e tërhiqet, mbyllet me swipe down */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={active.citta}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 60 || info.velocity.y > 500) {
                setSelected(null)
                setHovered(null)
              }
            }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="
              absolute inset-x-0 bottom-0 z-20
              touch-pan-x
              border border-[#161616]/10 bg-white
              px-5 pt-2.5 pb-4
              shadow-[0_-8px_24px_rgba(22,22,22,0.12)]
              sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-72
            "
          >
            <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[#161616]/15 sm:hidden" />

            <div className="flex items-start gap-3">
              <div>
                <p className="font-display text-lg leading-none text-[#161616]">
                  {active.citta}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: scoreToHex(active.avgScore) }}
                  >
                    {scoreToLabel(active.avgScore)}
                  </span>
                  <span className="text-xs text-[#494949]">
                    Score medio {active.avgScore}/100
                  </span>
                </div>

                <p className="mt-1 text-[11px] text-[#161616]/40">
                  {active.count} {active.count === 1 ? 'analisi' : 'analisi'} ·{' '}
                  {Math.round(active.highRiskShare * 100)}% a rischio
                </p>
              </div>

              <div className="ml-auto flex shrink-0 flex-col items-end gap-2">
                <button
                  type="button"
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setSelected(null)
                    setHovered(null)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#161616]/40 transition hover:text-[#161616]"
                  aria-label="Chiudi dettagli città"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    focusCity(active)
                  }}
                  className="text-[10px] font-bold uppercase tracking-wider text-[#161616]/50 underline underline-offset-2 transition hover:text-[#161616]"
                >
                  Ingrandisci
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-[#161616]/10 pt-5">
        {[
          { hex: '#10b981', label: 'Ottimo' },
          { hex: '#facc15', label: 'Attenzione' },
          { hex: '#f97316', label: 'Necessario' },
          { hex: '#EB1C26', label: 'Urgente' },
          { hex: '#7f1d1d', label: 'Emergenza' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
            <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}