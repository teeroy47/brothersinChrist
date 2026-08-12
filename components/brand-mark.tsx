import Link from "next/link";

import { withBasePath } from "@/lib/paths";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark brand-mark-logo-only" data-compact={compact ? "true" : undefined} aria-label="Brothers In Christ home">
      <div aria-hidden className="brand-mark-symbol">
        <img src={withBasePath("/assets/bic-emblem.png")} alt="" className="brand-logo-image" />
      </div>
    </Link>
  );
}
