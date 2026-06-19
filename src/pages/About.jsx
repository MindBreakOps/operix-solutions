import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, Globe, MapPin, Building2, 
  ArrowUpRight, Zap, ExternalLink, Code2, Package
} from 'lucide-react';

/* ── Phosphor SVG Icons ──────────────────────────────────────── */
const PhEnvelope = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path></svg>
);
const PhGlobe = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM40.37,128a88.1,88.1,0,0,1,16.27-50.64C66.19,81.18,79.91,85,95.9,86.68A279,279,0,0,0,89,128a279,279,0,0,0,6.86,41.32c-16-.27-29.74-4.14-39.29-9.35A88.1,88.1,0,0,1,40.37,128ZM128,215.6c-13.84-18.17-23-45.34-23-71.6h46C151,170.26,141.84,197.43,128,215.6Zm0-175.2c13.84,18.17,23,45.34,23,71.6h-46C105,85.74,114.16,58.57,128,40.4ZM106.77,44.59c12.2-6,28.84-2,42.46,4.56A87.9,87.9,0,0,1,199.36,97.35c-9.55,5.21-23.32,9.08-39.29,9.35A279,279,0,0,0,153,65.38C137,63.74,123.31,59.87,113.76,54.65C110.89,51.86,108.43,48.51,106.77,44.59ZM160.1,169.32c-16,.27-29.74,4.14-39.29,9.35a87.9,87.9,0,0,1-42.46,48.2c1.66-3.92,4.12-7.27,6.95-10.06,9.55-5.21,23.32-9.08,39.29-9.35A279,279,0,0,0,153,190.62C156.45,183.74,158.55,176.62,160.1,169.32Zm39.26-62.64A279,279,0,0,0,192.5,65.38C208.5,67,222.19,70.89,231.74,76.1A88.1,88.1,0,0,1,215.63,128a88.1,88.1,0,0,1-16.27,50.64c-9.55-5.21-23.24-9.08-39.26-10.72A279,279,0,0,0,199.36,106.68Z"></path></svg>
);

