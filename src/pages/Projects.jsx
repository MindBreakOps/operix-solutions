import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Users, Settings, Activity, CreditCard, ExternalLink, Building2, Globe, Landmark, ShieldCheck } from 'lucide-react';

export default function Projects() {
  const { isAr } = useLanguage();

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
	  url: 'https://www.operations.operix-solutions.online',
	  icon: <Settings size={24} />,
	  color: 'bg-white text-red-600 border border-slate-100', // White and Red
	  image: '/projects/ops.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#1e2d40]/90 backdrop-blur border border-slate-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> LIVE TELEMETRY
		</div>
	  )
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
	  color: 'bg-emerald-900 text-white', // Dark Green and White
	  image: '/projects/fmis.png',
	  interactiveBadge: (
		<div className="absolute top-4 right-4 bg-[#c9a84c]/95 backdrop-blur border border-[#c9a84c] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <ShieldCheck size={14} /> ZATCA VERIFIED
		</div>
	  )
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
	  color: 'bg-black text-white', // Black and White
	  image: '/projects/hris.png',
	  interactiveBadge: (
		<div className="absolute bottom-4 left-4 bg-emerald-700/90 backdrop-blur border border-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
		  <div className="w-2 h-2 rounded-full bg-white animate-ping" /> GPS FENCE ACTIVE
		</div>
	  )
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
	  color: 'bg-blue-900 text-white', // Dark Blue and White
	  image: '/projects/care.png',
	  interactiveBadge: (
		<div className="absolute top-4 left-4 bg-rose-600/90 backdrop-blur border border-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
		  <Activity size={14} /> CLINICAL SYNC
		</div>
	  )
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
	  color: 'bg-sky-400 text-white', // Light Blue and White
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
	  color: 'bg-white text-emerald-800 border border-slate-100', // Dark Green Icon
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
	  color: 'bg-red-900 text-white', // Dark Red and White
	  image: '/projects/naseem.png' // Left as .png per your previous message
	}
  ];

  return (
	<div className="projects-wrapper animate-in w-full px-6 py-12 space-y-20 font-sans">
	  
	  {/* ─── HEADER ─── */}
	  <div className="text-center max-w-2xl mx-auto space-y-4">
		<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] block">
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
			<div key={sys.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#c9a84c]/50 transition-all duration-300 group flex flex-col sm:flex-row h-auto sm:h-[300px]">
			  
			  {/* Info Side */}
			  <div className="p-6 sm:p-8 flex flex-col justify-between sm:w-1/2 z-10 bg-white">
				<div className="space-y-4">
				  <div className="flex items-center gap-3">
					{/* Notice the hardcoded 'text-white' is removed here so your custom colors work */}
					<div className={`w-10 h-10 ${sys.color} rounded-xl flex items-center justify-center shadow-md shrink-0`}>
					  {sys.icon}
					</div>
					<div>
					  <h3 className="font-black text-base text-[#1e2d40] leading-tight m-0">{isAr ? sys.titleAr : sys.titleEn}</h3>
					  <p className="text-[9px] font-bold uppercase tracking-wider text-[#c9a84c] mt-0.5 m-0">{isAr ? sys.subAr : sys.subEn}</p>
					</div>
				  </div>
				  <p className="text-slate-500 text-xs leading-relaxed font-medium line-clamp-4">
					{isAr ? sys.descAr : sys.descEn}
				  </p>
				</div>
				<div className="pt-4">
				  <a href={sys.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#c9a84c] text-white px-5 py-2.5 rounded-xl font-black text-[10px] tracking-wider uppercase transition-colors shadow-sm">
					{isAr ? "دخول المنصة" : "Launch Platform"} <ExternalLink size={12} />
				  </a>
				</div>
			  </div>

			  {/* Interactive Image Side */}
			  <div className="sm:w-1/2 border-t sm:border-t-0 sm:border-l border-slate-200 relative overflow-hidden bg-slate-100 group-hover:bg-slate-200 transition-colors cursor-pointer" onClick={() => window.open(sys.url, '_blank')}>
				<img 
				  src={sys.image} 
				  alt={sys.titleEn} 
				  className="w-full h-full object-cover object-left-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
				/>
				{sys.interactiveBadge}
				
				<div className="absolute inset-0 bg-[#1e2d40]/0 group-hover:bg-[#1e2d40]/20 transition-all duration-300 flex items-center justify-center">
				  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#1e2d40] px-4 py-2 rounded-lg font-black text-[10px] tracking-widest uppercase shadow-2xl">
					{isAr ? "عرض حي" : "View Live"}
				  </div>
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
			<div key={proj.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 group">
			  
			  {/* Image Header with Hover Action */}
			  <div className="h-40 w-full relative overflow-hidden bg-slate-100 border-b border-slate-200 cursor-pointer" onClick={() => window.open(proj.url, '_blank')}>
				<img 
				  src={proj.image} 
				  alt={proj.titleEn} 
				  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
				/>
				<div className="absolute inset-0 bg-[#1e2d40]/0 group-hover:bg-[#1e2d40]/30 transition-all duration-300 flex items-center justify-center">
				  <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#1e2d40] px-4 py-2 rounded-lg font-black text-[10px] tracking-widest uppercase shadow-2xl">
					{isAr ? "استكشاف" : "Explore"}
				  </div>
				</div>
			  </div>

			  {/* Content Body */}
			  <div className="p-6 flex flex-col justify-between flex-grow space-y-4 relative z-10">
				<div className="space-y-4">
				  {/* Removed 'text-white' here as well */}
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
				  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between text-[#1e2d40] py-2 font-black text-[10px] tracking-wider uppercase transition-colors group-hover:text-blue-600">
					{isAr ? "زيارة الموقع المباشر" : "Visit Live Portal"} <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
				  </a>
				</div>
			  </div>

			</div>
		  ))}
		</div>
	  </section>

	</div>
  );
}