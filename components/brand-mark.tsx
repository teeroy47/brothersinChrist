import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" data-compact={compact ? "true" : undefined}>
      <div aria-hidden className="brand-mark-symbol">
        <span>BIC</span>
      </div>
      <div className="stack-sm" style={{ gap: 2 }}>
        <strong style={{ fontSize: compact ? "1rem" : "1.15rem" }}>Brothers In Christ</strong>
        {!compact ? <span className="muted" style={{ fontSize: ".82rem" }}>Structured discipleship for Kingdom men</span> : null}
      </div>
    </Link>
  );
}
