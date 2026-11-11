import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Search,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Appointment, BusinessSettings } from '../types/index.ts';
import { api } from '../services/api.ts';

interface BookingConfirmationPageProps {
  bookingRef?: string | null;
  initialBooking?: Appointment | null;
  settings?: BusinessSettings | null;
  onNavigate: (tab: string) => void;
}

export const BookingConfirmationPage: React.FC<BookingConfirmationPageProps> = ({
  bookingRef,
  initialBooking,
  settings,
  onNavigate
}) => {
  const [booking, setBooking] = useState<Appointment | null>(initialBooking || null);
  const [loading, setLoading] = useState<boolean>(!initialBooking && !!bookingRef);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchRef, setSearchRef] = useState<string>('');

  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');
  const whatsappNumber = settings?.whatsapp || '918050804656';
  const address = settings?.address || '14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023';

  useEffect(() => {
    if (bookingRef && (!booking || booking.booking_reference !== bookingRef)) {
      setLoading(true);
      setError(null);
      api.getAppointmentByRef(bookingRef)
        .then((data) => {
          setBooking(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Appointment not found.');
          setLoading(false);
        });
    }
  }, [bookingRef]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    setLoading(true);
    setError(null);
    api.getAppointmentByRef(searchRef.trim().toUpperCase())
      .then((data) => {
        setBooking(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'No appointment found with that reference.');
        setLoading(false);
      });
  };

  const handleCopyRef = () => {
    if (booking?.booking_reference) {
      navigator.clipboard.writeText(booking.booking_reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Build WhatsApp template as specified in prompt:
  // "Hello iCare zone, I would like to enquire about my repair appointment.
  // Booking Reference: [BOOKING_ID] Device: [DEVICE] Service: [SERVICE] Date: [DATE] Time: [TIME]
  // Please confirm my appointment."
  const buildWhatsAppUrl = () => {
    if (!booking) return '';
    const serviceNames = booking.services?.map(s => s.name).join(', ') || 'Apple Diagnostic & Repair';
    const rawText = `Hello iCare zone, I would like to enquire about my repair appointment.

Booking Reference: ${booking.booking_reference}
Device: ${booking.device_category} (${booking.device_model})
Service: ${serviceNames}
Date: ${booking.appointment_date}
Time: ${booking.start_time} IST

Please confirm my appointment.`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(rawText)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold text-xs">Confirmed by Workshop</span>;
      case 'In Progress':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-bold text-xs">On Diagnostic Bench</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-bold text-xs">Repair Completed / Ready for Pickup</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold text-xs">Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-xs">Pending Workshop Review</span>;
    }
  };

  return (
    <div className="py-12 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation back */}
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Home</span>
        </button>

        {/* Reference Search Box if looking up */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E9ED] shadow-xs">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Lookup another booking reference (e.g. ICZ-48291)"
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 bg-gray-50 border border-[#E8E9ED] rounded-xl text-xs text-[#17191D] uppercase font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#17191D] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl border border-[#E8E9ED] p-12 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1677FF] mx-auto" />
            <p className="text-xs text-[#747982]">Fetching your appointment details...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-200 p-8 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <h3 className="font-bold text-base text-[#17191D]">Booking Not Found</h3>
            <p className="text-xs text-[#747982] max-w-sm mx-auto">{error}</p>
            <button
              onClick={() => onNavigate('book')}
              className="px-5 py-2.5 bg-[#1677FF] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Book a New Appointment
            </button>
          </div>
        ) : booking ? (
          /* Confirmation Receipt Card */
          <div className="bg-white rounded-3xl border border-[#E8E9ED] shadow-sm overflow-hidden print:border-none print:shadow-none">
            
            {/* Header banner */}
            <div className="bg-gradient-to-r from-[#17191D] to-[#252830] text-white p-6 sm:p-8 text-center relative">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black tracking-tight">Appointment Successfully Booked</h1>
              <p className="text-xs text-gray-300 mt-1">
                Your time slot has been secured at Apple Repair Experts – iCare zone.
              </p>

              {/* Unique Booking Reference Code */}
              <div className="mt-5 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                <span className="text-xs text-gray-300">Reference:</span>
                <span className="text-lg font-black tracking-widest text-white font-mono">
                  {booking.booking_reference}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="p-1 hover:text-blue-300 text-gray-300 transition-colors"
                  title="Copy reference"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
              </div>
            </div>

            {/* Receipt Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Status and timestamp */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E8E9ED] gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                    Current Status
                  </span>
                  <div className="mt-1">
                    {getStatusBadge(booking.status)}
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                    Intake Date & Slot
                  </span>
                  <p className="text-sm font-bold text-[#17191D] flex items-center justify-end space-x-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{booking.appointment_date}</span>
                    <span className="text-gray-400">@</span>
                    <span>{booking.start_time} IST</span>
                  </p>
                </div>
              </div>

              {/* Device and Customer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-[#E8E9ED]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                    Device Information
                  </span>
                  <p className="text-sm font-bold text-[#17191D] mt-1">
                    {booking.device_category} – {booking.device_model}
                  </p>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                      Requested Services
                    </span>
                    <div className="mt-1 space-y-1">
                      {booking.services && booking.services.length > 0 ? (
                        booking.services.map((s) => (
                          <div key={s.id} className="text-xs text-[#17191D] flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                            <span>{s.name}</span>
                            <span className="text-[11px] font-medium text-gray-500">Diagnostic Inspection</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500">Apple Hardware Diagnostics</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                    Customer Details
                  </span>
                  <p className="text-sm font-bold text-[#17191D] mt-1">
                    {booking.customer_name}
                  </p>
                  <p className="text-xs text-[#545963] mt-0.5">
                    +91 {booking.customer_phone}
                  </p>
                  <div className="mt-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                      Issue Description
                    </span>
                    <p className="text-xs text-[#545963] mt-1 bg-gray-50 p-2.5 rounded-lg border border-gray-100 italic">
                      "{booking.problem_description}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Workshop Location & Directions */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center text-[#17191D] font-bold">
                    <MapPin className="w-4 h-4 text-rose-500 mr-1.5 shrink-0" />
                    <span>iCare zone Workshop Location</span>
                  </div>
                  <p className="text-[#545963] pl-5.5 leading-relaxed">
                    {address}
                  </p>
                </div>

                <a
                  href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-white text-[#17191D] border border-blue-200 rounded-xl font-bold text-xs hover:bg-blue-50 transition-colors flex items-center space-x-1 shrink-0"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Action Buttons: WhatsApp Integration (Mandatory) & Phone Call */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                
                {/* Send pre-formatted WhatsApp enquiry */}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Details on WhatsApp</span>
                </a>

                {/* Call Shop */}
                <a
                  href={`tel:${phoneClean}`}
                  className="p-3.5 bg-[#17191D] hover:bg-black text-white rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Workshop ({phone})</span>
                </a>

              </div>

              {/* Print Receipt button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800 inline-flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5 mr-1" />
                  <span>Print / Save Confirmation Receipt</span>
                </button>
              </div>

            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8E9ED] p-12 text-center space-y-3">
            <h3 className="font-bold text-base text-[#17191D]">Track Your Appointment</h3>
            <p className="text-xs text-[#747982]">Enter your booking reference code above to see live diagnostic and repair status.</p>
          </div>
        )}

      </div>
    </div>
  );
};
