"use client";

import React from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { UserRole } from "@/types/dashboard.types";

interface DashboardNavbarProps {
  role?: UserRole;
  title?: string;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  role = "instructor",
  title = "Management Studio",
}) => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur-md">
      {/* Search Input */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 sm:w-80">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search platform courses, users, or metrics..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-[#7F265B] focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Right User Actions */}
      <div className="flex items-center gap-4">
        {/* Role Badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-extrabold capitalize border ${
            role === "admin"
              ? "bg-purple-50 text-purple-700 border-purple-200"
              : role === "instructor"
              ? "bg-pink-50 text-[#7F265B] border-[#7F265B]/20"
              : "bg-slate-100 text-slate-700 border-slate-200"
          }`}
        >
          {role} Role
        </span>

        {/* Notifications Icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
        >
          🔔
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#7F265B] ring-2 ring-white" />
        </button>

        {/* User Button */}
        <div className="flex items-center gap-3 border-l border-slate-100 pl-3">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8 ring-2 ring-[#7F265B]/20",
              },
            }}
          />
          <div className="hidden sm:block text-left leading-tight">
            <h5 className="text-xs font-bold text-slate-900">{user?.fullName || "Shahariar"}</h5>
            <span className="text-[10px] text-slate-500">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
