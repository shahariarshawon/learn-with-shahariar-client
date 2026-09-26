"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, X, Code2, Loader2, Minimize2, Maximize2 } from "lucide-react";
import { AIService } from "@/services/ai.service";
import { AIMessage } from "@/types/ai.types";

interface CourseAIChatProps {
  courseId: string;
  courseTitle: string;
  currentLessonTitle?: string;
  onClose?: () => void;
  isEmbedded?: boolean;
}

export default function CourseAIChat({
  courseId,
  courseTitle,
  currentLessonTitle,
  onClose,
  isEmbedded = false,
}: CourseAIChatProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "init-1",
      sender: "assistant",
      text: `Hi! I'm your AI Tutor for **${courseTitle}**${
        currentLessonTitle ? ` (currently studying: *${currentLessonTitle}*)` : ""
      }. Ask me any question, code snippet explanation, or debugging tip!`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input.trim();
    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await AIService.askTutor(
        userText,
        `${courseTitle} ${currentLessonTitle ? `- Lesson: ${currentLessonTitle}` : ""}`
      );

      const aiMsg: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: response.text,
        codeSnippets: response.codeSnippets,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Tutor error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          text: "I apologize, but I encountered a momentary connection issue. Please try asking your question again!",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div
      className={`flex flex-col bg-slate-900 border border-purple-900/40 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isEmbedded
          ? "w-full h-full min-h-[500px]"
          : isExpanded
          ? "fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[600px] h-[75vh]"
          : "w-full max-w-md h-[550px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-950 via-slate-900 to-[#7F265B] border-b border-purple-900/40">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              AI Tutor Assistant
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30 font-mono">
                GPT-4o LMS
              </span>
            </h3>
            <p className="text-xs text-slate-300 truncate max-w-[200px] sm:max-w-[280px]">
              {currentLessonTitle || courseTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {!isEmbedded && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/70 text-slate-200 custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-700 to-[#7F265B] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                  isUser
                    ? "bg-[#7F265B] text-white rounded-tr-none"
                    : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>

                {/* Optional Code Block */}
                {msg.codeSnippets?.map((snippet, idx) => (
                  <div key={idx} className="mt-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-purple-400">
                      <span className="flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" />
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="p-3 text-[11px] font-mono text-slate-300 overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                ))}

                <span
                  className={`block text-[10px] mt-2 text-right ${
                    isUser ? "text-purple-200/70" : "text-slate-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-3 text-slate-400 text-xs py-2">
            <div className="w-8 h-8 rounded-full bg-purple-900/40 flex items-center justify-center text-purple-300 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
              <span>AI Tutor is formulating answer...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar text-xs">
        <button
          onClick={() => setInput("Explain this lesson concept simply")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-900/40 text-slate-300 border border-slate-700 hover:border-purple-500/40 transition-colors text-[11px]"
        >
          💡 Explain simply
        </button>
        <button
          onClick={() => setInput("Give me a practical code snippet example")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-900/40 text-slate-300 border border-slate-700 hover:border-purple-500/40 transition-colors text-[11px]"
        >
          💻 Code example
        </button>
        <button
          onClick={() => setInput("What are common interview questions for this topic?")}
          className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-900/40 text-slate-300 border border-slate-700 hover:border-purple-500/40 transition-colors text-[11px]"
        >
          🎯 Interview Prep
        </button>
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-purple-900/40 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI Tutor anything..."
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-90 disabled:opacity-50 text-white rounded-lg font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Ask</span>
        </button>
      </form>
    </div>
  );
}
