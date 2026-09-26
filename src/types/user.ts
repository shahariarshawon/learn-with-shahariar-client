export type UserRole = "student" | "instructor" | "educator" | "admin";

export interface User {
  id?: string;
  _id: string;
  name: string;
  fullName?: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  imageUrl?: string;
  bio?: string;
  createdAt?: string;
  enrolledCourses?: string[];
}

export interface UserData extends User {
  enrolledCourses: string[];
}
