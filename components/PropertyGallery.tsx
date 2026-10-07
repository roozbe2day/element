"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Close } from "./ui/Icons";

export function PropertyGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open fullscreen gallery for ${name}`}
        className="group relative block w-full overflow-hidden rounded-[20px] bg-ivory"
      >
        <img
          src={images[index]}
          alt={`${name} — view ${index + 1}`}
          width={1600}
          height={1100}
          fetchPriority="high"
          className="aspect-[16/11] w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.03]"
        />
        <span className="absolute bottom-4 right-4 rounded-full bg-navy/80 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
          {index + 1} / {images.length}
        </span>
      </button>

      <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View image ${i + 1}`}
            aria-current={i === index}
            className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-[12px] transition-all duration-300 ease-premium ${
              i === index
                ? "ring-2 ring-gold ring-offset-2"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              width={280}
              height={200}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} image gallery`}
          className="fixed inset-0 z-[100] flex animate-fade-in flex-col bg-navy/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-8">
            <span className="text-sm font-medium text-white/70">
              {name} · {index + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
              autoFocus
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-navy"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-navy sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <img
              src={images[index]}
              alt={`${name} — view ${index + 1}`}
              className="max-h-full max-w-full rounded-[16px] object-contain"
            />

            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-navy sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="no-scrollbar flex justify-center gap-3 overflow-x-auto px-5 pb-6">
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-[10px] transition-opacity ${
                  i === index ? "ring-2 ring-gold" : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
