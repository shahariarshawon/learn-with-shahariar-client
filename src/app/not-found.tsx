"use client";

import Link from "next/link";
import { Compass, Home, BookOpen, Search, ArrowRight } from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Animated 404 Header */}
          <div className="relative inline-block">
            <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-[#7F265B] tracking-wider select-none">
              404
            </span>
            <div className="absolute inset-0 bg-purple-500/10 blur-3xl -z-10 rounded-full" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Page Not Found</h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              The page or resource you are looking for might have been moved, renamed, or does not exist on Learn With Shahariar platform.
            </p>
          </div>

          {/* Quick Search Redirect */}
          <div className="max-w-md mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.elements.namedItem("q") as HTMLInputElement;
                if (input.value.trim()) {
                  window.location.href = `/course-list/${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="flex gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 focus-within:border-purple-500 transition-colors"
            >
              <div className="flex items-center pl-3 text-slate-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search courses or topics..."
                className="flex-1 bg-transparent px-2 py-1.5 text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#7F265B] hover:bg-[#6d214f] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Nav Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-purple-700 to-[#7F265B] text-white font-semibold text-xs rounded-xl shadow-lg hover:opacity-95 transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/dashboard/learning"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>My Dashboard</span>
            </Link>

            <Link
              href="/course-list"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-pink-400" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
