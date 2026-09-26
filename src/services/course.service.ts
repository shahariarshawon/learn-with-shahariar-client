import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import {
  AllCoursesResponse,
  SingleCourseResponse,
  ApiResponse,
  Chapter,
  Course,
  CreateCoursePayload,
} from "@/types";

export const courseService = {
  getAllCourses: async (): Promise<AllCoursesResponse> => {
    try {
      const { data } = await apiClient.get<AllCoursesResponse>("/api/course/all");
      return data;
    } catch {
      return { success: false, courses: [] };
    }
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

  createCourse: async (
    payload: CreateCoursePayload,
    token?: string | null
  ): Promise<ApiResponse & { course?: Course }> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse & { course?: Course }>(
      "/api/course/create",
      payload,
      { headers }
    );
    return data;
  },

  updateCourse: async (
    courseId: string,
    payload: Partial<CreateCoursePayload>,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.put<ApiResponse>(
      `/api/course/update/${courseId}`,
      payload,
      { headers }
    );
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

  toggleCoursePublishStatus: async (
    courseId: string,
    isPublished: boolean,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.patch<ApiResponse>(
      `/api/course/status/${courseId}`,
      { isPublished },
      { headers }
    );
    return data;
  },
};

// ================================================
// TanStack Query Hooks for Component Integration
// ================================================

export const QUERY_KEYS = {
  COURSES: ["courses"] as const,
  COURSE: (id: string) => ["course", id] as const,
  EDUCATOR_COURSES: ["educator-courses"] as const,
};

export const useCourses = () => {
  return useQuery({
    queryKey: QUERY_KEYS.COURSES,
    queryFn: () => courseService.getAllCourses(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.COURSE(courseId),
    queryFn: () => courseService.getCourseById(courseId),
    enabled: Boolean(courseId),
  });
};

export const useEducatorCourses = (token?: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.EDUCATOR_COURSES,
    queryFn: () => courseService.getEducatorCourses(token),
  });
};

export const useCreateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ payload, token }: { payload: CreateCoursePayload; token?: string | null }) =>
      courseService.createCourse(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COURSES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EDUCATOR_COURSES });
    },
  });
};

export const useUpdateCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      payload,
      token,
    }: {
      courseId: string;
      payload: Partial<CreateCoursePayload>;
      token?: string | null;
    }) => courseService.updateCourse(courseId, payload, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COURSES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COURSE(variables.courseId) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EDUCATOR_COURSES });
    },
  });
};

export const useDeleteCourseMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, token }: { courseId: string; token?: string | null }) =>
      courseService.deleteCourse(courseId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COURSES });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EDUCATOR_COURSES });
    },
  });
};
