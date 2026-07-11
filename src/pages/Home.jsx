import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight, ArrowLeft, ExternalLink, Globe2, Building2, Car,
  BadgeCheck, Stethoscope, Users, Settings, FileCheck, TrendingUp, Zap,Shield, 
  Server, ShieldCheck, Activity, GraduationCap
} from 'lucide-react';
import ReviewsSection from './ReviewsSection';
import logoOps from "../logos/opx-ops.png";
import logoFmis from "../logos/opx-fmis.png";
import logoHris from "../logos/opx-hris.jpg";
import logoCare from "../logos/opx-care.jpg";
import logoEdu from "../logos/opx-edu.png";
import logoBinAbbas from "../logos/binabbas.png";
import logoHasad from "../logos/hasad.png";
/* ── Shared reveal hook ───────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
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
const [activeProduct, setActiveProduct] = useState(null);
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

  // ── 1. MAP INITIALIZATION & GEOJSON RENDERING (Runs Once) ──
	useEffect(() => {
	  if (!mapReady || !window.L || !mapContainerRef.current || mapInstanceRef.current) return;
	  
	  const L = window.L;
	  const map = L.map(mapContainerRef.current, {
		zoomControl: false, attributionControl: false,
		maxBounds: [[-90, -180], [90, 180]], maxBoundsViscosity: 1.0
	  }).setView([24.0, 35.0], 2);
	  
	  mapInstanceRef.current = map;
  
	  // Fetch the vector geometry of the world
	  fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
		.then(res => res.json())
		.then(geojsonData => {
		  // Draw the Premium Gold Lands
		  L.geoJSON(geojsonData, {
			style: {
			  fillColor: '#c9a84c', 
			  weight: 0.8,
			  color: '#1e2d40',     
			  fillOpacity: 0.95
			}
		  }).addTo(map);
		})
		.catch(err => console.error("Error loading vector map data:", err));
  
	}, [mapReady]);
	
		// ── 2. RENDER LIVE VISITORS (Runs when Supabase data arrives) ──
		  useEffect(() => {
			// Only run if the map is ready and we actually have country data
			if (!mapInstanceRef.current || !window.L || Object.keys(activeCountries).length === 0) return;
			
			const map = mapInstanceRef.current;
			const L = window.L;
		
			// Clear existing markers if this re-runs (prevents duplicates)
			map.eachLayer((layer) => {
			  if (layer instanceof L.CircleMarker) {
				map.removeLayer(layer);
			  }
			});
		
			// Draw the shining visitor markers on top
			Object.entries(activeCountries).forEach(([code, count]) => {
			  const coords = countryCoordinates[code];
			  if (!coords) return;
			  const r = Math.min(6 + count * 1.5, 24);
			  
			  const circle = L.circleMarker([coords.lat, coords.lon], {
				radius: r, 
				fillColor: '#ffffff', 
				color: '#1e2d40',     
				weight: 2, 
				opacity: 1, 
				fillOpacity: 1,
				className: 'live-pulse-marker'
			  }).addTo(map);
			  
			  circle.bindPopup(`<b style="color:#1e2d40">${coords.name}</b><br/><span style="color:#c9a84c;font-weight:700">${count} visits</span>`);
			});
		
		  }, [activeCountries, mapReady]);
const productsData = [
			  {
				id: 'opx-ops',
				logo: logoOps, // <-- No quotes! Using the imported variable directly
				title: 'OPERIX Operations',
				badge: 'FLEET & WORKFORCE MATRIX',
				desc: 'The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.',
				stats: 'ZATCA VERIFIED • 4 SCREENS'
			  },
			  {
				id: 'opx-fmis',
				logo: logoFmis,
				title: 'OPERIX FMIS',
				badge: 'FINANCE & RETAIL ERP',
				desc: 'Complete financial management ecosystem, corporate ledger reconciliation, Retail & POS operations, and ZATCA Phase 2 E-Invoicing integration.',
				stats: 'ZATCA V2 READY • MULTI-BRANCH'
			  },
			  {
				id: 'opx-hris',
				logo: logoHris,
				title: 'OPERIX HRIS',
				badge: 'HUMAN CAPITAL INFRASTRUCTURE',
				desc: 'Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service pipelines.',
				stats: 'CLINICAL SYNC • 12 SCREENS'
			  },
			  {
				id: 'opx-care',
				logo: logoCare,
				title: 'OPERIX Health Care',
				badge: 'CLINICAL MANAGEMENT CORE',
				desc: 'Advanced hospital management ecosystem. End-to-end clinical workflow from patient intake and triage through physician consultation, pharmacy dispensary, surgical.',
				stats: ''
			  },
			  {
				id: 'opx-edu',
				logo: logoEdu,
				title: 'OPERIX Edu',
				badge: 'SCHOOL MANAGEMENT PLATFORM',
				desc: 'Cloud-based school management platform purpose-built for Ministry of Education standards across the Middle East. Combines academic governance with modern technology.',
				stats: ''
			  },
			  {
				id: 'binabbas',
				logo: logoBinAbbas,
				title: 'Abdullah Bin Abbas',
				badge: 'INSTITUTIONAL PORTAL',
				desc: 'Dedicated administrative portal mapped for institutional resource planning, community outreach tracking, and digital archive management.',
				stats: 'VISIT LIVE PORTAL'
			  },
			  {
				id: 'hasad',
				logo: logoHasad,
				title: 'Hasad',
				badge: 'SMART COMMUNITY HUB',
				desc: 'Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.',
				stats: ''
			  }
			];
	const coreValues = [
		{
		  icon: <Server size={22} />, color: '#1e2d40',
		  title: isAr ? "بنية مؤسسية موحدة" : "Unified Architecture",
		  desc: isAr ? "استبدال الأنظمة المجزأة ببيئة رقمية واحدة متصلة بالكامل عبر كافة الأقسام." : "Replace fragmented legacy software with a highly scalable, integrated digital environment."
		},
		{
		  icon: <Activity size={22} />, color: '#c9a84c',
		  title: isAr ? "تحليلات لحظية عن بعد" : "Real-Time Telemetry",
		  desc: isAr ? "مراقبة تدفق العمليات وتحديثات البيانات الحية لحظة بلحظة لدعم اتخاذ القرار." : "Live data visualization and dynamic reporting to empower C-level decision-making."
		},
		{
		  icon: <ShieldCheck size={22} />, color: '#10b981',
		  title: isAr ? "أمان وامتثال معتمد" : "Security & Compliance",
		  desc: isAr ? "تشفير سحابي متقدم وتوافق تام مع اللوائح الحكومية وأنظمة هيئة الزكاة والدخل." : "Bank-grade encryption and full regulatory compliance with ZATCA Phase 2 invoicing standards."
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
		@keyframes shimmerGold {
		  0% { background-position: -200% center; }
		  100% { background-position: 200% center; }
		}
		@keyframes markerGlow {
		  0% { filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5)); transform: scale(1); }
		  100% { filter: drop-shadow(0 0 12px rgba(255, 255, 255, 1)); transform: scale(1.15); }
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
		.cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201, 168, 76, 0.35); }
		
		/* The Shining White Pulse against the Gold Land */
		.live-pulse-marker path {
		  animation: markerGlow 1.2s infinite alternate ease-in-out;
		  transform-origin: center;
		}

		.premium-gold-text {
		  background: linear-gradient(to right, #c9a84c 0%, #fef08a 40%, #c9a84c 80%);
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
		  style={{ background: 'radial-gradient(ellipse, #c9a84c20 0%, transparent 70%)', animation: 'floatGlow 7s ease-in-out infinite' }} />
		<div className="absolute -bottom-20 -left-20 w-[340px] h-[340px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #ffffff05 0%, transparent 70%)', animation: 'floatGlow 9s ease-in-out infinite reverse' }} />

		<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col items-center">
		  <div className="max-w-3xl mx-auto text-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			
			{/* Tag */}
			<div className="hero-tag inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
			  <ShieldCheck size={14} />
			  <span className="text-[10px] font-black uppercase tracking-widest">
				{isAr ? "البنية التحتية البرمجية للمؤسسات" : "Enterprise Software Architecture"}
			  </span>
			</div>

			{/* H1 */}
			<h1 className="hero-h1 text-4xl md:text-5xl lg:text-[3.75rem] font-black tracking-tight leading-[1.08] mb-5 text-white">
			  {isAr ? (
				<>مركز القيادة الموحد<br />للمؤسسات الحديثة <span className="premium-gold-text">.</span></>
			  ) : (
				<>The Unified Command Center<br />for Modern Enterprise <span className="premium-gold-text">.</span></>
			  )}
			</h1>

			{/* Paragraph */}
			<p className="hero-p text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto mb-8">
			  {isAr
				? "تتخصص أوبيريكس في تصميم ونشر بنى تحتية سحابية موحدة، تستبدل الأنظمة القديمة والمجزأة ببيئات رقمية آمنة تعمل في الوقت الفعلي وتدير كافة عملياتك ومواردك."
				: `${brandName} architects highly scalable, secure cloud infrastructure. We replace fragmented legacy software with unified, real-time digital environments to run your entire enterprise.`}
			</p>

			{/* CTA Buttons */}
			<div className="hero-cta flex flex-wrap justify-center gap-4">
			  <button
				onClick={() => navigate('/contact')}
				className="cta-btn bg-gradient-to-r from-[#c9a84c] to-[#fef08a] hover:from-[#fef08a] hover:to-[#fffbd1] text-[#1e2d40] px-8 py-3.5 rounded-xl text-[11px] font-black tracking-widest uppercase inline-flex items-center gap-2 shadow-lg"
			  >
				{isAr ? "طلب عرض تجريبي" : "SCHEDULE A DEMO"}
				{isAr ? <ArrowLeft size={15} /> : <ArrowRight size={15} />}
			  </button>
			  <button
				onClick={() => navigate('/about')}
				className="cta-btn bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#c9a84c] text-white px-8 py-3.5 rounded-xl text-[11px] font-black tracking-widest uppercase inline-flex items-center gap-2 shadow-sm"
			  >
				{isAr ? "تعرف على الشركة" : "ABOUT OPERIX"}
			  </button>
			</div>

			{/* Stat bar */}
			<div className="hero-stats mt-14 flex flex-wrap justify-center gap-10">
			  {[
				{ label: isAr ? 'زيارة موثقة للأنظمة' : 'ENTERPRISE HITS', val: hits },
				{ label: isAr ? 'مستخدم فريد' : 'UNIQUE LOGINS', val: visitors },
				{ label: isAr ? 'دولة نشطة' : 'ACTIVE COUNTRIES', val: Object.keys(activeCountries).length },
			  ].map((s, i) => (
				<div key={i} className="flex flex-col items-center">
				  <span className="text-3xl font-black text-white tabular-nums">
					<Counter target={s.val} />
				  </span>
				  <span className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-widest mt-1.5">{s.label}</span>
				</div>
			  ))}
			</div>
		  </div>
		</div>
	  </div>

	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

		{/* ── COMPANY VALUES + MAP BENTO ───────────────────────────── */}
		<Reveal>
		  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

			{/* Core Values Panel */}
			<div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-7 md:p-9 shadow-sm flex flex-col">
			  <div className="flex items-center gap-2 mb-1">
				<Shield size={16} className="text-[#c9a84c]" />
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">
				  {isAr ? "الرؤية المؤسسية" : "Corporate Vision"}
				</span>
			  </div>
			  <h2 className="text-2xl font-black font-serif text-[#1e2d40] mb-2">
				{isAr ? "بنية مؤسسية متطورة" : "Enterprise-Grade Architecture"}
			  </h2>
			  <p className="text-slate-500 text-sm font-medium mb-7">
				{isAr
				  ? "نحن نؤمن بأن استقرار العمليات يبدأ من قوة البنية التحتية. أنظمتنا مصممة للعمل في أصعب البيئات."
				  : "We believe operational success requires unbreakable infrastructure. Our systems are engineered to scale seamlessly."}
			  </p>
			  
			  <div className="flex flex-col gap-4 flex-grow">
				{coreValues.map((card, i) => (
				  <div key={i} className="op-card bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:bg-white hover:border-[#c9a84c]/40 hover:shadow-md cursor-default" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
					<div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm bg-white border border-slate-200"
					  style={{ color: card.color }}>
					  {card.icon}
					</div>
					<div>
					  <h3 className="text-sm font-black text-[#1e2d40] mb-1">{card.title}</h3>
					  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{card.desc}</p>
					</div>
				  </div>
				))}
			  </div>
			</div>

			{/* Premium Gold & Navy Map Panel */}
			<div className="lg:col-span-6 bg-[#1e2d40] border border-[#1e2d40] rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden">
			  <div className="absolute inset-0 pointer-events-none" style={{
				backgroundImage: 'radial-gradient(ellipse at top right, #c9a84c15 0%, transparent 60%)'
			  }} />
			  <div className="flex items-center justify-between mb-4 relative z-10">
				<div className="flex items-center gap-2">
				  <Globe2 size={14} className="text-[#c9a84c]" />
				  <span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">
					{isAr ? "الخريطة السحابية الحية" : "Live Cloud Telemetry"}
				  </span>
				</div>
				<div className="flex gap-2">
				  <span className="text-[10px] font-black text-[#c9a84c] bg-[#15202e] border border-[#c9a84c]/30 px-2.5 py-1 rounded-lg">
					{isAr ? 'اتصالات نشطة' : 'ACTIVE NODES'}
				  </span>
				</div>
			  </div>
			  <div ref={mapContainerRef}
				className="rounded-xl border border-slate-700 shadow-inner flex-grow min-h-[300px] overflow-hidden relative z-10"
				style={{ width: '100%', backgroundColor: '#1e2d40' }} // Sea color = Dark Navy
			  />
			</div>
		  </div>
		</Reveal>

		{/* ── PRODUCTS ECOSYSTEM GRID ───────────────────────────────────── */}
		<div>
		  <Reveal className="mb-7">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			  <div>
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] block mb-1">
				  {isAr ? "المنظومة السحابية المتكاملة" : "Integrated Cloud Matrix"}
				</span>
				<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
				  {isAr ? `منظومة ${brandName}` : `The ${brandName} Ecosystem`}
				</h2>
			  </div>
			  <p className="text-sm text-slate-500 font-medium max-w-md">
				{isAr ? "حلول برمجية متخصصة ومترابطة لدعم القطاعات الإدارية، الطبية، والتعليمية." : "Specialized, interconnected SaaS solutions powering operational, clinical, and academic sectors."}
			  </p>
			</div>
		  </Reveal>
		
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			{productsData.map((product, i) => {
			  const isActive = activeProduct === product.id;
			  
			  return (
				<Reveal key={product.id} delay={i * 80}>
				  <div 
					onClick={() => setActiveProduct(isActive ? null : product.id)}
					className={`bg-white rounded-2xl border overflow-hidden flex flex-col transition-all duration-500 group cursor-pointer ${
					  isActive 
						? 'shadow-xl border-[#c9a84c]/40 -translate-y-1' 
						: 'border-slate-200 shadow-sm hover:shadow-xl hover:border-[#c9a84c]/40 hover:-translate-y-1'
					}`}
				  >
					
					{/* Logo Area (Starts Grayscale, colors on hover/touch) */}
					<div className="h-44 bg-slate-50/50 flex items-center justify-center p-8 border-b border-slate-100 relative">
					  <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#c9a84c]/5 transition-opacity duration-500 pointer-events-none ${
						isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
					  }`}></div>
		
					  <img 
						src={product.logo} 
						alt={product.title} 
						className={`w-full h-full object-contain transition-all duration-500 relative z-10 ${
						  isActive 
							? 'grayscale-0 opacity-100 scale-110' 
							: 'filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'
						}`} 
						onError={(e) => { 
						  e.currentTarget.style.display = 'none'; 
						  if (e.currentTarget.parentElement) {
							  e.currentTarget.parentElement.innerHTML = '<div class="text-slate-400 font-black tracking-widest uppercase text-xs z-10 relative">LOGO</div>'; 
						  }
						}}
					  />
					</div>
		
					{/* Title & Badge (Always Visible) */}
					<div className="p-6 pb-2 text-center bg-white z-20 flex flex-col justify-center">
					  <h3 className={`text-lg font-black mb-1 transition-colors ${
						isActive ? 'text-[#c9a84c]' : 'text-[#1e2d40] group-hover:text-[#c9a84c]'
					  }`}>
						{product.title}
					  </h3>
					  <span className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest">
						{product.badge}
					  </span>
					</div>
					
					{/* Expanding Info Area (Revealed on hover/touch) */}
					<div className={`transition-all duration-500 ease-in-out overflow-hidden bg-white px-6 ${
					  isActive ? 'max-h-64 opacity-100 pb-6' : 'max-h-0 opacity-0 group-hover:max-h-64 group-hover:opacity-100 group-hover:pb-6'
					}`}>
					  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 text-center">
						{product.desc}
					  </p>
					  
					  {product.stats && (
						<div className="border-t border-slate-100 pt-4 flex items-center justify-center">
						  <span className="text-[9px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
							{product.stats}
						  </span>
						</div>
					  )}
					</div>
		
				  </div>
				</Reveal>
			  );
			})}
		  </div>
		</div>

		{/* ── REVIEWS ──────────────────────────────────────────── */}
		<Reveal>
		  <div className="pt-2 border-t border-slate-200">
			<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-7" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			  <div>
				<span className="text-[10px] font-black uppercase tracking-widest text-[#c9a84c] block mb-1">
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
			  style={{ background: 'radial-gradient(ellipse, #c9a84c20 0%, transparent 70%)' }} />
			<div className="absolute bottom-0 left-1/4 w-px h-full pointer-events-none"
			  style={{ background: 'linear-gradient(180deg, transparent, #c9a84c30, transparent)' }} />

			<div className="relative z-10 text-center md:text-left" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			  <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/25 text-[#c9a84c] px-3 py-1 rounded-full mb-3">
				<TrendingUp size={12} />
				<span className="text-[10px] font-black uppercase tracking-widest">
				  {isAr ? "تحديث البنية التحتية" : "Infrastructure Upgrade"}
				</span>
			  </div>
			  <h2 className="text-2xl md:text-3xl font-black font-serif text-white mb-2">
				{isAr ? "استعد لتوحيد عملياتك المؤسسية؟" : "Ready to Unify Your Operations?"}
			  </h2>
			  <p className="text-sm text-slate-400 font-medium max-w-md">
				{isAr
				  ? "اطلب عرضاً توضيحياً حياً وتعرف على كيفية إدارة النظام لمشروعك."
				  : "Request a live demonstration and see how our command center manages your workflow."}
			  </p>
			</div>

			<button
			  onClick={() => navigate('/contact')}
			  className="cta-btn shrink-0 bg-gradient-to-r from-[#c9a84c] to-[#fef08a] hover:from-[#fef08a] hover:to-[#fffbd1] text-[#1e2d40] px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg whitespace-nowrap relative z-10 inline-flex items-center gap-2"
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