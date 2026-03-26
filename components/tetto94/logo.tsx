import Image from 'next/image'

/**
 * Tetto94 Official Brand Logo
 *
 * Uses the designer's exact PNG assets — no hand-drawn SVG.
 *
 * Variants:
 *   "light"   → white symbol + white wordmark  (for dark / colored backgrounds)
 *   "dark"    → red symbol + charcoal wordmark  (for light / white backgrounds)
 *   "symbol"  → red symbol only, no wordmark    (for favicon / small uses)
 *
 * The `height` prop controls rendered size in px. Width scales automatically
 * via the natural aspect ratio of each asset.
 *
 * Asset aspect ratios (measured from designer files):
 *   logo-dark.png  (full horizontal) → ~504 × 84  ≈ 6 : 1
 *   logo-light.png (full horizontal) → ~556 × 84  ≈ 6.6 : 1
 *   logo-symbol-red.png              → ~397 × 280 ≈ 1.42 : 1
 */

interface Tetto94LogoProps {
  /** Color variant */
  variant?: 'light' | 'dark' | 'symbol'
  /** Rendered height in px. Width is calculated automatically. */
  height?: number
  className?: string
}

const ASSETS = {
  light: {
    src: '/images/logo-dark.png',
    alt: 'Tetto94 – logo versione chiara',
    // natural dimensions of the file
    naturalW: 504,
    naturalH: 84,
  },
  dark: {
    src: '/images/logo-light.png',
    alt: 'Tetto94 – logo versione scura',
    naturalW: 556,
    naturalH: 84,
  },
  symbol: {
    src: '/images/logo-symbol-red.png',
    alt: 'Tetto94 – simbolo',
    naturalW: 397,
    naturalH: 280,
  },
} as const

export default function Tetto94Logo({
  variant = 'light',
  height = 36,
  className = '',
}: Tetto94LogoProps) {
  const asset = ASSETS[variant]
  const width = Math.round((asset.naturalW / asset.naturalH) * height)

  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={width}
      height={height}
      className={className}
      priority
      style={{ objectFit: 'contain', width, height }}
    />
  )
}
