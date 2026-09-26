"use client";

import { useUser } from "@clerk/nextjs";
import { APP_CONFIG } from "@/constants/config";
import { useUserStore } from "@/store/use-user-store";

export function useAuthRole() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { userData, isEducator: storeIsEducator } = useUserStore();

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAllowedEducator = userEmail === APP_CONFIG.allowedEducatorEmail;
  const isClerkEducator = user?.publicMetadata?.role === "educator";
  const isDbEducator = userData?.role === "educator";

  const isEducator = Boolean(
    isAllowedEducator || isClerkEducator || isDbEducator || storeIsEducator
  );

  return {
    user,
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    isEducator,
    isAllowedEducator,
    role: isEducator ? "educator" : "student",
  };
}
