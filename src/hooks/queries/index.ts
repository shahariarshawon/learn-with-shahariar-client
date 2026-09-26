"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService, userService, paymentService, AIService, enrollmentService } from "@/services";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => courseService.getAllCourses(),
  });
};

export const useCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => courseService.getCourseById(courseId),
    enabled: Boolean(courseId),
  });
};

export const useUserEnrolledCourses = (token?: string | null) => {
  return useQuery({
    queryKey: ["enrolled-courses", token],
    queryFn: () => userService.getEnrolledCourses(token),
  });
};

export const useEnrollment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { purchaseId: string; token?: string | null }) =>
      enrollmentService.completeEnrollment(payload.purchaseId, payload.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolled-courses"] });
    },
  });
};

export const usePayment = () => {
  return useMutation({
    mutationFn: (payload: { courseId: string; token?: string | null }) =>
      paymentService.createCheckoutSession(payload.courseId, payload.token),
  });
};

export const useAiChat = () => {
  return useMutation({
    mutationFn: (payload: { prompt: string; courseContext?: string }) =>
      AIService.askTutor(payload.prompt, payload.courseContext),
  });
};
