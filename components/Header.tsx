"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Close, Menu, Phone } from "./ui/Icons";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !isHome || scrolled || open;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium ${
        solid
          ? "bg-navy/95 shadow-[0_10px_40px_-24px_rgba(6,17,34,0.9)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="shell">
        <div
          className={`flex items-center justify-between transition-all duration-500 ease-premium ${
            scrolled ? "h-[68px]" : "h-[84px]"
          }`}
        >
          <Logo tone="light" />

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative py-1 text-[0.86rem] font-medium tracking-[0.01em] text-white/85 transition-colors duration-300 hover:text-white"
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-400 ease-premium ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2.5 rounded-full border border-white/40 px-5 py-2.5 text-[0.8rem] font-semibold tracking-[0.02em] text-white transition-all duration-300 ease-premium hover:border-white hover:bg-white hover:text-navy md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-white/10 bg-navy/98 backdrop-blur-md transition-[max-height,opacity] duration-500 ease-premium lg:hidden ${
          open ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-white/10 py-4 text-lg font-medium transition-colors ${
                isActive(item.href) ? "text-gold" : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-[12px] border border-white/40 px-5 py-3.5 text-sm font-semibold text-white"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
