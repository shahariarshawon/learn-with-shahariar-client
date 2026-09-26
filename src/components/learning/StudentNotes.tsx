"use client";

import React, { useState } from "react";
import { useStudentLearningStore } from "@/store/use-student-learning-store";
import { StudentNote } from "@/types/learning.types";

interface StudentNotesProps {
  courseId: string;
  lessonId: string;
  lessonTitle: string;
  currentTimeSeconds?: number;
  onSeekTo?: (seconds: number) => void;
}

export const StudentNotes: React.FC<StudentNotesProps> = ({
  courseId,
  lessonId,
  lessonTitle,
  currentTimeSeconds = 0,
  onSeekTo,
}) => {
  const notesMap = useStudentLearningStore((state) => state.notes);
  const addNote = useStudentLearningStore((state) => state.addNote);
  const editNote = useStudentLearningStore((state) => state.editNote);
  const deleteNote = useStudentLearningStore((state) => state.deleteNote);

  const [noteContent, setNoteContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const courseNotes = notesMap[courseId] || [];
  const lessonNotes = courseNotes.filter((n) => n.lessonId === lessonId);

  const formatTimestamp = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    addNote({
      courseId,
      lessonId,
      lessonTitle,
      timestampSeconds: Math.floor(currentTimeSeconds),
      timestampFormatted: formatTimestamp(currentTimeSeconds),
      content: noteContent.trim(),
    });

    setNoteContent("");
  };

  const handleSaveEdit = (noteId: string) => {
    if (!editingContent.trim()) return;
    editNote(courseId, noteId, editingContent.trim());
    setEditingNoteId(null);
    setEditingContent("");
  };

  return (
    <div className="space-y-6">
      {/* Create Note Input */}
      <form onSubmit={handleAddNote} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900">
            Add Note at <span className="font-mono text-[#7F265B] bg-[#7F265B]/10 px-2 py-0.5 rounded">{formatTimestamp(currentTimeSeconds)}</span>
          </label>
          <span className="text-xs text-slate-400">Personal & Private</span>
        </div>

        <textarea
          rows={3}
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder='e.g. "useEffect runs after component renders to handle side effects"'
          className="w-full rounded-xl border border-slate-200 p-3 text-sm font-medium focus:border-[#7F265B] focus:outline-none"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-[#7F265B] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#6d214f] transition cursor-pointer"
          >
            + Save Note
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-3">
        <h4 className="text-base font-bold text-slate-900">Your Notes for this Lesson ({lessonNotes.length})</h4>

        {lessonNotes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
            No notes saved for this lesson yet. Type a note above to record your key takeaways!
          </div>
        ) : (
          lessonNotes.map((note) => (
            <div
              key={note.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2 hover:border-[#7F265B]/30 transition"
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onSeekTo && onSeekTo(note.timestampSeconds)}
                  className="font-mono text-xs font-bold text-[#7F265B] bg-[#7F265B]/10 px-2 py-0.5 rounded hover:bg-[#7F265B] hover:text-white transition cursor-pointer"
                >
                  ⏱️ {note.timestampFormatted}
                </button>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNoteId(note.id);
                      setEditingContent(note.content);
                    }}
                    className="text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(courseId, note.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingNoteId === note.id ? (
                <div className="space-y-2 pt-1">
                  <textarea
                    rows={2}
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingNoteId(null)}
                      className="px-3 py-1 text-xs text-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEdit(note.id)}
                      className="rounded bg-[#7F265B] px-3 py-1 text-xs font-bold text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-700">{note.content}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentNotes;
