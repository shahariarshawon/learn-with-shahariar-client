import { create } from "zustand";

interface UiState {
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) =>
    set((state) => ({
      isSidebarCollapsed:
        typeof collapsed === "function" ? collapsed(state.isSidebarCollapsed) : collapsed,
    })),
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
