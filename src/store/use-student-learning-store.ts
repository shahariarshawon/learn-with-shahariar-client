import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StudentNote, LessonBookmark } from "@/types/learning.types";

interface StudentLearningState {
  lastWatchedCourseId: string | null;
  lastWatchedLessonId: string | null;
  lastWatchedCourseTitle: string | null;
  lastWatchedLessonTitle: string | null;
  playbackSpeed: number;
  notes: Record<string, StudentNote[]>; // courseId -> array of notes
  bookmarks: Record<string, LessonBookmark[]>; // courseId -> array of bookmarks

  // Actions
  setLastWatched: (
    courseId: string,
    lessonId: string,
    courseTitle: string,
    lessonTitle: string
  ) => void;
  setPlaybackSpeed: (speed: number) => void;
  addNote: (note: Omit<StudentNote, "id" | "createdAt">) => void;
  editNote: (courseId: string, noteId: string, newContent: string) => void;
  deleteNote: (courseId: string, noteId: string) => void;
  toggleBookmark: (bookmark: Omit<LessonBookmark, "id" | "createdAt">) => void;
  isBookmarked: (courseId: string, lessonId: string) => boolean;
}

export const useStudentLearningStore = create<StudentLearningState>()(
  persist(
    (set, get) => ({
      lastWatchedCourseId: null,
      lastWatchedLessonId: null,
      lastWatchedCourseTitle: null,
      lastWatchedLessonTitle: null,
      playbackSpeed: 1,
      notes: {},
      bookmarks: {},

      setLastWatched: (courseId, lessonId, courseTitle, lessonTitle) => {
        set({
          lastWatchedCourseId: courseId,
          lastWatchedLessonId: lessonId,
          lastWatchedCourseTitle: courseTitle,
          lastWatchedLessonTitle: lessonTitle,
        });
      },

      setPlaybackSpeed: (speed) => {
        set({ playbackSpeed: speed });
      },

      addNote: (noteData) => {
        const newNote: StudentNote = {
          ...noteData,
          id: `note-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const currentNotes = state.notes[noteData.courseId] || [];
          return {
            notes: {
              ...state.notes,
              [noteData.courseId]: [newNote, ...currentNotes],
            },
          };
        });
      },

      editNote: (courseId, noteId, newContent) => {
        set((state) => {
          const currentNotes = state.notes[courseId] || [];
          const updated = currentNotes.map((note) =>
            note.id === noteId ? { ...note, content: newContent } : note
          );
          return {
            notes: {
              ...state.notes,
              [courseId]: updated,
            },
          };
        });
      },

      deleteNote: (courseId, noteId) => {
        set((state) => {
          const currentNotes = state.notes[courseId] || [];
          const updated = currentNotes.filter((note) => note.id !== noteId);
          return {
            notes: {
              ...state.notes,
              [courseId]: updated,
            },
          };
        });
      },

      toggleBookmark: (bmData) => {
        set((state) => {
          const currentBMs = state.bookmarks[bmData.courseId] || [];
          const exists = currentBMs.some((bm) => bm.lessonId === bmData.lessonId);

          const updated = exists
            ? currentBMs.filter((bm) => bm.lessonId !== bmData.lessonId)
            : [
                {
                  ...bmData,
                  id: `bm-${Date.now()}`,
                  createdAt: new Date().toISOString(),
                },
                ...currentBMs,
              ];

          return {
            bookmarks: {
              ...state.bookmarks,
              [bmData.courseId]: updated,
            },
          };
        });
      },

      isBookmarked: (courseId, lessonId) => {
        const currentBMs = get().bookmarks[courseId] || [];
        return currentBMs.some((bm) => bm.lessonId === lessonId);
      },
    }),
    {
      name: "lws-student-learning-store",
    }
  )
);

export default useStudentLearningStore;
