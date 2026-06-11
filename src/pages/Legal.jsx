import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Legal() {
  const { isAr } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('compliance');

  useEffect(() => {
	const params = new URLSearchParams(location.search);
	const tab = params.get('tab');
	if (tab) setActiveTab(tab);
  }, [location]);

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-20 px-6 font-sans relative">
	  <div 
		className="absolute inset-0 z-0 opacity-5 pointer-events-none"
		style={{ backgroundImage: 'url(/projects/operix-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
	  ></div>

	  <div className="max-w-4xl mx-auto space-y-12 relative z-10">
		
		{/* Header Title Grid */}
		<div className="space-y-4 text-center">
		  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1.5 rounded-full inline-block shadow-sm">
			{isAr ? "الحوكمة والامتثال التنظيمي" : "Ecosystem Trust & Governance"}
		  </span>
		  {/* Navy to Gold Gradient Header */}
		  <h1 className="text-4xl md:text-5xl font-black tracking-tight font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "الوثائق القانونية والسياسات العامة" : "Regulatory Compliance & Documentation"}
		  </h1>
		</div>

		{/* Tab Controls Matrix */}
		<div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-slate-100 p-2 rounded-2xl border border-slate-200 shadow-inner">
		  <button 
			onClick={() => setActiveTab('compliance')} 
			className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'compliance' ? 'bg-[#1e2d40] text-white shadow-md' : 'text-slate-500 hover:text-[#1e2d40] hover:bg-slate-200'}`}
		  >
			{isAr ? "الامتثال الحكومي" : "Government Compliance"}
		  </button>
		  <button 
			onClick={() => setActiveTab('terms')} 
			className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'terms' ? 'bg-[#1e2d40] text-white shadow-md' : 'text-slate-500 hover:text-[#1e2d40] hover:bg-slate-200'}`}
		  >
			{isAr ? "شروط الخدمة" : "Terms of Service"}
		  </button>
		  <button 
			onClick={() => setActiveTab('privacy')} 
			className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'privacy' ? 'bg-[#1e2d40] text-white shadow-md' : 'text-slate-500 hover:text-[#1e2d40] hover:bg-slate-200'}`}
		  >
			{isAr ? "سياسة البيانات والخصوصية" : "Data Privacy"}
		  </button>
		</div>

		{/* Legal Text Document Container */}
		<div className="bg-white p-8 md:p-14 rounded-3xl shadow-sm border border-slate-200">
		  
		  {/* SECTION A: COMPLIANCE */}
		  {activeTab === 'compliance' && (
			<div className="space-y-6">
			  {/* Gradient Section Header */}
			  <h2 className="text-2xl font-black font-serif border-b border-slate-100 pb-4 bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent">
				{isAr ? "1. الملاءمة والامتثال للأنظمة الإقليمية" : "1. Local Regulatory & WPS Mandates"}
			  </h2>
			  <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
				<p>
				  {isAr 
					? "تلتزم منصة أوبيريكس للحلول المتكاملة (OPERIX Solutions) بالامتثال الكامل والربط المباشر مع كافة الأنظمة المنصوص عليها بموجب وزارة الموارد البشرية والتنمية الاجتماعية في المملكة العربية السعودية، وعلى رأسها نظام حماية الأجور (WPS)."
					: "OPERIX Solutions platforms operate in absolute structural alignment with regional Ministry of Human Resources parameters, enforcing strict audit controls mandated by the localized Wage Protection System (WPS)."}
				</p>
				<p>
				  {isAr 
					? "كما أن النظام المالي الموحد (FMIS) مهيأ هندسياً ليتوافق مع متطلبات المرحلة الثانية التابعة لهيئة الزكاة والضريبة والجمارك (ZATCA)، مما يضمن الفوترة الإلكترونية الفورية والأتمتة الحسابية دون خلل تشغيلي."
					: "Furthermore, the integrated financial database engine (FMIS) complies with Phase 2 Integration mandates outlined by the Zakat, Tax and Customs Authority (ZATCA), enabling transparent automated e-invoicing ledger tracking."}
				</p>
			  </div>
			</div>
		  )}

		  {/* SECTION B: TERMS OF SERVICE */}
		  {activeTab === 'terms' && (
			<div className="space-y-6">
			  {/* Gradient Section Header */}
			  <h2 className="text-2xl font-black font-serif border-b border-slate-100 pb-4 bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent">
				{isAr ? "2. اتفاقية ترخيص المنظومة وشروط الخدمة" : "2. Master SaaS Subscription Agreement"}
			  </h2>
			  <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
				<p>
				  {isAr 
					? "تمنح هذه الاتفاقية المنشأة المتعاقدة رخصة استخدام سحابية غير حصريّة للوصول إلى لوحات تحكم أوبيريكس المحددة بطلب الخدمة (HRIS, Operations, Care, FMIS). يحظر بشكل بات التلاعب بالهندسة العكسية للنظام أو كود المصدر."
					: "This subscription establishes a restricted, non-transferable cloud license authorizing corporate client entities to access designated product environments (HRIS, Operations, Care, FMIS). Source-code extraction or system reverse-engineering will trigger immediate workspace revocation."}
				</p>
				<p>
				  {isAr 
					? "نضمن استقراراً تشغيلياً للبنية التحتية بنسبة 99.9% (SLA). يتم جدولة فترات الصيانة الوقائية الدورية خارج ساعات العمل الرسمية وإبلاغ مسؤولي النظام بها مسبقاً بفترة لا تقل عن 48 ساعة."
					: "OPERIX Solutions maintains a benchmark Service Level Agreement (SLA) guarantee of 99.9% uptime. Preventive backend infrastructure refactoring windows are restricted to off-peak periods, with emergency declarations broadcasted 48 hours prior to deployment."}
				</p>
			  </div>
			</div>
		  )}

		  {/* SECTION C: PRIVACY */}
		  {activeTab === 'privacy' && (
			<div className="space-y-6">
			  {/* Gradient Section Header */}
			  <h2 className="text-2xl font-black font-serif border-b border-slate-100 pb-4 bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent">
				{isAr ? "3. سياسة حماية البيانات والخصوصية الجغرافية الحيوية" : "3. Localized Sovereignty & Biometric Encryption"}
			  </h2>
			  <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
				<p>
				  {isAr 
					? "نظراً لأن أنظمة أوبيريكس تعتمد على تتبع النطاقات الجغرافية (GPS Fence) لتسجيل حضور العمالة وتعتمد منصة الكاميرات (ANPR) على التعرف على لوحات المركبات وتطبيق الموظف على بصمة الوجه (Face-ID)، فإننا نطبق أعلى معايير التشفير العسكري لحماية الخصوصية."
					: "As OPERIX modules deploy GPS geofencing, Automated Number-Plate Recognition (ANPR) camera logs, and employee Face-ID biometric scanning, all visual and vector hash values are subjected to high-grade localized hashing algorithms."}
				</p>
				<p>
				  {isAr 
					? "يتم استضافة وحفظ كافة سجلات المنشآت الطبية التابعة لـ أوبيريكس كير وسجلات الرواتب والموظفين داخل خوادم محلية آمنة ومغلقة تماماً متوافقة مع ضوابط الأمن السيبراني المحلّي وسياسات حوكمة البيانات الوطنية لمنع أي تسريب."
					: "To satisfy rigorous security compliance frameworks, all healthcare records controlled by OPERIX Care and corporate files under HRIS are hosted entirely on cloud servers located within national borders, complying with strict regional data sovereignty and cybersecurity mandates."}
				</p>
			  </div>
			</div>
		  )}

		</div>
	  </div>
	</div>
  );
}