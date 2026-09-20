// import ScrollProgress from '@/components/tetto94/scroll-progress'
// import WhatsAppButton from '@/components/tetto94/whatsapp-button'
// import DroneFly from '@/components/tetto94/drone-fly'
// import Navbar from '@/components/tetto94/navbar'
// import HeroSection from '@/components/tetto94/hero-section'
// import BeforeAfterSection from '@/components/tetto94/before-after-section'
// import ServicesSection from '@/components/tetto94/services-section'
// import WhyUsSection from '@/components/tetto94/why-us-section'
// import DroneSection from '@/components/tetto94/drone-section'
// import NoScaffoldingSection from '@/components/tetto94/no-scaffolding-section'
// import GallerySection from '@/components/tetto94/gallery-section'
// import TestimonialsSection from '@/components/tetto94/testimonials-section'
// import ChecklistPricingSection from '@/components/tetto94/checklist-pricing-section'
// import ContactSection from '@/components/tetto94/contact-section'
// import MarqueeBar from '@/components/tetto94/marquee-bar'
// import Footer from '@/components/tetto94/footer'
// import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'

// export default function Home() {
//   return (
//     <>
//       <ScrollProgress />
//       <Navbar />
//       <main>
//         <HeroSection />
//         <MarqueeBar />
//         <BeforeAfterSection />
//         <DroneSection />
//         <ServicesSection />
//         <NoScaffoldingSection />
//         <ChecklistPricingSection />
//         <WhyUsSection />
//         <GallerySection />
//         <TestimonialsSection />
//         <ContactSection />
//       </main>
//       <Footer />
//       <WhatsAppButton />
//       <DroneFly />
//       <MobileStickyBar />
//     </>
//   )
// }

import ScrollProgress from '@/components/tetto94/scroll-progress'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import DroneFly from '@/components/tetto94/drone-fly'
import Navbar from '@/components/tetto94/navbar'
import HeroSection from '@/components/tetto94/hero-section'
import RoofCalculator from '@/components/tetto94/roof-calculator'
import BeforeAfterSection from '@/components/tetto94/before-after-section'
import ServicesSection from '@/components/tetto94/services-section'
import WhyUsSection from '@/components/tetto94/why-us-section'
import DroneSection from '@/components/tetto94/drone-section'
import NoScaffoldingSection from '@/components/tetto94/no-scaffolding-section'
import GallerySection from '@/components/tetto94/gallery-section'
import TestimonialsSection from '@/components/tetto94/testimonials-section'
import ChecklistPricingSection from '@/components/tetto94/checklist-pricing-section'
import ContactSection from '@/components/tetto94/contact-section'
import MarqueeBar from '@/components/tetto94/marquee-bar'
import Footer from '@/components/tetto94/footer'
import MobileStickyBar from '@/components/tetto94/mobile-sticky-bar'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBar />
        <section className="bg-white pt-14 pb-2 lg:pt-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#EB1C26]">
              Analisi Tecnica Gratuita
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-[#161616]">
              Scopri il Rischio del Tuo Tetto con il{' '}
              <span className="text-[#EB1C26]">T94 Roof Index™</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#494949] leading-relaxed">
              Rispondi a 7 domande e ottieni un&apos;analisi tecnica gratuita con stima costi immediata.
            </p>
          </div>
        </section>
        <RoofCalculator showBackLink={false} />
        <BeforeAfterSection />
        <DroneSection />
        <ServicesSection />
        <NoScaffoldingSection />
        <ChecklistPricingSection />
        <WhyUsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <DroneFly />
      <MobileStickyBar />
    </>
  )
}
