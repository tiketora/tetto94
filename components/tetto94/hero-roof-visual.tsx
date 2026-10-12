// import Image from 'next/image'
// import { Anchor, Check, ShieldCheck } from 'lucide-react'
// import type { CSSProperties } from 'react'
// import HeroRoofStage from './hero-roof-stage'
// import { PHASE_MS } from './hero-roof-timeline'

// const RED = '#E01A22'
// const DARK = '#1B1B1B'
// const STONE = '#B4AC9C'

// const W = 1200
// const H = 896

// const ROOF = '337,204 868,202 1030,476 172,476'
// const SCAN_FROM = 172
// const SCAN_WIDTH = 858

// const LAYERS = [
//   { label: 'Rifacimento tetto', color: RED, delay: 1.1, points: ROOF, fill: 0.2 },
//   { label: 'Impermeabilizzazione', color: DARK, delay: 1.6, points: '352,226 853,224 1004,455 200,455', fill: 0.34 },
//   { label: 'Coibentazione', color: STONE, delay: 2.1, points: '368,248 838,246 980,434 228,434', fill: 0.42 },
// ] as const

// type Marker = {
//   label: string
//   issue: string
//   x: number
//   y: number
//   side: 'above' | 'below' | 'belowEnd' | 'right'
//   delay: number
// }

// // delays follow the scan line crossing each point (scan starts at 1.5s and lasts 2.6s)
// const MARKERS: Marker[] = [
//   { label: 'Grondaia', issue: 'Grondaia ostruita', x: 380, y: 478, side: 'below', delay: 2.1 },
//   { label: 'Tegole', issue: 'Tegole rotte', x: 420, y: 340, side: 'belowEnd', delay: 2.3 },
//   { label: 'Colmo', issue: 'Colmo deteriorato', x: 600, y: 212, side: 'above', delay: 2.8 },
//   { label: 'Camino', issue: 'Infiltrazioni', x: 897, y: 262, side: 'right', delay: 3.7 },
// ]

// const STEPS = [
//   {
//     key: 1,
//     short: 'Drone',
//     hud: 'Scansione in corso',
//     title: 'Ispezione con drone',
//     text: 'Il drone sorvola e scansiona l\u2019intero tetto, senza ponteggi e senza che tu debba salire.',
//   },
//   {
//     key: 2,
//     short: 'Diagnosi',
//     hud: '4 criticità rilevate',
//     title: 'Problemi individuati',
//     text: 'Tegole, colmo, camino e grondaia: ogni criticità viene segnalata e documentata.',
//   },
//   {
//     key: 3,
//     short: 'Lavori',
//     hud: 'Intervento in corso',
//     title: 'Intervento su misura',
//     text: 'Accesso su fune certificato e tre lavorazioni dove servono davvero.',
//   },
//   {
//     key: 4,
//     short: 'Garanzia',
//     hud: 'Tetto sistemato',
//     title: 'Tetto sistemato',
//     text: 'Cantiere pulito e certificato di garanzia firmato, scritto nero su bianco.',
//   },
// ] as const

// const LABEL_POSITION: Record<Marker['side'], string> = {
//   above: 'bottom-full left-1/2 mb-1.5 -translate-x-1/2',
//   below: 'top-full left-1/2 mt-1.5 -translate-x-1/2',
//   belowEnd: 'top-full right-0 mt-1.5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
//   right:
//     'top-full right-0 mt-1.5 sm:left-full sm:right-auto sm:top-1/2 sm:mt-0 sm:ml-2 sm:-translate-y-1/2',
// }

// const LABEL_ALIGN: Record<Marker['side'], string> = {
//   above: 'justify-items-center',
//   below: 'justify-items-center',
//   belowEnd: 'justify-items-end sm:justify-items-center',
//   right: 'justify-items-end sm:justify-items-start',
// }

// /** Sets the visibility flag (--is1..4 / --ge1..4, see globals.css) and the entry stagger of an element. */
// const fx = (flag: string, delay = 0): CSSProperties =>
//   ({ '--f': `var(${flag})`, '--d': `${delay}s` }) as CSSProperties

// const CHIP =
//   'rv-f rv-rise col-start-1 row-start-1 inline-flex items-center rounded-full px-2.5 py-1 font-t94 text-[15px] font-semibold leading-none shadow-md'

