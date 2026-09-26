"use client";

import React from "react";
import Footer from "./student/Footer";
import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const About: React.FC = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const features = [
    {
      title: "Quality Courses",
      icon: "📚",
      desc: "Learn from expert educators through well-structured, engaging, and practical courses designed for real growth.",
    },
    {
      title: "Interactive Learning",
      icon: "🚀",
      desc: "Track progress, explore projects, and stay engaged with a learning experience built for modern students.",
    },
    {
      title: "Global Access",
      icon: "🌍",
      desc: "Learn anytime, anywhere, on any device with a smooth, accessible, and responsive platform experience.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-20 sm:px-10 lg:px-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-40 h-32 w-32 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] shadow-sm">
              Empowering Education
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              About Learn with <span className="text-[#7F265B]">Shahariar</span>
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              We are dedicated to making quality learning simple, practical, and
              accessible for everyone. Our platform bridges the gap between
              passionate educators and ambitious students.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_20px_50px_rgba(127,38,91,0.12)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-xl">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                To empower learners with high-demand skills through structured,
                engaging, and project-based education, helping them achieve
                real-world success.
              </p>
            </motion.div>

            <motion.div
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_20px_50px_rgba(127,38,91,0.12)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-xl">
                🌟
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                To build an inclusive global learning community where knowledge
                flows freely, creating opportunities for students and educators
                alike.
              </p>
            </motion.div>
          </div>

          {/* Core Pillars */}
          <div className="mt-20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Why learn with us?
              </h2>
              <p className="mt-3 text-sm text-slate-600 sm:text-base">
                Everything you need to grow your career and achieve your goals.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#7F265B]/20 hover:shadow-[0_20px_45px_rgba(127,38,91,0.12)]"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mt-20 rounded-3xl border border-[#7F265B]/10 bg-white/80 px-8 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-12"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Join our growing community of learners today and take the next step
              in your educational journey.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {user ? (
                <Link
                  href="/course-list"
                  className="rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)]"
                >
                  Explore Courses
                </Link>
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)] cursor-pointer"
                >
                  Get Started
                </button>
              )}

              <Link
                href="/contact"
                className="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7F265B]/30 hover:text-[#7F265B]"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
