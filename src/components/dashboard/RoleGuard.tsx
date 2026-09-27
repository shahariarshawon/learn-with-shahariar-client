"use client";

import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { UserRole } from "@/types/dashboard.types";
import { useAuthRole } from "@/features/auth/use-auth-role";

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
  const { isLoaded, isSignedIn, isAdmin, isEducator, role } = useAuthRole();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#7F265B] border-t-transparent" />
      </div>
    );
  }

  // Admin role grants access to all dashboard spaces
  // Instructors can access instructor views
  const isAuthorized =
    isAdmin ||
    allowedRoles.includes(role as UserRole) ||
    (isEducator && allowedRoles.includes("instructor"));

  if (!isSignedIn || !isAuthorized) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl max-w-md space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-2xl font-bold text-[#7F265B]">
            🛡️
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Access Restricted</h2>
          <p className="text-sm text-slate-500">
            This workspace requires <span className="font-semibold text-slate-800">{allowedRoles.join(" or ")}</span> privileges. Your current role is <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700">{role || "student"}</span>.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="rounded-xl bg-[#7F265B] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition"
            >
              Return Home
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
            >
              Student Portal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;
