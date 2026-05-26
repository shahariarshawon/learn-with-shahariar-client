import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const MyEnrollMents = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);
  const hasRun = useRef(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const purchaseId = searchParams.get("purchaseId");

  useEffect(() => {
    if (!purchaseId || hasRun.current) return;

    hasRun.current = true;

    const completeEnrollment = async () => {
      try {
        const token = await getToken();

        const { data } = await axios.post(
          `${backendUrl}/api/user/update-course`,
          { purchaseId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          toast.success("Enrollment completed successfully!");
          await fetchUserEnrolledCourses();
          navigate("/my-enrollments", { replace: true });
        } else {
          toast.error(data.message || "Failed to complete enrollment");
        }
      } catch (error) {
        toast.error("Failed to update enrollment");
      }
    };

    completeEnrollment();
  }, [purchaseId, navigate, backendUrl, getToken, fetchUserEnrolledCourses]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        })
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData, fetchUserEnrolledCourses]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-10 md:px-10 lg:px-20 xl:px-28">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute right-10 top-32 h-44 w-44 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8"
          >
            <div className="mb-4 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
              Student Dashboard
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              My Enrollments
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Track your learning progress and continue your enrolled courses.
            </p>
          </motion.div>

          {/* Empty state */}
          {enrolledCourses.length === 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-[30px] border border-[#7F265B]/10 bg-white/90 px-6 py-16 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#7F265B]/10 text-2xl">
                📚
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                No enrollments yet
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 md:text-base">
                You have not enrolled in any courses yet. Explore courses and
                start building your skills today.
              </p>

              <button
                onClick={() => navigate("/course-list")}
                className="mt-6 rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
              >
                Browse Courses
              </button>
            </motion.div>
          ) : (
            <>
              {/* Stats */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.05 }}
                className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                <div className="rounded-3xl border border-[#7F265B]/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Total Courses</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {enrolledCourses.length}
                  </p>
                </div>

                <div className="rounded-3xl border border-[#7F265B]/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">In Progress</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {
                      progressArray.filter(
                        (item) =>
                          item.lectureCompleted > 0 &&
                          item.lectureCompleted < item.totalLectures
                      ).length
                    }
                  </p>
                </div>

                <div className="rounded-3xl border border-[#7F265B]/10 bg-white/90 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {
                      progressArray.filter(
                        (item) =>
                          item.totalLectures > 0 &&
                          item.lectureCompleted / item.totalLectures === 1
                      ).length
                    }
                  </p>
                </div>
              </motion.div>

              {/* Desktop table */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: 0.08 }}
                className="hidden overflow-hidden rounded-[30px] border border-[#7F265B]/10 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl lg:block"
              >
                <div className="border-b border-slate-100 px-6 py-5">
                  <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                    Enrolled Courses
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Continue learning from where you left off.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50/80 text-left text-slate-500">
                      <tr>
                        <th className="px-6 py-4 font-medium">Course</th>
                        <th className="px-6 py-4 font-medium">Duration</th>
                        <th className="px-6 py-4 font-medium">Progress</th>
                        <th className="px-6 py-4 font-medium text-right">
                          Status
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-slate-700">
                      {enrolledCourses.map((course, index) => {
                        const progress = progressArray[index];
                        const progressPercent =
                          progress && progress.totalLectures > 0
                            ? (progress.lectureCompleted * 100) /
                              progress.totalLectures
                            : 0;

                        const isCompleted =
                          progress &&
                          progress.totalLectures > 0 &&
                          progress.lectureCompleted / progress.totalLectures ===
                            1;

                        return (
                          <motion.tr
                            key={course._id || index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className="border-t border-slate-100 transition-colors duration-200 hover:bg-[#7F265B]/4"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                <img
                                  src={course.courseThumbnail}
                                  alt={course.courseTitle}
                                  onClick={() => navigate("/player/" + course._id)}
                                  className="h-14 w-24 cursor-pointer rounded-xl object-cover ring-1 ring-slate-200 transition-transform duration-300 hover:scale-105"
                                />

                                <div
                                  className="min-w-0 flex-1 cursor-pointer"
                                  onClick={() => navigate("/player/" + course._id)}
                                >
                                  <p className="truncate font-semibold text-slate-900">
                                    {course.courseTitle}
                                  </p>

                                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                    <div
                                      className="h-full rounded-full bg-[#7F265B] transition-all duration-500"
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="px-6 py-5 text-slate-500">
                              {calculateCourseDuration(course)}
                            </td>

                            <td className="px-6 py-5 text-slate-500">
                              {progress
                                ? `${progress.lectureCompleted} / ${progress.totalLectures} Lectures`
                                : "0 / 0 Lectures"}
                            </td>

                            <td className="px-6 py-5 text-right">
                              {isCompleted ? (
                                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                                  Completed
                                </span>
                              ) : (
                                <button
                                  className="rounded-full bg-[#7F265B] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,38,91,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f]"
                                  onClick={() => navigate("/player/" + course._id)}
                                >
                                  Continue
                                </button>
                              )}
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Mobile cards */}
              <div className="grid gap-4 lg:hidden">
                {enrolledCourses.map((course, index) => {
                  const progress = progressArray[index];
                  const progressPercent =
                    progress && progress.totalLectures > 0
                      ? (progress.lectureCompleted * 100) / progress.totalLectures
                      : 0;

                  const isCompleted =
                    progress &&
                    progress.totalLectures > 0 &&
                    progress.lectureCompleted / progress.totalLectures === 1;

                  return (
                    <motion.div
                      key={course._id || index}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      transition={{ delay: index * 0.04 }}
                      className="rounded-[28px] border border-[#7F265B]/10 bg-white/95 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl"
                    >
                      <div className="flex gap-4">
                        <img
                          src={course.courseThumbnail}
                          alt={course.courseTitle}
                          onClick={() => navigate("/player/" + course._id)}
                          className="h-20 w-28 cursor-pointer rounded-2xl object-cover ring-1 ring-slate-200"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 font-semibold text-slate-900">
                            {course.courseTitle}
                          </p>

                          <p className="mt-2 text-sm text-slate-500">
                            {calculateCourseDuration(course)}
                          </p>

                          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-[#7F265B] transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>

                          <p className="mt-2 text-xs text-slate-500">
                            {progress
                              ? `${progress.lectureCompleted} / ${progress.totalLectures} Lectures`
                              : "0 / 0 Lectures"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {isCompleted ? (
                          <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-[#7F265B]/8 px-3 py-1.5 text-xs font-semibold text-[#7F265B]">
                            In Progress
                          </span>
                        )}

                        <button
                          className="rounded-full bg-[#7F265B] px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f]"
                          onClick={() => navigate("/player/" + course._id)}
                        >
                          {isCompleted ? "Review" : "Continue"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollMents;