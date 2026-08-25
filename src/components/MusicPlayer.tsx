import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";

const audioSource = "/audio/celebration.webm";

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export interface MusicPlayerHandle {
  play: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ shouldPlay }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    void player.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useImperativeHandle(ref, () => ({ play }), [play]);

  useEffect(() => {
    if (shouldPlay) play();
  }, [shouldPlay, play]);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <audio
        ref={playerRef}
        src={audioSource}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
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
});
