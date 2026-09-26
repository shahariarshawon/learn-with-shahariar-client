"use client";

import React from "react";
import { LessonResource } from "@/types/learning.types";

interface ResourceListProps {
  resources?: LessonResource[];
  lessonTitle?: string;
}

const defaultResources: LessonResource[] = [
  {
    id: "res-1",
    title: "Lesson Cheat Sheet & Architecture Diagram",
    type: "pdf",
    url: "#",
    fileSize: "2.4 MB",
  },
  {
    id: "res-2",
    title: "Full Source Code Repository (GitHub)",
    type: "link",
    url: "https://github.com/shahariarshawon",
  },
  {
    id: "res-3",
    title: "Project Assets & Boilerplate (.zip)",
    type: "zip",
    url: "#",
    fileSize: "8.1 MB",
  },
];

export const ResourceList: React.FC<ResourceListProps> = ({
  resources = defaultResources,
  lessonTitle = "Current Lesson",
}) => {
  const items = resources && resources.length > 0 ? resources : defaultResources;

  const getIcon = (type: LessonResource["type"]) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "zip":
        return "📦";
      case "link":
        return "🔗";
      default:
        return "📁";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-lg font-bold text-slate-900">Lesson Resources & Downloads</h4>
          <p className="text-xs text-slate-500">Materials for {lessonTitle}</p>
        </div>
        <span className="rounded-full bg-[#7F265B]/10 px-3 py-1 text-xs font-bold text-[#7F265B]">
          {items.length} Files
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition hover:border-[#7F265B]/30 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getIcon(item.type)}</span>
              <div>
                <h5 className="text-sm font-bold text-slate-900">{item.title}</h5>
                <span className="text-xs text-slate-400">
                  {item.type.toUpperCase()} {item.fileSize ? `• ${item.fileSize}` : ""}
                </span>
              </div>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#7F265B] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] transition"
            >
              {item.type === "link" ? "Open Link ↗" : "Download 📥"}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;
