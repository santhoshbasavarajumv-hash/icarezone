import React, { useState } from 'react';
import { 
  Wrench, 
  Phone, 
  Calendar, 
  Menu, 
  X, 
  ShieldCheck, 
  Search, 
  Lock,
  MapPin,
  Clock
} from 'lucide-react';
import { BusinessSettings } from '../types/index.ts';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, param?: any) => void;
  settings?: BusinessSettings | null;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  settings,
  onOpenAdmin,
  isAdminLoggedIn
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [refSearchOpen, setRefSearchOpen] = useState(false);
  const [refInput, setRefInput] = useState('');

  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');

  const handleRefSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (refInput.trim()) {
      onNavigate('confirmation', refInput.trim().toUpperCase());
      setRefInput('');
      setRefSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Main Persistent Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[5.25rem] py-2">
            {/* Logo */}
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <img
                src="/assets/aistudio/icare_zone_logo_white_c1cb0468.png"
                alt="iCare zone - Apple Repair Experts Mysuru"
                className="h-13 sm:h-16 w-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-200"
              />
              <div className="hidden sm:flex flex-col border-l border-gray-200 pl-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 w-fit">
                  Mysuru
                </span>
                <span className="text-[11px] text-[#747982] font-medium tracking-tight">
                  Apple Repair Experts
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all ${
                    currentTab === link.id
                      ? 'text-[#1677FF] bg-blue-50/70'
                      : 'text-[#17191D] hover:text-[#1677FF] hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Check Appointment Status Button */}
              <button
                onClick={() => setRefSearchOpen(!refSearchOpen)}
                className="text-xs font-semibold text-[#545963] hover:text-[#17191D] px-3.5 py-2.5 rounded-xl border border-[#E8E9ED] hover:border-gray-300 flex items-center space-x-1.5 transition-all bg-white"
                title="Lookup appointment by reference"
              >
                <Search className="w-3.5 h-3.5 text-gray-500" />
                <span>Track Repair</span>
              </button>

              {/* Primary Booking CTA */}
              <button
                onClick={() => onNavigate('book')}
                className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-[#1677FF] hover:bg-blue-600 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setRefSearchOpen(!refSearchOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg border border-[#E8E9ED]"
                aria-label="Track booking"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Reference Lookup Modal */}
        {refSearchOpen && (
          <div className="border-t border-[#E8E9ED] bg-gray-50/95 py-3 px-4 shadow-inner">
            <div className="max-w-md mx-auto">
              <form onSubmit={handleRefSearch} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Booking Ref (e.g. ICZ-48291)"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  className="flex-1 bg-white border border-[#E8E9ED] rounded-xl px-3.5 py-2 text-sm text-[#17191D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#17191D] text-white px-4 py-2 text-xs font-bold rounded-xl hover:bg-black transition-colors"
                >
                  Track
                </button>
                <button
                  type="button"
                  onClick={() => setRefSearchOpen(false)}
                  className="text-gray-400 hover:text-gray-600 px-2 text-xs"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E8E9ED] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
            <div className="px-2 py-1 text-xs text-gray-400 font-medium uppercase tracking-wider">
              Navigation
            </div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-xl font-semibold text-base transition-colors flex items-center justify-between ${
                  currentTab === link.id
                    ? 'bg-blue-50 text-[#1677FF]'
                    : 'text-[#17191D] hover:bg-gray-50'
                }`}
              >
                <span>{link.label}</span>
                {currentTab === link.id && <span className="w-2 h-2 rounded-full bg-[#1677FF]"></span>}
              </button>
            ))}

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button
                onClick={() => {
                  onNavigate('book');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-[#1677FF] text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-sm"
              >
                <Calendar className="w-5 h-5" />
                <span>Book a Repair Appointment</span>
              </button>

              <div className="pt-1">
                <a
                  href={`tel:${phoneClean}`}
                  className="w-full py-2.5 px-3 border border-gray-200 text-gray-800 rounded-xl font-semibold text-xs flex items-center justify-center space-x-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call {phone}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
