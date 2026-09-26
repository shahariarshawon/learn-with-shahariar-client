export interface Resource {
  id: string;
  title: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: string;
}

export interface LessonItem {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder?: number;
  order?: number;
  description?: string;
  resources?: Resource[];
}

export type Lecture = LessonItem;

export interface CourseChapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: LessonItem[];
  collapsed?: boolean;
}

export type Chapter = CourseChapter;
export type Module = CourseChapter;
export type Lesson = LessonItem;

export interface LearningObjective {
  id: string;
  text: string;
}

export interface LessonBookmark {
  id: string;
  courseId?: string;
  lessonId: string;
  lessonTitle: string;
  timestampSeconds?: number;
  note?: string;
  createdAt: string;
}

export interface StudentNote {
  id: string;
  courseId?: string;
  lessonId: string;
  lessonTitle: string;
  timestampSeconds: number;
  timestampFormatted?: string;
  content?: string;
  text?: string;
  createdAt: string;
}
