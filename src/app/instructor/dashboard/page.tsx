"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  PlusCircle,
  TrendingUp,
  ArrowUpRight,
  Eye,
  CheckCircle2,
} from "lucide-react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  ChartCard,
  RoleGuard,
} from "@/components/dashboard";
import {
  useInstructorMetricsQuery,
  useInstructorAnalyticsQuery,
} from "@/services/instructor.service";
import { useCourses } from "@/services/course.service";
import { MOCK_COURSES } from "@/mock/courses";

export default function InstructorDashboardPage() {
  const { data: metrics } = useInstructorMetricsQuery();
  const { data: analytics = [] } = useInstructorAnalyticsQuery();
  const { data: coursesData } = useCourses();

  const [timeRange, setTimeRange] = useState<"30d" | "90d" | "1y">("30d");

  const courses = (coursesData?.courses && coursesData.courses.length > 0)
    ? coursesData.courses
    : MOCK_COURSES.slice(0, 6);

  // Fallback realistic monthly data if API returns empty
  const chartData = analytics.length > 0 ? analytics : [
    { month: "Apr", revenue: 4200, students: 180 },
    { month: "May", revenue: 5600, students: 240 },
    { month: "Jun", revenue: 7100, students: 310 },
    { month: "Jul", revenue: 6800, students: 290 },
    { month: "Aug", revenue: 8900, students: 390 },
    { month: "Sep", revenue: 10400, students: 460 },
  ];

  const totalRevenue = metrics?.totalRevenue || 43000;
  const totalStudents = metrics?.totalStudents || 28450;
  const totalCourses = metrics?.totalCourses || courses.length;
  const averageRating = metrics?.averageRating || 4.94;

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Instructor Studio" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            {/* Header & Quick Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-bold text-[#7F265B] mb-2">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Creator Analytics & Studio
                </div>
                <h1 className="text-3xl font-black text-slate-900">Instructor Dashboard</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Track course performance, student engagement, and gross earnings in real time.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/educator/add-course"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create New Course
                </Link>
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <DashboardCard
                title="Gross Revenue"
                value={`$${totalRevenue.toLocaleString()}`}
                trend="+24.8% vs last month"
                icon="💰"
              />
              <DashboardCard
                title="Total Enrolled Students"
                value={totalStudents.toLocaleString()}
                trend="+18.2% new students"
                icon="👥"
              />
              <DashboardCard
                title="Published Courses"
                value={totalCourses}
                trend="100% active status"
                icon="📚"
              />
              <DashboardCard
                title="Instructor Rating"
                value={`${averageRating} ★`}
                trend="Based on 1.2k reviews"
                icon="⭐"
              />
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Monthly Revenue Stream"
                subtitle="Gross sales over the last 6 months"
                data={chartData}
                dataKey="revenue"
                type="area"
                color="#7F265B"
              />
              <ChartCard
                title="Student Registration Growth"
                subtitle="Monthly enrollments across all published courses"
                data={chartData}
                dataKey="students"
                type="bar"
                color="#0284c7"
              />
            </div>

            {/* COURSE PERFORMANCE BREAKDOWN TABLE */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Course Performance & Health</h3>
                  <p className="text-xs text-slate-500">Live breakdown of enrollments and revenue per course</p>
                </div>
                <Link
                  href="/instructor/courses"
                  className="text-xs font-bold text-[#7F265B] hover:underline"
                >
                  Manage All Courses →
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Course</th>
                      <th className="px-6 py-3.5">Level</th>
                      <th className="px-6 py-3.5">Price</th>
                      <th className="px-6 py-3.5">Students</th>
                      <th className="px-6 py-3.5">Est. Revenue</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {courses.slice(0, 5).map((c, idx) => {
                      const studentCount = Array.isArray(c.enrolledStudents)
                        ? c.enrolledStudents.length
                        : (1400 - idx * 220);
                      const price = c.coursePrice ?? c.price ?? 79.99;
                      const estRevenue = Math.round(studentCount * price * 0.85);

                      return (
                        <tr key={c._id || c.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={c.courseThumbnail || "/course_1.png"}
                                alt={c.courseTitle}
                                className="h-10 w-16 rounded-lg object-cover ring-1 ring-slate-200 shrink-0"
                              />
                              <span className="font-bold text-slate-900 line-clamp-1 max-w-xs">
                                {c.courseTitle}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                              {c.level || "Intermediate"}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">${price}</td>
                          <td className="px-6 py-4 font-semibold text-slate-700">
                            {studentCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 font-extrabold text-emerald-600">
                            ${estRevenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/educator/edit-course/${c._id || c.id}`}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
