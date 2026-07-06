import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Globe, Menu, X, LogIn, 
  Home, Info, Briefcase, Package, 
  Users, Newspaper, Phone, Shield, Eye, Smartphone 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
	{ path: '/', label: t.navHome || 'Home', icon: Home },
	{ path: '/about', label: t.navAbout || 'About Us', icon: Info },
	{ path: '/services', label: t.navServices || 'Our Services', icon: Briefcase },
	{ path: '/vision', label: t.navVision || 'Our Vision', icon: Eye },
	{ path: '/products', label: t.navProducts || 'Our Products', icon: Package },
	{ path: '/mobile-apps', label: t.navMobileApps || 'Mobile Apps', icon: Smartphone },
	{ path: '/clients', label: t.navClients || 'Clients', icon: Users },
	{ path: '/news', label: t.navNews || 'News', icon: Newspaper },
	{ path: '/contact', label: t.navContact || 'Contact', icon: Phone },
	{ path: '/Legal', label: t.navLegal || 'Legal', icon: Shield },
  ];

  return (
	<>
	  {/* Self-contained CSS for the "Living Teeth" continuous animations */}
	  <style>{`
		@keyframes breathingWave {
		  0%, 100% {
			transform: translateY(0px);
		  }
		  50% {
			transform: translateY(5px);
		  }
		}
		@keyframes activePulse {
		  0%, 100% {
			box-shadow: 0 4px 15px -1px rgba(212, 175, 55, 0.4);
			transform: translateY(2px);
		  }
		  50% {
			box-shadow: 0 8px 25px 2px rgba(212, 175, 55, 0.8);
			transform: translateY(6px);
		  }
		}
		.animate-tooth {
		  animation: breathingWave 3.5s ease-in-out infinite;
		}
		.animate-active-tooth {
		  animation: activePulse 2.5s ease-in-out infinite;
		}
	  `}</style>

	  <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 border-t-[8px] border-t-[#1e2d40] shadow-sm w-full font-sans">
		<div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-2.5 flex items-center justify-between">
		  
		  {/* Left: Logo & Stacked Brand Name */}
		  <div className="flex flex-1 justify-start items-center shrink-0 min-w-0">
			<Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
			  <img src="/logo.png" alt="Logo" className="w-11 h-11 object-contain" />
			  <div className="flex flex-col text-[#1e2d40] hidden sm:flex justify-center mt-0.5">
				<span className="font-extrabold tracking-widest text-[15px] leading-none uppercase">
				  OPERIX
				</span>
				<span className="font-semibold tracking-wide text-[13px] leading-tight">
				  Solutions
				</span>
			  </div>
			</Link>
		  </div>

		  {/* Center: Links with Icons (Living Teeth Layout) */}
		  <div className="hidden lg:flex items-start justify-center gap-2 xl:gap-3 flex-none self-start -mt-2.5 px-4 relative z-10">
			{navItems.map((item, index) => {
			  const Icon = item.icon;
			  const isActive = location.pathname === item.path;
			  
			  // DYNAMIC HEIGHT: Long word = longer tooth
			  const toothLength = 16 + (item.label.length * 4); 

			  // STAGGERED DELAY: Multiplies the index so each tooth moves slightly after the previous one, creating a wave
			  const animationDelay = `${index * 0.2}s`;

			  return (
				<Link 
				  key={item.path} 
				  to={item.path}
				  style={{ 
					paddingBottom: `${toothLength}px`,
					animationDelay: animationDelay 
				  }}
				  className={`flex flex-col items-center pt-3.5 px-2 min-w-[65px] rounded-b-lg transition-colors duration-300 ${
					isActive 
					  ? 'bg-[#d4af37] text-[#1e2d40] animate-active-tooth font-black' 
					  : 'bg-[#1e2d40] text-white hover:bg-[#2a3f5a] hover:text-[#d4af37] animate-tooth shadow-md hover:!translate-y-2' 
				  }`}
				>
				  <Icon 
					size={18} 
					strokeWidth={1.5} 
					className={`mb-2 transition-transform duration-300 ${
					  isActive ? 'scale-110' : 'opacity-90 group-hover:scale-110'
					}`} 
				  />
				  <span className="text-[11px] xl:text-[12px] font-bold whitespace-nowrap">
					{item.label}
				  </span>
				</Link>
			  );
			})}
		  </div>

		  {/* Right: Actions (Language, Login, Pricing, Demo) */}
		  <div className="hidden lg:flex flex-1 items-center justify-end gap-5 xl:gap-6 min-w-0">
			<button 
			  onClick={toggleLanguage} 
			  title={isAr ? 'English' : 'عربي'} 
			  className="text-[#1e2d40] hover:text-[#d4af37] transition-colors cursor-pointer p-1"
			>
			  <Globe size={22} strokeWidth={1.5} />
			</button>
			
		   <Link 
			  to="/cms-login" 
			  title={t.login || 'System Login'} 
			  className="text-[#1e2d40] hover:text-[#d4af37] transition-colors cursor-pointer p-1 flex items-center"
		   >
			 <LogIn size={22} strokeWidth={1.5} />
		   </Link>

			<Link 
			  to="/subscription" 
			  className="text-[13px] font-bold text-[#1e2d40] hover:text-[#d4af37] transition-colors cursor-pointer whitespace-nowrap"
			>
			  {t.pricing || 'Pricing'}
			</Link>

			<Link 
			  to="/contact" 
			  className="bg-[#d4af37] hover:bg-[#c29f32] text-[#1e2d40] px-5 py-2.5 rounded-md text-[11px] xl:text-[12px] font-extrabold uppercase tracking-widest transition-all cursor-pointer shadow-sm hover:shadow-md ml-1 flex items-center justify-center whitespace-nowrap"
			>
			  {t.demoBtn || 'BOOK A DEMO'}
			</Link>
		  </div>

		  {/* Mobile Toggle */}
		  <div className="flex lg:hidden flex-1 justify-end">
			<button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#1e2d40] outline-none shrink-0 cursor-pointer">
			  {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
			</button>
		  </div>

		</div>

		{/* Mobile Drawer */}
		{isOpen && (
		  <div className="lg:hidden fixed top-[60px] left-0 right-0 bg-white border-b border-gray-200 shadow-2xl p-6 flex flex-col gap-2 font-sans z-50">
			{navItems.map((item) => {
			  const Icon = item.icon;
			  const isActive = location.pathname === item.path;
			  return (
				<Link 
				  key={item.path} 
				  to={item.path} 
				  onClick={() => setIsOpen(false)} 
				  className={`flex items-center gap-3 text-sm font-bold py-3 border-b border-gray-100 text-left transition-colors ${
					isActive ? 'text-[#d4af37]' : 'text-[#1e2d40]'
				  }`}
				>
				  <Icon size={20} strokeWidth={1.5} className={isActive ? 'text-[#d4af37]' : 'text-gray-500'} />
				  {item.label}
				</Link>
			  );
			})}
			<div className="pt-4 flex flex-col gap-4">
			  <button onClick={() => { toggleLanguage(); setIsOpen(false); }} className="flex items-center gap-3 text-sm font-bold text-[#1e2d40] hover:text-[#d4af37]">
				<Globe size={20} strokeWidth={1.5} className="text-gray-500" /> 
				{isAr ? 'Switch to English' : 'تبديل للغة العربية'}
			  </button>
			  
			  <Link to="/cms-login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 text-sm font-bold text-[#1e2d40] hover:text-[#d4af37]">
				<LogIn size={20} strokeWidth={1.5} className="text-gray-500" /> 
				{t.login || 'System Login'}
			  </Link>
			  
			  <Link to="/subscription" onClick={() => setIsOpen(false)} className="text-sm font-extrabold text-[#d4af37] text-left block pl-8 hover:underline">
				{t.pricing || 'Pricing'}
			  </Link>
			  
			  <Link to="/contact" onClick={() => setIsOpen(false)} className="bg-[#1e2d40] text-[#d4af37] text-center py-3.5 rounded-md font-extrabold text-sm mt-2 block shadow-md hover:bg-[#2a3f5a]">
				{t.demoBtn || 'BOOK A DEMO'}
			  </Link>
			</div>
		  </div>
		)}
	  </nav>
	</>
  );
}