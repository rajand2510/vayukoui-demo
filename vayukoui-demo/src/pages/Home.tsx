import { Link } from "react-router-dom";
import { COMPONENT_GROUPS } from "../lib/components";

const accentColors: Record<string, string> = {
  "theme-provider": "#22c55e",
  button: "#3b82f6",
  slider: "#f97316",
  "range-slider": "#0ea5e9",
  dropdown: "#6366f1",
  "date-picker": "#ec4899",
  "date-range-picker": "#d946ef",
  "radio-group": "#8b5cf6",
  "voice-recorder": "#a855f7",
  notification: "#6366f1",
  progress: "#22c55e",
};

export default function Home() {
  return (
    <div className="overview-page">
      <header className="overview-hero">
        <h1 className="overview-hero-title">Overview</h1>
        <p className="overview-hero-desc">
          Explore @vayuko/ui components. Open any card to try a live demo and tweak props in real time.
        </p>
      </header>

      {COMPONENT_GROUPS.map((group) => (
        <section key={group.id} className="overview-section">
          <h2 className="overview-section-title">{group.label}</h2>
          <div className="overview-grid">
            {group.items.map(({ path, label, subtitle, slug }) => (
              <Link
                key={path}
                to={path}
                className="overview-card"
                style={{ "--overview-accent": accentColors[slug] ?? "#6366f1" } as React.CSSProperties}
              >
                <span className="overview-card-accent" aria-hidden />
                <div className="overview-card-body">
                  <span className="overview-card-label">{label}</span>
                  {subtitle && <span className="overview-card-subtitle">{subtitle}</span>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
