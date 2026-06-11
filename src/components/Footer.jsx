import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone, AtSign } from 'lucide-react';

export default function Footer() {
  const { isAr } = useLanguage();
  const brandName = "OPERIX SOLUTIONS";

  return (
	<footer className="w-full bg-[#1e2d40] text-white pt-16 pb-12 font-sans mt-auto border-t border-slate-700">
	  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6">
		
		{/* Brand & Description */}
		<div className="space-y-4 lg:col-span-4 pr-0 lg:pr-6">
		  <div className="flex items-center gap-2">
			<img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-md p-1" />
			<span className="font-black tracking-tight text-lg uppercase text-white drop-shadow-sm">{brandName}</span>
		  </div>
		  
		  <p className="text-xs text-slate-300 font-bold leading-relaxed">
			{isAr 
			  ? "مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد."
			  : "A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core."}
		  </p>
		
		  {/* Organized Contact Block */}
		  <div className="space-y-3 pt-4">
			<div className="space-y-1">
			  <a href="mailto:operixsolution@gmail.com" className="flex items-center gap-2 text-xs text-white font-bold hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> operixsolution@gmail.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Riyadh, SA
			  </div>
			</div>
		
			<div className="space-y-1">
			  <a href="mailto:operix249@gmail.com" className="flex items-center gap-2 text-xs text-white font-bold hover:text-[#d4af37] transition-colors font-mono">
				<Mail size={14} className="text-[#d4af37]" /> operix249@gmail.com
			  </a>
			  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-black uppercase tracking-wider pl-6">
				<MapPin size={12} className="text-slate-500" /> Khartoum, Sudan
			  </div>
			</div>
		  </div>
		</div>

		{/* Cloud Portals */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "البوابات السحابية" : "CLOUD PORTALS"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-bold text-slate-200">
			<li><a href="https://operix-hris.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">OPERIX HRIS</a></li>
			<li><a href="https://operix-operations.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">OPERIX Operations</a></li>
			<li><a href="https://operix-care.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">OPERIX Care HIS</a></li>
			<li><a href="https://operix-fmis.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white hover:underline transition-colors">OPERIX FMIS</a></li>
		  </ul>
		</div>

		{/* Corporate Directory */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "دليل الشركة" : "CORPORATE DIRECTORY"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-bold text-slate-200">
			<li><Link to="/" className="hover:text-white hover:underline transition-colors">{isAr ? "الرئيسية" : "Home"}</Link></li>
			<li><Link to="/about" className="hover:text-white hover:underline transition-colors">{isAr ? "من نحن" : "About Us"}</Link></li>
			<li><Link to="/services" className="hover:text-white hover:underline transition-colors">{isAr ? "خدماتنا" : "Our Services"}</Link></li>
			<li><Link to="/projects" className="hover:text-white hover:underline transition-colors">{isAr ? "المشاريع والعمليات" : "Projects & Operations"}</Link></li>
			<li><Link to="/clients" className="hover:text-white hover:underline transition-colors">{isAr ? "العملاء والشركاء" : "Clients & Partners"}</Link></li>
			<li><Link to="/news" className="hover:text-white hover:underline transition-colors">{isAr ? "الأخبار" : "News"}</Link></li>
			<li><Link to="/contact" className="hover:text-white hover:underline transition-colors">{isAr ? "اتصل بنا" : "Contact"}</Link></li>
		  </ul>
		</div>

		{/* Legal Framework */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "الإطار القانوني" : "LEGAL FRAMEWORK"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-bold text-slate-200">
			<li><Link to="/legal" className="hover:text-white hover:underline transition-colors">{isAr ? "الامتثال التنظيمي" : "Regulatory Compliance"}</Link></li>
			<li><Link to="/legal" className="hover:text-white hover:underline transition-colors">{isAr ? "شروط الخدمة" : "Terms of Service"}</Link></li>
			<li><Link to="/legal" className="hover:text-white hover:underline transition-colors">{isAr ? "الخصوصية وسيادة البيانات" : "Privacy & Data Sovereignty"}</Link></li>
		  </ul>
		</div>

		{/* Social Network & Contacts */}
		<div className="lg:col-span-2">
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "التواصل الاجتماعي" : "SOCIAL CONNECT"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-bold text-slate-200">
			<li>
			  <a href="https://whatsapp.com/channel/0029VbCjmxEChq6KQEBPiX1C" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
				<MessageCircle size={16} /> {isAr ? "قناة الواتساب" : "WA Channel"}
			  </a>
			</li>
			<li>
			  <a href="https://wa.me/966500823643" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
				<Phone size={16} /> {isAr ? "واتساب الأعمال" : "WA Business"}
			  </a>
			</li>
			<li>
			  <a href="https://www.facebook.com/share/1BoQkRsiJB/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors">
				{/* Custom Facebook SVG replacement */}
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				{isAr ? "فيسبوك" : "Facebook"}
			  </a>
			</li>
			<li>
			  <a href="https://www.facebook.com/share/1BoQkRsiJB/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E4405F] transition-colors">
				{/* Custom Instagram SVG replacement */}
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
				{isAr ? "إنستغرام" : "Instagram"}
			  </a>
			</li>
			<li>
			  <a href="https://www.threads.com/@operix.solutions?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
				<AtSign size={16} /> {isAr ? "ثريدز" : "Threads"}
			  </a>
			</li>
		  </ul>
		</div>

	  </div>
	</footer>
  );
}