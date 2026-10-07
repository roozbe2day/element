import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { Mail, MapPin, Phone } from "./ui/Icons";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            <ul className="mt-6 flex gap-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-semibold text-white/80 transition-all duration-300 ease-premium hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    {s.label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-label font-semibold uppercase text-gold">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-label font-semibold uppercase text-gold">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li>
                <a href={site.phoneHref} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-start gap-3 transition-colors hover:text-white">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>

          <NewsletterForm />
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
