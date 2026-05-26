import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Quiz = () => {
  const { courseId, chapterId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const fetchQuiz = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        `${backendUrl}/api/quiz/${courseId}/${chapterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setQuiz(data.quiz);
      } else {
        toast.error(data.message);
        navigate(`/player/${courseId}`);
      }
    } catch (err) {
      toast.error("Failed to load quiz");
      navigate(`/player/${courseId}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId && chapterId) {
      fetchQuiz();
    } else {
      toast.error("Course or chapter ID missing");
      navigate(`/player/${courseId}`);
    }
  }, [courseId, chapterId]);

  const handleSelect = (qIndex, optionIndex) => {
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

  if (loading) return <Loading />;

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-slate-200 bg-white/90 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          <p className="text-slate-600">No quiz available for this chapter.</p>

          <button
            onClick={() => navigate(`/player/${courseId}`)}
            className="mt-5 rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 50;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-10 md:px-8">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-[30px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Chapter Quiz
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {quiz.title}
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Answer all questions carefully and submit your quiz.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Total Questions: <span className="font-semibold">{total}</span>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              Answered:{" "}
              <span className="font-semibold">
                {Object.keys(answers).length}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-5">
          {quiz.questions.map((q, qIndex) => (
            <motion.div
              key={qIndex}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: qIndex * 0.04 }}
              className="rounded-[28px] border border-[#7F265B]/10 bg-white/95 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7F265B]/70">
                  Question {qIndex + 1}
                </p>

                <p className="mt-2 text-lg font-semibold leading-8 text-slate-900">
                  {q.question}
                </p>
              </div>

              <div className="space-y-3">
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[qIndex] === optIndex;
                  const isCorrect = submitted && q.answer === optIndex;
                  const isWrongSelected =
                    submitted && isSelected && q.answer !== optIndex;

                  return (
                    <label
                      key={optIndex}
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-300 ${
                        isCorrect
                          ? "border-emerald-300 bg-emerald-50"
                          : isWrongSelected
                          ? "border-red-300 bg-red-50"
                          : isSelected
                          ? "border-[#7F265B]/30 bg-[#7F265B]/5"
                          : "border-slate-200 bg-white hover:border-[#7F265B]/20 hover:bg-[#7F265B]/4"
                      } ${submitted ? "cursor-default" : ""}`}
                    >
                      <input
                        type="radio"
                        name={`q-${qIndex}`}
                        checked={isSelected}
                        onChange={() => handleSelect(qIndex, optIndex)}
                        disabled={submitted}
                        className="h-4 w-4 accent-[#7F265B]"
                      />

                      <span className="text-sm font-medium text-slate-700 md:text-base">
                        {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="rounded-[28px] border border-[#7F265B]/10 bg-white/95 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <button
                onClick={handleSubmit}
                className="w-full rounded-full bg-[#7F265B] py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
              >
                Submit Quiz
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              className="rounded-[30px] border border-[#7F265B]/10 bg-white/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-medium text-[#7F265B]">
                    Quiz Result
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {passed ? "Passed 🎉" : "Try Again 📘"}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Score: <span className="font-semibold">{score}</span> /{" "}
                    {total}
                  </p>

                  <p className="mt-1 text-slate-600">
                    Percentage:{" "}
                    <span className="font-semibold">{percentage}%</span>
                  </p>

                  <p
                    className={`mt-3 text-sm font-semibold ${
                      passed ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {passed
                      ? "Great job! You completed this chapter quiz successfully."
                      : "Keep practicing this chapter and try again."}
                  </p>
                </div>

                <div className="flex flex-col gap-3 md:min-w-[220px]">
                  <button
                    onClick={() => navigate(`/player/${courseId}`)}
                    className="rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
                  >
                    Back to Course
                  </button>

                  <button
                    onClick={() => {
                      setAnswers({});
                      setSubmitted(false);
                      setScore(0);
                    }}
                    className="rounded-full border border-[#7F265B]/15 bg-white px-6 py-3 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7F265B]/5"
                  >
                    Retry Quiz
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;