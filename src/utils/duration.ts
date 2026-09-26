import humanizeDurationLib from "humanize-duration";
import { CourseChapter, Course } from "@/types";

export const formatDuration = (minutes: number): string => {
  return humanizeDurationLib(minutes * 60 * 1000, { units: ["h", "m"] });
};

export const humanizeDuration = (seconds: number): string => {
  return humanizeDurationLib(seconds * 1000, { units: ["h", "m"] });
};

export const calculateChapterTime = (chapter: Partial<CourseChapter> | null | undefined): string => {
  let time = 0;
  if (chapter && Array.isArray(chapter.chapterContent)) {
    chapter.chapterContent.forEach((lecture) => {
      time += Number(lecture.lectureDuration) || 0;
    });
  }
  return formatDuration(time);
};

export const calculateCourseDuration = (course: Partial<Course> | null | undefined): string => {
  let time = 0;
  if (course && Array.isArray(course.courseContent)) {
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        chapter.chapterContent.forEach((lecture) => {
          time += Number(lecture.lectureDuration) || 0;
        });
      }
    });
  }
  return formatDuration(time);
};

export const calculateNoOfLectures = (course: Partial<Course> | null | undefined): number => {
  let totalLectures = 0;
  if (course && Array.isArray(course.courseContent)) {
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
  }
  return totalLectures;
};
