import type { ReactNode } from "react";
import { BrandMark } from "@/components/brand-mark";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="stack" style={{ gap: 24 }}>
          <BrandMark />
          <div className="card card-dark stack">
            <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Brothers In Christ</span>
            <h1 className="heading-lg">Structured discipleship for men who need clarity, consistency, and covering.</h1>
            <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
              The MVP includes member profiles, levels, groups, weekly check-ins, attendance, community posts, and leader/admin oversight.
            </p>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
