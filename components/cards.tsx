import React from "react";
import { percent } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="space-between" style={{ alignItems: "flex-end", marginBottom: 16 }}>
      <div className="stack-sm">
        {eyebrow ? <span className="eyebrow" style={{ color: "var(--gold)" }}>{eyebrow}</span> : null}
        <h2 className="heading-md" style={{ margin: 0 }}>{title}</h2>
        {body ? <p className="muted" style={{ maxWidth: 720, margin: 0, fontSize: "0.9rem" }}>{body}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  badge,
  progress,
  icon,
  tone = "steady",
  detailTrend,
}: {
  label: string;
  value: string | number;
  detail?: string;
  badge?: string;
  progress?: number;
  icon?: React.ReactNode;
  tone?: "steady" | "warning" | "healthy" | "strong";
  detailTrend?: string;
}) {
  return (
    <div className="card stack-sm">
      <div className="space-between">
        <span className="data-label">{label}</span>
        {badge ? (
          <span
            className="pill"
            style={{
              padding: "2px 8px",
              minHeight: 22,
              fontSize: "0.72rem",
              fontWeight: 700,
              color: tone === "healthy" ? "var(--accent)" : "var(--gold)",
              borderColor: "var(--border)",
            }}
          >
            {badge}
          </span>
        ) : icon ? (
          <span style={{ color: tone === "healthy" ? "var(--accent)" : "var(--gold)" }}>
            {icon}
          </span>
        ) : null}
      </div>

      <strong className="data-value">{value}</strong>

      {typeof progress === "number" ? (
        <div className="progress">
          <span
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: tone === "warning" ? "var(--gold)" : undefined,
            }}
          />
        </div>
      ) : null}

      {detail ? <span className="data-detail">{detail}</span> : null}
    </div>
  );
}

export function ProgressCard({
  label,
  value,
  target,
  tone = "steady",
}: {
  label: string;
  value: number;
  target: number;
  tone?: "steady" | "warning" | "strong";
}) {
  const progressPercent = percent(value, target);

  return (
    <div className="card stack-sm">
      <div className="space-between">
        <strong style={{ fontSize: "0.95rem" }}>{label}</strong>
        <span className="muted" style={{ fontSize: "0.85rem", fontWeight: 700 }}>
          {progressPercent}%
        </span>
      </div>
      <div className={`progress ${tone === "warning" ? "warning" : ""}`}>
        <span style={{ width: `${progressPercent}%` }} />
      </div>
      <span className="data-detail">
        {value}/{target} this cycle
      </span>
    </div>
  );
}

export function SubCard({
  label,
  title,
  detail,
  status,
  children,
  style,
}: {
  label?: string;
  title?: string;
  detail?: string;
  status?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="stack-sm"
      style={{
        padding: "14px 16px",
        background: "var(--surface-muted)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
    >
      {label ? <span className="eyebrow" style={{ fontSize: "0.7rem" }}>{label}</span> : null}
      {title ? <strong style={{ fontSize: "0.95rem" }}>{title}</strong> : null}
      {detail ? <span className="muted" style={{ fontSize: "0.8rem" }}>{detail}</span> : null}
      {status ? (
        <span style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 600 }}>
          {status}
        </span>
      ) : null}
      {children}
    </div>
  );
}
