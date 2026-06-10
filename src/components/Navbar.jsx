import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const brandLabel = "OPERIX Solutions";

  const navItems = [
	{ path: '/', label: t.navHome || 'Home' },
	{ path: '/about', label: t.navAbout || 'About Us' },
	{ path: '/services', label: t.navServices || 'Our Services' },
	{ path: '/projects', label: t.navProjects || 'Projects & Operations' },
	{ path: '/clients', label: t.navClients || 'Clients & Partners' },
	{ path: '/news', label: t.navNews || 'News' },
	{ path: '/contact', label: t.navContact || 'Contact' },
  ];

  return (
	<nav className="nav-wrapper">
	  <div className="nav-inner">
		
		{/* Brand Identity Slot */}
		<Link to="/" onClick={() => setIsOpen(false)} className="nav-brand">
		  <img src="/logo.png" alt={`${brandLabel} Logo`} className="nav-brand-img" />
		  <span className="font-sans font-black tracking-tight text-sm uppercase text-[#1e2d40]">{brandLabel}</span>
		</Link>

		{/* Desktop Tab bar Row */}
		<div className="nav-links-container">
		  {navItems.map((item) => (
			<Link 
			  key={item.path} 
			  to={item.path}
			  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
			>
			  {item.label}
			</Link>
		  ))}
		</div>

		{/* Action Elements Panel */}
		<div className="nav-actions">
		  <button onClick={toggleLanguage} className="btn-lang">
			<Globe size={13} /> {isAr ? 'English' : 'عربي'}
		  </button>
		  <button onClick={() => navigate('/subscription')} className="btn-nav-secondary">
			{t.pricing || 'Pricing'}
		  </button>
		  <button onClick={() => navigate('/cms-login')} className="btn-nav-secondary">
			{t.login || 'Login'}
		  </button>
		  <button onClick={() => navigate('/contact')} className="btn-nav-primary">
			{t.demoBtn || 'Book a Demo'}
		  </button>
		</div>

		{/* Mobile menu trigger */}
		<button onClick={() => setIsOpen(!isOpen)} className="mobile-toggle-btn">
		  {isOpen ? <X size={22} /> : <Menu size={22} />}
		</button>

	  </div>

	  {/* Mobile Screen Tray Overlay */}
	  {isOpen && (
		<div className="mobile-drawer-tray animate-in">
		  {navItems.map((item) => (
			<button 
			  key={item.path}
			  onClick={() => { setIsOpen(false); navigate(item.path); }}
			  className={`text-sm font-bold text-left py-2.5 w-full border-b border-slate-50 ${location.pathname === item.path ? 'text-[#c9a84c]' : 'text-[#1e2d40]'}`}
			  style={{ textAlign: isAr ? 'right' : 'left' }}
			>
			  {item.label}
			</button>
		  ))}
		  <div className="pt-4 flex flex-col gap-4">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="btn-lang justify-start text-sm text-[#1e2d40]">
			  <Globe size={15} /> {isAr ? 'English' : 'عربي'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/subscription'); }} className="text-sm font-bold text-[#1e2d40] text-left" style={{ textAlign: isAr ? 'right' : 'left' }}>
			  {t.pricing || 'Pricing'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/cms-login'); }} className="text-sm font-bold text-[#1e2d40] text-left" style={{ textAlign: isAr ? 'right' : 'left' }}>
			  {t.login || 'Login'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/contact'); }} className="btn-nav-primary text-center py-3 w-full">
			  {t.demoBtn || 'Book a Demo'}
			</button>
		  </div>
		</div>
	  )}
	</nav>
  );
}