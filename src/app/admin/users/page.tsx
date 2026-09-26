"use client";

import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
  UserTable,
} from "@/components/dashboard";
import { useAdminUsersQuery, adminService } from "@/services/admin.service";
import { UserRole, UserManagementRecord } from "@/types/dashboard.types";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

export default function AdminUsersPage() {
  const { getToken } = useAuth();
  const { data: initialUsers = [] } = useAdminUsersQuery();
  const [users, setUsers] = useState<UserManagementRecord[]>(initialUsers);

  const displayUsers = users.length > 0 ? users : initialUsers;

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const token = await getToken();
      await adminService.updateUserRole(userId, newRole, token);
      toast.success(`User role updated to ${newRole}`);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch {
      toast.error("Failed to update user role");
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    try {
      const token = await getToken();
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await adminService.updateUserStatus(userId, newStatus, token);
      toast.success(`User account status set to ${newStatus}`);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, status: newStatus as any } : u))
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="User Management" />

          <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
              <p className="text-sm text-slate-500">Search users, filter by role, change permissions, or deactivate accounts.</p>
            </div>

            <UserTable
              users={displayUsers}
              onRoleChange={handleRoleChange}
              onStatusToggle={handleStatusToggle}
            />
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
