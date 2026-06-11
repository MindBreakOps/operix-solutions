import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Loader2 } from 'lucide-react';

export default function Services() {
  const { isAr } = useLanguage();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	async function fetchServices() {
	  const { data, error } = await supabase
		.from('operix_cms_content')
		.select('*')
		.eq('page', 'services');

	  if (!error && data) {
		setServicesData(data);
	  }
	  setLoading(false);
	}
	
	fetchServices();
  }, []);

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-20 px-6 font-sans">
	  <div className="max-w-7xl mx-auto space-y-16">
		
		<div className="text-center space-y-4 max-w-3xl mx-auto">
		  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-md inline-block shadow-sm">
			{isAr ? "الحلول التشغيلية" : "ENTERPRISE SOLUTIONS"}
		  </span>
		  {/* Navy to Gold Gradient Header */}
		  <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "خدمات المنظومة الرقمية" : "Our Ecosystem Offerings"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium">
			{isAr 
			  ? "حلول تشغيلية فورية متكاملة ومصممة خصيصاً لإدارة عملياتك بذكاء." 
			  : "Real-time infrastructure architectures built to manage corporate deployment modules seamlessly."}
		  </p>
		</div>

		{loading ? (
		  <div className="flex flex-col items-center justify-center py-24 text-[#d4af37]">
			<Loader2 size={40} className="animate-spin mb-4" />
			<p className="text-xs font-black uppercase tracking-widest text-[#1e2d40]">
			  {isAr ? "جاري تحميل المنظومة..." : "Loading Ecosystem Profile..."}
			</p>
		  </div>
		) : (
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{servicesData.map((service) => (
			  <div key={service.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 group flex flex-col">
				<div className="h-56 bg-[#1e2d40] relative overflow-hidden">
				  {service.media_url ? (
					<img 
					  src={service.media_url} 
					  alt={isAr ? service.title_ar : service.title_en} 
					  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
					  loading="lazy"
					/>
				  ) : (
					<div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
					  <span className="text-[10px] font-black uppercase tracking-widest">No Media</span>
					</div>
				  )}
				  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d40]/90 to-transparent opacity-50"></div>
				</div>
				<div className="p-8 flex flex-col flex-grow relative bg-white">
				  <div className="absolute top-0 right-8 -translate-y-1/2 w-10 h-1.5 bg-[#d4af37] rounded-full shadow-sm"></div>
				  <h3 className="text-xl font-black mb-3 font-serif leading-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
					{isAr ? service.title_ar : service.title_en}
				  </h3>
				  <p className="text-sm text-slate-500 font-medium leading-relaxed flex-grow">
					{isAr ? service.body_ar : service.body_en}
				  </p>
				</div>
			  </div>
			))}
		  </div>
		)}
		
		{!loading && servicesData.length === 0 && (
		  <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
			<p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
			  {isAr ? "لا توجد خدمات متاحة حالياً." : "No active services currently deployed."}
			</p>
		  </div>
		)}

	  </div>
	</div>
  );
}