import type { ReactNode } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="section section-light" style={{ minHeight: "80vh" }}>
        <div className="container grid-2" style={{ alignItems: "start", gap: 64 }}>
          <div className="stack" style={{ gap: 24 }}>
            <div className="card card-dark stack" style={{ padding: 40, borderTop: "4px solid var(--gold)" }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>Brothers In Christ</span>
              <h1 className="heading-lg" style={{ textTransform: "uppercase" }}>Structured discipleship for men who need clarity, consistency, and covering.</h1>
              <p style={{ color: "rgba(255,255,255,.76)", margin: 0, fontSize: "1.1rem" }}>
                The MVP includes member profiles, levels, groups, weekly check-ins, attendance, community posts, and leader/admin oversight.
              </p>
            </div>
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
