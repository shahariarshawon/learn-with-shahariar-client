"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, LifeBuoy } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uncaught App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-slate-900 border border-rose-900/40 rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shadow-lg">
          <AlertTriangle className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full">
            Unexpected Error Encountered
          </span>
          <h1 className="text-2xl font-bold text-white pt-2">Something Went Wrong</h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            {error.message || "An unexpected error occurred while processing your request. Please try again."}
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-slate-500 pt-1">Digest Code: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-700 to-[#7F265B] hover:opacity-95 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="border-t border-slate-800/80 pt-4">
          <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <LifeBuoy className="w-3.5 h-3.5 text-purple-400" /> Need help? Contact{" "}
            <a href="mailto:support@learnwithshahariar.com" className="text-purple-400 underline hover:text-purple-300">
              Shahariar LMS Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
