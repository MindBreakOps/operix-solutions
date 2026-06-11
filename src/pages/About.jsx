import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink, ShieldCheck, Cpu, Map, BookOpen } from 'lucide-react';

export default function About() {
  const { isAr } = useLanguage();
  const companyName = "OPERIX Solutions";

  return (
	<div className="w-full animate-in font-sans pb-20">
	  
	  {/* ─── 1. RESPONSIVE HERO SECTION ─── */}
	  <section className="w-full max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-20 text-center space-y-6">
		<span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#c9a84c] inline-block bg-[#c9a84c]/10 px-4 py-1.5 rounded-full border border-[#c9a84c]/20">
		  {isAr ? "تاريخ التأسيس والمنظومة" : "Corporate Profile & Inception"}
		</span>
		<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1e2d40] leading-[1.1] tracking-tight">
		  Architecting High-Yield <br className="hidden md:block" />
		  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e2d40] to-[#c9a84c]">
			Operational Ecosystems
		  </span>
		</h1>
		<p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto pt-4">
		  {isAr 
			? `نحن في ${companyName} نبني البنية التحتية التشغيلية التي تدير أصولك وموظفيك الميدانيين بدقة متناهية عبر أنظمتنا المترابطة لحمايتك من الخسائر الهيكلية.`
			: `${companyName} structures unified data control architectures engineered to synchronize remote deployments, track workforce operations, and lock down asset matrices against structural leakages.`}
		</p>
	  </section>

	  {/* ─── 2. GENESIS & FOUNDATION (DESKTOP SPLIT LAYOUT) ─── */}
	  <section className="w-full max-w-6xl mx-auto px-6 mb-16 md:mb-24">
		<div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
		  <div className="space-y-5">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] flex items-center gap-2">
			  <ShieldCheck size={16} />
			  {isAr ? "الأصل والنشأة للمنظومة" : "Ecosystem Genesis Core"}
			</span>
			<h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1e2d40] leading-tight">
			  {isAr ? `بداية فكرة أوبيريكس وحوكمة الأنظمة` : `The Architectural Foundations of ${companyName}`}
			</h2>
			<p className="text-slate-500 text-sm leading-relaxed font-medium">
			  {isAr
				? `${companyName} تأسست لتعمل كمركز رقمي موحد ومترابط يدمج لوحات التحكم التشغيلية والميدانية والطبية والمالية للمنشآت في مكان واحد. تهدف المنظومة إلى سد الثغرات الهيكلية في الشركات، وتحسين الإنتاجية، وتنمية الأرباح الإجمالية عبر أتمتة كاملة تمنع أي هدر أو خسائر مادية.`
				: `${companyName} coordinates enterprise workflows, remote field crews, and financial modules into a single synchronized framework. Built to replace fragmented legacy methods, our architecture systematically locks down structural loopholes, secures tracking logic across multi-tenant workspaces, and maximizes overall profitability.`}
			</p>
		  </div>
		  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col justify-center h-full relative overflow-hidden">
			{/* Abstract Tech Graphic */}
			<div className="absolute -right-10 -top-10 w-40 h-40 bg-[#c9a84c]/10 rounded-full blur-3xl"></div>
			<div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#1e2d40]/10 rounded-full blur-3xl"></div>
			
			<div className="relative z-10 space-y-6">
			  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
				<div className="w-10 h-10 bg-[#1e2d40] rounded-lg flex items-center justify-center text-[#c9a84c] shrink-0"><Cpu size={20}/></div>
				<div>
				  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isAr ? "نواة النظام" : "System Core"}</div>
				  <div className="text-sm font-black text-[#1e2d40]">{isAr ? "معالجة مركزية للبيانات" : "Centralized Processing"}</div>
				</div>
			  </div>
			  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100 ml-0 md:ml-6">
				<div className="w-10 h-10 bg-[#c9a84c] rounded-lg flex items-center justify-center text-white shrink-0"><ShieldCheck size={20}/></div>
				<div>
				  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isAr ? "أمن وحماية" : "Security Protocol"}</div>
				  <div className="text-sm font-black text-[#1e2d40]">{isAr ? "تحكم قائم على الأدوار" : "Role-Based Access"}</div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  {/* ─── 3. CO-FOUNDER ENGINEERING CORE ─── */}
	  <section className="w-full max-w-6xl mx-auto px-6 mb-16 md:mb-24">
		<div className="bg-[#1e2d40] border border-slate-800 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10 items-center shadow-xl relative overflow-hidden">
		  
		  <div className="md:col-span-2 space-y-5 relative z-10">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] bg-white/10 border border-white/10 px-3 py-1.5 rounded-md inline-block">
			  {isAr ? "الإدارة التنفيذية والتأسيس" : "Executive Governance Strategy"}
			</span>
			<h2 className="text-2xl md:text-3xl font-black text-white">
			  {isAr ? "الملف الهندسي للمؤسس الشريك" : "Co-Founder Engineering Matrix"}
			</h2>
			<p className="text-slate-300 text-sm leading-relaxed font-medium">
			  {isAr 
				? `تم ابتكار وتصميم ركائز ${companyName} برؤية استراتيجية من المؤسس الشريك عاصم الجمعان، عبر هندسة لوحات تحكم تشغيلية متطورة مصممة خصيصاً للحد من الخسائر التشغيلية وتعظيم العوائد.`
				: `${companyName} was engineered under the strategic direction of Co-Founder Asim Aljma'an, deploying custom cloud architectures, telemetry modules, and centralized workforce orchestration boards to enforce operational security.`}
			</p>
			<div className="pt-4">
			  <a 
				href="https://aljmaan.dpdns.org/portfolio-AsimAljmaan/" 
				target="_blank" 
				rel="noopener noreferrer" 
				className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#c9a84c] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10"
			  >
				{isAr ? "استعراض السيرة الكاملة للمؤسس" : "Review Comprehensive Founder Portfolio"} <ExternalLink size={14} />
			  </a>
			</div>
		  </div>

		  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center space-y-3 relative z-10">
			<div className="text-[10px] font-black text-white/60 tracking-widest uppercase">
			  {isAr ? "مستوى دقة البيانات" : "Ecosystem Metrics"}
			</div>
			<div className="text-4xl md:text-5xl font-mono font-black text-[#c9a84c]">99.9%</div>
			<div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">
			  {isAr ? "استقرار الاتصال الجغرافي" : "Live Sync Reliability"}
			</div>
		  </div>
		</div>
	  </section>

	  {/* ─── 4. REAL DEPLOYED VOLUNTEER PROJECTS (RESPONSIVE GRID) ─── */}
	  <section className="w-full max-w-6xl mx-auto px-6">
		<div className="text-center md:text-left mb-10 border-b border-slate-200 pb-4">
		  <h2 className="text-2xl md:text-3xl font-black text-[#1e2d40]">
			{isAr ? "المشاريع والمبادرات التطوعية الهندسية" : "Founding Volunteer Engineering Initiatives"}
		  </h2>
		  <p className="text-slate-500 text-sm font-medium mt-2">
			{isAr ? "مشاريع تم تنفيذها لدعم البنية التحتية المجتمعية." : "Deployed systems engineered to support community infrastructure."}
		  </p>
		</div>
		
		{/* Forces 1 column on mobile, 2 columns on desktop */}
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
		  
		  {/* PROJECT A: ALNASEEM CITY */}
		  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
			<div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between items-center text-[10px] font-mono font-bold tracking-wider uppercase">
			  <span className="text-slate-400">VOLUNTEER · SUDAN</span>
			  <span className="text-[#c9a84c]">ALNASEEM SYSTEM</span>
			</div>
			
			<div className="p-6 md:p-8 flex-grow space-y-6">
			  <div>
				<h3 className="text-xl font-black text-[#1e2d40] flex items-center gap-2 mb-2">
				  <Map className="text-[#c9a84c]" size={20} /> Alnaseem City System
				</h3>
				<p className="text-xs text-slate-500 font-medium leading-relaxed">
				  A comprehensive city management system built to handle statistics, core services, and committee members with a highly interactive UI.
				</p>
			  </div>
			  
			  {/* Telemetry Mockup */}
			  <div className="bg-slate-50 border border-slate-200 text-[#1e2d40] p-4 rounded-xl font-mono text-[10px] space-y-3 shadow-inner">
				<div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-[#c9a84c] uppercase tracking-wider text-[9px]">
				  <span>INTERACTIVE MAP</span>
				  <span>BLOCK DETAILS</span>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[9px] font-sans font-bold text-slate-600">
				  <div className="bg-white p-2.5 rounded border border-slate-100 shadow-sm">Owner: Ahmed F.</div>
				  <div className="bg-white p-2.5 rounded border border-slate-100 shadow-sm">Status: Under Const.</div>
				  <div className="bg-white p-2.5 rounded border border-slate-100 shadow-sm sm:col-span-2 text-center text-[#c9a84c]">Comm. Members: 4 Active</div>
				</div>
			  </div>

			  <ul className="space-y-3 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-600">
				<li className="flex items-start gap-2.5">
				  <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-1.5 shrink-0"/> 
				  <span>Interactive SVG map engine built into the system.</span>
				</li>
				<li className="flex items-start gap-2.5">
				  <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-1.5 shrink-0"/> 
				  <span>Touch/click blocks to instantly reveal owner details.</span>
				</li>
			  </ul>
			</div>
		  </div>

		  {/* PROJECT B: QURAN CENTER */}
		  <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
			<div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between items-center text-[10px] font-mono font-bold tracking-wider uppercase">
			  <span className="text-slate-400">VOLUNTEER · SUDAN</span>
			  <span className="text-[#c9a84c]">QURAN ADMIN</span>
			</div>
			
			<div className="p-6 md:p-8 flex-grow space-y-6">
			  <div>
				<h3 className="text-xl font-black text-[#1e2d40] flex items-center gap-2 mb-2">
				  <BookOpen className="text-[#c9a84c]" size={20} /> Quran Center Operations
				</h3>
				<p className="text-xs text-slate-500 font-medium leading-relaxed">
				  A dedicated management system designed to streamline the Abdullah Bin Abbas Quran Center's daily administrative operations.
				</p>
			  </div>

			  {/* Telemetry Mockup */}
			  <div className="bg-slate-50 border border-slate-200 text-[#1e2d40] p-4 rounded-xl font-mono text-[10px] space-y-3 shadow-inner">
				<div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-[#c9a84c] uppercase tracking-wider text-[9px]">
				  <span>ADMIN WORKFLOWS</span>
				  <span>DIGITIZED STATUS</span>
				</div>
				<div className="grid grid-cols-3 gap-2 text-center text-[9px] font-sans font-bold text-slate-500">
				  <div className="bg-white p-2 rounded border border-slate-100 shadow-sm"><div className="mb-0.5">STUDENTS</div><b className="text-[#1e2d40] text-xs font-black">450</b></div>
				  <div className="bg-white p-2 rounded border border-slate-100 shadow-sm"><div className="mb-0.5">CLASSES</div><b className="text-[#1e2d40] text-xs font-black">24</b></div>
				  <div className="bg-white p-2 rounded border border-slate-100 shadow-sm"><div className="mb-0.5">STAFF</div><b className="text-[#1e2d40] text-xs font-black">32</b></div>
				</div>
				<div className="text-[10px] text-slate-500 pt-2 font-sans font-bold leading-relaxed">
				  <span className="text-[#c9a84c] uppercase tracking-wider text-[9px] font-black block mb-1">TODAY'S LOGS:</span>
				  • Morning Recitation logged<br/>
				  • Monthly performance report generated
				</div>
			  </div>

			  <ul className="space-y-3 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-600">
				<li className="flex items-start gap-2.5">
				  <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-1.5 shrink-0"/> 
				  <span>Fully digitized student and staff records.</span>
				</li>
				<li className="flex items-start gap-2.5">
				  <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full mt-1.5 shrink-0"/> 
				  <span>Automated administrative workflows and attendance.</span>
				</li>
			  </ul>
			</div>
		  </div>

		</div>
	  </section>

	</div>
  );
}