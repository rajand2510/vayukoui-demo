import { Link } from "react-router-dom";
import { COMPONENTS, GETTING_STARTED, DEMOS_BASE } from "../lib/components";

const COMPONENT_ITEMS = COMPONENTS.filter(
  (c) => c.path !== DEMOS_BASE && c.path !== GETTING_STARTED.path
);

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

function IconArrowRight() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="overview-page">
      <header className="overview-hero">
        <h1 className="overview-hero-title">Overview</h1>
        <p className="overview-hero-desc">
          Explore @vayuko/ui components. Open any card to try a live demo and tweak props in real time.
        </p>
      </header>

      <section className="overview-section">
        <h2 className="overview-section-title">Docs</h2>
        <Link to={GETTING_STARTED.path} className="overview-doc-card">
          <div className="overview-doc-card-inner">
            <span className="overview-doc-card-badge">Start here</span>
            <h3 className="overview-doc-card-title">{GETTING_STARTED.label}</h3>
            <p className="overview-doc-card-subtitle">{GETTING_STARTED.subtitle}</p>
            <span className="overview-doc-card-cta">
              Read guide
              <IconArrowRight />
            </span>
          </div>
        </Link>
      </section>

      <section className="overview-section">
        <h2 className="overview-section-title">Components</h2>
        <div className="overview-grid">
          {COMPONENT_ITEMS.map(({ path, label, subtitle, slug }) => (
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
    </div>
  );
}
