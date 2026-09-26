"use client";

import { useQuery } from "@tanstack/react-query";
import { courseService } from "@/services";

export function useCourses() {
  return useQuery({
    queryKey: ["courses", "all"],
    queryFn: async () => {
      const response = await courseService.getAllCourses();
      return response.courses || [];
    },
  });
}

export function useCourse(courseId: string) {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const response = await courseService.getCourseById(courseId);
      return response.courseData;
    },
    enabled: Boolean(courseId),
  });
}
