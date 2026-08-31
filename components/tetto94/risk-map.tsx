'use client'

import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { motion } from 'framer-motion'
import type { CityRiskPoint } from '@/lib/roof-map-data'

const ITALY_TOPOJSON = '/data/italy-regions.topo.json'

// Same score → band → hex mapping as lib/roof-calculator.ts (getBandKey),
// duplicated here as plain thresholds since the map only needs the color,
// not the full RiskBand copy/labels.
function scoreToHex(score: number): string {
  if (score <= 25) return '#10b981' // verde
  if (score <= 45) return '#facc15' // giallo
  if (score <= 65) return '#f97316' // arancione
  if (score <= 85) return '#EB1C26' // rosso
  return '#7f1d1d' // emergenza
}

function scoreToLabel(score: number): string {
  if (score <= 25) return 'Ottimo'
  if (score <= 45) return 'Attenzione'
  if (score <= 65) return 'Necessario'
  if (score <= 85) return 'Urgente'
  return 'Emergenza'
}

// Italy's bounding box roughly spans lng 6.6–18.5, lat 36.6–47.1. Centering
// the projection here (rather than react-simple-maps' default globe center)
// is what makes the whole country fill the SVG viewport.
const PROJECTION_CONFIG = { center: [12.3, 42.3] as [number, number], scale: 2100 }

export default function RiskMap({ cities }: { cities: CityRiskPoint[] }) {
  const [hovered, setHovered] = useState<CityRiskPoint | null>(null)

  // Marker radius scales with sample count (sqrt so area, not radius, is
  // proportional to count — otherwise a città with 10x the reports looks
  // 10x the *diameter*, wildly overstating it) but stays clamped so one
  // very-reported city can't visually swallow the map.
  const maxCount = useMemo(() => Math.max(1, ...cities.map((c) => c.count)), [cities])
  const radiusFor = (count: number) => {
    const t = Math.sqrt(count / maxCount)
    return 4 + t * 10
  }

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={PROJECTION_CONFIG}
        width={520}
        height={620}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={ITALY_TOPOJSON}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#F5F5F5"
                stroke="#16161622"
                strokeWidth={0.75}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', fill: '#EFEFEF' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {cities.map((city) => (
          <Marker key={city.citta} coordinates={[city.lng, city.lat]}>
            <motion.circle
              r={radiusFor(city.count)}
              fill={scoreToHex(city.avgScore)}
              fillOpacity={0.75}
              stroke="#FFFFFF"
              strokeWidth={1.5}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.75 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered(city)}
              onMouseLeave={() => setHovered(null)}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip — fixed position card rather than following the cursor,
          matching the brand's sharp-edged, no-radius card language. */}
      {hovered && (
        <div className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 border border-[#161616]/10 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(22,22,22,0.12)] sm:left-4 sm:translate-x-0">
          <p className="font-display text-lg leading-none text-[#161616]">{hovered.citta}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: scoreToHex(hovered.avgScore) }}
            >
              {scoreToLabel(hovered.avgScore)}
            </span>
            <span className="text-xs text-[#494949]">Score medio {hovered.avgScore}/100</span>
          </div>
          <p className="mt-1 text-[11px] text-[#161616]/40">
            {hovered.count} {hovered.count === 1 ? 'analisi' : 'analisi'} · {Math.round(hovered.highRiskShare * 100)}% a rischio
          </p>
        </div>
      )}

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
            <span className="text-[11px] uppercase tracking-wider text-[#161616]/50">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
