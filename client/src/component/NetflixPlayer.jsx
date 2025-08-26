import React, { useRef, useState, useEffect, useMemo } from "react";
import trailer_webm from "../assets/HhesaQXLuRY.webm";

/**
 * Netflix-inspired custom video player
 * - Responsive layout, Netflix-like UI (colors/spacing)
 * - Keyboard shortcuts: Space (play/pause), ←/→ (seek 10s), M (mute), F (fullscreen), K (play/pause), J/L (seek)
 * - Auto-hide controls after inactivity (desktop + mobile tap)
 * - Buffering spinner + error fallback
 * - Captions (WebVTT) support
 * - Playback speed control
 * - Basic quality switcher (switches source, preserves current time)
 *
 * Props:
 *   title, year, rating, description: strings
 *   poster: string
 *   sources: [{ src: string, type?: string, label?: string }]  // label used for quality menu
 *   captions?: { src: string, srclang?: string, label?: string, default?: boolean }
 */
export default function NetflixPlayer({
  title = "Breaking Bad",
  year = "2008",
  rating = "TV-MA",
  description = "This is a sample description for a Netflix-style player page.",
  poster = "/assets/poster.jpg",
  // by default we provide one source; you can pass multiple for quality options
  sources = [{ src: trailer_webm, type: "video/webm", label: "Auto" }],
  captions = null,
}) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0); // percent 0..100
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [buffering, setBuffering] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [errorText, setErrorText] = useState("");

  // Normalize/validate sources
  const activeSource = useMemo(() => {
    const idx = Math.min(Math.max(sourceIndex, 0), Math.max(0, sources.length - 1));
    return sources[idx] || sources[0];
  }, [sourceIndex, sources]);

  // Auto-hide controls after inactivity
  useEffect(() => {
    if (!showControls) return;
    const t = setTimeout(() => setShowControls(false), 2500);
    return () => clearTimeout(t);
  }, [showControls, playing, progress]);

  // Attach basic media event listeners
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      const pct = (v.currentTime / (v.duration || 1)) * 100;
      setProgress(isFinite(pct) ? pct : 0);
    };
    const onLoaded = () => {
      setDuration(v.duration || 0);
      setErrorText("");
    };
    const onWaiting = () => setBuffering(true);
    const onPlaying = () => setBuffering(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onError = () => {
      setErrorText("Unable to load video. Please try again.");
      setBuffering(false);
    };

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("waiting", onWaiting);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);
    v.addEventListener("error", onError);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("waiting", onWaiting);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("error", onError);
    };
  }, [activeSource]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target && e.target.tagName) || "";
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;

      if (e.code === "Space" || e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "f") toggleFullscreen();
      else if (e.key.toLowerCase() === "m") toggleMute();
      else if (e.key === "ArrowRight" || e.key.toLowerCase() === "l") seek(10);
      else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "j") seek(-10);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  // Fullscreen change listener
  useEffect(() => {
    const onFull = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFull);
    return () => document.removeEventListener("fullscreenchange", onFull);
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
    setShowControls(true);
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowControls(true);
  }

  function onVolumeChange(e) {
    const v = videoRef.current;
    if (!v) return;
    const val = Number(e.target.value);
    v.volume = val;
    setVolume(val);
    setMuted(val === 0);
    setShowControls(true);
  }

  function seek(delta) {
    const v = videoRef.current;
    if (!v) return;
    const next = Math.max(0, Math.min((v.duration || 0), v.currentTime + delta));
    v.currentTime = next;
    setShowControls(true);
  }

  function onSeekClick(e) {
    const bar = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - bar.left) / bar.width;
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = pct * v.duration;
    setShowControls(true);
  }

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    setShowControls(true);
  }

  function formatTime(t) {
    if (!t || !isFinite(t)) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  }

  // Playback speed
  function onSpeedChange(e) {
    const v = videoRef.current;
    if (!v) return;
    const s = Number(e.target.value);
    v.playbackRate = s;
    setSpeed(s);
    setShowControls(true);
  }

  // Switch quality/source, keep time and play state
  async function onSourceChange(e) {
    const idx = Number(e.target.value);
    const v = videoRef.current;
    if (!v || !sources[idx]) {
      setSourceIndex(idx);
      return;
    }
    const wasPlaying = !v.paused;
    const t = v.currentTime || 0;

    setSourceIndex(idx);
    // Wait next tick so video element updates src
    setTimeout(() => {
      const nv = videoRef.current;
      if (!nv) return;
      nv.pause();
      nv.load();
      nv.currentTime = Math.min(t, nv.duration || t);
      if (wasPlaying) nv.play().catch(() => {});
    }, 0);
  }

  // Tap/click surface to toggle controls on mobile
  function onSurfaceClick() {
    setShowControls((s) => !s);
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black relative select-none overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onClick={onSurfaceClick}
      role="region"
      aria-label="Video Player"
    >
      {/* Video + gradient overlay */}
      <div className="absolute inset-0 z-0">
        <video
          key={activeSource?.src} // force reload when source changes
          ref={videoRef}
          className="w-full h-full object-cover brightness-75"
          src={activeSource?.src}
          poster={poster}
          controls={false}
          playsInline
          preload="auto"
        >
          {captions ? (
            <track
              src={captions.src}
              kind="subtitles"
              srcLang={captions.srclang || "en"}
              label={captions.label || "English"}
              default={!!captions.default}
            />
          ) : null}
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
      </div>

      {/* Buffering spinner */}
      {buffering && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white" />
        </div>
      )}

      {/* Error state */}
      {errorText && (
        <div className="absolute inset-x-0 top-24 z-30 mx-auto max-w-md text-center bg-red-600/20 border border-red-600/50 text-white px-4 py-3 rounded">
          {errorText}
        </div>
      )}

      {/* Top bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => window.history.back()}
            aria-label="Back"
            className="bg-black/50 hover:text-gray-300/80 text-white rounded-lg cursor-pointer px-3 py-1"
          >
            Back
          </button>
          <div className="text-white font-bold text-lg">
            {title}{" "}
            <span className="text-sm font-normal text-white/70">({year})</span>
          </div>
        </div>
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="px-2 py-0.5 border border-white/30 rounded text-xs text-white/80">
            {rating}
          </div>
        </div>
      </div>

      {/* Big center play button */}
      {!playing && !buffering && !errorText && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            aria-label="Play"
            className="pointer-events-auto text-white bg-black/40 hover:bg-black/30 p-3 px-4 pr-4 rounded-4xl flex items-center opacity-80 text-2xl"
          >
            ▶ 
          </button>
        </div>
      )}

      {/* Bottom controls */}
      <div
        className={`absolute left-0 right-0 bottom-0 z-40 transition-all duration-200 ease-in-out ${
          showControls ? "translate-y-0" : "translate-y-28"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seek bar */}
        <div className="px-6 pb-2">
          <div
            className="w-full h-2 bg-white/20 rounded cursor-pointer"
            onClick={onSeekClick}
            role="slider"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="h-2 bg-red-600 rounded" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 pb-6 gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-3 py-2 rounded"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? "❚❚" : "▶"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(-10);
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-3 py-2 rounded"
              aria-label="Rewind 10s"
            >
              ⟲ 10
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                seek(10);
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-3 py-2 rounded"
              aria-label="Forward 10s"
            >
              10 ⟳
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-2 py-2 rounded"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? "🔇" : "🔊"}
            </button>

            {/* Volume slider hidden on very narrow screens */}
            <input
              aria-label="Volume"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={onVolumeChange}
              className="w-24 hidden sm:block"
            />

            <div className="text-sm text-white/80">
              {formatTime((progress / 100) * duration)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed */}
            <label className="text-white/80 text-sm hidden sm:block">
              Speed:
            </label>
            <select
              value={speed}
              onChange={onSpeedChange}
              className="bg-black/60 text-white px-2 py-1 rounded hidden sm:block"
              aria-label="Playback speed"
            >
              {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>

            {/* Quality */}
            {sources.length > 1 && (
              <>
                <label className="text-white/80 text-sm hidden sm:block">
                  Quality:
                </label>
                <select
                  value={sourceIndex}
                  onChange={onSourceChange}
                  className="bg-black/60 text-white px-2 py-1 rounded hidden sm:block"
                  aria-label="Video quality"
                >
                  {sources.map((s, i) => (
                    <option key={s.label || i} value={i}>
                      {s.label || `Source ${i + 1}`}
                    </option>
                  ))}
                </select>
              </>
            )}

            {/* PiP */}
            <button
              onClick={() => {
                const v = videoRef.current;
                if (v && document.pictureInPictureEnabled) {
                  v.requestPictureInPicture().catch(() => {});
                }
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-3 py-2 rounded hidden sm:block"
              aria-label="Picture in Picture"
            >
              ⧉
            </button>

            {/* Fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="bg-black/60 hover:bg-black/50 text-white px-3 py-2 rounded"
              aria-label="Toggle Fullscreen"
            >
              {isFullscreen ? "⤢" : "⤢"}
            </button>
          </div>
        </div>
      </div>

      {/* Info panel (toggle if you want) */}
      {/* You can hook this to a button to expand/collapse */}
      {/* <div className="absolute left-6 bottom-28 z-50 bg-black/60 text-white rounded p-4 max-w-xl">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl">
            {title} <span className="text-sm font-normal text-white/70">({year})</span>
          </div>
          <div className="px-2 py-0.5 border border-white/30 rounded text-sm">
            {rating}
          </div>
        </div>
        <p className="mt-2 text-sm text-white/80 max-w-prose">{description}</p>
      </div> */}
    </div>
  );
}
