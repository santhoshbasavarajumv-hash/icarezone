import React from 'react';
import { PhoneCall, CalendarCheck, Wrench, ArrowRight } from 'lucide-react';
import { ICAREZONE_INFO } from '../data/repairData.ts';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      step: '01',
      title: 'Contact Us or Submit Form',
      desc: 'Call us directly at +91 80508 04656, chat on WhatsApp, or book a slot through our online portal in under 30 seconds.',
      icon: <PhoneCall className="w-5 h-5 text-sky-400" />,
    },
    {
      step: '02',
      title: 'Walk-In or Free Doorstep Pickup',
      desc: 'Visit our flagship service center in Kuvempunagar (opposite Pizza Hut) or request our doorstep executive to collect your device from anywhere in Mysore.',
      icon: <CalendarCheck className="w-5 h-5 text-sky-400" />,
    },
    {
      step: '03',
      title: 'Expert Repair & Tested Handover',
      desc: 'Our certified technician diagnoses and repairs your gadget using original grade parts, conducts 24-point testing, and provides your warranty card.',
      icon: <Wrench className="w-5 h-5 text-sky-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Getting Your Apple Device Repaired is Easy
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            No long queues, no endless wait times, and zero confusion. Here is how we get your device fixed fast.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 relative group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-white">
                  {s.icon}
                </div>
                <span className="text-3xl font-extrabold text-slate-800 group-hover:text-sky-500/30 transition-colors font-mono-numbers">
                  {s.step}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer"
          >
            <span>Start Your Repair Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
