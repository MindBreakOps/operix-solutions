import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar } from 'lucide-react';
import { supabaseClient as supabase } from '../config/supabase'; // Make sure this path matches your project

export default function News() {
  const { isAr } = useLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the Admin Dashboard CMS table
  useEffect(() => {
	async function fetchNews() {
	  try {
		const { data, error } = await supabase
		  .from('operix_cms_content')
		  .select('*')
		  .eq('page', 'news') // Only get items tagged for the News module
		  .order('updated_at', { ascending: false }); // Newest first

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

  // Format the date to look nice (e.g., "June 11, 2026")
  const formatDate = (dateString) => {
	const options = { year: 'numeric', month: 'long', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', options);
  };

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-16 px-6 font-sans">
	  <div className="max-w-6xl mx-auto space-y-16">
		
		<div className="text-center space-y-4">
		  {/* Navy to Gold Gradient Header */}
		  <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "أخبار المنظومة التشغيلية" : "Ecosystem Intelligence & News"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
			{isAr 
			  ? "تحديثات لحظية حول إطلاق الأنظمة الجديدة، والبيانات التشغيلية." 
			  : "Real-time updates regarding system rollouts, operational telemetry, and feature drops."}
		  </p>
		</div>

		<div className="space-y-10">
		  {loading ? (
			// Simple Loading State
			<div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			  {isAr ? "جاري تحميل البيانات..." : "Loading intelligence feed..."}
			</div>
		  ) : newsItems.length === 0 ? (
			// Empty State
			<div className="text-center text-slate-400 font-bold uppercase tracking-widest py-10">
			  {isAr ? "لا توجد أخبار حالياً" : "No news articles found."}
			</div>
		  ) : (
			// Render Live Data from Supabase
			newsItems.map((article) => (
			  <div key={article.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow">
				
				<div className="md:w-1/3 h-64 md:h-auto bg-[#1e2d40] overflow-hidden flex-shrink-0">
				  <img 
					src={article.media_url || '/placeholder.jpg'} // Fallback if no image URL is provided
					alt={isAr ? article.title_ar : article.title_en} 
					className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" 
					onError={(e) => { 
					  e.target.style.display = 'none'; 
					  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-slate-500 font-black tracking-widest uppercase bg-slate-100">OPERIX MEDIA</div>'; 
					}}
				  />
				</div>

				<div className="p-8 md:w-2/3 flex flex-col justify-center space-y-4">
				  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
					<Calendar size={14} /> {formatDate(article.updated_at)}
				  </div>
				  
				  {/* Dynamic Title based on Language */}
				  <h3 className="text-2xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? article.title_ar : article.title_en}
				  </h3>
				  
				  {/* Dynamic Body based on Language */}
				  <p className="text-sm text-slate-500 font-medium leading-relaxed whitespace-pre-line" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? article.body_ar : article.body_en}
				  </p>
				</div>
				
			  </div>
			))
		  )}
		</div>

	  </div>
	</div>
  );
}