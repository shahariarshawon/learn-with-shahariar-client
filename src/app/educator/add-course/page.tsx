"use client";

import React, { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-toastify";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { educatorService } from "@/services";
import { Chapter, LectureFormData } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function AddCoursePage() {
  const { getToken } = useAppContext();

  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<any>(null);

  const [courseTitle, setCourseTitle] = useState<string>("");
  const [coursePrice, setCoursePrice] = useState<number | string>(0);
  const [discount, setDiscount] = useState<number | string>(0);
  const [image, setImage] = useState<File | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [lectureDetails, setLectureDetails] = useState<LectureFormData>({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // Initialize Quill dynamically on client only
  useEffect(() => {
    let isMounted = true;

    const initQuill = async () => {
      if (editorRef.current && !quillInstance.current && typeof window !== "undefined") {
        const { default: Quill } = await import("quill");
        if (isMounted && editorRef.current && !quillInstance.current) {
          quillInstance.current = new Quill(editorRef.current, {
            theme: "snow",
            placeholder: "Write a detailed course description...",
          });
        }
      }
    };

    initQuill();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChapter = (action: "add" | "remove" | "toggle", chapterId?: string) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title && title.trim()) {
        const newChapter: Chapter = {
          chapterId: nanoid(),
          chapterTitle: title.trim(),
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove" && chapterId) {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === "toggle" && chapterId) {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (
    action: "add" | "remove",
    chapterId: string,
    lectureIndex?: number
  ) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove" && typeof lectureIndex === "number") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle.trim() || !lectureDetails.lectureUrl.trim()) {
      toast.error("Please fill in all lecture details");
      return;
    }

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            lectureId: nanoid(),
            lectureTitle: lectureDetails.lectureTitle.trim(),
            lectureDuration: Number(lectureDetails.lectureDuration) || 0,
            lectureUrl: lectureDetails.lectureUrl.trim(),
            isPreviewFree: Boolean(lectureDetails.isPreviewFree),
            lectureOrder:
              chapter.chapterContent && chapter.chapterContent.length > 0
                ? ((chapter.chapterContent[chapter.chapterContent.length - 1]?.lectureOrder ?? 0) + 1)
                : 1,
          };
          return {
            ...chapter,
            chapterContent: [...chapter.chapterContent, newLecture],
          };
        }
        return chapter;
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!courseTitle.trim()) {
      toast.error("Please enter a course title");
      return;
    }

    if (!image) {
      toast.error("Please select a course thumbnail");
      return;
    }

    if (chapters.length === 0) {
      toast.error("Please add at least one chapter");
      return;
    }

    try {
      setIsSubmitting(true);
      const descriptionHtml = quillInstance.current
        ? quillInstance.current.root.innerHTML
        : "";

      const courseData = {
        courseTitle: courseTitle.trim(),
        courseDescription: descriptionHtml,
        coursePrice: Number(coursePrice) || 0,
        discount: Number(discount) || 0,
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const response = await educatorService.addCourse(formData, token);

      if (response.success) {
        toast.success(response.message || "Course created successfully!");
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        if (quillInstance.current) {
          quillInstance.current.root.innerHTML = "";
        }
      } else {
        toast.error(response.message || "Failed to create course");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit course");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-2"
        >
          <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Course Management
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Add New Course
          </h1>
          <p className="text-sm text-slate-500">
            Create and publish a comprehensive, structured course for your students.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Course Title
            </label>
            <input
              type="text"
              required
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. Master MERN Stack Development with 10 Projects"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
            />
          </div>

          {/* Description Editor (Quill) */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Course Description
            </label>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div ref={editorRef} className="min-h-[160px]" />
            </div>
          </div>

          {/* Pricing & Discount */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Course Price ($)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                required
                value={coursePrice}
                onChange={(e) => setCoursePrice(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Discount (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
              />
            </div>
          </div>

          {/* Thumbnail upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Course Thumbnail
            </label>
            <label className="mt-2 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-[#7F265B]/30 bg-[#7F265B]/5 p-6 text-center transition hover:bg-[#7F265B]/10">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
              />
              {image ? (
                <div className="flex items-center gap-3 text-sm font-medium text-[#7F265B]">
                  <span>📷</span>
                  <span>{image.name}</span>
                  <span className="text-xs text-slate-400">
                    ({(image.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <img
                    src={assets.file_upload_icon}
                    alt="upload"
                    className="mx-auto h-8 w-8 opacity-70"
                  />
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload thumbnail
                  </p>
                  <p className="text-xs text-slate-400">PNG, JPG, WebP up to 5MB</p>
                </div>
              )}
            </label>
          </div>

          {/* Chapters & Lectures Builder */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Curriculum Structure
              </h3>
              <button
                type="button"
                onClick={() => handleChapter("add")}
                className="rounded-full bg-[#7F265B]/10 px-4 py-2 text-xs font-semibold text-[#7F265B] transition hover:bg-[#7F265B]/20 cursor-pointer"
              >
                + Add Chapter
              </button>
            </div>

            {chapters.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
                No chapters added yet. Click &quot;+ Add Chapter&quot; above to start adding chapters and lectures.
              </div>
            ) : (
              <div className="space-y-3">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.chapterId}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7F265B]/10 text-xs font-bold text-[#7F265B]">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-slate-800">
                          {chapter.chapterTitle}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleLecture("add", chapter.chapterId)}
                          className="rounded-full border border-[#7F265B]/30 px-3 py-1 text-xs font-medium text-[#7F265B] hover:bg-[#7F265B]/5 cursor-pointer"
                        >
                          + Lecture
                        </button>
                        <button
                          type="button"
                          onClick={() => handleChapter("remove", chapter.chapterId)}
                          className="rounded-full px-2 py-1 text-xs text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Lectures List */}
                    {chapter.chapterContent && chapter.chapterContent.length > 0 && (
                      <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
                        {chapter.chapterContent.map((lec, lecIdx) => (
                          <div
                            key={lec.lectureId || lecIdx}
                            className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span>🎬</span>
                              <span className="font-medium text-slate-700">
                                {lec.lectureTitle}
                              </span>
                              <span className="text-slate-400">
                                ({lec.lectureDuration} mins)
                              </span>
                              {lec.isPreviewFree && (
                                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                                  Free
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleLecture("remove", chapter.chapterId, lecIdx)
                              }
                              className="text-slate-400 hover:text-red-500 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#7F265B] py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating Course..." : "Publish Course"}
          </button>
        </motion.form>
      </div>

      {/* Add Lecture Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-slate-900">Add Lecture</h3>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    placeholder="e.g. Introduction & Architecture"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#7F265B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    placeholder="e.g. 15"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#7F265B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    YouTube URL / Video URL
                  </label>
                  <input
                    type="url"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    placeholder="https://youtu.be/..."
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#7F265B]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="freePreview"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded accent-[#7F265B]"
                  />
                  <label
                    htmlFor="freePreview"
                    className="text-xs font-medium text-slate-700 cursor-pointer"
                  >
                    Allow free preview for prospective students
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addLecture}
                  className="rounded-full bg-[#7F265B] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#6d214f] cursor-pointer"
                >
                  Add Lecture
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
