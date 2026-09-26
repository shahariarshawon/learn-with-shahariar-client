"use client";

import React from "react";
import { SubscriptionPlan } from "@/types/monetization.types";

interface PricingCardProps {
  plan: SubscriptionPlan;
  isYearly: boolean;
  onSelectPlan?: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isYearly,
  onSelectPlan,
}) => {
  const price = isYearly ? plan.priceYearly : plan.priceMonthly;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
        plan.isPopular
          ? "border-[#7F265B] bg-gradient-to-b from-white via-pink-50/20 to-[#7F265B]/5 shadow-xl ring-2 ring-[#7F265B]"
          : "border-slate-200 bg-white shadow-sm hover:border-slate-300"
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7F265B] px-4 py-1 text-xs font-extrabold text-white shadow-md">
          🔥 Most Popular
        </span>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">{plan.name} Plan</h3>
          <p className="mt-1 text-xs text-slate-500 leading-relaxed">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-slate-900">${price}</span>
          <span className="text-xs font-semibold text-slate-500">
            /{isYearly ? "year" : "month"}
          </span>
        </div>

        {/* Feature List */}
        <div className="space-y-3 border-t border-slate-100 pt-4">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Included Features:
          </span>
          <ul className="space-y-2.5 text-xs text-slate-700">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-8">
        <button
          type="button"
          onClick={() => onSelectPlan && onSelectPlan(plan.id)}
          className={`w-full rounded-full py-3.5 text-xs font-extrabold transition cursor-pointer ${
            plan.isPopular
              ? "bg-[#7F265B] text-white shadow-md hover:bg-[#6d214f]"
              : "border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100"
          }`}
        >
          {plan.priceMonthly === 0 ? "Get Started Free" : `Upgrade to ${plan.name}`}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
