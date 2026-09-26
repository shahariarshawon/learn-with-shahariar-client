"use client";

import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useStudentLearningStore } from "@/store/use-student-learning-store";
import { useUser } from "@clerk/nextjs";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onEnded?: () => void;
  onTimeUpdate?: (currentTimeSeconds: number) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  onEnded,
  onTimeUpdate,
}) => {
  const { user } = useUser();
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const playbackSpeed = useStudentLearningStore((state) => state.playbackSpeed);
  const setPlaybackSpeed = useStudentLearningStore((state) => state.setPlaybackSpeed);

  // Extract YouTube video ID
  const getVideoId = (url: string) => {
    if (!url) return "dQw4w9WgXcQ";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ";
  };

  const videoId = getVideoId(videoUrl);

  const onPlayerReady = (event: any) => {
    playerRef.current = event.target;
    event.target.setPlaybackRate(playbackSpeed);
    setDuration(event.target.getDuration());
  };

  const onPlayerStateChange = (event: any) => {
    // 1: PLAYING, 2: PAUSED, 0: ENDED
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
    if (event.data === 0) {
      setIsPlaying(false);
      if (onEnded) onEnded();
    }
  };

  // Periodic time updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        if (onTimeUpdate) onTimeUpdate(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onTimeUpdate]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (playerRef.current) {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.setVolume(newVol);
      if (newVol === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const studentIdentity = user?.primaryEmailAddress?.emailAddress || user?.fullName || "LearnWithShahariar-Student";

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl bg-black shadow-xl"
    >
      {/* SECURITY WATERMARK ARCHITECTURE OVERLAY */}
      <div className="pointer-events-none absolute right-4 top-4 z-20 select-none rounded-lg bg-black/40 px-3 py-1 font-mono text-[11px] text-white/40 backdrop-blur-xs">
        {studentIdentity} • LWS-PROTECTED
      </div>

      {/* VIDEO CONTAINER */}
      <div className="relative aspect-video w-full">
        <YouTube
          videoId={videoId}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
            },
          }}
          className="h-full w-full"
          iframeClassName="w-full h-full aspect-video"
        />
      </div>

      {/* CUSTOM OVERLAY CONTROL BAR */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition cursor-pointer"
          >
            {isPlaying ? (
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleMute} className="text-white/80 hover:text-white cursor-pointer">
              {isMuted || volume === 0 ? "🔇" : "🔊"}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-[#7F265B] cursor-pointer"
            />
          </div>

          {/* Time Counter */}
          <span className="text-xs font-mono text-white/80">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Playback Speed Selector */}
          <div className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-xs">
            {[0.75, 1, 1.25, 1.5, 2].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => handleSpeedChange(speed)}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition ${
                  playbackSpeed === speed
                    ? "bg-[#7F265B] text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="text-white/80 hover:text-white text-sm cursor-pointer p-1"
          >
            {isFullscreen ? "↙" : "⛶"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
