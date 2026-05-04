import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const merchItems = [
  {
    name: "Iron Sharpens Iron Tee",
    detail: "Everyday black tee with the Proverbs 27:17 motto.",
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
      <header className="container public-header">
        <BrandMark />
        <div className="row">
          <Link href="/" className="pill">
            Home
          </Link>
          <Link href="/signup" className="button">
            Join BIC
          </Link>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container stack">
            <div className="card card-dark stack merch-hero">
              <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Merch</span>
              <h1 className="heading-xl">Wear the brotherhood. Carry the motto.</h1>
              <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
                BIC merch is a visible reminder that kingdom men are sharpened daily into the full image of Christ.
              </p>
              <div className="motto-lockup">
                <span className="eyebrow" style={{ color: "rgba(255,255,255,.68)" }}>Proverbs 27:17</span>
                <strong>Iron sharpens iron.</strong>
                <p style={{ color: "rgba(255,255,255,.76)", margin: "8px 0 0" }}>
                  "As iron sharpens iron, so one man sharpens another."
                </p>
              </div>
            </div>

            <div className="grid-3 merch-grid">
              {merchItems.map((item) => (
                <div key={item.name} className="card stack merch-card">
                  <div className="merch-preview" aria-hidden>
                    <span>BIC</span>
                  </div>
                  <div className="stack-sm">
                    <span className="eyebrow">{item.price}</span>
                    <h2 className="heading-md">{item.name}</h2>
                    <p className="muted" style={{ margin: 0 }}>{item.detail}</p>
                  </div>
                  <button type="button" className="button-secondary" disabled>
                    Store coming soon
                  </button>
                </div>
              ))}
            </div>

            <div className="card stack">
              <span className="eyebrow">Next step</span>
              <h2 className="heading-md">Prepare a launch collection for brothers, groups, and leaders.</h2>
              <p className="muted" style={{ margin: 0 }}>
                This page is ready for real product photos, pricing, sizes, and checkout once the merch offering is finalized.
              </p>
              <div className="row">
                <Link href="/signup" className="button">Join Brothers In Christ</Link>
                <Link href="/signin" className="button-secondary">Member sign in</Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container" style={{ padding: "24px 0 48px" }}>
        <div className="space-between footer-row">
          <span className="muted">Brothers In Christ. Kingdom-focused discipleship for men.</span>
          <span className="muted">Proverbs 27:17</span>
        </div>
      </footer>
    </>
  );
}
