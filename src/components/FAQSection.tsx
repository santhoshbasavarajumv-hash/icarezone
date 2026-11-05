import React, { useState } from 'react';
import { FAQS, ICAREZONE_INFO } from '../data/repairData.ts';
import { ChevronDown, MessageCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-400">
            Clear, honest answers regarding data privacy, warranty, doorstep logistics, and parts authenticity.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp help banner */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-white">
              Have a rare device or specific liquid damage query?
            </div>
            <div className="text-xs text-slate-400">
              Speak directly with technician Santhosh on WhatsApp for instant diagnostic guidance.
            </div>
          </div>
          <a
            href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20I%20have%20a%20question%20regarding%20a%20repair`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Chat with Santhosh</span>
          </a>
        </div>

      </div>
    </section>
  );
};
