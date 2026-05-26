import { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const Player = () => {
  const {
    enrolledCourses,
    calculateChapterTime,
    backendUrl,
    getToken,
    userData,
    fetchUserEnrolledCourses,
  } = useContext(AppContext);

  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);

  // const [quiz, setQuiz] = useState(null);
  // const [quizUnlocked, setQuizUnlocked] = useState(false);

  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // const fetchQuiz = async () => {
  //   try {
  //     const token = await getToken();

  //     const { data } = await axios.get(backendUrl + `/api/quiz/${courseId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     if (data.success) {
  //       setQuiz(data.quiz);
  //       setQuizUnlocked(true);
  //     } else {
  //       setQuizUnlocked(false);
  //     }
  //   } catch (err) {
  //     setQuizUnlocked(false);
  //   }
  // };

  // useEffect(() => {
  //   if (progressData && courseData) {
  //     const totalLectures = courseData.courseContent.reduce(
  //       (sum, ch) => sum + ch.chapterContent.length,
  //       0
  //     );

  //     const completed = progressData.lectureCompleted.length;

  //     if (completed === totalLectures) {
  //       fetchQuiz();
  //     }
  //   }
  // }, [progressData, courseData]);

  const fetchChapterQuiz = async (chapterId) => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        `${backendUrl}/api/quiz/${courseId}/${chapterId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        return data.quiz;
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const showChapterQuizPopup = (quizData, chapterId) => {
    Swal.fire({
      title: "Chapter Completed!",
      html: `
      <div style="text-align:center">
        <p style="font-size:15px;color:#475569;margin-top:6px">
          Complete the quiz for better practice.
        </p>
        <p style="font-size:14px;color:#7F265B;font-weight:600;margin-top:10px">
          ${quizData?.title || "Chapter Quiz"}
        </p>
      </div>
    `,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Start Quiz",
      cancelButtonText: "Later",
      confirmButtonColor: "#7F265B",
      cancelButtonColor: "#64748b",
      background: "#ffffff",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/quiz/${courseId}/${chapterId}`);
      }
    });
  };

  const getCourseData = () => {
    enrolledCourses.forEach((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings?.forEach((item) => {
          if (item.userId === userData?._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses, courseId, userData]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      if (!courseData) return;

      const alreadyCompleted =
        progressData?.lectureCompleted?.includes(lectureId);

      if (alreadyCompleted) {
        toast.info("This lecture is already completed");
        return;
      }

      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message || "Lecture completed");

        const previousCompleted = progressData?.lectureCompleted || [];

        const updatedCompleted = [
          ...new Set([...previousCompleted, lectureId]),
        ];

        setProgressData((prev) => ({
          ...(prev || {}),
          lectureCompleted: updatedCompleted,
        }));

        const currentChapter = courseData.courseContent.find((chapter) =>
          chapter.chapterContent.some(
            (lecture) => lecture.lectureId === lectureId,
          ),
        );

        if (!currentChapter) {
          getCourseProgress();
          return;
        }

        const isChapterCompleted = currentChapter.chapterContent.every(
          (lecture) => updatedCompleted.includes(lecture.lectureId),
        );

        if (isChapterCompleted) {
          const quizData = await fetchChapterQuiz(currentChapter.chapterId);

          if (quizData) {
            showChapterQuizPopup(quizData, currentChapter.chapterId);
          } else {
            toast.info(
              "Chapter completed, but quiz has not been created for this chapter yet.",
            );
          }
        }

        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update lecture progress");
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/get-course-progress",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        backendUrl + "/api/user/add-rating",
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        fetchUserEnrolledCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCourseProgress();
  }, []);

 const getFirstLecture = () => {
  if (!courseData) return null;

  for (let i = 0; i < courseData.courseContent.length; i++) {
    const chapter = courseData.courseContent[i];

    if (chapter.chapterContent && chapter.chapterContent.length > 0) {
      const lecture = chapter.chapterContent[0];

      return {
        ...lecture,
        chapter: i + 1,
        lecture: 1,
        chapterId: chapter.chapterId,
        chapterTitle: chapter.chapterTitle,
      };
    }
  }

  return null;
};

  const handleThumbnailClick = () => {
    const first = getFirstLecture();
    if (first) {
      setPlayerData(first);
    } else {
      toast.info("No lectures available to play.");
    }
  };

  useEffect(() => {
    if (playerData) {
      setIsLoadingVideo(true);
      setIsPlaying(false);
    } else {
      setIsLoadingVideo(false);
      setIsPlaying(false);
    }
  }, [playerData]);

  const onPlayerReady = (event) => {
    try {
      event.target.playVideo();
    } catch (e) {}
  };

  const onPlayerStateChange = (event) => {
    const state = event.data;
    if (state === 1) {
      setIsPlaying(true);
      setIsLoadingVideo(false);
    } else if (state === 3) {
      setIsLoadingVideo(true);
    } else if (state === 0 || state === 2 || state === -1) {
      setIsPlaying(false);
      setIsLoadingVideo(false);
    }
  };

  const youtubeOpts = {
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const totalLectures = courseData
    ? courseData.courseContent.reduce(
        (sum, chapter) => sum + chapter.chapterContent.length,
        0,
      )
    : 0;

  const completedLectures = progressData?.lectureCompleted?.length || 0;
  const progressPercent =
    totalLectures > 0 ? (completedLectures * 100) / totalLectures : 0;

  return courseData ? (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-[35%] h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute right-10 top-[20%] h-48 w-48 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 lg:px-16 xl:px-24">
          <div className="mb-8">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <div className="mb-4 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
                Learning Dashboard
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Continue Your Course
              </h1>
              <p className="mt-2 text-sm text-slate-500 md:text-base">
                Follow your course structure, watch lectures, track progress,
                and unlock your final quiz.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* LEFT SIDE */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="space-y-6"
            >
              {/* Course progress card */}
              <div className="rounded-[30px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Now Learning</p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                      {courseData.courseTitle}
                    </h2>
                  </div>

                  <div className="rounded-2xl bg-[#7F265B]/8 px-4 py-2 text-sm font-medium text-[#7F265B]">
                    {completedLectures} / {totalLectures} Lectures Completed
                  </div>
                </div>

                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#7F265B] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Course structure */}
              <div className="rounded-[30px] border border-[#7F265B]/10 bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Course Structure
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Expand chapters and continue learning at your pace
                    </p>
                  </div>

                  <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-medium text-[#7F265B]">
                    {courseData.courseContent.length} Chapters
                  </span>
                </div>

                <div className="space-y-4">
                  {courseData.courseContent.map((chapter, index) => (
                    <motion.div
                      key={index}
                      layout
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-[#7F265B]/15 hover:shadow-[0_18px_40px_rgba(127,38,91,0.08)]"
                    >
                      {/* Chapter Header */}
                      <button
                        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-[#7F265B]/5"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className={`w-4 transition-transform duration-300 ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                            src={assets.down_arrow_icon}
                            alt="toggle"
                          />

                          <div>
                            <p className="text-sm text-slate-400">
                              Chapter {index + 1}
                            </p>
                            <p className="font-semibold text-slate-800">
                              {chapter.chapterTitle}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500">
                          {chapter.chapterContent.length} lectures ·{" "}
                          {calculateChapterTime(chapter)}
                        </p>
                      </button>

                      {/* Lectures */}
                      <AnimatePresence initial={false}>
                        {openSections[index] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden border-t border-slate-100 bg-slate-50/80"
                          >
                            <div className="space-y-3 px-5 py-4">
                              {chapter.chapterContent.map((lecture, i) => {
                                const isDone =
                                  progressData &&
                                  progressData.lectureCompleted.includes(
                                    lecture.lectureId,
                                  );

                                return (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition-all duration-300 hover:border-[#7F265B]/20 hover:bg-[#7F265B]/5"
                                  >
                                    <div className="flex min-w-0 items-center gap-3">
                                      <img
                                        onClick={() =>
                                          setPlayerData({
                                            ...lecture,
                                            chapter: index + 1,
                                            lecture: i + 1,
                                            chapterId: chapter.chapterId,
                                            chapterTitle: chapter.chapterTitle,
                                          })
                                        }
                                        className={`h-4 w-4 ${
                                          lecture.lectureUrl
                                            ? "cursor-pointer"
                                            : "opacity-40"
                                        }`}
                                        src={
                                          isDone
                                            ? assets.blue_tick_icon
                                            : assets.play_icon
                                        }
                                        alt="lecture icon"
                                      />

                                      <p className="truncate text-sm text-slate-700">
                                        {lecture.lectureTitle}
                                      </p>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-3 text-xs text-slate-500">
                                      {lecture.lectureUrl && (
                                        <span
                                          onClick={() =>
                                            setPlayerData({
                                              ...lecture,
                                              chapter: index + 1,
                                              lecture: i + 1,
                                            })
                                          }
                                          className="cursor-pointer rounded-full bg-[#7F265B]/10 px-2.5 py-1 font-medium text-[#7F265B] hover:bg-[#7F265B]/15"
                                        >
                                          Watch
                                        </span>
                                      )}

                                      <span>
                                        {humanizeDuration(
                                          lecture.lectureDuration * 60 * 1000,
                                          { units: ["h", "m"] },
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Rating + actions */}
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Rate this Course
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Share your learning experience
                  </p>
                  <div className="mt-4">
                    <Rating initialRating={initialRating} onRate={handleRate} />
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Learning Resources
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Stay connected and explore the roadmap
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        window.open("https://discord.gg/PFQvSaHwwy", "_blank")
                      }
                      className="rounded-full bg-[#7F265B] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(127,38,91,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
                    >
                      Join Discord
                    </button>

                    <Link
                      to="/course-outline/mern"
                      className="rounded-full border border-[#7F265B]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#7F265B]/5"
                    >
                      Explore Outline
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.08 }}
              className="space-y-4 lg:sticky lg:top-24"
            >
              {/* Video / thumbnail */}
              <div className="overflow-hidden rounded-[30px] border border-[#7F265B]/10 bg-white/95 shadow-[0_25px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl">
                {playerData ? (
                  <div className="relative">
                    {isLoadingVideo && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                        <Loading />
                      </div>
                    )}

                    <YouTube
                      videoId={playerData.lectureUrl.split("/").pop()}
                      iframeClassName="w-full aspect-video"
                      opts={youtubeOpts}
                      onReady={onPlayerReady}
                      onStateChange={onPlayerStateChange}
                    />
                  </div>
                ) : (
                  <div
                    className="group relative cursor-pointer"
                    onClick={handleThumbnailClick}
                  >
                    <img
                      src={courseData?.courseThumbnail}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={courseData?.courseTitle}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#7F265B] shadow-lg transition-all duration-300 group-hover:scale-105">
                        <img
                          src={assets.play_icon}
                          className="h-6 w-6"
                          alt="play"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Video footer */}
                {playerData && (
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 p-5">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">
                        Chapter {playerData.chapter} • Lecture{" "}
                        {playerData.lecture}
                      </p>
                      <p className="truncate text-sm font-medium text-slate-800">
                        {playerData.lectureTitle}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        markLectureAsCompleted(playerData.lectureId)
                      }
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        progressData &&
                        progressData.lectureCompleted.includes(
                          playerData.lectureId,
                        )
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-[#7F265B] text-white hover:bg-[#6d214f]"
                      }`}
                    >
                      {progressData &&
                      progressData.lectureCompleted.includes(
                        playerData.lectureId,
                      )
                        ? "Completed"
                        : "Mark Complete"}
                    </button>
                  </div>
                )}

               
              </div>

              {/* Quick overview */}
              <div className="rounded-[28px] border border-[#7F265B]/10 bg-white/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-slate-900">
                  Course Overview
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <p className="text-xs text-slate-400">Chapters</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {courseData.courseContent.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                    <p className="text-xs text-slate-400">Lectures</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {totalLectures}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Player;
