"use client";

import { useState } from "react";
import { Sparkles, Loader2, Compass, Calendar, CheckCircle2, Bookmark, ArrowRight, BookOpen } from "lucide-react";
import { AIService } from "@/services/ai.service";
import { AIRoadmapPlan } from "@/types/ai.types";
import { useAIStore } from "@/store/use-ai-store";

export default function AIRoadmapGenerator() {
  const [goal, setGoal] = useState("Fullstack AI Developer");
  const [duration, setDuration] = useState(6);
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<AIRoadmapPlan | null>(null);
  const [saved, setSaved] = useState(false);

  const saveRoadmap = useAIStore((state) => state.saveRoadmap);

  const handleGenerate = async () => {
    if (!goal.trim()) return;

    setIsGenerating(true);
    setSaved(false);

    try {
      const generatedPlan = await AIService.generateRoadmap(goal.trim(), duration);
      setPlan(generatedPlan);
    } catch (err) {
      console.error("Roadmap generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePlan = () => {
    if (!plan) return;
    saveRoadmap(plan);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-purple-900/40 rounded-xl p-6 shadow-2xl text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-purple-700 to-[#7F265B] text-white shadow-md">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">AI Learning Roadmap Generator</h3>
            <p className="text-xs text-slate-400">Generate a personalized milestone timeline tailored to your career goal</p>
          </div>
        </div>
        <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
          Career Architect
        </span>
      </div>

      {/* Preset Goal Selectors */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-300 mb-2">Quick Goal Presets</label>
        <div className="flex flex-wrap gap-2">
          {[
            "Fullstack AI Developer",
            "Next.js Architect",
            "Python LLM & AI Engineer",
            "Cloud DevOps Specialist",
          ].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setGoal(preset)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                goal === preset
                  ? "bg-[#7F265B] border-purple-500 text-white font-medium"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-300 mb-1">Target Career Role / Skill Goal</label>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Target Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
          >
            <option value={3}>3 Months (Fast Track)</option>
            <option value={6}>6 Months (Standard)</option>
            <option value={12}>12 Months (Comprehensive)</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!goal.trim() || isGenerating}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mb-6"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
            <span>AI is designing your career roadmap timeline...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Generate Career Roadmap</span>
          </>
        )}
      </button>

      {/* Generated Plan Output Timeline */}
      {plan && (
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-400" />
                <span>Roadmap for "{plan.goal}"</span>
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Estimated Duration: {plan.durationMonths} Months</p>
            </div>

            <button
              type="button"
              onClick={handleSavePlan}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved to Dashboard!</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmark Roadmap</span>
                </>
              )}
            </button>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-900/50">
            {plan.phases.map((phase) => (
              <div key={phase.month} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-purple-500 flex items-center justify-center text-[10px] font-bold text-purple-300">
                  {phase.month}
                </div>

                <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-4 hover:border-purple-500/40 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <h5 className="text-xs sm:text-sm font-semibold text-white">
                      Month {phase.month}: {phase.title}
                    </h5>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      Phase {phase.month}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{phase.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="text-[11px] font-semibold text-purple-400 block mb-1 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Core Topics
                      </span>
                      <ul className="space-y-1">
                        {phase.topics.map((t, idx) => (
                          <li key={idx} className="text-slate-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] font-semibold text-emerald-400 block mb-1 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> Hands-on Capstones
                      </span>
                      <ul className="space-y-1">
                        {phase.recommendedProjects.map((p, idx) => (
                          <li key={idx} className="text-slate-300 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