// /**
//  * Homepage hero "Living Roof": a self-explaining loop in four steps, played over a drone photo.
//  * 1 drone scan, 2 problems found, 3 rope-access work in three layers, 4 finished roof with warranty.
//  * The SVG shares the photo's 1200x896 coordinate space so the overlay stays aligned at any width.
//  * Everything is driven by one `data-phase` attribute (see hero-roof-stage.tsx) and animates only
//  * opacity/transform, so the loop costs no re-renders and no layout.
//  */
// export default function HeroRoofVisual() {
//   return (
//     <HeroRoofStage>
//       <figcaption className="flex items-center justify-between gap-3 px-4 py-3.5 font-t94 text-[15px] font-semibold text-t94-dark md:px-5">
//         <span className="inline-flex items-center gap-2">
//           <span className="relative flex size-2.5" aria-hidden="true">
//             <span className="absolute inline-flex size-full rounded-full bg-t94-red opacity-60 motion-safe:animate-ping" />
//             <span className="relative inline-flex size-2.5 rounded-full bg-t94-red" />
//           </span>
//           Analisi della copertura
//         </span>
//         <span className="hidden font-medium text-t94-text-secondary sm:inline">Sopralluogo gratuito · Veneto</span>
//       </figcaption>

//       <div className="relative w-full overflow-hidden bg-t94-dark" style={{ aspectRatio: `${W} / ${H}` }}>
//         <Image
//           src="/images/hero-roof-drone.webp"
//           alt="Esempio di ispezione con drone su un tetto in coppi"
//           fill
//           priority
//           quality={80}
//           sizes="(min-width: 1024px) 540px, (min-width: 768px) 700px, 100vw"
//           className="object-cover"
//         />

//         <svg
//           viewBox={`0 0 ${W} ${H}`}
//           preserveAspectRatio="none"
//           aria-hidden="true"
//           className="absolute inset-0 size-full"
//           fill="none"
//           strokeLinejoin="round"
//         >
//           <defs>
//             <clipPath id="rv-roof-clip">
//               <polygon points={ROOF} />
//             </clipPath>
//             <linearGradient id="rv-scan-glow" x1="0" x2="1" y1="0" y2="0">
//               <stop offset="0" stopColor={RED} stopOpacity="0" />
//               <stop offset="1" stopColor={RED} stopOpacity="0.5" />
//             </linearGradient>
//             <pattern id="rv-mesh" width="26" height="26" patternUnits="userSpaceOnUse">
//               <path d="M26 0H0V26" stroke="#fff" strokeOpacity="0.38" strokeWidth="1.4" />
//             </pattern>
//           </defs>

//           {/* focus: everything outside the roof dims while the roof is being analysed */}
//           <path
//             d={`M0 0H${W}V${H}H0Z M${ROOF.split(' ').map((p) => p.replace(',', ' ')).join('L')}Z`}
//             fill="#0d0d0d"
//             fillOpacity="0.38"
//             fillRule="evenodd"
//             className="rv-dim"
//           />

//           {/* step 3: the three interventions stacked inside the roof */}
//           {LAYERS.map((layer) => (
//             <g key={layer.label} className="rv-layer" style={{ '--d': `${layer.delay}s` } as CSSProperties}>
//               <polygon
//                 points={layer.points}
//                 fill={layer.color}
//                 fillOpacity={layer.fill}
//                 stroke="#fff"
//                 strokeOpacity="0.75"
//                 strokeWidth="2.5"
//                 strokeDasharray="10 8"
//               />
//             </g>
//           ))}

//           {/* step 1: analysis grid revealed behind the scan line */}
//           <g clipPath="url(#rv-roof-clip)">
//             <g className="rv-tint">
//               <g className="rv-reveal">
//                 <rect x={SCAN_FROM} y="180" width={SCAN_WIDTH} height="320" fill={RED} fillOpacity="0.16" />
//                 <rect x={SCAN_FROM} y="180" width={SCAN_WIDTH} height="320" fill="url(#rv-mesh)" />
//               </g>
//             </g>
//             <g transform={`translate(${SCAN_FROM} 0)`}>
//               <g className="rv-sweep">
//                 <g className="rv-sweep-fade">
//                   <rect x="-170" y="180" width="170" height="320" fill="url(#rv-scan-glow)" />
//                   <rect x="-2" y="180" width="4" height="320" fill="#fff" />
//                   <rect x="-1" y="180" width="2" height="320" fill={RED} />
//                 </g>
//               </g>
//             </g>
//           </g>

