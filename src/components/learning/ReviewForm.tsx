"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import CourseRating from "./CourseRating";
import { useSubmitReviewMutation } from "@/services/learning.service";
import { useAuth } from "@clerk/nextjs";

interface ReviewFormProps {
  courseId: string;
  courseTitle?: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  courseId,
  courseTitle = "this course",
  onSuccess,
}) => {
  const { getToken } = useAuth();
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const submitReviewMutation = useSubmitReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return toast.warn("Please write a short review");

    try {
      const token = await getToken();
      await submitReviewMutation.mutateAsync({
        payload: { courseId, rating, comment: comment.trim() },
        token,
      });

      toast.success("Thank you for your rating & feedback!");
      setComment("");
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
      <div>
        <h4 className="text-lg font-bold text-slate-900">Rate & Review {courseTitle}</h4>
        <p className="text-xs text-slate-500">Your feedback helps improve the course for future students</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Select Rating
        </label>
        <CourseRating rating={rating} onRatingChange={setRating} size="lg" />
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Your Review
        </label>
        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like most about this course? How did it help your career?"
          className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitReviewMutation.isPending}
          className="rounded-xl bg-[#7F265B] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition disabled:opacity-50 cursor-pointer"
        >
          {submitReviewMutation.isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
