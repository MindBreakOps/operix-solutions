import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, ArrowLeft, ExternalLink, Globe2, Building2, Car, BadgeCheck, Stethoscope, Users, Settings, FileCheck } from 'lucide-react';
import ReviewsSection from './ReviewsSection';

export default function Home() {
  const navigate = useNavigate();
  const { isAr } = useLanguage();

  const [hits, setHits] = useState(0);
  const [visitors, setVisitors] = useState(0); // Added visitors state
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
   async function logVisitor() {
	 try {
	   // 1. Fetch IP and Country from a public API
	   const response = await fetch('https://ipapi.co/json/');
	   const data = await response.json();
	   
	   const ip = data.ip || '0.0.0.0';
	   const country = data.country_code || 'SA';
 
	   // 2. Insert this data into your Supabase table
	   await supabase
		 .from('operix_visitor_logs')
		 .insert([
		   { 
			 visitor_ip: ip, 
			 ip_country: country, 
			 page_visited: window.location.pathname 
		   }
		 ]);
		 
	   // 3. Now refresh your counts
	   streamTelemetry();
	 } catch (err) {
	   console.error("Error logging visitor:", err);
	 }
   }
   logVisitor();
 }, []);
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
	  maxZoom: 18, minZoom: 2, noWrap: true
	}).addTo(map);

	Object.entries(activeCountries).forEach(([code, count]) => {
	  const coords = countryCoordinates[code];
	  if (coords) {
		L.circleMarker([coords.lat, coords.lon], {
		  radius: 7, fillColor: '#d4af37', color: '#1e2d40', weight: 2, opacity: 1, fillOpacity: 0.9
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
	<div 
	  className="relative w-full min-h-screen font-sans pb-16 bg-slate-50"
	  style={{ 
		backgroundImage: "url('/projects/operix-bg.jpg')", 
		backgroundSize: 'cover', 
		backgroundPosition: 'center', 
		backgroundAttachment: 'fixed' 
	  }}
	>
	  {/* ─── GLASS OVERLAY ─── */}
	  <div className="absolute inset-0 z-0 bg-slate-50/40 backdrop-blur-sm pointer-events-none" />

	  <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 py-10">
		
		{/* ─── HERO SECTION ─── */}
		<header className="w-full text-center py-10 flex flex-col items-center border-b border-slate-200/50 pb-16">
		  <div className="inline-flex items-center gap-2 border border-[#d4af37]/30 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-white shadow-sm mb-6">
			<span className="w-2 h-2 bg-[#d4af37] rounded-full animate-pulse" />
			{isAr ? "برمجيات وإدارة تشغيلية متكاملة" : "Software & Full-Phase Operations"}
		  </div>
		  
		  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-[#1e2d40] leading-tight mb-5 max-w-4xl tracking-tight">
			{isAr ? "تمكين المنشآت الكبرى عبر " : "Empowering Enterprises with "}
			<span className="text-[#d4af37]">{brandName}</span>
		  </h1>
		  
		  <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mb-8">
			{isAr 
			  ? "نحن لا نكتفي ببناء الأنظمة الذكية فحسب، بل نوفر الكوادر الخبيرة لتشغيل وإدارة المرافق، مواقف السيارات، والفعاليات الكبرى على أرض الواقع."
			  : "We don't just build intelligent systems. We deploy the expert personnel to run your facilities, parking grids, and large-scale events flawlessly on the ground."}
		  </p>
		  
		  <button onClick={() => navigate('/contact')} className="bg-[#1e2d40] hover:bg-[#d4af37] transition-colors text-white px-8 py-3.5 rounded-lg text-xs font-black tracking-widest uppercase inline-flex items-center shadow-lg cursor-pointer">
			{isAr ? "طلب عرض تجريبي" : "SCHEDULE A DEMO"} 
			{isAr ? <ArrowLeft size={16} className="ml-2" /> : <ArrowRight size={16} className="ml-2" />}
		  </button>
		</header>

		{/* ─── BENTO GRID: OPERATIONS & MAP ─── */}
		<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
		  
		  {/* Operations Panel */}
		  <div className="lg:col-span-7 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col h-full">
			<h2 className="text-2xl font-black font-serif text-[#1e2d40] mb-2">
			  {isAr ? "إدارة تشغيلية متكاملة" : "Operational Excellence"}
			</h2>
			<p className="text-slate-500 text-sm font-medium mb-6">
			  {isAr
				? "نستخدم أنظمتنا الخاصة لإدارة مشاريعك وتوفير كوادرنا لتشغيلها."
				: "We deploy our proprietary systems alongside our master task force to guarantee success."}
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
			  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col items-start">
				<Building2 size={20} className="text-[#1e2d40] mb-3" />
				<h3 className="text-sm font-black text-[#1e2d40] mb-1">
				  {isAr ? "إدارة المرافق" : "Facility Management"}
				</h3>
				<p className="text-[11px] text-slate-500 font-medium leading-relaxed">
				  {isAr ? "إدارة شاملة للمرافق التجارية ومواقف السيارات الذكية." : "Comprehensive management of commercial facilities and parking grids."}
				</p>
			  </div>
			  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col items-start">
				<Car size={20} className="text-[#d4af37] mb-3" />
				<h3 className="text-sm font-black text-[#1e2d40] mb-1">
				  {isAr ? "الفالي والفعاليات" : "VIP Valet & Events"}
				</h3>
				<p className="text-[11px] text-slate-500 font-medium leading-relaxed">
				  {isAr ? "خدمات ركن السيارات لكبار الشخصيات وإدارة لوجستيات الفعاليات." : "Flawless VIP valet services and logistics management for large-scale events."}
				</p>
			  </div>
			  <div className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm flex flex-col items-start sm:col-span-2">
				<BadgeCheck size={20} className="text-[#1e2d40] mb-3" />
				<h3 className="text-sm font-black text-[#1e2d40] mb-1">
				  {isAr ? "الكوادر البشرية الخبيرة" : "Expert Human Capital"}
				</h3>
				<p className="text-[11px] text-slate-500 font-medium leading-relaxed">
				  {isAr ? "فريق متكامل جاهز لإدارة العمليات الميدانية اليومية لضمان كفاءة لا مثيل لها." : "Our master task force manages day-to-day field operations to guarantee unparalleled efficiency."}
				</p>
			  </div>
			</div>
		  </div>

		  {/* Map Panel */}
		  <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full">
			<div className="flex items-center justify-between mb-4">
			  <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[#d4af37] uppercase">
				<Globe2 size={14} />
				<span>{isAr ? "الخريطة الحية" : "Live Signal Map"}</span>
			  </div>
			  <div className="flex gap-2">
				<div className="text-[10px] font-black text-[#1e2d40] bg-slate-100 border border-slate-200 px-2 py-1 rounded shadow-sm">
				  VISITORS: {visitors.toLocaleString()}
				</div>
				<div className="text-[10px] font-black text-[#1e2d40] bg-slate-100 border border-slate-200 px-2 py-1 rounded shadow-sm">
				  HITS: {hits.toLocaleString()}
				</div>
			  </div>
			</div>
			<div 
			  ref={mapContainerRef} 
			  className="rounded-xl border border-slate-200 shadow-inner flex-grow min-h-[250px]"
			  style={{ width: '100%', backgroundColor: '#f8fafc' }}
			/>
		  </div>
		</div>

		{/* ─── ECOSYSTEM GRID ─── */}
		<div className="mt-8 text-center md:text-left">
		  <h2 className="text-2xl font-black font-serif text-[#1e2d40]">
			{isAr ? "منظومة أوبيريكس السحابية" : `The ${brandName} Ecosystem`}
		  </h2>
		  <p className="text-sm text-slate-500 font-medium mt-1">
			{isAr ? "حلول برمجية متخصصة ومترابطة لدعم عملياتك." : "Specialized, interconnected SaaS solutions to power your operations."}
		  </p>
		</div>

		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
		  {[
			{ 
			  icon: <Settings size={18}/>, title: 'OPERIX Operations', color: 'text-blue-600', 
			  badge: isAr ? 'إدارة ميدانية' : 'FIELD LOGISTICS',
			  desc: isAr ? 'محور العمليات الأساسي ومراقبة الكاميرات الذكية.' : 'Core operations hub, ANPR monitoring, and gig deployment.', 
			  url: 'https://operix-operations.vercel.app' 
			},
			{ 
			  icon: <Users size={18}/>, title: 'OPERIX HRIS', color: 'text-emerald-600', 
			  badge: isAr ? 'الموارد البشرية' : 'HUMAN CAPITAL',
			  desc: isAr ? 'أتمتة الحضور عبر GPS والخدمة الذاتية للموظفين.' : 'GPS-enforced attendance, payroll automation, and self-service.', 
			  url: 'https://operix-hris.vercel.app' 
			},
			{ 
			  icon: <FileCheck size={18}/>, title: 'OPERIX FMIS', color: 'text-[#d4af37]', 
			  badge: isAr ? 'معتمد من هيئة الزكاة' : 'ZATCA PHASE 2',
			  desc: isAr ? 'إدارة مالية مؤسسية. متوافقة تماماً. من عروض الأسعار وحتى الفواتير المعتمدة.' : 'Enterprise Finance. Perfectly Compliant. From pre-sales quotations to ZATCA-cleared invoices.', 
			  url: 'https://operix-fmis.vercel.app' 
			},
			{ 
			  icon: <Stethoscope size={18}/>, title: 'OPERIX Care', color: 'text-rose-600', 
			  badge: isAr ? 'إدارة المستشفيات' : 'CLINICAL HIS',
			  desc: isAr ? 'منظومة الإدارة الطبية المتقدمة والتشخيص الصوتي.' : 'Advanced medical ecosystem, patient history, and voice notes.', 
			  url: 'https://operix-care.vercel.app' 
			}
		  ].map((sys, i) => (
			<div key={i} className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
			  <div className="flex justify-between items-start mb-4">
				<div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-sm ${sys.color}`}>
				  {sys.icon}
				</div>
				<span className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
				  {sys.badge}
				</span>
			  </div>
			  <h3 className="text-sm font-black text-[#1e2d40] mb-2">{sys.title}</h3>
			  <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-5 flex-grow">{sys.desc}</p>
			  
			  <div className="border-t border-slate-100 pt-4 mt-auto">
				<a href={sys.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[#1e2d40] hover:text-[#d4af37] transition-colors flex items-center justify-between">
				  {isAr ? 'زيارة المنصة' : 'LAUNCH PORTAL'} <ExternalLink size={12} />
				</a>
			  </div>
			</div>
		  ))}
		</div>

		{/* ─── REVIEWS SECTION ─── */}
		<div className="mt-8 pt-8 border-t border-slate-200/50">
		  <div className="text-center md:text-left mb-6">
			<h2 className="text-2xl font-black font-serif text-[#1e2d40]">
			  {isAr ? "آراء شركاء النجاح" : "Partner Feedback"}
			</h2>
			<p className="text-sm text-slate-500 font-medium mt-1">
			  {isAr ? "مباشرة من المنصة الموثوقة." : "Live verified reviews from our partners."}
			</p>
		  </div>
		  
		  <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm overflow-hidden text-slate-900">
			<ReviewsSection />
		  </div>
		</div>

		{/* ─── CTA SECTION ─── */}
		<div className="w-full mt-4 bg-[#1e2d40] rounded-2xl p-8 shadow-lg flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
		  <div>
			<h2 className="text-xl md:text-2xl font-black font-serif text-white mb-2">
			  {isAr ? "ارفع كفاءة منشأتك اليوم" : "Ready to Elevate Your Enterprise?"}
			</h2>
			<p className="text-[12px] md:text-sm text-slate-300 font-medium">
			  {isAr 
				? "اطلب عرضاً توضيحياً حياً وتعرف على كيفية إدارة فرقنا لمشروعك على أرض الواقع."
				: "Request a live demonstration and learn how our teams can manage your project on the ground."}
			</p>
		  </div>
		  <button onClick={() => navigate('/contact')} className="shrink-0 bg-[#d4af37] hover:bg-white text-[#1e2d40] px-8 py-3.5 rounded-lg text-xs font-black uppercase tracking-widest shadow-md transition-colors whitespace-nowrap">
			{isAr ? "طلب العرض الآن" : "SCHEDULE A DEMO"}
		  </button>
		</div>

	  </main>
	</div>
  );
}