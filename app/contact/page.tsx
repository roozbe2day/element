import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, MapPin, Phone } from "@/components/ui/Icons";
import { agents } from "@/lib/properties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a Horizon Properties advisor about buying, selling or investing in property.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Contact"
          title="Let's find your next property"
          description="Tell us what you are looking for and one of our advisors will be in touch within one business day."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

        <section className="section-pad bg-white">
          <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <SectionLabel>Get in touch</SectionLabel>
              <h2 className="heading-md mt-5">Speak with an advisor</h2>

              <ul className="mt-8 space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-gold-dark">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      Phone
                    </p>
                    <a href={site.phoneHref} className="mt-1 block text-[0.95rem] font-semibold text-navy transition-colors hover:text-gold-dark">
                      {site.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-gold-dark">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      Email
                    </p>
                    <a href={`mailto:${site.email}`} className="mt-1 block text-[0.95rem] font-semibold text-navy transition-colors hover:text-gold-dark">
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ivory text-gold-dark">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      Office
                    </p>
                    <p className="mt-1 text-[0.95rem] font-semibold text-navy">{site.address}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  Direct lines
                </h3>
                <ul className="mt-5 space-y-4">
                  {agents.map((agent) => (
                    <li key={agent.id} className="flex items-center gap-4">
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        width={80}
                        height={80}
                        loading="lazy"
                        className="h-11 w-11 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-navy">{agent.name}</p>
                        <a href={`mailto:${agent.email}`} className="text-xs text-muted transition-colors hover:text-gold-dark">
                          {agent.email}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
