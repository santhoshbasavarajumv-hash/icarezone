import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Wrench, 
  Clock, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  Smartphone, 
  LogOut, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock4, 
  ChevronRight, 
  Check, 
  X, 
  Loader2, 
  Phone, 
  MapPin, 
  Save, 
  MessageSquare,
  CalendarDays,
  FileText
} from 'lucide-react';
import { 
  Appointment, 
  AdminStats, 
  Service, 
  DeviceModel, 
  BusinessHour, 
  BlockedSlot, 
  Customer, 
  GalleryItem, 
  BusinessSettings 
} from '../types/index.ts';
import { api, authStorage } from '../services/api.ts';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigateSite: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onNavigateSite }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'services' | 'schedule' | 'devices' | 'customers' | 'gallery' | 'settings'>('overview');
  
  // Data State
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [devices, setDevices] = useState<DeviceModel[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);

  // Loading & alerts
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters for Appointments
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Modals state
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<number | null>(null);
  const [internalNotesInput, setInternalNotesInput] = useState('');

  const [rescheduleModal, setRescheduleModal] = useState<{ id: number; ref: string; date: string; time: string } | null>(null);

  // Service form modal
  const [serviceModal, setServiceModal] = useState<{ isOpen: boolean; service?: Partial<Service> | null }>({ isOpen: false });

  // Device form
  const [newDeviceCategory, setNewDeviceCategory] = useState('iPhone');
  const [newDeviceModel, setNewDeviceModel] = useState('');

  // Block slot form
  const [newBlockDate, setNewBlockDate] = useState('');
  const [newBlockStart, setNewBlockStart] = useState('');
  const [newBlockEnd, setNewBlockEnd] = useState('');
  const [newBlockReason, setNewBlockReason] = useState('');

  // Gallery form
  const [newGalleryTitle, setNewGalleryTitle] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('Repair Work');

  const showNotice = (type: 'success' | 'error', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 4000);
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        appsData,
        servData,
        devData,
        hoursData,
        blockedData,
        custData,
        galData,
        settData
      ] = await Promise.all([
        api.getStats(),
        api.getAppointments({ status: statusFilter, date: dateFilter, search: searchFilter }),
        api.getServices(true),
        api.getDevices(),
        api.getBusinessHours(),
        api.getBlockedSlots(),
        api.getCustomers(),
        api.getGallery(),
        api.getSettings()
      ]);

      setStats(statsData);
      setAppointments(appsData);
      setServices(servData);
      setDevices(devData);
      setHours(hoursData);
      setBlockedSlots(blockedData);
      setCustomers(custData);
      setGallery(galData);
      setSettings(settData);
    } catch (err: any) {
      if (err.message?.includes('Unauthorized') || err.message?.includes('token')) {
        authStorage.clearToken();
        onLogout();
      } else {
        showNotice('error', err.message || 'Error loading dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [statusFilter, dateFilter, searchFilter]);

  // Appointment Status Update
  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await api.updateAppointmentStatus(id, status);
      showNotice('success', `Appointment status updated to ${status}`);
      loadAllData();
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: status as any });
      }
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Appointment Reschedule
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModal) return;

    try {
      await api.rescheduleAppointment(rescheduleModal.id, rescheduleModal.date, rescheduleModal.time);
      showNotice('success', 'Appointment successfully rescheduled');
      setRescheduleModal(null);
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Save Internal Notes
  const handleSaveNotes = async (id: number) => {
    try {
      await api.updateAppointmentNotes(id, internalNotesInput);
      showNotice('success', 'Internal notes updated');
      setEditingNotesId(null);
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Save / Edit Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceModal.service?.name) return;

    try {
      if (serviceModal.service.id) {
        await api.updateService(serviceModal.service.id, serviceModal.service);
        showNotice('success', 'Service updated successfully');
      } else {
        await api.createService(serviceModal.service);
        showNotice('success', 'New service added');
      }
      setServiceModal({ isOpen: false });
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Delete / Deactivate Service
  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to deactivate this service?')) return;
    try {
      await api.deleteService(id);
      showNotice('success', 'Service deactivated');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Add Device Model
  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceModel.trim()) return;

    try {
      await api.addDeviceModel(newDeviceCategory, newDeviceModel.trim());
      showNotice('success', 'Model added to catalog');
      setNewDeviceModel('');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  const handleDeleteDevice = async (id: number) => {
    try {
      await api.deleteDeviceModel(id);
      showNotice('success', 'Model removed');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Update Business Hours
  const handleSaveHours = async () => {
    try {
      await api.updateBusinessHours(hours);
      showNotice('success', 'Business operating hours updated');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Add Blocked Slot / Holiday
  const handleAddBlockedSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate) return;

    try {
      await api.addBlockedSlot({
        date: newBlockDate,
        start_time: newBlockStart || undefined,
        end_time: newBlockEnd || undefined,
        reason: newBlockReason || 'Store Closure'
      });
      showNotice('success', 'Holiday/Blocked period recorded');
      setNewBlockDate('');
      setNewBlockStart('');
      setNewBlockEnd('');
      setNewBlockReason('');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  const handleDeleteBlockedSlot = async (id: number) => {
    try {
      await api.deleteBlockedSlot(id);
      showNotice('success', 'Slot unblocked');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Gallery Add
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryTitle || !newGalleryUrl) return;

    try {
      await api.addGalleryItem({
        title: newGalleryTitle,
        image_url: newGalleryUrl,
        category: newGalleryCategory,
        display_order: gallery.length + 1
      });
      showNotice('success', 'Photo added to gallery');
      setNewGalleryTitle('');
      setNewGalleryUrl('');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  const handleDeleteGallery = async (id: number) => {
    try {
      await api.deleteGalleryItem(id);
      showNotice('success', 'Photo removed');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  // Update Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      await api.updateSettings(settings);
      showNotice('success', 'Business settings saved successfully');
      loadAllData();
    } catch (err: any) {
      showNotice('error', err.message);
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: stats?.pending },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'schedule', label: 'Schedule & Slots', icon: Clock },
    { id: 'devices', label: 'Device Catalog', icon: Smartphone },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'settings', label: 'Shop Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col">
      
      {/* Admin Top Bar */}
      <header className="bg-[#111318] text-white px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <img
            src="/assets/aistudio/icare_zone_logo_white_c1cb0468.png"
            alt="iCare zone"
            className="h-8 w-auto object-contain"
          />
          <div className="border-l border-white/20 pl-3">
            <h1 className="text-sm font-bold tracking-tight">Admin Console</h1>
            <p className="text-[10px] text-gray-400">Mysuru Workshop Desk</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateSite('home')}
            className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          >
            Preview Site
          </button>

          <button
            onClick={() => {
              api.adminLogout();
              authStorage.clearToken();
              onLogout();
            }}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Notice Banner */}
      {notice && (
        <div className={`p-3 text-xs font-semibold text-center transition-all ${
          notice.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {notice.text}
        </div>
      )}

      {/* Admin Layout with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white border-r border-[#E8E9ED] p-4 flex md:flex-col justify-between shrink-0 overflow-x-auto">
          <div className="space-y-1 w-full flex md:flex-col gap-1 md:gap-0">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between whitespace-nowrap ${
                    isActive
                      ? 'bg-[#1677FF] text-white shadow-xs'
                      : 'text-[#545963] hover:text-[#17191D] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white text-blue-600' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block pt-6 border-t border-gray-100 text-[11px] text-[#747982] space-y-1">
            <p className="font-semibold text-[#17191D]">Shop Status: Active</p>
            <p>Mysuru: Kuvempu Nagara</p>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* ================= TAB 1: OVERVIEW ================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Workshop Performance & Today's Intake</h2>
                <p className="text-xs text-[#747982]">Real-time metrics from the SQLite appointments database.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                
                <div className="p-4 rounded-2xl bg-white border border-[#E8E9ED] shadow-xs">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Today's</span>
                  <p className="text-2xl font-black text-[#17191D] mt-1">{stats?.today || 0}</p>
                  <p className="text-[10px] text-gray-400">Scheduled Today</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-700 uppercase">Pending</span>
                  <p className="text-2xl font-black text-amber-900 mt-1">{stats?.pending || 0}</p>
                  <p className="text-[10px] text-amber-700">Awaiting confirmation</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 shadow-xs">
                  <span className="text-[11px] font-bold text-blue-700 uppercase">Confirmed</span>
                  <p className="text-2xl font-black text-blue-900 mt-1">{stats?.confirmed || 0}</p>
                  <p className="text-[10px] text-blue-700">Locked in calendar</p>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 shadow-xs">
                  <span className="text-[11px] font-bold text-indigo-700 uppercase">In Progress</span>
                  <p className="text-2xl font-black text-indigo-900 mt-1">{stats?.inProgress || 0}</p>
                  <p className="text-[10px] text-indigo-700">On bench</p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase">Completed</span>
                  <p className="text-2xl font-black text-emerald-900 mt-1">{stats?.completed || 0}</p>
                  <p className="text-[10px] text-emerald-700">Repaired & picked up</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E8E9ED] shadow-xs">
                  <span className="text-[11px] font-bold text-gray-500 uppercase">Total Clients</span>
                  <p className="text-2xl font-black text-[#1677FF] mt-1">{stats?.totalCustomers || 0}</p>
                  <p className="text-[10px] text-gray-400">Unique customers</p>
                </div>

              </div>

              {/* Quick Actions & Recent Bookings */}
              <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-[#17191D]">Recent Intake Queue</h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    View All ({appointments.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="pb-3">Ref</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Device</th>
                        <th className="pb-3">Date & Time</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {appointments.slice(0, 5).map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/80">
                          <td className="py-3 font-mono font-bold text-blue-600">{app.booking_reference}</td>
                          <td className="py-3 font-medium text-[#17191D]">{app.customer_name} (+91 {app.customer_phone})</td>
                          <td className="py-3 text-[#545963]">{app.device_category} - {app.device_model}</td>
                          <td className="py-3 font-medium text-[#17191D]">{app.appointment_date} @ {app.start_time}</td>
                          <td className="py-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              app.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                              app.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              app.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setSelectedAppointment(app)}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: APPOINTMENTS ================= */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-[#17191D]">Appointment Management</h2>
                  <p className="text-xs text-[#747982]">Filter, search, reschedule, and manage statuses.</p>
                </div>
                <button
                  onClick={loadAllData}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-xl transition-colors self-start"
                >
                  Refresh Data
                </button>
              </div>

              {/* Filters Toolbar */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E9ED] shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, phone, ref, model..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-[#E8E9ED] rounded-xl text-xs text-[#17191D]"
                  />
                </div>

                {/* Status dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8E9ED] rounded-xl text-xs text-[#17191D] font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="No Show">No Show</option>
                </select>

                {/* Date Picker */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8E9ED] rounded-xl text-xs text-[#17191D]"
                />
              </div>

              {/* Appointments Full Table */}
              <div className="bg-white rounded-2xl border border-[#E8E9ED] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Ref Code</th>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Device & Model</th>
                        <th className="py-3 px-4">Services</th>
                        <th className="py-3 px-4">Appointment Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-blue-50/20">
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                            {app.booking_reference}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-[#17191D]">{app.customer_name}</p>
                            <p className="text-[11px] text-gray-500 font-mono">+91 {app.customer_phone}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-[#17191D]">{app.device_category}</p>
                            <p className="text-[11px] text-[#747982]">{app.device_model}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {app.services?.map((s) => (
                                <span key={s.id} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                                  {s.name}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-[#17191D]">{app.appointment_date}</p>
                            <p className="text-[11px] text-gray-500">{app.start_time} - {app.end_time} IST</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                              className="text-xs font-bold rounded-lg border border-gray-200 px-2 py-1 bg-white cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="No Show">No Show</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => setRescheduleModal({
                                id: app.id,
                                ref: app.booking_reference,
                                date: app.appointment_date,
                                time: app.start_time
                              })}
                              className="text-xs font-bold text-gray-600 hover:text-blue-600"
                            >
                              Reschedule
                            </button>
                            <button
                              onClick={() => setSelectedAppointment(app)}
                              className="text-xs font-bold text-blue-600 hover:underline"
                            >
                              Inspect
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {appointments.length === 0 && (
                  <div className="p-8 text-center text-xs text-gray-400">
                    No appointments match the selected filters.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= TAB 3: SERVICES MANAGEMENT ================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#17191D]">Service Catalog Management</h2>
                  <p className="text-xs text-[#747982]">Add, edit descriptions, adjust duration, and set starting prices.</p>
                </div>
                <button
                  onClick={() => setServiceModal({
                    isOpen: true,
                    service: { name: '', description: '', category: 'Hardware', price: 'From ₹', duration_minutes: 45, active: 1 }
                  })}
                  className="px-4 py-2 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-white rounded-2xl border border-[#E8E9ED] p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {service.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          service.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {service.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#17191D] mb-1">{service.name}</h3>
                      <p className="text-xs text-[#545963] leading-relaxed line-clamp-3 mb-3">
                        {service.description}
                      </p>

                      <div className="text-xs space-y-1 py-2 border-t border-gray-100">
                        <p><span className="text-gray-400">Price:</span> <strong className="text-blue-600">{service.price || 'Diagnostic Quote'}</strong></p>
                        <p><span className="text-gray-400">Duration:</span> <strong>~{service.duration_minutes || 45} mins</strong></p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <button
                        onClick={() => setServiceModal({ isOpen: true, service })}
                        className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 4: SCHEDULE & SLOTS ================= */}
          {activeTab === 'schedule' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Working Hours & Slot Restrictions</h2>
                <p className="text-xs text-[#747982]">Configure shop opening times and block holiday / maintenance closures.</p>
              </div>

              {/* Weekly Working Hours Card */}
              <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-sm text-[#17191D]">Weekly Schedule</h3>
                  <button
                    onClick={handleSaveHours}
                    className="px-4 py-2 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center space-x-1"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Operating Hours</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {hours.map((h, idx) => (
                    <div key={h.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 gap-3">
                      <div className="flex items-center space-x-3 w-32">
                        <input
                          type="checkbox"
                          checked={h.is_open === 1}
                          onChange={(e) => {
                            const updated = [...hours];
                            updated[idx].is_open = e.target.checked ? 1 : 0;
                            setHours(updated);
                          }}
                          className="rounded text-blue-600 h-4 w-4"
                        />
                        <span className={`text-xs font-bold ${h.is_open ? 'text-[#17191D]' : 'text-gray-400'}`}>
                          {h.weekday_name}
                        </span>
                      </div>

                      {h.is_open === 1 ? (
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="text-gray-500">Opens:</span>
                          <input
                            type="time"
                            value={h.opening_time}
                            onChange={(e) => {
                              const updated = [...hours];
                              updated[idx].opening_time = e.target.value;
                              setHours(updated);
                            }}
                            className="bg-white border rounded px-2 py-1 text-xs"
                          />
                          <span className="text-gray-500">Closes:</span>
                          <input
                            type="time"
                            value={h.closing_time}
                            onChange={(e) => {
                              const updated = [...hours];
                              updated[idx].closing_time = e.target.value;
                              setHours(updated);
                            }}
                            className="bg-white border rounded px-2 py-1 text-xs"
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-red-500 font-bold">Closed All Day</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Blocked Slots / Holidays Section */}
              <div className="bg-white rounded-2xl border border-[#E8E9ED] p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-sm text-[#17191D]">Block Holiday or Special Closure</h3>
                
                <form onSubmit={handleAddBlockedSlot} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Date *</label>
                    <input
                      type="date"
                      required
                      value={newBlockDate}
                      onChange={(e) => setNewBlockDate(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Start Time (Optional)</label>
                    <input
                      type="time"
                      value={newBlockStart}
                      onChange={(e) => setNewBlockStart(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">End Time (Optional)</label>
                    <input
                      type="time"
                      value={newBlockEnd}
                      onChange={(e) => setNewBlockEnd(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Reason</label>
                    <input
                      type="text"
                      placeholder="e.g. Festival Holiday"
                      value={newBlockReason}
                      onChange={(e) => setNewBlockReason(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2"
                    />
                  </div>
                  <div className="sm:col-span-4 pt-1 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#17191D] hover:bg-black text-white font-bold rounded-xl text-xs"
                    >
                      Block Slot / Date
                    </button>
                  </div>
                </form>

                {/* List of blocked periods */}
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-500 mb-2">Existing Blocked Dates & Times</h4>
                  <div className="space-y-2">
                    {blockedSlots.map((b) => (
                      <div key={b.id} className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-100 text-xs">
                        <div>
                          <strong className="text-red-900">{b.date}</strong>
                          <span className="text-red-700 ml-2">
                            {b.start_time ? `${b.start_time} - ${b.end_time || 'End of day'}` : '(Entire Day Closed)'}
                          </span>
                          <span className="text-gray-500 ml-2 italic">— {b.reason}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteBlockedSlot(b.id)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          Unblock
                        </button>
                      </div>
                    ))}
                    {blockedSlots.length === 0 && (
                      <p className="text-xs text-gray-400">No active closure overrides.</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= TAB 5: DEVICE CATALOG ================= */}
          {activeTab === 'devices' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Device & Model Catalog</h2>
                <p className="text-xs text-[#747982]">Maintain the list of Apple devices customers can select from.</p>
              </div>

              {/* Add model form */}
              <div className="bg-white p-5 rounded-2xl border border-[#E8E9ED] shadow-xs">
                <h3 className="font-bold text-xs text-[#17191D] mb-3">Add Device Model</h3>
                <form onSubmit={handleAddDevice} className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={newDeviceCategory}
                    onChange={(e) => setNewDeviceCategory(e.target.value)}
                    className="bg-gray-50 border rounded-xl px-3 py-2 text-xs font-bold"
                  >
                    <option value="iPhone">iPhone</option>
                    <option value="iPad">iPad</option>
                    <option value="Mac">Mac</option>
                    <option value="Apple Watch">Apple Watch</option>
                    <option value="Other device">Other device</option>
                  </select>

                  <input
                    type="text"
                    required
                    placeholder="e.g. iPhone 16 Pro Max (1TB)"
                    value={newDeviceModel}
                    onChange={(e) => setNewDeviceModel(e.target.value)}
                    className="flex-1 bg-gray-50 border rounded-xl px-3 py-2 text-xs"
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs"
                  >
                    Add Model
                  </button>
                </form>
              </div>

              {/* Devices list by category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {['iPhone', 'iPad', 'Mac', 'Apple Watch', 'Other device'].map((cat) => {
                  const catDevices = devices.filter((d) => d.category === cat);
                  return (
                    <div key={cat} className="bg-white rounded-2xl border border-[#E8E9ED] p-4 shadow-xs space-y-2">
                      <h4 className="font-bold text-xs text-[#17191D] border-b pb-2 flex items-center justify-between">
                        <span>{cat} Models</span>
                        <span className="text-gray-400 font-normal">({catDevices.length})</span>
                      </h4>
                      <div className="max-h-64 overflow-y-auto space-y-1.5 text-xs">
                        {catDevices.map((d) => (
                          <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                            <span className="truncate max-w-[180px]">{d.model}</span>
                            <button
                              onClick={() => handleDeleteDevice(d.id)}
                              className="text-gray-400 hover:text-red-600 ml-2"
                              title="Delete model"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= TAB 6: CUSTOMERS ================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Customer Directory</h2>
                <p className="text-xs text-[#747982]">List of clients and their appointment history in Mysuru.</p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E9ED] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Customer Name</th>
                        <th className="py-3 px-4">Contact Phone</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Total Appointments</th>
                        <th className="py-3 px-4">Last Visit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {customers.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-bold text-[#17191D]">{c.full_name}</td>
                          <td className="py-3 px-4 font-mono">+91 {c.phone}</td>
                          <td className="py-3 px-4 text-gray-500">{c.email || '—'}</td>
                          <td className="py-3 px-4 font-bold text-blue-600">{c.total_appointments}</td>
                          <td className="py-3 px-4 text-gray-600">{c.last_appointment_date || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 7: GALLERY ================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Workshop Gallery Manager</h2>
                <p className="text-xs text-[#747982]">Add and curate workshop and repair photography.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E8E9ED] shadow-xs">
                <h3 className="font-bold text-xs text-[#17191D] mb-3">Add Photograph</h3>
                <form onSubmit={handleAddGallery} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Photo Title (e.g. Diagnostic Workstation)"
                    value={newGalleryTitle}
                    onChange={(e) => setNewGalleryTitle(e.target.value)}
                    className="bg-gray-50 border rounded-xl p-2.5"
                  />
                  <input
                    type="url"
                    required
                    placeholder="Image URL (Unsplash or direct image link)"
                    value={newGalleryUrl}
                    onChange={(e) => setNewGalleryUrl(e.target.value)}
                    className="bg-gray-50 border rounded-xl p-2.5"
                  />
                  <select
                    value={newGalleryCategory}
                    onChange={(e) => setNewGalleryCategory(e.target.value)}
                    className="bg-gray-50 border rounded-xl p-2.5 font-bold"
                  >
                    <option value="Store Interior">Store Interior</option>
                    <option value="Repair Work">Repair Work</option>
                    <option value="iPhone Repairs">iPhone Repairs</option>
                    <option value="Device Issues">Device Issues</option>
                    <option value="Before and After">Before and After</option>
                  </select>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs"
                    >
                      Add Photo to Gallery
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-white rounded-xl border border-[#E8E9ED] overflow-hidden shadow-xs relative group">
                    <img src={g.image_url} alt={g.title} className="w-full h-36 object-cover" />
                    <div className="p-3">
                      <span className="text-[9px] font-bold text-blue-600 uppercase">{g.category}</span>
                      <p className="font-bold text-xs text-[#17191D] truncate">{g.title}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteGallery(g.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 8: SHOP SETTINGS ================= */}
          {activeTab === 'settings' && settings && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#17191D]">Business Information & Contact Settings</h2>
                <p className="text-xs text-[#747982]">Update verified phone, address, and announcement banner.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E9ED] shadow-xs space-y-5 text-xs max-w-3xl">
                
                <div className="space-y-1">
                  <label className="font-bold text-[#17191D]">Business Name</label>
                  <input
                    type="text"
                    value={settings.business_name}
                    onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#17191D]">Complete Physical Address</label>
                  <textarea
                    rows={3}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#17191D]">Phone Helpline</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#17191D]">WhatsApp Contact Number</label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      className="w-full bg-gray-50 border rounded-xl p-2.5 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#17191D]">Google Maps Listing URL</label>
                  <input
                    type="url"
                    value={settings.google_maps_url}
                    onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#17191D]">Website Announcement Banner</label>
                  <input
                    type="text"
                    value={settings.announcement || ''}
                    onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl p-2.5"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1677FF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Settings</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </main>
      </div>

      {/* Appointment Details & Internal Notes Inspection Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-[#E8E9ED] shadow-2xl overflow-hidden animate-in zoom-in-95">
            
            <div className="p-6 border-b border-[#E8E9ED] flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase font-mono">
                  {selectedAppointment.booking_reference}
                </span>
                <h3 className="font-bold text-base text-[#17191D]">
                  {selectedAppointment.device_category} ({selectedAppointment.device_model})
                </h3>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-[#545963]">
              
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <span className="text-gray-400 font-bold text-[10px] uppercase">Customer</span>
                  <p className="font-bold text-[#17191D] mt-0.5">{selectedAppointment.customer_name}</p>
                  <p className="font-mono text-gray-500">+91 {selectedAppointment.customer_phone}</p>
                  {selectedAppointment.customer_email && <p className="text-gray-500">{selectedAppointment.customer_email}</p>}
                </div>
                <div>
                  <span className="text-gray-400 font-bold text-[10px] uppercase">Time Slot</span>
                  <p className="font-bold text-[#17191D] mt-0.5">{selectedAppointment.appointment_date}</p>
                  <p className="text-gray-500">{selectedAppointment.start_time} - {selectedAppointment.end_time} IST</p>
                </div>
              </div>

              <div>
                <span className="text-gray-400 font-bold text-[10px] uppercase">Problem Description</span>
                <p className="mt-1 p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-[#17191D] italic">
                  "{selectedAppointment.problem_description}"
                </p>
              </div>

              {selectedAppointment.customer_notes && (
                <div>
                  <span className="text-gray-400 font-bold text-[10px] uppercase">Customer Notes</span>
                  <p className="mt-1 text-[#17191D]">{selectedAppointment.customer_notes}</p>
                </div>
              )}

              {/* Internal Technician Notes */}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                <span className="font-bold text-[#17191D] flex items-center">
                  <FileText className="w-3.5 h-3.5 text-blue-600 mr-1" />
                  Technician Internal Notes
                </span>
                
                {editingNotesId === selectedAppointment.id ? (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      value={internalNotesInput}
                      onChange={(e) => setInternalNotesInput(e.target.value)}
                      placeholder="Add diagnostic outcome, replaced part serial numbers, bench notes..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 text-xs text-[#17191D]"
                    ></textarea>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="px-3 py-1.5 text-xs font-bold text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(selectedAppointment.id)}
                        className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
                    <p className="italic text-gray-700">
                      {selectedAppointment.internal_notes || 'No internal notes recorded yet.'}
                    </p>
                    <button
                      onClick={() => {
                        setEditingNotesId(selectedAppointment.id);
                        setInternalNotesInput(selectedAppointment.internal_notes || '');
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline shrink-0 ml-2"
                    >
                      Edit Note
                    </button>
                  </div>
                )}
              </div>

            </div>

            <div className="p-4 border-t border-[#E8E9ED] bg-gray-50 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Status: {selectedAppointment.status}</span>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-[#E8E9ED] shadow-xl space-y-4 animate-in zoom-in-95">
            <h3 className="font-bold text-base text-[#17191D]">
              Reschedule {rescheduleModal.ref}
            </h3>
            
            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleModal.date}
                  onChange={(e) => setRescheduleModal({ ...rescheduleModal, date: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">New Time Slot (HH:MM)</label>
                <input
                  type="time"
                  required
                  value={rescheduleModal.time}
                  onChange={(e) => setRescheduleModal({ ...rescheduleModal, time: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl p-2"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setRescheduleModal(null)}
                  className="px-3 py-2 text-xs font-bold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Edit / Create Modal */}
      {serviceModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-[#E8E9ED] shadow-xl space-y-4 animate-in zoom-in-95">
            <h3 className="font-bold text-base text-[#17191D]">
              {serviceModal.service?.id ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Service Name *</label>
                <input
                  type="text"
                  required
                  value={serviceModal.service?.name || ''}
                  onChange={(e) => setServiceModal({
                    ...serviceModal,
                    service: { ...serviceModal.service, name: e.target.value }
                  })}
                  className="w-full bg-gray-50 border rounded-xl p-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Category</label>
                  <input
                    type="text"
                    value={serviceModal.service?.category || 'Hardware'}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      service: { ...serviceModal.service, category: e.target.value }
                    })}
                    className="w-full bg-gray-50 border rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Price Estimate</label>
                  <input
                    type="text"
                    placeholder="e.g. From ₹1,499"
                    value={serviceModal.service?.price || ''}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      service: { ...serviceModal.service, price: e.target.value }
                    })}
                    className="w-full bg-gray-50 border rounded-xl p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={serviceModal.service?.duration_minutes || 45}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      service: { ...serviceModal.service, duration_minutes: Number(e.target.value) }
                    })}
                    className="w-full bg-gray-50 border rounded-xl p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Image URL</label>
                  <input
                    type="url"
                    value={serviceModal.service?.image_url || ''}
                    onChange={(e) => setServiceModal({
                      ...serviceModal,
                      service: { ...serviceModal.service, image_url: e.target.value }
                    })}
                    className="w-full bg-gray-50 border rounded-xl p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={serviceModal.service?.description || ''}
                  onChange={(e) => setServiceModal({
                    ...serviceModal,
                    service: { ...serviceModal.service, description: e.target.value }
                  })}
                  className="w-full bg-gray-50 border rounded-xl p-2"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setServiceModal({ isOpen: false })}
                  className="px-3 py-2 text-xs font-bold text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
