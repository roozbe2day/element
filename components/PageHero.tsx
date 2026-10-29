import Link from "next/link";
import { ChevronRight } from "./ui/Icons";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-navy pt-[132px] pb-16 md:pt-[156px] md:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 130% at 15% 0%, #153560 0%, #0A1F3B 50%, #071730 100%)",
        }}
      />
      <div className="relative shell">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/50">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && <span className="eyebrow text-gold">{eyebrow}</span>}
        <h1 className="heading-lg mt-4 max-w-3xl animate-fade-up text-white">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl animate-fade-up text-[1.0625rem] leading-[1.8] text-white/65 [animation-delay:120ms]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
