export default function Footer() {
  return (
    <footer className="hx-footer">
      <style>{`
        .hx-footer {
          border-top: 1px solid #27272a;
          background-color: #080809;
          padding: 4rem 0 2rem;
          font-family: 'Geist', sans-serif;
        }
        .hx-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .hx-flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap; /* Added to ensure it doesn't break on small screens */
          gap: 1rem;
        }
        .hx-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .hx-brand-text {
          font-weight: 700;
          letter-spacing: -0.04em;
          color: #71717a;
          text-transform: uppercase;
        }
        .hx-meta-info {
          font-family: 'Geist Mono', monospace;
          font-size: 0.5625rem;
          color: #3f3f46;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap; /* Prevents text overflow on mobile */
        }
        .hx-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .hx-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #22c55e;
          animation: hx-blink 2s infinite;
        }
        @keyframes hx-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div className="hx-container">
        <div className="hx-flex-between">
          
          {/* Brand Section */}
          <div className="hx-brand">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M2 2L12 22L22 2H16L12 10L8 2H2Z" fill="#71717a" />
            </svg>
            <span className="hx-brand-text">HackXplore</span>
          </div>

          {/* Meta Information Section */}
          <div className="hx-meta-info">
            <span className="hx-status">
              <span className="hx-status-dot" />
              SYSTEM NOMINAL
            </span>
            <span>© 2025 HackXplore</span>
            <span>Made with ♥ in India</span>
          </div>

        </div>
      </div>
    </footer>
  );
}