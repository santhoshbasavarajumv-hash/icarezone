import React from 'react';
import { Calendar, Phone } from 'lucide-react';

interface MobileBookingBarProps {
  onBookClick: () => void;
  phone?: string;
}

export const MobileBookingBar: React.FC<MobileBookingBarProps> = ({
  onBookClick,
  phone = '080508 04656'
}) => {
  const phoneClean = phone.replace(/[^\d]/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#E8E9ED] p-3 px-4 md:hidden shadow-lg flex items-center gap-3">
      <a
        href={`tel:${phoneClean}`}
        className="flex-1 py-3 px-3 bg-[#F5F6F8] hover:bg-gray-200 border border-[#E8E9ED] text-[#17191D] rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
      >
        <Phone className="w-4 h-4 text-blue-600" />
        <span>Call Shop</span>
      </a>

      <button
        onClick={onBookClick}
        className="flex-2 py-3 px-4 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-[0.98]"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Appointment</span>
      </button>
    </div>
  );
};
