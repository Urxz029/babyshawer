import React from 'react';
import { Calendar, MapPin, MessageCircle, Navigation, PhoneCall, Heart } from 'lucide-react';
import { InvitationData } from '../types/invitation';

interface InvitationCardProps {
  data: InvitationData;
  onOpenRsvp: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  onOpenRsvp,
}) => {
  const cleanPhone = data.rsvpPhone.replace(/[^0-9]/g, '');

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `¡Hola! Confirmo mi asistencia al Baby Shower de ${data.babyName} el ${data.dateText} a las ${data.timeText} en ${data.venueAddress}. ¡Muchas felicidades! 🎉👶`
    );
    window.open(`https://wa.me/${cleanPhone || '56940020123'}?text=${text}`, '_blank');
  };

  const handleOpenMap = () => {
    const query = encodeURIComponent(`${data.venueAddress}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Baby Shower de ${data.babyName}`);
    const details = encodeURIComponent(`${data.message}\nLugar: ${data.venueAddress}`);
    const location = encodeURIComponent(`${data.venueAddress}`);
    // Sábado 7 de noviembre 18:00 hrs
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261107T210000Z/20261108T010000Z`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto rounded-3xl p-2.5 sm:p-3.5 bg-gradient-to-b from-[#fdf2f4] via-[#fce7eb] to-[#fad2da] shadow-2xl border-4 border-[#fbcfe8] select-none text-slate-800">
      {/* Outer Card Wrapper */}
      <div className="relative w-full bg-white rounded-2xl p-2 sm:p-2.5 border-2 border-dashed border-[#f472b6] shadow-inner overflow-hidden flex flex-col items-center">
        
        {/* The Exact Invitation Image */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-md group">
          <img
            src="/src/assets/images/fernanda_card_1791299659863.jpg"
            alt="Invitación Baby Shower Fernanda"
            className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />

          {/* Subtle click-to-zoom / inspect indicator */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/80 backdrop-blur-xs text-[10px] text-[#e8337a] font-bold shadow-xs border border-pink-200 pointer-events-none flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 fill-[#e8337a]" />
            <span>Baby Shower</span>
          </div>
        </div>

        {/* INTERACTIVE ACTIONS: Confirmar Asistencia + Map + Calendar */}
        <div className="w-full mt-3 px-1 flex flex-col gap-2 font-quicksand">
          
          {/* Main Primary Action Button: Confirmar Asistencia */}
          <button
            onClick={onOpenRsvp}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#e8337a] via-[#ec4899] to-[#f43f5e] hover:from-[#d81b60] hover:to-[#e11d48] text-white font-bold rounded-full shadow-lg shadow-pink-300/60 hover:shadow-pink-400/70 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 text-sm sm:text-base"
          >
            <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
            <span>Confirmar Asistencia</span>
          </button>

          {/* Quick WhatsApp Direct Button */}
          <button
            onClick={handleWhatsAppDirect}
            className="w-full py-2.5 px-4 bg-[#fff0f5] hover:bg-[#ffe4ee] text-[#e8337a] border border-[#f472b6]/70 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <div className="w-4 h-4 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
              <PhoneCall className="w-2.5 h-2.5 fill-white" />
            </div>
            <span>Confirmar directo por WhatsApp (+56940020123)</span>
          </button>

          {/* Quick links: Google Maps & Google Calendar */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#70424d] font-semibold pt-1 px-1">
            <button
              onClick={handleOpenMap}
              className="hover:text-[#e8337a] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#e8337a]" />
              <span>Ver dirección en mapa</span>
            </button>

            <span>•</span>

            <button
              onClick={handleAddToCalendar}
              className="hover:text-[#e8337a] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-[#e8337a]" />
              <span>Agendar (7 Nov 18:00)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
