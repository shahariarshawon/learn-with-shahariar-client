export interface StudentNote {
  id: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  timestampSeconds: number;
  timestampFormatted: string;
  content: string;
  createdAt: string;
}

export interface LessonBookmark {
  id: string;
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: string;
}

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
