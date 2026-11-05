import React from 'react';
import { ICAREZONE_INFO } from '../data/repairData.ts';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
      {/* Quick Call */}
      <a
        href={`tel:${ICAREZONE_INFO.phoneClean}`}
        aria-label="Call iCareZone Mysore"
        className="w-11 h-11 rounded-full bg-slate-900 border border-slate-700 text-sky-400 flex items-center justify-center shadow-lg hover:bg-slate-800 hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp Floating Chat */}
      <a
        href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20I%20need%20assistance%20with%20my%20device%20repair.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Santhosh on WhatsApp"
        className="h-11 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-xl hover:scale-105 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Us</span>
      </a>
    </div>
  );
};
