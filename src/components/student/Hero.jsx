import React from "react";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full pt-24 md:pt-36 px-6 text-center overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white">

      {/* Background glow */}
      <motion.div
        className="absolute top-[-100px] w-[600px] h-[600px] bg-purple-300/20 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-[-120px] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-3xl -z-10"
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <motion.div
        className="max-w-5xl mx-auto"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.span
          variants={item}
          className="inline-flex px-4 py-1.5 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold tracking-wide shadow-sm"
        >
          #1 Learning Platform
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900"
        >
          Enroll. Build Projects. <br />
          Land your{" "}
          <span className="text-[#6A38C2] relative inline-block">
            Dream Job
            <motion.span
              className="absolute left-0 -bottom-2 h-[6px] w-full bg-[#6A38C2]/20 rounded-full"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={item}
          className="mt-6 max-w-xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed"
        >
          Master modern technologies, build production-level projects, and stand out to employers with real experience.
        </motion.p>

        {/* Search */}
        <motion.div variants={item} className="mt-10 w-full">
          <SearchBar />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;