import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Cpu, Globe, ExternalLink, MapPin, Building2 } from 'lucide-react';

export default function About() {
  const { isAr } = useLanguage();
  const companyName = "OPERIX SOLUTIONS";

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
	  
	  {/* ─── STRICT GLOBAL WRAPPER: max-w-7xl with tightened vertical spacing ─── */}
	  <div className="max-w-7xl mx-auto space-y-12 relative z-10">
		
		{/* ─── HERO HEADER ─── */}
		<div className="text-center space-y-4 max-w-3xl mx-auto border-b border-slate-200/60 pb-10">
		  <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 shadow-sm mb-2">
			{isAr ? "تاريخ التأسيس والمنظومة" : "Corporate Profile & Inception"}
		  </span>
		  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
			Architecting High-Yield Operational Ecosystems
		  </h1>
		  <p className="text-slate-500 text-sm leading-relaxed font-medium max-w-2xl mx-auto">
			{isAr 
			  ? `نحن في ${companyName} نبني البنية التحتية التشغيلية التي تدير أصولك وموظفيك الميدانيين بدقة متناهية عبر أنظمتنا المترابطة.`
			  : `${companyName} structures unified data control architectures engineered to synchronize remote deployments, track workforce operations, and lock down asset matrices against structural leakages.`}
		  </p>
		</div>

		{/* ─── GLOBAL PRESENCE: COMPACT DUAL CARDS ─── */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
		  
		  {/* Card 1: OPERIX Solutions (Main Global HQ) */}
		  <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[320px] flex flex-col justify-end group bg-[#0a111a]">
			<div 
			  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 opacity-80"
			  style={{ backgroundImage: 'url(/projects/operix-bg.jpg)' }}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/80 to-transparent z-10" />
			
			<div className="relative z-20 p-6 md:p-8 text-white space-y-3 mt-auto">
			  <div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
				  <Building2 size={14} /> {isAr ? "المقر الرئيسي" : "Global Headquarters"}
				</div>
				<div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest border border-white/20">
				  <MapPin size={10} className="text-[#d4af37]" /> Riyadh, SA
				</div>
			  </div>
			  <h2 className="text-2xl font-black font-serif leading-tight text-[#d4af37]">
				{isAr ? "أوبيريكس للحلول المتكاملة" : "OPERIX Solutions"}
			  </h2>
			  <p className="text-xs text-slate-300 font-medium leading-relaxed max-w-md">
				{isAr 
				  ? "مركز القيادة الرئيسي الذي يوفر بنية تحتية تشغيلية شاملة، وأنظمة إدارة الموارد البشرية، والمصفوفات الطبية، والأنظمة المالية للمنشآت الكبرى."
				  : "The central command core providing comprehensive operational infrastructure, human capital management, healthcare matrices, and financial integrations."}
			  </p>
			</div>
		  </div>

		  {/* Card 2: OPERIX 249 (Sudan Branch) */}
		  <div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[320px] flex flex-col justify-end group bg-[#0a111a]">
			<div 
			  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 opacity-90"
			  style={{ backgroundImage: 'url(/projects/opx-sud.jpeg)' }}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/80 to-transparent z-10" />
			
			<div className="relative z-20 p-6 md:p-8 text-white space-y-3 mt-auto">
			  <div className="flex items-center justify-between mb-2">
				<div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
				  <Globe size={14} /> {isAr ? "الذراع الإقليمي" : "Regional Division"}
				</div>
				<div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest border border-white/20">
				  <MapPin size={10} className="text-[#d4af37]" /> Khartoum, SD
				</div>
			  </div>
			  <h2 className="text-2xl font-black font-serif leading-tight text-[#d4af37] drop-shadow-md">
				{isAr ? "أوبيريكس 249" : "OPERIX 249"}
			  </h2>
			  <p className="text-xs text-slate-200 font-medium leading-relaxed max-w-md drop-shadow-md">
				{isAr 
				  ? "الفرع الاستراتيجي في السودان، يقدم حلولاً رقمية مخصصة للقطاع التجاري والصناعي، مع هندسة تقنية متطورة لدعم التحول الرقمي الإقليمي."
				  : "Our strategic regional hub delivering tailored digital solutions, industry-specific architectures, and customized tech deployments across the evolving Sudanese sector."}
			  </p>
			</div>
		  </div>

		</div>

		{/* ─── GENESIS CORE (Tightened Padding & Text) ─── */}
		<div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm grid md:grid-cols-2 gap-8 items-center">
		  <div className="space-y-4">
			<h2 className="text-2xl font-black font-serif text-[#1e2d40] pb-1">
			  {isAr ? `بداية فكرة أوبيريكس وحوكمة الأنظمة` : `The Architectural Foundations of ${companyName}`}
			</h2>
			<p className="text-slate-500 text-xs leading-relaxed font-medium">
			  {isAr
				? `${companyName} تأسست لتعمل كمركز رقمي موحد ومترابط يدمج لوحات التحكم التشغيلية والميدانية والطبية والمالية للمنشآت في مكان واحد. تهدف المنظومة إلى سد الثغرات الهيكلية في الشركات، وتحسين الإنتاجية، وتنمية الأرباح الإجمالية عبر أتمتة كاملة تمنع أي هدر أو خسائر مادية.`
				: `${companyName} coordinates enterprise workflows, remote field crews, and financial modules into a single synchronized framework. Built to replace fragmented legacy methods, our architecture systematically locks down structural loopholes, secures tracking logic across multi-tenant workspaces, and maximizes overall profitability.`}
			</p>
		  </div>
		  <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4 shadow-inner">
			<div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
			  <div className="w-10 h-10 shrink-0 bg-[#1e2d40] rounded-lg flex items-center justify-center text-[#d4af37]"><Cpu size={18}/></div>
			  <div>
				<div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">System Core</div>
				<div className="text-xs font-bold text-[#1e2d40]">Centralized Data Processing</div>
			  </div>
			</div>
			<div className="flex items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm ml-6">
			  <div className="w-10 h-10 shrink-0 bg-[#d4af37] rounded-lg flex items-center justify-center text-white"><ShieldCheck size={18}/></div>
			  <div>
				<div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Security Protocol</div>
				<div className="text-xs font-bold text-[#1e2d40]">Role-Based Access Control</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* ─── CO-FOUNDER CORE (Compact & Professional) ─── */}
		<div className="bg-[#1e2d40] text-white rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-8 items-center shadow-lg border border-slate-800">
		  <div className="md:col-span-2 space-y-3">
			<h2 className="text-xl md:text-2xl font-black font-serif text-[#d4af37]">
			  {isAr ? "الملف الهندسي للمؤسس الشريك" : "Co-Founder Engineering Matrix"}
			</h2>
			<p className="text-slate-300 text-xs leading-relaxed font-medium">
			  {isAr 
				? `تم ابتكار وتصميم ركائز ${companyName} برؤية استراتيجية من المؤسس الشريك عاصم الجمعان، عبر هندسة لوحات تحكم تشغيلية متطورة مصممة خصيصاً للحد من الخسائر التشغيلية وتعظيم العوائد.`
				: `${companyName} was engineered under the strategic direction of Co-Founder Asim Aljma'an, deploying custom cloud architectures, telemetry modules, and centralized workforce orchestration boards to enforce operational security.`}
			</p>
			<a href="https://www.aljmaan.operix-solutions.online/portfolio-AsimAljmaan/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors mt-2">
			  {isAr ? "استعراض السيرة الكاملة للمؤسس" : "Review Comprehensive Founder Portfolio"} <ExternalLink size={12} />
			</a>
		  </div>
		  <div className="bg-[#151c28] rounded-xl p-6 text-center border border-slate-700 shadow-inner">
			<div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ecosystem Reliability</div>
			<div className="text-4xl font-black text-[#d4af37] my-1.5 font-mono">99.9%</div>
			<div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Live Sync Uptime</div>
		  </div>
		</div>

	  </div>
	</div>
  );
}