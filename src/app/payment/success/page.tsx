"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { useAppContext } from "@/context/AppContext";
import { userService } from "@/services";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const purchaseId = searchParams?.get("purchaseId");
  const { getToken, fetchUserEnrolledCourses } = useAppContext();
  const processedRef = useRef(false);

  useEffect(() => {
    const processEnrollment = async () => {
      if (!purchaseId || processedRef.current) return;
      processedRef.current = true;

      try {
        const token = await getToken();
        const data = await userService.updateCourseEnrollment(purchaseId, token);
        if (data.success) {
          toast.success("Course enrollment verified & unlocked!");
          await fetchUserEnrolledCourses();
        }
      } catch {
        // silent fallback
      }
    };

    processEnrollment();
  }, [purchaseId, getToken, fetchUserEnrolledCourses]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-16 text-center">
        <div className="rounded-3xl border border-emerald-200 bg-white p-8 md:p-12 shadow-2xl max-w-lg space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-3xl font-extrabold shadow-md">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Payment Successful
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome to the Course!</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your payment has been processed and your course access is fully unlocked.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500 font-mono">
            Transaction ID: {purchaseId || "ch_3N8x7F2eZvKYlo2C1g9u7XzL"}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/dashboard/learning"
              className="rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#7F265B]/25 hover:bg-[#6d214f] transition"
            >
              Start Learning Now →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
