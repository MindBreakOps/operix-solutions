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
	{ path: '/about', label: t.navAbout || 'About' },
	{ path: '/services', label: t.navServices || 'Our Services' },
	{ path: '/projects', label: t.navProjects || 'Projects & Ops' },
	{ path: '/clients', label: t.navClients || 'Clients & Partners' },
	{ path: '/news', label: t.navNews || 'News' },
	{ path: '/contact', label: t.navContact || 'Contact' },
	{ path: '/Legal', label: t.navLegal || 'Legal' },
  ];

  return (
	<nav className="sticky top-0 z-50 bg-[#1e2d40] border-b border-slate-700 shadow-sm w-full font-sans">
	  {/* FIXED 1: Removed max-w restriction. Now using w-full with generous side padding 
		to ensure the demo button is never pushed off the screen.
	  */}
	  <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-3.5 flex items-center justify-between">
		
		{/* Left: Logo */}
		<div className="flex flex-1 justify-start items-center shrink-0 min-w-0">
		  <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 lg:gap-3 hover:opacity-90 transition-opacity">
			<img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain bg-white rounded-md p-1" />
			<span className="font-bold tracking-tight text-sm text-white hidden sm:block whitespace-nowrap">
			  {brandTitle}
			</span>
		  </Link>
		</div>

		{/* Center: Links 
		  FIXED 2: Set to flex-none so it doesn't force the sides out. 
		  FIXED 3: Changed text-slate-300 to text-slate-100 for brighter readability.
		*/}
		<div className="hidden lg:flex items-center justify-center gap-2 xl:gap-5 flex-none">
		  {navItems.map((item) => (
			<Link 
			  key={item.path} 
			  to={item.path}
			  className={`text-[11px] xl:text-[13px] font-semibold transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
				location.pathname === item.path 
				  ? 'text-[#d4af37] border-[#d4af37]' 
				  : 'text-slate-100 border-transparent hover:text-white'
			  }`}
			>
			  {item.label}
			</Link>
		  ))}
		</div>

		{/* Right: Actions */}
		<div className="hidden lg:flex flex-1 items-center justify-end gap-3 xl:gap-4 min-w-0">
		  <button onClick={toggleLanguage} title={isAr ? 'English' : 'عربي'} className="text-slate-100 hover:text-white transition-colors cursor-pointer p-1">
			<Globe size={16} />
		  </button>
		  
		  <Link to="/cms-login" title={t.login || 'System Login'} className="text-slate-100 hover:text-[#d4af37] transition-colors cursor-pointer p-1 flex items-center gap-1.5 whitespace-nowrap text-[11px] xl:text-[12px] font-semibold">
			<LogIn size={16} />
			<span className="hidden xl:block">SYSTEM LOGIN</span>
		  </Link>

		  <Link to="/subscription" className="text-[11px] xl:text-[12px] font-semibold text-slate-100 hover:text-white transition-colors cursor-pointer whitespace-nowrap">
			{t.pricing || 'PRICING'}
		  </Link>

		  <Link to="/contact" className="bg-[#d4af37] hover:bg-[#eab308] text-[#1e2d40] px-3 xl:px-4 py-1.5 rounded-md text-[10px] xl:text-[11px] font-bold uppercase tracking-wide transition-colors cursor-pointer shadow-sm ml-1 flex items-center justify-center whitespace-nowrap">
			{t.demoBtn || 'BOOK DEMO'}
		  </Link>
		</div>

		{/* Mobile Toggle */}
		<div className="flex lg:hidden flex-1 justify-end">
		  <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white outline-none shrink-0 cursor-pointer">
			{isOpen ? <X size={20} /> : <Menu size={20} />}
		  </button>
		</div>

	  </div>

	  {/* Mobile Drawer */}
	  {isOpen && (
		<div className="lg:hidden fixed top-[55px] left-0 right-0 bg-[#1e2d40] border-b border-slate-700 shadow-xl p-6 flex flex-col gap-2 font-sans z-50">
		  {navItems.map((item) => (
			<Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} className="text-sm font-semibold py-3 border-b border-slate-700 text-slate-100 text-left block">
			  {item.label}
			</Link>
		  ))}
		  <div className="pt-4 flex flex-col gap-4">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-2 text-sm font-semibold text-slate-100">
			  <Globe size={16} /> {isAr ? 'Switch to English' : 'تبديل للغة العربية'}
			</button>
			
			<Link to="/cms-login" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm font-semibold text-slate-100">
			  <LogIn size={16} /> {t.login || 'System Login'}
			</Link>
			
			<Link to="/subscription" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-[#d4af37] text-left block">
			  {t.pricing || 'Pricing'}
			</Link>
			
			<Link to="/contact" onClick={() => setIsOpen(false)} className="bg-[#d4af37] text-[#1e2d40] text-center py-2.5 rounded-md font-bold text-sm mt-2 block">
			  {t.demoBtn || 'Book a Demo'}
			</Link>
		  </div>
		</div>
	  )}
	</nav>
  );
}