"use client";

import React from "react";
import Link from "next/link";
import { Star, Clock, Users, BookOpen } from "lucide-react";
import { Course } from "@/types";
import { useAppContext } from "@/context/AppContext";

export interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { currency, calculateRating } = useAppContext();

  const rating = calculateRating(course) || 4.9;
  const basePrice = course.coursePrice ?? course.price ?? 49.99;
  const discountPercent = course.discount ?? 0;
  const discountedPrice = discountPercent > 0
    ? basePrice - (discountPercent * basePrice) / 100
    : basePrice;

  // Resolve instructor name & image
  const instructorObj = typeof course.educator === "object" ? course.educator : (typeof course.instructor === "object" ? course.instructor : null);
  const instructorName = instructorObj?.name || instructorObj?.fullName || "Shahariar Shawon";
  const instructorAvatar = instructorObj?.imageUrl || instructorObj?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80";

  // Students count
  const studentsCount = Array.isArray(course.enrolledStudents)
    ? course.enrolledStudents.length
    : (course.enrolledStudents || 1200);

  // Lesson count
  const totalLessons = course.courseContent?.reduce(
    (acc, ch) => acc + (ch.chapterContent?.length || 0),
    0
  ) || 24;

  const level = course.level || "All Levels";
  const category = course.category || "Engineering";
  const duration = course.duration || "32 hours";

  return (
    <Link
      href={`/course/${course._id || course.id}`}
      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#7F265B]/30 hover:shadow-[0_20px_45px_rgba(127,38,91,0.12)]"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          src={course.courseThumbnail || course.thumbnail || "/course_1.png"}
          alt={course.courseTitle || course.title || "Course thumbnail"}
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20 opacity-60 transition-opacity group-hover:opacity-40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-slate-800 backdrop-blur-md shadow-xs">
            {category}
          </span>

          {discountPercent > 0 && (
            <span className="rounded-full bg-[#7F265B] px-2.5 py-1 text-[11px] font-extrabold text-white shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Level badge bottom left */}
        <div className="absolute bottom-2.5 left-3">
          <span className="rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-xs">
            {level}
          </span>
        </div>
      </div>

      {/* Course Body */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5 text-left">
        <div className="space-y-2.5">
          {/* Title */}
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-[#7F265B]">
            {course.courseTitle || course.title}
          </h3>

          {/* Instructor snippet */}
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <img
              src={instructorAvatar}
              alt={instructorName}
              className="h-5 w-5 rounded-full object-cover ring-1 ring-slate-200"
            />
            <span className="truncate font-medium">{instructorName}</span>
          </div>

          {/* Metrics bar: Duration, Lessons, Students */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 pt-0.5">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <BookOpen className="h-3 w-3 text-slate-400" />
              {totalLessons} lessons
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3 text-slate-400" />
              {typeof studentsCount === "number" ? studentsCount.toLocaleString() : studentsCount}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-xs font-black text-amber-500">
              {Number(rating).toFixed(1)}
            </span>
            <div className="flex items-center text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.floor(rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-slate-400">
              ({course.courseRatings?.length || 48})
            </span>
          </div>
        </div>

        {/* Pricing & CTA footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-slate-900">
              {currency.toUpperCase()} {discountedPrice.toFixed(2)}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs font-medium text-slate-400 line-through">
                {currency.toUpperCase()} {basePrice.toFixed(2)}
              </span>
            )}
          </div>

          <span className="text-xs font-bold text-[#7F265B] opacity-0 group-hover:opacity-100 transition-opacity">
            View Syllabus →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
