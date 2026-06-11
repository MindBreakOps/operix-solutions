import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X } from 'lucide-react';

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
	{ path: '/projects', label: t.navProjects || 'PROJECTS & OPERATIONS' },
	{ path: '/clients', label: t.navClients || 'CLIENTS & PARTNERS' },
	{ path: '/news', label: t.navNews || 'NEWS' },
	{ path: '/contact', label: t.navContact || 'CONTACT' },
  ];

  return (
	<nav className="sticky top-0 z-50 bg-[#151c28] border-b border-slate-800 shadow-xl w-full font-sans">
	  <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4 flex items-center justify-between gap-4">
		
		{/* Brand Logotype */}
		<Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity">
		  <img src="/logo.png" alt={`${brandTitle} Logo`} className="w-8 h-8 object-contain bg-white rounded-md p-1" />
		  <span className="font-black tracking-tight text-sm uppercase text-white">{brandTitle}</span>
		</Link>

		{/* Desktop Links (Hidden on small screens, forced visible on lg screens) */}
		<div className="hidden xl:flex items-center gap-5 xl:gap-7 flex-1 justify-center whitespace-nowrap">
		  {navItems.map((item) => (
			<Link 
			  key={item.path} 
			  to={item.path}
			  className={`text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-all pb-1.5 border-b-2 ${location.pathname === item.path ? 'text-[#c9a84c] border-[#c9a84c]' : 'text-slate-400 border-transparent hover:text-white'}`}
			>
			  {item.label}
			</Link>
		  ))}
		</div>

		{/* Action Controls Panel */}
		<div className="hidden xl:flex items-center gap-5 shrink-0">
		  <button onClick={toggleLanguage} className="flex items-center gap-1.5 text-[10px] xl:text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer">
			<Globe size={14} /> {isAr ? 'ENGLISH' : 'عربي'}
		  </button>
		  <button onClick={() => navigate('/subscription')} className="text-[10px] xl:text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer">
			{t.pricing || 'PRICING'}
		  </button>
		  <button onClick={() => navigate('/cms-login')} className="text-[10px] xl:text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors cursor-pointer">
			{t.login || 'SYSTEM LOGIN'}
		  </button>
		  <button onClick={() => navigate('/contact')} className="bg-[#c9a84c] hover:bg-white text-[#151c28] px-6 py-3 rounded-lg text-[10px] xl:text-[11px] font-black uppercase tracking-widest transition-colors shadow-md cursor-pointer">
			{t.demoBtn || 'BOOK A DEMO'}
		  </button>
		</div>

		{/* Hamburger Menu Icon (Toggles at 1280px width) */}
		<button onClick={() => setIsOpen(!isOpen)} className="flex xl:hidden p-2 text-white outline-none shrink-0 cursor-pointer">
		  {isOpen ? <X size={24} /> : <Menu size={24} />}
		</button>

	  </div>

	  {/* Mobile Drawer Overlay */}
	  {isOpen && (
		<div className="xl:hidden fixed top-[72px] left-0 right-0 bg-[#151c28] border-b border-slate-800 shadow-2xl p-6 flex flex-col gap-2 font-sans z-50 overflow-y-auto" style={{ height: 'calc(100vh - 72px)' }}>
		  {navItems.map((item) => (
			<button 
			  key={item.path}
			  onClick={() => { setIsOpen(false); navigate(item.path); }}
			  className={`text-xs font-black uppercase tracking-wider py-4 w-full border-b border-slate-800 transition-colors ${location.pathname === item.path ? 'text-[#c9a84c]' : 'text-slate-300 hover:text-white'}`}
			  style={{ textAlign: isAr ? 'right' : 'left' }}
			>
			  {item.label}
			</button>
		  ))}
		  <div className="pt-6 flex flex-col gap-5 pb-12">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white transition-colors justify-start">
			  <Globe size={15} /> {isAr ? 'ENGLISH' : 'عربي'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/subscription'); }} className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white transition-colors" style={{ textAlign: isAr ? 'right' : 'left' }}>
			  {t.pricing || 'PRICING'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/cms-login'); }} className="text-xs font-black uppercase tracking-wider text-slate-300 hover:text-white transition-colors" style={{ textAlign: isAr ? 'right' : 'left' }}>
			  {t.login || 'SYSTEM LOGIN'}
			</button>
			<button onClick={() => { setIsOpen(false); navigate('/contact'); }} className="bg-[#c9a84c] text-[#151c28] hover:bg-white transition-colors text-center py-4 rounded-xl font-black text-xs uppercase tracking-wider mt-2">
			  {t.demoBtn || 'BOOK A DEMO'}
			</button>
		  </div>
		</div>
	  )}
	</nav>
  );
}