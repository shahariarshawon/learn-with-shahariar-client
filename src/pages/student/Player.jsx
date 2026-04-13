import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/student/Loading";

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
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  // quiz usestate
  const [quiz, setQuiz] = useState(null);
  const [quizUnlocked, setQuizUnlocked] = useState(false);
  // New states to manage YouTube loading/playing
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();
  // quiz fetching function
  const fetchQuiz = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + `/api/quiz/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setQuiz(data.quiz);
        setQuizUnlocked(true);
      } else {
        setQuizUnlocked(false);
      }
    } catch (err) {
      setQuizUnlocked(false);
    }
  };

  useEffect(() => {
    if (progressData && courseData) {
      const totalLectures = courseData.courseContent.reduce(
        (sum, ch) => sum + ch.chapterContent.length,
        0,
      );

      const completed = progressData.lectureCompleted.length;

      if (completed === totalLectures) {
        fetchQuiz();
      }
    }
  }, [progressData, courseData]);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings.map((item) => {
          if (item.userId === userData._id) {
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
  }, [enrolledCourses]);

  const markLectureAsCompleted = async (lectureId) => {
    try {
      const token = await getToken();
      const { data } = await axios.post(
        backendUrl + "/api/user/update-course-progress",
        { courseId, lectureId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
        // don't show toast here every time if noisy
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

  // Helper: get first lecture object (if exists)
  const getFirstLecture = () => {
    if (!courseData) return null;
    for (let i = 0; i < courseData.courseContent.length; i++) {
      const chapter = courseData.courseContent[i];
      if (chapter.chapterContent && chapter.chapterContent.length > 0) {
        const lecture = chapter.chapterContent[0];
        // attach chapter/lecture numbers in same shape you use elsewhere
        return { ...lecture, chapter: i + 1, lecture: 1 };
      }
    }
    return null;
  };

  // When user clicks thumbnail/play overlay, open first lecture
  const handleThumbnailClick = () => {
    const first = getFirstLecture();
    if (first) {
      setPlayerData(first);
    } else {
      toast.info("No lectures available to play.");
    }
  };

  // Reset loading/playing states when playerData changes
  useEffect(() => {
    if (playerData) {
      setIsLoadingVideo(true);
      setIsPlaying(false);
    } else {
      setIsLoadingVideo(false);
      setIsPlaying(false);
    }
  }, [playerData]);

  // YouTube callbacks
  const onPlayerReady = (event) => {
    // attempt to start playback (autoplay may be blocked by browser)
    try {
      event.target.playVideo();
    } catch (e) {
      // ignore
    }
  };

  const onPlayerStateChange = (event) => {
    // YouTube player states: -1 unstarted, 0 ended, 1 playing, 2 paused, 3 buffering
    const state = event.data;
    if (state === 1) {
      // playing
      setIsPlaying(true);
      setIsLoadingVideo(false);
    } else if (state === 3) {
      // buffering
      setIsLoadingVideo(true);
    } else if (state === 0 || state === 2 || state === -1) {
      // ended / paused / unstarted - hide loading but mark playing false
      setIsPlaying(false);
      setIsLoadingVideo(false);
    }
  };

  const youtubeOpts = {
    width: "100%",
    playerVars: {
      autoplay: 1, // ask to autoplay
    },
  };

  return courseData ? (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10">
          <div className="grid md:grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Course Structure
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Expand chapters and start learning
                </p>
              </div>

              {/* Chapters */}
              <div className="space-y-3">
                {courseData &&
                  courseData.courseContent.map((chapter, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
                    >
                      {/* Chapter Header */}
                      <div
                        className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => toggleSection(index)}
                      >
                        <div className="flex items-center gap-2">
                          <img
                            className={`w-4 transition-transform ${
                              openSections[index] ? "rotate-180" : ""
                            }`}
                            src={assets.down_arrow_icon}
                          />

                          <p className="font-medium text-gray-800">
                            {chapter.chapterTitle}
                          </p>
                        </div>

                        <p className="text-xs text-gray-500">
                          {chapter.chapterContent.length} lectures ·{" "}
                          {calculateChapterTime(chapter)}
                        </p>
                      </div>

                      {/* Lectures */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openSections[index]
                            ? "max-h-[600px] border-t"
                            : "max-h-0"
                        }`}
                      >
                        <div className="bg-gray-50 px-5 py-3 space-y-2">
                          {chapter.chapterContent.map((lecture, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between py-2"
                            >
                              {/* Left */}
                              <div className="flex items-center gap-3">
                                <img
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className={`w-4 h-4 ${
                                    lecture.lectureUrl
                                      ? "cursor-pointer"
                                      : "opacity-40"
                                  }`}
                                  src={
                                    progressData &&
                                    progressData.lectureCompleted.includes(
                                      lecture.lectureId,
                                    )
                                      ? assets.blue_tick_icon
                                      : assets.play_icon
                                  }
                                />

                                <p className="text-sm text-gray-700">
                                  {lecture.lectureTitle}
                                </p>
                              </div>

                              {/* Right */}
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                {lecture.lectureUrl && (
                                  <span
                                    onClick={() =>
                                      setPlayerData({
                                        ...lecture,
                                        chapter: index + 1,
                                        lecture: i + 1,
                                      })
                                    }
                                    className="text-blue-500 cursor-pointer hover:underline"
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
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Rating */}
              <div className="pt-6 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Rate this Course
                </h3>
                <Rating initialRating={initialRating} onRate={handleRate} />
              </div>
            </div>

            {/* RIGHT SIDE */}
            {/* RIGHT SIDE */}
            <div className="md:sticky md:top-20 space-y-4">
              {/* Video / Thumbnail Card */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {playerData ? (
                  <div className="relative">
                    {isLoadingVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
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
                    className="relative cursor-pointer"
                    onClick={handleThumbnailClick}
                  >
                    <img
                      src={courseData?.courseThumbnail}
                      className="w-full aspect-video object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-105 transition">
                        <img src={assets.play_icon} className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Footer */}
                {playerData && (
                  <div className="p-4 flex items-center justify-between">
                    <p className="text-sm text-gray-800">
                      {playerData.chapter}.{playerData.lecture}{" "}
                      {playerData.lectureTitle}
                    </p>

                    <button
                      onClick={() =>
                        markLectureAsCompleted(playerData.lectureId)
                      }
                      className="text-sm text-blue-600 hover:underline"
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

                {/* QUIZ SECTION (CORRECT PLACE) */}
                {quizUnlocked && quiz && (
                  <div className="border-t border-gray-100 p-4 bg-green-50">
                    <p className="text-sm font-semibold text-green-700">
                      🎉 Quiz Unlocked: {quiz.title}
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      You have completed all lectures in this course
                    </p>

                    <button
                      onClick={() => navigate(`/quiz/${courseId}`)}
                      className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                    >
                      Start Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
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
