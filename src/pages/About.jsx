import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Cpu, Globe, ExternalLink, MapPin, Building2 } from 'lucide-react';

export default function About() {
  const { isAr } = useLanguage();
  const companyName = "OPERIX SOLUTIONS";

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-20 px-4 md:px-6 font-sans relative overflow-hidden">
	  
	  <div className="max-w-7xl mx-auto space-y-24 relative z-10">
		
		{/* ─── HERO HEADER ─── */}
		<div className="text-center space-y-6 max-w-3xl mx-auto">
		  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/20 shadow-sm">
			{isAr ? "تاريخ التأسيس والمنظومة" : "Corporate Profile & Inception"}
		  </span>
		  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-serif leading-[1.15] bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			Architecting High-Yield Operational Ecosystems
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
			{isAr 
			  ? `نحن في ${companyName} نبني البنية التحتية التشغيلية التي تدير أصولك وموظفيك الميدانيين بدقة متناهية عبر أنظمتنا المترابطة.`
			  : `${companyName} structures unified data control architectures engineered to synchronize remote deployments, track workforce operations, and lock down asset matrices against structural leakages.`}
		  </p>
		</div>

		{/* ─── GLOBAL PRESENCE: DUAL BRANCH CARDS ─── */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
		  
		  {/* Card 1: OPERIX Solutions (Main Global HQ) */}
		  <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 min-h-[450px] flex flex-col justify-end group bg-[#0a111a]">
			<div 
			  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 opacity-80"
			  style={{ backgroundImage: 'url(/projects/operix-bg.jpg)' }}
			></div>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/70 to-transparent z-10"></div>
			
			<div className="relative z-20 p-8 md:p-10 text-white space-y-4 mt-auto">
			  <div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
				  <Building2 size={16} /> {isAr ? "المقر الرئيسي" : "Global Headquarters"}
				</div>
				<div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/20">
				  <MapPin size={12} className="text-[#d4af37]" /> Riyadh, SA
				</div>
			  </div>
			  {/* Pure Gold Text to stand out against Dark Navy Background */}
			  <h2 className="text-3xl font-black font-serif leading-tight text-[#d4af37]">
				{isAr ? "أوبيريكس للحلول المتكاملة" : "OPERIX Solutions"}
			  </h2>
			  <p className="text-sm text-slate-300 font-medium leading-relaxed">
				{isAr 
				  ? "مركز القيادة الرئيسي الذي يوفر بنية تحتية تشغيلية شاملة، وأنظمة إدارة الموارد البشرية، والمصفوفات الطبية، والأنظمة المالية للمنشآت الكبرى."
				  : "The central command core providing comprehensive operational infrastructure, human capital management, healthcare matrices, and financial integrations for large-scale enterprise deployments."}
			  </p>
			</div>
		  </div>

		  {/* Card 2: OPERIX 249 (Sudan Branch) */}
		  <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 min-h-[450px] flex flex-col justify-end group bg-[#0a111a]">
			<div 
			  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105 opacity-90"
			  style={{ backgroundImage: 'url(/projects/opx-sud.jpeg)' }}
			></div>
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/60 to-transparent z-10"></div>
			
			<div className="relative z-20 p-8 md:p-10 text-white space-y-4 mt-auto">
			  <div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
				  <Globe size={16} /> {isAr ? "الذراع الإقليمي" : "Regional Division"}
				</div>
				<div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest border border-white/20">
				  <MapPin size={12} className="text-[#d4af37]" /> Khartoum, SD
				</div>
			  </div>
			  {/* Pure Gold Text to stand out against Dark Navy Background */}
			  <h2 className="text-3xl font-black font-serif leading-tight text-[#d4af37] drop-shadow-md">
				{isAr ? "أوبيريكس 249" : "OPERIX 249"}
			  </h2>
			  <p className="text-sm text-slate-200 font-medium leading-relaxed drop-shadow-md">
				{isAr 
				  ? "الفرع الاستراتيجي في السودان، يقدم حلولاً رقمية مخصصة للقطاع التجاري والصناعي، مع هندسة تقنية متطورة لدعم التحول الرقمي الإقليمي."
				  : "Our strategic regional hub delivering tailored digital solutions, industry-specific architectures, and customized tech deployments across the rapidly evolving Sudanese commercial sector."}
			  </p>
			</div>
		  </div>

		</div>

		{/* ─── GENESIS CORE ─── */}
		<div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-12 items-center">
		  <div className="space-y-6">
			<h2 className="text-3xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			  {isAr ? `بداية فكرة أوبيريكس وحوكمة الأنظمة` : `The Architectural Foundations of ${companyName}`}
			</h2>
			<p className="text-slate-600 text-sm leading-relaxed font-medium">
			  {isAr
				? `${companyName} تأسست لتعمل كمركز رقمي موحد ومترابط يدمج لوحات التحكم التشغيلية والميدانية والطبية والمالية للمنشآت في مكان واحد. تهدف المنظومة إلى سد الثغرات الهيكلية في الشركات، وتحسين الإنتاجية، وتنمية الأرباح الإجمالية عبر أتمتة كاملة تمنع أي هدر أو خسائر مادية.`
				: `${companyName} coordinates enterprise workflows, remote field crews, and financial modules into a single synchronized framework. Built to replace fragmented legacy methods, our architecture systematically locks down structural loopholes, secures tracking logic across multi-tenant workspaces, and maximizes overall profitability.`}
			</p>
		  </div>
		  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 space-y-6 shadow-inner">
			<div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
			  <div className="w-10 h-10 bg-[#1e2d40] rounded-lg flex items-center justify-center text-[#d4af37]"><Cpu size={20}/></div>
			  <div>
				<div className="text-[9px] font-black uppercase text-slate-400">System Core</div>
				<div className="text-sm font-black text-[#1e2d40]">Centralized Data Processing</div>
			  </div>
			</div>
			<div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm ml-8">
			  <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center text-white"><ShieldCheck size={20}/></div>
			  <div>
				<div className="text-[9px] font-black uppercase text-slate-400">Security Protocol</div>
				<div className="text-sm font-black text-[#1e2d40]">Role-Based Access Control</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* ─── CO-FOUNDER CORE ─── */}
		<div className="bg-[#1e2d40] text-white rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-10 items-center shadow-xl border border-slate-800">
		  <div className="md:col-span-2 space-y-4">
			<h2 className="text-3xl font-black font-serif text-[#d4af37]">
			  {isAr ? "الملف الهندسي للمؤسس الشريك" : "Co-Founder Engineering Matrix"}
			</h2>
			<p className="text-slate-300 text-sm leading-relaxed font-medium">
			  {isAr 
				? `تم ابتكار وتصميم ركائز ${companyName} برؤية استراتيجية من المؤسس الشريك عاصم الجمعان، عبر هندسة لوحات تحكم تشغيلية متطورة مصممة خصيصاً للحد من الخسائر التشغيلية وتعظيم العوائد.`
				: `${companyName} was engineered under the strategic direction of Co-Founder Asim Aljma'an, deploying custom cloud architectures, telemetry modules, and centralized workforce orchestration boards to enforce operational security.`}
			</p>
			<a href="https://aljmaan.dpdns.org/portfolio-AsimAljmaan/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black uppercase text-[#d4af37] hover:text-white transition-colors mt-2">
			  {isAr ? "استعراض السيرة الكاملة للمؤسس" : "Review Comprehensive Founder Portfolio"} <ExternalLink size={14} />
			</a>
		  </div>
		  <div className="bg-[#151c28] rounded-2xl p-8 text-center border border-slate-700 shadow-inner">
			<div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ecosystem Reliability</div>
			<div className="text-5xl font-black text-[#d4af37] my-2 font-mono">99.9%</div>
			<div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Live Sync Uptime</div>
		  </div>
		</div>

	  </div>
	</div>
  );
}