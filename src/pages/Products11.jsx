import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Users, Settings, Activity, CreditCard, ExternalLink,
  Building2, Globe, Landmark, ShieldCheck,
  ImageIcon, X, ChevronRight, ChevronLeft, Info, Monitor
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   MacBook M4 Max Frame Component
   The screen area is exposed via children — everything else
   is pure CSS chrome.
═══════════════════════════════════════════════════════════ */
function MacBookM4({ children }) {
  return (
	<div className="macbook-shell">
	  {/* ── Lid ── */}
	  <div className="macbook-lid">
		{/* Bezel */}
		<div className="macbook-bezel">
		  {/* Camera dot */}
		  <div className="macbook-camera">
			<div className="macbook-camera-dot" />
		  </div>
		  {/* The actual screen area */}
		  <div className="macbook-screen">
			{children}
		  </div>
		</div>
	  </div>
	  {/* ── Base / keyboard ── */}
	  <div className="macbook-hinge" />
	  <div className="macbook-base">
		<div className="macbook-keyboard-area">
		  <div className="macbook-keyboard" />
		  <div className="macbook-trackpad" />
		</div>
	  </div>
	  {/* ── Foot shadow ── */}
	  <div className="macbook-shadow" />
	</div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════ */
export default function Projects() {
  const { isAr } = useLanguage();

  const [activePreview, setActivePreview] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const minSwipeDistance = 50;
  const videoRef = useRef(null);

  useEffect(() => {
	if (activePreview) {
	  document.body.style.overflow = 'hidden';
	  requestAnimationFrame(() => setModalVisible(true));
	} else {
	  document.body.style.overflow = '';
	  setModalVisible(false);
	}
	return () => { document.body.style.overflow = ''; };
  }, [activePreview]);

  // Force reload video when index changes to a video
  useEffect(() => {
	if (!activePreview) return;
	const url = activePreview.previews[currentImgIndex]?.url;
	if (url?.endsWith('.mp4') && videoRef.current) {
	  videoRef.current.load();
	  videoRef.current.play().catch(() => {});
	}
  }, [currentImgIndex, activePreview]);

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
	  icon: <Settings size={22} />,
	  accentColor: '#ef4444',
	  color: 'bg-white text-red-600 border border-slate-100',
	  image: '/projects/ops.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#1e2d40]/90 backdrop-blur border border-slate-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE TELEMETRY
		</div>
	  ),
	  previews: [
		{ url: '/projects/ops/exe-dash.png', titleEn: 'Executive Command Center', titleAr: 'مركز القيادة التنفيذية', descEn: 'High-level administrative hub for C-Suite approvals, IT operations, and identity access management across the entire enterprise.', descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية، وعمليات تقنية المعلومات، وإدارة هويات الوصول عبر المؤسسة.' },
		{ url: '/projects/ops/ops-dash.mp4', titleEn: 'Enterprise Operations Matrix', titleAr: 'مصفوفة عمليات المؤسسة', descEn: 'The central nervous system of the operations floor. Provides direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.', descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.' },
		{ url: '/projects/ops/ai-email-ops.png', titleEn: 'AI-Powered Communications Core', titleAr: 'مركز الاتصالات بالذكاء الاصطناعي', descEn: 'Smart email drafting utilizing generative AI. Features pre-configured corporate templates for official notices, updates, and HR compliance letters.', descAr: 'صياغة ذكية لرسائل البريد الإلكتروني باستخدام الذكاء الاصطناعي التوليدي. يحتوي على قوالب مؤسسية مسبقة الإعداد.' },
		{ url: '/projects/ops/analyticsandreports-ops.png', titleEn: 'Advanced Analytics & Reporting', titleAr: 'التحليلات المتقدمة والتقارير', descEn: 'Dynamic data visualization and custom report generation. Filter vast datasets across the enterprise and export directly to Excel or secure PDF formats.', descAr: 'تصوير مرئي ديناميكي للبيانات وإنشاء تقارير مخصصة. تصفية مجموعات البيانات الضخمة وتصديرها.' },
		{ url: '/projects/ops/crm-ops.png', titleEn: 'CRM & Lead Pipeline Matrix', titleAr: 'مصفوفة إدارة علاقات العملاء', descEn: 'Centralized marketing workspace tracking ad spend, campaign ROI, and lead conversion funnels in real-time.', descAr: 'مساحة عمل تسويقية مركزية لتتبع الإنفاق الإعلاني وعائد الاستثمار.' },
		{ url: '/projects/ops/doc-generateandsendemail-ops.png', titleEn: 'Automated Document Generator', titleAr: 'منشئ المستندات الآلي', descEn: 'Instantly generate official employment offers, contracts, and internal memos complete with dynamic variables and secure ledger archiving.', descAr: 'إنشاء فوري لعروض العمل الرسمية والعقود والمذكرات الداخلية.' },
		{ url: '/projects/ops/external-standaloneapps-ops.png', titleEn: 'Decentralized Portals & QR Gateway', titleAr: 'البوابات اللامركزية ورموز QR', descEn: 'Manage public-facing touchpoints and standalone apps for gig workers, field staff, and VIP valet clients via generated access links and QR codes.', descAr: 'إدارة نقاط الاتصال العامة والتطبيقات المستقلة للعاملين المستقلين.' },
		{ url: '/projects/ops/facilitandtraining-ops.png', titleEn: 'Facility Configuration & Academy Hub', titleAr: 'تهيئة المرافق وإدارة الأكاديميات', descEn: 'Spin up and configure complex project environments, set daily operational targets, and manage internal training course capacities.', descAr: 'إنشاء وتهيئة بيئات مشاريع معقدة وإدارة السعة الاستيعابية للدورات التدريبية.' },
		{ url: '/projects/ops/hr-ops.png', titleEn: 'Master HR & Roster Directory', titleAr: 'الدليل الشامل للموارد البشرية', descEn: 'Global administrative view of human capital. Track shift assignments, monitor active timesheets, and execute top-level personnel overrides.', descAr: 'عرض إداري شامل لرأس المال البشري. تتبع المهام والورديات ومراقبة سجلات الحضور.' },
		{ url: '/projects/ops/it-ops.png', titleEn: 'IT IAM & Infrastructure Control', titleAr: 'عمليات تقنية المعلومات وإدارة الهويات', descEn: 'Secure Identity and Access Management (IAM) panel. Provision user roles, manage system permissions, and monitor core infrastructure health.', descAr: 'لوحة آمنة لإدارة الهويات والوصول. منح أدوار المستخدمين وإدارة الصلاحيات.' },
		{ url: '/projects/ops/performance-ops.png', titleEn: 'Live Operational KPI Telemetry', titleAr: 'القياس اللحظي لمؤشرات الأداء', descEn: 'High-level overview of global enterprise metrics, tracking ANPR traffic flow, active subscribers, and operational revenue in real time.', descAr: 'نظرة رفيعة المستوى على مقاييس المؤسسة وتتبع الإيرادات التشغيلية.' },
		{ url: '/projects/ops/setshift-ops.png', titleEn: 'Geofenced Shift Orchestration', titleAr: 'إدارة الورديات بالنطاق الجغرافي', descEn: 'Pinpoint workforce deployment using interactive mapping and strict GPS radius limits to guarantee accurate on-site field staff attendance.', descAr: 'التوجيه الدقيق للقوى العاملة باستخدام الخرائط التفاعلية وحدود النطاق الجغرافي.' },
	  ],
	},
	{
	  id: 'fmis',
	  titleEn: 'OPERIX FMIS',
	  titleAr: 'أوبيريكس للإدارة المالية',
	  subEn: 'Corporate Ledger System',
	  subAr: 'نظام السجلات المالية للشركات',
	  descEn: 'Financial management ecosystem, corporate ledger reconciliation, ZATCA Phase 2 Integration Matrix, and automated budget loops.',
	  descAr: 'نظام إدارة مالية متكامل يشمل التسويات المحاسبية للشركات، متوافق مع المرحلة الثانية لهيئة الزكاة والدخل (ZATCA).',
	  url: 'https://www.fmis.operix-solutions.online',
	  icon: <CreditCard size={22} />,
	  accentColor: '#10b981',
	  color: 'bg-emerald-900 text-white',
	  image: '/projects/fmis.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#c9a84c]/95 backdrop-blur border border-[#c9a84c] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <ShieldCheck size={14} /> ZATCA VERIFIED
		</div>
	  ),
	  previews: [
		{ url: '/projects/fmis/dash-fmis.png', titleEn: 'Executive Dashboard & P&L', titleAr: 'لوحة القيادة التنفيذية والأرباح والخسائر', descEn: 'Real-time overview of profit and loss, revenue pipelines, and pending liabilities. Provides C-level executives with immediate financial health metrics.', descAr: 'نظرة عامة لحظية على الأرباح والخسائر وتدفقات الإيرادات والالتزامات المعلقة.' },
		{ url: '/projects/fmis/opx-ai-fmis.png', titleEn: 'OPERIX AI Copilot Integration', titleAr: 'مساعد الذكاء الاصطناعي المدمج', descEn: 'Embedded AI assistant that analyzes financial databases, automates complex module navigation, and generates live telemetry reports on command.', descAr: 'مساعد ذكاء اصطناعي مدمج يحلل قواعد البيانات المالية ويولد تقارير لحظية.' },
		{ url: '/projects/fmis/quot-fmis.png', titleEn: 'Automated Quotation Builder', titleAr: 'منشئ عروض الأسعار التلقائي', descEn: 'Streamlined proposal generation tool that maps directly to the CRM, allowing quick drafting, approval, and dispatching of corporate estimates.', descAr: 'أداة لإنشاء العروض ترتبط مباشرة بنظام إدارة علاقات العملاء.' },
		{ url: '/projects/fmis/help-fmis.png', titleEn: 'System Architecture & Help Matrix', titleAr: 'هيكلية النظام والمساعدة الذكية', descEn: 'Comprehensive, built-in documentation and mission-control mapping that guides users through GL, WBS, and Payroll engine workflows.', descAr: 'وثائق ومصفوفة توجيه شاملة مدمجة ترشد المستخدمين عبر سير العمل.' },
	  ],
	},
	{
	  id: 'hris',
	  titleEn: 'OPERIX HRIS',
	  titleAr: 'أوبيريكس لإدارة الموارد البشرية',
	  subEn: 'Human Capital Infrastructure',
	  subAr: 'بنية رأس المال البشري',
	  descEn: 'Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service pipelines.',
	  descAr: 'أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب بالنطاق الجغرافي (GPS) ومحرك احتساب الاستقطاعات التلقائي.',
	  url: 'https://www.hris.operix-solutions.online',
	  icon: <Users size={22} />,
	  accentColor: '#6366f1',
	  color: 'bg-black text-white',
	  image: '/projects/hris.png',
	  interactiveBadge: (
		<div className="absolute bottom-4 left-4 bg-emerald-700/90 backdrop-blur border border-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-white animate-ping" /> GPS FENCE ACTIVE
		</div>
	  ),
	  previews: [
		{ url: '/projects/hris/ai-scanner-hris.png', titleEn: 'AI-Powered CV Scanner', titleAr: 'الماسح الضوئي للسير الذاتية', descEn: 'Automated recruitment engine utilizing Edge AI to instantly parse, score, and extract data from applicant CVs, mapping them directly to open requisitions.', descAr: 'محرك توظيف آلي يعتمد على الذكاء الاصطناعي لقراءة السير الذاتية وتقييمها فورياً.' },
		{ url: '/projects/hris/resutl-ats-hris.png', titleEn: 'AI Scan Results & Match Analysis', titleAr: 'نتائج المسح وتحليل التطابق', descEn: 'Detailed breakdown of candidate profiles, showcasing AI-generated skill gap analysis and automated role matching probabilities.', descAr: 'تحليل مفصل لملفات المرشحين واحتماليات التطابق التلقائي مع الأدوار الوظيفية.' },
		{ url: '/projects/hris/emp-pro-hris.png', titleEn: 'Master Employee Profiles', titleAr: 'الملفات الشاملة للموظفين', descEn: 'Centralized digital twin of the workforce. Stores identity documents, contract financials, and live disciplinary or attendance records in one secure vault.', descAr: 'توأمة رقمية مركزية للقوى العاملة تحفظ المستندات والبيانات المالية وسجلات الحضور.' },
		{ url: '/projects/hris/pipline-hris.png', titleEn: 'Kanban Recruitment Pipeline', titleAr: 'مسار التوظيف وإدارة المرشحين', descEn: 'Visual drag-and-drop applicant tracking system (ATS). Seamlessly move candidates from initial screening to final offer with automated status triggers.', descAr: 'نظام تتبع للمتقدمين مرئي يعمل بالسحب والإفلات مع مشغلات حالة تلقائية.' },
		{ url: '/projects/hris/visa-mgm-hris.png', titleEn: 'Muqeem Visa Management', titleAr: 'إدارة تأشيرات مقيم', descEn: 'Direct API integration for tracking expatriate Iqama expiries, managing exit/entry visas, and ensuring 100% governmental compliance.', descAr: 'ربط API مباشر لتتبع انتهاء الإقامات وإدارة التأشيرات وضمان الامتثال الحكومي.' },
		{ url: '/projects/hris/doc-hris.png', titleEn: 'Corporate Document Builder', titleAr: 'منشئ المستندات الرسمية', descEn: 'Automated letterhead generator for official corporate correspondence, warnings, and salary certificates, stored in an immutable ledger.', descAr: 'منشئ خطابات آلي للمراسلات الرسمية والإنذارات وشهادات الرواتب.' },
		{ url: '/projects/hris/external-apps-hris.png', titleEn: 'External Freelance Portals', titleAr: 'بوابات العمل الحر الخارجية', descEn: 'Secure, passcode-protected public gateways for gig workers and external applicants to submit credentials without accessing the core system.', descAr: 'بوابات عامة آمنة تتيح للمستقلين والمتقدمين تقديم بياناتهم دون الوصول للنظام الأساسي.' },
	  ],
	},
	{
	  id: 'care',
	  titleEn: 'OPERIX Health Care',
	  titleAr: 'أوبيريكس كير للرعاية الطبية',
	  subEn: 'Clinical Management Core',
	  subAr: 'منظومة الإدارة السريرية',
	  descEn: 'Advanced hospital management ecosystem. End-to-end clinical workflow from patient intake and triage through physician consultation, pharmacy, surgical operations, blood bank, and full financial treasury.',
	  descAr: 'منظومة متكاملة لإدارة المستشفيات. سير عمل سريري شامل من استقبال المريض والفرز وصولاً إلى الاستشارة الطبية والصيدلية وغرف العمليات وبنك الدم والخزانة المالية.',
	  url: 'https://www.care.operix-solutions.online',
	  icon: <Activity size={22} />,
	  accentColor: '#f43f5e',
	  color: 'bg-blue-900 text-white',
	  image: '/projects/care.png',
	  interactiveBadge: (
		<div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur border border-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <Activity size={14} className="animate-pulse" /> CLINICAL SYNC
		</div>
	  ),
	  previews: [
		{ url: '/projects/care/admin-care.png', titleEn: 'Command Center — Admin Console', titleAr: 'مركز القيادة — لوحة الإدارة', descEn: 'Enterprise analytics and access control hub. Real-time counters for active visits, pending prescriptions, and surgeries. Houses the Account Approvals queue and full Access & Security Registry.', descAr: 'مركز تحليلات المؤسسة والتحكم في الوصول. عدادات لحظية للزيارات والوصفات والعمليات.' },
		{ url: '/projects/care/reception-care.png', titleEn: 'Front Desk — New Patient Enrollment', titleAr: 'الاستقبال — تسجيل مريض جديد', descEn: 'Patient intake form capturing full demographics. One-tap "Proceed to Triage & Services" routes the registered patient into the nurse station workflow.', descAr: 'نموذج استقبال المريض الذي يسجل البيانات الكاملة وينقله فوراً إلى محطة التمريض.' },
		{ url: '/projects/care/appoint-care.png', titleEn: 'Front Desk — Appointments & Scheduling', titleAr: 'الاستقبال — المواعيد والجدولة', descEn: 'Dual-panel appointment hub. Schedule new visits by selecting the patient, assigning a doctor, setting date and time slot, and noting the visit reason.', descAr: 'مركز مواعيد ثنائي اللوحات لجدولة الزيارات وتعيين الأطباء.' },
		{ url: '/projects/care/doc-workspace-care.png', titleEn: 'Doctor Workspace — Consultation Waitlist', titleAr: 'بيئة عمل الطبيب — قائمة الانتظار', descEn: 'Live triage board showing all patients awaiting the physician. Each card displays MRN, ordered services, and bypass status.', descAr: 'لوحة الفرز الحي التي تعرض جميع المرضى في انتظار الطبيب مع رقم السجل الطبي.' },
		{ url: '/projects/care/ops-care.png', titleEn: 'Operations OR — Surgical Board', titleAr: 'غرفة العمليات — لوحة العمليات الجراحية', descEn: 'Real-time surgical scheduling with live blood bank availability. Book procedures by selecting patient, surgeon, operation name, required blood units, and notes.', descAr: 'جدولة العمليات الجراحية اللحظية مع إتاحة بنك الدم الحية.' },
		{ url: '/projects/care/bloodbank-care.png', titleEn: 'Blood Bank Operations — Live Inventory', titleAr: 'عمليات بنك الدم — المخزون الحي', descEn: 'Enterprise hemotherapy dispensing and tracking. Shows total vault capacity, critical shortage groups, and system health per blood type.', descAr: 'صرف وتتبع مستحضرات الدم مع عرض السعة الإجمالية ومجموعات النقص الحرج.' },
		{ url: '/projects/care/inside-file-care.png', titleEn: 'Patient History — Full Clinical Record', titleAr: 'سجل المريض — الملف السريري الكامل', descEn: 'Complete longitudinal patient record. The Clinical Timeline renders every encounter — Check Visits with vitals, Diagnosis & RX, Pathology, and Surgical Operations.', descAr: 'السجل الطولي الكامل للمريض مع الجدول الزمني لكل زيارة وتشخيص وعملية.' },
		{ url: '/projects/care/financial-care.png', titleEn: 'Financial Controller — Corporate Treasury', titleAr: 'المراقب المالي — الخزانة المؤسسية', descEn: 'Live financial ledger for the facility. Displays gross revenue, payroll, and operating expenses against real-time P&L with a full audit trail.', descAr: 'السجل المالي الحي للمنشأة مع عرض الإيرادات والرواتب والمصاريف.' },
		{ url: '/projects/care/radio-lab-care.png', titleEn: 'Radiography Lab — Diagnostic Department', titleAr: 'مختبر الأشعة — قسم التشخيص', descEn: 'Diagnostic imaging portal. The active queue lists pending scan requests (X-Ray, MRI, CT) pulled from physician orders.', descAr: 'بوابة التصوير التشخيصي مع قائمة انتظار طلبات الفحص من أوامر الطبيب.' },
	  ],
	},
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
	  descAr: 'مؤسسة جنوب سودانية متخصصة في استيراد وتوزيع المواد الغذائية ومواد البناء والخدمات اللوجستية.',
	  url: 'https://mamey.vercel.app',
	  icon: <Globe size={20} />,
	  accentColor: '#0ea5e9',
	  color: 'bg-sky-400 text-white',
	  image: '/projects/mamey.png',
	},
	{
	  id: 'abdullah',
	  titleEn: 'Abdullah Bin Abbas',
	  titleAr: 'مركز عبدالله بن عباس',
	  subEn: 'Institutional Portal',
	  subAr: 'البوابة المؤسسية',
	  descEn: 'Dedicated administrative portal mapped for institutional resource planning, community outreach tracking, and digital archive management.',
	  descAr: 'بوابة إدارية مخصصة لتخطيط الموارد المؤسسية وتتبع التواصل المجتمعي وإدارة الأرشيف الرقمي.',
	  url: 'https://www.bin-abbas.operix-solutions.online',
	  icon: <Landmark size={20} />,
	  accentColor: '#10b981',
	  color: 'bg-white text-emerald-800 border border-slate-100',
	  image: '/projects/abbas.png',
	},
	{
	  id: 'naseem',
	  titleEn: 'Naseem City',
	  titleAr: 'مدينة النسيم',
	  subEn: 'Smart Community Hub',
	  subAr: 'مركز المجتمع الذكي',
	  descEn: 'Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.',
	  descAr: 'منظومة إدارة العقارات والممتلكات للتعامل مع طلبات السكان وسجلات الصيانة ودورات الفوترة.',
	  url: 'https://www.operix-solutions.online/Naseem_City',
	  icon: <Building2 size={20} />,
	  accentColor: '#dc2626',
	  color: 'bg-red-900 text-white',
	  image: '/projects/naseem.png',
	},
  ];

  // ─── NAVIGATION ───
  const openPreview = useCallback((platform) => {
	setCurrentImgIndex(0);
	setActivePreview(platform);
  }, []);

  const closePreview = useCallback(() => {
	setModalVisible(false);
	setTimeout(() => setActivePreview(null), 300);
  }, []);

  const nextImg = useCallback(() => {
	if (activePreview) setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
  }, [activePreview]);

  const prevImg = useCallback(() => {
	if (activePreview) setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
  }, [activePreview]);

  useEffect(() => {
	const onKey = (e) => {
	  if (!activePreview) return;
	  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextImg();
	  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevImg();
	  if (e.key === 'Escape') closePreview();
	};
	window.addEventListener('keydown', onKey);
	return () => window.removeEventListener('keydown', onKey);
  }, [activePreview, nextImg, prevImg, closePreview]);

  const handleTouchStart = (e) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e) => { setTouchEnd(e.targetTouches[0].clientX); };
  const handleTouchEnd = () => {
	if (!touchStart || !touchEnd) return;
	const d = touchStart - touchEnd;
	if (d > minSwipeDistance) nextImg();
	if (d < -minSwipeDistance) prevImg();
  };

  const currentItem = activePreview?.previews[currentImgIndex];
  const isVideo = currentItem?.url?.endsWith('.mp4');

  /* ─────────── RENDER ─────────── */
  return (
	<div className="projects-wrapper w-full font-sans bg-[#f0f4f8] min-h-screen pb-16" dir={isAr ? 'rtl' : 'ltr'}>

	  <style>{`
		/* ── Keyframes ── */
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(28px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeIn {
		  from { opacity: 0; } to { opacity: 1; }
		}
		@keyframes scaleIn {
		  from { opacity: 0; transform: scale(0.94) translateY(12px); }
		  to   { opacity: 1; transform: scale(1) translateY(0); }
		}
		@keyframes imgFade {
		  from { opacity: 0; transform: scale(1.015); }
		  to   { opacity: 1; transform: scale(1); }
		}
		@keyframes shimmerGold {
		  0%   { background-position: -200% center; }
		  100% { background-position: 200% center; }
		}
		@keyframes float {
		  0%, 100% { transform: translateY(0px); }
		  50%       { transform: translateY(-6px); }
		}
		@keyframes screenGlow {
		  0%, 100% { box-shadow: 0 0 20px rgba(212,175,55,0.15), inset 0 0 40px rgba(0,0,0,0.3); }
		  50%       { box-shadow: 0 0 35px rgba(212,175,55,0.25), inset 0 0 40px rgba(0,0,0,0.3); }
		}

		/* ── Gold shimmer text ── */
		.premium-gold-text {
		  background: linear-gradient(to right, #c5a059 0%, #f3de9a 35%, #d4af37 60%, #c5a059 100%);
		  background-size: 200% auto;
		  color: transparent;
		  -webkit-background-clip: text;
		  background-clip: text;
		  animation: shimmerGold 5s linear infinite;
		}

		/* ── Hero grid pattern ── */
		.hero-grid {
		  background-image:
			linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px);
		  background-size: 48px 48px;
		}

		/* ── Cards ── */
		.sys-card {
		  background: #fff;
		  border: 1px solid #e2e8f0;
		  border-radius: 24px;
		  overflow: hidden;
		  transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
					  box-shadow 0.35s cubic-bezier(0.16,1,0.3,1),
					  border-color 0.25s ease;
		  cursor: default;
		}
		.sys-card:hover {
		  transform: translateY(-6px);
		  box-shadow: 0 24px 64px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06);
		  border-color: rgba(212,175,55,0.4);
		}
		.sys-card-img {
		  transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
		}
		.sys-card:hover .sys-card-img {
		  transform: scale(1.04);
		  opacity: 1;
		}

		.client-card {
		  background: #fff;
		  border: 1px solid #e2e8f0;
		  border-radius: 20px;
		  overflow: hidden;
		  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1),
					  box-shadow 0.3s ease,
					  border-color 0.25s ease;
		}
		.client-card:hover {
		  transform: translateY(-5px);
		  box-shadow: 0 20px 48px rgba(0,0,0,0.09);
		  border-color: rgba(212,175,55,0.35);
		}
		.client-card-img {
		  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
		}
		.client-card:hover .client-card-img { transform: scale(1.05); }

		/* ── CTA Buttons ── */
		.btn-launch {
		  display: flex; align-items: center; justify-content: center; gap: 6px;
		  background: #1e2d40; color: #fff;
		  padding: 10px 18px; border-radius: 12px;
		  font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
		  border: none; cursor: pointer; text-decoration: none;
		  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
		}
		.btn-launch:hover {
		  background: #d4af37; color: #0a0f16;
		  transform: translateY(-1px);
		  box-shadow: 0 6px 20px rgba(212,175,55,0.3);
		}
		.btn-preview {
		  display: flex; align-items: center; justify-content: center; gap: 6px;
		  background: #f8fafc; color: #475569;
		  border: 1px solid #e2e8f0;
		  padding: 10px 18px; border-radius: 12px;
		  font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
		  cursor: pointer;
		  transition: all 0.2s ease;
		}
		.btn-preview:hover {
		  background: #1e2d40; color: #d4af37; border-color: transparent;
		  transform: translateY(-1px);
		}

		/* ── Thumb strip scrollbar ── */
		.thumb-strip::-webkit-scrollbar { height: 3px; }
		.thumb-strip::-webkit-scrollbar-track { background: transparent; }
		.thumb-strip::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 2px; }

		/* ═══════════════════════════════════════
		   MacBook M4 Max Shell
		═══════════════════════════════════════ */
		.macbook-shell {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  width: 100%;
		  filter: drop-shadow(0 32px 64px rgba(0,0,0,0.55)) drop-shadow(0 8px 20px rgba(0,0,0,0.35));
		  animation: float 6s ease-in-out infinite;
		}

		/* Lid */
		.macbook-lid {
		  width: 100%;
		  max-width: 760px;
		  position: relative;
		  border-radius: 12px 12px 0 0;
		  background: linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 40%, #2a2a2c 100%);
		  padding: 14px 14px 0 14px;
		  box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.14),
			inset 0 -1px 0 rgba(0,0,0,0.5),
			0 -1px 0 rgba(255,255,255,0.06);
		}

		/* Bezel inside lid */
		.macbook-bezel {
		  border-radius: 6px 6px 0 0;
		  background: #0a0a0a;
		  overflow: hidden;
		  position: relative;
		}

		/* Camera notch pill — M4 has a notch at top center */
		.macbook-camera {
		  position: absolute;
		  top: 6px;
		  left: 50%;
		  transform: translateX(-50%);
		  width: 56px;
		  height: 10px;
		  background: #0a0a0a;
		  border-radius: 0 0 10px 10px;
		  z-index: 10;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
		.macbook-camera-dot {
		  width: 5px;
		  height: 5px;
		  background: radial-gradient(circle, #2a2a2a, #111);
		  border-radius: 50%;
		  border: 1px solid rgba(255,255,255,0.06);
		}

		/* Screen */
		.macbook-screen {
		  width: 100%;
		  aspect-ratio: 16/10;
		  background: #000;
		  position: relative;
		  overflow: hidden;
		}

		/* Hinge */
		.macbook-hinge {
		  width: 100%;
		  max-width: 760px;
		  height: 4px;
		  background: linear-gradient(180deg, #111 0%, #2a2a2c 100%);
		  position: relative;
		}
		.macbook-hinge::before, .macbook-hinge::after {
		  content: '';
		  position: absolute;
		  top: 0; bottom: 0;
		  width: 28px;
		  background: #333;
		}
		.macbook-hinge::before { left: 0; border-radius: 0 0 0 2px; }
		.macbook-hinge::after  { right: 0; border-radius: 0 0 2px 0; }

		/* Base */
		.macbook-base {
		  width: 105%;
		  max-width: 800px;
		  background: linear-gradient(180deg, #2c2c2e 0%, #1a1a1c 60%, #232325 100%);
		  border-radius: 0 0 14px 14px;
		  padding: 14px 20px 10px;
		  box-shadow:
			inset 0 1px 0 rgba(255,255,255,0.08),
			0 1px 0 rgba(255,255,255,0.04);
		  position: relative;
		}
		.macbook-base::before {
		  content: '';
		  position: absolute;
		  top: 0; left: 20px; right: 20px;
		  height: 1px;
		  background: linear-gradient(to right, transparent, rgba(255,255,255,0.10), transparent);
		}

		.macbook-keyboard-area {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  gap: 10px;
		}
		.macbook-keyboard {
		  width: 90%;
		  height: 52px;
		  background:
			repeating-linear-gradient(90deg,
			  rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px,
			  rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 18px
			);
		  border-radius: 4px;
		  opacity: 0.5;
		}
		.macbook-trackpad {
		  width: 36%;
		  height: 30px;
		  background: rgba(255,255,255,0.04);
		  border: 1px solid rgba(255,255,255,0.07);
		  border-radius: 6px;
		}

		/* Foot shadow */
		.macbook-shadow {
		  width: 80%;
		  max-width: 600px;
		  height: 14px;
		  background: radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 80%);
		  margin-top: 4px;
		  border-radius: 50%;
		}

		/* ── Modal ── */
		.modal-overlay {
		  position: fixed; inset: 0; z-index: 200;
		  background: rgba(4,8,14,0.96);
		  backdrop-filter: blur(20px);
		  display: flex; align-items: center; justify-content: center;
		  padding: 1.5rem;
		  transition: opacity 0.3s ease;
		}
		.modal-panel {
		  position: relative; z-index: 10;
		  width: 100%; max-width: 1280px;
		  max-height: 96vh;
		  display: flex; flex-direction: column;
		  gap: 1rem;
		  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
		}

		/* Screen content animation */
		.screen-content {
		  animation: imgFade 0.3s ease both;
		}

		/* Description panel scroll */
		.desc-scroll::-webkit-scrollbar { width: 3px; }
		.desc-scroll::-webkit-scrollbar-track { background: transparent; }
		.desc-scroll::-webkit-scrollbar-thumb { background: #d4af3760; border-radius: 2px; }

		/* Thumbnail active ring */
		.thumb-active { box-shadow: 0 0 0 2px #d4af37, 0 0 12px rgba(212,175,55,0.3); }

		@media (prefers-reduced-motion: reduce) {
		  * { animation: none !important; transition: none !important; }
		}
	  `}</style>

	  {/* ═══════════ HERO ═══════════ */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-[#ffffff0f] hero-grid py-24 px-6">
		<div className="absolute inset-0 pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.10) 0%, transparent 70%)' }}
		/>
		<div className="text-center max-w-3xl mx-auto relative z-10 space-y-5"
		  style={{ animation: 'fadeSlideUp 0.7s cubic-bezier(0.16,1,0.3,1) both' }}>
		  <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/20">
			<Monitor size={12} /> {isAr ? "البنية التحتية السحابية" : "Cloud Infrastructure"}
		  </span>
		  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] premium-gold-text drop-shadow-lg font-serif tracking-tight">
			{isAr ? "مصفوفة الأنظمة المستضافة" : "Deployed Systems Matrix"}
		  </h1>
		  <p className="text-[#c4b48a] text-sm md:text-base font-medium leading-relaxed max-w-xl mx-auto">
			{isAr
			  ? "بوابة تفاعلية للوصول المباشر إلى المنصات الرقمية المستضافة والنشطة ضمن منظومة أوبيريكس، ومشاريع العملاء البارزة."
			  : "Interactive gateway to the live OPERIX cloud platforms, real-time operational environments, and featured client deployments."}
		  </p>
		</div>
	  </div>

	  <div className="px-6 py-16 space-y-24">

		{/* ═══════════ TIER 1: CORE PLATFORMS ═══════════ */}
		<section className="max-w-6xl mx-auto space-y-10">
		  <div className="flex items-center gap-4 pb-5 border-b border-slate-200"
			style={{ animation: 'fadeSlideUp 0.5s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}>
			<div className="flex-1">
			  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
				{isAr ? "المنظومة الأساسية" : "Core Ecosystem"}
			  </h2>
			  <p className="text-xl font-black text-[#1e2d40]">
				{isAr ? "أنظمة أوبيريكس الأساسية" : "OPERIX Core Platforms"}
			  </p>
			</div>
			<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/20 px-3 py-1.5 rounded-full">
			  {corePlatforms.length} {isAr ? "أنظمة" : "Systems"}
			</span>
		  </div>

		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
			{corePlatforms.map((sys, idx) => (
			  <div
				key={sys.id}
				className="sys-card flex flex-col"
				style={{ animation: `fadeSlideUp 0.65s ${0.25 + idx * 0.08}s cubic-bezier(0.16,1,0.3,1) both` }}
				onMouseEnter={() => setHoveredCard(sys.id)}
				onMouseLeave={() => setHoveredCard(null)}
			  >
				{/* Image */}
				<div className="relative h-52 overflow-hidden bg-slate-100 border-b border-slate-100 cursor-pointer"
				  onClick={() => window.open(sys.url, '_blank')}>
				  <img
					src={sys.image}
					alt={sys.titleEn}
					className="sys-card-img w-full h-full object-cover object-left-top opacity-90"
				  />
				  {/* Accent overlay on hover */}
				  <div className="absolute inset-0 pointer-events-none transition-opacity duration-300"
					style={{
					  background: `linear-gradient(135deg, ${sys.accentColor}18, transparent)`,
					  opacity: hoveredCard === sys.id ? 1 : 0,
					}}
				  />
				  {sys.interactiveBadge}
				  {/* Screen count */}
				  {sys.previews?.length > 0 && (
					<div className="absolute bottom-3 right-3 bg-[#0a0f16]/80 backdrop-blur border border-slate-600 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5">
					  <Monitor size={10} /> {sys.previews.length} {isAr ? "شاشة" : "Screens"}
					</div>
				  )}
				</div>

				{/* Body */}
				<div className="p-7 flex flex-col flex-grow">
				  <div className="flex items-center gap-3 mb-4">
					<div className={`w-11 h-11 ${sys.color} rounded-2xl flex items-center justify-center shadow-md shrink-0`}
					  style={{ boxShadow: `0 4px 16px ${sys.accentColor}30` }}>
					  {sys.icon}
					</div>
					<div>
					  <h3 className="font-black text-lg text-[#1e2d40] leading-none">
						{isAr ? sys.titleAr : sys.titleEn}
					  </h3>
					  <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: sys.accentColor }}>
						{isAr ? sys.subAr : sys.subEn}
					  </p>
					</div>
				  </div>

				  <p className="text-slate-500 text-[13px] leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
					{isAr ? sys.descAr : sys.descEn}
				  </p>

				  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
					<a href={sys.url} target="_blank" rel="noopener noreferrer" className="btn-launch flex-1">
					  {isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={11} />
					</a>
					{sys.previews?.length > 0 && (
					  <button onClick={() => openPreview(sys)} className="btn-preview flex-1">
						{isAr ? "استعراض النظام" : "Preview UI"} <Monitor size={11} />
					  </button>
					)}
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</section>

		{/* ═══════════ TIER 2: CLIENT PROJECTS ═══════════ */}
		<section className="max-w-6xl mx-auto space-y-10">
		  <div className="flex items-center gap-4 pb-5 border-b border-slate-200">
			<div className="flex-1">
			  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
				{isAr ? "المشاريع المميزة" : "Featured Deployments"}
			  </h2>
			  <p className="text-xl font-black text-[#1e2d40]">
				{isAr ? "مشاريع وتطبيقات العملاء" : "Client Projects"}
			  </p>
			</div>
			<span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
			  {clientProjects.length} {isAr ? "مشاريع" : "Projects"}
			</span>
		  </div>

		  <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
			{clientProjects.map((proj, idx) => (
			  <div
				key={proj.id}
				className="client-card flex flex-col"
				style={{ animation: `fadeSlideUp 0.6s ${0.1 + idx * 0.1}s cubic-bezier(0.16,1,0.3,1) both` }}
			  >
				<div className="h-44 relative overflow-hidden bg-slate-100 border-b border-slate-100 cursor-pointer"
				  onClick={() => window.open(proj.url, '_blank')}>
				  <img src={proj.image} alt={proj.titleEn}
					className="client-card-img w-full h-full object-cover object-top opacity-90"
				  />
				  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
				</div>

				<div className="p-6 flex flex-col flex-grow">
				  <div className={`w-11 h-11 ${proj.color} rounded-2xl flex items-center justify-center shadow-md -mt-11 mb-4 relative border-4 border-white`}
					style={{ boxShadow: `0 4px 16px ${proj.accentColor}30` }}>
					{proj.icon}
				  </div>
				  <h3 className="font-black text-lg text-[#1e2d40] leading-tight">{isAr ? proj.titleAr : proj.titleEn}</h3>
				  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 mb-3">
					{isAr ? proj.subAr : proj.subEn}
				  </p>
				  <p className="text-slate-500 text-[13px] leading-relaxed font-medium flex-grow">
					{isAr ? proj.descAr : proj.descEn}
				  </p>
				  <div className="mt-5 pt-4 border-t border-slate-100">
					<a href={proj.url} target="_blank" rel="noopener noreferrer"
					  className="flex items-center justify-between text-[#1e2d40] font-black text-[11px] tracking-wider uppercase hover:text-[#d4af37] transition-colors group">
					  {isAr ? "زيارة الموقع المباشر" : "Visit Live Portal"}
					  <ExternalLink size={14} className="text-slate-300 group-hover:text-[#d4af37] transition-colors" />
					</a>
				  </div>
				</div>
			  </div>
			))}
		  </div>
		</section>
	  </div>

	  {/* ═══════════ MACBOOK MODAL ═══════════ */}
	  {activePreview && (
		<div
		  className="modal-overlay"
		  style={{ opacity: modalVisible ? 1 : 0 }}
		  onClick={closePreview}
		>
		  <div
			className="modal-panel"
			style={{
			  opacity: modalVisible ? 1 : 0,
			  transform: modalVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(16px)',
			}}
			onClick={(e) => e.stopPropagation()}
		  >
			{/* ── Top Bar ── */}
			<div className="flex items-center justify-between px-1">
			  <div className="flex items-center gap-3">
				{/* System icon — shown large, this IS the play/preview icon in the screen */}
				<div className={`w-10 h-10 ${activePreview.color} rounded-xl flex items-center justify-center shadow-lg shrink-0`}
				  style={{ boxShadow: `0 4px 20px ${activePreview.accentColor}40` }}>
				  {activePreview.icon}
				</div>
				<div>
				  <span className="font-black text-white text-sm leading-none block">
					{isAr ? activePreview.titleAr : activePreview.titleEn}
				  </span>
				  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: activePreview.accentColor }}>
					{isAr ? "استعراض واجهة النظام" : "System UI Preview"}
				  </span>
				</div>
			  </div>
			  <div className="flex items-center gap-2">
				<span className="text-[10px] font-mono font-black text-slate-500 bg-[#0f1621] border border-slate-700 px-3 py-1.5 rounded-lg">
				  {currentImgIndex + 1} <span className="text-slate-700">/</span> {activePreview.previews.length}
				</span>
				<button onClick={closePreview}
				  className="w-9 h-9 bg-[#0f1621] border border-slate-700 text-slate-400 rounded-lg flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all">
				  <X size={14} strokeWidth={2.5} />
				</button>
			  </div>
			</div>

			{/* ── MacBook + Side Panel ── */}
			<div className="flex flex-col xl:flex-row gap-4 flex-1 min-h-0 items-start">

			  {/* MacBook */}
			  <div
				className="flex-1 flex items-center justify-center min-w-0"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			  >
				<MacBookM4>
				  {/* Screen content */}
				  <div className="w-full h-full bg-[#080c12] relative">
					{isVideo ? (
					  <video
						ref={videoRef}
						key={`vid-${currentImgIndex}`}
						src={currentItem.url}
						autoPlay muted loop playsInline controls
						className="screen-content w-full h-full object-contain"
					  />
					) : (
					  <img
						key={`img-${currentImgIndex}`}
						src={currentItem?.url}
						alt="System Preview"
						className="screen-content w-full h-full object-contain object-center"
					  />
					)}

					{/* System icon watermark in screen — replaces the play icon */}
					{!isVideo && (
					  <div className="absolute bottom-3 right-3 opacity-60 pointer-events-none">
						<div className={`w-9 h-9 ${activePreview.color} rounded-xl flex items-center justify-center shadow-xl ring-2 ring-white/10`}
						  style={{ boxShadow: `0 2px 12px ${activePreview.accentColor}60` }}>
						  {activePreview.icon}
						</div>
					  </div>
					)}

					{/* Nav arrows on screen */}
					<button onClick={prevImg}
					  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-[#d4af37] text-white rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-[#d4af37] z-10 backdrop-blur-sm">
					  <ChevronLeft size={18} />
					</button>
					<button onClick={nextImg}
					  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-[#d4af37] text-white rounded-full flex items-center justify-center transition-all border border-white/10 hover:border-[#d4af37] z-10 backdrop-blur-sm">
					  <ChevronRight size={18} />
					</button>
				  </div>
				</MacBookM4>
			  </div>

			  {/* Side Panel */}
			  <div className="xl:w-[300px] flex flex-col bg-[#0a0f16] border border-slate-800 rounded-2xl overflow-hidden shrink-0 xl:self-stretch">

				{/* Module title */}
				<div className="p-5 border-b border-slate-800 shrink-0">
				  <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-slate-600 mb-2">
					<Info size={10} style={{ color: activePreview.accentColor }} />
					{isAr ? "الوحدة الحالية" : "Current Module"}
				  </span>
				  <h4
					key={currentImgIndex}
					className="font-serif font-black text-lg leading-snug"
					style={{
					  color: activePreview.accentColor,
					  animation: 'fadeSlideUp 0.25s ease both',
					  direction: isAr ? 'rtl' : 'ltr',
					}}
				  >
					{isAr ? currentItem?.titleAr : currentItem?.titleEn}
				  </h4>
				</div>

				{/* Description */}
				<div className="flex-1 overflow-y-auto p-5 desc-scroll">
				  <p
					key={`desc-${currentImgIndex}`}
					className="text-[13px] text-slate-400 font-medium leading-relaxed"
					style={{ animation: 'fadeIn 0.3s 0.1s ease both', direction: isAr ? 'rtl' : 'ltr' }}
				  >
					{isAr ? currentItem?.descAr : currentItem?.descEn}
				  </p>
				</div>

				{/* Thumbnail strip */}
				<div className="p-3 border-t border-slate-800 shrink-0">
				  <div className="thumb-strip flex gap-2 overflow-x-auto pb-1">
					{activePreview.previews.map((p, i) => (
					  <button
						key={i}
						onClick={() => setCurrentImgIndex(i)}
						className={`shrink-0 w-14 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200 ${i === currentImgIndex ? 'border-[#d4af37] scale-105 thumb-active' : 'border-slate-700 opacity-40 hover:opacity-70 hover:border-slate-500'}`}
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

				{/* Footer actions */}
				<div className="p-4 border-t border-slate-800 shrink-0 flex items-center gap-2">
				  <a
					href={activePreview.url}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex justify-center items-center gap-2 py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all"
					style={{ background: activePreview.accentColor, color: '#fff' }}
				  >
					{isAr ? "دخول المنصة" : "Launch"} <ExternalLink size={11} />
				  </a>
				  <button onClick={prevImg}
					className="w-9 h-9 rounded-xl bg-[#0f1621] border border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
					<ChevronLeft size={15} />
				  </button>
				  <button onClick={nextImg}
					className="w-9 h-9 rounded-xl bg-[#0f1621] border border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
					<ChevronRight size={15} />
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