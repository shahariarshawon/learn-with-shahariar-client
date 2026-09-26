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
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const toggleStatus = async (course: Course) => {
    try {
      const token = await getToken();
      const newStatus = !course.isPublished;
      const res = await courseService.toggleCoursePublishStatus(course._id, newStatus, token);
      if (res.success) {
        toast.success(`Course ${newStatus ? "published" : "drafted"} successfully`);
        fetchEducatorCourses();
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch {
      toast.error("Error updating course status");
    }
  };

  if (loading || !courses) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <Loading />
      </div>
    );
  }

  const filteredCourses = courses.filter((c) =>
    c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = courses.reduce((acc, c) => acc + (c.enrolledStudents?.length || 0), 0);
  const totalRevenue = courses.reduce((acc, c) => acc + (c.coursePrice * (c.enrolledStudents?.length || 0)), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-4"
        >
          <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Educator Course System
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Course Management & Analytics
              </h2>
              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Manage your curriculum, track enrollments, and update course statuses.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/educator/add-course"
                className="rounded-full bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition-all"
              >
                + Create Course
              </Link>
            </div>
          </div>
        </motion.div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Courses</span>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{courses.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <p className="mt-2 text-3xl font-extrabold text-[#7F265B]">{totalStudents}</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Revenue</span>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {currency.toUpperCase()} {totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Table Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
          className="overflow-hidden rounded-[28px] border border-[#7F265B]/10 bg-white/90 shadow-sm backdrop-blur-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                All Published & Draft Courses
              </h3>
              <p className="text-xs text-slate-500">Search and manage course lifecycle</p>
            </div>

            <input
              type="text"
              placeholder="Search course title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium focus:border-[#7F265B] focus:outline-none w-full sm:w-64"
            />
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Students</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="text-slate-700 divide-y divide-slate-100">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <tr key={course._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={course.courseThumbnail || "/course_1.png"}
                            alt={course.courseTitle}
                            className="h-12 w-20 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <span className="max-w-[280px] truncate font-bold text-slate-900">
                            {course.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => toggleStatus(course)}
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                            course.isPublished
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }`}
                        >
                          {course.isPublished ? "Published" : "Draft"}
                        </button>
                      </td>

                      <td className="px-6 py-4 font-bold text-slate-900">
                        {currency.toUpperCase()} {course.coursePrice}
                      </td>

                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {course.enrolledStudents?.length || 0}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/educator/edit-course/${course._id}`}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
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
                      No courses found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
