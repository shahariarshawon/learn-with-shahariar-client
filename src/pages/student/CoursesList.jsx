import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 pt-16 md:px-12 lg:px-20 xl:px-28">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-52 h-40 w-40 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute right-10 top-32 h-52 w-52 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rounded-[30px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-8"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 inline-flex rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
                  Explore Courses
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  Course List
                </h1>

                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  Browse practical, career-focused courses designed to help you
                  build real skills through structured lessons and hands-on
                  projects.
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  <span
                    onClick={() => navigate("/")}
                    className="cursor-pointer font-medium text-[#7F265B] transition hover:underline"
                  >
                    Home
                  </span>{" "}
                  <span className="mx-2 text-slate-300">/</span>
                  <span>Course List</span>
                </p>
              </div>

              <div className="w-full lg:max-w-xl">
                <SearchBar data={input} />
              </div>
            </div>
          </motion.div>

          {/* Search chip */}
          <AnimatePresence>
            {input && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#7F265B]/15 bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-xl"
              >
                <span className="font-medium text-[#7F265B]">Search:</span>
                <span>{input}</span>
                <button
                  onClick={() => navigate("/course-list")}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#7F265B]/8 transition hover:bg-[#7F265B]/15"
                >
                  <img
                    src={assets.cross_icon}
                    alt="clear search"
                    className="h-3.5 w-3.5"
                  />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Course count */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.08 }}
            className="mt-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Available Courses
              </h2>
              <p className="text-sm text-slate-500">
                {filteredCourse.length} course
                {filteredCourse.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </motion.div>

          {/* Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.12 }}
            className="mt-8 pb-16"
          >
            {filteredCourse.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredCourse.map((course, index) => (
                  <motion.div
                    key={course._id || index}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-slate-200 bg-white/90 px-6 py-14 text-center shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900">
                  No courses found
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 md:text-base">
                  We couldn’t find any courses matching your search. Try another
                  keyword or browse all available courses.
                </p>

                <button
                  onClick={() => navigate("/course-list")}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#7F265B] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f]"
                >
                  View All Courses
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;