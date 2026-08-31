// import type { Metadata } from 'next'
// import Navbar from '@/components/tetto94/navbar'
// import Footer from '@/components/tetto94/footer'
// import WhatsAppButton from '@/components/tetto94/whatsapp-button'
// import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'
// import RiskMapContent from '@/components/tetto94/risk-map-content'

// // This page reads live, frequently-changing aggregate stats from Neon
// // (via getRoofMapStats, itself cached with unstable_cache/revalidate).
// // Force dynamic so Next.js renders it per-request instead of trying to
// // prerender it once at build time, when the database may not be reachable.
// export const dynamic = 'force-dynamic'

// export const metadata: Metadata = {
//   title: 'Mappa del Rischio Tetti in Italia — T94 Roof Index™ | Tetto94',
//   description:
//     'La mappa aggregata e anonima dei rischi per i tetti in Italia, generata dalle analisi reali del T94 Roof Index™. Scopri il livello di rischio nella tua zona.',
//   alternates: {
//     canonical: 'https://www.tetto94.it/mappa-rischio',
//   },
//   robots: { index: true, follow: true },
//   openGraph: {
//     title: 'Mappa del Rischio Tetti in Italia — T94 Roof Index™',
//     description:
//       'La mappa aggregata e anonima dei rischi per i tetti in Italia, generata dalle analisi reali del T94 Roof Index™.',
//     url: 'https://www.tetto94.it/mappa-rischio',
//     type: 'website',
//   },
// }

// export default function MappaRischioPage() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <RiskMapContent />
//       </main>
//       <Footer />
//       <WhatsAppButton />
//       <MobileStickyBar />
//     </>
//   )
// }


import type { Metadata } from 'next'
import Navbar from '@/components/tetto94/navbar'
import Footer from '@/components/tetto94/footer'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import RiskMapContent from '@/components/tetto94/risk-map-content'

// This page reads live, frequently-changing aggregate stats from Neon
// (via getRoofMapStats, itself cached with unstable_cache/revalidate).
// Force dynamic so Next.js renders it per-request instead of trying to
// prerender it once at build time, when the database may not be reachable.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Mappa del Rischio Tetti in Italia — T94 Roof Index™ | Tetto94',
  description:
    'La mappa aggregata e anonima dei rischi per i tetti in Italia, generata dalle analisi reali del T94 Roof Index™. Scopri il livello di rischio nella tua zona.',
  alternates: {
    canonical: 'https://www.tetto94.it/mappa-rischio',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mappa del Rischio Tetti in Italia — T94 Roof Index™',
    description:
      'La mappa aggregata e anonima dei rischi per i tetti in Italia, generata dalle analisi reali del T94 Roof Index™.',
    url: 'https://www.tetto94.it/mappa-rischio',
    type: 'website',
  },
}

export default function MappaRischioPage() {
  return (
    <>
      <Navbar />
      <main>
        <RiskMapContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
