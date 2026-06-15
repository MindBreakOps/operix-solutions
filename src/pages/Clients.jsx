import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Clients() {
  const { isAr } = useLanguage();

  const clientsData = [
	{
	  id: 1,
	  name: isAr ? "مدينة النسيم" : "Naseem City",
	  contractDetails: isAr ? "إدارة مجتمعية ذكية وصيانة مرافق" : "Smart Community Hub & Facility Maintenance",
	  logoUrl: "/projects/naseem.png"
	},
	{
	  id: 2,
	  name: isAr ? "مؤسسة مامي" : "Mamey Enterprise",
	  contractDetails: isAr ? "تجارة عامة واستثمار ولوجستيات" : "General Trading, Investment & Logistics",
	  logoUrl: "/projects/mamey.png" 
	},
	{
	  id: 3,
	  name: isAr ? "مركز عبدالله بن عباس" : "Abdullah Bin Abbas Center",
	  contractDetails: isAr ? "إدارة مؤسسية وأرشفة رقمية" : "Institutional Management & Digital Archiving",
	  logoUrl: "/projects/abbas.png"
	},
	{
	  id: 4,
	  name: isAr ? "Mind Break Cafe" : "VIP VALET SERVICE",
	  contractDetails: isAr ? "خدمة صف سيارات وادارة مواقف ذكية" : "VIP VALET SERVICE and Parking System ANPR",
	  logoUrl: "/projects/valet.png"
	}
  ];

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-20 px-4 md:px-6 font-sans">
	  <div className="max-w-6xl mx-auto space-y-16">
		
		<div className="text-center space-y-4">
		  {/* Navy to Gold Gradient Header */}
		  <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "شركاء النجاح والمنظومات" : "Clients & Corporate Partners"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium">
			{isAr 
			  ? "ندير البنية التحتية الرقمية لأكبر الكيانات الاقتصادية والمنشآت." 
			  : "Empowering industry leaders across the region with customized architecture solutions."}
		  </p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
		  {clientsData.map((client) => (
			<div key={client.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 group flex flex-col">
			  
			  {/* FIXED: Changed to object-contain, added padding (p-8), and set flex center */}
			  <div className="h-48 bg-[#1e2d40] relative overflow-hidden flex items-center justify-center p-8">
				<img 
				  src={client.logoUrl} 
				  alt={client.name} 
				  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500" 
				  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500 font-black tracking-widest uppercase">LOGO</div>'; }}
				/>
				{/* Gradient overlay kept for texture, but set to pointer-events-none so it doesn't block the image */}
				<div className="absolute inset-0 bg-gradient-to-t from-[#1e2d40]/40 to-transparent opacity-60 pointer-events-none"></div>
			  </div>

			  <div className="p-8 flex flex-col flex-grow relative bg-white">
				<div className="absolute top-0 right-8 -translate-y-1/2 w-10 h-1.5 bg-[#d4af37] rounded-full shadow-sm"></div>
				<h3 className="text-xl font-black mb-2 bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">{client.name}</h3>
				<p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-wider">{client.contractDetails}</p>
			  </div>
			  
			</div>
		  ))}
		</div>

	  </div>
	</div>
  );
}