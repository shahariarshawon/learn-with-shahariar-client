"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  ChartCard,
  RoleGuard,
} from "@/components/dashboard";
import { useInstructorAnalyticsQuery } from "@/services/instructor.service";

export default function InstructorAnalyticsPage() {
  const { data: analytics = [] } = useInstructorAnalyticsQuery();

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Course Analytics" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Course Analytics</h1>
              <p className="text-sm text-slate-500">Track student engagement, video views, and completion rates.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <DashboardCard title="Total Video Views" value="32,840" trend="+15%" icon="👁️" />
              <DashboardCard title="Course Completion Rate" value="78%" trend="+5%" icon="🎯" />
              <DashboardCard title="Avg Watch Time" value="48 mins" trend="+8%" icon="⏱️" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Monthly Video Views"
                subtitle="Total student lecture streams per month"
                data={analytics}
                dataKey="views"
                type="area"
                color="#0284c7"
              />
              <ChartCard
                title="Monthly Student Registrations"
                subtitle="Course enrollment volume"
                data={analytics}
                dataKey="students"
                type="bar"
                color="#7F265B"
              />
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
