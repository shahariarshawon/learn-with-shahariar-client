"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  User,
  Mail,
  Shield,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { useAuthRole } from "@/features/auth/use-auth-role";
import { useAppContext } from "@/context/AppContext";

export default function ProfilePage() {
  const { user } = useUser();
  const { role, isAdmin, isEducator } = useAuthRole();
  const { enrolledCourses } = useAppContext();

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "skills" | "certificates" | "achievements">("overview");

  const skills = [
    { name: "TypeScript 5", level: "Advanced", category: "Languages" },
    { name: "React 19 & Next.js 15", level: "Expert", category: "Frontend" },
    { name: "Node.js & Express", level: "Advanced", category: "Backend" },
    { name: "PostgreSQL & Prisma", level: "Proficient", category: "Databases" },
    { name: "Redis Caching", level: "Proficient", category: "Databases" },
    { name: "Docker & AWS", level: "Intermediate", category: "DevOps" },
    { name: "LLM Agents & LangChain", level: "Intermediate", category: "AI Engineering" },
    { name: "Tailwind CSS & Design Systems", level: "Expert", category: "Frontend" },
  ];

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

  const achievements = [
    { title: "Fast Learner", desc: "Completed 5 lessons in a single day", icon: "⚡", date: "Sep 2026" },
    { title: "Full Stack Explorer", desc: "Enrolled in modern Next.js 15 curriculum", icon: "🚀", date: "Aug 2026" },
    { title: "14-Day Streak", desc: "Maintained active study consistency for two weeks", icon: "🔥", date: "Sep 2026" },
    { title: "Certified Specialist", desc: "Passed course evaluation with distinction", icon: "🎓", date: "Sep 2026" },
  ];

  const userName = user?.fullName || user?.firstName || "Software Engineer";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "user@example.com";
  const avatarUrl = user?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={avatarUrl}
              alt={userName}
              className="h-24 w-24 rounded-full object-cover ring-4 ring-[#7F265B]/15 shadow-md"
            />
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{userName}</h1>
                <span className="rounded-full bg-[#7F265B]/10 px-3 py-0.5 text-xs font-bold text-[#7F265B] capitalize">
                  {role}
                </span>
                {isAdmin && (
                  <span className="rounded-full bg-purple-100 px-3 py-0.5 text-xs font-bold text-purple-800">
                    Platform Admin
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {userEmail}
              </p>
              <p className="text-xs text-slate-600 max-w-xl pt-1">
                Passionate software engineer building resilient full-stack web applications, microservices, and AI-powered systems.
              </p>
            </div>

            <div className="shrink-0 flex gap-2">
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigator */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 transition whitespace-nowrap cursor-pointer ${
              activeTab === "overview"
                ? "border-b-2 border-[#7F265B] text-[#7F265B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Overview & Stats
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`pb-3 transition whitespace-nowrap cursor-pointer ${
              activeTab === "skills"
                ? "border-b-2 border-[#7F265B] text-[#7F265B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Skills & Stack ({skills.length})
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`pb-3 transition whitespace-nowrap cursor-pointer ${
              activeTab === "courses"
                ? "border-b-2 border-[#7F265B] text-[#7F265B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Courses ({enrolledCourses?.length || 3})
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 transition whitespace-nowrap cursor-pointer ${
              activeTab === "certificates"
                ? "border-b-2 border-[#7F265B] text-[#7F265B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Certificates ({certificates.length})
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`pb-3 transition whitespace-nowrap cursor-pointer ${
              activeTab === "achievements"
                ? "border-b-2 border-[#7F265B] text-[#7F265B]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Achievements ({achievements.length})
          </button>
        </div>

        {/* Tab Content 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enrolled Courses</span>
                <p className="mt-2 text-2xl font-black text-slate-900">{enrolledCourses?.length || 3}</p>
                <p className="text-xs text-slate-500 mt-1">Active curriculum tracks</p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Completed Lectures</span>
                <p className="mt-2 text-2xl font-black text-[#7F265B]">24 Lessons</p>
                <p className="text-xs text-slate-500 mt-1">Across all courses</p>
              </div>
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Study Time</span>
                <p className="mt-2 text-2xl font-black text-emerald-600">38.5 Hours</p>
                <p className="text-xs text-slate-500 mt-1">Lifetime hours logged</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Career Goals & Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl bg-slate-50 p-3.5 space-y-1">
                  <span className="font-bold text-slate-700 block">Primary Focus Area</span>
                  <span className="text-slate-500">Full Stack & Distributed Systems</span>
                </div>
                <div className="rounded-xl bg-slate-50 p-3.5 space-y-1">
                  <span className="font-bold text-slate-700 block">Target Role</span>
                  <span className="text-slate-500">Remote Senior Software Engineer</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Skills */}
        {activeTab === "skills" && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Verified Technical Competencies</h3>
              <p className="text-xs text-slate-500 mt-0.5">Skills demonstrated through project milestones and automated chapter evaluations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skills.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-white hover:border-[#7F265B]/20 transition"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900">{s.name}</span>
                    <span className="text-[10px] text-slate-400 block">{s.category}</span>
                  </div>
                  <span className="rounded-full bg-[#7F265B]/10 px-2.5 py-0.5 text-[10px] font-extrabold text-[#7F265B]">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: Courses */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            {(enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses : [
              {
                _id: "c1",
                courseTitle: "Complete Full Stack Web Development with Next.js 15 & Node.js",
                courseThumbnail: "/course_1.png",
                category: "Full Stack",
              },
              {
                _id: "c2",
                courseTitle: "AI Engineering: Building with LLMs & Agents",
                courseThumbnail: "/course_2.png",
                category: "AI & ML",
              },
              {
                _id: "c3",
                courseTitle: "Advanced Node.js & Microservices Architecture",
                courseThumbnail: "/course_3.png",
                category: "Backend",
              },
            ]).map((c, i) => (
              <div
                key={c._id || i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs hover:shadow-xs transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.courseThumbnail || "/course_1.png"}
                    alt={c.courseTitle}
                    className="h-14 w-24 rounded-xl object-cover ring-1 ring-slate-100 shrink-0"
                  />
                  <div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {c.category || "Engineering"}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{c.courseTitle}</h4>
                  </div>
                </div>

                <Link
                  href={`/player/${c._id || "1"}`}
                  className="rounded-xl bg-[#7F265B] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] transition self-start sm:self-auto shrink-0"
                >
                  Continue →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 4: Certificates */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    Verified Credential
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{cert.verifyId}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{cert.title}</h4>
                <p className="text-xs text-slate-500">{cert.issuer} • {cert.issueDate}</p>
                <div className="pt-2">
                  <Link
                    href={`/certificate/${cert.verifyId}`}
                    className="text-xs font-bold text-[#7F265B] hover:underline"
                  >
                    View Credential Record ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 5: Achievements */}
        {activeTab === "achievements" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div
                key={ach.title}
                className="flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl shrink-0">
                  {ach.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{ach.desc}</p>
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 block">Unlocked {ach.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
