"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Award, Zap } from "lucide-react";
import { AIService } from "@/services/ai.service";
import { AIRecommendationItem } from "@/types/ai.types";

export default function AIRecommendationSection() {
  const [recommendations, setRecommendations] = useState<AIRecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadRecs = async () => {
      try {
        const data = await AIService.getRecommendations();
        if (isMounted) setRecommendations(data);
      } catch (err) {
        console.error("AI Recommendations error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadRecs();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 animate-pulse">
        <div className="h-6 w-48 bg-slate-800 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 bg-slate-800 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-slate-900 border border-purple-900/40 rounded-xl p-6 shadow-xl text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-5 h-5 animate-pulse text-purple-300" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Recommended for You
              <span className="text-[10px] bg-gradient-to-r from-purple-600 to-[#7F265B] text-white px-2 py-0.5 rounded-full font-mono">
                AI Match engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Personalized courses suggested based on your learning history & skills</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {recommendations.map((rec) => (
          <div
            key={rec.courseId}
            className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-32 w-full bg-slate-800 overflow-hidden">
                <img
                  src={rec.thumbnail}
                  alt={rec.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-sm text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
                  {rec.matchScore}% Match
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] uppercase font-mono text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded">
                  {rec.level}
                </span>
                <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors line-clamp-2">
                  {rec.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 italic">
                  "{rec.reason}"
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <Link
                href={`/courses/${rec.courseId}`}
                className="w-full py-2 bg-slate-900 hover:bg-purple-950/60 border border-slate-800 hover:border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all"
              >
                <span>View Course Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
