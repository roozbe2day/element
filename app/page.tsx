import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WhoWeAre />
        <FeaturedProperties />
        <Services />
        <WhyChoose />
        <Team />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
