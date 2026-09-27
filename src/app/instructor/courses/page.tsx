"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlusCircle, Search, ExternalLink, Edit3, Trash2 } from "lucide-react";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
} from "@/components/dashboard";
import { useCourses } from "@/services/course.service";
import { Course } from "@/types";

export default function InstructorCoursesPage() {
  const { data } = useCourses();
  const courses = data?.courses || [];
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c: Course) =>
    (c.courseTitle || c.title || "").toLowerCase().includes(search.toLowerCase())
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
                <h1 className="text-3xl font-black text-slate-900">My Courses</h1>
                <p className="text-sm text-slate-500 mt-0.5">
                  Publish, modify modules, and review student engagement for all your curriculum tracks.
                </p>
              </div>

              <Link
                href="/educator/add-course"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] self-start sm:self-auto transition"
              >
                <PlusCircle className="h-4 w-4" />
                Create New Course
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-100">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 pl-10 pr-3.5 py-2 text-xs font-medium focus:border-[#7F265B] focus:outline-none"
                  />
                </div>
                <span className="text-xs font-bold text-slate-500">{filtered.length} Courses Found</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Course</th>
                      <th className="px-6 py-3.5">Category</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5">Price</th>
                      <th className="px-6 py-3.5">Students</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filtered.map((c: Course) => {
                      const studentCount = Array.isArray(c.enrolledStudents)
                        ? c.enrolledStudents.length
                        : 1200;
                      return (
                        <tr key={c._id || c.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={c.courseThumbnail || c.thumbnail || "/course_1.png"}
                                alt={c.courseTitle}
                                className="h-12 w-20 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                              />
                              <div>
                                <span className="font-bold text-slate-900 line-clamp-1 max-w-sm block">
                                  {c.courseTitle || c.title}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {c.duration || "32 hours"} • {c.level || "Intermediate"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold text-slate-600">
                              {c.category || "General"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                              Published
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-900">
                            ${c.coursePrice ?? c.price ?? 49.99}
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-600">
                            {studentCount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/course/${c._id || c.id}`}
                                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                title="Preview Page"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                              <Link
                                href={`/educator/edit-course/${c._id || c.id}`}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                              >
                                <Edit3 className="h-3 w-3" /> Edit
                              </Link>
                            </div>
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
