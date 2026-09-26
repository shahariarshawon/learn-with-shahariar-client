"use client";

import React from "react";
import Footer from "./student/Footer";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-20 md:px-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-40 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-44 w-44 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto w-full max-w-5xl rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-12"
        >
          {/* Header */}
          <motion.header
            custom={1}
            variants={fadeUp}
            className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
                Privacy & Data Protection
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-3 text-sm text-slate-500 md:text-base">
                Effective date:{" "}
                <span className="font-semibold text-slate-700">
                  November 10, 2025
                </span>
              </p>
            </div>
          </motion.header>

          {/* Body */}
          <div className="mt-8 space-y-8 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
            <motion.section custom={2} variants={fadeUp}>
              <h2 className="text-xl font-bold text-slate-900">
                1. Information We Collect
              </h2>
              <p className="mt-3">
                We collect information you provide directly to us when you
                create an account, enroll in courses, make a purchase, or
                communicate with our team. This includes your name, email
                address, learning progress, and transaction records.
              </p>
            </motion.section>

            <motion.section custom={3} variants={fadeUp}>
              <h2 className="text-xl font-bold text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="mt-3">
                We use the information we collect to operate, maintain, and
                improve our platform; deliver enrolled courses and track
                progress; process payments; and send important technical updates
                and support notices.
              </p>
            </motion.section>

            <motion.section custom={4} variants={fadeUp}>
              <h2 className="text-xl font-bold text-slate-900">
                3. Data Security
              </h2>
              <p className="mt-3">
                We implement robust security measures to protect your personal
                information against unauthorized access, alteration, disclosure,
                or destruction.
              </p>
            </motion.section>

            <motion.section custom={5} variants={fadeUp}>
              <h2 className="text-xl font-bold text-slate-900">
                4. Contact Us
              </h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:shahariarshawon.dev@gmail.com"
                  className="font-medium text-[#7F265B] hover:underline"
                >
                  shahariarshawon.dev@gmail.com
                </a>
                .
              </p>
            </motion.section>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
