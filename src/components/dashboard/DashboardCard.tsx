"use client";

import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  trend?: string;
  isPositive?: boolean;
  icon: string;
  description?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  trend,
  isPositive = true,
  icon,
  description,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#7F265B]/30 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7F265B]/10 text-lg text-[#7F265B] shadow-2xs group-hover:scale-110 transition-transform">
          {icon}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-extrabold text-slate-900">{value}</h3>

        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
              isPositive ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
            }`}
          >
            {isPositive ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      {description && <p className="mt-2 text-xs text-slate-500 font-medium">{description}</p>}
    </div>
  );
};

export default DashboardCard;
