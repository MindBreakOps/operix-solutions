import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar } from 'lucide-react';

export default function News() {
  const { isAr } = useLanguage();

  // ─── CMS READY DATA ARRAY ───
  const newsData = [
	{
	  id: 1,
	  title: isAr ? "إطلاق النسخة 2.4 من نظام إدارة العمليات" : "OPERIX Operations V2.4 Deployed",
	  content: isAr 
		? "تحديث شامل لمصفوفة قراءة اللوحات (ANPR) وتحسينات كبرى في تتبع القوى العاملة الميدانية."
		: "Major update to the ANPR telemetry matrix and massive improvements to field workforce tracking.",
	  mediaUrl: "projects/ops.png",
	  date: "June 11, 2026"
	},
	{
	  id: 2,
	  title: isAr ? "اعتماد المرحلة الثانية من فوترة الزكاة" : "ZATCA Phase 2 E-Invoicing Certified",
	  content: isAr 
		? "تم اعتماد نظام الإدارة المالية أوبيريكس (FMIS) بشكل رسمي ومباشر مع هيئة الزكاة والضريبة والجمارك."
		: "The OPERIX FMIS ecosystem has been officially certified for direct integration with ZATCA phase 2 compliance.",
	  mediaUrl: "/projects/fmis.png",
	  date: "May 28, 2026"
	}
  ];

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-16 px-4 md:px-6 font-sans">
	  <div className="max-w-6xl mx-auto space-y-16">
		
		<div className="text-center space-y-4">
		  <h1 className="text-4xl md:text-5xl font-black text-[#1e2d40] font-serif tracking-tight">
			{isAr ? "أخبار المنظومة التشغيلية" : "Ecosystem Intelligence & News"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
			{isAr 
			  ? "تحديثات لحظية حول إطلاق الأنظمة الجديدة، والبيانات التشغيلية." 
			  : "Real-time updates regarding system rollouts, operational telemetry, and feature drops."}
		  </p>
		</div>

		{/* DYNAMIC CMS FEED */}
		<div className="space-y-10">
		  {newsData.map((article) => (
			<div key={article.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col md:flex-row">
			  <div className="md:w-1/3 h-48 md:h-auto bg-slate-900 overflow-hidden">
				<img src={article.mediaUrl} alt={article.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
			  </div>
			  <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center space-y-4">
				<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">
				  <Calendar size={14} /> {article.date}
				</div>
				<h3 className="text-2xl font-black text-[#1e2d40] font-serif">{article.title}</h3>
				<p className="text-sm text-slate-500 font-medium leading-relaxed">{article.content}</p>
			  </div>
			</div>
		  ))}
		</div>

	  </div>
	</div>
  );
}