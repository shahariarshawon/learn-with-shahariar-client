import React from "react";
import { motion } from "framer-motion";
import Hero from "../../components/student/Hero";
import Companies from "../../components/student/Companies";
import CoursesSection from "../../components/student/CoursesSection";
import TestimonialsSection from "../../components/student/TestimonialsSection";
import CallToAction from "../../components/student/CallToAction";
import Footer from "../../components/student/Footer";
import Logger from "../../components/Logger";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Home = () => {
  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white text-center">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/8 blur-3xl" />
        <div className="absolute left-10 top-[30%] h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="absolute right-10 top-[55%] h-48 w-48 rounded-full bg-[#7F265B]/8 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Hero */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="w-full"
        >
          <Hero />
        </motion.section>

        {/* Mobile Logger */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="block w-full px-6 sm:hidden"
        >
          <div className="mx-auto max-w-6xl">
            <Logger />
          </div>
        </motion.div>

        {/* Companies / trust section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="w-full"
        >
          <Companies />
        </motion.section>

        {/* Courses */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className="w-full"
        >
          <CoursesSection />
        </motion.section>

        {/* Testimonials */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className="w-full"
        >
          <TestimonialsSection />
        </motion.section>

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="w-full"
        >
          <CallToAction />
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="w-full"
        >
          <Footer />
        </motion.footer>
      </div>
    </main>
  );
};

export default Home;