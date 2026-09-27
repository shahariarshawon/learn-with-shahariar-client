"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/student/Navbar";
import Hero from "@/components/student/Hero";
import Companies from "@/components/student/Companies";
import CategoriesSection from "@/components/student/CategoriesSection";
import CoursesSection from "@/components/student/CoursesSection";
import PopularInstructors from "@/components/student/PopularInstructors";
import RoadmapSection from "@/components/student/RoadmapSection";
import TestimonialsSection from "@/components/student/TestimonialsSection";
import FaqSection from "@/components/student/FaqSection";
import CallToAction from "@/components/student/CallToAction";
import Footer from "@/components/student/Footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#7F265B]/15 selection:text-[#7F265B]">
      {/* Universal Navigation */}
      <Navbar />

      <main className="relative overflow-hidden bg-white text-center">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Companies / Trusted Banner */}
        <Companies />

        {/* 3. Disciplines / Categories */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <CategoriesSection />
        </motion.div>

        {/* 4. Featured Courses with live filtering */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <CoursesSection />
        </motion.div>

        {/* 5. Popular Instructors */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <PopularInstructors />
        </motion.div>

        {/* 6. Step-by-Step Learning Roadmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <RoadmapSection />
        </motion.div>

        {/* 7. Student Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <TestimonialsSection />
        </motion.div>

        {/* 8. Frequently Asked Questions */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <FaqSection />
        </motion.div>

        {/* 9. High-impact Conversion CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
        >
          <CallToAction />
        </motion.div>

        {/* 10. Footer */}
        <Footer />
      </main>
    </div>
  );
}
