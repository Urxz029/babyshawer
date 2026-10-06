import React, { useState } from 'react';
import { Envelope } from './components/Envelope';
import { PetalBackground } from './components/PetalBackground';
import { AudioPlayer } from './components/AudioPlayer';
import { RsvpModal } from './components/RsvpModal';
import { EditDetailsModal } from './components/EditDetailsModal';
import { DEFAULT_INVITATION, InvitationData } from './types/invitation';
import { Share2, Edit3, Check, Heart } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<InvitationData>(() => {
    try {
      const saved = localStorage.getItem('baby_shower_invitation_data_v2');
      return saved ? JSON.parse(saved) : DEFAULT_INVITATION;
    } catch {
      return DEFAULT_INVITATION;
    }
  });

  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSaveData = (newData: InvitationData) => {
    setData(newData);
    try {
      localStorage.setItem('baby_shower_invitation_data_v2', JSON.stringify(newData));
    } catch {
      // storage fallback
    }
    showToast('¡Datos de la invitación actualizados!');
  };

  const handleShare = async () => {
    const shareTitle = `Baby Shower de ${data.babyName}`;
    const shareText = `¡Te invitamos al Baby Shower de ${data.babyName}! ${data.dateText} a las ${data.timeText} en ${data.venueAddress}.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled or fallback
      }
    } else {
      navigator.clipboard.writeText(`${shareTitle} - ${shareText}\n${shareUrl}`);
      showToast('¡Enlace de invitación copiado al portapapeles!');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#fbf5f4] text-slate-800 flex flex-col justify-between overflow-x-hidden">
      {/* Floating gentle flower petals and sparkles in the atmosphere */}
      <PetalBackground />

      {/* Decorative floral corners matching the style of the user's provided invitation image */}
      {/* Top Left Floral Corner */}
      <div
        className="fixed top-0 left-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none z-10 opacity-90 transition-opacity"
        style={{
          backgroundImage: `url('/src/assets/images/floral_frame_bg_1791298171517.jpg')`,
          backgroundSize: '300% 300%',
          backgroundPosition: 'top left',
          maskImage: 'radial-gradient(circle at top left, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at top left, black 50%, transparent 85%)',
        }}
      />

      {/* Top Right Floral Corner */}
      <div
        className="fixed top-0 right-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none z-10 opacity-90 transition-opacity"
        style={{
          backgroundImage: `url('/src/assets/images/floral_frame_bg_1791298171517.jpg')`,
          backgroundSize: '300% 300%',
          backgroundPosition: 'top right',
          maskImage: 'radial-gradient(circle at top right, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at top right, black 50%, transparent 85%)',
        }}
      />

      {/* Bottom Left Floral Corner */}
      <div
        className="fixed bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none z-10 opacity-90 transition-opacity"
        style={{
          backgroundImage: `url('/src/assets/images/floral_frame_bg_1791298171517.jpg')`,
          backgroundSize: '300% 300%',
          backgroundPosition: 'bottom left',
          maskImage: 'radial-gradient(circle at bottom left, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom left, black 50%, transparent 85%)',
        }}
      />

      {/* Bottom Right Floral Corner */}
      <div
        className="fixed bottom-0 right-0 w-48 h-48 sm:w-80 sm:h-80 pointer-events-none z-10 opacity-90 transition-opacity"
        style={{
          backgroundImage: `url('/src/assets/images/floral_frame_bg_1791298171517.jpg')`,
          backgroundSize: '300% 300%',
          backgroundPosition: 'bottom right',
          maskImage: 'radial-gradient(circle at bottom right, black 50%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom right, black 50%, transparent 85%)',
        }}
      />

      {/* Top Navigation Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-xs">
            <Heart className="w-4 h-4 fill-rose-300" />
          </div>
          <div>
            <h1 className="font-quicksand text-xs sm:text-sm font-bold text-slate-800 tracking-wide uppercase">
              Baby Shower
            </h1>
            <p className="font-cursive-name text-xl sm:text-2xl text-[#e8337a] -mt-1 font-bold">
              {data.babyName}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditOpen(true)}
            title="Personalizar detalles"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-700 text-xs font-medium rounded-full shadow-xs border border-rose-200/60 backdrop-blur-sm transition-all hover:text-rose-700 cursor-pointer active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5 text-rose-500" />
            <span className="hidden sm:inline">Editar datos</span>
          </button>

          <button
            onClick={handleShare}
            title="Compartir invitación"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-medium rounded-full shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Centered Envelope & Opening Interaction */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 py-6 sm:py-10">
        <div className="w-full max-w-xl mx-auto">
          <Envelope
            isOpen={isOpen}
            onToggleOpen={() => setIsOpen((prev) => !prev)}
            data={data}
            onOpenRsvp={() => setIsRsvpOpen(true)}
          />
        </div>
      </main>

      {/* Footer information */}
      <footer className="relative z-20 py-4 px-4 text-center text-xs text-rose-800/70 font-sans-clean">
        <p className="flex items-center justify-center gap-1">
          <span>Hecho con amor para la dulce espera de</span>
          <strong className="font-semibold text-rose-900">{data.babyName}</strong>
          <span>💕</span>
        </p>
      </footer>

      {/* Background Soothing Lullaby Synth Audio Toggle */}
      <AudioPlayer />

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        data={data}
      />

      <EditDetailsModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onSave={handleSaveData}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-2xl animate-fade-in border border-slate-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
