import { UserRole } from "./user";

export type { UserRole };

export type CourseModerationStatus = "pending" | "approved" | "rejected" | "archived";

export interface InstructorMetrics {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
  monthlyEarnings: number;
  completionRate: number;
}

export interface AdminMetrics {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalCourses: number;
  totalRevenue: number;
  pendingApprovals: number;
  activeSubscriptions: number;
}

export interface UserManagementRecord {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: UserRole;
  status: "active" | "inactive" | "suspended";
  joinedDate: string;
  coursesEnrolledCount?: number;
  coursesCreatedCount?: number;
}

export interface CourseModerationRecord {
  id: string;
  title: string;
  thumbnail?: string;
  instructorName: string;
  instructorEmail?: string;
  category: string;
  price: number;
  status: CourseModerationStatus;
  submittedDate: string;
  lecturesCount: number;
}

export interface TransactionRecord {
  id: string;
  transactionId: string;
  userName: string;
  userEmail: string;
  courseTitle: string;
  amount: number;
  status: "succeeded" | "pending" | "refunded" | "failed";
  date: string;
  paymentMethod: string;
}

export interface AnalyticsTimeSeries {
  month: string;
  revenue: number;
  students: number;
  courses?: number;
  views?: number;
}
