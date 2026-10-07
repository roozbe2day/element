import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPriceShort } from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";
import { MapPin } from "./ui/Icons";

export function PropertyCard({
  property,
  className = "",
  priority = false,
}: {
  property: Property;
  className?: string;
  priority?: boolean;
}) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[18px] bg-navy shadow-card transition-transform duration-500 ease-premium hover:-translate-y-1 ${className}`}
    >
      <img
        src={property.image}
        alt={`${property.name} — ${property.location}`}
        width={1400}
        height={1050}
        draggable={false}
        loading={priority ? "eager" : "lazy"}
        className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-premium group-hover:scale-[1.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-transparent opacity-90"
      />

      <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
        {property.type}
      </span>

      <FavoriteButton
        propertyId={property.id}
        propertyName={property.name}
        className="absolute right-4 top-4 z-20"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg font-bold leading-snug text-white">{property.name}</h3>
        <div className="mt-2.5 flex items-end justify-between gap-4">
          <span className="flex items-center gap-1.5 text-[0.78rem] text-white/75">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold" />
            {property.location}
          </span>
          <span className="shrink-0 text-[0.95rem] font-bold text-gold">
            {formatPriceShort(property.price)}
          </span>
        </div>
      </div>

      <Link
        href={`/properties/${property.slug}`}
        className="absolute inset-0 z-10 rounded-[18px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <span className="sr-only">
          View {property.name} in {property.location}
        </span>
      </Link>
    </article>
  );
}
