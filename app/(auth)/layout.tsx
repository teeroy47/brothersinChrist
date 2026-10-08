import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-page section">
      <div className="container auth-shell">
        {/* Back to landing */}
        <div style={{ marginBottom: 16 }}>
          <Link
            href="/"
            className="row muted"
            style={{
              gap: 6,
              fontSize: "0.85rem",
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            <ArrowLeft size={15} strokeWidth={2} />
            <span>Back to home</span>
          </Link>
        </div>

        <div className="auth-logo-wrap">
          <BrandMark />
          <p>Brothers In Christ</p>
        </div>

        {children}
      </div>
    </main>
  );
}
