import { Course } from "./course.types";
import { UserData, CourseProgressData } from "./user.types";
import { EducatorDashboardData, EnrolledStudentItem } from "./educator.types";
import { Quiz } from "./quiz.types";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface AllCoursesResponse {
  success: boolean;
  courses: Course[];
  message?: string;
}

export interface SingleCourseResponse {
  success: boolean;
  courseData: Course;
  message?: string;
}

export interface UserDataResponse {
  success: boolean;
  user: UserData;
  message?: string;
}

export interface EnrolledCoursesResponse {
  success: boolean;
  enrolledCourses: Course[];
  message?: string;
}

export interface PurchaseResponse {
  success: boolean;
  session_url?: string;
  message?: string;
}

export interface CourseProgressResponse {
  success: boolean;
  progressData?: CourseProgressData;
  message?: string;
}

export interface QuizResponse {
  success: boolean;
  quiz?: Quiz;
  message?: string;
}

export interface EducatorDashboardResponse {
  success: boolean;
  dashboardData: EducatorDashboardData;
  message?: string;
}

export interface EnrolledStudentsResponse {
  success: boolean;
  enrolledStudents: EnrolledStudentItem[];
  message?: string;
}

export interface AddRatingPayload {
  courseId: string;
  rating: number;
}
