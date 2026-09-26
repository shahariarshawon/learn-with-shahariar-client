"use client";

import React, { useState } from "react";

interface CourseRatingProps {
  rating: number;
  onRatingChange?: (newRating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const CourseRating: React.FC<CourseRatingProps> = ({
  rating,
  onRatingChange,
  readonly = false,
  size = "md",
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const starSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange && onRatingChange(star)}
          onMouseEnter={() => !readonly && setHoverRating(star)}
          onMouseLeave={() => !readonly && setHoverRating(0)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"} transition-transform hover:scale-110`}
        >
          <svg
            className={`${starSizes[size]} ${
              star <= activeRating ? "text-amber-400 fill-current" : "text-slate-300 fill-current"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

export default CourseRating;
