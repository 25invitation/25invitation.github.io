import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";

const audioSource = "/audio/celebration.webm";

interface MusicPlayerProps {
  shouldPlay: boolean;
}

export interface MusicPlayerHandle {
  play: () => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ shouldPlay }, ref) => {
  const playerRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    void player.play().catch(() => undefined);
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  useEffect(() => {
    if (shouldPlay) play();
  }, [shouldPlay, play]);

  return (
    <audio ref={playerRef} src={audioSource} loop preload="auto" />
  );
});
