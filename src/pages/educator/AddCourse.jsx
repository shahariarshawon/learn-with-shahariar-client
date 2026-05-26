import React, { useContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import Quill from "quill";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Logger from "../../components/Logger";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const AddCourse = () => {
  const { backendUrl, getToken } = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: nanoid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
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
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: nanoid(),
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!image) {
        toast.error("Thumbnail Not Selected");
        return;
      }

      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      formData.append("image", image);

      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/educator/add-course",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="relative mx-auto max-w-5xl"
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-8"
        >
          <div className="block sm:hidden mb-5">
            <Logger />
          </div>

          <div className="mb-8">
            <div className="mb-3 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
              Educator Panel
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Create New Course
            </h1>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Fill in the details below to publish your course professionally.
            </p>
          </div>

          <div className="space-y-7">
            <motion.div variants={fadeUp}>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Title
              </label>
              <input
                onChange={(e) => setCourseTitle(e.target.value)}
                value={courseTitle}
                type="text"
                placeholder="e.g. MERN Stack Full Course"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                required
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Course Description
              </label>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div ref={editorRef} className="min-h-[180px]" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid gap-6 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Price
                </label>
                <input
                  onChange={(e) => setCoursePrice(e.target.value)}
                  value={coursePrice}
                  type="number"
                  placeholder="0"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Thumbnail
                </label>
                <label
                  htmlFor="thumbnailImage"
                  className="group flex min-h-[58px] cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 transition-all duration-300 hover:border-[#7F265B]/35 hover:bg-[#7F265B]/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F265B]/10 transition-transform duration-300 group-hover:scale-105">
                    <img src={assets.file_upload_icon} className="w-5" alt="" />
                  </div>
                  <span className="text-sm text-slate-500">
                    Click to upload image
                  </span>
                  <input
                    type="file"
                    id="thumbnailImage"
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>

                {image && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
                    <img
                      src={URL.createObjectURL(image)}
                      className="h-24 rounded-xl object-cover"
                      alt="thumbnail preview"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Discount (%)
              </label>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                type="number"
                min={0}
                max={100}
                className="w-36 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                required
              />
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Course Content
                </h2>
                <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-medium text-[#7F265B]">
                  {chapters.length} Chapters
                </span>
              </div>

              <AnimatePresence>
                {chapters.map((chapter, chapterIndex) => (
                  <motion.div
                    key={chapter.chapterId}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 md:px-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleChapter("toggle", chapter.chapterId)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7F265B]/8 transition hover:bg-[#7F265B]/12"
                        >
                          <img
                            className={`w-4 transition-transform duration-300 ${
                              chapter.collapsed ? "-rotate-90" : ""
                            }`}
                            src={assets.dropdown_icon}
                            alt=""
                          />
                        </button>

                        <div>
                          <p className="text-sm text-slate-400">
                            Chapter {chapterIndex + 1}
                          </p>
                          <span className="font-semibold text-slate-800">
                            {chapter.chapterTitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500">
                          {chapter.chapterContent.length} lectures
                        </span>
                        <button
                          type="button"
                          onClick={() => handleChapter("remove", chapter.chapterId)}
                          className="rounded-lg p-1 transition hover:bg-red-50"
                        >
                          <img src={assets.cross_icon} className="w-4" alt="" />
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {!chapter.collapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 p-4 md:p-5">
                            {chapter.chapterContent.map((lecture, lectureIndex) => (
                              <div
                                key={lecture.lectureId || lectureIndex}
                                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 transition-all duration-300 hover:border-[#7F265B]/20 hover:bg-[#7F265B]/5"
                              >
                                <span className="truncate text-sm text-slate-700">
                                  {lectureIndex + 1}. {lecture.lectureTitle}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleLecture(
                                      "remove",
                                      chapter.chapterId,
                                      lectureIndex
                                    )
                                  }
                                  className="rounded-lg p-1 transition hover:bg-red-50"
                                >
                                  <img
                                    src={assets.cross_icon}
                                    className="w-4"
                                    alt=""
                                  />
                                </button>
                              </div>
                            ))}

                            <button
                              type="button"
                              onClick={() => handleLecture("add", chapter.chapterId)}
                              className="inline-flex items-center rounded-full bg-[#7F265B]/8 px-4 py-2 text-sm font-medium text-[#7F265B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7F265B]/12"
                            >
                              + Add Lecture
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => handleChapter("add")}
                className="w-full rounded-3xl border-2 border-dashed border-slate-300 bg-white py-4 text-slate-600 transition-all duration-300 hover:border-[#7F265B]/35 hover:bg-[#7F265B]/5 hover:text-[#7F265B]"
              >
                + Add Chapter
              </button>
            </motion.div>

            <motion.button
              variants={fadeUp}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-full bg-[#7F265B] py-4 font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:bg-[#6d214f]"
            >
              Publish Course
            </motion.button>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md rounded-[28px] border border-[#7F265B]/10 bg-white p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setShowPopup(false)}
                className="absolute right-4 top-4 rounded-lg p-1 transition hover:bg-slate-100"
              >
                <img src={assets.cross_icon} className="w-4" alt="" />
              </button>

              <h2 className="text-xl font-semibold text-slate-900">
                Add Lecture
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill in the lecture details below.
              </p>

              <div className="mt-5 space-y-4">
                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={lectureDetails.lectureTitle}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureTitle: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                />

                <input
                  type="number"
                  placeholder="Duration (mins)"
                  value={lectureDetails.lectureDuration}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureDuration: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                />

                <input
                  type="text"
                  placeholder="Lecture URL"
                  value={lectureDetails.lectureUrl}
                  onChange={(e) =>
                    setLectureDetails({
                      ...lectureDetails,
                      lectureUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition-all duration-300 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                />

                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-[#7F265B]"
                  />
                  Free Preview
                </label>

                <button
                  type="button"
                  onClick={addLecture}
                  className="w-full rounded-full bg-[#7F265B] py-3 font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.20)] transition-all duration-300 hover:bg-[#6d214f]"
                >
                  Add Lecture
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddCourse;