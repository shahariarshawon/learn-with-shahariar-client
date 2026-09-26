"use client";

import React, { useState } from "react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import PricingCard from "@/components/monetization/PricingCard";
import { useSubscriptionPlansQuery } from "@/services/subscription.service";
import { toast } from "react-toastify";

export default function PricingPage() {
  const { data: plans = [] } = useSubscriptionPlansQuery();
  const [isYearly, setIsYearly] = useState<boolean>(false);

  const handleSelectPlan = (planId: string) => {
    toast.success(`Selected ${planId.toUpperCase()} subscription! Redirecting to checkout...`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-16 md:px-10 lg:px-20 xl:px-28">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute right-10 top-32 h-64 w-64 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl space-y-12">
          {/* Header & Title */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="inline-flex rounded-full border border-[#7F265B]/20 bg-[#7F265B]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#7F265B]">
              Flexible Subscription Plans
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Invest in Your Software Engineering Career
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Unlock unlimited access to enterprise full-stack roadmaps, verified certificates, downloadable source code, and 1-on-1 mentorship.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className={`text-xs font-bold ${!isYearly ? "text-slate-900" : "text-slate-400"}`}>
                Monthly Billing
              </span>
              <button
                type="button"
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isYearly ? "bg-[#7F265B]" : "bg-slate-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isYearly ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isYearly ? "text-slate-900" : "text-slate-400"}`}>
                Annual Billing
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                  Save 20% 🔥
                </span>
              </span>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isYearly={isYearly}
                onSelectPlan={handleSelectPlan}
              />
            ))}
          </div>

          {/* FAQ Section */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 text-center">Frequently Asked Questions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Can I cancel my subscription anytime?</h4>
                <p className="text-slate-500 leading-relaxed">
                  Yes, you can cancel your PRO or PREMIUM subscription at any time from your account billing settings with zero cancellation fees.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Are certificates included in all plans?</h4>
                <p className="text-slate-500 leading-relaxed">
                  Verified certificates of completion are included in all paid PRO and PREMIUM subscription tiers upon completing 100% of course lectures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
