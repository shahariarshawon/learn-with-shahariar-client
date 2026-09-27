"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

export const Companies: React.FC = () => {
  const companies = [
    { name: "Google", icon: "🌐" },
    { name: "Microsoft", icon: "💻" },
    { name: "Amazon AWS", icon: "☁️" },
    { name: "Meta", icon: "∞" },
    { name: "Stripe", icon: "💳" },
    { name: "Netflix", icon: "🎬" },
    { name: "Vercel", icon: "▲" },
    { name: "Uber", icon: "🚗" },
  ];

  const highlights = [
    "100% Project-Based Curriculum",
    "Real-World Code Reviews",
    "Verified Digital Certificates",
    "Lifetime Community Access",
  ];

  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 border-y border-slate-100 bg-slate-50/60">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Trusted by developers and alumni working at top technology companies
        </p>

        {/* Company Logo Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {companies.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-2 text-slate-700 font-extrabold text-sm sm:text-base tracking-tight hover:text-[#7F265B] transition-colors"
            >
              <span className="text-xl sm:text-2xl">{c.icon}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>

        {/* Value Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-semibold text-slate-600">
          {highlights.map((h) => (
            <div key={h} className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