//           {/* step 3: rope access line with a carabiner sliding down to the ridge */}
//           <line
//             x1="600"
//             y1="0"
//             x2="600"
//             y2="200"
//             stroke="#fff"
//             strokeWidth="3"
//             strokeDasharray="8 6"
//             className="rv-f"
//             style={fx('--is3', 0.2)}
//           />
//           <g className="rv-slide">
//             <circle cx="600" cy="0" r="10" fill={RED} stroke="#fff" strokeWidth="3" />
//           </g>

//           {/* roof outline: traced in step 1, stays as the frame of the whole story */}
//           <polygon points={ROOF} stroke={RED} strokeWidth="6" pathLength="1" className="rv-draw" />
//           {/* step 4: the outline turns clean white once the roof is done */}
//           <polygon points={ROOF} stroke="#fff" strokeWidth="5" className="rv-f" style={fx('--is4', 0.3)} />
//         </svg>

//         {/* drone-viewfinder corner marks */}
//         <div aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-4">
//           {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((corner) => (
//             <span
//               key={corner}
//               className={`rv-f absolute size-5 border-white/80 ${corner}`}
//               style={fx('--ge1', 0.2)}
//             />
//           ))}
//         </div>

//         {/* inspection points: white while scanning, red when a problem is found, a check once fixed */}
//         {MARKERS.map((marker, index) => (
//           <div
//             key={marker.label}
//             aria-hidden="true"
//             className="absolute -translate-x-1/2 -translate-y-1/2"
//             style={{ left: `${(marker.x / W) * 100}%`, top: `${(marker.y / H) * 100}%` }}
//           >
//             <span className="relative flex size-3.5 items-center justify-center">
//               <span className="rv-f absolute inline-flex size-full" style={fx('--is2', index * 0.35)}>
//                 <span className="inline-flex size-full rounded-full border-2 border-white motion-safe:animate-ping" />
//               </span>
//               <span
//                 className="rv-f rv-pop absolute inline-flex size-3.5 rounded-full border-[3px] border-t94-red bg-white shadow"
//                 style={fx('--is1', marker.delay)}
//               />
//               <span
//                 className="rv-f rv-pop absolute inline-flex size-3.5 rounded-full border-[3px] border-white bg-t94-red shadow"
//                 style={fx('--is2', index * 0.35)}
//               />
//               <span
//                 className="rv-f rv-pop absolute inline-flex size-5 items-center justify-center rounded-full border-2 border-white bg-t94-dark text-white shadow"
//                 style={fx('--is4', 0.2 + index * 0.2)}
//               >
//                 <Check className="size-3" strokeWidth={3.5} />
//               </span>

//               <span className={`absolute whitespace-nowrap ${LABEL_POSITION[marker.side]}`}>
//                 <span className={`grid ${LABEL_ALIGN[marker.side]}`}>
//                   <span className={`${CHIP} bg-white text-t94-dark`} style={fx('--is1', marker.delay + 0.15)}>
//                     {marker.label}
//                   </span>
//                   <span className={`${CHIP} bg-t94-red text-white`} style={fx('--is2', 0.15 + index * 0.35)}>
//                     {marker.issue}
//                   </span>
//                 </span>
//               </span>
//             </span>
//           </div>
//         ))}

//         {/* step 3: rope access badge */}
//         <div aria-hidden="true" className="absolute left-4 top-4 md:left-5 md:top-5">
//           <span
//             className="rv-f rv-rise inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-t94 text-[15px] font-semibold leading-none text-t94-dark shadow-md"
//             style={fx('--is3', 0.5)}
//           >
//             <Anchor className="size-3.5 text-t94-red" strokeWidth={2.5} />
//             Senza ponteggi
//           </span>
//         </div>

