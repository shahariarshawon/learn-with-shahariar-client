export type PaymentMethod = "stripe" | "bkash" | "nagad" | "sslcommerz";

export interface CouponItem {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface PurchaseRecord {
  id: string;
  _id?: string;
  purchaseId: string;
  courseId: string;
  courseTitle: string;
  courseThumbnail: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export interface PaymentCheckoutRequest {
  courseId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  fullName: string;
  email: string;
  phone: string;
}
