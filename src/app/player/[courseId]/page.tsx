"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  MessageSquare,
  FileText,
  Star,
  Menu,
  X,
  Search,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import {
  LessonNavigation,
  StudentNotes,
  ResourceList,
  ReviewForm,
} from "@/components/learning";
import { useAppContext } from "@/context/AppContext";
import { userService, quizService, courseService } from "@/services";
import { Course, CourseProgressData, Lecture, Chapter, Quiz } from "@/types";
import { MOCK_COURSES } from "@/mock/courses";
import { humanizeDuration } from "@/utils/duration";

interface ActiveLecture extends Lecture {
  chapterIndex?: number;
  lectureIndex?: number;
  chapterId?: string;
  chapterTitle?: string;
}

type TabType = "overview" | "resources" | "notes" | "discussion" | "review";

interface PlayerPageProps {
  params: Promise<{ courseId: string }>;
}

export default function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const router = useRouter();

  const {
    enrolledCourses,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useAppContext();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [activeLecture, setActiveLecture] = useState<ActiveLecture | null>(null);
  const [progressData, setProgressData] = useState<CourseProgressData | null>(null);
  const [openChapters, setOpenChapters] = useState<Record<number, boolean>>({ 0: true });
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Discussion state
  const [questions, setQuestions] = useState<
    { id: string; author: string; avatar: string; time: string; text: string; replies: number }[]
  >([
    {
      id: "q-1",
      author: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      time: "2 hours ago",
      text: "How do we handle cache invalidation with Redis when using optimistic UI updates on the frontend?",
      replies: 3,
    },
    {
      id: "q-2",
      author: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      time: "1 day ago",
      text: "Is it recommended to run Next.js server actions inside edge middleware or Node.js runtime for Stripe webhooks?",
      replies: 5,
    },
  ]);
  const [newQuestionText, setNewQuestionText] = useState<string>("");

  const getCourseProgress = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const data = await userService.getCourseProgress(courseId, token);
      if (data.success && data.progressData) {
        setProgressData(data.progressData);
      }
    } catch {
      // ignore
    }
  }, [courseId, getToken]);

  const getCourseData = useCallback(async () => {
    try {
      setLoading(true);
      let course: Course | null = null;

      // 1. First fetch live course directly from database API
      try {
        const res = await courseService.getCourseById(courseId);
        if (res.success && (res.courseData || res.course)) {
          course = (res.courseData || res.course) as Course;
        }
      } catch {
        // ignore
      }

      // 2. Check enrolled courses in context if not fetched
      if (!course && enrolledCourses?.length) {
        course = enrolledCourses.find((c) => c && (c._id === courseId || c.id === courseId)) || null;
      }

      // 3. Fallback to mock catalog only if network/db completely offline
      if (!course) {
        course = MOCK_COURSES.find((c) => c._id === courseId || c.id === courseId) || null;
      }

      if (course) {
        // Ensure courseContent is populated from modules if needed
        if ((!course.courseContent || course.courseContent.length === 0) && (course as any).modules?.length) {
          course.courseContent = (course as any).modules.map((m: any, mIdx: number) => ({
            chapterId: m.moduleId || String(mIdx + 1),
            chapterOrder: m.moduleOrder || mIdx + 1,
            chapterTitle: m.moduleTitle || m.title || `Module ${mIdx + 1}`,
            chapterContent: (m.lessons || []).map((l: any, lIdx: number) => ({
              lectureId: l.lessonId || l.lectureId || String(lIdx + 1),
              lectureTitle: l.title || l.lectureTitle || `Lesson ${lIdx + 1}`,
              lectureDuration: l.duration || l.lectureDuration || 0,
              lectureUrl: l.videoUrl || l.lectureUrl || '',
              isPreviewFree: l.isPreview ?? l.isPreviewFree ?? true,
              lectureOrder: l.order || l.lectureOrder || lIdx + 1,
              description: l.description || '',
            })),
          }));
        }

        setCourseData(course);

        // Select first lecture if none currently active
        if (!activeLecture && course.courseContent && course.courseContent.length > 0) {
          const firstChapter = course.courseContent[0];
          if (firstChapter.chapterContent && firstChapter.chapterContent.length > 0) {
            const firstLec = firstChapter.chapterContent[0];
            setActiveLecture({
              ...firstLec,
              chapterIndex: 0,
              lectureIndex: 0,
              chapterId: firstChapter.chapterId,
              chapterTitle: firstChapter.chapterTitle,
            });
          }
        }
      }
    } finally {
      setLoading(false);
    }
  }, [courseId, enrolledCourses, activeLecture]);

  useEffect(() => {
    getCourseData();
    getCourseProgress();
  }, [getCourseData, getCourseProgress]);

  // Flattened lecture list for Next / Prev navigation
  const flatLectures: { chapter: Chapter; chapterIndex: number; lecture: Lecture; lectureIndex: number }[] = [];
  if (courseData?.courseContent) {
    courseData.courseContent.forEach((ch, chIdx) => {
      ch.chapterContent?.forEach((lec, lecIdx) => {
        flatLectures.push({ chapter: ch, chapterIndex: chIdx, lecture: lec, lectureIndex: lecIdx });
      });
    });
  }

  const currentFlatIndex = flatLectures.findIndex(
    (item) => item.lecture.lectureId === activeLecture?.lectureId
  );
  const hasPrevious = currentFlatIndex > 0;
  const hasNext = currentFlatIndex < flatLectures.length - 1;

  const handleSelectLecture = (ch: Chapter, chIdx: number, lec: Lecture, lecIdx: number) => {
    setActiveLecture({
      ...lec,
      chapterIndex: chIdx,
      lectureIndex: lecIdx,
      chapterId: ch.chapterId,
      chapterTitle: ch.chapterTitle,
    });
    setOpenChapters((prev) => ({ ...prev, [chIdx]: true }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreviousLesson = () => {
    if (hasPrevious) {
      const prev = flatLectures[currentFlatIndex - 1];
      handleSelectLecture(prev.chapter, prev.chapterIndex, prev.lecture, prev.lectureIndex);
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      const next = flatLectures[currentFlatIndex + 1];
      handleSelectLecture(next.chapter, next.chapterIndex, next.lecture, next.lectureIndex);
    }
  };

  const showChapterQuizPopup = (quizData: Quiz, chapterId: string) => {
    Swal.fire({
      title: "Chapter Completed! 🎉",
      html: `
        <div style="text-align:center">
          <p style="font-size:14px;color:#475569;margin-top:6px">
            Test your comprehension before proceeding to the next architectural milestone.
          </p>
          <p style="font-size:14px;color:#7F265B;font-weight:700;margin-top:10px">
            ${quizData?.title || "Module Assessment"}
          </p>
        </div>
      `,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Take Quiz Now",
      cancelButtonText: "Continue Watching",
      confirmButtonColor: "#7F265B",
      cancelButtonColor: "#64748b",
      background: "#ffffff",
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
        toast.info("This lecture is already marked completed");
        return;
      }

      const token = await getToken();
      const data = await userService.updateCourseProgress(courseId, lectureId, token);

      if (data.success) {
        toast.success(data.message || "Lecture completed! 🎉");
        const prevCompleted = progressData?.lectureCompleted || [];
        const updated = Array.from(new Set([...prevCompleted, lectureId]));

        setProgressData((prev) => ({
          courseId,
          completed: prev?.completed || false,
          ...(prev || {}),
          lectureCompleted: updated,
        }));

        // Check if chapter is completed
        const curChapter = courseData.courseContent.find((ch) =>
          ch.chapterContent?.some((l) => l.lectureId === lectureId)
        );

        if (curChapter) {
          const allChapterLecturesDone = curChapter.chapterContent.every((l) =>
            updated.includes(l.lectureId)
          );

          if (allChapterLecturesDone) {
            try {
              const quizRes = await quizService.getChapterQuiz(courseId, curChapter.chapterId, token);
              if (quizRes.success && quizRes.quiz) {
                showChapterQuizPopup(quizRes.quiz, curChapter.chapterId);
              }
            } catch {
              // ignore
            }
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update lecture progress");
    }
  };

  const handleMarkCompleteAndNext = async () => {
    if (activeLecture) {
      await markLectureAsCompleted(activeLecture.lectureId);
      if (hasNext) {
        handleNextLesson();
      }
    }
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    const newQ = {
      id: `q-${Date.now()}`,
      author: userData?.name || "Shahariar Shawon",
      avatar: userData?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      time: "Just now",
      text: newQuestionText.trim(),
      replies: 0,
    };

    setQuestions((prev) => [newQ, ...prev]);
    setNewQuestionText("");
    toast.success("Question posted to course discussion!");
  };

  if (loading || !courseData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  const completedLectureIds = progressData?.lectureCompleted || [];
  const totalLecturesCount = flatLectures.length;
  const completedCount = completedLectureIds.length;
  const progressPercent = totalLecturesCount > 0 ? Math.round((completedCount / totalLecturesCount) * 100) : 0;
  const isCurrentLectureDone = activeLecture ? completedLectureIds.includes(activeLecture.lectureId) : false;

  // Filter lessons in sidebar if search query is active
  const filteredChapters = courseData.courseContent.map((chapter) => {
    if (!searchQuery.trim()) return chapter;
    const q = searchQuery.toLowerCase();
    const matchingLectures = chapter.chapterContent.filter((l) =>
      l.lectureTitle.toLowerCase().includes(q)
    );
    return {
      ...chapter,
      chapterContent: matchingLectures,
    };
  }).filter((ch) => ch.chapterContent.length > 0 || !searchQuery.trim());

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col antialiased selection:bg-[#7F265B]/30 selection:text-white">
      <Navbar />

      {/* TOP COMPACT TITLE & PROGRESS BAR */}
      <header className="border-b border-slate-800 bg-slate-950/90 px-4 py-3 sm:px-6 lg:px-8 sticky top-0 z-30 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/course/${courseId}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors shrink-0"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back to Course</span>
            </Link>

            <span className="text-slate-700 hidden sm:inline">•</span>

            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-md">
              {courseData.courseTitle}
            </h1>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* Progress indicator */}
            <div className="flex items-center gap-3">
              <div className="w-28 sm:w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-[#7F265B] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-[#d987b4]">
                {progressPercent}% Done
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
            >
              <Menu className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{sidebarOpen ? "Hide Curriculum" : "Curriculum"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LEARNING THEATER LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1680px] w-full mx-auto">
        {/* LEFT: CURRICULUM SIDEBAR */}
        {sidebarOpen && (
          <aside className="w-full lg:w-[380px] shrink-0 border-r border-slate-800 bg-slate-950/70 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-110px)]">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#7F265B]" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-300">
                  Curriculum
                </h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">
                {completedCount}/{totalLecturesCount} Completed
              </span>
            </div>

            {/* Quick search inside curriculum */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search lectures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-8 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-[#7F265B] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Chapters / Modules List */}
            <div className="space-y-3">
              {filteredChapters.map((chapter, chIdx) => {
                const isOpen = openChapters[chIdx] ?? true;
                const chapterCompletedCount = chapter.chapterContent.filter((l) =>
                  completedLectureIds.includes(l.lectureId)
                ).length;

                return (
                  <div
                    key={chapter.chapterId || chIdx}
                    className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60"
                  >
                    {/* Chapter Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenChapters((prev) => ({ ...prev, [chIdx]: !prev[chIdx] }))
                      }
                      className="flex w-full items-center justify-between gap-3 bg-slate-900 px-3.5 py-3 text-left transition hover:bg-slate-800/80 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#d987b4] block">
                          Module {chIdx + 1}
                        </span>
                        <h4 className="text-xs font-bold text-slate-200 truncate mt-0.5">
                          {chapter.chapterTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-slate-400">
                        <span className="text-[10px] font-semibold">
                          {chapterCompletedCount}/{chapter.chapterContent.length}
                        </span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Chapter Lessons */}
                    {isOpen && (
                      <div className="p-1.5 space-y-1 bg-slate-950/40 border-t border-slate-800/80">
                        {chapter.chapterContent.map((lec, lecIdx) => {
                          const isActive = activeLecture?.lectureId === lec.lectureId;
                          const isDone = completedLectureIds.includes(lec.lectureId);

                          return (
                            <div
                              key={lec.lectureId || lecIdx}
                              onClick={() => handleSelectLecture(chapter, chIdx, lec, lecIdx)}
                              className={`group flex items-center justify-between gap-2.5 p-2.5 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200 ${
                                isActive
                                  ? "bg-[#7F265B] text-white font-bold shadow-md shadow-[#7F265B]/20"
                                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markLectureAsCompleted(lec.lectureId);
                                  }}
                                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] transition ${
                                    isDone
                                      ? "bg-emerald-500 text-white font-bold"
                                      : "border border-slate-600 text-transparent hover:border-slate-400"
                                  }`}
                                >
                                  ✓
                                </button>
                                <span className="truncate">{lec.lectureTitle}</span>
                              </div>

                              <span className="text-[10px] text-slate-400 shrink-0">
                                {lec.lectureDuration}m
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* CENTER / MAIN: THEATER PLAYER & INTERACTIVE TAB CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-110px)] bg-slate-900 text-slate-100">
          {/* VIDEO PLAYER THEATER */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black">
            {activeLecture ? (
              <VideoPlayer
                videoUrl={activeLecture.lectureUrl}
                title={activeLecture.lectureTitle}
                courseId={courseId}
                lessonId={activeLecture.lectureId}
                isEnrolled={true}
                isPreviewFree={activeLecture.isPreviewFree}
                onEnded={handleMarkCompleteAndNext}
              />
            ) : (
              <div className="aspect-video flex items-center justify-center text-slate-500">
                Select a lesson from the curriculum to begin learning.
              </div>
            )}
          </div>

          {/* LESSON DETAILS & NAVIGATION */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#d987b4] uppercase tracking-wider">
                  {activeLecture?.chapterTitle || "Course Curriculum"}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                  {activeLecture?.lectureTitle || "Welcome to the Course"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => activeLecture && markLectureAsCompleted(activeLecture.lectureId)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-sm ${
                    isCurrentLectureDone
                      ? "bg-emerald-600/90 text-white"
                      : "bg-[#7F265B] text-white hover:bg-[#6d214f]"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{isCurrentLectureDone ? "Lesson Completed ✓" : "Mark as Complete"}</span>
                </button>
              </div>
            </div>

            {/* Navigation Buttons: Previous / Next */}
            <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
              <button
                type="button"
                onClick={handlePreviousLesson}
                disabled={!hasPrevious}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous Lesson</span>
              </button>

              <button
                type="button"
                onClick={handleNextLesson}
                disabled={!hasNext}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition"
              >
                <span>Next Lesson</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* INTERACTIVE LEARNING TABS */}
          <div className="border-b border-slate-800">
            <nav className="flex space-x-6 overflow-x-auto pb-1">
              {[
                { id: "overview", label: "Overview", icon: BookOpen },
                { id: "resources", label: "Resources", icon: Download },
                { id: "notes", label: "Notes", icon: FileText },
                { id: "discussion", label: "Discussion & Q&A", icon: MessageSquare },
                { id: "review", label: "Rate Course", icon: Star },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`inline-flex items-center gap-2 pb-3 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "border-[#7F265B] text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* TAB CONTENTS (Themed for SaaS player) */}
          <div className="pt-2 text-slate-900">
            {activeTab === "overview" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">About this lesson</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {activeLecture?.description ||
                      courseData.shortDescription ||
                      "In this lecture, we dive deep into production-level architecture principles, explore performance trade-offs, and implement real-world design patterns."}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Key Competencies Mastered
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="text-[#7F265B] font-bold">✓</span>
                      <span>Hands-on implementation of core architectural concepts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#7F265B] font-bold">✓</span>
                      <span>Benchmarked runtime performance and latency optimizations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#7F265B] font-bold">✓</span>
                      <span>Error handling, type safety, and automated test coverage</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <ResourceList lessonTitle={activeLecture?.lectureTitle} />
            )}

            {activeTab === "notes" && (
              <StudentNotes
                courseId={courseId}
                lessonId={activeLecture?.lectureId || "lec-1"}
                lessonTitle={activeLecture?.lectureTitle || "Current Lesson"}
              />
            )}

            {activeTab === "discussion" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Course Q&A & Discussion</h3>
                    <p className="text-xs text-slate-500">Ask questions, share insights, and learn with peers.</p>
                  </div>
                  <span className="rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-bold text-[#7F265B]">
                    {questions.length} Questions
                  </span>
                </div>

                {/* Ask a question form */}
                <form onSubmit={handleAddQuestion} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Have a question about this lecture? Ask the instructor and community..."
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#7F265B] focus:outline-none focus:ring-2 focus:ring-[#7F265B]/10"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-xl bg-[#7F265B] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] transition cursor-pointer"
                    >
                      Post Question
                    </button>
                  </div>
                </form>

                {/* Questions List */}
                <div className="space-y-4 pt-2">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={q.avatar}
                            alt={q.author}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-slate-900">{q.author}</span>
                        </div>
                        <span className="text-[11px] text-slate-400">{q.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-9">
                        {q.text}
                      </p>
                      <div className="pl-9 flex items-center gap-4 text-xs font-semibold text-slate-500">
                        <button type="button" className="hover:text-[#7F265B]">
                          💬 {q.replies} Replies
                        </button>
                        <button type="button" className="hover:text-[#7F265B]">
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "review" && (
              <ReviewForm courseId={courseId} courseTitle={courseData.courseTitle} />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
