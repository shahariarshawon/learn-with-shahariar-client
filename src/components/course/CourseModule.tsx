"use client";

import React, { useState } from "react";
import { Chapter, Lecture } from "@/types/course.types";
import LessonItem from "./LessonItem";
import { humanizeDuration } from "@/utils/duration";

interface CourseModuleProps {
  module: Chapter;
  moduleIndex: number;
  isDefaultOpen?: boolean;
  activeLectureId?: string | null;
  completedLectureIds?: string[];
  isEnrolled?: boolean;
  onSelectLesson?: (lesson: Lecture) => void;
  onToggleCompleteLesson?: (lessonId: string) => void;
}

export const CourseModule: React.FC<CourseModuleProps> = ({
  module,
  moduleIndex,
  isDefaultOpen = false,
  activeLectureId,
  completedLectureIds = [],
  isEnrolled = false,
  onSelectLesson,
  onToggleCompleteLesson,
}) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);

  const totalDurationMinutes = module.chapterContent.reduce(
    (acc, lec) => acc + (lec.lectureDuration || 0),
    0
  );

  const completedCount = module.chapterContent.filter((lec) =>
    completedLectureIds.includes(lec.lectureId)
  ).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-200 hover:border-slate-300">
      {/* Module Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 bg-slate-50/70 px-5 py-4 text-left transition-colors hover:bg-slate-100/70"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#7F265B]/10 text-xs font-bold text-[#7F265B]">
            {String(moduleIndex + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h4 className="text-base font-bold text-slate-800 truncate">
              {module.chapterTitle}
            </h4>
            <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
              <span>{module.chapterContent.length} Lessons</span>
              <span>•</span>
              <span>{humanizeDuration(totalDurationMinutes * 60)}</span>
              {isEnrolled && (
                <>
                  <span>•</span>
                  <span className="font-medium text-[#7F265B]">
                    {completedCount}/{module.chapterContent.length} Completed
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>

      {/* Module Lessons Content */}
      {isOpen && (
        <div className="space-y-2 border-t border-slate-100 p-4 bg-slate-50/30">
          {module.chapterContent.length === 0 ? (
            <p className="py-4 text-center text-xs text-slate-400">No lessons available in this module yet.</p>
          ) : (
            module.chapterContent.map((lesson, idx) => (
              <LessonItem
                key={lesson.lectureId || idx}
                lesson={lesson}
                index={idx}
                isActive={activeLectureId === lesson.lectureId}
                isCompleted={completedLectureIds.includes(lesson.lectureId)}
                isEnrolled={isEnrolled}
                onSelect={onSelectLesson}
                onToggleComplete={onToggleCompleteLesson}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CourseModule;
