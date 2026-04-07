import { useState } from "react";
import HackathonCard from "./HackathonCard";

/* ── Section-specific CSS ────────────────────────────────────── */
const SECTION_CSS = `
  .hack-section {
    padding: 6rem 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
  }
  .hack-section-inner { max-width: 84rem; margin: 0 auto; padding: 0 1.5rem; }
  .hack-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap;
  }
  .hack-h2 {
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 600;
    letter-spacing: -.04em; color: var(--text); line-height: 1.1;
  }
  .hack-sub { color: var(--muted); margin-top: .75rem; max-width: 32rem; line-height: 1.6; }
  .hack-filters { display: flex; gap: .5rem; flex-wrap: wrap; }
  .hack-stats-bar {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
    margin-bottom: 3rem;
    border: 1px solid var(--border); background: var(--surface);
    padding: 1.25rem;
    clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 0 100%);
  }
  .hack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }
  .hack-load-more { text-align: center; margin-top: 2.5rem; }
  @media (max-width: 900px) {
    .hack-stats-bar { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .hack-header { flex-direction: column; align-items: flex-start; }
    .hack-grid   { grid-template-columns: 1fr; }
  }
`;

/* ── Sample data ─────────────────────────────────────────────── */
const HACKATHONS = [
  {
    title: "Smart India Hackathon 2025",
    organizer: "Ministry of Education, India",
    prize: "₹1,00,000",
    date: "Aug 26–27, 2025",
    location: "Pan India",
    mode: "hybrid",
    teamSize: "2–6 Members",
    difficulty: "Intermediate",
    tags: ["GovTech", "AI/ML", "HealthTech", "EdTech"],
    deadline: "Jul 25, 2025",
    registered: 48000,
    capacity: 60000,
    logo: "🇮🇳",
    featured: true,
  },
  {
    title: "Google Solution Challenge",
    organizer: "Google Developers",
    prize: "$15,000",
    date: "Jan–Apr 2026",
    location: "Global (Online)",
    mode: "online",
    teamSize: "2–4 Members",
    difficulty: "Advanced",
    tags: ["Cloud", "Android", "UN Goals"],
    deadline: "Mar 10, 2026",
    registered: 11200,
    capacity: 0,
    logo: "🟡",
    featured: false,
  },
  {
    title: "HackMIT",
    organizer: "Massachusetts Institute of Technology",
    prize: "$50,000",
    date: "Sep 13–15, 2025",
    location: "Cambridge, MA",
    mode: "offline",
    teamSize: "1–4 Members",
    difficulty: "Advanced",
    tags: ["Hardware", "AI", "Open Innovation"],
    deadline: "Aug 15, 2025",
    registered: 600,
    capacity: 800,
    logo: "🏛️",
    featured: false,
  },
  {
    title: "MLH Global Hack Week",
    organizer: "Major League Hacking",
    prize: "Prizes + Swag",
    date: "Oct 7–13, 2025",
    location: "Online",
    mode: "online",
    teamSize: "1–5 Members",
    difficulty: "Beginner",
    tags: ["Open Source", "Web", "Gaming"],
    deadline: "Oct 6, 2025",
    registered: 22000,
    capacity: 0,
    logo: "🌐",
    featured: false,
  },
];

const FILTERS = ["All", "Online", "Offline", "Beginner", "Advanced"];

/* ── Component ───────────────────────────────────────────────── */
export default function HackathonsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = HACKATHONS.filter((h) => {
    if (activeFilter === "All")      return true;
    if (activeFilter === "Online")   return h.mode === "online";
    if (activeFilter === "Offline")  return h.mode === "offline";
    if (activeFilter === "Beginner") return h.difficulty === "Beginner";
    if (activeFilter === "Advanced") return h.difficulty === "Advanced";
    return true;
  });

  return (
    <>
      <style>{SECTION_CSS}</style>

      <section id="hackathons" className="hack-section">
        <div className="hack-section-inner">
          {/* Section label */}
          <div className="sec-label">Phase_01 // Hackathons</div>

          {/* Header */}
          <div className="hack-header">
            <div>
              <h2 className="hack-h2">Compete. Build. Win.</h2>
              <p className="hack-sub">Hand-picked hackathons from top organizations across the globe. Filter by skill level, prize pool, or domain.</p>
            </div>
            <div className="hack-filters">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  className={`fpill ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="hack-stats-bar">
            {[
              { val: "142",    lbl: "Live Hackathons" },
              { val: "$4.2M+", lbl: "Total Prize Money" },
              { val: "58",     lbl: "Countries Covered" },
              { val: "1.2M+",  lbl: "Registered Teams" },
            ].map(({ val, lbl }) => (
              <div key={lbl} style={{ textAlign: "center" }}>
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Cards grid */}
          <div className="hack-grid">
            {filtered.map((h, i) => (
              <HackathonCard
                key={i}
                {...h}
                onApply={() => alert(`Registering for ${h.title}`)}
              />
            ))}
          </div>

          {/* Load more */}
          <div className="hack-load-more">
            <button className="btn-ghost">Load More Hackathons →</button>
          </div>
        </div>
      </section>
    </>
  );
}