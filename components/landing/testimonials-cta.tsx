import Link from "next/link";

export function TestimonialsCTA() {
  return (
    <>
      <section className="section section-light" style={{ paddingBottom: 60 }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div className="stack" style={{ paddingRight: "10%" }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>Real Stories</span>
            <h2 className="heading-lg" style={{ textTransform: "uppercase" }}>Lives being sharpened.</h2>
            <p className="muted" style={{ fontSize: "1.1rem", marginTop: 8 }}>
              Placeholder for brotherhood testimonies. Use this section for real stories from men whose prayer, discipline, leadership, and brotherhood life have deepened through BIC.
            </p>
            <div style={{ marginTop: 16 }}>
              <Link href="/signup" className="button" style={{ background: "#111827", color: "#fff" }}>
                Read more stories
              </Link>
            </div>
          </div>
          
          <div className="grid-2" style={{ gap: 16 }}>
            {/* Fake quote cards for the placeholder */}
            <div className="card stack-sm" style={{ padding: 24, background: "#fff", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <span style={{ color: "var(--gold)", fontSize: "2rem", lineHeight: 1 }}>&ldquo;</span>
              <p className="muted" style={{ fontStyle: "italic", fontSize: "0.95rem" }}>BIC gave me the structure and brotherhood I needed. My prayer life is stronger and I'm finally walking in consistency.</p>
              <div style={{ marginTop: 12, borderTop: "2px solid var(--border)", paddingTop: 12 }}>
                <strong style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>James T.</strong>
                <span className="eyebrow" style={{ display: "block", marginTop: 4 }}>Disciple Level</span>
              </div>
            </div>
            <div className="card stack-sm" style={{ padding: 24, background: "#fff", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", transform: "translateY(24px)" }}>
              <span style={{ color: "var(--gold)", fontSize: "2rem", lineHeight: 1 }}>&ldquo;</span>
              <p className="muted" style={{ fontStyle: "italic", fontSize: "0.95rem" }}>The accountability and teaching have changed the way I lead my family. I'm becoming the man God called me to be.</p>
              <div style={{ marginTop: 12, borderTop: "2px solid var(--border)", paddingTop: 12 }}>
                <strong style={{ fontSize: "0.85rem", textTransform: "uppercase" }}>Michael R.</strong>
                <span className="eyebrow" style={{ display: "block", marginTop: 4 }}>Brother Level</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" style={{ textAlign: "center", position: "relative" }}>
        <div style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          background: "radial-gradient(circle at center bottom, rgba(205,164,52,0.15), transparent 60%)",
          pointerEvents: "none"
        }} />
        <div className="container stack" style={{ alignItems: "center", position: "relative", zIndex: 1 }}>
          <h2 className="heading-lg" style={{ textTransform: "uppercase", maxWidth: 640 }}>Enter a serious discipleship environment.</h2>
          <p className="muted" style={{ fontSize: "1.1rem", maxWidth: 540, margin: "16px 0 32px" }}>
            This is not just a community. It is a brotherhood for building strong Kingdom men in a clear, accountable way.
          </p>
          <div className="row" style={{ justifyContent: "center" }}>
            <Link href="/signup" className="button">
              Join Brothers In Christ &rarr;
            </Link>
            <Link href="/signin" className="button-secondary">
              Explore the demo
            </Link>
            <Link href="/merch" className="button-secondary">
              View merch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
