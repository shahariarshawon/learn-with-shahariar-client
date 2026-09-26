import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AIConversation, AIMessage, AIRoadmapPlan } from "@/types/ai.types";

interface AIState {
  conversations: AIConversation[];
  activeConversationId: string | null;
  savedRoadmaps: AIRoadmapPlan[];
  
  // Actions
  setActiveConversation: (id: string | null) => void;
  createConversation: (title: string, courseId?: string, courseTitle?: string) => string;
  addMessage: (conversationId: string, message: Omit<AIMessage, "id" | "timestamp">) => void;
  deleteConversation: (id: string) => void;
  clearAllConversations: () => void;
  saveRoadmap: (plan: AIRoadmapPlan) => void;
  getConversationById: (id: string) => AIConversation | undefined;
}

const INITIAL_CONVERSATIONS: AIConversation[] = [
  {
    id: "conv-1",
    title: "Understanding React 19 Actions & Server Components",
    messages: [
      {
        id: "msg-1",
        sender: "user",
        text: "How do React 19 server actions simplify form submission handling?",
        timestamp: "2026-09-26T10:00:00.000Z",
      },
      {
        id: "msg-2",
        sender: "assistant",
        text: "React 19 Server Actions allow you to pass async functions directly to form submit handlers or submit buttons without manually creating API route handlers or state-heavy event handlers. Combined with `useActionState` and `useFormStatus`, form state management becomes declarative and server-rendered.",
        timestamp: "2026-09-26T10:00:05.000Z",
        codeSnippets: [
          {
            language: "typescript",
            code: `'use server';\n\nexport async function updateProfile(formData: FormData) {\n  const name = formData.get('name');\n  await db.user.update({ where: { id: 1 }, data: { name } });\n}`,
          },
        ],
      },
    ],
    createdAt: "2026-09-26T10:00:00.000Z",
    updatedAt: "2026-09-26T10:00:05.000Z",
  },
  {
    id: "conv-2",
    title: "Next.js App Router Architecture Best Practices",
    courseId: "fullstack-next-masterclass",
    courseTitle: "Fullstack Next.js 15 Masterclass",
    messages: [
      {
        id: "msg-3",
        sender: "user",
        text: "When should I use Client Components vs Server Components in Next.js 15?",
        timestamp: "2026-09-25T14:30:00.000Z",
      },
      {
        id: "msg-4",
        sender: "assistant",
        text: "Default to Server Components (`RSC`) for data fetching, heavy dependency imports, and direct database access. Switch to Client Components (`'use client'`) only when you need interactive hooks (`useState`, `useEffect`), event handlers (`onClick`, `onChange`), or browser APIs (`window`, `localStorage`).",
        timestamp: "2026-09-25T14:30:08.000Z",
      },
    ],
    createdAt: "2026-09-25T14:30:00.000Z",
    updatedAt: "2026-09-25T14:30:08.000Z",
  },
];

export const useAIStore = create<AIState>()(
  persist(
    (set, get) => ({
      conversations: INITIAL_CONVERSATIONS,
      activeConversationId: "conv-1",
      savedRoadmaps: [],

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },

      createConversation: (title, courseId, courseTitle) => {
        const newId = `conv-${Date.now()}`;
        const newConv: AIConversation = {
          id: newId,
          title: title || "New AI Tutorial Session",
          courseId,
          courseTitle,
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: "assistant",
              text: `Hello! I am your AI Learning Assistant for ${courseTitle ? `"${courseTitle}"` : "Learn With Shahariar"}. How can I assist you with your coding journey today?`,
              timestamp: new Date().toISOString(),
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          conversations: [newConv, ...state.conversations],
          activeConversationId: newId,
        }));

        return newId;
      },

      addMessage: (conversationId, messageData) => {
        const newMessage: AIMessage = {
          ...messageData,
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          timestamp: new Date().toISOString(),
        };

        set((state) => ({
          conversations: state.conversations.map((conv) => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                messages: [...conv.messages, newMessage],
                updatedAt: new Date().toISOString(),
              };
            }
            return conv;
          }),
        }));
      },

      deleteConversation: (id) => {
        set((state) => {
          const filtered = state.conversations.filter((c) => c.id !== id);
          const nextActive = state.activeConversationId === id ? (filtered[0]?.id || null) : state.activeConversationId;
          return {
            conversations: filtered,
            activeConversationId: nextActive,
          };
        });
      },

      clearAllConversations: () => {
        set({ conversations: [], activeConversationId: null });
      },

      saveRoadmap: (plan) => {
        set((state) => ({
          savedRoadmaps: [plan, ...state.savedRoadmaps.filter((r) => r.goal !== plan.goal)],
        }));
      },

      getConversationById: (id) => {
        return get().conversations.find((c) => c.id === id);
      },
    }),
    {
      name: "lws-ai-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
