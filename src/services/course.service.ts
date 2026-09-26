import { apiClient } from "./api/api-client";
import {
  AllCoursesResponse,
  SingleCourseResponse,
  ApiResponse,
  Chapter,
} from "@/types";

export const courseService = {
  getAllCourses: async (): Promise<AllCoursesResponse> => {
    const { data } = await apiClient.get<AllCoursesResponse>("/api/course/all");
    return data;
  },

  getCourseById: async (courseId: string): Promise<SingleCourseResponse> => {
    const { data } = await apiClient.get<SingleCourseResponse>(`/api/course/${courseId}`);
    return data;
  },

  getEducatorCourses: async (token?: string | null): Promise<AllCoursesResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<AllCoursesResponse>("/api/course/educator-courses", { headers });
    return data;
  },

  updateCourseContent: async (
    courseId: string,
    courseContent: Chapter[],
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.put<ApiResponse>(
      `/api/course/update/${courseId}`,
      { courseContent },
      { headers }
    );
    return data;
  },

  deleteCourse: async (courseId: string, token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.delete<ApiResponse>(`/api/course/delete/${courseId}`, { headers });
    return data;
  },
};
