import { CourseCardSkeleton } from "@/components/ui/skeleton";

export default function CourseListLoading() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 max-w-7xl mx-auto space-y-6">
      <div className="h-10 w-64 bg-slate-800 rounded animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
