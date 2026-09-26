export interface UserData {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  enrolledCourses: string[];
  role?: "student" | "educator" | "admin";
}

export interface CourseProgressData {
  _id?: string;
  userId?: string;
  courseId: string;
  completed?: boolean;
  lectureCompleted: string[];
}

export interface CourseProgressItem {
  totalLectures: number;
  lectureCompleted: number;
}
