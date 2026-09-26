"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { toast } from "react-toastify";
import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { courseService } from "@/services";
import { Chapter, Course, LectureFormData } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface EditCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;

  const { getToken } = useAppContext();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [isUpdatingChapter, setIsUpdatingChapter] = useState<boolean>(false);
  const [isUpdatingLecture, setIsUpdatingLecture] = useState<boolean>(false);

  const [lecture, setLecture] = useState<LectureFormData>({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    lectureOrder: 1,
    isPreviewFree: true,
  });

  const fetchCourse = useCallback(async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourseById(courseId);
      if (data.success && data.courseData) {
        setCourse(data.courseData);
      } else {
        toast.error(data.message || "Failed to load course details");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId, fetchCourse]);

  const addChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    if (!chapterTitle.trim()) return toast.error("Enter chapter title");

    try {
      setIsUpdatingChapter(true);
      const token = await getToken();

      const newChapter: Chapter = {
        chapterId: Date.now().toString(),
        chapterTitle: chapterTitle.trim(),
        chapterOrder: (course.courseContent?.length || 0) + 1,
        chapterContent: [],
      };

      const updatedContent = [...(course.courseContent || []), newChapter];
      const data = await courseService.updateCourseContent(courseId, updatedContent, token);

      if (data.success) {
        toast.success("Chapter added successfully");
        setChapterTitle("");
        fetchCourse();
      } else {
        toast.error(data.message || "Failed to add chapter");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add chapter");
    } finally {
      setIsUpdatingChapter(false);
    }
  };

  const addLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    if (!selectedChapter) return toast.error("Please select a chapter");
    if (!lecture.lectureTitle.trim() || !lecture.lectureUrl.trim()) {
      return toast.error("Please fill in lecture title and video URL");
    }

    try {
      setIsUpdatingLecture(true);
      const token = await getToken();
      const updatedContent: Chapter[] = JSON.parse(JSON.stringify(course.courseContent || []));

      const index = updatedContent.findIndex((ch) => ch.chapterId === selectedChapter);
      if (index === -1) return toast.error("Chapter not found");

      updatedContent[index].chapterContent.push({
        lectureId: Date.now().toString(),
        lectureTitle: lecture.lectureTitle.trim(),
        lectureDuration: Number(lecture.lectureDuration) || 0,
        lectureUrl: lecture.lectureUrl.trim(),
        lectureOrder: (updatedContent[index].chapterContent?.length || 0) + 1,
        isPreviewFree: Boolean(lecture.isPreviewFree),
      });

      const data = await courseService.updateCourseContent(courseId, updatedContent, token);

      if (data.success) {
        toast.success("Lecture added successfully");
        setLecture({
          lectureTitle: "",
          lectureDuration: "",
          lectureUrl: "",
          lectureOrder: 1,
          isPreviewFree: true,
        });
        fetchCourse();
      } else {
        toast.error(data.message || "Failed to add lecture");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add lecture");
    } finally {
      setIsUpdatingLecture(false);
    }
  };

  if (loading || !course) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-8 md:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-xs font-medium text-[#7F265B]">
              Course Editor
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Edit Course Content
            </h1>
            <p className="mt-1 text-sm text-slate-500">{course.courseTitle}</p>
          </div>

          <Link
            href="/educator/my-courses"
            className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:border-[#7F265B]/30 hover:text-[#7F265B]"
          >
            ← Back to Courses
          </Link>
        </motion.div>

        {/* Add Chapter Box */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900">Add New Chapter</h2>
          <form onSubmit={addChapter} className="mt-4 flex gap-3">
            <input
              type="text"
              required
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="Chapter Title (e.g. Mastering Asynchronous JavaScript)"
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[#7F265B] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isUpdatingChapter}
              className="rounded-full bg-[#7F265B] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer"
            >
              {isUpdatingChapter ? "Adding..." : "+ Add Chapter"}
            </button>
          </form>
        </motion.div>

        {/* Add Lecture Box */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <h2 className="text-lg font-bold text-slate-900">Add Lecture to Chapter</h2>

          <form onSubmit={addLecture} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Target Chapter
              </label>
              <select
                required
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[#7F265B] focus:bg-white"
              >
                <option value="">-- Select Chapter --</option>
                {course.courseContent?.map((ch) => (
                  <option key={ch.chapterId} value={ch.chapterId}>
                    Chapter {ch.chapterOrder}: {ch.chapterTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Lecture Title
                </label>
                <input
                  type="text"
                  required
                  value={lecture.lectureTitle}
                  onChange={(e) =>
                    setLecture({ ...lecture, lectureTitle: e.target.value })
                  }
                  placeholder="e.g. Promises vs Async/Await"
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[#7F265B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={lecture.lectureDuration}
                  onChange={(e) =>
                    setLecture({ ...lecture, lectureDuration: e.target.value })
                  }
                  placeholder="e.g. 20"
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[#7F265B] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700">
                YouTube URL
              </label>
              <input
                type="url"
                required
                value={lecture.lectureUrl}
                onChange={(e) =>
                  setLecture({ ...lecture, lectureUrl: e.target.value })
                }
                placeholder="https://youtu.be/..."
                className="mt-1.5 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm outline-none focus:border-[#7F265B] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="editFreePreview"
                checked={lecture.isPreviewFree}
                onChange={(e) =>
                  setLecture({ ...lecture, isPreviewFree: e.target.checked })
                }
                className="h-4 w-4 rounded accent-[#7F265B]"
              />
              <label
                htmlFor="editFreePreview"
                className="text-xs font-medium text-slate-700 cursor-pointer"
              >
                Free preview lecture
              </label>
            </div>

            <button
              type="submit"
              disabled={isUpdatingLecture}
              className="w-full rounded-full bg-[#7F265B] py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer"
            >
              {isUpdatingLecture ? "Adding Lecture..." : "+ Add Lecture"}
            </button>
          </form>
        </motion.div>

        {/* Current Curriculum Overview */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.12 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4"
        >
          <h2 className="text-lg font-bold text-slate-900">Current Course Content</h2>

          {course.courseContent && course.courseContent.length > 0 ? (
            <div className="space-y-4">
              {course.courseContent.map((ch, idx) => (
                <div
                  key={ch.chapterId || idx}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800">
                      Chapter {idx + 1}: {ch.chapterTitle}
                    </h3>
                    <span className="text-xs text-slate-400">
                      {ch.chapterContent?.length || 0} Lectures
                    </span>
                  </div>

                  {ch.chapterContent && ch.chapterContent.length > 0 ? (
                    <div className="space-y-1.5 pt-2">
                      {ch.chapterContent.map((lec, lIdx) => (
                        <div
                          key={lec.lectureId || lIdx}
                          className="flex items-center justify-between rounded-xl bg-white p-2.5 text-xs text-slate-700 shadow-2xs"
                        >
                          <span>
                            {lIdx + 1}. {lec.lectureTitle}
                          </span>
                          <span className="text-slate-400">
                            {lec.lectureDuration} mins {lec.isPreviewFree ? "(Free)" : ""}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No lectures in this chapter yet.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No chapters added to this course yet.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
