import { UserData } from "./user";
import { Course } from "./course";
import { CourseProgressData, CourseProgressItem } from "./enrollment";

export type { UserData, CourseProgressData, CourseProgressItem };

export interface UserDataResponse {
  success: boolean;
  message?: string;
  user?: UserData;
}

export interface EnrolledCoursesResponse {
  success: boolean;
  message?: string;
  enrolledCourses?: Course[];
}

export interface PurchaseResponse {
  success: boolean;
  message?: string;
  purchaseId?: string;
  session_url?: string;
}

export interface CourseProgressResponse {
  success: boolean;
  message?: string;
  progressData?: CourseProgressData;
}
