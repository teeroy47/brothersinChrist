import Link from "next/link";
import Image from "next/image";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" data-compact={compact ? "true" : undefined}>
      <div aria-hidden className="brand-mark-symbol" style={{ overflow: "hidden", padding: 2, background: "#fff" }}>
        <Image src="/logo.png" alt="Brothers In Christ Logo" width={54} height={54} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <div className="stack-sm" style={{ gap: 2 }}>
        <strong style={{ fontSize: compact ? "1rem" : "1.15rem" }}>Brothers In Christ</strong>
        {!compact ? <span className="muted" style={{ fontSize: ".82rem" }}>Structured discipleship for Kingdom men</span> : null}
      </div>
    </Link>
  );
}
