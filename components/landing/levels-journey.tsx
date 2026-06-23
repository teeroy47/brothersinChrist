import { levels } from "@/lib/mock-data";

export function LevelsJourney() {
  return (
    <section className="section section-dark" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container stack" style={{ gap: 64 }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Levels</span>
          <h2 className="heading-lg" style={{ textTransform: "uppercase", marginTop: 12 }}>A meaningful progression, not a game.</h2>
          <p className="muted" style={{ marginTop: 16, fontSize: "1.1rem" }}>
            Every level names expectations, growth markers, and curriculum so brothers know what maturity looks like.
          </p>
        </div>

        <div style={{ position: "relative", paddingTop: 20 }}>
          {/* Connecting line */}
          <div style={{ 
            position: "absolute", 
            top: 48, 
            left: "10%", 
            right: "10%", 
            height: 2, 
            background: "rgba(255,255,255,0.1)",
            zIndex: 0 
          }} className="hide-mobile" />

          <div className="grid-4" style={{ position: "relative", zIndex: 1, gap: 24 }}>
            {levels.map((level) => (
              <div key={level.id} className="stack" style={{ alignItems: "center", textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#0a0e17", color: "var(--gold)",
                  display: "grid", placeItems: "center",
                  marginBottom: 16, border: "2px solid var(--gold)"
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <strong className="heading-md" style={{ textTransform: "uppercase", fontSize: "1.1rem" }}>{level.id.replace("-", " ")}</strong>
                <p className="muted" style={{ margin: "8px 0 0", fontSize: "0.95rem" }}>{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
