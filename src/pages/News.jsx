import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, ArrowUpRight, X, Rss } from 'lucide-react';
import { supabaseClient as supabase } from '../config/supabase';

/* ── Reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -30px 0px' }
	);
	io.observe(el);
	return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style = {}, ...rest }) {
  const [ref, visible] = useReveal();
  return (
	<Tag ref={ref} className={className} style={{
	  opacity: visible ? 1 : 0,
	  transform: visible ? 'translateY(0)' : 'translateY(24px)',
	  transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform',
	  ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

/* ── Skeleton shimmer ────────────────────────────────────────── */
function Skeleton({ className = '' }) {
  return (
	<div className={`relative overflow-hidden bg-slate-200 rounded-lg ${className}`}>
	  <div className="absolute inset-0"
		style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
	</div>
  );
}

function LoadingSkeleton() {
  return (
	<div className="space-y-8">
	  <div className="w-full bg-[#0f1621] rounded-3xl overflow-hidden flex flex-col lg:flex-row min-h-[420px]">
		<div className="w-full lg:w-3/5 min-h-[280px] bg-slate-800" />
		<div className="w-full lg:w-2/5 p-10 flex flex-col justify-center gap-5">
		  <Skeleton className="w-28 h-5" />
		  <Skeleton className="w-full h-10" />
		  <Skeleton className="w-5/6 h-6" />
		  <Skeleton className="w-4/6 h-6" />
		</div>
	  </div>
	  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{[...Array(3)].map((_, i) => (
		  <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
			<Skeleton className="w-full h-48 rounded-none" />
			<div className="p-6 space-y-3">
			  <Skeleton className="w-24 h-4" />
			  <Skeleton className="w-full h-6" />
			  <Skeleton className="w-5/6 h-4" />
			  <Skeleton className="w-4/6 h-4" />
			</div>
		  </div>
		))}
	  </div>
	</div>
  );
}

