import React from 'react';
import { 
  Truck, 
  Wrench, 
  ShieldCheck, 
  BadgePercent, 
  Clock, 
  Lock, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: 'Free Mysore Doorstep Service',
      desc: 'Hassle-free complimentary pickup and delivery right from your doorstep in Kuvempunagar, Vijayanagar, Gokulam, Saraswathipuram, or Hebbal.',
      icon: <Truck className="w-5 h-5 text-sky-400" />,
      highlight: 'Express 45-Min Dispatch',
    },
    {
      title: 'Expert Chip-Level Technicians',
      desc: 'Our senior technicians are specialized in Apple hardware engineering—from microscopic BGA re-balling to complex multi-layer logic board troubleshooting.',
      icon: <Wrench className="w-5 h-5 text-sky-400" />,
      highlight: '12+ Years Experience',
    },
    {
      title: 'Original Grade Parts & Tools',
      desc: 'We utilize pristine TrueTone OLED panels, laser decapping chambers, and spot-welded battery cells to ensure factory performance and durability.',
      icon: <Sparkles className="w-5 h-5 text-sky-400" />,
      highlight: 'Zero Component Warnings',
    },
    {
      title: 'Transparent & Competitive Pricing',
      desc: 'No diagnostic fees and no unexpected surprise charges. You receive a clear, upfront quotation before any work begins on your device.',
      icon: <BadgePercent className="w-5 h-5 text-sky-400" />,
      highlight: 'Save up to 70% vs Apple',
    },
    {
      title: 'Up to 180-Day Comprehensive Warranty',
      desc: 'Every repair is backed by an authentic digital warranty certificate. If an installed component fails during warranty, we replace it instantly with zero questions.',
      icon: <ShieldCheck className="w-5 h-5 text-sky-400" />,
      highlight: 'Hassle-Free Replacement',
    },
    {
      title: '100% Data Confidentiality & Zero Wipe',
      desc: 'Unlike authorized stores that wipe your device clean, your photos, chats, work files, and banking credentials remain intact throughout our repair.',
      icon: <Lock className="w-5 h-5 text-sky-400" />,
      highlight: 'No Passcode Needed for Screens',
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Why Choose iCareZone
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            The Smarter Choice for Apple Repairs in Mysore
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Why pay exorbitant prices or wait weeks at authorized centers? Experience fast, transparent, and certified gadget care.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {pt.icon}
                </div>
                <span className="text-[11px] font-semibold text-sky-400 bg-sky-950/60 border border-sky-800/40 px-2.5 py-0.5 rounded-full">
                  {pt.highlight}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white">
                  {pt.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
