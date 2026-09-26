import { User, UserRole } from "./user";

export interface AuthSession {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole;
}

export interface AuthRolePermission {
  canCreateCourse: boolean;
  canManageUsers: boolean;
  canViewAnalytics: boolean;
  canAccessInstructorDashboard: boolean;
  canAccessAdminDashboard: boolean;
}
