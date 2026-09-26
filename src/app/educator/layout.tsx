"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import EducatorNavbar from "@/components/educator/Navbar";
import EducatorSidebar from "@/components/educator/Sidebar";
import EducatorFooter from "@/components/educator/Footer";
import { useAppContext } from "@/context/AppContext";
import { useAuthRole } from "@/features/auth/use-auth-role";
import Loading from "@/components/student/Loading";
import Link from "next/link";

const fadeIn: Variants = {
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

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEducator } = useAppContext();
  const { isLoaded, isSignedIn, isEducator: roleIsEducator } = useAuthRole();

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white">
        <Loading />
      </div>
    );
  }

  const authorized = isEducator || roleIsEducator;

  if (!isSignedIn || !authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 text-center">
        <div className="max-w-md rounded-3xl border border-[#7F265B]/15 bg-white p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#7F265B]/10 text-2xl">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Educator Access Required
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            You must be logged in as an authorized educator to access this panel.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-full bg-[#7F265B] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6d214f]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white text-slate-800">
      <EducatorNavbar />

      <div className="relative flex min-h-[calc(100vh-80px)]">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/8 blur-3xl" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <EducatorSidebar />

        <motion.main
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative flex min-w-0 flex-1 flex-col"
        >
          <div className="flex-1 px-4 py-4 md:px-6 md:py-6 lg:px-8">
            <div className="min-h-full rounded-[28px] border border-[#7F265B]/10 bg-white/70 shadow-[0_20px_60px_rgba(0,0,0,0.04)] backdrop-blur-xl">
              {children}
            </div>
          </div>

          <EducatorFooter />
        </motion.main>
      </div>
    </div>
  );
}
