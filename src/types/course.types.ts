export interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder: number;
}

export interface Chapter {
  chapterId: string;
  chapterOrder: number;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed?: boolean;
}

export interface CourseRating {
  _id?: string;
  userId: string;
  rating: number;
}

export interface EducatorInfo {
  _id: string;
  name?: string;
  fullName?: string;
  email?: string;
  imageUrl?: string;
}

export interface Course {
  _id: string;
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  isPublished: boolean;
  discount: number;
  courseContent: Chapter[];
  educator: string | EducatorInfo;
  enrolledStudents: string[];
  courseRatings: CourseRating[];
  courseThumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateCoursePayload {
  courseTitle: string;
  courseDescription: string;
  coursePrice: number;
  discount: number;
  courseContent: Chapter[];
}

export interface LectureFormData {
  lectureTitle: string;
  lectureDuration: string | number;
  lectureUrl: string;
  isPreviewFree: boolean;
  lectureOrder?: number;
}
