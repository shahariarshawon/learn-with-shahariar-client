import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import Logger from "../../components/Logger";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate=useNavigate();

  const fetchDashboardData = async () => {
    // setDashboardData(dummyDashboardData);
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("dashboard data", data.dashboardData);

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

  return dashboardData ? (
    <div className="min-h-screen w-full p-4 md:p-8 space-y-10">
      {/* Top Section */}
      <div className="space-y-6">
       

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Enrollments */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-blue-100 rounded-lg">
              <img src={assets.patients_icon} alt="" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm text-gray-500">Total Enrollments</p>
            </div>
          </div>

          {/* Courses */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-purple-100 rounded-lg">
              <img src={assets.appointments_icon} alt="" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashboardData.totalCourses}
              </p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>

          {/* Earnings */}
          <div className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="p-3 bg-green-100 rounded-lg">
              <img src={assets.earning_icon} alt="" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-800 whitespace-nowrap">
                {currency}
                {dashboardData.totalEarnings}
              </p>
              <p className="text-sm text-gray-500">Total Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Latest Enrollments
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-4 hidden sm:table-cell">#</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Course</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 hidden sm:table-cell">
                    {index + 1}
                  </td>

                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={item.student.imageUrl}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <span className="truncate font-medium">
                      {item.student.name}
                    </span>
                  </td>

                  <td className="py-3 px-4 truncate">{item.courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;
