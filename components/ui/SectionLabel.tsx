export function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-label font-semibold uppercase text-gold-dark ${className}`}
    >
      <span className="h-px w-6 bg-gold" aria-hidden="true" />
      {children}
    </span>
  );
}
