import { StudentNote, LessonBookmark } from "./lesson";

export type { StudentNote, LessonBookmark };

export interface LessonResource {
  id: string;
  title: string;
  type: "pdf" | "link" | "zip" | "document";
  url: string;
  fileSize?: string;
}

export interface StudentCourseProgress {
  courseId: string;
  completedLessonIds: string[];
  lastLessonId: string;
  lastPositionSeconds: number;
  progressPercent: number;
  updatedAt: string;
}

export interface SubmitReviewPayload {
  courseId: string;
  rating: number;
  comment: string;
}

export type AddRatingPayload = SubmitReviewPayload;
