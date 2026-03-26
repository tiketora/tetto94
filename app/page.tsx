import ScrollProgress from '@/components/tetto94/scroll-progress'
import WhatsAppButton from '@/components/tetto94/whatsapp-button'
import Navbar from '@/components/tetto94/navbar'
import HeroSection from '@/components/tetto94/hero-section'
import ServicesSection from '@/components/tetto94/services-section'
import WhyUsSection from '@/components/tetto94/why-us-section'
import DroneSection from '@/components/tetto94/drone-section'
import GallerySection from '@/components/tetto94/gallery-section'
import TestimonialsSection from '@/components/tetto94/testimonials-section'
import ContactSection from '@/components/tetto94/contact-section'
import Footer from '@/components/tetto94/footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <DroneSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
