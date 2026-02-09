import { Link } from "react-router-dom";
import { GETTING_STARTED, DEMOS_BASE } from "../lib/components";

const GITHUB_URL = "https://github.com";

const iconClass = "h-5 w-5 flex-shrink-0";

function IconArrowRight() {
  return (
    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

function IconLogo() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect width="32" height="32" rx="6" fill="currentColor" />
      <path d="M8 10h6l-4 12h6l4-12h6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const BENTO_ITEMS = [
  { label: "Button", path: `${DEMOS_BASE}/button`, color: "var(--entry-bento-blue)" },
  { label: "Slider", path: `${DEMOS_BASE}/slider`, color: "var(--entry-bento-orange)" },
  { label: "Date", path: `${DEMOS_BASE}/date-picker`, color: "var(--entry-bento-pink)" },
  { label: "Voice", path: `${DEMOS_BASE}/voice-recorder`, color: "var(--entry-bento-violet)" },
  { label: "Theme", path: `${DEMOS_BASE}/theme-provider`, color: "var(--entry-bento-green)" },
  { label: "Progress", path: `${DEMOS_BASE}/progress`, color: "var(--entry-bento-green)" },
  { label: "Notify", path: `${DEMOS_BASE}/notification`, color: "var(--entry-bento-indigo)" },
];

const LOGOS = [
  { name: "npm", href: "https://www.npmjs.com" },
  { name: "React", href: "https://react.dev" },
  { name: "TypeScript", href: "https://www.typescriptlang.org" },
  { name: "Vite", href: "https://vitejs.dev" },
  { name: "Tailwind", href: "https://tailwindcss.com" },
];

export default function EntryPage() {
  return (
    <div className="entry-page">
      <div className="entry-bg" aria-hidden />
      <div className="entry-grid-pattern" aria-hidden />

      <div className="entry-inner">
        <header className="entry-header">
          <Link to="/" className="entry-logo-link">
            <IconLogo />
            <span className="entry-logo-text">@vayuko/ui</span>
          </Link>
          <nav className="entry-nav">
            <Link to={DEMOS_BASE} className="entry-nav-link">Demos</Link>
            <Link to={GETTING_STARTED.path} className="entry-nav-link">Docs</Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="entry-nav-link">GitHub</a>
            <Link to={GETTING_STARTED.path} className="entry-nav-cta">
              Get started
            </Link>
          </nav>
        </header>

        <section className="entry-hero">
          <p className="entry-hero-badge">React component library</p>
          <h1 className="entry-hero-title">
            Production-ready UI,
            <br />
            <span className="entry-hero-title-accent">one click away.</span>
          </h1>
          <p className="entry-hero-desc">
            Buttons, sliders, date pickers, voice recorders, and more. Open source, NPM-ready, TypeScript-first.
          </p>
          <div className="entry-hero-actions">
            <Link to={GETTING_STARTED.path} className="entry-cta-primary">
              Get started
              <IconArrowRight />
            </Link>
            <Link to="/" className="entry-cta-secondary">
              View demos
            </Link>
          </div>

          <div className="entry-bento">
            {BENTO_ITEMS.map(({ label, path, color }) => (
              <Link
                key={label}
                to={path}
                className="entry-bento-item"
                style={{ "--bento-color": color } as React.CSSProperties}
              >
                <span className="entry-bento-label">{label}</span>
              </Link>
            ))}
          </div>
        </section>

        <footer className="entry-footer">
          <span className="entry-footer-label">Built with</span>
          <div className="entry-logos">
            {LOGOS.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="entry-logo-item"
              >
                {name}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
