'use client'

import * as React from 'react'
import Image from 'next/image'

const CORNERS = [
  'left-3 top-3 border-l-2 border-t-2',
  'right-3 top-3 border-r-2 border-t-2',
  'bottom-3 left-3 border-b-2 border-l-2',
  'bottom-3 right-3 border-b-2 border-r-2',
]

export function LPScaffoldingVisual() {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const tiltRef = React.useRef<HTMLDivElement>(null)
  const frame = React.useRef(0)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const canTilt = () =>
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt()) return
    const { clientX, clientY, currentTarget } = event
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width - 0.5
      const y = (clientY - rect.top) / rect.height - 0.5
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`
      }
    })
  }

  const handleLeave = () => {
    cancelAnimationFrame(frame.current)
    if (tiltRef.current) tiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div
      ref={rootRef}
      data-in-view={inView}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="lp-visual mx-auto w-full max-w-[520px] [perspective:1100px]"
    >
      <div
        ref={tiltRef}
        className="relative aspect-square w-full overflow-hidden rounded-[14px] border border-t94-border bg-t94-dark shadow-[0_30px_70px_-30px_rgba(27,27,27,0.55)] transition-transform duration-300 ease-out will-change-transform"
      >
        <Image
          src="/images/scaffolding.jpg"
          alt="Ponteggio complesso e costoso: Tetto94 lavora senza ponteggi"
          fill
          sizes="(max-width: 1024px) 90vw, 520px"
          className="object-cover grayscale contrast-[1.1] brightness-[0.72]"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(27,27,27,0.7)_100%)]"
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4" aria-hidden="true">
          <div className="lp-scan size-full bg-gradient-to-b from-transparent via-t94-red/15 to-t94-red/45">
            <div className="absolute inset-x-0 bottom-0 h-px bg-t94-red shadow-[0_0_14px_2px_rgba(224,26,34,0.8)]" />
          </div>
        </div>

        <svg viewBox="0 0 200 200" fill="none" className="absolute inset-0 size-full" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="#E01A22"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="515"
            className="scaffold-circle"
            style={{ filter: 'drop-shadow(0 0 6px rgba(224,26,34,0.55))' }}
          />
          <line
            x1="35"
            y1="35"
            x2="165"
            y2="165"
            stroke="#E01A22"
            strokeWidth="8"
            strokeLinecap="round"
            className="lp-x-line lp-x-line-1"
          />
          <line
            x1="165"
            y1="35"
            x2="35"
            y2="165"
            stroke="#E01A22"
            strokeWidth="8"
            strokeLinecap="round"
            className="lp-x-line lp-x-line-2"
          />
        </svg>

        {CORNERS.map((corner) => (
          <span
            key={corner}
            className={`pointer-events-none absolute size-5 border-white/70 ${corner}`}
            aria-hidden="true"
          />
        ))}

        <div className="absolute inset-x-4 bottom-4 flex">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-t94-dark/75 px-4 py-2 font-t94 text-[15px] font-semibold text-white backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-t94-red" aria-hidden="true" />
            Nessun ponteggio necessario
          </span>
        </div>
      </div>
    </div>
  )
}
