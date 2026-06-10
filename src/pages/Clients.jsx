import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Clients() {
  const { isAr } = useLanguage();

  return (
	<div className="clients-wrapper animate-in">
	  <div className="text-center max-w-2xl mx-auto space-y-4">
		<h1 className="text-4xl font-black text-[#1e2d40]">{isAr ? "شركاء النجاح والمنظومات" : "Clients & Corporate Partners"}</h1>
		<p className="text-slate-500 text-sm font-medium">{isAr ? "ندير البنية التحتية الرقمية لأكبر الكيانات الاقتصادية والمنشآت." : "Empowering industry leaders across the region with customized architecture solutions."}</p>
	  </div>

	  <div className="white-label-banner">
		<div className="space-y-4 max-w-2xl">
		  <span className="bg-[#c9a84c] text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{isAr ? "تخصيص الهوية بالكامل" : "Custom White-Label Engineering"}</span>
		  <h2 className="text-2xl md:text-3xl font-black tracking-tight">{isAr ? "أنظمتك وموقعك الإلكتروني.. بهويتك المستقلة" : "Your System, Your Identity, Your Brand"}</h2>
		  <p className="text-slate-300 text-sm leading-relaxed font-medium">
			{isAr 
			  ? "نمتلك القدرة الكاملة على إعادة بناء وتعديل وتطوير كافة أنظمة أوبيريكس (HRIS, Operations, FMIS, Care) لتصدر بالكامل تحت اسم منشأتك التجارية، بهويتك البصرية الخاصة، وموقع إلكتروني مستقل تماماً لإدارة وتوسيع نطاق أعمالك."
			  : "We build and deploy completely isolated instances of our architectures tailored exclusively to your corporate banner. Get full access to custom white-label setups, tailored brand colors, specialized modules, and dedicated standalone web entry domains."}
		  </p>
		</div>
	  </div>
	</div>
  );
}