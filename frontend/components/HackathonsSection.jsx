import HackathonCard from "../components/HackathonCard";

const HACKATHONS = [
  {
    title: "Smart India Hackathon 2025",
    organizer: "Ministry of Education, Govt. of India",
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
    tags: ["Cloud", "Android", "Sustainability", "UN Goals"],
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
    tags: ["Open Source", "Web", "Gaming", "AI"],
    deadline: "Oct 6, 2025",
    registered: 22000,
    capacity: 0,
    logo: "🌐",
    featured: false,
  },
];

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="hx-section">
      <style>{`
        .hx-section {
          padding: 6rem 0;
          background: #0a0a0b;
          border-top: 1px solid #27272a;
          font-family: 'Geist', sans-serif;
        }
        .hx-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 1.5rem;
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
        .hx-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        .hx-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 600;
          letter-spacing: -.04em;
          color: #f4f4f5;
          line-height: 1.1;
        }
        .hx-subtitle {
          color: #a1a1aa;
          margin-top: .75rem;
          max-width: 32rem;
          line-height: 1.6;
        }
        .hx-filters {
          display: flex;
          gap: .5rem;
          flex-wrap: wrap;
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
        .hx-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 3rem;
          border: 1px solid #27272a;
          background: #111113;
          padding: 1.25rem;
          clip-path: polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 0 100%);
        }
        @media (max-width: 768px) {
          .hx-stats-bar {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .hx-stat-item {
          text-align: center;
        }
        .hx-stat-val {
          font-size: 1.25rem;
          font-weight: 700;
          color: #f4f4f5;
          letter-spacing: -.03em;
        }
        .hx-stat-label {
          font-family: 'Geist Mono', monospace;
          font-size: .5rem;
          color: #52525b;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-top: .25rem;
        }
        .hx-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
        }
        .hx-load-more {
          text-align: center;
          margin-top: 2.5rem;
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

      <div className="hx-container">
        <div className="sec-label">Phase_01 // Hackathons</div>
        
        <div className="hx-header-flex">
          <div>
            <h2 className="hx-title">Compete. Build. Win.</h2>
            <p className="hx-subtitle">
              Hand-picked hackathons from top organizations across the globe.
            </p>
          </div>
          <div className="hx-filters">
            {["All", "Online", "Offline", "Beginner", "Advanced"].map((f, i) => (
              <button key={f} className={`filter-pill ${i === 0 ? "active" : ""}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="hx-stats-bar">
          {[
            { label: "Live Hackathons", value: "142" },
            { label: "Total Prizes", value: "$4.2M+" },
            { label: "Countries", value: "58" },
            { label: "Teams", value: "1.2M+" },
          ].map((stat) => (
            <div key={stat.label} className="hx-stat-item">
              <div className="hx-stat-val">{stat.value}</div>
              <div className="hx-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Hackathon Cards */}
        <div className="hx-card-grid">
          {HACKATHONS.map((hack, i) => (
            <HackathonCard key={i} {...hack} onApply={() => alert(`Registering for ${hack.title}`)} />
          ))}
        </div>

        {/* Load More */}
        <div className="hx-load-more">
          <button className="cta-ghost cta-btn">Load More Hackathons →</button>
        </div>
      </div>
    </section>
  );
}