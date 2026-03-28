'use client'

import Image from 'next/image'

/**
 * Tetto94 Official Logo
 *
 * Uses the designer's transparent PNG — the diagonal roof crossbar is
 * brand red (#EB1C26) and the T stem is white, so it works perfectly on
 * any dark background (navbar #161616, footer #0E0E0E) with no adaptation needed.
 *
 * Natural asset dimensions: 1452 × 760 px → aspect ratio ~1.91 : 1
 *
 * Usage:
 *   <Tetto94Logo />                  — default, fits its container responsively
 *   <Tetto94Logo className="h-10" /> — fixed height via Tailwind
 */

interface Tetto94LogoProps {
  className?: string
  /** Accessible label — override when used as decorative duplicate */
  alt?: string
  priority?: boolean
}

export default function Tetto94Logo({
  className = '',
  alt = 'Tetto94',
  priority = true,
}: Tetto94LogoProps) {
  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      aria-label={alt}
    >
      <Image
        src="/images/logo-symbol.png"
        alt={alt}
        /**
         * We set width/height to the PNG's natural dimensions so Next.js
         * knows the intrinsic aspect ratio, then we control display size
         * purely via CSS (className). `style` is not needed.
         */
        width={1452}
        height={760}
        priority={priority}
        className="w-auto h-full object-contain"
        draggable={false}
      />
    </span>
  )
}
