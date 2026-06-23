import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

const merchItems = [
  {
    name: "Iron Sharpens Iron Tee",
    detail: "Everyday black tee anchored by the Proverbs 27:17 core scripture.",
    price: "Coming soon"
  },
  {
    name: "Kingdom Men Hoodie",
    detail: "Warm pullover for meetings, outreach, and brotherhood gatherings.",
    price: "Coming soon"
  },
  {
    name: "BIC Journal",
    detail: "Guided notes for prayer, Scripture, check-ins, and weekly commitments.",
    price: "Coming soon"
  }
];

export default function MerchPage() {
  return (
    <>
      <Header />

      <main>
        <section className="section section-dark">
          <div className="container stack">
            <div className="card card-dark stack merch-hero" style={{ background: "transparent", borderColor: "transparent", boxShadow: "none", padding: 0 }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>Merch</span>
              <h1 className="heading-xl" style={{ textTransform: "uppercase" }}>Wear the brotherhood. Carry the core scripture.</h1>
              <p style={{ color: "rgba(255,255,255,.76)", margin: 0, fontSize: "1.1rem" }}>
                BIC merch is a visible reminder that kingdom men are sharpened daily into the full image of Christ.
              </p>
              <div className="scripture-lockup core-scripture-lockup" style={{ marginTop: 24, background: "transparent", borderColor: "rgba(255,255,255,0.1)", boxShadow: "none" }}>
                <span className="eyebrow" style={{ color: "var(--gold)" }}>Proverbs 27:17 Core Scripture</span>
                <strong style={{ color: "#fff", marginTop: 8 }}>Iron sharpens iron.</strong>
                <p style={{ color: "rgba(255,255,255,.76)", margin: "8px 0 0" }}>
                  "As iron sharpens iron, so one man sharpens another."
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-light">
          <div className="container stack" style={{ gap: 48 }}>
            <div className="grid-3 merch-grid">
              {merchItems.map((item) => (
                <div className="card stack merch-card" key={item.name}>
                  <div className="merch-preview" aria-hidden>
                    <span>BIC</span>
                  </div>
                  <div className="stack-sm">
                    <span className="eyebrow" style={{ color: "var(--gold)" }}>{item.price}</span>
                    <h2 className="heading-md" style={{ textTransform: "uppercase" }}>{item.name}</h2>
                    <p className="muted" style={{ margin: 0 }}>{item.detail}</p>
                  </div>
                  <button type="button" className="button-secondary" disabled>
                    Store coming soon
                  </button>
                </div>
              ))}
            </div>

            <div className="card stack" style={{ marginTop: 40, borderTop: "4px solid var(--gold)", padding: 40 }}>
              <span className="eyebrow" style={{ color: "var(--gold)" }}>Next step</span>
              <h2 className="heading-lg" style={{ textTransform: "uppercase" }}>Prepare a launch collection for brothers, groups, and leaders.</h2>
              <p className="muted" style={{ margin: 0, fontSize: "1.1rem" }}>
                This page is ready for real product photos, pricing, sizes, and checkout once the merch offering is finalized.
              </p>
              <div className="row" style={{ marginTop: 16 }}>
                <Link href="/signup" className="button">Join Brothers In Christ</Link>
                <Link href="/signin" className="button-secondary">Member sign in</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
