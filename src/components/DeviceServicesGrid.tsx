import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Monitor, 
  Cpu, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';

interface DeviceServicesGridProps {
  onSelectDevice: (deviceCategory: 'iphone' | 'macbook' | 'ipad' | 'watch' | 'android' | 'imac') => void;
  onOpenBooking: () => void;
}

export const DeviceServicesGrid: React.FC<DeviceServicesGridProps> = ({ 
  onSelectDevice, 
  onOpenBooking 
}) => {
  const deviceServices = [
    {
      id: 'iphone',
      title: 'iPhone Repair',
      icon: <Smartphone className="w-6 h-6 text-sky-400" />,
      tagline: 'iPhone 15, 14, 13, 12, 11 & Classic Series',
      turnaround: '30 Min Express',
      issues: [
        'Original Grade OLED / TrueTone Screen Replacement',
        'Certified Battery Replacement (100% Health reporting)',
        'Cold-Laser Machine Back Glass Replacement',
        'Face ID & TrueDepth Micro-Soldering Rework',
        'Dead Motherboard & Short-Circuit Fault Clearing',
        'Charging Port & Muffled Speaker Audio Repair',
      ],
      warranty: 'Up to 180 Days Warranty',
    },
    {
      id: 'macbook',
      title: 'MacBook Repair',
      icon: <Laptop className="w-6 h-6 text-sky-400" />,
      tagline: 'MacBook Air & Pro (M1, M2, M3 & Intel Series)',
      turnaround: 'Same-Day / 24-48 Hrs',
      issues: [
        'Chip-Level Logic Board & PMIC Micro-Soldering',
        'Liquid & Coffee Spill Ultrasonic Corrosion Neutralization',
        'Retina Display Assembly & Hinge Replacement',
        'Zero Cycle Battery Pack Swaps (Service Recommended fix)',
        'Magic Keyboard & Force Touch Trackpad Mechanism',
        'SSD Data Recovery & macOS Kernel Panic Fixes',
      ],
      warranty: 'Save up to 70% vs Board Swap',
    },
    {
      id: 'ipad',
      title: 'iPad Repair',
      icon: <Tablet className="w-6 h-6 text-sky-400" />,
      tagline: 'iPad Pro (M1/M2/M4), iPad Air, 10th Gen & Mini',
      turnaround: '2-4 Hours',
      issues: [
        'Glass Digitizer Separation without LCD Replacement',
        'Laminated Liquid Retina Display Bonding',
        'Battery Drain & Rapid Restart Loop Diagnostics',
        'Bent Aluminum Housing Alignment & Frame Restoration',
        'Type-C / Lightning Charging Dock Replacement',
        'Apple Pencil Touch Digitizer & Magnet Repair',
      ],
      warranty: 'OCA Clean Room Lamination',
    },
    {
      id: 'watch',
      title: 'Apple Watch Repair',
      icon: <Watch className="w-6 h-6 text-sky-400" />,
      tagline: 'Apple Watch Ultra 2/1, Series 9, 8, 7, 6 & SE',
      turnaround: 'Same-Day / 3-4 Hrs',
      issues: [
        'Curved Sapphire & Ion-X Glass Separation & Optical UV Cure',
        'Swollen Battery Replacement (Lifting Screen fix)',
        'Heart Rate, ECG & SpO2 Sensor Restorations',
        'Digital Crown Haptic & Button Rework',
        '50m Water Resistance Pressure Gasket Resealing',
      ],
      warranty: 'Water Resistance Seal Tested',
    },
    {
      id: 'imac',
      title: 'iMac & Mac Mini Repair',
      icon: <Monitor className="w-6 h-6 text-sky-400" />,
      tagline: 'iMac 24" M-Series, 27" 5K Retina & Mac Mini M2/M1',
      turnaround: '1-2 Days',
      issues: [
        'NVMe High-Speed SSD Upgrade & RAM Expansion',
        'Internal Power Supply Unit (PSU) Component Repair',
        'Thermal Overheating, Fan Cleaning & Liquid Metal Repasting',
        'Logic Board GPU & Chipset Micro-Soldering',
        'Display Panel Backlight Inverter Restoration',
      ],
      warranty: 'Includes 90-Day Guarantee',
    },
    {
      id: 'android',
      title: 'Premium Android & Laptop Care',
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      tagline: 'Samsung S24/S23 Ultra, OnePlus 12/11 & Pixel 8',
      turnaround: '45 Min Express',
      issues: [
        'Curved 120Hz AMOLED Screen Swaps with In-Display Fingerprint',
        'Qualcomm Snapdragon CPU & RAM Chip Re-balling',
        'Motherboard Power IC & Dead Boot Recovery',
        'Back Panel Replacement & Camera Sensor Alignment',
        'Dell, HP, Lenovo Laptop Motherboard Servicing',
      ],
      warranty: 'OEM Grade Specification',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
            Device Repairs / Our Services
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight" style={{ textWrap: 'balance' }}>
            Comprehensive Service for Every Apple Device
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From cracked screens to complex micro-soldering logic board recoveries. Select your device below to check options or book repair.
          </p>
        </div>

        {/* Services Grid (icareplus template style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deviceServices.map((service) => (
            <div
              key={service.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono-numbers">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-sky-400/90 font-medium">
                    {service.tagline}
                  </p>
                </div>

                {/* Common Issues Handled */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Common Repairs Handled:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {service.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 border-t border-slate-800 space-y-3 mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    {service.warranty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (service.id === 'imac') {
                        onSelectDevice('macbook');
                      } else {
                        onSelectDevice(service.id as any);
                      }
                      const el = document.getElementById('estimator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 px-3 text-xs font-medium text-slate-200 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors text-center cursor-pointer"
                  >
                    View Pricing
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="py-2.5 px-3 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-400 rounded-xl transition-colors text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Book Repair</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
