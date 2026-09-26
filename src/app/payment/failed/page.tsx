"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-16 text-center">
        <div className="rounded-3xl border border-red-200 bg-white p-8 md:p-12 shadow-xl max-w-lg space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl font-extrabold shadow-md">
            ⚠️
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Payment Failed
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">Transaction Declined</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              We were unable to process your card. Please verify your payment details, card balance, or try another payment method.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/course-list"
              className="rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#7F265B]/25 hover:bg-[#6d214f] transition"
            >
              Retry Checkout
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