//         {/* step 4: warranty badge centred on the finished roof */}
//         <div
//           aria-hidden="true"
//           className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
//         >
//           <span
//             className="rv-f rv-rise inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 font-t94 text-[15px] font-semibold leading-none text-t94-dark shadow-lg"
//             style={fx('--is4', 0.9)}
//           >
//             <ShieldCheck className="size-4 text-t94-red" strokeWidth={2.5} />
//             Garanzia scritta 10 anni
//           </span>
//         </div>

//         {/* live status of the drone, one line per step */}
//         <div aria-hidden="true" className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
//           <span className="grid">
//             {STEPS.map((step) => (
//               <span
//                 key={step.key}
//                 className="rv-f rv-rise col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 font-t94 text-[15px] font-semibold leading-none text-white backdrop-blur-sm"
//                 style={fx(`--is${step.key}`, 0.15)}
//               >
//                 <span className="size-2 rounded-full bg-t94-red" />
//                 {step.hud}
//               </span>
//             ))}
//           </span>
//         </div>
//       </div>

//       <div className="px-4 pb-4 pt-4 md:px-5 md:pb-5">
//         <div aria-hidden="true" className="grid grid-cols-4 gap-2">
//           {STEPS.map((step) => (
//             <div key={step.key} className="flex flex-col gap-1.5">
//               <span className="block h-1.5 overflow-hidden rounded-full bg-t94-border">
//                 <span
//                   className="rv-bar block size-full rounded-full bg-t94-red"
//                   style={{ ...fx(`--ge${step.key}`), '--pd': `${PHASE_MS[step.key] / 1000}s` } as CSSProperties}
//                 />
//               </span>
//               <span className="font-t94 text-[15px] font-semibold leading-tight text-t94-dark">
//                 <span className="mr-1 hidden text-t94-text-secondary sm:inline">{step.key}</span>
//                 {step.short}
//               </span>
//             </div>
//           ))}
//         </div>

//         <ol className="mt-3 grid list-none p-0">
//           {STEPS.map((step) => (
//             <li
//               key={step.key}
//               className="rv-f rv-rise col-start-1 row-start-1 font-t94"
//               style={fx(`--is${step.key}`, 0.25)}
//             >
//               <p className="m-0 text-base font-semibold text-t94-dark">{step.title}</p>
//               <p className="m-0 mt-1 text-[15px] leading-relaxed text-t94-text-secondary">{step.text}</p>
//               {step.key === 3 && (
//                 <ul className="m-0 mt-2.5 flex list-none flex-wrap gap-2 p-0">
//                   {LAYERS.map((layer) => (
//                     <li
//                       key={layer.label}
//                       className="inline-flex items-center gap-2 rounded-full border border-t94-border bg-white px-3 py-1 text-[15px] font-semibold text-t94-dark"
//                     >
//                       <span className="size-2.5 rounded-full" style={{ backgroundColor: layer.color }} aria-hidden="true" />
//                       {layer.label}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ol>
//       </div>
//     </HeroRoofStage>
//   )
// }


import Image from 'next/image'
import { Anchor, Check, ShieldCheck } from 'lucide-react'
import type { CSSProperties } from 'react'
import HeroRoofStage from './hero-roof-stage'
import { PHASE_MS } from './hero-roof-timeline'

const RED = '#E01A22'
const DARK = '#1B1B1B'
const STONE = '#B4AC9C'

const W = 1200
const H = 896

const ROOF = '337,204 868,202 1030,476 172,476'
const SCAN_FROM = 172
const SCAN_WIDTH = 858

const LAYERS = [
  { label: 'Rifacimento tetto', color: RED, delay: 1.1, points: ROOF, fill: 0.2 },
  { label: 'Impermeabilizzazione', color: DARK, delay: 1.6, points: '352,226 853,224 1004,455 200,455', fill: 0.34 },
  { label: 'Coibentazione', color: STONE, delay: 2.1, points: '368,248 838,246 980,434 228,434', fill: 0.42 },
] as const

type Marker = {
  label: string
  issue: string
  x: number
  y: number
  side: 'above' | 'below' | 'belowEnd' | 'right'
  delay: number
}

