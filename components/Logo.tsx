import Link from "next/link";

export function Logo({
  tone = "light",
  className = "",
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const primary = tone === "light" ? "text-white" : "text-navy";
  return (
    <Link
      href="/"
      aria-label="Horizon Properties — home"
      className={`group flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 shrink-0 text-gold transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        <path d="M3 27h26" strokeLinecap="round" />
        <rect x="4.5" y="9" width="9" height="18" rx="1" />
        <rect x="17.5" y="15" width="10" height="12" rx="1" />
        <path d="M9 13.5h.01M9 18h.01M9 22.5h.01M22.5 19h.01M22.5 23h.01" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className={`block text-[0.92rem] font-extrabold tracking-[0.16em] ${primary}`}>
          HORIZON
        </span>
        <span className="mt-1 block text-[0.5rem] font-semibold tracking-[0.4em] text-gold">
          PROPERTIES
        </span>
      </span>
    </Link>
  );
}
