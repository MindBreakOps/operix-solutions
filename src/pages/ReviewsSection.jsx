import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  const { isAr } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Standard fields based on your previous form
  const [form, setForm] = useState({ name: '', company: '', rating: 5, feedback: '' });

  useEffect(() => {
	fetchReviews();
  }, []);

  const fetchReviews = async () => {
	// Note: Ensure 'operix_reviews' matches your actual Supabase table name. If not, change it to 'reviews'.
	const { data } = await supabase
	  .from('operix_reviews')
	  .select('*')
	  .order('created_at', { ascending: false })
	  .limit(6);
	
	if (data) setReviews(data);
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	if (!form.name || !form.feedback) return;
	
	setIsSubmitting(true);
	await supabase.from('operix_reviews').insert([{
	  name: form.name,
	  company: form.company,
	  rating: form.rating,
	  feedback: form.feedback
	}]);
	
	setForm({ name: '', company: '', rating: 5, feedback: '' });
	await fetchReviews();
	setIsSubmitting(false);
  };

  return (
	<div className="w-full flex flex-col lg:flex-row gap-6 items-start font-sans">
	  
	  {/* ─── COMPACT FORM ─── */}
	  <div className="w-full lg:w-1/3 bg-white border border-slate-200 rounded-xl p-6 shadow-sm shrink-0">
		<h3 className="text-sm font-bold text-[#1e2d40] mb-4">
		  {isAr ? "شاركنا رأيك" : "Leave a Review"}
		</h3>
		
		<form onSubmit={handleSubmit} className="space-y-3">
		  <input 
			type="text" 
			placeholder={isAr ? "الاسم" : "Name"} 
			value={form.name}
			onChange={(e) => setForm({ ...form, name: e.target.value })}
			required
			className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-800 outline-none focus:border-slate-400 transition-colors"
		  />
		  <input 
			type="text" 
			placeholder={isAr ? "الشركة" : "Company"} 
			value={form.company}
			onChange={(e) => setForm({ ...form, company: e.target.value })}
			className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-800 outline-none focus:border-slate-400 transition-colors"
		  />
		  
		  <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-md border border-slate-200">
			<span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
			  {isAr ? "التقييم" : "Rating"}
			</span>
			<div className="flex gap-1">
			  {[1, 2, 3, 4, 5].map((star) => (
				<button 
				  key={star} 
				  type="button" 
				  onClick={() => setForm({ ...form, rating: star })}
				  className="outline-none"
				>
				  <Star 
					size={14} 
					className={star <= form.rating ? "text-amber-400 fill-amber-400" : "text-slate-300"} 
				  />
				</button>
			  ))}
			</div>
		  </div>

		  <textarea 
			placeholder={isAr ? "التعليق" : "Feedback"} 
			value={form.feedback}
			onChange={(e) => setForm({ ...form, feedback: e.target.value })}
			required
			rows={3}
			className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-800 outline-none focus:border-slate-400 transition-colors resize-none"
		  />
		  
		  <button 
			type="submit" 
			disabled={isSubmitting}
			className="w-full bg-[#1e2d40] hover:bg-slate-800 text-white transition-colors py-2 rounded-md text-xs font-bold uppercase tracking-widest disabled:opacity-50"
		  >
			{isSubmitting ? (isAr ? "جاري الإرسال..." : "Submitting...") : (isAr ? "إرسال التقييم" : "Publish Review")}
		  </button>
		</form>
	  </div>

	  {/* ─── COMPACT REVIEWS GRID ─── */}
	  <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
		{reviews.length > 0 ? (
		  reviews.map((review, i) => (
			<div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
			  <div>
				<div className="flex items-center justify-between mb-2">
				  <div className="flex gap-0.5">
					{[...Array(5)].map((_, index) => (
					  <Star 
						key={index} 
						size={12} 
						className={index < (review.rating || 5) ? "text-amber-400 fill-amber-400" : "text-slate-200"} 
					  />
					))}
				  </div>
				</div>
				<p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
				  "{review.feedback}"
				</p>
			  </div>
			  <div>
				<h4 className="text-xs font-bold text-[#1e2d40]">{review.name}</h4>
				{review.company && (
				  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
					{review.company}
				  </span>
				)}
			  </div>
			</div>
		  ))
		) : (
		  <div className="col-span-full py-10 text-center text-xs font-medium text-slate-400 bg-white border border-slate-200 rounded-xl shadow-sm">
			{isAr ? "لا توجد تقييمات حتى الآن." : "No reviews available yet."}
		  </div>
		)}
	  </div>

	</div>
  );
}