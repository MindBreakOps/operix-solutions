import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight, ArrowLeft, ExternalLink, Globe2, Building2, Car,
  BadgeCheck, Stethoscope, Users, Settings, FileCheck, TrendingUp, Zap
} from 'lucide-react';
import ReviewsSection from './ReviewsSection';

/* ── Shared reveal hook ───────────────────────────────────────── */
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
	  transform: visible ? 'translateY(0)' : 'translateY(28px)',
	  transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform',
	  ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

/* ── Animated number counter ─────────────────────────────────── */
function Counter({ target, duration = 1400 }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
	if (!visible || target === 0) return;
	let start = null;
	const step = (ts) => {
	  if (!start) start = ts;
	  const p = Math.min((ts - start) / duration, 1);
	  setVal(Math.floor(p * target));
	  if (p < 1) requestAnimationFrame(step);
	};
	requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

export default function Home() {
  const navigate = useNavigate();
  const { isAr } = useLanguage();

  const [hits, setHits] = useState(0);
  const [visitors, setVisitors] = useState(0);
  const [activeCountries, setActiveCountries] = useState({});
  const [mapReady, setMapReady] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const brandName = "OPERIX Solutions";

  const countryCoordinates = {
	"SA": { name: "Saudi Arabia", lat: 23.8859, lon: 45.0792 },
	"SD": { name: "Sudan", lat: 12.8628, lon: 30.2176 },
	"AE": { name: "United Arab Emirates", lat: 23.4241, lon: 53.8478 },
	"EG": { name: "Egypt", lat: 26.8206, lon: 30.8025 },
	"QA": { name: "Qatar", lat: 25.3548, lon: 51.1839 },
	"KW": { name: "Kuwait", lat: 29.3117, lon: 47.4818 },
	"BH": { name: "Bahrain", lat: 25.9304, lon: 50.6378 },
	"OM": { name: "Oman", lat: 21.4735, lon: 55.9754 },
	"JO": { name: "Jordan", lat: 30.5852, lon: 36.2384 },
	"LB": { name: "Lebanon", lat: 33.8547, lon: 35.8623 },
	"US": { name: "United States", lat: 37.0902, lon: -95.7129 },
	"GB": { name: "United Kingdom", lat: 55.3781, lon: -3.4360 },
	"IN": { name: "India", lat: 20.5937, lon: 78.9629 },
	"DE": { name: "Germany", lat: 51.1657, lon: 10.4515 },
	"FR": { name: "France", lat: 46.2276, lon: 2.2137 },
	"SG": { name: "Singapore", lat: 1.3521, lon: 103.8198 },
	"KR": { name: "South Korea", lat: 35.9078, lon: 127.7669 },
	"TR": { name: "Turkey", lat: 38.9637, lon: 35.2433 },
	"RO": { name: "Romania", lat: 45.9432, lon: 24.9668 },
	"PL": { name: "Poland", lat: 51.9194, lon: 19.1451 },
	"AD": { name: "Andorra", lat: 42.5063, lon: 1.5218 },
  };

  useEffect(() => {
	setTimeout(() => setHeroLoaded(true), 100);
	if (!document.getElementById('leaflet-css')) {
	  const link = document.createElement('link');
	  link.id = 'leaflet-css'; link.rel = 'stylesheet';
	  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
	  document.head.appendChild(link);
	}
	if (!document.getElementById('leaflet-js')) {
	  const script = document.createElement('script');
	  script.id = 'leaflet-js';
	  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
	  script.onload = () => setMapReady(true);
	  document.body.appendChild(script);
	} else if (window.L) setMapReady(true);
  }, []);

  useEffect(() => {
	async function runTelemetry() {
	  try {
		const res = await fetch('https://ipapi.co/json/');
		const d = await res.json();
		await supabase.from('operix_visitor_logs').insert([{
		  visitor_ip: d.ip || '0.0.0.0',
		  ip_country: d.country_code || 'SA',
		  page_visited: window.location.pathname
		}]);
	  } catch (e) { console.warn("Log skip:", e); }
	  try {
		const { count } = await supabase.from('operix_visitor_logs').select('*', { count: 'exact', head: true });
		if (count !== null) setHits(count);
		const { data: uc } = await supabase.rpc('get_unique_visitors');
		if (uc !== null) setVisitors(uc);
		const { data: logs } = await supabase.from('operix_visitor_logs').select('ip_country');
		if (logs) {
		  const counts = logs.reduce((acc, curr) => {
			const code = curr.ip_country ? curr.ip_country.toUpperCase() : 'UNKNOWN';
			acc[code] = (acc[code] || 0) + 1;
			return acc;
		  }, {});
		  setActiveCountries(counts);
		}
	  } catch (e) { console.error("Telemetry error:", e); }
	}
	runTelemetry();
  }, []);

  useEffect(() => {
	if (!mapReady || !window.L || Object.keys(activeCountries).length === 0 || !mapContainerRef.current || mapInstanceRef.current) return;
	const L = window.L;
	const map = L.map(mapContainerRef.current, {
	  zoomControl: false, attributionControl: false,
	  maxBounds: [[-90, -180], [90, 180]], maxBoundsViscosity: 1.0
	}).setView([24.0, 35.0], 2);
	mapInstanceRef.current = map;
	L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	  maxZoom: 18, minZoom: 2, noWrap: true
	}).addTo(map);
	Object.entries(activeCountries).forEach(([code, count]) => {
	  const coords = countryCoordinates[code];
	  if (!coords) return;
	  const r = Math.min(6 + count * 1.5, 24);
	  const circle = L.circleMarker([coords.lat, coords.lon], {
		radius: r, fillColor: '#c5a059', color: '#fff',
		weight: 1.5, opacity: 0.9, fillOpacity: 0.75
	  }).addTo(map);
	  circle.bindPopup(`<b style="color:#1e2d40">${coords.name}</b><br/><span style="color:#c5a059;font-weight:700">${count} visits</span>`);
	});
  }, [mapReady, activeCountries]);

  const ecosystems = [
	{
	  icon: <Settings size={20} />, title: 'OPERIX Operations', accentColor: '#3b82f6',
	  badge: isAr ? 'إدارة ميدانية' : 'FIELD OPS',
	  desc: isAr ? 'محور العمليات الأساسي ومراقبة الكاميرات الذكية.' : 'Core operations hub, ANPR monitoring, and gig deployment.',
	  url: 'https:///www.ops.operix-solutions.online'
	},
	{
	  icon: <Users size={20} />, title: 'OPERIX HRIS', accentColor: '#10b981',
	  badge: isAr ? 'الموارد البشرية' : 'HUMAN CAPITAL',
	  desc: isAr ? 'أتمتة الحضور عبر GPS والخدمة الذاتية للموظفين.' : 'GPS-enforced attendance, payroll automation, and self-service.',
	  url: 'https:///www.hris.operix-solutions.online'
	},
	{
	  icon: <FileCheck size={20} />, title: 'OPERIX FMIS', accentColor: '#c5a059',
	  badge: isAr ? 'معتمد من هيئة الزكاة' : 'ZATCA PHASE 2',
	  desc: isAr ? 'إدارة مالية مؤسسية متوافقة تماماً.' : 'Enterprise finance. Fully compliant. From quotes to ZATCA invoices.',
	  url: 'https://www.fmis.operix-solutions.online'
	},
	{
	  icon: <Stethoscope size={20} />, title: 'OPERIX Care', accentColor: '#f43f5e',
	  badge: isAr ? 'إدارة المستشفيات' : 'CLINICAL HIS',
	  desc: isAr ? 'منظومة الإدارة الطبية المتقدمة والتشخيص الصوتي.' : 'Advanced medical ecosystem, patient history, and voice notes.',
	  url: 'https:///www.care.operix-solutions.online'
	}
  ];

  const opCards = [
	{
	  icon: <Building2 size={22} />, color: '#1e2d40',
	  title: isAr ? "إدارة المرافق" : "Facility Management",
	  desc: isAr ? "إدارة شاملة للمرافق التجارية ومواقف السيارات الذكية." : "Comprehensive management of commercial facilities and smart parking grids."
	},
	{
	  icon: <Car size={22} />, color: '#c5a059',
	  title: isAr ? "الفالي والفعاليات" : "VIP Valet & Events",
	  desc: isAr ? "خدمات ركن السيارات لكبار الشخصيات وإدارة لوجستيات الفعاليات." : "Flawless VIP valet services and logistics management for large-scale events."
	},
	{
	  icon: <BadgeCheck size={22} />, color: '#10b981',
	  title: isAr ? "الكوادر البشرية الخبيرة" : "Expert Human Capital",
	  desc: isAr ? "فريق متكامل جاهز لإدارة العمليات الميدانية اليومية." : "Our master task force manages day-to-day field operations for unparalleled efficiency."
	}
  ];

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

	  <style>{`
		@keyframes gridPulseDark {
		  0%, 100% { opacity: 0.05; }
		  50% { opacity: 0.1; }
		}
		@keyframes floatGlow {
		  0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
		  50% { transform: translateY(-20px) scale(1.05); opacity: 0.18; }
		}
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(32px); }
		  to { opacity: 1; transform: translateY(0); }
		}
		@keyframes fadeSlideDown {
		  from { opacity: 0; transform: translateY(-16px); }
		  to { opacity: 1; transform: translateY(0); }
		}
		@keyframes ping-slow {
		  0% { transform: scale(1); opacity: 0.8; }
		  100% { transform: scale(2.2); opacity: 0; }
		}
		@keyframes shimmerGold {
		  0% { background-position: -200% center; }
		  100% { background-position: 200% center; }
		}
		.hero-tag { animation: fadeSlideDown 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
		.hero-h1  { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
		.hero-p   { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
		.hero-cta { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.5s both; }
		.hero-stats { animation: fadeSlideUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.65s both; }
		.eco-card { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
		.eco-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(30,45,64,0.12); }
		.op-card { transition: all 0.3s cubic-bezier(0.22,1,0.36,1); }
		.op-card:hover { transform: translateY(-3px); }
		.cta-btn { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(197, 160, 89, 0.35); }
		.dot-ping::after {
		  content: '';
		  position: absolute;
		  inset: 0;
		  border-radius: 50%;
		  background: #c5a059;
		  animation: ping-slow 1.8s cubic-bezier(0,0,0.2,1) infinite;
		}
		/* ── PREMIUM GOLD TEXT EFFECT ── */
		.premium-gold-text {
		  background: linear-gradient(to right, #c5a059 0%, #f3de9a 40%, #c5a059 80%);
		  background-size: 200% auto;
		  color: transparent;
		  -webkit-background-clip: text;
		  background-clip: text;
		  animation: shimmerGold 5s linear infinite;
		}
	  `}</style>

	  {/* ── HERO ─────────────────────────────────────────────────── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b border-white/10">
		<div className="absolute inset-0 pointer-events-none" style={{
		  backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
		  backgroundSize: '48px 48px',
		  animation: 'gridPulseDark 6s ease-in-out infinite',
		}} />
		
		<div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #c5a05920 0%, transparent 70%)', animation: 'floatGlow 7s ease-in-out infinite' }} />
		<div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #ffffff05 0%, transparent 70%)', animation: 'floatGlow 9s ease-in-out infinite reverse' }} />

		<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center">
		  <div className="max-w-3xl mx-auto text-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			
			{/* Tag */}
			<div className="hero-tag inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
			  <span className="relative w-2 h-2 flex-shrink-0">
				<span className="dot-ping relative inline-block w-2 h-2 bg-[#c5a059] rounded-full" />
			  </span>
			  <span className="text-[10px] font-black uppercase tracking-widest">
				{isAr ? "الجيل القادم من البنية التشغيلية" : "NEXT-GEN OPERATIONAL INFRASTRUCTURE"}
			  </span>
			</div>

			{/* H1 */}
			<h1 className="hero-h1 text-4xl md:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-[1.08] mb-5 text-white">
			  {isAr ? (
				<>تمكين المنشآت الكبرى<br />عبر <span className="premium-gold-text">{brandName}</span></>
			  ) : (
				<>Empowering Enterprises<br />with <span className="premium-gold-text">{brandName}</span></>
			  )}
			</h1>

			{/* Paragraph */}
			<p className="hero-p text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
			  {isAr
				? "نحن لا نكتفي ببناء الأنظمة الذكية فحسب، بل نوفر الكوادر الخبيرة لتشغيل وإدارة المرافق، مواقف السيارات، والفعاليات الكبرى على أرض الواقع."
				: "We don't just build intelligent systems. We deploy expert personnel to run your facilities, parking grids, and large-scale events flawlessly on the ground."}
			</p>

			{/* CTA Buttons */}
			<div className="hero-cta flex flex-wrap justify-center gap-4">
			  <button
				onClick={() => navigate('/contact')}
				className="cta-btn bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#f3de9a] text-[#1e2d40] px-8 py-3.5 rounded-xl text-[11px] font-black tracking-widest uppercase inline-flex items-center gap-2 shadow-lg"
			  >
				{isAr ? "طلب عرض تجريبي" : "SCHEDULE A DEMO"}
				{isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
			  </button>
			  <button
				onClick={() => navigate('/about')}
				className="cta-btn bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#c5a059] text-white px-8 py-3.5 rounded-xl text-[11px] font-black tracking-widest uppercase inline-flex items-center gap-2 shadow-sm"
			  >
				{isAr ? "تعرف علينا" : "LEARN MORE"}
			  </button>
			</div>

			{/* Stat bar */}
			<div className="hero-stats mt-14 flex flex-wrap justify-center gap-10">
			  {[
				{ label: isAr ? 'زيارة موثقة' : 'TOTAL HITS', val: hits },
				{ label: isAr ? 'زائر فريد' : 'UNIQUE VISITORS', val: visitors },
				{ label: isAr ? 'دولة نشطة' : 'ACTIVE COUNTRIES', val: Object.keys(activeCountries).length },
			  ].map((s, i) => (
				<div key={i} className="flex flex-col items-center">
				  <span className="text-3xl font-black text-white tabular-nums">
					<Counter target={s.val} />
				  </span>
				  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{s.label}</span>
				</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

		{/* ── OPERATIONS + MAP BENTO ───────────────────────────── */}
		<Reveal>
		  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

			{/* Operations Panel */}
			<div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-7 md:p-9 shadow-sm flex flex-col">
			  <div className="flex items-center gap-2 mb-1">
				<Zap size={16} className="text-[#c5a059]" />
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
				  {isAr ? "الكفاءة التشغيلية" : "Operational Excellence"}
				</span>
			  </div>
			  <h2 className="text-2xl font-black font-serif text-[#1e2d40] mb-2">
				{isAr ? "إدارة تشغيلية متكاملة" : "Full-Spectrum Operations"}
			  </h2>
			  <p className="text-slate-500 text-sm font-medium mb-7">
				{isAr
				  ? "نستخدم أنظمتنا الخاصة لإدارة مشاريعك وتوفير كوادرنا لتشغيلها."
				  : "We deploy our proprietary systems alongside our master task force to guarantee success."}
			  </p>
			  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
				{opCards.map((card, i) => (
				  <div key={i} className="op-card bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col items-start hover:bg-white hover:border-[#c5a059]/30 hover:shadow-md cursor-default">
					<div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
					  style={{ backgroundColor: card.color + '15', color: card.color }}>
					  {card.icon}
					</div>
					<h3 className="text-sm font-black text-[#1e2d40] mb-1">{card.title}</h3>
					<p className="text-[11px] text-slate-500 font-medium leading-relaxed">{card.desc}</p>
				  </div>
				))}
			  </div>
			</div>

			{/* Map Panel */}
			<div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
			  <div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
				  <Globe2 size={14} className="text-[#c5a059]" />
				  <span className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
					{isAr ? "الخريطة الحية" : "Live Signal Map"}
				</span>
				</div>
				<div className="flex gap-2">
				  <span className="text-[10px] font-black text-[#1e2d40] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
					{isAr ? 'زوار' : 'VISITORS'}: <Counter target={visitors} />
				  </span>
				  <span className="text-[10px] font-black text-[#1e2d40] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
					{isAr ? 'زيارات' : 'HITS'}: <Counter target={hits} />
				  </span>
				</div>
			  </div>
			  <div ref={mapContainerRef}
				className="rounded-xl border border-slate-200 shadow-inner flex-grow min-h-[260px] overflow-hidden"
				style={{ width: '100%', backgroundColor: '#f8fafc' }}
			  />
			</div>
		  </div>
		</Reveal>

		{/* ── ECOSYSTEM GRID ───────────────────────────────────── */}
		<div>
		  <Reveal className="mb-7">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
			  <div>
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] block mb-1">
				  {isAr ? "المنظومة السحابية" : "Cloud Ecosystem"}
				</span>
				<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
				  {isAr ? `منظومة ${brandName}` : `The ${brandName} Ecosystem`}
				</h2>
			  </div>
			  <p className="text-sm text-slate-500 font-medium max-w-sm">
				{isAr ? "حلول برمجية متخصصة ومترابطة لدعم عملياتك." : "Specialized, interconnected SaaS solutions powering your operations."}
			  </p>
			</div>
		  </Reveal>

		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
			{ecosystems.map((sys, i) => (
			  <Reveal key={i} delay={i * 80}>
				<div className="eco-card bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full relative overflow-hidden group">
				  {/* Accent line top */}
				  <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl transition-all duration-500"
					style={{ background: `linear-gradient(90deg, transparent, ${sys.accentColor}, transparent)`, opacity: 0.5 }} />
				  {/* Hover glow */}
				  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
					style={{ background: `radial-gradient(circle at 0% 0%, ${sys.accentColor}08 0%, transparent 60%)` }} />

				  <div className="flex justify-between items-start mb-5 relative z-10">
					<div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm border"
					  style={{ backgroundColor: sys.accentColor + '15', color: sys.accentColor, borderColor: sys.accentColor + '25' }}>
					  {sys.icon}
					</div>
					<span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border"
					  style={{ color: sys.accentColor, backgroundColor: sys.accentColor + '12', borderColor: sys.accentColor + '25' }}>
					  {sys.badge}
					</span>
				  </div>

				  <h3 className="text-sm font-black text-[#1e2d40] mb-2 relative z-10">{sys.title}</h3>
				  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-5 flex-grow relative z-10">{sys.desc}</p>

				  <div className="border-t border-slate-100 pt-4 mt-auto relative z-10">
					<a href={sys.url} target="_blank" rel="noopener noreferrer"
					  className="text-[10px] font-black uppercase tracking-widest flex items-center justify-between group/link transition-colors"
					  style={{ color: '#1e2d40' }}
					  onMouseEnter={e => e.currentTarget.style.color = sys.accentColor}
					  onMouseLeave={e => e.currentTarget.style.color = '#1e2d40'}
					>
					  {isAr ? 'زيارة المنصة' : 'LAUNCH PORTAL'}
					  <ExternalLink size={12} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
					</a>
				  </div>
				</div>
			  </Reveal>
			))}
		  </div>
		</div>

		{/* ── REVIEWS ──────────────────────────────────────────── */}
		<Reveal>
		  <div className="pt-2 border-t border-slate-200">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-7">
			  <div>
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] block mb-1">
				  {isAr ? "التقييمات الموثقة" : "Verified Reviews"}
				</span>
				<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
				  {isAr ? "آراء شركاء النجاح" : "Partner Feedback"}
				</h2>
			  </div>
			  <p className="text-sm text-slate-500 font-medium">
				{isAr ? "مباشرة من المنصة الموثوقة." : "Live verified reviews from our partners."}
			  </p>
			</div>
			<div className="w-full bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
			  <ReviewsSection />
			</div>
		  </div>
		</Reveal>

		{/* ── CTA ──────────────────────────────────────────────── */}
		<Reveal>
		  <div className="relative overflow-hidden bg-[#1e2d40] rounded-2xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
			{/* Background detail */}
			<div className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none"
			  style={{ background: 'radial-gradient(ellipse, #c5a05918 0%, transparent 70%)' }} />
			<div className="absolute bottom-0 left-1/4 w-px h-full pointer-events-none"
			  style={{ background: 'linear-gradient(180deg, transparent, #c5a05918, transparent)' }} />

			<div className="relative z-10 text-center md:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			  <div className="inline-flex items-center gap-2 bg-[#c5a059]/15 border border-[#c5a059]/25 text-[#c5a059] px-3 py-1 rounded-full mb-3">
				<TrendingUp size={12} />
				<span className="text-[10px] font-black uppercase tracking-widest">
				  {isAr ? "ارفع كفاءة منشأتك" : "Elevate Your Enterprise"}
				</span>
			  </div>
			  <h2 className="text-2xl md:text-3xl font-black font-serif text-white mb-2">
				{isAr ? "ارفع كفاءة منشأتك اليوم" : "Ready to Transform Operations?"}
			  </h2>
			  <p className="text-sm text-slate-400 font-medium max-w-md">
				{isAr
				  ? "اطلب عرضاً توضيحياً حياً وتعرف على كيفية إدارة فرقنا لمشروعك على أرض الواقع."
				  : "Request a live demonstration and learn how our teams manage your project on the ground."}
			  </p>
			</div>

			<button
			  onClick={() => navigate('/contact')}
			  className="cta-btn shrink-0 bg-gradient-to-r from-[#c5a059] to-[#d4af37] hover:from-[#d4af37] hover:to-[#f3de9a] text-[#1e2d40] px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap relative z-10 inline-flex items-center gap-2"
			>
			  {isAr ? "طلب العرض الآن" : "SCHEDULE A DEMO"}
			  {isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
			</button>
		  </div>
		</Reveal>

	  </div>
	</div>
  );
}