export default function News() {
  const { isAr } = useLanguage();
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
	  } catch (e) { console.error("News fetch error:", e); }
	  finally { setLoading(false); }
	}
	fetchNews();
  }, []);

  const formatDate = (dateString) => {
	return new Date(dateString).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
	  year: 'numeric', month: 'long', day: 'numeric'
	});
  };

  const isVideoUrl = (url) => {
	if (!url) return false;
	return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('/preview') || url.match(/\.(mp4|webm|ogg)$/i);
  };

  // Smooth modal open / close
  const openModal = (article) => {
	setSelectedArticle(article);
	setTimeout(() => setModalVisible(true), 10);
	document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
	setModalVisible(false);
	setTimeout(() => { setSelectedArticle(null); document.body.style.overflow = 'unset'; }, 300);
  };
  useEffect(() => () => { document.body.style.overflow = 'unset'; }, []);

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen font-sans pb-12" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

	  <style>{`
		@keyframes floatGlow {
		  0%, 100% { transform: translateY(0); opacity: 0.1; }
		  50%       { transform: translateY(-16px); opacity: 0.18; }
		}
		@keyframes shimmer {
		  0%   { background-position: -200% center; }
		  100% { background-position:  200% center; }
		}
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(24px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes modalIn {
		  from { opacity: 0; transform: scale(0.96) translateY(10px); }
		  to   { opacity: 1; transform: scale(1) translateY(0); }
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
		.hero-tag { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
		.hero-h1  { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
		.hero-p   { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
		.grid-card { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
		.grid-card:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(30,45,64,0.12); }
		.read-btn { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.read-btn:hover { transform: scale(1.08); }
		.hero-read-btn { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.hero-read-btn:hover { transform: translateX(2px) translateY(-2px); }
		.modal-animate { animation: modalIn 0.32s cubic-bezier(0.22,1,0.36,1) both; }
		.img-zoom { overflow: hidden; }
		.img-zoom img { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
		.grid-card:hover .img-zoom img { transform: scale(1.04); }
	  `}</style>

	  {/* ── HERO HEADER ─────────────────────────────────────────── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-slate-700 py-20 px-6">
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af3715 0%, transparent 70%)', animation: 'floatGlow 7s ease-in-out infinite' }} />
		
		<div className="relative z-10 max-w-7xl mx-auto text-center">
		  <span className="hero-tag inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 mb-5">
			<Rss size={11} />
			{isAr ? "المركز الإعلامي" : "Media Center"}
		  </span>
		  <h1 className="hero-h1 text-3xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight max-w-3xl mx-auto pb-1 leading-tight mb-4 premium-gold-text drop-shadow-lg">
			{isAr ? "أخبار المنظومة التشغيلية" : "Ecosystem Intelligence & News"}
		  </h1>
		  <p className="hero-p text-[#e5d0a1] opacity-90 text-sm md:text-base font-medium max-w-xl mx-auto">
			{isAr
			  ? "تحديثات لحظية حول إطلاق الأنظمة الجديدة، والبيانات التشغيلية."
			  : "Real-time updates on system rollouts, operational telemetry, and feature drops."}
		  </p>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

		{loading ? (
		  <LoadingSkeleton />
		) : newsItems.length === 0 ? (
		  <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-3xl border border-dashed border-slate-200">
			<div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
			  <Rss size={24} className="text-slate-300" />
			</div>
			<p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
			  {isAr ? "لا توجد أخبار حالياً" : "No articles found"}
			</p>
		  </div>
		) : (
		  <>
			{/* ── HERO FEATURED ARTICLE ─────────────────────────── */}
			<Reveal>
			  <div className="w-full bg-[#0f1621] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-slate-800 group relative">

				{/* Media */}
				<div className="w-full lg:w-[55%] min-h-[300px] lg:min-h-[460px] relative flex items-center justify-center bg-[#090e17] overflow-hidden">
				  {isVideoUrl(newsItems[0].media_url) ? (
					<>
					  {newsItems[0].media_url.includes('drive.google.com') && (
						<div className="absolute top-0 right-0 w-20 h-20 z-20 bg-transparent" />
					  )}
					  <iframe src={newsItems[0].media_url} title={newsItems[0].title_en}
						className="w-full h-full absolute inset-0 border-0 z-10" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
					</>
				  ) : (
					<img src={newsItems[0].media_url || '/placeholder.jpg'}
					  alt={isAr ? newsItems[0].title_ar : newsItems[0].title_en}
					  className="w-full h-full object-contain absolute inset-0 z-10 opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700" />
				  )}
				  {/* Gradient side fade → */}
				  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0f1621] via-[#0f1621]/30 to-transparent opacity-90 pointer-events-none z-20" />
				</div>

				{/* Content */}
				<div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative z-30">
				  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-black uppercase tracking-widest rounded-full mb-5 w-max">
					<span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
					{isAr ? "أحدث إصدار" : "Latest Release"}
				  </span>

				  <h3 className="text-2xl lg:text-3xl font-black font-serif text-white mb-4 leading-tight"
					style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? newsItems[0].title_ar : newsItems[0].title_en}
				  </h3>

				  <p className="text-sm text-slate-400 font-medium leading-relaxed whitespace-pre-line mb-8 line-clamp-4"
					style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? newsItems[0].body_ar : newsItems[0].body_en}
				  </p>

				  <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-700/60">
					<div className="flex items-center gap-2 text-xs font-bold text-slate-500"
					  style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					  <Calendar size={13} className="text-[#d4af37]" />
					  {formatDate(newsItems[0].updated_at)}
					</div>
					<button onClick={() => openModal(newsItems[0])}
					  className="hero-read-btn flex items-center gap-2 bg-[#d4af37] text-[#1e2d40] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md cursor-pointer">
					  {isAr ? "قراءة" : "Read More"} <ArrowUpRight size={14} />
					</button>
				  </div>
				</div>
			  </div>
			</Reveal>

			{/* ── GRID ─────────────────────────────────────────────── */}
			{newsItems.length > 1 && (
			  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{newsItems.slice(1).map((article, i) => (
				  <Reveal key={article.id} delay={i * 60}>
					<div className="grid-card bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">

					  {/* Thumbnail */}
					  <div className="w-full h-52 bg-[#0f1621] relative img-zoom">
						{isVideoUrl(article.media_url) ? (
						  <>
							{article.media_url.includes('drive.google.com') && (
							  <div className="absolute top-0 right-0 w-16 h-16 z-20 bg-transparent" />
							)}
							<iframe src={article.media_url} title={article.title_en}
							  className="w-full h-full absolute inset-0 border-0 z-10" allowFullScreen />
						  </>
						) : (
						  <img src={article.media_url || '/placeholder.jpg'}
							alt={isAr ? article.title_ar : article.title_en}
							className="w-full h-full object-contain absolute inset-0 z-10 opacity-90" />
						)}
						{/* Date chip over image */}
						<div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
						  <Calendar size={10} className="text-[#d4af37]" />
						  {formatDate(article.updated_at)}
						</div>
					  </div>

					  {/* Body */}
					  <div className="p-6 flex flex-col flex-grow">
						{/* Accent stripe */}
						<div className="w-8 h-1 bg-[#d4af37] rounded-full mb-4 opacity-70" />

						<h3 className="text-base font-black font-serif text-[#1e2d40] mb-2 line-clamp-2 group-hover:text-[#d4af37] transition-colors leading-snug"
						  style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						  {isAr ? article.title_ar : article.title_en}
						</h3>

						<p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3 flex-grow"
						  style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						  {isAr ? article.body_ar : article.body_en}
						</p>

						<div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
						  <button onClick={() => openModal(article)}
							className="read-btn w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#1e2d40] hover:text-[#d4af37] hover:border-transparent cursor-pointer shadow-sm">
							<ArrowUpRight size={15} />
						  </button>
						</div>
					  </div>
					</div>
				  </Reveal>
				))}
			  </div>
			)}
		  </>
		)}
	  </div>

	  {/* ── MODAL ───────────────────────────────────────────────── */}
	  {selectedArticle && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
		  {/* Backdrop */}
		  <div
			className="absolute inset-0 bg-[#0a0f16]/85 backdrop-blur-md"
			style={{ opacity: modalVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
			onClick={closeModal}
		  />

		  {/* Panel */}
		  <div className={`relative bg-white w-full max-w-5xl max-h-[92vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row z-10 ${modalVisible ? 'modal-animate' : 'opacity-0'}`}>

			{/* Close */}
			<button onClick={closeModal}
			  className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-[#d4af37] hover:text-[#1e2d40] transition-all cursor-pointer">
			  <X size={18} strokeWidth={2.5} />
			</button>

			{/* Media */}
			<div className="w-full md:w-[45%] bg-[#0f1621] min-h-[240px] md:min-h-[540px] flex items-center justify-center relative overflow-hidden flex-shrink-0">
			  {isVideoUrl(selectedArticle.media_url) ? (
				<>
				  {selectedArticle.media_url.includes('drive.google.com') && (
					<div className="absolute top-0 right-0 w-20 h-20 z-20 bg-transparent" />
				  )}
				  <iframe src={selectedArticle.media_url} title={selectedArticle.title_en}
					className="w-full h-full absolute inset-0 border-0 z-10" allowFullScreen />
				</>
			  ) : (
				<img src={selectedArticle.media_url || '/placeholder.jpg'} alt="Article Media"
				  className="w-full h-full object-contain p-5 z-10" />
			  )}
			  {/* Bottom fade */}
			  <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
				style={{ background: 'linear-gradient(to top, #0f1621, transparent)' }} />
			</div>

			{/* Content (scrollable) */}
			<div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col overflow-y-auto bg-slate-50">
			  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-4"
				style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				<Calendar size={13} /> {formatDate(selectedArticle.updated_at)}
			  </div>

			  <h2 className="text-2xl md:text-3xl font-black font-serif text-[#1e2d40] mb-5 leading-tight border-b border-slate-200 pb-5"
				style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedArticle.title_ar : selectedArticle.title_en}
			  </h2>

			  <p className="text-sm md:text-base text-slate-600 font-medium leading-loose whitespace-pre-line text-justify flex-grow"
				style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				{isAr ? selectedArticle.body_ar : selectedArticle.body_en}
			  </p>

			  <div className="mt-6 pt-5 border-t border-slate-200">
				<button onClick={closeModal}
				  className="w-full bg-[#1e2d40] hover:bg-[#d4af37] text-white hover:text-[#1e2d40] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 cursor-pointer">
				  {isAr ? "إغلاق" : "Close"}
				</button>
			  </div>
			</div>
		  </div>
		</div>
	  )}
	</div>
  );
}