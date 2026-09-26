import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import {
  AdminMetrics,
  UserManagementRecord,
  CourseModerationRecord,
  TransactionRecord,
  CourseModerationStatus,
  UserRole,
  ApiResponse,
} from "@/types";

export const adminService = {
  getAdminMetrics: async (token?: string | null): Promise<AdminMetrics> => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const { data } = await apiClient.get<{ success: boolean; metrics: AdminMetrics }>(
        "/api/admin/metrics",
        { headers }
      );
      return (
        data.metrics || {
          totalUsers: 3450,
          totalStudents: 3120,
          totalInstructors: 42,
          totalCourses: 128,
          totalRevenue: 142500,
          pendingApprovals: 5,
          activeSubscriptions: 890,
        }
      );
    } catch {
      return {
        totalUsers: 3450,
        totalStudents: 3120,
        totalInstructors: 42,
        totalCourses: 128,
        totalRevenue: 142500,
        pendingApprovals: 5,
        activeSubscriptions: 890,
      };
    }
  },

  getAllUsers: async (token?: string | null): Promise<UserManagementRecord[]> => {
    return [
      {
        id: "u-1",
        name: "Shahariar Shawon",
        email: "shahariar@example.com",
        role: "admin",
        status: "active",
        joinedDate: "2024-01-15",
        coursesCreatedCount: 8,
      },
      {
        id: "u-2",
        name: "Tanvir Ahmed",
        email: "tanvir@example.com",
        role: "instructor",
        status: "active",
        joinedDate: "2024-02-10",
        coursesCreatedCount: 3,
      },
      {
        id: "u-3",
        name: "Nusrat Jahan",
        email: "nusrat@example.com",
        role: "student",
        status: "active",
        joinedDate: "2024-03-05",
        coursesEnrolledCount: 4,
      },
      {
        id: "u-4",
        name: "Mahmud Hasan",
        email: "mahmud@example.com",
        role: "student",
        status: "active",
        joinedDate: "2024-03-12",
        coursesEnrolledCount: 2,
      },
    ];
  },

  updateUserRole: async (userId: string, role: UserRole, token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.patch<ApiResponse>(
      `/api/admin/users/${userId}/role`,
      { role },
      { headers }
    );
    return data;
  },

  updateUserStatus: async (userId: string, status: string, token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.patch<ApiResponse>(
      `/api/admin/users/${userId}/status`,
      { status },
      { headers }
    );
    return data;
  },

  getModerationQueue: async (token?: string | null): Promise<CourseModerationRecord[]> => {
    return [
      {
        id: "cm-1",
        title: "Enterprise Microservices with Node.js & Docker",
        instructorName: "Tanvir Ahmed",
        category: "Backend Development",
        price: 89.99,
        status: "pending",
        submittedDate: "2024-05-18",
        lecturesCount: 24,
      },
      {
        id: "cm-2",
        title: "Mastering Next.js 15 & React 19 Architecture",
        instructorName: "Shahariar Shawon",
        category: "Frontend Engineering",
        price: 99.99,
        status: "approved",
        submittedDate: "2024-04-10",
        lecturesCount: 36,
      },
      {
        id: "cm-3",
        title: "Python for Data Engineering & Pipelines",
        instructorName: "Anik Rahman",
        category: "Data Engineering",
        price: 69.99,
        status: "pending",
        submittedDate: "2024-05-20",
        lecturesCount: 18,
      },
    ];
  },

  updateModerationStatus: async (
    courseId: string,
    status: CourseModerationStatus,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.patch<ApiResponse>(
      `/api/admin/courses/${courseId}/moderation`,
      { status },
      { headers }
    );
    return data;
  },

  getTransactions: async (token?: string | null): Promise<TransactionRecord[]> => {
    return [
      {
        id: "tx-1",
        transactionId: "ch_3N8x7F2eZvKYlo2C1g9u7XzL",
        userName: "Nusrat Jahan",
        userEmail: "nusrat@example.com",
        courseTitle: "Master Next.js 15 & Full Stack TypeScript",
        amount: 49.99,
        status: "succeeded",
        date: "2024-05-22",
        paymentMethod: "Stripe Credit Card",
      },
      {
        id: "tx-2",
        transactionId: "ch_3N8x7F2eZvKYlo2C1g9u7XzM",
        userName: "Mahmud Hasan",
        userEmail: "mahmud@example.com",
        courseTitle: "Full Stack Web Development",
        amount: 79.99,
        status: "succeeded",
        date: "2024-05-21",
        paymentMethod: "Stripe Credit Card",
      },
    ];
  },
};

export const useAdminMetricsQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["admin-metrics"],
    queryFn: () => adminService.getAdminMetrics(token),
  });
};

export const useAdminUsersQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: () => adminService.getAllUsers(token),
  });
};

export const useAdminModerationQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["admin-moderation"],
    queryFn: () => adminService.getModerationQueue(token),
  });
};

export const useAdminTransactionsQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["admin-transactions"],
    queryFn: () => adminService.getTransactions(token),
  });
};
