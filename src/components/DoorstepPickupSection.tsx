import React from 'react';
import { MYSURU_AREAS, ICAREZONE_INFO } from '../data/repairData.ts';
import { Truck, ShieldCheck, Clock, MapPin, CheckCircle2, ChevronRight, PhoneCall } from 'lucide-react';

interface DoorstepPickupSectionProps {
  onOpenBooking: () => void;
}

export const DoorstepPickupSection: React.FC<DoorstepPickupSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="pickup" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest">
                <Truck className="w-4 h-4" />
                <span>Zero Commute Hassle</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
                Complimentary Doorstep Pickup & Express Return Across Mysuru
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Can't take time off work or visit our Kuvempunagar tech center? Our verified logistics coordinator picks up your iPhone, MacBook, or iPad directly from your home or office anywhere in Mysore, provides an instant digital receipt, and returns it safely repaired.
              </p>

              {/* 3 Step Protocol */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="text-sky-400 font-bold font-mono-numbers text-sm">
                    01. Instant Booking
                  </div>
                  <div className="text-xs font-semibold text-white">Book Online or Call</div>
                  <p className="text-[11px] text-slate-400">
                    Select your model, issue, and Mysore address. Free same-day slot allocated.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="text-sky-400 font-bold font-mono-numbers text-sm">
                    02. Secure Verification
                  </div>
                  <div className="text-xs font-semibold text-white">Digital Inward Receipt</div>
                  <p className="text-[11px] text-slate-400">
                    IMEI & physical condition recorded before handoff in tamper-evident bubble sleeve.
                  </p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="text-sky-400 font-bold font-mono-numbers text-sm">
                    03. Fast Return
                  </div>
                  <div className="text-xs font-semibold text-white">Delivered Back Same Day</div>
                  <p className="text-[11px] text-slate-400">
                    Includes 6-month warranty certificate, invoice, and old replaced part.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Request Free Pickup in Mysore</span>
                </button>

                <a
                  href={`tel:${ICAREZONE_INFO.phoneClean}`}
                  className="px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-sky-400" />
                  <span>Call Dispatch Desk</span>
                </a>
              </div>

            </div>

            {/* Right: Covered Localities in Mysuru (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span className="text-sm font-bold text-white">Covered Mysore Localities</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium">Free 45-Min Dispatch</span>
              </div>

              <p className="text-xs text-slate-400">
                Our technicians provide direct doorstep pickup & delivery across all key residential and IT hubs in Mysuru:
              </p>

              {/* Area Tags Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {MYSURU_AREAS.map(area => (
                  <div key={area} className="flex items-center gap-1.5 text-slate-300 py-1 border-b border-slate-900">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800/80 flex items-center justify-between">
                <span>Living outside listed areas?</span>
                <a 
                  href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%2C%20do%20you%20offer%20pickup%20at%20my%20location%20in%20Mysore%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline font-medium"
                >
                  Ask Santhosh on WhatsApp &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
