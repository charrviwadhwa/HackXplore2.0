import { useState } from "react";
import ScholarshipCard from "./ScholarshipCard"; // Make sure to import your existing card

// Extracted from your HTML script
const SCHOLARSHIPS_DATA = [
  {
    id: 1,
    name: "Reliance Foundation UG Scholarship",
    provider: "Reliance Foundation",
    providerLogo: "🏛️",
    amount: "₹4,00,000",
    amountNote: "one-time",
    category: "Merit",
    eligibility: ["Indian Citizen", "CGPA ≥ 8.0", "Family Income < ₹15 LPA", "Year 1–2 UG Student"],
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
    id: 2,
    name: "Microsoft Research PhD Fellowship",
    provider: "Microsoft Research",
    providerLogo: "🪟",
    amount: "$42,000",
    amountNote: "per year",
    category: "Research",
    eligibility: ["PhD Candidate (Year 1–3)", "US/Canada University", "CS or EE Field"],
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
    id: 3,
    name: "Aditya Birla Scholarship",
    provider: "Aditya Birla Group",
    providerLogo: "🌟",
    amount: "₹1,80,000",
    amountNote: "per year",
    category: "Merit",
    eligibility: ["IIT / IIM / BITS / NLSIU Student", "Top 20 Merit List", "Indian National"],
    deadline: "Aug 25, 2025",
    renewability: "Annual",
    level: "UG",
    country: "India",
    fields: ["Engineering", "Law", "Management"],
    totalAwarded: "₹20Cr+",
    applicants: "18,000+",
    acceptance: "0.5%",
    featured: false,
    urgent: true,
  },
  {
    id: 4,
    name: "Chevening Scholarship",
    provider: "UK Government / FCDO",
    providerLogo: "🇬🇧",
    amount: "Full Tuition",
    amountNote: "+ Living Stipend",
    category: "Merit",
    eligibility: ["Work Experience 2+ Years", "Indian Citizen", "Return to India", "IELTS 6.5+"],
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
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Merit", "Need-Based", "Research", "Diversity"];

  const filteredData = SCHOLARSHIPS_DATA.filter((item) => 
    activeFilter === "All" ? true : item.category === activeFilter
  );

  return (
    <section id="scholarships" className="py-24 bg-[#0a0a0b] border-t border-zinc-800">
      <div className="max-w-[84rem] mx-auto px-6">
        
        {/* Section Label */}
        <div className="flex items-center gap-3 font-mono text-[0.6875rem] text-zinc-500 uppercase tracking-[0.15em] mb-6 before:content-[''] before:block before:w-6 before:h-px before:bg-[#b026ff]">
          Phase_03 // Scholarships
        </div>

        {/* Header & Filters */}
        <div className="flex justify-between items-end gap-8 mb-12 flex-wrap">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-zinc-100 leading-[1.1]">
              Fund your education.
            </h2>
            <p className="text-zinc-400 mt-3 max-w-2xl leading-relaxed">
              ₹500Cr+ in scholarships listed. Find your perfect match by category, country, and level.
            </p>
          </div>
          
          {/* Filter Pills */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`font-mono text-[0.625rem] uppercase tracking-widest px-3.5 py-1.5 border transition-all
                  ${activeFilter === filter 
                    ? "border-[#b026ff]/50 text-[#b026ff] bg-[#b026ff]/5" 
                    : "border-zinc-800 text-zinc-500 bg-transparent hover:border-[#b026ff]/50 hover:text-[#b026ff] hover:bg-[#b026ff]/5"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatBox value="1,200+" label="Scholarships" />
          <StatBox value="₹500Cr+" label="Total Funding" />
          <StatBox value="92" label="Countries" />
          <StatBox value="48h" label="Avg. Update" />
        </div>

        {/* Scholarship Cards Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-5">
          {filteredData.map((scholarship) => (
            <ScholarshipCard 
              key={scholarship.id}
              {...scholarship}
              onApply={() => alert(`Applying for ${scholarship.name}`)}
            />
          ))}
        </div>

        {/* Load More / CTA */}
        <div className="text-center mt-10">
          <button 
            className="inline-flex items-center justify-center font-geist font-semibold text-[0.875rem] tracking-wide uppercase px-8 py-3.5 bg-transparent border border-zinc-800 text-zinc-400 cursor-pointer transition-all hover:border-[#b026ff]/50 hover:text-[#b026ff]"
            style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
          >
            Browse All Scholarships →
          </button>
        </div>

      </div>
    </section>
  );
}

// Sub-component for the stats grid to keep the main code clean
function StatBox({ value, label }) {
  return (
    <div 
      className="border border-zinc-800 bg-[#111113] p-4 text-center"
      style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
    >
      <div className="text-[1.2rem] font-bold text-zinc-100 tracking-tight">{value}</div>
      <div className="font-mono text-[0.45rem] text-zinc-500 uppercase tracking-[0.15em] mt-1">
        {label}
      </div>
    </div>
  );
}