"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import humanizeDuration from "humanize-duration";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Rating from "@/components/student/Rating";
import Loading from "@/components/student/Loading";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { userService, quizService } from "@/services";
import { Course, CourseProgressData, Lecture, Quiz } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

interface ActiveLecture extends Lecture {
  chapter?: number;
  lecture?: number;
  chapterId?: string;
  chapterTitle?: string;
}

interface PlayerPageProps {
  params: Promise<{ courseId: string }>;
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const router = useRouter();

  const {
    enrolledCourses,
    calculateChapterTime,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useAppContext();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});
  const [playerData, setPlayerData] = useState<ActiveLecture | null>(null);
  const [progressData, setProgressData] = useState<CourseProgressData | null>(null);
  const [initialRating, setInitialRating] = useState<number>(0);

  const getCourseProgress = useCallback(async () => {
    try {
      const token = await getToken();
      const data = await userService.getCourseProgress(courseId, token);

      if (data.success && data.progressData) {
        setProgressData(data.progressData);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }, [courseId, getToken]);

  const getCourseData = useCallback(() => {
    const course = enrolledCourses.find((c) => c._id === courseId);
    if (course) {
      setCourseData(course);
      course.courseRatings?.forEach((item: { userId: string; rating: number }) => {
        if (item.userId === userData?._id) {
          setInitialRating(item.rating);
        }
      });
    }
  }, [enrolledCourses, courseId, userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses, getCourseData]);

  useEffect(() => {
    getCourseProgress();
  }, [getCourseProgress]);

  const showChapterQuizPopup = (quizData: Quiz, chapterId: string) => {
    Swal.fire({
      title: "Chapter Completed!",
      html: `
      <div style="text-align:center">
        <p style="font-size:15px;color:#475569;margin-top:6px">
          Complete the quiz for better practice.
        </p>
        <p style="font-size:14px;color:#7F265B;font-weight:600;margin-top:10px">
          ${quizData?.title || "Chapter Quiz"}
        </p>
      </div>
    `,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Start Quiz",
      cancelButtonText: "Later",
      confirmButtonColor: "#7F265B",
      cancelButtonColor: "#64748b",
      background: "#ffffff",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/quiz/${courseId}/${chapterId}`);
      }
    });
  };

  const markLectureAsCompleted = async (lectureId: string) => {
    try {
      if (!courseData) return;

      const alreadyCompleted = progressData?.lectureCompleted?.includes(lectureId);
      if (alreadyCompleted) {
        toast.info("This lecture is already completed");
        return;
      }

      const token = await getToken();
      const data = await userService.updateCourseProgress(courseId, lectureId, token);

      if (data.success) {
        toast.success(data.message || "Lecture completed");

        const previousCompleted = progressData?.lectureCompleted || [];
        const updatedCompleted = Array.from(new Set([...previousCompleted, lectureId]));

        setProgressData((prev) => ({
          courseId,
          completed: prev?.completed || false,
          ...(prev || {}),
          lectureCompleted: updatedCompleted,
        }));

        const currentChapter = courseData.courseContent.find((chapter) =>
          chapter.chapterContent.some((lecture) => lecture.lectureId === lectureId)
        );

        if (!currentChapter) {
          getCourseProgress();
          return;
        }

        const isChapterCompleted = currentChapter.chapterContent.every((lecture) =>
          updatedCompleted.includes(lecture.lectureId)
        );

        if (isChapterCompleted) {
          const quizResponse = await quizService.getChapterQuiz(
            courseId,
            currentChapter.chapterId,
            token
          );

          if (quizResponse.success && quizResponse.quiz) {
            showChapterQuizPopup(quizResponse.quiz, currentChapter.chapterId);
          } else {
            toast.info("Chapter completed! Great job!");
          }
        }

        getCourseProgress();
      } else {
        toast.error(data.message || "Failed to update lecture progress");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update lecture progress");
    }
  };

  const handleRate = async (rating: number) => {
    try {
      const token = await getToken();
      const data = await userService.addRating({ courseId, rating, comment: "Course rating" }, token);

      if (data.success) {
        toast.success(data.message || "Rating added successfully");
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message || "Failed to submit rating");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit rating");
    }
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const getFirstLecture = (): ActiveLecture | null => {
    if (!courseData) return null;
    for (let i = 0; i < courseData.courseContent.length; i++) {
      const chapter = courseData.courseContent[i];
      if (chapter.chapterContent && chapter.chapterContent.length > 0) {
        const lecture = chapter.chapterContent[0];
        return {
          ...lecture,
          chapter: i + 1,
          lecture: 1,
          chapterId: chapter.chapterId,
          chapterTitle: chapter.chapterTitle,
        };
      }
    }
    return null;
  };

  const handleThumbnailClick = () => {
    const first = getFirstLecture();
    if (first) {
      setPlayerData(first);
    } else {
      toast.info("No lectures available to play.");
    }
  };

  if (!courseData) {
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

  const videoId = playerData?.lectureUrl?.split("/").pop() || "";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-8 md:px-8 lg:px-14">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute right-10 top-32 h-44 w-44 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row">
          {/* LEFT: Video Player + Lecture Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex-1 space-y-6 text-slate-800"
          >
            <div>
              <div className="mb-2 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-3.5 py-1 text-xs font-medium text-[#7F265B]">
                Interactive Course Player
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {courseData.courseTitle}
              </h1>
            </div>

            {/* Player Container */}
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              {playerData ? (
                <div>
                  <YouTube
                    videoId={videoId}
                    iframeClassName="w-full aspect-video"
                    opts={{
                      playerVars: {
                        autoplay: 1,
                      },
                    }}
                  />

                  <div className="flex flex-col gap-4 border-t border-slate-800 bg-slate-900/95 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium text-[#d987b4]">
                        Chapter {playerData.chapter} · Lecture {playerData.lecture}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-white">
                        {playerData.lectureTitle}
                      </h2>
                    </div>

                    <button
                      onClick={() => markLectureAsCompleted(playerData.lectureId)}
                      className="rounded-full bg-[#7F265B] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#6d214f] cursor-pointer"
                    >
                      {progressData?.lectureCompleted?.includes(playerData.lectureId)
                        ? "✓ Completed"
                        : "Mark as Complete"}
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={handleThumbnailClick}
                  className="group relative aspect-video w-full cursor-pointer overflow-hidden bg-slate-900"
                >
                  <img
                    src={courseData.courseThumbnail || "/course_1.png"}
                    alt={courseData.courseTitle}
                    className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7F265B] text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <img src={assets.play_icon} alt="Play" className="h-6 w-6 ml-1" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Course Rating Block */}
            <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  Rate this course
                </h3>
                <p className="text-xs text-slate-500">
                  Help fellow learners by leaving your honest rating.
                </p>
              </div>

              <Rating
                initialRating={initialRating}
                onRate={(rating) => handleRate(rating)}
              />
            </div>
          </motion.div>

          {/* RIGHT: Course Structure Accordion */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-[420px]"
          >
            <div className="overflow-hidden rounded-[30px] border border-[#7F265B]/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">Course Content</h2>
                <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-semibold text-[#7F265B]">
                  {courseData.courseContent?.length || 0} Chapters
                </span>
              </div>

              <div className="space-y-3">
                {courseData.courseContent?.map((chapter, index) => (
                  <div
                    key={chapter.chapterId || index}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-sm"
                  >
                    <button
                      onClick={() => toggleSection(index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-[#7F265B]/5 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          className={`w-3.5 transition-transform duration-300 ${
                            openSections[index] ? "rotate-180" : ""
                          }`}
                          src={assets.down_arrow_icon}
                          alt="toggle"
                        />
                        <div>
                          <p className="text-xs text-slate-400">Chapter {index + 1}</p>
                          <p className="text-sm font-semibold text-slate-800">
                            {chapter.chapterTitle}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs text-slate-400">
                        {calculateChapterTime(chapter)}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {openSections[index] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden border-t border-slate-100 bg-slate-50/70"
                        >
                          <div className="space-y-2 p-3">
                            {chapter.chapterContent?.map((lecture, i) => {
                              const isCompleted =
                                progressData?.lectureCompleted?.includes(lecture.lectureId);
                              const isActive =
                                playerData?.lectureId === lecture.lectureId;

                              return (
                                <div
                                  key={lecture.lectureId || i}
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                      chapterId: chapter.chapterId,
                                      chapterTitle: chapter.chapterTitle,
                                    })
                                  }
                                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs transition-all duration-200 ${
                                    isActive
                                      ? "border-[#7F265B]/30 bg-[#7F265B]/10 text-[#7F265B] font-semibold"
                                      : "border-slate-200/70 bg-white text-slate-700 hover:border-[#7F265B]/20 hover:bg-[#7F265B]/5"
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span
                                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                        isCompleted
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-slate-100 text-slate-500"
                                      }`}
                                    >
                                      {isCompleted ? "✓" : i + 1}
                                    </span>
                                    <p className="truncate">{lecture.lectureTitle}</p>
                                  </div>

                                  <span className="text-slate-400 shrink-0 ml-2">
                                    {humanizeDuration(
                                      lecture.lectureDuration * 60 * 1000,
                                      { units: ["m"] }
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
