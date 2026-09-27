"use client";

import React from "react";
import Link from "next/link";
import { Star, Users, BookOpen, CheckCircle } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/mock/courses";

export const PopularInstructors: React.FC = () => {
  const instructors = Object.values(MOCK_INSTRUCTORS);

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-slate-50/70 border-t border-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="rounded-full bg-[#7F265B]/10 px-4 py-1 text-xs font-bold text-[#7F265B]">
            World-Class Mentors
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Learn from Industry Leaders
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Our instructors are active practitioners, staff software engineers, and AI researchers who bring battle-tested experience from high-growth technology companies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.id}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7F265B]/30 hover:shadow-lg hover:shadow-[#7F265B]/10"
            >
              <div>
                {/* Avatar with status ring */}
                <div className="relative mx-auto h-24 w-24 mb-4">
                  <img
                    src={inst.avatar}
                    alt={inst.name}
                    className="h-full w-full rounded-full object-cover ring-2 ring-[#7F265B]/20 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 right-0 rounded-full bg-[#7F265B] p-1 text-white shadow-xs">
                    <CheckCircle className="h-3.5 w-3.5" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#7F265B] transition-colors">
                  {inst.name}
                </h3>
                <p className="text-xs font-semibold text-[#7F265B] mt-0.5">{inst.role}</p>
                <p className="text-[11px] text-slate-400 font-medium">{inst.company}</p>

                <p className="mt-3 text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {inst.bio}
                </p>
              </div>

              {/* Stats Footer */}
              <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-around text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-400" />
                  {inst.rating}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Users className="h-3.5 w-3.5 text-slate-400" />
                  {(inst.studentsCount / 1000).toFixed(1)}k
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                  {inst.coursesCount}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/course-list"
            className="inline-flex items-center gap-2 rounded-full border border-[#7F265B] bg-white px-6 py-2.5 text-xs font-bold text-[#7F265B] hover:bg-[#7F265B] hover:text-white transition shadow-xs"
          >
            Explore Courses by All Instructors →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularInstructors;
