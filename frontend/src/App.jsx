import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HackathonsSection from "../components/HackathonsSection";
import InternshipsSection from "../components/InternshipsSection";
import ScholarshipsSection from "../components/ScholarshipsSection";
import Footer from "../components/Footer";

/* ─── Reveal-on-Scroll hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("active")),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Dashboard Live Feed ─────────────────────────────────────── */
function DashFeed() {
  const LOGS = [
    "New hackathon listed: HackMIT 2025 — $50,000 prize",
    "3 internships added at Google DeepMind",
    "Chevening 2025 deadline updated → Nov 5",
    "Alert: Smart India Hackathon is 70% full",
    "New scholarship: PM YASASVI Fellowship",
    "Razorpay hiring 12 SDE interns this cycle",
  ];
  const [feed, setFeed] = useState(LOGS.slice(0, 5));

  useEffect(() => {
    const id = setInterval(() => {
      const msg = LOGS[Math.floor(Math.random() * LOGS.length)];
      const time = new Date().toLocaleTimeString("en-US", { hour12: false });
      setFeed((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 4)]);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex-1 p-4 font-mono text-[0.6875rem] space-y-3 overflow-hidden">
      {feed.map((line, i) => (
        <div key={i} className={`transition-opacity duration-500 ${i === 0 ? "text-[#b026ff]" : "text-zinc-500"} truncate`}>
          {line}
        </div>
      ))}
    </div>
  );
}

/* ─── Stats / Metrics Section ────────────────────────────────── */
function MetricsSection() {
  return (
    <section className="border-t border-zinc-800 bg-[#0a0a0b] overflow-hidden" id="metrics">
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-zinc-700" />
          <span className="font-mono text-[0.6875rem] text-zinc-500 uppercase tracking-[0.15em]">
            Phase_00 // Live Intelligence Dashboard
          </span>
        </div>
        <div className="font-mono text-[0.625rem] text-zinc-700">SYS_UI // 60FPS</div>
      </div>

      <div className="reveal max-w-[95vw] mx-auto border border-b-0 border-zinc-800 bg-[#111113] rounded-t-xl overflow-hidden shadow-[0_-20px_50px_rgba(176,38,255,0.03)]">
        {/* Window Chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#0a0a0b]">
          <div className="flex gap-2">
            {["bg-zinc-700", "bg-zinc-700", "bg-zinc-700"].map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${c}`} />
            ))}
          </div>
          <div className="font-mono text-[0.6875rem] text-zinc-400 flex items-center gap-2 bg-[#111113] px-3 py-1 rounded-sm border border-zinc-800">
            🔒 HackXplore.core / command-center
          </div>
          <div className="w-12" />
        </div>

        {/* Dashboard Body */}
        <div className="grid grid-cols-1 lg:grid-cols-[14rem_1fr_20rem] h-[35rem]">
          {/* Sidebar */}
          <div className="hidden lg:block border-r border-zinc-800 bg-[#0a0a0b] p-4 font-mono text-[0.75rem]">
            <div className="text-zinc-100 mb-6 flex items-center gap-2">📊 Overview</div>
            {[
              { icon: "🏆", label: "Hackathons", active: false },
              { icon: "💼", label: "Internships", active: true },
              { icon: "🎓", label: "Scholarships", active: false },
              { icon: "📈", label: "Analytics", active: false },
            ].map(({ icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 mb-2 px-2 py-1.5 rounded cursor-pointer ${
                  active
                    ? "text-[#b026ff] bg-[#b026ff]/10"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {icon} {label}
              </div>
            ))}
          </div>

          {/* Chart Area */}
          <div className="p-6 bg-[#0a0a0b] relative"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "1.5rem 1.5rem",
            }}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-lg font-semibold text-zinc-100 tracking-tight">Platform Activity</h3>
                <p className="text-[0.75rem] text-zinc-500 font-mono mt-1">Applications submitted — real time</p>
              </div>
              <div className="flex gap-2">
                {["1H", "24H", "7D"].map((t, i) => (
                  <span key={t}
                    className={`px-2 py-1 font-mono text-[0.625rem] rounded ${
                      i === 0 ? "bg-zinc-800 text-zinc-100" : "border border-zinc-800 text-zinc-500"
                    }`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-48 border-b border-l border-zinc-800 mb-6 flex items-end justify-between px-2 pb-1 gap-1">
              {[30, 45, 25, 60, 55, 80, 40, 70, 65, 35, 95, 50].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-colors ${
                    i === 10
                      ? "bg-[#b026ff] shadow-[0_0_15px_rgba(176,38,255,0.3)]"
                      : i === 5
                      ? "bg-[#b026ff]/60"
                      : "bg-zinc-800 hover:bg-[#b026ff]/40"
                  }`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {/* Mini Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Applications Today", value: "8,412" },
                { label: "New Listings", value: "142" },
                { label: "Avg. Response Time", value: "0.3s", accent: true },
              ].map(({ label, value, accent }) => (
                <div key={label} className="bg-[#111113] border border-zinc-800 p-3 rounded-md">
                  <div className="font-mono text-[0.625rem] text-zinc-500 mb-1">{label}</div>
                  <div className={`text-lg font-medium ${accent ? "text-[#b026ff]" : "text-zinc-100"}`}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Feed */}
          <div className="hidden lg:flex flex-col border-l border-zinc-800 bg-[#0a0a0b]">
            <div className="p-4 border-b border-zinc-800 font-mono text-[0.75rem] text-zinc-100">
              🟢 Live Platform Feed
            </div>
            <DashFeed />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─────────────────────────────────────────────── */
function CTASection() {
  const [email, setEmail] = useState("");

  return (
    <section id="apply" className="py-24 border-t border-zinc-800 bg-[#0c0c0e] relative overflow-hidden">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[40rem] h-[20rem] bg-[#b026ff] opacity-[0.03] blur-[100px] pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[#b026ff] px-3 py-1.5 mb-8 border border-[#b026ff]/30 bg-[#b026ff]/5"
          style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
          🚀 Early Access Open
        </div>

        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-zinc-100 mb-4 leading-tight" style={{ letterSpacing: "-0.04em" }}>
          Never miss an opportunity.
        </h2>
        <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
          Get personalized alerts for hackathons, internships, and scholarships matching your profile. Weekly digest. Zero spam.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="yourname@college.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#0a0a0b] border border-zinc-800 text-zinc-100 text-base px-5 py-4 focus:border-[#b026ff] focus:outline-none transition-colors placeholder:text-zinc-700"
          />
          <button
            onClick={() => email && alert(`🎉 You're on the list: ${email}`)}
            className="px-8 py-4 text-[0.9375rem] font-semibold text-[#0a0a0b] bg-gradient-to-r from-[#b026ff] to-[#ff26b9] hover:opacity-90 transition-opacity uppercase tracking-wider whitespace-nowrap"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            Get Alerts →
          </button>
        </div>
        <p className="font-mono text-[0.625rem] text-zinc-700 mt-4 uppercase tracking-widest">
          Join 42,000+ students already getting alerts
        </p>
      </div>
    </section>
  );
}

/* ─── Root App ────────────────────────────────────────────────── */
export default function App() {
  useReveal();

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 overflow-x-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      <main className="pt-[6rem]">
        <Hero />
        <MetricsSection />
        <HackathonsSection />
        <InternshipsSection />
        <ScholarshipsSection />
        <CTASection />
      </main>

      <Footer />

      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300..700&family=Geist:wght@300..700&display=swap');
        
        * { box-sizing: border-box; }
        
        body {
          font-family: 'Geist', -apple-system, sans-serif;
          background-color: #0a0a0b;
          -webkit-font-smoothing: antialiased;
        }
        
        .font-mono { font-family: 'Geist Mono', monospace; }

        ::selection { background: #b026ff; color: #0a0a0b; }

        .reveal {
          opacity: 0;
          transform: translateY(1.5rem);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0b; }
        ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }
        ::-webkit-scrollbar-thumb:hover { background: #b026ff; }
      `}</style>
    </div>
  );
}
