import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, Phone } from "@/components/ui/Icons";
import { agents } from "@/lib/properties";

export function Team() {
  return (
    <section className="section-pad bg-white">
      <div className="shell">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Our People</SectionLabel>
            <h2 className="heading-lg mt-5">Meet the Team</h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted md:text-right">
            Advisors with deep local knowledge and a shared standard for how clients should
            be treated.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <Reveal as="li" key={agent.id} delay={i * 80}>
              <div className="group">
                <div className="relative overflow-hidden rounded-[18px] bg-ivory">
                  <img
                    src={agent.photo}
                    alt={`${agent.name}, ${agent.role}`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex translate-y-3 items-center justify-center gap-3 p-5 opacity-0 transition-all duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href={`mailto:${agent.email}`}
                      aria-label={`Email ${agent.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy transition-colors hover:bg-gold"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
                      aria-label={`Call ${agent.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy transition-colors hover:bg-gold"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{agent.name}</h3>
                <p className="mt-1 text-sm text-muted">{agent.role}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-14 flex justify-center">
          <ButtonLink href="/team" variant="outlineDark" withArrow>
            Meet the Full Team
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
