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
		
		{/* HEADER */}
		<div className="text-center space-y-4">
		  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 shadow-sm mb-2">
			{isAr ? "الشبكة الاستراتيجية" : "Strategic Network"}
		  </span>
		  <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "شركاء النجاح والمنظومات" : "Clients & Corporate Partners"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
			{isAr 
			  ? "ندير البنية التحتية الرقمية لأكبر الكيانات الاقتصادية والمنشآت المرموقة في المنطقة." 
			  : "Empowering industry leaders across the region with customized enterprise architecture solutions."}
		  </p>
		</div>

		{/* LOADING & EMPTY STATES */}
		{loading ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			{isAr ? "جاري تحميل بيانات الشركاء..." : "Loading corporate partners..."}
		  </div>
		) : clientsData.length === 0 ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10 border border-dashed border-slate-200 rounded-3xl bg-white">
			{isAr ? "لا يوجد شركاء مسجلين حالياً." : "No partners registered yet."}
		  </div>
		) : (
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
			
			{/* PRO UI GRID */}
			{clientsData.map((client) => (
			  <div 
				key={client.id} 
				className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 transition-all duration-300 group flex flex-col hover:-translate-y-1"
			  >
				
				{/* Clean Logo Container */}
				<div className="h-40 bg-slate-50/50 flex items-center justify-center p-8 border-b border-slate-100 relative">
				  {/* Subtle Gold Glow on Hover */}
				  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#d4af37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

				  <img 
					src={client.media_url || '/placeholder.png'} 
					alt={isAr ? client.title_ar : client.title_en} 
					/* THE MAGIC FIX: Grayscale default, color on hover, no weird film overlays */
					className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 relative z-10" 
					onError={(e) => { 
					  e.target.style.display = 'none'; 
					  e.target.parentElement.innerHTML = '<div class="text-slate-400 font-black tracking-widest uppercase text-xs z-10 relative">LOGO</div>'; 
					}}
				  />
				</div>

				{/* Content Area */}
				<div className="p-6 flex flex-col flex-grow bg-white text-center justify-center">
				  <h3 
					className="text-lg font-black mb-1.5 text-[#1e2d40] group-hover:text-[#d4af37] transition-colors" 
					style={{ direction: isAr ? 'rtl' : 'ltr' }}
				  >
					{isAr ? client.title_ar : client.title_en}
				  </h3>
				  
				  <p 
					className="text-[11px] text-slate-500 font-bold leading-relaxed uppercase tracking-wider" 
					style={{ direction: isAr ? 'rtl' : 'ltr' }}
				  >
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