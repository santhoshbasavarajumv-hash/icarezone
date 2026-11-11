import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface LegalPagesProps {
  page: 'privacy' | 'terms';
  onNavigate: (tab: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ page, onNavigate }) => {
  return (
    <div className="py-12 bg-[#F5F6F8] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center text-xs font-bold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white rounded-3xl border border-[#E8E9ED] p-8 sm:p-12 shadow-xs space-y-8">
          
          {page === 'privacy' ? (
            <div className="space-y-6 text-xs text-[#545963] leading-relaxed">
              <div className="border-b border-[#E8E9ED] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1677FF]">
                  Legal & Data Protection
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] tracking-tight mt-1">
                  Privacy Policy
                </h1>
                <p className="text-xs text-[#747982] mt-1">
                  Effective Date: January 2026 • Apple Repair Experts – iCare zone (Mysuru, Karnataka)
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">1. Information We Collect</h2>
                <p>
                  When you book a repair appointment or contact iCare zone, we collect your name, mobile phone number, email address (optional), device category, device model, and reported fault description.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">2. Purpose of Data Collection</h2>
                <p>
                  Your information is exclusively used to:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Schedule, verify, and reserve workbench time slots.</li>
                  <li>Contact you regarding diagnostic assessments, repair progress, and device collection.</li>
                  <li>Maintain an accurate intake log of devices received at our Kuvempu Nagara center.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">3. Customer Device Data & Privacy</h2>
                <p>
                  We treat your personal data with utmost discretion. Technicians perform hardware functionality checks (display, camera, microphone, charging) without accessing private media or browsing personal storage unless explicitly required for requested data migration or backup services.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">4. Contact Information</h2>
                <p>
                  If you have questions about our privacy handling, please contact us at our facility: 14/4, Ramanamaharshi Road, near Apollo BGS Hospital, Kuvempu Nagara, Mysuru 570023, Phone: 080508 04656.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-xs text-[#545963] leading-relaxed">
              <div className="border-b border-[#E8E9ED] pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1677FF]">
                  Store Service Agreement
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] tracking-tight mt-1">
                  Terms and Conditions
                </h1>
                <p className="text-xs text-[#747982] mt-1">
                  Effective Date: January 2026 • Apple Repair Experts – iCare zone (Mysuru, Karnataka)
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">1. Independent Service Provider Status</h2>
                <p>
                  Apple Repair Experts – iCare zone operates as an independent technical repair facility in Mysuru. Apple, iPhone, iPad, Mac, MacBook, and Apple Watch are registered trademarks of Apple Inc. iCare zone is an independent workshop and does not claim to be an Apple-authorized service provider or directly affiliated with Apple Inc.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">2. Appointment Reservations & Slot Availability</h2>
                <p>
                  Appointments booked through this website represent reserved intake slots. While we endeavor to review your device at the chosen time, complex board-level diagnostics or heavy queue periods may require temporary device custody for thorough assessment.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">3. Diagnostics & Pre-Repair Approval</h2>
                <p>
                  Every device undergoes a preliminary intake assessment. A technician will inform you of the estimated service duration and cost before proceeding with non-diagnostic hardware part replacements.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">4. Backup Responsibility</h2>
                <p>
                  Customers are strongly encouraged to back up their data via iCloud or local computer backup prior to visiting the workshop. While our procedures are designed to preserve onboard data whenever technically feasible, iCare zone is not responsible for data loss arising from pre-existing logic board failure or liquid damage.
                </p>
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#17191D] mb-1">5. Governing Law & Jurisdiction</h2>
                <p>
                  These terms are governed by the laws of Karnataka, India. Any disputes arising from services rendered shall be subject to the jurisdiction of the competent courts in Mysuru.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
