import { PropertyCarousel } from "@/components/PropertyCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { properties } from "@/lib/properties";

export function FeaturedProperties() {
  const featured = properties.filter((p) => p.featured);

  return (
    <section className="section-pad bg-ivory">
      <div className="shell">
        <Reveal className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="heading-lg mt-5">Featured Properties</h2>
          </div>
          <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted md:text-right">
            A considered selection from our current portfolio — each home chosen for
            architecture, setting and long-term value.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <PropertyCarousel properties={featured} ariaLabel="Featured properties carousel" />
        </Reveal>

        <Reveal delay={160} className="mt-12 flex justify-center">
          <ButtonLink href="/properties" variant="outlineDark" withArrow>
            View All Properties
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
