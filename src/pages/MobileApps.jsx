import React, { useState, useEffect } from 'react';
import { Smartphone, Play, CheckCircle, Users, X, Activity, Settings, BookOpen, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  en: {
	heroBadge: 'Native Ecosystem',
	heroTitle: 'Enterprise in your pocket.',
	heroSub: 'Explore the native mobile extensions of the OPERIX Ecosystem. Designed for speed, reliability, and seamless synchronization with your core command center.',
	loginArch: 'Login Architecture',
	loginText1: 'All mobile applications enforce a strict two-step authentication process: users must first resolve their unique ',
	workspaceDomain: 'Workspace Domain',
	loginText2: ' before accessing the secure login portal.',
	builtFor: 'Built For',
	coreCap: 'Core Capabilities',
	launchPreview: 'Launch Interactive Preview',
	livePreview: 'Live Preview',
	previewDesc: 'Experience the mobile UI flow. Interactions have been recorded directly from a native device.',
	apps: [
	  {
		id: 'ops-hr',
		title: 'OPERIX Hub (Ops & HR)',
		badge: 'Enterprise Mobility',
		icon: <Settings size={24} />,
		color: 'text-blue-600',
		bgTheme: 'bg-blue-50',
		desc: "A unified, high-performance mobile interface combining core HR functions with live field operations. Securely access the system by entering your organization's workspace domain followed by your login credentials.",
		accomplishmentsTitle: 'What it accomplishes',
		accomplishments: 'Eliminates paper logs, automates attendance, and bridges the gap between managers and frontline staff by centralizing all daily operations and HR requests.',
		audience: 'Field Staff, Operations Managers, and General Employees.',
		capabilities: [
		  'Dedicated Ops tab for assigned manager/staff tasks',
		  'Face-ID punch in/out & automated timesheets',
		  'Instant payslip access & leave/normal requests',
		  'Full employee file with info and documents'
		],
		videoUrl: '/videos/ops-hr-mobile.mp4',
		poster: '/projects/mobile-poster-ops.jpg'
	  },
	  {
		id: 'care',
		title: 'OPERIX Care Mobile',
		badge: 'Clinical Operations',
		icon: <Activity size={24} />,
		color: 'text-rose-600',
		bgTheme: 'bg-rose-50',
		desc: "Comprehensive clinical and hospital management on the go. Medical staff and administrators can seamlessly log in via their hospital's dedicated workspace domain.",
		accomplishmentsTitle: 'What it accomplishes',
		accomplishments: 'Dramatically speeds up patient triage, simplifies billing, and gives specialized departments (like Pharmacy and Blood Bank) real-time access to critical data.',
		audience: 'Attending Physicians, Nurses, Receptionists, and Clinicians.',
		capabilities: [
		  'Reception: Invoices, tickets, check-ins & emergencies',
		  'Dedicated secure tabs for Doctors and Nurses',
		  'Pharmacy, Operations, and Blood Bank management',
		  'Comprehensive live patient file access'
		],
		videoUrl: '/videos/ops-care-mobile.mp4',
		poster: '/projects/mobile-poster-care.jpg'
	  },
	  {
		id: 'binabbas',
		title: 'Bin Abbas Portal',
		badge: 'Community & Education',
		icon: <BookOpen size={24} />,
		color: 'text-emerald-600',
		bgTheme: 'bg-emerald-50',
		desc: "A dedicated institutional application for community members and students to seamlessly access religious resources and educational profiles via their workspace domain.",
		accomplishmentsTitle: 'What it accomplishes',
		accomplishments: 'Digitizes the student journey, creating a centralized, easily accessible hub for Islamic learning, daily prayers, and institutional engagement.',
		audience: 'Students, Registered Community Members, and Institute Staff.',
		capabilities: [
		  'Interactive Moshaf with Tafsir and reciting audio',
		  'Accurate daily Prayer timers and Adhan alerts',
		  'Live news feed and institutional updates',
		  'Instant digital certificate exporting'
		],
		videoUrl: '/videos/bin-abbas-mobile.mp4',
		poster: '/projects/mobile-poster-abbas.jpg'
	  }
	]
  },
  ar: {
	heroBadge: 'النظام الأصلي',
	heroTitle: 'المؤسسة في جيبك.',
	heroSub: 'استكشف تطبيقات الجوال الأصلية ضمن نظام أوبيريكس. مصممة للسرعة والموثوقية والمزامنة الفورية مع مركز القيادة الرئيسي الخاص بك.',
	loginArch: 'هيكلة تسجيل الدخول',
	loginText1: 'تطبق جميع تطبيقات الجوال عملية مصادقة صارمة من خطوتين: يجب على المستخدمين أولاً إدخال ',
	workspaceDomain: 'نطاق مساحة العمل',
	loginText2: ' الخاص بهم قبل الوصول إلى بوابة الدخول الآمنة.',
	builtFor: 'مصمم من أجل',
	coreCap: 'القدرات الأساسية',
	launchPreview: 'تشغيل العرض التفاعلي',
	livePreview: 'عرض مباشر',
	previewDesc: 'اكتشف واجهة المستخدم على الجوال. تم تسجيل التفاعلات مباشرة من جهاز حقيقي.',
	apps: [
	  {
		id: 'ops-hr',
		title: 'أوبيريكس للعمليات والموارد',
		badge: 'تنقل المؤسسة',
		icon: <Settings size={24} />,
		color: 'text-blue-600',
		bgTheme: 'bg-blue-50',
		desc: 'واجهة جوال موحدة وعالية الأداء تجمع بين وظائف الموارد البشرية الأساسية والعمليات الميدانية الحية. ادخل للنظام بأمان عبر إدخال نطاق مؤسستك متبوعاً ببيانات الدخول.',
		accomplishmentsTitle: 'ماذا يحقق',
		accomplishments: 'يقضي على السجلات الورقية، ويؤتمت الحضور، ويسد الفجوة بين المديرين وموظفي الخطوط الأمامية من خلال مركزة العمليات اليومية وطلبات الموارد البشرية.',
		audience: 'الموظفون الميدانيون، مديرو العمليات، وكافة الموظفين.',
		capabilities: [
		  'قسم خاص للعمليات للمهام المعينة للمدير/الموظف',
		  'تسجيل الحضور بالبصمة (Face-ID) وجداول آلية',
		  'وصول فوري لمسير الرواتب وطلبات الإجازات/العامة',
		  'ملف موظف كامل بالمعلومات والمستندات'
		],
		videoUrl: '/videos/ops-hr-mobile.mp4',
		poster: '/projects/mobile-poster-ops.jpg'
	  },
	  {
		id: 'care',
		title: 'أوبيريكس كير (الرعاية)',
		badge: 'العمليات السريرية',
		icon: <Activity size={24} />,
		color: 'text-rose-600',
		bgTheme: 'bg-rose-50',
		desc: 'إدارة سريرية ومستشفيات شاملة أثناء التنقل. يمكن للطاقم الطبي والإداريين تسجيل الدخول بسلاسة عبر نطاق مساحة العمل الخاص بالمستشفى.',
		accomplishmentsTitle: 'ماذا يحقق',
		accomplishments: 'يسرّع بشكل كبير فرز المرضى، ويبسط الفوترة، ويمنح الأقسام المتخصصة (كصيدلية وبنك الدم) وصولاً فورياً للبيانات الحرجة.',
		audience: 'الأطباء المعالجون، الممرضون، موظفو الاستقبال، والسريريون.',
		capabilities: [
		  'الاستقبال: الفواتير، التذاكر، الدخول والطوارئ',
		  'أقسام آمنة ومخصصة للأطباء والممرضين',
		  'إدارة الصيدلية، العمليات، وبنك الدم',
		  'وصول شامل لملف المريض الحي'
		],
		videoUrl: '/videos/ops-care-mobile.mp4',
		poster: '/projects/mobile-poster-care.jpg'
	  },
	  {
		id: 'binabbas',
		title: 'بوابة ابن عباس',
		badge: 'المجتمع والتعليم',
		icon: <BookOpen size={24} />,
		color: 'text-emerald-600',
		bgTheme: 'bg-emerald-50',
		desc: 'تطبيق مؤسسي مخصص لأعضاء المجتمع والطلاب للوصول السلس إلى الموارد الدينية وملفاتهم التعليمية عبر نطاق مساحة العمل الخاص بهم.',
		accomplishmentsTitle: 'ماذا يحقق',
		accomplishments: 'يرقمن رحلة الطالب، ويخلق مركزاً يسهل الوصول إليه للتعلم الإسلامي، الصلوات اليومية، والمشاركة المؤسسية.',
		audience: 'الطلاب، أعضاء المجتمع المسجلون، وموظفو المعهد.',
		capabilities: [
		  'مصحف تفاعلي مع التفسير والتلاوة الصوتية',
		  'مواقيت صلاة دقيقة وتنبيهات الأذان',
		  'موجز أخبار حي وتحديثات مؤسسية',
		  'تصدير فوري للشهادات الرقمية'
		],
		videoUrl: '/videos/bin-abbas-mobile.mp4',
		poster: '/projects/mobile-poster-abbas.jpg'
	  }
	]
  }
};

