import React, { useState } from 'react';
import { X, Save, Edit3, RotateCcw } from 'lucide-react';
import { InvitationData, DEFAULT_INVITATION } from '../types/invitation';

interface EditDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: InvitationData;
  onSave: (newData: InvitationData) => void;
}

export const EditDetailsModal: React.FC<EditDetailsModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<InvitationData>(data);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(DEFAULT_INVITATION);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-200 overflow-hidden my-8 max-h-[90vh] flex flex-col font-quicksand">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 px-6 py-4 border-b border-rose-150 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-[#e8337a]">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                Personalizar Datos del Evento
              </h3>
              <p className="text-[11px] text-pink-700/80">
                Ajusta los textos de la invitación a tu gusto
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nombre de la Bebé
            </label>
            <input
              type="text"
              value={formData.babyName}
              onChange={(e) => setFormData({ ...formData, babyName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Encabezado
              </label>
              <input
                type="text"
                value={formData.invitedHeading}
                onChange={(e) => setFormData({ ...formData, invitedHeading: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipo de Evento
              </label>
              <input
                type="text"
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Texto de celebración
            </label>
            <input
              type="text"
              value={formData.celebratingText}
              onChange={(e) => setFormData({ ...formData, celebratingText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Mensaje emotivo
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Fecha
              </label>
              <input
                type="text"
                value={formData.dateText}
                onChange={(e) => setFormData({ ...formData, dateText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hora
              </label>
              <input
                type="text"
                value={formData.timeText}
                onChange={(e) => setFormData({ ...formData, timeText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Dirección del Evento
            </label>
            <input
              type="text"
              value={formData.venueAddress}
              onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teléfono WhatsApp
              </label>
              <input
                type="text"
                value={formData.rsvpPhone}
                onChange={(e) => setFormData({ ...formData, rsvpPhone: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Texto de despedida
              </label>
              <input
                type="text"
                value={formData.closingText}
                onChange={(e) => setFormData({ ...formData, closingText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#e8337a] text-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700 text-xs flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restablecer plantilla
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-700 rounded-full text-xs font-medium cursor-pointer hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#e8337a] hover:bg-[#d81b60] text-white rounded-full text-xs font-medium cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                Guardar cambios
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
