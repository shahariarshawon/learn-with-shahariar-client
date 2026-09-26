import { apiClient } from "./api/api-client";
import {
  EducatorDashboardResponse,
  EnrolledStudentsResponse,
  ApiResponse,
} from "@/types";

export const educatorService = {
  updateEducatorRole: async (token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<ApiResponse>("/api/educator/update-role", { headers });
    return data;
  },

  getDashboardData: async (token?: string | null): Promise<EducatorDashboardResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<EducatorDashboardResponse>(
      "/api/educator/dashboard",
      { headers }
    );
    return data;
  },

  getEnrolledStudents: async (token?: string | null): Promise<EnrolledStudentsResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<EnrolledStudentsResponse>(
      "/api/educator/enrolled-students",
      { headers }
    );
    return data;
  },

  addCourse: async (formData: FormData, token?: string | null): Promise<ApiResponse> => {
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const { data } = await apiClient.post<ApiResponse>(
      "/api/educator/add-course",
      formData,
      {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  },
};
