import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { MobileBookingBar } from './components/MobileBookingBar.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ServicesPage } from './pages/ServicesPage.tsx';
import { BookingPage } from './pages/BookingPage.tsx';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { LegalPages } from './pages/LegalPages.tsx';
import { AdminDashboard } from './pages/AdminDashboard.tsx';
import { AdminLoginModal } from './pages/AdminLoginModal.tsx';
import { api, authStorage } from './services/api.ts';
import { Service, BusinessSettings, DeviceModel, GalleryItem, Appointment } from './types/index.ts';
import { updatePageSEO, getSEOMetadataForTab } from './utils/seo.ts';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [tabParam, setTabParam] = useState<any>(null);

  // App data state
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [devices, setDevices] = useState<DeviceModel[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Admin state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState<boolean>(false);

  // Booking states
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<number | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Initial load
  useEffect(() => {
    let isMounted = true;
    async function loadInitialData() {
      try {
        const [servData, settData, devData, galData] = await Promise.all([
          api.getServices(),
          api.getSettings(),
          api.getDevices(),
          api.getGallery()
        ]);

        if (isMounted) {
          setServices(servData);
          setSettings(settData);
          setDevices(devData);
          setGallery(galData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadInitialData();

    // Check existing admin session
    if (authStorage.hasToken()) {
      api.adminVerify()
        .then(() => setIsAdminLoggedIn(true))
        .catch(() => {
          authStorage.clearToken();
          setIsAdminLoggedIn(false);
        });
    }

    return () => { isMounted = false; };
  }, []);

  // Dynamically update document title and meta description tags based on current page context for improved SEO
  useEffect(() => {
    const seo = getSEOMetadataForTab(currentTab, tabParam);
    updatePageSEO(seo);
  }, [currentTab, tabParam]);

  const handleNavigate = (tab: string, param?: any) => {
    const targetTab = tab === 'gallery' ? 'home' : tab;
    setCurrentTab(targetTab);
    setTabParam(param || null);
    setShowAdminDashboard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceId: number) => {
    setPreSelectedServiceId(serviceId);
    handleNavigate('book');
  };

  const handleBookingComplete = (booking: Appointment) => {
    setConfirmedBooking(booking);
    handleNavigate('confirmation', booking.booking_reference);
  };

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setShowAdminDashboard(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowAdminDashboard(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin Dashboard full screen if active
  if (showAdminDashboard) {
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminLoggedIn(false);
          setShowAdminDashboard(false);
          handleNavigate('home');
        }}
        onNavigateSite={(tab) => {
          setShowAdminDashboard(false);
          handleNavigate(tab);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#17191D]">
      
      {/* Top Persistent Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        settings={settings}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            services={services}
            settings={settings}
            gallery={gallery}
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentTab === 'services' && (
          <ServicesPage
            services={services}
            initialSelectedServiceId={tabParam}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentTab === 'book' && (
          <BookingPage
            services={services}
            devices={devices}
            preSelectedServiceId={preSelectedServiceId}
            initialDeviceCategory={typeof tabParam === 'string' ? tabParam : null}
            onBookingComplete={handleBookingComplete}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'confirmation' && (
          <BookingConfirmationPage
            bookingRef={typeof tabParam === 'string' ? tabParam : confirmedBooking?.booking_reference}
            initialBooking={confirmedBooking}
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}



        {currentTab === 'contact' && (
          <ContactPage
            settings={settings}
            onNavigate={handleNavigate}
          />
        )}

        {(currentTab === 'privacy' || currentTab === 'terms') && (
          <LegalPages
            page={currentTab as 'privacy' | 'terms'}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp whatsappNumber={settings?.whatsapp || '918050804656'} />

      {/* Mobile Sticky Booking Bar */}
      {currentTab !== 'book' && (
        <MobileBookingBar
          onBookClick={() => handleNavigate('book')}
          phone={settings?.phone || '080508 04656'}
        />
      )}

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

    </div>
  );
}
