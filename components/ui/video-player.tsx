"use client";

import * as React from "react";

type VideoPlayerProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src" | "poster"> & {
  src: string;
  poster?: string;
  eyebrow?: string;
  headline?: string;
};

type WebkitVideoElement = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ className = "", src, poster, eyebrow = "APERTE O PLAY", headline = "Veja o produto por dentro", ...props }, forwardedRef) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const hideControlsTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const [activated, setActivated] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isFullscreen, setIsFullscreen] = React.useState(false);
    const [controlsVisible, setControlsVisible] = React.useState(true);

    React.useImperativeHandle(forwardedRef, () => videoRef.current!, []);

    const clearHideTimer = React.useCallback(() => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current);
    }, []);

    const scheduleControlsHide = React.useCallback(() => {
      clearHideTimer();
      if (isPlaying) {
        hideControlsTimer.current = setTimeout(() => setControlsVisible(false), 2800);
      }
    }, [clearHideTimer, isPlaying]);

    const revealControls = () => {
      setControlsVisible(true);
      scheduleControlsHide();
    };

    const play = async () => {
      const video = videoRef.current;
      if (!video) return;

      setHasError(false);
      setIsLoading(true);
      if (!activated) {
        video.src = src;
        setActivated(true);
        video.load();
      }

      try {
        await video.play();
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };

    const togglePlay = () => {
      const video = videoRef.current;
      if (!video || video.paused) void play();
      else video.pause();
    };

    const skip = (seconds: number) => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = Math.max(0, Math.min(duration || 0, video.currentTime + seconds));
    };

    const toggleMute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = !video.muted;
    };

    const toggleFullscreen = async () => {
      const container = containerRef.current;
      const video = videoRef.current as WebkitVideoElement | null;
      if (!container || !video) return;

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (container.requestFullscreen) {
        await container.requestFullscreen();
      } else {
        video.webkitEnterFullscreen?.();
      }
    };

    React.useEffect(() => {
      const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
      document.addEventListener("fullscreenchange", onFullscreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", onFullscreenChange);
        clearHideTimer();
      };
    }, [clearHideTimer]);

    React.useEffect(() => {
      if (isPlaying) scheduleControlsHide();
      else clearHideTimer();
    }, [clearHideTimer, isPlaying, scheduleControlsHide]);

    const progress = duration ? (currentTime / duration) * 100 : 0;
    const volumeProgress = (isMuted ? 0 : volume) * 100;

    return (
      <div
        ref={containerRef}
        className={`video-player ${className}`.trim()}
        data-active={activated}
        data-playing={isPlaying}
        onPointerMove={revealControls}
        onPointerDown={revealControls}
        onMouseLeave={() => isPlaying && setControlsVisible(false)}
        onKeyDown={(event) => {
          if (event.key === " " || event.key.toLowerCase() === "k") {
            event.preventDefault();
            togglePlay();
          } else if (event.key.toLowerCase() === "m") {
            event.preventDefault();
            toggleMute();
          } else if (event.key.toLowerCase() === "f") {
            event.preventDefault();
            void toggleFullscreen();
          } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            skip(-10);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            skip(10);
          }
        }}
        tabIndex={0}
        aria-label="Player da apresentação dos Packs BrazHits"
      >
        <video
          ref={videoRef}
          poster={poster}
          preload="none"
          playsInline
          controls={false}
          onClick={togglePlay}
          onDoubleClick={() => void toggleFullscreen()}
          onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onPlaying={() => {
            setIsPlaying(true);
            setIsLoading(false);
            scheduleControlsHide();
          }}
          onPause={() => {
            setIsPlaying(false);
            setControlsVisible(true);
            clearHideTimer();
          }}
          onEnded={() => {
            setIsPlaying(false);
            setControlsVisible(true);
          }}
          onVolumeChange={(event) => {
            setVolume(event.currentTarget.volume);
            setIsMuted(event.currentTarget.muted);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />

        {!activated && (
          <div className="video-player-poster-copy" aria-hidden="true">
            <span>{eyebrow}</span>
            <strong>{headline}</strong>
          </div>
        )}

        {!isPlaying && !hasError && (
          <button className="video-player-main-play" type="button" onClick={() => void play()} aria-label="Reproduzir apresentação">
            <span aria-hidden="true" />
          </button>
        )}

        {isLoading && <span className="video-player-spinner" aria-label="Carregando vídeo" />}

        {hasError && (
          <div className="video-player-error" role="alert">
            <strong>Não foi possível carregar o vídeo.</strong>
            <button type="button" onClick={() => void play()}>Tentar novamente</button>
          </div>
        )}

        {activated && !hasError && (
          <div className={`video-player-controls ${controlsVisible || !isPlaying ? "is-visible" : ""}`}>
            <label className="video-player-progress">
              <span className="video-player-sr-only">Progresso do vídeo</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(event) => {
                  const nextTime = Number(event.currentTarget.value);
                  setCurrentTime(nextTime);
                  if (videoRef.current) videoRef.current.currentTime = nextTime;
                }}
                style={{ "--video-progress": `${progress}%` } as React.CSSProperties}
              />
            </label>

            <div className="video-player-control-row">
              <div className="video-player-control-group">
                <button type="button" onClick={() => skip(-10)} aria-label="Voltar 10 segundos"><span aria-hidden="true">−10</span></button>
                <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pausar" : "Reproduzir"}><span className={isPlaying ? "pause-icon" : "play-icon"} aria-hidden="true" /></button>
                <button type="button" onClick={() => skip(10)} aria-label="Avançar 10 segundos"><span aria-hidden="true">+10</span></button>
                <button type="button" onClick={toggleMute} aria-label={isMuted ? "Ativar som" : "Silenciar"}><span aria-hidden="true">{isMuted || volume === 0 ? "Som off" : "Som"}</span></button>
                <label className="video-player-volume">
                  <span className="video-player-sr-only">Volume</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(event) => {
                      const nextVolume = Number(event.currentTarget.value);
                      if (!videoRef.current) return;
                      videoRef.current.volume = nextVolume;
                      videoRef.current.muted = nextVolume === 0;
                    }}
                    style={{ "--video-progress": `${volumeProgress}%` } as React.CSSProperties}
                  />
                </label>
              </div>

              <span className="video-player-time">{formatTime(currentTime)} / {formatTime(duration)}</span>

              <button className="video-player-fullscreen" type="button" onClick={() => void toggleFullscreen()} aria-label={isFullscreen ? "Sair da tela cheia" : "Abrir em tela cheia"}>
                <span aria-hidden="true">{isFullscreen ? "↙" : "↗"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
);

VideoPlayer.displayName = "VideoPlayer";
