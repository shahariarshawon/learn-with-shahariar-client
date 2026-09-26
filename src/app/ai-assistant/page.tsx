"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  User,
  Send,
  Plus,
  History,
  Code2,
  Compass,
  HelpCircle,
  Trash2,
  ChevronRight,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { useAIStore } from "@/store/use-ai-store";
import { AIService } from "@/services/ai.service";
import AIRoadmapGenerator from "@/components/ai/AIRoadmapGenerator";
import AIQuizGenerator from "@/components/ai/AIQuizGenerator";

export default function AIAssistantPage() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    createConversation,
    addMessage,
    deleteConversation,
    getConversationById,
  } = useAIStore();

  const [activeTab, setActiveTab] = useState<"chat" | "roadmap" | "quiz">("chat");
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const activeConv = getConversationById(activeConversationId || "") || conversations[0];

  const handleNewChat = () => {
    const newId = createConversation("New Learning Session");
    setActiveConversation(newId);
    setActiveTab("chat");
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isThinking || !activeConv) return;

    const userText = input.trim();
    setInput("");

    // Add user message
    addMessage(activeConv.id, {
      sender: "user",
      text: userText,
    });

    setIsThinking(true);

    try {
      const response = await AIService.askTutor(userText, activeConv.courseTitle);
      addMessage(activeConv.id, {
        sender: "assistant",
        text: response.text,
        codeSnippets: response.codeSnippets,
      });
    } catch (err) {
      console.error("AI Error:", err);
      addMessage(activeConv.id, {
        sender: "assistant",
        text: "I ran into a temporary issue connecting to the AI tutor. Please try submitting your question again!",
      });
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner Navigation */}
      <div className="border-b border-purple-900/40 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-700 via-[#7F265B] to-purple-600 text-white shadow-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              Learn With Shahariar AI Tutor
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-mono">
                v2.5 Pro
              </span>
            </h1>
            <p className="text-xs text-slate-400">Intelligent pair tutor, coding mentor, and career roadmap architect</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Toggle Tabs */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "chat" ? "bg-[#7F265B] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Tutor Chat</span>
            </button>

            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "roadmap" ? "bg-[#7F265B] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Career Roadmap</span>
            </button>

            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === "quiz" ? "bg-[#7F265B] text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz Generator</span>
            </button>
          </div>

          <Link
            href="/ai-assistant/history"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg border border-slate-800 transition-colors flex items-center gap-1 text-xs"
            title="Conversation History"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </Link>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 lg:p-6 gap-6 overflow-hidden">
        {/* Chat Sidebar (Sessions List) */}
        {activeTab === "chat" && (
          <aside className="w-64 lg:w-72 shrink-0 hidden md:flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-3 h-[calc(100vh-140px)]">
            <button
              onClick={handleNewChat}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-95 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all mb-3"
            >
              <Plus className="w-4 h-4" />
              <span>New AI Tutor Session</span>
            </button>

            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
              Recent Conversations
            </div>

            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-1">
              {conversations.map((conv) => {
                const isActive = conv.id === activeConv?.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveConversation(conv.id)}
                    className={`group flex items-center justify-between p-2.5 rounded-lg text-xs cursor-pointer transition-all border ${
                      isActive
                        ? "bg-purple-950/60 border-purple-500/50 text-white font-medium"
                        : "bg-slate-950/40 border-transparent text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-purple-400" : "text-slate-500"}`} />
                      <span className="truncate">{conv.title}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteConversation(conv.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-1 transition-opacity"
                      title="Delete thread"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Dynamic Display Area */}
        <main className="flex-1 flex flex-col h-[calc(100vh-140px)] min-h-[550px]">
          {activeTab === "roadmap" && (
            <div className="overflow-y-auto pr-1">
              <AIRoadmapGenerator />
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="overflow-y-auto pr-1">
              <AIQuizGenerator />
            </div>
          )}

          {activeTab === "chat" && activeConv && (
            <div className="flex-1 flex flex-col bg-slate-900 border border-purple-900/40 rounded-xl overflow-hidden shadow-2xl">
              {/* Active Conversation Sub-header */}
              <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white">{activeConv.title}</h2>
                  {activeConv.courseTitle && (
                    <span className="text-xs text-purple-400 font-mono">Course: {activeConv.courseTitle}</span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500">
                  {new Date(activeConv.updatedAt).toLocaleDateString()}
                </span>
              </div>

              {/* Messages Stream */}
              <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-slate-950/60 custom-scrollbar">
                {activeConv.messages.map((msg) => {
                  const isUser = msg.sender === "user";
                  return (
                    <div key={msg.id} className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}>
                      {!isUser && (
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-[#7F265B] to-purple-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-purple-400/30">
                          <Bot className="w-5 h-5" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] lg:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                          isUser
                            ? "bg-[#7F265B] text-white rounded-tr-none"
                            : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.text}</p>

                        {/* Snippets */}
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
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isThinking && (
                  <div className="flex items-center gap-3 text-slate-400 text-xs py-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 animate-pulse">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      <span>AI Tutor is thinking & generating explanation...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Prompts Bar */}
              <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex gap-2 overflow-x-auto no-scrollbar">
                {[
                  "Explain React 19 Actions",
                  "What is Server-Side Rendering?",
                  "How do I optimize SQL queries with Prisma?",
                  "Show Next.js Middleware example",
                ].map((promptText) => (
                  <button
                    key={promptText}
                    onClick={() => setInput(promptText)}
                    className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-950 hover:bg-purple-900/40 text-slate-300 border border-slate-800 hover:border-purple-500/40 text-[11px] transition-colors"
                  >
                    💡 {promptText}
                  </button>
                ))}
              </div>

              {/* Input Form Bar */}
              <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 border-t border-purple-900/40 flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask AI Tutor any technical question..."
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="px-5 py-3 bg-gradient-to-r from-purple-600 to-[#7F265B] hover:opacity-95 disabled:opacity-50 text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
