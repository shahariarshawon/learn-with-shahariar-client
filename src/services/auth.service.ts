import { userService } from "./user.service";
import { educatorService } from "./educator.service";
import { UserDataResponse, ApiResponse } from "@/types";

export const authService = {
  getCurrentUser: async (token?: string | null): Promise<UserDataResponse> => {
    return userService.getUserData(token);
  },

  promoteToEducator: async (token?: string | null): Promise<ApiResponse> => {
    return educatorService.updateEducatorRole(token);
  },
};
