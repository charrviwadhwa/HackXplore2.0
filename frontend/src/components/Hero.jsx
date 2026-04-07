import { useEffect, useRef } from "react";

/* ── Hero-specific styles ────────────────────────────────────── */
/* ── Hero-specific styles ────────────────────────────────────── */
const HERO_CSS = `
  .hero-section {
    position: relative;
    min-height: 95vh;
    display: flex;
    align-items: center;
    padding: 8rem 0 6rem;
    overflow: hidden;
  }
  #hero-canvas {
    position: absolute; inset: 0; z-index: 0;
    pointer-events: none; opacity: .4;
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }
  .hero-inner {
    margin: 0 auto;
    padding: 0; /* Kept at 0 from your previous fix */
    position: relative; z-index: 10; width: 100%;
  }
  .hero-content { 
      max-width: 55rem; 
      margin: 0 auto;              
      text-align: center;          
      display: flex;               
      flex-direction: column;      
      align-items: center;         
      /* CHANGE THIS: Increased from -8vh to -15vh to push it much higher */
      transform: translateY(-15vh); 
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'Geist Mono', monospace;
    font-size: .6875rem; text-transform: uppercase; letter-spacing: .1em;
    color: var(--accent);
    padding: .35rem .875rem; margin-bottom: 2rem;
    border: 1px solid rgba(176,38,255,.25);
    background: rgba(176,38,255,.05);
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px));
  }
  .hero-h1 {
    /* CHANGE THIS: Lowered the clamp values to make the title smaller */
    font-size: clamp(2.5rem, 5.5vw, 5rem); 
    font-weight: 700; letter-spacing: -.04em; line-height: 1.02;
    color: var(--text); margin-bottom: 1.5rem;
  }
  .hero-sub {
    /* CHANGE THIS: Lowered the clamp values to make the paragraph smaller */
    font-size: clamp(0.875rem, 1.2vw, 1.125rem); 
    color: var(--muted); max-width: 38rem; line-height: 1.6;
    margin-bottom: 2.5rem;
  }
  .hero-ctas {
    display: flex; gap: 1.25rem; align-items: center;
    justify-content: center; /* Centers the buttons row */
    flex-wrap: wrap; margin-bottom: 4rem;
  }
  .hero-ghost-link {
    display: flex; align-items: center; gap: .75rem;
    color: var(--muted); text-decoration: none;
    font-weight: 500; font-size: .9375rem;
    transition: color .2s;
  }
  .hero-ghost-link:hover { color: var(--text); }
  .hero-ghost-link:hover .ghost-line { background: var(--accent); }
  .ghost-line {
    width: 2rem; height: 1px; background: var(--border);
    display: inline-block; transition: background .2s;
  }
  .hero-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2rem; max-width: 28rem;
    margin: 0 auto; /* Centers the stats grid */
  }
  .hero-stat-val {
    font-size: 1.5rem; font-weight: 700; color: var(--text);
    letter-spacing: -.03em;
  }
  .hero-stat-lbl {
    font-family: 'Geist Mono', monospace; font-size: .5rem;
    color: var(--dim); text-transform: uppercase; letter-spacing: .15em;
    margin-top: .25rem;
  }
`;

/* ── Canvas particle system ──────────────────────────────────── */
function useParticleCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    const mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseOut  = () => { mouse.x = null; mouse.y = null; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseout", onMouseOut);
    resize();

    class Particle {
      constructor() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - .5) * .45;
        this.vy = (Math.random() - .5) * .45;
        this.r  = Math.random() * 1.5 + .5;
        this.color = Math.random() > .8 ? "#b026ff" : "#27272a";
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        const { width: w, height: h } = canvas;
        if (this.x > w || this.x < 0) this.vx *= -1;
        if (this.y > h || this.y < 0) this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
        if (mouse.x != null) {
          const dx = mouse.x - this.x, dy = mouse.y - this.y;
          if (Math.sqrt(dx * dx + dy * dy) < 150) {
            this.x -= dx * .01;
            this.y -= dy * .01;
          }
        }
        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const count = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const connect = () => {
      const W = canvas.width, H = canvas.height;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const d = (particles[a].x - particles[b].x) ** 2 + (particles[a].y - particles[b].y) ** 2;
          if (d < (W / 7) * (H / 7)) {
            ctx.strokeStyle = `rgba(176,38,255,${(1 - d / 20000) * .1})`;
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      connect();
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);
}

/* ── Hero component ──────────────────────────────────────────── */
export default function Hero() {
  const canvasRef = useRef(null);
  useParticleCanvas(canvasRef);

  return (
    <>
      <style>{HERO_CSS}</style>

      <section className="hero-section" id="home">
        <canvas ref={canvasRef} id="hero-canvas" />

        <div className="hero-inner">
          <div className="hero-content">
            {/* Badge */}
            <div className="hero-badge fade-up">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#b026ff" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Platform v3.0 — Now Live
            </div>

            {/* H1 */}
            <h1 className="hero-h1 fade-up d-1">
              Discover. Connect.<br />
              <span className="grad-text">Hack. Grow.</span>
            </h1>

            {/* Subheading */}
            <p className="hero-sub fade-up d-2">
              Your one-stop platform to discover world-class hackathons, internships, and scholarships. Built for students and builders who refuse to wait.
            </p>

            {/* CTAs */}
            <div className="hero-ctas fade-up d-3">
              <a href="#hackathons" className="btn-solid">
                Explore Opportunities →
              </a>
              <a href="#metrics" className="hero-ghost-link">
                <span className="ghost-line" />
                View Live Stats
              </a>
            </div>

            {/* Stats */}
            <div className="hero-stats fade-up d-4">
              {[
                { val: "2,840+", lbl: "Opportunities" },
                { val: "180+",   lbl: "Countries" },
                { val: "$4.2M+", lbl: "Prize Money" },
              ].map(({ val, lbl }) => (
                <div key={lbl}>
                  <div className="hero-stat-val">{val}</div>
                  <div className="hero-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}