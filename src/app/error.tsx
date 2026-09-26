"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 text-center">
      <div className="max-w-md rounded-3xl border border-red-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
          ⚠️
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Something went wrong</h2>
        <p className="mt-2 text-sm text-slate-600">
          {error?.message || "An unexpected error occurred while loading this page."}
        </p>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#7F265B] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#6d214f] cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-[#7F265B]/30 hover:text-[#7F265B]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
