import { NavBar } from "./components/landingPage/NavBar"
import { HeroSection } from "./components/landingPage/HeroSection"
import { StatsSection } from "./components/landingPage/Stats"
import { FeaturesSection } from "./components/landingPage/Features"
import { HowItWorksSection } from "./components/landingPage/HowItWorksSection"
import { VehicleTypesSection } from "./components/landingPage/VehicleTypes"
import { BillingSection } from "./components/landingPage/Billing"
import { TestimonialsSection } from "./components/landingPage/Testimonials"
import { PricingSection } from "./components/landingPage/Pricing"
import { CtaSection } from "./components/landingPage/Cta"
import { AnimatedSection } from "../../layout/AnimatedSection"
import { ScrollToTopButton } from "../../ui/ScrollToTopButton"



export default function LandingPage() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <NavBar />
      <HeroSection />
      <AnimatedSection Component={StatsSection} />
      <AnimatedSection Component={FeaturesSection} />
      <AnimatedSection Component={HowItWorksSection} />
      <AnimatedSection Component={VehicleTypesSection} />
      <AnimatedSection Component={BillingSection} />
      <AnimatedSection Component={TestimonialsSection} />
      <AnimatedSection Component={PricingSection} />
      <AnimatedSection Component={CtaSection} />
      <ScrollToTopButton />
    </div>
  )
}
