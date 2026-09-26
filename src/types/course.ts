import { User } from "./user";
import { CourseChapter, LearningObjective, Chapter } from "./lesson";

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";
export type CourseCategory = "Web Development" | "Cyber Security" | "Artificial Intelligence" | "DevOps" | "Mobile App";
export type CourseStatus = "draft" | "published";

export interface CourseRating {
  _id?: string;
  userId: string;
  rating: number;
}

export interface CourseReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userImage?: string;
  rating: number; // 1 to 5
  comment: string;
  createdAt?: string;
  date?: string;
}

export interface CourseEducator {
  _id?: string;
  name?: string;
  fullName?: string;
  email?: string;
  imageUrl?: string;
  profileImage?: string;
  bio?: string;
  totalStudents?: number;
  totalCourses?: number;
}

export type EducatorInfo = CourseEducator;

export interface RoadmapPhase {
  id: string;
  phaseNumber: number;
  title: string;
  description: string;
  topics: string[];
  completed?: boolean;
}

export interface Course {
  id?: string;
  _id: string;
  title?: string;
  courseTitle: string;
  description?: string;
  courseDescription: string;
  shortDescription?: string;
  thumbnail?: string;
  courseThumbnail: string;
  price?: number;
  coursePrice: number;
  discount: number;
  category?: CourseCategory | string;
  level?: CourseLevel | string;
  duration?: string;
  instructor?: User | CourseEducator;
  educator: string | CourseEducator | User;
  modules?: CourseChapter[];
  courseContent: CourseChapter[];
  lessons?: number;
  learningObjectives?: LearningObjective[];
  learningOutcomes?: string[];
  prerequisites?: string[];
  roadmap?: RoadmapPhase[];
  courseRatings?: CourseRating[];
  reviews?: CourseReview[];
  enrolledStudents: string[];
  isPublished: boolean;
  status?: CourseStatus;
  createdAt?: string;
  updatedAt?: string;
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
