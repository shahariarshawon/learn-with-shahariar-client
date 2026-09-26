"use client";

import React from "react";
import { useStudentLearningStore } from "@/store/use-student-learning-store";

interface LessonBookmarksProps {
  courseId: string;
  currentLessonId: string;
  currentLessonTitle: string;
  onSelectBookmarkLesson?: (lessonId: string) => void;
}

export const LessonBookmarks: React.FC<LessonBookmarksProps> = ({
  courseId,
  currentLessonId,
  currentLessonTitle,
  onSelectBookmarkLesson,
}) => {
  const bookmarksMap = useStudentLearningStore((state) => state.bookmarks);
  const toggleBookmark = useStudentLearningStore((state) => state.toggleBookmark);
  const isBookmarked = useStudentLearningStore((state) => state.isBookmarked(courseId, currentLessonId));

  const courseBookmarks = bookmarksMap[courseId] || [];

  const handleToggle = () => {
    toggleBookmark({
      courseId,
      lessonId: currentLessonId,
      lessonTitle: currentLessonTitle,
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Lesson Bookmark Header */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-slate-900">Bookmark Current Lesson</h4>
          <p className="text-xs text-slate-500">Save important lessons for quick reference later</p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
            isBookmarked
              ? "bg-amber-100 text-amber-900 border border-amber-300"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <span>{isBookmarked ? "★ Bookmarked" : "☆ Bookmark Lesson"}</span>
        </button>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        <h4 className="text-base font-bold text-slate-900">Saved Bookmarks ({courseBookmarks.length})</h4>

        {courseBookmarks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
            No bookmarked lessons yet. Click "☆ Bookmark Lesson" to save important lectures for quick access.
          </div>
        ) : (
          <div className="space-y-2">
            {courseBookmarks.map((bm) => (
              <div
                key={bm.id}
                onClick={() => onSelectBookmarkLesson && onSelectBookmarkLesson(bm.lessonId)}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-[#7F265B]/30 hover:bg-slate-50 cursor-pointer transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber-500 font-bold text-base">★</span>
                  <div>
                    <h5 className="text-sm font-bold text-slate-800">{bm.lessonTitle}</h5>
                    <span className="text-[11px] text-slate-400">
                      Bookmarked on {new Date(bm.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#7F265B]">Jump →</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonBookmarks;
