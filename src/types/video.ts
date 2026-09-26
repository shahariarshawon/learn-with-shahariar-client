export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkProps {
  studentEmail?: string;
  intervalMs?: number;
  opacity?: number;
  className?: string;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMsg?: string;
}

export interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  courseId: string;
  lessonId: string;
  isEnrolled?: boolean;
  isPreviewFree?: boolean;
  onEnded?: () => void;
  onProgressUpdate?: (currentTimeSeconds: number, durationSeconds: number) => void;
}

export interface VideoProgressPayload {
  courseId: string;
  lectureId: string;
  watchedSeconds: number;
  totalDurationSeconds: number;
  isCompleted: boolean;
}
