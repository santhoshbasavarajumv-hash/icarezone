import React, { useState } from 'react';
import { 
  Battery, 
  Camera, 
  Zap, 
  Layers, 
  Sliders, 
  Database, 
  Clock, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle,
  X,
  Smartphone,
  Wrench,
  Search
} from 'lucide-react';
import { Service } from '../types/index.ts';

interface ServicesPageProps {
  services: Service[];
  initialSelectedServiceId?: number | null;
  onSelectServiceForBooking: (serviceId: number) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  initialSelectedServiceId,
  onSelectServiceForBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalService, setModalService] = useState<Service | null>(
    initialSelectedServiceId ? services.find(s => s.id === initialSelectedServiceId) || null : null
  );

  const categories = ['All', 'Hardware', 'Optics & Sensors', 'Cosmetic & Structural', 'Power & Connectivity', 'Software & Data'];

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
    <div className="py-12 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Apple Repair Catalog • Mysuru
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17191D] tracking-tight">
            Specialized Apple Device Services
          </h1>
          <p className="text-sm text-[#747982] leading-relaxed">
            Professional diagnostic bench testing, high-grade component replacement, and software care for iPhone, iPad, Mac, and Apple Watch.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E9ED] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1677FF] text-white shadow-xs'
                    : 'bg-gray-100 text-[#545963] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search repair services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-[#E8E9ED] rounded-xl text-xs text-[#17191D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-[#E8E9ED] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {service.image_url && (
                <div className="h-44 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={service.image_url}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#111318]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      {getServiceIcon(service.name)}
                    </div>
                    {service.duration_minutes && (
                      <span className="text-[11px] font-semibold text-[#747982] bg-gray-50 px-2 py-0.5 rounded border border-gray-200 flex items-center">
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

                  {service.compatible_devices && (
                    <div className="text-[11px] text-[#747982] mb-3 flex items-start space-x-1">
                      <Smartphone className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{service.compatible_devices}</span>
                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setModalService(service)}
                    className="text-xs font-bold text-[#545963] hover:text-[#17191D] py-2 transition-colors"
                  >
                    Repair Process
                  </button>

                  <button
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="px-4 py-2 bg-[#1677FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center space-x-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#E8E9ED] p-12 text-center max-w-md mx-auto space-y-3">
            <Wrench className="w-10 h-10 text-gray-300 mx-auto" />
            <h3 className="font-bold text-[#17191D] text-base">No services found</h3>
            <p className="text-xs text-[#747982]">Try adjusting your search query or category filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="text-xs font-bold text-[#1677FF] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Service Details Modal */}
        {modalService && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-xl w-full border border-[#E8E9ED] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              
              <div className="p-6 border-b border-[#E8E9ED] flex items-center justify-between bg-gray-50/80">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1677FF] flex items-center justify-center font-bold">
                    {getServiceIcon(modalService.name)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#17191D]">{modalService.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{modalService.category}</p>
                  </div>
                </div>

                <button
                  onClick={() => setModalService(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#747982] mb-1">
                    Service Overview
                  </h4>
                  <p className="text-xs text-[#545963] leading-relaxed">
                    {modalService.description}
                  </p>
                </div>

                {modalService.repair_process && (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                    <h4 className="text-xs font-bold text-[#17191D] flex items-center">
                      <Wrench className="w-4 h-4 text-blue-600 mr-1.5" />
                      Standard Bench Procedure
                    </h4>
                    <p className="text-xs text-[#545963] leading-relaxed">
                      {modalService.repair_process}
                    </p>
                  </div>
                )}

                {modalService.compatible_devices && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#747982] mb-1">
                      Compatible Devices
                    </h4>
                    <p className="text-xs text-[#545963]">
                      {modalService.compatible_devices}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] text-[#747982]">Estimated Duration</span>
                    <p className="font-bold text-[#17191D] text-sm mt-0.5">
                      ~{modalService.duration_minutes || 45} Minutes
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="text-[11px] text-[#747982]">Cost Estimate</span>
                    <p className="font-bold text-[#1677FF] text-sm mt-0.5">
                      Quote on Diagnosis
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-[#E8E9ED] bg-gray-50 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setModalService(null)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const id = modalService.id;
                    setModalService(null);
                    onSelectServiceForBooking(id);
                  }}
                  className="px-5 py-2.5 bg-[#1677FF] hover:bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Service Now</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
