import { useQuery, useMutation } from "@tanstack/react-query";
import { SubscriptionPlan, ApiResponse } from "@/types";

export const subscriptionService = {
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    return [
      {
        id: "sub-free",
        name: "FREE",
        priceMonthly: 0,
        priceYearly: 0,
        description: "Perfect for getting started and exploring foundational tutorials.",
        features: [
          "Access to 5+ free courses & roadmap previews",
          "Community discussion Q&A forum",
          "Standard video playback speed",
          "Public learning profile",
        ],
      },
      {
        id: "sub-pro",
        name: "PRO",
        priceMonthly: 19,
        priceYearly: 190,
        description: "Best for ambitious software engineers & active job seekers.",
        isPopular: true,
        features: [
          "Unlimited access to ALL 25+ Full-Stack & Architecture courses",
          "Interactive chapter quizzes & downloadable source code",
          "Verified Certificates of Completion",
          "Dynamic student watermark & high-speed streaming",
          "Personal timestamped notes & bookmarks",
        ],
      },
      {
        id: "sub-premium",
        name: "PREMIUM",
        priceMonthly: 39,
        priceYearly: 390,
        description: "Includes 1-on-1 instructor code reviews & career mentorship.",
        features: [
          "Everything in PRO tier included",
          "1-on-1 GitHub pull request code reviews by Shahariar",
          "Priority Q&A responses within 4 hours",
          "Mock technical interviews & resume optimization",
          "Direct Discord private channel access",
        ],
      },
    ];
  },

  subscribeToPlan: async (planId: string, billingPeriod: "monthly" | "yearly"): Promise<ApiResponse> => {
    return { success: true, message: `Subscribed to ${planId} plan successfully!` };
  },
};

export const useSubscriptionPlansQuery = () => {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: () => subscriptionService.getSubscriptionPlans(),
  });
};
