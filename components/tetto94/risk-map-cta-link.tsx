// 'use client'

// import { trackCTAClick } from '@/lib/gtag'

// /**
//  * The map page (risk-map-content.tsx) is an async Server Component so it
//  * can fetch getRoofMapStats() directly — but that means it can't hold an
//  * onClick handler itself (Next.js rejects passing event handlers through
//  * Server Component props). This tiny client island is just the two CTA
//  * links, kept separate so the rest of the page stays server-rendered.
//  */
// export function RiskMapCtaLink({
//   source,
//   className,
//   children,
// }: {
//   source: 'mappa_rischio' | 'mappa_rischio_footer'
//   className: string
//   children: React.ReactNode
// }) {
//   return (
//     <a href="/calcola-preventivo" onClick={() => trackCTAClick(source, '/calcola-preventivo')} className={className}>
//       {children}
//     </a>
//   )
// }

'use client'

import { trackCTAClick } from '@/lib/gtag'

type RiskMapCtaSource = 'mappa_rischio' | 'mappa_rischio_footer' | 'home_risk_map' | 'home_risk_map_full'

/**
 * Tiny client islands for the CTA links, so the async Server Components that
 * render the map stats can stay server-rendered (event handlers can't be
 * passed through Server Component props).
 */
export function RiskMapCtaLink({
  source,
  className,
  children,
}: {
  source: RiskMapCtaSource
  className: string
  children: React.ReactNode
}) {
  return (
    <a href="/calcola-preventivo" onClick={() => trackCTAClick(source, '/calcola-preventivo')} className={className}>
      {children}
    </a>
  )
}

export function RiskMapFullLink({
  className,
  children,
}: {
  className: string
  children: React.ReactNode
}) {
  return (
    <a href="/mappa-rischio" onClick={() => trackCTAClick('home_risk_map_full', '/mappa-rischio')} className={className}>
      {children}
    </a>
  )
}
