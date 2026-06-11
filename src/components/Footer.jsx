import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { isAr } = useLanguage();
  const brandName = "OPERIX SOLUTIONS";

  return (
	<footer className="w-full bg-[#1e2d40] text-white pt-16 pb-12 font-sans mt-auto border-t border-slate-700">
	  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
		
		{/* Brand & Description */}
		<div className="space-y-4">
		  <div className="flex items-center gap-2">
			<img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain bg-white rounded-md p-1" />
			<span className="font-black tracking-tight text-lg uppercase text-white drop-shadow-sm">{brandName}</span>
		  </div>
		  <p className="text-xs text-slate-400 font-medium leading-relaxed pr-4">
			{isAr 
			  ? "مجموعة قيادة مؤسسية موحدة تنسق العمليات، المسارات الطبية، ودورات حياة رأس المال البشري في مركز تحكم واحد."
			  : "A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core."}
		  </p>
		  <div className="text-xs font-mono text-slate-400 pt-2">
			E: operixsolution@gmail.com
		  </div>
		</div>

		{/* Cloud Portals */}
		<div>
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "البوابات السحابية" : "CLOUD PORTALS"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-medium text-slate-300">
			<li><a href="https://operix-hris.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OPERIX HRIS</a></li>
			<li><a href="https://operix-operations.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OPERIX Operations</a></li>
			<li><a href="https://operix-care.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OPERIX Care HIS</a></li>
			<li><a href="https://operix-fmis.vercel.app" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">OPERIX FMIS</a></li>
		  </ul>
		</div>

		{/* Corporate Directory */}
		<div>
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "دليل الشركة" : "CORPORATE DIRECTORY"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-medium text-slate-300">
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
		<div>
		  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] drop-shadow-sm mb-5">
			{isAr ? "الإطار القانوني" : "LEGAL FRAMEWORK"}
		  </h4>
		  <ul className="space-y-3 m-0 p-0 list-none text-sm font-medium text-slate-300">
			<li><span className="hover:text-white transition-colors cursor-pointer">{isAr ? "الامتثال التنظيمي" : "Regulatory Compliance"}</span></li>
			<li><span className="hover:text-white transition-colors cursor-pointer">{isAr ? "شروط الخدمة" : "Terms of Service"}</span></li>
			<li><span className="hover:text-white transition-colors cursor-pointer">{isAr ? "الخصوصية وسيادة البيانات" : "Privacy & Data Sovereignty"}</span></li>
		  </ul>
		</div>

	  </div>
	</footer>
  );
}