import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, LogIn } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const brandTitle = "OPERIX SOLUTIONS";

  const navItems = [
	{ path: '/', label: t.navHome || 'Home' },
	{ path: '/about', label: t.navAbout || 'About Us' },
	{ path: '/services', label: t.navServices || 'Our Services' },
	{ path: '/projects', label: t.navProjects || 'Projects & Ops' },
	{ path: '/clients', label: t.navClients || 'Clients & Partners' },
	{ path: '/news', label: t.navNews || 'News' },
	{ path: '/contact', label: t.navContact || 'Contact' },
  ];

  return (
	<nav className="sticky top-0 z-50 bg-[#1e2d40] border-b border-slate-700 shadow-sm w-full font-sans">
	  {/* Strict max-w-6xl (1152px) constraint to match Home Page */}
	  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
		
		{/* Left: Logo */}
		<Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 shrink-0 hover:opacity-90 transition-opacity">
		  <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain bg-white rounded-md p-1" />
		  <span className="font-bold tracking-tight text-sm text-white hidden sm:block">{brandTitle}</span>
		</Link>

		{/* Center: Standard Sized Links (Like Mamey) */}
		<div className="hidden lg:flex items-center gap-6 justify-center">
		  {navItems.map((item) => (
			<Link 
			  key={item.path} 
			  to={item.path}
			  className={`text-[13px] font-medium transition-colors pb-0.5 border-b-2 ${location.pathname === item.path ? 'text-[#d4af37] border-[#d4af37]' : 'text-slate-300 border-transparent hover:text-white'}`}
			>
			  {item.label}
			</Link>
		  ))}
		</div>

		{/* Right: Actions */}
		<div className="hidden lg:flex items-center gap-4 shrink-0">
		  <button onClick={toggleLanguage} title={isAr ? 'English' : 'عربي'} className="text-slate-300 hover:text-white transition-colors cursor-pointer p-1">
			<Globe size={16} />
		  </button>
		  
		  <button onClick={() => navigate('/cms-login')} title={t.login || 'System Login'} className="text-slate-300 hover:text-[#d4af37] transition-colors cursor-pointer p-1">
			<LogIn size={16} />
		  </button>

		  <button onClick={() => navigate('/subscription')} className="text-[12px] font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
			{t.pricing || 'Pricing'}
		  </button>

		  <button onClick={() => navigate('/contact')} className="bg-[#d4af37] hover:bg-[#eab308] text-[#1e2d40] px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide transition-colors cursor-pointer shadow-sm ml-1">
			{t.demoBtn || 'Book Demo'}
		  </button>
		</div>

		{/* Mobile Toggle */}
		<button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden p-2 text-white outline-none shrink-0 cursor-pointer">
		  {isOpen ? <X size={20} /> : <Menu size={20} />}
		</button>

	  </div>

	  {/* Mobile Drawer */}
	  {isOpen && (
		<div className="lg:hidden fixed top-[55px] left-0 right-0 bg-[#1e2d40] border-b border-slate-700 shadow-xl p-6 flex flex-col gap-2 font-sans z-50">
		  {navItems.map((item) => (
			<button key={item.path} onClick={() => { setIsOpen(false); navigate(item.path); }} className="text-sm font-medium py-3 border-b border-slate-700 text-white text-left">
			  {item.label}
			</button>
		  ))}
		  <div className="pt-4 flex flex-col gap-4">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-white">
			  <Globe size={16} /> {isAr ? 'Switch to English' : 'تبديل للغة العربية'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/subscription'); }} className="text-sm font-medium text-[#d4af37] text-left">
			  {t.pricing || 'Pricing'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/contact'); }} className="bg-[#d4af37] text-[#1e2d40] text-center py-2.5 rounded-md font-bold text-sm mt-2">
			  {t.demoBtn || 'Book a Demo'}
			</button>
		  </div>
		</div>
	  )}
	</nav>
  );
}