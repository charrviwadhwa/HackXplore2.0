import { useState } from "react";

/**
 * InternshipCard — Reusable card for internship listings.
 */
export default function InternshipCard({
  role = "Frontend Developer",
  company = "TechStartup Inc.",
  companyLogo = "🏢",
  stipend = "₹25,000/mo",
  duration = "3 Months",
  // location = "Remote",
  mode = "remote",
  skills = ["React", "TypeScript", "Tailwind"],
  domain = "Software Engineering",
  openings = 3,
  deadline = "Jul 20, 2025",
  startDate = "Aug 1, 2025",
  perks = ["PPO", "Certificate", "Mentorship"],
  verified = true,
  hot = false,
  onApply,
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const modeLabel = { online: "Online", hybrid: "Hybrid", offline: "In-Person", remote: "Remote", onsite: "On-site" };
  const modeDotColor = { remote: "#4ade80", hybrid: "#38bdf8", onsite: "#fbbf24", online: "#4ade80", offline: "#fbbf24" };

  const perkStyles = {
    PPO: { color: "#fbbf24", borderColor: "rgba(251,191,36,.3)", background: "rgba(251,191,36,.05)" },
    Certificate: { color: "#38bdf8", borderColor: "rgba(56,189,248,.3)", background: "rgba(56,189,248,.05)" },
    Mentorship: { color: "#a78bfa", borderColor: "rgba(167,139,250,.3)", background: "rgba(167,139,250,.05)" },
    "Letter of Rec": { color: "#f472b6", borderColor: "rgba(244,114,182,.3)", background: "rgba(244,114,182,.05)" },
    Stipend: { color: "#4ade80", borderColor: "rgba(74,222,128,.3)", background: "rgba(74,222,128,.05)" },
  };

  const getPerkStyle = (perk) => perkStyles[perk] || { color: "#a1a1aa", borderColor: "#27272a", background: "transparent" };

  return (
    <>
      <style>{`
        .icard {
          background: #111113;
          border: 1px solid #27272a;
          transition: all .35s;
          clip-path: polygon(0 0, 100% 0, 100% calc(100% - 1.25rem), calc(100% - 1.25rem) 100%, 0 100%);
          font-family: 'Geist', sans-serif;
          position: relative;
          cursor: pointer;
        }
        .icard:hover {
          border-color: rgba(176,38,255,.3);
          box-shadow: 0 8px 30px rgba(0,0,0,.4);
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
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: .3; }
        }
      `}</style>

      <div
        className="icard"
        style={{ display: "flex", flexDirection: "column" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Hot Top Border Line */}
        {hot && <div style={{ borderTop: "2px solid rgba(248,113,113,.6)" }}></div>}

        {/* Dynamic Glow */}
        {hovered && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(176,38,255,0.06), transparent 50%)`,
            }}
          />
        )}

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1, position: "relative", zIndex: 10 }}>
          
          {/* Hot badge */}
          {hot && (
            <div className="mono badge" style={{
              position: "absolute", top: "1rem", right: "1rem", fontSize: ".45rem", color: "#f87171",
              borderColor: "rgba(248,113,113,.3)", background: "rgba(248,113,113,.05)"
            }}>
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%", background: "#f87171",
                display: "inline-block", animation: "blink 1.5s infinite", marginRight: ".3rem"
              }}></span>
              Hot
            </div>
          )}

          {/* Company + Role */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{
              width: "2.75rem", height: "2.75rem", display: "flex", alignItems: "center", justifyContent: "center",
              background: "#0a0a0b", border: "1px solid #27272a", fontSize: "1.25rem", flexShrink: 0, borderRadius: "2px"
            }}>
              {companyLogo}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <span style={{ color: "#f4f4f5", fontWeight: 600, fontSize: ".9375rem", letterSpacing: "-.02em" }}>{role}</span>
                {verified && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b026ff" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div style={{ color: "#71717a", fontSize: ".875rem", marginTop: ".2rem" }}>{company}</div>
            </div>
          </div>

          {/* Domain Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: ".625rem" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: modeDotColor[mode] || "#4ade80" }}></span>
            <span className="mono" style={{ fontSize: ".5625rem", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: ".12em" }}>
              {modeLabel[mode] || "Remote"}
            </span>
            <span style={{ color: "#3f3f46" }}>·</span>
            <span className="mono" style={{ fontSize: ".5625rem", color: "#71717a", textTransform: "uppercase", letterSpacing: ".12em" }}>
              {domain}
            </span>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: ".5rem" }}>
            <div style={{ border: "1px solid rgba(176,38,255,.3)", background: "rgba(176,38,255,.05)", padding: ".75rem" }}>
              <div className="mono" style={{ fontSize: ".45rem", textTransform: "uppercase", letterSpacing: ".12em", color: "#b026ff", marginBottom: ".25rem" }}>Stipend</div>
              <div style={{ fontWeight: 600, fontSize: ".875rem", color: "#b026ff" }}>{stipend}</div>
            </div>
            <div style={{ border: "1px solid #27272a", background: "#0a0a0b", padding: ".75rem" }}>
              <div className="mono" style={{ fontSize: ".45rem", textTransform: "uppercase", letterSpacing: ".12em", color: "#52525b", marginBottom: ".25rem" }}>Duration</div>
              <div style={{ fontWeight: 600, fontSize: ".875rem", color: "#d4d4d8" }}>{duration}</div>
            </div>
            <div style={{ border: "1px solid #27272a", background: "#0a0a0b", padding: ".75rem" }}>
              <div className="mono" style={{ fontSize: ".45rem", textTransform: "uppercase", letterSpacing: ".12em", color: "#52525b", marginBottom: ".25rem" }}>Openings</div>
              <div style={{ fontWeight: 600, fontSize: ".875rem", color: "#d4d4d8" }}>{openings} Left</div>
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div>
              <span className="mono" style={{ fontSize: ".45rem", color: "#52525b", textTransform: "uppercase", letterSpacing: ".12em", display: "block", marginBottom: ".2rem" }}>Apply By</span>
              <span style={{ color: "#a1a1aa", fontSize: ".875rem" }}>{deadline}</span>
            </div>
            <div>
              <span className="mono" style={{ fontSize: ".45rem", color: "#52525b", textTransform: "uppercase", letterSpacing: ".12em", display: "block", marginBottom: ".2rem" }}>Starts</span>
              <span style={{ color: "#a1a1aa", fontSize: ".875rem" }}>{startDate}</span>
            </div>
          </div>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
            {skills.map((skill) => (
              <span key={skill} className="mono" style={{
                fontSize: ".5625rem", textTransform: "uppercase", letterSpacing: ".1em", color: "#71717a",
                border: "1px solid #27272a", padding: ".2rem .5rem", background: "rgba(39,39,42,.4)"
              }}>
                {skill}
              </span>
            ))}
          </div>

          {/* Perks */}
          {perks.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".375rem" }}>
              {perks.map((perk) => {
                const style = getPerkStyle(perk);
                return (
                  <span key={perk} className="badge" style={{ fontSize: ".5rem", ...style }}>
                    {perk}
                  </span>
                );
              })}
            </div>
          )}

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: ".5rem", marginTop: "auto" }}>
            <button
              style={{
                flex: 1, padding: ".75rem", fontFamily: "'Geist Mono', monospace", fontSize: ".625rem",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", background: "#0a0a0b",
                border: "1px solid #27272a", color: "#a1a1aa", cursor: "pointer", transition: "all .2s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(176,38,255,.5)'; e.currentTarget.style.color = '#b026ff'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.color = '#a1a1aa'; }}
            >
              View Details
            </button>
            <button
              onClick={onApply}
              style={{
                flex: 1, padding: ".75rem", fontFamily: "'Geist Mono', monospace", fontSize: ".625rem",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "#0a0a0b",
                background: "linear-gradient(90deg,#b026ff,#ff26b9)", border: "none", cursor: "pointer", transition: "opacity .2s"
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '.85'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              Apply Now →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}