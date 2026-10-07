import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Services } from "@/components/sections/Services";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Luxury home sales, property investment, marketing, advisory, valuation and relocation services from Horizon Properties.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Services"
          title="A full-service property practice"
          description="Six disciplines, one standard. Whether you are buying, selling, investing or moving, the work is handled by specialists who do nothing else."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />
        <Services />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
