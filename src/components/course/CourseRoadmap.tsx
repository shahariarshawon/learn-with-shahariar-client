"use client";

import React from "react";
import { RoadmapPhase } from "@/types/course.types";

interface CourseRoadmapProps {
  courseTitle?: string;
  roadmap?: RoadmapPhase[];
  completedPhaseIds?: string[];
  onTogglePhase?: (phaseId: string) => void;
}

const defaultRoadmap: RoadmapPhase[] = [
  {
    id: "phase-1",
    phaseNumber: 1,
    title: "Phase 1: Frontend Fundamentals",
    description: "Master modern HTML5 semantics, CSS3 grid & flexbox layouts, and ES6+ JavaScript core concepts.",
    topics: ["HTML5", "CSS3 & Flexbox", "ES6+ JavaScript", "DOM Manipulation", "Git & GitHub"],
  },
  {
    id: "phase-2",
    phaseNumber: 2,
    title: "Phase 2: Modern React & Next.js",
    description: "Build reactive client interfaces, custom hooks, state management, and Next.js 15 App Router pages.",
    topics: ["React 19 Hooks", "Next.js App Router", "Tailwind CSS", "Zustand State", "TanStack React Query"],
  },
  {
    id: "phase-3",
    phaseNumber: 3,
    title: "Phase 3: Backend & API Architecture",
    description: "Design RESTful APIs, Node.js & Express servers, middleware authentication, and database schemas.",
    topics: ["Node.js & Express", "MongoDB & Mongoose", "JWT Auth", "Clerk Authentication", "REST APIs"],
  },
  {
    id: "phase-4",
    phaseNumber: 4,
    title: "Phase 4: Full Stack Integration & Database",
    description: "Connect frontend components to backend endpoints with state synchronization, validation, and security.",
    topics: ["Zod Schema Validation", "Axios Interceptors", "Database Indexing", "Caching", "Form Handling"],
  },
  {
    id: "phase-5",
    phaseNumber: 5,
    title: "Phase 5: Testing, Deployment & Optimization",
    description: "Optimize web vitals, execute TypeScript strict checks, and deploy to Vercel production infrastructure.",
    topics: ["Vercel Edge Deployment", "SEO Best Practices", "Performance Optimization", "CI/CD Pipelines"],
  },
];

export const CourseRoadmap: React.FC<CourseRoadmapProps> = ({
  courseTitle = "Learning Path",
  roadmap,
  completedPhaseIds = [],
  onTogglePhase,
}) => {
  const phases = roadmap && roadmap.length > 0 ? roadmap : defaultRoadmap;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7F265B]">
            <span>Guided Learning Journey</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">{courseTitle} Roadmap</h3>
        </div>
        <div className="rounded-xl bg-[#7F265B]/10 px-3.5 py-1.5 text-xs font-semibold text-[#7F265B] self-start sm:self-auto">
          {phases.length} Learning Phases
        </div>
      </div>

      {/* Visual Roadmap Timeline */}
      <div className="relative space-y-8 before:absolute before:left-5 before:top-3 before:h-[calc(100%-24px)] before:w-0.5 before:bg-gradient-to-b before:from-[#7F265B] before:via-[#7F265B]/40 before:to-slate-200">
        {phases.map((phase, idx) => {
          const isDone = completedPhaseIds.includes(phase.id);

          return (
            <div key={phase.id || idx} className="relative flex items-start gap-6 group">
              {/* Phase Badge Circle */}
              <button
                type="button"
                onClick={() => onTogglePhase && onTogglePhase(phase.id)}
                aria-label={`Toggle completion for ${phase.title}`}
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold text-xs shadow-md transition-all duration-300 ${
                  isDone
                    ? "border-[#7F265B] bg-[#7F265B] text-white ring-4 ring-[#7F265B]/15"
                    : "border-[#7F265B] bg-white text-[#7F265B] hover:bg-[#7F265B] hover:text-white"
                }`}
              >
                {isDone ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  phase.phaseNumber || idx + 1
                )}
              </button>

              {/* Phase Content Box */}
              <div className="flex-1 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-all duration-300 hover:border-[#7F265B]/30 hover:bg-white hover:shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-[#7F265B] transition-colors">
                    {phase.title}
                  </h4>
                  {isDone && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                      Completed
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">{phase.description}</p>

                {/* Topics Grid */}
                {phase.topics && phase.topics.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {phase.topics.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs transition-colors hover:border-[#7F265B]/30 hover:text-[#7F265B]"
                      >
                        <span className="text-[#7F265B]">✓</span>
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseRoadmap;
