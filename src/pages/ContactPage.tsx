import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquare, 
  Mail, 
  Send, 
  CheckCircle, 
  ExternalLink,
  Calendar
} from 'lucide-react';
import { BusinessSettings } from '../types/index.ts';

interface ContactPageProps {
  settings?: BusinessSettings | null;
  onNavigate: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ settings, onNavigate }) => {
  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');
  const whatsapp = settings?.whatsapp || '918050804656';
  const address = settings?.address || '14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023';

  // Contact form state
  const [name, setName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [device, setDevice] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !customerPhone || !message) return;
    
    // Create WhatsApp direct link or submit
    const text = `Hello iCare zone,

Name: ${name}
Phone: ${customerPhone}
Device: ${device || 'Apple Device'}
Enquiry: ${message}`;

    const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Get in Touch • Mysuru Center
          </span>
          <h1 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
            Contact Apple Repair Experts
          </h1>
          <p className="text-xs sm:text-sm text-[#747982]">
            Visit our repair desk in Kuvempu Nagara or connect directly for immediate repair advice.
          </p>
        </div>

        {/* Contact Info & Form Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 sm:p-8 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-[#17191D] border-b border-gray-100 pb-3">
                Store Information
              </h2>

              <div className="space-y-5 text-xs text-[#545963]">
                
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17191D]">Workshop Address</h3>
                    <p className="mt-1 leading-relaxed">
                      {address}
                    </p>
                    <a
                      href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-xs font-bold text-blue-600 hover:underline mt-2"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17191D]">Phone Helpline</h3>
                    <a href={`tel:${phoneClean}`} className="text-blue-600 font-bold text-sm mt-1 block hover:underline">
                      {phone}
                    </a>
                    <p className="text-[11px] text-[#747982] mt-0.5">Click to call immediately</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17191D]">WhatsApp Chat</h3>
                    <a
                      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello iCare zone, I have a query about Apple repair services in Mysuru.")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 font-bold text-sm mt-1 block hover:underline"
                    >
                      +91 80508 04656
                    </a>
                    <p className="text-[11px] text-[#747982] mt-0.5">Fast message response during business hours</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#17191D]">Business Working Hours</h3>
                    <p className="mt-1 font-medium text-[#17191D]">Monday – Saturday: 10:00 AM – 8:30 PM</p>
                    <p className="text-[#747982]">Sunday: 10:30 AM – 6:00 PM</p>
                  </div>
                </div>

              </div>

              {/* Action booking banner */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#17191D]">Prefer a dedicated time slot?</p>
                  <p className="text-[11px] text-[#545963]">Book priority workbench check-in online.</p>
                </div>
                <button
                  onClick={() => onNavigate('book')}
                  className="px-3.5 py-2 bg-[#1677FF] hover:bg-blue-600 text-white rounded-lg text-xs font-bold shrink-0 shadow-xs"
                >
                  Book Slot
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Contact & WhatsApp Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 sm:p-8 shadow-xs space-y-6">
              
              <div>
                <h2 className="text-lg font-bold text-[#17191D]">Send a Direct Repair Inquiry</h2>
                <p className="text-xs text-[#747982] mt-1">
                  Fill in your details and send your query straight to our technician desk.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold">Inquiry Sent via WhatsApp!</h3>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                    We've opened WhatsApp with your message so you can chat with our Mysuru technicians.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold text-emerald-800 underline"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-[#17191D]">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suresh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-[#17191D]">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-gray-50 border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#17191D]">Apple Device Model</label>
                    <input
                      type="text"
                      placeholder="e.g. iPhone 15 Pro, MacBook Air M2, iPad 9th Gen"
                      value={device}
                      onChange={(e) => setDevice(e.target.value)}
                      className="w-full bg-gray-50 border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#17191D]">How can we help? *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Explain symptoms, battery issues, cracked lens, charging problems, or data recovery requests..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-gray-50 border border-[#E8E9ED] rounded-xl p-3 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1677FF] hover:bg-blue-600 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message on WhatsApp</span>
                  </button>

                  <p className="text-[11px] text-gray-400 text-center">
                    Submitting opens WhatsApp with your pre-filled inquiry.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
