import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Bed(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 18v-7h18v7M3 11V7m18 4v4M3 18h18" />
      <path d="M7 11V9.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 17 9.5V11" />
    </svg>
  );
}

export function Bath(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M7 12V6.5A2.5 2.5 0 0 1 9.5 4c1.3 0 2.2.8 2.5 2M7 19l-1 2m11-2 1 2" />
    </svg>
  );
}

export function Area(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 4v5H4M15 20v-5h5" />
    </svg>
  );
}

export function Heart({ filled, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} {...props}>
      <path d="M12 20s-7-4.6-7-9.6A3.9 3.9 0 0 1 12 7.6 3.9 3.9 0 0 1 19 10.4C19 15.4 12 20 12 20Z" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function Sliders(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="10" cy="16" r="2" />
    </svg>
  );
}

export function Key(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="4" />
      <path d="m11 11 8 8m-3-3 2-2m-4 0 2-2" />
    </svg>
  );
}

export function Building(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-5h6v5M9 11h.01M15 11h.01M12 11h.01M9 14h.01M15 14h.01M12 14h.01" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8L12 4Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5V6m8-2.5V6" />
    </svg>
  );
}
