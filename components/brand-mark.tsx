import Link from "next/link";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="row" style={{ alignItems: "center", gap: 14 }}>
      <div
        aria-hidden
        style={{
          width: compact ? 40 : 54,
          height: compact ? 40 : 54,
          borderRadius: "50%",
          border: "2px solid currentColor",
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          position: "relative"
        }}
      >
        <span style={{ fontSize: compact ? "1rem" : "1.1rem" }}>✝</span>
      </div>
      <div className="stack-sm" style={{ gap: 2 }}>
        <strong style={{ letterSpacing: "-0.04em", fontSize: compact ? "1rem" : "1.15rem" }}>Brothers In Christ</strong>
        {!compact ? <span className="muted" style={{ fontSize: ".82rem" }}>Structured discipleship for Kingdom men</span> : null}
      </div>
    </Link>
  );
}
