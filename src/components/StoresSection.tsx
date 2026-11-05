import React from 'react';
import { ICAREZONE_INFO, MYSURU_AREAS } from '../data/repairData.ts';
import { MapPin, Clock, Phone, Navigation, ExternalLink, ShieldCheck, CheckCircle2, Car, Wifi, Coffee } from 'lucide-react';

export const StoresSection: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('iCareZone Kuvempunagar Mysore opposite Pizza Hut Apollo Hospital')}`;

  return (
    <section id="stores" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Our Centers & Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Visit Our Mysore Store or Request Doorstep Service
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Conveniently located in the heart of Kuvempunagar with doorstep dispatch servicing all prime residential localities in Mysuru.
          </p>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Flagship Store: Kuvempunagar (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            <div>
              {/* Store visual */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img
                  src="/src/assets/images/icarezone_store_mysore_1793810451573.jpg"
                  alt="iCareZone Kuvempunagar Mysore store front interior and consultation desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4 bg-sky-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md uppercase tracking-wider">
                  Flagship Store
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    iCareZone Kuvempunagar Flagship
                  </h3>
                  <p className="text-xs text-sky-400 font-medium mt-0.5">
                    Opposite Pizza Hut · 200m from Apollo Hospital, Mysore
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Address:</span>
                      <p className="text-slate-300 mt-0.5">{ICAREZONE_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Timings:</span>
                      <p className="text-slate-300 mt-0.5">{ICAREZONE_INFO.hoursWeekday}</p>
                      <p className="text-slate-400">{ICAREZONE_INFO.hoursSunday}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">Phone & WhatsApp:</span>
                      <p className="font-mono-numbers text-sky-400 mt-0.5">{ICAREZONE_INFO.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-slate-300 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 flex flex-col items-center gap-1">
                    <Wifi className="w-4 h-4 text-sky-400" />
                    <span>Free Wi-Fi</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 flex flex-col items-center gap-1">
                    <Coffee className="w-4 h-4 text-sky-400" />
                    <span>Live Viewing</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-850 flex flex-col items-center gap-1">
                    <Car className="w-4 h-4 text-sky-400" />
                    <span>Free Parking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Store 2 & Doorstep Hub: Saraswathipuram & Citywide Coverage (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
                Service Hub & Doorstep Delivery
              </div>
              <h3 className="text-xl font-bold text-white">
                Saraswathipuram & Mysuru Network
              </h3>
              <p className="text-xs text-slate-400">
                Fast 45-minute doorstep pickup and drop across all major residential zones in Mysore.
              </p>
            </div>

            <div className="space-y-3 text-xs text-slate-300 border-y border-slate-800 py-4">
              <div className="font-semibold text-white">Key Mysore Areas Serviced Daily:</div>
              <div className="grid grid-cols-2 gap-2 text-slate-300 text-xs">
                {MYSURU_AREAS.slice(0, 10).map((area) => (
                  <div key={area} className="flex items-center gap-1.5 py-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secure Handoff Protocol</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Our doorstep logistics executive provides an immediate digital receipt verifying device serial number and physical condition before transport in shockproof cases.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20I%20would%20like%20to%20request%20doorstep%20pickup%20at%20my%20address.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                <span>Request Pickup via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={`tel:${ICAREZONE_INFO.phoneClean}`}
                className="w-full py-2.5 px-4 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span>Call Center: {ICAREZONE_INFO.phone}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
