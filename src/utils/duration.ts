import humanizeDurationLib from "humanize-duration";
import { Chapter, Course } from "@/types";

export const formatDuration = (minutes: number): string => {
  return humanizeDurationLib(minutes * 60 * 1000, { units: ["h", "m"] });
};

export const humanizeDuration = (seconds: number): string => {
  return humanizeDurationLib(seconds * 1000, { units: ["h", "m"] });
};

export const calculateChapterTime = (chapter: Chapter): string => {
  let time = 0;
  if (Array.isArray(chapter.chapterContent)) {
    chapter.chapterContent.forEach((lecture) => {
      time += Number(lecture.lectureDuration) || 0;
    });
  }
  return formatDuration(time);
};

export const calculateCourseDuration = (course: Course): string => {
  let time = 0;
  if (Array.isArray(course.courseContent)) {
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

export const calculateNoOfLectures = (course: Course): number => {
  let totalLectures = 0;
  if (Array.isArray(course.courseContent)) {
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
  }
  return totalLectures;
};
