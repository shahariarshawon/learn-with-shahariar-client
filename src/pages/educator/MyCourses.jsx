import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../../components/Logger";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        backendUrl + "/api/course/educator-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) fetchEducatorCourses();
  }, [isEducator]);

  const deleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = await getToken();

      const { data } = await axios.delete(
        backendUrl + `/api/course/delete/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Course deleted");
        fetchEducatorCourses();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!courses) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6">
        {/* Mobile Logger */}
        <div className="block sm:hidden">
          <Logger />
        </div>

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

            <div className="rounded-2xl border border-[#7F265B]/10 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur-xl">
              Total Courses:{" "}
              <span className="font-semibold text-[#7F265B]">
                {courses.length}
              </span>
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
                  <th className="px-6 py-4 text-left font-medium">Created</th>
                  <th className="px-6 py-4 text-left font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => {
                  const finalPrice =
                    course.coursePrice -
                    (course.discount * course.coursePrice) / 100;

                  return (
                    <motion.tr
                      key={course._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="border-t border-slate-100 transition-colors duration-200 hover:bg-[#7F265B]/4"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.courseThumbnail}
                            className="h-14 w-20 rounded-xl object-cover ring-1 ring-slate-200"
                            alt={course.courseTitle}
                          />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-800">
                              {course.courseTitle}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              Discount: {course.discount || 0}%
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {finalPrice === 0 ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                            Free
                          </span>
                        ) : (
                          <span className="font-semibold text-slate-800">
                            {currency}
                            {finalPrice}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {course.enrolledStudents.length}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Link to={`/educator/edit-course/${course._id}`}>
                            <button className="rounded-full bg-[#7F265B] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(127,38,91,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f]">
                              Edit
                            </button>
                          </Link>

                          <Link to={`/educator/edit-course/${course._id}`}>
                            <button className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(16,185,129,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500">
                              Content
                            </button>
                          </Link>

                          <button
                            onClick={() => deleteCourse(course._id)}
                            className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(220,38,38,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet cards */}
          <div className="grid gap-4 p-4 lg:hidden">
            {courses.map((course, index) => {
              const finalPrice =
                course.coursePrice -
                (course.discount * course.coursePrice) / 100;

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_18px_40px_rgba(127,38,91,0.08)]"
                >
                  <div className="flex gap-4">
                    <img
                      src={course.courseThumbnail}
                      className="h-20 w-28 rounded-2xl object-cover ring-1 ring-slate-200"
                      alt={course.courseTitle}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-semibold text-slate-800">
                        {course.courseTitle}
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-400">Price</p>
                          <p className="font-semibold text-slate-700">
                            {finalPrice === 0 ? "Free" : `${currency}${finalPrice}`}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400">Students</p>
                          <p className="font-semibold text-slate-700">
                            {course.enrolledStudents.length}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400">Created</p>
                          <p className="font-semibold text-slate-700">
                            {new Date(course.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400">Discount</p>
                          <p className="font-semibold text-slate-700">
                            {course.discount || 0}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to={`/educator/edit-course/${course._id}`}>
                      <button className="rounded-full bg-[#7F265B] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f]">
                        Edit
                      </button>
                    </Link>

                    <Link to={`/educator/edit-course/${course._id}`}>
                      <button className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500">
                        Content
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteCourse(course._id)}
                      className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyCourses;