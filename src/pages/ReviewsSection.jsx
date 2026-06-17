import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, Send, CheckCircle } from 'lucide-react';

/* ── Reveal ──────────────────────────────────────────────────── */
function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -20px 0px' }
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
	  transform: visible ? 'translateY(0)' : 'translateY(20px)',
	  transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform', ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

/* ── Star rating ─────────────────────────────────────────────── */
function StarRating({ rating, onRate, size = 18, readOnly = false }) {
  const [hovered, setHovered] = useState(0);
  return (
	<div className="flex gap-1">
	  {[1, 2, 3, 4, 5].map(s => (
		<button key={s} type="button"
		  onClick={() => !readOnly && onRate && onRate(s)}
		  onMouseEnter={() => !readOnly && setHovered(s)}
		  onMouseLeave={() => !readOnly && setHovered(0)}
		  className={`outline-none transition-transform duration-150 ${!readOnly ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
		>
		  <Star size={size}
			className={`transition-colors duration-150 ${s <= (hovered || rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
		  />
		</button>
	  ))}
	</div>
  );
}

/* ── Review card ─────────────────────────────────────────────── */
function ReviewCard({ review, delay = 0 }) {
  return (
	<Reveal delay={delay}>
	  <div className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#d4af37]/30 transition-all duration-300 h-full relative overflow-hidden">
		{/* Hover accent */}
		<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl" />

		<div>
		  {/* Quote icon */}
		  <div className="absolute top-4 right-4 text-[#d4af37]/10 pointer-events-none">
			<Quote size={36} />
		  </div>

		  <StarRating rating={review.rating || 5} readOnly size={13} />

		  <p className="text-xs text-slate-600 leading-relaxed font-medium mt-3 mb-4 relative z-10">
			"{review.feedback}"
		  </p>
		</div>

		<div className="flex items-center gap-3 border-t border-slate-100 pt-4 mt-auto">
		  <div className="w-8 h-8 rounded-full bg-[#1e2d40] text-[#d4af37] flex items-center justify-center font-black text-[10px] flex-shrink-0">
			{(review.name || 'A').charAt(0).toUpperCase()}
		  </div>
		  <div>
			<h4 className="text-xs font-black text-[#1e2d40] leading-tight">{review.name}</h4>
			{review.company && (
			  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{review.company}</span>
			)}
		  </div>
		</div>
	  </div>
	</Reveal>
  );
}

/* ── Skeleton ────────────────────────────────────────────────── */
function ReviewSkeleton() {
  return (
	<div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 relative overflow-hidden">
	  <div className="h-3 w-20 bg-slate-100 rounded" />
	  <div className="h-2.5 w-full bg-slate-100 rounded" />
	  <div className="h-2.5 w-5/6 bg-slate-100 rounded" />
	  <div className="h-2.5 w-4/6 bg-slate-100 rounded" />
	  <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
		<div className="w-8 h-8 rounded-full bg-slate-100" />
		<div className="space-y-1.5">
		  <div className="h-2.5 w-20 bg-slate-100 rounded" />
		  <div className="h-2 w-14 bg-slate-100 rounded" />
		</div>
	  </div>
	  <div className="absolute inset-0 -translate-x-full"
		style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)', animation: 'shimmer 1.6s infinite' }} />
	</div>
  );
}

export default function ReviewsSection() {
  const { isAr } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', rating: 5, feedback: '' });

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
	setLoadingReviews(true);
	const { data } = await supabase
	  .from('operix_reviews').select('*')
	  .order('created_at', { ascending: false }).limit(6);
	if (data) setReviews(data);
	setLoadingReviews(false);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	if (!form.name || !form.feedback) return;
	setIsSubmitting(true);
	await supabase.from('operix_reviews').insert([{
	  name: form.name, company: form.company,
	  rating: form.rating, feedback: form.feedback
	}]);
	setSubmitted(true);
	setForm({ name: '', company: '', rating: 5, feedback: '' });
	await fetchReviews();
	setIsSubmitting(false);
	setTimeout(() => setSubmitted(false), 3500);
  };

  return (
	<div className="w-full flex flex-col lg:flex-row gap-6 items-start font-sans">

	  <style>{`
		@keyframes shimmer {
		  0%   { transform: translateX(-100%); }
		  100% { transform: translateX(300%); }
		}
		@keyframes successPop {
		  0%   { transform: scale(0.7); opacity: 0; }
		  60%  { transform: scale(1.08); }
		  100% { transform: scale(1); opacity: 1; }
		}
		.form-input { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
		.form-input:focus { border-color: #d4af37; box-shadow: 0 0 0 3px rgba(212,175,55,0.14); background: #fff; }
		.review-submit { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.review-submit:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(30,45,64,0.2); }
		.success-pop { animation: successPop 0.45s cubic-bezier(0.22,1,0.36,1) both; }
	  `}</style>

	  {/* ── FORM ─────────────────────────────────────────────── */}
	  <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex-shrink-0 relative overflow-hidden">
		{/* Top accent */}
		<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e2d40] via-[#d4af37] to-[#1e2d40] rounded-t-2xl" />

		<div className="mb-5">
		  <h3 className="text-sm font-black text-[#1e2d40] mb-0.5">
			{isAr ? "شاركنا رأيك" : "Leave a Review"}
		  </h3>
		  <p className="text-[11px] text-slate-400 font-medium">
			{isAr ? "يظهر فوراً على المنصة" : "Appears instantly on the platform"}
		  </p>
		</div>

		{submitted ? (
		  <div className="success-pop flex flex-col items-center justify-center py-8 gap-3 text-center">
			<div className="w-14 h-14 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center">
			  <CheckCircle size={26} className="text-emerald-500" strokeWidth={1.5} />
			</div>
			<div>
			  <div className="text-sm font-black text-[#1e2d40]">{isAr ? "شكراً لتقييمك!" : "Review Published!"}</div>
			  <div className="text-xs text-slate-400 font-medium mt-0.5">{isAr ? "تم نشر تعليقك بنجاح" : "Your feedback is now live"}</div>
			</div>
		  </div>
		) : (
		  <form onSubmit={handleSubmit} className="space-y-3">
			<input
			  type="text"
			  placeholder={isAr ? "الاسم *" : "Name *"}
			  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
			  required
			  className="form-input w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none font-medium"
			/>
			<input
			  type="text"
			  placeholder={isAr ? "الشركة (اختياري)" : "Company (optional)"}
			  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
			  className="form-input w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none font-medium"
			/>

			{/* Rating */}
			<div className="bg-slate-50 px-3 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
			  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
				{isAr ? "التقييم" : "Rating"}
			  </span>
			  <StarRating rating={form.rating} onRate={(s) => setForm({ ...form, rating: s })} size={16} />
			</div>

			<textarea
			  placeholder={isAr ? "التعليق *" : "Feedback *"}
			  value={form.feedback} onChange={(e) => setForm({ ...form, feedback: e.target.value })}
			  required rows={3}
			  className="form-input w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50 text-slate-800 outline-none font-medium resize-none"
			/>

			<button
			  type="submit" disabled={isSubmitting}
			  className="review-submit w-full bg-[#1e2d40] hover:bg-[#2d4460] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
			>
			  {isSubmitting ? (
				<>
				  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
				  </svg>
				  {isAr ? "جاري النشر..." : "Publishing..."}
				</>
			  ) : (
				<>{isAr ? "نشر التقييم" : "Publish Review"} <Send size={12} /></>
			  )}
			</button>
		  </form>
		)}
	  </div>

	  {/* ── REVIEWS GRID ─────────────────────────────────────── */}
	  <div className="w-full lg:w-2/3">
		{loadingReviews ? (
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{[...Array(4)].map((_, i) => <ReviewSkeleton key={i} />)}
		  </div>
		) : reviews.length > 0 ? (
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{reviews.map((review, i) => (
			  <ReviewCard key={review.id || i} review={review} delay={i * 50} />
			))}
		  </div>
		) : (
		  <Reveal>
			<div className="col-span-full flex flex-col items-center justify-center py-14 text-center bg-white border border-slate-200 rounded-2xl shadow-sm gap-3">
			  <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center">
				<Star size={20} className="text-slate-300" />
			  </div>
			  <div>
				<p className="text-xs font-black text-slate-400 uppercase tracking-widest">
				  {isAr ? "لا توجد تقييمات حتى الآن" : "No reviews yet"}
				</p>
				<p className="text-[11px] text-slate-300 font-medium mt-0.5">
				  {isAr ? "كن أول من يشارك تجربته" : "Be the first to share your experience"}
				</p>
			  </div>
			</div>
		  </Reveal>
		)}
	  </div>
	</div>
  );
}