import { useState } from "react";
import InternshipCard from "./InternshipCard";

/* ── Section-specific CSS ────────────────────────────────────── */
const SECTION_CSS = `
  .intern-section {
    padding: 6rem 0;
    background: #0c0c0e;
    border-top: 1px solid var(--border);
  }
  .intern-section-inner { max-width: 84rem; margin: 0 auto; padding: 0 1.5rem; }
  .intern-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap;
  }
  .intern-h2 {
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 600;
    letter-spacing: -.04em; color: var(--text); line-height: 1.1;
  }
  .intern-sub { color: var(--muted); margin-top: .75rem; max-width: 32rem; line-height: 1.6; }
  .intern-banner {
    margin-bottom: 2rem;
    border: 1px solid rgba(176,38,255,.2);
    background: linear-gradient(90deg, rgba(176,38,255,.05), transparent);
    padding: 1.25rem 1.5rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 0 100%);
    flex-wrap: wrap;
  }
  .intern-banner-text { font-weight: 600; font-size: .9375rem; color: var(--text); }
  .intern-banner-sub  { font-family: 'Geist Mono', monospace; font-size: .5625rem; color: var(--dim); margin-top: .25rem; }
  .intern-banner-btn  {
    font-family: 'Geist Mono', monospace; font-size: .5625rem;
    text-transform: uppercase; letter-spacing: .1em;
    color: var(--accent); border: 1px solid rgba(176,38,255,.4);
    padding: .5rem 1rem; background: transparent; cursor: pointer;
    white-space: nowrap; transition: background .2s;
  }
  .intern-banner-btn:hover { background: rgba(176,38,255,.1); }
  .intern-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 1rem;
  }
  .intern-load-more { text-align: center; margin-top: 2.5rem; }
  @media (max-width: 640px) {
    .intern-header { flex-direction: column; align-items: flex-start; }
    .intern-grid   { grid-template-columns: 1fr; }
  }
`;

/* ── Sample data ─────────────────────────────────────────────── */
const INTERNSHIPS = [
  {
    role: "Machine Learning Engineer Intern",
    company: "Google DeepMind",
    companyLogo: "🧠",
    stipend: "$8,500/mo",
    duration: "3 Months",
    location: "London, UK",
    mode: "hybrid",
    skills: ["Python", "TensorFlow", "Research", "PyTorch"],
    domain: "AI/ML Research",
    openings: 8,
    deadline: "Jul 31, 2025",
    startDate: "Sep 1, 2025",
    perks: ["PPO", "Mentorship", "Certificate"],
    verified: true,
    hot: true,
  },
  {
    role: "Product Design Intern",
    company: "Figma",
    companyLogo: "🎨",
    stipend: "$6,200/mo",
    duration: "4 Months",
    location: "San Francisco, CA",
    mode: "hybrid",
    skills: ["Figma", "Design Systems", "User Research"],
    domain: "Product Design",
    openings: 5,
    deadline: "Aug 10, 2025",
    startDate: "Sep 15, 2025",
    perks: ["PPO", "Certificate", "Letter of Rec"],
    verified: true,
    hot: false,
  },
  {
    role: "Full Stack Developer Intern",
    company: "Razorpay",
    companyLogo: "💳",
    stipend: "₹60,000/mo",
    duration: "6 Months",
    location: "Bengaluru, India",
    mode: "onsite",
    skills: ["React", "Node.js", "PostgreSQL", "Redis"],
    domain: "Software Engineering",
    openings: 12,
    deadline: "Jul 20, 2025",
    startDate: "Aug 1, 2025",
    perks: ["PPO", "Stipend", "Certificate"],
    verified: true,
    hot: false,
  },
  {
    role: "Data Science Intern",
    company: "Zepto",
    companyLogo: "⚡",
    stipend: "₹45,000/mo",
    duration: "3 Months",
    location: "Remote",
    mode: "remote",
    skills: ["Python", "SQL", "Tableau", "scikit-learn"],
    domain: "Analytics & Data",
    openings: 4,
    deadline: "Jul 15, 2025",
    startDate: "Aug 15, 2025",
    perks: ["Certificate", "Mentorship"],
    verified: false,
    hot: true,
  },
];

const FILTERS = ["All Roles", "Remote", "Research", "Paid Only", "PPO"];

/* ── Component ───────────────────────────────────────────────── */
export default function InternshipsSection() {
  const [activeFilter, setActiveFilter] = useState("All Roles");

  const filtered = INTERNSHIPS.filter((i) => {
    if (activeFilter === "All Roles") return true;
    if (activeFilter === "Remote")    return i.mode === "remote";
    if (activeFilter === "PPO")       return i.perks.includes("PPO");
    if (activeFilter === "Paid Only") return true; // all are paid
    return true;
  });

  return (
    <>
      <style>{SECTION_CSS}</style>

      <section id="internships" className="intern-section">
        <div className="intern-section-inner">
          {/* Label */}
          <div className="sec-label">Phase_02 // Internships</div>

          {/* Header */}
          <div className="intern-header">
            <div>
              <h2 className="intern-h2">Real work. Real impact.</h2>
              <p className="intern-sub">Curated internship opportunities at top startups, MNCs, and research labs. Stipend-first. No unpaid work.</p>
            </div>
            <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
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

          {/* Season banner */}
          <div className="intern-banner">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>🔥</span>
              <div>
                <p className="intern-banner-text">Summer 2025 Internship Season is LIVE</p>
                <p className="intern-banner-sub">240+ companies actively hiring interns right now</p>
              </div>
            </div>
            <button className="intern-banner-btn">Browse All →</button>
          </div>

          {/* Cards */}
          <div className="intern-grid">
            {filtered.map((item, i) => (
              <InternshipCard
                key={i}
                {...item}
                onApply={() => alert(`Applying for ${item.role} at ${item.company}`)}
              />
            ))}
          </div>

          {/* Load more */}
          <div className="intern-load-more">
            <button className="btn-ghost">View All 840+ Internships →</button>
          </div>
        </div>
      </section>
    </>
  );
}