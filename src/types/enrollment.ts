export interface CourseProgressData {
  _id?: string;
  userId?: string;
  courseId: string;
  completed?: boolean;
  lectureCompleted: string[];
}

export interface CourseProgressItem {
  totalLectures: number;
  lectureCompleted: number;
}

export interface StudentEnrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completed: boolean;
}
