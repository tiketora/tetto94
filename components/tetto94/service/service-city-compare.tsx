'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronsLeftRight } from 'lucide-react'

/**
 * Before / after comparison. The native range input drives the divider, so it is
 * keyboard-, touch- and screen-reader-accessible without custom pointer handling.
 */
export default function ServiceCityCompare({
  beforeSrc,
  afterSrc,
  cityName,
}: {
  beforeSrc: string
  afterSrc: string
  cityName: string
}) {
  const [position, setPosition] = useState(50)

  return (
    <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[14px] border border-t94-border bg-t94-grey focus-within:ring-2 focus-within:ring-t94-dark/30 md:aspect-[16/9]">
      <Image
        src={afterSrc}
        alt={`Tetto rifatto a ${cityName} — dopo`}
        fill
        loading="lazy"
        sizes="(max-width: 1024px) 100vw, 960px"
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={beforeSrc}
          alt={`Tetto da rifare a ${cityName} — prima`}
          fill
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-cover"
        />
      </div>

      <span className="absolute bottom-3 left-3 rounded-full bg-t94-dark/85 px-3 py-1 font-t94 text-[15px] font-semibold text-white">
        Prima
      </span>
      <span className="absolute bottom-3 right-3 rounded-full bg-t94-red px-3 py-1 font-t94 text-[15px] font-semibold text-white">
        Dopo
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(27,27,27,0.15)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <ChevronsLeftRight className="size-5 text-t94-red" />
        </span>
      </div>

      <input
        type="range"
        min={2}
        max={98}
        step={1}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label={`Confronta prima e dopo il rifacimento a ${cityName}`}
        className="absolute inset-0 size-full cursor-col-resize opacity-0"
      />
    </div>
  )
}
