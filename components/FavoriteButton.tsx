"use client";

import { useFavorites } from "@/lib/favorites";
import { Heart } from "./ui/Icons";

export function FavoriteButton({
  propertyId,
  propertyName,
  className = "",
}: {
  propertyId: string;
  propertyName: string;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${propertyName} from saved` : `Save ${propertyName}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-300 ease-premium ${
        active
          ? "border-gold bg-gold text-navy"
          : "border-white/50 bg-white/10 text-white hover:bg-white hover:text-navy"
      } ${className}`}
    >
      <Heart filled={active} className="h-[18px] w-[18px]" />
    </button>
  );
}
