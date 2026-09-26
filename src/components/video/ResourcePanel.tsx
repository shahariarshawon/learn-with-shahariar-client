"use client";

import React, { useState } from "react";
import ResourceList from "@/components/learning/ResourceList";
import StudentNotes from "@/components/learning/StudentNotes";
import LessonBookmarks from "@/components/learning/LessonBookmarks";

interface ResourcePanelProps {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  description?: string;
  currentTimeSeconds?: number;
  onSeekTo?: (seconds: number) => void;
}

type TabType = "description" | "resources" | "notes" | "discussion";

export const ResourcePanel: React.FC<ResourcePanelProps> = ({
  courseId,
  lessonId,
  lessonTitle,
  description = "This lesson covers core concepts, architecture patterns, and enterprise software engineering principles.",
  currentTimeSeconds = 0,
  onSeekTo,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [discussionInput, setDiscussionInput] = useState("");
  const [discussions, setDiscussions] = useState<
    { id: string; author: string; content: string; time: string }[]
  >([
    {
      id: "disc-1",
      author: "Shahariar Shawon",
      content: "Feel free to post your questions about this lesson here! Happy learning.",
      time: "1 day ago",
    },
  ]);

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    setDiscussions([
      ...discussions,
      {
        id: `disc-${Date.now()}`,
        author: "Student",
        content: discussionInput.trim(),
        time: "Just now",
      },
    ]);
    setDiscussionInput("");
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6">
          {[
            { id: "description", label: "Description" },
            { id: "resources", label: "PDF & Resources" },
            { id: "notes", label: "Personal Notes" },
            { id: "discussion", label: "Discussion Q&A" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#7F265B] text-[#7F265B]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "description" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h4 className="text-lg font-bold text-slate-900">{lessonTitle}</h4>
            <p className="text-sm leading-relaxed text-slate-700">{description}</p>
          </div>
        )}

        {activeTab === "resources" && (
          <ResourceList lessonTitle={lessonTitle} />
        )}

        {activeTab === "notes" && (
          <StudentNotes
            courseId={courseId}
            lessonId={lessonId}
            lessonTitle={lessonTitle}
            currentTimeSeconds={currentTimeSeconds}
            onSeekTo={onSeekTo}
          />
        )}

        {activeTab === "discussion" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
            <h4 className="text-lg font-bold text-slate-900">Lesson Q&A Discussion</h4>

            <form onSubmit={handlePostDiscussion} className="space-y-3">
              <textarea
                rows={3}
                value={discussionInput}
                onChange={(e) => setDiscussionInput(e.target.value)}
                placeholder="Ask a question about this lesson or start a discussion..."
                className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-[#7F265B] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#6d214f] transition cursor-pointer"
                >
                  Post Question
                </button>
              </div>
            </form>

            <div className="space-y-3 pt-2">
              {discussions.map((d) => (
                <div key={d.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#7F265B]">{d.author}</span>
                    <span className="text-slate-400">{d.time}</span>
                  </div>
                  <p className="text-sm text-slate-700">{d.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePanel;
