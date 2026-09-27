"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Users, Award, Star, PlayCircle } from "lucide-react";
import SearchBar from "./SearchBar";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Hero: React.FC = () => {
  return (
    <section className="relative flex w-full overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:pb-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-[-100px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-fuchsia-200/30 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Top Pill */}
          <motion.div variants={item} className="inline-flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#7F265B]/20 bg-white/90 px-4 py-1.5 text-xs font-bold text-[#7F265B] shadow-xs backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#7F265B]" />
              Production-Grade Software & AI Curriculum
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl leading-[1.12]"
          >
            Build skills that{" "}
            <span className="relative inline-block text-[#7F265B]">
              transform your career
              <span className="absolute -bottom-1 left-0 h-2 w-full rounded-full bg-[#7F265B]/15" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl font-normal"
          >
            Learn from expert instructors with structured courses, practical projects, and AI-powered learning.
          </motion.p>

          {/* Call-to-action buttons */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/course-list"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#7F265B] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#7F265B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-xl hover:shadow-[#7F265B]/35 active:translate-y-0"
            >
              Explore All Courses
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-6 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50 hover:border-slate-300"
            >
              <PlayCircle className="h-4 w-4 text-[#7F265B]" />
              View Student Portal
            </Link>
          </motion.div>

          {/* Search bar inside Hero */}
          <motion.div variants={item} className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-2 shadow-[0_16px_40px_rgba(127,38,91,0.06)] backdrop-blur-xl">
              <SearchBar />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Trending:</span>
              <Link href="/course-list?search=Next.js" className="rounded-md bg-slate-100 px-2 py-0.5 hover:bg-[#7F265B]/10 hover:text-[#7F265B] transition">Next.js 15</Link>
              <Link href="/course-list?search=LLM" className="rounded-md bg-slate-100 px-2 py-0.5 hover:bg-[#7F265B]/10 hover:text-[#7F265B] transition">AI & LLMs</Link>
              <Link href="/course-list?search=DevOps" className="rounded-md bg-slate-100 px-2 py-0.5 hover:bg-[#7F265B]/10 hover:text-[#7F265B] transition">DevOps & K8s</Link>
              <Link href="/course-list?search=Cyber" className="rounded-md bg-slate-100 px-2 py-0.5 hover:bg-[#7F265B]/10 hover:text-[#7F265B] transition">Cyber Security</Link>
            </div>
          </motion.div>

          {/* Hero Live Stats Bar (Trust Section) */}
          <motion.div
            variants={item}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-2xl font-black text-slate-900">
                <Users className="h-5 w-5 text-[#7F265B]" />
                35,000+
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-1">Students Enrolled</span>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-2xl font-black text-slate-900">
                <PlayCircle className="h-5 w-5 text-[#7F265B]" />
                120+
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-1">Curated Courses</span>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-2xl font-black text-slate-900">
                <Award className="h-5 w-5 text-[#7F265B]" />
                45+
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-1">Expert Instructors</span>
            </div>

            <div className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-md">
              <div className="flex items-center gap-1.5 text-2xl font-black text-emerald-600">
                <Star className="h-5 w-5 fill-emerald-500 text-emerald-500" />
                18,000+
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-1">Certificates Issued</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
