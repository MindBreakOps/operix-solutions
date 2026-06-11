import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Core Structure Template Layout
import GlobalLayout from './components/GlobalLayout';

// High-Fidelity Page Modules
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import News from './pages/News';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import Subscription from './pages/Subscription';


// Admin Gateways
import CmsLogin from './pages/CmsLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            
            {/* CORPORATE WEB GATEWAYS */}
            <Route element={<GlobalLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/news" element={<News />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/subscription" element={<Subscription />} />
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