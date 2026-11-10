'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useSWR from 'swr'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { trackRecentActivity } from '@/lib/gtag'
import type { RecentActivity } from '@/lib/contacts/social-proof'

const DISMISSED_KEY = 'tetto94_activity_dismissed'
const SEEN_KEY = 'tetto94_activity_seen'
const EXCLUDED_PREFIXES = ['/admin', '/login', '/privacy', '/contatti', '/calcola-preventivo']

const START_DELAY_MS = 8_000
const INTERVAL_MS = 40_000
const VISIBLE_MS = 7_000
const MAX_PER_SESSION = 4
// Offers appear about three times as often as analyses.
const ROTATION: Array<'offer' | 'analysis'> = ['offer', 'offer', 'analysis']

interface Notice {
  key: string
  type: 'offer' | 'analysis'
  title: string
  when: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => (r.ok ? (r.json() as Promise<RecentActivity>) : null))
const romeDay = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome' })

function dayDiff(day: string): number {
  const today = romeDay.format(new Date())
  return Math.round((Date.parse(today) - Date.parse(day)) / 86_400_000)
}

function offerWhen(day: string): string | null {
  const diff = dayDiff(day)
  if (diff <= 0) return 'oggi'
  if (diff === 1) return 'ieri'
  if (diff <= 7) return 'questa settimana'
  if (diff <= 30) return 'nelle ultime settimane'
  return null
}

function analysisWhen(ts: string): string | null {
  const minutes = (Date.now() - Date.parse(ts)) / 60_000
  if (minutes < 60) return 'poco fa'
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} ${hours === 1 ? 'ora' : 'ore'} fa`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'ieri'
  if (days < 7) return `${days} giorni fa`
  if (days < 30) {
    const weeks = Math.floor(days / 7)
    return `${weeks} ${weeks === 1 ? 'settimana' : 'settimane'} fa`
  }
  return null
}

function readSeen(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]') as string[]
  } catch {
    return []
  }
}

function pickNotice(data: RecentActivity, seen: string[]): Notice | null {
  const offers: Notice[] = data.offers.map((o) => ({
    key: `o-${o.city}-${o.day}`,
    type: 'offer',
    title: `Richiesta di sopralluogo da ${o.city}`,
    when: offerWhen(o.day),
  }))
  const analyses: Notice[] = data.analyses.map((a) => ({
    key: `a-${a.city}-${a.ts}`,
    type: 'analysis',
    title: `Analisi del tetto completata a ${a.city}`,
    when: analysisWhen(a.ts),
  }))
  const fresh = (list: Notice[]) => list.filter((n) => !seen.includes(n.key))

  const wanted = ROTATION[seen.length % ROTATION.length]
  const primary = wanted === 'offer' ? fresh(offers) : fresh(analyses)
  const fallback = wanted === 'offer' ? fresh(analyses) : fresh(offers)
  const pool = primary.length ? primary : fallback
  return pool[0] ?? null
}

export default function RecentActivityToast() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const [ready, setReady] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [bannerOffset, setBannerOffset] = useState(0)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const excluded = EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))
  const { data } = useSWR(ready && !excluded ? '/api/recent-activity' : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // First-party content (our own anonymised requests): independent of the cookie banner.
  useEffect(() => {
    if (excluded || sessionStorage.getItem(DISMISSED_KEY)) return
    const start = setTimeout(() => setReady(true), START_DELAY_MS)
    return () => clearTimeout(start)
  }, [excluded])

  useEffect(() => {
    if (!ready || excluded || !data || sessionStorage.getItem(DISMISSED_KEY)) return

    function showNext() {
      const seen = readSeen()
      if (seen.length >= MAX_PER_SESSION || !data) return false
      const next = pickNotice(data, seen)
      if (!next) return false
      sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen, next.key]))
      // The cookie banner is fixed to the bottom; sit above it while it is still open.
      const banner = document.querySelector('[aria-label="Consenso cookie"]')
      setBannerOffset(banner ? Math.ceil(banner.getBoundingClientRect().height) + 12 : 0)
      setNotice(next)
      trackRecentActivity('view', next.type)
      hideTimer.current = setTimeout(() => setNotice(null), VISIBLE_MS)
      return true
    }

    if (!showNext()) return
    const interval = setInterval(() => {
      if (sessionStorage.getItem(DISMISSED_KEY) || !showNext()) clearInterval(interval)
    }, INTERVAL_MS)
    return () => {
      clearInterval(interval)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [ready, excluded, data])

  function dismiss() {
    if (notice) trackRecentActivity('dismiss', notice.type)
    sessionStorage.setItem(DISMISSED_KEY, '1')
    setNotice(null)
  }

  return (
    <div
      aria-live="polite"
      style={bannerOffset ? { bottom: bannerOffset } : undefined}
      className={`pointer-events-none fixed inset-x-3 z-[9990] sm:inset-x-auto sm:left-6 ${bannerOffset ? '' : 'bottom-20 sm:bottom-6'}`}
    >
      <AnimatePresence>
        {notice && (
          <motion.div
            key={notice.key}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto relative w-full border border-black/10 bg-white p-4 pr-10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.3)] sm:w-[340px]"
          >
            <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#EB1C26]" />
            <p className="text-sm font-semibold leading-snug text-[#161616]">{notice.title}</p>
            {notice.when && <p className="mt-0.5 text-xs text-[#161616]/50">{notice.when}</p>}
            <Link
              href="/calcola-preventivo"
              onClick={() => trackRecentActivity('click', notice.type)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#EB1C26] hover:underline"
            >
              Calcola il tuo preventivo
              <ArrowRight className="size-3.5" />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Chiudi notifica"
              className="absolute right-2 top-2 p-1 text-[#161616]/40 transition-colors hover:text-[#161616]"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
