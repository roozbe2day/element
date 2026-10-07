import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowUpRight } from "@/components/ui/Icons";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section className="section-pad bg-white">
      <div className="shell grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="heading-lg mt-5 max-w-sm">
              Services built around the property
            </h2>
            <p className="body-lg mt-6 max-w-md">
              From acquisition to marketing and long-term advisory, our practice covers the
              full life of a property — quietly and precisely.
            </p>
            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy"
            >
              Explore all services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>

        <div>
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 60}>
              <div className="group grid grid-cols-[auto_1fr] items-center gap-5 border-t border-line py-7 last:border-b sm:grid-cols-[auto_1fr_auto] sm:gap-8">
                <span className="w-8 text-label font-semibold text-gold-dark">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy sm:text-xl">{service.title}</h3>
                  <p className="mt-2 max-w-lg text-[0.9rem] leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
                <div className="hidden h-16 w-24 shrink-0 overflow-hidden rounded-[14px] sm:block">
                  <img
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    width={400}
                    height={280}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-110"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
