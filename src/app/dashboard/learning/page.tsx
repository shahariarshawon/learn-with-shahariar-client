"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { userService } from "@/services";
import { CourseProgressItem } from "@/types";
import { useStudentLearningStore } from "@/store/use-student-learning-store";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StudentLearningDashboardPage() {
  const router = useRouter();
  const {
    enrolledCourses,
    userData,
    fetchUserEnrolledCourses,
    getToken,
    calculateNoOfLectures,
    calculateCourseDuration,
  } = useAppContext();

  const [progressArray, setProgressArray] = useState<CourseProgressItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const lastWatchedCourseId = useStudentLearningStore((state) => state.lastWatchedCourseId);
  const lastWatchedLessonId = useStudentLearningStore((state) => state.lastWatchedLessonId);
  const lastWatchedCourseTitle = useStudentLearningStore((state) => state.lastWatchedCourseTitle);
  const lastWatchedLessonTitle = useStudentLearningStore((state) => state.lastWatchedLessonTitle);

  const getCourseProgress = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const data = await userService.getCourseProgress(course._id, token);
          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [enrolledCourses, getToken, calculateNoOfLectures]);

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData, fetchUserEnrolledCourses]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    } else {
      setLoading(false);
    }
  }, [enrolledCourses, getCourseProgress]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-10 md:px-10 lg:px-20 xl:px-28">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute right-10 top-32 h-44 w-44 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <div className="mb-2 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-xs font-bold text-[#7F265B] uppercase tracking-wider">
                Student Learning Portal
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                My Learning Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Pick up right where you left off and build your skills.
              </p>
            </div>

            <Link
              href="/course-list"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 self-start sm:self-auto"
            >
              Browse All Courses ↗
            </Link>
          </motion.div>

          {/* PART 7: CONTINUE LEARNING BANNER */}
          {lastWatchedCourseId && lastWatchedCourseTitle && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl border border-[#7F265B]/20 bg-gradient-to-r from-[#7F265B] via-[#6d214f] to-[#7F265B] p-6 sm:p-8 text-white shadow-xl"
            >
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-extrabold tracking-wider uppercase backdrop-blur-md">
                    ⚡ Continue Learning
                  </span>
                  <h3 className="text-2xl font-extrabold text-white">{lastWatchedCourseTitle}</h3>
                  <p className="text-sm text-pink-100 font-medium">
                    Last Lesson: <strong className="text-white">{lastWatchedLessonTitle || "Next Chapter"}</strong>
                  </p>
                </div>

                <Link
                  href={`/learn/${lastWatchedCourseId}${lastWatchedLessonId ? `?lessonId=${lastWatchedLessonId}` : ""}`}
                >
                  <button className="rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-[#7F265B] shadow-lg hover:bg-pink-50 transition-all duration-300 hover:scale-105 cursor-pointer">
                    Resume Lesson ▶
                  </button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* COURSES LIST / GRID */}
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <Loading />
            </div>
          ) : enrolledCourses.length === 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#7F265B]/10 text-3xl">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No Enrolled Courses Yet</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
                Explore our industry-focused software development courses and start your learning journey.
              </p>
              <Link
                href="/course-list"
                className="mt-6 inline-block rounded-full bg-[#7F265B] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#6d214f]"
              >
                Browse Catalog
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Enrolled Courses ({enrolledCourses.length})</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course, idx) => {
                  const progress = progressArray[idx];
                  const progressPercent =
                    progress && progress.totalLectures > 0
                      ? Math.round((progress.lectureCompleted / progress.totalLectures) * 100)
                      : 0;

                  const isCompleted = progressPercent === 100;

                  const instructorName =
                    typeof course.educator === "object"
                      ? course.educator?.name || course.educator?.fullName || "Shahariar Shawon"
                      : "Shahariar Shawon";

                  return (
                    <motion.div
                      key={course._id || idx}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      transition={{ delay: idx * 0.05 }}
                      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#7F265B]/30 hover:shadow-md"
                    >
                      <div className="space-y-4">
                        {/* Thumbnail */}
                        <div className="relative overflow-hidden rounded-2xl bg-slate-100 aspect-video">
                          <img
                            src={course.courseThumbnail || "/course_1.png"}
                            alt={course.courseTitle}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {isCompleted && (
                            <span className="absolute top-3 right-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                              ✓ Completed
                            </span>
                          )}
                        </div>

                        {/* Title & Instructor */}
                        <div className="space-y-1.5">
                          <h4 className="line-clamp-2 text-base font-bold text-slate-900 group-hover:text-[#7F265B] transition-colors">
                            {course.courseTitle}
                          </h4>
                          <p className="text-xs font-medium text-slate-500">Instructor: {instructorName}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700">{progressPercent}% Completed</span>
                            <span className="text-slate-400">
                              {progress ? `${progress.lectureCompleted}/${progress.totalLectures} Lessons` : "0 Lessons"}
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#7F265B] transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="pt-5">
                        <button
                          type="button"
                          onClick={() => router.push(`/learn/${course._id}`)}
                          className="w-full rounded-2xl bg-[#7F265B] py-3 text-xs font-bold text-white shadow-sm hover:bg-[#6d214f] transition cursor-pointer"
                        >
                          {isCompleted ? "Review Course" : "Continue Learning →"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
