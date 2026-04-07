import { useState } from "react";
import ScholarshipCard from "./ScholarshipCard";

/* ── Section-specific CSS ────────────────────────────────────── */
const SECTION_CSS = `
  .sch-section {
    padding: 6rem 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
  }
  .sch-section-inner { max-width: 84rem; margin: 0 auto; padding: 0 1.5rem; }
  .sch-header {
    display: flex; justify-content: space-between;
    align-items: flex-end; gap: 2rem; margin-bottom: 3rem; flex-wrap: wrap;
  }
  .sch-h2 {
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 600;
    letter-spacing: -.04em; color: var(--text); line-height: 1.1;
  }
  .sch-sub { color: var(--muted); margin-top: .75rem; max-width: 32rem; line-height: 1.6; }
  .sch-stats4 {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 1rem; margin-bottom: 3rem;
  }
  .sch-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 1.25rem;
  }
  .sch-load-more { text-align: center; margin-top: 2.5rem; }
  @media (max-width: 900px) {
    .sch-stats4 { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .sch-header { flex-direction: column; align-items: flex-start; }
    .sch-grid   { grid-template-columns: 1fr; }
    .sch-stats4 { grid-template-columns: 1fr 1fr; }
  }
`;

/* ── Sample data ─────────────────────────────────────────────── */
const SCHOLARSHIPS = [
  {
    name: "Reliance Foundation UG Scholarship",
    provider: "Reliance Foundation",
    providerLogo: "🏛️",
    amount: "₹4,00,000",
    amountNote: "one-time",
    category: "Merit",
    eligibility: [
      "Indian Citizen",
      "CGPA ≥ 8.0",
      "Family Income < ₹15 LPA",
      "Year 1 or 2 UG Student",
    ],
    deadline: "Oct 5, 2025",
    renewability: "One-time",
    level: "UG",
    country: "India",
    fields: ["Engineering", "Science", "Humanities", "Commerce"],
    totalAwarded: "₹40Cr+",
    applicants: "50,000+",
    acceptance: "1.2%",
    featured: true,
    urgent: false,
  },
  {
    name: "Microsoft Research PhD Fellowship",
    provider: "Microsoft Research",
    providerLogo: "🪟",
    amount: "$42,000",
    amountNote: "per year",
    category: "Research",
    eligibility: [
      "PhD Candidate (Year 1–3)",
      "US/Canada/Mexico University",
      "CS, EE or Related Field",
    ],
    deadline: "Sep 30, 2025",
    renewability: "Annual",
    level: "PhD",
    country: "USA / Canada",
    fields: ["Computer Science", "Electrical Engineering", "HCI"],
    totalAwarded: "$12M+",
    applicants: "2,500+",
    acceptance: "3%",
    featured: false,
    urgent: false,
  },
  {
    name: "Aditya Birla Scholarship",
    provider: "Aditya Birla Group",
    providerLogo: "🌟",
    amount: "₹1,80,000",
    amountNote: "per year",
    category: "Merit",
    eligibility: [
      "IIT / IIM / BITS / NLSIU Student",
      "Top 20 in Merit List",
      "Indian National",
    ],
    deadline: "Aug 25, 2025",
    renewability: "Annual",
    level: "UG",
    country: "India",
    fields: ["Engineering", "Law", "Management", "Design"],
    totalAwarded: "₹20Cr+",
    applicants: "18,000+",
    acceptance: "0.5%",
    featured: false,
    urgent: true,
  },
  {
    name: "Chevening Scholarship",
    provider: "UK Government / FCDO",
    providerLogo: "🇬🇧",
    amount: "Full Tuition",
    amountNote: "+ Living Stipend",
    category: "Merit",
    eligibility: [
      "Work Experience 2+ Years",
      "Indian Citizen",
      "Return to India after degree",
      "IELTS 6.5+",
    ],
    deadline: "Nov 5, 2025",
    renewability: "One-time",
    level: "PG",
    country: "United Kingdom",
    fields: ["All Disciplines"],
    totalAwarded: "$200M+",
    applicants: "65,000+",
    acceptance: "2.1%",
    featured: false,
    urgent: false,
  },
];

const FILTERS = ["All", "Merit", "Need-Based", "Research", "Diversity"];

/* ── Component ───────────────────────────────────────────────── */
export default function ScholarshipsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = SCHOLARSHIPS.filter((s) => {
    if (activeFilter === "All") return true;
    return s.category === activeFilter;
  });

  return (
    <>
      <style>{SECTION_CSS}</style>

      <section id="scholarships" className="sch-section">
        <div className="sch-section-inner">
          {/* Label */}
          <div className="sec-label">Phase_03 // Scholarships</div>

          {/* Header */}
          <div className="sch-header">
            <div>
              <h2 className="sch-h2">Fund your education.</h2>
              <p className="sch-sub">₹500Cr+ in scholarships listed. Filter by category, country, and study level to find your perfect match.</p>
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

          {/* Stats 4-up */}
          <div className="sch-stats4">
            {[
              { val: "1,200+", lbl: "Active Scholarships" },
              { val: "₹500Cr+", lbl: "Total Funding" },
              { val: "92",     lbl: "Countries" },
              { val: "48h",    lbl: "Avg. Listing Update" },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="stat-box">
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="sch-grid">
            {filtered.length > 0 ? (
              filtered.map((s, i) => (
                <ScholarshipCard
                  key={i}
                  {...s}
                  onApply={() => alert(`Applying for ${s.name}`)}
                />
              ))
            ) : (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem", color: "var(--dim)" }}>
                <div className="mono" style={{ fontSize: ".75rem", marginBottom: ".5rem" }}>No scholarships found</div>
                <button className="fpill" onClick={() => setActiveFilter("All")}>Clear filter</button>
              </div>
            )}
          </div>

          {/* Load more */}
          <div className="sch-load-more">
            <button className="btn-ghost">Browse All Scholarships →</button>
          </div>
        </div>
      </section>
    </>
  );
}