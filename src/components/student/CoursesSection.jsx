import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import Loading from "./Loading";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(allCourses)) {
      setLoading(false);
    }
  }, [allCourses]);

  return (
    <section className="relative overflow-hidden px-6 py-20 text-center sm:px-10 lg:px-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
        <div className="absolute left-10 bottom-10 h-32 w-32 rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="absolute right-10 top-20 h-40 w-40 rounded-full bg-[#7F265B]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] transition-all duration-300 hover:scale-105">
            Featured Courses
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Learn from the best
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            Discover our top-rated courses across valuable categories. From
            coding and design to business and productivity, our programs are
            carefully crafted to help you build real-world skills with
            confidence.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="mt-14">
            <Loading />
          </div>
        ) : allCourses.length === 0 ? (
          <p className="mt-12 text-slate-500">No courses available right now.</p>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allCourses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/course-list"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center justify-center rounded-full border border-[#7F265B]/20 bg-white px-8 py-3.5 text-sm font-semibold text-[#7F265B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/40 hover:bg-[#7F265B] hover:text-white hover:shadow-[0_16px_36px_rgba(127,38,91,0.16)] active:translate-y-0"
          >
            Show All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;