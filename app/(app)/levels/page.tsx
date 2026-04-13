import { requireSession } from "@/lib/auth";
import { getLevelById, levels } from "@/lib/mock-data";

export default async function LevelsPage() {
  const session = await requireSession();
  const currentLevel = getLevelById(session.id === "u-4" ? "level-5" : "level-2");

  return (
    <div className="stack">
      <div className="card card-dark stack">
        <span className="eyebrow" style={{ color: "rgba(255,255,255,.65)" }}>Current level</span>
        <h2 className="heading-lg" style={{ margin: 0 }}>{currentLevel?.title}</h2>
        <p style={{ color: "rgba(255,255,255,.76)", margin: 0 }}>{currentLevel?.description}</p>
      </div>

      <div className="grid-2">
        {levels.map((level) => (
          <div key={level.id} className="card stack">
            <div className="stack-sm">
              <span className="eyebrow">{level.id.toUpperCase()}</span>
              <h3 className="heading-md">{level.title}</h3>
              <p className="muted" style={{ margin: 0 }}>{level.description}</p>
            </div>
            <div className="metric stack-sm">
              <strong>Requirements</strong>
              {level.requirements.map((requirement) => (
                <span key={requirement} className="muted">{requirement}</span>
              ))}
            </div>
            <div className="metric stack-sm">
              <strong>Growth markers</strong>
              {level.growthMarkers.map((marker) => (
                <span key={marker} className="muted">{marker}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
