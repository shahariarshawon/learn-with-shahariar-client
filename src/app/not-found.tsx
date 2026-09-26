import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 text-center">
      <div className="max-w-md rounded-3xl border border-[#7F265B]/10 bg-white/90 p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <span className="text-6xl font-black text-[#7F265B]/30">404</span>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-[#7F265B] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)]"
          >
            Back to Home
          </Link>
          <Link
            href="/course-list"
            className="rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-[#7F265B]/30 hover:text-[#7F265B]"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