/* ── Reveal hook ─────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -40px 0px' }
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
	  transform: visible ? 'translateY(0)' : 'translateY(26px)',
	  transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform',
	  ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

/* ── Animated counter ────────────────────────────────────────── */
function Counter({ target, suffix = '', duration = 1600 }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
	if (!visible) return;
	let start = null;
	const step = (ts) => {
	  if (!start) start = ts;
	  const p = Math.min((ts - start) / duration, 1);
	  setVal(Math.floor(p * target));
	  if (p < 1) requestAnimationFrame(step);
	  else setVal(target);
	};
	requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Founder card ────────────────────────────────────────────── */
function FounderCard({ name, nameAr, role, roleAr, initials, quote, quoteAr, dark, isAr, email, portfolio }) {
  return (
	<div className={`relative rounded-2xl p-7 md:p-8 overflow-hidden group transition-all duration-300 active:scale-[0.98] lg:hover:scale-[1.02] flex flex-col h-full ${dark ? 'bg-[#1e2d40] border border-slate-700 hover:shadow-xl hover:shadow-[#1e2d40]/20' : 'bg-white border border-slate-200 shadow-sm hover:shadow-xl active:shadow-inner'}`}>
	  <div className={`absolute -top-2 -right-2 text-[9rem] leading-none font-serif pointer-events-none select-none transition-all duration-500 group-hover:scale-110 ${dark ? 'text-white/[0.04]' : 'text-[#d4af37]/[0.07]'}`}>
		"
	  </div>

	  <div className={`inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest w-max mb-5 ${dark ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
		{isAr ? (dark ? "عقيدة التحدي والإصرار" : "رؤية التأسيس") : (dark ? "The Resilience Creed" : "The Origin Vision")}
	  </div>

	  <p className={`text-[13px] leading-loose font-medium mb-6 flex-grow ${dark ? 'text-slate-300 italic' : 'text-slate-600'}`}
		style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
		{isAr ? quoteAr : quote}
	  </p>

	  <div className={`flex items-center justify-between border-t pt-5 ${dark ? 'border-slate-700' : 'border-slate-100'}`}
		style={{ direction: isAr ? 'rtl' : 'ltr' }}>
		<div className="flex items-center gap-3">
		  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs shadow-inner flex-shrink-0 ${dark ? 'bg-white text-[#1e2d40]' : 'bg-[#1e2d40] text-[#d4af37]'}`}>
			{initials}
		  </div>
		  <div>
			<div className={`text-xs font-black ${dark ? 'text-white' : 'text-[#1e2d40]'}`}>
			  {isAr ? nameAr : name}
			</div>
			<div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
			  {isAr ? roleAr : role}
			</div>
		  </div>
		</div>
		
		<div className="flex items-center gap-1.5" style={{ direction: 'ltr' }}>
		  {portfolio && (
			<a href={portfolio} target="_blank" rel="noreferrer" title="Engineering Portfolio" className={`p-2 rounded-lg transition-all active:scale-95 ${dark ? 'bg-white/10 text-white hover:bg-[#d4af37] hover:text-[#1e2d40]' : 'bg-slate-100 text-slate-600 hover:bg-[#1e2d40] hover:text-[#d4af37]'}`}>
			  <PhGlobe size={16} />
			</a>
		  )}
		  {email && (
			<a href={`mailto:${email}`} title="Contact Email" className={`p-2 rounded-lg transition-all active:scale-95 ${dark ? 'bg-white/10 text-white hover:bg-[#d4af37] hover:text-[#1e2d40]' : 'bg-slate-100 text-slate-600 hover:bg-[#1e2d40] hover:text-[#d4af37]'}`}>
			  <PhEnvelope size={16} />
			</a>
		  )}
		</div>
	  </div>
	</div>
  );
}

export default function About() {
  const { isAr } = useLanguage();
  const [activeProductCard, setActiveProductCard] = useState(null); // Added for project cards touch state
  const companyName = "OPERIX SOLUTIONS";

  const stats = [
	{ val: 9, suffix: '', label: isAr ? 'وحدة مترابطة' : 'Integrated Modules', sub: isAr ? 'منظومة واحدة' : 'One ecosystem' },
	{ val: 99.9, suffix: '%', label: isAr ? 'وقت التشغيل' : 'Uptime SLA', sub: isAr ? 'تزامن مباشر' : 'Live sync' },
	{ val: 41, suffix: '+', label: isAr ? 'مشروع مكتمل' : 'Projects Completed', sub: isAr ? 'إقليمياً' : 'Regionally' },
  ];

  const pillars = [
	{
	  icon: <ShieldCheck size={20} />,
	  title: isAr ? 'أمان مؤسسي' : 'Enterprise Security',
	  desc: isAr ? 'بنية مصادقة متكاملة مع صلاحيات قائمة على الأدوار.' : 'Full authentication architecture with role-based access control.'
	},
	{
	  icon: <Zap size={20} />,
	  title: isAr ? 'تزامن فوري' : 'Real-time Sync',
	  desc: isAr ? 'قاعدة بيانات مباشرة مع تدفقات الأحداث الفورية.' : 'Live event streams and zero-latency database updates.'
	},
	{
	  icon: <Globe size={20} />,
	  title: isAr ? 'توسع عالمي' : 'Global Scale',
	  desc: isAr ? 'منصة مبنية للنشر الإقليمي من الرياض إلى الخرطوم.' : 'Built for regional deployment spanning Saudi Arabia, Sudan, and beyond.'
	},
  ];

  const operix249Projects = [
	{
	  id: 'esnad',
	  img: '/projects/aba.png',
	  title: isAr ? 'عبدالله بن عباس' : 'Abdullah Bin Abbas',
	  tag: isAr ? 'نظام إسناد' : 'Esnad System',
	  desc: isAr ? 'منصة رقمية متكاملة لإدارة مراكز تحفيظ القرآن الكريم والحلقات التعليمية، تشمل الحضور والاختبارات والإدارة المالية.' : 'Integrated digital platform for educational centers, managing attendance, testing, certification, and finances.',
	  link: 'https://www.sudan.operix-solutions.com/projects/esnad'
	},
	{
	  id: 'shifa',
	  img: '/projects/logo.jpg',
	  title: isAr ? 'أوبيريكس للرعاية الصحية' : 'OPERIX Health Care',
	  tag: isAr ? 'نظام شفاء' : 'Shifa System',
	  desc: isAr ? 'نظام طبي متكامل لإدارة المستشفيات والعيادات والمختبرات والصيدليات والملفات الطبية الإلكترونية.' : 'Comprehensive medical system managing hospitals, clinics, labs, pharmacies, and Electronic Medical Records.',
	  link: 'https://www.care.operix-solutions.online/'
	},
	{
	  id: 'hashd',
	  img: '/projects/nas.png',
	  title: isAr ? 'المجتمع الرقمي' : 'Community Hub',
	  tag: isAr ? 'نظام حشد' : 'Hashd System',
	  desc: isAr ? 'منصة رقمية لإحصاء السكان وإدارة شؤون الأحياء السكنية، تساعد لجان الخدمات على التوزيع العادل واتخاذ القرار.' : 'Digital census and community management platform helping service committees with fair distribution and data intelligence.',
	  link: 'https://www.sudan.operix-solutions.com/projects/hashd'
	}
  ];

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

	  <style>{`
		@keyframes floatGlow {
		  0%, 100% { transform: translateY(0) scale(1); opacity: 0.1; }
		  50%       { transform: translateY(-18px) scale(1.04); opacity: 0.16; }
		}
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(28px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		.loc-chip { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		@media (hover: hover) {
		  .loc-chip:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30,45,64,0.12); }
		  .pillar-card:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(30,45,64,0.1); }
		  .img-card:hover .img-inner { transform: scale(1.04); }
		}
		.pillar-card { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
		.hero-tag { animation: fadeSlideUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
		.hero-h1  { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
		.hero-p   { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
		.img-card { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
		.img-inner { transition: transform 0.6s cubic-bezier(0.22,1,0.36,1); }
	  `}</style>

	  {/* ── HERO (Updated to Dark Blue) ──────────────────────────── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-slate-700">
		<div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[360px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af3720 0%, transparent 70%)', animation: 'floatGlow 8s ease-in-out infinite' }} />

		<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
		  <span className="hero-tag inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 mb-5">
			{isAr ? "تاريخ التأسيس والمنظومة" : "Corporate Profile & Inception"}
		  </span>
		  <h1 className="hero-h1 text-3xl md:text-4xl lg:text-5xl font-black tracking-tight font-serif text-white max-w-3xl mx-auto leading-tight mb-5">
			{isAr ? "هندسة أنظمة تشغيلية عالية الكفاءة" : "Architecting High-Yield Operational Ecosystems"}
		  </h1>
		  <p className="hero-p text-slate-300 text-sm md:text-base leading-relaxed font-medium max-w-2xl mx-auto">
			{isAr
			  ? `نحن في ${companyName} نبني البنية التحتية التشغيلية التي تدير أصولك وموظفيك الميدانيين بدقة متناهية.`
			  : `${companyName} structures unified data control architectures engineered to synchronize remote deployments, track workforce operations, and lock down asset matrices.`}
		  </p>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">

		{/* ── STAT BAR ─────────────────────────────────────────── */}
		<Reveal>
		  <div className="grid grid-cols-3 gap-4 bg-[#1e2d40] rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-lg border border-slate-700/50">
			<div className="absolute inset-0 pointer-events-none"
			  style={{ background: 'radial-gradient(ellipse at 50% 0%, #d4af3712 0%, transparent 60%)' }} />
			{stats.map((s, i) => (
			  <div key={i} className={`flex flex-col items-center text-center relative z-10 ${i > 0 ? 'border-l border-slate-700' : ''}`}>
				<span className="text-3xl md:text-4xl font-black text-[#d4af37] tabular-nums">
				  <Counter target={s.val} suffix={s.suffix} />
				</span>
				<span className="text-[11px] font-black text-white uppercase tracking-widest mt-1">{s.label}</span>
				<span className="text-[10px] text-slate-500 font-medium mt-0.5">{s.sub}</span>
			  </div>
			))}
		  </div>
		</Reveal>

		{/* ── HQ PRESENCE ──────────────────────────────────────── */}
		<div>
		  <Reveal className="mb-6">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-1">
			  {isAr ? "الحضور العالمي" : "Global Presence"}
			</span>
			<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
			  {isAr ? "مقراتنا التشغيلية" : "Our Operational Headquarters"}
			</h2>
		  </Reveal>

		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
			{/* Card 1: OPERIX Solutions KSA */}
			<Reveal delay={60}>
			  <div className="img-card relative w-full rounded-2xl overflow-hidden border border-slate-200 min-h-[320px] flex flex-col justify-end shadow-sm cursor-pointer transition-all active:scale-[0.98]">
				<div className="img-inner absolute inset-0 bg-[#1e2d40] bg-cover bg-center bg-no-repeat opacity-90"
				  style={{ backgroundImage: 'url(/projects/operix-bg.jpg)' }} />
				<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/80 to-transparent" />
				<div className="relative z-10 p-7 text-white space-y-3">
				  <div className="flex items-center justify-between flex-wrap gap-2">
					<span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
					  <Building2 size={13} /> {isAr ? "المقر الرئيسي" : "Global Headquarters"}
					</span>
					<span className="loc-chip bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold border border-white/15">
					  <MapPin size={10} className="text-[#d4af37]" /> Riyadh, KSA
					</span>
				  </div>
				  <div>
					<h2 className="text-2xl font-black font-serif text-white leading-tight mb-1">
					  {isAr ? "أوبيريكس للحلول المتكاملة" : "OPERIX Solutions"}
					</h2>
					<p className="text-xs text-slate-300 font-medium leading-relaxed max-w-sm">
					  {isAr
						? "مركز القيادة الرئيسي يوفر بنية تحتية تشغيلية شاملة وأنظمة إدارة الموارد البشرية والمالية."
						: "The central command core providing comprehensive operational infrastructure, human capital management, and financial integrations."}
					</p>
				  </div>
				</div>
			  </div>
			</Reveal>

			{/* Card 2: OPERIX 249 Sudan */}
			<Reveal delay={120}>
			  <div className="img-card relative w-full rounded-2xl overflow-hidden border border-slate-200 min-h-[320px] flex flex-col justify-end shadow-sm cursor-pointer transition-all active:scale-[0.98]">
				<div className="img-inner absolute inset-0 bg-[#1e2d40] bg-cover bg-center bg-no-repeat opacity-90"
				  style={{ backgroundImage: 'url(/projects/opx-sud.jpeg)' }} />
				<div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/90 to-transparent" />
				<div className="relative z-10 p-7 text-white space-y-3">
				  <div className="flex items-center justify-between flex-wrap gap-2">
					<span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
					  <Globe size={13} /> {isAr ? "الذراع الإقليمي" : "Regional Division"}
					</span>
					<span className="loc-chip bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold border border-white/15">
					  <MapPin size={10} className="text-[#d4af37]" /> Khartoum, SD
					</span>
				  </div>
				  <div>
					<h2 className="text-2xl font-black font-serif text-[#d4af37] leading-tight mb-1">
					  {isAr ? "أوبيريكس 249" : "OPERIX 249"}
					</h2>
					<p className="text-xs text-slate-300 font-medium leading-relaxed max-w-sm mb-4">
					  {isAr
						? "الفرع الاستراتيجي في السودان، يقدم حلولاً رقمية مخصصة للقطاع التجاري والصناعي لبناء المستقبل الرقمي."
						: "Our strategic regional hub delivering tailored digital solutions and industry-specific architectures to build Sudan's digital future."}
					</p>
					<a href="https://www.sudan.operix-solutions.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white hover:text-[#d4af37] transition-colors">
					  {isAr ? "زيارة بوابة السودان" : "Visit Sudan Portal"} <ExternalLink size={12} />
					</a>
				  </div>
				</div>
			  </div>
			</Reveal>
		  </div>
		</div>

		{/* ── FOUNDER STORIES ──────────────────────────────────── */}
		<div>
		  <Reveal className="mb-6">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-1">
			  {isAr ? "المؤسسون" : "The Founders"}
			</span>
			<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
			  {isAr ? "قصص التأسيس" : "Origin Stories"}
			</h2>
		  </Reveal>

		  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
			<Reveal delay={60}>
			  <FounderCard
				name="Asim Aljma'an" nameAr="عاصم الجمعان"
				role="Co-Founder" roleAr="المؤسس الشريك"
				initials="AA" dark={false} isAr={isAr}
				email="asim.aljmaan@operix-solutions.com"
				portfolio="https://www.operix-solutions.online/portfolio-AsimAljmaan/"
				quote="The story began during Asim's college years. He dreamt of building an ERP ecosystem so intuitive that anyone—regardless of their technical background—could understand and use it, completely eliminating the steep learning curves of legacy systems. The goal: a fully integrated circle where whatever you need is already inside, interconnected, and customizable."
				quoteAr="بدأت القصة منذ سنوات خلال دراسة عاصم الجامعية. كان يحلم ببناء منظومة ERP سهلة الاستخدام لدرجة أن أي شخص - بغض النظر عن خبرته التقنية - يمكنه فهمها واستخدامها. كان الهدف بناء دائرة متكاملة ومترابطة: كل ما تحتاجه تجده بالداخل وقابل للتخصيص."
			  />
			</Reveal>
			<Reveal delay={120}>
			  <FounderCard
				name="Mustafa Abdallah" nameAr="مصطفى عبدالله"
				role="Head Director of Operations in Sudan, & Co-Founder" roleAr="مدير العمليات في السودان والمؤسس الشريك"
				initials="MA" dark={true} isAr={isAr}
				email="mustafa.abdallah@operix-solutions.com"
				quote="We started OPERIX 249 with a simple belief: difficult conditions don't prevent evolution — they make the need for it greater than ever. We saw operations halt and ideas stall, yet people kept trying to continue. So we decided to build tools that help them move again. The strongest ideas are born when giving up becomes the easiest option, but someone decides to try anyway."
				quoteAr="بدأنا أوبيريكس 249 بإيمان بسيط: الظروف الصعبة لا تمنع التطور، بل تجعل الحاجة إليه أكبر من أي وقت مضى. رأينا الأعمال تتوقف والأفكار تتلاشى، والناس يحاولون الاستمرار رغم كل شيء. لذلك قررنا بناء أدوات تساعدهم على التحرك من جديد. أقوى الأفكار تولد عندما يصبح الاستسلام هو الخيار الأسهل، ولكن يقرر أحدهم المحاولة على أي حال."
			  />
			</Reveal>
		  </div>
		</div>

		{/* ── OPERIX 249 DEEP DIVE (Updated Grid style) ───────── */}
		<div className="border-t border-slate-200 pt-16">
		  <Reveal className="mb-10 text-center max-w-3xl mx-auto">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-md mb-4 inline-block">
			  Made in Sudan • Built for the Future
			</span>
			<h2 className="text-3xl font-black font-serif text-[#1e2d40] mb-4">
			  {isAr ? "من السودان إلي المستقبل" : "From Sudan to the Future"}
			</h2>
			<p className="text-sm text-slate-500 font-medium leading-relaxed">
			  {isAr 
				? "نحن لا ننتظر التغيير، نحن نشارك في صناعته. وسط التحديات تولد الأفكار الأقوى، ووسط المعاناة يولد الإبداع الحقيقي. نبني حلولاً رقمية تساعد الأعمال على الاستمرار والنمو." 
				: "We do not wait for change, we participate in making it. Amidst challenges, the strongest ideas are born, and true innovation emerges. We build digital solutions that help businesses persist, grow, and align with the future."}
			</p>
		  </Reveal>

		  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
			{operix249Projects.map((proj, i) => {
			  const isActive = activeProductCard === proj.id;
			  
			  return (
				<Reveal key={i} delay={i * 100}>
				  <div 
					onClick={() => setActiveProductCard(isActive ? null : proj.id)}
					className={`bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 group cursor-pointer h-full ${
					  isActive 
						? 'shadow-xl border-[#d4af37]/40 -translate-y-1' 
						: 'border-slate-200 shadow-sm hover:shadow-xl hover:border-[#d4af37]/40 hover:-translate-y-1'
					}`}
				  >
					{/* Clean Logo Container similar to Clients.jsx */}
					<div className="h-40 bg-slate-50/50 flex items-center justify-center p-8 border-b border-slate-100 relative">
					  <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#d4af37]/5 transition-opacity duration-500 pointer-events-none ${
						isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
					  }`}></div>
					  
					  <img 
						src={proj.img} 
						alt={proj.title} 
						className={`w-full h-full object-contain transition-all duration-500 relative z-10 ${
						  isActive 
							? 'grayscale-0 opacity-100 scale-110' 
							: 'filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
						}`} 
					  />
					</div>

					{/* Content Area */}
					<div className="p-6 flex flex-col flex-grow bg-white">
					  <div className="flex justify-between items-start gap-2 mb-3" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						<h3 className={`text-base font-black transition-colors ${
						  isActive ? 'text-[#d4af37]' : 'text-[#1e2d40] group-hover:text-[#d4af37]'
						}`}>
						  {proj.title}
						</h3>
						<span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded border border-slate-100 whitespace-nowrap">
						  {proj.tag}
						</span>
					  </div>
					  
					  <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-grow" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
						{proj.desc}
					  </p>
					  
					  {/* Action Link at Bottom */}
					  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
						<a href={proj.link} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
						  isActive ? 'text-[#d4af37]' : 'text-slate-400 group-hover:text-[#d4af37]'
						}`}>
						  {isAr ? "عرض تفاصيل النظام" : "View System Details"} <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
						</a>
					  </div>
					</div>
				  </div>
				</Reveal>
			  );
			})}
		  </div>
		  
		  <Reveal delay={200}>
			<div className="flex flex-wrap justify-center items-center gap-4">
			  <a href="https://www.sudan.operix-solutions.com" target="_blank" rel="noreferrer"
				className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#d4af37] text-white hover:text-[#1e2d40] px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-md active:scale-95">
				<Code2 size={15} />
				{isAr ? "اكتشف أنظمة أوبيريكس 249" : "Discover OPERIX 249 Systems"}
			  </a>
			  {/* Updated URL to use internal relative routing via React Router Link */}
			  <Link to="/products" className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#1e2d40] border border-slate-200 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95">
				<Package size={15} />
				{isAr ? "جميع منتجات أوبيريكس" : "All OPERIX Products"}
			  </Link>
			</div>
		  </Reveal>
		</div>

		{/* ── ENGINEERING PILLARS ──────────────────────────────── */}
		<div>
		  <Reveal className="mb-6">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] block mb-1">
			  {isAr ? "الركائز الهندسية" : "Engineering Pillars"}
			</span>
			<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
			  {isAr ? "مفاتيح الهندسة المعمارية" : "Core Architecture Matrix"}
			</h2>
		  </Reveal>

		  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			{pillars.map((p, i) => (
			  <Reveal key={i} delay={i * 80}>
				<div className="pillar-card bg-white border border-slate-200 rounded-2xl p-7 shadow-sm flex flex-col gap-4 h-full active:scale-[0.98] transition-all">
				  <div className="w-11 h-11 bg-[#1e2d40]/8 border border-[#1e2d40]/10 rounded-xl flex items-center justify-center text-[#1e2d40]">
					{p.icon}
				  </div>
				  <div style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
					<h3 className="text-sm font-black text-[#1e2d40] mb-1.5">{p.title}</h3>
					<p className="text-xs text-slate-500 font-medium leading-relaxed">{p.desc}</p>
				  </div>
				</div>
			  </Reveal>
			))}
		  </div>
		</div>

		{/* ── PORTFOLIO CTA BAR ────────────────────────────────── */}
		<Reveal>
		  <div className="bg-white border border-slate-200 rounded-2xl p-7 md:p-9 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
			<div className="absolute right-0 top-0 bottom-0 w-1.5 rounded-r-2xl bg-gradient-to-b from-[#d4af37] via-[#d4af37]/50 to-transparent" />

			<div className="flex-1" style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}>
			  <div className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">
				{isAr ? "السيرة الهندسية" : "Engineering Portfolio"}
			  </div>
			  <h3 className="text-xl md:text-2xl font-black font-serif text-[#1e2d40] mb-2">
				{isAr ? "الهندسة المعمارية للنظام" : "The Core Engineering Matrix"}
			  </h3>
			  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-lg">
				{isAr
				  ? `تم ابتكار ركائز ${companyName} عبر بناء لوحات تحكم تشغيلية متطورة لسد الثغرات الهيكلية وتعظيم العوائد.`
				  : `${companyName} was engineered with custom cloud architectures and centralized workforce orchestration boards to enforce operational security and maximize profitability.`}
			  </p>
			</div>

			<div className="flex flex-col items-center md:items-end gap-4 flex-shrink-0">
			  <div className="text-center">
				<div className="text-3xl font-black text-[#d4af37] tabular-nums">99.9%</div>
				<div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Live Sync Uptime</div>
			  </div>
			  <a
				href="https://www.operix-solutions.online/portfolio-AsimAljmaan/"
				target="_blank" rel="noreferrer"
				className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#d4af37] text-white hover:text-[#1e2d40] px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95 group/link"
			  >
				{isAr ? "استعراض السيرة الهندسية" : "View Founder Portfolio"}
				<ArrowUpRight size={13} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
			  </a>
			</div>
		  </div>
		</Reveal>

	  </div>
	</div>
  );
}