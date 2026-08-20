'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function DroneSVG({ tilt }: { tilt: number }) {
  return (
    <svg
      width="110"
      height="74"
      viewBox="0 0 96 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${tilt}deg)`,
        transition: 'transform 0.3s ease',
        filter: 'drop-shadow(0 0 14px rgba(235,28,38,0.6))',
      }}
    >
      <line x1="48" y1="32" x2="12" y2="12" stroke="#EB1C26" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="32" x2="84" y2="12" stroke="#EB1C26" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="32" x2="12" y2="52" stroke="#EB1C26" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="32" x2="84" y2="52" stroke="#EB1C26" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="7" fill="#161616" stroke="#EB1C26" strokeWidth="1.5" />
      <circle cx="84" cy="12" r="7" fill="#161616" stroke="#EB1C26" strokeWidth="1.5" />
      <circle cx="12" cy="52" r="7" fill="#161616" stroke="#EB1C26" strokeWidth="1.5" />
      <circle cx="84" cy="52" r="7" fill="#161616" stroke="#EB1C26" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="11" ry="2.5" fill="white" fillOpacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.18s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="84" cy="12" rx="11" ry="2.5" fill="white" fillOpacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 84 12" to="-360 84 12" dur="0.18s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="12" cy="52" rx="11" ry="2.5" fill="white" fillOpacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 12 52" to="-360 12 52" dur="0.18s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="84" cy="52" rx="11" ry="2.5" fill="white" fillOpacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 84 52" to="360 84 52" dur="0.18s" repeatCount="indefinite" />
      </ellipse>
      <rect x="36" y="24" width="24" height="16" rx="4" fill="#161616" stroke="#EB1C26" strokeWidth="1.5" />
      <circle cx="48" cy="38" r="4" fill="#EB1C26" fillOpacity="0.9" />
      <circle cx="48" cy="38" r="2" fill="#161616" />
      <circle cx="48" cy="28" r="2.2" fill="#EB1C26">
        <animate attributeName="opacity" values="1;0.15;1" dur="0.7s" repeatCount="indefinite" />
      </circle>
      <circle cx="48" cy="32" r="20" stroke="#EB1C26" strokeWidth="0.8" strokeDasharray="3 5" strokeOpacity="0.35">
        <animateTransform attributeName="transform" type="rotate" from="0 48 32" to="360 48 32" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

interface TrailDot {
  x: number
  y: number
  id: number
  createdAt: number
}

export default function DroneFly() {
  const [visible, setVisible] = useState(false)
  const [showTrail, setShowTrail] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState(0)
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [labelText, setLabelText] = useState('In volo verso i contatti...')

  const isRunningRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const trailIdRef = useRef(0)
  const startTimeRef = useRef(0)
  const durationRef = useRef(8000)
  const scrollStartRef = useRef(0)
  const scrollTargetRef = useRef(0)
  const startViewXRef = useRef(0)
  const lastXRef = useRef(0)

  const launch = () => {
    if (isRunningRef.current) return

    const contactEl = document.getElementById('contatti')
    if (!contactEl) return

    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const startViewX = window.innerWidth / 2
    startViewXRef.current = startViewX
    lastXRef.current = startViewX

    const scrollStart = window.scrollY
    const contactTop = contactEl.getBoundingClientRect().top + window.scrollY
    const scrollTarget = Math.max(0, contactTop - window.innerHeight * 0.1)
    const scrollDelta = scrollTarget - scrollStart
    const distance = Math.abs(scrollDelta)
    // Longer duration = slower, smoother feel
    const duration = Math.max(7000, Math.min(11000, distance * 4))

    scrollStartRef.current = scrollStart
    scrollTargetRef.current = scrollTarget
    durationRef.current = duration
    startTimeRef.current = performance.now()

    isRunningRef.current = true
    setVisible(true)
    setShowTrail(true)
    setPos({ x: startViewX, y: window.innerHeight * 0.32 })
    setTilt(0)
    setTrail([])
    setLabelText('In volo verso i contatti...')

    // Disable html scroll-behavior so only RAF controls scrolling
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.overflow = 'hidden'

    // easeInOutSine — gentle start, no aggressive acceleration
    const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current
      const rawT = Math.min(elapsed / durationRef.current, 1)
      const easedT = ease(rawT)

      // Scroll: direct control, no browser interference
      const newScrollY = scrollStartRef.current + (scrollTargetRef.current - scrollStartRef.current) * easedT
      window.scrollTo(0, newScrollY)

      // Drone viewport position
      const viewportY = window.innerHeight * (0.32 + rawT * 0.38)
      const wobbleX = Math.sin(elapsed * 0.004) * 22
      const wobbleY = Math.sin(elapsed * 0.003) * 9
      const droneX = startViewXRef.current + wobbleX
      const droneY = viewportY + wobbleY

      const dx = droneX - lastXRef.current
      lastXRef.current = droneX

      setTilt(Math.max(-20, Math.min(20, dx * 6)))
      setPos({ x: droneX, y: droneY })

      trailIdRef.current++
      const newDot: TrailDot = { x: droneX, y: droneY, id: trailIdRef.current, createdAt: now }
      setTrail(prev => {
        const cutoff = now - 1800
        return [...prev.filter(d => d.createdAt > cutoff).slice(-22), newDot]
      })

      if (rawT >= 0.85) setLabelText('Atterraggio...')
      else if (rawT >= 0.65) setLabelText('Quasi arrivato...')

      if (rawT < 1) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      // Animation complete — restore scroll control
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''

      setLabelText('Atterrato!')

      setTimeout(() => setTrail([]), 200)
      setTimeout(() => setShowTrail(false), 350)
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => { isRunningRef.current = false }, 1200)
      }, 600)
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => {
    ;(window as any).__droneLaunch = launch
    return () => {
      delete (window as any).__droneLaunch
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {showTrail && trail.map((dot, i) => (
          <motion.div
            key={dot.id}
            className="fixed pointer-events-none z-[9998] rounded-full bg-[#EB1C26]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: ((i + 1) / trail.length) * 0.65, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              left: dot.x - 3,
              top: dot.y - 3,
              width: 6,
              height: 6,
            }}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="drone-body"
            className="fixed pointer-events-none z-[9999]"
            style={{ left: pos.x - 55, top: pos.y - 37 }}
            initial={{ opacity: 0, scale: 0.25, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.05, y: 60 }}
            transition={{
              default: { duration: 0.45, ease: 'easeOut' },
              exit: { duration: 1.0, ease: 'easeIn' },
            }}
          >
            <div
              className="absolute rounded-full bg-[#EB1C26] blur-3xl pointer-events-none"
              style={{ width: 110, height: 74, opacity: 0.2, transform: 'scale(2.4)', top: 0, left: 0 }}
            />
            <DroneSVG tilt={tilt} />
            <AnimatePresence mode="wait">
              <motion.div
                key={labelText}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#161616]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#EB1C26] backdrop-blur-sm"
              >
                {labelText}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function triggerDroneFly(e?: React.MouseEvent) {
  e?.preventDefault()
  if (typeof window !== 'undefined' && (window as any).__droneLaunch) {
    ;(window as any).__droneLaunch()
  }
}
