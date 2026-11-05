import React, { useState, useMemo } from 'react';
import { 
  DEVICE_CATEGORIES, 
  POPULAR_MODELS, 
  REPAIR_SERVICES, 
  DeviceModel, 
  RepairService,
  ICAREZONE_INFO 
} from '../data/repairData.ts';
import { 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Info,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Cpu
} from 'lucide-react';

interface PriceEstimatorProps {
  onSelectBooking: (details: { deviceType: string; modelName: string; serviceName: string; priceEstimate: string }) => void;
}

export const PriceEstimator: React.FC<PriceEstimatorProps> = ({ onSelectBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<'iphone' | 'macbook' | 'ipad' | 'watch' | 'android'>('iphone');
  
  // Available models for the chosen category
  const categoryModels = useMemo(() => {
    return POPULAR_MODELS.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  const [selectedModelId, setSelectedModelId] = useState<string>('ip-14');

  // Sync selected model if category changes
  const activeModel = useMemo(() => {
    const found = categoryModels.find(m => m.id === selectedModelId);
    if (found) return found;
    return categoryModels[0] || POPULAR_MODELS[0];
  }, [categoryModels, selectedModelId]);

  // Available services for category
  const categoryServices = useMemo(() => {
    return REPAIR_SERVICES.filter(s => s.category === selectedCategory);
  }, [selectedCategory]);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('ip-screen-oled');

  const activeService = useMemo(() => {
    const found = categoryServices.find(s => s.id === selectedServiceId);
    if (found) return found;
    return categoryServices[0] || REPAIR_SERVICES[0];
  }, [categoryServices, selectedServiceId]);

  const handleCategorySwitch = (catId: 'iphone' | 'macbook' | 'ipad' | 'watch' | 'android') => {
    setSelectedCategory(catId);
    const newModels = POPULAR_MODELS.filter(m => m.category === catId);
    if (newModels.length > 0) {
      setSelectedModelId(newModels[0].id);
    }
    const newServices = REPAIR_SERVICES.filter(s => s.category === catId);
    if (newServices.length > 0) {
      setSelectedServiceId(newServices[0].id);
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'iphone': return <Smartphone className="w-4 h-4" />;
      case 'macbook': return <Laptop className="w-4 h-4" />;
      case 'ipad': return <Tablet className="w-4 h-4" />;
      case 'watch': return <Watch className="w-4 h-4" />;
      case 'android': return <Cpu className="w-4 h-4" />;
      default: return <Smartphone className="w-4 h-4" />;
    }
  };

  const formattedPriceRange = `₹${activeService.minPrice.toLocaleString('en-IN')} – ₹${activeService.maxPrice.toLocaleString('en-IN')}`;

  const handleBookCurrentEstimate = () => {
    onSelectBooking({
      deviceType: DEVICE_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Device',
      modelName: activeModel.name,
      serviceName: activeService.name,
      priceEstimate: formattedPriceRange,
    });
  };

  return (
    <section id="estimator" className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest">
            <span>Instant Price Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Device Repair Cost in Mysore
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Transparent pricing with high-grade replacement parts, testing, warranty, and technician labor included. No hidden service charges.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          
          {/* Step 1: Category Selector (Interactive Filter Tabs) */}
          <div className="mb-8">
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Step 1: Select Your Device Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {DEVICE_CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySwitch(cat.id as any)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive 
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20' 
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/80'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Step 2 & 3: Model & Issue Selection (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Model Dropdown & Quick pills */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Step 2: Choose Exact Model
                </label>
                <div className="relative">
                  <select
                    value={activeModel.id}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
                  >
                    {categoryModels.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-[11px] text-slate-400 py-0.5">Popular:</span>
                  {categoryModels.slice(0, 4).map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedModelId(m.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                        activeModel.id === m.id
                          ? 'bg-slate-800 text-sky-400 font-semibold border border-sky-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Repair Issue list */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Step 3: Select Service / Hardware Problem
                </label>
                <div className="space-y-2.5">
                  {categoryServices.map(service => {
                    const isSelected = activeService.id === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-sky-500 shadow-sm shadow-sky-500/10'
                            : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {service.name}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {service.description}
                            </p>
                            {service.highlight && (
                              <div className="pt-1 text-[11px] text-sky-400 font-medium flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                <span>{service.highlight}</span>
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <div className="text-sm font-bold text-white font-mono-numbers">
                              ₹{service.minPrice.toLocaleString('en-IN')}+
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {service.durationLabel}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Estimation Summary & Direct Booking Box (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-7 space-y-6 lg:sticky lg:top-24">
              
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Live Repair Estimate
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {activeModel.name}
                </h3>
                <div className="text-xs text-slate-400">
                  {activeService.name}
                </div>
              </div>

              {/* Price Display */}
              <div className="py-4 border-y border-slate-800 space-y-1">
                <div className="text-xs text-slate-400">
                  Estimated Repair Cost Range
                </div>
                <div className="text-3xl font-extrabold text-white font-mono-numbers flex items-baseline gap-2">
                  <span>{formattedPriceRange}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  *Includes OEM-grade component, ultrasonic testing, technician calibration, and GST. Exact quote confirmed after 2-minute bench diagnosis.
                </p>
              </div>

              {/* Repair Guarantee Spec Points */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-sky-400" />
                    Turnaround Time:
                  </span>
                  <span className="font-semibold text-white font-mono-numbers">
                    {activeService.durationLabel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Warranty Coverage:
                  </span>
                  <span className="font-semibold text-emerald-400">
                    {activeService.warrantyDays} Days Replacement
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    Data Safety Guarantee:
                  </span>
                  <span className="font-semibold text-slate-200">
                    100% Retained (No Format)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Info className="w-4 h-4 text-sky-400" />
                    Doorstep Service:
                  </span>
                  <span className="font-semibold text-sky-400">
                    Free Pickup in Mysore
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleBookCurrentEstimate}
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Repair ({activeModel.name})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hi%20iCareZone%20Mysore%2C%20I%20am%20looking%20for%20repair%20of%20${encodeURIComponent(activeModel.name)}%20for%20${encodeURIComponent(activeService.name)}.%20Estimated%20price%20is%20${encodeURIComponent(formattedPriceRange)}.%20Can%20I%20book%20a%20slot%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-800/40 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span>Inquire on WhatsApp with this Quote</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
