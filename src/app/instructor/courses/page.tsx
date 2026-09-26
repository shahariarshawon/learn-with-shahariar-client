"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
} from "@/components/dashboard";
import { useCourses } from "@/services/course.service";

export default function InstructorCoursesPage() {
  const { data } = useCourses();
  const courses = data?.courses || [];
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) =>
    c.courseTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Course Management" />

          <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">My Courses</h1>
                <p className="text-sm text-slate-500">Create, edit, and publish your learning content.</p>
              </div>

              <Link
                href="/educator/add-course"
                className="rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] self-start sm:self-auto"
              >
                + Create New Course
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-slate-100">
                <input
                  type="text"
                  placeholder="Filter courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-medium focus:border-[#7F265B] focus:outline-none w-64"
                />
                <span className="text-xs font-bold text-slate-500">{filtered.length} Courses</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Course</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Price</th>
                      <th className="px-6 py-3.5">Enrolled</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filtered.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-50/60 transition">
                        <td className="px-6 py-4 font-bold text-slate-900">{c.courseTitle}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                            Published
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">${c.coursePrice}</td>
                        <td className="px-6 py-4 font-medium text-slate-600">{c.enrolledStudents?.length || 0}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/educator/edit-course/${c._id}`}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
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
