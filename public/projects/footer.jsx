import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone, AtSign, Users, Settings, Stethoscope, FileCheck } from 'lucide-react';

export default function Footer() {
  const { isAr } = useLanguage();
  const brandName = "OPERIX SOLUTIONS";

  return (
	<footer className="w-full bg-[#1e2d40] text-white pt-12 pb-6 font-sans mt-auto border-t border-slate-700">
	  {/* Boxed to max-w-6xl to match the rest of the site */}
	  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
		
		{/* Brand & Description */}
		<div className="space-y-4 lg:col-span-4 pr-0 lg:pr-6">
		  <div className="flex items-center gap-2">
			<img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain bg-white rounded-md p-1" />
			<span className="font-bold tracking-tight text-sm uppercase text-white">{brandName}</span>
		  </div>
		  
		  <p className="text-xs text-slate-300 leading-relaxed">
			{isAr 
			  ? "مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد."
			  : "A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core."}
		  </p>
		
		  <div className="space-y-3 pt-2">
			<div className="space-y-1">
			  <a href="mailto:info@operix-solutions.com" className="flex items-center gap-2 text-xs text-white hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> info@operix-solutions.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Riyadh, SA
			  </div>
			</div>

			{/* NEW: Support Email */}
			<div className="space-y-1">
			  <a href="mailto:support@operix-solutions.com" className="flex items-center gap-2 text-xs text-white hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> support@operix-solutions.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Riyadh, SA
			  </div>
			</div>

			<div className="space-y-1">
			  <a href="mailto:subscription@operix-solutions.com" className="flex items-center gap-2 text-xs text-white hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> subscription@operix-solutions.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Riyadh, SA
			  </div>
			</div>
		
			<div className="space-y-1">
			  <a href="mailto:sudan.office@operix-solutions.com" className="flex items-center gap-2 text-xs text-white hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> sudan.office@operix-solutions.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Khartoum, Sudan
			  </div>
			</div>
		  </div>
		</div>

		{/* Cloud Portals */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4">
			{isAr ? "البوابات السحابية" : "CLOUD PORTALS"}
		  </h4>
		  <ul className="space-y-3 text-sm text-slate-300">
			<li>
			  <a href="https://www.hris.operix-solutions.online" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<Users size={14} className="text-slate-400" /> OPERIX HRIS
			  </a>
			</li>
			<li>
			  <a href="https://www.operations.operix-solutions.online" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<Settings size={14} className="text-slate-400" /> OPERIX Operations
			  </a>
			</li>
			<li>
			  <a href="https://www.care.operix-solutions.online" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<Stethoscope size={14} className="text-slate-400" /> OPERIX Care HIS
			  </a>
			</li>
			<li>
			  <a href="https://www.fmis.operix-solutions.online" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<FileCheck size={14} className="text-slate-400" /> OPERIX FMIS
			  </a>
			</li>
		  </ul>
		</div>

		{/* Corporate Directory */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4">
			{isAr ? "دليل الشركة" : "CORPORATE DIRECTORY"}
		  </h4>
		  <ul className="space-y-2 text-sm text-slate-300">
			<li><Link to="/" className="hover:text-white transition-colors">{isAr ? "الرئيسية" : "Home"}</Link></li>
			<li><Link to="/about" className="hover:text-white transition-colors">{isAr ? "من نحن" : "About Us"}</Link></li>
			<li><Link to="/services" className="hover:text-white transition-colors">{isAr ? "خدماتنا" : "Our Services"}</Link></li>
			<li><Link to="/projects" className="hover:text-white transition-colors">{isAr ? "المشاريع والعمليات" : "Projects & Operations"}</Link></li>
			<li><Link to="/clients" className="hover:text-white transition-colors">{isAr ? "العملاء والشركاء" : "Clients & Partners"}</Link></li>
			<li><Link to="/news" className="hover:text-white transition-colors">{isAr ? "الأخبار" : "News"}</Link></li>
			<li><Link to="/contact" className="hover:text-white transition-colors">{isAr ? "اتصل بنا" : "Contact"}</Link></li>
		  </ul>
		</div>

		{/* Legal Framework */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4">
			{isAr ? "الإطار القانوني" : "LEGAL FRAMEWORK"}
		  </h4>
		  <ul className="space-y-2 text-sm text-slate-300">
			<li><Link to="/legal" className="hover:text-white transition-colors">{isAr ? "الامتثال التنظيمي" : "Regulatory Compliance"}</Link></li>
			<li><Link to="/legal" className="hover:text-white transition-colors">{isAr ? "شروط الخدمة" : "Terms of Service"}</Link></li>
			<li><Link to="/legal" className="hover:text-white transition-colors">{isAr ? "الخصوصية" : "Privacy Policy"}</Link></li>
		  </ul>
		</div>

		{/* Social Connect */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-4">
			{isAr ? "التواصل الاجتماعي" : "SOCIAL CONNECT"}
		  </h4>
		  <ul className="space-y-3 text-sm text-slate-300">
			<li>
			  <a href="https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
				<MessageCircle size={14} /> {isAr ? "قناة الواتساب" : "WA Channel"}
			  </a>
			</li>
			<li>
			  <a href="https://wa.me/966500823643" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
				<Phone size={14} /> {isAr ? "واتساب الأعمال" : "WA Business"}
			  </a>
			</li>
			<li>
			  <a href="https://x.com/operixsolutions?s=11" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
				{isAr ? "إكس (تويتر)" : "X (Twitter)"}
			  </a>
			</li>
			<li>
			  <a href="https://www.facebook.com/share/1BoQkRsiJB/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				{isAr ? "فيسبوك" : "Facebook"}
			  </a>
			</li>
			<li>
			  <a href="https://www.facebook.com/share/1BoQkRsiJB/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E4405F] transition-colors">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
				{isAr ? "إنستغرام" : "Instagram"}
			  </a>
			</li>
			<li>
			  <a href="https://www.threads.com/@operix.solutions?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<AtSign size={14} /> {isAr ? "ثريدز" : "Threads"}
			  </a>
			</li>
		  </ul>
		</div>

	  </div>

	  {/* ─── COPYRIGHT BAR ─── */}
	  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
		<p>
		  &copy; {new Date().getFullYear()} OPERIX Solutions. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}
		</p>
		<p className="font-mono opacity-60">
		  SECURE ENTERPRISE INFRASTRUCTURE
		</p>
	  </div>
	  
	</footer>
  );
}