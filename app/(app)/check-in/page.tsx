import { checkInTemplate, submissions } from "@/lib/mock-data";

export default function CheckInPage() {
  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Weekly check-in</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>{checkInTemplate.title}</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>
          A simple recurring reflection for prayer, Scripture, attendance, accountability, and support needs.
        </p>
      </div>

      <form className="card stack">
        {checkInTemplate.questions.map((question) => (
          <label key={question.id} className="field">
            <span>{question.prompt}</span>
            {question.type === "text" ? <textarea placeholder="Write briefly and honestly." /> : null}
            {question.type === "boolean" ? (
              <select defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            ) : null}
            {question.type === "rating" ? <input type="range" min={1} max={5} defaultValue={3} /> : null}
          </label>
        ))}
        <button type="button" className="button">
          Submit check-in
        </button>
      </form>

      <div className="card stack">
        <strong className="heading-md">Recent review snapshot</strong>
        {submissions.map((submission) => (
          <div key={submission.id} className="metric stack-sm">
            <strong>{submission.weekLabel}</strong>
            <span className="muted">{submission.flags.length ? submission.flags.join(" · ") : "No concern flags"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
