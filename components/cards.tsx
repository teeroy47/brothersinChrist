import { percent } from "@/lib/utils";

export function SectionHeader({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="stack-sm">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="heading-lg">{title}</h2>
      {body ? <p className="muted" style={{ maxWidth: 720, margin: 0 }}>{body}</p> : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "steady"
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "steady" | "warning" | "healthy" | "strong";
}) {
  return (
    <div className="card stack-sm">
      <span className="data-label">{label}</span>
      <strong className="data-value">{value}</strong>
      <span className="data-detail">{detail}</span>
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background:
            tone === "healthy"
              ? "var(--accent)"
              : tone === "warning"
              ? "var(--gold)"
              : tone === "strong"
              ? "var(--foreground)"
              : "var(--muted)"
        }}
      />
    </div>
  );
}

export function ProgressCard({
  label,
  value,
  target,
  tone
}: {
  label: string;
  value: number;
  target: number;
  tone: "steady" | "warning" | "strong";
}) {
  const progress = percent(value, target);

  return (
    <div className="card stack-sm">
      <div className="space-between">
        <strong>{label}</strong>
        <span className="muted">{progress}%</span>
      </div>
      <div className={`progress ${tone === "warning" ? "warning" : ""}`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <span className="muted">
        {value}/{target} this cycle
      </span>
    </div>
  );
}
