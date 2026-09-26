export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  course?: T;
  courses?: T;
  enrolledCourses?: T;
}

export interface GenericApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
