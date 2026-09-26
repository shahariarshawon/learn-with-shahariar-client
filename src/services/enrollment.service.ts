import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import { ApiResponse, EnrollmentRecord } from "@/types";

export const enrollmentService = {
  completeEnrollment: async (purchaseId: string, token?: string | null): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/user/update-course-enrollment",
      { purchaseId },
      { headers }
    );
    return data;
  },

  getUserEnrollments: async (token?: string | null): Promise<EnrollmentRecord[]> => {
    return [
      { courseId: "c-1", enrolledAt: "2024-05-22", status: "active", progressPercent: 65 },
      { courseId: "c-2", enrolledAt: "2024-04-10", status: "completed", progressPercent: 100 },
    ];
  },
};

export const useEnrollmentMutation = () => {
  return useMutation({
    mutationFn: ({ purchaseId, token }: { purchaseId: string; token?: string | null }) =>
      enrollmentService.completeEnrollment(purchaseId, token),
  });
};
