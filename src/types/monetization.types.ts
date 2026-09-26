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

export interface EnrollmentRecord {
  courseId: string;
  enrolledAt: string;
  status: "active" | "completed";
  progressPercent: number;
}
