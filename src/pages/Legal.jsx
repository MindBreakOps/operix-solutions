import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldCheck, KeyRound, Receipt, BookText,
  Lock, Scale, X, ChevronRight,
  LayoutDashboard, Users, Network, ShoppingCart,
  Landmark, PieChart, Laptop, FileText, ExternalLink,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const FMIS_MODULES = [
  { icon: LayoutDashboard, color: '#1e2d40', title: 'Executive Dashboard',  desc: 'Aggregates Revenue, Expenses, and Payroll into live KPI widgets. Syncs with HRIS for headcount and payroll liability in real time.' },
  { icon: Receipt,         color: '#009A66', title: 'Invoices (AR)',         desc: 'Logs service revenue per project. Auto-calculates 15% KSA VAT. Exports ZATCA UBL 2.1 XML for Phase 2 E-Invoicing compliance.' },
  { icon: Receipt,         color: '#ef4444', title: 'Expenses (AP)',         desc: 'Tracks operational outflows mapped to cost centers and WBS codes. Exports to Excel for auditing.' },
  { icon: Users,           color: '#d97706', title: 'Payroll Engine',        desc: 'Bridges HRIS and Finance — converts approved salaries and expense claims into financial liabilities and generates A4 payslips.' },
  { icon: BookText,        color: '#7c3aed', title: 'General Ledger',        desc: 'Double-entry accounting with Chart of Accounts, Journal Entries, and a real-time auto-generated Trial Balance.' },
  { icon: Network,         color: '#3b82f6', title: 'Project WBS',           desc: 'Budget At Completion (BAC) enforcement per task. AI variance analysis calculates EAC and flags at-risk project spend.' },
  { icon: ShoppingCart,    color: '#0d9488', title: 'Procurement',           desc: 'Vendor registry, Purchase Orders tied to WBS codes, and Goods Receipt Notes for formal delivery acknowledgment.' },
  { icon: Landmark,        color: '#6366f1', title: 'Banking & Tax',         desc: 'Auto-calculates Output minus Input VAT for net payable. Smart CSV bank reconciliation with ±5 SAR matching algorithm.' },
  { icon: PieChart,        color: '#f97316', title: 'Financial Reports',     desc: 'On-demand P&L, Statement of Cash Flows, and Balance Sheet with A4 print engine.' },
  { icon: Laptop,          color: '#3b82f6', title: 'Assets Register',       desc: 'Lifecycle tracking for IT equipment, vehicles, and machinery. Feeds directly into the Balance Sheet.' },
  { icon: FileText,        color: '#64748b', title: 'Document Builder',      desc: 'Generates Tax Invoices and PO documents. Integrates with GAS endpoints to email PDFs directly to clients and vendors.' },
];

const COMPLIANCE_BADGES = [
  { code: 'WPS',    labelEn: 'Wage Protection',          labelAr: 'حماية الأجور',         color: '#009A66' },
  { code: 'ZATCA',  labelEn: 'Phase 2 E-Invoicing',      labelAr: 'هيئة الزكاة والضريبة', color: '#d4af37' },
  { code: 'NCA',    labelEn: 'Cybersecurity Authority',  labelAr: 'الأمن السيبراني',       color: '#1e2d40' },
  { code: 'PDPL',   labelEn: 'Personal Data Protection', labelAr: 'حماية البيانات',        color: '#6366f1' },
  { code: 'Muqeem', labelEn: 'Expatriate Registry',      labelAr: 'منصة مُقيم',            color: '#0891b2' },
  { code: 'Qiwa',   labelEn: 'Labor Contracts',          labelAr: 'منصة قوى',              color: '#7c3aed' },
];

