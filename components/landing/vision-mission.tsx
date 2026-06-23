import { MetricCard } from "@/components/cards";

export function VisionMission() {
  return (
    <section className="section section-light">
      <div className="container stack" style={{ gap: 48 }}>
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "var(--gold)" }}>Vision & Mission</span>
          <h2 className="heading-lg" style={{ textTransform: "uppercase", marginTop: 12 }}>A global brotherhood sharpened into Christ.</h2>
          <p className="muted" style={{ marginTop: 16, fontSize: "1.1rem" }}>
            Brothers In Christ exists to form kingdom men who reflect Jesus Christ in daily obedience, brotherhood, discipline, and lasting fruit.
          </p>
        </div>
        
        <div className="grid-2">
          <div className="card mission-card stack-sm" style={{ padding: 32 }}>
            <span className="eyebrow">Vision</span>
            <strong className="heading-md" style={{ fontSize: "1.25rem" }}>To build a global brotherhood of kingdom men who reflect Jesus Christ and bear lasting fruit.</strong>
          </div>
          <div className="card mission-card stack-sm" style={{ padding: 32 }}>
            <span className="eyebrow">Mission</span>
            <strong className="heading-md" style={{ fontSize: "1.25rem" }}>To sharpen each other daily into the full image of Christ.</strong>
          </div>
        </div>
        
        <div className="grid-4" style={{ marginTop: 16 }}>
          <MetricCard label="God" value="Prayer + Word" detail="Daily devotion, theology, obedience, Scripture memory." tone="strong" />
          <MetricCard label="Mind" value="Renewal" detail="Truth-shaped thinking, emotional maturity, consistency." />
          <MetricCard label="Body" value="Discipline" detail="Health, strength, restraint, embodied stewardship." />
          <MetricCard label="Life" value="Leadership" detail="Responsibility, service, accountability, discipleship." />
        </div>
      </div>
    </section>
  );
}
