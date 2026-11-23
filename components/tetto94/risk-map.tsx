// 'use client'

// import { useMemo, useState, useRef } from 'react'
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
//   ZoomableGroup,
// } from 'react-simple-maps'
// import { motion, AnimatePresence } from 'framer-motion'
// import type { CityRiskPoint } from '@/lib/roof-map-data'

// const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// function scoreToHex(score: number): string {
//   if (score <= 25) return '#10b981'
//   if (score <= 45) return '#facc15'
//   if (score <= 65) return '#f97316'
//   if (score <= 85) return '#EB1C26'
//   return '#7f1d1d'
// }

// function scoreToLabel(score: number): string {
//   if (score <= 25) return 'Ottimo'
//   if (score <= 45) return 'Attenzione'
//   if (score <= 65) return 'Necessario'
//   if (score <= 85) return 'Urgente'
//   return 'Emergenza'
// }

// const PROJECTION_CONFIG = {
//   center: [12.3, 42.3] as [number, number],
//   scale: 2100,
// }

// const MIN_ZOOM = 1
// const MAX_ZOOM = 8
// const DEFAULT_POSITION = {
//   coordinates: [12.3, 42.3] as [number, number],
//   zoom: 1,
// }

// function vibrate(pattern: number | number[]) {
//   if (typeof window !== 'undefined' && 'vibrate' in navigator) {
//     try {
//       navigator.vibrate(pattern)
//     } catch {
//       // disa browser nuk e mbështesin - injorohet
//     }
//   }
// }

// export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
//   const [hovered, setHovered] = useState<CityRiskPoint | null>(null)
//   const [selected, setSelected] = useState<CityRiskPoint | null>(null)
//   const [position, setPosition] = useState(DEFAULT_POSITION)
//   const lastTapRef = useRef<{ citta: string; time: number } | null>(null)

//   const active = selected ?? hovered

//   const maxCount = useMemo(
//     () => Math.max(1, ...cities.map((c) => c.count)),
//     [cities],
//   )

//   const radiusFor = (count: number) => {
//     const t = Math.sqrt(count / maxCount)
//     return 4 + t * 10
//   }

//   const hitRadiusFor = (count: number) => Math.max(radiusFor(count), 22)

//   // Markerat mbajnë madhësi pak a shumë konstante pavarësisht zoom-it.
//   const zoomCompensation = 1 / Math.sqrt(position.zoom)

//   function selectCity(city: CityRiskPoint) {
//     const isReselect = selected?.citta === city.citta
//     setSelected(isReselect ? null : city)
//     setHovered(null)
//     vibrate(isReselect ? 6 : 12)
//   }

//   function focusCity(city: CityRiskPoint) {
//     setPosition({
//       coordinates: [city.lng, city.lat],
//       zoom: Math.min(MAX_ZOOM, 4),
//     })
//     setSelected(city)
//     vibrate([10, 30, 10])
//   }

//   function handleMarkerTap(city: CityRiskPoint) {
//     const now = Date.now()
//     const last = lastTapRef.current

//     if (last && last.citta === city.citta && now - last.time < 320) {
//       focusCity(city)
//       lastTapRef.current = null
//       return
//     }

//     lastTapRef.current = { citta: city.citta, time: now }
//     selectCity(city)
//   }

//   function zoomBy(factor: number) {
//     setPosition((prev) => ({
//       ...prev,
//       zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.zoom * factor)),
//     }))
//     vibrate(8)
//   }

//   function resetView() {
//     setPosition(DEFAULT_POSITION)
//     setSelected(null)
//     setHovered(null)
//     vibrate(8)
//   }

//   return (
//     <div className="relative w-full select-none">
//       <ComposableMap
//         projection="geoMercator"
//         projectionConfig={PROJECTION_CONFIG}
//         width={520}
//         height={620}
//         style={{ width: '100%', height: 'auto', touchAction: 'none' }}
//         onPointerDown={(e) => {
//           if (e.target === e.currentTarget) {
//             setSelected(null)
//             setHovered(null)
//           }
//         }}
//       >
//         <ZoomableGroup
//           center={position.coordinates}
//           zoom={position.zoom}
//           minZoom={MIN_ZOOM}
//           maxZoom={MAX_ZOOM}
//           onMoveEnd={(pos) => setPosition(pos)}
//         >
//           <Geographies geography={ITALY_TOPOJSON}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   fill="#F5F5F5"
//                   stroke="#16161622"
//                   strokeWidth={0.75 * zoomCompensation}
//                   style={{
//                     default: { outline: 'none' },
//                     hover: { outline: 'none', fill: '#EFEFEF' },
//                     pressed: { outline: 'none' },
//                   }}
//                 />
//               ))
//             }
//           </Geographies>

//           {cities.map((city) => {
//             const isActive = active?.citta === city.citta
//             const isCritical = city.avgScore > 85
//             const radius = radiusFor(city.count) * zoomCompensation
//             const hitRadius = hitRadiusFor(city.count) * zoomCompensation

