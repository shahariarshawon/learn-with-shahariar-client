import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Logger from "../../components/Logger";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "/api/educator/enrolled-students",
        { headers: { Authorization: `Bearer ${token}` } }
      );

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

  if (!enrolledStudents) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white p-4 md:p-8">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6">
        {/* Mobile Logger */}
        <div className="block sm:hidden">
          <Logger />
        </div>

        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-3"
        >
          <div className="inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
            Student Activity
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Enrolled Students
              </h2>
              <p className="mt-1 text-sm text-slate-500 md:text-base">
                Track the students who joined your courses and monitor recent
                enrollments.
              </p>
            </div>

            <div className="rounded-2xl border border-[#7F265B]/10 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm backdrop-blur-xl">
              Total Enrollments:{" "}
              <span className="font-semibold text-[#7F265B]">
                {enrolledStudents.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.06 }}
          className="hidden overflow-hidden rounded-[28px] border border-[#7F265B]/10 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:block"
        >
          <div className="border-b border-slate-100 px-6 py-5">
            <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
              Enrollment List
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Recent students enrolled in your courses.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50/80 text-slate-500">
                <tr>
                  <th className="px-6 py-4 text-left font-medium">#</th>
                  <th className="px-6 py-4 text-left font-medium">Student</th>
                  <th className="px-6 py-4 text-left font-medium">Course</th>
                  <th className="px-6 py-4 text-left font-medium">Date</th>
                </tr>
              </thead>

              <tbody className="text-slate-700">
                {enrolledStudents.map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-t border-slate-100 transition-colors duration-200 hover:bg-[#7F265B]/4"
                  >
                    <td className="px-6 py-4 text-slate-500">{index + 1}</td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item?.student?.imageUrl || "/student.png"}
                          alt={item?.student?.name || "Student"}
                          className="h-10 w-10 rounded-full bg-slate-200 object-cover ring-2 ring-[#7F265B]/10"
                        />
                        <span className="max-w-[220px] truncate font-semibold text-slate-800">
                          {item?.student?.name || "Unknown Student"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      <span className="line-clamp-1">{item.courseTitle}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(item.purchaseDate).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {enrolledStudents.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: index * 0.04 }}
              className="rounded-3xl border border-[#7F265B]/10 bg-white/90 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(127,38,91,0.10)]"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item?.student?.imageUrl || "/student.png"}
                  alt={item?.student?.name || "Student"}
                  className="h-12 w-12 rounded-full bg-slate-200 object-cover ring-2 ring-[#7F265B]/10"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {item?.student?.name || "Unknown Student"}
                  </p>

                  <div className="mt-3 space-y-2 text-sm">
                    <div>
                      <p className="text-slate-400">Course</p>
                      <p className="line-clamp-2 font-medium text-slate-700">
                        {item.courseTitle}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Date</p>
                      <p className="font-medium text-slate-700">
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">Enrollment No.</p>
                      <p className="font-medium text-[#7F265B]">
                        #{index + 1}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentsEnrolled;