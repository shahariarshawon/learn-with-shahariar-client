"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { courseService } from "@/services";
import { Course } from "@/types/course.types";
import { OrderSummaryCard, PaymentButton } from "@/components/monetization";
import { useAppContext } from "@/context/AppContext";

interface CheckoutPageProps {
  params: Promise<{ courseId: string }>;
}

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;

  const router = useRouter();
  const { userData } = useAppContext();
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "card">("stripe");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await courseService.getCourseById(courseId);
        if (res.success && res.courseData) {
          setCourseData(res.courseData);
        } else {
          toast.error("Failed to load course for checkout");
        }
      } catch {
        toast.error("Error loading checkout details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading || !courseData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  const isEnrolled = userData?.enrolledCourses?.includes(courseData._id) || false;
  const finalPrice = courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;
  const tax = Number((finalPrice * 0.05).toFixed(2));
  const totalPayable = Number((finalPrice + tax).toFixed(2));

  const instructorName =
    typeof courseData.educator === "object"
      ? courseData.educator?.name || courseData.educator?.fullName || "Shahariar Shawon"
      : "Shahariar Shawon";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-12 md:px-10 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F265B]">
              Secure Checkout
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Complete Your Enrollment</h1>
            <p className="mt-1 text-sm text-slate-500">
              Instant course access • 30-Day Money Back Guarantee
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            {/* LEFT COLUMN: PAYMENT METHOD & DETAILS */}
            <div className="lg:col-span-7 space-y-6">
              {/* Payment Method Selector */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Select Payment Method</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                      paymentMethod === "stripe"
                        ? "border-[#7F265B] bg-[#7F265B]/5 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input type="radio" checked={paymentMethod === "stripe"} readOnly className="accent-[#7F265B]" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Stripe Checkout</h4>
                      <p className="text-[11px] text-slate-500">Credit Card, Debit Card, Apple Pay</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition ${
                      paymentMethod === "card"
                        ? "border-[#7F265B] bg-[#7F265B]/5 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <input type="radio" checked={paymentMethod === "card"} readOnly className="accent-[#7F265B]" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Direct Card</h4>
                      <p className="text-[11px] text-slate-500">Visa, Mastercard, AMEX</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Trigger Button */}
              <div className="space-y-3">
                <PaymentButton
                  courseId={courseData._id}
                  courseTitle={courseData.courseTitle}
                  amount={totalPayable}
                  isEnrolled={isEnrolled}
                />

                <p className="text-center text-xs text-slate-400">
                  By completing your purchase, you agree to Learn With Shahariar&apos;s Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-5">
              <OrderSummaryCard
                order={{
                  courseId: courseData._id,
                  courseTitle: courseData.courseTitle,
                  courseThumbnail: courseData.courseThumbnail,
                  instructorName,
                  originalPrice: courseData.coursePrice,
                  discount: courseData.discount,
                  finalPrice,
                  tax,
                  totalPayable,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
