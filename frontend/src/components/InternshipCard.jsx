import { useState } from "react";

/* ── InternshipCard-specific CSS ─────────────────────────────── */
const INTERN_CARD_CSS = `
  .ic-company-logo {
    width: 2.75rem; height: 2.75rem; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg); border: 1px solid var(--border);
    font-size: 1.25rem; border-radius: 2px;
  }
  .ic-role    { color: var(--text); font-weight: 600; font-size: .9375rem; letter-spacing: -.02em; }
  .ic-company { color: var(--dim); font-size: .875rem; margin-top: .2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ic-meta-row { display: flex; align-items: center; gap: .625rem; }
  .ic-mode-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .ic-mode-lbl { font-family: 'Geist Mono', monospace; font-size: .5625rem; color: var(--muted); text-transform: uppercase; letter-spacing: .12em; }
  .ic-sep      { color: var(--faint); }
  .ic-domain   { font-family: 'Geist Mono', monospace; font-size: .5625rem; color: var(--dim); text-transform: uppercase; letter-spacing: .12em; }
  .ic-stats3   { display: grid; grid-template-columns: repeat(3, 1fr); gap: .5rem; }
  .ic-dates    { display: flex; gap: 1.5rem; }
  .ic-date-lbl { font-family: 'Geist Mono', monospace; font-size: .45rem; color: var(--faint); text-transform: uppercase; letter-spacing: .12em; display: block; margin-bottom: .2rem; }
  .ic-date-val { color: var(--muted); font-size: .875rem; }
  .ic-skills   { display: flex; flex-wrap: wrap; gap: .375rem; }
  .ic-perks    { display: flex; flex-wrap: wrap; gap: .375rem; }
  .ic-actions  { display: flex; gap: .5rem; margin-top: auto; }
`;

/* ── Helpers ─────────────────────────────────────────────────── */
const MODE_DOT = {
  remote:  { label: "Remote",   dot: "#4ade80" },
  hybrid:  { label: "Hybrid",   dot: "#38bdf8" },
  onsite:  { label: "On-site",  dot: "#fbbf24" },
};

const PERK_STYLE = {
  PPO:             { color: "#fbbf24", borderColor: "rgba(251,191,36,.3)",  background: "rgba(251,191,36,.05)" },
  Certificate:     { color: "#38bdf8", borderColor: "rgba(56,189,248,.3)",  background: "rgba(56,189,248,.05)" },
  Mentorship:      { color: "#a78bfa", borderColor: "rgba(167,139,250,.3)", background: "rgba(167,139,250,.05)" },
  "Letter of Rec": { color: "#f472b6", borderColor: "rgba(244,114,182,.3)", background: "rgba(244,114,182,.05)" },
  Stipend:         { color: "#4ade80", borderColor: "rgba(74,222,128,.3)",  background: "rgba(74,222,128,.05)" },
};

const DEFAULT_PERK = { color: "#a1a1aa", borderColor: "#27272a", background: "rgba(39,39,42,.35)" };

/* ── InternshipCard ──────────────────────────────────────────── */
/**
 * Reusable InternshipCard
 * Props: role, company, companyLogo, stipend, duration, location,
 *        mode, skills[], domain, openings, deadline, startDate,
 *        perks[], verified, hot, onApply
 */
export default function InternshipCard({
  role        = "Frontend Developer Intern",
  company     = "TechStartup Inc.",
  companyLogo = "🏢",
  stipend     = "₹25,000/mo",
  duration    = "3 Months",
  // location    = "Remote",
  mode        = "remote",
  skills      = ["React", "TypeScript", "Tailwind"],
  domain      = "Software Engineering",
  openings    = 3,
  deadline    = "Jul 20, 2025",
  startDate   = "Aug 1, 2025",
  perks       = ["PPO", "Certificate", "Mentorship"],
  verified    = true,
  hot         = false,
  onApply,
}) {
  const [hovered, setHovered]   = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const modeConf = MODE_DOT[mode] || MODE_DOT.remote;

  return (
    <>
      <style>{INTERN_CARD_CSS}</style>

      <article
        className={`intern-card ${hot ? "hot" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hover glow */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176,38,255,.06), transparent 55%)`,
          }} />
        )}

        {/* Hot badge */}
        {hot && (
          <div className="hot-badge">
            <span className="hot-blink" />
            High Demand
          </div>
        )}

        <div className="card-body" style={{ position: "relative", zIndex: 1 }}>
          {/* Company + role */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div className="ic-company-logo">{companyLogo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
                <span className="ic-role">{role}</span>
                {verified && (
                  <svg className="verified-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b026ff" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div className="ic-company">{company}</div>
            </div>
          </div>

          {/* Mode + domain */}
          <div className="ic-meta-row">
            <span className="ic-mode-dot" style={{ background: modeConf.dot }} />
            <span className="ic-mode-lbl">{modeConf.label}</span>
            <span className="ic-sep">·</span>
            <span className="ic-domain">{domain}</span>
          </div>

          {/* Stats trio */}
          <div className="ic-stats3">
            <div className="stipend-cell">
              <div className="meta-lbl" style={{ color: "var(--accent)" }}>Stipend</div>
              <div className="meta-val" style={{ color: "var(--accent)" }}>{stipend}</div>
            </div>
            <div className="meta-cell">
              <div className="meta-lbl" style={{ color: "var(--faint)" }}>Duration</div>
              <div className="meta-val" style={{ color: "#d4d4d8" }}>{duration}</div>
            </div>
            <div className="meta-cell">
              <div className="meta-lbl" style={{ color: "var(--faint)" }}>Openings</div>
              <div className="meta-val" style={{ color: "#d4d4d8" }}>{openings} Left</div>
            </div>
          </div>

          {/* Dates */}
          <div className="ic-dates">
            <div>
              <span className="ic-date-lbl">Apply By</span>
              <span className="ic-date-val">{deadline}</span>
            </div>
            <div>
              <span className="ic-date-lbl">Starts</span>
              <span className="ic-date-val">{startDate}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="ic-skills">
            {skills.map((s) => (
              <span key={s} className="tag-chip">{s}</span>
            ))}
          </div>

          {/* Perks */}
          {perks.length > 0 && (
            <div className="ic-perks">
              {perks.map((p) => {
                const ps = PERK_STYLE[p] || DEFAULT_PERK;
                return (
                  <span key={p} className="perk-pill" style={ps}>{p}</span>
                );
              })}
            </div>
          )}

          {/* Actions */}
          <div className="ic-actions">
            <button className="card-btn-secondary" onClick={onApply}>View Details</button>
            <button className="card-btn-apply" onClick={onApply}>Apply Now →</button>
          </div>
        </div>
      </article>
    </>
  );
}