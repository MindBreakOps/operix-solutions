import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Loader2, ArrowUpRight, X } from 'lucide-react';

export default function Services() {
  const { isAr } = useLanguage();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State to control the informative pop-up modal
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
	async function fetchServices() {
	  const { data, error } = await supabase
		.from('operix_cms_content')
		.select('*')
		.eq('page', 'services')
		.order('updated_at', { ascending: false });

	  if (!error && data) {
		setServicesData(data);
	  }
	  setLoading(false);
	}
	
	fetchServices();
  }, []);

  // SMART DETECTOR: Is this a video or an image?
  const isVideoUrl = (url) => {
	if (!url) return false;
	return (
	  url.includes('youtube.com') || 
	  url.includes('youtu.be') || 
	  url.includes('/preview') || 
	  url.match(/\.(mp4|webm|ogg)$/i)
	);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
	if (selectedService) {
	  document.body.style.overflow = 'hidden';
	} else {
	  document.body.style.overflow = 'unset';
	}
	return () => { document.body.style.overflow = 'unset'; };
  }, [selectedService]);

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
		  style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}
		  className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
		>
		  <span
			style={{ animation: 'fadeSlideUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both' }}
			className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 shadow-sm"
		  >
			{isAr ? "الحلول التشغيلية" : "ENTERPRISE SOLUTIONS"}
		  </span>
		  <h1
			style={{ animation: 'fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight premium-gold-text drop-shadow-lg pb-2"
		  >
			{isAr ? "خدمات المنظومة الرقمية" : "Our Ecosystem Offerings"}
		  </h1>
		  <p
			style={{ animation: 'fadeSlideUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-[#e5d0a1] opacity-90 text-sm md:text-base font-medium max-w-2xl mx-auto"
		  >
			{isAr 
			  ? "حلول تشغيلية فورية متكاملة ومصممة خصيصاً لإدارة عملياتك بذكاء." 
			  : "Real-time infrastructure architectures built to manage corporate deployment modules seamlessly."}
		  </p>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
		
		{/* ─── SERVICES GRID ─── */}
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
			  <div key={service.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative">
				
				{/* Grid Media Player - Smart aspect ratio handling */}
				<div className="w-full h-56 bg-[#1e2d40] flex items-center justify-center relative overflow-hidden">
				  {isVideoUrl(service.media_url) ? (
					<>
					  {/* Click-shield for Google Drive videos */}
					  {service.media_url.includes('drive.google.com') && (
						<div className="absolute top-0 right-0 w-16 h-16 z-20 bg-transparent" />
					  )}
					  <iframe 
						src={service.media_url} 
						title={service.title_en}
						className="w-full h-full absolute inset-0 border-0 z-10"
						allowFullScreen
					  ></iframe>
					</>
				  ) : service.media_url ? (
					<img 
					  src={service.media_url} 
					  alt={isAr ? service.title_ar : service.title_en} 
					  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10"
					  loading="lazy"
					/>
				  ) : (
					<div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300 z-10">
					  <span className="text-[10px] font-black uppercase tracking-widest">No Media</span>
					</div>
				  )}
				  {/* Subtle dark gradient overlay */}
				  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d40]/80 via-transparent to-transparent opacity-40 pointer-events-none z-20"></div>
				</div>

				{/* Grid Text */}
				<div className="p-6 md:p-8 flex flex-col flex-grow relative bg-white">
				  <div className="absolute top-0 right-6 -translate-y-1/2 w-10 h-1.5 bg-[#1e2d40] rounded-full shadow-sm group-hover:bg-[#d4af37] transition-colors"></div>
				  
				  <h3 className="text-xl font-black font-serif text-[#1e2d40] mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? service.title_ar : service.title_en}
				  </h3>
				  
				  <p className="text-xs text-slate-500 font-medium leading-relaxed whitespace-pre-line line-clamp-3 flex-grow" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? service.body_ar : service.body_en}
				  </p>

				  <div className="mt-6 pt-6 border-t border-slate-100 flex justify-end">
					{/* Interactive Click Button */}
					<button 
					  onClick={() => setSelectedService(service)} 
					  className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1e2d40] hover:text-[#d4af37] hover:border-transparent transition-all cursor-pointer shadow-sm group-hover:shadow-md"
					>
					  <ArrowUpRight size={14} />
					</button>
				  </div>
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

	  {/* ─── INFORMATIVE MODAL POP-UP ─── */}
	  {selectedService && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
		  {/* Dark Backdrop */}
		  <div 
			className="absolute inset-0 bg-[#0f1621]/90 backdrop-blur-sm transition-opacity" 
			onClick={() => setSelectedService(null)}
		  ></div>
		  
		  {/* Modal Container */}
		  <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300">
			
			{/* Close Button */}
			<button 
			  onClick={() => setSelectedService(null)} 
			  className="absolute top-4 right-4 z-50 p-2.5 bg-black/40 text-white rounded-full hover:bg-black hover:text-[#d4af37] transition-all cursor-pointer backdrop-blur-md"
			>
			  <X size={20} strokeWidth={2.5} />
			</button>

			{/* Modal Media Side */}
			<div className="w-full md:w-1/2 bg-[#1e2d40] min-h-[250px] md:min-h-[500px] flex items-center justify-center relative">
			  {isVideoUrl(selectedService.media_url) ? (
				<>
				  {selectedService.media_url.includes('drive.google.com') && (
					<div className="absolute top-0 right-0 w-20 h-20 z-20 bg-transparent" />
				  )}
				  <iframe 
					src={selectedService.media_url} 
					title={selectedService.title_en}
					className="w-full h-full absolute inset-0 border-0 z-10"
					allowFullScreen
				  ></iframe>
				</>
			  ) : selectedService.media_url ? (
				<img 
				  src={selectedService.media_url} 
				  alt="Service Media" 
				  className="w-full h-full object-contain p-4 z-10" 
				/>
			  ) : (
				<div className="w-full h-full flex items-center justify-center bg-[#1e2d40] text-slate-500 z-10">
				  <span className="text-xs font-black uppercase tracking-widest">OPERIX SOLUTIONS</span>
				</div>
			  )}
			</div>

			{/* Modal Text Side (Scrollable) */}
			<div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-slate-50">
			  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] mb-4 inline-block" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? "تفاصيل الخدمة" : "Service Overview"}
			  </span>
			  
			  <h2 className="text-2xl md:text-3xl font-black font-serif text-[#1e2d40] mb-6 leading-tight border-b border-slate-200 pb-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedService.title_ar : selectedService.title_en}
			  </h2>
			  
			  <p className="text-sm md:text-base text-slate-600 font-medium leading-loose whitespace-pre-line text-justify" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedService.body_ar : selectedService.body_en}
			  </p>
			</div>

		  </div>
		</div>
	  )}

	</div>
  );
}