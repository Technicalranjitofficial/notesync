import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeBar from "@/components/sections/MarqueeBar";
import StatsRow from "@/components/sections/StatsRow";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import UniversitiesSection from "@/components/sections/UniversitiesSection";
import PricingSection from "@/components/sections/PricingSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <MarqueeBar />
        <StatsRow />
        <HowItWorks />
        <FeaturesSection />
        <TestimonialsSection />
        <UniversitiesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
