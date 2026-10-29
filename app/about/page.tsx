import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Horizon Properties connects discerning clients with extraordinary homes and considered investments across the United States.",
};

const values = [
  {
    title: "Integrity",
    description:
      "Straight advice, even when it is not what a client hopes to hear. Our reputation is the asset we protect above all.",
  },
  {
    title: "Discretion",
    description:
      "Many of our transactions never reach the open market. Privacy is built into how we work, not added afterwards.",
  },
  {
    title: "Expertise",
    description:
      "Architecture, planning, valuation and finance — the specialists you need, in one place, on every instruction.",
  },
  {
    title: "Local knowledge",
    description:
      "Advisors who live in the markets they represent, with a view of value that spreadsheets alone cannot give.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="About Us"
          title="Extraordinary homes, considered advice"
          description="Founded in 2007, Horizon Properties represents buyers, sellers and investors across the United States — with the patience and precision that significant property deserves."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        />

        <section className="section-pad bg-white">
          <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="overflow-hidden rounded-[20px]">
                <img
                  src="/images/about-main.jpg"
                  alt="Contemporary residence at dusk"
                  width={1300}
                  height={950}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionLabel>Our Approach</SectionLabel>
              <h2 className="heading-lg mt-5">Property, handled properly</h2>
              <p className="body-lg mt-6">
                We take on a deliberately small number of instructions each year. That
                restraint lets us give every client the attention a significant purchase
                demands — from the first conversation through to completion.
              </p>
              <p className="body-lg mt-4">
                Our advisors combine architectural literacy with hard market data, so the
                advice you receive is both informed and honest.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ivory section-pad">
          <div className="shell">
            <Reveal>
              <SectionLabel>What Guides Us</SectionLabel>
              <h2 className="heading-lg mt-5 max-w-xl">The values behind every instruction</h2>
            </Reveal>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <Reveal key={value.title} delay={i * 80}>
                  <div className="h-full rounded-[18px] border border-line bg-white p-7">
                    <span className="text-label font-semibold text-gold-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-navy">{value.title}</h3>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WhyChoose />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
