"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  History,
  Search,
  Trash2,
  ArrowLeft,
  MessageSquare,
  ChevronRight,
  Bot,
  User,
  Calendar,
} from "lucide-react";
import { useAIStore } from "@/store/use-ai-store";

export default function AIHistoryPage() {
  const { conversations, deleteConversation, clearAllConversations, setActiveConversation } = useAIStore();
  const [search, setSearch] = useState("");
  const [selectedConvId, setSelectedConvId] = useState<string | null>(conversations[0]?.id || null);

  const filteredConversations = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(search.toLowerCase()))
  );

  const activeConv = conversations.find((c) => c.id === selectedConvId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Navbar Header */}
      <header className="border-b border-purple-900/40 bg-slate-900 px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/ai-assistant"
            className="p-2 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold text-white">AI Conversation History</h1>
          </div>
        </div>

        {conversations.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to clear all conversation history?")) {
                clearAllConversations();
              }
            }}
            className="px-3 py-1.5 bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All History</span>
          </button>
        )}
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Search & Session List */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900 border border-slate-800 rounded-xl p-4 h-[calc(100vh-140px)]">
          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chat history by topic or keywords..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-purple-500 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
            />
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar pr-1">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                No matching AI conversations found.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                      isSelected
                        ? "bg-purple-950/60 border-purple-500/60 text-white shadow-md"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-semibold text-white line-clamp-1 flex-1 pr-2">{conv.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteConversation(conv.id);
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1"
                        title="Delete session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-purple-400" />
                        {conv.messages.length} Messages
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3" />
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Log Detail View */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-[calc(100vh-140px)]">
          {activeConv ? (
            <>
              <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">{activeConv.title}</h2>
                  <p className="text-xs text-slate-400">
                    Session Started: {new Date(activeConv.createdAt).toLocaleString()}
                  </p>
                </div>
                <Link
                  href="/ai-assistant"
                  onClick={() => setActiveConversation(activeConv.id)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>Continue Session</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 bg-slate-950 p-4 rounded-xl custom-scrollbar border border-slate-800">
                {activeConv.messages.map((msg) => (
                  <div key={msg.id} className="space-y-1 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 font-semibold">
                      {msg.sender === "user" ? (
                        <span className="text-purple-400 flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> You:
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5" /> AI Tutor:
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 font-normal">
                        ({new Date(msg.timestamp).toLocaleTimeString()})
                      </span>
                    </div>
                    <p className="pl-5 text-slate-300 whitespace-pre-line leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-xs">
              <MessageSquare className="w-8 h-8 text-slate-600 mb-2" />
              <span>Select a conversation thread to inspect detailed transcript logs.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
