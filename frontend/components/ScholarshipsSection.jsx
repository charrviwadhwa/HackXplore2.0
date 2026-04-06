import ScholarshipCard from "../components/ScholarshipCard";

const SCHOLARSHIPS = [
  {
    name: "Reliance Foundation UG Scholarship",
    provider: "Reliance Foundation",
    providerLogo: "🏛️",
    amount: "₹4,00,000",
    amountNote: "one-time",
    category: "Merit",
    eligibility: ["Indian Citizen", "CGPA ≥ 8.0", "Family Income < ₹15 LPA", "Year 1 or 2 UG Student"],
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
    eligibility: ["PhD Candidate (Year 1–3)", "US/Canada/Mexico University", "CS, EE or Related Field"],
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
    eligibility: ["IIT / IIM / BITS / NLSIU Student", "Top 20 in Merit List", "Indian National"],
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
    eligibility: ["Work Experience 2+ Years", "Indian Citizen", "Return to India after degree", "IELTS 6.5+"],
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

export default function ScholarshipsSection() {
  return (
    <section id="scholarships" className="py-24 bg-[#0a0a0b] border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#b026ff]" />
            <span className="font-mono text-[0.6875rem] text-zinc-500 uppercase tracking-[0.15em]">
              Phase_03 // Scholarships
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-zinc-100 leading-tight" style={{ letterSpacing: "-0.04em" }}>
                Fund your education.
              </h2>
              <p className="text-zinc-400 mt-3 max-w-lg text-[1rem] leading-relaxed">
                Over ₹500Cr+ in scholarships listed. Filter by category, country, and study level to find your perfect match.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {["All", "Merit", "Need-Based", "Research", "Diversity"].map((f) => (
                <button
                  key={f}
                  className="font-mono text-[0.625rem] uppercase tracking-widest px-3 py-1.5 border border-zinc-800 text-zinc-500 hover:border-[#b026ff]/50 hover:text-[#b026ff] transition-colors first:border-[#b026ff]/50 first:text-[#b026ff]"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "1,200+", label: "Active Scholarships" },
            { value: "₹500Cr+", label: "Total Funding" },
            { value: "92", label: "Countries" },
            { value: "48h", label: "Avg. Listing Update" },
          ].map(({ value, label }) => (
            <div key={label}
              className="border border-zinc-800 bg-[#111113] p-4 text-center"
              style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}>
              <div className="text-xl font-bold text-zinc-100 tracking-tight">{value}</div>
              <div className="font-mono text-[0.5rem] text-zinc-600 uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SCHOLARSHIPS.map((sch, i) => (
            <ScholarshipCard
              key={i}
              {...sch}
              onApply={() => alert(`Applying for ${sch.name}`)}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="font-mono text-sm text-zinc-400 border border-zinc-800 px-8 py-3 hover:border-[#b026ff]/50 hover:text-[#b026ff] transition-colors uppercase tracking-widest">
            Browse All Scholarships →
          </button>
        </div>
      </div>
    </section>
  );
}
