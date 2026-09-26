import { apiClient } from "./api/api-client";
import {
  UserDataResponse,
  EnrolledCoursesResponse,
  PurchaseResponse,
  CourseProgressResponse,
  ApiResponse,
  AddRatingPayload,
} from "@/types";

export const userService = {
  getUserData: async (token?: string | null): Promise<UserDataResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<UserDataResponse>("/api/user/data", { headers });
    return data;
  },

  getEnrolledCourses: async (token?: string | null): Promise<EnrolledCoursesResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<EnrolledCoursesResponse>("/api/user/enrolled-courses", { headers });
    return data;
  },

  purchaseCourse: async (courseId: string, token?: string | null): Promise<PurchaseResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<PurchaseResponse>(
      "/api/user/purchase",
      { courseId },
      { headers }
    );
    return data;
  },

  updateCourseEnrollment: async (purchaseId: string, token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/update-course",
      { purchaseId },
      { headers }
    );
    return data;
  },

  getCourseProgress: async (courseId: string, token?: string | null): Promise<CourseProgressResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<CourseProgressResponse>(
      "/api/user/get-course-progress",
      { courseId },
      { headers }
    );
    return data;
  },

  updateCourseProgress: async (
    courseId: string,
    lectureId: string,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/update-course-progress",
      { courseId, lectureId },
      { headers }
    );
    return data;
  },

  addRating: async (
    payload: AddRatingPayload,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/add-rating",
      payload,
      { headers }
    );
    return data;
  },
};
