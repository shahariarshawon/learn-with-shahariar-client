import { apiClient } from "./api/api-client";
import { QuizResponse, ApiResponse, CreateQuizPayload } from "@/types";

export const quizService = {
  getChapterQuiz: async (
    courseId: string,
    chapterId: string,
    token?: string | null
  ): Promise<QuizResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.get<QuizResponse>(
      `/api/quiz/${courseId}/${chapterId}`,
      { headers }
    );
    return data;
  },

  createQuiz: async (
    payload: CreateQuizPayload,
    token?: string | null
  ): Promise<ApiResponse> => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<ApiResponse>(
      "/api/quiz/create",
      payload,
      { headers }
    );
    return data;
  },
};
