import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-4">
      <div className="p-3 rounded-2xl bg-purple-950/80 border border-purple-800/60 shadow-xl">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
      <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase animate-pulse">
        Loading Learn With Shahariar...
      </p>
    </div>
  );
}
