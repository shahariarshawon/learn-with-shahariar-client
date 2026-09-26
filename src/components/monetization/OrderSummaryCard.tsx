"use client";

import React from "react";
import { CheckoutOrder } from "@/types/monetization.types";

interface OrderSummaryCardProps {
  order: CheckoutOrder;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({ order }) => {
  return (
    <div className="rounded-3xl border border-[#7F265B]/15 bg-white p-6 shadow-xl space-y-6">
      <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
        Order Summary
      </h3>

      {/* Course Info Preview */}
      <div className="flex gap-4">
        <img
          src={order.courseThumbnail || "/course_1.png"}
          alt={order.courseTitle}
          className="h-20 w-28 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
        />
        <div className="space-y-1 min-w-0 flex-1">
          <h4 className="line-clamp-2 text-sm font-bold text-slate-900">{order.courseTitle}</h4>
          <p className="text-xs text-slate-500">Instructor: {order.instructorName}</p>
          <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
            {order.discount}% Discount Applied
          </span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
        <div className="flex justify-between">
          <span>Original Price</span>
          <span className="line-through text-slate-400">${order.originalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-emerald-600">
          <span>Discount Savings ({order.discount}%)</span>
          <span>-${(order.originalPrice - order.finalPrice).toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="text-slate-900">${order.finalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax & Processing</span>
          <span className="text-slate-900">${order.tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-extrabold text-slate-900">
          <span>Total Amount Due</span>
          <span className="text-[#7F265B]">${order.totalPayable.toFixed(2)}</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 space-y-2 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-700">
          <span>🔒 256-Bit SSL Encrypted Checkout</span>
        </div>
        <p className="text-[11px]">30-Day Money Back Guarantee • Instant Course Access</p>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
