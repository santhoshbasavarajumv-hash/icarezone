import React from 'react';
import { ShieldCheck, Cpu, DollarSign, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest">
              <span>About iCareZone Mysore</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight" style={{ textWrap: 'balance' }}>
              Bringing Your Apple & Smart Devices <span className="text-sky-400">Back to Life</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              When an iPhone screen breaks or a MacBook suffers a liquid spill, authorized service centers routinely declare the entire device irreparable or demand up to 70% of a brand-new device's price for complete logic board and chassis replacements.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              At <strong>iCareZone Mysore</strong>, our philosophy is grounded in precision engineering and component-level repair. From our state-of-the-art service facility in Kuvempunagar, we use stereoscopic microscopes, cold laser glass separators, and ultrasonic cleaning baths to fix the exact damaged component—saving you money while preserving 100% of your personal data.
            </p>

            {/* Comparison Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Authorized Center Route</span>
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5 leading-snug">
                  <li>• Mandatory full data erasure / device wipe</li>
                  <li>• High cost: Replaces entire motherboard module</li>
                  <li>• 7 to 14 days waiting time</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>The iCareZone Mysore Way</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 leading-snug">
                  <li>• 100% Zero-Data-Wipe Guarantee</li>
                  <li>• Chip-level repair saves up to 70% cost</li>
                  <li>• 30-min express fixes & live customer viewing</li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl transition-all shadow-md shadow-sky-500/20 cursor-pointer"
              >
                <span>Book a Free Diagnosis in Mysore</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Key Metrics Bento (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-3xl font-extrabold text-white font-mono-numbers">
                14,800+
              </div>
              <div className="text-xs font-semibold text-sky-400">
                Devices Restored
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                iPhones, MacBooks, iPads & Watches repaired with precision in Mysore.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-3xl font-extrabold text-white font-mono-numbers">
                30 Mins
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Express Turnaround
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Screen and battery swaps completed while you wait in our Kuvempunagar lounge.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-3xl font-extrabold text-white font-mono-numbers">
                180 Days
              </div>
              <div className="text-xs font-semibold text-amber-400">
                Warranty Protection
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Comprehensive replacement warranty on screens, batteries & internal parts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-3xl font-extrabold text-white font-mono-numbers">
                4.9 ★
              </div>
              <div className="text-xs font-semibold text-sky-400">
                Google Rating
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Over 640+ verified local customer reviews from across Mysuru.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
