import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Menu, 
  X, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  MessageCircle,
  Cpu,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  Building2,
  Wrench,
  AlertCircle,
  Truck,
  Car,
  Wifi,
  Coffee,
  Star,
  ChevronDown
} from 'lucide-react';
import { 
  ICAREZONE_INFO, 
  MYSURU_AREAS, 
  SAMPLE_TRACKER_JOBS, 
  POPULAR_MODELS, 
  REPAIR_SERVICES, 
  REVIEWS, 
  FAQS,
  RepairTrackerJob 
} from './data/repairData.ts';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick Diagnosis Lead Form in Hero
  const [heroForm, setHeroForm] = useState({
    name: '',
    phone: '',
    device: 'MacBook Pro / Air',
    issue: 'Liquid Spill / No Power',
    area: 'Kuvempunagar',
  });
  const [heroFormSubmitted, setHeroFormSubmitted] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState('');

  // Interactive Price Calculator State
  const [calcCategory, setCalcCategory] = useState<'iphone' | 'macbook' | 'ipad' | 'watch'>('macbook');
  const [calcModelId, setCalcModelId] = useState('mb-air-m2m3');
  const [calcServiceId, setCalcServiceId] = useState('mb-logic-mseries');

  // Interactive Repair Tracker State
  const [trackerQuery, setTrackerQuery] = useState('ICZ-7309');
  const [currentJob, setCurrentJob] = useState<RepairTrackerJob | null>(SAMPLE_TRACKER_JOBS['ICZ-7309']);
  const [trackerSearched, setTrackerSearched] = useState(true);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroForm.name.trim() || !heroForm.phone.trim()) {
      alert('Please provide your name and phone number to schedule diagnosis.');
      return;
    }

    const newId = `ICZ-${Math.floor(2000 + Math.random() * 7900)}`;
    setGeneratedTicket(newId);
    setHeroFormSubmitted(true);

    const whatsappMessage = 
      `*New Apple Diagnosis Booking - iCareZone Mysore*\n` +
      `*Ticket Reference:* ${newId}\n` +
      `*Customer:* ${heroForm.name}\n` +
      `*Phone:* ${heroForm.phone}\n` +
      `*Device:* ${heroForm.device}\n` +
      `*Reported Issue:* ${heroForm.issue}\n` +
      `*Mysore Area:* ${heroForm.area}\n\n` +
      `_Submitted via iCareZone Mysore Portal_`;

    window.open(`https://wa.me/918050804656?text=${encodeURIComponent(whatsappMessage)}`, '_blank', 'noopener');
  };

  const handleTrackerSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const q = trackerQuery.trim().toUpperCase();
    if (SAMPLE_TRACKER_JOBS[q]) {
      setCurrentJob(SAMPLE_TRACKER_JOBS[q]);
      setTrackerSearched(true);
      return;
    }
    const match = Object.values(SAMPLE_TRACKER_JOBS).find(j => 
      j.phoneEnding.includes(q) || j.jobId.includes(q)
    );
    setCurrentJob(match || null);
    setTrackerSearched(true);
  };

  const activeServices = REPAIR_SERVICES.filter(s => s.category === calcCategory);
  const activeModels = POPULAR_MODELS.filter(m => m.category === calcCategory);
  const selectedService = activeServices.find(s => s.id === calcServiceId) || activeServices[0] || REPAIR_SERVICES[0];
  const selectedModel = activeModels.find(m => m.id === calcModelId) || activeModels[0] || POPULAR_MODELS[0];

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* 1. TOP UTILITY ANNOUNCEMENT BAR (DEEP BLACK STRIP) */}
      <div className="bg-[#0a0a0a] text-neutral-300 py-2 px-4 text-xs">
        <div className="wb-container flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#cf2117] animate-pulse shrink-0" />
            <span className="text-white font-semibold shrink-0">Mysore Apple Lab:</span>
            <span className="text-neutral-400 truncate">
              Kuvempunagar (Opp. Pizza Hut, Near Apollo) · Free Doorstep Pickup Across Mysuru
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-400 shrink-0">
            <span>Mon–Sat: 10:00 AM – 8:30 PM</span>
            <span className="text-neutral-700">|</span>
            <a 
              href="tel:+918050804656" 
              className="text-white hover:text-[#cf2117] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#cf2117]" />
              <span>+91 80508 04656</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVIGATION BAR (CRISP WHITE BACKGROUND) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
        <div className="wb-container h-20 flex items-center justify-between gap-6">
          
          {/* Logo Brand Zone */}
          <a href="#" className="flex items-center gap-3 shrink-0 focus:outline-none">
            <img 
              src="/assets/aistudio/icare_zone_logo_black_ef1df5d2.png" 
              alt="iCareZone Mysore - Apple Device Repair Experts" 
              className="h-10 sm:h-12 w-auto object-contain hover:opacity-95 transition-opacity" 
            />
          </a>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold text-neutral-600">
            <a href="#" className="text-black hover:text-[#cf2117] transition-colors">
              Home
            </a>
            <a href="#macbook" className="hover:text-black transition-colors">
              MacBook Logic Board
            </a>
            <a href="#services" className="hover:text-black transition-colors">
              Device Services
            </a>
            <a href="#comparison" className="hover:text-black transition-colors">
              Why Component Repair
            </a>
            <a href="#estimator" className="hover:text-black transition-colors">
              Price Calculator
            </a>
            <a href="#tracker" className="hover:text-black transition-colors">
              Track Repair
            </a>
            <a href="#store" className="hover:text-black transition-colors">
              Kuvempunagar Lab
            </a>
          </nav>

          {/* Action Button & Phone */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918050804656?text=Hello%20iCareZone%2C%20I%20would%20like%20to%20book%20a%20free%20diagnosis%20for%20my%20Apple%20device."
              target="_blank"
              rel="noopener noreferrer"
              className="wb-btn-black hidden sm:inline-flex text-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#cf2117]" />
              <span>Book Diagnosis / Pickup</span>
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-neutral-200 px-6 py-4 space-y-3">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 font-semibold text-black"
            >
              Home
            </a>
            <a 
              href="#macbook" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              MacBook Logic Board &amp; Micro-Soldering
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              All Apple Services (iPhone, iPad, Watch, iMac)
            </a>
            <a 
              href="#comparison" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              Component Repair vs Board Swap
            </a>
            <a 
              href="#estimator" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              Instant Cost Calculator
            </a>
            <a 
              href="#tracker" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              Live Repair Status Tracker
            </a>
            <a 
              href="#store" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm py-1 text-neutral-600 hover:text-black"
            >
              Kuvempunagar Lab &amp; Timings
            </a>
            <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
              <a
                href="https://wa.me/918050804656?text=Hello%20iCareZone%2C%20I%20need%20repair%20support."
                target="_blank"
                rel="noopener noreferrer"
                className="wb-btn-black w-full py-2.5 text-center text-xs"
              >
                Chat on WhatsApp (+91 80508 04656)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION (CLEAN WHITE HERO WITH CONTRAST BLACK CARD) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24 wb-hero-grid border-b border-neutral-200">
        <div className="wb-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Proposition & Authority */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="wb-badge-outline">
                <span className="w-2 h-2 rounded-full bg-[#cf2117]" />
                <span>Premier Independent Apple Repair Hub · Mysuru</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] text-neutral-950">
                Logic-Board &amp; Chip-Level Diagnostics for <span className="text-[#cf2117]">Every Apple Device.</span>
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
                Beyond costly modular replacements. We repair down to the individual resistor, PMIC power rail, and NAND chip under stereo microscopes. Save up to 70% over authorized center replacement fees with <strong className="text-neutral-900 font-semibold">100% of your personal files preserved</strong>.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a 
                  href="https://wa.me/918050804656?text=Hello%20iCareZone%2C%20I%20would%20like%20to%20schedule%20a%20free%20Apple%20device%20diagnosis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-black"
                >
                  <span>Book Free Diagnosis</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href="#estimator" 
                  className="wb-btn-outline"
                >
                  <Wrench className="w-4 h-4 text-[#cf2117]" />
                  <span>Cost Estimator</span>
                </a>

                <a 
                  href="tel:+918050804656" 
                  className="px-4 py-3 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#cf2117]" />
                  <span>Call +91 80508 04656</span>
                </a>
              </div>

              {/* Key Proof Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-neutral-200">
                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-lg font-bold text-neutral-950 font-mono">14,800+</div>
                  <div className="text-[11px] text-neutral-600">Devices Restored</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-lg font-bold text-[#cf2117] font-mono">180 Days</div>
                  <div className="text-[11px] text-neutral-600">Direct Warranty</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-lg font-bold text-emerald-700 font-mono">30 Mins</div>
                  <div className="text-[11px] text-neutral-600">Express Screen/Battery</div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <div className="text-lg font-bold text-neutral-950 font-mono flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 ★
                  </div>
                  <div className="text-[11px] text-neutral-600">640+ Google Reviews</div>
                </div>
              </div>

            </div>

            {/* Right Column: Embedded Quick Diagnosis Card (White and Black Style) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border-2 border-neutral-900 rounded-2xl p-6 sm:p-8 shadow-xl relative">
                
                <div className="pb-4 border-b border-neutral-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950">
                      Book a Free Diagnosis
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Walk in to Kuvempunagar or request free Mysore doorstep pickup.
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Zero Bench Fee
                  </span>
                </div>

                {heroFormSubmitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-600 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
                      ✓
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-[#cf2117] font-semibold uppercase tracking-wider">
                        Diagnosis Ticket Created
                      </div>
                      <div className="text-2xl font-bold text-neutral-950 font-mono">
                        {generatedTicket}
                      </div>
                      <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                        Thank you <strong className="text-black">{heroForm.name}</strong>. Opening WhatsApp to connect with our senior technician Santhosh.
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/918050804656?text=${encodeURIComponent(
                        `Hello iCareZone, I submitted diagnosis enquiry ${generatedTicket} for my ${heroForm.device}. Problem: ${heroForm.issue}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="wb-btn-black w-full text-xs"
                    >
                      <MessageCircle className="w-4 h-4 text-[#cf2117]" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="pt-4 space-y-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={heroForm.name}
                        onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                        placeholder="e.g. Dr. Raghavendra / Vikram Rao"
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={heroForm.phone}
                        onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                        placeholder="+91 98450 12345"
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 font-mono focus:bg-white focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Apple Device
                        </label>
                        <select
                          value={heroForm.device}
                          onChange={(e) => setHeroForm({ ...heroForm, device: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-black"
                        >
                          <option value="MacBook Pro / Air">MacBook Pro / Air</option>
                          <option value="iPhone">iPhone</option>
                          <option value="iPad">iPad</option>
                          <option value="Apple Watch">Apple Watch</option>
                          <option value="iMac / Mac Mini">iMac / Mac Mini</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                          Mysore Area
                        </label>
                        <select
                          value={heroForm.area}
                          onChange={(e) => setHeroForm({ ...heroForm, area: e.target.value })}
                          className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-black"
                        >
                          {MYSURU_AREAS.slice(0, 10).map((a) => (
                            <option key={a} value={a}>{a}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Reported Symptoms / Fault
                      </label>
                      <select
                        value={heroForm.issue}
                        onChange={(e) => setHeroForm({ ...heroForm, issue: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 rounded-lg px-3 py-2.5 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:border-black"
                      >
                        <option value="Liquid Spill / No Power">Liquid Spill / No Power (Dead)</option>
                        <option value="Cracked Screen / Display Flickering">Cracked Screen / Display Flickering</option>
                        <option value="Battery Health Degraded / Swollen">Battery Health Degraded / Swollen</option>
                        <option value="Logic Board PMIC / Short Fault">Logic Board PMIC / Short Fault</option>
                        <option value="Laser Back Glass Replacement">Laser Back Glass Replacement</option>
                        <option value="Type-C Charging / Overheating">Type-C Charging / Overheating</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="wb-btn-black w-full text-xs"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#cf2117]" />
                        <span>Schedule Free Diagnosis &amp; Quote</span>
                      </button>
                      <div className="flex items-center justify-center gap-3 text-[10px] text-neutral-500 mt-2.5">
                        <span>✓ No Passcode Required</span>
                        <span>·</span>
                        <span>✓ 100% Data Preserved</span>
                        <span>·</span>
                        <span>✓ Free Pickup in Mysore</span>
                      </div>
                    </div>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MACBOOK LOGIC BOARD & MICRO-SOLDERING SPOTLIGHT */}
      <section id="macbook" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="wb-badge-black">
              Micro-Electronics Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              MacBook M1/M2/M3 &amp; Intel Logic Board Micro-Soldering
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Did an authorized center quote ₹40,000+ for a whole motherboard replacement? In 85% of dead or liquid-damaged MacBooks, only 2 or 3 tiny surface-mount capacitors or a power IC are burnt. We repair the board directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual: Macro Microscope Shot */}
            <div className="lg:col-span-6 wb-card overflow-hidden group">
              <div className="aspect-[4/3] w-full relative bg-neutral-900">
                <img 
                  src="/src/assets/images/icarezone_macbook_repair_1793810450965.jpg" 
                  alt="Technician inspecting Apple M1 MacBook logic board under stereo microscope"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/80 px-2.5 py-1 rounded backdrop-blur-md border border-neutral-700">
                    Stereo Microscope Inspection Desk
                  </span>
                  <span className="text-emerald-400 font-mono bg-black/80 px-2.5 py-1 rounded backdrop-blur-md border border-neutral-700">
                    90-Day Logic Board Warranty
                  </span>
                </div>
              </div>
            </div>

            {/* Micro-soldering capabilities list */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#cf2117]" />
                  <span>Liquid Spill &amp; Corrosion Neutralization</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Ultrasonic chemical baths remove microscopic corrosion, flux salts, and mineral deposits under the CPU/GPU and NAND ball grid arrays.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#cf2117]" />
                  <span>Power Rail &amp; PMIC Short Diagnostics</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Thermal imaging cameras and oscilloscope probing trace fault lines on PPBUS_G3H and 3V3_G3H rails to pinpoint shorted MLCC capacitors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-1">
                <div className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#cf2117]" />
                  <span>Complete SSD Customer Data Preservation</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Because we restore the original logic board, your internal soldered Apple SSD remains intact. Zero files, projects, or applications are lost.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://wa.me/918050804656?text=Hi%20iCareZone%20Mysore%2C%20I%20have%20a%20MacBook%20logic%20board%20issue%20that%20needs%20chip-level%20repair."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-black text-xs"
                >
                  <span>Consult Logic Board Specialist</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. COMPARISON MATRIX: COMPONENT REPAIR VS BOARD SWAP */}
      <section id="comparison" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="wb-badge-outline">The iCareZone Advantage</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Component-Level Repair vs. Full-Module Swap
            </h2>
            <p className="text-sm text-neutral-600">
              See why hundreds of tech leads, doctors, and students in Mysuru choose precision engineering over authorized center replacement.
            </p>
          </div>

          <div className="wb-card overflow-x-auto border-neutral-300 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-950 text-white">
                  <th className="p-4 sm:p-5 font-semibold uppercase tracking-wider">Evaluation Factor</th>
                  <th className="p-4 sm:p-5 font-semibold text-rose-300 uppercase tracking-wider">Authorized Apple Service</th>
                  <th className="p-4 sm:p-5 font-semibold text-emerald-300 uppercase tracking-wider bg-neutral-900 border-l border-neutral-800">iCareZone Mysore</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-600">
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-neutral-950">Repair Cost</td>
                  <td className="p-4 sm:p-5 text-rose-700 bg-rose-50/50">₹35,000 – ₹55,000 (Replaces entire logic board assembly)</td>
                  <td className="p-4 sm:p-5 text-emerald-900 font-bold bg-emerald-50/70 border-l border-emerald-200">
                    ₹3,500 – ₹12,000 (Save up to 70% by fixing exact chip)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-neutral-950">Data Confidentiality</td>
                  <td className="p-4 sm:p-5 text-rose-700 bg-rose-50/50">Mandatory wipe / 100% data loss during module replacement</td>
                  <td className="p-4 sm:p-5 text-emerald-900 font-bold bg-emerald-50/70 border-l border-emerald-200">
                    100% Untouched (SSD storage remains intact)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-neutral-950">Turnaround Time</td>
                  <td className="p-4 sm:p-5">7 to 14 business days (Device shipped to regional hub)</td>
                  <td className="p-4 sm:p-5 text-neutral-950 font-semibold bg-emerald-50/70 border-l border-emerald-200">
                    30 mins for screens/battery · 24-48 hrs for logic boards
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-neutral-950">Customer Visibility</td>
                  <td className="p-4 sm:p-5">Behind closed doors (Black box protocol)</td>
                  <td className="p-4 sm:p-5 text-neutral-950 font-semibold bg-emerald-50/70 border-l border-emerald-200">
                    Live customer viewing counter in Kuvempunagar lounge
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-semibold text-neutral-950">Doorstep Service in Mysuru</td>
                  <td className="p-4 sm:p-5">Requires customer to visit store in person</td>
                  <td className="p-4 sm:p-5 text-emerald-900 font-bold bg-emerald-50/70 border-l border-emerald-200">
                    Free doorstep pickup &amp; return across all Mysore localities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. COMPLETE DEVICE REPAIR CATALOG */}
      <section id="services" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <div className="wb-badge-black">Comprehensive Hardware Portfolio</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Certified Repairs for Every Apple Product Line
            </h2>
            <p className="text-sm text-neutral-600">
              From vintage Intel MacBooks to the latest iPhone 15 Pro Max and Apple Watch Ultra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. iPhone */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">iPhone Repair</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  OLED TrueTone screen swaps in 30 minutes, 100% battery health spot-welding without error popups, cold-laser back glass removal, and Face ID dot projector restoration.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  iPhone 11 through 15 Pro Max
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">30 Min Express</span>
                <a 
                  href="https://wa.me/918050804656?text=I%20need%20iPhone%20repair%20quote." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Enquire ↗
                </a>
              </div>
            </div>

            {/* 2. MacBook */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
                  <Laptop className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">MacBook Pro &amp; Air</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  M1, M2, M3 &amp; Intel chip-level motherboard micro-soldering, Retina display replacements, zero-cycle battery packs, Magic Keyboard rework, and liquid spill cleaning.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  13", 14", 15" &amp; 16" Models
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">180 Days Warranty</span>
                <a 
                  href="https://wa.me/918050804656?text=I%20need%20MacBook%20repair%20quote." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Enquire ↗
                </a>
              </div>
            </div>

            {/* 3. iPad */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
                  <Tablet className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">iPad &amp; Tablets</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Glass digitizer separation in OCA cleanroom vacuum chambers without replacing expensive underlying LCDs. Battery replacements and bent aluminum chassis alignment.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  iPad Pro, Air, 10th Gen &amp; Mini
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">Save 60% with Glass Rework</span>
                <a 
                  href="https://wa.me/918050804656?text=I%20need%20iPad%20repair%20quote." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Enquire ↗
                </a>
              </div>
            </div>

            {/* 4. Apple Watch */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
                  <Watch className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">Apple Watch</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Curved sapphire glass separation, optical UV adhesive curing, battery swelling fix, heart rate/ECG sensor restoration, and 50m water resistance gasket resealing.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  Ultra 2/1, Series 9/8/7 &amp; SE
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">Water Seal Restored</span>
                <a 
                  href="https://wa.me/918050804656?text=I%20need%20Apple%20Watch%20repair%20quote." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Enquire ↗
                </a>
              </div>
            </div>

            {/* 5. iMac & Mac Mini */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">iMac &amp; Mac Mini</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  High-speed NVMe SSD expansion, internal power supply (PSU) micro-repairs, thermal cooling overhaul with liquid metal repasting, and GPU chipset diagnostics.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  24" M-Series, 27" 5K &amp; Intel
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">Thermal Clean Included</span>
                <a 
                  href="https://wa.me/918050804656?text=I%20need%20iMac%20service%20quote." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Enquire ↗
                </a>
              </div>
            </div>

            {/* 6. Corporate & Tech Team IT Support */}
            <div className="wb-card p-6 flex flex-col justify-between space-y-4 border-2 border-neutral-900 bg-neutral-50">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] text-white flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#cf2117]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950">Corporate &amp; Tech Fast-Track</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Priority SLA support for tech companies, Infosys/Wipro software leads, and Apollo doctors in Mysore. Expedited turnaround and standby loaner support during repairs.
                </p>
                <div className="text-[11px] text-[#cf2117] font-mono font-semibold">
                  B2B Billing &amp; GST Invoices
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between">
                <span className="text-xs text-[#cf2117] font-semibold">Priority SLA</span>
                <a 
                  href="https://wa.me/918050804656?text=Hello%20iCareZone%2C%20I%20am%20enquiring%20about%20corporate%20Apple%20fleet%20support." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-neutral-950 hover:text-[#cf2117]"
                >
                  Corporate Desk ↗
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE PRICE & TIME ESTIMATOR */}
      <section id="estimator" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="wb-badge-outline">Instant Cost Transparency</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Interactive Repair Cost Calculator
            </h2>
            <p className="text-sm text-neutral-600">
              Get an instant quotation estimate with labor, testing, and warranty included.
            </p>
          </div>

          <div className="wb-card p-6 sm:p-10 border-neutral-300">
            
            {/* Category tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
              {[
                { id: 'macbook', name: 'MacBook Pro/Air' },
                { id: 'iphone', name: 'iPhone' },
                { id: 'ipad', name: 'iPad' },
                { id: 'watch', name: 'Apple Watch' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCalcCategory(cat.id as any);
                    const newModels = POPULAR_MODELS.filter(m => m.category === cat.id);
                    if (newModels.length) setCalcModelId(newModels[0].id);
                    const newServices = REPAIR_SERVICES.filter(s => s.category === cat.id);
                    if (newServices.length) setCalcServiceId(newServices[0].id);
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    calcCategory === cat.id
                      ? 'bg-neutral-950 text-white shadow-md'
                      : 'bg-neutral-50 text-neutral-600 hover:text-black border border-neutral-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Selectors */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    1. Select Specific Model
                  </label>
                  <select
                    value={selectedModel.id}
                    onChange={(e) => setCalcModelId(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 focus:bg-white focus:outline-none focus:border-black"
                  >
                    {activeModels.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    2. Select Repair Service
                  </label>
                  <div className="space-y-2">
                    {activeServices.map(service => {
                      const isSel = selectedService.id === service.id;
                      return (
                        <div
                          key={service.id}
                          onClick={() => setCalcServiceId(service.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                            isSel
                              ? 'bg-neutral-100 border-neutral-900 text-neutral-950 shadow-xs'
                              : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-neutral-400'
                          }`}
                        >
                          <div>
                            <div className={`text-xs font-bold ${isSel ? 'text-black' : 'text-neutral-800'}`}>
                              {service.name}
                            </div>
                            <div className="text-[11px] text-neutral-500 mt-0.5">
                              {service.description}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-bold font-mono text-neutral-950">
                              ₹{service.minPrice.toLocaleString('en-IN')}+
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {service.durationLabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 text-white space-y-5 shadow-lg">
                <div>
                  <span className="text-[11px] font-bold text-[#cf2117] uppercase tracking-wider">
                    Calculated Estimate
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">
                    {selectedModel.name}
                  </h3>
                  <div className="text-xs text-neutral-400">
                    {selectedService.name}
                  </div>
                </div>

                <div className="py-4 border-y border-neutral-800 space-y-1">
                  <div className="text-xs text-neutral-400">Estimated Price Range:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    ₹{selectedService.minPrice.toLocaleString('en-IN')} – ₹{selectedService.maxPrice.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    *Includes replacement component, ultrasonic testing &amp; labor. Exact diagnosis confirmed on bench.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Turnaround Time:</span>
                    <strong className="text-white font-mono">{selectedService.durationLabel}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Warranty:</span>
                    <strong className="text-emerald-400 font-mono">{selectedService.warrantyDays} Days Replacement</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Privacy:</span>
                    <strong className="text-white">100% Intact (Zero Format)</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/918050804656?text=${encodeURIComponent(
                    `Hi Santhosh iCareZone, I want to book repair for ${selectedModel.name} (${selectedService.name}). Estimated quote is ₹${selectedService.minPrice} – ₹${selectedService.maxPrice}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-red w-full text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book This Repair on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. LIVE REPAIR STATUS TRACKER */}
      <section id="tracker" className="py-16 sm:py-24 bg-[#f8fafc] border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
            <div className="wb-badge-black">Real-Time Transparency</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Live Repair Status Tracker
            </h2>
            <p className="text-sm text-neutral-600">
              Enter your Job Card ID or registered phone number to view live progress from our Kuvempunagar workbench.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8 space-y-3">
            <form onSubmit={handleTrackerSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackerQuery}
                  onChange={(e) => setTrackerQuery(e.target.value)}
                  placeholder="Enter Job ID (e.g. ICZ-7309, ICZ-8421)..."
                  className="w-full bg-white border border-neutral-300 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black font-mono shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="wb-btn-black text-xs shrink-0"
              >
                Track Status
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
              <span>Sample Tickets:</span>
              <button 
                type="button"
                onClick={() => { setTrackerQuery('ICZ-7309'); setCurrentJob(SAMPLE_TRACKER_JOBS['ICZ-7309']); setTrackerSearched(true); }}
                className="px-2.5 py-1 rounded bg-white text-neutral-800 border border-neutral-200 hover:border-black font-mono shadow-2xs"
              >
                ICZ-7309 (MacBook Under Repair)
              </button>
              <button 
                type="button"
                onClick={() => { setTrackerQuery('ICZ-8421'); setCurrentJob(SAMPLE_TRACKER_JOBS['ICZ-8421']); setTrackerSearched(true); }}
                className="px-2.5 py-1 rounded bg-white text-emerald-700 border border-neutral-200 hover:border-black font-mono shadow-2xs"
              >
                ICZ-8421 (iPhone 14 Pro Ready)
              </button>
            </div>
          </div>

          {trackerSearched && currentJob && (
            <div className="max-w-3xl mx-auto wb-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-mono text-neutral-950">{currentJob.jobId}</span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      currentJob.statusStep === 5 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {currentJob.statusLabel}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">
                    Customer: <strong className="text-neutral-950">{currentJob.customerName}</strong> ({currentJob.phoneEnding})
                  </div>
                </div>

                <div className="text-xs text-neutral-600">
                  <div>Location: <strong className="text-neutral-950">{currentJob.pickupMode}</strong></div>
                  <div>Estimated Return: <strong className="text-neutral-950">{currentJob.estimatedDelivery}</strong></div>
                </div>
              </div>

              {/* 5 Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[
                  { n: 1, label: 'Inwarded' },
                  { n: 2, label: 'Diagnostic' },
                  { n: 3, label: 'Repair Bench' },
                  { n: 4, label: '24-Pt QC' },
                  { n: 5, label: 'Ready' },
                ].map(s => {
                  const done = s.n < currentJob.statusStep;
                  const current = s.n === currentJob.statusStep;
                  return (
                    <div 
                      key={s.n}
                      className={`p-2.5 rounded-lg border text-center text-xs ${
                        current 
                          ? 'bg-neutral-950 text-white font-bold border-neutral-950'
                          : done
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-400'
                      }`}
                    >
                      <div className="text-[10px] font-mono">STEP {s.n}</div>
                      <div>{s.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Technician Notes */}
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs">
                <div className="font-semibold text-neutral-950 flex items-center justify-between">
                  <span>Technician Note ({currentJob.technicianName}):</span>
                  <span className="text-emerald-700 font-mono font-bold">{currentJob.warrantyPeriod}</span>
                </div>
                <p className="text-neutral-600 italic leading-relaxed">
                  "{currentJob.technicianNotes}"
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-xs text-neutral-500">Need an update on this device?</span>
                <a
                  href={`https://wa.me/918050804656?text=Status%20enquiry%20for%20ticket%20${currentJob.jobId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-outline text-xs py-2 px-3"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#cf2117]" />
                  <span>WhatsApp Technician</span>
                </a>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 9. STORE LOCATION & KUVEMPUNAGAR LAB */}
      <section id="store" className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="wb-badge-black">Flagship Center</div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
              Kuvempunagar Service Center &amp; Lounge
            </h2>
            <p className="text-sm text-neutral-600">
              Conveniently located in Kuvempunagar, opposite Pizza Hut and 200m from Apollo Hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Store Photo & Lounge Amenities */}
            <div className="lg:col-span-7 wb-card overflow-hidden flex flex-col justify-between">
              <div className="aspect-[16/9] w-full bg-neutral-100 relative overflow-hidden">
                <img 
                  src="/src/assets/images/icarezone_store_mysore_1793810451573.jpg" 
                  alt="iCareZone Kuvempunagar Mysore store front interior"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-black/80 px-3 py-1 rounded backdrop-blur border border-neutral-700">
                  Live View Technician Desk &amp; Consultation Lounge
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center gap-1.5">
                    <Wifi className="w-4 h-4 text-neutral-900" />
                    <span className="text-neutral-950 font-semibold">High-Speed WiFi</span>
                    <span className="text-[10px] text-neutral-500">Work while we fix</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-neutral-900" />
                    <span className="text-neutral-950 font-semibold">Live Viewing</span>
                    <span className="text-[10px] text-neutral-500">Watch technician live</span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col items-center gap-1.5">
                    <Car className="w-4 h-4 text-neutral-900" />
                    <span className="text-neutral-950 font-semibold">Dedicated Parking</span>
                    <span className="text-[10px] text-neutral-500">Bike &amp; car parking</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Direction Links */}
            <div className="lg:col-span-5 wb-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-neutral-950">
                    iCareZone Mysore
                  </h3>
                  <p className="text-xs text-[#cf2117] font-semibold mt-0.5">
                    Apple Device Repair Specialists
                  </p>
                </div>

                <div className="space-y-4 text-xs text-neutral-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#cf2117] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block mb-0.5">Physical Address:</strong>
                      <span>{ICAREZONE_INFO.address}</span>
                      <span className="block text-[#cf2117] font-semibold mt-0.5">{ICAREZONE_INFO.landmark}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block mb-0.5">Operating Hours:</strong>
                      <span>{ICAREZONE_INFO.hoursWeekday}</span>
                      <span className="block text-neutral-500">{ICAREZONE_INFO.hoursSunday}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#cf2117] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 block mb-0.5">Phone &amp; WhatsApp:</strong>
                      <a href={`tel:${ICAREZONE_INFO.phoneClean}`} className="text-neutral-950 hover:underline font-mono font-bold">
                        {ICAREZONE_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 space-y-2.5">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('iCareZone Kuvempunagar Mysore opposite Pizza Hut Apollo Hospital')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-black w-full text-xs"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions on Google Maps ↗</span>
                </a>

                <a
                  href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20can%20you%20share%20your%20Google%20Maps%20location%20pin%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wb-btn-outline w-full text-xs"
                >
                  <span>Request WhatsApp Location Pin</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. REVIEWS & TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-[#f8fafc] border-b border-neutral-200">
        <div className="wb-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="wb-badge-black">Verified Mysuru Feedback</div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight">
                Trusted by 14,800+ Apple Owners Across Mysore
              </h2>
              <p className="text-sm text-neutral-600">
                Read verified experiences from Apollo doctors, Infosys engineers, college students, and local residents.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-center gap-3 shrink-0 shadow-xs">
              <div className="text-2xl font-bold font-mono text-neutral-950">4.9 ★</div>
              <div className="text-xs text-neutral-600">
                <div>Based on <strong>640+ Reviews</strong></div>
                <div className="text-emerald-700 font-semibold">100% Genuine Ratings</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map(rev => (
              <div key={rev.id} className="wb-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-neutral-950 block">{rev.name}</strong>
                    <span className="text-[11px] text-neutral-500">{rev.designation} · {rev.location}</span>
                  </div>
                  <span className="text-[11px] text-[#cf2117] font-mono font-semibold bg-neutral-100 px-2 py-0.5 rounded">
                    {rev.device}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. TECHNICAL FAQS */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-200">
        <div className="wb-container max-w-4xl">
          
          <div className="text-center space-y-3 mb-12">
            <div className="wb-badge-outline">Clarity &amp; Questions</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-600">
              Everything you need to know about parts quality, data safety, and warranties.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const open = activeFaq === idx;
              return (
                <div key={idx} className="wb-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(open ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-neutral-950 hover:text-[#cf2117] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${open ? 'rotate-180 text-black' : ''}`} />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. FOOTER (DEEP BLACK ACCENT BACKGROUND) */}
      <footer className="bg-[#0a0a0a] text-neutral-400 py-12 text-xs">
        <div className="wb-container space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <a href="#" className="inline-block">
                <img 
                  src="/assets/aistudio/icare_zone_logo_black_ef1df5d2.png" 
                  alt="iCareZone Mysore" 
                  className="h-10 w-auto object-contain" 
                />
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Premier independent Apple hardware repair lab in Mysore. Logic-board micro-soldering, TrueTone OLED screens, and free doorstep service across Mysuru.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Apple Services</div>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li><a href="#macbook" className="hover:text-white">MacBook M-Series Logic Board</a></li>
                <li><a href="#services" className="hover:text-white">iPhone OLED &amp; Battery</a></li>
                <li><a href="#services" className="hover:text-white">iPad Digitizer &amp; Lamination</a></li>
                <li><a href="#services" className="hover:text-white">Apple Watch Sapphire Glass</a></li>
                <li><a href="#services" className="hover:text-white">iMac &amp; Mac Mini NVMe Upgrades</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Mysore Doorstep Hubs</div>
              <ul className="space-y-1.5 text-xs text-neutral-400">
                <li>· Kuvempunagar &amp; Saraswathipuram</li>
                <li>· Vijayanagar (1st to 4th Stage)</li>
                <li>· Gokulam &amp; Jayalakshmipuram</li>
                <li>· Yadavagiri &amp; Ramakrishnanagar</li>
                <li>· Hebbal Industrial / Infosys</li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Contact &amp; Lab</div>
              <div className="space-y-1.5 text-xs text-neutral-400">
                <p>14/4, Ramanamaharshi Road, Kuvempunagar, Mysuru 570023</p>
                <p>Opp. Pizza Hut, Near Apollo Hospital</p>
                <p className="text-white font-mono font-semibold">+91 80508 04656</p>
                <p className="text-emerald-400">Mon–Sat: 10:00 AM – 8:30 PM</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              © {new Date().getFullYear()} iCareZone Mysore. Independent Apple device repair specialist. Apple, iPhone, iPad, MacBook, iMac, and Apple Watch are registered trademarks of Apple Inc., used solely for descriptive identification.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <span>Managed by Santhosh</span>
              <span>·</span>
              <a href="tel:+918050804656" className="text-neutral-300 hover:text-white">+91 80508 04656</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 13. FLOATING WHATSAPP & CALL QUICK ACTIONS */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <a
          href="tel:+918050804656"
          aria-label="Call iCareZone Desk"
          className="w-11 h-11 rounded-full bg-neutral-950 border border-neutral-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4 text-[#cf2117]" />
        </a>

        <a
          href="https://wa.me/918050804656?text=Hello%20iCareZone%2C%20I%20need%20help%20with%20an%20Apple%20device%20repair."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-11 px-4 rounded-full bg-[#2ea043] hover:bg-[#2c973f] text-white flex items-center gap-2 shadow-xl hover:scale-105 transition-transform text-xs font-semibold"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>

    </div>
  );
}
