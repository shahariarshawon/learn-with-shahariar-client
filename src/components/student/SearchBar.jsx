import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || "");
  const [isFocused, setIsFocused] = useState(false);

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className={`relative mx-auto flex w-full max-w-3xl items-center rounded-full border bg-white/85 p-2 backdrop-blur-xl transition-all duration-300 ${
        isFocused
          ? "border-[#7F265B]/40 shadow-[0_20px_50px_rgba(127,38,91,0.16)]"
          : "border-white/60 shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_42px_rgba(127,38,91,0.08)]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 ${
          isFocused ? "opacity-100" : "opacity-0"
        } bg-[radial-gradient(circle_at_center,rgba(127,38,91,0.08),transparent_65%)]`}
      />

      {/* Icon */}
      <div className="relative z-10 flex items-center justify-center pl-3 pr-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
            isFocused
              ? "bg-[#7F265B]/10 scale-110"
              : "bg-slate-100/80"
          }`}
        >
          <img
            src={assets.search_icon}
            alt="search icon"
            className={`w-4.5 transition-all duration-300 ${
              isFocused ? "opacity-100" : "opacity-70"
            }`}
          />
        </div>
      </div>

      {/* Input */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses, skills, or topics..."
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 h-12 flex-1 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 md:text-base"
      />

      {/* Button */}
      <button
        type="submit"
        className="relative z-10 rounded-full bg-[#7F265B] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_16px_32px_rgba(127,38,91,0.30)] active:scale-95 md:px-7"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;