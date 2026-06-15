import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Cpu, Globe, ExternalLink, MapPin, Building2, Quote } from 'lucide-react';

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

		{/* ─── GLOBAL PRESENCE & ORIGIN STORIES (Two-Column Layout) ─── */}
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
		  
		  {/* COLUMN 1: HQ & ASIM'S STORY */}
		  <div className="flex flex-col gap-5">
			{/* Card 1: OPERIX Solutions */}
			<div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[300px] flex flex-col justify-end group bg-[#0a111a]">
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

			{/* Asim's Origin Story */}
			<div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex-grow relative overflow-hidden group">
			  <div className="absolute top-0 right-0 p-6 opacity-5 text-[#d4af37] group-hover:scale-110 transition-transform">
				<Quote size={80} />
			  </div>
			  <div className="relative z-10">
				<div className="inline-block bg-slate-50 text-slate-500 border border-slate-200 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-4">
				  {isAr ? "رؤية التأسيس" : "The Origin Vision"}
				</div>
				<p className="text-[13px] text-slate-600 leading-relaxed font-medium text-justify" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  {isAr 
					? "بدأت القصة منذ سنوات خلال دراسة عاصم الجامعية. كان يحلم ببناء منظومة تخطيط موارد (ERP) سهلة الاستخدام لدرجة أن أي شخص - بغض النظر عن خبرته التقنية - يمكنه فهمها واستخدامها، بعيداً عن تعقيدات الأنظمة القديمة التي تتطلب دورات وكوادر متخصصة. كان الهدف بناء دائرة متكاملة ومترابطة: كل ما تحتاجه تجده بالداخل وقابل للتخصيص. في حين لا تتجرأ معظم الشركات على توفير هذه الخصائص ظناً منها أنها 'خطط لتحديثات مستقبلية'، نحن نؤمن بأن المستخدم يحتاجها الآن. فلماذا لا نحتضن احتياجاته فوراً ولا نجعله يضطر للبحث عن الميزات في أي مكان آخر!"
					: "The story began years ago during Asim's college years. He dreamt of building an ERP ecosystem so intuitive that anyone—regardless of their technical background—could understand and use it, completely eliminating the steep learning curves and specialized training required by legacy systems. The goal was to build a fully integrated circle: whatever you need is already inside, interconnected, and highly customizable. While many companies hold back these crucial functions as 'future update plans', we know the user needs them right now. We believe in embracing the user immediately, giving them full power so they never have to look for features anywhere else."}
				</p>
				<div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  <div className="w-9 h-9 bg-[#1e2d40] rounded-full flex items-center justify-center text-[#d4af37] font-black text-xs shadow-inner">
					AA
				  </div>
				  <div>
					<div className="text-xs font-black text-[#1e2d40]">{isAr ? "عاصم الجمعان" : "Asim Aljma'an"}</div>
					<div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? "المؤسس الشريك" : "Co-Founder"}</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		  {/* COLUMN 2: SUDAN & MUSTAFA'S STORY */}
		  <div className="flex flex-col gap-5">
			{/* Card 2: OPERIX 249 */}
			<div className="relative w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[300px] flex flex-col justify-end group bg-[#0a111a]">
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

			{/* Mustafa's Origin Story */}
			<div className="bg-[#1e2d40] border border-slate-700 rounded-2xl p-6 md:p-8 shadow-sm flex-grow relative overflow-hidden group text-white">
			  <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-white group-hover:scale-110 transition-transform">
				<Quote size={80} />
			  </div>
			  <div className="relative z-10">
				<div className="inline-block bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest mb-4">
				  {isAr ? "عقيدة التحدي والإصرار" : "The Resilience Creed"}
				</div>
				<p className="text-[13px] text-slate-300 leading-relaxed font-medium italic text-justify" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  {isAr 
					? "« بدأنا أوبيريكس 249 بإيمان بسيط: الظروف الصعبة لا تمنع التطور، بل تجعل الحاجة إليه أكبر من أي وقت مضى. لقد رأينا الأعمال تتوقف والأفكار تتلاشى، والناس يحاولون الاستمرار رغم كل شيء. لذلك قررنا بناء أدوات تساعدهم على التحرك من جديد. نحن لا نؤمن بأن الابتكار يحتاج إلى بيئة مثالية. بل نؤمن بأن أقوى الأفكار تولد عندما يصبح الاستسلام هو الخيار الأسهل، ولكن يقرر أحدهم المحاولة على أي حال. »"
					: "\"We started OPERIX 249 with a simple belief: difficult conditions do not prevent evolution; they make the need for it greater than ever. We saw operations halt and ideas stall, yet people kept trying to continue despite everything. So we decided to build tools that help them move again. We don't believe innovation requires a perfect environment. Rather, we believe the strongest ideas are born when giving up becomes the easiest option, but someone decides to try anyway.\""}
				</p>
				<div className="mt-6 flex items-center gap-3 border-t border-slate-700 pt-5" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
				  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#1e2d40] font-black text-xs shadow-inner">
					MA
				  </div>
				  <div>
					<div className="text-xs font-black text-white">{isAr ? "مصطفى عبدالله" : "Mustafa Abdullah"}</div>
					<div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? "المؤسس الشريك" : "CO-FOUNDER"}</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		</div>

		{/* ─── CO-FOUNDER CORE SUMMARY ─── */}
		<div className="bg-white text-[#1e2d40] border border-slate-200 rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-8 items-center shadow-sm">
		  <div className="md:col-span-2 space-y-3">
			<h2 className="text-xl md:text-2xl font-black font-serif text-[#1e2d40]">
			  {isAr ? "الهندسة المعمارية للنظام" : "The Core Engineering Matrix"}
			</h2>
			<p className="text-slate-500 text-xs leading-relaxed font-medium">
			  {isAr 
				? `تم ابتكار وتصميم ركائز ${companyName} برؤية استراتيجية هندسية، عبر بناء لوحات تحكم تشغيلية متطورة مصممة خصيصاً لسد الثغرات الهيكلية، الحد من الخسائر الميدانية، وتعظيم العوائد للمنشآت الكبرى.`
				: `${companyName} was engineered deploying custom cloud architectures, telemetry modules, and centralized workforce orchestration boards to enforce operational security, close structural loopholes, and maximize profitability.`}
			</p>
			<a href="https://www.operix-solutions.online/portfolio-AsimAljmaan/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:text-[#eab308] transition-colors mt-2">
			  {isAr ? "استعراض السيرة الهندسية للمؤسس" : "Review Comprehensive Founder Portfolio"} <ExternalLink size={12} />
			</a>
		  </div>
		  <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 shadow-inner">
			<div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ecosystem Reliability</div>
			<div className="text-4xl font-black text-[#d4af37] my-1.5 font-mono">99.9%</div>
			<div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Live Sync Uptime</div>
		  </div>
		</div>

	  </div>
	</div>
  );
}