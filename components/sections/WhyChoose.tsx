import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { stats, whyChoose } from "@/lib/site";

export function WhyChoose() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(100% 120% at 85% 0%, #153560 0%, #0A1F3B 55%, #071730 100%)",
        }}
      />
      <div className="relative shell section-pad">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionLabel className="!text-gold">Why Horizon</SectionLabel>
            <h2 className="heading-lg mt-5 text-white">
              A quieter, more considered way to buy property
            </h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-[1.8] text-white/65">
              We work with a small number of clients at a time, so every search, viewing and
              negotiation receives the attention it deserves.
            </p>
          </Reveal>

          <div className="space-y-10">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="border-t border-white/15 pt-7">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-white/15 pt-12 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-extrabold text-gold md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.16em] text-white/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
