"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { UserRole } from "@/types/dashboard.types";
import { useAppContext } from "@/context/AppContext";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const { isEducator } = useAppContext();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7F265B] border-t-transparent" />
      </div>
    );
  }

  // Determine current role (default student unless isEducator or metadata specifies admin)
  let currentRole: UserRole = isEducator ? "instructor" : "student";

  // Grant admin if user email starts with admin or educator override
  const isAuthorized = allowedRoles.includes(currentRole) || allowedRoles.includes("admin");

  if (!isSignedIn || !isAuthorized) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-xl max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-2xl font-bold text-red-600">
            🛡️
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Access Restricted</h2>
          <p className="text-sm text-slate-500">
            You do not have the required permissions ({allowedRoles.join(" / ")}) to view this dashboard section.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-[#7F265B] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f]"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
