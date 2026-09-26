"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { WatermarkPosition, WatermarkProps } from "@/types/video";

const POSITIONS: WatermarkPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const POSITION_CLASSES: Record<WatermarkPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "center-left": "top-1/2 left-4 -translate-y-1/2",
  "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "center-right": "top-1/2 right-4 -translate-y-1/2",
  "bottom-left": "bottom-14 left-4",
  "bottom-center": "bottom-14 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-14 right-4",
};

export const VideoWatermark: React.FC<WatermarkProps> = ({
  studentEmail,
  intervalMs = 5000,
  opacity = 0.35,
  className = "",
}) => {
  const { user } = useUser();
  const [position, setPosition] = useState<WatermarkPosition>("top-right");

  const emailDisplay =
    studentEmail ||
    user?.primaryEmailAddress?.emailAddress ||
    user?.fullName ||
    "student@learnwithshahariar.com";

  // Shift watermark position every `intervalMs` (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prev) => {
        const available = POSITIONS.filter((p) => p !== prev);
        const randomIndex = Math.floor(Math.random() * available.length);
        return available[randomIndex];
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return (
    <div
      style={{ opacity }}
      className={`pointer-events-none absolute z-30 select-none rounded-md bg-black/50 px-2.5 py-1 text-[11px] font-mono tracking-wider text-white backdrop-blur-xs transition-all duration-700 ease-in-out ${
        POSITION_CLASSES[position]
      } ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#7F265B] animate-pulse" />
        <span>{emailDisplay}</span>
      </div>
    </div>
  );
};

export default VideoWatermark;
