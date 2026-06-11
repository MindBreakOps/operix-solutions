import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ArrowLeft, ExternalLink, Globe2, Building2, Car, Users, BadgeCheck } from 'lucide-react';
import ReviewsSection from './ReviewsSection';

export default function Home() {
  const navigate = useNavigate();
  const { isAr } = useLanguage();

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

	const map = L.map(mapContainerRef.current, { 
	  zoomControl: true, 
	  attributionControl: false,
	  maxBounds: [[-90, -180], [90, 180]],
	  maxBoundsViscosity: 1.0
	}).setView([24.0, 35.0], 2);
	
	mapInstanceRef.current = map;

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
	<div className="w-full flex flex-col items-center justify-center animate-in font-sans">
	  
	  {/* ─── HERO ARCHITECTURE ─── */}
	  <header className="px-6 pt-16 md:pt-24 pb-12 text-center max-w-3xl mx-auto space-y-6 w-full">
		<div className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white shadow-sm mx-auto">
		  <span className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
		  {isAr ? "برمجيات وإدارة تشغيلية متكاملة" : "SOFTWARE & FULL-PHASE OPERATIONS"}
		</div>
		
		{/* Navy to Gold Gradient Header */}
		<h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
		  {isAr ? "تمكين المنشآت الكبرى عبر " : "Empowering Enterprises with "}
		  <span className="block sm:inline ml-1">{brandName}</span>
		</h1>
		
		<p className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-medium text-slate-500">
		  {isAr 
			? "نحن لا نكتفي ببناء الأنظمة الذكية فحسب، بل نوفر الكوادر الخبيرة لتشغيل وإدارة المرافق، مواقف السيارات، والفعاليات الكبرى على أرض الواقع."
			: "We don't just build intelligent systems. We deploy the expert personnel to run your facilities, parking grids, and large-scale events flawlessly on the ground."}
		</p>
		
		<div className="pt-4">
		  <button onClick={() => navigate('/contact')} className="bg-[#1e2d40] hover:bg-[#d4af37] transition-colors text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-wider uppercase inline-flex items-center shadow-md cursor-pointer">
			{isAr ? "طلب عرض تجريبي" : "SCHEDULE A DEMO"} 
			{isAr ? <ArrowLeft size={14} className="ml-2" /> : <ArrowRight size={14} className="ml-2" />}
		  </button>
		</div>
	  </header>

	  {/* ─── FULL PHASE OPERATIONS & MANAGEMENT ─── */}
	  <section className="max-w-6xl mx-auto w-full my-12 space-y-10 px-6">
		<div className="text-center space-y-4 mb-8">
		  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
			{isAr ? "ما بعد البرمجيات: إدارة تشغيلية متكاملة" : "Beyond Software: Operational Excellence"}
		  </h2>
		  <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium max-w-3xl mx-auto">
			{isAr
			  ? "نحن نستخدم أنظمتنا الخاصة لإدارة مشاريعك، ونوفر أنظمتنا للمنشآت الأخرى. نمتلك فريقاً متكاملاً من مدراء العمليات، المطورين، مدراء الفعاليات، وأخصائيي العلاقات العامة لضمان نجاح مشروعك من الصفر وحتى التشغيل الكامل."
			  : "We use our own proprietary systems to manage your projects, and we provide these systems to others. Backed by a task force of Operations Managers, Software Developers, Event Directors, and PR Specialists, we guarantee complete operational success from deployment to daily management."}
		  </p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
			<div className="w-14 h-14 bg-[#1e2d40] text-white rounded-2xl flex items-center justify-center shadow-md">
			  <Building2 size={24} />
			</div>
			<h3 className="text-lg font-black bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
			  {isAr ? "إدارة المرافق والمواقف" : "Facility & Parking Management"}
			</h3>
			<p className="text-sm text-slate-500 font-medium leading-relaxed">
			  {isAr 
				? "إدارة شاملة للمرافق التجارية ومواقف السيارات بالاعتماد على أنظمة ANPR الذكية والكوادر المدربة لتنظيم الحركة بسلاسة."
				: "Comprehensive management of commercial facilities and parking grids powered by ANPR systems and highly trained operational staff."}
			</p>
		  </div>

		  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
			<div className="w-14 h-14 bg-[#c9a84c] text-white rounded-2xl flex items-center justify-center shadow-md">
			  <Car size={24} />
			</div>
			<h3 className="text-lg font-black bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
			  {isAr ? "خدمة الفالي والفعاليات" : "VIP Valet & Event Operations"}
			</h3>
			<p className="text-sm text-slate-500 font-medium leading-relaxed">
			  {isAr 
				? "تنفيذ احترافي لخدمات ركن السيارات لكبار الشخصيات (VIP) وإدارة العمليات اللوجستية للفعاليات والمواسم الكبرى."
				: "Flawless execution of VIP valet services and flawless logistics management for large-scale events and seasonal festivals."}
			</p>
		  </div>

		  <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center space-y-4">
			<div className="w-14 h-14 bg-[#1e2d40] text-white rounded-2xl flex items-center justify-center shadow-md">
			  <BadgeCheck size={24} />
			</div>
			<h3 className="text-lg font-black bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">
			  {isAr ? "كوادر بشرية خبيرة" : "Expert Human Capital"}
			</h3>
			<p className="text-sm text-slate-500 font-medium leading-relaxed">
			  {isAr 
				? "فريق متكامل يضم مدراء عمليات، مهندسي برمجيات، منظمي فعاليات، وأخصائيي علاقات عامة جاهزون لتشغيل مشروعك."
				: "A master task force including Operations Managers, Software Engineers, Event Organizers, and PR Specialists ready to deploy."}
			</p>
		  </div>
		</div>
	  </section>

	  {/* ─── ATLAS MODULE ─── */}
	  <div className="w-full px-6">
		<section className="max-w-5xl mx-auto border border-slate-200 bg-white p-6 md:p-8 rounded-3xl shadow-sm my-16 w-full space-y-4">
		  <div className="flex items-center justify-center gap-2 text-xs font-black tracking-widest text-[#c9a84c] uppercase">
			<Globe2 size={14} />
			<span>{isAr ? "خريطة البث ومصفوفة الموقع الجغرافي اللحظي" : "Global Live Visitor Signal Map"}</span>
		  </div>
		  <div className="text-sm font-medium text-slate-500 text-center">
			{isAr ? "إجمالي طلبات الاتصال بقاعدة البيانات التشغيلية:" : "Total active data telemetry hits recorded:"}{" "}
			<span className="font-mono font-black text-base bg-slate-100 px-3 py-1 rounded-lg ml-1 text-[#1e2d40]">
			  {hits.toLocaleString()}
			</span>
		  </div>
		  <div 
			ref={mapContainerRef} 
			className="rounded-2xl border border-slate-200 shadow-inner overflow-hidden z-10 my-4"
			style={{ width: '100%', height: '380px', backgroundColor: '#f8fafc' }}
		  />
		</section>
	  </div>

	  {/* ─── THE ECOSYSTEM OVERVIEW ─── */}
	  <section className="max-w-6xl mx-auto space-y-12 w-full px-6">
		<div className="text-center space-y-4 mb-10">
		  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">The {brandName} Ecosystem</h2>
		</div>
		
		{/* ROW A: OPERIX OPERATIONS */}
		<div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-sm hover:shadow-md transition-shadow">
		  <div className="space-y-6 order-2 md:order-1">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-100 px-3 py-1.5 rounded-md">OPERIX SOLUTIONS · OPS</span>
			<h3 className="text-3xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">OPERIX Operations</h3>
			<p className="text-sm leading-relaxed font-medium text-slate-500">
			  {isAr
				? "محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات بكاميرات التعرف الذكي (ANPR)، تنظيم خدمة السيارات (Valet)، والتشغيل الفوري للقوى العاملة المؤقتة والميدانية."
				: "The core operations hub replacing manual logbooks. Comprehensive ANPR parking, valet management, and real-time gig workforce deployment."}
			</p>
			<ul className="space-y-3 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-600">
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "التعرف التلقائي الحي على لوحات المركبات عبر الكاميرات" : "Live ANPR camera plate recognition"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "تتبع أداء القوى العاملة المؤقتة وسائقي خدمة السيارات" : "Gig workforce & Valet performance tracking"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "توليد تلقائي للتذاكر والفواتير الرقمية عبر رمز QR" : "Automated ticket & QR invoice generation"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-operations.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#1e2d40]/90 transition-colors text-white px-6 py-3.5 rounded-xl font-black text-[11px] tracking-wider uppercase shadow-md">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={14} />
			  </a>
			</div>
		  </div>

		  <div className="bg-[#1a2332] rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[280px] order-1 md:order-2 border border-slate-800 p-6 md:p-8">
			<div className="flex justify-between items-center text-[9px] font-black text-slate-500 uppercase tracking-widest mb-6">
			  <span>OPERIX OPS · COMMAND CENTER</span>
			  <span className="text-emerald-400 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"/> LIVE</span>
			</div>
			<div className="flex-grow flex flex-col justify-center space-y-4 font-mono">
			  <div className="bg-white/5 p-5 rounded-xl border border-white/10 flex justify-between items-center">
				<div>
				  <div className="text-[10px] text-slate-500 font-bold mb-1 tracking-wider uppercase">ANPR · GATE A</div>
				  <div className="text-2xl font-black text-[#d4af37] tracking-widest">ABC 1234</div>
				</div>
				<div className="text-[9px] font-black text-amber-500 border border-amber-500/30 px-3 py-1.5 rounded-full uppercase tracking-widest">TICKET GENERATED</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* ROW B: OPERIX CARE */}
		<div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-sm hover:shadow-md transition-shadow">
		  <div className="space-y-6 order-2 md:order-2">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-100 px-3 py-1.5 rounded-md">OPERIX SOLUTIONS · CARE</span>
			<h3 className="text-3xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">OPERIX Health Care</h3>
			<p className="text-sm leading-relaxed font-medium text-slate-500">
			  {isAr
				? "منظومة الإدارة الطبية المتقدمة التي تضم بوابات تفاعلية للأطباء، ملفات شاملة لتاريخ المرضى المرضي، وميزة الإدخال الصوتي التلقائي للملاحظات السريرية وتحويلها إلى نصوص."
				: "Advanced medical management ecosystem featuring doctor portals, comprehensive patient history, and voice-to-text clinical notes."}
			</p>
			<ul className="space-y-3 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-600">
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "التعرف على الصوت لإدخال التشخيص السريع تلقائياً" : "Voice recognition for quick diagnosis entry"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "تاريخ إلكتروني طبي متكامل وشامل للمريض" : "Complete electronic patient history"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "بوابات أمنة ومشفرة بالكامل للأطباء وطاقم التمريض" : "Secure portals for doctors and nurses"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-care.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#1e2d40]/90 transition-colors text-white px-6 py-3.5 rounded-xl font-black text-[11px] tracking-wider uppercase shadow-md">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={14} />
			  </a>
			</div>
		  </div>

		  <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner flex flex-col min-h-[280px] order-1 md:order-1">
			<div className="bg-rose-600 px-6 py-4 flex justify-between items-center text-[9px] font-black text-white uppercase tracking-widest">
			  <span>OPERIX CARE · CLINICAL WORKSPACE</span>
			  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/> VITALS SYNC</span>
			</div>
			<div className="p-6 md:p-8 flex-grow flex flex-col justify-center space-y-4 font-sans">
			  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
				<div className="flex gap-4 items-center">
				  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-black border border-rose-100 text-sm">AY</div>
				  <div>
					<div className="text-sm font-black text-[#1e2d40] mb-0.5">Ahmad Y.</div>
					<div className="text-[10px] font-bold text-slate-400 tracking-wider">ID: P-99201 · STABLE</div>
				  </div>
				</div>
				<div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"/>
			  </div>
			</div>
		  </div>
		</div>

		{/* ROW C: OPERIX HRIS */}
		<div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center shadow-sm hover:shadow-md transition-shadow">
		  <div className="space-y-6 order-2 md:order-1">
			<span className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-100 px-3 py-1.5 rounded-md">OPERIX SOLUTIONS · HRIS</span>
			<h3 className="text-3xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-1">OPERIX HRIS</h3>
			<p className="text-sm leading-relaxed font-medium text-slate-500">
			  {isAr
				? "أتمتة كاملة للموارد البشرية — تسجيل الحضور والغياب المدعوم بنطاق الحماية الجغرافي (GPS)، محرك احتساب الاستقطاعات التلقائي، والخدمة الذاتية المتكاملة للموظفين لتنظيم الرواتب والعمليات."
				: "Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and seamless employee self-service pipelines."}
			</p>
			<ul className="space-y-3 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-600">
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "فرض تسجيل الدخول والخروج بنطاق جغرافي محدد مشفر" : "GPS-fenced check-in/out enforcement"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "محرك احتساب تلقائي للمستحقات والاستقطاعات الشهرية" : "Auto salary deduction engine"}</li>
			  <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full shrink-0"/> {isAr ? "جداول المناوبات المرنة والدليل الرئيسي للموظفين" : "Shift scheduling & master directory"}</li>
			</ul>
			<div className="pt-2 text-left">
			  <a href="https://operix-hris.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1e2d40] hover:bg-[#1e2d40]/90 transition-colors text-white px-6 py-3.5 rounded-xl font-black text-[11px] tracking-wider uppercase shadow-md">
				{isAr ? "تشغيل المنصة المباشرة" : "LAUNCH PLATFORM"} <ExternalLink size={14} />
			  </a>
			</div>
		  </div>

		  <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner flex flex-col min-h-[280px] order-1 md:order-2">
			<div className="bg-emerald-700 px-6 py-4 flex justify-between items-center text-[9px] font-black text-white uppercase tracking-widest">
			  <span>OPERIX HRIS · WORKFORCE BOARD</span>
			  <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"/> LIVE FEED</span>
			</div>
			<div className="p-6 md:p-8 flex-grow flex flex-col justify-center space-y-3 font-sans">
			  <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center text-[11px] shadow-sm font-semibold">
				<span className="text-slate-400 uppercase tracking-wider text-[10px] font-black">GPS FENCE STATUS</span>
				<span className="text-emerald-600 font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">SITE A · ACTIVE</span>
			  </div>
			  <div className="bg-white border border-slate-200 p-4 rounded-xl flex justify-between items-center text-[11px] shadow-sm font-semibold">
				<span className="text-slate-400 uppercase tracking-wider text-[10px] font-black">ACTIVE SHIFTS</span>
				<span className="text-[#1e2d40] font-black">14 PERSONNEL</span>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  {/* ─── TRANSFORMATION ROADMAP TIMELINE ─── */}
	  <section className="w-full bg-white border-t border-slate-200 py-20 mt-16 font-sans">
		<div className="max-w-4xl mx-auto px-6">
		  <h2 className="text-3xl md:text-4xl font-black text-center mb-16 font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "مسار التحول التشغيلي" : "The Path to Transformation"}
		  </h2>

		  <div className="space-y-10 relative">
			<div className="hidden md:block absolute left-[110px] top-4 bottom-4 w-0.5 bg-slate-200"></div>

			<div className="flex flex-col md:flex-row gap-4 md:gap-12 relative z-10">
			  <div className="md:w-[90px] shrink-0 text-left md:text-right pt-1">
				<span className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-100 px-2 py-1 rounded">PHASE 01</span>
			  </div>
			  <div className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
				<div className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">DISCOVERY</div>
				<h4 className="text-lg font-black text-[#1e2d40] mb-2 font-serif">{isAr ? "تدقيق وفحص البنية التحتية" : "Architecture Audit"}</h4>
				<p className="text-sm text-slate-500 font-medium leading-relaxed">
				  {isAr 
					? "نقوم بتحليل آليات العمل الحالية لديك، قواعد البيانات المشتتة، والاختناقات التشغيلية لتصميم استراتيجية تنفيذ مخصصة لمنظومة أوبيريكس بما يناسب قطاع عملك."
					: "We analyze your existing workflows, fragmented databases, and operational bottlenecks to design a custom OPERIX implementation strategy tailored to your industry."}
				</p>
			  </div>
			</div>

			<div className="flex flex-col md:flex-row gap-4 md:gap-12 relative z-10">
			  <div className="md:w-[90px] shrink-0 text-left md:text-right pt-1">
				<span className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] bg-slate-100 px-2 py-1 rounded">PHASE 02</span>
			  </div>
			  <div className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
				<div className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-1">DEPLOYMENT</div>
				<h4 className="text-lg font-black text-[#1e2d40] mb-2 font-serif">{isAr ? "تكامل ومزامنة الأنظمة والكوادر" : "System & Team Integration"}</h4>
				<p className="text-sm text-slate-500 font-medium leading-relaxed">
				  {isAr
					? "ترحيل آمن وسلس لبياناتك بداخل إطار أوبيريكس الموحد، مع توفير الكوادر البشرية الخبيرة لتدريب الموظفين وبدء عمليات التشغيل الميداني."
					: "Seamless migration of your data into the OPERIX framework, while our expert human capital is deployed to train staff and launch field operations."}
				</p>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  <ReviewsSection />

	  {/* ─── CALL TO ACTION ENTRANCE ─── */}
	  <section className="w-full bg-[#f8fafc] py-24 px-6 text-center font-sans border-t border-slate-200">
		<div className="max-w-3xl mx-auto space-y-6">
		  <h2 className="text-3xl md:text-4xl font-black font-serif bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent pb-2">
			{isAr ? "هل أنت مستعد لرفع كفاءة منشأتك؟" : "Ready to Elevate Your Enterprise?"}
		  </h2>
		  <p className="text-sm md:text-base text-slate-500 font-medium">
			{isAr 
			  ? "اطلب عرضاً توضيحياً حياً ومباشراً للأنظمة، وتعرف على كيفية إدارة فرقنا لمشروعك على أرض الواقع."
			  : "Request a live demonstration of the OPERIX suite and learn how our teams can manage your project on the ground."}
		  </p>
		  <div className="pt-4">
			<button onClick={() => navigate('/contact')} className="bg-[#151c28] text-white px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md hover:bg-[#d4af37] transition-colors cursor-pointer">
			  {isAr ? "طلب العرض الآن" : "SCHEDULE A DEMO"}
			</button>
		  </div>
		</div>
	  </section>

	</div>
  );
}