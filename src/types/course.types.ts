export * from "./course";
export * from "./lesson";

export interface AllCoursesResponse {
  success: boolean;
  message?: string;
  courses?: import("./course").Course[];
}

export interface SingleCourseResponse {
  success: boolean;
  message?: string;
  course?: import("./course").Course;
  courseData?: import("./course").Course;
}
