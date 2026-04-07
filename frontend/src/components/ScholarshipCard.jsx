import { useState } from "react";

/* ── ScholarshipCard-specific CSS ────────────────────────────── */
const SCH_CARD_CSS = `
  .sc-logo {
    width: 3rem; height: 3rem; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, rgba(176,38,255,.1), rgba(255,38,185,.05));
    border: 1px solid rgba(176,38,255,.2);
    font-size: 1.375rem; border-radius: 2px;
  }
  .sc-name     { color: var(--text); font-weight: 600; font-size: .9375rem; letter-spacing: -.02em; line-height: 1.2; }
  .sc-provider { color: var(--dim); font-size: .875rem; margin-top: .2rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .sc-cat-badge { font-family: 'Geist Mono', monospace; font-size: .45rem; text-transform: uppercase; letter-spacing: .12em; padding: .3rem .625rem; border: 1px solid; display: inline-flex; align-items: center; gap: .3rem; flex-shrink: 0; }
  .sc-amount {
    font-size: 1.875rem; font-weight: 700; letter-spacing: -.04em;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .sc-amount-note { color: var(--dim); font-size: .875rem; }
  .sc-meta3   { display: grid; grid-template-columns: repeat(3, 1fr); gap: .625rem; }
  .sc-elig-list { display: flex; flex-direction: column; gap: .375rem; }
  .sc-elig-item { display: flex; align-items: flex-start; gap: .5rem; }
  .sc-elig-text { color: var(--muted); font-size: .8125rem; }
  .sc-more-btn  { font-family: 'Geist Mono', monospace; font-size: .5rem; color: var(--accent); background: none; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: .1em; margin-top: .5rem; }
  .sc-more-btn:hover { text-decoration: underline; }
  .sc-fields   { display: flex; flex-wrap: wrap; gap: .375rem; }
  .sc-stats-row { border-top: 1px solid var(--border); padding-top: 1rem; display: grid; grid-template-columns: repeat(3, 1fr); text-align: center; gap: .5rem; }
  .sc-stat-val  { font-weight: 600; font-size: .875rem; }
  .sc-stat-lbl  { font-family: 'Geist Mono', monospace; font-size: .4rem; color: var(--faint); text-transform: uppercase; letter-spacing: .1em; margin-top: .2rem; }
  .sc-deadline-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .75rem; }
  .sc-deadline-lbl  { font-family: 'Geist Mono', monospace; font-size: .5rem; color: var(--faint); text-transform: uppercase; letter-spacing: .12em; }
  .sc-deadline-val  { font-family: 'Geist Mono', monospace; font-size: .8125rem; font-weight: 600; }
`;

/* ── Helpers ─────────────────────────────────────────────────── */
const CAT_CONFIG = {
  Merit:       { icon: "⭐", color: "#fbbf24", borderColor: "rgba(251,191,36,.3)",  background: "rgba(251,191,36,.05)" },
  "Need-Based":{ icon: "🤝", color: "#38bdf8", borderColor: "rgba(56,189,248,.3)",  background: "rgba(56,189,248,.05)" },
  Diversity:   { icon: "🌈", color: "#f472b6", borderColor: "rgba(244,114,182,.3)", background: "rgba(244,114,182,.05)" },
  Research:    { icon: "🔬", color: "#a78bfa", borderColor: "rgba(167,139,250,.3)", background: "rgba(167,139,250,.05)" },
  Sports:      { icon: "🏅", color: "#4ade80", borderColor: "rgba(74,222,128,.3)",  background: "rgba(74,222,128,.05)" },
};

const LEVEL_COLOR = { UG: "#4ade80", PG: "#38bdf8", PhD: "#a78bfa", All: "#a1a1aa" };

/* ── ScholarshipCard ─────────────────────────────────────────── */
/**
 * Reusable ScholarshipCard
 * Props: name, provider, providerLogo, amount, amountNote, category,
 *        eligibility[], deadline, renewability, level, country,
 *        fields[], totalAwarded, applicants, acceptance,
 *        featured, urgent, onApply
 */
