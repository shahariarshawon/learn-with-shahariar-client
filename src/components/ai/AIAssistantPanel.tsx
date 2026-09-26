"use client";

import { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Wand2 } from "lucide-react";
import { AIService } from "@/services/ai.service";

interface AIAssistantPanelProps {
  onInsertContent?: (content: string) => void;
  defaultTopic?: string;
}

export default function AIAssistantPanel({ onInsertContent, defaultTopic = "" }: AIAssistantPanelProps) {
  const [topic, setTopic] = useState(defaultTopic);
  const [contentType, setContentType] = useState<"description" | "outcomes" | "seo" | "summary">("description");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedText("");

    try {
      const result = await AIService.generateCourseContent({
        type: contentType,
        topic: topic.trim(),
      });
      setGeneratedText(result);
    } catch (err) {
      console.error("AI Content Generation Failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsert = () => {
    if (generatedText && onInsertContent) {
      onInsertContent(generatedText);
    }
  };

  return (
    <div className="bg-slate-900 border border-purple-900/40 rounded-xl p-5 shadow-xl text-slate-200">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
        <h3 className="text-base font-semibold text-white">AI Content Assistant</h3>
        <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono ml-auto">
          Instructor Tools
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Target Course Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Next.js 15 Fullstack Masterclass, React 19 State Management"
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Select Generation Goal</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: "description", label: "Course Description" },
              { id: "outcomes", label: "Learning Outcomes" },
              { id: "summary", label: "Module Summary" },
              { id: "seo", label: "SEO Keywords" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setContentType(item.id as "description" | "outcomes" | "seo" | "summary")}
                className={`px-3 py-2 text-xs rounded-lg font-medium border transition-colors ${
                  contentType === item.id
                    ? "bg-[#7F265B] border-purple-500 text-white"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating with AI...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Content</span>
            </>
          )}
        </button>

        {generatedText && (
          <div className="mt-4 bg-slate-950 border border-slate-800 rounded-lg p-4 relative space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                AI Output Result
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
                {onInsertContent && (
                  <button
                    type="button"
                    onClick={handleInsert}
                    className="px-2.5 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center gap-1 transition-colors"
                  >
                    <span>Insert to Editor</span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-sans">
              {generatedText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
