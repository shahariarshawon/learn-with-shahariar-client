"use client";

import React, { useState, useEffect } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
  CourseApprovalTable,
} from "@/components/dashboard";
import { useAdminModerationQuery, adminService } from "@/services/admin.service";
import { CourseModerationStatus } from "@/types/dashboard.types";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

export default function AdminCoursesPage() {
  const { getToken } = useAuth();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getToken().then((t) => {
      if (isMounted) setAuthToken(t);
    });
    return () => {
      isMounted = false;
    };
  }, [getToken]);

  const { data: queue = [], refetch, isLoading } = useAdminModerationQuery(authToken);

  const handleModerationAction = async (courseId: string, status: CourseModerationStatus) => {
    try {
      const token = await getToken();
      const res = await adminService.updateModerationStatus(courseId, status, token);
      if (res.success) {
        toast.success(`Course ${status} successfully! 🎉`);
        await refetch();
      } else {
        toast.error(res.message || "Failed to update moderation status");
      }
    } catch {
      toast.error("Failed to update moderation status");
    }
  };

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="Course Moderation" />

          <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Course Moderation & Quality</h1>
              <p className="text-sm text-slate-500">Review instructor submitted courses before approving for public catalog.</p>
            </div>

            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm font-semibold text-slate-400">
                Loading moderation queue...
              </div>
            ) : (
              <CourseApprovalTable
                courses={queue}
                onAction={handleModerationAction}
              />
            )}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
