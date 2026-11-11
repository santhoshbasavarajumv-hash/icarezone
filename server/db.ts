import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../data.db');
export const db = new Database(dbPath);

// Enable foreign keys and WAL mode for reliability and performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS business_settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      business_name TEXT NOT NULL,
      category TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      google_rating REAL NOT NULL,
      google_review_count INTEGER NOT NULL,
      google_maps_url TEXT NOT NULL,
      announcement TEXT,
      appointment_interval_mins INTEGER NOT NULL DEFAULT 30,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      price TEXT, -- Optional starting price string, e.g. "From ₹1,499" or empty if diagnostic
      duration_minutes INTEGER DEFAULT 45,
      image_url TEXT,
      repair_process TEXT,
      compatible_devices TEXT,
      active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS devices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL, -- iPhone, iPad, Mac, Apple Watch, Other
      model TEXT NOT NULL,
      active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_reference TEXT UNIQUE NOT NULL,
      customer_id INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      device_category TEXT NOT NULL,
      device_model TEXT NOT NULL,
      appointment_date TEXT NOT NULL, -- YYYY-MM-DD
      start_time TEXT NOT NULL, -- HH:MM (24-hr format)
      end_time TEXT NOT NULL, -- HH:MM
      status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, In Progress, Completed, Cancelled, No Show
      problem_description TEXT NOT NULL,
      customer_notes TEXT,
      internal_notes TEXT,
      device_photo_url TEXT,
      agreed_price TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointment_services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      appointment_id INTEGER NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
      service_id INTEGER NOT NULL REFERENCES services(id),
      agreed_price TEXT
    );

    CREATE TABLE IF NOT EXISTS business_hours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weekday INTEGER NOT NULL UNIQUE, -- 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      weekday_name TEXT NOT NULL,
      opening_time TEXT NOT NULL, -- HH:MM
      closing_time TEXT NOT NULL, -- HH:MM
      is_open INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS blocked_slots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL, -- YYYY-MM-DD
      start_time TEXT, -- Optional HH:MM. If NULL, entire day is blocked
      end_time TEXT,
      reason TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image_url TEXT NOT NULL,
      category TEXT NOT NULL, -- Store Interior, Repair Work, iPhone Repairs, Device Issues, Before and After
      display_order INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS admin_tokens (
      token TEXT PRIMARY KEY,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default business settings if not already present
  const existingSettings = db.prepare('SELECT id FROM business_settings WHERE id = 1').get();
  if (!existingSettings) {
    db.prepare(`
      INSERT INTO business_settings (
        id, business_name, category, address, phone, whatsapp, 
        google_rating, google_review_count, google_maps_url, announcement, appointment_interval_mins
      ) VALUES (
        1,
        'Apple Repair Experts – iCare zone',
        'Mobile Phone Repair Shop',
        '14/4, Ramanamaharshi Road, near Apollo BGS Hospital, opposite Pizza Hut, P and T Block, Diagonally, Kuvempu Nagara, Mysuru, Karnataka 570023',
        '080508 04656',
        '918050804656',
        4.9,
        694,
        'https://maps.google.com/?q=Apollo+BGS+Hospital+Kuvempu+Nagara+Mysuru+iCare+zone',
        'Appointments recommended for priority intake and swift diagnostics in Mysuru.',
        30
      )
    `).run();
  }

  // Seed business hours (Mon-Sat 10:00 - 20:30, Sun 10:30 - 18:00)
  const existingHours = db.prepare('SELECT COUNT(*) as count FROM business_hours').get() as { count: number };
  if (existingHours.count === 0) {
    const insertHours = db.prepare(`
      INSERT INTO business_hours (weekday, weekday_name, opening_time, closing_time, is_open)
      VALUES (?, ?, ?, ?, ?)
    `);
    const schedule = [
      [0, 'Sunday', '10:30', '18:00', 1],
      [1, 'Monday', '10:00', '20:30', 1],
      [2, 'Tuesday', '10:00', '20:30', 1],
      [3, 'Wednesday', '10:00', '20:30', 1],
      [4, 'Thursday', '10:00', '20:30', 1],
      [5, 'Friday', '10:00', '20:30', 1],
      [6, 'Saturday', '10:00', '20:30', 1],
    ];
    for (const item of schedule) {
      insertHours.run(item[0], item[1], item[2], item[3], item[4]);
    }
  }

  // Seed default services specified in prompt:
  // Battery Replacement, Button Repair, Camera Repair, Case Repair, Charging Port Repair, Data Backup
  const existingServices = db.prepare('SELECT COUNT(*) as count FROM services').get() as { count: number };
  if (existingServices.count === 0) {
    const insertService = db.prepare(`
      INSERT INTO services (name, description, category, price, duration_minutes, image_url, repair_process, compatible_devices, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `);

    const defaultServices = [
      {
        name: 'Battery Replacement',
        description: 'Comprehensive battery health diagnostic and replacement for iPhones, iPads, MacBooks, and Apple Watches experiencing drain, shutdown, or swelling.',
        category: 'Hardware',
        price: 'From ₹1,499',
        duration_minutes: 45,
        image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. Diagnostic health assessment -> 2. Safe battery discharge & adhesive removal -> 3. Precision cell installation -> 4. Calibration & cycle check.',
        compatible_devices: 'iPhone 11 through 16 Series, iPad Pro/Air, MacBook Pro/Air, Apple Watch'
      },
      {
        name: 'Button Repair',
        description: 'Fix unresponsive, sticky, or physically damaged Power/Lock, Volume rockers, Mute switches, and Action buttons with precision flex assembly replacement.',
        category: 'Hardware',
        price: 'From ₹999',
        duration_minutes: 45,
        image_url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. Internal bracket disassembly -> 2. Micro-switch tactile inspection -> 3. Flex cable assembly exchange -> 4. Actuation pressure test.',
        compatible_devices: 'All iPhone models, iPad Mini/Air/Pro'
      },
      {
        name: 'Camera Repair',
        description: 'Expert repair for cracked sapphire camera lenses, blurry autofocus, OIS sensor shaking, black viewfinder, and front TrueDepth/Face ID camera diagnostics.',
        category: 'Optics & Sensors',
        price: 'From ₹1,899',
        duration_minutes: 60,
        image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. Optics alignment & sensor read test -> 2. Anti-dust cleanroom module exchange -> 3. Focus & LiDAR calibration -> 4. Portrait & night mode verification.',
        compatible_devices: 'iPhone 12 through 16 Pro Max, iPad Pro'
      },
      {
        name: 'Case Repair',
        description: 'Precision back glass replacement, aluminum/titanium frame dent realignment, and chassis structural repairs after hard impacts or drops.',
        category: 'Cosmetic & Structural',
        price: 'From ₹1,999',
        duration_minutes: 90,
        image_url: 'https://images.unsplash.com/photo-1603539947678-cd3954ed515d?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. Complete internal sub-assembly safeguarding -> 2. Laser back glass de-bonding -> 3. Structural frame squaring -> 4. Pressure seal bonding.',
        compatible_devices: 'iPhone 8 through 16 Pro, iPad, MacBook enclosures'
      },
      {
        name: 'Charging Port Repair',
        description: 'Deep microscopic lint extraction, loose connection repair, and full Lightning or USB-C charging dock flex replacement for devices refusing charge.',
        category: 'Power & Connectivity',
        price: 'From ₹899',
        duration_minutes: 30,
        image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. High-power microscope port inspection -> 2. Pin corrosion & debris clearance -> 3. Dock flex replacement if pins damaged -> 4. Fast-charge wattage load test.',
        compatible_devices: 'iPhone, iPad, MacBook, Apple Watch magnetic chargers'
      },
      {
        name: 'Data Backup',
        description: 'Safe, secure local diagnostic data extraction, device transfer assistance, iCloud recovery guidance, and pre-repair backup creation.',
        category: 'Software & Data',
        price: 'From ₹799',
        duration_minutes: 45,
        image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        repair_process: '1. Device integrity check -> 2. Encrypted local disk backup -> 3. Media & contacts verification -> 4. Secure restore or export to customer media.',
        compatible_devices: 'iPhones, iPads, MacBooks, iMacs'
      }
    ];

    for (const s of defaultServices) {
      insertService.run(s.name, s.description, s.category, s.price, s.duration_minutes, s.image_url, s.repair_process, s.compatible_devices);
    }
  }

  // Seed devices
  const existingDevices = db.prepare('SELECT COUNT(*) as count FROM devices').get() as { count: number };
  if (existingDevices.count === 0) {
    const insertDevice = db.prepare('INSERT INTO devices (category, model, active) VALUES (?, ?, 1)');
    const deviceCatalog = [
      // iPhones
      ['iPhone', 'iPhone 16 Pro Max'],
      ['iPhone', 'iPhone 16 Pro'],
      ['iPhone', 'iPhone 16 Plus'],
      ['iPhone', 'iPhone 16'],
      ['iPhone', 'iPhone 15 Pro Max'],
      ['iPhone', 'iPhone 15 Pro'],
      ['iPhone', 'iPhone 15 Plus'],
      ['iPhone', 'iPhone 15'],
      ['iPhone', 'iPhone 14 Pro Max'],
      ['iPhone', 'iPhone 14 Pro'],
      ['iPhone', 'iPhone 14 Plus'],
      ['iPhone', 'iPhone 14'],
      ['iPhone', 'iPhone 13 Pro Max'],
      ['iPhone', 'iPhone 13 Pro'],
      ['iPhone', 'iPhone 13'],
      ['iPhone', 'iPhone 13 mini'],
      ['iPhone', 'iPhone 12 Pro Max'],
      ['iPhone', 'iPhone 12 Pro'],
      ['iPhone', 'iPhone 12'],
      ['iPhone', 'iPhone 11 Pro Max'],
      ['iPhone', 'iPhone 11 Pro'],
      ['iPhone', 'iPhone 11'],
      ['iPhone', 'iPhone SE (3rd Gen)'],
      ['iPhone', 'iPhone XR / XS Max'],
      // iPads
      ['iPad', 'iPad Pro 13" (M4)'],
      ['iPad', 'iPad Pro 11" (M4)'],
      ['iPad', 'iPad Pro 12.9" (6th Gen)'],
      ['iPad', 'iPad Air 13" (M2)'],
      ['iPad', 'iPad Air 11" (M2)'],
      ['iPad', 'iPad (10th Generation)'],
      ['iPad', 'iPad (9th Generation)'],
      ['iPad', 'iPad Mini (6th Gen)'],
      // Mac
      ['Mac', 'MacBook Pro 16" (M-Series)'],
      ['Mac', 'MacBook Pro 14" (M-Series)'],
      ['Mac', 'MacBook Air 15" (M-Series)'],
      ['Mac', 'MacBook Air 13" (M-Series)'],
      ['Mac', 'MacBook Pro 13" / 15" (Intel)'],
      ['Mac', 'Mac mini / Mac Studio'],
      ['Mac', 'iMac 24" (M-Series)'],
      // Apple Watch
      ['Apple Watch', 'Apple Watch Ultra 2'],
      ['Apple Watch', 'Apple Watch Ultra'],
      ['Apple Watch', 'Apple Watch Series 10'],
      ['Apple Watch', 'Apple Watch Series 9'],
      ['Apple Watch', 'Apple Watch Series 8/7'],
      ['Apple Watch', 'Apple Watch SE (2nd Gen)'],
      // Other
      ['Other device', 'AirPods Max'],
      ['Other device', 'AirPods Pro (2nd Gen)'],
      ['Other device', 'Apple Pencil (USB-C / 2nd Gen)'],
      ['Other device', 'Other Apple Accessory / Model']
    ];

    for (const [cat, mod] of deviceCatalog) {
      insertDevice.run(cat, mod);
    }
  }

  // Seed initial gallery items
  const existingGallery = db.prepare('SELECT COUNT(*) as count FROM gallery').get() as { count: number };
  if (existingGallery.count === 0) {
    const insertGallery = db.prepare(`
      INSERT INTO gallery (title, image_url, category, display_order, active)
      VALUES (?, ?, ?, ?, 1)
    `);

    const galleryItems = [
      {
        title: 'Diagnostic & Intake Station',
        image_url: 'https://images.unsplash.com/photo-1597740985671-2a8a3b80532e?auto=format&fit=crop&w=1000&q=80',
        category: 'Store Interior',
        display_order: 1
      },
      {
        title: 'Precision Micro-soldering Bench',
        image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
        category: 'Repair Work',
        display_order: 2
      },
      {
        title: 'iPhone OLED & Screen Assembly',
        image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
        category: 'iPhone Repairs',
        display_order: 3
      },
      {
        title: 'Battery Cell Health Replacement',
        image_url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1000&q=80',
        category: 'Before and After',
        display_order: 4
      },
      {
        title: 'High-magnification Optical Inspection',
        image_url: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1000&q=80',
        category: 'Repair Work',
        display_order: 5
      },
      {
        title: 'Charging Port & Flex Reconditioning',
        image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1000&q=80',
        category: 'Device Issues',
        display_order: 6
      }
    ];

    for (const g of galleryItems) {
      insertGallery.run(g.title, g.image_url, g.category, g.display_order);
    }
  }
}
