"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { courseService, userService } from "@/services";
import { Course, Lecture } from "@/types/course.types";
import {
  LearningObjective,
  CourseSyllabus,
  CourseRoadmap,
  CourseReviewSection,
} from "@/components/course";
import { useCourseStore } from "@/store/use-course-store";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

type ActiveTab = "overview" | "syllabus" | "roadmap" | "instructor" | "reviews" | "faq";

interface CourseDetailsProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailsPage({ params }: CourseDetailsProps) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<{ videoId: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

  const { currency, calculateRating, userData, getToken } = useAppContext();
  const setSelectedCourse = useCourseStore((state) => state.setSelectedCourse);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const data = await courseService.getCourseById(id);

        if (data.success && data.courseData) {
          setCourseData(data.courseData);
          setSelectedCourse(data.courseData);
        } else {
          toast.error(data.message || "Failed to load course");
        }
      } catch {
        toast.error("Error loading course details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseData();
    }
  }, [id, setSelectedCourse]);

  useEffect(() => {
    if (userData && courseData?._id) {
      setIsAlreadyEnrolled(
        userData.enrolledCourses?.includes(courseData._id) || false
      );
    }
  }, [userData, courseData]);

  const handleSelectLesson = (lesson: Lecture) => {
    if (lesson.isPreviewFree && lesson.lectureUrl) {
      const videoId = lesson.lectureUrl.split("/").pop() || "";
      setPlayerData({ videoId });
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const enrollCourse = async () => {
    if (!userData) return toast.warn("Please login to enroll!");
    if (isAlreadyEnrolled) return toast.warn("Already enrolled in this course");
    if (!courseData) return;

    try {
      setIsPurchasing(true);
      const token = await getToken();
      const data = await userService.purchaseCourse(courseData._id, token);

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Failed to process enrollment");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="rounded-3xl border border-red-200 bg-white px-8 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <h2 className="text-2xl font-bold text-red-600">Course Not Found</h2>
            <p className="mt-3 text-slate-500">
              The course you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/course-list"
              className="mt-6 inline-block rounded-full bg-[#7F265B] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#6d214f]"
            >
              Browse Courses
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const finalPrice =
    courseData.coursePrice -
    (courseData.discount * courseData.coursePrice) / 100;

  const educatorInfo =
    typeof courseData.educator === "object"
      ? courseData.educator
      : { name: "Shahariar Shawon", bio: "Senior Full Stack Software Engineer & LMS Architect" };

  const educatorName =
    educatorInfo.name || ("fullName" in educatorInfo ? (educatorInfo.fullName as string) : "Shahariar Shawon");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-56 h-48 w-48 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:px-12 xl:px-16">
          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full max-w-4xl space-y-8 text-slate-700"
          >
            {/* Header Badge & Level */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex rounded-full border border-[#7F265B]/20 bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#7F265B]">
                  {courseData.category || "Full Stack Web Development"}
                </span>
                <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold text-slate-700">
                  Level: {courseData.level || "All Levels"}
                </span>
              </div>

              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {courseData.courseTitle}
              </h1>

              <p className="text-base leading-relaxed text-slate-600 md:text-lg">
                {courseData.shortDescription ||
                  "Master modern software engineering with hands-on enterprise projects, production-grade architecture, and guided milestone roadmaps."}
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-1">
                <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-sm border border-slate-100">
                  <span className="font-bold text-slate-900">
                    {calculateRating(courseData)}
                  </span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
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

                <span className="rounded-xl bg-white px-3.5 py-2 text-slate-700 shadow-sm border border-slate-100">
                  👥 <strong className="text-slate-900">{courseData.enrolledStudents?.length || 142}</strong> Enrolled Students
                </span>

                <span className="rounded-xl bg-white px-3.5 py-2 text-slate-700 shadow-sm border border-slate-100">
                  ⏱️ <strong className="text-slate-900">{courseData.duration || "24 Hours"}</strong> Runtime
                </span>
              </div>

              {/* Instructor Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#7F265B]/15 bg-white/90 p-4 shadow-sm backdrop-blur-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7F265B] font-bold text-white text-lg shadow-md">
                  {educatorName.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Instructor</span>
                  <h4 className="text-base font-bold text-slate-900">{educatorName}</h4>
                  <p className="text-xs text-slate-500">{educatorInfo.bio || "Senior Software Engineer"}</p>
                </div>
              </div>
            </div>

            {/* TAB NAVIGATION HEADER */}
            <div className="border-b border-slate-200">
              <nav className="-mb-px flex space-x-6 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "syllabus", label: "Syllabus" },
                  { id: "roadmap", label: "Course Roadmap" },
                  { id: "instructor", label: "Instructor" },
                  { id: "reviews", label: "Reviews" },
                  { id: "faq", label: "FAQ" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                    className={`whitespace-nowrap pb-4 px-1 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? "border-[#7F265B] text-[#7F265B]"
                        : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* TAB CONTENTS */}
            <div className="pt-2 space-y-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <LearningObjective outcomes={courseData.learningOutcomes} />

                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">Course Description</h3>
                    <div
                      className="rich-text leading-relaxed text-slate-700"
                      dangerouslySetInnerHTML={{
                        __html: courseData.courseDescription || "",
                      }}
                    />
                  </div>

                  {/* Prerequisites */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Prerequisites</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {(courseData.prerequisites && courseData.prerequisites.length > 0
                        ? courseData.prerequisites
                        : [
                            "Basic understanding of web technologies (HTML/CSS basics).",
                            "A laptop or PC capable of running Node.js and code editors like VS Code.",
                            "Enthusiasm to build real-world software applications.",
                          ]
                      ).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-[#7F265B] font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Syllabus Tab */}
              {activeTab === "syllabus" && (
                <CourseSyllabus
                  chapters={courseData.courseContent}
                  isEnrolled={isAlreadyEnrolled}
                  onSelectLesson={handleSelectLesson}
                />
              )}

              {/* Roadmap Tab */}
              {activeTab === "roadmap" && (
                <CourseRoadmap
                  courseTitle={courseData.courseTitle}
                  roadmap={courseData.roadmap}
                />
              )}

              {/* Instructor Tab */}
              {activeTab === "instructor" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#7F265B] text-3xl font-extrabold text-white shadow-md">
                      {educatorName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{educatorName}</h3>
                      <p className="text-sm font-medium text-[#7F265B]">Lead Instructor & Software Architect</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                        <span>⭐ 4.9 Rating</span>
                        <span>•</span>
                        <span>🎓 1,500+ Students</span>
                        <span>•</span>
                        <span>📚 8 Courses</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-700 space-y-3">
                    <p>
                      Shahariar Shawon is a passionate software developer and tech educator dedicated to mentoring developers to craft clean, scalable, enterprise-grade applications.
                    </p>
                    <p>
                      With extensive experience in Next.js, React, Node.js, and cloud deployments, Shahariar breaks down complex software engineering concepts into practical, project-driven learning phases.
                    </p>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <CourseReviewSection
                  ratings={courseData.courseRatings}
                  reviews={courseData.reviews}
                  averageRating={calculateRating(courseData)}
                />
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 space-y-5">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Course Questions & Answers</h3>
                  <div className="space-y-4">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <h4 className="font-bold text-slate-900 text-sm">When do I receive access after enrollment?</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Instant access is unlocked immediately after enrollment. All lectures, GitHub repositories, resources, and quizzes become accessible in your student dashboard.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <h4 className="font-bold text-slate-900 text-sm">Do I get access to the instructor for Q&A?</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Yes, every course has an integrated Q&A discussion tab where you can ask implementation questions and get feedback directly from the instructor and peers.
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                      <h4 className="font-bold text-slate-900 text-sm">Is this course updated for 2026?</h4>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        Yes! All curriculum code samples are continually tested and updated against latest framework versions, LTS releases, and production patterns.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT SIDE STICKY PURCHASE CARD */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="w-full lg:sticky lg:top-24 lg:w-[380px]"
          >
            <div className="overflow-hidden rounded-[30px] border border-[#7F265B]/15 bg-white/95 shadow-[0_25px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              {/* Media / Video Player */}
              <div className="overflow-hidden border-b border-slate-100 bg-slate-900">
                {playerData ? (
                  <YouTube
                    videoId={playerData.videoId}
                    opts={{ playerVars: { autoplay: 1 } }}
                    iframeClassName="w-full aspect-video"
                  />
                ) : (
                  <div className="relative group cursor-pointer" onClick={() => {
                    const firstPreview = courseData.courseContent?.[0]?.chapterContent?.find(l => l.isPreviewFree);
                    if (firstPreview?.lectureUrl) {
                      const vId = firstPreview.lectureUrl.split("/").pop() || "";
                      setPlayerData({ videoId: vId });
                    }
                  }}>
                    <img
                      src={courseData.courseThumbnail || "/course_1.png"}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={courseData.courseTitle}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7F265B] text-white shadow-xl transition-transform group-hover:scale-110">
                        <svg className="h-6 w-6 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6 p-6">
                {/* Price Display */}
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
                    🔥 Limited Time Offer ({courseData.discount}% OFF)
                  </span>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {currency.toUpperCase()} {finalPrice.toFixed(2)}
                    </span>
                    <span className="text-base text-slate-400 line-through font-medium">
                      {currency.toUpperCase()} {courseData.coursePrice}
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                {isAlreadyEnrolled ? (
                  <Link href={`/player/${courseData._id}`} className="block">
                    <button className="w-full rounded-full bg-[#7F265B] py-3.5 text-base font-bold text-white shadow-lg shadow-[#7F265B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] cursor-pointer">
                      Continue Learning
                    </button>
                  </Link>
                ) : (
                  <button
                    onClick={enrollCourse}
                    disabled={isPurchasing}
                    className="w-full rounded-full bg-[#7F265B] py-3.5 text-base font-bold text-white shadow-lg shadow-[#7F265B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] disabled:opacity-60 cursor-pointer"
                  >
                    {isPurchasing ? "Processing Enrollment..." : "Enroll Now"}
                  </button>
                )}

                {/* Included Features Checklist */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 space-y-3">
                  <h5 className="text-sm font-bold text-slate-900">This course includes:</h5>
                  <ul className="space-y-2 text-xs font-medium text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span> Full lifetime access & updates
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span> Guided step-by-step roadmap
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span> Interactive chapter quizzes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span> Downloadable source code & resources
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600">✓</span> Certificate of Completion
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
