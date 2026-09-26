import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import {
  InstructorMetrics,
  AnalyticsTimeSeries,
  ApiResponse,
} from "@/types";

export const instructorService = {
  getInstructorMetrics: async (token?: string | null): Promise<InstructorMetrics> => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
      const { data } = await apiClient.get<{ success: boolean; metrics: InstructorMetrics }>(
        "/api/educator/dashboard",
        { headers }
      );
      return (
        data.metrics || {
          totalCourses: 8,
          totalStudents: 1420,
          totalRevenue: 28450,
          averageRating: 4.9,
          monthlyEarnings: 4250,
          completionRate: 78,
        }
      );
    } catch {
      return {
        totalCourses: 8,
        totalStudents: 1420,
        totalRevenue: 28450,
        averageRating: 4.9,
        monthlyEarnings: 4250,
        completionRate: 78,
      };
    }
  },

  getAnalyticsData: async (token?: string | null): Promise<AnalyticsTimeSeries[]> => {
    return [
      { month: "Jan", revenue: 2400, students: 120, views: 3200 },
      { month: "Feb", revenue: 3100, students: 180, views: 4100 },
      { month: "Mar", revenue: 4200, students: 240, views: 5600 },
      { month: "Apr", revenue: 3800, students: 210, views: 5000 },
      { month: "May", revenue: 5100, students: 310, views: 6800 },
      { month: "Jun", revenue: 6400, students: 420, views: 8200 },
    ];
  },
};

export const useInstructorMetricsQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["instructor-metrics"],
    queryFn: () => instructorService.getInstructorMetrics(token),
  });
};

export const useInstructorAnalyticsQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["instructor-analytics"],
    queryFn: () => instructorService.getAnalyticsData(token),
  });
};
