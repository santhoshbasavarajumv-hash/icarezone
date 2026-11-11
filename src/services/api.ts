import {
  BusinessSettings,
  Service,
  DeviceModel,
  BusinessHour,
  GalleryItem,
  AvailabilityResponse,
  Appointment,
  AdminStats,
  Customer,
  BlockedSlot
} from '../types/index.ts';

const ADMIN_TOKEN_KEY = 'icz_admin_token';

export const authStorage = {
  getToken: () => localStorage.getItem(ADMIN_TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(ADMIN_TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
  hasToken: () => !!localStorage.getItem(ADMIN_TOKEN_KEY),
};

function authHeaders(): Record<string, string> {
  const token = authStorage.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options?.headers || {})
    }
  });

  if (!res.ok) {
    let errMessage = 'An unexpected error occurred';
    try {
      const data = await res.json();
      if (data.error) errMessage = data.error;
    } catch {
      errMessage = await res.text() || res.statusText;
    }
    throw new Error(errMessage);
  }

  return res.json();
}

export const api = {
  // Public
  getSettings: () => request<BusinessSettings>('/api/business-settings'),
  getServices: (all = false) => request<Service[]>(`/api/services${all ? '?all=true' : ''}`),
  getServiceById: (id: number) => request<Service>(`/api/services/${id}`),
  getDevices: () => request<DeviceModel[]>('/api/devices'),
  getBusinessHours: () => request<BusinessHour[]>('/api/business-hours'),
  getGallery: (category?: string) => request<GalleryItem[]>(`/api/gallery${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getAvailability: (date: string) => request<AvailabilityResponse>(`/api/availability?date=${date}`),
  
  createAppointment: (payload: {
    fullName: string;
    phone: string;
    email?: string;
    deviceCategory: string;
    deviceModel: string;
    serviceIds: number[];
    appointmentDate: string;
    startTime: string;
    problemDescription: string;
    customerNotes?: string;
    devicePhotoUrl?: string;
  }) => request<{ success: boolean; message: string; booking: Appointment }>('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  getAppointmentByRef: (ref: string) => request<Appointment>(`/api/appointments/ref/${ref}`),

  // Admin
  adminLogin: (password: string) => request<{ success: boolean; token: string; user: { name: string; role: string } }>('/api/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password })
  }),
  adminVerify: () => request<{ valid: boolean }>('/api/admin/verify'),
  adminLogout: () => request<{ success: boolean }>('/api/admin/logout', { method: 'POST' }),

  getStats: () => request<AdminStats>('/api/stats'),
  getAppointments: (params?: { status?: string; date?: string; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.date) query.set('date', params.date);
    if (params?.search) query.set('search', params.search);
    return request<Appointment[]>(`/api/admin/appointments?${query.toString()}`);
  },
  updateAppointmentStatus: (id: number, status: string) => request<{ success: boolean; message: string }>(`/api/appointments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  }),
  rescheduleAppointment: (id: number, appointmentDate: string, startTime: string) => request<{ success: boolean; message: string }>(`/api/appointments/${id}/reschedule`, {
    method: 'PATCH',
    body: JSON.stringify({ appointmentDate, startTime })
  }),
  updateAppointmentNotes: (id: number, internalNotes: string) => request<{ success: boolean; message: string }>(`/api/appointments/${id}/notes`, {
    method: 'PATCH',
    body: JSON.stringify({ internalNotes })
  }),

  createService: (data: Partial<Service>) => request<{ id: number; success: boolean }>('/api/services', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateService: (id: number, data: Partial<Service>) => request<{ success: boolean }>(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  deleteService: (id: number) => request<{ success: boolean }>(`/api/services/${id}`, {
    method: 'DELETE'
  }),

  addDeviceModel: (category: string, model: string) => request<{ id: number; success: boolean }>('/api/devices', {
    method: 'POST',
    body: JSON.stringify({ category, model })
  }),
  deleteDeviceModel: (id: number) => request<{ success: boolean }>(`/api/devices/${id}`, {
    method: 'DELETE'
  }),

  updateBusinessHours: (hours: BusinessHour[]) => request<{ success: boolean }>('/api/business-hours', {
    method: 'PUT',
    body: JSON.stringify({ hours })
  }),

  getBlockedSlots: () => request<BlockedSlot[]>('/api/blocked-slots'),
  addBlockedSlot: (data: { date: string; start_time?: string; end_time?: string; reason?: string }) => request<{ id: number; success: boolean }>('/api/blocked-slots', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteBlockedSlot: (id: number) => request<{ success: boolean }>(`/api/blocked-slots/${id}`, {
    method: 'DELETE'
  }),

  getCustomers: () => request<Customer[]>('/api/customers'),
  addGalleryItem: (data: Partial<GalleryItem>) => request<{ id: number; success: boolean }>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  deleteGalleryItem: (id: number) => request<{ success: boolean }>(`/api/gallery/${id}`, {
    method: 'DELETE'
  }),

  updateSettings: (data: Partial<BusinessSettings>) => request<{ success: boolean }>('/api/business-settings', {
    method: 'PUT',
    body: JSON.stringify(data)
  })
};
