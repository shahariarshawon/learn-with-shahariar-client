"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { useUser } from "@clerk/nextjs";
import { VideoPlayerProps } from "@/types/video";
import VideoWatermark from "./VideoWatermark";
import VideoAccessControl from "./VideoAccessControl";
import { useVideoStore } from "@/store/use-video-store";

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title,
  courseId,
  lessonId,
  isEnrolled = false,
  isPreviewFree = false,
  onEnded,
  onProgressUpdate,
}) => {
  const { user } = useUser();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const ytPlayerRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const playbackRate = useVideoStore((state) => state.playbackRate);
  const setPlaybackRate = useVideoStore((state) => state.setPlaybackRate);
  const volume = useVideoStore((state) => state.volume);
  const setVolume = useVideoStore((state) => state.setVolume);
  const isMuted = useVideoStore((state) => state.isMuted);
  const setIsMuted = useVideoStore((state) => state.setIsMuted);
  const updateTimeStore = useVideoStore((state) => state.updateTime);

  // Determine whether videoUrl is a direct HTML5 video stream or a YouTube URL
  const isDirectVideo =
    videoUrl &&
    (videoUrl.includes('.mp4') ||
      videoUrl.includes('.webm') ||
      videoUrl.includes('.ogg') ||
      videoUrl.startsWith('blob:') ||
      videoUrl.startsWith('data:video'));

  // Extract YouTube video ID if YouTube URL
  const getVideoId = (url: string) => {
    if (!url) return "dQw4w9WgXcQ";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "dQw4w9WgXcQ";
  };

  const videoId = !isDirectVideo ? getVideoId(videoUrl) : "";

  // YouTube Event Handlers
  const onYtReady: YouTubeProps["onReady"] = (event) => {
    ytPlayerRef.current = event.target;
    setIsLoading(false);
    setHasError(false);
    event.target.setPlaybackRate(playbackRate);
    event.target.setVolume(volume);
    setDuration(event.target.getDuration());
  };

  const onYtError: YouTubeProps["onError"] = () => {
    setIsLoading(false);
    setHasError(true);
    setErrorMsg("Failed to load video stream. Please check video URL or network connectivity.");
  };

  const onYtStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
    if (event.data === 0) {
      setIsPlaying(false);
      if (onEnded) onEnded();
    }
  };

  // HTML5 Video Event Handlers
  const handleHtml5LoadedMetadata = () => {
    if (videoElementRef.current) {
      setDuration(videoElementRef.current.duration || 0);
      videoElementRef.current.playbackRate = playbackRate;
      videoElementRef.current.volume = volume / 100;
      videoElementRef.current.muted = isMuted;
      setIsLoading(false);
      setHasError(false);
      videoElementRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleHtml5TimeUpdate = () => {
    if (videoElementRef.current) {
      const cur = videoElementRef.current.currentTime;
      const dur = videoElementRef.current.duration || duration;
      setCurrentTime(cur);
      updateTimeStore(cur, dur);
    }
  };

  const handleHtml5Ended = () => {
    setIsPlaying(false);
    if (onEnded) onEnded();
  };

  const handleHtml5Error = () => {
    setIsLoading(false);
    setHasError(true);
    setErrorMsg("Unable to load video format from stream source.");
  };

  // Periodic progress tracking every 10 seconds
  const reportProgress = useCallback(() => {
    let curTime = currentTime;
    let dur = duration;

    if (isDirectVideo && videoElementRef.current) {
      curTime = videoElementRef.current.currentTime;
      dur = videoElementRef.current.duration || 0;
    } else if (ytPlayerRef.current && typeof ytPlayerRef.current.getCurrentTime === "function") {
      curTime = ytPlayerRef.current.getCurrentTime();
      dur = ytPlayerRef.current.getDuration();
    }

    setCurrentTime(curTime);
    setDuration(dur);
    updateTimeStore(curTime, dur);

    if (onProgressUpdate && dur > 0) {
      onProgressUpdate(curTime, dur);
    }
  }, [currentTime, duration, isDirectVideo, onProgressUpdate, updateTimeStore]);

  useEffect(() => {
    const interval = setInterval(() => {
      reportProgress();
    }, 10000);

    return () => clearInterval(interval);
  }, [reportProgress]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    if (isDirectVideo && videoElementRef.current) {
      if (videoElementRef.current.paused) {
        videoElementRef.current.play();
        setIsPlaying(true);
      } else {
        videoElementRef.current.pause();
        setIsPlaying(false);
      }
    } else if (ytPlayerRef.current) {
      if (isPlaying) {
        ytPlayerRef.current.pauseVideo();
      } else {
        ytPlayerRef.current.playVideo();
      }
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (isDirectVideo && videoElementRef.current) {
      videoElementRef.current.playbackRate = rate;
    } else if (ytPlayerRef.current) {
      ytPlayerRef.current.setPlaybackRate(rate);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (isDirectVideo && videoElementRef.current) {
      videoElementRef.current.volume = vol / 100;
      videoElementRef.current.muted = vol === 0;
    } else if (ytPlayerRef.current) {
      ytPlayerRef.current.setVolume(vol);
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (isDirectVideo && videoElementRef.current) {
      videoElementRef.current.muted = newMuted;
    } else if (ytPlayerRef.current) {
      if (newMuted) {
        ytPlayerRef.current.mute();
      } else {
        ytPlayerRef.current.unMute();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    setCurrentTime(seekTime);
    if (isDirectVideo && videoElementRef.current) {
      videoElementRef.current.currentTime = seekTime;
    } else if (ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(seekTime, true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-2xl bg-black shadow-2xl border border-slate-800"
    >
      {/* ACCESS CONTROL OVERLAY */}
      <VideoAccessControl
        courseId={courseId}
        isEnrolled={isEnrolled}
        isPreviewFree={isPreviewFree}
      />

      {/* DYNAMIC MOVING WATERMARK */}
      {(isEnrolled || isPreviewFree) && (
        <VideoWatermark studentEmail={user?.primaryEmailAddress?.emailAddress} />
      )}

      {/* LOADING SPINNER */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/80">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7F265B] border-t-transparent" />
            <span className="text-xs font-semibold text-slate-300">Loading Secure Stream...</span>
          </div>
        </div>
      )}

      {/* ERROR FALLBACK */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950 p-6 text-center">
          <div className="space-y-2">
            <span className="text-3xl">⚠️</span>
            <h4 className="text-base font-bold text-red-500">Playback Error</h4>
            <p className="text-xs text-slate-400 max-w-sm">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* VIDEO PLAYER ELEMENT */}
      <div className="relative aspect-video w-full flex items-center justify-center bg-black">
        {isDirectVideo ? (
          <video
            ref={videoElementRef}
            src={videoUrl}
            onLoadedMetadata={handleHtml5LoadedMetadata}
            onTimeUpdate={handleHtml5TimeUpdate}
            onEnded={handleHtml5Ended}
            onError={handleHtml5Error}
            playsInline
            controls={false}
            className="h-full w-full object-contain cursor-pointer"
            onClick={togglePlay}
          />
        ) : (
          <YouTube
            videoId={videoId}
            onReady={onYtReady}
            onError={onYtError}
            onStateChange={onYtStateChange}
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
        )}
      </div>

      {/* CUSTOM OVERLAY CONTROL BAR */}
      <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        {/* Progress Bar Scrubber */}
        <div className="flex items-center gap-3 w-full">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 accent-[#7F265B] bg-white/20 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Play / Pause */}
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
              <button
                type="button"
                onClick={toggleMute}
                className="text-white/80 hover:text-white cursor-pointer text-xs"
              >
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
              {[0.75, 1, 1.25, 1.5, 2].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => handleSpeedChange(rate)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition cursor-pointer ${
                    playbackRate === rate
                      ? "bg-[#7F265B] text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {rate}x
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
    </div>
  );
};

export default VideoPlayer;
