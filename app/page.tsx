import ScrollProgress from '@/components/tetto94/scroll-progress'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import DroneFly from '@/components/tetto94/drone-fly'
import Navbar from '@/components/tetto94/navbar'
import HeroSection from '@/components/tetto94/hero-section'
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
