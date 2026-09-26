"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  ChartCard,
  RoleGuard,
} from "@/components/dashboard";
import { useInstructorMetricsQuery, useInstructorAnalyticsQuery } from "@/services/instructor.service";
import { useAuth } from "@clerk/nextjs";

export default function InstructorDashboardPage() {
  const { getToken } = useAuth();
  const { data: metrics } = useInstructorMetricsQuery();
  const { data: analytics = [] } = useInstructorAnalyticsQuery();

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Instructor Dashboard" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7F265B]">
                Instructor Studio
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Overview</h1>
              <p className="text-sm text-slate-500">Monitor course sales, student enrollment, and ratings.</p>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Total Courses"
                value={metrics?.totalCourses || 8}
                trend="12% vs last month"
                icon="📚"
              />
              <DashboardCard
                title="Total Students"
                value={metrics?.totalStudents || 1420}
                trend="24% vs last month"
                icon="👥"
              />
              <DashboardCard
                title="Total Revenue"
                value={`$${(metrics?.totalRevenue || 28450).toLocaleString()}`}
                trend="18% vs last month"
                icon="💰"
              />
              <DashboardCard
                title="Average Rating"
                value={`${metrics?.averageRating || 4.9} ★`}
                trend="4.9 / 5.0"
                icon="⭐"
              />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Monthly Revenue Trend"
                subtitle="Gross instructor earnings over 6 months"
                data={analytics}
                dataKey="revenue"
                type="area"
              />
              <ChartCard
                title="New Student Enrollments"
                subtitle="Student registrations per month"
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
