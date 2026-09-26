"use client";

import React from "react";
import { Lecture } from "@/types/course.types";
import { humanizeDuration } from "@/utils/duration";

interface LessonItemProps {
  lesson: Lecture;
  index: number;
  isCompleted?: boolean;
  isActive?: boolean;
  isEnrolled?: boolean;
  onSelect?: (lesson: Lecture) => void;
  onToggleComplete?: (lessonId: string) => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  index,
  isCompleted = false,
  isActive = false,
  isEnrolled = false,
  onSelect,
  onToggleComplete,
}) => {
  const isAccessible = isEnrolled || lesson.isPreviewFree;

  return (
    <div
      onClick={() => isAccessible && onSelect && onSelect(lesson)}
      className={`group flex items-center justify-between gap-4 rounded-xl border p-3.5 transition-all duration-200 ${
        isActive
          ? "border-[#7F265B] bg-[#7F265B]/10 shadow-sm"
          : isAccessible
          ? "border-slate-100 bg-white hover:border-[#7F265B]/30 hover:bg-slate-50/80 cursor-pointer"
          : "border-slate-100 bg-slate-50/50 opacity-75 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Completion checkbox or status icon */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (isEnrolled && onToggleComplete) {
              onToggleComplete(lesson.lectureId);
            }
          }}
          disabled={!isEnrolled}
          aria-label={isCompleted ? "Mark as uncompleted" : "Mark as completed"}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isCompleted
              ? "border-[#7F265B] bg-[#7F265B] text-white"
              : isActive
              ? "border-[#7F265B] bg-white text-[#7F265B]"
              : "border-slate-300 bg-white text-transparent hover:border-[#7F265B]"
          }`}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </button>

        {/* Index number & Title */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h5
              className={`text-sm font-medium truncate ${
                isActive ? "font-semibold text-[#7F265B]" : "text-slate-800 group-hover:text-slate-900"
              }`}
            >
              {lesson.lectureTitle}
            </h5>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {/* Preview badge */}
        {lesson.isPreviewFree && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
            Free Preview
          </span>
        )}

        {/* Lock indicator if not enrolled & not preview */}
        {!isAccessible && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>
        )}

        {/* Play icon if accessible */}
        {isAccessible && (
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${
              isActive ? "bg-[#7F265B] text-white" : "bg-slate-100 text-slate-600 group-hover:bg-[#7F265B]/15 group-hover:text-[#7F265B]"
            }`}
          >
            <svg className="h-3.5 w-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}

        {/* Duration */}
        <span className="text-xs font-medium text-slate-500 min-w-[50px] text-right">
          {humanizeDuration(lesson.lectureDuration * 60)}
        </span>
      </div>
    </div>
  );
};

export default LessonItem;
