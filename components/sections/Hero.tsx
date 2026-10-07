"use client";

import { useScrollVideo } from "@/lib/useScrollVideo";

const DESKTOP_SRC = "/videos/hero-scrub.mp4";
const MOBILE_SRC = "/videos/hero-scrub-mobile.mp4";
const POSTER = "/videos/hero-scrub-poster.jpg";
const FALLBACK_IMAGE = "/images/hero-villa.jpg";

export function Hero() {
  const { sectionRef, viewportRef, videoRef, contentRef, status } = useScrollVideo({
    src: DESKTOP_SRC,
    mobileSrc: MOBILE_SRC,
  });

  return (
    // Tall wrapper supplies the scroll distance; the viewport inside stays pinned
    // for the whole traversal, so scrolling scrubs the clip instead of advancing
    // the page. Heights live in `globals.css` so the reduced-motion collapse can
    // override them without any client-side branching.
    <section ref={sectionRef} className="hero-scroll-area relative bg-navy">
      <div ref={viewportRef} className="hero-sticky w-full overflow-hidden">
        {status === "error" ? (
          // Never leave a blank hero: fall back to the original still.
          <img
            src={FALLBACK_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          // No `autoplay`, no `loop`, no controls — the clip is only ever seeked.
          // The poster is the clip's own first frame, so the pre-load state is
          // indistinguishable from the first frame of the experience.
          <video
            ref={videoRef}
            poster={POSTER}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Deliberately light: enough scrim for the type, not enough to mute the clip. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/15 to-navy/70"
        />

        <div
          ref={contentRef}
          className="relative z-10 flex h-full items-center justify-center"
        >
          <div className="shell pb-10 text-center">
            <span className="eyebrow animate-fade-up text-gold-soft">
              Luxury Real Estate · Est. 2007
            </span>

            <h1 className="heading-xl mx-auto mt-6 max-w-4xl animate-fade-up text-white text-shadow-hero [animation-delay:120ms]">
              Discover Exceptional
              <br className="hidden sm:block" /> Homes &amp; Investments
            </h1>

            <p className="body-lg mx-auto mt-7 max-w-2xl animate-fade-up text-white/75 [animation-delay:260ms]">
              Premium properties in prime locations. Find your dream home or the
              perfect investment with confidence.
            </p>
          </div>
        </div>

        {status === "loading" && (
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex flex-col items-center gap-3">
            <span className="relative block h-px w-24 overflow-hidden bg-white/25">
              <span className="hero-load-bar absolute inset-y-0 left-0 block w-8 bg-gold" />
            </span>
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white/60">
              Preparing experience
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
