import React, { useState } from 'react';
import { ICAREZONE_INFO, MYSURU_AREAS, DEVICE_CATEGORIES, RepairTrackerJob } from '../data/repairData.ts';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  Phone, 
  Star, 
  Store, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreEstimator: () => void;
  onJobCreated?: (job: RepairTrackerJob) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
  onExploreEstimator,
  onJobCreated 
}) => {
  // Quick Diagnosis Lead Form in Hero (icareplus.in template style)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [device, setDevice] = useState('iPhone');
  const [issue, setIssue] = useState('Broken Screen / Touch issue');
  const [area, setArea] = useState('Kuvempunagar');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdJobId, setCreatedJobId] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and phone number to book diagnosis.');
      return;
    }

    const newId = `ICZ-${Math.floor(3000 + Math.random() * 6900)}`;
    setCreatedJobId(newId);
    setIsSuccess(true);

    if (onJobCreated) {
      const newJob: RepairTrackerJob = {
        jobId: newId,
        customerName: name.trim(),
        phoneEnding: `${phone.slice(0, 4)}***${phone.slice(-3)}`,
        device: `${device} (${issue})`,
        issue: issue,
        receivedDate: 'Just now (Hero Quick Booking)',
        estimatedDelivery: 'Today within 2 hours',
        statusStep: 1,
        statusLabel: 'Diagnosis Booked - Ticket Created',
        technicianNotes: `Inwarded from ${area}, Mysore. Customer reported ${issue}. Technician assigned for instant diagnosis.`,
        technicianName: 'Santhosh (Lead Apple Specialist)',
        warrantyPeriod: '180 Days Certified',
        pickupMode: `Doorstep Pickup (${area})` as any,
      };
      onJobCreated(newJob);
    }
  };

  const getWhatsAppBookingUrl = () => {
    const text = 
      `*New Free Diagnosis Booking - iCareZone Mysore*\n` +
      `*Job Reference:* ${createdJobId}\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Device:* ${device}\n` +
      `*Reported Issue:* ${issue}\n` +
      `*Mysore Area:* ${area}\n\n` +
      `_Please confirm my diagnosis / doorstep pickup slot._`;
    return `https://wa.me/${ICAREZONE_INFO.phoneClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-slate-950">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Trust Markers & Badges (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Tagline / Badge in icareplus style */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/50 text-xs font-semibold text-sky-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>#1 Apple & Gadget Repair Experts in Mysore</span>
            </div>

            {/* Main Hero Headline matching icareplus.in style */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]" style={{ textWrap: 'balance' }}>
              Expert repairs for every Apple device — <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">done fast, done right.</span>
            </h1>

            {/* Value proposition subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Certified technicians, original quality components, and express 30-minute turnarounds. Visit our Kuvempunagar flagship center or enjoy complimentary doorstep pickup and return across Mysuru.
            </p>

            {/* Trust Proof Metrics Strip (icareplus template signature) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center text-amber-400 gap-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-bold font-mono-numbers text-white text-sm">4.9 ★</span>
                </div>
                <div className="text-[11px] text-slate-400">640+ Google Reviews</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-sm font-bold text-white font-mono-numbers">14,800+</div>
                <div className="text-[11px] text-slate-400">Devices Repaired</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-sm font-bold text-emerald-400 font-mono-numbers">30 Mins</div>
                <div className="text-[11px] text-slate-400">Express Screen/Battery</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-sm font-bold text-sky-400 font-mono-numbers">180 Days</div>
                <div className="text-[11px] text-slate-400">Direct Warranty</div>
              </div>
            </div>

            {/* Key Service Guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Zero Data Wiped</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Live Technician Viewing</span>
              </div>
              <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Free Mysore Doorstep Pickup</span>
              </div>
            </div>

            {/* Actions for mobile or secondary CTA */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onExploreEstimator}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-700 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-sky-400" />
                <span>Calculate Repair Cost Range</span>
              </button>

              <a
                href={`tel:${ICAREZONE_INFO.phoneClean}`}
                className="px-4 py-3 text-xs sm:text-sm font-medium text-sky-400 hover:text-sky-300 border border-slate-800 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {ICAREZONE_INFO.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Embedded Quick Diagnosis Booking Form (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
              
              {/* Form Title */}
              <div className="space-y-1 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    Book a Free Diagnosis
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                    Free Inspection
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Instant response from Kuvempunagar center or free doorstep pickup.
                </p>
              </div>

              {isSuccess ? (
                /* Success Screen within Hero Form */
                <div className="py-6 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-sky-400 font-semibold uppercase tracking-wider">
                      Diagnosis Ticket Created
                    </div>
                    <div className="text-2xl font-bold text-white font-mono-numbers">
                      {createdJobId}
                    </div>
                    <p className="text-xs text-slate-300">
                      Thanks <strong className="text-white">{name}</strong>! We've scheduled your {device} inspection in {area}, Mysore.
                    </p>
                  </div>

                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Send Ticket to WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setPhone('');
                    }}
                    className="text-xs text-slate-400 hover:text-white underline pt-1 cursor-pointer"
                  >
                    Book another device
                  </button>
                </div>
              ) : (
                /* Hero Booking Form */
                <form onSubmit={handleHeroSubmit} className="pt-4 space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Anand Murthy"
                      className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98450 12345"
                      className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono-numbers focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Device Type
                      </label>
                      <select
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        <option value="iPhone">iPhone</option>
                        <option value="MacBook">MacBook</option>
                        <option value="iPad">iPad</option>
                        <option value="Apple Watch">Apple Watch</option>
                        <option value="iMac / Mac Mini">iMac / Mac Mini</option>
                        <option value="Samsung Galaxy / Android">Samsung / Android</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                        Mysore Area
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {MYSURU_AREAS.slice(0, 10).map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Problem / Service Needed
                    </label>
                    <select
                      value={issue}
                      onChange={(e) => setIssue(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded-xl px-3 py-2.5 text-xs text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Broken Screen / Touch issue">Broken Screen / Touch issue</option>
                      <option value="Battery Health & Rapid Drain">Battery Health & Rapid Drain</option>
                      <option value="Liquid / Water Spill Damage">Liquid / Water Spill Damage</option>
                      <option value="Dead Device / Logic Board Failure">Dead Device / Logic Board Failure</option>
                      <option value="Laser Back Glass Replacement">Laser Back Glass Replacement</option>
                      <option value="Charging Port / Audio issue">Charging Port / Audio issue</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Free Diagnosis & Pickup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-2">
                      <span>✓ 100% Free Inspection</span>
                      <span>·</span>
                      <span>✓ No Advance Fee</span>
                      <span>·</span>
                      <span>✓ Doorstep Service</span>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
