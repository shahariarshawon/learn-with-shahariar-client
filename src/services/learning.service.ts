import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import { ApiResponse, SubmitReviewPayload, CourseProgressData } from "@/types";

export const learningService = {
  getCourseProgress: async (courseId: string, token?: string | null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<{ success: boolean; progressData?: CourseProgressData }>(
      "/api/user/get-course-progress",
      { courseId },
      { headers }
    );
    return data;
  },

  markLessonComplete: async (courseId: string, lectureId: string, token?: string | null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/update-course-progress",
      { courseId, lectureId },
      { headers }
    );
    return data;
  },

  submitCourseReview: async (payload: SubmitReviewPayload, token?: string | null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/add-rating",
      payload,
      { headers }
    );
    return data;
  },
};

// ================================================
// TanStack Query Hooks
// ================================================

export const LEARNING_KEYS = {
  PROGRESS: (courseId: string) => ["course-progress", courseId] as const,
};

export const useCourseProgressQuery = (courseId: string, token?: string | null) => {
  return useQuery({
    queryKey: LEARNING_KEYS.PROGRESS(courseId),
    queryFn: () => learningService.getCourseProgress(courseId, token),
    enabled: Boolean(courseId && token),
  });
};

export const useMarkLessonCompleteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      courseId,
      lectureId,
      token,
    }: {
      courseId: string;
      lectureId: string;
      token?: string | null;
    }) => learningService.markLessonComplete(courseId, lectureId, token),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: LEARNING_KEYS.PROGRESS(variables.courseId) });
    },
  });
};

export const useSubmitReviewMutation = () => {
  return useMutation({
    mutationFn: ({ payload, token }: { payload: SubmitReviewPayload; token?: string | null }) =>
      learningService.submitCourseReview(payload, token),
  });
};
