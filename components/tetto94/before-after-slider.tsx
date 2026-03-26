'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Props {
  beforeSrc: string
  afterSrc: string
  beforeAlt?: string
  afterAlt?: string
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = 'Prima',
  afterAlt = 'Dopo',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50) // percentage
  const [isDragging, setIsDragging] = useState(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      updatePosition(e.clientX)
    },
    [isDragging, updatePosition]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      updatePosition(e.touches[0].clientX)
    },
    [isDragging, updatePosition]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', () => setIsDragging(false))
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', () => setIsDragging(false))
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', () => setIsDragging(false))
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', () => setIsDragging(false))
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <div
      ref={containerRef}
      className="before-after-slider relative w-full aspect-[16/9] rounded-sm overflow-hidden cursor-ew-resize select-none"
      onMouseDown={(e) => {
        setIsDragging(true)
        updatePosition(e.clientX)
      }}
      onTouchStart={(e) => {
        setIsDragging(true)
        updatePosition(e.touches[0].clientX)
      }}
    >
      {/* After (full width, bottom) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 60vw"
        draggable={false}
      />

      {/* Before (clipped left side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)]"
        style={{ left: `${position}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex size-10 items-center justify-center rounded-full bg-white shadow-xl"
        style={{ left: `${position}%` }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="#161616" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 rounded-sm bg-[#161616]/80 backdrop-blur-sm px-3 py-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-white">Prima</span>
      </div>
      <div className="absolute bottom-4 right-4 rounded-sm bg-[#EB1C26]/90 backdrop-blur-sm px-3 py-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-white">Dopo</span>
      </div>
    </div>
  )
}
