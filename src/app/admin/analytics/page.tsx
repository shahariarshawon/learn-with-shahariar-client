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

export default function AdminAnalyticsPage() {
  const { data: analytics = [] } = useInstructorAnalyticsQuery();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="Platform Analytics" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Platform Analytics</h1>
              <p className="text-sm text-slate-500">Macro view of platform user growth, course creation velocity, and gross revenue.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <DashboardCard title="User Acquisition Rate" value="+22.4%" trend="Monthly" icon="📈" />
              <DashboardCard title="Course Conversion Rate" value="14.8%" trend="From Visitor to Student" icon="⚡" />
              <DashboardCard title="Gross Margin" value="84%" trend="Platform Net" icon="💎" />
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Platform Monthly Gross Revenue"
                subtitle="All processed course enrollments"
                data={analytics}
                dataKey="revenue"
                type="area"
                color="#7e22ce"
              />
              <ChartCard
                title="Platform User Registrations"
                subtitle="Student & Instructor registrations"
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
