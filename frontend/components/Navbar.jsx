import { useState, useEffect } from "react";

export default function Navbar() {
  const [ping, setPing] = useState(12);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 5) + 10);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Internships", href: "#internships" },
    { label: "Scholarships", href: "#scholarships" },
  ];

  return (
    <>
      <style>{`
        .hx-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          backdrop-filter: blur(20px);
          background: rgba(10,10,11,.75);
          border-bottom: 1px solid rgba(39,39,42,0.25);
          font-family: 'Geist', sans-serif;
        }
        .hx-nav-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 4.5rem;
        }
        .hx-logo-wrap {
          display: flex;
          align-items: center;
          gap: .75rem;
        }
        .hx-logo-text {
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: -.04em;
          color: #f4f4f5;
          text-transform: uppercase;
        }
        .hx-desktop-links {
          display: none;
          gap: 2rem;
          font-size: .875rem;
          font-weight: 500;
        }
        .hx-nav-link {
          color: #a1a1aa;
          text-decoration: none;
          transition: color .2s;
          position: relative;
        }
        .hx-nav-link:hover {
          color: #f4f4f5;
        }
        .hx-nav-cta {
          display: flex;
          align-items: center;
          gap: .75rem;
        }
        .hx-desktop-btn {
          display: none;
        }
        .hx-mobile-toggle {
          background: transparent;
          border: none;
          color: #f4f4f5;
          cursor: pointer;
          padding: .5rem;
          display: block;
        }
        
        @media (min-width: 768px) {
          .hx-desktop-links { display: flex; }
          .hx-desktop-btn { display: inline-flex; }
          .hx-mobile-toggle { display: none; }
        }

        .hx-status-bar {
          background: #111113;
          border-bottom: 1px solid #27272a;
          height: 1.5rem;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          overflow: hidden;
        }
        .mono { font-family: 'Geist Mono', monospace; }
        .hx-status-content {
          font-size: .625rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: .15em;
          display: flex;
          gap: 1.5rem;
          white-space: nowrap;
        }
        .hx-status-item {
          display: flex;
          align-items: center;
          gap: .5rem;
        }
        .hx-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b026ff;
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(176,38,255,.4); }
          50% { box-shadow: 0 0 0 6px rgba(176,38,255,0); }
        }

        .hx-mobile-menu {
          background: #0a0a0b;
          border-bottom: 1px solid #27272a;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .hx-mobile-link {
          color: #a1a1aa;
          text-decoration: none;
          font-size: .875rem;
          font-weight: 500;
          transition: color .2s;
        }
        .hx-mobile-link:hover { color: #f4f4f5; }

        /* CTA Button Base Styles */
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
          text-decoration: none;
        }
        .cta-btn:hover { opacity: .88; }
        
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

      <nav className="hx-nav">
        <div className="hx-nav-container">
          {/* Logo */}
          <div className="hx-logo-wrap">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M2 2L12 22L22 2H16L12 10L8 2H2Z" fill="#b026ff" />
            </svg>
            <span className="hx-logo-text">HackXplore</span>
          </div>

          {/* Desktop Links */}
          <div className="hx-desktop-links">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hx-nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hx-nav-cta">
            <a href="#apply" className="hx-desktop-btn" style={{ textDecoration: 'none' }}>
              <ChamferedButton solid style={{ padding: ".6rem 1.5rem", fontSize: ".75rem" }}>
                Explore Now
              </ChamferedButton>
            </a>
            
            <button className="hx-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="hx-status-bar">
          <div className="mono hx-status-content">
            <span className="hx-status-item">
              <span className="hx-pulse-dot" />
              Platform Active
            </span>
            <span style={{ color: "#27272a" }}>|</span>
            <span>Latency: <span id="ping">{ping}</span>ms</span>
            <span style={{ color: "#27272a" }}>|</span>
            <span>Opportunities: 2,840+</span>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="hx-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hx-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

// Re-implemented to map perfectly to your original HTML `.cta-btn` and `.cta-ghost` structure
export function ChamferedButton({ children, solid = false, className = "", style = {}, ...props }) {
  const buttonClass = solid ? "cta-btn" : "cta-btn cta-ghost";
  
  return (
    <button
      {...props}
      className={`${buttonClass} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
}