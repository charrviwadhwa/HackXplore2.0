import { useState } from "react";

/**
 * HackathonCard — Reusable card for listing hackathon events.
 */
export default function HackathonCard({
  title = "Global Hack 2025",
  organizer = "TechCorp",
  prize = "$50,000",
  date = "Aug 12–14, 2025",
  location = "San Francisco, CA",
  mode = "hybrid",
  teamSize = "1–4 Members",
  difficulty = "Intermediate",
  tags = ["AI/ML", "Web3", "Open Source"],
  deadline = "Aug 1, 2025",
  registered = 1240,
  capacity = 2000,
  logo = "⚡",
  featured = false,
  onApply,
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const fillPct = capacity > 0 ? Math.min((registered / capacity) * 100, 100) : null;

  const modeConfig = {
    online: { label: "Online", style: { color: "#4ade80", borderColor: "rgba(74,222,128,.3)", background: "rgba(74,222,128,.05)" } },
    hybrid: { label: "Hybrid", style: { color: "#38bdf8", borderColor: "rgba(56,189,248,.3)", background: "rgba(56,189,248,.05)" } },
    offline: { label: "In-Person", style: { color: "#fbbf24", borderColor: "rgba(251,191,36,.3)", background: "rgba(251,191,36,.05)" } },
  };

  const diffConfig = {
    Beginner: "#4ade80",
    Intermediate: "#fbbf24",
    Advanced: "#f87171",
  };

  const currentMode = modeConfig[mode] || modeConfig.online;

  return (
    <>
      <style>{`
        .hcard {
          background: linear-gradient(180deg, #161618, #0f0f11);
          border: 1px solid #27272a;
          transition: all .35s cubic-bezier(.16,1,.3,1);
          clip-path: polygon(0 0, calc(100% - 1.25rem) 0, 100% 1.25rem, 100% 100%, 1.25rem 100%, 0 calc(100% - 1.25rem));
          font-family: 'Geist', sans-serif;
          position: relative;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          user-select: none;
        }
        .hcard:hover {
          border-color: rgba(176,38,255,.35);
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(0,0,0,.5);
        }
        .mono {
          font-family: 'Geist Mono', monospace;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: .35rem;
          font-family: 'Geist Mono', monospace;
          font-size: .625rem;
          text-transform: uppercase;
          letter-spacing: .1em;
          padding: .25rem .625rem;
          border: 1px solid;
          border-radius: 0;
        }
        .prog-bar {
          height: 3px;
          background: #27272a;
          overflow: hidden;
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #b026ff, #ff26b9);
          transition: width .5s ease;
        }
      `}</style>

      <article
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="hcard"
        style={{
          borderColor: featured ? "rgba(176,38,255,.4)" : undefined,
          boxShadow: featured ? "0 0 30px rgba(176,38,255,.08)" : undefined,
        }}
      >
        {/* Glow on hover */}
        {hovered && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.6,
              transition: "opacity 0.3s",
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176,38,255,0.07), transparent 50%)`,
            }}
          />
        )}

        {/* Featured Badge */}
        {featured && (
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #b026ff, transparent)" }} />
        )}

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1, zIndex: 10, position: "relative" }}>
          
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".875rem" }}>
              <div style={{
                width: "2.75rem", height: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center",
                background: "#0a0a0b", border: "1px solid #27272a", fontSize: "1.25rem", flexShrink: 0,
                clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))"
              }}>
                {logo}
              </div>
              <div>
                <div style={{ color: "#f4f4f5", fontWeight: 600, fontSize: ".9375rem", lineHeight: 1.2, letterSpacing: "-.02em" }}>
                  {title}
                </div>
                <div className="mono" style={{ fontSize: ".5625rem", color: "#71717a", marginTop: ".2rem" }}>
                  by {organizer}
                </div>
              </div>
            </div>

            <span className="mono badge" style={{ fontSize: ".5rem", flexShrink: 0, ...currentMode.style }}>
              {currentMode.label}
            </span>
          </div>

          {/* Prize Highlight */}
          <div style={{
            border: "1px solid #27272a", background: "#0a0a0b", padding: ".875rem 1rem", display: "flex", justifyContent: "space-between",
            clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%)"
          }}>
            <div>
              <div className="mono" style={{ fontSize: ".5rem", color: "#71717a", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: ".25rem" }}>
                Prize Pool
              </div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#b026ff", letterSpacing: "-.03em", lineHeight: 1 }}>
                {prize}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="mono" style={{ fontSize: ".5rem", color: "#71717a", textTransform: "uppercase", letterSpacing: ".12em", marginBottom: ".25rem" }}>
                Difficulty
              </div>
              <div className="mono" style={{ fontSize: ".8125rem", fontWeight: 600, color: diffConfig[difficulty] || "#a1a1aa" }}>
                {difficulty}
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".625rem" }}>
            <InfoCell icon={<CalIcon />} label="Date" value={date} />
            <InfoCell icon={<PinIcon />} label="Location" value={location} />
            <InfoCell icon={<TeamIcon />} label="Team Size" value={teamSize} />
            <InfoCell icon={<ClockIcon />} label="Deadline" value={deadline} />
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
            {tags.map((tag) => (
              <span key={tag} className="mono" style={{
                fontSize: ".5625rem", textTransform: "uppercase", letterSpacing: ".1em",
                color: "#71717a", border: "1px solid #27272a", padding: ".2rem .5rem", background: "rgba(39,39,42,.4)"
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Registration Progress */}
          {fillPct !== null && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".375rem" }}>
                <span className="mono" style={{ fontSize: ".45rem", color: "#52525b", textTransform: "uppercase", letterSpacing: ".12em" }}>
                  Participants
                </span>
                <span className="mono" style={{ fontSize: ".45rem", color: "#a1a1aa" }}>
                  {registered.toLocaleString()} / {capacity.toLocaleString()}
                </span>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width: `${fillPct}%` }} />
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onApply}
            onMouseOver={(e) => e.currentTarget.style.opacity = '.85'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            style={{
              width: "100%", padding: ".875rem", fontFamily: "'Geist Mono', monospace", fontSize: ".75rem", fontWeight: 600,
              textTransform: "uppercase", letterSpacing: ".1em", color: "#0a0a0b", background: "linear-gradient(90deg, #b026ff, #ff26b9)",
              border: "none", cursor: "pointer", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              transition: "opacity .2s", marginTop: "auto"
            }}
          >
            Register Now →
          </button>
        </div>
      </article>
    </>
  );
}

/* --- Sub-components --- */
function InfoCell({ icon, label, value }) {
  return (
    <div style={{ display: "flex", gap: ".5rem" }}>
      <span style={{ fontSize: ".875rem", flexShrink: 0, marginTop: "1px", color: "#52525b" }}>
        {icon}
      </span>
      <div>
        <div className="mono" style={{ fontSize: ".45rem", color: "#52525b", textTransform: "uppercase", letterSpacing: ".12em" }}>
          {label}
        </div>
        <div style={{ color: "#d4d4d8", fontSize: ".8125rem", fontWeight: 500, lineHeight: 1.2 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

const CalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" />
  </svg>
);
const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21s-8-7-8-12a8 8 0 1 1 16 0c0 5-8 12-8 12z" /><circle cx="12" cy="9" r="2" />
  </svg>
);
const TeamIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);