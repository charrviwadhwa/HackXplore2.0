import InternshipCard from "../components/InternshipCard";

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

export default function InternshipsSection() {
  return (
    <section id="internships" style={{ padding: "6rem 0", background: "#0c0c0e", borderTop: "1px solid #27272a", fontFamily: "'Geist', sans-serif" }}>
      <style>{`
        .mono {
          font-family: 'Geist Mono', monospace;
        }
        .sec-label {
          display: flex;
          align-items: center;
          gap: .75rem;
          font-family: 'Geist Mono', monospace;
          font-size: .6875rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-bottom: 1.5rem;
        }
        .sec-label::before {
          content: '';
          display: block;
          width: 1.5rem;
          height: 1px;
          background: #b026ff;
        }
        .filter-pill {
          font-family: 'Geist Mono', monospace;
          font-size: .625rem;
          text-transform: uppercase;
          letter-spacing: .1em;
          padding: .375rem .875rem;
          border: 1px solid #27272a;
          color: #71717a;
          cursor: pointer;
          transition: all .2s;
          background: transparent;
        }
        .filter-pill:hover, .filter-pill.active {
          border-color: rgba(176,38,255,.5);
          color: #b026ff;
          background: rgba(176,38,255,.05);
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(90deg, #b026ff, #ff26b9);
          color: #0a0a0b;
          font-family: 'Geist', sans-serif;
          font-weight: 600;
          font-size: .875rem;
          letter-spacing: .05em;
          text-transform: uppercase;
          padding: .875rem 2rem;
          border: none;
          cursor: pointer;
          transition: opacity .2s;
          clip-path: polygon(0 0, calc(100% - .625rem) 0, 100% .625rem, 100% 100%, .625rem 100%, 0 calc(100% - .625rem));
        }
        .cta-btn:hover {
          opacity: .88;
        }
        .cta-ghost {
          background: transparent;
          border: 1px solid #27272a;
          color: #a1a1aa;
        }
        .cta-ghost:hover {
          border-color: rgba(176,38,255,.5);
          color: #b026ff;
          clip-path: polygon(0 0, calc(100% - .625rem) 0, 100% .625rem, 100% 100%, .625rem 100%, 0 calc(100% - .625rem));
        }
      `}</style>

      <div style={{ maxWidth: "84rem", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Header */}
        <div className="sec-label">Phase_02 // Internships</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "2rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 600, letterSpacing: "-.04em", color: "#f4f4f5", lineHeight: 1.1 }}>
              Real work. Real impact.
            </h2>
            <p style={{ color: "#a1a1aa", marginTop: ".75rem", maxWidth: "32rem", lineHeight: 1.6 }}>
              Curated internship opportunities at top startups, MNCs, and research labs. Stipend-first.
            </p>
          </div>
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
            {["All Roles", "Remote", "Research", "Paid Only", "PPO"].map((f, i) => (
              <button key={f} className={`filter-pill ${i === 0 ? "active" : ""}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div style={{
          marginBottom: "2rem", border: "1px solid rgba(176,38,255,.2)", background: "linear-gradient(90deg, rgba(176,38,255,.05), transparent)",
          padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
          clipPath: "polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 0 100%)", flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🔥</span>
            <div>
              <p style={{ color: "#f4f4f5", fontWeight: 600, fontSize: ".9375rem" }}>Summer 2025 Internship Season is LIVE</p>
              <p className="mono" style={{ color: "#71717a", fontSize: ".625rem", marginTop: ".25rem" }}>240+ companies actively hiring interns right now</p>
            </div>
          </div>
          <button className="mono" style={{
            fontSize: ".625rem", textTransform: "uppercase", letterSpacing: ".1em", color: "#b026ff",
            border: "1px solid rgba(176,38,255,.4)", padding: ".5rem 1rem", background: "transparent", cursor: "pointer", whiteSpace: "nowrap"
          }}>
            Browse All →
          </button>
        </div>

        {/* Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1rem" }}>
          {INTERNSHIPS.map((internship, i) => (
            <InternshipCard
              key={i}
              {...internship}
              onApply={() => alert(`Applying for ${internship.role} at ${internship.company}`)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button className="cta-ghost cta-btn">
            View All 840+ Internships →
          </button>
        </div>

      </div>
    </section>
  );
}