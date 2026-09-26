"use client";

import React from "react";
import { humanizeDuration } from "@/utils/duration";

interface CourseProgressBarProps {
  courseTitle: string;
  completedCount: number;
  totalCount: number;
  totalDurationMinutes?: number;
}

export const CourseProgressBar: React.FC<CourseProgressBarProps> = ({
  courseTitle,
  completedCount,
  totalCount,
  totalDurationMinutes = 120,
}) => {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const remainingCount = Math.max(0, totalCount - completedCount);

  return (
    <div className="rounded-2xl border border-[#7F265B]/15 bg-gradient-to-br from-white via-pink-50/20 to-[#7F265B]/5 p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-base font-bold text-slate-900 truncate max-w-md">{courseTitle}</h4>
        <span className="rounded-full bg-[#7F265B] px-3 py-1 text-xs font-extrabold text-white shadow-xs">
          {percentage}% Completed
        </span>
      </div>

      {/* Progress Track Bar */}
      <div className="mt-3.5 h-3.5 w-full overflow-hidden rounded-full bg-slate-200/80 p-0.5 shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7F265B] via-pink-600 to-[#7F265B] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats row */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-600">
        <span>
          ✓ <strong className="text-slate-900">{completedCount}</strong> of {totalCount} lessons completed
        </span>
        <span>
          ⏳ {remainingCount} remaining • Total: {humanizeDuration(totalDurationMinutes * 60)}
        </span>
      </div>
    </div>
  );
};

export default CourseProgressBar;
