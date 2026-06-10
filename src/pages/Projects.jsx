import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, Cpu } from 'lucide-react';

export default function Projects() {
  const { isAr } = useLanguage();

  return (
	<div className="projects-wrapper animate-in">
	  <div className="text-center max-w-2xl mx-auto space-y-4">
		<h1 className="text-4xl font-black text-[#1e2d40]">{isAr ? "مصفوفة المشاريع والعمليات" : "Active Deployments Matrix"}</h1>
		<p className="text-slate-500 text-sm font-medium">{isAr ? "استعراض حي للعمليات الميدانية والأنظمة الذكية النشطة حالياً." : "Live real-time operational telemetry tracking corporate personnel and gateway status profiles globally."}</p>
	  </div>

	  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
		<div className="matrix-container p-8 space-y-6">
		  <div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
			  <div className="w-10 h-10 bg-[#1e2d40] text-white rounded-xl flex items-center justify-center"><Smartphone size={18} /></div>
			  <div>
				<h3 className="font-bold text-[#1e2d40]">{isAr ? "التطبيقات الميدانية المتكاملة" : "Integrated Field Applications"}</h3>
				<p className="text-xs text-slate-400 font-medium">{isAr ? "مزامنة لحظية للموظفين" : "Instant Workforce Interlink"}</p>
			  </div>
			</div>
			<span className="app-pill">Live Sync</span>
		  </div>
		  <p className="text-slate-500 text-sm leading-relaxed font-medium">
			{isAr 
			  ? "ترتبط أنظمتنا الرئيسية (HRIS والعمليات) مباشرة بتطبيقات ميدانية مخصصة تتيح للموظفين في المواقع تسجيل الحضور عبر الوجه Face-ID، تتبع المهام عبر نظام GPS البغرافي، وإدخال البيانات لمركز القيادة فورياً."
			  : "Our HRIS and OPERATIONS modules map data cleanly into custom cross-platform applications. Field crews can execute Face-ID biometrics clock-ins, upload logging manifests, and receive automated schedule updates on the fly."}
		  </p>
		</div>

		<div className="matrix-container p-8 space-y-6">
		  <div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
			  <div className="w-10 h-10 bg-[#c9a84c] text-white rounded-xl flex items-center justify-center"><Cpu size={18} /></div>
			  <div>
				<h3 className="font-bold text-[#1e2d40]">{isAr ? "أنظمة بوابات قراءة اللوحات" : "ANPR & FMIS Infrastructure"}</h3>
				<p className="text-xs text-slate-400 font-medium">{isAr ? "أتمتة الدخول والتحكم المالي" : "Automated Gateway Matrix"}</p>
			  </div>
			</div>
			<span className="app-pill">ANPR Active</span>
		  </div>
		  <p className="text-slate-500 text-sm leading-relaxed font-medium">
			{isAr 
			  ? "تكامل تام مع كاميرات التعرف التلقائي على لوحات المركبات بداخل مصفوفة إدارة المنشآت والمرافق لتحقيق أتمتة مالية وتشغيلية لا تتطلب أي تدخل بشري."
			  : "Complete automation matrix linking automated number-plate recognition camera arrays directly to our FMIS modules, authorizing terminal access and recording logistics audit histories programmatically."}
		  </p>
		</div>
	  </div>
	</div>
  );
}