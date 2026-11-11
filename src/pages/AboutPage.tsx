import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Wrench, 
  CheckCircle2, 
  Award, 
  Cpu, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { BusinessSettings } from '../types/index.ts';

interface AboutPageProps {
  settings?: BusinessSettings | null;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ settings, onNavigate }) => {
  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');

  return (
    <div className="py-12 bg-white min-h-screen space-y-16">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            About iCare zone • Mysuru
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight">
            Dedicated Independent Apple Device Specialists
          </h1>
          <p className="text-sm sm:text-base text-[#545963] leading-relaxed">
            Located in Kuvempu Nagara, Mysuru, iCare zone was established to provide reliable, transparent, and microscopic-precision repair services for Apple device owners.
          </p>
        </div>
      </section>

      {/* Story & Facility Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] tracking-tight">
              Honest Diagnostics & Careful Hardware Restoration
            </h2>
            <p className="text-xs sm:text-sm text-[#545963] leading-relaxed">
              Modern smartphones and laptops require specialized ESD-safe work environments, calibrated thermal separation plates, and stereomicroscopes. Rather than generic part swapping, our technicians methodically isolate motherboard line shorts, sensor flex faults, and battery health degradation.
            </p>
            <p className="text-xs sm:text-sm text-[#545963] leading-relaxed">
              We operate strictly by appointment to guarantee that every customer's device receives focused attention without rushed workbench turnaround.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-[#17191D] font-medium">
                  <strong>Upfront Inspection:</strong> We explain the required repair and costs before initiating any physical work.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-[#17191D] font-medium">
                  <strong>Data Privacy Respect:</strong> Your personal data, photos, and messages are handled with strict privacy protocols.
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-[#17191D] font-medium">
                  <strong>Dedicated Mysuru Center:</strong> Direct walk-in diagnostic counter with easy landmark access opposite Pizza Hut.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('book')}
                className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs inline-flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule a Repair Visit</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl bg-[#111318] text-white p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <img
                  src="/assets/aistudio/icare_zone_logo_white_c1cb0468.png"
                  alt="iCare zone"
                  className="h-10 w-auto object-contain"
                />
                <span className="text-[11px] font-bold text-blue-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Mysuru Center
                </span>
              </div>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-white font-bold flex items-center">
                    <ShieldCheck className="w-4 h-4 text-blue-400 mr-1.5" />
                    ESD-Protected Diagnostic Workbench
                  </span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Static-shielded mats, grounding wrist straps, and temperature-controlled heating plates for safe Apple logic board inspections.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-white font-bold flex items-center">
                    <Wrench className="w-4 h-4 text-blue-400 mr-1.5" />
                    Optical Microscope Inspection
                  </span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    High-magnification binocular stereomicroscopes for micro-soldering, flex cable alignment, and charging port pin restoration.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-white font-bold flex items-center">
                    <Clock className="w-4 h-4 text-emerald-400 mr-1.5" />
                    Appointment-First Priority Intake
                  </span>
                  <p className="text-gray-400 leading-relaxed text-[11px]">
                    Reserved workbench slots ensure zero customer queuing and dedicated attention to your iPhone, iPad, or Mac.
                  </p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-gray-400">
                  14/4, Ramanamaharshi Road, near Apollo BGS Hospital, Kuvempu Nagara, Mysuru
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Credibility Counters */}
      <section className="bg-[#F5F6F8] py-12 border-y border-[#E8E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="bg-white p-6 rounded-2xl border border-[#E8E9ED] space-y-1">
              <div className="flex items-center justify-center text-amber-500 font-black text-2xl">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400 mr-1" />
                <span>4.9 / 5</span>
              </div>
              <p className="text-xs text-[#747982] font-semibold">Google Verified Rating</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E9ED] space-y-1">
              <p className="text-2xl font-black text-[#17191D]">694</p>
              <p className="text-xs text-[#747982] font-semibold">Genuine Reviews on Maps</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E9ED] space-y-1">
              <p className="text-2xl font-black text-[#1677FF]">100%</p>
              <p className="text-xs text-[#747982] font-semibold">Independent Facility</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E8E9ED] space-y-1">
              <p className="text-2xl font-black text-[#17191D]">Mysuru</p>
              <p className="text-xs text-[#747982] font-semibold">Kuvempu Nagara Hub</p>
            </div>

          </div>
        </div>
      </section>

      {/* Address & Operational Ethics Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gray-50 border border-[#E8E9ED] space-y-3 text-xs text-[#545963]">
          <h3 className="font-bold text-sm text-[#17191D]">Our Location & Service Ethics</h3>
          <p>
            iCare zone is located at <strong>14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023</strong>.
          </p>
          <p>
            We operate transparently as an independent technical repair and diagnostic shop for Apple devices in Mysuru. We do not claim official affiliation or authorization by Apple Inc., allowing us to offer flexible, cost-effective, and attentive component-level repairs directly to our clients.
          </p>
        </div>
      </section>

    </div>
  );
};
