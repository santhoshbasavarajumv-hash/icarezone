import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ 
  whatsappNumber = '918050804656' 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello iCare zone, I have an inquiry regarding repair services for my Apple device in Mysuru."
  );

  const cleanNumber = whatsappNumber.replace(/[^\d]/g, '');

  return (
    <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end">
      {showTooltip && (
        <div className="mb-2 bg-[#111318] text-white text-xs py-2 px-3.5 rounded-xl shadow-xl border border-white/10 flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2 max-w-xs">
          <span>Chat directly with iCare zone Mysuru on WhatsApp</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <a
        href={`https://wa.me/${cleanNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20ba59] hover:scale-105 transition-all duration-200 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-green-300"
        aria-label="Chat with iCare zone on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
