import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="w-full max-w-2xl mx-auto flex items-center bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 px-2 py-1"
    >
      {/* Icon */}
      <div className="flex items-center justify-center px-3">
        <img
          src={assets.search_icon}
          alt="search icon"
          className="w-5 opacity-70"
        />
      </div>

      {/* Input */}
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        placeholder="Search for courses..."
        className="flex-1 h-12 outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base bg-transparent"
      />

      {/* Button */}
      <button
        type="submit"
        className="bg-violet-600 hover:bg-violet-700 text-white px-5 md:px-7 py-2.5 rounded-full font-medium transition-all duration-200 active:scale-95"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;