import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Key } from "@/components/ui/Icons";

export function CTASection() {
  return (
    <section className="bg-white pb-20 pt-4 md:pb-28">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col items-center gap-8 rounded-[24px] bg-mist px-8 py-12 text-center md:flex-row md:gap-10 md:px-14 md:text-left lg:py-14">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-white text-gold-dark">
              <Key className="h-7 w-7" />
            </span>

            <div className="flex-1">
              <h2 className="heading-md text-navy">Ready to Find Your Perfect Property?</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                Let our experts guide you to the right home or investment.
              </p>
            </div>

            <ButtonLink href="/contact" size="lg" className="w-full shrink-0 md:w-auto" withArrow>
              Get in Touch
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