//             return (
//               <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
//                 {isCritical && !isActive && (
//                   <motion.circle
//                     r={radius}
//                     fill="none"
//                     stroke={scoreToHex(city.avgScore)}
//                     strokeWidth={1.5 * zoomCompensation}
//                     initial={{ scale: 1, opacity: 0.6 }}
//                     animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
//                     transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
//                     pointerEvents="none"
//                   />
//                 )}

//                 <motion.circle
//                   r={hitRadius}
//                   fill="transparent"
//                   pointerEvents="all"
//                   whileTap={{ scale: 0.85 }}
//                   style={{
//                     cursor: 'pointer',
//                     touchAction: 'manipulation',
//                     WebkitTapHighlightColor: 'transparent',
//                   }}
//                   onPointerEnter={(e) => {
//                     if (e.pointerType === 'mouse') setHovered(city)
//                   }}
//                   onPointerLeave={(e) => {
//                     if (e.pointerType === 'mouse') setHovered(null)
//                   }}
//                   onPointerDown={(e) => {
//                     e.stopPropagation()
//                     if (e.pointerType === 'touch') e.preventDefault()
//                     handleMarkerTap(city)
//                   }}
//                   onClick={(e) => e.stopPropagation()}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                       e.preventDefault()
//                       selectCity(city)
//                     }
//                   }}
//                   role="button"
//                   tabIndex={0}
//                   aria-label={`${city.citta}: score medio ${city.avgScore} su 100, ${scoreToLabel(city.avgScore)}. Tocca due volte per ingrandire.`}
//                   aria-pressed={isActive}
//                 />

//                 <motion.circle
//                   r={radius}
//                   fill={scoreToHex(city.avgScore)}
//                   fillOpacity={isActive ? 0.95 : 0.75}
//                   stroke="#FFFFFF"
//                   strokeWidth={(isActive ? 2.5 : 1.5) * zoomCompensation}
//                   initial={{ scale: 0, opacity: 0 }}
//                   animate={{ scale: 1, opacity: isActive ? 0.95 : 0.75 }}
//                   transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                   pointerEvents="none"
//                 />

//                 {isActive && (
//                   <motion.circle
//                     r={radius}
//                     fill="none"
//                     stroke="#161616"
//                     strokeWidth={2 * zoomCompensation}
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 0.2, ease: 'easeOut' }}
//                     pointerEvents="none"
//                   />
//                 )}
//               </Marker>
//             )
//           })}
//         </ZoomableGroup>
//       </ComposableMap>

//       {/* Zoom controls */}
//       <div className="absolute right-3 bottom-3 z-10 flex flex-col gap-1.5">
//         <button
//           type="button"
//           onClick={() => zoomBy(1.6)}
//           className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[#161616] shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
//           aria-label="Ingrandisci"
//         >
//           +
//         </button>
//         <button
//           type="button"
//           onClick={() => zoomBy(1 / 1.6)}
//           className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[#161616] shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
//           aria-label="Riduci"
//         >
//           −
//         </button>
//         {position.zoom !== DEFAULT_POSITION.zoom && (
//           <button
//             type="button"
//             onClick={resetView}
//             className="flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[10px] font-bold uppercase text-[#161616]/60 shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90"
//             aria-label="Reimposta vista"
//           >
//             ⟲
//           </button>
//         )}
//       </div>

//       {/* Bottom-sheet tooltip: e tërhiqet, mbyllet me swipe down */}
//       <AnimatePresence>
//         {active && (
//           <motion.div
//             key={active.citta}
//             drag="y"
//             dragDirectionLock
//             dragConstraints={{ top: 0, bottom: 0 }}
//             dragElastic={{ top: 0, bottom: 0.5 }}
//             onDragEnd={(_, info) => {
//               if (info.offset.y > 60 || info.velocity.y > 500) {
//                 setSelected(null)
//                 setHovered(null)
//               }
//             }}
//             initial={{ y: 80, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             exit={{ y: 80, opacity: 0 }}
//             transition={{ type: 'spring', stiffness: 420, damping: 38 }}
//             className="
//               absolute inset-x-0 bottom-0 z-20
//               touch-pan-x
//               border border-[#161616]/10 bg-white
//               px-5 pt-2.5 pb-4
//               shadow-[0_-8px_24px_rgba(22,22,22,0.12)]
//               sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-72
//             "
//           >
//             <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-[#161616]/15 sm:hidden" />

//             <div className="flex items-start gap-3">
//               <div>
//                 <p className="font-display text-lg leading-none text-[#161616]">
//                   {active.citta}
//                 </p>

//                 <div className="mt-2 flex items-center gap-2">
//                   <span
//                     className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
//                     style={{ backgroundColor: scoreToHex(active.avgScore) }}
//                   >
//                     {scoreToLabel(active.avgScore)}
//                   </span>
//                   <span className="text-xs text-[#494949]">
//                     Score medio {active.avgScore}/100
//                   </span>
//                 </div>

//                 <p className="mt-1 text-[11px] text-[#161616]/40">
//                   {active.count} {active.count === 1 ? 'analisi' : 'analisi'} ·{' '}
//                   {Math.round(active.highRiskShare * 100)}% a rischio
//                 </p>
//               </div>

