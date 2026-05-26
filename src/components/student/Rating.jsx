import React, { useEffect, useState } from "react";

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hovered, setHovered] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    setRating(initialRating || 0);
  }, [initialRating]);

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const activeValue = hovered || rating;
        const isActive = starValue <= activeValue;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHovered(starValue)}
            onMouseLeave={() => setHovered(0)}
            className="rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            <span
              className={`inline-block text-2xl sm:text-3xl transition-all duration-300 ${
                isActive
                  ? "text-amber-400 drop-shadow-[0_4px_10px_rgba(251,191,36,0.30)]"
                  : "text-slate-300"
              } ${isActive ? "scale-110" : "scale-100"}`}
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;