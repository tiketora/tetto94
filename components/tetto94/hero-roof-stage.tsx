'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { PHASE_MS, RESET_MS, START_DELAY_MS } from './hero-roof-timeline'

const SEQUENCE = [
  { phase: '1', ms: PHASE_MS[1] },
  { phase: '2', ms: PHASE_MS[2] },
  { phase: '3', ms: PHASE_MS[3] },
  { phase: '4', ms: PHASE_MS[4] },
  { phase: '0', ms: RESET_MS },
] as const

/**
 * Drives the looping story by writing a single `data-phase` attribute on the figure.
 * All visuals react to that attribute through CSS, so React never re-renders while it plays.
 * The loop pauses while the hero is off-screen or the tab is hidden, and never starts
 * under prefers-reduced-motion (CSS then shows the finished state).
 */
export default function HeroRoofStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let index = 0
    let timer: number | undefined
    let inView = true

    const step = () => {
      const { phase, ms } = SEQUENCE[index]
      el.dataset.phase = phase
      index = (index + 1) % SEQUENCE.length
      timer = window.setTimeout(step, ms)
    }

    const stop = () => {
      window.clearTimeout(timer)
      timer = undefined
    }

    const sync = () => {
      const shouldRun = inView && !document.hidden
      if (shouldRun && timer === undefined) timer = window.setTimeout(step, START_DELAY_MS)
      if (!shouldRun) stop()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        sync()
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    document.addEventListener('visibilitychange', sync)
    sync()

    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [])

  return (
    <figure
      ref={ref}
      data-phase="0"
      className="rv-stage m-0 overflow-hidden rounded-t94 border border-t94-border bg-t94-grey"
    >
      {children}
    </figure>
  )
}
