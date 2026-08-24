import React, { useCallback, useMemo, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

const videoId = "lggEDxM14jY";
const youtubeOrigin = "https://www.youtube.com";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  const playerUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "0",
      controls: "0",
      enablejsapi: "1",
      loop: "1",
      modestbranding: "1",
      playlist: videoId,
      playsinline: "1",
      rel: "0",
    });

    if (window.location.origin) params.set("origin", window.location.origin);
    return `${youtubeOrigin}/embed/${videoId}?${params.toString()}`;
  }, []);

  const sendPlayerCommand = useCallback((func: "playVideo" | "pauseVideo") => {
    playerRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      youtubeOrigin,
    );
  }, []);

  const toggleMusic = () => {
    const nextIsPlaying = !isPlaying;
    sendPlayerCommand(nextIsPlaying ? "playVideo" : "pauseVideo");
    setIsPlaying(nextIsPlaying);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <iframe
        ref={playerRef}
        src={playerUrl}
        title="Celebration music"
        allow="autoplay; encrypted-media"
        className="absolute h-px w-px opacity-0 pointer-events-none"
        onLoad={() => sendPlayerCommand("playVideo")}
      />

      <button
        onClick={toggleMusic}
        aria-label="Toggle celebration music"
        aria-pressed={isPlaying}
        className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full card-glass border transition-all duration-300 shadow-xl cursor-pointer ${
          isPlaying
            ? "border-amber-300/60 bg-slate-900/90 text-amber-200 shadow-[0_0_15px_rgba(229,184,105,0.3)]"
            : "border-slate-500/40 bg-slate-900/80 text-slate-300 hover:border-slate-300 hover:text-white"
        }`}
      >
        <div className={`p-1 rounded-full ${isPlaying ? "animate-spin" : ""}`}>
          <Music className="w-4 h-4 text-slate-200" />
        </div>

        <span className="text-xs font-semibold tracking-wider pr-1">
          {isPlaying ? "Music On" : "Music Off"}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-300" />
        ) : (
          <VolumeX className="w-4 h-4 text-slate-400" />
        )}
      </button>
    </div>
  );
};
