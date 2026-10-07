import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyCard } from "@/components/PropertyCard";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Area, Bath, Bed, Calendar, Check, ChevronRight, Mail, MapPin, Phone } from "@/components/ui/Icons";
import { formatPriceShort, formatSqft } from "@/lib/format";
import { getAgent, getPropertyBySlug, getSimilarProperties, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: property.name,
    description: property.description,
    openGraph: { images: [property.image] },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgent(property.agentId);
  const similar = getSimilarProperties(property, 3);

  const facts = [
    { icon: Bed, label: "Bedrooms", value: String(property.beds) },
    { icon: Bath, label: "Bathrooms", value: String(property.baths) },
    { icon: Area, label: "Interior", value: formatSqft(property.sqft) },
    { icon: Calendar, label: "Built", value: String(property.year) },
  ];

  return (
    <>
      <Header />
      <main id="main" className="bg-white pt-[104px] md:pt-[120px]">
        <div className="shell pb-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 py-6 text-xs text-muted">
            <Link href="/" className="transition-colors hover:text-navy">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/properties" className="transition-colors hover:text-navy">Properties</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-navy">{property.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
            <div>
              <PropertyGallery images={property.gallery} name={property.name} />

              <div className="mt-12">
                <SectionLabel>Overview</SectionLabel>
                <h2 className="heading-md mt-4">About this property</h2>
                <p className="body-lg mt-5">{property.description}</p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 rounded-[18px] border border-line p-6 sm:grid-cols-4">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-2">
                    <fact.icon className="h-5 w-5 text-gold-dark" />
                    <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted">
                      {fact.label}
                    </dt>
                    <dd className="text-base font-bold text-navy">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-14 grid gap-12 sm:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-navy">Key features</h3>
                  <ul className="mt-5 space-y-3.5">
                    {property.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[0.92rem] text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Amenities</h3>
                  <ul className="mt-5 space-y-3.5">
                    {property.amenities.map((amenity) => (
                      <li key={amenity} className="flex items-start gap-3 text-[0.92rem] text-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-[20px] border border-line p-7 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-extrabold text-navy">
                      {formatPriceShort(property.price)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                      {property.type} · For Sale
                    </p>
                  </div>
                  <FavoriteButton
                    propertyId={property.id}
                    propertyName={property.name}
                    className="!border-line !bg-white !text-navy hover:!bg-navy hover:!text-white"
                  />
                </div>

                <h1 className="mt-6 text-2xl font-bold text-navy">{property.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                  <MapPin className="h-4 w-4 text-gold-dark" />
                  {property.location}
                </p>

                <div className="mt-7 flex flex-col gap-3">
                  <ButtonLink href="/contact" size="lg" withArrow className="w-full">
                    Contact Agent
                  </ButtonLink>
                  <ButtonLink
                    href="/contact"
                    variant="outlineDark"
                    size="lg"
                    className="w-full"
                  >
                    Schedule a Viewing
                  </ButtonLink>
                </div>

                <div className="mt-8 border-t border-line pt-7">
                  <div className="flex items-center gap-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      width={120}
                      height={120}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-navy">{agent.name}</p>
                      <p className="text-xs text-muted">{agent.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[0.88rem] leading-relaxed text-muted">{agent.bio}</p>
                  <div className="mt-5 flex flex-col gap-2 text-sm">
                    <a href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2.5 text-navy transition-colors hover:text-gold-dark">
                      <Phone className="h-4 w-4 text-gold-dark" />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-navy transition-colors hover:text-gold-dark">
                      <Mail className="h-4 w-4 text-gold-dark" />
                      {agent.email}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Similar */}
        <section className="border-t border-line bg-ivory section-pad">
          <div className="shell">
            <Reveal>
              <SectionLabel>You may also like</SectionLabel>
              <h2 className="heading-md mt-4">Similar Properties</h2>
            </Reveal>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 80}>
                  <PropertyCard property={item} className="h-full" />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-white/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div>
          <p className="text-sm font-extrabold text-navy">{formatPriceShort(property.price)}</p>
          <p className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">{property.type}</p>
        </div>
        <ButtonLink href="/contact" className="shrink-0">
          Contact Agent
        </ButtonLink>
      </div>

      <Footer />
    </>
  );
}
