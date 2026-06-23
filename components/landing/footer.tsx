import { BrandMark } from "@/components/brand-mark";

export function Footer() {
  return (
    <footer className="section-dark" style={{ padding: "48px 0 48px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div className="space-between" style={{ alignItems: "flex-start" }}>
          <div className="stack" style={{ gap: 16, maxWidth: 300 }}>
            <BrandMark />
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              Brothers In Christ. Kingdom-focused discipleship for men.
            </p>
            <span className="eyebrow" style={{ color: "var(--gold)", marginTop: 8 }}>Proverbs 27:17</span>
          </div>
          
          <div className="row" style={{ gap: 64, flexWrap: "wrap" }}>
            <div className="stack-sm">
              <strong style={{ color: "#fff", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.05em", marginBottom: 8 }}>Navigation</strong>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Home</span>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Levels</span>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Groups</span>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Community</span>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Merch</span>
              <span className="muted" style={{ fontSize: "0.9rem", cursor: "pointer" }}>Profile</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
          <p className="muted" style={{ fontSize: "0.85rem" }}>&copy; {new Date().getFullYear()} Brothers In Christ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
