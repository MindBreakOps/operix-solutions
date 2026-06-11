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
	{ path: '/', label: t.navHome || 'HOME' },
	{ path: '/about', label: t.navAbout || 'ABOUT US' },
	{ path: '/services', label: t.navServices || 'OUR SERVICES' },
	{ path: '/projects', label: t.navProjects || 'PROJECTS & OPS' },
	{ path: '/clients', label: t.navClients || 'CLIENTS' },
	{ path: '/news', label: t.navNews || 'NEWS' },
	{ path: '/contact', label: t.navContact || 'CONTACT' },
  ];

  return (
	<nav className="sticky top-0 z-50 bg-[#1e2d40] border-b border-slate-700 shadow-xl w-full font-sans">
	  <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-3.5 flex items-center justify-between gap-4">
		
		{/* Brand Logotype */}
		<Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
		  <img src="/logo.png" alt="Logo" className="w-7 h-7 lg:w-8 lg:h-8 object-contain bg-white rounded-md p-0.5" />
		  <span className="font-black tracking-tight text-xs lg:text-sm uppercase text-white hidden sm:block drop-shadow-sm">{brandTitle}</span>
		</Link>

		{/* Shiny Bold Gold Desktop Links */}
		<div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center whitespace-nowrap">
		  {navItems.map((item) => (
			<Link 
			  key={item.path} 
			  to={item.path}
			  className={`text-[10px] xl:text-[11px] uppercase tracking-widest transition-all pb-1 border-b-2 ${location.pathname === item.path ? 'font-extrabold text-[#d4af37] border-[#d4af37] drop-shadow-md' : 'font-black text-slate-400 border-transparent hover:text-[#d4af37] hover:border-[#d4af37]/50'}`}
			>
			  {item.label}
			</Link>
		  ))}
		</div>

		{/* Crisp Separated Action Icons */}
		<div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0 border-l border-slate-600 pl-4 xl:pl-5">
		  <button onClick={toggleLanguage} title={isAr ? 'English' : 'عربي'} className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-1.5 bg-white/5 hover:bg-white/10 rounded-lg">
			<Globe size={18} />
		  </button>
		  
		  <button onClick={() => navigate('/cms-login')} title={t.login || 'System Login'} className="text-slate-300 hover:text-[#d4af37] transition-colors cursor-pointer flex items-center justify-center p-1.5 bg-white/5 hover:bg-[#d4af37]/10 rounded-lg">
			<LogIn size={18} />
		  </button>

		  <button onClick={() => navigate('/subscription')} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-white transition-colors cursor-pointer">
			{t.pricing || 'PRICING'}
		  </button>

		  {/* Shiny Gold CTA Button */}
		  <button onClick={() => navigate('/contact')} className="bg-gradient-to-r from-[#d4af37] to-[#eab308] hover:from-white hover:to-white text-[#1e2d40] px-5 py-2.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest transition-colors shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] cursor-pointer ml-2">
			{t.demoBtn || 'BOOK DEMO'}
		  </button>
		</div>

		{/* Mobile Toggle */}
		<button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden p-2 text-white outline-none shrink-0 cursor-pointer">
		  {isOpen ? <X size={24} /> : <Menu size={24} />}
		</button>

	  </div>

	  {/* Mobile Drawer */}
	  {isOpen && (
		<div className="lg:hidden fixed top-[60px] left-0 right-0 bg-[#1e2d40] border-b border-slate-700 shadow-2xl p-6 flex flex-col gap-2 font-sans z-50 overflow-y-auto" style={{ height: 'calc(100vh - 60px)' }}>
		  {navItems.map((item) => (
			<button key={item.path} onClick={() => { setIsOpen(false); navigate(item.path); }} className="text-xs font-extrabold uppercase tracking-wider py-4 w-full border-b border-slate-700 text-[#d4af37] drop-shadow-sm text-left">
			  {item.label}
			</button>
		  ))}
		  <div className="pt-6 flex flex-col gap-5 pb-12">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white justify-start">
			  <Globe size={16} /> {isAr ? 'SWITCH TO ENGLISH' : 'تبديل للغة العربية'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/cms-login'); }} className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white justify-start">
			  <LogIn size={16} /> {t.login || 'SYSTEM LOGIN'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/subscription'); }} className="text-xs font-black uppercase tracking-wider text-white text-left">
			  {t.pricing || 'PRICING'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/contact'); }} className="bg-gradient-to-r from-[#d4af37] to-[#eab308] text-[#1e2d40] text-center py-4 rounded-xl font-extrabold text-xs uppercase tracking-wider mt-2 shadow-lg">
			  {t.demoBtn || 'BOOK A DEMO'}
			</button>
		  </div>
		</div>
	  )}
	</nav>
  );
}