import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t, isAr } = useLanguage();

  const companyName = "OPERIX Solutions";

  return (
	<div className="about-wrapper animate-in">
	  
	  {/* ─── HEADER STATEMENT ─── */}
	  <div className="about-hero">
		<span className="text-[var(--color-gold)] font-mono text-xs font-black uppercase tracking-widest">
		  {isAr ? "تاريخ التأسيس والمنظومة" : "Corporate Profile & Inception"}
		</span>
		<h1 className="text-4xl font-black text-[#1e2d40] mt-2">
		  Architecting High-Yield Operational Ecosystems
		</h1>
		<p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto font-sans">
		  {isAr 
			? `نحن في ${companyName} نبني البنية التحتية التشغيلية التي تدير أصولك وموظفيك الميدانيين بدقة متناهية عبر أنظمتنا المترابطة لحمايتك من الخسائر الهيكلية.`
			: `${companyName} structures unified data control architectures engineered to synchronize remote deployments, track workforce operations, and lock down asset matrices against structural leakages.`}
		</p>
	  </div>

	  {/* ─── OPERIX GENESIS TEXT BLOCKS ─── */}
	  <div className="genesis-panel border border-slate-200 bg-white">
		<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] block">
		  {isAr ? "الأصل والنشأة للمنظومة" : "Ecosystem Genesis Core"}
		</span>
		<h2 className="text-2xl font-black text-[#1e2d40] mt-1">
		  {isAr ? `بداية فكرة أوبيريكس وحوكمة الأنظمة` : `The Architectural Foundations of ${companyName}`}
		</h2>
		<p className="text-slate-600 text-sm leading-relaxed font-medium font-sans">
		  {isAr
			? `${companyName} تأسست لتعمل كمركز رقمي موحد ومترابط يدمج لوحات التحكم التشغيلية والميدانية والطبية والمالية للمنشآت في مكان واحد. تهدف المنظومة إلى سد الثغرات الهيكلية في الشركات، وتحسين الإنتاجية، وتنمية الأرباح الإجمالية عبر أتمتة كاملة تمنع أي هدر أو خسائر مادية.`
			: `${companyName} coordinates enterprise workflows, remote field crews, and financial modules into a single synchronized framework. Built to replace fragmented legacy methods, our architecture systematically locks down structural loopholes, secures tracking logic across multi-tenant workspaces, and maximizes overall profitability while protecting organizational assets from structural operational losses.`}
		</p>
	  </div>

	  {/* ─── CO-FOUNDER ENGINEERING CORE ─── */}
	  <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-center shadow-sm">
		<div className="md:col-span-2 space-y-4">
		  <span className="text-xs font-extrabold uppercase tracking-widest text-[#c9a84c] bg-slate-50 border border-slate-100 px-3 py-1 rounded-md inline-block">
			{isAr ? "الإدارة التنفيذية والتأسيس" : "Executive Governance Strategy"}
		  </span>
		  <h2 className="text-2xl font-black text-[#1e2d40]">
			{isAr ? "الملف الهندسي للمؤسس الشريك" : "Co-Founder Engineering Matrix"}
		  </h2>
		  <p className="text-slate-600 text-sm leading-relaxed font-medium font-sans">
			{isAr 
			  ? `تم ابتكار وتصميم ركائز ${companyName} برؤية استراتيجية من المؤسس الشريك عاصم الجمعان، عبر هندسة لوحات تحكم تشغيلية متطورة مصممة خصيصاً للحد من الخسائر التشغيلية وتعظيم العوائد.`
			  : `${companyName} was engineered under the strategic direction of Co-Founder Asim Aljma'an, deploying custom cloud architectures, telemetry modules, and centralized workforce orchestration boards to enforce operational security.`}
		  </p>
		  <div className="pt-2">
			<a 
			  href="https://aljmaan.dpdns.org/portfolio-AsimAljmaan/" 
			  target="_blank" 
			  rel="noopener noreferrer" 
			  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#1e2d40] hover:text-[#c9a84c] transition-colors font-sans"
			>
			  {isAr ? "استعراض السيرة الكاملة للمؤسس" : "Review Comprehensive Founder Portfolio"} →
			</a>
		  </div>
		</div>
		<div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center space-y-2">
		  <div className="text-xs font-extrabold text-[#1e2d40] tracking-wide uppercase font-sans">
			{isAr ? "مستوى دقة البيانات" : "Ecosystem Metrics"}
		  </div>
		  <div className="text-3xl font-mono font-black text-[#c9a84c]">99.9%</div>
		  <div className="text-[10px] text-slate-400 font-bold uppercase font-sans">{isAr ? "استقرار الاتصال الجغرافي" : "Live Sync Reliability"}</div>
		</div>
	  </div>

	  {/* ─── REAL DEPLOYED VOLUNTEER PROJECTS ─── */}
	  <div className="space-y-6 pt-4">
		<h2 className="volunteer-section-title">
		  {isAr ? "المشاريع والمبادرات التطوعية الهندسية" : "Founding Volunteer Engineering Initiatives"}
		</h2>
		
		<div className="volunteer-grid">
		  
		  {/* PROJECT A: ALNASEEM CITY */}
		  <div className="volunteer-card border border-slate-200 bg-white">
			<div className="volunteer-header-row bg-slate-50 border-b border-slate-200 text-slate-400 font-mono font-bold">
			  <span>VOLUNTEER · SUDAN</span>
			  <span className="text-[#c9a84c]">ALNASEEM CITY SYSTEM</span>
			</div>
			<div className="p-6 space-y-4">
			  <h3 className="text-lg font-black text-[#1e2d40]">Alnaseem City System</h3>
			  <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
				A comprehensive city management system built to handle statistics, core services, and committee members with a highly interactive UI.
			  </p>
			  
			  {/* Premium Light Telemetry Box */}
			  <div className="bg-white border border-slate-200 text-[#1e2d40] p-4 rounded-xl font-mono text-[11px] space-y-2 shadow-sm">
				<div className="flex justify-between border-b border-slate-200 pb-1 font-bold text-[#c9a84c] uppercase tracking-wider text-[9px]">
				  <span>ALNASEEM CITY · INTERACTIVE MAP</span>
				  <span>BLOCK DETAILS (TOUCHED)</span>
				</div>
				<div className="grid grid-cols-2 gap-2 text-[10px] font-sans font-bold text-slate-600 pt-1">
				  <div className="bg-slate-50 p-2 rounded border border-slate-100">Owner: Ahmed F.</div>
				  <div className="bg-slate-50 p-2 rounded border border-slate-100">Status: Under Const.</div>
				  <div className="bg-slate-50 p-2 rounded border border-slate-100">Services: Water, Power</div>
				  <div className="bg-slate-50 p-2 rounded border border-slate-100 text-[#c9a84c]">Comm. Members: 4 Active</div>
				</div>
				<div className="text-[9px] text-center font-bold tracking-wider text-slate-400 pt-1 border-t border-slate-100 uppercase">
				  LIVE · SVG MAP ENGINE · TOUCH ENABLED
				</div>
			  </div>

			  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 font-sans">
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Interactive SVG map engine built into the system</li>
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Touch/click blocks to instantly reveal owner details</li>
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Live statistics dashboard and service tracking</li>
			  </ul>
			</div>
			<div className="bg-slate-50 p-4 border-t border-slate-200 flex gap-2 text-[9px] font-black uppercase text-slate-400 font-mono tracking-wider">
			  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">INTERACTIVE SVG</span>
			  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">DASHBOARDS</span>
			  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">CITY MGMT</span>
			</div>
		  </div>

		  {/* PROJECT B: QURAN CENTER */}
		  <div className="volunteer-card border border-slate-200 bg-white">
			<div className="volunteer-header-row bg-slate-50 border-b border-slate-200 text-slate-400 font-mono font-bold">
			  <span>VOLUNTEER · SUDAN</span>
			  <span className="text-[#c9a84c]">QURAN CENTER · ADMIN WORKFLOWS</span>
			</div>
			<div className="p-6 space-y-4">
			  <h3 className="text-lg font-black text-[#1e2d40]">Quran Center Operations</h3>
			  <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
				A dedicated management system designed to streamline the Abdullah Bin Abbas Quran Center's daily administrative operations.
			  </p>

			  {/* Premium Light Telemetry Box */}
			  <div className="bg-white border border-slate-200 text-[#1e2d40] p-4 rounded-xl font-mono text-[11px] space-y-2 shadow-sm">
				<div className="flex justify-between border-b border-slate-200 pb-1 font-bold text-[#c9a84c] uppercase tracking-wider text-[9px]">
				  <span>QURAN CENTER · ADMIN WORKFLOWS</span>
				  <span>DIGITIZED STATUS</span>
				</div>
				<div className="grid grid-cols-3 gap-2 text-center text-[10px] font-sans font-bold text-slate-500">
				  <div className="bg-slate-50 p-2 rounded border border-slate-100"><div>STUDENTS</div><b className="text-[#1e2d40] text-xs font-black">450</b></div>
				  <div className="bg-slate-50 p-2 rounded border border-slate-100"><div>CLASSES</div><b className="text-[#1e2d40] text-xs font-black">24</b></div>
				  <div className="bg-slate-50 p-2 rounded border border-slate-100"><div>STAFF</div><b className="text-[#1e2d40] text-xs font-black">32</b></div>
				</div>
				<div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-100 font-sans font-bold leading-normal">
				  <div className="text-[#c9a84c] uppercase tracking-wider text-[9px] font-black mb-1">TODAY'S WORKFLOWS</div>
				  • Morning Recitation logged<br/>
				  • Attendance pending for Class B<br/>
				  • Monthly performance report generated
				</div>
				<div className="text-[9px] text-center font-bold tracking-wider text-slate-400 pt-1.5 border-t border-slate-100 uppercase">
				  STAFF MGMT · CLASS SCHEDULING · FULLY DIGITIZED
				</div>
			  </div>

			  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600 font-sans">
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Fully digitized student and staff records</li>
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Automated administrative workflows and attendance</li>
				<li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full"/> Centralized daily operations command board</li>
			  </ul>
			</div>
			<div className="bg-slate-50 p-4 border-t border-slate-200 flex gap-2 text-[9px] font-black uppercase text-slate-400 font-mono tracking-wider">
			  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">OPERATIONS</span>
			  <span className="bg-white border border-slate-200 px-2 py-0.5 rounded">WORKFLOWS</span>
			</div>
		  </div>

		</div>
	  </div>

	</div>
  );
}