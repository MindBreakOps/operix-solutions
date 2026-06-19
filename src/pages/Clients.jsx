import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { supabaseClient as supabase } from '../config/supabase';

export default function Clients() {
  const { isAr } = useLanguage();
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to track which card is tapped on mobile/touch screens
  const [activeCard, setActiveCard] = useState(null);

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
	<div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-12">
	  
	  <style>{`
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(24px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes shimmerGold {
		  0% { background-position: -200% center; }
		  100% { background-position: 200% center; }
		}
		.premium-gold-text {
		  background: linear-gradient(to right, #c5a059 0%, #f3de9a 40%, #c5a059 80%);
		  background-size: 200% auto;
		  color: transparent;
		  -webkit-background-clip: text;
		  background-clip: text;
		  animation: shimmerGold 5s linear infinite;
		}
	  `}</style>

	  {/* ─── HERO HEADER ─── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-slate-700 py-20 px-6">
		
		{/* Subtle Background Glow */}
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af3715 0%, transparent 70%)' }} />

		<div
		  style={{
			animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
		  }}
		  className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
		>
		  <span
			style={{ animation: 'fadeSlideUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both' }}
			className="inline-block text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20"
		  >
			{isAr ? "الشبكة الاستراتيجية" : "Strategic Network"}
		  </span>
		  <h1
			style={{ animation: 'fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight premium-gold-text drop-shadow-lg font-serif"
		  >
			{isAr ? "شركاء النجاح والمنظومات" : "Clients & Corporate Partners"}
		  </h1>
		  <p
			style={{ animation: 'fadeSlideUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-[#e5d0a1] text-sm md:text-base font-medium opacity-90 max-w-2xl mx-auto"
		  >
			{isAr 
			  ? "ندير البنية التحتية الرقمية لأكبر الكيانات الاقتصادية والمنشآت المرموقة في المنطقة." 
			  : "Empowering industry leaders across the region with customized enterprise architecture solutions."}
		  </p>
		</div>
	  </div>

	  <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 space-y-16">
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
			{clientsData.map((client) => {
			  const isActive = activeCard === client.id;
			  
			  return (
				<div 
				  key={client.id} 
				  // TOUCH FIX: Toggle active state on click/tap
				  onClick={() => setActiveCard(isActive ? null : client.id)}
				  className={`bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 group cursor-pointer ${
					isActive 
					  ? 'shadow-xl border-[#d4af37]/40 -translate-y-1' // Active/Touched State
					  : 'border-slate-200 shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 hover:-translate-y-1' // Default + Desktop Hover State
				  }`}
				>
				  
				  {/* Clean Logo Container */}
				  <div className="h-40 bg-slate-50/50 flex items-center justify-center p-8 border-b border-slate-100 relative">
					{/* Subtle Gold Glow */}
					<div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#d4af37]/5 transition-opacity duration-500 pointer-events-none ${
					  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
					}`}></div>

					<img 
					  src={client.media_url || '/placeholder.png'} 
					  alt={isAr ? client.title_ar : client.title_en} 
					  /* TOUCH FIX: Conditional classes for Grayscale/Color */
					  className={`w-full h-full object-contain transition-all duration-500 relative z-10 ${
						isActive 
						  ? 'grayscale-0 opacity-100 scale-110' // Popped color state
						  : 'filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110' // Desktop hover state
					  }`} 
					  onError={(e) => { 
						e.target.style.display = 'none'; 
						e.target.parentElement.innerHTML = '<div class="text-slate-400 font-black tracking-widest uppercase text-xs z-10 relative">LOGO</div>'; 
					  }}
					/>
				  </div>

				  {/* Content Area */}
				  <div className="p-6 flex flex-col flex-grow bg-white text-center justify-center">
					<h3 
					  className={`text-lg font-black mb-1.5 transition-colors ${
						isActive ? 'text-[#d4af37]' : 'text-[#1e2d40] group-hover:text-[#d4af37]'
					  }`} 
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
			  );
			})}
		  </div>
		)}
	  </div>
	</div>
  );
}