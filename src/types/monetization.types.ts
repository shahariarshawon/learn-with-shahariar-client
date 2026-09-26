export type PaymentMethod = "stripe" | "card" | "bank_transfer";

export type PaymentStatus = "succeeded" | "processing" | "failed" | "canceled";

export interface CheckoutOrder {
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  instructorName: string;
  originalPrice: number;
  discount: number;
  finalPrice: number;
  tax: number;
  totalPayable: number;
}

export interface PurchaseHistoryItem {
  id: string;
  transactionId: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  amountPaid: number;
  date: string;
  status: PaymentStatus;
  paymentMethod: string;
  invoiceUrl?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: "FREE" | "PRO" | "PREMIUM";
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export interface Certificate {
  id: string;
  certificateId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  verificationUrl: string;
  grade?: string;
}

export interface EnrollmentRecord {
  courseId: string;
  enrolledAt: string;
  status: "active" | "completed";
  progressPercent: number;
}
