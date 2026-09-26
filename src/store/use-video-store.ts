import { create } from "zustand";
import { persist } from "zustand/middleware";

interface VideoState {
  playbackRate: number;
  volume: number;
  isMuted: boolean;
  activeVideoUrl: string | null;
  activeLessonId: string | null;
  currentTime: number;
  duration: number;

  // Actions
  setPlaybackRate: (rate: number) => void;
  setVolume: (vol: number) => void;
  setIsMuted: (muted: boolean) => void;
  setActiveVideo: (url: string | null, lessonId: string | null) => void;
  updateTime: (currentTime: number, duration: number) => void;
}

export const useVideoStore = create<VideoState>()(
  persist(
    (set) => ({
      playbackRate: 1,
      volume: 100,
      isMuted: false,
      activeVideoUrl: null,
      activeLessonId: null,
      currentTime: 0,
      duration: 0,

      setPlaybackRate: (rate) => set({ playbackRate: rate }),
      setVolume: (vol) => set({ volume: vol, isMuted: vol === 0 }),
      setIsMuted: (muted) => set({ isMuted: muted }),
      setActiveVideo: (url, lessonId) =>
        set({ activeVideoUrl: url, activeLessonId: lessonId, currentTime: 0 }),
      updateTime: (currentTime, duration) => set({ currentTime, duration }),
    }),
    {
      name: "lws-video-store",
    }
  )
);

export default useVideoStore;
