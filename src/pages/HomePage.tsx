import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Battery, 
  Camera, 
  Zap, 
  Layers, 
  Sliders, 
  Database,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Sparkles,
  PhoneCall,
  Smartphone,
  Tablet,
  Laptop,
  Watch,
  Wrench,
  CheckCircle2,
  Cpu,
  Shield,
  HelpCircle,
  Flame
} from 'lucide-react';
import { Service, BusinessSettings, GalleryItem } from '../types/index.ts';

interface HomePageProps {
  services: Service[];
  settings?: BusinessSettings | null;
  gallery: GalleryItem[];
  onNavigate: (tab: string, param?: any) => void;
  onSelectServiceForBooking: (serviceId: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  services,
  settings,
  gallery,
  onNavigate,
  onSelectServiceForBooking
}) => {
  const [selectedDeviceTab, setSelectedDeviceTab] = useState<string>('iPhone');

  const phone = settings?.phone || '080508 04656';
  const phoneClean = phone.replace(/[^\d]/g, '');

  const deviceCategories = [
    {
      id: 'iPhone',
      name: 'iPhone Repair',
      subtitle: 'Screen, Battery, Camera & Charging',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80',
      popular: ['Battery Replacement', 'Camera Repair', 'Charging Port', 'Back Glass'],
      badge: 'Most Popular'
    },
    {
      id: 'iPad',
      name: 'iPad Repair',
      subtitle: 'Display, Touch, Battery & USB-C',
      icon: Tablet,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=700&q=80',
      popular: ['Screen Glass Replacement', 'Battery Drain Fix', 'Dock Flex', 'Logic Board']
    },
    {
      id: 'Mac',
      name: 'Mac & MacBook Repair',
      subtitle: 'Air & Pro Screen, Battery, Thermal Clean',
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
      popular: ['MacBook Battery Swap', 'Charging Circuit', 'Thermal Paste Service', 'Data Backup']
    },
    {
      id: 'Apple Watch',
      name: 'Apple Watch Repair',
      subtitle: 'Series & Ultra Glass, Battery, Sensors',
      icon: Watch,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80',
      popular: ['Watch Battery Swap', 'Screen Glass Seal', 'Crown / Haptic Fix']
    }
  ];

  const getServiceIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('battery')) return <Battery className="w-6 h-6 text-emerald-600" />;
    if (n.includes('camera')) return <Camera className="w-6 h-6 text-indigo-600" />;
    if (n.includes('charging')) return <Zap className="w-6 h-6 text-amber-500" />;
    if (n.includes('case')) return <Layers className="w-6 h-6 text-blue-600" />;
    if (n.includes('button')) return <Sliders className="w-6 h-6 text-purple-600" />;
    if (n.includes('data')) return <Database className="w-6 h-6 text-teal-600" />;
    return <Wrench className="w-6 h-6 text-blue-600" />;
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION (iCare Plus Signature Layout) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6F8] via-white to-white pt-10 pb-16 border-b border-[#E8E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Trust Badge Pill */}
              <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-[#E8E9ED] shadow-xs text-xs font-semibold text-[#17191D]">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="ml-1 text-[#17191D] font-bold">4.9 / 5.0</span>
                </div>
                <span className="text-gray-300">•</span>
                <span className="text-[#545963]">694 Google Reviews</span>
                <span className="text-gray-300">•</span>
                <span className="text-blue-600 font-semibold">Mysuru Workshop</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17191D] tracking-tight leading-[1.12]">
                Your Apple Device Deserves <span className="text-[#1677FF]">Expert Care.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#545963] max-w-2xl leading-relaxed">
                Reliable Apple device repair solutions in Mysuru. From battery and camera issues to charging problems, get professional assistance for your device.
              </p>

              {/* Quick Device Selector Bar (icareplus signature feature) */}
              <div className="bg-white p-2.5 rounded-2xl border border-[#E8E9ED] shadow-sm max-w-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 block mb-1.5">
                  Select Your Device to Book:
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'iPhone', label: 'iPhone', icon: Smartphone },
                    { id: 'iPad', label: 'iPad', icon: Tablet },
                    { id: 'Mac', label: 'MacBook', icon: Laptop },
                    { id: 'Apple Watch', label: 'Watch', icon: Watch },
                  ].map((dev) => {
                    const Icon = dev.icon;
                    return (
                      <button
                        key={dev.id}
                        onClick={() => onNavigate('book', dev.id)}
                        className="py-2.5 px-2 rounded-xl text-center bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all flex flex-col items-center justify-center space-y-1 text-xs font-bold text-[#17191D] border border-transparent hover:border-blue-200 group"
                      >
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                        <span className="text-[11px]">{dev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <button
                  onClick={() => onNavigate('book')}
                  className="px-8 py-4 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Repair</span>
                </button>

                <a
                  href={`tel:${phoneClean}`}
                  className="px-6 py-4 bg-white hover:bg-gray-50 text-[#17191D] border border-[#E8E9ED] rounded-xl font-bold text-base transition-all flex items-center justify-center space-x-2 hover:border-gray-300"
                >
                  <PhoneCall className="w-5 h-5 text-blue-600" />
                  <span>Call {phone}</span>
                </a>
              </div>

              {/* Verified Credibility Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E8E9ED]">
                <div className="space-y-0.5">
                  <div className="flex items-center text-amber-500 font-bold text-lg">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span>4.9 / 5</span>
                  </div>
                  <p className="text-xs text-[#747982] font-medium">Google Rating</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-lg font-bold text-[#17191D]">694</p>
                  <p className="text-xs text-[#747982] font-medium">Verified Reviews</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-lg font-bold text-[#17191D]">Mysuru</p>
                  <p className="text-xs text-[#747982] font-medium">Kuvempu Nagara</p>
                </div>

                <div className="space-y-0.5">
                  <p className="text-lg font-bold text-[#1677FF]">Priority</p>
                  <p className="text-xs text-[#747982] font-medium">Appointment Service</p>
                </div>
              </div>

            </div>

            {/* Right Interactive Quick Appointment Card (Replaces stock image) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative background glow */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-100 to-indigo-100 opacity-70 blur-xl"></div>
                
                {/* Main Card */}
                <div className="relative rounded-3xl bg-white p-6 sm:p-7 border border-[#E8E9ED] shadow-xl space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                        <Wrench className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#17191D]">Priority Repair Intake</h3>
                        <p className="text-[11px] text-gray-400">iCare zone • Mysuru Workshop</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-1"></span>
                      Open Today
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#17191D] font-semibold">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>Kuvempu Nagara Workshop</span>
                      </div>
                      <span className="text-[10px] text-gray-500">Opp. Pizza Hut</span>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#17191D] font-semibold">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
                        <span>Google Verified Rating</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#17191D]">4.9★ (694 reviews)</span>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-[#17191D] font-semibold">
                        <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                        <span>Operating Hours</span>
                      </div>
                      <span className="text-[11px] font-bold text-gray-700">10:00 AM – 8:30 PM</span>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/70 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-blue-900 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Workbench Intake</span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-600">Zero Wait Time</span>
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => onNavigate('book')}
                      className="w-full py-3.5 bg-[#1677FF] hover:bg-blue-600 text-white font-bold rounded-xl text-xs shadow-xs transition-all flex items-center justify-center space-x-2 active:scale-[0.98]"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Reserve Your Repair Slot</span>
                    </button>

                    <a
                      href={`tel:${phoneClean}`}
                      className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-[#17191D] border border-gray-200 font-bold rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                      <span>Direct Helpline: {phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SELECT YOUR DEVICE SECTION (iCare Plus Core Device Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Select Your Device
          </span>
          <h2 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
            Which Apple Device Needs Repair?
          </h2>
          <p className="text-xs sm:text-sm text-[#747982]">
            Choose your device below for tailored hardware repair, lens replacements, and battery service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deviceCategories.map((dev) => {
            const Icon = dev.icon;
            return (
              <div
                key={dev.id}
                className="group bg-white rounded-2xl border border-[#E8E9ED] overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {dev.badge && (
                      <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {dev.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-extrabold text-sm">{dev.name}</h3>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <p className="text-xs text-[#545963] leading-relaxed">
                      {dev.subtitle}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase text-gray-400">Common Repairs:</span>
                      <ul className="space-y-1">
                        {dev.popular.map((item, idx) => (
                          <li key={idx} className="text-[11px] text-[#17191D] flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onNavigate('book', dev.id)}
                    className="w-full py-2.5 bg-[#17191D] group-hover:bg-[#1677FF] text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>Book {dev.id} Service</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS (iCare Plus 4-Step Repair Journey) */}
      <section className="bg-[#F5F6F8] py-16 border-y border-[#E8E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF]">
              Effortless Repair Process
            </span>
            <h2 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
              How iCare zone Works
            </h2>
            <p className="text-xs sm:text-sm text-[#747982]">
              From booking your appointment to picking up your restored device in Kuvempu Nagara, Mysuru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E9ED] shadow-xs space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1677FF] font-black text-lg flex items-center justify-center border border-blue-100">
                01
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">1. Reserve Time Slot</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Choose your Apple device model, issue, and convenient appointment slot online to avoid waiting.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E9ED] shadow-xs space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 font-black text-lg flex items-center justify-center border border-indigo-100">
                02
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">2. Bench Diagnostics</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Bring your device to Kuvempu Nagara. Technicians perform optical and circuit checks before opening.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E9ED] shadow-xs space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 font-black text-lg flex items-center justify-center border border-amber-100">
                03
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">3. Component Repair</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Careful component installation, microscope soldering, and adhesive re-sealing in an ESD-protected space.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E9ED] shadow-xs space-y-3 relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-black text-lg flex items-center justify-center border border-emerald-100">
                04
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">4. Quality Check & Pickup</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Comprehensive testing of cameras, haptics, battery, and charging before handing back your device.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#1677FF] mb-2">
              <span>Service Catalog</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
              Specialized Apple Device Repairs
            </h2>
            <p className="text-[#747982] text-sm mt-1 max-w-xl">
              Precision diagnostics and repairs for iPhones, iPads, MacBooks, and Apple Watches.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center text-sm font-bold text-[#1677FF] hover:text-blue-700 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-[#E8E9ED] p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F6F8] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getServiceIcon(service.name)}
                  </div>
                  {service.duration_minutes && (
                    <span className="text-[11px] font-semibold text-[#747982] bg-gray-100 px-2.5 py-1 rounded-md flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-gray-500" />
                      ~{service.duration_minutes} mins
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#17191D] group-hover:text-[#1677FF] transition-colors mb-2">
                  {service.name}
                </h3>

                <p className="text-xs text-[#545963] leading-relaxed line-clamp-3 mb-4">
                  {service.description}
                </p>

                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onNavigate('services', service.id)}
                  className="text-xs font-bold text-[#545963] hover:text-[#17191D] transition-colors"
                >
                  View Details
                </button>

                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="px-3.5 py-2 text-xs font-bold bg-[#1677FF] hover:bg-blue-600 text-white rounded-lg transition-all shadow-xs flex items-center space-x-1"
                >
                  <span>Book This Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Accurate trust benefits matching specifications) */}
      <section className="bg-[#F5F6F8] py-16 border-y border-[#E8E9ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF]">
              Trust & Convenience
            </span>
            <h2 className="text-3xl font-extrabold text-[#17191D] tracking-tight mt-1">
              Why Customers in Mysuru Choose iCare zone
            </h2>
            <p className="text-sm text-[#747982] mt-2">
              Dedicated to attentive client communication, careful hardware handling, and straightforward appointment scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="bg-white rounded-xl p-5 border border-[#E8E9ED] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1677FF] flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">Convenient Booking</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Reserve your time slot in advance to avoid waiting queues and enjoy priority technician intake.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E9ED] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">Professional Assistance</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Detailed bench inspection using specialized screwdrivers, heating plates, and diagnostic tools.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E9ED] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">Multiple Devices</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Support for iPhones, iPads, MacBooks, iMacs, and Apple Watch models across multiple generations.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E9ED] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">Customer-Focused</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Clear quotes before starting work, courteous communication, and direct WhatsApp repair tracking.
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 border border-[#E8E9ED] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#17191D]">Convenient Location</h3>
              <p className="text-xs text-[#545963] leading-relaxed">
                Centrally located in Kuvempu Nagara, Mysuru, right diagonally opposite Pizza Hut and near Apollo BGS Hospital.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. GOOGLE REVIEWS SECTION (Authentic 4.9 rating / 694 reviews) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#111318] text-white p-8 md:p-12 relative overflow-hidden border border-white/10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-400 text-xs font-semibold">
                <span>Google Maps Profile</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight">
                Authentic Customer Feedback
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Our reputation is built on transparent diagnostics, meticulous Apple device restoration, and honest advice in Mysuru.
              </p>

              <div className="pt-2">
                <a
                  href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center px-5 py-3 rounded-xl bg-white text-[#17191D] font-bold text-xs hover:bg-gray-100 transition-colors"
                >
                  <span>Read 694 Reviews on Google Maps</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Rating Card 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="text-2xl font-black text-white">4.9 / 5.0</div>
                <p className="text-xs text-gray-400">
                  Aggregate score verified across 694 local Mysuru customer reviews on Google.
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400">
                  Apple Repair Experts – iCare zone
                </div>
              </div>

              {/* Rating Card 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
                <div className="flex items-center space-x-2 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-sm text-white">Honest Diagnostics</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  "Every device goes through systematic hardware check-in before any repair commences. Customers receive upfront explanations of options."
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
                  <span>Kuvempu Nagara Store</span>
                  <span className="text-emerald-400">Verified Workshop</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>



      {/* 8. LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E9ED] p-8 md:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF]">
                Visit Our Repair Center
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] tracking-tight">
                Convenient Location in Kuvempu Nagara
              </h2>

              <div className="space-y-3 pt-2 text-sm text-[#545963]">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#17191D]">Address:</p>
                    <p className="leading-relaxed">
                      {settings?.address || '14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#17191D]">Working Hours:</p>
                    <p>Monday – Saturday: 10:00 AM – 8:30 PM</p>
                    <p className="text-xs text-gray-500">Sunday: 10:30 AM – 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#17191D]">Helpline:</p>
                    <a href={`tel:${phoneClean}`} className="text-blue-600 font-bold hover:underline">
                      {phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-[#17191D] hover:bg-black text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center space-x-2"
                >
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Get Directions</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-[#17191D] text-xs font-bold rounded-xl transition-colors"
                >
                  Contact Details
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              {/* Map presentation container */}
              <div className="rounded-2xl overflow-hidden border border-[#E8E9ED] bg-gray-50 h-72 relative flex flex-col items-center justify-center text-center p-6 shadow-inner">
                <MapPin className="w-12 h-12 text-[#1677FF] mb-3 animate-bounce" />
                <h3 className="font-bold text-[#17191D] text-base">iCare zone Mysuru</h3>
                <p className="text-xs text-[#747982] max-w-sm mt-1">
                  Near Apollo BGS Hospital & Opposite Pizza Hut, Ramanamaharshi Road, Kuvempu Nagara
                </p>
                <div className="mt-4">
                  <a
                    href={settings?.google_maps_url || "https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#1677FF] text-white text-xs font-bold rounded-xl shadow-xs hover:bg-blue-600 transition-colors"
                  >
                    <span>Open Live Interactive Map</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#17191D] to-[#252830] text-white p-10 md:p-14 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Let's Get Your Device Back in Shape.
            </h2>
            <p className="text-sm sm:text-base text-gray-300">
              Schedule your diagnostic or repair appointment today. Fast intake, dedicated workbench attention, and prompt updates for your iPhone, iPad, Mac, or Watch in Mysuru.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-4 bg-[#1677FF] hover:bg-blue-600 text-white font-bold text-base rounded-xl shadow-lg transition-all active:scale-[0.98] inline-flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Your Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
