import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Synthesize soft ambient Indian celebratory sitar/chime chords using Web Audio API
  const startAmbientMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Raag Yaman / celebratory pentatonic notes (E, F#, G#, B, C#, E)
      const scale = [329.63, 369.99, 415.3, 493.88, 554.37, 659.25, 739.99, 830.61];

      const playPluck = (freq: number, timeOffset: number) => {
        if (!audioContextRef.current || audioContextRef.current.state === "closed") return;
        const now = ctx.currentTime + timeOffset;
        
        // Sitar-like dual oscillator with metallic resonance
        const osc = ctx.createOscillator();
        const subOsc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        subOsc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        subOsc.frequency.setValueAtTime(freq * 1.5, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2400, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        osc.connect(filter);
        subOsc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + 2.3);
        subOsc.stop(now + 2.3);
      };

      // Play soft arpeggio sequence
      const playPhrase = () => {
        const pattern = [0, 2, 4, 3, 5, 4, 2, 1];
        pattern.forEach((noteIdx, i) => {
          playPluck(scale[noteIdx % scale.length], i * 0.45);
        });
      };

      playPhrase();
      intervalRef.current = window.setInterval(playPhrase, 4000);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startAmbientMusic();
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={toggleMusic}
        aria-label="Toggle ambient celebration music"
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
          {isPlaying ? "Music Playing" : "Play Music"}
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
