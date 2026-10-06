import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, MailOpen, RotateCcw } from 'lucide-react';
import { playOpenChime } from '../utils/soundEffects';
import { InvitationCard } from './InvitationCard';
import { InvitationData } from '../types/invitation';

interface EnvelopeProps {
  isOpen: boolean;
  onToggleOpen: () => void;
  data: InvitationData;
  onOpenRsvp: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  isOpen,
  onToggleOpen,
  data,
  onOpenRsvp,
}) => {
  const triggerConfetti = () => {
    const count = 75;
    const defaults = {
      origin: { y: 0.65 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.3, {
      spread: 60,
      startVelocity: 45,
      colors: ['#fda4af', '#f43f5e', '#fbcfe8', '#ffe4e6', '#fb7185'],
    });
    fire(0.25, {
      spread: 90,
      decay: 0.92,
      scalar: 1.1,
      colors: ['#fef08a', '#fbbf24', '#fbcfe8', '#ffffff'],
    });
    fire(0.2, {
      spread: 120,
      startVelocity: 35,
      decay: 0.94,
      colors: ['#e2e8f0', '#f472b6', '#fed7aa'],
    });
    fire(0.25, {
      spread: 100,
      startVelocity: 50,
      colors: ['#f43f5e', '#fecdd3', '#fdf2f8'],
    });
  };

  const handleOpenClick = () => {
    if (!isOpen) {
      playOpenChime();
      triggerConfetti();
    }
    onToggleOpen();
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center p-2 sm:p-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ======================================================== */
          /* 1. CLOSED ENVELOPE VIEW                                   */
          /* ======================================================== */
          <motion.div
            key="closed-state"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex flex-col items-center"
          >
            {/* Ambient shadow beneath the envelope */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[1.42/1] cursor-pointer group" onClick={handleOpenClick}>
              <div className="absolute inset-x-6 -bottom-3 h-10 bg-rose-950/15 blur-2xl rounded-full" />

              {/* Envelope Body */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#fceceb] via-[#f7d6d4] to-[#f2c7c5] shadow-2xl border border-rose-200/90 overflow-hidden flex flex-col justify-between transition-transform duration-500 group-hover:-translate-y-1">
                {/* Paper texture overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8), transparent 80%)`,
                  }}
                />

                {/* Inner Gold border */}
                <div className="absolute inset-3 rounded-2xl border border-rose-300/60 pointer-events-none border-dashed" />

                {/* Corner floral stars */}
                <div className="absolute top-2.5 left-3 text-rose-300/80 text-xs">✦</div>
                <div className="absolute top-2.5 right-3 text-rose-300/80 text-xs">✦</div>
                <div className="absolute bottom-2.5 left-3 text-rose-300/80 text-xs">✦</div>
                <div className="absolute bottom-2.5 right-3 text-rose-300/80 text-xs">✦</div>

                {/* Top Flap (Triangular fold closed downwards) */}
                <div className="absolute top-0 inset-x-0 h-1/2 overflow-hidden z-20 pointer-events-none">
                  <div
                    className="w-full h-full bg-gradient-to-b from-[#fbebe9] to-[#f4cbca] shadow-md origin-top"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                  <div
                    className="absolute inset-0 border-b border-rose-300/70"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    }}
                  />
                </div>

                {/* Left & Right envelope folding simulation */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-40 z-10"
                  style={{
                    background:
                      'linear-gradient(135deg, transparent 49.5%, rgba(225, 175, 175, 0.4) 50%, transparent 50.5%), linear-gradient(225deg, transparent 49.5%, rgba(225, 175, 175, 0.4) 50%, transparent 50.5%)',
                  }}
                />

                {/* Wax Seal Stamp in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#e56b84] via-[#c94563] to-[#99223e] shadow-xl border-2 border-rose-300/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-1 rounded-full border border-rose-200/40 opacity-70" />
                    <div className="absolute inset-2.5 rounded-full border border-rose-900/30 shadow-inner flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center text-rose-100 select-none">
                        <Heart className="w-5 h-5 fill-rose-200/80 text-rose-200 mb-0.5" />
                        <span className="font-serif-title text-sm tracking-widest font-bold uppercase opacity-95">
                          F
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="mt-2 text-[11px] uppercase tracking-widest font-medium text-rose-700/80 bg-white/70 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-rose-200/50">
                    Baby Shower
                  </span>
                </div>

                {/* Bottom Text */}
                <div className="mt-auto pb-4 text-center z-10">
                  <p className="font-quicksand font-bold text-xs sm:text-sm text-rose-900/80 tracking-wide">
                    Una dulce espera
                  </p>
                  <p className="font-cursive-name text-2xl sm:text-3xl text-[#e8337a] font-bold">
                    {data.babyName}
                  </p>
                </div>
              </div>
            </div>

            {/* Prominent "Abrir" Button */}
            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-2.5 z-40">
              <button
                onClick={handleOpenClick}
                className="group relative px-9 py-4 sm:px-11 sm:py-4.5 bg-gradient-to-r from-rose-500 via-rose-600 to-pink-500 hover:from-rose-600 hover:via-rose-700 hover:to-pink-600 text-white font-medium text-base sm:text-lg rounded-full shadow-xl shadow-rose-400/40 hover:shadow-rose-400/60 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer animate-pulse-glow"
              >
                <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wider font-serif-title uppercase font-bold text-lg">
                  Abrir
                </span>
                <MailOpen className="w-5 h-5 text-rose-100 group-hover:scale-110 transition-transform" />
              </button>

              <p className="text-xs text-rose-600/80 font-sans-clean flex items-center gap-1.5">
                <span>Presiona para abrir la invitación</span>
                <span>✨</span>
              </p>
            </div>
          </motion.div>
        ) : (
          /* ======================================================== */
          /* 2. OPENED ENVELOPE VIEW (ENVELOPE DOES NOT DISAPPEAR!)     */
          /* ======================================================== */
          <motion.div
            key="opened-state"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-auto flex flex-col items-center pt-8 sm:pt-10"
          >
            {/* ENVELOPE FRAME THAT WRAPS AND CRADLES THE INVITATION */}
            <div className="relative w-full">
              {/* Top Opened Triangular Flap pointing up in the background */}
              <div
                className="absolute -top-14 sm:-top-16 inset-x-4 sm:inset-x-8 h-20 sm:h-24 z-0 pointer-events-none drop-shadow-md"
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                }}
              >
                {/* Back flap texture with inner watercolor floral lining */}
                <div
                  className="w-full h-full bg-[#faebea] border-t border-rose-300/80"
                  style={{
                    backgroundImage: `url('/src/assets/images/floral_frame_bg_1791298171517.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.85,
                  }}
                />
              </div>

              {/* Envelope Back & Border Framing (Visible surrounding the card) */}
              <div className="absolute -inset-2.5 sm:-inset-4 rounded-[32px] bg-gradient-to-b from-[#fbeceb] via-[#f7d8d6] to-[#f1c3c1] shadow-2xl border border-rose-200/90 z-0 pointer-events-none" />

              {/* Envelope Subtle Inner Border */}
              <div className="absolute -inset-1 sm:-inset-2 rounded-[28px] border border-rose-300/50 border-dashed z-0 pointer-events-none" />

              {/* THE INVITATION CARD (Front and center, elevated with shadow) */}
              <motion.div
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full"
              >
                <InvitationCard
                  data={data}
                  onOpenRsvp={onOpenRsvp}
                />
              </motion.div>

              {/* Envelope Lower Pocket Wings (Visible at the bottom corners holding the card) */}
              <div className="absolute -bottom-2 -left-2 w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-tr from-[#f4c6c4] to-transparent rounded-bl-3xl z-20 pointer-events-none opacity-80" />
              <div className="absolute -bottom-2 -right-2 w-14 h-14 sm:w-18 sm:h-18 bg-gradient-to-tl from-[#f4c6c4] to-transparent rounded-br-3xl z-20 pointer-events-none opacity-80" />
            </div>

            {/* "Volver a guardar en el sobre" button */}
            <div className="mt-6 flex justify-center z-30 pb-4">
              <button
                onClick={onToggleOpen}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/90 hover:bg-white text-rose-800 text-xs sm:text-sm font-medium rounded-full shadow-md hover:shadow-lg border border-rose-200/80 transition-all cursor-pointer backdrop-blur-sm active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>Volver a guardar en el sobre</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