// delays follow the scan line crossing each point (scan starts at 1.5s and lasts 2.6s)
const MARKERS: Marker[] = [
  { label: 'Grondaia', issue: 'Grondaia ostruita', x: 380, y: 478, side: 'below', delay: 2.1 },
  { label: 'Tegole', issue: 'Tegole rotte', x: 420, y: 340, side: 'belowEnd', delay: 2.3 },
  { label: 'Colmo', issue: 'Colmo deteriorato', x: 600, y: 212, side: 'above', delay: 2.8 },
  { label: 'Camino', issue: 'Infiltrazioni', x: 897, y: 262, side: 'right', delay: 3.7 },
]

const STEPS = [
  {
    key: 1,
    short: 'Drone',
    hud: 'Scansione in corso',
    title: 'Ispezione con drone',
    text: 'Il drone sorvola e scansiona l\u2019intero tetto, senza ponteggi e senza che tu debba salire.',
  },
  {
    key: 2,
    short: 'Diagnosi',
    hud: '4 criticità rilevate',
    title: 'Problemi individuati',
    text: 'Tegole, colmo, camino e grondaia: ogni criticità viene segnalata e documentata.',
  },
  {
    key: 3,
    short: 'Lavori',
    hud: 'Intervento in corso',
    title: 'Intervento su misura',
    text: 'Accesso su fune certificato e tre lavorazioni dove servono davvero.',
  },
  {
    key: 4,
    short: 'Garanzia',
    hud: 'Tetto sistemato',
    title: 'Tetto sistemato',
    text: 'Cantiere pulito e certificato di garanzia firmato, scritto nero su bianco.',
  },
] as const

const LABEL_POSITION: Record<Marker['side'], string> = {
  above: 'bottom-full left-1/2 mb-1.5 -translate-x-1/2',
  below: 'top-full left-1/2 mt-1.5 -translate-x-1/2',
  belowEnd: 'top-full right-0 mt-1.5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2',
  right:
    'top-full right-0 mt-1.5 sm:left-full sm:right-auto sm:top-1/2 sm:mt-0 sm:ml-2 sm:-translate-y-1/2',
}

const LABEL_ALIGN: Record<Marker['side'], string> = {
  above: 'justify-items-center',
  below: 'justify-items-center',
  belowEnd: 'justify-items-end sm:justify-items-center',
  right: 'justify-items-end sm:justify-items-start',
}

/** Sets the visibility flag (--is1..4 / --ge1..4, see globals.css) and the entry stagger of an element. */
const fx = (flag: string, delay = 0): CSSProperties =>
  ({ '--f': `var(${flag})`, '--d': `${delay}s` }) as CSSProperties

const CHIP =
  'rv-f rv-rise col-start-1 row-start-1 inline-flex items-center rounded-full px-2.5 py-1 font-t94 text-[15px] font-semibold leading-none shadow-md'

/**
 * Homepage hero "Living Roof": a self-explaining loop in four steps, played over a drone photo.
 * 1 drone scan, 2 problems found, 3 rope-access work in three layers, 4 finished roof with warranty.
 * The SVG shares the photo's 1200x896 coordinate space so the overlay stays aligned at any width.
 * Everything is driven by one `data-phase` attribute (see hero-roof-stage.tsx) and animates only
 * opacity/transform, so the loop costs no re-renders and no layout.
 */
