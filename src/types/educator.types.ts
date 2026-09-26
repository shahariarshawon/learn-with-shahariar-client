export interface EnrolledStudentData {
  courseTitle: string;
  student: {
    _id: string;
    name: string;
    imageUrl: string;
  };
}

export interface EducatorDashboardData {
  totalEarnings: number;
  totalCourses: number;
  enrolledStudentsData: EnrolledStudentData[];
}

export interface EnrolledStudentItem {
  student: {
    _id: string;
    name: string;
    imageUrl?: string;
  };
  courseTitle: string;
  purchaseDate: string;
}

export interface EducatorDashboardResponse {
  success: boolean;
  message?: string;
  dashboardData?: EducatorDashboardData;
}

export interface EnrolledStudentsResponse {
  success: boolean;
  message?: string;
  enrolledStudents?: EnrolledStudentItem[];
}