/* ─────────────────────────────────────────────────────────────
   SECTION DEFINITIONS
───────────────────────────────────────────────────────────── */
function useSections(isAr) {
  return [
	{
	  id: 'compliance',
	  icon: ShieldCheck,
	  accentColor: '#009A66',
	  labelEn: 'Government Compliance',
	  labelAr: 'الامتثال الحكومي',
	  subtitleEn: 'WPS · ZATCA · Muqeem · Qiwa',
	  subtitleAr: 'نظام حماية الأجور — الزكاة — مُقيم — قوى',
	  renderContent: () => (
		<div className="space-y-7">
		  <Sub color="#009A66" title={isAr ? 'نظام حماية الأجور (WPS)' : 'Wage Protection System (WPS)'}>
			{isAr
			  ? 'تعمل منصة أوبيريكس في توافق هيكلي كامل مع متطلبات وزارة الموارد البشرية والتنمية الاجتماعية. يطبّق نظام HRIS ضوابط تدقيق صارمة وفق متطلبات WPS، بما يشمل التحقق من الدورات المالية وصرف الرواتب في المواعيد المحددة وتعليم السجلات غير الممتثلة تلقائياً.'
			  : 'OPERIX platforms operate in full structural alignment with the Ministry of Human Resources and Social Development parameters. The HRIS enforces strict audit controls mandated by the Wage Protection System (WPS), including payroll cycle verification, on-time disbursement enforcement, and automated flagging of non-compliant payment records.'}
		  </Sub>
		  <Sub color="#d4af37" title={isAr ? 'هيئة الزكاة والضريبة والجمارك (ZATCA) — المرحلة الثانية' : 'ZATCA Phase 2 — E-Fatoora'}>
			{isAr
			  ? 'محرك FMIS مهيأ هندسياً للامتثال الكامل مع متطلبات المرحلة الثانية لـ ZATCA، مما يتيح إصدار الفواتير الإلكترونية بصيغة UBL 2.1 XML، والتكامل الفوري مع بوابة فاتورة، وإدارة سجلات ضريبة القيمة المضافة بنسبة 15%.'
			  : 'The FMIS financial engine is architecturally designed for full ZATCA Phase 2 compliance. This includes automated generation of UBL 2.1 XML e-invoices, real-time integration with the Fatoora portal, and complete 15% VAT ledger management across all revenue and procurement workflows.'}
		  </Sub>
		  <Sub color="#0891b2" title={isAr ? 'منصتا مُقيم وقوى' : 'Muqeem & Qiwa Platform Integration'}>
			{isAr
			  ? 'يتكامل نظام HRIS مع منصتي مُقيم وقوى من خلال بنية BYOK. تتحكم المنشأة بالكامل في بيانات اعتماد API الخاصة بها — أوبيريكس لا تحتفظ بأي مفاتيح على خوادمها. يتيح ذلك مزامنة قاعدة بيانات العمالة الوافدة، وإدارة الإقامات، وسجلات عقود العمل مباشرة من داخل لوحة تحكم HRIS.'
			  : 'The HRIS integrates with Muqeem (expatriate workforce database) and Qiwa (labor contract management) through a BYOK architecture. The enterprise retains full control of its own API credentials — OPERIX servers store zero keys. This enables direct synchronization of residency permits, iqama records, labor contract data, and workforce headcount from within the HRIS dashboard.'}
		  </Sub>
		  <div className="flex flex-wrap gap-2 pt-1">
			{COMPLIANCE_BADGES.map((b) => (
			  <span key={b.code}
				className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold"
				style={{ borderColor: b.color + '50', backgroundColor: b.color + '12', color: b.color }}
			  >
				<span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
				<span className="font-black">{b.code}</span>
				<span className="opacity-40 mx-0.5">·</span>
				<span className="font-semibold text-slate-600">{isAr ? b.labelAr : b.labelEn}</span>
			  </span>
			))}
		  </div>
		</div>
	  ),
	},
	{
	  id: 'byok-hris',
	  icon: KeyRound,
	  accentColor: '#7c3aed',
	  labelEn: 'HRIS BYOK Integration',
	  labelAr: 'تكامل BYOK — الموارد البشرية',
	  subtitleEn: 'Muqeem · Qiwa · Zero key storage',
	  subtitleAr: 'مُقيم — قوى — لا تخزين للمفاتيح',
	  renderContent: () => (
		<div className="space-y-6">
		  <p className="text-sm text-slate-600 font-medium leading-relaxed">
			{isAr
			  ? 'نموذج BYOK يمنح المنشأة الاستقلالية التامة في إدارة بيانات الاعتماد الحكومية. أوبيريكس لا تتوسط في أي اتصال مباشر — المفاتيح تُدخل مرة واحدة وتُحفظ في متجر سري مشفر داخل بيئة المنشأة الخاصة.'
			  : 'The BYOK model grants the enterprise complete autonomy over government credential management. OPERIX does not intermediate any direct API communication — keys are entered once and stored in an encrypted secrets vault within the enterprise\'s own isolated environment.'}
		  </p>
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{[
			  {
				platform: 'Muqeem', nameAr: 'مُقيم', color: '#0891b2',
				caps: isAr
				  ? ['مزامنة بيانات الإقامة والإقامات','تتبع انتهاء صلاحية الإقامة تلقائياً','سجلات الجنسية والمهنة للعمالة','تنبيهات الامتثال للعقود']
				  : ['Iqama & residency record sync','Automated permit expiry tracking','Workforce nationality & occupation registry','Contract compliance alerts'],
			  },
			  {
				platform: 'Qiwa', nameAr: 'قوى', color: '#7c3aed',
				caps: isAr
				  ? ['إدارة عقود العمل','تسجيل إجراءات الإنهاء','بيانات مؤشرات السعودة (نطاقات)','مزامنة حالة التأشيرة']
				  : ['Labor contract management','Termination procedure recording','Saudization (Nitaqat) indicator data','Visa status synchronization'],
			  },
			].map((p) => (
			  <div key={p.platform} className="rounded-2xl border p-4 bg-slate-50" style={{ borderColor: p.color + '30' }}>
				<div className="flex items-center gap-2 mb-3">
				  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: p.color }}>
					<KeyRound size={13} className="text-white" />
				  </div>
				  <span className="text-[13px] font-extrabold text-[#0d1b2a]">{isAr ? p.nameAr : p.platform}</span>
				  <span className="ml-auto text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
					style={{ color: p.color, backgroundColor: p.color + '15' }}>BYOK</span>
				</div>
				<ul className="space-y-1.5">
				  {p.caps.map((c, i) => (
					<li key={i} className="flex items-start gap-2 text-[12px] text-slate-600 font-medium">
					  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: p.color }} />
					  {c}
					</li>
				  ))}
				</ul>
			  </div>
			))}
		  </div>
		  {/* Flow diagram */}
		  <div className="bg-[#0d1b2a] rounded-2xl p-5">
			<p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#d4af37] mb-4">
			  {isAr ? 'تدفق بيانات BYOK' : 'BYOK Data Flow'}
			</p>
			<div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
			  {[
				{ label: isAr ? 'المنشأة\nتُدخل المفتاح' : 'Enterprise\nEnters Key', icon: '🏢' },
				{ label: isAr ? 'يُشفَّر في\nخزينة المنشأة' : 'Encrypted in\nEnterprise Vault', icon: '🔐' },
				{ label: isAr ? 'HRIS\nيستدعي API' : 'HRIS\nCalls API', icon: '⚙️' },
				{ label: isAr ? 'مُقيم / قوى\nيردّان البيانات' : 'Muqeem / Qiwa\nReturn Data', icon: '🏛️' },
			  ].map((node, i, arr) => (
				<React.Fragment key={i}>
				  <div className="flex flex-col items-center gap-1.5">
					<div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-base">
					  {node.icon}
					</div>
					<p className="text-[10px] text-slate-400 font-semibold leading-tight whitespace-pre-line">{node.label}</p>
				  </div>
				  {i < arr.length - 1 && (
					<div className="hidden sm:flex items-center">
					  <div className="w-6 h-px bg-[#d4af37]/25" />
					  <ChevronRight size={10} className="text-[#d4af37]/40 -ml-1" />
					</div>
				  )}
				</React.Fragment>
			  ))}
			</div>
			<p className="text-[10px] text-slate-500 font-medium mt-4 border-t border-white/5 pt-3">
			  {isAr
				? '* أوبيريكس لا تخزن أي مفاتيح API. جميع الاستدعاءات تُنفَّذ بمفاتيح المنشأة حصرياً.'
				: '* OPERIX stores zero API keys. All calls execute exclusively with enterprise-owned credentials.'}
			</p>
		  </div>
		</div>
	  ),
	},
	{
	  id: 'byok-fmis',
	  icon: Receipt,
	  accentColor: '#d4af37',
	  labelEn: 'FMIS BYOK & ZATCA II',
	  labelAr: 'BYOK المالي وزاتكا II',
	  subtitleEn: 'E-Fatoora · UBL 2.1 XML · VAT automation',
	  subtitleAr: 'فاتورة — UBL 2.1 — أتمتة ضريبة القيمة المضافة',
	  renderContent: () => (
		<div className="space-y-6">
		  <Sub color="#d4af37" title={isAr ? 'نموذج BYOK للفوترة الإلكترونية' : 'E-Invoicing BYOK Model'}>
			{isAr
			  ? 'نظام FMIS مجهّز لاعتماد بوابة فاتورة عبر بنية BYOK. تحتفظ المنشأة بمفاتيح CSR وشهادات المصادقة المستخرجة من ZATCA ضمن خزينتها الخاصة. يُبادر FMIS بطلبات التقديم عبر مفاتيح المنشأة دون أي تدخل من طرف ثالث.'
			  : 'The FMIS is configured to authenticate with the Fatoora portal through a BYOK model. The enterprise retains its own CSR keys and ZATCA-issued authentication certificates in its own secure vault. FMIS initiates all Phase 2 submission requests using the enterprise\'s credentials — no third-party intermediation.'}
		  </Sub>
		  <div>
			<p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3">
			  {isAr ? 'تغطية تكامل ZATCA' : 'ZATCA Integration Coverage'}
			</p>
			<ul className="space-y-3">
			  {(isAr ? [
				'توليد فواتير UBL 2.1 XML تلقائياً لكل فاتورة مدفوعة',
				'إرسال مجموعات الفواتير إلى بوابة Fatoora في الوقت الفعلي',
				'استرداد رموز QR الامتثالية وطباعتها على الفواتير الورقية',
				'تتبع سجلات ضريبة القيمة المضافة: المخرجات مقابل المدخلات',
				'إعداد الإقرار الضريبي الفصلي تلقائياً مع صافي المبالغ المستحقة',
				'الأرشفة التدقيقية للفواتير لفترة 7 سنوات وفق متطلبات ZATCA',
			  ] : [
				'Automatic UBL 2.1 XML invoice generation for every paid invoice',
				'Batch invoice submission to Fatoora portal in real time',
				'Compliance QR code retrieval and printing on physical invoices',
				'VAT ledger tracking: Output Tax (Sales) vs. Input Tax (Purchases)',
				'Auto-prepared quarterly VAT return with net payable amounts',
				'7-year invoice audit archival as required by ZATCA mandates',
			  ]).map((item, i) => (
				<li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
				  <span className="w-5 h-5 rounded-full bg-[#d4af37]/15 text-[#d4af37] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
				  {item}
				</li>
			  ))}
			</ul>
		  </div>
		</div>
	  ),
	},
	{
	  id: 'fmis',
	  icon: BookText,
	  accentColor: '#3b82f6',
	  labelEn: 'FMIS Module Architecture',
	  labelAr: 'هيكلية نظام FMIS',
	  subtitleEn: '11 integrated financial modules',
	  subtitleAr: '11 وحدة مالية متكاملة',
	  renderContent: () => (
		<div className="space-y-4">
		  <p className="text-sm text-slate-600 font-medium leading-relaxed">
			{isAr
			  ? 'نظام FMIS يمثّل المنظومة المالية الأساسية لأوبيريكس، ويتألف من 11 وحدة متكاملة تشمل كامل دورة الإيرادات والمصروفات والرواتب والمشتريات والتقارير المالية.'
			  : 'The FMIS is OPERIX\'s core financial layer, comprising 11 integrated modules covering the complete revenue, expense, payroll, procurement, and financial reporting lifecycle.'}
		  </p>
		  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
			{FMIS_MODULES.map((m, i) => {
			  const Icon = m.icon;
			  return (
				<div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 hover:border-slate-300 transition-colors">
				  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: m.color + '18' }}>
					<Icon size={14} style={{ color: m.color }} />
				  </div>
				  <div>
					<p className="text-[12px] font-extrabold text-[#0d1b2a] leading-tight mb-1">{m.title}</p>
					<p className="text-[11px] text-slate-500 font-medium leading-relaxed">{m.desc}</p>
				  </div>
				</div>
			  );
			})}
		  </div>
		</div>
	  ),
	},
	{
	  id: 'privacy',
	  icon: Lock,
	  accentColor: '#1e2d40',
	  labelEn: 'Data Privacy & Sovereignty',
	  labelAr: 'الخصوصية وسيادة البيانات',
	  subtitleEn: 'Biometrics · ANPR · National data residency',
	  subtitleAr: 'بيومترية — ANPR — استضافة داخل المملكة',
	  renderContent: () => (
		<div className="space-y-6">
		  <Sub color="#ef4444" title={isAr ? 'البيانات البيومترية وتقنية ANPR' : 'Biometric Data & ANPR Processing'}>
			{isAr
			  ? 'نظراً لاعتماد أنظمة أوبيريكس على تحديد الهوية الجغرافية (GPS Geofencing) وتسجيل بصمة الوجه (Face-ID) وقراءة لوحات المركبات (ANPR)، تُطبَّق أعلى معايير التشفير الهاشي على جميع المتجهات البيومترية. لا تُخزَّن أي صورة بيومترية خام — تُحوَّل فوراً إلى بصمة تشفير غير قابلة للعكس.'
			  : 'As OPERIX modules deploy GPS geofencing for attendance, employee Face-ID biometric scanning, and ANPR camera logs, all visual and vector hash values are subjected to high-grade localized hashing algorithms. No raw biometric image is stored — all inputs are immediately converted to irreversible cryptographic fingerprints.'}
		  </Sub>
		  <Sub color="#0891b2" title={isAr ? 'سيادة البيانات المحلية' : 'National Data Sovereignty'}>
			{isAr
			  ? 'جميع بيانات الموارد البشرية وسجلات الرواتب والسجلات الصحية لأوبيريكس كير تُستضاف حصرياً على خوادم سحابية مصنّفة داخل حدود المملكة العربية السعودية، متوافقةً مع ضوابط الأمن السيبراني الوطنية (NCA) وسياسات حوكمة البيانات المحلية.'
			  : 'All HRIS records, payroll data, and OPERIX Care healthcare records are hosted exclusively on classified cloud servers within the territorial boundaries of the Kingdom of Saudi Arabia, complying with NCA mandates and local data governance policies.'}
		  </Sub>
		  <Sub color="#7c3aed" title={isAr ? 'التشفير وإدارة المفاتيح' : 'Encryption & Key Management'}>
			{isAr
			  ? 'تعتمد المنصة على تشفير AES-256 لجميع البيانات الثابتة، وبروتوكول TLS 1.3 لجميع البيانات أثناء النقل. يُنفَّذ نموذج BYOK على مستوى الخزينة لضمان عدم وصول فريق أوبيريكس الهندسي إلى مفاتيح المنشأة في أي وقت.'
			  : 'The platform employs AES-256 encryption for all data at rest and TLS 1.3 for all data in transit. BYOK is enforced at vault level to ensure the OPERIX engineering team has zero access to enterprise credentials at any point.'}
		  </Sub>
		</div>
	  ),
	},
	{
	  id: 'terms',
	  icon: Scale,
	  accentColor: '#64748b',
	  labelEn: 'Terms of Service',
	  labelAr: 'شروط الخدمة',
	  subtitleEn: 'License · SLA 99.9% · IP ownership',
	  subtitleAr: 'الترخيص — ضمان الخدمة — الملكية الفكرية',
	  renderContent: () => (
		<div className="space-y-6">
		  <Sub color="#1e2d40" title={isAr ? 'نطاق الترخيص' : 'License Scope'}>
			{isAr
			  ? 'تمنح هذه الاتفاقية المنشأة المتعاقدة رخصة استخدام سحابية مقيّدة غير قابلة للتحويل للوصول إلى بيئات المنتج المحددة بطلب الخدمة (HRIS, Operations, FMIS, Care). يُحظر بشكل بات إجراء هندسة عكسية للكود المصدري أو استخراج مخططات قاعدة البيانات.'
			  : 'This subscription establishes a restricted, non-transferable cloud license authorizing corporate client entities to access designated product environments as specified in the Service Order (HRIS, Operations, FMIS, Care). Source-code extraction, database schema cloning, or reverse-engineering of any system component will trigger immediate workspace revocation and legal escalation.'}
		  </Sub>
		  <Sub color="#009A66" title={isAr ? 'اتفاقية مستوى الخدمة (SLA)' : 'Service Level Agreement (SLA)'}>
			{isAr
			  ? 'تضمن أوبيريكس استقراراً تشغيلياً بنسبة 99.9% للبنية التحتية. تُجدول نوافذ الصيانة الوقائية خارج ساعات العمل الرسمية، مع إشعار مسبق لا يقل عن 48 ساعة. تُعلَن حالات الطوارئ فور رصدها مع وصف تقني مفصّل وتقدير لوقت الاسترداد.'
			  : 'OPERIX Solutions maintains a 99.9% infrastructure uptime SLA guarantee. Preventive maintenance windows are restricted to off-peak periods with 48-hour advance notice to system administrators. Emergency incidents are declared immediately with technical root-cause disclosure and estimated recovery time.'}
		  </Sub>
		  <Sub color="#6366f1" title={isAr ? 'الملكية الفكرية' : 'Intellectual Property'}>
			{isAr
			  ? 'تحتفظ أوبيريكس سوليوشنز بالملكية الكاملة لجميع رموز المصدر والتصاميم والمنهجيات التشغيلية. تبقى البيانات التشغيلية للمنشأة ملكاً حصرياً لها في جميع الأوقات ويمكن تصديرها بالكامل عند إنهاء العقد.'
			  : 'OPERIX Solutions retains full intellectual property ownership of all source code, design systems, and operational methodologies. The enterprise\'s operational data remains its exclusive property at all times and is fully exportable upon contract termination.'}
		  </Sub>
		  {/* Contact block */}
		  <div className="bg-[#0d1b2a] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
			<div>
			  <p className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">
				{isAr ? 'للاستفسارات القانونية' : 'Legal & Compliance Inquiries'}
			  </p>
			  <p className="text-white font-bold text-sm">OPERIX Solutions · Riyadh, KSA</p>
			</div>
			<a
			  href="mailto:info@operix-solutions.com"
			  className="shrink-0 bg-[#d4af37] text-[#0d1b2a] px-5 py-2.5 rounded-xl font-black text-[12px] uppercase tracking-widest hover:bg-[#f0c040] transition-colors flex items-center gap-2"
			>
			  {isAr ? 'تواصل معنا' : 'Contact Legal'}
			  <ExternalLink size={11} />
			</a>
		  </div>
		</div>
	  ),
	},
  ];
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function Legal() {
  const { isAr } = useLanguage();
  const location = useLocation();
  const [openId, setOpenId] = useState(null);
  const sections = useSections(isAr);

  /* open from URL param */
  useEffect(() => {
	const params = new URLSearchParams(location.search);
	const tab = params.get('tab');
	if (tab) setOpenId(tab);
  }, [location]);

  /* close on Escape */
  const handleKey = useCallback((e) => {
	if (e.key === 'Escape') setOpenId(null);
  }, []);
  useEffect(() => {
	window.addEventListener('keydown', handleKey);
	return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* lock body scroll when modal open */
  useEffect(() => {
	document.body.style.overflow = openId ? 'hidden' : '';
	return () => { document.body.style.overflow = ''; };
  }, [openId]);

  const activeSection = sections.find((s) => s.id === openId);

  return (
	<div className={`w-full min-h-screen bg-[#f0f2f5] font-sans ${isAr ? 'dir-rtl' : ''}`}>

	  {/* ─── Hero Banner ────────────────────────────────────── */}
	  <div className="relative bg-[#0d1b2a] overflow-hidden">
		{/* grid */}
		<div className="absolute inset-0 opacity-10 pointer-events-none"
		  style={{
			backgroundImage: 'linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)',
			backgroundSize: '48px 48px',
		  }}
		/>
		{/* glow */}
		<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full opacity-20 pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)' }}
		/>
		{/* seal */}
		<div className="absolute right-12 top-1/2 -translate-y-1/2 w-52 h-52 rounded-full border-2 border-[#d4af37]/15 items-center justify-center hidden lg:flex pointer-events-none">
		  <div className="w-40 h-40 rounded-full border border-[#d4af37]/10 flex items-center justify-center">
			<div className="w-28 h-28 rounded-full border border-dashed border-[#d4af37]/20 flex items-center justify-center">
			  <ShieldCheck size={36} className="text-[#d4af37]/20" />
			</div>
		  </div>
		</div>

		<div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20">
		  <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-5">
			<ShieldCheck size={11} />
			{isAr ? 'منظومة الحوكمة والامتثال التنظيمي' : 'OPERIX Solutions · Governance & Regulatory Framework'}
		  </div>
		  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.05] mb-3 font-serif">
			{isAr ? 'الوثائق القانونية' : 'Legal, Compliance'}<br />
			<span className="bg-gradient-to-r from-[#d4af37] to-[#f0c040] bg-clip-text text-transparent">
			  {isAr ? 'والسياسات التشغيلية' : '& Policy Documentation'}
			</span>
		  </h1>
		  <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed font-medium mt-3">
			{isAr
			  ? 'اختر موضوعاً أدناه للاطلاع على التفاصيل الكاملة.'
			  : 'Select a topic below to view its full documentation.'}
		  </p>
		  <div className="mt-6 flex items-center gap-3 text-slate-500 text-[11px] font-semibold tracking-wide">
			<span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
			{isAr ? 'ساري المفعول: يناير 2025' : 'Effective: January 2025'}
			<span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
			{isAr ? 'الإصدار 2.4 — المملكة العربية السعودية' : 'Version 2.4 · Kingdom of Saudi Arabia'}
		  </div>
		</div>
	  </div>

	  {/* ─── Topic Card Grid ─────────────────────────────────── */}
	  <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		  {sections.map((s) => {
			const Icon = s.icon;
			return (
			  <button
				key={s.id}
				onClick={() => setOpenId(s.id)}
				className="group text-left bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all relative overflow-hidden"
			  >
				{/* accent corner glow */}
				<div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
				  style={{ background: s.accentColor + '20', transform: 'translate(30%, -30%)' }}
				/>
				<div className="relative z-10">
				  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
					style={{ backgroundColor: s.accentColor + '15' }}>
					<Icon size={18} style={{ color: s.accentColor }} />
				  </div>
				  <h3 className="text-[15px] font-extrabold text-[#0d1b2a] leading-tight mb-1.5">
					{isAr ? s.labelAr : s.labelEn}
				  </h3>
				  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed mb-4">
					{isAr ? s.subtitleAr : s.subtitleEn}
				  </p>
				  <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider transition-colors"
					style={{ color: s.accentColor }}>
					{isAr ? 'عرض التفاصيل' : 'View Details'}
					<ChevronRight size={11} className="mt-px group-hover:translate-x-0.5 transition-transform" />
				  </div>
				</div>
			  </button>
			);
		  })}
		</div>

		{/* bottom contact strip */}
		<div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
		  <div className="flex items-center gap-3">
			<div className="w-8 h-8 bg-[#0d1b2a] rounded-xl flex items-center justify-center shrink-0">
			  <ShieldCheck size={14} className="text-[#d4af37]" />
			</div>
			<p className="text-[12px] font-semibold text-slate-500">
			  {isAr ? 'أسئلة حول سياسات أوبيريكس؟' : 'Questions about OPERIX policies?'}
			</p>
		  </div>
		  <a
			href="mailto:info@operix-solutions.com"
			className="flex items-center gap-1.5 text-[12px] font-black text-[#0d1b2a] hover:text-[#d4af37] transition-colors"
		  >
			info@operix-solutions.com
			<ExternalLink size={11} />
		  </a>
		</div>
	  </div>

	  {/* ─── Modal Overlay ───────────────────────────────────── */}
	  {openId && activeSection && (
		<div
		  className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
		  style={{ backgroundColor: 'rgba(13,27,42,0.65)', backdropFilter: 'blur(6px)' }}
		  onClick={(e) => { if (e.target === e.currentTarget) setOpenId(null); }}
		>
		  <div
			className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
			style={{ animation: 'modalIn 0.22s cubic-bezier(0.34,1.56,0.64,1) both' }}
		  >
			{/* modal header */}
			<div className="flex items-center gap-3 px-6 pt-6 pb-5 border-b border-slate-100 shrink-0">
			  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
				style={{ backgroundColor: activeSection.accentColor + '15' }}>
				<activeSection.icon size={18} style={{ color: activeSection.accentColor }} />
			  </div>
			  <div className="flex-1 min-w-0">
				<h2 className="text-[16px] font-extrabold text-[#0d1b2a] leading-tight truncate">
				  {isAr ? activeSection.labelAr : activeSection.labelEn}
				</h2>
				<p className="text-[11px] text-slate-400 font-semibold mt-0.5 leading-tight">
				  {isAr ? activeSection.subtitleAr : activeSection.subtitleEn}
				</p>
			  </div>
			  <button
				onClick={() => setOpenId(null)}
				className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
				aria-label="Close"
			  >
				<X size={15} className="text-slate-500" />
			  </button>
			</div>

			{/* modal body — scrollable */}
			<div className="flex-1 overflow-y-auto px-6 py-6">
			  {activeSection.renderContent()}
			</div>

			{/* modal footer — section navigator */}
			<div className="shrink-0 border-t border-slate-100 px-6 py-3 flex items-center justify-between gap-3 bg-[#f8fafc]">
			  <button
				onClick={() => {
				  const idx = sections.findIndex((s) => s.id === openId);
				  if (idx > 0) setOpenId(sections[idx - 1].id);
				}}
				disabled={sections.findIndex((s) => s.id === openId) === 0}
				className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 disabled:opacity-30 hover:text-[#0d1b2a] transition-colors"
			  >
				<ChevronRight size={12} className="rotate-180" />
				{isAr ? 'السابق' : 'Previous'}
			  </button>
			  <div className="flex gap-1.5">
				{sections.map((s) => (
				  <button
					key={s.id}
					onClick={() => setOpenId(s.id)}
					className="w-1.5 h-1.5 rounded-full transition-all"
					style={{
					  backgroundColor: s.id === openId ? activeSection.accentColor : '#cbd5e1',
					  transform: s.id === openId ? 'scale(1.4)' : 'scale(1)',
					}}
				  />
				))}
			  </div>
			  <button
				onClick={() => {
				  const idx = sections.findIndex((s) => s.id === openId);
				  if (idx < sections.length - 1) setOpenId(sections[idx + 1].id);
				}}
				disabled={sections.findIndex((s) => s.id === openId) === sections.length - 1}
				className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-400 disabled:opacity-30 hover:text-[#0d1b2a] transition-colors"
			  >
				{isAr ? 'التالي' : 'Next'}
				<ChevronRight size={12} />
			  </button>
			</div>
		  </div>
		</div>
	  )}

	  {/* modal animation keyframe */}
	  <style>{`
		@keyframes modalIn {
		  from { opacity: 0; transform: translateY(24px) scale(0.97); }
		  to   { opacity: 1; transform: translateY(0)    scale(1);    }
		}
	  `}</style>
	</div>
  );
}

/* ─── SubSection helper ─────────────────────────────────── */
function Sub({ title, color, children }) {
  return (
	<div>
	  <h3 className="text-[12px] font-extrabold uppercase tracking-wider mb-2.5 flex items-center gap-2" style={{ color }}>
		<span className="w-1 h-3.5 rounded-full inline-block" style={{ backgroundColor: color }} />
		{title}
	  </h3>
	  <div className="text-sm text-slate-600 font-medium leading-relaxed pl-3 border-l-2 border-slate-100">
		{children}
	  </div>
	</div>
  );
}