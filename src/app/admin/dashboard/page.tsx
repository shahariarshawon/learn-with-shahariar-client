"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
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

  const chartData = analytics.length > 0 ? analytics : [
    { month: "Apr", revenue: 24000, students: 680 },
    { month: "May", revenue: 38000, students: 920 },
    { month: "Jun", revenue: 49000, students: 1150 },
    { month: "Jul", revenue: 62000, students: 1420 },
    { month: "Aug", revenue: 84000, students: 1950 },
    { month: "Sep", revenue: 142500, students: 3450 },
  ];

  const recentUsers = [
    { name: "Michael Chang", email: "m.chang@eng.io", role: "Student", date: "10 mins ago", status: "Active" },
    { name: "Dr. Sarah Jenkins", email: "sarah@designscale.io", role: "Instructor", date: "45 mins ago", status: "Verified" },
    { name: "Arjun Verma", email: "arjun@cloudstack.net", role: "Student", date: "2 hours ago", status: "Active" },
    { name: "Elena Rostova", email: "elena@deepmind.edu", role: "Instructor", date: "5 hours ago", status: "Verified" },
  ];

  const pendingModeration = [
    {
      id: "mod_1",
      title: "Rust for Systems Programming & High-Concurrency Microservices",
      instructor: "Marcus Vance",
      category: "Systems Engineering",
      submitted: "2 hours ago",
    },
    {
      id: "mod_2",
      title: "Autonomous AI Agents with LangGraph & Vector Memory",
      instructor: "Dr. Elena Rostova",
      category: "Artificial Intelligence",
      submitted: "1 day ago",
    },
  ];

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="Super Admin Control Center" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Platform Master Administration
                </div>
                <h1 className="text-3xl font-black text-slate-900">Admin Control Center</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Platform telemetry, user velocity, transaction volume, and content moderation queue.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/admin/courses"
                  className="rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition"
                >
                  Review Courses ({pendingModeration.length})
                </Link>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Total Platform Users"
                value={(metrics?.totalUsers || 3450).toLocaleString()}
                trend="+22.4% vs last month"
                icon="👥"
              />
              <DashboardCard
                title="Active Instructors"
                value={metrics?.totalInstructors || 42}
                trend="+8 verified this quarter"
                icon="👨‍🏫"
              />
              <DashboardCard
                title="Total Courses"
                value={metrics?.totalCourses || 128}
                trend="+15 added this month"
                icon="📚"
              />
              <DashboardCard
                title="Gross Platform Volume"
                value={`$${(metrics?.totalRevenue || 142500).toLocaleString()}`}
                trend="+28.6% processing volume"
                icon="💳"
              />
            </div>

            {/* SYSTEM VITALS BAR */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-slate-900">System Vitals: All Services Operational</span>
              </div>
              <div className="flex items-center gap-6 text-xs font-medium text-slate-600">
                <span>API Latency: <strong className="text-slate-900 font-bold">28ms</strong></span>
                <span>MongoDB Cluster: <strong className="text-emerald-600 font-bold">Healthy (0.4% CPU)</strong></span>
                <span>Platform Uptime: <strong className="text-slate-900 font-bold">99.98%</strong></span>
              </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Platform Gross Volume ($ USD)"
                subtitle="Financial transaction throughput over 6 months"
                data={chartData}
                dataKey="revenue"
                type="area"
                color="#7F265B"
              />
              <ChartCard
                title="User Registrations"
                subtitle="Total student and instructor registrations"
                data={chartData}
                dataKey="students"
                type="bar"
                color="#0284c7"
              />
            </div>

            {/* LOWER ROW: RECENT MODERATION & USERS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Pending Course Moderation */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900">Pending Moderation Queue</h4>
                  <Link href="/admin/courses" className="text-xs font-bold text-[#7F265B] hover:underline">
                    View Queue →
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {pendingModeration.map((c) => (
                    <div key={c.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                      <div className="space-y-0.5 min-w-0">
                        <h5 className="text-xs font-bold text-slate-900 truncate">{c.title}</h5>
                        <p className="text-[11px] text-slate-500">
                          by <span className="font-semibold text-slate-700">{c.instructor}</span> • {c.submitted}
                        </p>
                      </div>
                      <Link
                        href="/admin/courses"
                        className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100 shrink-0"
                      >
                        Review
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Users */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h4 className="text-base font-bold text-slate-900">Latest User Registrations</h4>
                  <Link href="/admin/users" className="text-xs font-bold text-[#7F265B] hover:underline">
                    View Users →
                  </Link>
                </div>
                <div className="divide-y divide-slate-100">
                  {recentUsers.map((u) => (
                    <div key={u.email} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">{u.name}</h5>
                        <p className="text-[11px] text-slate-500">{u.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          {u.role}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{u.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
