import React, { useState } from 'react';
import { SAMPLE_TRACKER_JOBS, RepairTrackerJob, ICAREZONE_INFO } from '../data/repairData.ts';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Phone, 
  UserCheck, 
  FileCheck,
  AlertCircle
} from 'lucide-react';

export const RepairTracker: React.FC = () => {
  const [searchInput, setSearchInput] = useState('ICZ-8421');
  const [currentJob, setCurrentJob] = useState<RepairTrackerJob | null>(SAMPLE_TRACKER_JOBS['ICZ-8421']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    
    // Check against job ID
    if (SAMPLE_TRACKER_JOBS[query]) {
      setCurrentJob(SAMPLE_TRACKER_JOBS[query]);
      setHasSearched(true);
      return;
    }

    // Check against phone ending or substring
    const matchByPhone = Object.values(SAMPLE_TRACKER_JOBS).find(job => 
      job.phoneEnding.includes(query) || job.jobId.includes(query)
    );

    if (matchByPhone) {
      setCurrentJob(matchByPhone);
    } else {
      setCurrentJob(null);
    }
    setHasSearched(true);
  };

  const loadSample = (id: string) => {
    setSearchInput(id);
    setCurrentJob(SAMPLE_TRACKER_JOBS[id] || null);
    setHasSearched(true);
  };

  const steps = [
    { num: 1, label: 'Inwarded & Logged', desc: 'Visual intake & serial verification' },
    { num: 2, label: 'Diagnostic Testing', desc: 'Current draw & component profiling' },
    { num: 3, label: 'Technician Bench', desc: 'Precision micro-soldering / part swap' },
    { num: 4, label: '24-Point Quality QC', desc: 'Thermal test, sensors & battery check' },
    { num: 5, label: 'Ready for Collection', desc: 'Ready at Kuvempunagar or dispatch' },
  ];

  return (
    <section id="tracker" className="py-16 sm:py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Live Transparency
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Live Repair Status Tracker
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Track your device in real-time through every milestone at our Kuvempunagar service center. Enter your Job Card ID or registered mobile.
          </p>
        </div>

        {/* Search Bar & Quick Demo Chips */}
        <div className="max-w-2xl mx-auto mb-10 space-y-3">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Job ID (e.g. ICZ-8421) or phone ending..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Track Device
            </button>
          </form>

          {/* Quick lookup helper buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span>Quick Demo Job Cards:</span>
            <button
              type="button"
              onClick={() => loadSample('ICZ-8421')}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sky-400 font-mono-numbers transition-colors"
            >
              ICZ-8421 (iPhone 14 Pro Ready)
            </button>
            <button
              type="button"
              onClick={() => loadSample('ICZ-7309')}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-amber-400 font-mono-numbers transition-colors"
            >
              ICZ-7309 (MacBook Under Repair)
            </button>
            <button
              type="button"
              onClick={() => loadSample('ICZ-5114')}
              className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-emerald-400 font-mono-numbers transition-colors"
            >
              ICZ-5114 (Apple Watch QC)
            </button>
          </div>
        </div>

        {/* Tracker Results Box */}
        {hasSearched && currentJob ? (
          <div className="max-w-4xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
            
            {/* Top Job Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white font-mono-numbers">
                    {currentJob.jobId}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    currentJob.statusStep === 5 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' 
                      : 'bg-sky-950 text-sky-400 border border-sky-800/60'
                  }`}>
                    {currentJob.statusLabel}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>Customer: <strong className="text-slate-200">{currentJob.customerName}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Phone: <strong className="text-slate-200">{currentJob.phoneEnding}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Received: {currentJob.receivedDate}</span>
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <div className="text-xs text-slate-400">Handover Location:</div>
                <div className="text-xs font-semibold text-white flex items-center gap-1 sm:justify-end">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>{currentJob.pickupMode}</span>
                </div>
              </div>
            </div>

            {/* 5-Stage Visual Progress Bar */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Repair Milestone
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {steps.map(step => {
                  const isCompleted = step.num < currentJob.statusStep;
                  const isCurrent = step.num === currentJob.statusStep;
                  
                  return (
                    <div 
                      key={step.num}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-sky-950/40 border-sky-500 shadow-sm shadow-sky-500/10'
                          : isCompleted
                          ? 'bg-slate-900 border-slate-750'
                          : 'bg-slate-900/30 border-slate-800/50 opacity-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-sky-500 text-white animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                        </div>
                        <span className={`text-xs font-semibold ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'}`}>
                          Step {step.num}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-200 leading-tight">
                        {step.label}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-1 hidden sm:block">
                        {step.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hardware & Diagnostics Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <Wrench className="w-4 h-4 text-sky-400" />
                  <span>Device & Issue Log</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Device Model:</span>
                    <div className="text-sm font-semibold text-white">{currentJob.device}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Reported Problem:</span>
                    <div className="text-slate-200">{currentJob.issue}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Warranty on Replacement:</span>
                    <div className="text-emerald-400 font-semibold">{currentJob.warrantyPeriod}</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Technician Bench Note</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400">Assigned Specialist:</span>
                    <div className="text-sm font-semibold text-white">{currentJob.technicianName}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Live Diagnostic Status:</span>
                    <p className="text-slate-300 leading-relaxed italic bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 mt-1">
                      "{currentJob.technicianNotes}"
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions for customer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                Questions about your repair ticket? Speak directly with technician Santhosh.
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hello%20iCareZone%20Mysore%2C%20regarding%20my%20job%20ticket%20${currentJob.jobId}%20(${encodeURIComponent(currentJob.device)})...`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={`tel:${ICAREZONE_INFO.phoneClean}`}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-400" />
                  <span>Call Desk</span>
                </a>
              </div>
            </div>

          </div>
        ) : hasSearched && !currentJob ? (
          <div className="max-w-md mx-auto text-center p-8 bg-slate-950 border border-slate-800 rounded-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                Job Card Not Found in Live System
              </h3>
              <p className="text-xs text-slate-400">
                We couldn't locate active ticket "{searchInput}". For newly submitted jobs (within 15 minutes) or custom serial numbers, ping our Kuvempunagar desk directly.
              </p>
            </div>
            <a
              href={`https://wa.me/${ICAREZONE_INFO.phoneClean}?text=Hi%20Santhosh%20iCareZone%2C%20I%20am%20checking%20status%20for%20my%20device%20under%20ticket%20or%20phone%20number%20${encodeURIComponent(searchInput)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-lg transition-colors"
            >
              <span>Verify with Santhosh via WhatsApp</span>
            </a>
          </div>
        ) : null}

      </div>
    </section>
  );
};
