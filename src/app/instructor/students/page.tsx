"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  RoleGuard,
} from "@/components/dashboard";

export default function InstructorStudentsPage() {
  const students = [
    { id: "st-1", name: "Tanvir Ahmed", email: "tanvir@example.com", course: "Master Next.js 15", progress: 85, date: "2024-04-12" },
    { id: "st-2", name: "Nusrat Jahan", email: "nusrat@example.com", course: "Full Stack Web Development", progress: 100, date: "2024-03-20" },
    { id: "st-3", name: "Mahmud Hasan", email: "mahmud@example.com", course: "Master Next.js 15", progress: 45, date: "2024-05-01" },
  ];

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Enrolled Students" />

          <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Enrolled Students</h1>
              <p className="text-sm text-slate-500">Monitor student enrollment and course completion progress.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <h4 className="text-base font-bold text-slate-900">Student Directory ({students.length})</h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Student</th>
                      <th className="px-6 py-3.5">Enrolled Course</th>
                      <th className="px-6 py-3.5">Enrollment Date</th>
                      <th className="px-6 py-3.5">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {students.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/60 transition">
                        <td className="px-6 py-4">
                          <div>
                            <h5 className="font-bold text-slate-900">{s.name}</h5>
                            <span className="text-xs text-slate-400">{s.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{s.course}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{s.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-[#7F265B]" style={{ width: `${s.progress}%` }} />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{s.progress}%</span>
                          </div>
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
