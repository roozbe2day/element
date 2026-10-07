"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import type { Property } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";
import { ChevronLeft, ChevronRight } from "./ui/Icons";

export function PropertyCarousel({
  properties,
  ariaLabel = "Featured properties",
}: {
  properties: Property[];
  ariaLabel?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // native touch scrolling
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    el.releasePointerCapture?.(e.pointerId);
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCards(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCards(-1);
          }
        }}
        className="no-scrollbar snap-x-proximity flex cursor-grab touch-pan-x gap-6 overflow-x-auto pb-2 active:cursor-grabbing"
      >
        {properties.map((property) => (
          <div
            key={property.id}
            data-card
            className="w-[76vw] shrink-0 snap-start sm:w-[360px] lg:w-[352px]"
          >
            <PropertyCard property={property} className="h-full" />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-end gap-3">
        <CarouselButton
          label="Previous properties"
          disabled={!canPrev}
          onClick={() => scrollByCards(-1)}
        >
          <ChevronLeft className="h-5 w-5" />
        </CarouselButton>
        <CarouselButton
          label="Next properties"
          disabled={!canNext}
          onClick={() => scrollByCards(1)}
        >
          <ChevronRight className="h-5 w-5" />
        </CarouselButton>
      </div>
    </div>
  );
}

function CarouselButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-navy/15 text-navy transition-all duration-300 ease-premium hover:border-navy hover:bg-navy hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy/15 disabled:hover:bg-transparent disabled:hover:text-navy"
    >
      {children}
    </button>
  );
}
