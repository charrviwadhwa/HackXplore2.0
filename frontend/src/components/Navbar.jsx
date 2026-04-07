import { useState, useEffect } from "react";

/* ── Navbar-specific styles ──────────────────────────────────── */
const NAV_CSS = `
  .nav-root {
    position: fixed; top: 0; left: 0; width: 100%; z-index: 200;
    backdrop-filter: blur(20px);
    background: rgba(10,10,11,.78);
    border-bottom: 1px solid rgba(39,39,42,.5);
  }
  .nav-inner {
    max-width: 84rem; margin: 0 auto; padding: 0 1.5rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 4.5rem;
  }
  .nav-logo {
    display: flex; align-items: center; gap: .75rem; text-decoration: none;
  }
  .nav-logo-text {
    font-weight: 700; font-size: 1.2rem; letter-spacing: -.04em;
    color: var(--text); text-transform: uppercase;
  }
  .nav-links {
    display: flex; gap: 2rem; list-style: none;
  }
  .nav-status-bar {
    background: #111113; border-bottom: 1px solid var(--border);
    height: 1.5rem; display: flex; align-items: center; padding: 0 1.5rem;
    overflow: hidden;
  }
  .nav-status-inner {
    display: flex; align-items: center; gap: 1.5rem;
    font-family: 'Geist Mono', monospace; font-size: .5625rem;
    color: var(--dim); text-transform: uppercase; letter-spacing: .15em;
    white-space: nowrap;
  }
  .nav-mobile-btn {
    display: none; background: none; border: none;
    color: var(--text); cursor: pointer; padding: .5rem;
  }
  .nav-mobile-menu {
    background: var(--bg); border-bottom: 1px solid var(--border);
    padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: 1rem;
  }
  @media (max-width: 768px) {
    .nav-desktop  { display: none !important; }
    .nav-mobile-btn { display: block !important; }
  }

  /* ChamferedButton reused across pages */
  .champ-btn {
    position: relative; display: inline-flex; align-items: center; justify-content: center;
    font-family: 'Geist', sans-serif; font-weight: 600;
    font-size: .8125rem; letter-spacing: .06em; text-transform: uppercase;
    padding: .625rem 1.5rem;
    border: none; cursor: pointer; text-decoration: none;
    overflow: hidden; transition: opacity .2s, transform .15s;
    clip-path: polygon(0 0, calc(100% - .75rem) 0, 100% .75rem, 100% 100%, .75rem 100%, 0 calc(100% - .75rem));
  }
  .champ-btn.solid {
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    color: var(--bg);
  }
  .champ-btn.solid:hover  { opacity: .88; }
  .champ-btn.solid:active { transform: scale(.98); }
`;

/* ── Reusable chamfered CTA button ──────────────────────────── */
export function ChamferedButton({ children, solid = false, className = "", style = {}, ...props }) {
  return (
    <button
      className={`champ-btn ${solid ? "solid" : ""} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Navbar component ────────────────────────────────────────── */
export default function Navbar() {
  const [ping, setPing] = useState(12);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setPing(Math.floor(Math.random() * 5) + 10), 2000);
    return () => clearInterval(id);
  }, []);

  const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Internships", href: "#internships" },
    { label: "Scholarships", href: "#scholarships" },
  ];

  return (
    <>
      <style>{NAV_CSS}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          {/* Logo */}
          <a href="#home" className="nav-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M2 2L12 22L22 2H16L12 10L8 2H2Z" fill="#b026ff" />
            </svg>
            <span className="nav-logo-text">HackXplore</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links nav-desktop">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="nav-link">{label}</a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <a href="#apply" className="champ-btn solid nav-desktop">
              Explore Now
            </a>
            <button className="nav-mobile-btn" onClick={() => setMenuOpen((o) => !o)}>
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status bar */}
        <div className="nav-status-bar">
          <div className="nav-status-inner">
            <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse-dot 2s infinite" }} />
              Platform Active
            </span>
            <span style={{ color: "var(--faint)" }}>|</span>
            <span>Latency: <span style={{ color: "var(--muted)" }}>{ping}ms</span></span>
            <span style={{ color: "var(--faint)" }}>|</span>
            <span>Opportunities: 2,840+</span>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="nav-mobile-menu">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link"
                style={{ fontSize: ".9375rem" }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}