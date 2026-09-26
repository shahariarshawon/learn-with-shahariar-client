"use client";

import React, { useState } from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
  CourseApprovalTable,
} from "@/components/dashboard";
import { useAdminModerationQuery, adminService } from "@/services/admin.service";
import { CourseModerationRecord, CourseModerationStatus } from "@/types/dashboard.types";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

export default function AdminCoursesPage() {
  const { getToken } = useAuth();
  const { data: initialQueue = [] } = useAdminModerationQuery();
  const [queue, setQueue] = useState<CourseModerationRecord[]>(initialQueue);

  const displayQueue = queue.length > 0 ? queue : initialQueue;

  const handleModerationAction = async (courseId: string, status: CourseModerationStatus) => {
    try {
      const token = await getToken();
      await adminService.updateModerationStatus(courseId, status, token);
      toast.success(`Course ${status} successfully!`);
      setQueue((prev) =>
        prev.map((c) => (c.id === courseId ? { ...c, status } : c))
      );
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

            <CourseApprovalTable
              courses={displayQueue}
              onAction={handleModerationAction}
            />
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
