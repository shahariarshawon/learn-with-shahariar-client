"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  ChartCard,
  RoleGuard,
} from "@/components/dashboard";
import { useAdminMetricsQuery } from "@/services/admin.service";
import { useInstructorAnalyticsQuery } from "@/services/instructor.service";

export default function AdminDashboardPage() {
  const { data: metrics } = useAdminMetricsQuery();
  const { data: analytics = [] } = useInstructorAnalyticsQuery();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="Platform Admin" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                Platform Super Admin
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Center</h1>
              <p className="text-sm text-slate-500">Monitor system health, user velocity, and course moderation.</p>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Total Users"
                value={(metrics?.totalUsers || 3450).toLocaleString()}
                trend="+22% vs last month"
                icon="👥"
              />
              <DashboardCard
                title="Total Instructors"
                value={metrics?.totalInstructors || 42}
                trend="+8% vs last month"
                icon="👨‍🏫"
              />
              <DashboardCard
                title="Total Courses"
                value={metrics?.totalCourses || 128}
                trend="+15% vs last month"
                icon="📚"
              />
              <DashboardCard
                title="Platform Gross Revenue"
                value={`$${(metrics?.totalRevenue || 142500).toLocaleString()}`}
                trend="+28% vs last month"
                icon="💳"
              />
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Gross Platform Growth & Revenue"
                subtitle="Monthly financial volume processed"
                data={analytics}
                dataKey="revenue"
                type="area"
                color="#7e22ce"
              />
              <ChartCard
                title="Platform User Registrations"
                subtitle="New student & instructor accounts"
                data={analytics}
                dataKey="students"
                type="bar"
                color="#0284c7"
              />
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
