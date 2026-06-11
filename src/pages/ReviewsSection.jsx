import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Send, User, Building2, MessageSquare, Loader2 } from 'lucide-react';
import { supabaseClient as supabase } from '../config/supabase';

export default function ReviewsSection() {
  const { isAr } = useLanguage();
  
  // States
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [formData, setFormData] = useState({ name: '', company: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // ─── LIVE DATABASE FETCH ───
  useEffect(() => {
	async function fetchReviews() {
	  try {
		const { data, error } = await supabase
		  .from('operix_reviews')
		  .select('*')
		  .order('created_at', { ascending: false });

		if (error) {
		  console.error("Supabase Fetch Error:", error);
		} else if (data) {
		  setReviews(data);
		}
	  } catch (err) {
		console.error("Unexpected error fetching reviews:", err);
	  } finally {
		setIsLoading(false);
	  }
	}
	
	fetchReviews();
  }, []);

  // ─── LIVE DATABASE INSERT ───
  const handleSubmit = async (e) => {
	e.preventDefault();
	setIsSubmitting(true);
	setSubmitStatus(null);
	
	const newReview = {
	  name: formData.name,
	  company: formData.company,
	  rating: rating,
	  comment: formData.comment
	};

	try {
	  const { data, error } = await supabase
		.from('operix_reviews')
		.insert([newReview])
		.select(); // Returns the newly inserted row

	  if (error) {
		console.error("Supabase Insert Error:", error);
		setSubmitStatus('error');
	  } else {
		// Successfully inserted! Add it to the top of the UI list immediately.
		if (data && data.length > 0) {
		  setReviews([data[0], ...reviews]);
		}
		
		// Reset form
		setFormData({ name: '', company: '', comment: '' });
		setRating(5);
		setSubmitStatus('success');
	  }
	} catch (err) {
	  console.error("Unexpected error submitting review:", err);
	  setSubmitStatus('error');
	} finally {
	  setIsSubmitting(false);
	  // Clear status message after 4 seconds
	  setTimeout(() => setSubmitStatus(null), 4000);
	}
  };

  // Date Formatter Helper
  const formatDate = (dateString) => {
	if (!dateString) return "";
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return new Date(dateString).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', options);
  };

  return (
	<div className="w-full bg-[#151c28] py-24 px-4 md:px-6 font-sans relative overflow-hidden">
	  
	  {/* Background Decor */}
	  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, #c9a84c 0%, transparent 70%)' }}></div>

	  <div className="max-w-7xl mx-auto space-y-20 relative z-10">
		
		{/* HEADER */}
		<div className="text-center space-y-4 max-w-3xl mx-auto">
		  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/20">
			{isAr ? "مراجعات العملاء" : "Client Telemetry & Reviews"}
		  </span>
		  <h2 className="text-4xl md:text-5xl font-black text-white font-serif tracking-tight">
			{isAr ? "ثقة تبني أُسس المستقبل" : "Trusted by Industry Leaders"}
		  </h2>
		</div>

		<div className="grid lg:grid-cols-12 gap-12 items-start">
		  
		  {/* ─── LEFT: SUBMISSION FORM ─── */}
		  <div className="lg:col-span-5 bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200">
			<div className="mb-8">
			  <h3 className="text-2xl font-black text-[#1e2d40] font-serif mb-2">
				{isAr ? "شاركنا تجربتك" : "Submit Your Assessment"}
			  </h3>
			  <p className="text-sm text-slate-500 font-medium">
				{isAr ? "رأيك يساهم في تطوير بنيتنا التحتية." : "Your operational feedback refines our architecture."}
			  </p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6">
			  
			  {/* Interactive Star Rating */}
			  <div className="space-y-2">
				<label className="block text-[11px] font-black uppercase tracking-widest text-[#1e2d40]">
				  {isAr ? "التقييم العام" : "System Rating"}
				</label>
				<div className="flex items-center gap-2">
				  {[1, 2, 3, 4, 5].map((star) => (
					<button
					  key={star}
					  type="button"
					  onClick={() => setRating(star)}
					  onMouseEnter={() => setHoveredStar(star)}
					  onMouseLeave={() => setHoveredStar(0)}
					  className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
					>
					  <Star 
						size={28} 
						className={`transition-colors duration-200 ${(hoveredStar || rating) >= star ? 'fill-[#d4af37] text-[#d4af37]' : 'text-slate-200'}`} 
					  />
					</button>
				  ))}
				</div>
			  </div>

			  <div className="grid grid-cols-2 gap-4">
				<div className="space-y-2">
				  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
					<User size={12} className="inline mr-1 mb-0.5" /> {isAr ? "الاسم" : "Name"}
				  </label>
				  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#1e2d40] focus:border-[#d4af37] outline-none transition-colors" />
				</div>
				<div className="space-y-2">
				  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
					<Building2 size={12} className="inline mr-1 mb-0.5" /> {isAr ? "المنشأة" : "Company"}
				  </label>
				  <input type="text" required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#1e2d40] focus:border-[#d4af37] outline-none transition-colors" />
				</div>
			  </div>

			  <div className="space-y-2">
				<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
				  <MessageSquare size={12} className="inline mr-1 mb-0.5" /> {isAr ? "التعليق" : "Feedback"}
				</label>
				<textarea required rows="4" value={formData.comment} onChange={(e) => setFormData({...formData, comment: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-[#1e2d40] focus:border-[#d4af37] outline-none transition-colors resize-none"></textarea>
			  </div>

			  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-[#1e2d40] to-[#151c28] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-[#1e2d40]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer">
				{isSubmitting ? (isAr ? "جاري الإرسال..." : "Transmitting...") : (isAr ? "نشر المراجعة" : "Publish Review")}
				{!isSubmitting && <Send size={14} className={isAr ? "rotate-180" : ""} />}
			  </button>

			  {/* Status Messages */}
			  {submitStatus === 'success' && (
				<div className="text-center text-xs font-bold text-emerald-600 bg-emerald-50 py-3 rounded-lg border border-emerald-100 animate-in fade-in">
				  {isAr ? "تم إرسال مراجعتك بنجاح. شكراً لك!" : "Review successfully integrated into the matrix!"}
				</div>
			  )}
			  {submitStatus === 'error' && (
				<div className="text-center text-xs font-bold text-red-600 bg-red-50 py-3 rounded-lg border border-red-100 animate-in fade-in">
				  {isAr ? "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً." : "A transmission error occurred. Please try again."}
				</div>
			  )}
			</form>
		  </div>

		  {/* ─── RIGHT: LIVE REVIEWS GRID ─── */}
		  <div className="lg:col-span-7 h-[600px] overflow-y-auto pr-2 pb-10 custom-scrollbar relative">
			
			{isLoading ? (
			  <div className="flex flex-col items-center justify-center h-full text-[#d4af37] space-y-4">
				<Loader2 size={40} className="animate-spin" />
				<span className="text-xs font-black uppercase tracking-widest text-slate-400">
				  {isAr ? "جاري جلب المراجعات الحية..." : "Syncing Live Telemetry..."}
				</span>
			  </div>
			) : reviews.length === 0 ? (
			  <div className="flex flex-col items-center justify-center h-full text-slate-500 border-2 border-dashed border-slate-700/50 rounded-3xl m-4">
				<MessageSquare size={32} className="mb-3 opacity-50" />
				<span className="text-xs font-bold uppercase tracking-widest text-slate-400">
				  {isAr ? "كن أول من يشاركنا تقييمه." : "No reviews found. Be the first to assess."}
				</span>
			  </div>
			) : (
			  <div className="grid sm:grid-cols-2 gap-6">
				{reviews.map((review, index) => (
				  <div 
					key={review.id} 
					className="bg-[#1e2d40] p-6 rounded-3xl border border-slate-700 shadow-lg hover:-translate-y-2 transition-transform duration-500 group flex flex-col animate-in slide-in-from-bottom-4 fade-in"
					style={{ animationDelay: `${(index % 10) * 100}ms`, animationFillMode: 'both' }}
				  >
					<div className="flex items-center gap-1 mb-4">
					  {[...Array(5)].map((_, i) => (
						<Star key={i} size={14} className={i < review.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-slate-600'} />
					  ))}
					</div>
					
					<p className="text-sm text-slate-300 font-medium leading-relaxed flex-grow italic mb-6 break-words">
					  "{review.comment}"
					</p>
					
					<div className="mt-auto border-t border-slate-700/50 pt-4 flex items-center justify-between">
					  <div className="overflow-hidden">
						<h4 className="text-white text-sm font-black truncate">{review.name}</h4>
						<p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] truncate">{review.company}</p>
					  </div>
					  <div className="text-[10px] text-slate-500 font-mono shrink-0 pl-2">
						{formatDate(review.created_at)}
					  </div>
					</div>
				  </div>
				))}
			  </div>
			)}
		  </div>

		</div>
	  </div>

	  {/* Scrollbar styling for the reviews list */}
	  <style dangerouslySetInnerHTML={{__html: `
		.custom-scrollbar::-webkit-scrollbar { width: 4px; }
		.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
		.custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
		.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4af37; }
	  `}} />
	</div>
  );
}