"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Compass } from "lucide-react";

export const RoadmapSection: React.FC = () => {
  const steps = [
    {
      step: "01",
      phase: "Foundational Engineering",
      title: "Clean Code & Data Structures",
      description: "Master TypeScript, algorithmic efficiency, Git workflows, and modern web application primitives.",
      skills: ["Modern TypeScript", "React 19 Core", "HTTP & REST Standards", "Design Patterns"],
      duration: "Weeks 1–4",
    },
    {
      step: "02",
      phase: "Full-Stack System Architecture",
      title: "Next.js 15 & Microservices",
      description: "Construct resilient backend APIs, PostgreSQL database modeling, caching with Redis, and JWT authentication.",
      skills: ["Next.js App Router", "Node.js & Express", "PostgreSQL & Prisma", "Redis Caching"],
      duration: "Weeks 5–8",
    },
    {
      step: "03",
      phase: "AI & Modern Scaling",
      title: "LLM Agents & Cloud Infrastructure",
      description: "Integrate vector databases, RAG workflows, AWS serverless, container orchestration, and CI/CD pipelines.",
      skills: ["RAG & pgvector", "Docker & Kubernetes", "AWS Solutions", "Terraform GitOps"],
      duration: "Weeks 9–12",
    },
    {
      step: "04",
      phase: "Production Mastery",
      title: "Portfolio Capstone & Interviews",
      description: "Ship a production SaaS product to real users with automated testing, observability, and remote job preparation.",
      skills: ["OpenTelemetry SRE", "Stripe Monetization", "System Design Rounds", "Remote Job Interviewing"],
      duration: "Weeks 13–16",
    },
  ];

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B] mb-3">
            <Compass className="h-3.5 w-3.5" />
            Clear Career Trajectory
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            The Production Engineering Roadmap
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            A battle-tested progression framework designed to take you from foundational syntax to architecting high-scale distributed systems.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7F265B]/30 hover:shadow-lg hover:shadow-[#7F265B]/10"
            >
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F265B] text-white font-extrabold text-sm shadow-sm">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.duration}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#7F265B] uppercase tracking-wide">
                  {item.phase}
                </span>
                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Skill tags */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {item.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-3">
                <Link
                  href="/course-list"
                  className="text-xs font-bold text-[#7F265B] hover:text-[#6d214f] inline-flex items-center gap-1 group"
                >
                  View recommended courses
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
