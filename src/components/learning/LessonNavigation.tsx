"use client";

import React from "react";

interface LessonNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onCompleteAndNext: () => void;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  hasPrevious,
  hasNext,
  isCompleted,
  onPrevious,
  onNext,
  onCompleteAndNext,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Previous Button */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        ← Previous Lesson
      </button>

      <div className="flex items-center gap-3">
        {/* Mark as Complete & Next Button */}
        <button
          type="button"
          onClick={onCompleteAndNext}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
            isCompleted
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-[#7F265B] hover:bg-[#6d214f]"
          }`}
        >
          {isCompleted ? (
            <>
              <span>✓ Completed</span>
              {hasNext && <span>• Next →</span>}
            </>
          ) : (
            <>
              <span>Mark as Complete</span>
              {hasNext && <span>& Next →</span>}
            </>
          )}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};

export default LessonNavigation;
