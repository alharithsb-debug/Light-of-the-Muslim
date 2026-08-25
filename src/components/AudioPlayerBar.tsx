import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Radio, Music } from 'lucide-react';

interface AudioPlayerBarProps {
  url: string | null;
  title: string | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  url,
  title,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (url) {
      audioRef.current.src = url;
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.warn("Audio autoplay blocked:", err));
      }
    }
  }, [url]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.warn("Play error:", err));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!url) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 text-white backdrop-blur-md border-t border-emerald-600/40 p-3 sm:p-4 shadow-2xl animate-slideUp">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onTogglePlay}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Track Title */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-amber-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-amber-300">مشغل التلاوات والقدسيات</p>
            <p className="text-sm font-semibold text-stone-100 truncate max-w-xs sm:max-w-md">{title || 'تلاوة قرآنية'}</p>
          </div>
        </div>

        {/* Play Control & Progress */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center shadow-md font-bold transition-all cursor-pointer shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {duration > 0 && isFinite(duration) && (
            <div className="flex items-center gap-2 text-xs font-mono text-stone-300 w-full max-w-xs">
              <span>{formatTime(progress)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                value={progress}
                onChange={(e) => {
                  if (audioRef.current) {
                    audioRef.current.currentTime = Number(e.target.value);
                  }
                }}
                className="w-full accent-amber-400 h-1.5 rounded-lg bg-stone-700 cursor-pointer"
              />
              <span>{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-2 justify-end w-full sm:w-auto">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !muted;
                setMuted(!muted);
              }
            }}
            className="p-2 text-stone-300 hover:text-white transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white transition-colors"
            title="إغلاق المشغل"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
