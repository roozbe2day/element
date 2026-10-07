import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Icons";

export function WhoWeAre() {
  return (
    <section className="section-pad bg-white">
      <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionLabel>About Us</SectionLabel>
          <h2 className="heading-lg mt-5">Who We Are</h2>
          <p className="body-lg mt-6 max-w-xl">
            At Horizon Properties, we connect people with extraordinary homes and smart
            investments. Integrity, transparency, and client satisfaction are at the heart
            of everything we do.
          </p>

          <dl className="mt-10 grid max-w-md grid-cols-2 gap-8">
            <div>
              <dt className="text-2xl font-extrabold text-navy">18</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Years advising
              </dd>
            </div>
            <div>
              <dt className="text-2xl font-extrabold text-navy">$2.4B</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Property transacted
              </dd>
            </div>
          </dl>

          <ButtonLink href="/about" className="mt-10" withArrow>
            Learn More
          </ButtonLink>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative pl-0 lg:pl-6">
            <div className="grid grid-cols-[1.7fr_1fr] items-end gap-3 sm:gap-4">
              <div className="group overflow-hidden rounded-[20px]">
                <img
                  src="/images/about-main.jpg"
                  alt="Contemporary residence with reflecting pool"
                  width={1300}
                  height={950}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>
              <div className="group overflow-hidden rounded-[20px]">
                <img
                  src="/images/about-side.jpg"
                  alt="Architectural detail of a modern villa facade"
                  width={800}
                  height={1150}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.05]"
                />
              </div>
            </div>

            <Link
              href="/about"
              aria-label="Learn more about Horizon Properties"
              className="group absolute right-0 top-1/2 hidden h-16 w-16 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-navy text-white shadow-soft transition-all duration-400 ease-premium hover:bg-gold hover:text-navy sm:flex"
            >
              <ArrowRight className="h-5 w-5 transition-transform duration-400 ease-premium group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
