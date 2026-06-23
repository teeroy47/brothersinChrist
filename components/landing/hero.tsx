import Link from "next/link";

export function Hero() {
  return (
    <section className="section section-dark" style={{ paddingTop: 40, paddingBottom: 100, position: "relative" }}>
      {/* Background Image Overlay simulation */}
      <div style={{
        position: "absolute",
        top: 0, right: 0, bottom: 0, left: 0,
        background: "radial-gradient(circle at right top, rgba(205,164,52,0.15), transparent 40%), radial-gradient(circle at left bottom, rgba(205,164,52,0.05), transparent 30%)",
        pointerEvents: "none"
      }} />

      <div className="container hero-grid" style={{ position: "relative", zIndex: 1 }}>
        <div className="stack hero-text" style={{ gap: 32 }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Kingdom men. Structured growth. Real accountability.</span>
          <h1 className="heading-lg" style={{ textTransform: "uppercase", letterSpacing: "-0.02em" }}>A discipleship platform for men who intend to grow.</h1>
          <p className="muted" style={{ fontSize: "1.1rem", maxWidth: 680, margin: 0 }}>
            Brothers In Christ is a mobile-first brotherhood for levels, small groups, check-ins, attendance, teaching, and leader oversight. It is built for seriousness, not noise.
          </p>
          <div className="row" style={{ marginTop: 8 }}>
            <Link href="/signup" className="button">
              Start the journey &rarr;
            </Link>
            <Link href="/signin" className="button-secondary">
              Open demo access
            </Link>
          </div>

          <div className="scripture-lockup core-scripture-lockup" style={{
            marginTop: 24,
            background: "transparent",
            borderColor: "rgba(255,255,255,0.1)",
            boxShadow: "none"
          }}>
            <span className="eyebrow" style={{ color: "var(--gold)" }}>Proverbs 27:17 Core Scripture</span>
            <strong style={{ color: "#fff", marginTop: 8 }}>Iron sharpens iron.</strong>
            <p className="scripture-text" style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.7)" }}>
              "As iron sharpens iron, so one man sharpens another."
            </p>
          </div>
        </div>

        <div className="card card-dark stack" style={{ background: "#0a0e17", borderColor: "rgba(255,255,255,0.1)" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>What the brotherhood answers</span>
          <div className="stack-sm">
            <strong className="heading-md">Where do I belong?</strong>
            <span style={{ color: "rgba(255,255,255,.72)" }}>Every brother has a level, a group, and visible leadership covering.</span>
          </div>
          <div className="stack-sm">
            <strong className="heading-md" style={{ marginTop: 12 }}>What should I do this week?</strong>
            <span style={{ color: "rgba(255,255,255,.72)" }}>Daily dashboard cards keep prayer, teaching, attendance, and check-ins clear.</span>
          </div>
          <div className="stack-sm">
            <strong className="heading-md" style={{ marginTop: 12 }}>Who is checking on me?</strong>
            <span style={{ color: "rgba(255,255,255,.72)" }}>Leaders monitor consistency, follow-up needs, and prayer burdens without turning this into social media.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
