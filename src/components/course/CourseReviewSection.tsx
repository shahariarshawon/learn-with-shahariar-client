"use client";

import React from "react";
import Rating from "@/components/student/Rating";
import { CourseRating, CourseReview } from "@/types/course.types";

interface CourseReviewSectionProps {
  ratings?: CourseRating[];
  reviews?: CourseReview[];
  averageRating?: number;
}

const defaultReviews: CourseReview[] = [
  {
    id: "rev-1",
    userId: "u-1",
    userName: "Tanvir Ahmed",
    userImage: "https://i.postimg.cc/zX8kLzCg/user1.jpg",
    rating: 5,
    comment:
      "Extremely well structured course! The roadmap and chapter breakdown helped me land my first software engineering job.",
    date: "2 weeks ago",
  },
  {
    id: "rev-2",
    userId: "u-2",
    userName: "Nusrat Jahan",
    userImage: "https://i.postimg.cc/3wMvD2hQ/user2.jpg",
    rating: 5,
    comment:
      "Shahariar's teaching methodology is clear, precise, and hands-on. The Next.js 15 and TypeScript modules are pure gold.",
    date: "1 month ago",
  },
  {
    id: "rev-3",
    userId: "u-3",
    userName: "Mahmud Hasan",
    userImage: "https://i.postimg.cc/k4bSjZ6p/user3.jpg",
    rating: 4.8,
    comment:
      "The full stack project builder was challenging but rewarding. Highly recommend to anyone aiming for senior dev positions.",
    date: "2 months ago",
  },
];

export const CourseReviewSection: React.FC<CourseReviewSectionProps> = ({
  ratings = [],
  reviews = defaultReviews,
  averageRating = 4.9,
}) => {
  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const totalCount = ratings.length > 0 ? ratings.length : 128;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Student Feedback & Reviews</h3>

      {/* Overview Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-slate-50/70 p-6 sm:grid-cols-3 sm:items-center">
        <div className="flex flex-col items-center justify-center text-center sm:border-r sm:border-slate-200 sm:pr-6">
          <span className="text-5xl font-black text-slate-900">{averageRating.toFixed(1)}</span>
          <div className="mt-2">
            <Rating initialRating={Math.round(averageRating)} readonly />
          </div>
          <span className="mt-1 text-xs font-semibold text-slate-500">Course Rating ({totalCount} ratings)</span>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="space-y-2 sm:col-span-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const percentage = stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 3 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-medium text-slate-600">{stars} Stars</span>
                <div className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#7F265B] transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right font-medium text-slate-500">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-4">
        {displayReviews.map((rev) => (
          <div
            key={rev.id}
            className="rounded-xl border border-slate-100 bg-slate-50/40 p-5 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7F265B] font-bold text-white shadow-sm">
                  {rev.userName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.userName}</h4>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>
              </div>

              <Rating initialRating={Math.round(rev.rating)} readonly />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseReviewSection;
