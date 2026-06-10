import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Users, Settings, Activity, FileText, Check, Plus, Minus, CreditCard } from 'lucide-react';

export default function Subscription() {
  const { isAr } = useLanguage();
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeView, setActiveView] = useState('modules');
  
  const [modules, setModules] = useState({
	hris: { active: true, price: 1500, title: 'OPERIX HRIS', desc: 'Core human capital management, payroll & recruiting rosters.', gradient: 'bg-emerald-600', icon: <Users size={20} /> },
	operations: { active: true, price: 2000, title: 'OPERIX Operations', desc: 'Field logistics, live ANPR capture, & gig workforce trackers.', gradient: 'bg-blue-600', icon: <Settings size={20} /> },
	fmis: { active: true, price: 1800, title: 'OPERIX FMIS', desc: 'Financial management ecosystem, invoicing, & ledger analytics.', gradient: 'bg-amber-600', icon: <CreditCard size={20} /> },
	care: { active: false, price: 4500, title: 'OPERIX Care (Medical)', desc: 'Full HIS, clinical patient dashboards, & ECR nodes.', gradient: 'bg-rose-500', icon: <Activity size={20} /> },
  });

  const getPrice = (base) => billingCycle === 'yearly' ? base * 0.8 : base;

  const subtotal = Object.values(modules).reduce((acc, m) => m.active ? acc + getPrice(m.price) : acc, 0);
  const vat = subtotal * 0.15;
  const grandTotal = subtotal + vat;

  const features = {
	hris: ['Employee Self-Service & Face-ID', 'Automated Payroll & WPS Export', 'Shift Scheduling & Master Directory'],
	operations: ['Live ANPR Camera Auto-Log', 'Valet Performance Matrix Tracking', 'Automated Ticket & QR Invoicing'],
	fmis: ['Corporate Ledger Reconciliation', 'ZATCA Phase 2 Integration Matrix', 'Automated Budgetloop Estimations'],
	care: ['Voice-to-Text Clinical Synthesis', 'Electronic Patient Health History', 'Secure Physician/Nurse Environment'],
  };

  return (
	<div className="py-12 space-y-8 animate-in" style={{ fontFamily: 'system-ui, sans-serif' }}>
	  <div className="max-w-4xl mx-auto text-center space-y-6 px-6">
		<h1 className="text-4xl font-black" style={{ color: '#1e2d40' }}>
		  {isAr ? "إدارة هيكلية منشأتك الرقمية" : "Configure your enterprise architecture."}
		</h1>
		
		{/* Billing Cycle Controls */}
		<div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200">
		  <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-white shadow text-[#1e2d40]' : 'text-slate-400'}`}>
			{isAr ? "شهري" : "Monthly"}
		  </button>
		  <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white shadow text-[#1e2d40]' : 'text-slate-400'}`}>
			{isAr ? "سنوي" : "Annual"}
			<span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">-20%</span>
		  </button>
		</div>

		{/* Navigation Tabs */}
		<div className="flex justify-center gap-4 border-b border-slate-200 pb-4">
		  <button onClick={() => setActiveView('modules')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border ${activeView === 'modules' ? 'text-white border-transparent' : 'bg-white text-slate-500 border-slate-200'}`} style={{ backgroundColor: activeView === 'modules' ? '#1e2d40' : 'transparent' }}>
			<Zap size={14}/> {isAr ? "مكونات النظام" : "Module Configurator"}
		  </button>
		  <button onClick={() => setActiveView('ledger')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border ${activeView === 'ledger' ? 'text-white border-transparent' : 'bg-white text-slate-500 border-slate-200'}`} style={{ backgroundColor: activeView === 'ledger' ? '#1e2d40' : 'transparent' }}>
			<FileText size={14}/> {isAr ? "السجل المالي للمنشأة" : "Financial Ledger"}
		  </button>
		</div>
	  </div>

	  {activeView === 'modules' ? (
		<div className="max-w-7xl mx-auto px-6 py-4 space-y-6">
		  
		  {/* Main 4-Column Responsive Layout Matrix */}
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{Object.entries(modules).map(([key, mod]) => (
			  <div key={key} className="bg-white border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm" style={{ borderColor: mod.active ? '#c9a84c' : '#e2e8f0', boxShadow: mod.active ? '0 10px 25px -5px rgba(201,168,76,0.1)' : 'none' }}>
				<div>
				  <div className="flex justify-between items-start mb-4">
					<div className={`w-11 h-11 rounded-xl ${mod.gradient} text-white flex items-center justify-center shadow-md`}>
					  {mod.icon}
					</div>
					{mod.active && <span className="bg-[#c9a84c] text-slate-950 text-[9px] font-black uppercase px-2.5 py-1 rounded-full">{isAr ? "مفعّل" : "Installed"}</span>}
				  </div>
				  <h3 className="text-sm font-black uppercase tracking-tight" style={{ color: '#1e2d40' }}>{mod.title}</h3>
				  <p className="text-xs text-slate-400 mt-1 mb-4 font-semibold min-h-[32px]">{mod.desc}</p>
				  
				  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-6 m-0 p-0">
					{features[key].map((f, i) => (
					  <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-500">
						<Check size={14} className="text-[#c9a84c] shrink-0 mt-0.5" />
						<span>{f}</span>
					  </li>
					))}
				  </ul>
				</div>

				<div>
				  <div className="text-xl font-black font-mono mb-4 text-[#1e2d40]">
					SAR {getPrice(mod.price).toLocaleString()}
					<span className="text-xs font-medium text-slate-400 font-sans ml-1">/mo</span>
				  </div>
				  <button 
					onClick={() => setModules(prev => ({ ...prev, [key]: { ...prev[key], active: !prev[key].active } }))}
					className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${mod.active ? 'bg-slate-50 border-slate-200 text-slate-500' : 'text-white border-transparent'}`}
					style={{ backgroundColor: mod.active ? '#f8fafc' : '#1e2d40' }}
				  >
					{mod.active ? <Minus size={13}/> : <Plus size={13}/ >}
					{mod.active ? (isAr ? "إزالة" : "Remove") : (isAr ? "إضافة" : "Add Module")}
				  </button>
				</div>
			  </div>
			))}
		  </div>

		  {/* Checkout Panel Card */}
		  <div className="bg-[#1e2d40] text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-6">
			<div>
			  <div className="text-3xl font-black font-mono text-[#c9a84c]">
				SAR {grandTotal.toLocaleString()}
				<span className="text-xs font-normal text-slate-400 font-sans ml-2">/mo</span>
			  </div>
			  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">
				{isAr ? "شامل ضريبة القيمة المضافة 15%" : "Includes 15% VAT calculation parameters"}
			  </p>
			</div>
			<button className="bg-[#c9a84c] text-slate-950 font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer">
			  {isAr ? "المتابعة لإصدار العقد" : "Proceed to Checkout"}
			</button>
		  </div>
		</div>
	  ) : (
		<div className="max-w-7xl mx-auto px-6 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6">
		  <table className="w-full text-left text-xs border-collapse">
			<thead>
			  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#c9a84c]">
				<th className="p-4">Invoice Ref</th>
				<th className="p-4">Issue Date</th>
				<th className="p-4">Ecosystem Licenses</th>
				<th className="p-4">Amount</th>
				<th className="p-4">Status</th>
			  </tr>
			</thead>
			<tbody>
			  <tr className="font-semibold text-slate-600 border-b border-slate-100">
				<td className="p-4 font-mono font-bold text-[#1e2d40]">INV-2026-041</td>
				<td className="p-4">01 Jun 2026</td>
				<td className="p-4 font-bold text-[#1e2d40]">OPERIX HRIS, Operations & FMIS Suite</td>
				<td className="p-4 font-mono font-bold text-[#1e2d40]">SAR 36,500</td>
				<td className="p-4"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[9px] font-black uppercase border border-emerald-200">PAID</span></td>
			  </tr>
			</tbody>
		  </table>
		</div>
	  )}
	</div>
  );
}