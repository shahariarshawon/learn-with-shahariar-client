"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { toast } from "react-toastify";
import { useAppContext } from "@/context/AppContext";
import { courseService, quizService } from "@/services";
import { Chapter, Course, QuizQuestion } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function QuizManagerPage() {
  const { getToken } = useAppContext();

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [questions, setQuestions] = useState<QuizQuestion[]>([
    {
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    },
  ]);

  const fetchCourses = useCallback(async () => {
    try {
      const token = await getToken();
      const response = await courseService.getEducatorCourses(token);
      if (response.success && Array.isArray(response.courses)) {
        setCourses(response.courses);
      }
    } catch {
      toast.error("Failed to load courses");
    }
  }, [getToken]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedCourse) {
        setChapters([]);
        setSelectedChapter("");
        return;
      }

      try {
        const response = await courseService.getCourseById(selectedCourse);
        if (response.success && response.courseData?.courseContent) {
          setChapters(response.courseData.courseContent);
        }
      } catch {
        toast.error("Failed to load chapters for selected course");
      }
    };

    fetchChapters();
  }, [selectedCourse]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
      },
    ]);
  };

  const updateQuestionText = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const updateAnswer = (index: number, answerIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, answer: answerIndex } : q))
    );
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) => (j === optIndex ? value : opt)),
            }
          : q
      )
    );
  };

  const removeQuestion = (qIndex: number) => {
    if (questions.length === 1) {
      toast.error("At least one question is required");
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const submitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourse) return toast.error("Please select a course");
    if (!selectedChapter) return toast.error("Please select a chapter");
    if (!title.trim()) return toast.error("Please enter quiz title");

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        return toast.error(`Question ${i + 1} text is required`);
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          return toast.error(`Question ${i + 1}, Option ${j + 1} cannot be empty`);
        }
      }
    }

    try {
      setIsSubmitting(true);
      const token = await getToken();
      const response = await quizService.createQuiz(
        {
          courseId: selectedCourse,
          chapterId: selectedChapter,
          title: title.trim(),
          questions,
        },
        token
      );

      if (response.success) {
        toast.success(response.message || "Quiz created successfully!");
        setTitle("");
        setSelectedCourse("");
        setSelectedChapter("");
        setQuestions([
          {
            question: "",
            options: ["", "", "", ""],
            answer: 0,
          },
        ]);
      } else {
        toast.error(response.message || "Failed to create quiz");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create quiz");
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
            Assessment Builder
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Quiz Manager
          </h1>
          <p className="text-sm text-slate-500">
            Create interactive multiple-choice quizzes for any course chapter.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          onSubmit={submitQuiz}
          className="space-y-6 rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8"
        >
          {/* Course & Chapter Select */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Select Course
              </label>
              <select
                required
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white"
              >
                <option value="">-- Choose Course --</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.courseTitle}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                Select Chapter
              </label>
              <select
                required
                disabled={!selectedCourse}
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white disabled:opacity-50"
              >
                <option value="">-- Choose Chapter --</option>
                {chapters.map((ch) => (
                  <option key={ch.chapterId} value={ch.chapterId}>
                    {ch.chapterTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quiz Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-800">
              Quiz Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chapter 1 Concept Check"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#7F265B] focus:bg-white"
            />
          </div>

          {/* Questions List */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Quiz Questions ({questions.length})
              </h3>
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-full bg-[#7F265B]/10 px-4 py-2 text-xs font-semibold text-[#7F265B] hover:bg-[#7F265B]/20 cursor-pointer"
              >
                + Add Question
              </button>
            </div>

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#7F265B]">
                    Question #{qIndex + 1}
                  </span>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  required
                  value={q.question}
                  onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                  placeholder={`Enter question ${qIndex + 1}...`}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-[#7F265B]"
                />

                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500">
                    Options (Select the radio button for the correct answer):
                  </p>
                  {q.options.map((opt, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center gap-3 rounded-xl bg-white p-2 border border-slate-200"
                    >
                      <input
                        type="radio"
                        name={`correct-answer-${qIndex}`}
                        checked={q.answer === optIndex}
                        onChange={() => updateAnswer(qIndex, optIndex)}
                        className="h-4 w-4 accent-[#7F265B] cursor-pointer"
                      />
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) =>
                          updateOption(qIndex, optIndex, e.target.value)
                        }
                        placeholder={`Option ${optIndex + 1}`}
                        className="flex-1 text-xs outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#7F265B] py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6d214f] disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Creating Quiz..." : "Save and Publish Quiz"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
