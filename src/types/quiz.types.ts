export interface QuizQuestion {
  question: string;
  options: string[];
  answer: number;
}

export interface Quiz {
  _id?: string;
  courseId: string;
  chapterId: string;
  title: string;
  questions: QuizQuestion[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateQuizPayload {
  courseId: string;
  chapterId: string;
  title: string;
  questions: QuizQuestion[];
}
