"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-16 text-center">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 md:p-12 shadow-xl max-w-lg space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-3xl font-extrabold shadow-md">
            🛒
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Checkout Cancelled
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">Purchase Interrupted</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your transaction was not completed and no funds were charged. You can resume checkout anytime.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/course-list"
              className="rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#7F265B]/25 hover:bg-[#6d214f] transition"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
