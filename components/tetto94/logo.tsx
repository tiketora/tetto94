'use client'

import Image from 'next/image'

/**
 * Tetto94 Official Logo
 *
 * Uses the designer's transparent PNG symbol (red + white paths).
 * Works on any background — white stem visible on dark, red dominant everywhere.
 *
 * Wordmark "Tetto dal 94" is rendered in HTML text so its color adapts:
 *   - "light"  → white text   (for dark backgrounds: navbar, footer)
 *   - "dark"   → #494949 text (for light backgrounds: sections)
 *   - "symbol" → symbol only, no wordmark
 *
 * The `height` prop controls the symbol height in px. Wordmark scales with it.
 * Natural aspect ratio of symbol PNG: 1452 × 760 → ~1.91 : 1
 */

interface Tetto94LogoProps {
  variant?: 'light' | 'dark' | 'symbol'
  /** Symbol height in px */
  height?: number
  className?: string
}

const SYMBOL_ASPECT = 1452 / 760 // natural w / h of the PNG

export default function Tetto94Logo({
  variant = 'light',
  height = 40,
  className = '',
}: Tetto94LogoProps) {
  const symbolW = Math.round(SYMBOL_ASPECT * height)

  const wordmarkColor =
    variant === 'dark' ? 'text-[#494949]' : 'text-white'

  const accentColor =
    variant === 'dark' ? 'text-[#EB1C26]' : 'text-[#EB1C26]'

  const fontSize = Math.round(height * 0.82)
  const dalSize  = Math.round(height * 0.38)

  return (
    <span
      className={`inline-flex items-center gap-0 leading-none select-none ${className}`}
      aria-label="Tetto94"
    >
      {/* Symbol */}
      <Image
        src="/images/logo-symbol.png"
        alt=""
        aria-hidden="true"
        width={symbolW}
        height={height}
        priority
        style={{ width: symbolW, height }}
        className="flex-shrink-0"
      />

      {/* Wordmark — hidden when variant is "symbol" */}
      {variant !== 'symbol' && (
        <span
          className={`flex flex-col justify-center ml-2 font-display tracking-wide ${wordmarkColor}`}
          style={{ lineHeight: 1 }}
        >
          {/* "Tetto" main word */}
          <span
            className="block font-display font-bold uppercase"
            style={{ fontSize: fontSize, letterSpacing: '0.02em' }}
          >
            Tetto
          </span>
          {/* "dal 94" tag line */}
          <span
            className="block font-sans font-semibold uppercase tracking-widest"
            style={{ fontSize: dalSize, marginTop: Math.round(height * 0.04) }}
          >
            <span className="opacity-60">dal </span>
            <span className={accentColor}>94</span>
          </span>
        </span>
      )}
    </span>
  )
}
