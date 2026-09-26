import React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-800/60 ${className}`}
      {...props}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 animate-pulse">
      <div className="aspect-video w-full bg-slate-800 rounded-xl" />
      <div className="h-4 w-3/4 bg-slate-800 rounded" />
      <div className="h-3 w-1/2 bg-slate-800 rounded" />
      <div className="space-y-2 pt-2">
        <div className="h-2 w-full bg-slate-800 rounded-full" />
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-slate-800 rounded" />
          <div className="h-3 w-16 bg-slate-800 rounded" />
        </div>
      </div>
      <div className="h-9 w-full bg-slate-800 rounded-xl" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
            <div className="h-3 w-20 bg-slate-800 rounded" />
            <div className="h-7 w-28 bg-slate-800 rounded" />
          </div>
        ))}
      </div>
      <div className="h-80 bg-slate-900 border border-slate-800 rounded-2xl p-6" />
    </div>
  );
}
