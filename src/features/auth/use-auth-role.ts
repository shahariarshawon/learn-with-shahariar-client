"use client";

import { useUser } from "@clerk/nextjs";
import { APP_CONFIG } from "@/constants/config";
import { useUserStore } from "@/store/use-user-store";

export function useAuthRole() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { userData, isEducator: storeIsEducator } = useUserStore();

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const clerkRole = (user?.publicMetadata?.role as string)?.toLowerCase();
  const dbRole = (userData?.role as string)?.toLowerCase();

  const isAllowedEducator = userEmail === APP_CONFIG.allowedEducatorEmail?.toLowerCase();
  
  const isAdmin = Boolean(
    clerkRole === "admin" ||
    dbRole === "admin" ||
    isAllowedEducator ||
    userEmail?.startsWith("admin@")
  );

  const isEducator = Boolean(
    isAdmin ||
    isAllowedEducator ||
    clerkRole === "educator" ||
    clerkRole === "instructor" ||
    dbRole === "educator" ||
    dbRole === "instructor" ||
    storeIsEducator
  );

  const role: "admin" | "instructor" | "educator" | "student" = isAdmin
    ? "admin"
    : isEducator
    ? "instructor"
    : "student";

  return {
    user,
    isLoaded,
    isSignedIn: Boolean(isSignedIn),
    isEducator,
    isAdmin,
    isAllowedEducator,
    role,
  };
}
