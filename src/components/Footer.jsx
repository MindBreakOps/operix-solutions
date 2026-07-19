import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Mail, MapPin, MessageCircle, Phone, AtSign,
  Users, Settings, Stethoscope, FileCheck,
  Globe, Shield, ChevronRight, BookOpen, Heart
} from 'lucide-react';

// ─── Social icons ───
const YTIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
	<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
	<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
	<path d="M4 4l11.733 16h4.267l-11.733-16z"/>
	<path d="M4 20l6.768-6.768m2.46-2.46l6.772-6.772"/>
  </svg>
);
const FBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
	<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
	<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
	<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
	<line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function Footer() {
  const { isAr } = useLanguage();

  // Updated Cloud Portals List
  const portals = [
	{ href: 'https://www.hris.operix-solutions.online',       Icon: Users,       label: 'OPERIX HRIS',         sub: isAr ? 'إدارة الموارد البشرية' : 'Human Capital' },
	{ href: 'https://www.operations.operix-solutions.online', Icon: Settings,    label: 'OPERIX Operations',   sub: isAr ? 'إدارة العمليات' : 'Fleet & Workforce' },
	{ href: 'https://www.care.operix-solutions.online',       Icon: Stethoscope, label: 'OPERIX Care HIS',     sub: isAr ? 'الرعاية الصحية' : 'Clinical Suite' },
	{ href: 'https://www.fmis.operix-solutions.online',       Icon: FileCheck,   label: 'OPERIX FMIS',         sub: isAr ? 'الإدارة المالية' : 'Finance & Ledger' },
	{ href: 'https://www.edu.operix-solutions.online',        Icon: BookOpen,    label: 'OPERIX Edu',          sub: isAr ? 'إدارة التعليم' : 'Education Management' },
	{ href: 'https://www.hasad.operix-solutions.online',      Icon: Heart,       label: 'Hasad Community Hub', sub: isAr ? 'منصة المجتمع' : 'Community Platform' },
  ];

  // Duplicating portals array to create a seamless infinite marquee loop
  const marqueePortals = [...portals, ...portals];

  const corpNav = [
	{ to: '/',             label: isAr ? 'الرئيسية' : 'Home' },
	{ to: '/about',        label: isAr ? 'من نحن' : 'About Us' },
	{ to: '/services',     label: isAr ? 'خدماتنا' : 'Our Services' },
	{ to: '/vision',       label: isAr ? 'رؤيتنا' : 'Our Vision'},
	{ to: '/products',     label: isAr ? 'منتجاتنا' : 'Our Products' },
	{ to: '/mobile-apps',  label: isAr ? 'تطبيقات الجوال' : 'Mobile Apps' },
	{ to: '/clients',      label: isAr ? 'العملاء والشركاء' : 'Clients & Partners' },
	{ to: '/news',         label: isAr ? 'الأخبار' : 'News' },
	{ to: '/qa',           label: isAr ? 'الأسئلة الشائعة' : 'Q&A' },
	{ to: 'https://www.sudan.operix-solutions.com', label: isAr ? 'أوبيريكس 249' : 'OPERIX 249', isExternal: true }
  ];

  const legal = [
	{ to: '/legal', label: isAr ? 'الامتثال التنظيمي' : 'Regulatory Compliance' },
	{ to: '/legal', label: isAr ? 'شروط الخدمة' : 'Terms of Service' },
	{ to: '/legal', label: isAr ? 'سياسة الخصوصية' : 'Privacy Policy' },
	{ to: '/legal', label: isAr ? 'اتفاقية SLA' : 'SLA Agreement' },
  ];

  const socials = [
	{ href: 'https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C', Icon: MessageCircle, bg: 'bg-[#25D366]', color: 'text-white', title: 'WhatsApp Channel' },
	{ href: 'https://wa.me/966500823643',                              Icon: Phone,         bg: 'bg-[#128C7E]', color: 'text-white', title: 'WhatsApp Business' },
	{ href: 'https://x.com/operixsolutions?s=11',                     Icon: XIcon,         bg: 'bg-black border border-white/20', color: 'text-white', title: 'X (Twitter)' },
	{ href: 'https://www.facebook.com/share/1BoQkRsiJB/',             Icon: FBIcon,        bg: 'bg-[#1877F2]', color: 'text-white', title: 'Facebook' },
	{ href: 'https://www.instagram.com/operix.solutions/',            Icon: IGIcon,        bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]', color: 'text-white', title: 'Instagram' },
	{ href: 'https://www.youtube.com/@Operix.Solutions', Icon: YTIcon, bg: 'bg-[#FF0000]', color: 'text-white', title: 'YouTube' },
	{ href: 'https://www.threads.com/@operix.solutions',              Icon: AtSign,        bg: 'bg-black border border-white/20', color: 'text-white', title: 'Threads' },
  ];

  return (
	<>
	  {/* ─── CSS Animations for Marquee ─── */}
	  <style>{`
		@keyframes scrollMarquee {
		  0% { transform: translateX(0); }
		  100% { transform: translateX(-50%); }
		}
		.animate-marquee {
		  display: flex;
		  width: max-content;
		  animation: scrollMarquee 45s linear infinite;
		}
		.animate-marquee:hover {
		  animation-play-state: paused;
		}
	  `}</style>

	  {/* Replaced the gradient with the solid Premium Navy bg-[#1e2d40] */}
	  <footer className={`w-full bg-[#1e2d40] border-t-4 border-[#d4af37] ${isAr ? "font-['Arial','Tahoma','Helvetica',sans-serif]" : "font-sans"}`}>

		{/* ─── IDEA #2: THE NEXT STEP CTA ─── */}
		<div className="bg-[#d4af37] relative overflow-hidden">
		  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
			<div className="text-center md:text-left">
			  <h3 className="text-2xl lg:text-3xl font-black text-[#1e2d40] tracking-tight mb-2">
				{isAr ? 'هل أنت مستعد للارتقاء بمؤسستك؟' : 'Ready to transform your enterprise?'}
			  </h3>
			  <p className="text-sm font-semibold text-[#1e2d40]/85">
				{isAr ? 'انضم إلى قادة الصناعة وقم بجدولة عرض توضيحي للأنظمة اليوم.' : 'Join industry leaders and schedule a live system demonstration today.'}
			  </p>
			</div>
			<Link to="/contact" className="bg-[#1e2d40] text-[#d4af37] hover:bg-[#2a3f5a] hover:text-white px-8 py-3.5 rounded-lg text-[13px] font-extrabold uppercase tracking-widest transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap shrink-0">
			  {isAr ? 'احجز عرضاً توضيحياً' : 'BOOK A DEMO'}
			</Link>
		  </div>
		  {/* Subtle design element */}
		  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-white/20 to-transparent skew-x-12 translate-x-10" />
		</div>

		{/* ─── IDEA #3: ANIMATED CLOUD PORTALS MARQUEE ─── */}
		<div className="w-full border-b border-white/10 bg-[#162232] overflow-hidden" dir="ltr">
		  <div className="flex items-center">
			{/* Static Label */}
			<div className="z-10 bg-[#162232] px-6 lg:px-10 py-3.5 shadow-[10px_0_15px_-3px_rgba(22,34,50,1)] border-r border-white/5 flex items-center shrink-0">
			  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37]/90 whitespace-nowrap">
				{isAr ? 'البوابات السحابية المباشرة' : 'Live Cloud Portals'}
			  </span>
			</div>
			{/* Scrolling Track */}
			<div className="flex-1 overflow-hidden relative">
			  <div className="animate-marquee gap-3 py-3.5 px-3">
				{marqueePortals.map((portal, idx) => {
				  const Icon = portal.Icon;
				  return (
					<a
					  key={idx}
					  href={portal.href}
					  target="_blank"
					  rel="noreferrer"
					  className="group flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 transition-all duration-300"
					>
					  <Icon size={14} className="text-[#d4af37]/80 group-hover:text-[#d4af37] transition-colors shrink-0" />
					  <div className="flex flex-col">
						<span className="text-[11px] font-bold text-white group-hover:text-[#d4af37] tracking-wide whitespace-nowrap leading-tight">{portal.label}</span>
						<span className="text-[9px] text-slate-400 group-hover:text-slate-200 whitespace-nowrap">{portal.sub}</span>
					  </div>
					</a>
				  );
				})}
			  </div>
			</div>
		  </div>
		</div>

		{/* ─── MAIN FOOTER GRID ─── */}
		<div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10">
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

			{/* ── COLUMN 1: BRAND & SOCIALS ── */}
			<div className="lg:col-span-4 space-y-6 lg:pr-6">
			  {/* Logo lockup */}
			  <div className="flex items-center gap-3">
				<div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-lg shrink-0">
				  <img src="/logo.png" alt="OPERIX" className="w-7 h-7 object-contain" />
				</div>
				<div className="flex flex-col leading-none text-white">
				  <span className="text-[15px] font-black tracking-[0.15em] uppercase">OPERIX</span>
				  <span className="text-[10px] font-bold tracking-[0.4em] text-[#d4af37] uppercase mt-0.5">SOLUTIONS</span>
				</div>
			  </div>

			  <p className="text-[12px] text-slate-300 leading-relaxed border-l-2 border-[#d4af37] pl-3">
				{isAr
				  ? 'مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد.'
				  : 'A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core.'}
			  </p>

			  {/* General Contact & Socials */}
			  <div className="space-y-4 pt-2">
				<a href="mailto:info@operix-solutions.com" className="flex items-center gap-2.5 text-[12px] font-mono text-slate-200 hover:text-[#d4af37] transition-colors">
				  <Mail size={14} className="text-[#d4af37]" /> info@operix-solutions.com
				</a>
				
				<div className="flex flex-wrap gap-2.5 pt-2">
				  {socials.map(({ href, Icon, bg, color, title }, idx) => (
					<a
					  key={idx}
					  href={href}
					  target="_blank"
					  rel="noreferrer"
					  title={title}
					  className={`w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${bg} ${color}`}
					>
					  <Icon />
					</a>
				  ))}
				</div>
			  </div>
			</div>

			{/* ── COLUMN 2: CORPORATE DIRECTORY ── */}
			<div className="lg:col-span-2 space-y-5">
			  <div>
				<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] mb-1.5">
				  {isAr ? 'دليل الشركة' : 'CORPORATE DIRECTORY'}
				</h4>
				<div className="w-6 h-[2px] bg-[#d4af37]/60" />
			  </div>
			  <ul className="space-y-2">
				{corpNav.map(({ to, label }) => (
				  <li key={to}>
					<Link to={to} className="group flex items-center gap-2 text-[12px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all">
					  <ChevronRight size={12} className="text-[#d4af37]/50 group-hover:text-[#d4af37]" />
					  {label}
					</Link>
				  </li>
				))}
			  </ul>
			</div>

			{/* ── IDEA #4: NEW GLOBAL PRESENCE COLUMN ── */}
			<div className="lg:col-span-3 space-y-5">
			  <div>
				<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] mb-1.5">
				  {isAr ? 'التواجد العالمي' : 'GLOBAL PRESENCE'}
				</h4>
				<div className="w-6 h-[2px] bg-[#d4af37]/60" />
			  </div>
			  
			  <div className="space-y-5 pt-1">
				{/* HQ */}
				<div className="group">
				  <div className="flex items-center gap-2 mb-1">
					<MapPin size={14} className="text-[#d4af37]" />
					<span className="text-[11px] font-bold text-white uppercase tracking-wider">{isAr ? 'المقر الرئيسي' : 'Headquarters'}</span>
				  </div>
				  <div className="pl-5 border-l border-white/10 ml-[6px] space-y-1">
					<p className="text-[11px] text-slate-400">Riyadh, Saudi Arabia</p>
					<a href="mailto:support@operix-solutions.com" className="text-[11px] font-mono text-slate-300 hover:text-[#d4af37] transition-colors block">support@operix-solutions.com</a>
					<a href="mailto:subscription@operix-solutions.com" className="text-[11px] font-mono text-slate-300 hover:text-[#d4af37] transition-colors block">subscription@operix-solutions.com</a>
				  </div>
				</div>

				{/* Sudan Office */}
				<div className="group">
				  <div className="flex items-center gap-2 mb-1">
					<MapPin size={14} className="text-[#d4af37]" />
					<span className="text-[11px] font-bold text-white uppercase tracking-wider">{isAr ? 'المكتب الإقليمي' : 'Regional Office'}</span>
				  </div>
				  <div className="pl-5 border-l border-white/10 ml-[6px] space-y-1">
					<p className="text-[11px] text-slate-400">Khartoum, Sudan</p>
					<a href="mailto:sudan.office@operix-solutions.com" className="text-[11px] font-mono text-slate-300 hover:text-[#d4af37] transition-colors block">sudan.office@operix-solutions.com</a>
				  </div>
				</div>
			  </div>
			</div>

			{/* ── COLUMN 4: LEGAL & STATUS ── */}
			<div className="lg:col-span-3 space-y-5">
			  <div>
				<h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] mb-1.5">
				  {isAr ? 'الإطار القانوني' : 'LEGAL FRAMEWORK'}
				</h4>
				<div className="w-6 h-[2px] bg-[#d4af37]/60" />
			  </div>
			  <ul className="space-y-2 mb-6">
				{legal.map(({ to, label }) => (
				  <li key={label}>
					<Link to={to} className="group flex items-center gap-2 text-[12px] font-medium text-slate-300 hover:text-white hover:translate-x-1 transition-all">
					  <Shield size={12} className="text-[#d4af37]/50 group-hover:text-[#d4af37]" />
					  {label}
					</Link>
				  </li>
				))}
			  </ul>

			  {/* Compliance badge */}
			  <div className="p-3 rounded-lg border border-[#d4af37]/30 bg-white/5 hover:bg-white/10 transition-colors cursor-default">
				<div className="flex items-center gap-2 mb-1">
				  <Shield size={12} className="text-[#d4af37]" />
				  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37]">ZATCA Verified</span>
				</div>
				<p className="text-[10px] text-slate-300 leading-snug">
				  {isAr ? 'متوافق مع المرحلة الثانية لهيئة الزكاة والدخل' : 'Phase 2 ZATCA e-invoicing compliant'}
				</p>
			  </div>

			  {/* System status pill */}
			  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#0d1826] border border-emerald-900/50 w-max shadow-inner">
				<span className="relative flex h-2.5 w-2.5 shrink-0">
				  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
				  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
				</span>
				<span className="text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-400">
				  {isAr ? 'جميع الأنظمة تعمل بكفاءة' : 'All Systems Operational'}
				</span>
			  </div>
			</div>

		  </div>
		</div>

		{/* ─── COPYRIGHT BAR ─── */}
		<div className="border-t border-white/10 bg-[#162232]">
		  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
			<p className="text-[11px] font-medium text-slate-400">
			  &copy; {new Date().getFullYear()} OPERIX Solutions. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
			</p>
			<div className="flex items-center gap-3">
			  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
				SECURE ENTERPRISE INFRASTRUCTURE
			  </span>
			  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
			  <Globe size={10} className="text-slate-400" />
			</div>
		  </div>
		</div>

	  </footer>
	</>
  );
}