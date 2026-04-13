import { useContext, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import axios from "axios";

const MyEnrollMents = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    userData,
    fetchUserEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);
  const hasRun = useRef(false); // ✅ prevents infinite loop

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const purchaseId = searchParams.get("purchaseId");

  // ==================== FIXED: Complete Enrollment After Payment ====================
  useEffect(() => {
    if (!purchaseId || hasRun.current) return;

    hasRun.current = true;

    const completeEnrollment = async () => {
      try {
        const token = await getToken();

        const { data } = await axios.post(
          `${backendUrl}/api/user/update-course`,
          { purchaseId },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (data.success) {
          toast.success("Enrollment completed successfully!");

          await fetchUserEnrolledCourses();

          // ✅ Clean URL (important to stop re-trigger)
          navigate("/my-enrollments", { replace: true });
        } else {
          toast.error(data.message || "Failed to complete enrollment");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to update enrollment");
      }
    };

    completeEnrollment();
  }, [purchaseId]);

  // ==================== Existing Code ====================
  const getCourseProgress = async () => {
    try {
      const token = await getToken();

      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          const { data } = await axios.post(
            `${backendUrl}/api/user/get-course-progress`,
            { courseId: course._id },
            { headers: { Authorization: `Bearer ${token}` } },
          );

          let totalLectures = calculateNoOfLectures(course);
          const lectureCompleted = data.progressData
            ? data.progressData.lectureCompleted.length
            : 0;

          return { totalLectures, lectureCompleted };
        }),
      );

      setProgressArray(tempProgressArray);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserEnrolledCourses();
    }
  }, [userData]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 px-4 md:px-36 py-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Enrollments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your course progress and continue learning
          </p>
        </div>

        {/* Empty State */}
        {enrolledCourses.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-xl p-10 text-center mt-10 shadow-sm">
            <p className="text-gray-500">
              You have not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* Head */}
                <thead className="bg-gray-50 text-gray-600 text-left">
                  <tr>
                    <th className="px-6 py-4 font-medium">Course</th>
                    <th className="px-6 py-4 font-medium max-sm:hidden">
                      Duration
                    </th>
                    <th className="px-6 py-4 font-medium max-sm:hidden">
                      Progress
                    </th>
                    <th className="px-6 py-4 font-medium text-right">Status</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="text-gray-700">
                  {enrolledCourses.map((course, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Course */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={course.courseThumbnail}
                            alt=""
                            onClick={() => navigate("/player/" + course._id)}
                            className="w-16 md:w-20 h-12 object-cover rounded-lg cursor-pointer"
                          />

                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => navigate("/player/" + course._id)}
                          >
                            <p className="font-medium text-gray-900">
                              {course.courseTitle}
                            </p>

                            {/* Progress bar */}
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full bg-blue-600"
                                style={{
                                  width: `${
                                    progressArray[index]
                                      ? (progressArray[index].lectureCompleted *
                                          100) /
                                        progressArray[index].totalLectures
                                      : 0
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 text-gray-500 max-sm:hidden">
                        {calculateCourseDuration(course)}
                      </td>

                      {/* Progress Text */}
                      <td className="px-6 py-4 text-gray-500 max-sm:hidden">
                        {progressArray[index]
                          ? `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} Lectures`
                          : "0 / 0 Lectures"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-right">
                        {progressArray[index] &&
                        progressArray[index].lectureCompleted /
                          progressArray[index].totalLectures ===
                          1 ? (
                          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                            Completed
                          </span>
                        ) : (
                          <button
                            className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                            onClick={() => navigate("/player/" + course._id)}
                          >
                            Continue
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default MyEnrollMents;
