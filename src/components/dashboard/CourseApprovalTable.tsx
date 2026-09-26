"use client";

import React from "react";
import { CourseModerationRecord, CourseModerationStatus } from "@/types/dashboard.types";

interface CourseApprovalTableProps {
  courses: CourseModerationRecord[];
  onAction?: (courseId: string, status: CourseModerationStatus) => void;
}

export const CourseApprovalTable: React.FC<CourseApprovalTableProps> = ({
  courses,
  onAction,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden space-y-4">
      <div className="p-5 border-b border-slate-100">
        <h4 className="text-base font-bold text-slate-900">Course Moderation Queue</h4>
        <p className="text-xs text-slate-500">Review submitted instructor courses before publication</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3.5">Course</th>
              <th className="px-6 py-3.5">Instructor</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Price</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {courses.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-xs text-slate-400">
                  No courses in the moderation queue.
                </td>
              </tr>
            ) : (
              courses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{c.title}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{c.instructorName}</td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">{c.category}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${c.price}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        c.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : c.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : c.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onAction && onAction(c.id, "approved")}
                        className="rounded-xl bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 cursor-pointer"
                      >
                        Approve ✓
                      </button>
                      <button
                        type="button"
                        onClick={() => onAction && onAction(c.id, "rejected")}
                        className="rounded-xl bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-xs hover:bg-red-700 cursor-pointer"
                      >
                        Reject ✕
                      </button>
                      <button
                        type="button"
                        onClick={() => onAction && onAction(c.id, "archived")}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                      >
                        Archive
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseApprovalTable;
