"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { Course, UserData, CourseChapter } from "@/types";
import { APP_CONFIG } from "@/constants/config";
import { courseService, userService, setAuthTokenGetter } from "@/services";
import {
  calculateRating,
  calculateChapterTime,
  calculateCourseDuration,
  calculateNoOfLectures,
} from "@/utils";
import { useUserStore } from "@/store/use-user-store";

export interface NavigateOptions {
  replace?: boolean;
}

export interface AppContextType {
  currency: string;
  backendUrl: string;
  allCourses: Course[];
  enrolledCourses: Course[];
  userData: UserData | null;
  isEducator: boolean;
  isLoadingUser: boolean;
  setIsEducator: (value: boolean) => void;
  setUserData: (user: UserData | null) => void;
  setEnrolledCourses: (courses: Course[]) => void;
  navigate: (path: string, options?: NavigateOptions) => void;
  getToken: () => Promise<string | null>;
  fetchAllCourses: () => Promise<void>;
  fetchUserData: () => Promise<boolean>;
  fetchUserEnrolledCourses: () => Promise<void>;
  calculateRating: (course: Partial<Course> | null | undefined) => number;
  calculateChapterTime: (chapter: Partial<CourseChapter> | null | undefined) => string;
  calculateCourseDuration: (course: Partial<Course> | null | undefined) => string;
  calculateNoOfLectures: (course: Partial<Course> | null | undefined) => number;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const { getToken: clerkGetToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEducator, setIsEducator] = useState<boolean>(false);
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

  const {
    setUserData: setStoreUserData,
    setIsEducator: setStoreIsEducator,
    setEnrolledCourses: setStoreEnrolledCourses,
  } = useUserStore();

  const getToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await clerkGetToken();
      return token || null;
    } catch {
      return null;
    }
  }, [clerkGetToken]);

  useEffect(() => {
    setAuthTokenGetter(getToken);
  }, [getToken]);

  const navigate = useCallback(
    (path: string, options?: NavigateOptions) => {
      startTransition(() => {
        if (options?.replace) {
          router.replace(path);
        } else {
          router.push(path);
        }
      });
    },
    [router]
  );

  const fetchAllCourses = useCallback(async () => {
    try {
      const response = await courseService.getAllCourses();
      if (response.success && Array.isArray(response.courses)) {
        setAllCourses(response.courses);
      } else if (response.message) {
        toast.error(response.message);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to load request";
      toast.error(msg);
    }
  }, []);

  const fetchUserData = useCallback(async (): Promise<boolean> => {
    if (!user) return false;
    try {
      setIsLoadingUser(true);
      const token = await getToken();
      const response = await userService.getUserData(token);

      if (response.success && response.user) {
        setUserData(response.user);
        setStoreUserData(response.user);

        const educatorRole =
          user.publicMetadata?.role === "educator" ||
          response.user.role === "educator" ||
          user.primaryEmailAddress?.emailAddress === APP_CONFIG.allowedEducatorEmail;

        setIsEducator(educatorRole);
        setStoreIsEducator(educatorRole);
        return true;
      } else {
        if (response.message) toast.error(response.message);
        return false;
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to load user profile";
      toast.error(msg);
      return false;
    } finally {
      setIsLoadingUser(false);
    }
  }, [user, getToken, setStoreUserData, setStoreIsEducator]);

  const fetchUserEnrolledCourses = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await userService.getEnrolledCourses(token);

      if (response.success && Array.isArray(response.enrolledCourses)) {
        const reversed = [...response.enrolledCourses].reverse();
        setEnrolledCourses(reversed);
        setStoreEnrolledCourses(reversed);
      }
    } catch (error: unknown) {
      console.error("Error fetching enrolled courses:", error);
    }
  }, [getToken, setStoreEnrolledCourses]);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    const loadUser = async () => {
      if (user) {
        const created = await fetchUserData();
        if (created) {
          await fetchUserEnrolledCourses();
        }
      } else {
        setUserData(null);
        setIsEducator(false);
        setEnrolledCourses([]);
      }
    };
    loadUser();
  }, [user, fetchUserData, fetchUserEnrolledCourses]);

  const value: AppContextType = {
    currency: APP_CONFIG.currency,
    backendUrl: APP_CONFIG.backendUrl,
    allCourses,
    enrolledCourses,
    userData,
    isEducator,
    isLoadingUser,
    setIsEducator,
    setUserData,
    setEnrolledCourses,
    navigate,
    getToken,
    fetchAllCourses,
    fetchUserData,
    fetchUserEnrolledCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
