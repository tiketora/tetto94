'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'

const CONSENT_KEY = 'tetto94_cookie_consent'

export default function CookieBanner() {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected' | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted') {
      setStatus('accepted')
      // Restore granted state for returning users who already accepted
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          analytics_storage: 'granted',
        })
      }
    } else if (stored === 'rejected') {
      setStatus('rejected')
      // Explicitly keep denied for returning users who rejected
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          analytics_storage: 'denied',
        })
      }
    } else {
      setStatus('pending')
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setStatus('accepted')
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      })
    }
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setStatus('rejected')
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      })
    }
  }

  return (
    <>
      {/* Step 1: Set consent DEFAULTS — must run before any config call */}
      <Script
        id="google-consent-default"
        strategy="beforeInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'ad_storage':         'granted',
            'ad_user_data':       'granted',
            'ad_personalization': 'granted',
            'analytics_storage':  'granted',
            'wait_for_update':    500
          });
        `}
      </Script>

      {/* Step 2: Load the gtag.js library */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HWXK50JPDE"
        strategy="afterInteractive"
      />

      {/* Step 3: Initialize GA4 + Google Ads */}
      <Script id="google-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HWXK50JPDE');
          gtag('config', 'AW-18086489395');
        `}
      </Script>

      {/* Banner */}
      <AnimatePresence>
        {status === 'pending' && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            role="dialog"
            aria-live="polite"
            aria-label="Consenso cookie"
            className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#0E0E0E] border-t border-white/10"
          >
            <div className="mx-auto max-w-7xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">

              {/* Text */}
              <p className="flex-1 text-xs text-white/50 leading-relaxed">
                Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.{' '}
                <a href="/privacy" className="text-white/70 underline underline-offset-2 hover:text-white transition-colors">
                  Maggiori informazioni
                </a>
              </p>

              {/* Actions */}
              <div className="flex items-center gap-5 shrink-0">
                <button
                  onClick={reject}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors whitespace-nowrap"
                >
                  Rifiuta
                </button>
                <button
                  onClick={accept}
                  className="bg-[#EB1C26] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  Accetta
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
