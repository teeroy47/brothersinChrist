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
  tone?: "steady" | "warning" | "strong";
}) {
  return (
    <div className="card stack-sm">
      <span className="eyebrow">{label}</span>
      <strong className="heading-md">{value}</strong>
      <span className="muted">{detail}</span>
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: tone === "warning" ? "var(--gold)" : tone === "strong" ? "#000" : "#6b7280"
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
