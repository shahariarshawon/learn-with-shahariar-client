"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import CourseCard from "@/components/student/CourseCard";
import { CourseCardSkeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import { Course } from "@/types";
import { CATEGORIES_LIST } from "@/mock/courses";

interface CourseListContentProps {
  initialSearch?: string;
}

export function CourseListContent({ initialSearch = "" }: CourseListContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParamSearch = searchParams?.get("search") || initialSearch;
  const queryParamCategory = searchParams?.get("category") || "";

  const { allCourses } = useAppContext();

  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>(queryParamSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    queryParamCategory || "All Categories"
  );
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("All");
  const [selectedMinRating, setSelectedMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const PAGE_SIZE = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLevel, selectedPriceRange, selectedMinRating, sortBy]);

  useEffect(() => {
    if (queryParamSearch) {
      setSearchTerm(queryParamSearch);
    }
  }, [queryParamSearch]);

  useEffect(() => {
    if (queryParamCategory) {
      setSelectedCategory(queryParamCategory);
    }
  }, [queryParamCategory]);

  // Multi-faceted filtering & sorting logic
  const filteredCourses = useMemo(() => {
    if (!allCourses) return [];

    let result = [...allCourses];

    // 1. Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.courseTitle.toLowerCase().includes(q) ||
          c.courseDescription.toLowerCase().includes(q) ||
          (c.category && c.category.toLowerCase().includes(q)) ||
          (typeof c.educator === "object" &&
            c.educator?.name?.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (selectedCategory && selectedCategory !== "All Categories") {
      result = result.filter(
        (c) =>
          c.category?.toLowerCase() === selectedCategory.toLowerCase() ||
          (c.category && c.category.includes(selectedCategory))
      );
    }

    // 3. Level filter
    if (selectedLevel !== "All") {
      result = result.filter((c) => {
        const lvl = (c.level || "").toLowerCase();
        if (selectedLevel === "Beginner") return lvl.includes("beginner");
        if (selectedLevel === "Intermediate") return lvl.includes("intermediate");
        if (selectedLevel === "Advanced") return lvl.includes("advanced");
        return true;
      });
    }

    // 4. Price range filter
    if (selectedPriceRange !== "All") {
      result = result.filter((c) => {
        const price = c.coursePrice ?? c.price ?? 0;
        if (selectedPriceRange === "under-75") return price < 75;
        if (selectedPriceRange === "75-90") return price >= 75 && price <= 90;
        if (selectedPriceRange === "over-90") return price > 90;
        return true;
      });
    }

    // 5. Min Rating filter
    if (selectedMinRating > 0) {
      result = result.filter((c) => {
        const ratings = c.courseRatings || [];
        const avg =
          ratings.length > 0
            ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
            : 4.8;
        return avg >= selectedMinRating;
      });
    }

    // 6. Sorting
    result.sort((a, b) => {
      if (sortBy === "popular") {
        const aCount = Array.isArray(a.enrolledStudents)
          ? a.enrolledStudents.length
          : 1000;
        const bCount = Array.isArray(b.enrolledStudents)
          ? b.enrolledStudents.length
          : 1000;
        return bCount - aCount;
      }
      if (sortBy === "price-low") {
        return (a.coursePrice ?? 0) - (b.coursePrice ?? 0);
      }
      if (sortBy === "price-high") {
        return (b.coursePrice ?? 0) - (a.coursePrice ?? 0);
      }
      if (sortBy === "title") {
        return a.courseTitle.localeCompare(b.courseTitle);
      }
      return 0;
    });

    return result;
  }, [
    allCourses,
    searchTerm,
    selectedCategory,
    selectedLevel,
    selectedPriceRange,
    selectedMinRating,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCourses.slice(start, start + PAGE_SIZE);
  }, [filteredCourses, currentPage]);

  const hasActiveFilters =
    Boolean(searchTerm) ||
    selectedCategory !== "All Categories" ||
    selectedLevel !== "All" ||
    selectedPriceRange !== "All" ||
    selectedMinRating > 0;

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedLevel("All");
    setSelectedPriceRange("All");
    setSelectedMinRating(0);
    setSortBy("popular");
    router.push("/course-list");
  };

  const isLoading = !allCourses || allCourses.length === 0;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      <Navbar />

      {/* Catalog Hero Banner */}
      <section className="border-b border-slate-200/80 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-bold text-[#7F265B] mb-2.5">
                <Sparkles className="h-3.5 w-3.5" />
                Comprehensive Curriculum
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Explore Engineering Courses
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Discover hands-on, production-level courses taught by seasoned software architects and research scientists.
              </p>

              {/* Breadcrumb */}
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <Link href="/" className="text-slate-600 hover:text-[#7F265B]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#7F265B]">All Courses</span>
              </div>
            </div>

            {/* Quick Search */}
            <div className="w-full lg:max-w-md">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by title, topic, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-10 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none focus:ring-2 focus:ring-[#7F265B]/15 transition-all shadow-xs"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs sticky top-24 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <SlidersHorizontal className="h-4 w-4 text-[#7F265B]" />
                  <span>Filter Courses</span>
                </div>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs font-bold text-[#7F265B] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* 1. Category */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Category
                </label>
                <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                  {CATEGORIES_LIST.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors flex items-center justify-between ${
                          isSelected
                            ? "bg-[#7F265B] text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <span className="truncate">{cat}</span>
                        {isSelected && <span className="text-white text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Level */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold text-center border transition-all ${
                        selectedLevel === lvl
                          ? "border-[#7F265B] bg-[#7F265B]/10 text-[#7F265B]"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Price Range */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Price
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: "All", label: "All Prices" },
                    { id: "under-75", label: "Under $75" },
                    { id: "75-90", label: "$75 to $90" },
                    { id: "over-90", label: "Premium ($90+)" },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === p.id}
                        onChange={() => setSelectedPriceRange(p.id)}
                        className="text-[#7F265B] focus:ring-[#7F265B] h-3.5 w-3.5"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. Minimum Rating */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Rating
                </label>
                <div className="space-y-1.5">
                  {[
                    { val: 0, label: "All Ratings" },
                    { val: 4.8, label: "4.8 & up ★" },
                    { val: 4.9, label: "4.9 & up ★" },
                  ].map((r) => (
                    <label
                      key={r.val}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedMinRating === r.val}
                        onChange={() => setSelectedMinRating(r.val)}
                        className="text-[#7F265B] focus:ring-[#7F265B] h-3.5 w-3.5"
                      />
                      <span>{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT / MAIN CONTENT AREA */}
          <main className="flex-1 min-w-0 w-full space-y-6">
            {/* Top Toolbar: count + sorting + mobile toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
                >
                  <Filter className="h-4 w-4 text-[#7F265B]" />
                  Filters
                </button>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  Showing <span className="font-extrabold text-slate-900">{filteredCourses.length}</span> courses
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-[#7F265B] focus:outline-none"
                >
                  <option value="popular">Most Enrolled</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Course Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-semibold text-[#7F265B]">
                    Search: {searchTerm}
                    <button onClick={() => setSearchTerm("")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedCategory !== "All Categories" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-semibold text-[#7F265B]">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("All Categories")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                {selectedLevel !== "All" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-semibold text-[#7F265B]">
                    Level: {selectedLevel}
                    <button onClick={() => setSelectedLevel("All")}><X className="h-3 w-3" /></button>
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-xs font-bold text-slate-500 hover:text-[#7F265B] underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <CourseCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedCourses.map((course) => (
                    <CourseCard key={course._id || course.id} course={course} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
                    <p className="text-xs font-semibold text-slate-500">
                      Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                      {Math.min(currentPage * PAGE_SIZE, filteredCourses.length)} of {filteredCourses.length} courses
                    </p>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => {
                          setCurrentPage((prev) => Math.max(1, prev - 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        return (
                          <button
                            key={pageNum}
                            type="button"
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`h-8 w-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              currentPage === pageNum
                                ? "bg-[#7F265B] text-white shadow-sm"
                                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() => {
                          setCurrentPage((prev) => Math.min(totalPages, prev + 1));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-3xl">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  No courses found matching your criteria
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try clearing some filters or searching with a different term to find relevant courses.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="rounded-full bg-[#7F265B] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Filter Courses</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="space-y-6 pt-6 flex-1">
                {/* Categories */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Category
                  </label>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {CATEGORIES_LIST.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                          selectedCategory === cat
                            ? "bg-[#7F265B] text-white"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "Beginner", "Intermediate", "Advanced"].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setSelectedLevel(lvl);
                          setMobileFilterOpen(false);
                        }}
                        className={`rounded-lg p-2 text-xs font-bold border ${
                          selectedLevel === lvl
                            ? "border-[#7F265B] bg-[#7F265B]/10 text-[#7F265B]"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Footer */}
              <div className="pt-6 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    resetFilters();
                    setMobileFilterOpen(false);
                  }}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 rounded-xl bg-[#7F265B] py-2.5 text-xs font-bold text-white shadow-md"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function CourseListPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7F265B] border-t-transparent" />
        </div>
      }
    >
      <CourseListContent />
    </Suspense>
  );
}
