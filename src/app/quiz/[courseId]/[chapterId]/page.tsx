"use client";

import React, { useEffect, useState, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { toast } from "react-toastify";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import Loading from "@/components/student/Loading";
import { useAppContext } from "@/context/AppContext";
import { quizService } from "@/services";
import { Quiz } from "@/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

interface QuizPageProps {
  params: Promise<{ courseId: string; chapterId: string }>;
}

export default function QuizPage({ params }: QuizPageProps) {
  const resolvedParams = use(params);
  const { courseId, chapterId } = resolvedParams;
  const router = useRouter();
  const { getToken } = useAppContext();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const fetchQuiz = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const data = await quizService.getChapterQuiz(courseId, chapterId, token);

      if (data.success && data.quiz) {
        setQuiz(data.quiz);
      } else {
        toast.error(data.message || "Quiz not found");
        router.push(`/player/${courseId}`);
      }
    } catch {
      toast.error("Failed to load quiz");
      router.push(`/player/${courseId}`);
    } finally {
      setLoading(false);
    }
  }, [courseId, chapterId, getToken, router]);

  useEffect(() => {
    if (courseId && chapterId) {
      fetchQuiz();
    }
  }, [courseId, chapterId, fetchQuiz]);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (!quiz) return;

    if (Object.keys(answers).length !== quiz.questions.length) {
      toast.warn("Please answer all questions before submitting");
      return;
    }

    let calculatedScore = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);
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

  if (!quiz) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
          <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white/90 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <p className="text-slate-600">No quiz available for this chapter.</p>
            <button
              onClick={() => router.push(`/player/${courseId}`)}
              className="mt-5 rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white cursor-pointer"
            >
              Back to Course
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 50;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-10 md:px-8">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute right-10 top-24 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl space-y-6">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-3xl border border-[#7F265B]/10 bg-white/90 p-6 shadow-sm backdrop-blur-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7F265B]">
              Chapter Assessment
            </span>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">
              {quiz.title}
            </h1>
            <p className="mt-2 text-xs text-slate-500">
              Answer all {total} questions to test your understanding of this chapter.
            </p>
          </motion.div>

          {/* Results banner if submitted */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-3xl border p-6 text-center shadow-md ${
                  passed
                    ? "border-emerald-200 bg-emerald-50/90 text-emerald-900"
                    : "border-amber-200 bg-amber-50/90 text-amber-900"
                }`}
              >
                <span className="text-4xl">{passed ? "🎉" : "📚"}</span>
                <h2 className="mt-2 text-2xl font-bold">
                  {passed ? "Congratulations! You Passed!" : "Keep Practicing!"}
                </h2>
                <p className="mt-1 text-sm font-semibold">
                  You scored {score} out of {total} ({percentage}%)
                </p>

                <div className="mt-5 flex justify-center gap-3">
                  <button
                    onClick={() => router.push(`/player/${courseId}`)}
                    className="rounded-full bg-[#7F265B] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#6d214f] cursor-pointer"
                  >
                    Back to Player
                  </button>
                  <button
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                      setScore(0);
                    }}
                    className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Questions list */}
          <div className="space-y-6">
            {quiz.questions.map((q, qIndex) => (
              <motion.div
                key={qIndex}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ delay: qIndex * 0.05 }}
                className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#7F265B]/10 text-xs font-bold text-[#7F265B]">
                    {qIndex + 1}
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">
                    {q.question}
                  </h3>
                </div>

                <div className="mt-4 grid gap-2.5">
                  {q.options.map((option, optIndex) => {
                    const isSelected = answers[qIndex] === optIndex;
                    let optionStyle =
                      "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-[#7F265B]/30 hover:bg-[#7F265B]/5";

                    if (submitted) {
                      if (optIndex === q.answer) {
                        optionStyle =
                          "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                      } else if (isSelected && optIndex !== q.answer) {
                        optionStyle =
                          "border-red-500 bg-red-50 text-red-900 font-semibold";
                      }
                    } else if (isSelected) {
                      optionStyle =
                        "border-[#7F265B] bg-[#7F265B]/10 text-[#7F265B] font-semibold";
                    }

                    return (
                      <button
                        key={optIndex}
                        disabled={submitted}
                        onClick={() => handleSelect(qIndex, optIndex)}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200 ${optionStyle} ${
                          !submitted ? "cursor-pointer" : ""
                        }`}
                      >
                        <span>{option}</span>
                        {submitted && optIndex === q.answer && (
                          <span className="text-emerald-600 font-bold">✓</span>
                        )}
                        {submitted && isSelected && optIndex !== q.answer && (
                          <span className="text-red-600 font-bold">✕</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Submit Action */}
          {!submitted && (
            <div className="pt-4 text-center">
              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-[#7F265B] py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#6d214f] cursor-pointer"
              >
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
