import React, { useState, useEffect } from 'react';
import { 
  DEVICE_CATEGORIES, 
  POPULAR_MODELS, 
  MYSURU_AREAS, 
  ICAREZONE_INFO,
  RepairTrackerJob
} from '../data/repairData.ts';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  Store, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  Smartphone,
  ExternalLink
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    deviceType?: string;
    modelName?: string;
    serviceName?: string;
    priceEstimate?: string;
  } | null;
  onJobCreated?: (newJob: RepairTrackerJob) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  prefill,
  onJobCreated 
}) => {
  const [serviceType, setServiceType] = useState<'doorstep' | 'instore'>('doorstep');
  const [deviceModel, setDeviceModel] = useState<string>('iPhone 14');
  const [issueDescription, setIssueDescription] = useState<string>('Screen crack / Battery drain');
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('Kuvempunagar');
  const [addressDetails, setAddressDetails] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>('Today (Express)');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('2:00 PM – 5:00 PM (Afternoon)');
  
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedJobId, setGeneratedJobId] = useState<string>('');

  useEffect(() => {
    if (prefill) {
      if (prefill.modelName) setDeviceModel(prefill.modelName);
      if (prefill.serviceName) setIssueDescription(prefill.serviceName);
    }
  }, [prefill]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phoneNumber.trim()) {
      alert('Please provide your name and phone number so technician Santhosh can contact you.');
      return;
    }

    const newId = `ICZ-${Math.floor(2000 + Math.random() * 7900)}`;
    setGeneratedJobId(newId);
    setIsSubmitted(true);

    if (onJobCreated) {
      const createdJob: RepairTrackerJob = {
        jobId: newId,
        customerName: customerName.trim(),
        phoneEnding: `${phoneNumber.slice(0, 4)}***${phoneNumber.slice(-3)}`,
        device: deviceModel,
        issue: issueDescription,
        receivedDate: 'Just now (Online Booking)',
        estimatedDelivery: 'Today within 2 hours',
        statusStep: 1,
        statusLabel: 'Booking Inwarded - Awaiting Logistics Dispatch',
        technicianNotes: `Pickup booked for ${selectedArea}, Mysore. Issue logged: ${issueDescription}. Express technician dispatch queued.`,
        technicianName: 'Santhosh (Lead Apple Specialist)',
        warrantyPeriod: '180 Days Certified',
        pickupMode: serviceType === 'doorstep' ? `Doorstep Pickup (${selectedArea})` as any : 'In-Store Kuvempunagar',
      };
      onJobCreated(createdJob);
    }
  };

  const constructWhatsAppMessage = () => {
    const text = 
      `*New Repair Booking - iCareZone Mysore*\n` +
      `*Job Reference:* ${generatedJobId}\n` +
      `*Customer:* ${customerName}\n` +
      `*Phone:* ${phoneNumber}\n` +
      `*Service Mode:* ${serviceType === 'doorstep' ? 'Free Doorstep Pickup' : 'In-Store Visit (Kuvempunagar)'}\n` +
      `*Device & Model:* ${deviceModel}\n` +
      `*Problem / Service:* ${issueDescription}\n` +
      `*Mysore Area:* ${selectedArea}\n` +
      (serviceType === 'doorstep' && addressDetails ? `*Address:* ${addressDetails}\n` : '') +
      `*Preferred Slot:* ${preferredDate} · ${preferredTimeSlot}\n\n` +
      `_Please confirm my pickup / priority slot._`;
    return encodeURIComponent(text);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isSubmitted ? 'Booking Confirmed' : 'Book Repair / Free Pickup'}
              </h3>
              <p className="text-[11px] text-slate-400">
                iCareZone Mysore · Kuvempunagar & Doorstep Coverage
              </p>
            </div>
          </div>
          
          <button
            onClick={resetForm}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="space-y-6 text-center py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
                  Ticket Generated
                </span>
                <div className="text-3xl font-extrabold text-white font-mono-numbers">
                  {generatedJobId}
                </div>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you <strong className="text-white">{customerName}</strong>! Your repair ticket for <strong className="text-white">{deviceModel}</strong> has been logged in our Mysore center.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-left space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Service Type:</span>
                  <span className="text-white font-medium capitalize">{serviceType === 'doorstep' ? 'Free Doorstep Pickup' : 'Kuvempunagar In-Store'}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Location / Area:</span>
                  <span className="text-white font-medium">{selectedArea}, Mysore</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Scheduled Time:</span>
                  <span className="text-white font-medium">{preferredDate} ({preferredTimeSlot})</span>
                </div>
              </div>

              {/* Instant WhatsApp Dispatch Action */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=${constructWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Dispatch via WhatsApp to Santhosh</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={resetForm}
                  className="w-full py-2.5 px-4 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
                >
                  Done & Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Service Type Switch */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Preferred Service Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setServiceType('doorstep')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      serviceType === 'doorstep'
                        ? 'bg-sky-500/15 border-sky-500 text-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Free Doorstep Pickup</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setServiceType('instore')}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      serviceType === 'instore'
                        ? 'bg-sky-500/15 border-sky-500 text-sky-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Visit Kuvempunagar Lab</span>
                  </button>
                </div>
              </div>

              {/* Device and Model */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Device Model
                  </label>
                  <input
                    type="text"
                    required
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                    placeholder="e.g. iPhone 15 Pro, MacBook M2"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Issue / Service Required
                  </label>
                  <input
                    type="text"
                    required
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="e.g. Broken Screen, Battery, Dead Boot"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Dr. Raghavendra"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono-numbers"
                  />
                </div>
              </div>

              {/* Mysore Area & Address Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Select Your Mysore Locality
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {MYSURU_AREAS.map(area => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {serviceType === 'doorstep' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Doorstep Pickup Address / Landmark
                    </label>
                    <input
                      type="text"
                      value={addressDetails}
                      onChange={(e) => setAddressDetails(e.target.value)}
                      placeholder="e.g. #145, 5th Cross, Near Rotary Club"
                      className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                )}
              </div>

              {/* Slot Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Preferred Date
                  </label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Today (Express)">Today (Express 45-Min Dispatch)</option>
                    <option value="Tomorrow Morning">Tomorrow Morning</option>
                    <option value="Tomorrow Afternoon">Tomorrow Afternoon</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Preferred Time Window
                  </label>
                  <select
                    value={preferredTimeSlot}
                    onChange={(e) => setPreferredTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="10:00 AM – 1:00 PM">10:00 AM – 1:00 PM (Morning)</option>
                    <option value="1:00 PM – 5:00 PM">1:00 PM – 5:00 PM (Afternoon)</option>
                    <option value="5:00 PM – 8:30 PM">5:00 PM – 8:30 PM (Evening)</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Booking & Generate Job Ticket</span>
                </button>
                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 mt-2">
                  <span>✓ 100% Data Confidential</span>
                  <span aria-hidden="true">·</span>
                  <span>✓ No Advance Fee</span>
                  <span aria-hidden="true">·</span>
                  <span>✓ 180 Days Warranty</span>
                </div>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