export default function HeroRoofVisual({ region = 'Veneto' }: { region?: string }) {
  return (
    <HeroRoofStage>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-2.5 font-t94 text-[15px] font-semibold text-t94-dark md:px-5 md:py-3.5">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-t94-red opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2.5 rounded-full bg-t94-red" />
          </span>
          Analisi della copertura
        </span>
        <span className="hidden font-medium text-t94-text-secondary sm:inline">Sopralluogo gratuito · {region}</span>
      </figcaption>

      <div className="relative w-full overflow-hidden bg-t94-dark" style={{ aspectRatio: `${W} / ${H}` }}>
        <Image
          src="/images/hero-roof-drone.webp"
          alt="Esempio di ispezione con drone su un tetto in coppi"
          fill
          priority
          quality={80}
          sizes="(min-width: 1024px) 540px, (min-width: 768px) 700px, 100vw"
          className="object-cover"
        />

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute inset-0 size-full"
          fill="none"
          strokeLinejoin="round"
        >
          <defs>
            <clipPath id="rv-roof-clip">
              <polygon points={ROOF} />
            </clipPath>
            <linearGradient id="rv-scan-glow" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor={RED} stopOpacity="0" />
              <stop offset="1" stopColor={RED} stopOpacity="0.5" />
            </linearGradient>
            <pattern id="rv-mesh" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" stroke="#fff" strokeOpacity="0.38" strokeWidth="1.4" />
            </pattern>
          </defs>

          {/* focus: everything outside the roof dims while the roof is being analysed */}
          <path
            d={`M0 0H${W}V${H}H0Z M${ROOF.split(' ').map((p) => p.replace(',', ' ')).join('L')}Z`}
            fill="#0d0d0d"
            fillOpacity="0.38"
            fillRule="evenodd"
            className="rv-dim"
          />

          {/* step 3: the three interventions stacked inside the roof */}
          {LAYERS.map((layer) => (
            <g key={layer.label} className="rv-layer" style={{ '--d': `${layer.delay}s` } as CSSProperties}>
              <polygon
                points={layer.points}
                fill={layer.color}
                fillOpacity={layer.fill}
                stroke="#fff"
                strokeOpacity="0.75"
                strokeWidth="2.5"
                strokeDasharray="10 8"
              />
            </g>
          ))}

          {/* step 1: analysis grid revealed behind the scan line */}
          <g clipPath="url(#rv-roof-clip)">
            <g className="rv-tint">
              <g className="rv-reveal">
                <rect x={SCAN_FROM} y="180" width={SCAN_WIDTH} height="320" fill={RED} fillOpacity="0.16" />
                <rect x={SCAN_FROM} y="180" width={SCAN_WIDTH} height="320" fill="url(#rv-mesh)" />
              </g>
            </g>
            <g transform={`translate(${SCAN_FROM} 0)`}>
              <g className="rv-sweep">
                <g className="rv-sweep-fade">
                  <rect x="-170" y="180" width="170" height="320" fill="url(#rv-scan-glow)" />
                  <rect x="-2" y="180" width="4" height="320" fill="#fff" />
                  <rect x="-1" y="180" width="2" height="320" fill={RED} />
                </g>
              </g>
            </g>
          </g>

          {/* step 3: rope access line with a carabiner sliding down to the ridge */}
          <line
            x1="600"
            y1="0"
            x2="600"
            y2="200"
            stroke="#fff"
            strokeWidth="3"
            strokeDasharray="8 6"
            className="rv-f"
            style={fx('--is3', 0.2)}
          />
          <g className="rv-slide">
            <circle cx="600" cy="0" r="10" fill={RED} stroke="#fff" strokeWidth="3" />
          </g>

          {/* roof outline: traced in step 1, stays as the frame of the whole story */}
          <polygon points={ROOF} stroke={RED} strokeWidth="6" pathLength="1" className="rv-draw" />
          {/* step 4: the outline turns clean white once the roof is done */}
          <polygon points={ROOF} stroke="#fff" strokeWidth="5" className="rv-f" style={fx('--is4', 0.3)} />
        </svg>

        {/* drone-viewfinder corner marks */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-3 md:inset-4">
          {['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-0 left-0 border-b-2 border-l-2', 'bottom-0 right-0 border-b-2 border-r-2'].map((corner) => (
            <span
              key={corner}
              className={`rv-f absolute size-5 border-white/80 ${corner}`}
              style={fx('--ge1', 0.2)}
            />
          ))}
        </div>

        {/* inspection points: white while scanning, red when a problem is found, a check once fixed */}
        {MARKERS.map((marker, index) => (
          <div
            key={marker.label}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(marker.x / W) * 100}%`, top: `${(marker.y / H) * 100}%` }}
          >
            <span className="relative flex size-3.5 items-center justify-center">
              <span className="rv-f absolute inline-flex size-full" style={fx('--is2', index * 0.35)}>
                <span className="inline-flex size-full rounded-full border-2 border-white motion-safe:animate-ping" />
              </span>
              <span
                className="rv-f rv-pop absolute inline-flex size-3.5 rounded-full border-[3px] border-t94-red bg-white shadow"
                style={fx('--is1', marker.delay)}
              />
              <span
                className="rv-f rv-pop absolute inline-flex size-3.5 rounded-full border-[3px] border-white bg-t94-red shadow"
                style={fx('--is2', index * 0.35)}
              />
              <span
                className="rv-f rv-pop absolute inline-flex size-5 items-center justify-center rounded-full border-2 border-white bg-t94-dark text-white shadow"
                style={fx('--is4', 0.2 + index * 0.2)}
              >
                <Check className="size-3" strokeWidth={3.5} />
              </span>

              <span className={`absolute whitespace-nowrap ${LABEL_POSITION[marker.side]}`}>
                <span className={`grid ${LABEL_ALIGN[marker.side]}`}>
                  <span className={`${CHIP} bg-white text-t94-dark`} style={fx('--is1', marker.delay + 0.15)}>
                    {marker.label}
                  </span>
                  <span className={`${CHIP} bg-t94-red text-white`} style={fx('--is2', 0.15 + index * 0.35)}>
                    {marker.issue}
                  </span>
                </span>
              </span>
            </span>
          </div>
        ))}

        {/* step 3: rope access badge */}
        <div aria-hidden="true" className="absolute left-4 top-4 md:left-5 md:top-5">
          <span
            className="rv-f rv-rise inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 font-t94 text-[15px] font-semibold leading-none text-t94-dark shadow-md"
            style={fx('--is3', 0.5)}
          >
            <Anchor className="size-3.5 text-t94-red" strokeWidth={2.5} />
            Senza ponteggi
          </span>
        </div>

        {/* step 4: warranty badge centred on the finished roof */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2"
        >
          <span
            className="rv-f rv-rise inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 font-t94 text-[15px] font-semibold leading-none text-t94-dark shadow-lg"
            style={fx('--is4', 0.9)}
          >
            <ShieldCheck className="size-4 text-t94-red" strokeWidth={2.5} />
            Garanzia scritta 10 anni
          </span>
        </div>

        {/* live status of the drone, one line per step */}
        <div aria-hidden="true" className="absolute bottom-4 left-4 md:bottom-5 md:left-5">
          <span className="grid">
            {STEPS.map((step) => (
              <span
                key={step.key}
                className="rv-f rv-rise col-start-1 row-start-1 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 font-t94 text-[15px] font-semibold leading-none text-white backdrop-blur-sm"
                style={fx(`--is${step.key}`, 0.15)}
              >
                <span className="size-2 rounded-full bg-t94-red" />
                {step.hud}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="px-4 pb-3 pt-3 md:px-5 md:pb-5 md:pt-4">
        <div aria-hidden="true" className="grid grid-cols-4 gap-2">
          {STEPS.map((step) => (
            <div key={step.key} className="flex flex-col gap-1.5">
              <span className="block h-1.5 overflow-hidden rounded-full bg-t94-border">
                <span
                  className="rv-bar block size-full rounded-full bg-t94-red"
                  style={{ ...fx(`--ge${step.key}`), '--pd': `${PHASE_MS[step.key] / 1000}s` } as CSSProperties}
                />
              </span>
              <span className="font-t94 text-[15px] font-semibold leading-tight text-t94-dark">
                <span className="mr-1 hidden text-t94-text-secondary sm:inline">{step.key}</span>
                {step.short}
              </span>
            </div>
          ))}
        </div>

        <ol className="mt-2 grid list-none p-0 md:mt-3">
          {STEPS.map((step) => (
            <li
              key={step.key}
              className="rv-f rv-rise col-start-1 row-start-1 font-t94"
              style={fx(`--is${step.key}`, 0.25)}
            >
              <p className="m-0 text-base font-semibold text-t94-dark">{step.title}</p>
              <p className="m-0 mt-0.5 text-[15px] leading-snug text-t94-text-secondary md:mt-1 md:leading-relaxed">
                {step.text}
              </p>
              {step.key === 3 && (
                <ul className="m-0 mt-1.5 flex list-none flex-wrap gap-x-3 gap-y-0 p-0 sm:mt-2.5 sm:gap-2">
                  {LAYERS.map((layer) => (
                    <li
                      key={layer.label}
                      className="inline-flex items-center gap-2 text-[15px] font-semibold text-t94-dark max-sm:leading-snug sm:rounded-full sm:border sm:border-t94-border sm:bg-white sm:px-3 sm:py-1"
                    >
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: layer.color }} aria-hidden="true" />
                      {layer.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </HeroRoofStage>
  )
}
