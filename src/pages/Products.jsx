import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Settings, Activity, CreditCard, ExternalLink, 
  Building2, Globe, Landmark, ShieldCheck, 
  ImageIcon, X, ChevronRight, ChevronLeft, Info, GraduationCap,
  Play, Zap, ArrowUpRight, Monitor
} from 'lucide-react';

export default function Projects() {
  const { isAr } = useLanguage();
  
  const [activePreview, setActivePreview] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const thumbnailRef = useRef(null);

  useEffect(() => {
	const t = setTimeout(() => setHeroVisible(true), 60);
	return () => clearTimeout(t);
  }, []);

  useEffect(() => {
	if (activePreview) {
	  document.body.style.overflow = 'hidden';
	  setImgLoaded(false);
	} else {
	  document.body.style.overflow = 'unset';
	}
	return () => { document.body.style.overflow = 'unset'; };
  }, [activePreview]);

  // Scroll active thumbnail into view
  useEffect(() => {
	if (!thumbnailRef.current) return;
	const active = thumbnailRef.current.querySelector('[data-active="true"]');
	if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [currentImgIndex]);

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
	  icon: <Settings size={20} />,
	  accentColor: '#ef4444',
	  badgeBg: 'bg-[#1e2d40]/90',
	  badge: <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /><span>LIVE TELEMETRY</span></div>,
	  image: '/projects/ops.png',
	  previews: [
		{ url: '/projects/ops/exe-dash.png', titleEn: 'Executive Command Center', titleAr: 'مركز القيادة التنفيذية', descEn: 'High-level administrative hub for C-Suite approvals, IT operations, and identity access management across the entire enterprise.', descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية، وعمليات تقنية المعلومات، وإدارة هويات الوصول عبر المؤسسة.' },
		{ url: '/projects/ops/ops-dash.mp4', titleEn: 'Enterprise Operations Matrix', titleAr: 'مصفوفة عمليات المؤسسة', descEn: 'The central nervous system of the operations floor. Provides direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.', descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.' },
		{ url: '/projects/ops/ai-email-ops.png', titleEn: 'AI-Powered Communications Core', titleAr: 'مركز الاتصالات المدعوم بالذكاء الاصطناعي', descEn: 'Smart email drafting utilizing generative AI. Features pre-configured corporate templates for official notices, updates, and HR compliance letters.', descAr: 'صياغة ذكية لرسائل البريد الإلكتروني باستخدام الذكاء الاصطناعي التوليدي. يحتوي على قوالب مؤسسية مسبقة الإعداد للإشعارات الرسمية والتحديثات.' },
		{ url: '/projects/ops/analyticsandreports-ops.png', titleEn: 'Advanced Analytics & Reporting', titleAr: 'التحليلات المتقدمة والتقارير', descEn: 'Dynamic data visualization and custom report generation. Filter vast datasets across the enterprise and export directly to Excel or secure PDF formats.', descAr: 'تصوير مرئي ديناميكي للبيانات وإنشاء تقارير مخصصة. تصفية مجموعات البيانات الضخمة عبر المؤسسة وتصديرها مباشرة بتنسيقات إكسل أو PDF آمنة.' },
		{ url: '/projects/ops/crm-ops.png', titleEn: 'CRM & Lead Pipeline Matrix', titleAr: 'مصفوفة إدارة علاقات العملاء (CRM)', descEn: 'Centralized marketing workspace tracking ad spend, campaign ROI, and lead conversion funnels in real-time.', descAr: 'مساحة عمل تسويقية مركزية لتتبع الإنفاق الإعلاني، وعائد الاستثمار للحملات، ومسارات تحويل العملاء المحتملين في الوقت الفعلي.' },
		{ url: '/projects/ops/doc-generateandsendemail-ops.png', titleEn: 'Automated Document Generator', titleAr: 'منشئ المستندات المؤسسية الآلي', descEn: 'Instantly generate official employment offers, contracts, and internal memos complete with dynamic variables and secure ledger archiving.', descAr: 'إنشاء فوري لعروض العمل الرسمية والعقود والمذكرات الداخلية مع متغيرات ديناميكية وأرشفة آمنة في السجل.' },
		{ url: '/projects/ops/external-standaloneapps-ops.png', titleEn: 'Decentralized Portals & QR Gateway', titleAr: 'البوابات اللامركزية ورموز الاستجابة السريعة', descEn: 'Manage public-facing touchpoints and standalone apps for gig workers, field staff, and VIP valet clients via generated access links and QR codes.', descAr: 'إدارة نقاط الاتصال العامة والتطبيقات المستقلة للعاملين المستقلين والموظفين الميدانيين وعملاء خدمة صف السيارات (Valet) عبر روابط وصول ورموز QR.' },
		{ url: '/projects/ops/facilitandtraining-ops.png', titleEn: 'Facility Configuration & Academy Hub', titleAr: 'تهيئة المرافق وإدارة الأكاديميات', descEn: 'Spin up and configure complex project environments, set daily operational targets, and manage internal training course capacities.', descAr: 'إنشاء وتهيئة بيئات مشاريع معقدة، وتحديد أهداف التشغيل اليومية، وإدارة السعة الاستيعابية للدورات التدريبية الداخلية.' },
		{ url: '/projects/ops/hr-ops.png', titleEn: 'Master HR & Roster Directory', titleAr: 'الدليل الشامل للموارد البشرية والورديات', descEn: 'Global administrative view of human capital. Track shift assignments, monitor active timesheets, and execute top-level personnel overrides.', descAr: 'عرض إداري شامل لرأس المال البشري. تتبع المهام والورديات، ومراقبة سجلات الحضور النشطة، وتنفيذ الإجراءات الإدارية العليا للموظفين.' },
		{ url: '/projects/ops/it-ops.png', titleEn: 'IT IAM & Infrastructure Control', titleAr: 'عمليات تقنية المعلومات وإدارة الهويات', descEn: 'Secure Identity and Access Management (IAM) panel. Provision user roles, manage system permissions, and monitor core infrastructure health.', descAr: 'لوحة آمنة لإدارة الهويات والوصول (IAM). منح أدوار المستخدمين، وإدارة صلاحيات النظام، ومراقبة صحة البنية التحتية الأساسية.' },
		{ url: '/projects/ops/performance-ops.png', titleEn: 'Live Operational KPI Telemetry', titleAr: 'القياس اللحظي لمؤشرات الأداء (KPIs)', descEn: 'High-level overview of global enterprise metrics, tracking ANPR traffic flow, active subscribers, and operational revenue in real time.', descAr: 'نظرة عامة رفيعة المستوى على مقاييس المؤسسة، تتبع تدفق حركة المرور (ANPR)، والمشتركين النشطين، والإيرادات التشغيلية في الوقت الفعلي.' },
		{ url: '/projects/ops/setshift-ops.png', titleEn: 'Geofenced Shift Orchestration', titleAr: 'إدارة الورديات بنطاق جغرافي (Geofencing)', descEn: 'Pinpoint workforce deployment using interactive mapping and strict GPS radius limits to guarantee accurate on-site field staff attendance.', descAr: 'التوجيه الدقيق للقوى العاملة باستخدام الخرائط التفاعلية وحدود نطاق جغرافي صارمة لضمان دقة حضور الموظفين الميدانيين في الموقع.' }
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
	  icon: <CreditCard size={20} />,
	  accentColor: '#10b981',
	  badgeBg: 'bg-[#c9a84c]/95',
	  badge: <div className="flex items-center gap-1.5"><ShieldCheck size={12} /><span>ZATCA VERIFIED</span></div>,
	  image: '/projects/fmis.png',
	  previews: [
		{ url: '/projects/fmis/dash-fmis.png', titleEn: 'Executive Dashboard & P&L', titleAr: 'لوحة القيادة التنفيذية والأرباح والخسائر', descEn: 'Real-time overview of profit and loss, revenue pipelines, and pending liabilities. Provides C-level executives with immediate financial health metrics.', descAr: 'نظرة عامة لحظية على الأرباح والخسائر، وتدفقات الإيرادات، والالتزامات المعلقة. توفر للإدارة التنفيذية مؤشرات فورية للصحة المالية.' },
		{ url: '/projects/fmis/opx-ai-fmis.png', titleEn: 'OPERIX AI Copilot Integration', titleAr: 'مساعد الذكاء الاصطناعي المدمج', descEn: 'Embedded AI assistant that analyzes financial databases, automates complex module navigation, and generates live telemetry reports on command.', descAr: 'مساعد ذكاء اصطناعي مدمج يحلل قواعد البيانات المالية، ويقوم بأتمتة التنقل المعقد بين الوحدات، ويولد تقارير لحظية عند الطلب.' },
		{ url: '/projects/fmis/quot-fmis.png', titleEn: 'Automated Quotation Builder', titleAr: 'منشئ عروض الأسعار التلقائي', descEn: 'Streamlined proposal generation tool that maps directly to the CRM, allowing quick drafting, approval, and dispatching of corporate estimates.', descAr: 'أداة متطورة لإنشاء العروض ترتبط مباشرة بنظام إدارة علاقات العملاء (CRM)، مما يتيح صياغة واعتماد وإرسال التقديرات المالية للشركات بسرعة.' },
		{ url: '/projects/fmis/help-fmis.png', titleEn: 'System Architecture & Help Matrix', titleAr: 'هيكلية النظام والمساعدة الذكية', descEn: 'Comprehensive, built-in documentation and mission-control mapping that guides users through GL, WBS, and Payroll engine workflows.', descAr: 'وثائق ومصفوفة توجيه شاملة مدمجة ترشد المستخدمين عبر سير عمل دفتر الأستاذ العام، وهيكلة المشاريع (WBS)، ومحرك مسيرات الرواتب.' }
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
	  icon: <Users size={20} />,
	  accentColor: '#6366f1',
	  badgeBg: 'bg-emerald-700/90',
	  badge: <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /><span>GPS FENCE ACTIVE</span></div>,
	  image: '/projects/hris.png',
	  previews: [
		{ url: '/projects/hris/ai-scanner-hris.png', titleEn: 'AI-Powered CV Scanner', titleAr: 'الماسح الضوئي للسير الذاتية بالذكاء الاصطناعي', descEn: 'Automated recruitment engine utilizing Edge AI to instantly parse, score, and extract data from applicant CVs, mapping them directly to open requisitions.', descAr: 'محرك توظيف آلي يعتمد على الذكاء الاصطناعي الطرفي لقراءة السير الذاتية واستخراج البيانات منها وتقييمها فورياً، مع ربطها مباشرة بالوظائف الشاغرة.' },
		{ url: '/projects/hris/resutl-ats-hris.png', titleEn: 'AI Scan Results & Match Analysis', titleAr: 'نتائج المسح الضوئي وتحليل التطابق', descEn: 'Detailed breakdown of candidate profiles, showcasing AI-generated skill gap analysis and automated role matching probabilities.', descAr: 'تحليل مفصل لملفات المرشحين، يعرض الفجوات المهارية المستخرجة بالذكاء الاصطناعي واحتماليات التطابق التلقائي مع الأدوار الوظيفية.' },
		{ url: '/projects/hris/emp-pro-hris.png', titleEn: 'Master Employee Profiles', titleAr: 'الملفات الشاملة للموظفين', descEn: 'Centralized digital twin of the workforce. Stores identity documents, contract financials, and live disciplinary or attendance records in one secure vault.', descAr: 'توأمة رقمية مركزية للقوى العاملة. تحفظ مستندات الهوية، والبيانات المالية للعقود، والسجلات الحية للحضور والانضباط في خزانة آمنة واحدة.' },
		{ url: '/projects/hris/pipline-hris.png', titleEn: 'Kanban Recruitment Pipeline', titleAr: 'مسار التوظيف وإدارة المرشحين', descEn: 'Visual drag-and-drop applicant tracking system (ATS). Seamlessly move candidates from initial screening to final offer with automated status triggers.', descAr: 'نظام تتبع للمتقدمين (ATS) مرئي يعمل بالسحب والإفلات. ينقل المرشحين بسلاسة من الفرز الأولي إلى العرض النهائي مع مشغلات حالة تلقائية.' },
		{ url: '/projects/hris/visa-mgm-hris.png', titleEn: 'Muqeem Visa Management', titleAr: 'إدارة تأشيرات مقيم', descEn: 'Direct API integration for tracking expatriate Iqama expiries, managing exit/entry visas, and ensuring 100% governmental compliance.', descAr: 'ربط واجهة برمجة التطبيقات (API) مباشر لتتبع انتهاء إقامات الوافدين، وإدارة تأشيرات الخروج والعودة، وضمان الامتثال الحكومي بنسبة 100%.' },
		{ url: '/projects/hris/doc-hris.png', titleEn: 'Corporate Document Builder', titleAr: 'منشئ المستندات والخطابات الرسمية', descEn: 'Automated letterhead generator for official corporate correspondence, warnings, and salary certificates, stored in an immutable ledger.', descAr: 'منشئ خطابات آلي للمراسلات الرسمية للشركة، والإنذارات، وشهادات الرواتب، محفوظة في سجل غير قابل للتعديل.' },
		{ url: '/projects/hris/external-apps-hris.png', titleEn: 'External Freelance Portals', titleAr: 'بوابات العمل الحر الخارجية', descEn: 'Secure, passcode-protected public gateways for gig workers and external applicants to submit credentials without accessing the core system.', descAr: 'بوابات عامة آمنة ومحمية بكلمة مرور تتيح للمستقلين والمتقدمين الخارجيين تقديم بياناتهم دون الحاجة للوصول إلى النظام الأساسي.' }
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
	  icon: <Activity size={20} />,
	  accentColor: '#f43f5e',
	  badgeBg: 'bg-rose-600/90',
	  badge: <div className="flex items-center gap-1.5"><Activity size={12} className="animate-pulse" /><span>CLINICAL SYNC</span></div>,
	  image: '/projects/care.png',
	  previews: [
		{ url: '/projects/care/admin-care.png', titleEn: 'Command Center — Admin Console', titleAr: 'مركز القيادة — لوحة الإدارة', descEn: 'Enterprise analytics and access control hub. Real-time counters for active visits, pending prescriptions, and surgeries. Houses the Account Approvals queue, a full Access & Security Registry with role-based clearances, and Quick Portals to instantly navigate any clinical department.', descAr: 'مركز تحليلات المؤسسة والتحكم في الوصول. عدادات لحظية للزيارات النشطة والوصفات المعلقة والعمليات الجراحية. يضم طابور اعتماد الحسابات، وسجل الأمان الكامل بصلاحيات مبنية على الأدوار، وبوابات سريعة للتنقل الفوري بين الأقسام السريرية.' },
		{ url: '/projects/care/reception-care.png', titleEn: 'Front Desk — New Patient Enrollment', titleAr: 'الاستقبال — تسجيل مريض جديد', descEn: 'Patient intake form capturing full demographics: name, DOB, sex, blood group, phone, and email. One-tap "Proceed to Triage & Services" routes the registered patient into the nurse station workflow, triggering the live triage queue.', descAr: 'نموذج استقبال المريض الذي يسجل البيانات الكاملة: الاسم وتاريخ الميلاد والجنس والفصيلة الدموية والهاتف والبريد الإلكتروني. ينقل "الانتقال إلى الفرز والخدمات" المريض المسجل فوراً إلى سير عمل محطة التمريض ويُشغّل قائمة الفرز الحي.' },
		{ url: '/projects/care/appoint-care.png', titleEn: 'Front Desk — Appointments & Scheduling', titleAr: 'الاستقبال — المواعيد والجدولة', descEn: 'Dual-panel appointment hub. Schedule new visits by selecting the patient, assigning a doctor, setting date and time slot, and noting the visit reason. The Upcoming Schedule panel confirms all booked appointments with treating physician details and one-tap Check-in buttons to activate the patient visit.', descAr: 'مركز مواعيد ثنائي اللوحات. جدّل زيارات جديدة باختيار المريض وتعيين الطبيب وتحديد التاريخ والفترة الزمنية وسبب الزيارة. لوحة الجدول القادم تؤكد جميع المواعيد المحجوزة مع بيانات الطبيب المعالج وأزرار تسجيل الوصول الفوري.' },
		{ url: '/projects/care/doc-workspace-care.png', titleEn: 'Doctor Workspace — Consultation Waitlist', titleAr: 'بيئة عمل الطبيب — قائمة انتظار الاستشارات', descEn: 'Live triage board showing all patients awaiting the physician. Each card displays MRN, ordered services, and bypass status. Supports MRN scan-override lookup and one-click Re-sync Live Triage to pull the latest nurse queue instantly.', descAr: 'لوحة الفرز الحي التي تعرض جميع المرضى في انتظار الطبيب. كل بطاقة تعرض رقم السجل الطبي والخدمات المطلوبة وحالة التجاوز. تدعم بحث MRN بالمسح وإعادة المزامنة الفورية مع الفرز الحي من محطة التمريض.' },
		{ url: '/projects/care/doc-care.png', titleEn: 'Doctor Workspace — Examination & Diagnosis', titleAr: 'بيئة عمل الطبيب — الفحص والتشخيص', descEn: 'Full clinical encounter workspace. Left panel shows the patient card with triage vitals and nurse bypass status. Right panel captures vitals (BP, HR, Temp, Weight), symptoms, ICD-coded diagnosis, and prescriptions from the formulary — all via voice dictation. Finalised with "Sign off & Route to Pharmacy."', descAr: 'مساحة عمل الاستشارة الكاملة. اللوحة اليسرى تعرض بيانات المريض والعلامات الحيوية وحالة تجاوز التمريض. اللوحة اليمنى تسجّل العلامات الحيوية والأعراض والتشخيص بترميز ICD والأدوية من قائمة الدواء — كل ذلك بالإملاء الصوتي. تنتهي بـ"توقيع وإحالة إلى الصيدلية".' },
		{ url: '/projects/care/chemist-care.png', titleEn: 'Pharmacy Unit — Chemist Portal (Dispensary)', titleAr: 'وحدة الصيدلية — بوابة الصيدلاني', descEn: "MRN-driven dispensary portal. Scan or enter the patient's record number to instantly pull their active prescription. Tabs switch between Dispensary & Billing and full Inventory management for a complete pharmacist workflow in one screen.", descAr: 'بوابة صرف مُدارة برقم السجل الطبي. امسح أو أدخل الرقم لاستدعاء وصفة المريض النشطة فوراً. تبديل التبويبات بين الصرف والفوترة وإدارة المخزون الكامل — سير عمل الصيدلاني في شاشة واحدة.' },
		{ url: '/projects/care/pharm-inven-care.png', titleEn: 'Pharmacy Unit — Master Inventory', titleAr: 'وحدة الصيدلية — المخزون الرئيسي', descEn: 'Pharmaceutical formulary management. Add medications with generic name, brand, dosage form, manufacturer, country, dates, and a three-currency pricing matrix (SDG / USD / SAR). The master inventory table lists the full catalogue with inline edit and delete controls.', descAr: 'إدارة قائمة الأدوية. أضف أدوية مع الاسم العلمي والتجاري والجرعة والمصنّع والدولة والتواريخ ومصفوفة أسعار ثلاثية (جنيه / دولار / ريال). يعرض جدول المخزون الكتالوج الكامل مع أدوات التعديل والحذف المدمجة.' },
		{ url: '/projects/care/ops-care.png', titleEn: 'Operations OR — Surgical Board', titleAr: 'غرفة العمليات — لوحة العمليات الجراحية', descEn: 'Real-time surgical scheduling with live blood bank availability in the header by blood type. Book procedures by selecting patient, surgeon, operation name, required blood units, and notes — with voice dictation. "Verify Blood & Schedule" cross-checks inventory before confirming to prevent supply shortfalls.', descAr: 'جدولة العمليات الجراحية اللحظية مع إتاحة بنك الدم الحية في الرأس حسب فصيلة الدم. احجز إجراءً بتحديد المريض والجراح والعملية والدم المطلوب والملاحظات — بالإملاء الصوتي. "التحقق من الدم والجدولة" يراجع المخزون قبل التأكيد لتفادي النقص.' },
		{ url: '/projects/care/bloodbank-care.png', titleEn: 'Blood Bank Operations — Live Inventory', titleAr: 'عمليات بنك الدم — المخزون الحي', descEn: 'Enterprise hemotherapy dispensing and tracking. Shows total vault capacity, critical shortage groups, and system health. Each blood type displays unit count, a colour-coded LOW STOCK / HEALTHY status bar, and Dispense / Add controls — synced directly with the Surgical OR board.', descAr: 'صرف وتتبع مستحضرات الدم. يعرض السعة الإجمالية ومجموعات النقص الحرج وصحة النظام. كل فصيلة تظهر عدد الوحدات وشريط الحالة (نقص / كافٍ) وعناصر الصرف والإضافة — متزامنة مع لوحة غرفة العمليات.' },
		{ url: '/projects/care/inside-file-care.png', titleEn: 'Patient History — Full Clinical Record', titleAr: 'سجل المريض — الملف السريري الكامل', descEn: 'Complete longitudinal patient record. Profile card shows DOB, sex, blood type, and contact with an external document upload zone. The Clinical Timeline renders every encounter — Check Visits with vitals, Diagnosis & RX, Pathology results, and Surgical Operations with completion status. Exportable to PDF.', descAr: 'السجل الطولي الكامل للمريض. بطاقة الملف تعرض تاريخ الميلاد والجنس والفصيلة وبيانات التواصل مع منطقة رفع الوثائق. يرسم الجدول الزمني كل زيارة — الزيارات مع العلامات الحيوية، والتشخيص والوصفة، ونتائج التحاليل، والعمليات مع الحالة. قابل للتصدير PDF.' },
		{ url: '/projects/care/financial-care.png', titleEn: 'Financial Controller — Corporate Treasury', titleAr: 'المراقب المالي — الخزانة المؤسسية', descEn: 'Live financial ledger for the facility. Displays gross revenue, payroll, and operating expenses against real-time P&L. The Log Transaction panel posts entries by type, currency (SAR / USD / SDG), amount, and memo. The Master Ledger provides a full immutable audit trail of every financial event.', descAr: 'السجل المالي الحي للمنشأة. يعرض الإيرادات والرواتب والمصاريف التشغيلية مقابل الربح والخسارة اللحظي. لوحة المعاملات ترحّل القيود حسب النوع والعملة والمبلغ والملاحظة. يوفر السجل الرئيسي مسار تدقيق كامل وغير قابل للتعديل.' },
		{ url: '/projects/care/radio-lab-care.png', titleEn: 'Radiography Lab — Diagnostic Department', titleAr: 'مختبر الأشعة — قسم التشخيص', descEn: 'Diagnostic imaging portal. The active queue lists pending scan requests (X-Ray, MRI, CT) pulled from physician orders. Selecting a patient opens the result entry panel: clinical observations, optional image/report attachment, and "Finalize & Send to Patient File" to push the completed report into the clinical timeline.', descAr: 'بوابة التصوير التشخيصي. تسرد قائمة الانتظار طلبات الفحص المعلقة (أشعة، رنين، توموغرافي) من أوامر الطبيب. اختيار المريض يفتح لوحة إدخال النتائج مع حقل الملاحظات ومرفق اختياري وإجراء "اعتماد وإرسال لملف المريض" الذي يُدرج التقرير في الجدول السريري.' }
	  ]
	},
	{
	  id: 'edu',
	  titleEn: 'OPERIX Edu',
	  titleAr: 'أوبيريكس للتعليم',
	  subEn: 'School Management Platform',
	  subAr: 'منظومة الإدارة المدرسية',
	  descEn: 'Cloud-based school management platform purpose-built for Ministry of Education standards across the Middle East. Combines academic governance with modern technology to empower school leaders and teachers.',
	  descAr: 'منصة سحابية متكاملة مصممة خصيصاً لتلبي معايير وزارات التعليم في الشرق الأوسط. نجمع بين رصانة الإدارة الأكاديمية وسلاسة التقنية الحديثة لتمكين قادة المدارس والمعلمين.',
	  url: 'https://www.edu.operix-solutions.com',
	  icon: <GraduationCap size={20} />,
	  accentColor: '#f59e0b',
	  badgeBg: 'bg-[#1a3a6b]/90',
	  badge: <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /><span>الإصدار المؤسسي 2026</span></div>,
	  image: '/projects/opx-edu-cover.jpeg',
	  previews: [
		{ url: '/projects/edu/edu-dash.png', titleEn: 'Executive Dashboard — School Command Center', titleAr: 'لوحة القيادة المدرسية — المركز التنفيذي', descEn: 'High-level administrative overview for school principals and directors. Tracks active students, class schedules, attendance rates, and academic performance KPIs in real time.', descAr: 'نظرة إدارية شاملة لمديري المدارس والقيادات التنفيذية. تتبع الطلاب النشطين، والجداول الدراسية، ومعدلات الحضور، ومؤشرات الأداء الأكاديمي في الوقت الفعلي.' },
		{ url: '/projects/edu/edu-dox.png', titleEn: 'Dox Studio — Results, Exams & Behaviour Records', titleAr: 'Dox Studio — النتائج والاختبارات والسجلات السلوكية', descEn: 'Automated document generation engine for student results, exam attendance sheets, and behaviour records. Produces 4K-print-ready certificates fully compatible with official Ministry of Education formatting standards.', descAr: 'محرك إنشاء المستندات الآلي لنتائج الطلاب وكشوف حضور الاختبارات والسجلات السلوكية. ينتج شهادات جاهزة للطباعة بجودة 4K متوافقة تماماً مع التنسيقات الرسمية لوزارة التعليم.' },
		{ url: '/projects/edu/edu-fees.png', titleEn: 'Financial Board — Fees, Registration & Treasury', titleAr: 'اللوحة المالية — الرسوم والتسجيل والخزانة', descEn: 'Comprehensive student registration and fee management system. Tracks tuition collection, instalment plans, outstanding balances, and generates financial summaries for the school treasury.', descAr: 'نظام شامل لتسجيل الطلاب وإدارة الرسوم الدراسية. يتتبع تحصيل الأقساط وخطط التقسيط والأرصدة المستحقة، ويولد ملخصات مالية لخزانة المدرسة.' },
		{ url: '/projects/edu/edu-studs.png', titleEn: 'Student Registry — Master Profiles', titleAr: 'سجل الطلاب — الملفات الشاملة', descEn: 'Centralised digital registry for all enrolled students. Stores academic history, class assignments, contact information, and links directly to grade records, attendance logs, and behaviour incidents.', descAr: 'سجل رقمي مركزي لجميع الطلاب الملتحقين. يحفظ السجل الأكاديمي والتكليفات الدراسية وبيانات التواصل، ويرتبط مباشرة بسجلات الدرجات والحضور والحوادث السلوكية.' },
		{ url: '/projects/edu/edu-par.png', titleEn: 'Parent Portal — Guardian Management', titleAr: 'بوابة أولياء الأمور — إدارة الأسرة', descEn: 'Direct linkage between student records and parent or guardian accounts. Enables streamlined communication, periodic progress report dispatch, and instant notifications for attendance and behavioural updates.', descAr: 'ربط مباشر بين بيانات الطالب وحساب ولي أمره. يتيح التواصل المنظّم وإرسال تقارير التقدم الدورية والإشعارات الفورية لتحديثات الحضور والسلوك.' },
		{ url: '/projects/edu/edu-sub.png', titleEn: 'Academic Subjects & Curriculum Management', titleAr: 'إدارة المواد الدراسية والمنهج الأكاديمي', descEn: 'Advanced subject and curriculum configuration engine. Manage school subjects, assign teachers, set grading weights, configure semester structures, and automate cumulative GPA calculations.', descAr: 'محرك متقدم لإعداد المواد والمنهج الدراسي. إدارة المواد المدرسية وتعيين المعلمين وضبط أوزان الدرجات وهيكلة الفصول الدراسية واحتساب المعدلات التراكمية آلياً.' },
		{ url: '/projects/edu/edu-res.png', titleEn: 'Results Engine — Academic Grade Records', titleAr: 'محرك النتائج — سجلات الدرجات الأكاديمية', descEn: 'Precise academic grade recording and result management system. Supports multi-term entries, automatic GPA computation, and one-click export of official result sheets aligned with Ministry grading frameworks.', descAr: 'نظام دقيق لتسجيل الدرجات الأكاديمية وإدارة النتائج. يدعم الإدخال متعدد الفصول والحساب التلقائي للمعدلات وتصدير كشوف النتائج الرسمية المتوافقة مع أطر تقدير وزارة التعليم بنقرة واحدة.' }
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
	  icon: <Globe size={18} />,
	  accentColor: '#38bdf8',
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
	  url: 'https://www.bin-abbas.operix-solutions.online',
	  icon: <Landmark size={18} />,
	  accentColor: '#10b981',
	  image: '/projects/abbas.png'
	},
	{
	  id: 'Community Hub',
	  titleEn: 'Hasad',
	  titleAr: 'بوابة حصاد الالكترونية',
	  subEn: 'Smart Community Hub',
	  subAr: 'مركز المجتمع الذكي',
	  descEn: 'Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.',
	  descAr: 'منظومة إدارة العقارات والممتلكات للتعامل مع طلبات السكان، وسجلات صيانة المرافق، ودورات الفوترة المجتمعية.',
	  url: 'https://www.hasad.operix-solutions.online/Naseem_City',
	  icon: <Building2 size={18} />,
	  accentColor: '#f43f5e',
	  image: '/projects/naseem.png'
	}
  ];

  // ─── MODAL NAV ───
  const openPreview = useCallback((platform) => {
	setActivePreview(platform);
	setCurrentImgIndex(0);
  }, []);

  const nextImg = useCallback(() => {
	if (activePreview) {
	  setImgLoaded(false);
	  setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
	}
  }, [activePreview]);

  const prevImg = useCallback(() => {
	if (activePreview) {
	  setImgLoaded(false);
	  setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
	}
  }, [activePreview]);

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

  const handleTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX); };
  const handleTouchEnd = () => {
	if (!touchStart || !touchEnd) return;
	const dist = touchStart - touchEnd;
	if (dist > minSwipeDistance) nextImg();
	if (dist < -minSwipeDistance) prevImg();
  };

  const totalScreens = corePlatforms.reduce((a, p) => a + p.previews.length, 0);

  return (
	<div className="opx-products w-full font-sans bg-[#f0f2f5] min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>

	  <style>{`
		/* ── Keyframes ── */
		@keyframes fadeUp {
		  from { opacity: 0; transform: translateY(28px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeIn {
		  from { opacity: 0; } to { opacity: 1; }
		}
		@keyframes popIn {
		  from { opacity: 0; transform: scale(0.94) translateY(10px); }
		  to   { opacity: 1; transform: scale(1) translateY(0); }
		}
		@keyframes imgReveal {
		  from { opacity: 0; transform: scale(1.03); }
		  to   { opacity: 1; transform: scale(1); }
		}
		@keyframes shimmerGold {
		  0%   { background-position: -200% center; }
		  100% { background-position: 200% center; }
		}
		@keyframes borderGlow {
		  0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
		  50%       { box-shadow: 0 0 0 3px rgba(212,175,55,0.25); }
		}
		@keyframes scanLine {
		  0%   { transform: translateY(0%); opacity: 0.4; }
		  100% { transform: translateY(100%); opacity: 0; }
		}
		@keyframes floatDot {
		  0%, 100% { transform: translateY(0px); }
		  50%       { transform: translateY(-6px); }
		}

		/* ── Gold text shimmer ── */
		.gold-shimmer {
		  background: linear-gradient(90deg, #b8860b 0%, #f3de9a 35%, #d4af37 60%, #b8860b 100%);
		  background-size: 250% auto;
		  color: transparent;
		  -webkit-background-clip: text;
		  background-clip: text;
		  animation: shimmerGold 6s linear infinite;
		}

		/* ── Core platform card ── */
		.core-card {
		  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
					  box-shadow 0.35s cubic-bezier(0.16,1,0.3,1),
					  border-color 0.25s ease;
		}
		.core-card:hover {
		  transform: translateY(-4px);
		  box-shadow: 0 24px 60px rgba(0,0,0,0.10), 0 8px 20px rgba(0,0,0,0.06);
		}
		.core-card:hover .card-cover img {
		  transform: scale(1.06);
		}
		.card-cover img {
		  transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
		}

		/* ── Preview button shimmer line ── */
		.preview-btn {
		  position: relative;
		  overflow: hidden;
		}
		.preview-btn::after {
		  content: '';
		  position: absolute;
		  inset: 0;
		  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%);
		  transform: translateX(-100%);
		  transition: transform 0.5s ease;
		}
		.preview-btn:hover::after { transform: translateX(100%); }

		/* ── Client card ── */
		.client-card {
		  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
					  box-shadow 0.3s ease;
		}
		.client-card:hover {
		  transform: translateY(-3px);
		  box-shadow: 0 16px 48px rgba(0,0,0,0.09);
		}

		/* ── Thumbnail strip scrollbar ── */
		.thumb-strip { scrollbar-width: thin; scrollbar-color: #d4af37 #0f1621; }
		.thumb-strip::-webkit-scrollbar { height: 3px; }
		.thumb-strip::-webkit-scrollbar-track { background: #0f1621; }
		.thumb-strip::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 2px; }

		/* ── Progress bar fill ── */
		.progress-fill {
		  transition: width 0.3s cubic-bezier(0.4,0,0.2,1);
		}

		/* ── Scan line on hover ── */
		.scan-wrap { overflow: hidden; }
		.scan-wrap:hover .scan-line { animation: scanLine 1.2s ease-in-out infinite; }
		.scan-line {
		  position: absolute; left: 0; right: 0; top: 0; height: 40%;
		  background: linear-gradient(to bottom, rgba(255,255,255,0.04), transparent);
		  pointer-events: none; z-index: 2;
		  animation: none;
		}

		/* ── Hero stat float ── */
		.float-stat { animation: floatDot 3s ease-in-out infinite; }
		.float-stat:nth-child(2) { animation-delay: 0.8s; }
		.float-stat:nth-child(3) { animation-delay: 1.6s; }

		/* ── Reduced motion ── */
		@media (prefers-reduced-motion: reduce) {
		  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
		}
	  `}</style>

	  {/* ══════════════════════════════════════
		   HERO
	  ══════════════════════════════════════ */}
	  <div className="relative overflow-hidden bg-[#111827]">
		{/* Layered background */}
		<div className="absolute inset-0 pointer-events-none">
		  <div style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, #d4af3718 0%, transparent 70%)' }} className="absolute inset-0" />
		  <div style={{ background: 'radial-gradient(ellipse 40% 40% at 20% 80%, #1e2d4030 0%, transparent 60%)' }} className="absolute inset-0" />
		  {/* Grid lines */}
		  <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
			<defs>
			  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
				<path d="M 48 0 L 0 0 0 48" fill="none" stroke="#d4af37" strokeWidth="0.5"/>
			  </pattern>
			</defs>
			<rect width="100%" height="100%" fill="url(#grid)" />
		  </svg>
		</div>

		<div
		  className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-28"
		  style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
		>
		  {/* Eyebrow */}
		  <div className="flex justify-center mb-6">
			<span
			  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/25 px-4 py-2 rounded-full"
			  style={{ animation: heroVisible ? 'fadeUp 0.5s 0.1s both' : 'none' }}
			>
			  <Zap size={10} fill="currentColor" />
			  {isAr ? "البنية التحتية السحابية لأوبيريكس" : "OPERIX Cloud Infrastructure"}
			</span>
		  </div>

		  {/* Headline */}
		  <h1
			className="text-center font-serif font-black leading-[1.1] mb-6"
			style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', animation: heroVisible ? 'fadeUp 0.6s 0.18s both' : 'none' }}
		  >
			<span className="gold-shimmer">
			  {isAr ? "مصفوفة الأنظمة المستضافة" : "Deployed Systems Matrix"}
			</span>
		  </h1>

		  {/* Sub */}
		  <p
			className="text-center text-[#94a3b8] text-sm md:text-base font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
			style={{ animation: heroVisible ? 'fadeUp 0.6s 0.26s both' : 'none' }}
		  >
			{isAr
			  ? "بوابة تفاعلية للوصول المباشر إلى المنصات الرقمية المستضافة والنشطة ضمن منظومة أوبيريكس للحلول المتكاملة، ومشاريع العملاء البارزة."
			  : "Interactive gateway to the live OPERIX ecosystem — cloud platforms, real-time operational environments, and featured client deployments."}
		  </p>

		  {/* Stats row */}
		  <div
			className="flex flex-wrap justify-center gap-6 md:gap-10"
			style={{ animation: heroVisible ? 'fadeUp 0.6s 0.34s both' : 'none' }}
		  >
			{[
			  { n: corePlatforms.length, label: isAr ? 'منصة أساسية' : 'Core Platforms' },
			  { n: totalScreens, label: isAr ? 'شاشة نظام' : 'System Screens' },
			  { n: clientProjects.length, label: isAr ? 'مشروع عميل' : 'Client Projects' }
			].map((s, i) => (
			  <div key={i} className="float-stat text-center">
				<div className="text-3xl md:text-4xl font-black text-white font-serif leading-none">{s.n}+</div>
				<div className="text-[10px] font-bold uppercase tracking-widest text-[#475569] mt-1">{s.label}</div>
			  </div>
			))}
		  </div>
		</div>
	  </div>

	  {/* ══════════════════════════════════════
		   CONTENT AREA
	  ══════════════════════════════════════ */}
	  <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">

		{/* ─── TIER 1: CORE PLATFORMS ─── */}
		<section>
		  {/* Section header */}
		  <div className="flex items-center gap-4 mb-10" style={{ animation: 'fadeUp 0.5s 0.1s both' }}>
			<div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/40 to-transparent" />
			<span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37] whitespace-nowrap px-1">
			  {isAr ? "أنظمة أوبيريكس الأساسية" : "Core OPERIX Ecosystem"}
			</span>
			<div className="flex-1 h-px bg-gradient-to-l from-[#d4af37]/40 to-transparent" />
		  </div>

		  {/* Cards grid */}
		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{corePlatforms.map((sys, idx) => (
			  <div
				key={sys.id}
				className="core-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm"
				style={{ animation: `fadeUp 0.55s ${0.15 + idx * 0.07}s both` }}
				onMouseEnter={() => setHoveredCard(sys.id)}
				onMouseLeave={() => setHoveredCard(null)}
			  >
				{/* Cover image */}
				<div
				  className="card-cover scan-wrap h-52 sm:h-60 relative overflow-hidden bg-slate-100 cursor-pointer"
				  onClick={() => window.open(sys.url, '_blank')}
				>
				  <img
					src={sys.image}
					alt={sys.titleEn}
					className="w-full h-full object-cover object-left-top"
				  />
				  {/* Scan line */}
				  <div className="scan-line" />
				  {/* Dark overlay on hover */}
				  <div
					className="absolute inset-0 transition-opacity duration-300"
					style={{
					  background: `linear-gradient(to top, ${sys.accentColor}22 0%, transparent 60%)`,
					  opacity: hoveredCard === sys.id ? 1 : 0
					}}
				  />
				  {/* Badge */}
				  <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} ${sys.badgeBg} backdrop-blur border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
					{sys.badge}
				  </div>
				  {/* Screen count */}
				  {sys.previews.length > 0 && (
					<div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} bg-black/60 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5`}>
					  <Monitor size={9} /> {sys.previews.length} {isAr ? 'شاشة' : 'screens'}
					</div>
				  )}
				  {/* Subtle top accent line */}
				  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${sys.accentColor}, transparent)` }} />
				</div>

				{/* Body */}
				<div className="p-6 flex flex-col gap-4">
				  {/* Identity row */}
				  <div className="flex items-start gap-3">
					<div
					  className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
					  style={{ background: sys.accentColor }}
					>
					  {sys.icon}
					</div>
					<div className="flex-1 min-w-0">
					  <h3 className="font-black text-[#0f172a] text-base leading-snug">
						{isAr ? sys.titleAr : sys.titleEn}
					  </h3>
					  <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: sys.accentColor }}>
						{isAr ? sys.subAr : sys.subEn}
					  </p>
					</div>
				  </div>

				  {/* Description */}
				  <p className="text-[13px] text-slate-500 leading-relaxed font-medium line-clamp-2 flex-grow" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? sys.descAr : sys.descEn}
				  </p>

				  {/* Actions */}
				  <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
					<a
					  href={sys.url}
					  target="_blank"
					  rel="noopener noreferrer"
					  className="flex-1 flex justify-center items-center gap-1.5 text-white py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all duration-200 hover:brightness-110 active:scale-95 shadow-sm"
					  style={{ background: `linear-gradient(135deg, #1e2d40, #0f172a)` }}
					>
					  {isAr ? "دخول المنصة" : "Launch"} <ArrowUpRight size={11} />
					</a>

					{sys.previews.length > 0 && (
					  <button
						onClick={() => openPreview(sys)}
						className="preview-btn flex-1 flex justify-center items-center gap-1.5 py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all duration-200 active:scale-95 border"
						style={{
						  background: `${sys.accentColor}14`,
						  borderColor: `${sys.accentColor}35`,
						  color: sys.accentColor
						}}
						onMouseEnter={e => {
						  e.currentTarget.style.background = sys.accentColor;
						  e.currentTarget.style.color = '#fff';
						  e.currentTarget.style.borderColor = sys.accentColor;
						}}
						onMouseLeave={e => {
						  e.currentTarget.style.background = `${sys.accentColor}14`;
						  e.currentTarget.style.color = sys.accentColor;
						  e.currentTarget.style.borderColor = `${sys.accentColor}35`;
						}}
					  >
						<ImageIcon size={11} /> {isAr ? "استعراض النظام" : "Preview UI"}
					  </button>
					)}
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</section>

		{/* ─── TIER 2: CLIENT PROJECTS ─── */}
		<section>
		  <div className="flex items-center gap-4 mb-10" style={{ animation: 'fadeUp 0.5s 0.1s both' }}>
			<div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
			<span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap px-1">
			  {isAr ? "مشاريع وتطبيقات العملاء" : "Featured Client Deployments"}
			</span>
			<div className="flex-1 h-px bg-gradient-to-l from-slate-300 to-transparent" />
		  </div>

		  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
			{clientProjects.map((proj, idx) => (
			  <div
				key={proj.id}
				className="client-card bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col"
				style={{ animation: `fadeUp 0.5s ${0.1 + idx * 0.08}s both` }}
			  >
				{/* Cover */}
				<div
				  className="h-40 relative overflow-hidden bg-slate-100 cursor-pointer"
				  onClick={() => window.open(proj.url, '_blank')}
				>
				  <img
					src={proj.image}
					alt={proj.titleEn}
					className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
				  />
				  {/* Top accent */}
				  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${proj.accentColor}, transparent)` }} />
				</div>

				{/* Body */}
				<div className="p-5 flex flex-col flex-grow">
				  {/* Floating icon (elevated from image) */}
				  <div
					className="w-9 h-9 rounded-xl flex items-center justify-center text-white -mt-9 mb-3 shadow-lg border-2 border-white relative z-10 shrink-0"
					style={{ background: proj.accentColor }}
				  >
					{proj.icon}
				  </div>
				  <h3 className="font-black text-[#0f172a] text-base leading-snug">
					{isAr ? proj.titleAr : proj.titleEn}
				  </h3>
				  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5 mb-3">
					{isAr ? proj.subAr : proj.subEn}
				  </p>
				  <p className="text-[12px] text-slate-500 leading-relaxed flex-grow" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? proj.descAr : proj.descEn}
				  </p>
				  <div className="mt-4 pt-4 border-t border-slate-100">
					<a
					  href={proj.url}
					  target="_blank"
					  rel="noopener noreferrer"
					  className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest transition-colors duration-200 hover:opacity-70"
					  style={{ color: proj.accentColor }}
					>
					  {isAr ? "زيارة الموقع المباشر" : "Visit Live Portal"}
					  <ExternalLink size={13} />
					</a>
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</section>
	  </div>

	  {/* ══════════════════════════════════════
		   PREVIEW MODAL
	  ══════════════════════════════════════ */}
	  {activePreview && activePreview.previews.length > 0 && (
		<div
		  className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 lg:p-8"
		  style={{ animation: 'fadeIn 0.18s ease both' }}
		>
		  {/* Backdrop */}
		  <div
			className="absolute inset-0 bg-[#04080e]/96 backdrop-blur-lg"
			onClick={() => setActivePreview(null)}
		  />

		  {/* Modal shell */}
		  <div
			className="relative w-full max-w-[1380px] max-h-[93vh] flex flex-col z-10 bg-[#0d1520] rounded-2xl border border-slate-700/60 shadow-2xl overflow-hidden"
			style={{ animation: 'popIn 0.28s cubic-bezier(0.16,1,0.3,1) both' }}
		  >

			{/* ── TOP BAR ── */}
			<div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 shrink-0">
			  <div className="flex items-center gap-3">
				{/* Color dot matching product accent */}
				<div
				  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs shadow-md"
				  style={{ background: activePreview.accentColor }}
				>
				  {activePreview.icon}
				</div>
				<div>
				  <span className="font-black text-white text-sm leading-none block">
					{isAr ? activePreview.titleAr : activePreview.titleEn}
				  </span>
				  <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
					{isAr ? "استعراض واجهة النظام" : "System UI Preview"}
				  </span>
				</div>
			  </div>

			  {/* Right controls */}
			  <div className="flex items-center gap-2">
				{/* Progress indicator */}
				<div className="hidden sm:flex items-center gap-2">
				  <div className="w-28 h-1 bg-slate-800 rounded-full overflow-hidden">
					<div
					  className="progress-fill h-full rounded-full"
					  style={{
						background: activePreview.accentColor,
						width: `${((currentImgIndex + 1) / activePreview.previews.length) * 100}%`
					  }}
					/>
				  </div>
				  <span className="text-[10px] font-mono font-black text-slate-500">
					{currentImgIndex + 1}<span className="text-slate-700 mx-0.5">/</span>{activePreview.previews.length}
				  </span>
				</div>

				{/* Launch */}
				<a
				  href={activePreview.url}
				  target="_blank"
				  rel="noopener noreferrer"
				  className="hidden sm:flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-[#d4af37] hover:text-[#d4af37] transition-all"
				>
				  <ExternalLink size={10} /> {isAr ? "دخول المنصة" : "Launch"}
				</a>

				{/* Close */}
				<button
				  onClick={() => setActivePreview(null)}
				  className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 flex items-center justify-center hover:bg-red-600/80 hover:text-white hover:border-red-500 transition-all"
				>
				  <X size={14} strokeWidth={2.5} />
				</button>
			  </div>
			</div>

			{/* ── MAIN CONTENT ── */}
			<div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-0">

			  {/* LEFT: media viewer */}
			  <div
				className="relative flex-1 bg-[#060c14] flex flex-col min-h-[260px] lg:min-h-0"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			  >
				{/* Media area */}
				<div className="flex-1 flex items-center justify-center p-4 relative group cursor-grab active:cursor-grabbing overflow-hidden">

				  {/* Loading skeleton */}
				  {!imgLoaded && (
					<div className="absolute inset-4 rounded-xl bg-slate-800/60 animate-pulse" />
				  )}

				  {activePreview.previews[currentImgIndex].url.endsWith('.mp4') ? (
					<video
					  key={`v-${currentImgIndex}`}
					  src={activePreview.previews[currentImgIndex].url}
					  controls autoPlay muted loop
					  onLoadedData={() => setImgLoaded(true)}
					  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
					  style={{ animation: 'imgReveal 0.3s ease both' }}
					/>
				  ) : (
					<img
					  key={`i-${currentImgIndex}`}
					  src={activePreview.previews[currentImgIndex].url}
					  alt="System Preview"
					  onLoad={() => setImgLoaded(true)}
					  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
					  style={{ animation: 'imgReveal 0.3s ease both', opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.2s ease' }}
					/>
				  )}

				  {/* Nav arrows */}
				  <button
					onClick={(e) => { e.stopPropagation(); prevImg(); }}
					className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#d4af37] text-white flex items-center justify-center transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border border-white/10 hover:border-[#d4af37] shadow-xl z-10 active:scale-90"
				  >
					{isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
				  </button>
				  <button
					onClick={(e) => { e.stopPropagation(); nextImg(); }}
					className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-[#d4af37] text-white flex items-center justify-center transition-all duration-200 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 border border-white/10 hover:border-[#d4af37] shadow-xl z-10 active:scale-90"
				  >
					{isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
				  </button>
				</div>

				{/* Thumbnail strip */}
				<div
				  ref={thumbnailRef}
				  className="thumb-strip flex gap-2 overflow-x-auto px-4 py-3 border-t border-slate-800/80 shrink-0"
				>
				  {activePreview.previews.map((p, i) => (
					<button
					  key={i}
					  data-active={i === currentImgIndex}
					  onClick={() => { setImgLoaded(false); setCurrentImgIndex(i); }}
					  className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-95"
					  style={{
						borderColor: i === currentImgIndex ? activePreview.accentColor : 'rgba(71,85,105,0.5)',
						opacity: i === currentImgIndex ? 1 : 0.4,
						transform: i === currentImgIndex ? 'scale(1.05)' : 'scale(1)',
						boxShadow: i === currentImgIndex ? `0 0 12px ${activePreview.accentColor}40` : 'none'
					  }}
					>
					  {p.url.endsWith('.mp4') ? (
						<video src={p.url} className="w-full h-full object-cover object-top pointer-events-none" muted />
					  ) : (
						<img src={p.url} alt="" className="w-full h-full object-cover object-top pointer-events-none" />
					  )}
					</button>
				  ))}
				</div>
			  </div>

			  {/* RIGHT: description panel */}
			  <div className="lg:w-80 xl:w-96 bg-[#0a111b] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col max-h-[36vh] lg:max-h-full shrink-0">

				{/* Module info */}
				<div className="p-5 border-b border-slate-800 shrink-0">
				  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-600 mb-2.5">
					<Info size={9} style={{ color: activePreview.accentColor }} /> {isAr ? "الوحدة الحالية" : "Current Module"}
				  </span>
				  <h4
					key={currentImgIndex}
					className="font-serif font-black text-lg leading-tight"
					style={{
					  color: activePreview.accentColor,
					  animation: 'fadeUp 0.22s ease both',
					  direction: isAr ? 'rtl' : 'ltr'
					}}
				  >
					{isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}
				  </h4>

				  {/* Dot nav */}
				  <div className="flex gap-1.5 mt-3 flex-wrap">
					{activePreview.previews.map((_, i) => (
					  <button
						key={i}
						onClick={() => { setImgLoaded(false); setCurrentImgIndex(i); }}
						className="rounded-full transition-all duration-200"
						style={{
						  width: i === currentImgIndex ? '20px' : '6px',
						  height: '6px',
						  background: i === currentImgIndex ? activePreview.accentColor : 'rgba(71,85,105,0.5)'
						}}
					  />
					))}
				  </div>
				</div>

				{/* Description */}
				<div className="flex-1 overflow-y-auto p-5">
				  <p
					key={`d-${currentImgIndex}`}
					className="text-[13px] text-slate-400 font-medium leading-relaxed"
					style={{ animation: 'fadeIn 0.3s 0.1s ease both', direction: isAr ? 'rtl' : 'ltr' }}
				  >
					{isAr ? activePreview.previews[currentImgIndex].descAr : activePreview.previews[currentImgIndex].descEn}
				  </p>
				</div>

				{/* Footer */}
				<div className="p-4 border-t border-slate-800 shrink-0 flex items-center gap-2.5">
				  <a
					href={activePreview.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex justify-center items-center gap-1.5 text-white py-2 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all hover:brightness-110 active:scale-95"
					style={{ background: activePreview.accentColor }}
				  >
					{isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={10} />
				  </a>
				  <button onClick={prevImg} className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90">
					{isAr ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
				  </button>
				  <button onClick={nextImg} className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90">
					{isAr ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
				  </button>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  )}
	</div>
  );
}