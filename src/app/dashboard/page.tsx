"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Clock,
  Flame,
  PlayCircle,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import CourseCard from "@/components/student/CourseCard";
import { useAppContext } from "@/context/AppContext";
import { useAuthRole } from "@/features/auth/use-auth-role";
import { MOCK_COURSES } from "@/mock/courses";

export default function StudentDashboardPage() {
  const { user } = useAuthRole();
  const { enrolledCourses, allCourses } = useAppContext();

  const [activeTab, setActiveTab] = useState<"enrolled" | "certificates" | "bookmarks">("enrolled");

  // Fallback demo enrolled courses if student has not enrolled in real DB courses yet
  const displayEnrolled = enrolledCourses && enrolledCourses.length > 0
    ? enrolledCourses
    : MOCK_COURSES.slice(0, 3);

  const activeCourse = displayEnrolled[0];

  // Learning stats
  const stats = [
    { label: "Enrolled Courses", value: displayEnrolled.length, icon: BookOpen, color: "text-blue-600 bg-blue-50" },
    { label: "Hours Learned", value: "38.5 hrs", icon: Clock, color: "text-[#7F265B] bg-[#7F265B]/10" },
    { label: "Current Streak", value: "14 Days", icon: Flame, color: "text-amber-500 bg-amber-50" },
    { label: "Certificates Earned", value: "2 Earned", icon: Award, color: "text-emerald-600 bg-emerald-50" },
  ];

  // Saved bookmarks mock
  const bookmarks = [
    {
      id: "bm1",
      courseTitle: "Full Stack Web Development with Next.js 15",
      lessonTitle: "App Router Deep Dive: Server vs Client Components",
      timestamp: "14:20",
      courseId: "course_fullstack_nextjs",
    },
    {
      id: "bm2",
      courseTitle: "AI Engineering with LLMs",
      lessonTitle: "Building a Production RAG with pgvector",
      timestamp: "28:45",
      courseId: "course_ai_llm_engineering",
    },
  ];

  // Certificates mock
  const certificates = [
    {
      id: "cert_nextjs_prod",
      title: "Full Stack Web Development Professional Certificate",
      issueDate: "September 15, 2026",
      issuer: "Learn With Shahariar Certification Board",
      grade: "Top 5% Distinction",
      verifyId: "LWS-FSW-8842",
    },
    {
      id: "cert_react_adv",
      title: "React 19 Architecture & Performance Mastery",
      issueDate: "August 28, 2026",
      issuer: "Learn With Shahariar Certification Board",
      grade: "Excellence",
      verifyId: "LWS-REA-7719",
    },
  ];

  // Recommended courses
  const recommendedCourses = (allCourses && allCourses.length > 0 ? allCourses : MOCK_COURSES)
    .filter((c) => !displayEnrolled.some((e) => e._id === c._id))
    .slice(0, 4);

  const userName = user?.firstName || user?.fullName || "Software Engineer";

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800">
      <Navbar />

      {/* Student Welcome Header */}
      <section className="border-b border-slate-200/80 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-bold text-[#7F265B] mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                Student Portal & Learning Hub
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                Welcome back, {userName}! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Pick up where you left off and keep your daily learning streak alive.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/course-list"
                className="rounded-full bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition"
              >
                Browse New Courses
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.label}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex items-center gap-3.5"
                >
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${st.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-400 block">{st.label}</span>
                    <span className="text-base sm:text-lg font-black text-slate-900">{st.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dashboard Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* Continue Learning Featured Card */}
        {activeCourse && (
          <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <img
                  src={activeCourse.courseThumbnail || "/course_1.png"}
                  alt={activeCourse.courseTitle}
                  className="h-28 w-44 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
                />
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    In Progress • Module 2 of 4
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {activeCourse.courseTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Next up: <span className="font-semibold text-slate-700">Server Actions & Form Mutations with Zod</span>
                  </p>

                  {/* Progress bar */}
                  <div className="w-full sm:w-80 pt-1">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                      <span>Overall Progress</span>
                      <span className="text-[#7F265B] font-bold">64%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#7F265B]" style={{ width: "64%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <Link
                  href={`/player/${activeCourse._id || activeCourse.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#7F265B] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#6d214f] transition"
                >
                  <PlayCircle className="h-4 w-4" />
                  Resume Learning
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab Selector: My Courses | Certificates | Bookmarks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={() => setActiveTab("enrolled")}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === "enrolled"
                    ? "bg-[#7F265B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                My Courses ({displayEnrolled.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("certificates")}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === "certificates"
                    ? "bg-[#7F265B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Certificates ({certificates.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("bookmarks")}
                className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === "bookmarks"
                    ? "bg-[#7F265B] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Bookmarks ({bookmarks.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Enrolled Courses */}
          {activeTab === "enrolled" && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayEnrolled.map((course, idx) => {
                const progressPct = idx === 0 ? 64 : idx === 1 ? 32 : 10;
                return (
                  <div
                    key={course._id || course.id}
                    className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-md transition"
                  >
                    <div className="space-y-3">
                      <img
                        src={course.courseThumbnail || "/course_1.png"}
                        alt={course.courseTitle}
                        className="h-44 w-full rounded-xl object-cover ring-1 ring-slate-100"
                      />
                      <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                        {course.category || "Development"}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                        {course.courseTitle}
                      </h4>

                      {/* Progress bar */}
                      <div className="pt-2">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                          <span>Progress</span>
                          <span className="font-bold text-[#7F265B]">{progressPct}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#7F265B]"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-3 flex items-center justify-between">
                      <Link
                        href={`/player/${course._id || course.id}`}
                        className="text-xs font-bold text-[#7F265B] hover:underline flex items-center gap-1"
                      >
                        <PlayCircle className="h-4 w-4" /> Go to Classroom
                      </Link>
                      <Link
                        href={`/course/${course._id || course.id}`}
                        className="text-xs font-semibold text-slate-400 hover:text-slate-700"
                      >
                        Syllabus
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Certificates */}
          {activeTab === "certificates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      Verified
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">{cert.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{cert.issuer}</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 flex justify-between font-medium">
                    <span>Issued: {cert.issueDate}</span>
                    <span className="font-mono text-slate-500">{cert.verifyId}</span>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      href={`/certificate/${cert.verifyId}`}
                      className="rounded-xl bg-[#7F265B] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] transition"
                    >
                      View & Share Credential
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Bookmarks */}
          {activeTab === "bookmarks" && (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7F265B]/10 text-[#7F265B]">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{bm.lessonTitle}</h5>
                      <p className="text-xs text-slate-500">
                        {bm.courseTitle} • <span className="font-bold text-[#7F265B]">Timestamp {bm.timestamp}</span>
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/player/${bm.courseId}`}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100 self-start sm:self-auto"
                  >
                    Jump to Lecture →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Courses Section */}
        <div className="space-y-5 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#7F265B]">
                <TrendingUp className="h-3.5 w-3.5" /> Next Steps
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Recommended For Your Career Path
              </h2>
            </div>

            <Link
              href="/course-list"
              className="text-xs font-bold text-[#7F265B] hover:underline flex items-center gap-1"
            >
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedCourses.map((c) => (
              <CourseCard key={c._id || c.id} course={c} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
