"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, HelpCircle, RefreshCw, Layers } from "lucide-react";
import { AIService } from "@/services/ai.service";
import { GeneratedQuizQuestion } from "@/types/ai.types";

interface AIQuizGeneratorProps {
  lessonTitle?: string;
  onSaveQuestions?: (questions: GeneratedQuizQuestion[]) => void;
}

export default function AIQuizGenerator({ lessonTitle = "", onSaveQuestions }: AIQuizGeneratorProps) {
  const [topic, setTopic] = useState(lessonTitle || "React 19 Server Components");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [questionCount, setQuestionCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<GeneratedQuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setSubmitted(false);
    setUserAnswers({});

    try {
      const generated = await AIService.generateQuiz({
        lessonTitle: topic,
        topic,
        difficulty,
        questionCount,
      });
      setQuestions(generated);
    } catch (err) {
      console.error("AI Quiz Generator error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  return (
    <div className="bg-slate-900 border border-purple-900/40 rounded-xl p-6 shadow-xl text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">AI Quiz & MCQ Generator</h3>
            <p className="text-xs text-slate-400">Instantly construct assessment questions tuned to your lesson topic</p>
          </div>
        </div>
        <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-mono">
          Smart Assessment
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="sm:col-span-1">
          <label className="block text-xs font-medium text-slate-300 mb-1">Lesson Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Next.js App Router"
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Question Count</label>
          <select
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
          >
            <option value={2}>2 Questions</option>
            <option value={3}>3 Questions</option>
            <option value={5}>5 Questions</option>
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        disabled={!topic.trim() || isGenerating}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mb-6"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
            <span>AI is generating multiple choice questions...</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            <span>Generate MCQ Quiz</span>
          </>
        )}
      </button>

      {/* Questions Preview & Interactive Test */}
      {questions.length > 0 && (
        <div className="space-y-6 bg-slate-950 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Generated Quiz Preview ({questions.length} Questions)
            </span>
            {onSaveQuestions && (
              <button
                type="button"
                onClick={() => onSaveQuestions(questions)}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded font-medium transition-colors"
              >
                Save Quiz to Course
              </button>
            )}
          </div>

          <div className="space-y-5">
            {questions.map((q, idx) => (
              <div key={q.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-start gap-2">
                  <span className="text-purple-400 font-mono">Q{idx + 1}.</span>
                  <span>{q.question}</span>
                </h4>

                <div className="grid grid-cols-1 gap-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAnswers[q.id] === oIdx;
                    const isCorrect = q.correctAnswerIndex === oIdx;

                    let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800";
                    if (submitted) {
                      if (isCorrect) btnStyle = "bg-emerald-950/70 border-emerald-500 text-emerald-300 font-medium";
                      else if (isSelected) btnStyle = "bg-rose-950/70 border-rose-500 text-rose-300";
                    } else if (isSelected) {
                      btnStyle = "bg-purple-900/50 border-purple-500 text-white";
                    }

                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>
                          <span className="font-mono text-slate-500 mr-2">[{String.fromCharCode(65 + oIdx)}]</span>
                          {opt}
                        </span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 p-3 bg-purple-950/40 border border-purple-800/40 rounded text-xs text-purple-200">
                    <span className="font-semibold text-purple-300">Explanation: </span>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Test Submit Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {submitted ? (
              <div className="text-xs sm:text-sm font-medium text-slate-200">
                Score: <span className="text-purple-400 font-bold">{calculateScore()}</span> / {questions.length} correct
              </div>
            ) : (
              <span className="text-xs text-slate-400">Select answers to test your knowledge</span>
            )}

            <button
              type="button"
              onClick={() => setSubmitted(!submitted)}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              {submitted ? "Retake Test" : "Check Quiz Answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
