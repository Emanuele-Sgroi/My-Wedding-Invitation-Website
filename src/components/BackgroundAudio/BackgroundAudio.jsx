"use client";
import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";



const BackgroundAudio = forwardRef(function BackgroundAudio({ src = "/audio/music.mp3", loop = true, showButton = true, onPlayingChange }, ref) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Log when component mounts
  useEffect(() => {
    console.log("[BackgroundAudio] Component mounted");
    console.log("[BackgroundAudio] ref:", ref);
    console.log("[BackgroundAudio] audioRef:", audioRef);
  }, []);

  // Hàm setMuted: chỉ thao tác trực tiếp trên audio element
  const setMuted = (val) => {
    if (audioRef.current) {
      audioRef.current.muted = val;
    }
  };

  // Hàm setPlayingState: để cập nhật state playing từ ngoài
  const setPlayingState = (val) => {
    setPlaying(val);
    if (onPlayingChange) {
      onPlayingChange(val);
    }
  };

  // Gán ref ngay lập tức khi audioRef thay đổi
  useEffect(() => {
    if (ref && audioRef.current) {
      console.log("[BackgroundAudio] Gán ref ngay lập tức");
      ref.current = {
        audioRef,
        setMuted,
        setPlayingState,
      };
    }
  }, [audioRef.current, ref]);

  useImperativeHandle(ref, () => {
    console.log("[BackgroundAudio] useImperativeHandle called");
    console.log("[BackgroundAudio] Returning:", { audioRef, setMuted, setPlayingState });
    return {
      audioRef,
      setMuted,
      setPlayingState,
    };
  }, []);

  // Không tự động play, chỉ play khi gọi từ ngoài
  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) {
      return;
    }
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        a.muted = false;
        await a.play();
        setPlaying(true);
      } catch (err) {
        setPlaying(false);
        console.error("[BackgroundAudio] Play audio error", err);
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = true;
    }
  }, [src]);

  // Theo dõi sự kiện play/pause để cập nhật state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setPlaying(true);
      if (onPlayingChange) {
        onPlayingChange(true);
      }
    };

    const handlePause = () => {
      setPlaying(false);
      if (onPlayingChange) {
        onPlayingChange(false);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [onPlayingChange]);

  return (
    <div className={'fixed bottom-4 left-4 z-[9999]'}>
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        preload="auto"
        onLoadedData={() => console.log("[BackgroundAudio] Audio loaded")}
        onError={(e) => console.error("[BackgroundAudio] Audio error:", e)}
      />
      {showButton && (
        <button
          onClick={toggle}
          className="rounded-full bg-white/80 hover:bg-pink-100 text-pink-600 font-bold shadow-lg px-5 py-2 text-lg transition-all border border-pink-200 relative overflow-hidden"
          style={{ minWidth: 100, minHeight: 44 }}
        >
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: playing ? 1 : 0 }}>
            Pause
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-300" style={{ opacity: playing ? 0 : 1 }}>
            Play
          </span>
        </button>
      )}
    </div>
  );
});

export default BackgroundAudio;
