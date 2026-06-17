import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Globe, Menu, X, LogIn, 
  Home, Info, Briefcase, Package, 
  Users, Newspaper, Phone, Shield, Eye 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const brandTitle = "OPERIX SOLUTIONS";

  // FIXED: Shortened fallback names and added Lucide React icons
const navItems = [
	  { path: '/', label: t.navHome || 'Home', icon: Home },
	  { path: '/about', label: t.navAbout || 'About', icon: Info },
	  { path: '/services', label: t.navServices || 'Services', icon: Briefcase },
	 { path: '/vision', label: t.navVision || 'Vision', icon: Eye },
	  { path: '/products', label: t.navProducts || 'Products', icon: Package },
	  { path: '/clients', label: t.navClients || 'Clients', icon: Users },
	  { path: '/news', label: t.navNews || 'News', icon: Newspaper },
	  { path: '/contact', label: t.navContact || 'Contact', icon: Phone },
	  { path: '/Legal', label: t.navLegal || 'Legal', icon: Shield },
	];

  return (
	<nav className="sticky top-0 z-50 bg-[#1e2d40] border-b border-slate-700 shadow-sm w-full font-sans">
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

		{/* Center: Links with Icons */}
		<div className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 flex-none">
		  {navItems.map((item) => {
			const Icon = item.icon;
			return (
			  <Link 
				key={item.path} 
				to={item.path}
				className={`flex items-center gap-1.5 text-[11px] xl:text-[12px] font-semibold transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
				  location.pathname === item.path 
					? 'text-[#d4af37] border-[#d4af37]' 
					: 'text-slate-100 border-transparent hover:text-white'
				}`}
			  >
				<Icon size={14} className="mb-0.5" />
				<span>{item.label}</span>
			  </Link>
			);
		  })}
		</div>

		{/* Right: Actions */}
		<div className="hidden lg:flex flex-1 items-center justify-end gap-3 xl:gap-4 min-w-0">
		  <button onClick={toggleLanguage} title={isAr ? 'English' : 'عربي'} className="text-slate-100 hover:text-white transition-colors cursor-pointer p-1">
			<Globe size={16} />
		  </button>
		  
		 <Link to="/cms-login" title={t.login || 'System Login'} className="text-slate-100 hover:text-[#d4af37] transition-colors cursor-pointer p-1 flex items-center">
		   <LogIn size={20} />
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
		  {navItems.map((item) => {
			const Icon = item.icon;
			return (
			  <Link 
				key={item.path} 
				to={item.path} 
				onClick={() => setIsOpen(false)} 
				className="flex items-center gap-3 text-sm font-semibold py-3 border-b border-slate-700 text-slate-100 text-left"
			  >
				<Icon size={18} className="text-slate-400" />
				{item.label}
			  </Link>
			);
		  })}
		  <div className="pt-4 flex flex-col gap-4">
			<button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-3 text-sm font-semibold text-slate-100">
			  <Globe size={18} className="text-slate-400" /> 
			  {isAr ? 'Switch to English' : 'تبديل للغة العربية'}
			</button>
			
			<Link to="/cms-login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm font-semibold text-slate-100">
			  <LogIn size={18} className="text-slate-400" /> 
			  {t.login || 'System Login'}
			</Link>
			
			<Link to="/subscription" onClick={() => setIsOpen(false)} className="text-sm font-semibold text-[#d4af37] text-left block pl-7">
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