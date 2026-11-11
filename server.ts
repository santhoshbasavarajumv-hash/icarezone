import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { db, initDatabase } from './server/db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Initialize DB schema & seeds
initDatabase();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Helper: Admin authentication middleware
function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.headers['x-admin-token'];
  
  if (!token || typeof token !== 'string') {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const session = db.prepare('SELECT token FROM admin_tokens WHERE token = ?').get(token);
  if (!session) {
    return res.status(401).json({ error: 'Invalid or expired admin session. Please log in again.' });
  }

  next();
}

// ==========================================
// PUBLIC API ROUTES
// ==========================================

// 1. Business Settings
app.get('/api/business-settings', (req, res) => {
  try {
    const settings = db.prepare('SELECT * FROM business_settings WHERE id = 1').get();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Services (active for public)
app.get('/api/services', (req, res) => {
  try {
    const all = req.query.all === 'true';
    const query = all
      ? 'SELECT * FROM services ORDER BY id ASC'
      : 'SELECT * FROM services WHERE active = 1 ORDER BY id ASC';
    const services = db.prepare(query).all();
    res.json(services);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Single service details
app.get('/api/services/:id', (req, res) => {
  try {
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Devices & Models
app.get('/api/devices', (req, res) => {
  try {
    const devices = db.prepare('SELECT * FROM devices WHERE active = 1 ORDER BY category, model ASC').all();
    res.json(devices);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Business Hours
app.get('/api/business-hours', (req, res) => {
  try {
    const hours = db.prepare('SELECT * FROM business_hours ORDER BY weekday ASC').all();
    res.json(hours);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Gallery Items
app.get('/api/gallery', (req, res) => {
  try {
    const category = req.query.category as string;
    let items;
    if (category && category !== 'All') {
      items = db.prepare('SELECT * FROM gallery WHERE active = 1 AND category = ? ORDER BY display_order ASC, id DESC').all(category);
    } else {
      items = db.prepare('SELECT * FROM gallery WHERE active = 1 ORDER BY display_order ASC, id DESC').all();
    }
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Availability Calculation Engine
app.get('/api/availability', (req, res) => {
  try {
    const dateStr = req.query.date as string;
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    const targetDate = new Date(dateStr + 'T00:00:00Z');
    const weekday = targetDate.getUTCDay();

    // Check weekday operating hours
    const hours = db.prepare('SELECT * FROM business_hours WHERE weekday = ?').get(weekday) as any;
    if (!hours || !hours.is_open) {
      return res.json({
        date: dateStr,
        isOpen: false,
        message: 'The repair centre is closed on this day.',
        slots: []
      });
    }

    // Check full-day block
    const fullDayBlock = db.prepare('SELECT * FROM blocked_slots WHERE date = ? AND start_time IS NULL').get(dateStr) as any;
    if (fullDayBlock) {
      return res.json({
        date: dateStr,
        isOpen: false,
        message: fullDayBlock.reason || 'Store closed for maintenance/holiday on this date.',
        slots: []
      });
    }

    // Generate slots based on settings
    const settings = db.prepare('SELECT appointment_interval_mins FROM business_settings WHERE id = 1').get() as any;
    const intervalMins = settings?.appointment_interval_mins || 30;

    const [openH, openM] = hours.opening_time.split(':').map(Number);
    const [closeH, closeM] = hours.closing_time.split(':').map(Number);

    const openTotalMins = openH * 60 + openM;
    const closeTotalMins = closeH * 60 + closeM;

    // Get all existing active bookings on this date
    const bookedAppointments = db.prepare(`
      SELECT start_time, end_time FROM appointments 
      WHERE appointment_date = ? AND status != 'Cancelled'
    `).all(dateStr) as Array<{ start_time: string; end_time: string }>;

    const bookedTimes = new Set(bookedAppointments.map(b => b.start_time));

    // Get time-specific blocked slots
    const partialBlocks = db.prepare(`
      SELECT start_time, end_time, reason FROM blocked_slots 
      WHERE date = ? AND start_time IS NOT NULL
    `).all(dateStr) as Array<{ start_time: string; end_time: string; reason: string }>;

    // Current time in IST (UTC+5:30)
    const nowUtc = new Date();
    const istTime = new Date(nowUtc.getTime() + (5.5 * 60 * 60 * 1000));
    const todayDateStr = istTime.toISOString().split('T')[0];
    const currentIstMins = istTime.getUTCHours() * 60 + istTime.getUTCMinutes();

    const isToday = dateStr === todayDateStr;

    const slots: Array<{ time: string; available: boolean; reason?: string }> = [];

    for (let m = openTotalMins; m + intervalMins <= closeTotalMins; m += intervalMins) {
      const hStr = Math.floor(m / 60).toString().padStart(2, '0');
      const mStr = (m % 60).toString().padStart(2, '0');
      const timeSlot = `${hStr}:${mStr}`;

      // Check if slot is in the past for today
      if (isToday && m <= currentIstMins + 15) {
        slots.push({ time: timeSlot, available: false, reason: 'Time elapsed' });
        continue;
      }

      // Check if already booked
      if (bookedTimes.has(timeSlot)) {
        slots.push({ time: timeSlot, available: false, reason: 'Already booked' });
        continue;
      }

      // Check partial blocks
      const isBlocked = partialBlocks.some(block => {
        if (!block.end_time) return block.start_time === timeSlot;
        return timeSlot >= block.start_time && timeSlot < block.end_time;
      });

      if (isBlocked) {
        slots.push({ time: timeSlot, available: false, reason: 'Unavailable' });
        continue;
      }

      slots.push({ time: timeSlot, available: true });
    }

    res.json({
      date: dateStr,
      isOpen: true,
      operatingHours: `${hours.opening_time} - ${hours.closing_time}`,
      slots
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Atomic Booking Engine (Prevents double bookings with DB transaction)
app.post('/api/appointments', (req, res) => {
  const {
    fullName,
    phone,
    email,
    deviceCategory,
    deviceModel,
    serviceIds,
    appointmentDate,
    startTime,
    problemDescription,
    customerNotes,
    devicePhotoUrl
  } = req.body;

  if (!fullName || !phone || !deviceCategory || !deviceModel || !serviceIds?.length || !appointmentDate || !startTime || !problemDescription) {
    return res.status(400).json({ error: 'Missing required booking information. Please complete all mandatory fields.' });
  }

  // Clean phone number (keep digits)
  const cleanPhone = String(phone).replace(/[^\d]/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ error: 'Please enter a valid 10-digit mobile number.' });
  }

  try {
    // Atomic Transaction
    const executeBooking = db.transaction(() => {
      // 1. Check double booking lock
      const existing = db.prepare(`
        SELECT id, booking_reference FROM appointments 
        WHERE appointment_date = ? AND start_time = ? AND status != 'Cancelled'
      `).get(appointmentDate, startTime) as any;

      if (existing) {
        throw new Error(`SLOT_TAKEN: The time slot ${startTime} on ${appointmentDate} was just booked by another customer. Please select another time.`);
      }

      // 2. Check if date/slot is blocked
      const blocked = db.prepare(`
        SELECT id, reason FROM blocked_slots 
        WHERE date = ? AND (start_time IS NULL OR start_time = ?)
      `).get(appointmentDate, startTime) as any;

      if (blocked) {
        throw new Error(`SLOT_BLOCKED: Selected slot is unavailable (${blocked.reason || 'Store closure'}).`);
      }

      // 3. Find or create customer
      let customer = db.prepare('SELECT id FROM customers WHERE phone = ?').get(cleanPhone) as any;
      let customerId: number;
      if (customer) {
        customerId = customer.id;
        db.prepare('UPDATE customers SET full_name = ?, email = COALESCE(?, email) WHERE id = ?')
          .run(fullName.trim(), email ? email.trim() : null, customerId);
      } else {
        const info = db.prepare('INSERT INTO customers (full_name, phone, email) VALUES (?, ?, ?)')
          .run(fullName.trim(), cleanPhone, email ? email.trim() : null);
        customerId = Number(info.lastInsertRowid);
      }

      // 4. Generate unique readable booking reference (e.g. ICZ-94812)
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const bookingReference = `ICZ-${randomSuffix}`;

      // 5. Calculate end time (default 30 mins after start)
      const [sh, sm] = startTime.split(':').map(Number);
      const endTotalMins = sh * 60 + sm + 30;
      const endH = Math.floor(endTotalMins / 60).toString().padStart(2, '0');
      const endM = (endTotalMins % 60).toString().padStart(2, '0');
      const endTime = `${endH}:${endM}`;

      // 6. Insert appointment
      const appointmentInsert = db.prepare(`
        INSERT INTO appointments (
          booking_reference, customer_id, device_category, device_model,
          appointment_date, start_time, end_time, status, problem_description,
          customer_notes, device_photo_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', ?, ?, ?)
      `).run(
        bookingReference,
        customerId,
        deviceCategory,
        deviceModel,
        appointmentDate,
        startTime,
        endTime,
        problemDescription.trim(),
        customerNotes ? customerNotes.trim() : null,
        devicePhotoUrl || null
      );

      const appointmentId = Number(appointmentInsert.lastInsertRowid);

      // 7. Associate selected services
      const insertServiceLink = db.prepare(`
        INSERT INTO appointment_services (appointment_id, service_id, agreed_price)
        VALUES (?, ?, ?)
      `);

      for (const serviceId of serviceIds) {
        const s = db.prepare('SELECT price FROM services WHERE id = ?').get(serviceId) as any;
        insertServiceLink.run(appointmentId, serviceId, s?.price || null);
      }

      return {
        id: appointmentId,
        bookingReference,
        customerName: fullName.trim(),
        phone: cleanPhone,
        deviceCategory,
        deviceModel,
        appointmentDate,
        startTime,
        endTime,
        status: 'Pending'
      };
    });

    const result = executeBooking();
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully.',
      booking: result
    });
  } catch (err: any) {
    if (err.message.startsWith('SLOT_TAKEN:')) {
      return res.status(409).json({ error: err.message.replace('SLOT_TAKEN: ', '') });
    }
    if (err.message.startsWith('SLOT_BLOCKED:')) {
      return res.status(400).json({ error: err.message.replace('SLOT_BLOCKED: ', '') });
    }
    res.status(500).json({ error: 'Failed to process booking: ' + err.message });
  }
});

// 8. Lookup appointment by reference (Customer safe view)
app.get('/api/appointments/ref/:ref', (req, res) => {
  try {
    const booking = db.prepare(`
      SELECT 
        a.id, a.booking_reference, a.appointment_date, a.start_time, a.end_time,
        a.status, a.device_category, a.device_model, a.problem_description,
        a.customer_notes, a.created_at,
        c.full_name as customer_name, c.phone as customer_phone
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      WHERE a.booking_reference = ?
    `).get(req.params.ref) as any;

    if (!booking) {
      return res.status(404).json({ error: 'Appointment not found with reference ' + req.params.ref });
    }

    const services = db.prepare(`
      SELECT s.id, s.name, s.description, s.price, s.duration_minutes
      FROM appointment_services as_rel
      JOIN services s ON as_rel.service_id = s.id
      WHERE as_rel.appointment_id = ?
    `).all(booking.id);

    res.json({
      ...booking,
      services
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// ADMIN DASHBOARD & MANAGEMENT API
// ==========================================

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid administrator password.' });
  }

  const token = 'icz_' + crypto.randomBytes(32).toString('hex');
  db.prepare('INSERT INTO admin_tokens (token) VALUES (?)').run(token);

  res.json({
    success: true,
    token,
    user: { name: 'iCare zone Admin', role: 'admin' }
  });
});

// Admin verify session
app.get('/api/admin/verify', requireAdmin, (req, res) => {
  res.json({ valid: true });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : req.headers['x-admin-token'];
  if (token) {
    db.prepare('DELETE FROM admin_tokens WHERE token = ?').run(token);
  }
  res.json({ success: true });
});

// Admin KPI statistics
app.get('/api/stats', requireAdmin, (req, res) => {
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM appointments').get() as any;
    
    // Today in IST
    const nowUtc = new Date();
    const istTime = new Date(nowUtc.getTime() + (5.5 * 60 * 60 * 1000));
    const today = istTime.toISOString().split('T')[0];

    const todayCount = db.prepare('SELECT COUNT(*) as count FROM appointments WHERE appointment_date = ?').get(today) as any;
    const pending = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Pending'").get() as any;
    const confirmed = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Confirmed'").get() as any;
    const inProgress = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'In Progress'").get() as any;
    const completed = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Completed'").get() as any;
    const cancelled = db.prepare("SELECT COUNT(*) as count FROM appointments WHERE status = 'Cancelled'").get() as any;
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get() as any;

    res.json({
      total: total.count,
      today: todayCount.count,
      pending: pending.count,
      confirmed: confirmed.count,
      inProgress: inProgress.count,
      completed: completed.count,
      cancelled: cancelled.count,
      totalCustomers: totalCustomers.count
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Appointments List (with search, status filter, date filter)
app.get('/api/admin/appointments', requireAdmin, (req, res) => {
  try {
    const { status, date, search } = req.query as { status?: string; date?: string; search?: string };
    
    let query = `
      SELECT 
        a.id, a.booking_reference, a.appointment_date, a.start_time, a.end_time,
        a.status, a.device_category, a.device_model, a.problem_description,
        a.customer_notes, a.internal_notes, a.device_photo_url, a.created_at,
        c.full_name as customer_name, c.phone as customer_phone, c.email as customer_email
      FROM appointments a
      JOIN customers c ON a.customer_id = c.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status && status !== 'All') {
      query += ` AND a.status = ?`;
      params.push(status);
    }

    if (date) {
      query += ` AND a.appointment_date = ?`;
      params.push(date);
    }

    if (search) {
      query += ` AND (c.full_name LIKE ? OR c.phone LIKE ? OR a.booking_reference LIKE ? OR a.device_model LIKE ?)`;
      const s = `%${search}%`;
      params.push(s, s, s, s);
    }

    query += ` ORDER BY a.appointment_date DESC, a.start_time DESC`;

    const appointments = db.prepare(query).all(...params) as any[];

    // Fetch services for each appointment
    const getServices = db.prepare(`
      SELECT s.id, s.name, s.price, as_rel.agreed_price
      FROM appointment_services as_rel
      JOIN services s ON as_rel.service_id = s.id
      WHERE as_rel.appointment_id = ?
    `);

    const enriched = appointments.map(app => ({
      ...app,
      services: getServices.all(app.id)
    }));

    res.json(enriched);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Update Status
app.patch('/api/appointments/:id/status', requireAdmin, (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled', 'No Show'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    db.prepare('UPDATE appointments SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(status, req.params.id);

    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Reschedule Appointment
app.patch('/api/appointments/:id/reschedule', requireAdmin, (req, res) => {
  try {
    const { appointmentDate, startTime } = req.body;
    if (!appointmentDate || !startTime) {
      return res.status(400).json({ error: 'Missing appointmentDate or startTime.' });
    }

    // Check conflict
    const conflict = db.prepare(`
      SELECT id FROM appointments 
      WHERE appointment_date = ? AND start_time = ? AND status != 'Cancelled' AND id != ?
    `).get(appointmentDate, startTime, req.params.id);

    if (conflict) {
      return res.status(409).json({ error: 'That slot is already booked by another appointment.' });
    }

    // Calculate end time
    const [sh, sm] = startTime.split(':').map(Number);
    const endTotalMins = sh * 60 + sm + 30;
    const endH = Math.floor(endTotalMins / 60).toString().padStart(2, '0');
    const endM = (endTotalMins % 60).toString().padStart(2, '0');
    const endTime = `${endH}:${endM}`;

    db.prepare(`
      UPDATE appointments 
      SET appointment_date = ?, start_time = ?, end_time = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(appointmentDate, startTime, endTime, req.params.id);

    res.json({ success: true, message: 'Appointment rescheduled successfully.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Update Internal Notes
app.patch('/api/appointments/:id/notes', requireAdmin, (req, res) => {
  try {
    const { internalNotes } = req.body;
    db.prepare('UPDATE appointments SET internal_notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(internalNotes, req.params.id);
    res.json({ success: true, message: 'Internal notes saved.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Services CRUD
app.post('/api/services', requireAdmin, (req, res) => {
  try {
    const { name, description, category, price, duration_minutes, image_url, repair_process, compatible_devices } = req.body;
    if (!name || !description) return res.status(400).json({ error: 'Name and description are required.' });

    const info = db.prepare(`
      INSERT INTO services (name, description, category, price, duration_minutes, image_url, repair_process, compatible_devices, active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    `).run(name, description, category || 'Hardware', price || null, duration_minutes || 45, image_url || null, repair_process || null, compatible_devices || null);

    res.status(201).json({ id: info.lastInsertRowid, success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/services/:id', requireAdmin, (req, res) => {
  try {
    const { name, description, category, price, duration_minutes, image_url, repair_process, compatible_devices, active } = req.body;
    db.prepare(`
      UPDATE services 
      SET name = ?, description = ?, category = ?, price = ?, duration_minutes = ?, image_url = ?, repair_process = ?, compatible_devices = ?, active = ?
      WHERE id = ?
    `).run(name, description, category, price, duration_minutes, image_url, repair_process, compatible_devices, active !== undefined ? (active ? 1 : 0) : 1, req.params.id);

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('UPDATE services SET active = 0 WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Device Management
app.post('/api/devices', requireAdmin, (req, res) => {
  try {
    const { category, model } = req.body;
    if (!category || !model) return res.status(400).json({ error: 'Category and model required.' });
    const info = db.prepare('INSERT INTO devices (category, model, active) VALUES (?, ?, 1)').run(category, model);
    res.status(201).json({ id: info.lastInsertRowid, success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/devices/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM devices WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Business Hours Update
app.put('/api/business-hours', requireAdmin, (req, res) => {
  try {
    const { hours } = req.body; // Array of { weekday, opening_time, closing_time, is_open }
    if (!Array.isArray(hours)) return res.status(400).json({ error: 'Invalid hours array.' });

    const updateStmt = db.prepare(`
      UPDATE business_hours 
      SET opening_time = ?, closing_time = ?, is_open = ? 
      WHERE weekday = ?
    `);

    const updateAll = db.transaction(() => {
      for (const h of hours) {
        updateStmt.run(h.opening_time, h.closing_time, h.is_open ? 1 : 0, h.weekday);
      }
    });

    updateAll();
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Blocked Slots CRUD
app.get('/api/blocked-slots', requireAdmin, (req, res) => {
  try {
    const list = db.prepare('SELECT * FROM blocked_slots ORDER BY date DESC, start_time ASC').all();
    res.json(list);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/blocked-slots', requireAdmin, (req, res) => {
  try {
    const { date, start_time, end_time, reason } = req.body;
    if (!date) return res.status(400).json({ error: 'Date is required' });
    const info = db.prepare('INSERT INTO blocked_slots (date, start_time, end_time, reason) VALUES (?, ?, ?, ?)')
      .run(date, start_time || null, end_time || null, reason || 'Maintenance');
    res.status(201).json({ id: info.lastInsertRowid, success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/blocked-slots/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM blocked_slots WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Customers Directory
app.get('/api/customers', requireAdmin, (req, res) => {
  try {
    const customers = db.prepare(`
      SELECT 
        c.id, c.full_name, c.phone, c.email, c.created_at,
        COUNT(a.id) as total_appointments,
        MAX(a.appointment_date) as last_appointment_date
      FROM customers c
      LEFT JOIN appointments a ON c.id = a.customer_id
      GROUP BY c.id
      ORDER BY last_appointment_date DESC, c.created_at DESC
    `).all();

    res.json(customers);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Gallery Management
app.post('/api/gallery', requireAdmin, (req, res) => {
  try {
    const { title, image_url, category, display_order } = req.body;
    if (!title || !image_url) return res.status(400).json({ error: 'Title and image URL required' });
    const info = db.prepare(`
      INSERT INTO gallery (title, image_url, category, display_order, active)
      VALUES (?, ?, ?, ?, 1)
    `).run(title, image_url, category || 'Repair Work', display_order || 0);
    res.status(201).json({ id: info.lastInsertRowid, success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Business Settings Update
app.put('/api/business-settings', requireAdmin, (req, res) => {
  try {
    const {
      business_name,
      category,
      address,
      phone,
      whatsapp,
      google_maps_url,
      announcement,
      appointment_interval_mins
    } = req.body;

    db.prepare(`
      UPDATE business_settings SET
        business_name = ?,
        category = ?,
        address = ?,
        phone = ?,
        whatsapp = ?,
        google_maps_url = ?,
        announcement = ?,
        appointment_interval_mins = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(
      business_name,
      category,
      address,
      phone,
      whatsapp,
      google_maps_url,
      announcement,
      appointment_interval_mins || 30
    );

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// FRONTEND SERVING (Vite middleware in dev, dist in prod)
// ==========================================
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[iCare zone Server] Running on http://localhost:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[iCare zone Server] Fatal startup error:', err);
  process.exit(1);
});
