import { useEffect, useRef } from "react";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 150 };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleMouseOut = () => { mouse.x = undefined; mouse.y = undefined; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("resize", setSize);
    setSize();

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x; this.y = y; this.dx = dx; this.dy = dy;
        this.size = size; this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        const { width: w, height: h } = canvas;
        if (this.x > w || this.x < 0) this.dx *= -1;
        if (this.y > h || this.y < 0) this.dy *= -1;
        this.x += this.dx;
        this.y += this.dy;
        if (mouse.x != null) {
          const dxm = mouse.x - this.x, dym = mouse.y - this.y;
          if (Math.sqrt(dxm * dxm + dym * dym) < mouse.radius) {
            this.x -= dxm * 0.01;
            this.y -= dym * 0.01;
          }
        }
        this.draw();
      }
    }

    const initParticles = () => {
      particlesArray = [];
      const count = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = (Math.random() - 0.5) * 0.5;
        const dy = (Math.random() - 0.5) * 0.5;
        const color = Math.random() > 0.8 ? "#b026ff" : "#27272a";
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
      }
    };

    const connect = () => {
      const w = canvas.width, h = canvas.height;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dist =
            (particlesArray[a].x - particlesArray[b].x) ** 2 +
            (particlesArray[a].y - particlesArray[b].y) ** 2;
          if (dist < (w / 7) * (h / 7)) {
            const opacity = (1 - dist / 20000) * 0.12;
            ctx.strokeStyle = `rgba(176,38,255,${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((p) => p.update());
      connect();
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <section id="home" className="hx-hero">
      <style>{`
        .hx-hero {
          position: relative;
          min-height: 95vh;
          display: flex;
          align-items: center;
          padding: 8rem 0 6rem;
          overflow: hidden;
          font-family: 'Geist', sans-serif;
        }
        .hx-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .4;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        .hx-container {
          max-width: 84rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
          width: 100%;
        }
        .hx-content {
          max-width: 55rem;
        }
        
        /* Typography & Utilities */
        .mono { font-family: 'Geist Mono', monospace; }
        .grad-text {
          background: linear-gradient(90deg, #b026ff, #ff26b9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        
        /* Hero Specific Elements */
        .hx-badge {
          color: #b026ff;
          border-color: rgba(176,38,255,.25);
          background: rgba(176,38,255,.05);
          margin-bottom: 2rem;
          clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
        }
        .hx-h1 {
          font-size: clamp(3.5rem, 7.5vw, 7rem);
          font-weight: 700;
          letter-spacing: -.04em;
          line-height: 1.02;
          color: #f4f4f5;
          margin-bottom: 1.5rem;
        }
        .hx-p {
          font-size: clamp(1.125rem, 1.5vw, 1.375rem);
          color: #a1a1aa;
          max-width: 38rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .hx-ctas {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 4rem;
        }
        
        /* Buttons & Links */
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
        .hx-link {
          display: flex;
          align-items: center;
          gap: .75rem;
          color: #a1a1aa;
          text-decoration: none;
          font-weight: 500;
          font-size: .9375rem;
          transition: color .2s;
        }
        .hx-link:hover { color: #f4f4f5; }
        .hx-link span {
          width: 2rem;
          height: 1px;
          background: #27272a;
          display: inline-block;
        }

        /* Stats Grid */
        .hx-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 28rem;
        }
        .hx-stat-val {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f4f4f5;
          letter-spacing: -.03em;
        }
        .hx-stat-label {
          font-family: 'Geist Mono', monospace;
          font-size: .5625rem;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-top: .25rem;
        }

        /* Animations */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(1rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up .6s cubic-bezier(.16, 1, .3, 1) both; }
        .delay-1 { animation-delay: .1s; }
        .delay-2 { animation-delay: .2s; }
        .delay-3 { animation-delay: .3s; }
        .delay-4 { animation-delay: .4s; }
      `}</style>

      <canvas ref={canvasRef} className="hx-canvas" />

      <div className="hx-container">
        <div className="hx-content">
          
          {/* Badge */}
          <div className="badge hx-badge fade-up">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#b026ff" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            ⚡ Platform v3.0 — Now Live
          </div>

          {/* Headline */}
          <h1 className="hx-h1 fade-up delay-1">
            Discover. Connect.<br />
            <span className="grad-text">Hack. Grow.</span>
          </h1>

          {/* Subheadline */}
          <p className="hx-p fade-up delay-2">
            Your one-stop platform to discover world-class hackathons, internships, and scholarships. Built for students and builders who refuse to wait.
          </p>

          {/* CTAs */}
          <div className="hx-ctas fade-up delay-3">
            <a href="#hackathons" className="cta-btn">
              Explore Opportunities →
            </a>
            <a href="#metrics" className="hx-link">
              <span /> View Live Stats
            </a>
          </div>

          {/* Stats Row */}
          <div className="hx-stats fade-up delay-4">
            {[
              { val: "2,840+", label: "Opportunities" },
              { val: "180+", label: "Countries" },
              { val: "$4.2M+", label: "Prize Money" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="hx-stat-val">{val}</div>
                <div className="hx-stat-label">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}