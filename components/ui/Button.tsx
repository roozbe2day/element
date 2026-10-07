import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "outline" | "outlineDark" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white hover:bg-navy-700 border border-navy hover:border-navy-700",
  outline:
    "border border-white/45 text-white hover:bg-white hover:text-navy",
  outlineDark:
    "border border-navy/25 text-navy hover:bg-navy hover:text-white hover:border-navy",
  ghost: "text-navy hover:text-gold-dark",
  light: "bg-white text-navy hover:bg-ivory border border-white",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8rem]",
  md: "h-12 px-6 text-[0.85rem]",
  lg: "h-14 px-7 text-[0.9rem]",
};

const baseClass =
  "group inline-flex items-center justify-center gap-2.5 rounded-[12px] font-semibold tracking-[0.02em] transition-all duration-300 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className = "",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
      )}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className = "",
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        {children}
        {withArrow && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
        )}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" />
      )}
    </Link>
  );
}
