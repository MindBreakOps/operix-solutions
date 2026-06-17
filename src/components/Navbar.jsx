import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, LogIn, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const { toggleLanguage, t, isAr } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
	const onScroll = () => setScrolled(window.scrollY > 12);
	window.addEventListener('scroll', onScroll, { passive: true });
	return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const navItems = [
	{ path: '/',            label: t.navHome      || 'Home' },
	{ path: '/about',       label: t.navAbout     || 'About Us' },
	{ path: '/services',    label: t.navServices  || 'Services' },
	{ path: '/projects',    label: t.navProjects  || 'Projects' },
	{ path: '/clients',     label: t.navClients   || 'Clients' },
	{ path: '/news',        label: t.navNews      || 'News' },
	{ path: '/contact',     label: t.navContact   || 'Contact' },
	{ path: '/Legal',       label: t.navLegal     || 'Legal' },
  ];

  const isActive = (path) =>
	path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
	<>
	  {/* ─── TOP IDENTITY STRIP ─── */}
	  <div className="w-full bg-[#0d1826] border-b border-[#d4af37]/20 hidden lg:block">
		<div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-8">
		  <div className="flex items-center gap-6">
			<span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/70">
			  Enterprise Cloud Suite
			</span>
			<span className="w-px h-3 bg-slate-700" />
			<a
			  href="mailto:info@operix-solutions.com"
			  className="text-[10px] font-mono text-slate-500 hover:text-[#d4af37] transition-colors"
			>
			  info@operix-solutions.com
			</a>
			<a
			  href="mailto:support@operix-solutions.com"
			  className="text-[10px] font-mono text-slate-500 hover:text-[#d4af37] transition-colors"
			>
			  support@operix-solutions.com
			</a>
		  </div>
		  <div className="flex items-center gap-4">
			<span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
			  Riyadh, SA · Khartoum, SD
			</span>
		  </div>
		</div>
	  </div>

	  {/* ─── MAIN NAV ─── */}
	  <nav
		className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${
		  scrolled
			? 'bg-[#0d1826]/98 backdrop-blur-md shadow-[0_4px_40px_rgba(0,0,0,0.6)] border-b border-[#d4af37]/15'
			: 'bg-[#1e2d40] border-b border-slate-700/60'
		}`}
	  >
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
		  <div className="flex items-center justify-between h-[58px] gap-6">

			{/* ─── LOGO ─── */}
			<Link
			  to="/"
			  className="flex items-center gap-2.5 shrink-0 group"
			>
			  <div className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden group-hover:shadow-[0_0_0_2px_#d4af37] transition-all duration-300">
				<img src="/logo.png" alt="OPERIX" className="w-6 h-6 object-contain" />
			  </div>
			  <div className="flex flex-col leading-none hidden sm:flex">
				<span className="text-[13px] font-black tracking-[0.12em] text-white uppercase">
				  OPERIX
				</span>
				<span className="text-[8px] font-bold tracking-[0.35em] text-[#d4af37] uppercase mt-0.5">
				  SOLUTIONS
				</span>
			  </div>
			</Link>

			{/* ─── DESKTOP NAV LINKS ─── */}
			<div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
			  {navItems.map((item) => (
				<Link
				  key={item.path}
				  to={item.path}
				  className={`relative px-3 xl:px-4 py-2 text-[11.5px] xl:text-[12.5px] font-semibold tracking-wide uppercase transition-colors whitespace-nowrap group ${
					isActive(item.path)
					  ? 'text-[#d4af37]'
					  : 'text-slate-300 hover:text-white'
				  }`}
				>
				  {item.label}
				  {/* active indicator */}
				  <span
					className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
					  isActive(item.path)
						? 'w-4/5 bg-[#d4af37]'
						: 'w-0 bg-[#d4af37] group-hover:w-1/2'
					}`}
				  />
				</Link>
			  ))}
			</div>

			{/* ─── DESKTOP ACTIONS ─── */}
			<div className="hidden lg:flex items-center gap-2 shrink-0">
			  {/* Language toggle */}
			  <button
				onClick={toggleLanguage}
				title={isAr ? 'English' : 'عربي'}
				className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all text-[10px] font-bold tracking-widest uppercase border border-transparent hover:border-slate-700"
			  >
				<Globe size={13} />
				<span>{isAr ? 'EN' : 'ع'}</span>
			  </button>

			  {/* Login */}
			  <Link
				to="/cms-login"
				className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-slate-700 text-[10px] font-bold tracking-widest uppercase"
			  >
				<LogIn size={13} />
				<span className="hidden xl:block">{t.login || 'Login'}</span>
			  </Link>

			  {/* Pricing */}
			  <Link
				to="/subscription"
				className="px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 transition-all"
			  >
				{t.pricing || 'Pricing'}
			  </Link>

			  {/* CTA */}
			  <Link
				to="/contact"
				className="relative overflow-hidden px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase text-[#0d1826] transition-all shadow-lg group"
				style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)', backgroundSize: '200% 100%' }}
			  >
				<span className="relative z-10">{t.demoBtn || 'Book Demo'}</span>
				<span
				  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				  style={{ background: 'linear-gradient(135deg, #eab308 0%, #fde68a 50%, #eab308 100%)' }}
				/>
			  </Link>
			</div>

			{/* ─── MOBILE TOGGLE ─── */}
			<button
			  onClick={() => setIsOpen(!isOpen)}
			  className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors"
			  aria-label="Toggle menu"
			>
			  {isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>

		  </div>
		</div>

		{/* ─── MOBILE DRAWER ─── */}
		<div
		  className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
			isOpen ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0'
		  }`}
		>
		  <div className="border-t border-slate-700/60 bg-[#0d1826] px-4 py-4">
			{/* Mobile nav links */}
			<div className="flex flex-col gap-0.5 mb-4">
			  {navItems.map((item) => (
				<Link
				  key={item.path}
				  to={item.path}
				  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-semibold tracking-wide transition-all ${
					isActive(item.path)
					  ? 'text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20'
					  : 'text-slate-300 hover:text-white hover:bg-white/5'
				  }`}
				>
				  {item.label}
				  {isActive(item.path) && (
					<span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
				  )}
				</Link>
			  ))}
			</div>

			{/* Mobile utilities */}
			<div className="border-t border-slate-700/40 pt-4 grid grid-cols-2 gap-2">
			  <button
				onClick={toggleLanguage}
				className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-slate-700 text-[12px] font-bold text-slate-300 uppercase tracking-wide hover:text-white transition-colors"
			  >
				<Globe size={14} /> {isAr ? 'English' : 'عربي'}
			  </button>
			  <Link
				to="/cms-login"
				className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-slate-700 text-[12px] font-bold text-slate-300 uppercase tracking-wide hover:text-white transition-colors"
			  >
				<LogIn size={14} /> {t.login || 'Login'}
			  </Link>
			  <Link
				to="/subscription"
				className="flex items-center justify-center col-span-2 py-2.5 rounded-xl bg-white/5 border border-slate-700 text-[12px] font-bold text-slate-300 uppercase tracking-wide hover:text-white transition-colors"
			  >
				{t.pricing || 'Pricing'}
			  </Link>
			  <Link
				to="/contact"
				className="col-span-2 flex items-center justify-center py-3 rounded-xl text-[12px] font-black tracking-widest uppercase text-[#0d1826] shadow-lg"
				style={{ background: 'linear-gradient(135deg, #d4af37, #f0d060)' }}
			  >
				{t.demoBtn || 'Book a Demo'}
			  </Link>
			</div>
		  </div>
		</div>
	  </nav>
	</>
  );
}