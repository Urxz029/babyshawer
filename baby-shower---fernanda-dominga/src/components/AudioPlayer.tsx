import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

// Gentle music box lullaby synthesizer using Web Audio API
export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  // Brahms' Lullaby melody notes (frequencies in Hz)
  const melody = [
    // Wiegenlied / Lullaby opening notes
    { note: 261.63, dur: 0.6 }, // C4
    { note: 261.63, dur: 0.6 }, // C4
    { note: 329.63, dur: 0.9 }, // E4
    { note: 261.63, dur: 0.6 }, // C4
    { note: 261.63, dur: 0.6 }, // C4
    { note: 329.63, dur: 1.2 }, // E4
    { note: 261.63, dur: 0.4 }, // C4
    { note: 329.63, dur: 0.4 }, // E4
    { note: 392.00, dur: 0.8 }, // G4
    { note: 349.23, dur: 0.4 }, // F4
    { note: 329.63, dur: 0.4 }, // E4
    { note: 293.66, dur: 1.2 }, // D4
    { note: 246.94, dur: 0.4 }, // B3
    { note: 293.66, dur: 0.4 }, // D4
    { note: 349.23, dur: 0.8 }, // F4
    { note: 293.66, dur: 0.4 }, // D4
    { note: 246.94, dur: 0.4 }, // B3
    { note: 261.63, dur: 1.4 }, // C4
  ];

  const playMusicBoxNote = (freq: number, duration: number, time: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Celesta / Music box chime timbre: sine with subtle harmonic
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Envelope: quick attack, natural exponential bell decay
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.12, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration + 1.3);
  };

  const startLullaby = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    let noteIndex = 0;
    const playNext = () => {
      if (!audioCtxRef.current || !isPlaying) return;
      const current = melody[noteIndex % melody.length];
      const now = audioCtxRef.current.currentTime;
      playMusicBoxNote(current.note, current.dur, now);
      noteIndex++;
      timerRef.current = window.setTimeout(playNext, current.dur * 850);
    };

    playNext();
  };

  useEffect(() => {
    if (isPlaying) {
      startLullaby();
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Pausar música ambiental' : 'Reproducir música de cuna'}
      className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-white text-rose-800 rounded-full shadow-md backdrop-blur-md border border-rose-200/60 transition-all hover:scale-105 active:scale-95 text-xs font-medium cursor-pointer"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="hidden sm:inline">Música activa</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-rose-400" />
          <span className="hidden sm:inline">Música ambiental</span>
        </>
      )}
      <Music className="w-3.5 h-3.5 text-rose-400 opacity-60" />
    </button>
  );
};
