"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";



const BackgroundAudio = forwardRef(function BackgroundAudio({ src = "/audio/music.mp3", loop = true, showButton = true }, ref) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Hàm setMuted: chỉ thao tác trực tiếp trên audio element
  const setMuted = (val) => {
    if (audioRef.current) {
      audioRef.current.muted = val;
      console.log("[BackgroundAudio] setMuted: DOM muted=", audioRef.current.muted, "val=", val);
    }
  };

  useImperativeHandle(ref, () => ({
    audioRef,
    setMuted,
  }), []);

  // Không tự động play, chỉ play khi gọi từ ngoài
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) {
      console.warn("[BackgroundAudio] toggle: audioRef not ready");
      return;
    }
    if (playing) {
      a.pause();
      setPlaying(false);
      console.log("[BackgroundAudio] Paused audio");
    } else {
      try {
        a.muted = false;
        console.log("[BackgroundAudio] toggle: set DOM muted=false trước play, DOM muted:", a.muted);
        await a.play();
        setPlaying(true);
        console.log("[BackgroundAudio] Play audio success, DOM muted:", a.muted);
      } catch (err) {
        setPlaying(false);
        console.error("[BackgroundAudio] Play audio error", err);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      console.log("[BackgroundAudio] mounted, muted:", audioRef.current.muted, "src:", src);
    }
  }, [src]);

  return (
    <div className={'fixed bottom-4 left-4 z-[9999]'}>
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        preload="auto"
        onPlay={() => console.log("[BackgroundAudio] onPlay event")}
        onPause={() => console.log("[BackgroundAudio] onPause event")}
        onVolumeChange={() => console.log("[BackgroundAudio] onVolumeChange", audioRef.current?.volume, "muted:", audioRef.current?.muted)}
      />
      {showButton && (
        <button
          onClick={toggle}
          className="rounded-full bg-white/80 hover:bg-pink-100 text-pink-600 font-bold shadow-lg px-5 py-2 text-lg transition-all border border-pink-200"
          style={{ minWidth: 80 }}
        >
          {playing ? "Pause" : "Play"}
        </button>
      )}
    </div>
  );
});

export default BackgroundAudio;
