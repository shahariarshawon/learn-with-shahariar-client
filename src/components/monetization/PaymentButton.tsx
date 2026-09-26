"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";
import { userService } from "@/services";

interface PaymentButtonProps {
  courseId: string;
  courseTitle?: string;
  amount?: number;
  isEnrolled?: boolean;
  className?: string;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  courseId,
  courseTitle = "this course",
  amount,
  isEnrolled = false,
  className = "",
}) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!userId) return toast.warn("Please sign in to complete your order!");
    if (isEnrolled) return toast.warn("You are already enrolled in this course");

    try {
      setLoading(true);
      const token = await getToken();
      const data = await userService.purchaseCourse(courseId, token);

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Failed to initialize Stripe checkout");
      }
    } catch (error: any) {
      toast.error(error.message || "Checkout session creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={loading || isEnrolled}
      className={`w-full rounded-full bg-[#7F265B] py-4 text-base font-extrabold text-white shadow-xl shadow-[#7F265B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] disabled:opacity-60 cursor-pointer ${className}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <span>Processing Checkout...</span>
        </span>
      ) : isEnrolled ? (
        "Already Enrolled"
      ) : (
        `Complete Purchase ${amount ? `($${amount.toFixed(2)})` : ""}`
      )}
    </button>
  );
};

export default PaymentButton;
