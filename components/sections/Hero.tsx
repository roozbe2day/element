export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-28 md:pt-32">
      {/* ambient gradient wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #153560 0%, #0A1F3B 45%, #071730 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.16] blur-3xl"
        style={{ background: "radial-gradient(circle, #C8A97E 0%, transparent 70%)" }}
      />

      <div className="relative shell pt-10 pb-14 text-center md:pt-16 md:pb-20">
        <span className="eyebrow animate-fade-up text-gold">
          Luxury Real Estate · Est. 2007
        </span>

        <h1 className="heading-xl mx-auto mt-6 max-w-4xl animate-fade-up text-white text-shadow-hero [animation-delay:120ms]">
          Discover Exceptional
          <br className="hidden sm:block" /> Homes &amp; Investments
        </h1>

        <p className="body-lg mx-auto mt-7 max-w-2xl animate-fade-up text-white/70 [animation-delay:260ms]">
          Premium properties in prime locations. Find your dream home or the perfect
          investment with confidence.
        </p>
      </div>

      <div className="relative">
        <div className="mx-auto w-full max-w-[1680px] px-0 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-t-[28px] sm:rounded-[28px]">
            <img
              src="/images/hero-villa.jpg"
              alt="Modern luxury villa with glass walls and infinity pool at blue hour"
              width={2400}
              height={1200}
              fetchPriority="high"
              className="h-[44vh] min-h-[300px] w-full animate-slow-zoom object-cover md:h-[56vh] md:min-h-[420px] lg:h-[60vh]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy/60 to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
