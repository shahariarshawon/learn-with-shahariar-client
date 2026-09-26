"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/dashboard.types";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

interface DashboardSidebarProps {
  role?: UserRole;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role = "instructor" }) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const instructorNavItems: NavItem[] = [
    { label: "Dashboard", href: "/instructor/dashboard", icon: "📊" },
    { label: "My Courses", href: "/instructor/courses", icon: "📚" },
    { label: "Analytics", href: "/instructor/analytics", icon: "📈" },
    { label: "Enrolled Students", href: "/instructor/students", icon: "👥" },
    { label: "Revenue & Sales", href: "/instructor/revenue", icon: "💰" },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Admin Overview", href: "/admin/dashboard", icon: "⚡" },
    { label: "User Management", href: "/admin/users", icon: "👥" },
    { label: "Course Moderation", href: "/admin/courses", icon: "🛡️", badge: "5" },
    { label: "Transactions & Payments", href: "/admin/payments", icon: "💳" },
    { label: "Platform Analytics", href: "/admin/analytics", icon: "📈" },
  ];

  const navItems = role === "admin" ? adminNavItems : instructorNavItems;

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } min-h-screen shrink-0`}
    >
      {/* Header / Brand */}
      <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7F265B] font-bold text-white text-xs shadow-sm">
              LWS
            </span>
            <div className="leading-tight min-w-0">
              <h3 className="text-sm font-extrabold text-slate-900 truncate">Learn With Shahariar</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7F265B]">
                {role === "admin" ? "Admin Portal" : "Instructor Studio"}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold transition-all duration-200 ${
                isActive
                  ? "bg-[#7F265B] text-white shadow-md shadow-[#7F265B]/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && item.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                    isActive ? "bg-white text-[#7F265B]" : "bg-[#7F265B]/10 text-[#7F265B]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Switcher */}
      {!collapsed && (
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Active Environment
            </span>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 capitalize">{role} Portal</span>
              <Link
                href={role === "admin" ? "/instructor/dashboard" : "/admin/dashboard"}
                className="text-[11px] font-bold text-[#7F265B] hover:underline"
              >
                Switch →
              </Link>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;
