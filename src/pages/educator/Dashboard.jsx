import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + "/api/educator/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

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

  if (!dashboardData) return <Loading />;

  const stats = [
    {
      title: "Total Enrollments",
      value: dashboardData.enrolledStudentsData.length,
      icon: assets.patients_icon,
      bg: "bg-[#7F265B]/10",
    },
    {
      title: "Total Courses",
      value: dashboardData.totalCourses,
      icon: assets.appointments_icon,
      bg: "bg-violet-100",
    },
    {
      title: "Total Earnings",
      value: `${currency}${dashboardData.totalEarnings}`,
      icon: assets.earning_icon,
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-28 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col gap-2"
        >
          <div className="inline-flex w-fit rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Educator Overview
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Track your enrollments, courses, and earnings at a glance.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
              className="group rounded-[26px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(127,38,91,0.12)]"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bg} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                >
                  <img src={stat.icon} alt={stat.title} className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Table Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-[28px] border border-[#7F265B]/10 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 md:px-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                Latest Enrollments
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Recent students enrolled in your courses
              </p>
            </div>

            <span className="rounded-full bg-[#7F265B]/8 px-3 py-1 text-xs font-medium text-[#7F265B]">
              {dashboardData.enrolledStudentsData.length} Students
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500">
                  <th className="px-6 py-4 font-medium">#</th>
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Course</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 last:border-none transition-colors duration-200 hover:bg-[#7F265B]/4"
                  >
                    <td className="px-6 py-4 font-medium text-slate-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.student.imageUrl}
                          alt={item.student.name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-[#7F265B]/10"
                        />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-800">
                            {item.student.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="line-clamp-1">{item.courseTitle}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;