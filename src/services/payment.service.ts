import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "./api/api-client";
import { PurchaseHistoryItem, ApiResponse } from "@/types";

export const paymentService = {
  createCheckoutSession: async (courseId: string, token?: string | null) => {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const { data } = await apiClient.post<{ success: boolean; session_url?: string; message?: string }>(
      "/api/user/purchase",
      { courseId },
      { headers }
    );
    return data;
  },

  getPurchaseHistory: async (token?: string | null): Promise<PurchaseHistoryItem[]> => {
    return [
      {
        id: "pur-1",
        transactionId: "ch_3N8x7F2eZvKYlo2C1g9u7XzL",
        courseId: "c-1",
        courseTitle: "Master Next.js 15 & Full Stack TypeScript",
        courseThumbnail: "/course_1.png",
        amountPaid: 44.99,
        date: "2024-05-22",
        status: "succeeded",
        paymentMethod: "Stripe Credit Card",
        invoiceUrl: "#",
      },
      {
        id: "pur-2",
        transactionId: "ch_3N8x7F2eZvKYlo2C1g9u7XzM",
        courseId: "c-2",
        courseTitle: "Full Stack Web Development Roadmap",
        courseThumbnail: "/course_2.png",
        amountPaid: 79.99,
        date: "2024-04-10",
        status: "succeeded",
        paymentMethod: "Stripe Credit Card",
        invoiceUrl: "#",
      },
    ];
  },
};

export const useCheckoutMutation = () => {
  return useMutation({
    mutationFn: ({ courseId, token }: { courseId: string; token?: string | null }) =>
      paymentService.createCheckoutSession(courseId, token),
  });
};

export const usePurchaseHistoryQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["purchase-history"],
    queryFn: () => paymentService.getPurchaseHistory(token),
  });
};
