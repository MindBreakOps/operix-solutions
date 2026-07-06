import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Core Structure Template Layout
import GlobalLayout from './components/GlobalLayout';

// High-Fidelity Page Modules
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Vision from './pages/Vision';
import Products from './pages/Products';
import Clients from './pages/Clients';
import News from './pages/News';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';
import MobileApps from './pages/MobileApps';

// Admin Gateways
import CmsLogin from './pages/CmsLogin';
import AdminDashboard from './pages/AdminDashboard';

// ─── NEW: Scroll To Top Component ───
// This invisible component watches the URL and scrolls to the top whenever it changes.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top left of the window
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* We place ScrollToTop inside BrowserRouter so it can access useLocation() */}
        <ScrollToTop /> 
        
        <AuthProvider>
          <Routes>
            
            {/* CORPORATE WEB GATEWAYS */}
            <Route element={<GlobalLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/products" element={<Products />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/news" element={<News />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/mobile-apps" element={<MobileApps />} />
            </Route>

            {/* SECURE INTERNAL ADMINISTRATIVE PORTALS */}
            <Route path="/cms-login" element={<CmsLogin />} />
            <Route path="/admindashboard" element={<AdminDashboard />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}