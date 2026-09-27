"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { CourseCardSkeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";

export const CoursesSection: React.FC = () => {
  const { allCourses } = useAppContext();
  const [selectedTab, setSelectedTab] = useState<string>("All");

  const tabs = ["All", "Full Stack", "AI & Data", "DevOps & Cloud", "Design & Security"];

  const filteredCourses = (allCourses || []).filter((c) => {
    if (selectedTab === "All") return true;
    const cat = (c.category || "").toLowerCase();
    const title = (c.courseTitle || c.title || "").toLowerCase();
    if (selectedTab === "Full Stack") {
      return cat.includes("web") || cat.includes("react") || cat.includes("node") || title.includes("full stack");
    }
    if (selectedTab === "AI & Data") {
      return cat.includes("ai") || cat.includes("data") || cat.includes("machine") || cat.includes("python");
    }
    if (selectedTab === "DevOps & Cloud") {
      return cat.includes("cloud") || cat.includes("devops") || cat.includes("database");
    }
    if (selectedTab === "Design & Security") {
      return cat.includes("design") || cat.includes("cyber") || cat.includes("marketing");
    }
    return true;
  });

  const displayCourses = filteredCourses.slice(0, 8);
  const isLoading = !allCourses || allCourses.length === 0;

  return (
    <section className="relative overflow-hidden px-4 py-20 text-center sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-[#7F265B]/20 bg-[#7F265B]/5 px-4 py-1 text-xs font-bold text-[#7F265B]">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Learning Programs
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Explore Industry-Grade Courses
          </h2>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            Hand-crafted by senior software engineers and staff architects. Build real portfolio-grade projects, master distributed systems, and get interview-ready.
          </p>

          {/* Interactive filter pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTab(tab)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  selectedTab === tab
                    ? "bg-[#7F265B] text-white shadow-md shadow-[#7F265B]/20 scale-105"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : displayCourses.length === 0 ? (
          <p className="mt-12 text-slate-500">No courses match this category.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayCourses.map((course) => (
              <CourseCard key={course._id || course.id} course={course} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="mt-14">
          <Link
            href="/course-list"
            className="inline-flex items-center gap-2 rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-[#7F265B]/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-xl hover:shadow-[#7F265B]/35 active:translate-y-0"
          >
            Browse All 12+ Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
