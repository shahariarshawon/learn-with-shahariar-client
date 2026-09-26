import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Course, Chapter, Lecture } from "@/types/course.types";

interface CourseState {
  selectedCourse: Course | null;
  activeChapterId: string | null;
  activeLectureId: string | null;
  completedLectures: Record<string, string[]>; // courseId -> array of lectureIds
  completedRoadmapPhases: Record<string, string[]>; // courseId -> array of phaseIds

  // Actions
  setSelectedCourse: (course: Course | null) => void;
  setActiveLecture: (chapterId: string | null, lectureId: string | null) => void;
  toggleLectureCompleted: (courseId: string, lectureId: string) => void;
  isLectureCompleted: (courseId: string, lectureId: string) => boolean;
  toggleRoadmapPhaseCompleted: (courseId: string, phaseId: string) => void;
  getCourseProgress: (courseId: string, totalLecturesCount: number) => number;
  resetProgress: (courseId: string) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      selectedCourse: null,
      activeChapterId: null,
      activeLectureId: null,
      completedLectures: {},
      completedRoadmapPhases: {},

      setSelectedCourse: (course) => {
        set({ selectedCourse: course });
        if (course && course.courseContent.length > 0) {
          const firstChapter = course.courseContent[0];
          if (firstChapter.chapterContent.length > 0) {
            set({
              activeChapterId: firstChapter.chapterId,
              activeLectureId: firstChapter.chapterContent[0].lectureId,
            });
          }
        }
      },

      setActiveLecture: (chapterId, lectureId) => {
        set({ activeChapterId: chapterId, activeLectureId: lectureId });
      },

      toggleLectureCompleted: (courseId, lectureId) => {
        set((state) => {
          const currentCompleted = state.completedLectures[courseId] || [];
          const exists = currentCompleted.includes(lectureId);
          const updated = exists
            ? currentCompleted.filter((id) => id !== lectureId)
            : [...currentCompleted, lectureId];

          return {
            completedLectures: {
              ...state.completedLectures,
              [courseId]: updated,
            },
          };
        });
      },

      isLectureCompleted: (courseId, lectureId) => {
        const completed = get().completedLectures[courseId] || [];
        return completed.includes(lectureId);
      },

      toggleRoadmapPhaseCompleted: (courseId, phaseId) => {
        set((state) => {
          const currentCompleted = state.completedRoadmapPhases[courseId] || [];
          const exists = currentCompleted.includes(phaseId);
          const updated = exists
            ? currentCompleted.filter((id) => id !== phaseId)
            : [...currentCompleted, phaseId];

          return {
            completedRoadmapPhases: {
              ...state.completedRoadmapPhases,
              [courseId]: updated,
            },
          };
        });
      },

      getCourseProgress: (courseId, totalLecturesCount) => {
        if (!totalLecturesCount || totalLecturesCount === 0) return 0;
        const completed = get().completedLectures[courseId] || [];
        return Math.min(100, Math.round((completed.length / totalLecturesCount) * 100));
      },

      resetProgress: (courseId) => {
        set((state) => ({
          completedLectures: {
            ...state.completedLectures,
            [courseId]: [],
          },
          completedRoadmapPhases: {
            ...state.completedRoadmapPhases,
            [courseId]: [],
          },
        }));
      },
    }),
    {
      name: "lws-course-store",
    }
  )
);

export default useCourseStore;
