"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export interface LoadingProps {
  path?: string;
}

export const Loading: React.FC<LoadingProps> = ({ path }) => {
  const router = useRouter();

  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        router.push(`/${path}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [path, router]);

  return (
    <div className="flex min-h-[14vh] flex-col items-center justify-center gap-4 py-6">
      <div className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 rounded-full bg-[#7F265B] animate-bounce [animation-delay:-0.3s]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#a3487c] animate-bounce [animation-delay:-0.15s]" />
        <span className="h-3.5 w-3.5 rounded-full bg-[#c96aa2] animate-bounce" />
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-[#7F265B]">Loading</p>
        <p className="mt-1 text-xs text-slate-500">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
};

export default Loading;
