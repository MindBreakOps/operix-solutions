import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  Mail, MapPin, MessageCircle, Phone, AtSign,
  Users, Settings, Stethoscope, FileCheck,
  Globe, Shield, ChevronRight
} from 'lucide-react';


const YTIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
	<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
	<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);
// ─── Social icon: X / Twitter ───
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

  const portals = [
	{ href: 'https://www.hris.operix-solutions.online',       Icon: Users,       label: 'OPERIX HRIS',       sub: isAr ? 'إدارة الموارد البشرية' : 'Human Capital' },
	{ href: 'https://www.operations.operix-solutions.online', Icon: Settings,    label: 'OPERIX Operations', sub: isAr ? 'إدارة العمليات'        : 'Fleet & Workforce' },
	{ href: 'https://www.care.operix-solutions.online',       Icon: Stethoscope, label: 'OPERIX Care HIS',   sub: isAr ? 'الرعاية الصحية'         : 'Clinical Suite' },
	{ href: 'https://www.fmis.operix-solutions.online',       Icon: FileCheck,   label: 'OPERIX FMIS',       sub: isAr ? 'الإدارة المالية'         : 'Finance & Ledger' },
  ];

  const corpNav = [
	{ to: '/',           label: isAr ? 'الرئيسية'              : 'Home' },
	{ to: '/about',      label: isAr ? 'من نحن'                : 'About Us' },
	{ to: '/services',   label: isAr ? 'خدماتنا'               : 'Our Services' },
	{ to: '/vision',     label: isAr ? 'رؤيتنا'                 : 'Our Vision'},
	{ to: '/products',   label: isAr ? 'منتجاتنا'               : 'Our Products' },
	{ to: '/clients',    label: isAr ? 'العملاء والشركاء'      : 'Clients & Partners' },
	{ to: '/news',       label: isAr ? 'الأخبار'               : 'News' },
	{ to: '/contact',    label: isAr ? 'اتصل بنا'              : 'Contact' },
  ];

  const legal = [
	{ to: '/legal', label: isAr ? 'الامتثال التنظيمي' : 'Regulatory Compliance' },
	{ to: '/legal', label: isAr ? 'شروط الخدمة'        : 'Terms of Service' },
	{ to: '/legal', label: isAr ? 'سياسة الخصوصية'     : 'Privacy Policy' },
	{ to: '/legal', label: isAr ? 'اتفاقية SLA'         : 'SLA Agreement' },
  ];

  const contacts = [
	{ email: 'info@operix-solutions.com',         loc: 'Riyadh, SA',      label: isAr ? 'المقر الرئيسي'   : 'Headquarters' },
	{ email: 'support@operix-solutions.com',      loc: 'Riyadh, SA',      label: isAr ? 'الدعم التقني'    : 'Technical Support' },
	{ email: 'subscription@operix-solutions.com', loc: 'Riyadh, SA',      label: isAr ? 'الاشتراكات'      : 'Subscriptions' },
	{ email: 'sudan.office@operix-solutions.com', loc: 'Khartoum, Sudan', label: isAr ? 'المكتب السوداني' : 'Sudan Office' },
  ];

  // Added YouTube with official #FF0000 brand color
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
	<footer className={`w-full ${isAr ? "font-['Arial','Tahoma','Helvetica',sans-serif]" : "font-sans"}`} style={{ background: 'linear-gradient(180deg, #0d1826 0%, #0a1118 100%)' }}>

	  {/* ─── GOLD RULE ─── */}
	  <div className="w-full h-[2px]" style={{ background: 'linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%)' }} />

	  {/* ─── CLOUD PORTALS MARQUEE STRIP ─── */}
	  <div className="w-full border-b border-white/5 bg-[#0a1118]">
		<div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex flex-wrap items-center gap-6 justify-center lg:justify-between">
		  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#d4af37]/80 shrink-0">
			{isAr ? 'البوابات السحابية المباشرة' : 'Live Cloud Portals'}
		  </span>
		  <div className="flex flex-wrap items-center gap-2">
			{portals.map(({ href, Icon, label, sub }) => (
			  <a
				key={href}
				href={href}
				target="_blank"
				rel="noreferrer"
				className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/4 border border-white/8 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/6 transition-all duration-200"
			  >
				<Icon size={12} className="text-[#d4af37]/80 group-hover:text-[#d4af37] transition-colors shrink-0" />
				<span className="text-[10px] font-bold text-slate-200 group-hover:text-white tracking-wide transition-colors whitespace-nowrap">{label}</span>
			  </a>
			))}
		  </div>
		</div>
	  </div>

	  {/* ─── MAIN FOOTER GRID ─── */}
	  <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-10">
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

		  {/* ── BRAND COLUMN ── */}
		  <div className="lg:col-span-4 space-y-6 lg:pr-8">
			{/* Logo lockup */}
			<div className="flex items-center gap-3">
			  <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0">
				<img src="/logo.png" alt="OPERIX" className="w-6 h-6 object-contain" />
			  </div>
			  <div className="flex flex-col leading-none">
				<span className="text-[14px] font-black tracking-[0.15em] text-white uppercase">OPERIX</span>
				<span className="text-[9px] font-bold tracking-[0.4em] text-[#d4af37] uppercase mt-0.5">SOLUTIONS</span>
			  </div>
			</div>

			<p className="text-[12px] text-slate-200 leading-relaxed border-l-2 border-[#d4af37]/50 pl-3">
			  {isAr
				? 'مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد.'
				: 'A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core.'}
			</p>

			{/* Contact entries */}
			<div className="space-y-3.5">
			  {contacts.map(({ email, loc, label }) => (
				<div key={email} className="group">
				  <div className="flex items-center gap-1.5 mb-0.5">
					<span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#d4af37]/80">{label}</span>
				  </div>
				  <a
					href={`mailto:${email}`}
					className="flex items-center gap-2 text-[11px] font-mono text-slate-100 hover:text-[#d4af37] transition-colors group-hover:tracking-wide"
				  >
					<Mail size={12} className="text-[#d4af37]/80 shrink-0" />
					{email}
				  </a>
				  <div className="flex items-center gap-1.5 mt-0.5 pl-5">
					<MapPin size={9} className="text-slate-400" />
					<span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{loc}</span>
				  </div>
				</div>
			  ))}
			</div>
		  </div>

		  {/* ── CORPORATE DIRECTORY ── */}
		  <div className="lg:col-span-2 space-y-4">
			<div>
			  <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4af37] mb-1">
				{isAr ? 'دليل الشركة' : 'CORPORATE DIRECTORY'}
			  </h4>
			  <div className="w-6 h-[1.5px] bg-[#d4af37]/60" />
			</div>
			<ul className="space-y-1.5">
			  {corpNav.map(({ to, label }) => (
				<li key={to}>
				  <Link
					to={to}
					className="group flex items-center gap-2 text-[12px] font-medium text-slate-200 hover:text-white transition-colors py-0.5"
				  >
					<ChevronRight size={10} className="text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors shrink-0" />
					{label}
				  </Link>
				</li>
			  ))}
			</ul>
		  </div>

		  {/* ── LEGAL FRAMEWORK ── */}
		  <div className="lg:col-span-2 space-y-4">
			<div>
			  <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4af37] mb-1">
				{isAr ? 'الإطار القانوني' : 'LEGAL FRAMEWORK'}
			  </h4>
			  <div className="w-6 h-[1.5px] bg-[#d4af37]/60" />
			</div>
			<ul className="space-y-1.5">
			  {legal.map(({ to, label }) => (
				<li key={label}>
				  <Link
					to={to}
					className="group flex items-center gap-2 text-[12px] font-medium text-slate-200 hover:text-white transition-colors py-0.5"
				  >
					<Shield size={10} className="text-[#d4af37]/50 group-hover:text-[#d4af37] transition-colors shrink-0" />
					{label}
				  </Link>
				</li>
			  ))}
			</ul>

			{/* Compliance badge */}
			<div className="mt-4 p-3 rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10">
			  <div className="flex items-center gap-2 mb-1">
				<Shield size={11} className="text-[#d4af37]" />
				<span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37]">ZATCA Verified</span>
			  </div>
			  <p className="text-[9px] text-slate-300 leading-snug">
				{isAr ? 'متوافق مع المرحلة الثانية لهيئة الزكاة والدخل' : 'Phase 2 ZATCA e-invoicing compliant'}
			  </p>
			</div>
		  </div>

		  {/* ── SOCIAL CONNECT ── */}
		  <div className="lg:col-span-4 space-y-4">
			<div>
			  <h4 className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4af37] mb-1">
				{isAr ? 'التواصل الاجتماعي' : 'SOCIAL CONNECT'}
			  </h4>
			  <div className="w-6 h-[1.5px] bg-[#d4af37]/60" />
			</div>

			<div className="flex flex-wrap gap-3">
			  {socials.map(({ href, Icon, bg, color, title }, idx) => (
				<a
				  key={idx}
				  href={href}
				  target="_blank"
				  rel="noreferrer"
				  title={title}
				  className={`w-10 h-10 flex items-center justify-center rounded-xl shadow-lg hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${bg} ${color}`}
				>
				  <Icon />
				</a>
			  ))}
			</div>

			{/* System status pill */}
			<div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-900/40 border border-emerald-800/50 w-max">
			  <span className="relative flex h-2 w-2 shrink-0">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
				<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
			  </span>
			  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">
				{isAr ? 'جميع الأنظمة تعمل' : 'All Systems Operational'}
			  </span>
			</div>
		  </div>

		</div>
	  </div>

	  {/* ─── COPYRIGHT BAR ─── */}
	  <div className="border-t border-white/10">
		<div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
		  <p className="text-[10px] font-medium text-slate-400">
			&copy; {new Date().getFullYear()} OPERIX Solutions.{' '}
			{isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
		  </p>
		  <div className="flex items-center gap-3">
			<span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
			  SECURE ENTERPRISE INFRASTRUCTURE
			</span>
			<span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
			<Globe size={10} className="text-slate-400" />
		  </div>
		</div>
	  </div>

	</footer>
  );
}