"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { courseService, userService } from "@/services";
import { Course, Chapter, Lecture } from "@/types/course.types";
import { useAppContext } from "@/context/AppContext";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import {
  LessonNavigation,
  CourseProgressBar,
  StudentNotes,
  LessonBookmarks,
  ResourceList,
  ReviewForm,
} from "@/components/learning";
import { useStudentLearningStore } from "@/store/use-student-learning-store";
import { useCourseStore } from "@/store/use-course-store";

type TabType = "overview" | "notes" | "bookmarks" | "resources" | "review";

interface LearnPageProps {
  params: Promise<{ courseId: string }>;
}

export default function LearnCoursePage({ params }: LearnPageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;

  const searchParams = useSearchParams();
  const initialLessonId = searchParams?.get("lessonId");

  const router = useRouter();
  const { getToken, userData } = useAppContext();

  const [courseData, setCourseData] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [completedLectures, setCompletedLectures] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const setLastWatched = useStudentLearningStore((state) => state.setLastWatched);
  const toggleLectureCompletedInStore = useCourseStore((state) => state.toggleLectureCompleted);
  const completedFromStore = useCourseStore((state) => state.completedLectures[courseId] || []);

  useEffect(() => {
    const fetchCourseAndProgress = async () => {
      try {
        setLoading(true);
        const [courseRes, token] = await Promise.all([
          courseService.getCourseById(courseId),
          getToken(),
        ]);

        if (courseRes.success && courseRes.courseData) {
          const course = courseRes.courseData;
          setCourseData(course);

          // Fetch API Progress
          if (token) {
            try {
              const progRes = await userService.getCourseProgress(courseId, token);
              if (progRes.success && progRes.progressData?.lectureCompleted) {
                setCompletedLectures(progRes.progressData.lectureCompleted);
              }
            } catch {
              // fallback to store
            }
          }

          // Flatten all lectures to locate active lecture
          const allLectures: { chapterId: string; lecture: Lecture }[] = [];
          course.courseContent.forEach((ch) => {
            ch.chapterContent.forEach((lec) => {
              allLectures.push({ chapterId: ch.chapterId, lecture: lec });
            });
          });

          if (allLectures.length > 0) {
            let target = allLectures[0];
            if (initialLessonId) {
              const found = allLectures.find((item) => item.lecture.lectureId === initialLessonId);
              if (found) target = found;
            }
            setActiveLecture(target.lecture);
            setActiveChapterId(target.chapterId);
            setLastWatched(courseId, target.lecture.lectureId, course.courseTitle, target.lecture.lectureTitle);
          }
        } else {
          toast.error("Failed to load course details");
        }
      } catch {
        toast.error("Error loading course environment");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseAndProgress();
    }
  }, [courseId, initialLessonId, getToken, setLastWatched]);

  // Flatten all lectures for Next/Prev navigation
  const allLecturesList: { chapterId: string; lecture: Lecture }[] = [];
  if (courseData) {
    courseData.courseContent.forEach((ch) => {
      ch.chapterContent.forEach((lec) => {
        allLecturesList.push({ chapterId: ch.chapterId, lecture: lec });
      });
    });
  }

  const currentIndex = allLecturesList.findIndex(
    (item) => item.lecture.lectureId === activeLecture?.lectureId
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allLecturesList.length - 1;

  const handleSelectLecture = (chapterId: string, lecture: Lecture) => {
    setActiveLecture(lecture);
    setActiveChapterId(chapterId);
    if (courseData) {
      setLastWatched(courseId, lecture.lectureId, courseData.courseTitle, lecture.lectureTitle);
    }
  };

  const handlePreviousLesson = () => {
    if (hasPrevious) {
      const prev = allLecturesList[currentIndex - 1];
      handleSelectLecture(prev.chapterId, prev.lecture);
    }
  };

  const handleNextLesson = () => {
    if (hasNext) {
      const next = allLecturesList[currentIndex + 1];
      handleSelectLecture(next.chapterId, next.lecture);
    }
  };

  const handleMarkCompleteAndNext = async () => {
    if (!activeLecture) return;

    const lectureId = activeLecture.lectureId;
    const isDone = completedLectures.includes(lectureId);

    // Update local & store
    if (!isDone) {
      setCompletedLectures((prev) => [...prev, lectureId]);
      toggleLectureCompletedInStore(courseId, lectureId);

      // Call API
      try {
        const token = await getToken();
        if (token) {
          await userService.updateCourseProgress(courseId, lectureId, token);
        }
      } catch {
        // silent fallback
      }
      toast.success("Lesson marked as complete!");
    }

    // Auto advance to next lesson
    if (hasNext) {
      handleNextLesson();
    }
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

  const isCurrentCompleted = activeLecture
    ? completedLectures.includes(activeLecture.lectureId) || completedFromStore.includes(activeLecture.lectureId)
    : false;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar />

      {/* TOP COMPACT TITLE & PROGRESS BAR */}
      <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/learning"
              className="text-xs font-bold text-slate-400 hover:text-white transition"
            >
              ← Dashboard
            </Link>
            <span className="text-slate-700">|</span>
            <h1 className="text-base font-bold text-white truncate max-w-md">
              {courseData.courseTitle}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-slate-800"
            >
              {sidebarOpen ? "Hide Curriculum" : "Show Curriculum"}
            </button>
          </div>
        </div>
      </div>

      {/* MAIN LEARNING CONTAINER */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* LEFT SIDEBAR: CURRICULUM */}
        {sidebarOpen && (
          <div className="w-full lg:w-[380px] shrink-0 border-r border-slate-800 bg-slate-950/60 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
            <CourseProgressBar
              courseTitle={courseData.courseTitle}
              completedCount={completedLectures.length}
              totalCount={allLecturesList.length}
            />

            <div className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 px-1">
                Course Curriculum ({courseData.courseContent.length} Modules)
              </h3>

              {courseData.courseContent.map((chapter, cIdx) => (
                <div key={chapter.chapterId || cIdx} className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden">
                  <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-300">
                      Module {cIdx + 1}: {chapter.chapterTitle}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {chapter.chapterContent.length} lessons
                    </span>
                  </div>

                  <div className="p-2 space-y-1">
                    {chapter.chapterContent.map((lec, lIdx) => {
                      const isActive = activeLecture?.lectureId === lec.lectureId;
                      const isDone = completedLectures.includes(lec.lectureId) || completedFromStore.includes(lec.lectureId);

                      return (
                        <div
                          key={lec.lectureId || lIdx}
                          onClick={() => handleSelectLecture(chapter.chapterId, lec)}
                          className={`flex items-center justify-between gap-3 p-2.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                            isActive
                              ? "bg-[#7F265B] text-white font-bold shadow-md"
                              : "text-slate-300 hover:bg-slate-800/80"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                                isDone ? "bg-emerald-500 text-white font-bold" : "border border-slate-600 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                            <span className="truncate">{lec.lectureTitle}</span>
                          </div>

                          <span className="text-[11px] opacity-70 shrink-0">
                            {lec.lectureDuration}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT SIDE: VIDEO PLAYER & INTERACTIVE TABS */}
        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] bg-slate-900 text-slate-900">
          {/* VIDEO PLAYER COMPONENT */}
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
                Select a lesson from the curriculum to start video playback.
              </div>
            )}
          </div>

          {/* LESSON TITLE & NAVIGATION BAR */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {activeLecture ? activeLecture.lectureTitle : "Welcome to the Course"}
            </h2>

            <LessonNavigation
              hasPrevious={hasPrevious}
              hasNext={hasNext}
              isCompleted={isCurrentCompleted}
              onPrevious={handlePreviousLesson}
              onNext={handleNextLesson}
              onCompleteAndNext={handleMarkCompleteAndNext}
            />
          </div>

          {/* INTERACTIVE TABS HEADER */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-6">
              {[
                { id: "overview", label: "Description" },
                { id: "notes", label: "Student Notes" },
                { id: "bookmarks", label: "Bookmarks" },
                { id: "resources", label: "Resources" },
                { id: "review", label: "Rate & Review" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer ${
                    activeTab === tab.id
                      ? "border-[#7F265B] text-[#7F265B]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* TAB CONTENTS */}
          <div className="pt-2">
            {activeTab === "overview" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Lesson Description</h4>
                <p className="text-sm leading-relaxed text-slate-700">
                  {activeLecture?.description ||
                    courseData.shortDescription ||
                    "This lesson walks through enterprise architecture principles, implementation techniques, and step-by-step code walkthroughs."}
                </p>
              </div>
            )}

            {activeTab === "notes" && (
              <StudentNotes
                courseId={courseId}
                lessonId={activeLecture?.lectureId || "lec-1"}
                lessonTitle={activeLecture?.lectureTitle || "Current Lesson"}
              />
            )}

            {activeTab === "bookmarks" && (
              <LessonBookmarks
                courseId={courseId}
                currentLessonId={activeLecture?.lectureId || "lec-1"}
                currentLessonTitle={activeLecture?.lectureTitle || "Current Lesson"}
                onSelectBookmarkLesson={(targetId) => {
                  const target = allLecturesList.find((item) => item.lecture.lectureId === targetId);
                  if (target) handleSelectLecture(target.chapterId, target.lecture);
                }}
              />
            )}

            {activeTab === "resources" && (
              <ResourceList lessonTitle={activeLecture?.lectureTitle} />
            )}

            {activeTab === "review" && (
              <ReviewForm courseId={courseId} courseTitle={courseData.courseTitle} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
