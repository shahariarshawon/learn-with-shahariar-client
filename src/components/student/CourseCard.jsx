import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course);
  const discountedPrice =
    course.coursePrice - (course.discount * course.coursePrice) / 100;

  return (
    <Link
      to={"/course/" + course._id}
      onClick={() => window.scrollTo(0, 0)}
      className="group block overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7F265B]/20 hover:shadow-[0_20px_50px_rgba(127,38,91,0.12)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={course.courseThumbnail}
          alt={course.courseTitle}
        />

        {course.discount > 0 && (
          <div className="absolute left-3 top-3 rounded-full bg-[#7F265B] px-3 py-1 text-xs font-semibold text-white shadow-md">
            {course.discount}% OFF
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="space-y-3 p-4 text-left">
        <h3 className="line-clamp-2 min-h-[3.5rem] text-base font-semibold leading-7 text-slate-900 transition-colors duration-300 group-hover:text-[#7F265B]">
          {course.courseTitle}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-800">
            {Number(rating).toFixed(1)}
          </span>

          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <img
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-105"
                key={i}
                src={i < Math.floor(rating) ? assets.star : assets.star_blank}
                alt="star"
              />
            ))}
          </div>

          <span className="text-slate-500">
            ({course.courseRatings?.length || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <p className="text-lg font-bold text-slate-900">
            {currency} {discountedPrice.toFixed(2)}
          </p>

          {course.discount > 0 && (
            <p className="text-sm text-slate-400 line-through">
              {currency} {course.coursePrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;