export default function ScholarshipCard({
  name          = "Excellence Award 2025",
  provider      = "Infosys Foundation",
  providerLogo  = "🏛️",
  amount        = "₹1,00,000",
  amountNote    = "per year",
  category      = "Merit",
  eligibility   = ["CGPA ≥ 8.0", "Indian Citizen", "First-Gen Student"],
  deadline      = "Sep 15, 2025",
  renewability  = "Annual",
  level         = "UG",
  country       = "India",
  fields        = ["Engineering", "Science", "Mathematics"],
  totalAwarded  = "$2.4M",
  applicants    = "12,000+",
  acceptance    = "4%",
  featured      = false,
  urgent        = false,
  onApply,
}) {
  const [hovered, setHovered]   = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const cat = CAT_CONFIG[category] || CAT_CONFIG.Merit;
  const acceptPct = parseFloat(acceptance);
  const countryShort = country.length > 12 ? country.slice(0, 12) + "…" : country;

  return (
    <>
      <style>{SCH_CARD_CSS}</style>

      <article
        className={`sch-card ${featured ? "featured" : ""}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Urgent ribbon */}
        {urgent && <div className="urgent-ribbon">⏰ Closing Soon</div>}

        {/* Hover glow */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176,38,255,.055), transparent 60%)`,
          }} />
        )}

        <div className="card-body" style={{ position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div className="sc-logo">{providerLogo}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="sc-name">{name}</div>
              <div className="sc-provider">{provider}</div>
            </div>
            <span className="sc-cat-badge" style={{ color: cat.color, borderColor: cat.borderColor, background: cat.background }}>
              <span>{cat.icon}</span> {category}
            </span>
          </div>

          {/* Amount box */}
          <div className="sch-amount-box">
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="mono" style={{ fontSize: ".5rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: ".375rem" }}>Award Amount</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".625rem" }}>
                <span className="sc-amount">{amount}</span>
                <span className="sc-amount-note">{amountNote}</span>
              </div>
            </div>
          </div>

          {/* Meta grid */}
          <div className="sc-meta3">
            {[
              { label: "Level",     value: level,        color: LEVEL_COLOR[level] || "var(--text)" },
              { label: "Country",   value: countryShort, color: "#d4d4d8" },
              { label: "Renewable", value: renewability, color: "#4ade80" },
            ].map(({ label, value, color }) => (
              <div key={label} className="sch-meta">
                <div className="sch-meta-lbl">{label}</div>
                <div className="sch-meta-val" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Eligibility */}
          <div>
            <div className="mono" style={{ fontSize: ".45rem", color: "var(--faint)", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: ".625rem" }}>Eligibility</div>
            <div className="sc-elig-list">
              {eligibility.slice(0, expanded ? eligibility.length : 3).map((item) => (
                <div key={item} className="sc-elig-item">
                  <span className="elig-dot" />
                  <span className="sc-elig-text">{item}</span>
                </div>
              ))}
            </div>
            {eligibility.length > 3 && (
              <button className="sc-more-btn" onClick={() => setExpanded((v) => !v)}>
                {expanded ? "Show Less ↑" : `+${eligibility.length - 3} More ↓`}
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="sc-fields">
            {fields.map((f) => <span key={f} className="tag-chip">{f}</span>)}
          </div>

          {/* Stats row */}
          <div className="sc-stats-row">
            {[
              { label: "Total Awarded", value: totalAwarded, color: "var(--text)" },
              { label: "Applicants/yr", value: applicants,   color: "var(--text)" },
              { label: "Accept Rate",   value: acceptance,   color: acceptPct <= 5 ? "#f87171" : "#4ade80" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="sc-stat-val" style={{ color }}>{value}</div>
                <div className="sc-stat-lbl">{label}</div>
              </div>
            ))}
          </div>

          {/* Deadline + CTA */}
          <div style={{ marginTop: "auto" }}>
            <div className="sc-deadline-row">
              <span className="sc-deadline-lbl">Deadline</span>
              <span className="sc-deadline-val" style={{ color: urgent ? "#f87171" : "#d4d4d8" }}>{deadline}</span>
            </div>
            <button className="card-btn-primary" onClick={onApply}>
              Apply for Scholarship →
            </button>
          </div>
        </div>
      </article>
    </>
  );
}