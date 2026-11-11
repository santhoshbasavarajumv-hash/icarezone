import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Shield, CheckCircle2, ExternalLink } from 'lucide-react';
import { BusinessSettings } from '../types/index.ts';

interface FooterProps {
  settings?: BusinessSettings | null;
  onNavigate: (tab: string) => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate, onOpenAdmin }) => {
  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');
  const whatsapp = settings?.whatsapp || '918050804656';
  const address = settings?.address || '14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023';

  return (
    <footer className="bg-[#111318] text-[#A6ABB4] pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Credibility */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs">
                <img
                  src="/assets/aistudio/icare_zone_logo_black_ef1df5d2.png"
                  alt="iCare zone - Apple Repair Experts Mysuru"
                  className="h-8 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Professional, independent Apple device repair facility in Mysuru. Dedicated to micro-precision hardware restoration, diagnostics, and customer convenience.
            </p>

            {/* Google Rating Showcase */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                ★
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-white font-bold text-sm">4.9 / 5.0</span>
                  <span className="text-[11px] text-gray-400 font-medium">• Google Verified</span>
                </div>
                <p className="text-[11px] text-gray-400">Based on 694+ genuine reviews</p>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">Repair Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Battery Health & Replacement
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Button & Haptic Action Repair
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Camera & Lens Optical Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Chassis & Back Glass Housing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Charging Port & Flex Reconditioning
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                  Safe Diagnostic Data Backup
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Business Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">Store Hours & Contact</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday – Saturday: 10:00 AM – 8:30 PM</p>
                  <p className="text-gray-400">Sunday: 10:30 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${phoneClean}`} className="text-white hover:text-blue-400 font-medium transition-colors">
                    {phone}
                  </a>
                  <p className="text-gray-400 text-[11px]">Appointment inquiries & updates</p>
                </div>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a 
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello iCare zone, I would like to inquire about repair services.")}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  WhatsApp: +91 80508 04656
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Location */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">Mysuru Workshop</h4>
            <div className="text-xs space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed text-gray-300">
                  {address}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Legal Notice */}
        <div className="pt-8 space-y-4">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-gray-400 leading-relaxed">
            <p className="font-semibold text-gray-300 mb-1">Independent Service Provider Notice:</p>
            <p>
              Apple Repair Experts – iCare zone is an independent repair facility located in Mysuru, Karnataka. Apple, iPhone, iPad, Mac, MacBook, Apple Watch, AirPods, and related names and logos are registered trademarks of Apple Inc. iCare zone operates as an independent service and technical workshop and is not affiliated with, endorsed by, or authorized by Apple Inc. All brand names and model designations are referenced strictly for customer compatibility identification purposes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 pt-2 gap-4">
            <p>© {new Date().getFullYear()} Apple Repair Experts – iCare zone. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <button onClick={() => onNavigate('privacy')} className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => onNavigate('terms')} className="hover:text-gray-300 transition-colors">
                Terms of Service
              </button>
              <button onClick={() => onNavigate('contact')} className="hover:text-gray-300 transition-colors">
                Find Us in Mysuru
              </button>
              {onOpenAdmin && (
                <button onClick={onOpenAdmin} className="text-gray-600 hover:text-gray-400 transition-colors">
                  Staff
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
