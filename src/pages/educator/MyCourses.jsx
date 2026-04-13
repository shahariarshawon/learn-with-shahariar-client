import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";
import { toast } from "react-toastify";
import Logger from "../../components/Logger";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  // ================= FETCH =================
  const fetchEducatorCourses = async () => {
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
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) fetchEducatorCourses();
  }, [isEducator]);

  // ================= DELETE =================
  const deleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      const token = await getToken();

      const { data } = await axios.delete(
        backendUrl + `/api/course/delete/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Course deleted");
        fetchEducatorCourses();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return courses ? (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Mobile Logger */}
        <div className="block sm:hidden">
          <Logger />
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            My Courses
          </h2>
          <p className="text-sm text-gray-500">
            Manage and control your courses
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Course</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Students</th>
                  <th className="px-6 py-3 text-left">Created</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => {
                  const finalPrice =
                    course.coursePrice -
                    (course.discount * course.coursePrice) / 100;

                  return (
                    <tr
                      key={course._id}
                      className="border-t hover:bg-gray-50"
                    >
                      {/* Course */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={course.courseThumbnail}
                          className="w-14 h-10 object-cover rounded"
                        />
                        <span className="font-medium">
                          {course.courseTitle}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        {finalPrice === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `${currency}${finalPrice}`
                        )}
                      </td>

                      {/* Students */}
                      <td className="px-6 py-4">
                        {course.enrolledStudents.length}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 flex gap-2">
                        {/* EDIT COURSE */}
                        <Link
                          to={`/educator/edit-course/${course._id}`}
                        >
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">
                            Edit
                          </button>
                        </Link>

                        {/* MANAGE CONTENT */}
                        <Link
                          to={`/educator/edit-course/${course._id}`}
                        >
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">
                            Content
                          </button>
                        </Link>

                        {/* DELETE */}
                        <button
                          onClick={() => deleteCourse(course._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;