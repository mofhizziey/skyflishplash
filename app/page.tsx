import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PartnersSection } from "@/components/partners-section"
import { CTABanner } from "@/components/cta-banner"
import { QuoteFormSection } from "@/components/quote-form-section"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <StatsSection />
        <AboutSection />
        <TestimonialsSection />
        <PartnersSection />
        <CTABanner />
        <QuoteFormSection />
      </main>
      <SiteFooter />
    </div>
  )
}
