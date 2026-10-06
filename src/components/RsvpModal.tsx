import React, { useState } from 'react';
import { X, Check, HeartHandshake, MessageCircle, Send } from 'lucide-react';
import { InvitationData, GuestRsvp } from '../types/invitation';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, data }) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppRsvp = () => {
    const text = encodeURIComponent(
      `¡Hola! Confirmo mi asistencia al Baby Shower de ${data.babyName}.\n` +
      `Nombre: ${name || 'Invitado(a)'}\n` +
      `Asistencia: ${attendance === 'yes' ? '¡Sí, con mucho gusto asistiré! 🎉' : 'Lamentablemente no podré asistir ❤️'}\n` +
      `Total de personas: ${guestsCount}\n` +
      (message ? `Mensaje: "${message}"` : '')
    );
    const cleanPhone = data.rsvpPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone || '1234567890'}?text=${text}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newRsvp: GuestRsvp = {
      name: name.trim(),
      attendance,
      guestsCount,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('baby_shower_rsvps') || '[]');
      existing.push(newRsvp);
      localStorage.setItem('baby_shower_rsvps', JSON.stringify(existing));
    } catch {
      // storage fallback
    }

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-rose-100 via-pink-50 to-rose-100 px-6 py-5 border-b border-rose-150 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-200/70 flex items-center justify-center text-rose-700">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-title text-lg font-bold text-slate-800">
                Confirmar Asistencia
              </h3>
              <p className="text-[11px] text-rose-700/80">
                Baby Shower de {data.babyName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-serif-title text-xl font-bold text-slate-800">
                ¡Muchas Gracias!
              </h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Tu confirmación para celebrar la llegada de{' '}
                <strong className="text-rose-700">{data.babyName}</strong> ha sido registrada con mucho amor.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-full text-sm transition-all shadow cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu Nombre y Apellido *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carolina Pérez"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm bg-rose-50/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ¿Podrás acompañarnos?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'yes'
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>🌸</span> ¡Sí, ahí estaré!
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      attendance === 'no'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>💌</span> No podré asistir
                  </button>
                </div>
              </div>

              {attendance === 'yes' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número de personas que asistirán
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm bg-white"
                  >
                    <option value={1}>1 persona</option>
                    <option value={2}>2 personas</option>
                    <option value={3}>3 personas</option>
                    <option value={4}>4 personas</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dedicatoria o mensaje para la bebé y los papás
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escribe tus buenos deseos..."
                  className="w-full px-3.5 py-2 rounded-xl border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 text-sm bg-rose-50/20"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-full shadow-md text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  Guardar Confirmación
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppRsvp}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-full text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirmar directo por WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
