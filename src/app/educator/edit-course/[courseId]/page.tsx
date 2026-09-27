"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { toast } from "react-toastify";
import { Edit3, Plus, Trash2, Video, CheckCircle2, ArrowLeft, Save } from "lucide-react";
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
  const [savingDetails, setSavingDetails] = useState<boolean>(false);
  const [isUpdatingChapter, setIsUpdatingChapter] = useState<boolean>(false);
  const [isUpdatingLecture, setIsUpdatingLecture] = useState<boolean>(false);

  // Course Details State
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [discount, setDiscount] = useState<number | string>(0);

  // Curriculum State
  const [chapterTitle, setChapterTitle] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
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
      if (data.success && (data.courseData || data.course)) {
        const c = (data.courseData || data.course) as Course;
        setCourse(c);
        setTitle(c.courseTitle || c.title || "");
        setDescription(c.courseDescription || c.description || "");
        setThumbnail(c.courseThumbnail || c.thumbnail || "");
        setPrice(c.coursePrice ?? c.price ?? 0);
        setDiscount(c.discount ?? 0);
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

  // 1. Save Basic Details
  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return toast.error("Course title is required");

    try {
      setSavingDetails(true);
      const token = await getToken();

      const payload = {
        courseTitle: title.trim(),
        title: title.trim(),
        courseDescription: description.trim(),
        description: description.trim(),
        courseThumbnail: thumbnail.trim(),
        thumbnail: thumbnail.trim(),
        coursePrice: Number(price) || 0,
        price: Number(price) || 0,
        discount: Number(discount) || 0,
      };

      const res = await courseService.updateCourse(courseId, payload, token);
      if (res.success) {
        toast.success("Course details saved successfully! 🎉");
        fetchCourse();
      } else {
        toast.error(res.message || "Failed to update course details");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save details");
    } finally {
      setSavingDetails(false);
    }
  };

  // 2. Add Chapter
  const addChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    if (!chapterTitle.trim()) return toast.error("Enter chapter title");

    try {
      setIsUpdatingChapter(true);
      const token = await getToken();

      const newChapter: Chapter = {
        chapterId: `ch_${Date.now()}`,
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

  // 3. Delete Chapter
  const handleDeleteChapter = async (chapterId: string) => {
    if (!course) return;
    try {
      const token = await getToken();
      const updatedContent = (course.courseContent || []).filter((ch) => ch.chapterId !== chapterId);
      const data = await courseService.updateCourseContent(courseId, updatedContent, token);
      if (data.success) {
        toast.success("Chapter removed");
        fetchCourse();
      } else {
        toast.error("Failed to remove chapter");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete chapter");
    }
  };

  // 4. Add Lecture
  const addLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;
    if (!selectedChapter) return toast.error("Please select a target chapter");
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
        lectureId: `lec_${Date.now()}`,
        lectureTitle: lecture.lectureTitle.trim(),
        lectureDuration: Number(lecture.lectureDuration) || 0,
        lectureUrl: lecture.lectureUrl.trim(),
        lectureOrder: (updatedContent[index].chapterContent?.length || 0) + 1,
        isPreviewFree: Boolean(lecture.isPreviewFree),
      });

      const data = await courseService.updateCourseContent(courseId, updatedContent, token);

      if (data.success) {
        toast.success("Lecture added successfully! 🎬");
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

  // 5. Delete Lecture
  const handleDeleteLecture = async (chapterId: string, lectureId: string) => {
    if (!course) return;
    try {
      const token = await getToken();
      const updatedContent: Chapter[] = JSON.parse(JSON.stringify(course.courseContent || []));
      const chIndex = updatedContent.findIndex((ch) => ch.chapterId === chapterId);
      if (chIndex !== -1) {
        updatedContent[chIndex].chapterContent = updatedContent[chIndex].chapterContent.filter(
          (l) => l.lectureId !== lectureId
        );
        const data = await courseService.updateCourseContent(courseId, updatedContent, token);
        if (data.success) {
          toast.success("Lecture removed");
          fetchCourse();
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lecture");
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
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#7F265B]/15 bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B]">
              <Edit3 className="h-3.5 w-3.5" />
              Course Editor
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              Edit Course & Curriculum
            </h1>
            <p className="mt-1 text-xs text-slate-500">{course.courseTitle || course.title}</p>
          </div>

          <Link
            href="/instructor/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:border-[#7F265B]/30 hover:text-[#7F265B]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Courses
          </Link>
        </motion.div>

        {/* 1. Basic Details Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          onSubmit={handleSaveDetails}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Course Information</h2>
              <p className="text-xs text-slate-500">Update course title, description, pricing, and thumbnail</p>
            </div>
            <button
              type="submit"
              disabled={savingDetails}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#7F265B] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer transition"
            >
              <Save className="h-3.5 w-3.5" />
              {savingDetails ? "Saving Changes..." : "Save Details"}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Course Description
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Thumbnail Image URL
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
              />
              {thumbnail && (
                <div className="mt-2">
                  <img
                    src={thumbnail}
                    alt="Thumbnail preview"
                    className="h-24 w-40 rounded-xl object-cover ring-1 ring-slate-200"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.form>

        {/* 2. Add Chapter Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
        >
          <div>
            <h2 className="text-base font-bold text-slate-900">Add Curriculum Chapter</h2>
            <p className="text-xs text-slate-500">Create new structured modules for your course</p>
          </div>

          <form onSubmit={addChapter} className="flex gap-3">
            <input
              type="text"
              required
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
              placeholder="e.g. Asynchronous Microservices & Message Queues"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-xs sm:text-sm font-medium outline-none focus:border-[#7F265B] focus:bg-white"
            />
            <button
              type="submit"
              disabled={isUpdatingChapter}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer transition shrink-0"
            >
              <Plus className="h-4 w-4" />
              {isUpdatingChapter ? "Adding..." : "Add Chapter"}
            </button>
          </form>
        </motion.div>

        {/* 3. Add Lecture to Chapter Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
        >
          <div>
            <h2 className="text-base font-bold text-slate-900">Add Lesson to Chapter</h2>
            <p className="text-xs text-slate-500">Attach video streams, duration, and preview settings</p>
          </div>

          <form onSubmit={addLecture} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Chapter
              </label>
              <select
                required
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-[#7F265B] focus:bg-white"
              >
                <option value="">-- Select Chapter --</option>
                {course.courseContent?.map((ch, idx) => (
                  <option key={ch.chapterId || idx} value={ch.chapterId}>
                    Chapter {idx + 1}: {ch.chapterTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Lesson Title
                </label>
                <input
                  type="text"
                  required
                  value={lecture.lectureTitle}
                  onChange={(e) => setLecture({ ...lecture, lectureTitle: e.target.value })}
                  placeholder="e.g. Distributed Consensus in Raft"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-[#7F265B] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={lecture.lectureDuration}
                  onChange={(e) => setLecture({ ...lecture, lectureDuration: e.target.value })}
                  placeholder="e.g. 24"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-[#7F265B] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Video URL (MP4 / WebM / YouTube)
              </label>
              <input
                type="url"
                required
                value={lecture.lectureUrl}
                onChange={(e) => setLecture({ ...lecture, lectureUrl: e.target.value })}
                placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2 text-xs sm:text-sm font-medium outline-none focus:border-[#7F265B] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="editFreePreview"
                checked={lecture.isPreviewFree}
                onChange={(e) => setLecture({ ...lecture, isPreviewFree: e.target.checked })}
                className="h-4 w-4 rounded accent-[#7F265B] cursor-pointer"
              />
              <label htmlFor="editFreePreview" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Free preview lesson for prospective students
              </label>
            </div>

            <button
              type="submit"
              disabled={isUpdatingLecture}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F265B] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer transition"
            >
              <Video className="h-4 w-4" />
              {isUpdatingLecture ? "Adding Lesson..." : "Add Lesson to Chapter"}
            </button>
          </form>
        </motion.div>

        {/* 4. Current Curriculum Overview with Deletion & Modification */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.12 }}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Current Course Syllabus</h2>
            <span className="text-xs font-bold text-slate-400">
              {course.courseContent?.length || 0} Modules Total
            </span>
          </div>

          {course.courseContent && course.courseContent.length > 0 ? (
            <div className="space-y-4">
              {course.courseContent.map((ch, idx) => (
                <div
                  key={ch.chapterId || idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#7F265B] uppercase tracking-wider">
                        Module {idx + 1}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm">{ch.chapterTitle}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-400">
                        {ch.chapterContent?.length || 0} Lessons
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteChapter(ch.chapterId)}
                        className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Delete Chapter"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {ch.chapterContent && ch.chapterContent.length > 0 ? (
                    <div className="space-y-2 pt-1">
                      {ch.chapterContent.map((lec, lIdx) => (
                        <div
                          key={lec.lectureId || lIdx}
                          className="flex items-center justify-between rounded-xl bg-white border border-slate-200/70 p-3 text-xs text-slate-700 shadow-2xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                              {lIdx + 1}
                            </span>
                            <span className="font-semibold text-slate-900 truncate">
                              {lec.lectureTitle}
                            </span>
                            {lec.isPreviewFree && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shrink-0">
                                Free
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-slate-400 font-medium">
                              {lec.lectureDuration} mins
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDeleteLecture(ch.chapterId, lec.lectureId)}
                              className="text-slate-400 hover:text-red-500 cursor-pointer p-0.5"
                              title="Delete Lesson"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No lessons in this module yet.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-6">
              No modules added to this course yet.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
