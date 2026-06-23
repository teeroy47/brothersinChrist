export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Belong",
      desc: "Each man is placed in a level and small group, with accountability and leader coverage from day one."
    },
    {
      number: "2",
      title: "Engage",
      desc: "Check-ins, teachings, group activity, and attendance tracking make growth tangible without overcomplication."
    },
    {
      number: "3",
      title: "Mature",
      desc: "Progress markers and leader oversight help men move toward service, leadership, and multiplication."
    }
  ];

  return (
    <section className="section section-white">
      <div className="container stack" style={{ gap: 64 }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>How it works</span>
          <h2 className="heading-lg" style={{ textTransform: "uppercase", marginTop: 12 }}>Simple workflows that support real ministry.</h2>
          <p className="muted" style={{ marginTop: 16, fontSize: "1.1rem" }}>
            Join the brotherhood, enter a level, stay connected to a small group, submit a weekly check-in, attend meetings, and grow under visible leadership.
          </p>
        </div>

        <div style={{ position: "relative", paddingTop: 20 }}>
          {/* Connecting line */}
          <div style={{ 
            position: "absolute", 
            top: 48, 
            left: "15%", 
            right: "15%", 
            height: 2, 
            background: "var(--border)",
            zIndex: 0 
          }} className="hide-mobile" />

          <div className="grid-3" style={{ position: "relative", zIndex: 1, gap: 32 }}>
            {steps.map((step) => (
              <div key={step.number} className="stack" style={{ alignItems: "center", textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", background: "#111827", color: "#fff",
                  display: "grid", placeItems: "center", fontSize: "1.2rem", fontWeight: 700,
                  marginBottom: 16, border: "4px solid #fff", boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}>
                  {step.number}
                </div>
                <strong className="heading-md" style={{ textTransform: "uppercase" }}>{step.title}</strong>
                <p className="muted" style={{ margin: "8px 0 0", maxWidth: 280 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
