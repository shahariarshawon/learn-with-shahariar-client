import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  // Fetch Course Data
  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/course/${id}`);

      if (data.success && data.courseData) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message || "Failed to load course");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error loading course details");
    } finally {
      setLoading(false);
    }
  };

  // Check enrollment status
  useEffect(() => {
    if (userData && courseData?._id) {
      setIsAlreadyEnrolled(
        userData.enrolledCourses?.includes(courseData._id) || false,
      );
    }
  }, [userData, courseData]);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const enrollCourse = async () => {
    if (!userData) return toast.warn("Please login to enroll!");
    if (isAlreadyEnrolled) return toast.warn("Already enrolled in this course");

    try {
      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Failed to process enrollment");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  // Show loading while fetching
  if (loading) {
    return <Loading />;
  }

  // Show error if course not found
  if (!courseData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-red-600">Course Not Found</h2>
        <p className="text-gray-500 mt-4">
          The course you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return (
   <>
  <div className="relative bg-gray-50 min-h-screen">

    {/* Background */}
    <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-cyan-100/60 to-transparent -z-10" />

    <div className="flex flex-col md:flex-row gap-10 items-start justify-between md:px-36 px-6 pt-20">

      {/* LEFT SIDE */}
      <div className="max-w-3xl w-full space-y-10 text-gray-700">

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {courseData.courseTitle}
          </h1>

          <div
            className="text-sm md:text-base text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription?.slice(0, 200) || "",
            }}
          />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">

          <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">
              {calculateRating(courseData)}
            </span>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  className="w-4 h-4"
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                />
              ))}
            </div>
          </div>

          <span className="text-blue-600">
            ({courseData.courseRatings?.length || 0} ratings)
          </span>

          <span>
            {courseData.enrolledStudents?.length || 0} students
          </span>

        </div>

        {/* Educator */}
        <div className="text-sm text-gray-600">
          Course by{" "}
          <span className="text-blue-600 font-medium underline">
            {courseData.educator?.name ||
              courseData.educator?.fullName ||
              "Unknown Educator"}
          </span>
        </div>

        {/* Course Structure */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Course Structure
          </h2>

          {courseData.courseContent?.map((chapter, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >

              {/* Chapter Header */}
              <div
                onClick={() => toggleSection(index)}
                className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50 transition"
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

                <p className="text-xs md:text-sm text-gray-500">
                  {chapter.chapterContent?.length || 0} lectures ·{" "}
                  {calculateChapterTime(chapter)}
                </p>
              </div>

              {/* Lectures */}
              {openSections[index] && (
                <div className="border-t bg-gray-50 px-5 py-3 space-y-2">

                  {chapter.chapterContent?.map((lecture, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                    >

                      <div className="flex items-center gap-3">
                        <img
                          onClick={() =>
                            lecture.isPreviewFree &&
                            setPlayerData({
                              videoId: lecture.lectureUrl.split("/").pop(),
                            })
                          }
                          className={`w-4 h-4 ${
                            lecture.isPreviewFree
                              ? "cursor-pointer"
                              : "opacity-50"
                          }`}
                          src={assets.play_icon}
                        />

                        <p className="text-sm text-gray-700">
                          {lecture.lectureTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        {lecture.isPreviewFree && (
                          <span className="text-blue-500">Preview</span>
                        )}
                        <span>
                          {humanizeDuration(
                            lecture.lectureDuration * 60 * 1000,
                            { units: ["h", "m"] }
                          )}
                        </span>
                      </div>

                    </div>
                  ))}

                </div>
              )}
            </div>
          ))}
        </div>

        {/* Full Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-900">
            Course Description
          </h3>

          <div
            className="text-sm md:text-base text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription || "",
            }}
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[380px] sticky top-20">

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">

          {/* Video / Thumbnail */}
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              className="w-full object-cover"
            />
          )}

          <div className="p-6 space-y-6">

            {/* Price */}
            <div className="space-y-1">
              <p className="text-red-500 text-sm font-medium">
                Limited time offer
              </p>

              <div className="flex items-end gap-3">
                <p className="text-3xl font-bold text-gray-900">
                  {currency}{" "}
                  {(
                    courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100
                  ).toFixed(2)}
                </p>

                <p className="text-gray-400 line-through">
                  {currency} {courseData.coursePrice}
                </p>

                <p className="text-green-600 text-sm font-medium">
                  {courseData.discount}% off
                </p>
              </div>
            </div>

            {/* Button */}
            {isAlreadyEnrolled ? (
              <Link to="/my-enrollments">
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                  Go to My Enrollments
                </button>
              </Link>
            ) : (
              <button
                onClick={enrollCourse}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Enroll Now
              </button>
            )}

            {/* Features */}
            <div className="pt-2">
              <p className="font-semibold text-gray-900 mb-2">
                What you’ll get
              </p>

              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lifetime access & updates</li>
                <li>• Hands-on project-based learning</li>
                <li>• Downloadable resources</li>
                <li>• Certificate of completion</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</>
  );
};

export default CourseDetails;
