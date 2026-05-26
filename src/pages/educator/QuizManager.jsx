import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const QuizManager = () => {
  const { backendUrl, getToken } = useContext(AppContext);

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      answer: 0,
    },
  ]);

  const fetchCourses = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        backendUrl + "/api/course/educator-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      if (!selectedCourse) return;

      try {
        const token = await getToken();

        const { data } = await axios.get(
          backendUrl + `/api/course/${selectedCourse}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setChapters(data.course.courseContent || []);
        }
      } catch (err) {
        toast.error("Failed to load chapters");
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

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIndex, optIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === optIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const removeQuestion = (qIndex) => {
    if (questions.length === 1) {
      toast.error("At least one question is required");
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const submitQuiz = async () => {
    try {
      if (!selectedCourse) return toast.error("Please select a course");
      if (!selectedChapter) return toast.error("Please select a chapter");
      if (!title.trim()) return toast.error("Please enter quiz title");

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/quiz/create",
        {
          courseId: selectedCourse,
          chapterId: selectedChapter,
          title,
          questions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success("Quiz created successfully");
        setTitle("");
        setSelectedChapter("");
        setQuestions([{ question: "", options: ["", "", "", ""], answer: 0 }]);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="mb-3 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Quiz Builder
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Quiz Manager
          </h2>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Create chapter-based quizzes for your courses with a clean and
            structured workflow.
          </p>
        </motion.div>

        {/* Top Form */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Course
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedChapter("");
                }}
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.courseTitle}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Select Chapter
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                value={selectedChapter}
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                <option value="">Select Chapter</option>
                {chapters.map((ch, index) => (
                  <option key={ch.chapterId || index} value={ch.chapterId}>
                    {ch.chapterTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Quiz Title
            </label>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
              placeholder="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Questions */}
        <div className="space-y-5">
          {questions.map((q, qIndex) => (
            <motion.div
              key={qIndex}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: qIndex * 0.04 + 0.08 }}
              className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7F265B]/70">
                    Question {qIndex + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">
                    Quiz Question
                  </h3>
                </div>

                <button
                  onClick={() => removeQuestion(qIndex)}
                  className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  placeholder="Question"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(qIndex, "question", e.target.value)
                  }
                />

                <div className="grid gap-4 md:grid-cols-2">
                  {q.options.map((opt, optIndex) => (
                    <div key={optIndex}>
                      <label className="mb-2 block text-sm font-medium text-slate-600">
                        Option {optIndex + 1}
                      </label>
                      <input
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                        placeholder={`Option ${optIndex + 1}`}
                        value={opt}
                        onChange={(e) =>
                          updateOption(qIndex, optIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Correct Answer
                  </label>
                  <select
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                    value={q.answer}
                    onChange={(e) =>
                      updateQuestion(qIndex, "answer", Number(e.target.value))
                    }
                  >
                    <option value={0}>Correct Answer: Option 1</option>
                    <option value={1}>Correct Answer: Option 2</option>
                    <option value={2}>Correct Answer: Option 3</option>
                    <option value={3}>Correct Answer: Option 4</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.12 }}
          className="flex flex-wrap gap-3"
        >
          <button
            onClick={addQuestion}
            className="rounded-full bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(51,65,85,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-slate-600"
          >
            Add Question
          </button>

          <button
            onClick={submitQuiz}
            className="rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
          >
            Create Quiz
          </button>

          <Link to="/">
            <button className="rounded-full border border-[#7F265B]/15 bg-white px-6 py-3 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7F265B]/5">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizManager;