export interface DeviceModel {
  id: string;
  name: string;
  category: 'iphone' | 'macbook' | 'ipad' | 'watch' | 'android';
}

export interface RepairService {
  id: string;
  name: string;
  category: 'iphone' | 'macbook' | 'ipad' | 'watch' | 'android';
  minPrice: number;
  maxPrice: number;
  durationMinutes: number;
  durationLabel: string;
  warrantyDays: number;
  description: string;
  highlight?: string;
}

export interface RepairTrackerJob {
  jobId: string;
  customerName: string;
  phoneEnding: string;
  device: string;
  issue: string;
  receivedDate: string;
  estimatedDelivery: string;
  statusStep: 1 | 2 | 3 | 4 | 5; // 1: Inwarded, 2: Diagnostics, 3: Under Repair, 4: Quality Check, 5: Ready for Delivery
  statusLabel: string;
  technicianNotes: string;
  technicianName: string;
  warrantyPeriod: string;
  pickupMode: 'In-Store Kuvempunagar' | 'Doorstep Pickup (Vijayanagar)' | 'Doorstep Delivery (Gokulam)' | 'Doorstep Pickup (Saraswathipuram)';
}

export const ICAREZONE_INFO = {
  name: 'iCareZone',
  city: 'Mysore (Mysuru)',
  tagline: "Mysore's Premier Apple & Gadget Repair Specialist",
  phone: '+91 80508 04656',
  phoneClean: '918050804656',
  email: 'santhosh@icarezone.in',
  address: '14/4, Ramanamaharshi Road, P and T Block, Kuvempu Nagara, Mysuru, Karnataka 570023',
  landmark: 'Diagonally opposite to Pizza Hut, near Apollo Hospital, Mysore',
  secondLocation: 'Saraswathipuram Service Point, Mysuru',
  hoursWeekday: '10:00 AM – 8:30 PM (Mon – Sat)',
  hoursSunday: '11:00 AM – 5:00 PM (Sunday)',
  rating: '4.9',
  reviewsCount: '640+',
  devicesRepaired: '14,800+',
  warrantyText: 'Up to 180 Days Comprehensive Warranty',
  expressTime: '30-45 Minute Express Fixes',
};

export const MYSURU_AREAS = [
  'Kuvempunagar',
  'Saraswathipuram',
  'Vijayanagar 1st Stage',
  'Vijayanagar 2nd Stage',
  'Vijayanagar 3rd & 4th Stage',
  'Gokulam',
  'Jayalakshmipuram',
  'Yadavagiri',
  'Ramakrishnanagar',
  'Dattagalli',
  'Bogadi',
  'Siddhartha Layout',
  'Hebbal Industrial Area',
  'Alanahalli',
  'Vidyaranyapuram',
  'Bannimantap',
  'Chamundipuram',
  'Mysore Central / Agrahara',
];

export const DEVICE_CATEGORIES = [
  { id: 'iphone', name: 'iPhone', icon: 'Smartphone' },
  { id: 'macbook', name: 'MacBook & Mac', icon: 'Laptop' },
  { id: 'ipad', name: 'iPad & Tablets', icon: 'Tablet' },
  { id: 'watch', name: 'Apple Watch', icon: 'Watch' },
  { id: 'android', name: 'Premium Android', icon: 'Cpu' },
] as const;

export const POPULAR_MODELS: DeviceModel[] = [
  // iPhone
  { id: 'ip-15pm', name: 'iPhone 15 Pro Max', category: 'iphone' },
  { id: 'ip-15p', name: 'iPhone 15 Pro', category: 'iphone' },
  { id: 'ip-15', name: 'iPhone 15 / 15 Plus', category: 'iphone' },
  { id: 'ip-14pm', name: 'iPhone 14 Pro Max', category: 'iphone' },
  { id: 'ip-14p', name: 'iPhone 14 Pro', category: 'iphone' },
  { id: 'ip-14', name: 'iPhone 14 / 14 Plus', category: 'iphone' },
  { id: 'ip-13pm', name: 'iPhone 13 Pro Max', category: 'iphone' },
  { id: 'ip-13', name: 'iPhone 13 / 13 Mini', category: 'iphone' },
  { id: 'ip-12p', name: 'iPhone 12 / 12 Pro', category: 'iphone' },
  { id: 'ip-11', name: 'iPhone 11 / 11 Pro Max', category: 'iphone' },
  { id: 'ip-x', name: 'iPhone X / XR / XS', category: 'iphone' },

  // MacBook
  { id: 'mb-air-m2m3', name: 'MacBook Air M2 / M3 (13" & 15")', category: 'macbook' },
  { id: 'mb-air-m1', name: 'MacBook Air M1 (2020)', category: 'macbook' },
  { id: 'mb-pro-mseries', name: 'MacBook Pro 14" / 16" (M1/M2/M3)', category: 'macbook' },
  { id: 'mb-pro-13', name: 'MacBook Pro 13" (Touch Bar / M1/M2)', category: 'macbook' },
  { id: 'mb-pro-intel', name: 'MacBook Pro Retina / Intel Series', category: 'macbook' },

  // iPad
  { id: 'ipad-pro-m', name: 'iPad Pro 11" / 12.9" (M1/M2/M4)', category: 'ipad' },
  { id: 'ipad-air', name: 'iPad Air (4th / 5th / M2 Gen)', category: 'ipad' },
  { id: 'ipad-gen10', name: 'iPad 10th / 9th Generation', category: 'ipad' },
  { id: 'ipad-mini', name: 'iPad Mini 6 / 5', category: 'ipad' },

  // Watch
  { id: 'watch-ultra', name: 'Apple Watch Ultra 2 / 1 (49mm)', category: 'watch' },
  { id: 'watch-s9-8', name: 'Apple Watch Series 9 / 8 (41/45mm)', category: 'watch' },
  { id: 'watch-s7-6', name: 'Apple Watch Series 7 / 6 / SE', category: 'watch' },

  // Android
  { id: 'and-s24-23', name: 'Samsung Galaxy S24 / S23 / S22 Ultra', category: 'android' },
  { id: 'and-fold-flip', name: 'Samsung Galaxy Z Fold / Z Flip', category: 'android' },
  { id: 'and-op12', name: 'OnePlus 12 / 11 / 10 Pro', category: 'android' },
  { id: 'and-pixel', name: 'Google Pixel 8 / 7 / 6 Pro', category: 'android' },
];

export const REPAIR_SERVICES: RepairService[] = [
  // iPhone services
  {
    id: 'ip-screen-oled',
    name: 'Original Grade OLED / Retina Screen Swap',
    category: 'iphone',
    minPrice: 3299,
    maxPrice: 14999,
    durationMinutes: 30,
    durationLabel: '30-40 Mins Express',
    warrantyDays: 180,
    description: 'High-gamut TrueTone calibration, factory oleophobic coating, instant live swap while you wait.',
    highlight: 'TrueTone Reprogramming Included',
  },
  {
    id: 'ip-battery',
    name: 'Certified Battery Replacement (100% Health)',
    category: 'iphone',
    minPrice: 1799,
    maxPrice: 4499,
    durationMinutes: 30,
    durationLabel: '25-35 Mins Express',
    warrantyDays: 180,
    description: 'Tier-1 Li-ion polymer cell, removes battery service warnings with BMS micro-soldering transfer.',
    highlight: 'No Unknown Part Warning',
  },
  {
    id: 'ip-back-glass',
    name: 'Laser Machine Back Glass Replacement',
    category: 'iphone',
    minPrice: 1999,
    maxPrice: 4999,
    durationMinutes: 90,
    durationLabel: '90 Mins Precision',
    warrantyDays: 90,
    description: 'High-precision cold-laser machine breaks epoxy adhesive without heat damage to internal motherboard.',
    highlight: 'No Frame Disassembly Needed',
  },
  {
    id: 'ip-faceid-cam',
    name: 'Face ID & TrueDepth Sensor Repair',
    category: 'iphone',
    minPrice: 2499,
    maxPrice: 5999,
    durationMinutes: 120,
    durationLabel: 'Same-Day Service',
    warrantyDays: 90,
    description: 'Dot projector and flood illuminator flex rework to restore Face ID functionality seamlessly.',
    highlight: 'Micro-Soldering Rework',
  },
  {
    id: 'ip-logic-board',
    name: 'Motherboard / Chip-Level Repair (Dead / Audio IC / Short)',
    category: 'iphone',
    minPrice: 2999,
    maxPrice: 8499,
    durationMinutes: 240,
    durationLabel: '4-8 Hours Diagnostic',
    warrantyDays: 90,
    description: 'Microscopic board tracing, baseband re-balling, short-circuit VDD_MAIN fault clearing with thermal imaging.',
    highlight: 'No Data Wipe Required',
  },
  {
    id: 'ip-charging-audio',
    name: 'Charging Port & Mic/Speaker Cleaning/Replacement',
    category: 'iphone',
    minPrice: 1299,
    maxPrice: 2899,
    durationMinutes: 40,
    durationLabel: '40 Mins',
    warrantyDays: 90,
    description: 'Fixes loose Lightning/Type-C port, slow charging, and muffled call audio issues.',
  },

  // MacBook services
  {
    id: 'mb-logic-mseries',
    name: 'MacBook M1/M2/M3 Chip-Level Logic Board Repair',
    category: 'macbook',
    minPrice: 4499,
    maxPrice: 16999,
    durationMinutes: 480,
    durationLabel: '24-48 Hours',
    warrantyDays: 90,
    description: 'Expert micro-soldering for no power, liquid spill corrosion, PMIC failure, and shorted decoupling capacitors.',
    highlight: 'Up to 70% cheaper than Apple Board Replacement',
  },
  {
    id: 'mb-display-panel',
    name: 'MacBook Retina Display Assembly Replacement',
    category: 'macbook',
    minPrice: 7999,
    maxPrice: 24999,
    durationMinutes: 120,
    durationLabel: '2-3 Hours',
    warrantyDays: 180,
    description: 'Original color gamut TrueTone calibrated panel, resolution matching factory specs with new aluminum housing.',
  },
  {
    id: 'mb-battery-pack',
    name: 'MacBook Battery Pack Replacement',
    category: 'macbook',
    minPrice: 3899,
    maxPrice: 7999,
    durationMinutes: 60,
    durationLabel: '1 Hour',
    warrantyDays: 180,
    description: 'Resolves Service Recommended, swelling batteries, and rapid drain with zero cycle fresh cells.',
    highlight: 'Zero Cycle Count New Cells',
  },
  {
    id: 'mb-keyboard-trackpad',
    name: 'Magic Keyboard & Force Touch Trackpad Rework',
    category: 'macbook',
    minPrice: 2499,
    maxPrice: 5899,
    durationMinutes: 90,
    durationLabel: '90 Mins',
    warrantyDays: 90,
    description: 'Individual key mechanism fixes, butterfly/scissor keyboard replacement, and haptic engine recalibration.',
  },

  // iPad services
  {
    id: 'ipad-touch-glass',
    name: 'iPad Touch Glass / Digitizer Separation & Replacement',
    category: 'ipad',
    minPrice: 2499,
    maxPrice: 7499,
    durationMinutes: 120,
    durationLabel: '2-4 Hours',
    warrantyDays: 90,
    description: 'OCA vacuum laminating chamber glass bonding without replacing the expensive underlying LCD.',
    highlight: 'Save up to 60% with Glass Only Rework',
  },
  {
    id: 'ipad-battery-port',
    name: 'iPad Battery & Charging Port Repair',
    category: 'ipad',
    minPrice: 2199,
    maxPrice: 4999,
    durationMinutes: 90,
    durationLabel: '90 Mins',
    warrantyDays: 90,
    description: 'Restores rapid battery drain, restart loops, and bent charging dock connectors.',
  },

  // Apple Watch services
  {
    id: 'watch-glass-oled',
    name: 'Apple Watch Curved Glass / OLED Screen Rework',
    category: 'watch',
    minPrice: 2499,
    maxPrice: 6999,
    durationMinutes: 180,
    durationLabel: 'Same-Day / 3-4 Hours',
    warrantyDays: 90,
    description: 'Sapphire & Ion-X glass separation with optical UV curing and 50m water-resistance gasket sealing.',
    highlight: 'Water-Resistance Seal Restored',
  },
  {
    id: 'watch-battery',
    name: 'Apple Watch Battery Replacement',
    category: 'watch',
    minPrice: 1699,
    maxPrice: 2999,
    durationMinutes: 60,
    durationLabel: '1 Hour',
    warrantyDays: 180,
    description: 'Solves expanding battery lifting watch face, sudden shutdowns, and fast battery depletion.',
  },

  // Android services
  {
    id: 'and-screen-curved',
    name: 'AMOLED / Curved Edge Display Replacement',
    category: 'android',
    minPrice: 2499,
    maxPrice: 12999,
    durationMinutes: 45,
    durationLabel: '45 Mins Express',
    warrantyDays: 180,
    description: 'High refresh 120Hz/144Hz AMOLED panels with in-display optical fingerprint calibration.',
  },
  {
    id: 'and-motherboard',
    name: 'Chip-Level Dead Boot / CPU Re-Balling',
    category: 'android',
    minPrice: 2200,
    maxPrice: 5999,
    durationMinutes: 240,
    durationLabel: 'Same Day / 4 Hours',
    warrantyDays: 90,
    description: 'Fixes Qualcomm Snapdragon & Exynos restart loops, camera dead issues, and sudden power failures.',
  },
];

export const SAMPLE_TRACKER_JOBS: Record<string, RepairTrackerJob> = {
  'ICZ-8421': {
    jobId: 'ICZ-8421',
    customerName: 'Dr. Praveen Rao',
    phoneEnding: '9845***210',
    device: 'iPhone 14 Pro Max (Deep Purple)',
    issue: 'Cracked Front Screen + TrueTone Calibration',
    receivedDate: 'Today, 10:45 AM',
    estimatedDelivery: 'Today, 12:30 PM (Ready)',
    statusStep: 5,
    statusLabel: 'Ready for Collection at Kuvempunagar Desk',
    technicianNotes: 'Original grade OLED installed. TrueTone data transferred. 24-point bench testing passed with 100% touch sampling rate.',
    technicianName: 'Santhosh (Lead Apple Specialist)',
    warrantyPeriod: '180 Days (Until May 2027)',
    pickupMode: 'In-Store Kuvempunagar',
  },
  'ICZ-7309': {
    jobId: 'ICZ-7309',
    customerName: 'Ananya Deshmukh',
    phoneEnding: '9980***345',
    device: 'MacBook Air M2 13" (Midnight)',
    issue: 'Liquid Spill & Short Circuit on 3V3_G3H Rail',
    receivedDate: 'Yesterday, 04:15 PM',
    estimatedDelivery: 'Today, 05:00 PM',
    statusStep: 3,
    statusLabel: 'Under Repair - Precision Micro-Soldering',
    technicianNotes: 'Ultrasonic board clean completed. Replacing corroded capacitor on power distribution line under stereo microscope. No data wipe needed.',
    technicianName: 'Raghavendra K. (Board Specialist)',
    warrantyPeriod: '90 Days Certified',
    pickupMode: 'Doorstep Delivery (Gokulam)',
  },
  'ICZ-5114': {
    jobId: 'ICZ-5114',
    customerName: 'Chethan Gowda',
    phoneEnding: '8050***656',
    device: 'Apple Watch Series 8 (45mm Midnight)',
    issue: 'Cracked Front Sapphire Glass Separation',
    receivedDate: 'Today, 09:15 AM',
    estimatedDelivery: 'Today, 02:00 PM',
    statusStep: 4,
    statusLabel: 'Final Quality Check & Water Reseal Pressure Test',
    technicianNotes: 'UV LOCA glass laminating complete. OLED is flawless. Running barometric pressure sealing chamber test.',
    technicianName: 'Santhosh (Lead Apple Specialist)',
    warrantyPeriod: '90 Days Certified',
    pickupMode: 'Doorstep Pickup (Vijayanagar)',
  },
};

export const REVIEWS = [
  {
    id: 1,
    name: 'Dr. Praveen Kumar',
    designation: 'Senior Consultant, Apollo Hospital Mysore',
    location: 'Kuvempunagar, Mysore',
    rating: 5,
    date: '2 weeks ago',
    text: 'My iPhone 14 Pro screen shattered when it fell near Apollo Hospital. Apple wanted to replace the entire chassis and quote a crazy amount. Walked into iCareZone Kuvempunagar, right opposite Pizza Hut. Santhosh replaced the screen in exactly 35 minutes in front of my eyes. TrueTone is working and data was untouched. Exceptional professionalism!',
    device: 'iPhone 14 Pro',
  },
  {
    id: 2,
    name: 'Deepthi S. Murthy',
    designation: 'Software Lead, Infosys Mysore Campus',
    location: 'Hebbal / Vijayanagar, Mysore',
    rating: 5,
    date: '1 month ago',
    text: 'My MacBook Air M1 had a coffee spill and stopped powering on completely. Authorized service center said motherboard replacement would cost ₹45,000. iCareZone did chip-level ultrasonic cleaning and micro-soldered two burnt power rail capacitors for a fraction of that price. MacBook is running like brand new with all my project files safe!',
    device: 'MacBook Air M1',
  },
  {
    id: 3,
    name: 'Karthik Somayaji',
    designation: 'Entrepreneur & Tech Reviewer',
    location: 'Saraswathipuram, Mysore',
    rating: 5,
    date: '3 weeks ago',
    text: 'Used their free doorstep pickup in Saraswathipuram for an Apple Watch battery replacement and iPhone 13 back glass laser fix. The laser machine precision left zero scratches on the titanium frame. Got it delivered back the same evening with invoice and 6-month warranty card.',
    device: 'Apple Watch & iPhone 13',
  },
  {
    id: 4,
    name: 'Farhan Ahmed',
    designation: 'Architecture Student, SJCE Mysore',
    location: 'Gokulam 3rd Stage, Mysore',
    rating: 5,
    date: 'Recent',
    text: 'Best iPad digitizer repair service in Mysore. Most shops in Nazarbad / Devaraja Market do messy glue work that causes ghost touches. iCareZone used clean OCA machine lamination for my iPad Pro. Perfectly responsive with Apple Pencil tilt & pressure!',
    device: 'iPad Pro 11"',
  },
];

export const FAQS = [
  {
    question: 'Will my personal data, photos, or WhatsApp chats be deleted during repair?',
    answer: 'Never. For 98% of repairs—including screen replacements, battery swaps, camera repairs, charging ports, and laser back glass—we never format or erase your storage. Your passwords and private data remain strictly untouched. You can even watch the repair live at our Kuvempunagar service lounge.',
  },
  {
    question: 'How fast are screen and battery replacements at the Kuvempunagar center?',
    answer: 'Standard screen and battery replacements for iPhone and premium Android models take only 30 to 45 minutes. You can relax in our air-conditioned lounge or visit nearby cafes while our certified technician completes the swap.',
  },
  {
    question: 'Do you offer free doorstep pickup and drop in Mysore?',
    answer: 'Yes! We provide complimentary doorstep pickup and drop-off across all major Mysuru neighborhoods, including Kuvempunagar, Saraswathipuram, Vijayanagar (1st to 4th stage), Gokulam, Jayalakshmipuram, Bogadi, Dattagalli, and Hebbal. Our logistics executive carries a digital job card inspection receipt.',
  },
  {
    question: 'What warranty do you provide on replacement parts?',
    answer: 'All our premium screens and batteries carry up to 180 Days (6 Months) direct replacement warranty. Chip-level motherboard and logic board micro-soldering repairs carry a 90-day peace-of-mind warranty with digital tracking.',
  },
  {
    question: 'Can you fix MacBook logic boards damaged by water or coffee spills?',
    answer: 'Yes, this is our core specialization. We have stereoscopic micro-soldering stations, thermal imaging cameras, and ultrasonic cleaning baths to repair Apple M1, M2, M3, and Intel motherboards down to individual component resistors, inductors, and power ICs, saving you over 60-70% compared to full board replacements.',
  },
];
