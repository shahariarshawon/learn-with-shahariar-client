import { DashboardSkeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="h-8 w-48 bg-slate-800 rounded animate-pulse" />
      <DashboardSkeleton />
    </div>
  );
}
