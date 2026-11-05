import React, { useState } from 'react';
import { ICAREZONE_INFO } from '../data/repairData.ts';
import { Menu, X, Phone, ShieldCheck, MapPin, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      {/* Top Announcement & Quick Contact Bar (icareplus.in style) */}
      <div className="bg-slate-900 border-b border-slate-800/80 py-1.5 px-4 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="text-sky-400 font-semibold flex items-center gap-1 shrink-0">
              <MapPin className="w-3.5 h-3.5" /> Mysore Flagship:
            </span>
            <span className="truncate">Opp. Pizza Hut, Kuvempunagar · Free Doorstep Pickup across Mysuru</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-slate-400">
            <span className="hidden sm:inline">Mon–Sat 10:00 AM – 8:30 PM</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <a 
              href={`tel:${ICAREZONE_INFO.phoneClean}`} 
              className="text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3" /> Call {ICAREZONE_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Logo Brand Zone */}
          <a href="#" className="flex items-center gap-2 shrink-0 group focus:outline-none">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors whitespace-nowrap">
                iCare<span className="text-sky-400">Zone</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-medium -mt-1">
                Apple Repair Experts Mysore
              </span>
            </div>
          </a>

          {/* Navigation Links (matching icareplus template) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap">
              Home
            </a>
            <a href="#about" className="hover:text-white transition-colors whitespace-nowrap">
              About Us
            </a>

            {/* Services Link / Anchor */}
            <div className="relative group">
              <a 
                href="#services" 
                className="hover:text-white transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              >
                <span>Our Services</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </a>

              {/* Hover Dropdown */}
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block w-52 z-50">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl text-xs space-y-1">
                  <a href="#services" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
                    iPhone Repair
                  </a>
                  <a href="#services" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
                    MacBook Repair (M1/M2/M3)
                  </a>
                  <a href="#services" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
                    iPad & Tablet Repair
                  </a>
                  <a href="#services" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
                    Apple Watch Repair
                  </a>
                  <a href="#services" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
                    iMac & Mac Mini Care
                  </a>
                </div>
              </div>
            </div>

            <a href="#why-us" className="hover:text-white transition-colors whitespace-nowrap">
              Why Us
            </a>
            <a href="#estimator" className="hover:text-white transition-colors whitespace-nowrap">
              Price Estimator
            </a>
            <a href="#tracker" className="hover:text-white transition-colors whitespace-nowrap">
              Track Repair
            </a>
            <a href="#stores" className="hover:text-white transition-colors whitespace-nowrap">
              Our Stores
            </a>
          </nav>

          {/* Action Zone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-md shadow-sky-500/20 transition-all whitespace-nowrap cursor-pointer"
            >
              Book a Free Diagnosis
            </button>
          </div>

          {/* Mobile hamburger trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-500 rounded-lg sm:hidden whitespace-nowrap cursor-pointer"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1.5 text-sm font-medium text-slate-300">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              About iCareZone
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Our Services (iPhone, MacBook, iPad, Watch)
            </a>
            <a 
              href="#why-us" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Why Choose Us
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Instant Price Calculator
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Track Repair Status
            </a>
            <a 
              href="#stores" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
            >
              Our Stores (Kuvempunagar & Saraswathipuram)
            </a>
          </nav>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-white bg-sky-500 rounded-xl"
            >
              Book a Free Diagnosis
            </button>
            <a
              href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20I%20would%20like%20to%20inquire%20about%20a%20repair`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 text-center text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 rounded-xl"
            >
              Chat on WhatsApp ({ICAREZONE_INFO.phone})
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
