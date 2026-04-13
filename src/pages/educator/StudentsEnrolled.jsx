import React, { useContext, useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Logger from "../../components/Logger";
const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);

  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    // setEnrolledStudents(dummyStudentEnrolled);
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/enrolled-students",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // console.log("data", data.enrolledStudents);

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Mobile Logger */}
          <div className="block sm:hidden">
            <Logger />
          </div>

          {/* Header */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Enrolled Students
            </h2>
            <p className="text-sm text-gray-500">
              Track who enrolled in your courses
            </p>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                {/* Header */}
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium hidden sm:table-cell">
                      #
                    </th>
                    <th className="px-6 py-3 text-left font-medium">Student</th>
                    <th className="px-6 py-3 text-left font-medium">Course</th>
                    <th className="px-6 py-3 text-left font-medium">Date</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="text-gray-700">
                  {enrolledStudents.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      {/* Index */}
                      <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                        {index + 1}
                      </td>

                      {/* Student */}
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={item?.student?.imageUrl || "/student.png"}
                          alt=""
                          className="w-9 h-9 rounded-full object-cover bg-gray-200"
                        />
                        <span className="font-medium truncate max-w-[180px]">
                          {item?.student?.name || "Unknown Student"}
                        </span>
                      </td>

                      {/* Course */}
                      <td className="px-6 py-4 truncate">{item.courseTitle}</td>

                      {/* Date */}
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
