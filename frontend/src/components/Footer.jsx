/* ── Footer-specific CSS ─────────────────────────────────────── */
const FOOTER_CSS = `
  .footer-root {
    border-top: 1px solid var(--border);
    background: #080809;
    padding: 4rem 0 2rem;
  }
  .footer-inner { max-width: 84rem; margin: 0 auto; padding: 0 1.5rem; }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    gap: 2.5rem; margin-bottom: 4rem;
  }
  .footer-brand { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
  .footer-brand-name { font-weight: 700; font-size: 1.1rem; letter-spacing: -.04em; color: var(--muted); text-transform: uppercase; }
  .footer-desc { color: var(--dim); font-size: .875rem; line-height: 1.6; max-width: 20rem; }
  .footer-socials { display: flex; gap: .625rem; margin-top: 1.25rem; }
  .footer-social-btn {
    width: 2rem; height: 2rem; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Geist Mono', monospace; font-size: .5rem; font-weight: 700;
    color: var(--dim); text-decoration: none;
    transition: all .2s;
  }
  .footer-social-btn:hover { color: var(--accent); border-color: rgba(176,38,255,.4); }
  .footer-col-title {
    font-family: 'Geist Mono', monospace; font-size: .5625rem;
    text-transform: uppercase; letter-spacing: .15em; color: var(--dim);
    margin-bottom: 1rem;
  }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: .625rem; }
  .footer-link  { color: var(--dim); text-decoration: none; font-size: .875rem; transition: color .2s; }
  .footer-link:hover { color: var(--muted); }
  .footer-bottom {
    border-top: 1px solid var(--border); padding-top: 1.5rem;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;
  }
  .footer-status {
    font-family: 'Geist Mono', monospace; font-size: .5rem;
    text-transform: uppercase; letter-spacing: .15em; color: var(--faint);
    display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  }
  .footer-status-dot {
    width: 5px; height: 5px; border-radius: 50%; background: #22c55e;
    animation: blink 2.5s infinite;
  }
  @media (max-width: 900px) {
    .footer-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 540px) {
    .footer-grid { grid-template-columns: 1fr; }
  }
`;

const LINKS = {
  Platform:  ["Hackathons", "Internships", "Scholarships", "Leaderboard"],
  Company:   ["About Us", "Blog", "Careers", "Press Kit"],
  Resources: ["Documentation", "API", "Partner with Us", "Feedback"],
  Legal:     ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const SOCIALS = [
  { letter: "Tw", label: "Twitter" },
  { letter: "Li", label: "LinkedIn" },
  { letter: "Di", label: "Discord" },
  { letter: "Gh", label: "GitHub" },
];

/* ── Footer component ────────────────────────────────────────── */
export default function Footer() {
  return (
    <>
      <style>{FOOTER_CSS}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* Brand column */}
            <div>
              <div className="footer-brand">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 2L12 22L22 2H16L12 10L8 2H2Z" fill="#52525b" />
                </svg>
                <span className="footer-brand-name">HackXplore</span>
              </div>
              <p className="footer-desc">
                India's #1 platform to discover hackathons, internships, and scholarships. Built for builders, by builders.
              </p>
              <div className="footer-socials">
                {SOCIALS.map(({ letter, label }) => (
                  <a key={label} href="#" className="footer-social-btn" title={label}>
                    {letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([group, items]) => (
              <div key={group}>
                <div className="footer-col-title">{group}</div>
                <ul className="footer-links">
                  {items.map((item) => (
                    <li key={item}>
                      <a href="#" className="footer-link">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <div className="footer-status">
              <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                <span className="footer-status-dot" />
                SYSTEM NOMINAL
              </span>
              <span>|</span>
              <span>© 2025 HackXplore Platform</span>
            </div>
            <div className="footer-status">Made with ♥ in India</div>
          </div>
        </div>
      </footer>
    </>
  );
}