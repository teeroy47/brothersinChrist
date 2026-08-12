import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark brand-mark-logo-only" data-compact={compact ? "true" : undefined} aria-label="Brothers In Christ home">
      <div aria-hidden className="brand-mark-symbol">
        <img src="/assets/bic-emblem.png" alt="" className="brand-logo-image" />
      </div>
    </Link>
  );
}
