import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Eye, Globe, Target, Cpu, ShieldCheck, 
  TrendingUp, Scale, KeyRound, Infinity, 
  Activity, Rocket, MapPin 
} from 'lucide-react';

/* ── Reveal Animation Hook ───────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -30px 0px' }
	);
	io.observe(el);
	return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children, style = {}, ...rest }) {
  const [ref, visible] = useReveal();
  return (
	<Tag ref={ref} className={className} style={{
	  opacity: visible ? 1 : 0,
	  transform: visible ? 'translateY(0)' : 'translateY(30px)',
	  transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform', ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

export default function Vision() {
  const { isAr } = useLanguage();

  // ─── UNIFIED TOUCH & HOVER STATE ENGINE ───
  const [activeEntity, setActiveEntity] = useState(null);

  const handleInteraction = (id) => setActiveEntity(id);
  const clearInteraction = () => setActiveEntity(null);
  const toggleInteraction = (id) => setActiveEntity(prev => prev === id ? null : id);

  // ─── DATA ───
  const philosophies = [
	{
	  title: isAr ? "الدائرة المتكاملة" : "The Integrated Circle",
	  subtitle: isAr ? "نهاية منحنيات التعلم" : "Zero-Learning-Curve Ecosystems",
	  founder: isAr ? "عاصم الجمعان" : "Asim Aljma'an",
	  founderRole: isAr ? "الرؤية التأسيسية" : "THE ORIGIN VISION",
	  initials: "AA",
	  icon: <Infinity size={32} strokeWidth={1.5} />,
	  desc: isAr
		? "نحن نؤمن بأن الأنظمة المعقدة لا يجب أن تكون صعبة الاستخدام. رؤيتنا هي بناء بيئة تشغيلية بديهية لدرجة أن أي شخص يمكنه استخدامها، مما يقضي تماماً على صعوبة تعلم الأنظمة القديمة. كل ما تحتاجه موجود في دائرة واحدة مترابطة."
		: "We believe complex systems shouldn't require complex training. Our vision is to build an ERP ecosystem so intuitive that learning curves disappear. A fully integrated circle where whatever you need is already inside, interconnected, and instantly usable.",
	  color: "text-[#d4af37]",
	  bgColor: "bg-[#d4af37]/10"
	},
	{
	  title: isAr ? "عقيدة الصمود" : "The Resilience Creed",
	  subtitle: isAr ? "الابتكار وقت الأزمات" : "Evolution Through Adversity",
	  founder: isAr ? "مصطفى عبدالله" : "Mustafa Abdullah",
	  founderRole: isAr ? "المبدأ التشغيلي" : "THE RESILIENCE CREED",
	  initials: "MA",
	  icon: <Activity size={32} strokeWidth={1.5} />,
	  desc: isAr
		? "الظروف الصعبة لا تمنع التطور بل تجعل الحاجة إليه أكبر. عندما تتوقف العمليات ويصبح الاستسلام هو الخيار الأسهل، نحن نبني الأدوات التي تساعد المؤسسات على الاستمرار في المضي قدماً مهما كانت التحديات."
		: "Difficult conditions don't prevent evolution—they amplify the need for it. When operations halt and giving up becomes the easiest option, we build the technical tools that keep enterprises moving forward, no matter the challenges.",
	  color: "text-[#1e2d40]",
	  bgColor: "bg-[#1e2d40]/10"
	}
  ];

  const hqData = [
	{
	  city: isAr ? "الرياض، المملكة العربية السعودية" : "Riyadh, KSA",
	  title: isAr ? "المقر العالمي" : "GLOBAL HEADQUARTERS",
	  entity: "OPERIX Solutions",
	  desc: isAr 
		? "مركز القيادة الرئيسي الذي يوفر بنية تحتية تشغيلية شاملة، وإدارة رأس المال البشري، والتكاملات المالية." 
		: "The central command core providing comprehensive operational infrastructure, human capital management, and financial integrations.",
	  icon: <Globe size={24} strokeWidth={1.5} />,
	  badgeColor: "bg-[#1e2d40]",
	  iconColor: "text-white"
	},
	{
	  city: isAr ? "الخرطوم، السودان" : "Khartoum, SD",
	  title: isAr ? "الفرع الإقليمي" : "REGIONAL DIVISION",
	  entity: "OPERIX 249",
	  desc: isAr 
		? "مركزنا الإقليمي الاستراتيجي لتقديم حلول رقمية مخصصة وبنى تحتية تقنية عبر السودان." 
		: "Our strategic regional hub delivering tailored digital solutions and industry-specific architectures across Sudan.",
	  icon: <Target size={24} strokeWidth={1.5} />,
	  badgeColor: "bg-[#009A66]",
	  iconColor: "text-white"
	}
  ];

  const pillars = [
	{
	  icon: <Cpu size={26} strokeWidth={1.5} />,
	  title: isAr ? "الأنظمة الموحدة" : "Unified Ecosystems",
	  desc: isAr 
		? "دمج الموارد البشرية، والعمليات، والرعاية الصحية في مركز تحكم رقمي واحد." 
		: "Fusing HR, operations, and healthcare into a singular, intelligent digital command core."
	},
	{
	  icon: <ShieldCheck size={26} strokeWidth={1.5} />,
	  title: isAr ? "سيادة البيانات المحلية" : "National Data Sovereignty",
	  desc: isAr 
		? "تستضاف جميع البيانات حصرياً داخل خوادم المملكة العربية السعودية، بتوافق تام مع متطلبات (NCA)." 
		: "All records are hosted exclusively on classified servers within Saudi Arabia, strictly complying with NCA mandates."
	},
	{
	  icon: <Scale size={26} strokeWidth={1.5} />,
	  title: isAr ? "الامتثال التنظيمي" : "Regulatory Compliance",
	  desc: isAr 
		? "تكامل هيكلي مباشر مع المرحلة الثانية لـ ZATCA، ونظام حماية الأجور (WPS)، ومنصات مقيم وقوى." 
		: "Structural alignment with ZATCA Phase 2, Wage Protection System (WPS), and real-time Muqeem & Qiwa integration."
	},
	{
	  icon: <KeyRound size={26} strokeWidth={1.5} />,
	  title: isAr ? "بنية انعدام الثقة (BYOK)" : "Zero-Trust BYOK",
	  desc: isAr 
		? "المنشأة تمتلك مفاتيح API الخاصة بها بالكامل. أوبيريكس لا تحتفظ بأي بيانات اعتماد حكومية أو بيومترية." 
		: "The enterprise retains complete autonomy over its API credentials. OPERIX stores zero government or biometric keys."
	},
	{
	  icon: <TrendingUp size={26} strokeWidth={1.5} />,
	  title: isAr ? "النمو المستدام" : "Sustainable Scaling",
	  desc: isAr 
		? "بناء بنية تحتية تقنية تتكيف وتتوسع بسلاسة مع طموحات مؤسستك." 
		: "Architecting infrastructure that adapts and scales flawlessly with your enterprise ambitions."
	},
	{
	  icon: <Activity size={26} strokeWidth={1.5} />,
	  title: isAr ? "ضمان الاستمرارية" : "Absolute Resilience",
	  desc: isAr 
		? "التزام بنسبة استقرار 99.9% (SLA) مع تشفير AES-256 لحماية العمليات في أصعب الظروف." 
		: "A guaranteed 99.9% SLA uptime, backed by AES-256 encryption, ensuring operations survive any condition."
	}
  ];

  return (
	<div className={`w-full min-h-screen bg-[#f8fafc] text-[#1e2d40] overflow-hidden ${isAr ? "font-['Cairo','Tajawal',sans-serif]" : "font-sans"}`}>
	  
	  <style>{`
		@keyframes floatGlowDark {
		  0%, 100% { transform: translateY(0) scale(1); opacity: 0.15; }
		  50%       { transform: translateY(-20px) scale(1.05); opacity: 0.25; }
		}
	  `}</style>

	  {/* ─── HERO SECTION ─────────────────────────── */}
	  <div className="relative pt-32 pb-24 bg-[#1e2d40] border-b-4 border-[#d4af37] overflow-hidden">
		<div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#d4af37] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ animation: 'floatGlowDark 8s ease-in-out infinite' }} />
		
		<div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
		  <Reveal>
			<div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-[#d4af37] bg-[#d4af37]/10 px-4 py-2 rounded-full border border-[#d4af37]/30 mb-6">
			  <Eye size={14} />
			  {isAr ? "رؤيتنا" : "Our Vision"}
			</div>
		  </Reveal>
		  
		  <Reveal delay={150}>
			<h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
			  {isAr ? (
				<>نحن لا نبني برمجيات،<br/>نحن نبني <span className="text-[#d4af37]">أدوات للصمود.</span></>
			  ) : (
				<>We don't just build software,<br/>we build <span className="text-[#d4af37]">tools for resilience.</span></>
			  )}
			</h1>
		  </Reveal>
		  
		  <Reveal delay={300}>
			<p className="text-base md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
			  {isAr
				? "رؤيتنا هي تمكين المؤسسات عبر الشرق الأوسط وأفريقيا من خلال بنية تحتية رقمية تضمن التفوق التشغيلي والامتثال التنظيمي الصارم."
				: "Our vision is to empower organizations across the MENA region with digital infrastructure that guarantees operational supremacy and strict regulatory compliance."}
			</p>
		  </Reveal>
		</div>
	  </div>

	  {/* ─── THE GUIDING PHILOSOPHIES (TOUCH OPTIMIZED) ────────── */}
	  <div className="max-w-7xl mx-auto px-4 py-24">
		<Reveal>
		  <div className="text-center mb-16">
			<h2 className="text-3xl md:text-5xl font-black text-[#1e2d40] mb-4 tracking-tight">
			  {isAr ? "الفلسفة الأساسية" : "Core Philosophies"}
			</h2>
			<div className="w-16 h-1.5 bg-[#d4af37] mx-auto rounded-full" />
		  </div>
		</Reveal>

		<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
		  {philosophies.map((phil, idx) => {
			const isActive = activeEntity === `phil-${idx}`;
			return (
			  <Reveal key={idx} delay={idx * 200}>
				<div 
				  onMouseEnter={() => handleInteraction(`phil-${idx}`)}
				  onMouseLeave={clearInteraction}
				  onClick={() => toggleInteraction(`phil-${idx}`)}
				  className={`bg-white border rounded-3xl p-10 h-full flex flex-col relative overflow-hidden cursor-pointer transition-all duration-500
					${isActive ? 'shadow-[0_20px_40px_rgba(212,175,55,0.15)] border-[#d4af37]/60 -translate-y-2' : 'shadow-sm border-slate-200'}
				  `}
				>
				  {/* Subtle Background Glow on Active/Touch */}
				  <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0'}`} 
					   style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%)' }} />

				  <div className={`w-16 h-16 rounded-2xl ${phil.bgColor} ${phil.color} flex items-center justify-center mb-8 transition-transform duration-500 ease-out
					${isActive ? 'scale-110' : 'scale-100'}
				  `}>
					{phil.icon}
				  </div>
				  
				  <h4 className={`text-[11px] font-black uppercase tracking-widest mb-2 ${phil.color}`}>
					{phil.subtitle}
				  </h4>
				  <h3 className="text-3xl font-black text-[#1e2d40] mb-4 relative z-10">
					{phil.title}
				  </h3>
				  <p className="text-slate-500 font-medium leading-relaxed text-lg flex-grow mb-10 relative z-10">
					{phil.desc}
				  </p>

				  <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between relative z-10">
					<div>
					  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
						{phil.founderRole}
					  </div>
					  <div className="text-sm font-bold text-[#1e2d40]">
						{phil.founder}
					  </div>
					</div>
					<div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1e2d40] font-black text-xs shadow-sm">
					  {phil.initials}
					</div>
				  </div>
				</div>
			  </Reveal>
			);
		  })}
		</div>
	  </div>

	  {/* ─── GLOBAL NODES (TOUCH OPTIMIZED) ────────────────────── */}
	  <div className="bg-white py-24 border-y border-slate-200">
		<div className="max-w-7xl mx-auto px-4">
		  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
			{hqData.map((hq, idx) => {
			  const isActive = activeEntity === `hq-${idx}`;
			  return (
				<Reveal key={idx} delay={idx * 200}>
				  <div 
					onMouseEnter={() => handleInteraction(`hq-${idx}`)}
					onMouseLeave={clearInteraction}
					onClick={() => toggleInteraction(`hq-${idx}`)}
					className={`bg-[#f8fafc] border rounded-3xl p-8 cursor-pointer transition-all duration-500
					  ${isActive ? 'shadow-lg border-[#d4af37]/50 -translate-y-1 bg-white' : 'shadow-sm border-slate-200'}
					`}
				  >
					<div className="flex items-start justify-between mb-8">
					  <div>
						<div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{hq.title}</div>
						<h3 className="text-2xl font-black text-[#1e2d40]">{hq.entity}</h3>
					  </div>
					  <div className={`w-12 h-12 rounded-2xl ${hq.badgeColor} ${hq.iconColor} flex items-center justify-center transition-all duration-500
						${isActive ? 'scale-110 shadow-md' : 'shadow-sm'}
					  `}>
						{hq.icon}
					  </div>
					</div>
					
					<p className="text-slate-600 font-medium leading-relaxed mb-8 h-20">
					  {hq.desc}
					</p>
					
					<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
					  <MapPin size={14} className="text-[#d4af37]" />
					  {hq.city}
					</div>
				  </div>
				</Reveal>
			  );
			})}
		  </div>
		</div>
	  </div>

	  {/* ─── PILLARS GRID (TOUCH OPTIMIZED) ────────────────────── */}
	  <div className="py-24">
		<div className="max-w-7xl mx-auto px-4">
		  <Reveal>
			<div className="text-center mb-16">
			  <h2 className="text-3xl md:text-5xl font-black text-[#1e2d40] mb-4 tracking-tight">
				{isAr ? "عقيدة التشغيل" : "Operational Creed"}
			  </h2>
			  <div className="w-16 h-1.5 bg-[#d4af37] mx-auto rounded-full" />
			</div>
		  </Reveal>

		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
			{pillars.map((pillar, idx) => {
			  const isActive = activeEntity === `pillar-${idx}`;
			  return (
				<Reveal key={idx} delay={idx * 100}>
				  <div 
					onMouseEnter={() => handleInteraction(`pillar-${idx}`)}
					onMouseLeave={clearInteraction}
					onClick={() => toggleInteraction(`pillar-${idx}`)}
					className={`bg-white p-8 rounded-2xl border cursor-pointer h-full flex flex-col transition-all duration-500 ease-out
					  ${isActive ? 'border-[#d4af37]/50 shadow-[0_15px_35px_rgba(212,175,55,0.15)] -translate-y-1.5' : 'border-slate-200 shadow-sm'}
					`}
				  >
					<div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ease-out
					  ${isActive ? 'bg-[#d4af37] text-white shadow-lg scale-110 -rotate-3' : 'bg-[#d4af37]/10 text-[#d4af37]'}
					`}>
					  {pillar.icon}
					</div>
					<h3 className="text-lg font-bold text-[#1e2d40] mb-3">{pillar.title}</h3>
					<p className="text-slate-500 text-sm leading-relaxed font-medium flex-grow">
					  {pillar.desc}
					</p>
				  </div>
				</Reveal>
			  );
			})}
		  </div>
		</div>
	  </div>

	  {/* ─── CTA SECTION ───────────────────────────────────────── */}
	  <Reveal>
		<div className="py-24 text-center px-4 bg-white border-t border-slate-200">
		  <h2 className="text-3xl md:text-4xl font-black text-[#1e2d40] mb-6">
			{isAr ? "لنبنِ المستقبل معاً" : "Ready to Build the Future?"}
		  </h2>
		  <p className="text-slate-500 font-medium mb-10 max-w-2xl mx-auto">
			{isAr 
			  ? "مهما كانت التحديات التي تواجه منشأتك، نحن هنا لتوفير الأدوات التي تحتاجها للنجاح." 
			  : "Whatever challenges your enterprise faces, we are here to provide the tools you need to succeed."}
		  </p>
		  <a href="/contact" className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#eab308] text-[#1e2d40] px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all hover:-translate-y-1 shadow-md hover:shadow-xl">
			{isAr ? "تواصل معنا اليوم" : "Connect With Us Today"}
			<Rocket size={18} />
		  </a>
		</div>
	  </Reveal>
	</div>
  );
}