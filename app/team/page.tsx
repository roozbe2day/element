import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { Team } from "@/components/sections/Team";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the advisors at Horizon Properties — specialists in luxury sales, investment and relocation.",
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Our People"
          title="Advisors who know their markets"
          description="A small, senior team with deep local knowledge and a shared standard for how clients should be treated."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Team" }]}
        />
        <Team />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
