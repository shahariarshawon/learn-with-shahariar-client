import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    currency,
    calculateRating,
    calculateChapterTime,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);

      if (data.success && data.courseData) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message || "Failed to load course");
      }
    } catch (error) {
      toast.error("Error loading course details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && courseData?._id) {
      setIsAlreadyEnrolled(
        userData.enrolledCourses?.includes(courseData._id) || false
      );
    }
  }, [userData, courseData]);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const enrollCourse = async () => {
    if (!userData) return toast.warn("Please login to enroll!");
    if (isAlreadyEnrolled) return toast.warn("Already enrolled in this course");

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Failed to process enrollment");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  if (loading) return <Loading />;

  if (!courseData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-6">
        <div className="rounded-3xl border border-red-200 bg-white px-8 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
          <p className="mt-3 text-slate-500">
            The course you are looking for does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  const finalPrice =
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100;

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-56 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute right-10 top-24 h-52 w-52 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-16 pt-16 md:px-10 lg:flex-row lg:items-start lg:px-16 xl:px-24">
          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full max-w-4xl space-y-10 text-slate-700"
          >
            {/* Hero */}
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
                Premium Learning Experience
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {courseData.courseTitle}
                </h1>

                <div
                  className="max-w-3xl text-sm leading-7 text-slate-600 md:text-base"
                  dangerouslySetInnerHTML={{
                    __html: courseData.courseDescription?.slice(0, 220) || "",
                  }}
                />
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                  <span className="font-semibold text-slate-800">
                    {calculateRating(courseData)}
                  </span>

                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        className="h-4 w-4"
                        src={
                          i < Math.floor(calculateRating(courseData))
                            ? assets.star
                            : assets.star_blank
                        }
                        alt="star"
                      />
                    ))}
                  </div>
                </div>

                <span className="rounded-full bg-white/80 px-4 py-2 text-[#7F265B] shadow-sm">
                  {courseData.courseRatings?.length || 0} ratings
                </span>

                <span className="rounded-full bg-white/80 px-4 py-2 shadow-sm">
                  {courseData.enrolledStudents?.length || 0} students
                </span>
              </div>

              {/* Educator */}
              <div className="rounded-2xl border border-[#7F265B]/10 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-xl">
                <p className="text-sm text-slate-500">Created by</p>
                <p className="mt-1 text-base font-semibold text-[#7F265B]">
                  {courseData.educator?.name ||
                    courseData.educator?.fullName ||
                    "Unknown Educator"}
                </p>
              </div>
            </div>

            {/* Course Structure */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Course Structure
                </h2>

                <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-medium text-[#7F265B]">
                  {courseData.courseContent?.length || 0} Chapters
                </span>
              </div>

              <div className="space-y-4">
                {courseData.courseContent?.map((chapter, index) => (
                  <motion.div
                    key={index}
                    layout
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-sm transition-all duration-300 hover:border-[#7F265B]/15 hover:shadow-[0_18px_40px_rgba(127,38,91,0.08)]"
                  >
                    <button
                      onClick={() => toggleSection(index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#7F265B]/5 md:px-6"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          className={`w-4 transition-transform duration-300 ${
                            openSections[index] ? "rotate-180" : ""
                          }`}
                          src={assets.down_arrow_icon}
                          alt="toggle"
                        />
                        <div>
                          <p className="text-sm text-slate-400">
                            Chapter {index + 1}
                          </p>
                          <p className="font-semibold text-slate-800">
                            {chapter.chapterTitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 md:text-sm">
                        {chapter.chapterContent?.length || 0} lectures ·{" "}
                        {calculateChapterTime(chapter)}
                      </p>
                    </button>

                    <AnimatePresence initial={false}>
                      {openSections[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden border-t border-slate-100 bg-slate-50/80"
                        >
                          <div className="space-y-3 px-5 py-4 md:px-6">
                            {chapter.chapterContent?.map((lecture, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition-all duration-300 hover:border-[#7F265B]/20 hover:bg-[#7F265B]/5"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <img
                                    onClick={() =>
                                      lecture.isPreviewFree &&
                                      setPlayerData({
                                        videoId:
                                          lecture.lectureUrl.split("/").pop(),
                                      })
                                    }
                                    className={`h-4 w-4 shrink-0 ${
                                      lecture.isPreviewFree
                                        ? "cursor-pointer"
                                        : "opacity-40"
                                    }`}
                                    src={assets.play_icon}
                                    alt="play"
                                  />

                                  <p className="truncate text-sm text-slate-700">
                                    {lecture.lectureTitle}
                                  </p>
                                </div>

                                <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500">
                                  {lecture.isPreviewFree && (
                                    <span className="rounded-full bg-[#7F265B]/10 px-2.5 py-1 font-medium text-[#7F265B]">
                                      Preview
                                    </span>
                                  )}
                                  <span>
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ["h", "m"] }
                                    )}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Full Description */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="space-y-4 rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-slate-900">
                Course Description
              </h3>

              <div
                className="prose prose-sm max-w-none text-slate-600 md:prose-base"
                dangerouslySetInnerHTML={{
                  __html: courseData.courseDescription || "",
                }}
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
            >
              <Link
                to="/course-outline/mern"
                className="inline-flex items-center justify-center rounded-full bg-[#7F265B] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
              >
                Explore Course Outline
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-[390px] lg:sticky lg:top-24"
          >
            <div className="overflow-hidden rounded-[30px] border border-[#7F265B]/10 bg-white/95 shadow-[0_25px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              {/* Video / Thumbnail */}
              <div className="overflow-hidden border-b border-slate-100 bg-slate-50">
                {playerData ? (
                  <YouTube
                    videoId={playerData.videoId}
                    opts={{ playerVars: { autoplay: 1 } }}
                    iframeClassName="w-full aspect-video"
                  />
                ) : (
                  <img
                    src={courseData.courseThumbnail}
                    className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                    alt={courseData.courseTitle}
                  />
                )}
              </div>

              <div className="space-y-6 p-6">
                {/* Price */}
                <div className="space-y-2">
                  <p className="inline-flex rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-500">
                    Limited time offer
                  </p>

                  <div className="flex flex-wrap items-end gap-3">
                    <p className="text-3xl font-bold text-slate-900">
                      {currency} {finalPrice.toFixed(2)}
                    </p>

                    <p className="text-slate-400 line-through">
                      {currency} {courseData.coursePrice}
                    </p>

                    <p className="text-sm font-medium text-emerald-600">
                      {courseData.discount}% off
                    </p>
                  </div>
                </div>

                {/* Button */}
                {isAlreadyEnrolled ? (
                  <Link to="/my-enrollments" className="block">
                    <button className="w-full rounded-full bg-[#7F265B] py-3.5 font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]">
                      Go to My Enrollments
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={enrollCourse}
                    className="w-full rounded-full bg-[#7F265B] py-3.5 font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
                  >
                    Enroll Now
                  </button>
                )}

                {/* Features */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="mb-3 text-base font-semibold text-slate-900">
                    What you’ll get
                  </p>

                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Lifetime access & updates</li>
                    <li>• Hands-on project-based learning</li>
                    <li>• Downloadable resources</li>
                    <li>• Certificate of completion</li>
                  </ul>
                </div>

                {/* Quick facts */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-xs text-slate-400">Chapters</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {courseData.courseContent?.length || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
                    <p className="text-xs text-slate-400">Students</p>
                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {courseData.enrolledStudents?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;