import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabaseClient as supabase } from '../config/supabase';

export default function Clients() {
  const { isAr } = useLanguage();
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Clients from Supabase CMS
  useEffect(() => {
	async function fetchClients() {
	  try {
		const { data, error } = await supabase
		  .from('operix_cms_content')
		  .select('*')
		  .eq('page', 'clients') 
		  .order('updated_at', { ascending: true }); 

		if (error) throw error;
		if (data) setClientsData(data);
	  } catch (error) {
		console.error("Error loading clients:", error);
	  } finally {
		setLoading(false);
	  }
	}

	fetchClients();
  }, []);

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

		{loading ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			{isAr ? "جاري تحميل بيانات الشركاء..." : "Loading corporate partners..."}
		  </div>
		) : clientsData.length === 0 ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			{isAr ? "لا يوجد شركاء مسجلين حالياً." : "No partners registered yet."}
		  </div>
		) : (
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{clientsData.map((client) => (
			  <div key={client.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 group flex flex-col">
				
				{/* FIXED: Changed to bg-white and added a subtle bottom border separator */}
				<div className="h-48 bg-white border-b border-slate-100 relative overflow-hidden flex items-center justify-center p-8">
				  <img 
					src={client.media_url || '/placeholder.png'} 
					alt={isAr ? client.title_ar : client.title_en} 
					className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500" 
					onError={(e) => { 
					  e.target.style.display = 'none'; 
					  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-400 font-black tracking-widest uppercase">LOGO</div>'; 
					}}
				  />
				  {/* Adjusted overlay to be a very light, subtle slate gradient instead of dark navy */}
				  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/60 to-transparent pointer-events-none"></div>
				</div>

				<div className="p-8 flex flex-col flex-grow relative bg-white">
				  <div className="absolute top-0 right-8 -translate-y-1/2 w-10 h-1.5 bg-[#d4af37] rounded-full shadow-sm"></div>
				  
				  {/* Dynamic Name */}
				  <h3 className="text-xl font-black mb-2 bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? client.title_ar : client.title_en}
				  </h3>
				  
				  {/* Dynamic Contract Details */}
				  <p className="text-xs text-slate-500 font-bold leading-relaxed uppercase tracking-wider" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? client.body_ar : client.body_en}
				  </p>
				</div>
				
			  </div>
			))}
		  </div>
		)}

	  </div>
	</div>
  );
}