import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ArrowLeft, ExternalLink, Globe2 } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { t, isAr } = useLanguage();

  const [hits, setHits] = useState(0);
  const [activeCountries, setActiveCountries] = useState({});
  const [mapReady, setMapReady] = useState(false);
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const brandName = "OPERIX Solutions";

  const countryCoordinates = {
	SA: { lat: 23.8859, lon: 45.0792, name: 'Saudi Arabia' },
	AE: { lat: 23.4241, lon: 53.8478, name: 'United Arab Emirates' },
	US: { lat: 37.0902, lon: -95.7129, name: 'United States' },
	GB: { lat: 55.3781, lon: -3.4360, name: 'United Kingdom' },
	EG: { lat: 26.8206, lon: 30.8025, name: 'Egypt' }
  };

  useEffect(() => {
	if (!document.getElementById('leaflet-css')) {
	  const link = document.createElement('link');
	  link.id = 'leaflet-css';
	  link.rel = 'stylesheet';
	  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
	  document.head.appendChild(link);
	}
	if (!document.getElementById('leaflet-js')) {
	  const script = document.createElement('script');
	  script.id = 'leaflet-js';
	  script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
	  script.onload = () => setMapReady(true);
	  document.body.appendChild(script);
	} else if (window.L) {
	  setMapReady(true);
	}
  }, []);

  useEffect(() => {
	async function streamTelemetry() {
	  const { count } = await supabase.from('operix_visitor_logs').select('*', { count: 'exact', head: true });
	  if (count) setHits(count);

	  const { data } = await supabase.from('operix_visitor_logs').select('ip_country');
	  if (data) {
		const counts = data.reduce((acc, curr) => {
		  if (curr.ip_country) {
			acc[curr.ip_country.toUpperCase()] = (acc[curr.ip_country.toUpperCase()] || 0) + 1;
		  }
		  return acc;
		}, {});
		setActiveCountries(counts);
	  }
	}
	streamTelemetry();
  }, []);

  useEffect(() => {
	if (!mapReady || !window.L || Object.keys(activeCountries).length === 0 || !mapContainerRef.current || mapInstanceRef.current) return;

	const L = window.L;

	// Enforce solid boundary limits to prevent horizontal tracking replication
	const map = L.map(mapContainerRef.current, { 
	  zoomControl: true, 
	  attributionControl: false,
	  maxBounds: [[-90, -180], [90, 180]],
	  maxBoundsViscosity: 1.0
	}).setView([24.0, 35.0], 2);
	
	mapInstanceRef.current = map;

	// Set noWrap to true to completely block duplicate world rendering
	L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	  maxZoom: 18,
	  minZoom: 2,
	  noWrap: true
	}).addTo(map);

	Object.entries(activeCountries).forEach(([code, count]) => {
	  const coords = countryCoordinates[code];
	  if (coords) {
		L.circleMarker([coords.lat, coords.lon], {
		  radius: 9,
		  fillColor: '#c9a84c',
		  color: '#1e2d40',
		  weight: 2,
		  opacity: 1,
		  fillOpacity: 0.85
		})
		.addTo(map)
		.bindPopup(`<b>${coords.name}</b><br/>${count} Active Hits`, { closeButton: false });
	  }
	});

	return () => {
	  if (mapInstanceRef.current) {
		mapInstanceRef.current.remove();
		mapInstanceRef.current = null;
	  }
	};
  }, [mapReady, activeCountries]);

  return (
	<div className="w-full flex flex-col items-center justify-center animate-in px-4">
	  
	  {/* ─── HERO ARCHITECTURE SECTION ─── */}
	  <header className="hero-wrapper">
		<div className="hero-tagline">
		  <span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
		  {isAr ? "نظام القيادة والتحكم الموحد" : "ENTERPRISE COMMAND & CONTROL"}
		</div>

		<h1 className="hero-main-title">
		  {isAr ? "تمكين المنشآت الكبرى عبر " : "Empowering Enterprises with "}
		  <span className="bg-gradient-to-r from-[#1e2d40] to-[#c9a84c] bg-clip-text text-transparent block sm:inline ml-1">
			{brandName}
		  </span>
		</h1>

		<p className="hero-subtitle-text text-muted-corporate">
		  {isAr 
			? "توحيد إدارة العمليات التشغيلية، الرعاية الطبية، والموارد البشرية في ثلاث منظومة ذكية ومترابطة بسلاسة."
			: "Unifying Operations, Health Care, and Human Resources into three seamless, intelligent ecosystems."}
		</p>

		<div className="flex items-center justify-center w-full pt-2">
		  <button onClick={() => navigate('/contact')} className="btn-nav-primary px-8 py-3.5 text-xs inline-flex items-center justify-center cursor-pointer">
			{isAr ? "طلب عرض تجريبي" : "SCHEDULE A DEMO"} 
			{isAr ? <ArrowLeft size={14} className="ml-2" /> : <ArrowRight size={14} className="ml-2" />}
		  </button>
		</div>
	  </header>

	  {/* ─── LIVE TELEMETRY STATS BLOCK ─── */}
	  <section className="stats-container">
		<div className="stat-item">
		  <div className="stat-number font-mono text-gold-corporate">99.9%</div>
		  <div className="stat-descriptor text-muted-corporate">{isAr ? "نسبة استقرار النظام" : "SYSTEM UPTIME %"}</div>
		</div>
		<div className="stat-item">
		  <div className="stat-number font-mono text-gold-corporate">3+</div>
		  <div className="stat-descriptor text-muted-corporate">{isAr ? "الأنظمة الأساسية" : "CORE SYSTEMS"}</div>
		</div>
		<div className="stat-item">
		  <div className="stat-number font-mono text-gold-corporate">10K+</div>
		  <div className="stat-descriptor text-muted-corporate">{isAr ? "المهام المؤتمتة" : "TASKS AUTOMATED"}</div>
		</div>
	  </section>

	  {/* ─── GEOGRAPHIC TELEMETRY ATLAS MODULE ─── */}
	  <section className="public-map-card">
		<div className="public-map-title flex items-center justify-center gap-2">
		  <Globe2 size={13} className="text-gold-corporate" />
		  <span>{isAr ? "خريطة البث ومصفوفة الموقع الجغرافي اللحظي" : "Global Live Visitor Signal Map"}</span>
		</div>
		
		<div className="text-sm font-medium text-muted-corporate text-center">
		  {isAr ? "إجمالي طلبات الاتصال بقاعدة البيانات التشغيلية:" : "Total active data telemetry hits recorded:"}{" "}
		  <span className="font-mono font-black text-base bg-slate-100 px-3 py-1 rounded-lg ml-1">
			{hits.toLocaleString()}
		  </span>
		</div>

		<div 
		  ref={mapContainerRef} 
		  className="rounded-2xl border border-slate-200 shadow-inner overflow-hidden z-10 my-4"
		  style={{ width: '100%', height: '380px', backgroundColor: '#f1f5f9' }}
		/>
	  </section>

	  {/* ─── THE ECOSYSTEM OVERVIEW ─── */}
	  <section className="max-w-4xl mx-auto text-center py-4 space-y-4 font-sans flex flex-col items-center">
		<h2 className="text-xl font-black uppercase tracking-wider text-center">
		  The {brandName} Ecosystem
		</h2>
		<p className="text-muted-corporate text-sm md:text-base leading-relaxed font-medium text-center max-w-2xl">
		  {isAr
			? `تستبدل ${brandName} الأنظمة القديمة والمشتتة بمركز قيادة رقمي موحد. نحن نقدم منصات متخصصة لعمليات الشركات، وإدارة الرعاية الصحية السريرية المتقدمة، والتتبع الكامل لدورة حياة الموارد البشرية.`
			: `${brandName} replaces fragmented legacy systems with a unified digital command center. We provide specialized platforms for enterprise operations, advanced clinical health care management, and complete human resource life-cycle tracking.`}
		</p>
	  </section>

	  {/* ─── ECOSYSTEM SHOWCASE CARDS ─── */}
	  <section className="platforms-section">
		
		{/* ROW A: OPERIX OPERATIONS */}
		<div className="platform-row-card">
		  <div className="platform-info-column">
			<span className="platform-brand-badge text-gold-corporate font-black">OPERIX SOLUTIONS · OPS</span>
			<h3 className="platform-headline">OPERIX Operations</h3>
			<p className="platform-paragraph text-muted-corporate">
			  {isAr
				? "محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات بكاميرات التعرف الذكي (ANPR)، تنظيم خدمة السيارات (Valet)، والتشغيل الفوري للقوى العاملة المؤقتة والميدانية."
				: "The core operations hub replacing manual logbooks. Comprehensive ANPR parking, valet management, and real-time gig workforce deployment."}
			</p>
			<ul className="platform-bullet-list">
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "التعرف التلقائي الحي على لوحات المركبات عبر الكاميرات" : "Live ANPR camera plate recognition"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "تتبع أداء القوى العاملة المؤقتة وسائقي خدمة السيارات" : "Gig workforce & Valet performance tracking"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "توليد تلقائي للتذاكر والفواتير الرقمية عبر رمز QR" : "Automated ticket & QR invoice generation"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-operations.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-launch-platform">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={12} className="inline ml-1" />
			  </a>
			</div>
		  </div>

		  <div className="telemetry-mockup-display">
			<div className="mockup-top-bar">
			  <span>OPERIX OPS · COMMAND CENTER</span>
			  <span className="text-emerald-600 font-sans font-bold">● LIVE TELEMETRY</span>
			</div>
			<div className="mockup-inner-body text-xs font-mono space-y-3 text-[#1e2d40] text-left">
			  <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
				<div>
				  <div className="text-slate-400 tracking-wider font-bold text-[10px]">ANPR · GATE A</div>
				  <div className="text-base font-black mt-0.5">ABC 1234</div>
				</div>
				<div className="text-right text-[10px] text-[#c9a84c] font-black">
				  TICKET GENERATED
				</div>
			  </div>
			  <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-600 font-bold">
				<div className="bg-white border border-slate-100 p-2 rounded shadow-sm text-center">Plate: ABC 1234</div>
				<div className="bg-white border border-slate-100 p-2 rounded shadow-sm text-center">Time: 14:32:00</div>
				<div className="bg-white border border-slate-100 p-2 rounded shadow-sm text-center">Valet: Khalid A.</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* ROW B: OPERIX CARE */}
		<div className="platform-row-card">
		  <div className="platform-info-column">
			<span className="platform-brand-badge text-gold-corporate font-black">OPERIX SOLUTIONS · CARE</span>
			<h3 className="platform-headline">OPERIX Health Care</h3>
			<p className="platform-paragraph text-muted-corporate">
			  {isAr
				? "منظومة الإدارة الطبية المتقدمة التي تضم بوابات تفاعلية للأطباء، ملفات شاملة لتاريخ المرضى المرضي، وميزة الإدخال الصوتي التلقائي للملاحظات السريرية وتحويلها إلى نصوص."
				: "Advanced medical management ecosystem featuring doctor portals, comprehensive patient history, and voice-to-text clinical notes."}
			</p>
			<ul className="platform-bullet-list">
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "التعرف على الصوت لإدخال التشخيص السريع تلقائياً" : "Voice recognition for quick diagnosis entry"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "تاريخ إلكتروني طبي متكامل وشامل للمريض" : "Complete electronic patient history"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "بوابات أمنة ومشفرة بالكامل للأطباء وطاقم التمريض" : "Secure portals for doctors and nurses"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-care.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-launch-platform">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={12} className="inline ml-1" />
			  </a>
			</div>
		  </div>

		  <div className="telemetry-mockup-display">
			<div className="mockup-top-bar">
			  <span>OPERIX CARE · CLINICAL WORKSPACE</span>
			  <span className="text-rose-500 font-sans font-bold">● LIVE VITALS</span>
			</div>
			<div className="mockup-inner-body text-xs font-mono space-y-3 text-[#1e2d40] text-left">
			  <div className="flex justify-between items-center bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
				<div>
				  <div className="font-black text-sm">Ahmad Y.</div>
				  <div className="text-[10px] text-slate-400 font-bold mt-0.5">ID: P-99201</div>
				</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* ROW C: OPERIX HRIS */}
		<div className="platform-row-card">
		  <div className="platform-info-column">
			<span className="platform-brand-badge text-gold-corporate font-black">OPERIX SOLUTIONS · HRIS</span>
			<h3 className="platform-headline">OPERIX HRIS</h3>
			<p className="platform-paragraph text-muted-corporate">
			  {isAr
				? "أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب المدعوم بنطاق الحماية الجغرافي (GPS)، محرك احتساب الاستقطاعات التلقائي، والخدمة الذاتية المتكاملة للموظفين لتنظيم الرواتب والعمليات."
				: "Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service."}
			</p>
			<ul className="platform-bullet-list">
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "التعرف على لوحة لوحات المركبات الحية" : "GPS-fenced check-in/out enforcement"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "محرك احتساب الاستقطاعات التلقائي" : "Auto salary deduction engine"}</li>
			  <li className="platform-bullet-item"><span className="bullet-dot-gold"/> {isAr ? "جداول المناوبات المرنة والدليل الرئيسي" : "Shift scheduling & master directory"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-hris.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-launch-platform">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={12} className="inline ml-1" />
			  </a>
			</div>
		  </div>

		  <div className="telemetry-mockup-display">
			<div className="mockup-top-bar">
			  <span>OPERIX HRIS · WORKFORCE BOARD</span>
			  <span className="text-indigo-600 font-sans font-bold">● LIVE FEED</span>
			</div>
			<div className="mockup-inner-body text-xs font-mono space-y-2 text-[#1e2d40] text-left">
			  <div className="bg-white border border-slate-200 p-3 rounded-xl flex justify-between text-[11px] shadow-sm font-sans font-semibold">
				<span className="text-slate-400 uppercase tracking-wider text-[10px] font-black">GPS Fence Status</span>
				<span className="text-indigo-600 font-bold">Site A · Active</span>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  {/* ─── TRANSFORMATION ROADMAP TIMELINE ─── */}
	  <section className="bg-white border-t border-slate-200 py-12 w-full flex flex-col items-center justify-center">
		<div className="max-w-3xl mx-auto text-center px-6 mb-8">
		  <h2 className="text-2xl md:text-3xl font-black">
			{isAr ? "مسار التحول التشغيلي" : "The Path to Transformation"}
		  </h2>
		</div>

		<div className="timeline-container">
		  <div className="timeline-line" />
		  <div className="phase-row-block">
			<div className="phase-indicator-dot" />
			<div className="phase-content-card">
			  <span className="phase-tag">PHASE 01 : DISCOVERY</span>
			  <h4 className="phase-title">{isAr ? "تدقيق وفحص البنية التحتية" : "Architecture Audit"}</h4>
			  <p className="phase-desc text-muted-corporate">
				{isAr 
				  ? "نقوم بتحليل آليات العمل الحالية لديك، قواعد البيانات المشتتة، والاختناقات التشغيلية لتصميم استراتيجية تنفيذ مخصصة لمنظومة أوبيريكس بما يناسب قطاع عملك."
				  : "We analyze your existing workflows, fragmented databases, and operational bottlenecks to design a custom OPERIX implementation strategy tailored to your industry."}
			  </p>
			</div>
		  </div>
		  <div className="phase-row-block">
			<div className="phase-indicator-dot" />
			<div className="phase-content-card">
			  <span className="phase-tag">PHASE 02 : DEPLOYMENT</span>
			  <h4 className="phase-title">{isAr ? "تكامل ومزامنة الأنظمة" : "System Integration"}</h4>
			  <p className="phase-desc text-muted-corporate">
				{isAr
				  ? "ترحيل آمن وسلس لأدلة الموارد البشرية، البيانات المالية، والأصول التقنية بداخل إطار أوبيريكس الموحد، مع تفعيل الدخول الموحد (SSO) وصلاحيات التحكم القائمة على الأدوار."
				  : "Seamless migration of your HR directories, financial data, and IT assets into the OPERIX framework. SSO is established, and Role-Based Access Control is enforced."}
			  </p>
			</div>
		  </div>
		  <div className="phase-row-block">
			<div className="phase-indicator-dot" />
			<div className="phase-content-card">
			  <span className="phase-tag">PHASE 03 : COMMAND</span>
			  <h4 className="phase-title">{isAr ? "القيادة والتحكم اللحظي" : "Live Telemetry"}</h4>
			  <p className="phase-desc text-muted-corporate">
				{isAr
				  ? "يحصل المديرون والتنفيذيون على وصول كامل لمركز القيادة الموحد. تصبح القرارات موجهة بالبيانات الحية، الاتصالات المدعومة بالذكاء الاصطناعي، والتقارير التشغيلية المؤتمتة."
				  : "Your executives gain access to the Global Command Center. Decisions are now driven by real-time data, AI-assisted communications, and automated operational reporting."}
			  </p>
			</div>
		  </div>
		</div>
	  </section>

	  {/* ─── CALL TO ACTION ENTRANCE ─── */}
	  <section className="cta-banner-wrapper">
		<h2 className="text-3xl font-black">
		  {isAr ? "هل أنت مستعد لرفع كفاءة منشأتك؟" : "Ready to Elevate Your Enterprise?"}
		</h2>
		<p className="text-sm text-slate-500 max-w-xl mx-auto font-medium font-sans text-muted-corporate">
		  {isAr 
			? "اطلب عرضاً توضيحياً حياً ومباشراً لمنظومة أوبيريكس المتكاملة المصممة خصيصاً لتلبية متطلبات شركتك."
			: "Request a live demonstration of the OPERIX suite tailored for your organization."}
		</p>
		<div className="pt-2 flex justify-center w-full">
		  <button onClick={() => navigate('/contact')} className="btn-nav-primary px-8 py-3.5 text-xs inline-flex mx-auto cursor-pointer">
			{isAr ? "طلب العرض الآن" : "SCHEDULE A DEMO"}
		  </button>
		</div>
	  </section>

	</div>
  );
}