import { NavBar } from "./components/NavBar"
import { HeroSection } from "./components/HeroSection"
import { StatsSection } from "./components/Stats"
import { FeaturesSection } from "./components/Features"
import { HowItWorksSection } from "./components/HowItWorksSection"
import { VehicleTypesSection } from "./components/VehicleTypes"
import { BillingSection } from "./components/Billing"
import { TestimonialsSection } from "./components/Testimonials"
import { PricingSection } from "./components/Pricing"
import { CtaSection } from "./components/Cta"
import { AnimatedSection } from "../../layout/AnimatedSection"



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
    </div>
  )
}
