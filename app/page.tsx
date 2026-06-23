import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { VisionMission } from "@/components/landing/vision-mission";
import { HowItWorks } from "@/components/landing/how-it-works";
import { LevelsJourney } from "@/components/landing/levels-journey";
import { Features } from "@/components/landing/features";
import { TestimonialsCTA } from "@/components/landing/testimonials-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VisionMission />
        <HowItWorks />
        <LevelsJourney />
        <Features />
        <TestimonialsCTA />
      </main>
      <Footer />
    </>
  );
}
