import React from 'react';
import { ICAREZONE_INFO } from '../data/repairData.ts';
import { MapPin, Navigation, Clock, Phone, Mail, ShieldCheck, Car, Wifi, Coffee } from 'lucide-react';

export const StoreLocation: React.FC = () => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('iCareZone Kuvempunagar Mysore opposite Pizza Hut Apollo Hospital')}`;

  return (
    <section id="location" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Visit Our Lab
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Flagship Kuvempunagar Service Center & Lounge
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Conveniently situated in Kuvempunagar, diagonally opposite Pizza Hut and 200m from Apollo Hospital. Relax in our customer lounge while your device is repaired live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Location Visual & Lounge Specs (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
            
            {/* Store image */}
            <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
              <img
                src="/src/assets/images/icarezone_store_mysore_1793810451573.jpg"
                alt="iCareZone service center interior and reception in Kuvempunagar Mysore"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-slate-700/60">
                  Live View Technician Counter
                </span>
                <span className="text-emerald-400 font-mono-numbers bg-slate-900/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-slate-700/60">
                  Open Mon–Sat till 8:30 PM
                </span>
              </div>
            </div>

            {/* Lounge Perks */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-800/40">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">High-Speed WiFi</div>
                    <div className="text-[11px] text-slate-400">Work while we fix</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-800/40">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Customer Parking</div>
                    <div className="text-[11px] text-slate-400">Bike & Car parking available</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-950 text-sky-400 flex items-center justify-center shrink-0 border border-sky-800/40">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Live Viewing</div>
                    <div className="text-[11px] text-slate-400">Watch technician work</div>
                  </div>
                </div>
              </div>

              {/* Landmark proximity */}
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="font-semibold text-white">Transit Distances within Mysuru:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-400 font-mono-numbers">
                  <div>· Apollo Hospital: <strong className="text-slate-200">200m</strong></div>
                  <div>· Saraswathipuram: <strong className="text-slate-200">1.5 km</strong></div>
                  <div>· Mysore Palace: <strong className="text-slate-200">4.2 km</strong></div>
                  <div>· Mysore Rly Stn: <strong className="text-slate-200">4.8 km</strong></div>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Contact, Address & Directions (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            
            <div className="space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Center Address & Coordinates
                </span>
                <h3 className="text-lg font-bold text-white">
                  iCareZone Kuvempunagar
                </h3>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Physical Address:</div>
                    <p className="text-slate-300 leading-relaxed mt-0.5">
                      {ICAREZONE_INFO.address}
                    </p>
                    <p className="text-sky-400 font-medium mt-1">
                      Landmark: {ICAREZONE_INFO.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Operating Hours:</div>
                    <p className="text-slate-300 mt-0.5">
                      {ICAREZONE_INFO.hoursWeekday}
                    </p>
                    <p className="text-slate-400 mt-0.5">
                      {ICAREZONE_INFO.hoursSunday}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Call Desk / WhatsApp:</div>
                    <a 
                      href={`tel:${ICAREZONE_INFO.phoneClean}`}
                      className="text-sky-400 hover:underline font-mono-numbers font-medium block mt-0.5"
                    >
                      {ICAREZONE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Direct Email:</div>
                    <a 
                      href={`mailto:${ICAREZONE_INFO.email}`}
                      className="text-slate-300 hover:text-white block mt-0.5 font-mono-numbers"
                    >
                      {ICAREZONE_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Directions Button */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps (Get Directions)</span>
              </a>

              <a
                href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20can%20you%20share%20your%20current%20Google%20Maps%20location%20pin%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request WhatsApp Location Pin</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
