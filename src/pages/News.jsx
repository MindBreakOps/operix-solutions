import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ArrowUpRight, X } from 'lucide-react';
import { supabaseClient as supabase } from '../config/supabase';

export default function News() {
  const { isAr } = useLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to control the informative pop-up modal
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch data from the Admin Dashboard CMS table
  useEffect(() => {
	async function fetchNews() {
	  try {
		const { data, error } = await supabase
		  .from('operix_cms_content')
		  .select('*')
		  .eq('page', 'news') 
		  .order('updated_at', { ascending: false }); 

		if (error) throw error;
		if (data) setNewsItems(data);
	  } catch (error) {
		console.error("Error loading news feed:", error);
	  } finally {
		setLoading(false);
	  }
	}

	fetchNews();
  }, []);

  const formatDate = (dateString) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', options);
  };

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
	if (selectedArticle) {
	  document.body.style.overflow = 'hidden';
	} else {
	  document.body.style.overflow = 'unset';
	}
	return () => { document.body.style.overflow = 'unset'; };
  }, [selectedArticle]);

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-16 px-4 sm:px-6 font-sans">
	  <div className="max-w-7xl mx-auto space-y-12">
		
		{/* HEADER */}
		<div className="text-center space-y-4 mb-10">
		  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 shadow-sm mb-2">
			{isAr ? "المركز الإعلامي" : "Media Center"}
		  </span>
		  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "أخبار المنظومة التشغيلية" : "Ecosystem Intelligence & News"}
		  </h1>
		  <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl mx-auto">
			{isAr 
			  ? "تحديثات لحظية حول إطلاق الأنظمة الجديدة، والبيانات التشغيلية." 
			  : "Real-time updates regarding system rollouts, operational telemetry, and feature drops."}
		  </p>
		</div>

		{loading ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			{isAr ? "جاري تحميل البيانات..." : "Loading intelligence feed..."}
		  </div>
		) : newsItems.length === 0 ? (
		  <div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			{isAr ? "لا توجد أخبار حالياً" : "No news articles found."}
		  </div>
		) : (
		  <div className="space-y-10">
			
			{/* ─── 1. THE HERO FEATURED ARTICLE (Index 0) ─── */}
			<div className="w-full bg-[#0f1621] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row group border border-slate-700/50 relative">
			  
			  {/* Smart Media Container - Uses object-contain to respect vertical/horizontal/square */}
			  <div className="w-full lg:w-3/5 min-h-[300px] lg:min-h-[450px] relative flex items-center justify-center bg-[#0a0f16]">
				{isVideoUrl(newsItems[0].media_url) ? (
				  <>
					{newsItems[0].media_url.includes('drive.google.com') && (
					  <div className="absolute top-0 right-0 w-20 h-20 z-20 bg-transparent" title="External playback disabled" />
					)}
					<iframe 
					  src={newsItems[0].media_url} 
					  title={newsItems[0].title_en}
					  className="w-full h-full absolute inset-0 border-0 z-10"
					  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
					  allowFullScreen
					></iframe>
				  </>
				) : (
				  <img 
					src={newsItems[0].media_url || '/placeholder.jpg'} 
					alt={isAr ? newsItems[0].title_ar : newsItems[0].title_en} 
					className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700 absolute inset-0 z-10" 
				  />
				)}
				{/* Subtle dark gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f1621] via-[#0f1621]/40 to-transparent opacity-80 pointer-events-none z-20"></div>
			  </div>

			  {/* Text Half */}
			  <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative z-30 bg-gradient-to-b from-transparent to-[#0a0f16] lg:bg-none">
				<div className="inline-flex items-center gap-2 px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-black uppercase tracking-widest rounded-full mb-6 w-max">
				  <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
				  {isAr ? "أحدث إصدار" : "Latest Release"}
				</div>
				
				<h3 className="text-3xl lg:text-4xl font-black font-serif text-white mb-4 leading-tight drop-shadow-md" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  {isAr ? newsItems[0].title_ar : newsItems[0].title_en}
				</h3>
				
				<p className="text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line drop-shadow-sm mb-8 line-clamp-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  {isAr ? newsItems[0].body_ar : newsItems[0].body_en}
				</p>

				<div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-700/50">
				  <div className="flex items-center gap-2 text-xs font-bold text-slate-400" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					<Calendar size={14} className="text-[#d4af37]" /> {formatDate(newsItems[0].updated_at)}
				  </div>
				  {/* Read More Trigger */}
				  <button onClick={() => setSelectedArticle(newsItems[0])} className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#d4af37] text-white hover:text-[#1e2d40] border border-white/20 hover:border-transparent flex items-center justify-center transition-all cursor-pointer">
					<ArrowUpRight size={18} />
				  </button>
				</div>
			  </div>
			</div>

			{/* ─── 2. THE INTELLIGENCE GRID (Indexes 1+) ─── */}
			{newsItems.length > 1 && (
			  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{newsItems.slice(1).map((article) => (
				  <div key={article.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col relative">
					
					{/* Grid Media Player - Smart aspect ratio handling */}
					<div className="w-full h-56 bg-[#1e2d40] flex items-center justify-center relative overflow-hidden">
					  {isVideoUrl(article.media_url) ? (
						<>
						  {article.media_url.includes('drive.google.com') && (
							<div className="absolute top-0 right-0 w-16 h-16 z-20 bg-transparent" />
						  )}
						  <iframe 
							src={article.media_url} 
							title={article.title_en}
							className="w-full h-full absolute inset-0 border-0 z-10"
							allowFullScreen
						  ></iframe>
						</>
					  ) : (
						<img 
						  src={article.media_url || '/placeholder.jpg'} 
						  alt={isAr ? article.title_ar : article.title_en} 
						  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 z-10" 
						/>
					  )}
					</div>

					{/* Grid Text */}
					<div className="p-6 md:p-8 flex flex-col flex-grow relative bg-white">
					  <div className="absolute top-0 right-6 -translate-y-1/2 w-10 h-1.5 bg-[#1e2d40] rounded-full shadow-sm group-hover:bg-[#d4af37] transition-colors"></div>
					  
					  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
						<Calendar size={14} /> {formatDate(article.updated_at)}
					  </div>
					  
					  <h3 className="text-xl font-black font-serif text-[#1e2d40] mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-2" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						{isAr ? article.title_ar : article.title_en}
					  </h3>
					  
					  <p className="text-xs text-slate-500 font-medium leading-relaxed whitespace-pre-line line-clamp-3" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						{isAr ? article.body_ar : article.body_en}
					  </p>

					  <div className="mt-auto pt-6 flex justify-end">
						{/* Interactive Click Button */}
						<button 
						  onClick={() => setSelectedArticle(article)} 
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

		  </div>
		)}

	  </div>

	  {/* ─── 3. THE INFORMATIVE MODAL POP-UP ─── */}
	  {selectedArticle && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12">
		  {/* Dark Backdrop */}
		  <div 
			className="absolute inset-0 bg-[#0f1621]/90 backdrop-blur-sm transition-opacity" 
			onClick={() => setSelectedArticle(null)}
		  ></div>
		  
		  {/* Modal Container */}
		  <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 animate-in fade-in zoom-in-95 duration-300">
			
			{/* Close Button */}
			<button 
			  onClick={() => setSelectedArticle(null)} 
			  className="absolute top-4 right-4 z-50 p-2.5 bg-black/40 text-white rounded-full hover:bg-black hover:text-[#d4af37] transition-all cursor-pointer backdrop-blur-md"
			>
			  <X size={20} strokeWidth={2.5} />
			</button>

			{/* Modal Media Side */}
			<div className="w-full md:w-1/2 bg-[#1e2d40] min-h-[250px] md:min-h-[500px] flex items-center justify-center relative">
			  {isVideoUrl(selectedArticle.media_url) ? (
				<>
				  {selectedArticle.media_url.includes('drive.google.com') && (
					<div className="absolute top-0 right-0 w-20 h-20 z-20 bg-transparent" />
				  )}
				  <iframe 
					src={selectedArticle.media_url} 
					title={selectedArticle.title_en}
					className="w-full h-full absolute inset-0 border-0 z-10"
					allowFullScreen
				  ></iframe>
				</>
			  ) : (
				<img 
				  src={selectedArticle.media_url || '/placeholder.jpg'} 
				  alt="Article Media" 
				  className="w-full h-full object-contain p-4 z-10" 
				/>
			  )}
			</div>

			{/* Modal Text Side (Scrollable) */}
			<div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto bg-slate-50">
			  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-4" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				<Calendar size={14} /> {formatDate(selectedArticle.updated_at)}
			  </div>
			  
			  <h2 className="text-2xl md:text-3xl font-black font-serif text-[#1e2d40] mb-6 leading-tight border-b border-slate-200 pb-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedArticle.title_ar : selectedArticle.title_en}
			  </h2>
			  
			  <p className="text-sm md:text-base text-slate-600 font-medium leading-loose whitespace-pre-line text-justify" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedArticle.body_ar : selectedArticle.body_en}
			  </p>
			</div>

		  </div>
		</div>
	  )}

	</div>
  );
}