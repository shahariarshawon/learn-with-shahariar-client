"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-purple-900/40 rounded-2xl p-8 shadow-2xl text-center space-y-5">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-purple-950 border border-purple-700/50 flex items-center justify-center text-purple-400 font-extrabold text-2xl">
            LWS
          </div>
          <h1 className="text-xl font-bold text-white">Application Exception</h1>
          <p className="text-xs text-slate-400">
            A global layout rendering error occurred. You can reload the application layout below.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-2.5 bg-gradient-to-r from-purple-700 to-[#7F265B] text-white text-xs font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all"
          >
            Reload Platform
          </button>
        </div>
      </body>
    </html>
  );
}
