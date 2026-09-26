import { create } from "zustand";
import { Course, UserData } from "@/types";
import { APP_CONFIG } from "@/constants/config";

interface UserState {
  userData: UserData | null;
  isEducator: boolean;
  currency: string;
  enrolledCourses: Course[];
  setUserData: (userData: UserData | null) => void;
  setIsEducator: (isEducator: boolean) => void;
  setCurrency: (currency: string) => void;
  setEnrolledCourses: (courses: Course[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  isEducator: false,
  currency: APP_CONFIG.currency,
  enrolledCourses: [],
  setUserData: (userData) =>
    set({
      userData,
      isEducator: userData?.role === "educator",
    }),
  setIsEducator: (isEducator) => set({ isEducator }),
  setCurrency: (currency) => set({ currency }),
  setEnrolledCourses: (enrolledCourses) => set({ enrolledCourses }),
}));
