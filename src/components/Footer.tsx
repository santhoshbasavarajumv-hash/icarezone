import React from 'react';
import { ICAREZONE_INFO } from '../data/repairData.ts';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                iCare<span className="text-sky-400">Zone</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Mysore's premier Apple and gadget care center. Express 30-minute screen and battery replacements, chip-level logic board micro-soldering, and complimentary doorstep pickup across Mysuru.
            </p>
            <div className="text-slate-400 font-mono-numbers">
              GST & Business Verified · Mysuru, Karnataka
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Specialized Services
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">iPhone Screen & Battery Replacement</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">MacBook M1/M2/M3 Logic Board Repair</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Cold Laser Back Glass Separation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">iPad Digitizer & Glass Lamination</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Apple Watch Curved Screen & Battery</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Water & Liquid Damage Ultrasonic Recovery</a></li>
            </ul>
          </div>

          {/* Col 3: Mysore Localities Covered */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Doorstep Mysore Hubs
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>· Kuvempunagar & Saraswathipuram</li>
              <li>· Vijayanagar (1st to 4th Stage)</li>
              <li>· Gokulam & Jayalakshmipuram</li>
              <li>· Yadavagiri & Ramakrishnanagar</li>
              <li>· Bogadi & Dattagalli</li>
              <li>· Hebbal Industrial & Infosys Area</li>
            </ul>
          </div>

          {/* Col 4: Flagship Contact */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Kuvempunagar Lab
            </div>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>14/4, Ramanamaharshi Rd, P & T Block, Kuvempu Nagara, Mysuru 570023</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`tel:${ICAREZONE_INFO.phoneClean}`} className="hover:text-white font-mono-numbers">
                  {ICAREZONE_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <a href={`mailto:${ICAREZONE_INFO.email}`} className="hover:text-white font-mono-numbers">
                  {ICAREZONE_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mon–Sat: 10am–8:30pm · Sun: 11am–5pm</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal notice & Trademark disclaimer */}
        <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-400 space-y-3">
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> iCareZone is an independent repair and service facility in Mysore. Apple, iPhone, iPad, MacBook, Apple Watch, and associated marks are trademarks of Apple Inc., registered in the U.S. and other countries. Use of these terms is strictly for device identification and compatibility purposes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400">
            <div>
              © {new Date().getFullYear()} iCareZone Mysore. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Managed by Santhosh</span>
              <span aria-hidden="true">·</span>
              <span>180-Day Warranty Protection</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