//               <div className="ml-auto flex shrink-0 flex-col items-end gap-2">
//                 <button
//                   type="button"
//                   onPointerDown={(e) => {
//                     e.stopPropagation()
//                     e.preventDefault()
//                     setSelected(null)
//                     setHovered(null)
//                   }}
//                   onClick={(e) => e.stopPropagation()}
//                   className="text-[#161616]/40 transition hover:text-[#161616]"
//                   aria-label="Chiudi dettagli città"
//                 >
//                   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
//                     <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
//                   </svg>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation()
//                     focusCity(active)
//                   }}
//                   className="text-[10px] font-bold uppercase tracking-wider text-[#161616]/50 underline underline-offset-2 transition hover:text-[#161616]"
//                 >
//                   Ingrandisci
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

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

export default function RiskMap({
  cities,
  theme = 'light',
}: {
  cities: CityRiskPoint[]
  theme?: 'light' | 'dark'
}) {
  const dark = theme === 'dark'
  const controlButton = dark
    ? 'flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white backdrop-blur-md transition hover:bg-white/15 active:scale-90'
    : 'flex size-9 items-center justify-center border border-[#161616]/10 bg-white text-[#161616] shadow-[0_4px_12px_rgba(22,22,22,0.1)] transition active:scale-90'
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
    <div
      className="relative w-full select-none"
      role="group"
      aria-label="Mappa interattiva del rischio dei tetti in Italia, per città"
    >
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
                  fill={dark ? '#15171B' : '#F5F5F5'}
                  stroke={dark ? 'rgba(255,255,255,0.14)' : '#16161622'}
                  strokeWidth={0.75 * zoomCompensation}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none', fill: dark ? '#1D2026' : '#EFEFEF' },
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
                  stroke={dark ? '#0B0B0D' : '#FFFFFF'}
                  strokeWidth={(isActive ? 2.5 : 1.5) * zoomCompensation}
                  style={dark ? { filter: `drop-shadow(0 0 ${isActive ? 10 : 6}px ${scoreToHex(city.avgScore)})` } : undefined}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: isActive ? 0.95 : 0.75 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  pointerEvents="none"
                />

                {isActive && (
                  <motion.circle
                    r={radius}
                    fill="none"
                    stroke={dark ? '#FFFFFF' : '#161616'}
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
          className={controlButton}
          aria-label="Ingrandisci"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => zoomBy(1 / 1.6)}
          className={controlButton}
          aria-label="Riduci"
        >
          −
        </button>
        {position.zoom !== DEFAULT_POSITION.zoom && (
          <button
            type="button"
            onClick={resetView}
            className={`${controlButton} text-[11px] font-bold uppercase`}
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
            className={`
              absolute inset-x-0 bottom-0 z-20
              touch-pan-x
              px-5 pt-2.5 pb-4
              sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-72
              ${
                dark
                  ? 'rounded-t-2xl border border-white/15 bg-[#101114]/90 text-white shadow-[0_-8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:rounded-2xl'
                  : 'border border-[#161616]/10 bg-white shadow-[0_-8px_24px_rgba(22,22,22,0.12)]'
              }
            `}
          >
            <div className={`mx-auto mb-2 h-1 w-8 rounded-full sm:hidden ${dark ? 'bg-white/25' : 'bg-[#161616]/15'}`} />

            <div className="flex items-start gap-3">
              <div>
                <p className={`font-display text-lg leading-none ${dark ? 'text-white' : 'text-[#161616]'}`}>
                  {active.citta}
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <span
                    className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: scoreToHex(active.avgScore) }}
                  >
                    {scoreToLabel(active.avgScore)}
                  </span>
                  <span className={`text-xs ${dark ? 'text-white/70' : 'text-[#494949]'}`}>
                    Score medio {active.avgScore}/100
                  </span>
                </div>

                <p className={`mt-1 text-[11px] ${dark ? 'text-white/50' : 'text-[#161616]/40'}`}>
                  {active.count} analisi · {Math.round(active.highRiskShare * 100)}% a rischio
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
                  className={`transition ${dark ? 'text-white/50 hover:text-white' : 'text-[#161616]/40 hover:text-[#161616]'}`}
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
                  className={`text-[10px] font-bold uppercase tracking-wider underline underline-offset-2 transition ${dark ? 'text-white/60 hover:text-white' : 'text-[#161616]/50 hover:text-[#161616]'}`}
                >
                  Ingrandisci
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div
        className={`mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t pt-5 ${dark ? 'border-white/10' : 'border-[#161616]/10'}`}
      >
        {[
          { hex: '#10b981', label: 'Ottimo' },
          { hex: '#facc15', label: 'Attenzione' },
          { hex: '#f97316', label: 'Necessario' },
          { hex: '#EB1C26', label: 'Urgente' },
          { hex: '#7f1d1d', label: 'Emergenza' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ backgroundColor: item.hex }} />
            <span className={`text-[11px] uppercase tracking-wider ${dark ? 'text-white/60' : 'text-[#161616]/50'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
