import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Zap, Users, Settings, Activity, FileText, 
  Check, Plus, Minus, CreditCard, Globe, 
  LayoutGrid, ShieldCheck, ArrowRight, ArrowLeft,
  Eye, Printer
} from 'lucide-react';

// ─── API CONFIG ───
const OPS_API   = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const DOCS_API  = 'https://script.google.com/macros/s/AKfycbxX5si41SuQj-yhGsrexa8snsaT0VgoPw0EHo7GGE9AAbEN6uKTA4qpmA9jdQFJpEC_/exec';
const TARGET_EMAIL = 'subscription@operix-solutions.com';
const VAT_RATE  = 0.15;

/* ── Shared Reveal Hook ───────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -20px 0px' }
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
	  transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform',
	  ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

// ─── MOCK LEDGER DATA ───
const ledgerHistory = [
  {
	ref: 'INV-2026-041',
	date: '01 Jun 2026',
	time: '10:45 AM',
	clientName: 'Enterprise Corp LTD',
	clientTRN: '300000000000003',
	address: 'Riyadh, King Fahd Road, 12211',
	description: 'OPERIX Suite (Phase 2)',
	items: [
	  { name: 'OPERIX HRIS (Annual License)', qty: 1, unitPrice: 18000, discount: 3600, taxable: 14400, vat: 2160, total: 16560 },
	  { name: 'OPERIX Operations (Annual License)', qty: 1, unitPrice: 14400, discount: 2880, taxable: 11520, vat: 1728, total: 13248 },
	  { name: 'OPERIX FMIS Pro (Annual License)', qty: 1, unitPrice: 5988, discount: 1197.6, taxable: 4790.4, vat: 718.56, total: 5508.96 }
	],
	status: 'PAID',
	grandTotal: 35316.96
  },
  {
	ref: 'INV-2026-028',
	date: '01 May 2026',
	time: '09:12 AM',
	clientName: 'Enterprise Corp LTD',
	clientTRN: '300000000000003',
	address: 'Riyadh, King Fahd Road, 12211',
	description: 'OPERIX Core Modules (Monthly)',
	items: [
	  { name: 'OPERIX HRIS (Monthly License)', qty: 1, unitPrice: 1500, discount: 0, taxable: 1500, vat: 225, total: 1725 },
	  { name: 'OPERIX Operations (Monthly License)', qty: 1, unitPrice: 1200, discount: 0, taxable: 1200, vat: 180, total: 1380 }
	],
	status: 'PAID',
	grandTotal: 3105
  }
];

// ─── SVG QR CODE GENERATOR ───
const ZATCAQRCode = () => (
  <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="border border-slate-200 rounded p-1 bg-white">
	<rect width="100" height="100" fill="white"/>
	<path d="M10 10h24v24H10V10zm6 6v12h12V16H16z" fill="#1e2d40"/>
	<path d="M66 10h24v24H66V10zm6 6v12h12V16H72z" fill="#1e2d40"/>
	<path d="M10 66h24v24H10V66zm6 6v12h12V72H16z" fill="#1e2d40"/>
	<rect x="42" y="10" width="16" height="16" fill="#1e2d40"/>
	<rect x="10" y="42" width="16" height="16" fill="#1e2d40"/>
	<rect x="42" y="42" width="16" height="16" fill="#1e2d40"/>
	<rect x="66" y="42" width="24" height="24" fill="#1e2d40"/>
	<rect x="42" y="66" width="16" height="24" fill="#1e2d40"/>
	<rect x="74" y="74" width="8" height="8" fill="white"/>
	<rect x="36" y="24" width="4" height="4" fill="#1e2d40"/>
	<rect x="24" y="36" width="4" height="4" fill="#1e2d40"/>
	<rect x="60" y="24" width="4" height="4" fill="#1e2d40"/>
	<rect x="60" y="60" width="4" height="4" fill="#1e2d40"/>
	<rect x="36" y="60" width="4" height="4" fill="#1e2d40"/>
	<rect x="24" y="24" width="4" height="4" fill="#1e2d40"/>
	<rect x="74" y="24" width="4" height="4" fill="#1e2d40"/>
  </svg>
);

export default function Subscription() {
  const { isAr } = useLanguage();
  
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeView, setActiveView] = useState('modules');
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', employees: '1-50' });
  const [viewingInvoice, setViewingInvoice] = useState(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
	if (showModal || viewingInvoice) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'unset';
	return () => { document.body.style.overflow = 'unset'; };
  }, [showModal, viewingInvoice]);

  const handlePrint = () => {
	window.print();
  };

  // ─── MODULES ───
  const [modules, setModules] = useState({
	hris: { 
	  active: true, price: 1500, title: 'OPERIX HRIS', 
	  desc: 'Core human capital management, payroll & recruiting rosters.', 
	  icon: <Users size={22} />, colorTheme: 'text-[#1e2d40]', bgTheme: 'bg-slate-100'
	},
	operations: { 
	  active: true, price: 1200, title: 'OPERIX Operations', 
	  desc: 'Field logistics, live ANPR capture, & gig workforce trackers.', 
	  icon: <Settings size={22} />, colorTheme: 'text-[#1e2d40]', bgTheme: 'bg-slate-100' 
	},
	fmis: { 
	  active: true, price: 499, title: 'OPERIX FMIS (Pro)', 
	  desc: 'Unlimited invoices, ZATCA Phase 2 integration, & ledger analytics.', 
	  icon: <CreditCard size={22} />, colorTheme: 'text-[#c5a059]', bgTheme: 'bg-[#c5a059]/10' 
	},
	care: { 
	  active: false, price: 4500, title: 'OPERIX Care (Medical)', 
	  desc: 'Full HIS, clinical patient dashboards, & ECR nodes.', 
	  icon: <Activity size={22} />, colorTheme: 'text-[#1e2d40]', bgTheme: 'bg-slate-100' 
	},
	website: {
	  active: false, price: 2500, title: 'Corporate Website',
	  desc: 'High-end bespoke UI/UX, CMS integration, and premium branding.',
	  icon: <Globe size={22} />, colorTheme: 'text-[#1e2d40]', bgTheme: 'bg-slate-100'
	},
	system: {
	  active: false, price: 8500, title: 'Custom Architecture',
	  desc: 'Bespoke operational software built to your exact specifications.',
	  icon: <LayoutGrid size={22} />, colorTheme: 'text-[#c5a059]', bgTheme: 'bg-[#c5a059]/10'
	}
  });

  const features = {
	hris: [isAr ? 'الخدمة الذاتية وبصمة الوجه' : 'Employee Self-Service & Face-ID', isAr ? 'أتمتة الرواتب وتصدير WPS' : 'Automated Payroll & WPS Export', isAr ? 'جدولة الورديات والدليل الشامل' : 'Shift Scheduling & Master Directory'],
	operations: [isAr ? 'تسجيل تلقائي عبر كاميرات ANPR' : 'Live ANPR Camera Auto-Log', isAr ? 'تتبع مصفوفة أداء الفالي' : 'Valet Performance Matrix Tracking', isAr ? 'فوترة ذكية لرموز QR' : 'Automated Ticket & QR Invoicing'],
	fmis: [isAr ? 'عدد غير محدود من الفواتير' : 'Unlimited Invoices', isAr ? 'تكامل كامل مع المرحلة 2 لـ ZATCA' : 'Full ZATCA Phase 2 Integration', isAr ? 'إدارة متقدمة للخزانة' : 'Advanced FMIS & Treasury'],
	care: [isAr ? 'تحويل الصوت إلى نص للتشخيصات' : 'Voice-to-Text Clinical Synthesis', isAr ? 'التاريخ الصحي الإلكتروني للمريض' : 'Electronic Patient Health History', isAr ? 'بيئة آمنة للأطباء والممرضين' : 'Secure Physician/Nurse Environment'],
	website: [isAr ? 'تصميم واجهة مستخدم مخصصة' : 'Bespoke UI/UX Design', isAr ? 'تكامل إدارة المحتوى CMS' : 'Headless CMS Integration', isAr ? 'تحسين محركات البحث والأداء' : 'SEO & Performance Optimization'],
	system: [isAr ? 'أتمتة مخصصة لسير العمل' : 'Custom Workflow Automation', isAr ? 'بنية قواعد بيانات مخصصة' : 'Dedicated Database Architecture', isAr ? 'تكامل API والخطافات' : 'API Integrations & Webhooks']
  };

  const isAnnual = billingCycle === 'yearly';
  const selectedModules = Object.values(modules).filter(m => m.active);
  const totalOriginal = selectedModules.reduce((acc, m) => acc + m.price, 0);
  const totalDiscount = isAnnual ? totalOriginal * 0.2 : 0;
  const subtotalAfterSale = totalOriginal - totalDiscount;
  const vatValue = subtotalAfterSale * VAT_RATE;
  const grandTotal = subtotalAfterSale + vatValue;

  const handleCheckoutSubmit = async (e) => {
	e.preventDefault();
	setIsSubmitting(true);
	const cycleText = isAnnual ? 'Annual Billing' : 'Monthly Billing';
	const selectedNames = selectedModules.map(m => m.title).join(', ');

	const adminBody = `NEW ENTERPRISE SUBSCRIPTION\n\nContact: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nModules: ${selectedNames}\nGrand Total: SAR ${grandTotal.toLocaleString()}`;

	try {
	  await fetch(OPS_API,  { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `Subscription: ${formData.company}`, body: adminBody }) });
	  alert(isAr ? `تم تقديم الطلب بنجاح!` : `Request processed successfully.`);
	  setShowModal(false);
	  setFormData({ name: '', email: '', company: '', employees: '1-50' });
	} catch {
	  alert('Error processing request.');
	} finally {
	  setIsSubmitting(false);
	}
  };

  return (
	<div className={`w-full min-h-screen bg-[#f8fafc] font-sans pb-32 ${isAr ? "font-['Cairo','Tajawal',sans-serif]" : "font-sans"}`}>
	  
	  <style>{`
		@keyframes gridPulseDark { 0%, 100% { opacity: 0.05; } 50% { opacity: 0.1; } }
		@keyframes floatGlow { 0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; } 50% { transform: translateY(-20px) scale(1.05); opacity: 0.25; } }
		@keyframes shimmerGold { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
		.premium-gold-text { background: linear-gradient(to right, #c5a059 0%, #f3de9a 40%, #c5a059 80%); background-size: 200% auto; color: transparent; -webkit-background-clip: text; background-clip: text; animation: shimmerGold 5s linear infinite; }
		.no-scrollbar::-webkit-scrollbar { display: none; }
		.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
		
		/* ─── FLAWLESS A4 PRINT ENGINE ─── */
		@media print {
		  @page { size: A4 portrait; margin: 10mm; }
		  body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; }
		  body * { visibility: hidden; }
		  
		  /* Show only the invoice container */
		  .invoice-print-container, .invoice-print-container * { visibility: visible; }
		  
		  .invoice-print-container { 
			position: absolute; left: 0; top: 0; width: 100%; height: auto; min-height: 100vh;
			margin: 0; padding: 0; border: none; box-shadow: none !important;
			overflow: visible !important; background: white !important;
		  }
		  
		  /* Prevent elements from breaking across pages */
		  tr, .totals-box { page-break-inside: avoid; }
		  
		  /* Hide non-printable elements inside the modal */
		  .no-print { display: none !important; }
		}
	  `}</style>

	  {/* ─── HERO SECTION ─── */}
	  <div className="relative overflow-hidden bg-[#1e2d40] border-b-4 border-[#c5a059] pt-24 pb-20 no-print">
		<div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '48px 48px', animation: 'gridPulseDark 6s ease-in-out infinite' }} />
		<div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none blur-[120px]" style={{ background: '#c5a059', animation: 'floatGlow 8s ease-in-out infinite' }} />

		<div className="relative z-10 max-w-6xl mx-auto px-4 text-center" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
		  <Reveal>
			<div className="inline-flex items-center gap-2 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] px-4 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(197,160,89,0.15)]">
			  <Zap size={14} className="animate-pulse" />
			  <span className="text-[10px] font-black uppercase tracking-widest">
				{isAr ? "منشئ البنية التحتية" : "ENTERPRISE ARCHITECTURE BUILDER"}
			  </span>
			</div>
		  </Reveal>
		  
		  <Reveal delay={150}>
			<h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
			  {isAr ? (
				<>صمم بيئة عملك الرقمية<br /><span className="premium-gold-text">بدقة تامة</span></>
			  ) : (
				<>Configure Your Digital Environment<br />with <span className="premium-gold-text">Absolute Precision</span></>
			  )}
			</h1>
		  </Reveal>
		</div>
	  </div>

	  {/* ─── CONFIGURATOR CONTROLS ─── */}
	  <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 no-print">
		<Reveal>
		  <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			<div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
			  <button onClick={() => setActiveView('modules')} className={`shrink-0 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${activeView === 'modules' ? 'bg-[#1e2d40] text-[#c5a059] shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>
				<LayoutGrid size={15}/> {isAr ? "الوحدات التشغيلية" : "Module Configurator"}
			  </button>
			  <button onClick={() => setActiveView('ledger')} className={`shrink-0 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-colors flex items-center gap-2 ${activeView === 'ledger' ? 'bg-[#1e2d40] text-[#c5a059] shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}>
				<FileText size={15}/> {isAr ? "سجل الفواتير السابقة" : "Corporate Ledger"}
			  </button>
			</div>

			{activeView === 'modules' && (
			  <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
				<button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${!isAnnual ? 'bg-white shadow-sm text-[#1e2d40]' : 'text-slate-400 hover:text-slate-600'}`}>
				  {isAr ? "دفع شهري" : "Monthly"}
				</button>
				<button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${isAnnual ? 'bg-[#1e2d40] shadow-sm text-white' : 'text-slate-400 hover:text-slate-600'}`}>
				  {isAr ? "دفع سنوي" : "Annual"}
				  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${isAnnual ? 'bg-[#c5a059] text-[#1e2d40]' : 'bg-slate-200 text-slate-500'}`}>-20%</span>
				</button>
			  </div>
			)}
		  </div>
		</Reveal>
	  </div>

	  {/* ─── MAIN CONTENT AREA ─── */}
	  {activeView === 'modules' ? (
		<div className="max-w-7xl mx-auto px-4 pb-24 no-print">
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			{Object.entries(modules).map(([key, mod], idx) => (
			  <Reveal key={key} delay={idx * 100}>
				<div 
				  className={`relative bg-white rounded-3xl p-8 flex flex-col justify-between h-full transition-all duration-500 cursor-pointer overflow-hidden border-2 ${mod.active ? 'border-[#c5a059] shadow-[0_10px_40px_rgba(197,160,89,0.15)] -translate-y-1' : 'border-slate-100 hover:border-slate-300 hover:shadow-lg'}`}
				  onClick={() => setModules(prev => ({ ...prev, [key]: { ...prev[key], active: !prev[key].active } }))}
				>
				  <div className="relative z-10">
					<div className="flex justify-between items-start mb-6">
					  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm ${mod.active ? 'bg-[#1e2d40] text-[#c5a059] scale-110' : `${mod.bgTheme} ${mod.colorTheme}`}`}>
						{mod.icon}
					  </div>
					  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${mod.active ? 'bg-[#c5a059]/10 text-[#c5a059] border-[#c5a059]/30' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
						{mod.active ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
						{mod.active ? (isAr ? "محدد" : "Selected") : (isAr ? "إضافة" : "Select")}
					  </div>
					</div>
					<h3 className="text-xl font-black text-[#1e2d40] mb-2">{mod.title}</h3>
					<p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 min-h-[42px]">{mod.desc}</p>
					<ul className="space-y-3 border-t border-slate-100 pt-5 mb-8">
					  {features[key].map((f, i) => (
						<li key={i} className="flex items-start gap-3 text-xs font-semibold text-slate-600 leading-snug">
						  <Check size={14} className="text-[#c5a059] shrink-0 mt-0.5" strokeWidth={3} />
						  <span>{f}</span>
						</li>
					  ))}
					</ul>
				  </div>
				  <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 flex items-end justify-between">
					<div className="flex flex-col">
					  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? "الاستثمار" : "Investment"}</span>
					  <div className="text-3xl font-black font-mono text-[#1e2d40] leading-none">
						<span className="text-lg text-slate-400 font-sans mr-1">SAR</span>
						{(isAnnual ? mod.price * 0.8 : mod.price).toLocaleString()}
					  </div>
					</div>
					<span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{isAr ? "/ شهرياً" : "/ MO"}</span>
				  </div>
				</div>
			  </Reveal>
			))}
		  </div>
		</div>
	  ) : (
		<div className="max-w-7xl mx-auto px-4 pb-24 no-print">
		  <Reveal>
			<div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
			  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
				<ShieldCheck size={28} className="text-[#c5a059]" />
				<div>
				  <h3 className="text-xl font-black text-[#1e2d40]">{isAr ? "سجل الفواتير الضريبية" : "ZATCA Tax Ledger"}</h3>
				  <p className="text-sm text-slate-500 font-medium">{isAr ? "سجل تاريخي لجميع المعاملات المالية الموثقة." : "Immutable historical record of all verified financial transactions."}</p>
				</div>
			  </div>
			  <div className="overflow-x-auto no-scrollbar">
				<table className="w-full text-left text-sm border-collapse min-w-[800px]">
				  <thead>
					<tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-200">
					  <th className="p-5 rounded-l-xl">Invoice Ref</th>
					  <th className="p-5">Issue Date</th>
					  <th className="p-5">Ecosystem Licenses</th>
					  <th className="p-5">Amount</th>
					  <th className="p-5">Status</th>
					  <th className="p-5 rounded-r-xl text-right">Action</th>
					</tr>
				  </thead>
				  <tbody>
					{ledgerHistory.map((invoice, idx) => (
					  <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
						<td className="p-5 font-mono font-bold text-[#1e2d40]">{invoice.ref}</td>
						<td className="p-5 text-slate-600 font-medium">{invoice.date}</td>
						<td className="p-5 font-bold text-[#1e2d40]">{invoice.description}</td>
						<td className="p-5 font-mono font-bold text-[#c5a059]">SAR {invoice.grandTotal.toLocaleString()}</td>
						<td className="p-5">
						  <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5 w-max">
							<Check size={12} strokeWidth={3}/> PAID
						  </span>
						</td>
						<td className="p-5 text-right">
						  <button 
							onClick={() => setViewingInvoice(invoice)}
							className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-[#c5a059] hover:text-[#c5a059] text-slate-500 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-sm group-hover:shadow"
						  >
							<Eye size={14} /> {isAr ? "عرض الفاتورة" : "VIEW PDF"}
						  </button>
						</td>
					  </tr>
					))}
				  </tbody>
				</table>
			  </div>
			</div>
		  </Reveal>
		</div>
	  )}

	  {/* ─── STICKY GLASSMORPHIC CHECKOUT BAR (For Modules) ─── */}
	  {activeView === 'modules' && (
		<div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none no-print" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
		  <div className="max-w-5xl mx-auto bg-[#1e2d40]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto transform transition-transform duration-500">
			<div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
			  <div className="hidden md:flex w-14 h-14 bg-white/5 rounded-xl border border-white/10 items-center justify-center shrink-0">
				<FileText size={24} className="text-[#c5a059]" />
			  </div>
			  <div>
				<p className="text-[10px] font-black uppercase tracking-widest text-[#c5a059] mb-1">
				  {isAr ? "إجمالي الفاتورة (شاملة الضريبة)" : "Grand Total (Inc. 15% VAT)"}
				</p>
				<div className="text-3xl font-black font-mono text-white leading-none">
				  <span className="text-lg text-slate-400 font-sans mr-2">SAR</span>
				  {grandTotal.toLocaleString()}
				</div>
			  </div>
			</div>
			<div className="flex items-center gap-4 w-full md:w-auto">
			  <button onClick={() => setShowModal(true)} disabled={selectedModules.length === 0} className="w-full md:w-auto bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#1e2d40] font-black px-8 py-4 rounded-xl text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50">
				{isAr ? "إصدار عقد الاشتراك" : "Generate Subscription"}
				{isAr ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
			  </button>
			</div>
		  </div>
		</div>
	  )}

	  {/* ─── CHECKOUT FORM MODAL ─── */}
	  {showModal && (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 no-print" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
		  <div className="absolute inset-0 bg-[#060c12]/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
		  <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 p-8">
			 <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
			   <div>
				 <h2 className="text-2xl font-black text-[#1e2d40]">{isAr ? "معلومات المنشأة" : "Enterprise Details"}</h2>
				 <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
				   {isAr ? "إصدار الفاتورة الضريبية" : "ZATCA Invoice Initialization"}
				 </p>
			   </div>
			   <button onClick={() => setShowModal(false)} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
				 <span className="text-xl font-bold leading-none">&times;</span>
			   </button>
			 </div>

			 <form onSubmit={handleCheckoutSubmit} className="space-y-5">
				{[
				  { label: isAr ? 'الاسم الكامل للمفوض' : 'Authorized Representative', field: 'name', type: 'text', placeholder: 'John Doe' },
				  { label: isAr ? 'البريد الإلكتروني للعمل' : 'Corporate Email', field: 'email', type: 'email', placeholder: 'director@enterprise.com' },
				  { label: isAr ? 'الكيان التجاري' : 'Registered Entity Name', field: 'company', type: 'text', placeholder: 'Enterprise Corp LTD' },
				].map(({ label, field, type, placeholder }) => (
				  <div key={field}>
					<label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-500">{label}</label>
					<input type={type} placeholder={placeholder} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required 
						   className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none transition-all focus:border-[#c5a059] bg-slate-50 text-[#1e2d40]"/>
				  </div>
				))}
				<button type="submit" disabled={isSubmitting} className="w-full bg-[#1e2d40] text-white px-10 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-[#2a3f5a] transition-all mt-4">
				  {isSubmitting ? (isAr ? 'جاري التوثيق...' : 'AUTHENTICATING...') : (isAr ? 'إصدار الفاتورة المعتمدة' : 'DISPATCH ZATCA INVOICE')}
				</button>
			 </form>
		  </div>
		</div>
	  )}

	  {/* ─── REAL ZATCA INVOICE PDF VIEWER ─── */}
	  {viewingInvoice && (
		<div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6" style={{ direction: 'ltr' }}>
		  
		  {/* Backdrop (hidden when printing) */}
		  <div className="absolute inset-0 bg-[#060c12]/90 backdrop-blur-md no-print" onClick={() => setViewingInvoice(null)} />
		  
		  {/* Modal Container */}
		  <div className="relative w-full h-full sm:h-auto max-h-[95vh] max-w-4xl bg-slate-100 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 invoice-print-container">
			
			{/* Top Action Bar (Hidden when printing) */}
			<div className="px-6 py-4 bg-[#1e2d40] flex items-center justify-between shrink-0 no-print">
			  <div className="flex items-center gap-3 text-white">
				<FileText size={18} className="text-[#c5a059]" />
				<span className="font-bold text-sm tracking-wide">ZATCA_Invoice_{viewingInvoice.ref}.pdf</span>
			  </div>
			  <div className="flex items-center gap-3">
				<button onClick={handlePrint} className="flex items-center gap-2 bg-[#c5a059] hover:bg-white hover:text-[#1e2d40] text-[#1e2d40] px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all">
				  <Printer size={14} /> Download PDF
				</button>
				<button onClick={() => setViewingInvoice(null)} className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-colors">
				  <span className="text-xl font-bold leading-none">&times;</span>
				</button>
			  </div>
			</div>

			{/* ─── THE A4 INVOICE PAPER ─── */}
			<div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 flex justify-center print:p-0 print:overflow-visible print:block">
			  <div className="w-full max-w-[800px] bg-white sm:shadow-lg rounded-sm p-8 sm:p-12 relative print:shadow-none print:p-0 print:max-w-none print:w-full print:block print:h-auto">
				
				{/* INVOICE HEADER (MATCHING OPERIX TEMPLATE) */}
				<div className="flex flex-col w-full border border-slate-300 mb-8 rounded-t-lg overflow-hidden print:rounded-none">
				  <div className="flex w-full">
					{/* Left: Text Info */}
					<div className="flex-1 p-5 border-r border-slate-300 flex flex-col justify-center bg-white">
					  <div className="mb-4">
						<h1 className="text-3xl sm:text-4xl tracking-[0.35em] font-black text-[#1e2d40] uppercase">O P E R I X</h1>
						<h2 className="text-2xl sm:text-3xl font-bold text-[#1e2d40] tracking-wide mt-1">
						  Solutions <span className="text-xs align-top text-[#c5a059]">®</span>
						</h2>
					  </div>
					  <div className="text-[10px] font-semibold text-slate-700 leading-tight space-y-1">
						<p>Phone. +966500823643 | Email. info@operix-solutions.com</p>
						<p>Address. Riyadh, SA | Web. www.operix-solutions.com</p>
					  </div>
					</div>
					{/* Right: Logo */}
					<div className="w-48 p-5 flex items-center justify-center bg-white shrink-0">
					  <img src="/logo.png" alt="OPERIX Logo" className="w-24 sm:w-28 object-contain" />
					</div>
				  </div>
				  
				  {/* Dark Bar */}
				  <div className="w-full bg-[#1e2d40] text-white flex justify-between items-center px-5 py-2.5 border-t border-slate-300">
					<div className="text-[#c5a059] font-black tracking-[0.25em] uppercase text-xs sm:text-sm">T A X I N V O I C E</div>
					<div className="text-xs font-semibold tracking-wide text-slate-200">REF: {viewingInvoice.ref} | {viewingInvoice.date}</div>
				  </div>
				</div>

				{/* INVOICE META & ZATCA DETAILS */}
				<div className="flex justify-between items-start mb-8">
				  <div className="space-y-1.5 text-xs text-slate-600">
					<p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Billed To (العميل)</p>
					<p className="font-bold text-sm text-[#1e2d40]">{viewingInvoice.clientName}</p>
					<p><span className="font-bold text-slate-800">VAT Number:</span> {viewingInvoice.clientTRN}</p>
					<p><span className="font-bold text-slate-800">Address:</span> {viewingInvoice.address}</p>
				  </div>
				  
				  <div className="flex flex-col items-end text-right gap-3">
					<div className="flex gap-4 items-center">
					  <div className="text-right text-xs">
						<p className="font-bold text-slate-800">OPERIX VAT No:</p>
						<p className="font-mono text-slate-600">312345678900003</p>
						<div className="mt-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 justify-end">
						  <ShieldCheck size={12} /> ZATCA Phase 2 Cleared
						</div>
					  </div>
					  <ZATCAQRCode />
					</div>
				  </div>
				</div>

				{/* LINE ITEMS TABLE */}
				<div className="border border-slate-300 rounded-lg overflow-hidden print:rounded-none">
				  <table className="w-full text-left text-[11px] sm:text-xs border-collapse">
					<thead>
					  <tr className="bg-[#1e2d40] text-white">
						<th className="p-2 sm:p-3 font-bold border-r border-slate-600">Description<br/><span className="text-[9px] font-normal text-slate-300">الوصف</span></th>
						<th className="p-2 sm:p-3 font-bold text-center border-r border-slate-600">Qty<br/><span className="text-[9px] font-normal text-slate-300">الكمية</span></th>
						<th className="p-2 sm:p-3 font-bold text-right border-r border-slate-600">Unit Price<br/><span className="text-[9px] font-normal text-slate-300">سعر الوحدة</span></th>
						<th className="p-2 sm:p-3 font-bold text-right border-r border-slate-600">Discount<br/><span className="text-[9px] font-normal text-slate-300">الخصم</span></th>
						<th className="p-2 sm:p-3 font-bold text-right border-r border-slate-600">Taxable Amt<br/><span className="text-[9px] font-normal text-slate-300">المبلغ الخاضع</span></th>
						<th className="p-2 sm:p-3 font-bold text-right border-r border-slate-600">VAT (15%)<br/><span className="text-[9px] font-normal text-slate-300">الضريبة</span></th>
						<th className="p-2 sm:p-3 font-bold text-right text-[#c5a059]">Total (SAR)<br/><span className="text-[9px] font-normal text-[#c5a059]/80">المجموع</span></th>
					  </tr>
					</thead>
					<tbody>
					  {viewingInvoice.items.map((item, idx) => (
						<tr key={idx} className="border-b border-slate-300 last:border-b-0 bg-white">
						  <td className="p-2 sm:p-3 font-medium text-slate-800 border-r border-slate-300">{item.name}</td>
						  <td className="p-2 sm:p-3 text-center font-mono border-r border-slate-300">{item.qty}</td>
						  <td className="p-2 sm:p-3 text-right font-mono border-r border-slate-300">{item.unitPrice.toLocaleString()}</td>
						  <td className="p-2 sm:p-3 text-right font-mono text-red-600 border-r border-slate-300">{item.discount > 0 ? `-${item.discount.toLocaleString()}` : '0'}</td>
						  <td className="p-2 sm:p-3 text-right font-mono border-r border-slate-300">{item.taxable.toLocaleString()}</td>
						  <td className="p-2 sm:p-3 text-right font-mono border-r border-slate-300">{item.vat.toLocaleString()}</td>
						  <td className="p-2 sm:p-3 text-right font-mono font-bold text-[#1e2d40]">{item.total.toLocaleString()}</td>
						</tr>
					  ))}
					</tbody>
				  </table>
				</div>

				{/* TOTALS SUMMARY */}
				<div className="flex justify-end mt-6 mb-12 totals-box">
				  <div className="w-72 sm:w-80 bg-slate-50 border border-slate-300 rounded-lg p-4 space-y-2 text-xs print:rounded-none">
					<div className="flex justify-between text-slate-600">
					  <span>Total Taxable Amount <span className="text-[9px] block text-slate-400">الإجمالي الخاضع للضريبة</span></span>
					  <span className="font-mono font-bold text-sm">SAR {viewingInvoice.items.reduce((a,b)=>a+b.taxable,0).toLocaleString()}</span>
					</div>
					<div className="flex justify-between text-slate-600 border-b border-slate-300 pb-3 mb-3">
					  <span>Total VAT (15%) <span className="text-[9px] block text-slate-400">إجمالي ضريبة القيمة المضافة</span></span>
					  <span className="font-mono font-bold text-sm">SAR {viewingInvoice.items.reduce((a,b)=>a+b.vat,0).toLocaleString()}</span>
					</div>
					<div className="flex justify-between items-end pt-1 text-[#1e2d40]">
					  <span className="font-black text-sm uppercase tracking-wider">Grand Total <span className="text-[9px] block text-slate-500 font-normal">الإجمالي المستحق</span></span>
					  <span className="font-mono font-black text-xl text-[#c5a059]">SAR {viewingInvoice.grandTotal.toLocaleString()}</span>
					</div>
				  </div>
				</div>

				{/* FOOTER */}
				<div className="border-t-2 border-[#1e2d40] pt-6 text-center text-[10px] text-slate-500 space-y-1.5 pb-6">
				  <p className="font-bold text-slate-800 text-xs">Thank you for your business. شكرًا لتعاملكم معنا.</p>
				  <p>This is a computer-generated document. No signature is required.</p>
				  <p>Generated by OPERIX FMIS — Fully compliant with ZATCA Phase 2 E-Invoicing Regulations.</p>
				</div>

			  </div>
			</div>
		  </div>
		</div>
	  )}

	</div>
  );
}