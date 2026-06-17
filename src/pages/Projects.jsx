import React, { useState, useEffect } from 'react';
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
		  url: '/projects/ops/ops-dash.png', 
		  titleEn: 'Enterprise Operations Matrix', 
		  titleAr: 'مصفوفة عمليات المؤسسة',
		  descEn: 'The central nervous system of the operations floor. Provides direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.',
		  descAr: 'العصب المركزي لطابق العمليات. يوفر وصولاً مباشراً لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.'
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
	  descEn: 'Advanced medical management ecosystem featuring doctor portals, comprehensive patient history, and voice-to-text clinical notes.',
	  descAr: 'منظومة الإدارة الطبية المتقدمة التي تضم بوابات تفاعلية للأطباء، ملفات شاملة للمرضى، وميزة الإدخال الصوتي للملاحظات السريرية.',
	  url: 'https://www.care.operix-solutions.online',
	  icon: <Activity size={24} />,
	  color: 'bg-blue-900 text-white',
	  image: '/projects/care.png',
	  interactiveBadge: (
		<div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur border border-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <Activity size={14} /> CLINICAL SYNC
		</div>
	  ),
	  previews: [] // Ready to populate when CARE images are available!
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

  // Modal Navigation Handlers
  const openPreview = (platform) => {
	setActivePreview(platform);
	setCurrentImgIndex(0);
  };
  const nextImg = () => {
	if (activePreview) setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
  };
  const prevImg = () => {
	if (activePreview) setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
  };

  return (
	<div className="projects-wrapper animate-in w-full px-6 py-12 space-y-20 font-sans">
	  
	  {/* ─── HEADER ─── */}
	  <div className="text-center max-w-2xl mx-auto space-y-4">
		<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block">
		  {isAr ? "البنية التحتية السحابية" : "Cloud Infrastructure"}
		</span>
		<h1 className="text-3xl md:text-5xl font-black text-[#1e2d40] leading-tight">
		  {isAr ? "مصفوفة الأنظمة المستضافة" : "Deployed Systems Matrix"}
		</h1>
		<p className="text-slate-500 text-sm md:text-base font-medium">
		  {isAr 
			? "بوابة تفاعلية للوصول المباشر إلى المنصات الرقمية المستضافة والنشطة ضمن منظومة أوبيريكس للحلول المتكاملة، ومشاريع العملاء البارزة." 
			: "Interactive portal gateway to the live OPERIX ecosystem cloud platforms, real-time operational environments, and featured client deployments."}
		</p>
	  </div>

	  {/* ─── TIER 1: OPERIX CORE ─── */}
	  <section className="max-w-6xl mx-auto space-y-8">
		<div className="border-b border-slate-200 pb-4">
		  <h2 className="text-xl font-black text-[#1e2d40] uppercase tracking-wider">
			{isAr ? "أنظمة أوبيريكس الأساسية" : "Core OPERIX Ecosystem"}
		  </h2>
		</div>

		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
		  {corePlatforms.map((sys) => (
			<div key={sys.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#d4af37]/50 transition-all duration-300 group flex flex-col h-auto">
			  
			  {/* Interactive Image Side (Top) */}
			  <div className="h-48 sm:h-56 border-b border-slate-200 relative overflow-hidden bg-slate-100 group-hover:bg-slate-200 transition-colors cursor-pointer" onClick={() => window.open(sys.url, '_blank')}>
				<img 
				  src={sys.image} 
				  alt={sys.titleEn} 
				  className="w-full h-full object-cover object-left-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
				/>
				{sys.interactiveBadge}
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
				  
				  {/* Only show Preview button if images exist */}
				  {sys.previews && sys.previews.length > 0 && (
					<button 
					  onClick={() => openPreview(sys)}
					  className="flex-1 flex justify-center items-center gap-2 bg-slate-50 hover:bg-[#1e2d40] hover:text-[#d4af37] text-slate-600 border border-slate-200 py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-all shadow-sm"
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
		  {clientProjects.map((proj) => (
			<div key={proj.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 transition-all duration-300 group">
			  
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

	  {/* ─── SIDE-BY-SIDE SYSTEM PREVIEW MODAL ─── */}
	  {activePreview && activePreview.previews && activePreview.previews.length > 0 && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10">
		  
		  {/* Dark Backdrop */}
		  <div 
			className="absolute inset-0 bg-[#0f1621]/95 backdrop-blur-sm transition-opacity" 
			onClick={() => setActivePreview(null)}
		  ></div>
		  
		  {/* Modal Container (Thick Dark Blue Border) */}
		  <div className="relative bg-white w-full max-w-[1400px] h-auto max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row z-10 border-[4px] border-[#1e2d40] animate-in fade-in zoom-in-95 duration-300">
			
			{/* ─── LEFT SIDE: IMAGE VIEWER ─── */}
			<div className="relative w-full lg:w-2/3 bg-[#0a0f16] flex items-center justify-center group min-h-[300px] lg:min-h-[600px]">
			  <img 
				src={activePreview.previews[currentImgIndex].url} 
				alt="System Preview" 
				className="w-full h-full object-contain p-2 lg:p-6"
			  />

			  {/* Image Navigation Arrows (Hover Reveal) */}
			  <button 
				onClick={prevImg} 
				className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[#1e2d40]/80 hover:bg-[#d4af37] text-white rounded-full transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 shadow-lg"
			  >
				<ChevronLeft size={24} />
			  </button>
			  <button 
				onClick={nextImg} 
				className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#1e2d40]/80 hover:bg-[#d4af37] text-white rounded-full transition-all backdrop-blur-md opacity-0 group-hover:opacity-100 shadow-lg"
			  >
				<ChevronRight size={24} />
			  </button>
			</div>

			{/* ─── RIGHT SIDE: DESCRIPTION PANEL ─── */}
			<div className="w-full lg:w-1/3 bg-[#f8fafc] flex flex-col border-t lg:border-t-0 lg:border-l border-slate-200 max-h-[40vh] lg:max-h-full overflow-y-auto">
			  
			  {/* Context Header */}
			  <div className="p-6 lg:p-8 bg-white border-b border-slate-100 sticky top-0 z-20 flex justify-between items-start">
				<div className="flex items-center gap-3">
				  <div className={`w-10 h-10 ${activePreview.color} rounded-xl flex items-center justify-center shadow-sm`}>
					{activePreview.icon}
				  </div>
				  <div>
					<h3 className="font-black text-base text-[#1e2d40] leading-tight m-0">{isAr ? activePreview.titleAr : activePreview.titleEn}</h3>
					<p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5 m-0">{isAr ? "استعراض واجهة النظام" : "System UI Preview"}</p>
				  </div>
				</div>
				{/* Close Button */}
				<button 
				  onClick={() => setActivePreview(null)} 
				  className="p-2 bg-slate-100 text-[#1e2d40] rounded-full hover:bg-red-500 hover:text-white transition-colors"
				>
				  <X size={16} strokeWidth={2.5} />
				</button>
			  </div>

			  {/* Text Content */}
			  <div className="p-6 lg:p-8 flex-grow flex flex-col">
				<div className="mb-6">
				  <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					<Info size={12} className="text-[#d4af37]" /> {isAr ? "الوحدة الحالية" : "Current Module"}
				  </span>
				  
				  {/* Premium Gold Title */}
				  <h4 className="font-serif font-black text-2xl text-[#d4af37] leading-tight" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					{isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}
				  </h4>
				</div>

				{/* Professional Description */}
				<p className="text-sm text-slate-600 font-medium leading-loose mb-8 text-justify" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  {isAr ? activePreview.previews[currentImgIndex].descAr : activePreview.previews[currentImgIndex].descEn}
				</p>

				{/* Navigation Footer */}
				<div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between">
				  <div className="flex items-center gap-2 text-xs font-black font-mono tracking-widest bg-white border border-slate-200 px-4 py-2 rounded-lg text-[#1e2d40]">
					{currentImgIndex + 1} <span className="text-slate-300">/</span> {activePreview.previews.length}
				  </div>
				  
				  {/* Mobile-friendly bottom navigation arrows */}
				  <div className="flex gap-2">
					<button onClick={prevImg} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1e2d40] hover:bg-[#1e2d40] hover:text-[#d4af37] hover:border-transparent transition-colors shadow-sm">
					  <ChevronLeft size={18} />
					</button>
					<button onClick={nextImg} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#1e2d40] hover:bg-[#1e2d40] hover:text-[#d4af37] hover:border-transparent transition-colors shadow-sm">
					  <ChevronRight size={18} />
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