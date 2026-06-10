import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';

export default function News() {
  const { isAr } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	async function fetchCmsNewsFeed() {
	  const { data, error } = await supabase
		.from('operix_cms_content')
		.select('*')
		.eq('page', 'news');

	  if (!error && data) {
		setArticles(data);
	  }
	  setLoading(false);
	}
	fetchCmsNewsFeed();
  }, []);

  if (loading) {
	return <div className="text-center py-24 font-sans font-bold text-slate-400">Loading Intelligence Feed...</div>;
  }

  return (
	<div className="news-container animate-in">
	  <div className="text-center max-w-2xl mx-auto space-y-4">
		<h1 className="text-4xl font-black text-[#1e2d40]">{isAr ? "مركز الأخبار والتحديثات" : "Ecosystem Intelligence & News"}</h1>
		<p className="text-slate-500 text-sm font-medium">{isAr ? "تابع آخر التطورات الميدانية والتقنية لمنصة أوبيريكس للحلول المتكاملة." : "Real-time updates regarding system rollouts, operational telemetry, and feature drops."}</p>
	  </div>

	  <div className="news-grid">
		{articles.length === 0 ? (
		  <div className="col-span-full text-center py-16 border border-dashed border-slate-200 rounded-3xl text-slate-400 font-medium">
			{isAr ? "لم يتم نشر أي أخبار تشغيلية بعد عبر لوحة التحكم." : "No operational announcements broadcasted via the CMS console yet."}
		  </div>
		) : (
		  articles.map((item) => (
			<article key={item.id} className="news-card">
			  <div className="news-image-wrapper">
				<img 
				  src={item.media_url || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"} 
				  alt="News Media Feed Asset" 
				  className="news-img" 
				/>
			  </div>
			  <div className="news-content">
				<span className="text-[10px] font-black text-[#c9a84c] font-mono uppercase tracking-wider">
				  {new Date(item.updated_at).toLocaleDateString(isAr ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
				</span>
				<h3 className="text-base font-black text-[#1e2d40]">
				  {isAr ? item.title_ar : item.title_en}
				</h3>
				<p className="text-slate-500 text-xs leading-relaxed font-medium">
				  {isAr ? item.body_ar : item.body_en}
				</p>
			  </div>
			</article>
		  ))
		)}
	  </div>
	</div>
  );
}