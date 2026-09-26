"use client";

import React, { useState } from "react";
import { Chapter, Lecture } from "@/types/course.types";
import CourseModule from "./CourseModule";
import { humanizeDuration } from "@/utils/duration";

interface CourseSyllabusProps {
  chapters: Chapter[];
  isEnrolled?: boolean;
  activeLectureId?: string | null;
  completedLectureIds?: string[];
  onSelectLesson?: (lesson: Lecture) => void;
  onToggleCompleteLesson?: (lessonId: string) => void;
}

export const CourseSyllabus: React.FC<CourseSyllabusProps> = ({
  chapters,
  isEnrolled = false,
  activeLectureId,
  completedLectureIds = [],
  onSelectLesson,
  onToggleCompleteLesson,
}) => {
  const [expandAll, setExpandAll] = useState(false);

  const totalLessons = chapters.reduce((acc, ch) => acc + (ch.chapterContent?.length || 0), 0);
  const totalDurationMinutes = chapters.reduce((acc, ch) => {
    return acc + (ch.chapterContent?.reduce((lAcc, lec) => lAcc + (lec.lectureDuration || 0), 0) || 0);
  }, 0);

  return (
    <div className="space-y-6">
      {/* Syllabus Summary Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Course Syllabus</h3>
          <p className="mt-1 text-sm text-slate-500">
            {chapters.length} Modules • {totalLessons} Lessons • Total Runtime:{" "}
            <span className="font-semibold text-slate-700">{humanizeDuration(totalDurationMinutes * 60)}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpandAll(!expandAll)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          {expandAll ? "Collapse All Modules" : "Expand All Modules"}
        </button>
      </div>

      {/* Modules List */}
      {chapters.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
          No syllabus content published for this course yet.
        </div>
      ) : (
        <div className="space-y-4">
          {chapters.map((chapter, idx) => (
            <CourseModule
              key={chapter.chapterId || idx}
              module={chapter}
              moduleIndex={idx}
              isDefaultOpen={expandAll || idx === 0}
              activeLectureId={activeLectureId}
              completedLectureIds={completedLectureIds}
              isEnrolled={isEnrolled}
              onSelectLesson={onSelectLesson}
              onToggleCompleteLesson={onToggleCompleteLesson}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSyllabus;
