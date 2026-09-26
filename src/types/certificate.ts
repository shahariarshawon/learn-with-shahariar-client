export interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  studentEmail?: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  completionDate?: string;
  verificationUrl: string;
  issueDate?: string;
  issuedAt?: string;
  grade?: string;
}
