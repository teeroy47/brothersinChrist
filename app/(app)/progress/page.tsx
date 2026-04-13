import { ProgressCard } from "@/components/cards";
import { requireSession } from "@/lib/auth";
import { getProgressMetricsForUser } from "@/lib/mock-data";

export default async function ProgressPage() {
  const session = await requireSession();
  const metrics = getProgressMetricsForUser(session.id);

  return (
    <div className="stack">
      <div className="card stack">
        <span className="eyebrow">Progress tracking</span>
        <h2 className="heading-md">Visible markers across devotion, attendance, accountability, serving, and leadership.</h2>
        <p className="muted" style={{ margin: 0 }}>
          Growth is not gamified here. These signals exist to help brothers and leaders notice what is strengthening and what needs attention.
        </p>
      </div>
      <div className="grid-2">
        {metrics.map((metric) => (
          <ProgressCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
}
