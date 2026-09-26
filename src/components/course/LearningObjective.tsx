"use client";

import React from "react";

interface LearningObjectiveProps {
  outcomes?: string[];
}

const defaultOutcomes = [
  "Build full-stack modern web applications from scratch using enterprise standards.",
  "Master component architecture, client & server component boundaries, and performance optimization.",
  "Implement secure user authentication, role-based access control, and API route protection.",
  "Design responsive, accessible, and visually stunning user interfaces using modern CSS frameworks.",
  "Integrate database systems, state management, and real-time asynchronous API polling.",
  "Deploy high-performance web solutions on edge and cloud platforms with automated CI/CD pipelines.",
];

export const LearningObjective: React.FC<LearningObjectiveProps> = ({ outcomes }) => {
  const items = outcomes && outcomes.length > 0 ? outcomes : defaultOutcomes;

  return (
    <div className="rounded-2xl border border-[#7F265B]/15 bg-gradient-to-br from-white via-pink-50/20 to-[#7F265B]/5 p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F265B] text-white shadow-md shadow-[#7F265B]/20">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">What You'll Learn</h3>
          <p className="text-sm text-slate-500">Key competencies and practical skills gained</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((outcome, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white/80 p-3.5 transition-all duration-200 hover:border-[#7F265B]/30 hover:bg-white hover:shadow-sm"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7F265B]/10 text-[#7F265B]">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <span className="text-sm font-medium text-slate-700 leading-relaxed">{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningObjective;
