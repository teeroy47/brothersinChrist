export function Features() {
  return (
    <section className="section section-light">
      <div className="container stack" style={{ gap: 48 }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Built for Brotherhood</span>
          <h2 className="heading-lg" style={{ textTransform: "uppercase", marginTop: 12 }}>Features that support real ministry.</h2>
        </div>

        <div className="grid-2">
          <div className="card stack-sm" style={{ padding: 32, display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#111827", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div>
              <strong className="heading-md" style={{ textTransform: "uppercase" }}>Small groups</strong>
              <p className="muted" style={{ marginTop: 8 }}>
                Brotherhood is carried by real relationships. The group space supports weekly check-ins, prayer requests, encouragement, attendance history, and a view of who needs follow-up.
              </p>
            </div>
          </div>

          <div className="card stack-sm" style={{ padding: 32, display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#111827", color: "#fff", display: "grid", placeItems: "center", flexShrink: 0 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <strong className="heading-md" style={{ textTransform: "uppercase" }}>Why accountability matters</strong>
              <p className="muted" style={{ marginTop: 8 }}>
                Men grow faster when someone is close enough to ask the hard questions. BIC keeps accountability direct, private, and spiritually useful without turning it into surveillance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
