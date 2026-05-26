import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/educator/Navbar";
import Sidebar from "../../components/educator/Sidebar";
import Footer from "../../components/educator/Footer";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Educator = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white text-default">
      <Navbar />

      <div className="relative flex min-h-[calc(100vh-80px)]">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/8 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <Sidebar />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative flex min-w-0 flex-1 flex-col"
        >
          <div className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-8">
            <div className="min-h-full rounded-[28px] border border-[#7F265B]/10 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl">
              <Outlet />
            </div>
          </div>

          <Footer />
        </motion.main>
      </div>
    </div>
  );
};

export default Educator;