export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type CourseStatus = "draft" | "published";

export interface Resource {
  id: string;
  title: string;
  fileUrl: string;
  fileType?: string;
  fileSize?: string;
}

export interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number; // in minutes
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
  description?: string;
  resources?: Resource[];
}

export interface Chapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed?: boolean;
}

// Alias interfaces for Module & Lesson
export type Lesson = Lecture;
export type Module = Chapter;

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  topics: string[];
  completed?: boolean;
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface EducatorInfo {
  _id: string;
  name?: string;
  fullName?: string;
  email?: string;
  imageUrl?: string;
  bio?: string;
  totalStudents?: number;
  totalCourses?: number;
}

export interface CourseRating {
  _id?: string;
  userId: string;
  rating: number;
}

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  shortDescription?: string;
  coursePrice: number;
  isPublished: boolean;
  status?: CourseStatus;
  discount: number;
  level?: CourseLevel;
  category?: string;
  duration?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  roadmap?: RoadmapPhase[];
  courseContent: Chapter[];
  educator: string | EducatorInfo;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  reviews?: CourseReview[];
  courseThumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateCoursePayload {
  courseTitle: string;
  courseDescription: string;
  shortDescription?: string;
  coursePrice: number;
  discount: number;
  level?: CourseLevel;
  category?: string;
  duration?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  roadmap?: RoadmapPhase[];
  courseContent: Chapter[];
  isPublished?: boolean;
}

export interface LectureFormData {
  lectureTitle: string;
  lectureDuration: string | number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder?: number;
  description?: string;
}
