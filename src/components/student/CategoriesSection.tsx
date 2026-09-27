"use client";

import React from "react";
import Link from "next/link";
import { Code, Database, Bot, Palette, Briefcase, TrendingUp, ArrowRight } from "lucide-react";

export const CategoriesSection: React.FC = () => {
  const categories = [
    {
      name: "Programming",
      filter: "Full Stack Web Development",
      description: "Full Stack, TypeScript, Next.js 15, React 19, and Node.js backend systems.",
      coursesCount: "4 Courses",
      icon: Code,
      gradient: "from-blue-500/10 to-indigo-500/10 text-blue-600",
    },
    {
      name: "Artificial Intelligence",
      filter: "AI Engineering with LLM",
      description: "LLMs, LangChain, RAG pipelines, agents, and PyTorch deep learning.",
      coursesCount: "2 Courses",
      icon: Bot,
      gradient: "from-purple-500/10 to-pink-500/10 text-purple-600",
    },
    {
      name: "Data Science",
      filter: "Python Data Science",
      description: "NumPy, Pandas, statistical modeling, machine learning, and predictive analytics.",
      coursesCount: "2 Courses",
      icon: Database,
      gradient: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
    },
    {
      name: "Design & Systems",
      filter: "UI/UX Design",
      description: "Figma Variables, design systems, micro-interactions, and accessibility standards.",
      coursesCount: "1 Course",
      icon: Palette,
      gradient: "from-amber-500/10 to-orange-500/10 text-amber-600",
    },
    {
      name: "Cloud & DevOps",
      filter: "Cloud Computing",
      description: "AWS Solutions Architecture, Docker, Kubernetes, Terraform, and CI/CD pipelines.",
      coursesCount: "2 Courses",
      icon: Briefcase,
      gradient: "from-cyan-500/10 to-sky-500/10 text-cyan-600",
    },
    {
      name: "Marketing & Growth",
      filter: "Digital Marketing",
      description: "Technical SEO, search engine marketing, GA4 attribution, and CRO funnels.",
      coursesCount: "1 Course",
      icon: TrendingUp,
      gradient: "from-rose-500/10 to-red-500/10 text-rose-600",
    },
  ];

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B] mb-3">
              Explore Disciplines
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Top Categories to Master
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl">
              Curated career pathways engineered for modern developers, engineering leaders, and data scientists.
            </p>
          </div>

          <Link
            href="/course-list"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7F265B] hover:text-[#6d214f] group self-start md:self-auto"
          >
            Browse all categories
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/course-list?category=${encodeURIComponent(cat.filter)}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7F265B]/30 hover:shadow-lg hover:shadow-[#7F265B]/10"
              >
                <div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#7F265B] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                  <span>{cat.coursesCount}</span>
                  <span className="text-[#7F265B] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
