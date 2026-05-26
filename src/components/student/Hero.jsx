import React from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floating = {
  animate: {
    y: [0, -10, 0],
    x: [0, 6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="relative flex w-full overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 pb-20 pt-24 text-center md:pt-32 lg:pb-28">
      {/* Background glows */}
      <motion.div
        className="absolute left-1/2 top-[-140px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#7F265B]/12 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-[-100px] top-[180px] h-[280px] w-[280px] rounded-full bg-fuchsia-200/30 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-[-120px] right-[-60px] h-[360px] w-[360px] rounded-full bg-[#7F265B]/10 blur-3xl"
        animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating accent cards */}
      <motion.div
        variants={floating}
        animate="animate"
        className="absolute left-[8%] top-[28%] hidden rounded-2xl border border-white/40 bg-white/60 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:block"
      >
        <p className="text-sm font-semibold text-[#7F265B]">Project Based</p>
        <p className="text-xs text-slate-500">Real-world learning</p>
      </motion.div>

      <motion.div
        variants={floating}
        animate="animate"
        className="absolute right-[8%] top-[24%] hidden rounded-2xl border border-white/40 bg-white/60 px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl lg:block"
        style={{ animationDelay: "1s" }}
      >
        <p className="text-sm font-semibold text-[#7F265B]">Career Focused</p>
        <p className="text-xs text-slate-500">Build job-ready skills</p>
      </motion.div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          className="mx-auto max-w-4xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center rounded-full border border-[#7F265B]/15 bg-white/80 px-5 py-2 text-sm font-semibold tracking-wide text-[#7F265B] shadow-sm backdrop-blur-md">
              ✨ Modern Learning Experience
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Enroll. Build Projects. <br />
            Land your{" "}
            <span className="relative inline-block text-[#7F265B]">
              Dream Job
              <motion.span
                className="absolute -bottom-2 left-0 h-[10px] w-full rounded-full bg-[#7F265B]/15"
                animate={{ scaleX: [0.85, 1, 0.85], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg"
          >
            Master modern technologies, build production-level projects, and
            stand out to employers with practical experience, guided learning,
            and a focused path to real career growth.
          </motion.p>

          {/* Search wrapper */}
          <motion.div variants={item} className="mt-10">
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#7F265B]/10 bg-white/70 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_24px_60px_rgba(127,38,91,0.10)]">
              <SearchBar />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {[
              { value: "Project-Based", label: "Practical learning" },
              { value: "Career Ready", label: "Build confidence" },
              { value: "Modern Skills", label: "Industry focused" },
            ].map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_14px_30px_rgba(127,38,91,0.08)]"
              >
                <p className="text-sm font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;