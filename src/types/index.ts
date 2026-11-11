export interface BusinessSettings {
  id: number;
  business_name: string;
  category: string;
  address: string;
  phone: string;
  whatsapp: string;
  google_rating: number;
  google_review_count: number;
  google_maps_url: string;
  announcement?: string;
  appointment_interval_mins: number;
  updated_at?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price?: string | null;
  duration_minutes: number;
  image_url?: string | null;
  repair_process?: string | null;
  compatible_devices?: string | null;
  active: number;
  created_at?: string;
}

export interface DeviceModel {
  id: number;
  category: 'iPhone' | 'iPad' | 'Mac' | 'Apple Watch' | 'Other device' | string;
  model: string;
  active: number;
}

export interface BusinessHour {
  id: number;
  weekday: number;
  weekday_name: string;
  opening_time: string;
  closing_time: string;
  is_open: number;
}

export interface BlockedSlot {
  id: number;
  date: string;
  start_time?: string | null;
  end_time?: string | null;
  reason?: string | null;
  created_at?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  display_order: number;
  active: number;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';

export interface Appointment {
  id: number;
  booking_reference: string;
  customer_id?: number;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string | null;
  device_category: string;
  device_model: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  problem_description: string;
  customer_notes?: string | null;
  internal_notes?: string | null;
  device_photo_url?: string | null;
  agreed_price?: string | null;
  created_at?: string;
  services?: Array<{
    id: number;
    name: string;
    price?: string | null;
    agreed_price?: string | null;
  }>;
}

export interface Customer {
  id: number;
  full_name: string;
  phone: string;
  email?: string | null;
  created_at: string;
  total_appointments: number;
  last_appointment_date?: string | null;
}

export interface AdminStats {
  total: number;
  today: number;
  pending: number;
  confirmed: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  totalCustomers: number;
}

export interface AvailabilitySlot {
  time: string;
  available: boolean;
  reason?: string;
}

export interface AvailabilityResponse {
  date: string;
  isOpen: boolean;
  message?: string;
  operatingHours?: string;
  slots: AvailabilitySlot[];
}
