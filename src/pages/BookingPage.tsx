import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Tablet, 
  Laptop, 
  Watch, 
  HelpCircle, 
  Calendar, 
  Clock, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  AlertCircle, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  User,
  Phone,
  Mail,
  FileText,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Service, DeviceModel, AvailabilityResponse } from '../types/index.ts';
import { api } from '../services/api.ts';

interface BookingPageProps {
  services: Service[];
  devices: DeviceModel[];
  preSelectedServiceId?: number | null;
  initialDeviceCategory?: string | null;
  onBookingComplete: (booking: any) => void;
  onNavigate: (tab: string) => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  services,
  devices,
  preSelectedServiceId,
  initialDeviceCategory,
  onBookingComplete,
  onNavigate
}) => {
  // Step state (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialDeviceCategory || 'iPhone'
  );
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [customModel, setCustomModel] = useState<string>('');
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>(
    preSelectedServiceId ? [preSelectedServiceId] : []
  );
  
  // Date & Slot State
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Customer Information
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [problemDescription, setProblemDescription] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [privacyAgreed, setPrivacyAgreed] = useState<boolean>(true);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize pre-selected service if passed
  useEffect(() => {
    if (preSelectedServiceId && !selectedServiceIds.includes(preSelectedServiceId)) {
      setSelectedServiceIds([preSelectedServiceId]);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (initialDeviceCategory) {
      setSelectedCategory(initialDeviceCategory);
      setSelectedModel('');
      setCustomModel('');
    }
  }, [initialDeviceCategory]);

  // Set default initial date to tomorrow or today if early
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const defaultDateStr = `${yyyy}-${mm}-${dd}`;
    setSelectedDate(defaultDateStr);
  }, []);

  // Fetch slot availability whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;

    let isMounted = true;
    setLoadingAvailability(true);
    setSelectedTime('');
    setErrorMessage(null);

    api.getAvailability(selectedDate)
      .then((data) => {
        if (isMounted) {
          setAvailability(data);
          setLoadingAvailability(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setAvailability(null);
          setLoadingAvailability(false);
          setErrorMessage(err.message || 'Could not load time slots');
        }
      });

    return () => { isMounted = false; };
  }, [selectedDate]);

  // Available models for selected category
  const filteredModels = devices.filter(
    (d) => d.category.toLowerCase() === selectedCategory.toLowerCase() && d.active === 1
  );

  // Helper icons for categories
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'iPhone': return <Smartphone className="w-6 h-6" />;
      case 'iPad': return <Tablet className="w-6 h-6" />;
      case 'Mac': return <Laptop className="w-6 h-6" />;
      case 'Apple Watch': return <Watch className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const handleToggleService = (id: number) => {
    if (selectedServiceIds.includes(id)) {
      setSelectedServiceIds(selectedServiceIds.filter((sId) => sId !== id));
    } else {
      setSelectedServiceIds([...selectedServiceIds, id]);
    }
  };

  // Generate calendar days for the next 21 days
  const calendarDays = Array.from({ length: 21 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() + idx);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    return { dateStr, dayName, dayNum, monthName };
  });

  // Handle final submission (Atomic Server-Side Booking)
  const handleSubmitBooking = async () => {
    setErrorMessage(null);

    const actualModel = selectedModel === 'OTHER_CUSTOM' ? customModel.trim() : selectedModel;

    if (!actualModel) {
      setErrorMessage('Please select or specify your Apple device model.');
      setCurrentStep(2);
      return;
    }

    if (selectedServiceIds.length === 0) {
      setErrorMessage('Please select at least one repair service.');
      setCurrentStep(3);
      return;
    }

    if (!selectedDate || !selectedTime) {
      setErrorMessage('Please choose a valid appointment date and time slot.');
      setCurrentStep(4);
      return;
    }

    if (!fullName.trim() || !phone.trim() || !problemDescription.trim()) {
      setErrorMessage('Please provide your name, phone number, and a brief description of the issue.');
      setCurrentStep(6);
      return;
    }

    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      setCurrentStep(6);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.createAppointment({
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        deviceCategory: selectedCategory,
        deviceModel: actualModel,
        serviceIds: selectedServiceIds,
        appointmentDate: selectedDate,
        startTime: selectedTime,
        problemDescription: problemDescription.trim(),
        customerNotes: customerNotes.trim() || undefined
      });

      if (response.success && response.booking) {
        onBookingComplete(response.booking);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit appointment. The slot may have just been reserved. Please try another time.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Device' },
    { num: 2, label: 'Model' },
    { num: 3, label: 'Service' },
    { num: 4, label: 'Date & Time' },
    { num: 5, label: 'Contact Details' },
    { num: 6, label: 'Summary & Confirm' }
  ];

  const selectedServicesObjects = services.filter((s) => selectedServiceIds.includes(s.id));

  return (
    <div className="py-10 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1677FF] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Priority Repair Intake • Mysuru
          </span>
          <h1 className="text-3xl font-extrabold text-[#17191D] tracking-tight">
            Book an Apple Device Appointment
          </h1>
          <p className="text-xs sm:text-sm text-[#747982]">
            Reserve your workbench slot at iCare zone Kuvempu Nagara for dedicated inspection and prompt repair.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8E9ED] shadow-xs">
          <div className="flex items-center justify-between">
            {steps.map((st) => (
              <div 
                key={st.num} 
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num);
                }}
                className={`flex flex-col items-center flex-1 cursor-pointer select-none ${
                  st.num < currentStep ? 'text-[#1677FF]' : st.num === currentStep ? 'text-[#17191D]' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  st.num < currentStep 
                    ? 'bg-blue-100 text-[#1677FF]' 
                    : st.num === currentStep 
                    ? 'bg-[#1677FF] text-white shadow-xs' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {st.num < currentStep ? <Check className="w-4 h-4 stroke-[3]" /> : st.num}
                </div>
                <span className="text-[11px] font-semibold mt-1 hidden sm:block">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Attention: </span>
              {errorMessage}
            </div>
          </div>
        )}

        {/* Step Card Container */}
        <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 sm:p-8 shadow-xs">
          
          {/* ================= STEP 1: SELECT DEVICE ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Step 1: Select Your Apple Device</h2>
                <p className="text-xs text-[#747982] mt-1">
                  Choose the category of device requiring diagnostics or service.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Other device'].map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedModel('');
                        setCustomModel('');
                      }}
                      className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 ${
                        isSelected
                          ? 'border-[#1677FF] bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                          : 'border-[#E8E9ED] hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? 'bg-[#1677FF] text-white' : 'bg-gray-100 text-[#17191D]'
                      }`}>
                        {getCategoryIcon(cat)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#17191D]">{cat}</p>
                        <p className="text-[11px] text-[#747982]">Hardware & Software</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5"
                >
                  <span>Continue to Model Selection</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: SELECT MODEL ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#17191D]">
                    Step 2: Select Your {selectedCategory} Model
                  </h2>
                  <p className="text-xs text-[#747982] mt-1">
                    Select your exact model for tailored component availability.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  Change Device
                </button>
              </div>

              {/* Models Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                {filteredModels.map((item) => {
                  const isSelected = selectedModel === item.model;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedModel(item.model);
                        setCustomModel('');
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#1677FF] bg-blue-50/70 font-bold text-[#1677FF]'
                          : 'border-[#E8E9ED] text-[#17191D] hover:bg-gray-50'
                      }`}
                    >
                      <p className="text-xs leading-snug">{item.model}</p>
                    </button>
                  );
                })}

                {/* Option for unlisted or custom model */}
                <button
                  type="button"
                  onClick={() => setSelectedModel('OTHER_CUSTOM')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedModel === 'OTHER_CUSTOM'
                      ? 'border-[#1677FF] bg-blue-50 font-bold text-[#1677FF]'
                      : 'border-dashed border-gray-300 text-[#545963] hover:bg-gray-50'
                  }`}
                >
                  <p className="text-xs">+ Model not listed / Specify custom</p>
                </button>
              </div>

              {/* Custom Model Input if chosen */}
              {selectedModel === 'OTHER_CUSTOM' && (
                <div className="p-4 bg-gray-50 rounded-xl border border-[#E8E9ED] space-y-2">
                  <label className="text-xs font-bold text-[#17191D]">
                    Please specify your {selectedCategory} model:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 16 Plus (512GB), iPad Air 4, etc."
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    className="w-full bg-white border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={!selectedModel || (selectedModel === 'OTHER_CUSTOM' && !customModel.trim())}
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
                >
                  <span>Continue to Services</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: SELECT REPAIR SERVICES ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#17191D]">Step 3: Select Repair Services</h2>
                  <p className="text-xs text-[#747982] mt-1">
                    Select one or more services needed for your device.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#1677FF] bg-blue-50 px-2.5 py-1 rounded-md">
                    {selectedServiceIds.length} Selected
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {services.map((service) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => handleToggleService(service.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'border-[#1677FF] bg-blue-50/50 shadow-xs'
                          : 'border-[#E8E9ED] hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md mt-0.5 border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#1677FF] border-[#1677FF] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-[#17191D]">{service.name}</h4>
                        </div>
                        <p className="text-[11px] text-[#545963] mt-1 line-clamp-2">
                          {service.description}
                        </p>
                        {service.duration_minutes && (
                          <span className="inline-block mt-2 text-[10px] text-gray-500 font-medium">
                            ⏱ Est. duration: ~{service.duration_minutes} mins
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={selectedServiceIds.length === 0}
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
                >
                  <span>Select Date & Time</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: DATE & AVAILABLE TIME SLOT ================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Step 4: Select Appointment Date & Time</h2>
                <p className="text-xs text-[#747982] mt-1">
                  Operating in Asia/Kolkata timezone. Live slots are updated dynamically to prevent double booking.
                </p>
              </div>

              {/* Horizontal scrollable date picker */}
              <div>
                <label className="text-xs font-bold text-[#17191D] block mb-2">
                  1. Pick Appointment Date:
                </label>
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {calendarDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDate(day.dateStr)}
                        className={`flex-shrink-0 w-20 py-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-[#1677FF] bg-[#1677FF] text-white shadow-xs'
                            : 'border-[#E8E9ED] bg-white text-[#17191D] hover:border-gray-300'
                        }`}
                      >
                        <p className={`text-[10px] uppercase font-bold ${isSelected ? 'text-blue-100' : 'text-gray-400'}`}>
                          {day.dayName}
                        </p>
                        <p className="text-lg font-black">{day.dayNum}</p>
                        <p className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          {day.monthName}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots Section */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#17191D]">
                    2. Available Time Slots for {selectedDate}:
                  </label>
                  {availability?.operatingHours && (
                    <span className="text-[11px] text-[#747982]">
                      Hours: {availability.operatingHours}
                    </span>
                  )}
                </div>

                {loadingAvailability ? (
                  <div className="p-8 text-center bg-gray-50 rounded-xl border border-gray-100">
                    <Loader2 className="w-6 h-6 animate-spin text-[#1677FF] mx-auto mb-2" />
                    <p className="text-xs text-[#747982]">Checking real-time slot availability...</p>
                  </div>
                ) : availability && !availability.isOpen ? (
                  <div className="p-6 text-center bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs space-y-1">
                    <p className="font-bold">Store Closed On This Date</p>
                    <p>{availability.message || 'The workshop is closed on this day. Please choose another date.'}</p>
                  </div>
                ) : availability && availability.slots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                    {availability.slots.map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-[#1677FF] text-white border-[#1677FF] shadow-xs'
                              : slot.available
                              ? 'bg-white text-[#17191D] border-[#E8E9ED] hover:border-blue-300 hover:bg-blue-50/30'
                              : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                          }`}
                          title={slot.available ? 'Click to select slot' : slot.reason || 'Unavailable'}
                        >
                          <span>{slot.time}</span>
                          {!slot.available && (
                            <span className="block text-[9px] font-normal text-gray-400 mt-0.5">
                              {slot.reason === 'Already booked' ? 'Booked' : 'Closed'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center bg-gray-50 rounded-xl border text-xs text-gray-500">
                    No time slots available for this date.
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={!selectedDate || !selectedTime}
                  onClick={() => setCurrentStep(5)}
                  className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
                >
                  <span>Customer Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 5: CUSTOMER INFORMATION ================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Step 5: Customer & Issue Details</h2>
                <p className="text-xs text-[#747982] mt-1">
                  We use your phone number to communicate appointment confirmation and diagnostic progress.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#17191D] flex items-center">
                    <User className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    Full Name <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#17191D] flex items-center">
                    <Phone className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    10-Digit Mobile Number <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#E8E9ED] rounded-xl pl-11 pr-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#17191D] flex items-center">
                    <Mail className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    Email Address <span className="text-gray-400 font-normal text-[11px]">(Optional for calendar invite)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#E8E9ED] rounded-xl px-3.5 py-2.5 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Problem Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#17191D] flex items-center">
                    <FileText className="w-3.5 h-3.5 text-gray-400 mr-1" />
                    Problem Description <span className="text-red-500 ml-0.5">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe symptoms, error messages, physical damage, liquid exposure, or battery drain..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    className="w-full bg-white border border-[#E8E9ED] rounded-xl p-3 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Customer Notes */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-[#17191D]">
                    Additional Notes <span className="text-gray-400 font-normal text-[11px]">(Urgent turnaround, preferred technician time, etc.)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Optional notes"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full bg-white border border-[#E8E9ED] rounded-xl px-3.5 py-2 text-xs text-[#17191D] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>

              {/* Privacy consent checkbox */}
              <div className="pt-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="text-xs text-[#545963] leading-relaxed">
                    I agree to the <button type="button" onClick={() => onNavigate('privacy')} className="text-blue-600 hover:underline">Privacy Policy</button> and consent to iCare zone contacting me regarding this diagnostic service appointment.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={!fullName.trim() || !phone.trim() || !problemDescription.trim() || !privacyAgreed}
                  onClick={() => setCurrentStep(6)}
                  className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5 transition-all"
                >
                  <span>Review Booking</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 6: SUMMARY & ATOMIC CONFIRMATION ================= */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Step 6: Review & Finalize Appointment</h2>
                <p className="text-xs text-[#747982] mt-1">
                  Please verify your repair appointment details before placing the reservation.
                </p>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                
                {/* Device & Services Card */}
                <div className="p-4 rounded-xl bg-gray-50 border border-[#E8E9ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                      Device & Model
                    </span>
                    <h3 className="font-bold text-sm text-[#17191D]">
                      {selectedCategory} – {selectedModel === 'OTHER_CUSTOM' ? customModel : selectedModel}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {selectedServicesObjects.map((s) => (
                        <span key={s.id} className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-gray-200 text-[#17191D]">
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-blue-600 hover:underline self-start sm:self-auto"
                  >
                    Edit
                  </button>
                </div>

                {/* Appointment Schedule Card */}
                <div className="p-4 rounded-xl bg-gray-50 border border-[#E8E9ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                      Schedule Slot
                    </span>
                    <h3 className="font-bold text-sm text-[#17191D] flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{selectedDate}</span>
                      <span className="text-gray-400">•</span>
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{selectedTime} IST</span>
                    </h3>
                    <p className="text-[11px] text-[#747982] mt-1">
                      Kuvempu Nagara Workshop, Mysuru
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-bold text-blue-600 hover:underline self-start sm:self-auto"
                  >
                    Edit
                  </button>
                </div>

                {/* Customer Details Card */}
                <div className="p-4 rounded-xl bg-gray-50 border border-[#E8E9ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#747982]">
                      Client Contact
                    </span>
                    <h3 className="font-bold text-sm text-[#17191D]">
                      {fullName} (+91 {phone})
                    </h3>
                    {email && <p className="text-xs text-[#545963]">{email}</p>}
                    <p className="text-xs text-[#545963] mt-2 italic bg-white p-2 rounded border border-gray-100">
                      "{problemDescription}"
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="text-xs font-bold text-blue-600 hover:underline self-start sm:self-auto"
                  >
                    Edit
                  </button>
                </div>

              </div>

              {/* Trust note */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-[#545963] flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  Your time slot will be reserved immediately upon confirmation. Our Mysuru technicians prepare the diagnostic tools for your {selectedCategory} in advance.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setCurrentStep(5)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitBooking}
                  className="px-8 py-3.5 bg-[#1677FF] hover:bg-blue-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg flex items-center space-x-2 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Locking In Slot...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
