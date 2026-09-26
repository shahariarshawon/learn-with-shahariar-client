"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface VideoAccessControlProps {
  courseId: string;
  isEnrolled?: boolean;
  isPreviewFree?: boolean;
  onEnrollClick?: () => void;
}

export const VideoAccessControl: React.FC<VideoAccessControlProps> = ({
  courseId,
  isEnrolled = false,
  isPreviewFree = false,
  onEnrollClick,
}) => {
  const { isSignedIn } = useUser();

  const isGranted = isEnrolled || isPreviewFree;

  if (isGranted) return null;

  return (
    <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center backdrop-blur-md">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7F265B]/20 text-[#7F265B] ring-1 ring-[#7F265B]/40">
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-extrabold text-white">Enrollment Required</h3>

      <p className="mt-2 max-w-md text-sm text-slate-300 leading-relaxed">
        Please enroll in this course to watch this lesson and unlock full access to the guided roadmap, resources, and quizzes.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {onEnrollClick ? (
          <button
            type="button"
            onClick={onEnrollClick}
            className="rounded-full bg-[#7F265B] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#7F265B]/30 hover:bg-[#6d214f] transition cursor-pointer"
          >
            Enroll in Course Now
          </button>
        ) : (
          <Link
            href={`/course/${courseId}`}
            className="rounded-full bg-[#7F265B] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#7F265B]/30 hover:bg-[#6d214f] transition"
          >
            Enroll in Course Now
          </Link>
        )}

        {!isSignedIn && (
          <span className="text-xs text-slate-400">
            Already enrolled? Sign in to continue.
          </span>
        )}
      </div>
    </div>
  );
};

export default VideoAccessControl;
