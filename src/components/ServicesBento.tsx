import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  Cpu, 
  Layers, 
  Zap, 
  CheckCircle2,
  Lock
} from 'lucide-react';

interface ServicesBentoProps {
  onOpenBooking: () => void;
}

export const ServicesBento: React.FC<ServicesBentoProps> = ({ onOpenBooking }) => {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Engineering & Diagnostics
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Advanced Hardware Restoration Beyond Standard Part Swaps
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            While basic shops only swap entire expensive modular assemblies, iCareZone operates precision micro-soldering microscopes, laser decapping chambers, and BGA re-balling machines right here in Mysore.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Featured MacBook Logic Board (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              
              <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="text-xs font-mono-numbers text-sky-400 font-semibold">
                    01. Chip-Level Logic Board Repair
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    MacBook M1 / M2 / M3 & Intel Motherboard Specialist
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Experiencing no power, liquid spills, or black display on your MacBook? Authorized centers frequently demand ₹40,000+ to replace the whole board. We diagnose and replace faulty PMICs, shorted capacitors, and NAND power rails under 45x magnification.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Save 60–75% over full Apple board replacement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Complete SSD customer data preserved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ultrasonic flux and corrosion neutralization bath</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                  >
                    <span>Consult MacBook Technician</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>

              {/* Mac logic board image slot */}
              <div className="relative min-h-[240px] sm:min-h-full bg-slate-950 overflow-hidden border-t sm:border-t-0 sm:border-l border-slate-800">
                <img
                  src="/src/assets/images/icarezone_macbook_repair_1793810450965.jpg"
                  alt="Technician repairing Apple MacBook M-series logic board with micro-soldering tweezers"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent sm:bg-gradient-to-r" />
              </div>

            </div>
          </div>

          {/* Card 2: iPhone Screen & TrueTone */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-800/40 text-sky-400 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono-numbers text-sky-400 font-semibold">
                02. Express Screen Care
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                OLED & TrueTone Swaps in 30 Minutes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Retain original 120Hz ProMotion smoothness, high nits brightness, and oleophobic finger glide. We reprogram EEPROM display chips so your TrueTone and ambient sensor remain 100% active.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-white font-medium">180-Day Warranty</span> · Live viewing at Kuvempunagar center
            </div>
          </div>

          {/* Card 3: Cold-Laser Back Glass Replacement */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/40 text-indigo-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono-numbers text-indigo-400 font-semibold">
                03. Laser Separation
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                Non-Invasive Laser Back Glass Removal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Traditional heat guns warp internal wireless charging coils and battery adhesives. Our specialized fiber laser vaporizes the back adhesive without disassembling the device or damaging the aerospace-grade chassis.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-white font-medium">Zero Scratch Guarantee</span> · iPhone 12 through 15 Series
            </div>
          </div>

          {/* Card 4: Battery Health & BMS Rework */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono-numbers text-emerald-400 font-semibold">
                04. Battery Restoration
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                100% Battery Health & Zero Popups
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cheap replacement batteries cause "Important Battery Message" alerts in iOS. We spot-weld your original BMS board onto premium Grade-A high-density cells, restoring full 100% health reporting and cycle diagnostics.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-white font-medium">Spot-Welded BMS</span> · Certified 800+ cycle rating
            </div>
          </div>

          {/* Card 5: Strict Zero-Data-Wipe Guarantee */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between group hover:border-slate-700 transition-colors">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/40 text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono-numbers text-amber-400 font-semibold">
                05. Privacy Security
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                100% Privacy & Zero Data Erasure
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Authorized stores often wipe your entire phone before accepting it. At iCareZone Mysore, your confidential personal memories, banking apps, and sensitive client documents remain locked and untouched throughout the repair.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
              <span className="text-white font-medium">No Passcode Needed</span> for display & battery swaps
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
