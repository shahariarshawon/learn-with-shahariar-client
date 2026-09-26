"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { toast } from "react-toastify";
import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { courseService } from "@/services";
import { Course } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function MyCoursesPage() {
  const { currency, isEducator, getToken } = useAppContext();
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEducatorCourses = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await courseService.getEducatorCourses(token);

      if (response.success && Array.isArray(response.courses)) {
        setCourses(response.courses);
      } else {
        setCourses([]);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses();
    }
  }, [isEducator, fetchEducatorCourses]);

  const deleteCourse = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = await getToken();
      const response = await courseService.deleteCourse(courseId, token);

      if (response.success) {
        toast.success("Course deleted successfully");
        fetchEducatorCourses();
      } else {
        toast.error(response.message || "Failed to delete course");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete course");
    }
  };

  if (loading || !courses) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-3"
        >
          <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Educator Courses
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                My Courses
              </h2>
              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Manage, update, and organize all your published courses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/educator/add-course"
                className="rounded-full bg-[#7F265B] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#6d214f]"
              >
                + Add Course
              </Link>
              <div className="rounded-2xl border border-[#7F265B]/10 bg-white/80 px-4 py-2.5 text-xs text-slate-600 shadow-sm backdrop-blur-xl">
                Total Courses:{" "}
                <span className="font-semibold text-[#7F265B]">
                  {courses.length}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Table Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
          className="overflow-hidden rounded-[28px] border border-[#7F265B]/10 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          <div className="border-b border-slate-100 px-5 py-5 md:px-6">
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
              Course List
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              View pricing, enrollments, creation date, and course actions.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">Course</th>
                  <th className="px-6 py-4 text-left font-medium">Price</th>
                  <th className="px-6 py-4 text-left font-medium">Students</th>
                  <th className="px-6 py-4 text-left font-medium">Published Date</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <tr
                      key={course._id}
                      className="border-b border-slate-100 last:border-none transition-colors duration-200 hover:bg-[#7F265B]/4"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.courseThumbnail || "/course_1.png"}
                            alt={course.courseTitle}
                            className="h-12 w-20 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <span className="max-w-[280px] truncate font-semibold text-slate-800">
                            {course.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {currency.toUpperCase()} {course.coursePrice}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {course.enrolledStudents?.length || 0}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {course.createdAt
                          ? new Date(course.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/educator/edit-course/${course._id}`}
                            className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No courses published yet. Click &quot;+ Add Course&quot; to create your first course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 p-4 lg:hidden">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={course.courseThumbnail || "/course_1.png"}
                    alt={course.courseTitle}
                    className="h-14 w-20 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                      {course.courseTitle}
                    </p>
                    <p className="mt-1 text-xs font-bold text-[#7F265B]">
                      {currency.toUpperCase()} {course.coursePrice}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                  <span>
                    {course.enrolledStudents?.length || 0} Students
                  </span>

                  <div className="flex gap-2">
                    <Link
                      href={`/educator/edit-course/${course._id}`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 hover:bg-slate-200"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="rounded-full bg-red-50 px-3 py-1 text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