export default function MobileApps() {
  const { isAr } = useLanguage();
  const t = translations[isAr ? 'ar' : 'en'];
  const [activeVideo, setActiveVideo] = useState(null);

  // Prevent background scrolling when iPhone modal is open
  useEffect(() => {
	if (activeVideo) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'unset';
	return () => { document.body.style.overflow = 'unset'; };
  }, [activeVideo]);

  return (
	<div 
	  className={`min-h-screen bg-[#f8fafc] font-sans pb-24 ${isAr ? 'text-right' : 'text-left'}`} 
	  dir={isAr ? 'rtl' : 'ltr'}
	>
	  
	  {/* ─── HEADER (Matches Navbar Color) ─── */}
	  <header className="bg-[#1e2d40] py-16 px-6 text-center relative overflow-hidden">
		<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4af37]/10 blur-[100px] rounded-full pointer-events-none" />
		<div className="max-w-3xl mx-auto relative z-10">
		  <span className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-4">
			<Smartphone size={14} /> {t.heroBadge}
		  </span>
		  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
			{t.heroTitle}
		  </h1>
		  <p className="text-slate-300 font-medium leading-relaxed">
			{t.heroSub}
		  </p>
		</div>
	  </header>

	  {/* ─── APP PREVIEW LIST ─── */}
	  <main className="max-w-6xl mx-auto px-6 mt-16 space-y-24">
		{t.apps.map((app, index) => (
		  <div key={app.id} className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
			
			{/* TEXT & DETAILS SIDE */}
			<div className="w-full lg:w-1/2 space-y-8">
			  <div>
				<div className="flex items-center gap-4 mb-4">
				  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 ${app.bgTheme} ${app.color}`}>
					{app.icon}
				  </div>
				  <div>
					<h2 className="text-2xl font-black text-[#1e2d40]">{app.title}</h2>
					<span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{app.badge}</span>
				  </div>
				</div>
				<p className="text-sm text-slate-600 font-medium leading-loose">
				  {app.desc}
				</p>
			  </div>

			  <div className="space-y-4">
				<div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
				  <h4 className="text-xs font-black uppercase tracking-wider text-[#1e2d40] mb-2 flex items-center gap-2">
					<Globe size={14} className="text-[#d4af37]" /> {t.loginArch}
				  </h4>
				  <p className="text-xs text-slate-500 leading-relaxed font-medium">
					{t.loginText1} <strong>{t.workspaceDomain}</strong> {t.loginText2}
				  </p>
				</div>
				
				<div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
				  <h4 className="text-xs font-black uppercase tracking-wider text-[#1e2d40] mb-2 flex items-center gap-2">
					<Users size={14} className="text-[#d4af37]" /> {t.builtFor}
				  </h4>
				  <p className="text-xs text-slate-500 font-bold">{app.audience}</p>
				</div>
			  </div>

			  <div>
				<h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">{t.coreCap}</h4>
				<ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
				  {app.capabilities.map((cap, i) => (
					<li key={i} className="flex items-start gap-2 text-xs font-bold text-[#1e2d40]">
					  <CheckCircle size={16} className="text-[#d4af37] shrink-0" />
					  {cap}
					</li>
				  ))}
				</ul>
			  </div>
			</div>

			{/* PREVIEW CARD SIDE */}
			<div className="w-full lg:w-1/2 flex justify-center">
			  <div 
				onClick={() => setActiveVideo(app)}
				className="group relative w-full max-w-[340px] aspect-[4/5] bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:border-[#d4af37]/50 transition-all duration-500"
			  >
				{/* Poster Image / Background */}
				<div className="absolute inset-0 bg-slate-100">
				  {app.poster ? (
					<img src={app.poster} alt={app.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
				  ) : (
					<div className="w-full h-full bg-gradient-to-br from-[#1e2d40] to-slate-900" />
				  )}
				</div>

				{/* Overlay & Play Button */}
				<div className="absolute inset-0 bg-[#0f1621]/40 group-hover:bg-[#0f1621]/20 transition-colors duration-300 flex flex-col items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-0">
				  <div className="w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white group-hover:bg-[#d4af37] group-hover:border-transparent group-hover:scale-110 transition-all duration-300 shadow-2xl">
					<Play size={24} className={isAr ? "mr-1" : "ml-1"} fill="currentColor" />
				  </div>
				  <span className="text-white text-xs font-black uppercase tracking-widest mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md">
					{t.launchPreview}
				  </span>
				</div>
			  </div>
			</div>

		  </div>
		))}
	  </main>

	  {/* ─── IPHONE 13 PRO MAX MODAL ─── */}
	  {activeVideo && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
		  
		  {/* Dark Backdrop */}
		  <div 
			className="absolute inset-0 bg-[#0f1621]/95 backdrop-blur-md transition-opacity cursor-pointer" 
			onClick={() => setActiveVideo(null)}
		  ></div>

		  {/* Close Button */}
		  <button 
			onClick={() => setActiveVideo(null)}
			className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} md:top-10 md:${isAr ? 'left-10' : 'right-10'} w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white transition-all z-20`}
		  >
			<X size={24} />
		  </button>

		  {/* iPhone 13 Pro Max CSS Mockup */}
		  <div className="relative z-10 animate-in fade-in zoom-in duration-500">
			{/* App Info Floating next to phone (Desktop only) */}
			<div className={`hidden lg:block absolute top-1/2 -translate-y-1/2 w-64 ${isAr ? 'left-full ml-12 text-left' : 'right-full mr-12 text-right'}`}>
			  <span className="inline-block px-3 py-1 bg-[#d4af37] text-[#1e2d40] text-[10px] font-black uppercase tracking-widest rounded-full mb-3">
				{t.livePreview}
			  </span>
			  <h3 className="text-2xl font-black text-white mb-2">{activeVideo.title}</h3>
			  <p className="text-xs text-slate-400 font-medium leading-relaxed">
				{t.previewDesc}
			  </p>
			</div>

			{/* The Device Frame */}
			<div className="relative w-[300px] h-[650px] md:w-[340px] md:h-[736px] bg-black rounded-[3.5rem] border-[14px] border-[#1e2d40] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10">
			  
			  {/* Top Notch */}
			  <div className="absolute top-0 inset-x-0 h-7 bg-[#1e2d40] rounded-b-3xl w-40 mx-auto z-20 flex justify-center items-center gap-2">
				<div className="w-12 h-1.5 bg-black/50 rounded-full" />
				<div className="w-2.5 h-2.5 bg-[#0f1621] rounded-full border border-white/10 relative">
				  <div className="absolute inset-0 m-auto w-1 h-1 bg-blue-900 rounded-full shadow-[0_0_4px_#3b82f6]" />
				</div>
			  </div>

			  {/* Screen Content (The Video) */}
			  <div className="absolute inset-0 bg-[#0f1621] flex items-center justify-center">
				{/* 
				  Using key={activeVideo.id} forces React to remount the video element when switching apps.
				  Explicitly wrapping the source tag and maintaining muted/playsInline is crucial for autoplay rules. 
				*/}
				<video 
				  key={activeVideo.id}
				  autoPlay 
				  loop 
				  muted 
				  playsInline
				  className="w-full h-full object-cover"
				>
				  <source src={activeVideo.videoUrl} type="video/mp4" />
				  Your browser does not support the video tag.
				</video>
			  </div>

			  {/* Bottom Home Indicator */}
			  <div className="absolute bottom-2 inset-x-0 h-1 bg-white/50 rounded-full w-1/3 mx-auto z-20" />
			</div>

			{/* Hardware Buttons */}
			<div className="absolute top-24 -left-[17px] w-1 h-8 bg-[#1e2d40] rounded-l-md" /> {/* Mute */}
			<div className="absolute top-36 -left-[17px] w-1 h-12 bg-[#1e2d40] rounded-l-md" /> {/* Vol Up */}
			<div className="absolute top-52 -left-[17px] w-1 h-12 bg-[#1e2d40] rounded-l-md" /> {/* Vol Down */}
			<div className="absolute top-40 -right-[17px] w-1 h-16 bg-[#1e2d40] rounded-r-md" /> {/* Power */}
		  </div>

		</div>
	  )}

	</div>
  );
}