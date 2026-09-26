"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Chapter, CourseLevel, CreateCoursePayload, Lecture } from "@/types/course.types";
import { useAuth } from "@clerk/nextjs";

interface CourseBuilderProps {
  initialData?: Partial<CreateCoursePayload>;
  isEditing?: boolean;
  courseId?: string;
  onSave?: (data: CreateCoursePayload) => Promise<void>;
}

export const CourseBuilder: React.FC<CourseBuilderProps> = ({
  initialData,
  isEditing = false,
  courseId,
  onSave,
}) => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  // Form State
  const [courseTitle, setCourseTitle] = useState(initialData?.courseTitle || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [courseDescription, setCourseDescription] = useState(initialData?.courseDescription || "");
  const [category, setCategory] = useState(initialData?.category || "Full Stack Web Development");
  const [level, setLevel] = useState<CourseLevel>(initialData?.level || "All Levels");
  const [coursePrice, setCoursePrice] = useState<number>(initialData?.coursePrice || 49.99);
  const [discount, setDiscount] = useState<number>(initialData?.discount || 10);
  const [duration, setDuration] = useState(initialData?.duration || "12 Hours");
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.isPublished ?? true);

  // Curriculum State (Modules & Lessons)
  const [chapters, setChapters] = useState<Chapter[]>(
    initialData?.courseContent || [
      {
        chapterId: "ch-1",
        chapterOrder: 1,
        chapterTitle: "Module 1: Getting Started",
        chapterContent: [
          {
            lectureId: "lec-1",
            lectureTitle: "Course Overview & Learning Path",
            lectureDuration: 15,
            lectureUrl: "https://youtu.be/dQw4w9WgXcQ",
            isPreviewFree: true,
            lectureOrder: 1,
          },
        ],
      },
    ]
  );

  // New Module Input State
  const [newModuleName, setNewModuleName] = useState("");

  // Add Module
  const handleAddModule = () => {
    if (!newModuleName.trim()) return;
    const newChapter: Chapter = {
      chapterId: `ch-${Date.now()}`,
      chapterOrder: chapters.length + 1,
      chapterTitle: newModuleName.trim(),
      chapterContent: [],
    };
    setChapters([...chapters, newChapter]);
    setNewModuleName("");
  };

  // Remove Module
  const handleRemoveModule = (chapterId: string) => {
    setChapters(chapters.filter((ch) => ch.chapterId !== chapterId));
  };

  // Add Lesson to Module
  const handleAddLesson = (chapterId: string) => {
    setChapters(
      chapters.map((ch) => {
        if (ch.chapterId === chapterId) {
          const newLecture: Lecture = {
            lectureId: `lec-${Date.now()}`,
            lectureTitle: `New Lesson ${ch.chapterContent.length + 1}`,
            lectureDuration: 10,
            lectureUrl: "https://youtu.be/dQw4w9WgXcQ",
            isPreviewFree: false,
            lectureOrder: ch.chapterContent.length + 1,
          };
          return { ...ch, chapterContent: [...ch.chapterContent, newLecture] };
        }
        return ch;
      })
    );
  };

  // Update Lesson
  const handleUpdateLesson = (
    chapterId: string,
    lectureId: string,
    field: keyof Lecture,
    value: any
  ) => {
    setChapters(
      chapters.map((ch) => {
        if (ch.chapterId === chapterId) {
          return {
            ...ch,
            chapterContent: ch.chapterContent.map((lec) => {
              if (lec.lectureId === lectureId) {
                return { ...lec, [field]: value };
              }
              return lec;
            }),
          };
        }
        return ch;
      })
    );
  };

  // Remove Lesson
  const handleRemoveLesson = (chapterId: string, lectureId: string) => {
    setChapters(
      chapters.map((ch) => {
        if (ch.chapterId === chapterId) {
          return {
            ...ch,
            chapterContent: ch.chapterContent.filter((lec) => lec.lectureId !== lectureId),
          };
        }
        return ch;
      })
    );
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return toast.warn("Course Title is required");

    const payload: CreateCoursePayload = {
      courseTitle,
      courseDescription,
      shortDescription,
      coursePrice,
      discount,
      category,
      level,
      duration,
      isPublished,
      courseContent: chapters,
    };

    try {
      setLoading(true);
      if (onSave) {
        await onSave(payload);
      } else {
        toast.success(isEditing ? "Course updated successfully!" : "Course published successfully!");
        router.push("/educator/my-courses");
      }
    } catch {
      toast.error("Failed to save course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {isEditing ? "Edit Course" : "Create New Course"}
          </h2>
          <p className="text-sm text-slate-500">
            Configure course metadata, modules, and video lessons
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPublished(!isPublished)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-colors ${
              isPublished
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-amber-50 border-amber-300 text-amber-700"
            }`}
          >
            Status: {isPublished ? "Published" : "Draft"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#7F265B] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#6d214f] transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Saving..." : isEditing ? "Update Course" : "Publish Course"}
          </button>
        </div>
      </div>

      {/* Basic Metadata Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          1. Basic Details
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Course Title *
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="e.g. Master Next.js 15 & Full Stack TypeScript"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief summary for course cards & search results"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Description
            </label>
            <textarea
              rows={4}
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Comprehensive syllabus, objectives, and prerequisites..."
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Course Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as CourseLevel)}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              >
                <option value="All Levels">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 15 Hours"
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Course Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={coursePrice}
                onChange={(e) => setCoursePrice(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Builder Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">
            2. Curriculum & Syllabus Builder ({chapters.length} Modules)
          </h3>
        </div>

        {/* Add New Module Input */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
            placeholder="Enter new module title (e.g. Module 2: Authentication & API Routes)"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddModule}
            className="rounded-xl bg-[#7F265B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#6d214f]"
          >
            + Add Module
          </button>
        </div>

        {/* Modules List */}
        <div className="space-y-6 pt-2">
          {chapters.map((module, mIdx) => (
            <div
              key={module.chapterId}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-4"
            >
              <div className="flex items-center justify-between gap-4">
                <input
                  type="text"
                  value={module.chapterTitle}
                  onChange={(e) => {
                    const title = e.target.value;
                    setChapters(
                      chapters.map((ch) =>
                        ch.chapterId === module.chapterId ? { ...ch, chapterTitle: title } : ch
                      )
                    );
                  }}
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-800 focus:border-[#7F265B]"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveModule(module.chapterId)}
                  className="text-xs font-semibold text-red-600 hover:text-red-800"
                >
                  Remove Module
                </button>
              </div>

              {/* Lessons inside Module */}
              <div className="space-y-3 pl-2 sm:pl-4">
                {module.chapterContent.map((lesson) => (
                  <div
                    key={lesson.lectureId}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center rounded-lg border border-slate-200 bg-white p-3 shadow-2xs"
                  >
                    <input
                      type="text"
                      value={lesson.lectureTitle}
                      onChange={(e) =>
                        handleUpdateLesson(module.chapterId, lesson.lectureId, "lectureTitle", e.target.value)
                      }
                      placeholder="Lesson title"
                      className="sm:col-span-4 rounded-md border border-slate-200 p-2 text-xs font-medium"
                    />

                    <input
                      type="text"
                      value={lesson.lectureUrl}
                      onChange={(e) =>
                        handleUpdateLesson(module.chapterId, lesson.lectureId, "lectureUrl", e.target.value)
                      }
                      placeholder="YouTube Video URL"
                      className="sm:col-span-4 rounded-md border border-slate-200 p-2 text-xs font-medium"
                    />

                    <div className="sm:col-span-2 flex items-center gap-1">
                      <input
                        type="number"
                        value={lesson.lectureDuration}
                        onChange={(e) =>
                          handleUpdateLesson(
                            module.chapterId,
                            lesson.lectureId,
                            "lectureDuration",
                            Number(e.target.value)
                          )
                        }
                        className="w-16 rounded-md border border-slate-200 p-2 text-xs font-medium"
                      />
                      <span className="text-xs text-slate-500">mins</span>
                    </div>

                    <div className="sm:col-span-2 flex items-center justify-between">
                      <label className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                        <input
                          type="checkbox"
                          checked={lesson.isPreviewFree}
                          onChange={(e) =>
                            handleUpdateLesson(
                              module.chapterId,
                              lesson.lectureId,
                              "isPreviewFree",
                              e.target.checked
                            )
                          }
                          className="rounded text-[#7F265B]"
                        />
                        Free Preview
                      </label>

                      <button
                        type="button"
                        onClick={() => handleRemoveLesson(module.chapterId, lesson.lectureId)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddLesson(module.chapterId)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#7F265B] hover:underline pt-1"
                >
                  + Add Lesson to Module
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default CourseBuilder;
