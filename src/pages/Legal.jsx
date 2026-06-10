import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/global.css';

export default function Legal() {
  const { isAr } = useLanguage();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('compliance');

  // Sync state with URL hash/search parameters for links pointing from footer
  useEffect(() => {
	const params = new URLSearchParams(location.search);
	const tab = params.get('tab');
	if (tab) setActiveTab(tab);
  }, [location]);

  return (
	<div className="legal-portal-container animate-in">
	  
	  <div className="space-y-3">
		<span className="text-xs font-extrabold uppercase tracking-widest text-[#c9a84c]">
		  {isAr ? "الحوكمة والامتثال التنظيمي" : "Ecosystem Trust & Governance"}
		</span>
		<h1 className="text-4xl font-black text-[#1e2d40]">
		  {isAr ? "الوثائق القانونية والسياسات العامة" : "Regulatory Compliance & Documentation"}
		</h1>
	  </div>

	  {/* Interactive Switcher */}
	  <div className="legal-tab-strip">
		<button onClick={() => setActiveTab('compliance')} className={`legal-tab-btn ${activeTab === 'compliance' ? 'active' : ''}`}>
		  {isAr ? "الامتثال الحكومي" : "Government Compliance"}
		</button>
		<button onClick={() => setActiveTab('terms')} className={`legal-tab-btn ${activeTab === 'terms' ? 'active' : ''}`}>
		  {isAr ? "شروط الخدمة" : "Terms of Service"}
		</button>
		<button onClick={() => setActiveTab('privacy')} className={`legal-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}>
		  {isAr ? "سياسة البيانات والخصوصية" : "Data Privacy & Biometrics"}
		</button>
	  </div>

	  {/* CARD LAYOUT */}
	  <div className="legal-document-card">
		
		{/* SECTION A: REGULATORY COMPLIANCE */}
		{activeTab === 'compliance' && (
		  <div className="space-y-6 animate-in">
			<h2 className="legal-section-title">{isAr ? "1. الملاءمة والامتثال للأنظمة الإقليمية" : "1. Local Regulatory & WPS Mandates"}</h2>
			<div className="legal-body-text">
			  <p>
				{isAr 
				  ? "تلتزم منصة أوبيريكس للحلول المتكاملة (OPERIX Solutions) بالامتثال الكامل والربط المباشر مع كافة الأنظمة المنصوص عليها بموجب وزارة الموارد البشرية والتنمية الاجتماعية في المملكة العربية السعودية، وعلى رأسها نظام حماية الأجور (WPS)."
				  : "OPERIX Solutions platforms operate in absolute structural alignment with the regional Ministry of Human Resources and Social Development parameters, enforcing the strict audit controls mandated by the localized Wage Protection System (WPS)."}
			  </p>
			  <p>
				{isAr 
				  ? "كما أن النظام المالي الموحد (FMIS) مهيأ هندسياً ليتوافق مع متطلبات المرحلة الثانية (مرحلة الربط والتكامل) التابعة لهيئة الزكاة والضريبة والجمارك (ZATCA)، مما يضمن الفوترة الإلكترونية الفورية والأتمتة الحسابية دون خلل تشغيلي."
				  : "Furthermore, the integrated financial database engine (FMIS) is architected to comply with the Phase 2 Integration mandates outlined by the Zakat, Tax and Customs Authority (ZATCA), enabling transparent automated e-invoicing ledger tracking across multi-tenant corporate workspaces."}
			  </p>
			</div>
		  </div>
		)}

		{/* SECTION B: TERMS OF SERVICE */}
		{activeTab === 'terms' && (
		  <div className="space-y-6 animate-in">
			<h2 className="legal-section-title">{isAr ? "2. اتفاقية ترخيص المنظومة وشروط الخدمة" : "2. Master SaaS Subscription Agreement"}</h2>
			<div className="legal-body-text">
			  <p>
				{isAr 
				  ? "تمنح هذه الاتفاقية المنشأة المتعاقدة رخصة استخدام سحابية غير حصريّة للوصول إلى لوحات تحكم أوبيريكس المحددة بطلب الخدمة (HRIS, Operations, Care, FMIS). يحظر بشكل بات التلاعب بالهندسة العكسية للنظام أو كود المصدر."
				  : "This subscription establishes a restricted, non-transferable cloud license authorizing corporate client entities to access designated product environments (HRIS, Operations, Care, FMIS). Source-code extraction or system reverse-engineering will trigger immediate workspace revocation."}
			  </p>
			  <p>
				{isAr 
				  ? "نضمن استقراراً تشغيلياً للبنية التحتية بنسبة 99.9% (SLA). يتم جدولة فترات الصيانة الوقائية الدورية خارج ساعات العمل الرسمية وإبلاغ مسؤولي النظام بها مسبقاً بفترة لا تقل عن 48 ساعة."
				  : "OPERIX Solutions maintains a benchmark Service Level Agreement (SLA) guarantee of 99.9% uptime. Preventive backend infrastructure refactoring windows are restricted to off-peak periods, with emergency maintenance declarations broadcasted 48 hours prior to deployment."}
			  </p>
			</div>
		  </div>
		)}

		{/* SECTION C: PRIVACY & BIOMETRICS */}
		{activeTab === 'privacy' && (
		  <div className="space-y-6 animate-in">
			<h2 className="legal-section-title">{isAr ? "3. سياسة حماية البيانات والخصوصية الجغرافية الحيوية" : "3. Localized Sovereignty & Biometric Encryption"}</h2>
			<div className="legal-body-text">
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
  );
}