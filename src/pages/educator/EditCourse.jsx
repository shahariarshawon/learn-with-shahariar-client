import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const EditCourse = () => {
  const { courseId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);

  const [course, setCourse] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [lecture, setLecture] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    lectureOrder: "",
    isPreviewFree: true,
  });

  const fetchCourse = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/api/course/${courseId}`);
      if (data.success) {
        setCourse(data.courseData);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const addChapter = async () => {
    console.log("add chapter btn clicked");
    if (!chapterTitle) return toast.error("Enter chapter title");

    try {
      const token = await getToken();

      const updatedContent = [
        ...course.courseContent,
        {
          chapterId: Date.now().toString(),
          chapterTitle,
          chapterOrder: course.courseContent.length + 1,
          chapterContent: [],
        },
      ];

      const { data } = await axios.put(
        backendUrl + `/api/course/update/${courseId}`,
        { courseContent: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Chapter added");
        setChapterTitle("");
        fetchCourse();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const addLecture = async () => {
    if (!selectedChapter) return toast.error("Select chapter");

    try {
      const token = await getToken();
      const updatedContent = [...course.courseContent];

      const index = updatedContent.findIndex(
        (ch) => ch.chapterId === selectedChapter,
      );

      if (index === -1) return toast.error("Chapter not found");

      updatedContent[index].chapterContent.push({
        ...lecture,
        lectureId: Date.now().toString(),
      });

      const { data } = await axios.put(
        backendUrl + `/api/course/update/${courseId}`,
        { courseContent: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Lecture added");
        setLecture({
          lectureTitle: "",
          lectureDuration: "",
          lectureUrl: "",
          lectureOrder: "",
          isPreviewFree: true,
        });
        fetchCourse();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-6">
        <div className="rounded-3xl border border-[#7F265B]/10 bg-white/80 px-8 py-6 text-slate-600 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
          Loading course...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-8 md:px-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-3"
        >
          <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Course Management
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Edit Course
          </h1>

          <p className="text-sm text-slate-500 md:text-base">
            Update course content, add chapters, and manage lectures with a
            cleaner workflow.
          </p>
        </motion.div>

        {/* Course Info */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.05 }}
          className="rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-[#7F265B]">Course Title</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {course.courseTitle}
              </h2>
            </div>

            <div className="rounded-2xl bg-[#7F265B]/6 px-4 py-2 text-sm text-[#7F265B]">
              {course.courseContent?.length || 0} Chapters
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-sm leading-7 text-slate-600">
              {typeof course.courseDescription === "string"
                ? course.courseDescription.replace(/<[^>]*>/g, "")
                : "No description available."}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_1.2fr]">
          {/* Left column */}
          <div className="space-y-8">
            {/* Add Chapter */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Add Chapter
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Create a new chapter and append it to this course.
              </p>

              <div className="mt-5 space-y-4">
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  placeholder="Chapter Title"
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                />

                <button
                  onClick={addChapter}
                  className="inline-flex rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
                >
                  Add Chapter
                </button>
              </div>
            </motion.div>

            {/* Add Lecture */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                Add Lecture
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Choose a chapter and add a new lecture to it.
              </p>

              <div className="mt-5 space-y-4">
                <select
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(e.target.value)}
                >
                  <option value="">Select Chapter</option>
                  {course.courseContent.map((ch) => (
                    <option key={ch.chapterId} value={ch.chapterId}>
                      {ch.chapterTitle}
                    </option>
                  ))}
                </select>

                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  placeholder="Lecture Title"
                  value={lecture.lectureTitle}
                  onChange={(e) =>
                    setLecture({ ...lecture, lectureTitle: e.target.value })
                  }
                />

                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  type="number"
                  placeholder="Duration (minutes)"
                  value={lecture.lectureDuration}
                  onChange={(e) =>
                    setLecture({
                      ...lecture,
                      lectureDuration: Number(e.target.value),
                    })
                  }
                />

                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  placeholder="YouTube URL"
                  value={lecture.lectureUrl}
                  onChange={(e) =>
                    setLecture({ ...lecture, lectureUrl: e.target.value })
                  }
                />

                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  type="number"
                  placeholder="Lecture Order"
                  value={lecture.lectureOrder}
                  onChange={(e) =>
                    setLecture({
                      ...lecture,
                      lectureOrder: Number(e.target.value),
                    })
                  }
                />

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={lecture.isPreviewFree}
                    onChange={(e) =>
                      setLecture({
                        ...lecture,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#7F265B]"
                  />
                  Preview Free
                </label>

                <button
                  onClick={addLecture}
                  className="inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500"
                >
                  Add Lecture
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">
                  Course Structure
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  View the current chapter and lecture organization.
                </p>
              </div>

              <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-medium text-[#7F265B]">
                {course.courseContent.length} Chapters
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {course.courseContent.map((ch, i) => (
                <div
                  key={ch.chapterId || i}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_18px_40px_rgba(127,38,91,0.08)]"
                >
                  <div className="border-b border-slate-100 bg-gradient-to-r from-[#7F265B]/6 to-transparent px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#7F265B]/70">
                      Chapter {i + 1}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">
                      {ch.chapterTitle}
                    </p>
                  </div>

                  <div className="px-5 py-4">
                    {ch.chapterContent.length > 0 ? (
                      <ul className="space-y-3">
                        {ch.chapterContent.map((lec, j) => (
                          <li
                            key={lec.lectureId || j}
                            className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition-all duration-300 hover:border-[#7F265B]/20 hover:bg-[#7F265B]/5"
                          >
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#7F265B]/10 text-xs font-semibold text-[#7F265B]">
                              {j + 1}
                            </span>
                            <span className="leading-6">
                              {lec.lectureTitle}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-500">
                        No lectures added yet.
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                to="/"
                className="inline-flex rounded-full border border-[#7F265B]/15 bg-white px-6 py-3 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7F265B]/5"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
