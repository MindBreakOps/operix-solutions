import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Settings, Activity, CreditCard, ExternalLink, 
  Building2, Globe, Landmark, ShieldCheck, 
  ImageIcon, X, ChevronRight, ChevronLeft, Info
} from 'lucide-react';

export default function Projects() {
  const { isAr } = useLanguage();
  
  // States for the Preview Modal Carousel
  const [activePreview, setActivePreview] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // ─── SWIPE GESTURE ENGINE STATES ───
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Prevent background scrolling when modal is open
  useEffect(() => {
	if (activePreview) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'unset';
	return () => { document.body.style.overflow = 'unset'; };
  }, [activePreview]);

  // ─── TIER 1: OPERIX CORE ECOSYSTEM ───
  const corePlatforms = [
	{
	  id: 'operations',
	  titleEn: 'OPERIX Operations',
	  titleAr: 'أوبيريكس لإدارة العمليات',
	  subEn: 'Fleet & Workforce Matrix',
	  subAr: 'إدارة أسطول العمليات والقوى العاملة',
	  descEn: 'The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.',
	  descAr: 'محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات بكاميرات التعرف الذكي (ANPR)، وتوجيه القوى العاملة.',
	  url: 'https://www.ops.operix-solutions.online',
	  icon: <Settings size={24} />,
	  color: 'bg-white text-red-600 border border-slate-100',
	  image: '/projects/ops.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#1e2d40]/90 backdrop-blur border border-slate-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE TELEMETRY
		</div>
	  ),
	  previews: [
		{ 
		  url: '/projects/ops/exe-dash.png', 
		  titleEn: 'Executive Command Center', 
		  titleAr: 'مركز القيادة التنفيذية',
		  descEn: 'High-level administrative hub for C-Suite approvals, IT operations, and identity access management across the entire enterprise.',
		  descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية، وعمليات تقنية المعلومات، وإدارة هويات الوصول عبر المؤسسة.'
		},
		{ 
		  url: '/projects/ops/ops-dash.mp4', 
		  titleEn: 'Enterprise Operations Matrix', 
		  titleAr: 'مصفوفة عمليات المؤسسة',
		  descEn: 'The central nervous system of the operations floor. Provides direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.',
		  descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.'
		},
		{ 
		  url: '/projects/ops/ai-email-ops.png', 
		  titleEn: 'AI-Powered Communications Core', 
		  titleAr: 'مركز الاتصالات المدعوم بالذكاء الاصطناعي',
		  descEn: 'Smart email drafting utilizing generative AI. Features pre-configured corporate templates for official notices, updates, and HR compliance letters.',
		  descAr: 'صياغة ذكية لرسائل البريد الإلكتروني باستخدام الذكاء الاصطناعي التوليدي. يحتوي على قوالب مؤسسية مسبقة الإعداد للإشعارات الرسمية والتحديثات.'
		},
		{ 
		  url: '/projects/ops/analyticsandreports-ops.png', 
		  titleEn: 'Advanced Analytics & Reporting', 
		  titleAr: 'التحليلات المتقدمة والتقارير',
		  descEn: 'Dynamic data visualization and custom report generation. Filter vast datasets across the enterprise and export directly to Excel or secure PDF formats.',
		  descAr: 'تصوير مرئي ديناميكي للبيانات وإنشاء تقارير مخصصة. تصفية مجموعات البيانات الضخمة عبر المؤسسة وتصديرها مباشرة بتنسيقات إكسل أو PDF آمنة.'
		},
		{ 
		  url: '/projects/ops/crm-ops.png', 
		  titleEn: 'CRM & Lead Pipeline Matrix', 
		  titleAr: 'مصفوفة إدارة علاقات العملاء (CRM)',
		  descEn: 'Centralized marketing workspace tracking ad spend, campaign ROI, and lead conversion funnels in real-time.',
		  descAr: 'مساحة عمل تسويقية مركزية لتتبع الإنفاق الإعلاني، وعائد الاستثمار للحملات، ومسارات تحويل العملاء المحتملين في الوقت الفعلي.'
		},
		{ 
		  url: '/projects/ops/doc-generateandsendemail-ops.png', 
		  titleEn: 'Automated Document Generator', 
		  titleAr: 'منشئ المستندات المؤسسية الآلي',
		  descEn: 'Instantly generate official employment offers, contracts, and internal memos complete with dynamic variables and secure ledger archiving.',
		  descAr: 'إنشاء فوري لعروض العمل الرسمية والعقود والمذكرات الداخلية مع متغيرات ديناميكية وأرشفة آمنة في السجل.'
		},
		{ 
		  url: '/projects/ops/external-standaloneapps-ops.png', 
		  titleEn: 'Decentralized Portals & QR Gateway', 
		  titleAr: 'البوابات اللامركزية ورموز الاستجابة السريعة',
		  descEn: 'Manage public-facing touchpoints and standalone apps for gig workers, field staff, and VIP valet clients via generated access links and QR codes.',
		  descAr: 'إدارة نقاط الاتصال العامة والتطبيقات المستقلة للعاملين المستقلين والموظفين الميدانيين وعملاء خدمة صف السيارات (Valet) عبر روابط وصول ورموز QR.'
		},
		{ 
		  url: '/projects/ops/facilitandtraining-ops.png', 
		  titleEn: 'Facility Configuration & Academy Hub', 
		  titleAr: 'تهيئة المرافق وإدارة الأكاديميات',
		  descEn: 'Spin up and configure complex project environments, set daily operational targets, and manage internal training course capacities.',
		  descAr: 'إنشاء وتهيئة بيئات مشاريع معقدة، وتحديد أهداف التشغيل اليومية، وإدارة السعة الاستيعابية للدورات التدريبية الداخلية.'
		},
		{ 
		  url: '/projects/ops/hr-ops.png', 
		  titleEn: 'Master HR & Roster Directory', 
		  titleAr: 'الدليل الشامل للموارد البشرية والورديات',
		  descEn: 'Global administrative view of human capital. Track shift assignments, monitor active timesheets, and execute top-level personnel overrides.',
		  descAr: 'عرض إداري شامل لرأس المال البشري. تتبع المهام والورديات، ومراقبة سجلات الحضور النشطة، وتنفيذ الإجراءات الإدارية العليا للموظفين.'
		},
		{ 
		  url: '/projects/ops/it-ops.png', 
		  titleEn: 'IT IAM & Infrastructure Control', 
		  titleAr: 'عمليات تقنية المعلومات وإدارة الهويات',
		  descEn: 'Secure Identity and Access Management (IAM) panel. Provision user roles, manage system permissions, and monitor core infrastructure health.',
		  descAr: 'لوحة آمنة لإدارة الهويات والوصول (IAM). منح أدوار المستخدمين، وإدارة صلاحيات النظام، ومراقبة صحة البنية التحتية الأساسية.'
		},
		{ 
		  url: '/projects/ops/performance-ops.png', 
		  titleEn: 'Live Operational KPI Telemetry', 
		  titleAr: 'القياس اللحظي لمؤشرات الأداء (KPIs)',
		  descEn: 'High-level overview of global enterprise metrics, tracking ANPR traffic flow, active subscribers, and operational revenue in real time.',
		  descAr: 'نظرة عامة رفيعة المستوى على مقاييس المؤسسة، تتبع تدفق حركة المرور (ANPR)، والمشتركين النشطين، والإيرادات التشغيلية في الوقت الفعلي.'
		},
		{ 
		  url: '/projects/ops/setshift-ops.png', 
		  titleEn: 'Geofenced Shift Orchestration', 
		  titleAr: 'إدارة الورديات بنطاق جغرافي (Geofencing)',
		  descEn: 'Pinpoint workforce deployment using interactive mapping and strict GPS radius limits to guarantee accurate on-site field staff attendance.',
		  descAr: 'التوجيه الدقيق للقوى العاملة باستخدام الخرائط التفاعلية وحدود نطاق جغرافي صارمة لضمان دقة حضور الموظفين الميدانيين في الموقع.'
		}
	  ]
	},
	{
	  id: 'fmis',
	  titleEn: 'OPERIX FMIS',
	  titleAr: 'أوبيريكس للإدارة المالية',
	  subEn: 'Corporate Ledger System',
	  subAr: 'نظام السجلات المالية للشركات',
	  descEn: 'Financial management ecosystem, corporate ledger reconciliation, ZATCA Phase 2 Integration Matrix, and automated budget loops.',
	  descAr: 'نظام إدارة مالية متكامل يشمل التسويات المحاسبية للشركات، متوافق بالكامل مع متطلبات المرحلة الثانية لهيئة الزكاة والدخل (ZATCA).',
	  url: 'https://www.fmis.operix-solutions.online',
	  icon: <CreditCard size={24} />,
	  color: 'bg-emerald-900 text-white',
	  image: '/projects/fmis.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#c9a84c]/95 backdrop-blur border border-[#c9a84c] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <ShieldCheck size={14} /> ZATCA VERIFIED
		</div>
	  ),
	  previews: [
		{ 
		  url: '/projects/fmis/dash-fmis.png', 
		  titleEn: 'Executive Dashboard & P&L', 
		  titleAr: 'لوحة القيادة التنفيذية والأرباح والخسائر',
		  descEn: 'Real-time overview of profit and loss, revenue pipelines, and pending liabilities. Provides C-level executives with immediate financial health metrics.',
		  descAr: 'نظرة عامة لحظية على الأرباح والخسائر، وتدفقات الإيرادات، والالتزامات المعلقة. توفر للإدارة التنفيذية مؤشرات فورية للصحة المالية.'
		},
		{ 
		  url: '/projects/fmis/opx-ai-fmis.png', 
		  titleEn: 'OPERIX AI Copilot Integration', 
		  titleAr: 'مساعد الذكاء الاصطناعي المدمج',
		  descEn: 'Embedded AI assistant that analyzes financial databases, automates complex module navigation, and generates live telemetry reports on command.',
		  descAr: 'مساعد ذكاء اصطناعي مدمج يحلل قواعد البيانات المالية، ويقوم بأتمتة التنقل المعقد بين الوحدات، ويولد تقارير لحظية عند الطلب.'
		},
		{ 
		  url: '/projects/fmis/quot-fmis.png', 
		  titleEn: 'Automated Quotation Builder', 
		  titleAr: 'منشئ عروض الأسعار التلقائي',
		  descEn: 'Streamlined proposal generation tool that maps directly to the CRM, allowing quick drafting, approval, and dispatching of corporate estimates.',
		  descAr: 'أداة متطورة لإنشاء العروض ترتبط مباشرة بنظام إدارة علاقات العملاء (CRM)، مما يتيح صياغة واعتماد وإرسال التقديرات المالية للشركات بسرعة.'
		},
		{ 
		  url: '/projects/fmis/help-fmis.png', 
		  titleEn: 'System Architecture & Help Matrix', 
		  titleAr: 'هيكلية النظام والمساعدة الذكية',
		  descEn: 'Comprehensive, built-in documentation and mission-control mapping that guides users through GL, WBS, and Payroll engine workflows.',
		  descAr: 'وثائق ومصفوفة توجيه شاملة مدمجة ترشد المستخدمين عبر سير عمل دفتر الأستاذ العام، وهيكلة المشاريع (WBS)، ومحرك مسيرات الرواتب.'
		}
	  ]
	},
	{
	  id: 'hris',
	  titleEn: 'OPERIX HRIS',
	  titleAr: 'أوبيريكس لإدارة الموارد البشرية',
	  subEn: 'Human Capital Infrastructure',
	  subAr: 'بنية رأس المال البشري',
	  descEn: 'Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service pipelines.',
	  descAr: 'أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب بنطاق الحماية الجغرافي (GPS)، ومحرك احتساب الاستقطاعات التلقائي للرواتب.',
	  url: 'https://www.hris.operix-solutions.online',
	  icon: <Users size={24} />,
	  color: 'bg-black text-white',
	  image: '/projects/hris.png',
	  interactiveBadge: (
		<div className="absolute bottom-4 left-4 bg-emerald-700/90 backdrop-blur border border-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-white animate-ping" /> GPS FENCE ACTIVE
		</div>
	  ),
	  previews: [
		{ 
		  url: '/projects/hris/ai-scanner-hris.png', 
		  titleEn: 'AI-Powered CV Scanner', 
		  titleAr: 'الماسح الضوئي للسير الذاتية بالذكاء الاصطناعي',
		  descEn: 'Automated recruitment engine utilizing Edge AI to instantly parse, score, and extract data from applicant CVs, mapping them directly to open requisitions.',
		  descAr: 'محرك توظيف آلي يعتمد على الذكاء الاصطناعي الطرفي لقراءة السير الذاتية واستخراج البيانات منها وتقييمها فورياً، مع ربطها مباشرة بالوظائف الشاغرة.'
		},
		{ 
		  url: '/projects/hris/resutl-ats-hris.png', 
		  titleEn: 'AI Scan Results & Match Analysis', 
		  titleAr: 'نتائج المسح الضوئي وتحليل التطابق',
		  descEn: 'Detailed breakdown of candidate profiles, showcasing AI-generated skill gap analysis and automated role matching probabilities.',
		  descAr: 'تحليل مفصل لملفات المرشحين، يعرض الفجوات المهارية المستخرجة بالذكاء الاصطناعي واحتماليات التطابق التلقائي مع الأدوار الوظيفية.'
		},
		{ 
		  url: '/projects/hris/emp-pro-hris.png', 
		  titleEn: 'Master Employee Profiles', 
		  titleAr: 'الملفات الشاملة للموظفين',
		  descEn: 'Centralized digital twin of the workforce. Stores identity documents, contract financials, and live disciplinary or attendance records in one secure vault.',
		  descAr: 'توأمة رقمية مركزية للقوى العاملة. تحفظ مستندات الهوية، والبيانات المالية للعقود، والسجلات الحية للحضور والانضباط في خزانة آمنة واحدة.'
		},
		{ 
		  url: '/projects/hris/pipline-hris.png', 
		  titleEn: 'Kanban Recruitment Pipeline', 
		  titleAr: 'مسار التوظيف وإدارة المرشحين',
		  descEn: 'Visual drag-and-drop applicant tracking system (ATS). Seamlessly move candidates from initial screening to final offer with automated status triggers.',
		  descAr: 'نظام تتبع للمتقدمين (ATS) مرئي يعمل بالسحب والإفلات. ينقل المرشحين بسلاسة من الفرز الأولي إلى العرض النهائي مع مشغلات حالة تلقائية.'
		},
		{ 
		  url: '/projects/hris/visa-mgm-hris.png', 
		  titleEn: 'Muqeem Visa Management', 
		  titleAr: 'إدارة تأشيرات مقيم',
		  descEn: 'Direct API integration for tracking expatriate Iqama expiries, managing exit/entry visas, and ensuring 100% governmental compliance.',
		  descAr: 'ربط واجهة برمجة التطبيقات (API) مباشر لتتبع انتهاء إقامات الوافدين، وإدارة تأشيرات الخروج والعودة، وضمان الامتثال الحكومي بنسبة 100%.'
		},
		{ 
		  url: '/projects/hris/doc-hris.png', 
		  titleEn: 'Corporate Document Builder', 
		  titleAr: 'منشئ المستندات والخطابات الرسمية',
		  descEn: 'Automated letterhead generator for official corporate correspondence, warnings, and salary certificates, stored in an immutable ledger.',
		  descAr: 'منشئ خطابات آلي للمراسلات الرسمية للشركة، والإنذارات، وشهادات الرواتب، محفوظة في سجل غير قابل للتعديل.'
		},
		{ 
		  url: '/projects/hris/external-apps-hris.png', 
		  titleEn: 'External Freelance Portals', 
		  titleAr: 'بوابات العمل الحر الخارجية',
		  descEn: 'Secure, passcode-protected public gateways for gig workers and external applicants to submit credentials without accessing the core system.',
		  descAr: 'بوابات عامة آمنة ومحمية بكلمة مرور تتيح للمستقلين والمتقدمين الخارجيين تقديم بياناتهم دون الحاجة للوصول إلى النظام الأساسي.'
		}
	  ]
	},
	{
	  id: 'care',
	  titleEn: 'OPERIX Health Care',
	  titleAr: 'أوبيريكس كير للرعاية الطبية',
	  subEn: 'Clinical Management Core',
	  subAr: 'منظومة الإدارة السريرية',
	  descEn: 'Advanced hospital management ecosystem. End-to-end clinical workflow from patient intake and triage through physician consultation, pharmacy dispensary, surgical operations, blood bank, and full financial treasury.',
	  descAr: 'منظومة متكاملة لإدارة المستشفيات. سير عمل سريري شامل من استقبال المريض والفرز وصولاً إلى الاستشارة الطبية، والصيدلية، وغرف العمليات، وبنك الدم، والخزانة المالية.',
	  url: 'https://www.care.operix-solutions.online',
	  icon: <Activity size={24} />,
	  color: 'bg-blue-900 text-white',
	  image: '/projects/care.png',
	  interactiveBadge: (
		<div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur border border-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <Activity size={14} className="animate-pulse" /> CLINICAL SYNC
		</div>
	  ),
	  previews: [
		{
		  url: '/projects/care/admin-care.png',
		  titleEn: 'Command Center — Admin Console',
		  titleAr: 'مركز القيادة — لوحة الإدارة',
		  descEn: 'Enterprise analytics and access control hub. Real-time counters for active visits, pending prescriptions, and surgeries. Houses the Account Approvals queue, a full Access & Security Registry with role-based clearances, and Quick Portals to instantly navigate any clinical department.',
		  descAr: 'مركز تحليلات المؤسسة والتحكم في الوصول. عدادات لحظية للزيارات النشطة والوصفات المعلقة والعمليات الجراحية. يضم طابور اعتماد الحسابات، وسجل الأمان الكامل بصلاحيات مبنية على الأدوار، وبوابات سريعة للتنقل الفوري بين الأقسام السريرية.'
		},
		{
		  url: '/projects/care/reception-care.png',
		  titleEn: 'Front Desk — New Patient Enrollment',
		  titleAr: 'الاستقبال — تسجيل مريض جديد',
		  descEn: 'Patient intake form capturing full demographics: name, DOB, sex, blood group, phone, and email. One-tap "Proceed to Triage & Services" routes the registered patient into the nurse station workflow, triggering the live triage queue.',
		  descAr: 'نموذج استقبال المريض الذي يسجل البيانات الكاملة: الاسم وتاريخ الميلاد والجنس والفصيلة الدموية والهاتف والبريد الإلكتروني. ينقل "الانتقال إلى الفرز والخدمات" المريض المسجل فوراً إلى سير عمل محطة التمريض ويُشغّل قائمة الفرز الحي.'
		},
		{
		  url: '/projects/care/appoint-care.png',
		  titleEn: 'Front Desk — Appointments & Scheduling',
		  titleAr: 'الاستقبال — المواعيد والجدولة',
		  descEn: 'Dual-panel appointment hub. Schedule new visits by selecting the patient, assigning a doctor, setting date and time slot, and noting the visit reason. The Upcoming Schedule panel confirms all booked appointments with treating physician details and one-tap Check-in buttons to activate the patient visit.',
		  descAr: 'مركز مواعيد ثنائي اللوحات. جدّل زيارات جديدة باختيار المريض وتعيين الطبيب وتحديد التاريخ والفترة الزمنية وسبب الزيارة. لوحة الجدول القادم تؤكد جميع المواعيد المحجوزة مع بيانات الطبيب المعالج وأزرار تسجيل الوصول الفوري.'
		},
		{
		  url: '/projects/care/doc-workspace-care.png',
		  titleEn: 'Doctor Workspace — Consultation Waitlist',
		  titleAr: 'بيئة عمل الطبيب — قائمة انتظار الاستشارات',
		  descEn: 'Live triage board showing all patients awaiting the physician. Each card displays MRN, ordered services, and bypass status. Supports MRN scan-override lookup and one-click Re-sync Live Triage to pull the latest nurse queue instantly.',
		  descAr: 'لوحة الفرز الحي التي تعرض جميع المرضى في انتظار الطبيب. كل بطاقة تعرض رقم السجل الطبي والخدمات المطلوبة وحالة التجاوز. تدعم بحث MRN بالمسح وإعادة المزامنة الفورية مع الفرز الحي من محطة التمريض.'
		},
		{
		  url: '/projects/care/doc-care.png',
		  titleEn: 'Doctor Workspace — Examination & Diagnosis',
		  titleAr: 'بيئة عمل الطبيب — الفحص والتشخيص',
		  descEn: 'Full clinical encounter workspace. Left panel shows the patient card with triage vitals and nurse bypass status. Right panel captures vitals (BP, HR, Temp, Weight), symptoms, ICD-coded diagnosis, and prescriptions from the formulary — all via voice dictation. Finalised with "Sign off & Route to Pharmacy."',
		  descAr: 'مساحة عمل الاستشارة الكاملة. اللوحة اليسرى تعرض بيانات المريض والعلامات الحيوية وحالة تجاوز التمريض. اللوحة اليمنى تسجّل العلامات الحيوية والأعراض والتشخيص بترميز ICD والأدوية من قائمة الدواء — كل ذلك بالإملاء الصوتي. تنتهي بـ"توقيع وإحالة إلى الصيدلية".'
		},
		{
		  url: '/projects/care/chemist-care.png',
		  titleEn: 'Pharmacy Unit — Chemist Portal (Dispensary)',
		  titleAr: 'وحدة الصيدلية — بوابة الصيدلاني',
		  descEn: 'MRN-driven dispensary portal. Scan or enter the patient\'s record number to instantly pull their active prescription. Tabs switch between Dispensary & Billing and full Inventory management for a complete pharmacist workflow in one screen.',
		  descAr: 'بوابة صرف مُدارة برقم السجل الطبي. امسح أو أدخل الرقم لاستدعاء وصفة المريض النشطة فوراً. تبديل التبويبات بين الصرف والفوترة وإدارة المخزون الكامل — سير عمل الصيدلاني في شاشة واحدة.'
		},
		{
		  url: '/projects/care/pharm-inven-care.png',
		  titleEn: 'Pharmacy Unit — Master Inventory',
		  titleAr: 'وحدة الصيدلية — المخزون الرئيسي',
		  descEn: 'Pharmaceutical formulary management. Add medications with generic name, brand, dosage form, manufacturer, country, dates, and a three-currency pricing matrix (SDG / USD / SAR). The master inventory table lists the full catalogue with inline edit and delete controls.',
		  descAr: 'إدارة قائمة الأدوية. أضف أدوية مع الاسم العلمي والتجاري والجرعة والمصنّع والدولة والتواريخ ومصفوفة أسعار ثلاثية (جنيه / دولار / ريال). يعرض جدول المخزون الكتالوج الكامل مع أدوات التعديل والحذف المدمجة.'
		},
		{
		  url: '/projects/care/ops-care.png',
		  titleEn: 'Operations OR — Surgical Board',
		  titleAr: 'غرفة العمليات — لوحة العمليات الجراحية',
		  descEn: 'Real-time surgical scheduling with live blood bank availability in the header by blood type. Book procedures by selecting patient, surgeon, operation name, required blood units, and notes — with voice dictation. "Verify Blood & Schedule" cross-checks inventory before confirming to prevent supply shortfalls.',
		  descAr: 'جدولة العمليات الجراحية اللحظية مع إتاحة بنك الدم الحية في الرأس حسب فصيلة الدم. احجز إجراءً بتحديد المريض والجراح والعملية والدم المطلوب والملاحظات — بالإملاء الصوتي. "التحقق من الدم والجدولة" يراجع المخزون قبل التأكيد لتفادي النقص.'
		},
		{
		  url: '/projects/care/bloodbank-care.png',
		  titleEn: 'Blood Bank Operations — Live Inventory',
		  titleAr: 'عمليات بنك الدم — المخزون الحي',
		  descEn: 'Enterprise hemotherapy dispensing and tracking. Shows total vault capacity, critical shortage groups, and system health. Each blood type displays unit count, a colour-coded LOW STOCK / HEALTHY status bar, and Dispense / Add controls — synced directly with the Surgical OR board.',
		  descAr: 'صرف وتتبع مستحضرات الدم. يعرض السعة الإجمالية ومجموعات النقص الحرج وصحة النظام. كل فصيلة تظهر عدد الوحدات وشريط الحالة (نقص / كافٍ) وعناصر الصرف والإضافة — متزامنة مع لوحة غرفة العمليات.'
		},
		{
		  url: '/projects/care/inside-file-care.png',
		  titleEn: 'Patient History — Full Clinical Record',
		  titleAr: 'سجل المريض — الملف السريري الكامل',
		  descEn: 'Complete longitudinal patient record. Profile card shows DOB, sex, blood type, and contact with an external document upload zone. The Clinical Timeline renders every encounter — Check Visits with vitals, Diagnosis & RX, Pathology results, and Surgical Operations with completion status. Exportable to PDF.',
		  descAr: 'السجل الطولي الكامل للمريض. بطاقة الملف تعرض تاريخ الميلاد والجنس والفصيلة وبيانات التواصل مع منطقة رفع الوثائق. يرسم الجدول الزمني كل زيارة — الزيارات مع العلامات الحيوية، والتشخيص والوصفة، ونتائج التحاليل، والعمليات مع الحالة. قابل للتصدير PDF.'
		},
		{
		  url: '/projects/care/financial-care.png',
		  titleEn: 'Financial Controller — Corporate Treasury',
		  titleAr: 'المراقب المالي — الخزانة المؤسسية',
		  descEn: 'Live financial ledger for the facility. Displays gross revenue, payroll, and operating expenses against real-time P&L. The Log Transaction panel posts entries by type, currency (SAR / USD / SDG), amount, and memo. The Master Ledger provides a full immutable audit trail of every financial event.',
		  descAr: 'السجل المالي الحي للمنشأة. يعرض الإيرادات والرواتب والمصاريف التشغيلية مقابل الربح والخسارة اللحظي. لوحة المعاملات ترحّل القيود حسب النوع والعملة والمبلغ والملاحظة. يوفر السجل الرئيسي مسار تدقيق كامل وغير قابل للتعديل.'
		},
		{
		  url: '/projects/care/radio-lab-care.png',
		  titleEn: 'Radiography Lab — Diagnostic Department',
		  titleAr: 'مختبر الأشعة — قسم التشخيص',
		  descEn: 'Diagnostic imaging portal. The active queue lists pending scan requests (X-Ray, MRI, CT) pulled from physician orders. Selecting a patient opens the result entry panel: clinical observations, optional image/report attachment, and "Finalize & Send to Patient File" to push the completed report into the clinical timeline.',
		  descAr: 'بوابة التصوير التشخيصي. تسرد قائمة الانتظار طلبات الفحص المعلقة (أشعة، رنين، توموغرافي) من أوامر الطبيب. اختيار المريض يفتح لوحة إدخال النتائج مع حقل الملاحظات ومرفق اختياري وإجراء "اعتماد وإرسال لملف المريض" الذي يُدرج التقرير في الجدول السريري.'
		}
	  ]
	}
  ];

  // ─── TIER 2: CLIENT & FEATURED DEPLOYMENTS ───
  const clientProjects = [
	{
	  id: 'mamey',
	  titleEn: 'Mamey Platform',
	  titleAr: 'منصة مامي',
	  subEn: 'General Trading & Investment',
	  subAr: 'التجارة العامة والاستثمار',
	  descEn: 'A South Sudanese enterprise specializing in the import, distribution, and supply of foodstuffs, building materials, logistics, and essential services.',
	  descAr: 'مؤسسة جنوب سودانية متخصصة في استيراد وتوزيع وتوريد المواد الغذائية ومواد البناء والخدمات اللوجستية والخدمات الأساسية.',
	  url: 'https://mamey.vercel.app',
	  icon: <Globe size={20} />,
	  color: 'bg-sky-400 text-white',
	  image: '/projects/mamey.png'
	},
	{
	  id: 'abdullah',
	  titleEn: 'Abdullah Bin Abbas',
	  titleAr: 'مركز عبدالله بن عباس',
	  subEn: 'Institutional Portal',
	  subAr: 'البوابة المؤسسية',
	  descEn: 'Dedicated administrative portal mapped for institutional resource planning, community outreach tracking, and digital archive management.',
	  descAr: 'بوابة إدارية مخصصة لتخطيط الموارد المؤسسية، وتتبع التواصل المجتمعي، وإدارة الأرشيف الرقمي.',
	  url: 'https://www.aljmaan.operix-solutions.online/abdullah-bin-abbas-qc',
	  icon: <Landmark size={20} />,
	  color: 'bg-white text-emerald-800 border border-slate-100',
	  image: '/projects/abbas.png'
	},
	{
	  id: 'naseem',
	  titleEn: 'Naseem City',
	  titleAr: 'مدينة النسيم',
	  subEn: 'Smart Community Hub',
	  subAr: 'مركز المجتمع الذكي',
	  descEn: 'Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.',
	  descAr: 'منظومة إدارة العقارات والممتلكات للتعامل مع طلبات السكان، وسجلات صيانة المرافق، ودورات الفوترة المجتمعية.',
	  url: 'https://www.aljmaan.operix-solutions.online/Naseem_City',
	  icon: <Building2 size={20} />,
	  color: 'bg-red-900 text-white',
	  image: '/projects/naseem.png'
	}
  ];

  // ─── KEYBOARD & MODAL NAVIGATION ───
  const openPreview = useCallback((platform) => {
	setActivePreview(platform);
	setCurrentImgIndex(0);
  }, []);

  const nextImg = useCallback(() => {
	if (activePreview) setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
  }, [activePreview]);

  const prevImg = useCallback(() => {
	if (activePreview) setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
  }, [activePreview]);

  // Keyboard navigation for modal
  useEffect(() => {
	const onKey = (e) => {
	  if (!activePreview) return;
	  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextImg();
	  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevImg();
	  if (e.key === 'Escape') setActivePreview(null);
	};
	window.addEventListener('keydown', onKey);
	return () => window.removeEventListener('keydown', onKey);
  }, [activePreview, nextImg, prevImg]);

  // ─── SWIPE GESTURE HANDLERS ───
  const handleTouchStart = (e) => {
	setTouchEnd(null);
	setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
	setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
	if (!touchStart || !touchEnd) return;
	const distance = touchStart - touchEnd;
	const isLeftSwipe = distance > minSwipeDistance;
	const isRightSwipe = distance < -minSwipeDistance;
	
	if (isLeftSwipe) {
	  nextImg();
	}
	if (isRightSwipe) {
	  prevImg();
	}
  };

  return (
	<div className="projects-wrapper w-full font-sans bg-[#f8fafc] min-h-screen pb-12">
	  
	  <style>{`
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(24px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeIn {
		  from { opacity: 0; }
		  to   { opacity: 1; }
		}
		@keyframes scaleIn {
		  from { opacity: 0; transform: scale(0.96) translateY(8px); }
		  to   { opacity: 1; transform: scale(1) translateY(0); }
		}
		@keyframes imgFade {
		  from { opacity: 0; transform: scale(1.02); }
		  to   { opacity: 1; transform: scale(1); }
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
		.care-preview-btn { position: relative; overflow: hidden; }
		.care-preview-btn::after {
		  content: '';
		  position: absolute; inset: 0;
		  background: linear-gradient(135deg, rgba(212,175,55,0.15), transparent);
		  opacity: 0; transition: opacity 0.3s;
		}
		.care-preview-btn:hover::after { opacity: 1; }
		.thumb-strip::-webkit-scrollbar { height: 4px; }
		.thumb-strip::-webkit-scrollbar-track { background: #1e2d40; }
		.thumb-strip::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 2px; }
	  `}</style>

	  {/* ─── HERO HEADER ─── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-slate-700 py-20 px-6">
		
		{/* Subtle Background Glow */}
		<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af3715 0%, transparent 70%)' }} />

		<div
		  style={{
			animation: 'fadeSlideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
		  }}
		  className="text-center max-w-3xl mx-auto space-y-4 relative z-10"
		>
		  <span
			style={{ animation: 'fadeSlideUp 0.5s 0.1s cubic-bezier(0.16,1,0.3,1) both' }}
			className="inline-block text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20"
		  >
			{isAr ? "البنية التحتية السحابية" : "Cloud Infrastructure"}
		  </span>
		  <h1
			style={{ animation: 'fadeSlideUp 0.6s 0.15s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight premium-gold-text drop-shadow-lg font-serif"
		  >
			{isAr ? "مصفوفة الأنظمة المستضافة" : "Deployed Systems Matrix"}
		  </h1>
		  <p
			style={{ animation: 'fadeSlideUp 0.6s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
			className="text-[#e5d0a1] text-sm md:text-base font-medium opacity-90 max-w-2xl mx-auto"
		  >
			{isAr 
			  ? "بوابة تفاعلية للوصول المباشر إلى المنصات الرقمية المستضافة والنشطة ضمن منظومة أوبيريكس للحلول المتكاملة، ومشاريع العملاء البارزة." 
			  : "Interactive portal gateway to the live OPERIX ecosystem cloud platforms, real-time operational environments, and featured client deployments."}
		  </p>
		</div>
	  </div>

	  <div className="px-6 py-16 space-y-20">
		{/* ─── TIER 1: OPERIX CORE ─── */}
		<section className="max-w-6xl mx-auto space-y-8">
		  <div
			style={{ animation: 'fadeSlideUp 0.5s 0.25s cubic-bezier(0.16,1,0.3,1) both' }}
			className="border-b border-slate-200 pb-4"
		  >
			<h2 className="text-xl font-black text-[#1e2d40] uppercase tracking-wider">
			  {isAr ? "أنظمة أوبيريكس الأساسية" : "Core OPERIX Ecosystem"}
			</h2>
		  </div>

		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
			{corePlatforms.map((sys, idx) => (
			  <div
				key={sys.id}
				style={{ animation: `fadeSlideUp 0.6s ${0.3 + idx * 0.08}s cubic-bezier(0.16,1,0.3,1) both` }}
				className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 group flex flex-col h-auto"
			  >
				
				{/* Interactive Image (Top) */}
				<div
				  className="h-48 sm:h-56 border-b border-slate-200 relative overflow-hidden bg-slate-100 group-hover:bg-slate-200 transition-colors cursor-pointer"
				  onClick={() => window.open(sys.url, '_blank')}
				>
				  <img 
					src={sys.image} 
					alt={sys.titleEn} 
					className="w-full h-full object-cover object-left-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
				  />
				  {sys.interactiveBadge}
				  {/* Care card: show preview count badge */}
				  {sys.id === 'care' && sys.previews.length > 0 && (
					<div className="absolute bottom-4 right-4 bg-[#0a0f16]/80 backdrop-blur border border-slate-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
					  <ImageIcon size={11} /> {sys.previews.length} SCREENS
					</div>
				  )}
				</div>

				{/* Info Side (Bottom) */}
				<div className="p-6 sm:p-8 flex flex-col flex-grow bg-white">
				  <div className="flex items-center gap-3 mb-4">
					<div className={`w-10 h-10 ${sys.color} rounded-xl flex items-center justify-center shadow-md shrink-0`}>
					  {sys.icon}
					</div>
					<div>
					  <h3 className="font-black text-lg text-[#1e2d40] leading-tight m-0">{isAr ? sys.titleAr : sys.titleEn}</h3>
					  <p className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] mt-0.5 m-0">{isAr ? sys.subAr : sys.subEn}</p>
					</div>
				  </div>
				  
				  <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
					{isAr ? sys.descAr : sys.descEn}
				  </p>

				  {/* Dual Action Buttons */}
				  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-100" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					<a href={sys.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 bg-[#1e2d40] hover:bg-[#d4af37] text-white py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-colors shadow-sm">
					  {isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={12} />
					</a>
					
					{sys.previews && sys.previews.length > 0 && (
					  <button 
						onClick={() => openPreview(sys)}
						className={`care-preview-btn flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all shadow-sm border ${sys.id === 'care' ? 'bg-blue-950 text-[#d4af37] border-blue-900 hover:bg-[#d4af37] hover:text-[#0a0f16] hover:border-[#d4af37]' : 'bg-slate-50 hover:bg-[#1e2d40] hover:text-[#d4af37] text-slate-600 border-slate-200 hover:border-transparent'}`}
					  >
						{isAr ? "استعراض النظام" : "Preview UI"} <ImageIcon size={12} />
					  </button>
					)}
				  </div>
				</div>

			  </div>
			))}
		  </div>
		</section>

		{/* ─── TIER 2: CLIENT PROJECTS ─── */}
		<section className="max-w-6xl mx-auto space-y-8 pt-6">
		  <div className="border-b border-slate-200 pb-4 flex items-center gap-3">
			<h2 className="text-xl font-black text-[#1e2d40] uppercase tracking-wider">
			  {isAr ? "مشاريع وتطبيقات العملاء" : "Featured Client Deployments"}
			</h2>
		  </div>

		  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
			{clientProjects.map((proj, idx) => (
			  <div
				key={proj.id}
				style={{ animation: `fadeSlideUp 0.6s ${0.1 + idx * 0.1}s cubic-bezier(0.16,1,0.3,1) both` }}
				className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 transition-all duration-300 group"
			  >
				<div className="h-40 w-full relative overflow-hidden bg-slate-100 border-b border-slate-200 cursor-pointer" onClick={() => window.open(proj.url, '_blank')}>
				  <img 
					src={proj.image} 
					alt={proj.titleEn} 
					className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
				  />
				</div>

				<div className="p-6 flex flex-col justify-between flex-grow space-y-4 relative z-10">
				  <div className="space-y-4">
					<div className={`w-10 h-10 ${proj.color} rounded-xl flex items-center justify-center shadow-sm -mt-10 relative border-4 border-white`}>
					  {proj.icon}
					</div>
					<div>
					  <h3 className="font-black text-lg text-[#1e2d40] leading-tight m-0">{isAr ? proj.titleAr : proj.titleEn}</h3>
					  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 m-0">{isAr ? proj.subAr : proj.subEn}</p>
					</div>
					<p className="text-slate-500 text-xs leading-relaxed font-medium">
					  {isAr ? proj.descAr : proj.descEn}
					</p>
				  </div>
				  
				  <div className="pt-4 relative z-10 mt-auto border-t border-slate-100">
					<a href={proj.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between text-[#1e2d40] py-2 font-black text-[10px] tracking-wider uppercase transition-colors hover:text-[#d4af37]">
					  {isAr ? "زيارة الموقع المباشر" : "Visit Live Portal"} <ExternalLink size={14} className="text-slate-400 group-hover:text-[#d4af37] transition-colors" />
					</a>
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</section>
	  </div>

	  {/* ─── UPGRADED PREVIEW MODAL (TOUCH-FRIENDLY & SWIPE ENABLED) ─── */}
	  {activePreview && activePreview.previews && activePreview.previews.length > 0 && (
		<div
		  className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-8"
		  style={{ animation: 'fadeIn 0.2s ease both' }}
		>
		  {/* Backdrop */}
		  <div 
			className="absolute inset-0 bg-[#060c12]/97 backdrop-blur-md"
			onClick={() => setActivePreview(null)}
		  />
		  
		  {/* Modal */}
		  <div
			className="relative w-full max-w-[1400px] max-h-[94vh] flex flex-col z-10"
			style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
		  >
			{/* ─── TOP BAR ─── */}
			<div className="flex items-center justify-between mb-3 px-1">
			  <div className="flex items-center gap-3">
				<div className={`w-8 h-8 ${activePreview.color} rounded-lg flex items-center justify-center shadow`}>
				  {activePreview.icon}
				</div>
				<div>
				  <span className="font-black text-white text-sm leading-none block">{isAr ? activePreview.titleAr : activePreview.titleEn}</span>
				  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{isAr ? "استعراض واجهة النظام" : "System UI Preview"}</span>
				</div>
			  </div>
			  <div className="flex items-center gap-2">
				<span className="text-[10px] font-mono font-black text-slate-500 bg-[#0f1621] border border-slate-700 px-3 py-1.5 rounded-lg">
				  {currentImgIndex + 1} <span className="text-slate-700">/</span> {activePreview.previews.length}
				</span>
				<button
				  onClick={() => setActivePreview(null)}
				  className="w-8 h-8 bg-[#0f1621] border border-slate-700 text-slate-400 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
				>
				  <X size={14} strokeWidth={2.5} />
				</button>
			  </div>
			</div>

			{/* ─── MAIN CONTENT ─── */}
			<div className="flex flex-col lg:flex-row gap-3 flex-1 min-h-0">

			  {/* LEFT: Image viewer (SWIPE ENABLED) */}
			  <div className="relative lg:flex-1 bg-[#080d12] rounded-2xl border border-slate-800 overflow-hidden flex flex-col min-h-[280px] lg:min-h-0">
				
				{/* Media Wrapper with Touch Handlers */}
				<div 
				  className="flex-1 flex items-center justify-center p-4 relative group cursor-grab active:cursor-grabbing"
				  onTouchStart={handleTouchStart}
				  onTouchMove={handleTouchMove}
				  onTouchEnd={handleTouchEnd}
				>
				  {/* Check if URL is an mp4 video */}
				  {activePreview.previews[currentImgIndex].url.endsWith('.mp4') ? (
					<video
					  key={`vid-${currentImgIndex}`}
					  src={activePreview.previews[currentImgIndex].url}
					  controls
					  autoPlay
					  muted
					  loop
					  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
					  style={{ animation: 'imgFade 0.25s ease both' }}
					/>
				  ) : (
					<img
					  key={`img-${currentImgIndex}`}
					  src={activePreview.previews[currentImgIndex].url}
					  alt="System Preview"
					  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-none"
					  style={{ animation: 'imgFade 0.25s ease both' }}
					/>
				  )}
				  
				  {/* Left Navigation Arrow (Always visible on mobile, hide on hover for desktop) */}
				  <button
					onClick={(e) => { e.stopPropagation(); prevImg(); }}
					className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0f1621]/90 hover:bg-[#d4af37] text-white rounded-full flex items-center justify-center transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border border-slate-700 hover:border-[#d4af37] shadow-xl z-10"
				  >
					<ChevronLeft size={20} />
				  </button>
				  
				  {/* Right Navigation Arrow (Always visible on mobile, hide on hover for desktop) */}
				  <button
					onClick={(e) => { e.stopPropagation(); nextImg(); }}
					className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0f1621]/90 hover:bg-[#d4af37] text-white rounded-full flex items-center justify-center transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border border-slate-700 hover:border-[#d4af37] shadow-xl z-10"
				  >
					<ChevronRight size={20} />
				  </button>
				</div>

				{/* ─── THUMBNAIL STRIP ─── */}
				<div className="thumb-strip flex gap-2 overflow-x-auto px-4 pb-3 pt-1 border-t border-slate-800">
				  {activePreview.previews.map((p, i) => (
					<button
					  key={i}
					  onClick={() => setCurrentImgIndex(i)}
					  className={`shrink-0 w-16 h-10 rounded-md overflow-hidden border-2 transition-all duration-200 ${i === currentImgIndex ? 'border-[#d4af37] opacity-100 scale-105 shadow-lg shadow-[#d4af37]/20' : 'border-slate-700 opacity-40 hover:opacity-70 hover:border-slate-500'}`}
					>
					  {/* Check if thumbnail URL is an mp4 video */}
					  {p.url.endsWith('.mp4') ? (
						<video src={p.url} className="w-full h-full object-cover object-top pointer-events-none" muted />
					  ) : (
						<img src={p.url} alt="" className="w-full h-full object-cover object-top pointer-events-none" />
					  )}
					</button>
				  ))}
				</div>
			  </div>

			  {/* RIGHT: Description Panel */}
			  <div className="lg:w-[340px] bg-[#0a0f16] border border-slate-800 rounded-2xl flex flex-col overflow-hidden max-h-[42vh] lg:max-h-full">
				
				{/* Module eyebrow */}
				<div className="p-5 border-b border-slate-800 shrink-0">
				  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">
					<Info size={10} className="text-[#d4af37]" /> {isAr ? "الوحدة الحالية" : "Current Module"}
				  </span>
				  <h4
					key={currentImgIndex}
					className="font-serif font-black text-xl text-[#d4af37] leading-tight"
					style={{ animation: 'fadeSlideUp 0.25s ease both', direction: isAr ? 'rtl' : 'ltr' }}
				  >
					{isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}
				  </h4>
				</div>

				{/* Description — scrollable */}
				<div className="flex-1 overflow-y-auto p-5">
				  <p
					key={`desc-${currentImgIndex}`}
					className="text-[13px] text-slate-400 font-medium leading-relaxed"
					style={{ animation: 'fadeIn 0.3s 0.1s ease both', direction: isAr ? 'rtl' : 'ltr' }}
				  >
					{isAr ? activePreview.previews[currentImgIndex].descAr : activePreview.previews[currentImgIndex].descEn}
				  </p>
				</div>

				{/* Navigation Footer */}
				<div className="p-5 border-t border-slate-800 shrink-0 flex items-center justify-between gap-3">
				  <a
					href={activePreview.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex justify-center items-center gap-2 bg-[#d4af37] hover:bg-white text-[#0a0f16] py-2 rounded-lg font-black text-[10px] tracking-wider uppercase transition-all"
				  >
					{isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={11} />
				  </a>
				  <div className="flex gap-2">
					<button
					  onClick={prevImg}
					  className="w-9 h-9 rounded-lg bg-[#0f1621] border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#1e2d40] hover:text-[#d4af37] transition-all"
					>
					  <ChevronLeft size={16} />
					</button>
					<button
					  onClick={nextImg}
					  className="w-9 h-9 rounded-lg bg-[#0f1621] border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-[#1e2d40] hover:text-[#d4af37] transition-all"
					>
					  <ChevronRight size={16} />
					</button>
				  </div>
				</div>

			  </div>
			</div>
		  </div>
		</div>
	  )}

	</div>
  );
}