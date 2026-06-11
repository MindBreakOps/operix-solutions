import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Zap, Users, Settings, Activity, FileText, Check, Plus, Minus, CreditCard } from 'lucide-react';

// ─── API CONFIG ───
const OPS_API   = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const DOCS_API  = 'https://script.google.com/macros/s/AKfycbxX5si41SuQj-yhGsrexa8snsaT0VgoPw0EHo7GGE9AAbEN6uKTA4qpmA9jdQFJpEC_/exec';
const TARGET_EMAIL = 'operixsolution@gmail.com';
const VAT_RATE  = 0.15;

export default function Subscription() {
  const { isAr } = useLanguage();
  
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeView, setActiveView] = useState('modules');
  
  // ─── CONNECTION STATE ───
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', employees: '1-50' });

  const [modules, setModules] = useState({
	hris: { active: true, price: 1500, title: 'OPERIX HRIS', desc: 'Core human capital management, payroll & recruiting rosters.', gradient: 'bg-emerald-600', icon: <Users size={20} /> },
	operations: { active: true, price: 2000, title: 'OPERIX Operations', desc: 'Field logistics, live ANPR capture, & gig workforce trackers.', gradient: 'bg-blue-600', icon: <Settings size={20} /> },
	fmis: { active: true, price: 1800, title: 'OPERIX FMIS', desc: 'Financial management ecosystem, invoicing, & ledger analytics.', gradient: 'bg-amber-600', icon: <CreditCard size={20} /> },
	care: { active: false, price: 4500, title: 'OPERIX Care (Medical)', desc: 'Full HIS, clinical patient dashboards, & ECR nodes.', gradient: 'bg-rose-500', icon: <Activity size={20} /> },
  });

  const getPrice = (base) => billingCycle === 'yearly' ? base * 0.8 : base;

  const subtotal = Object.values(modules).reduce((acc, m) => m.active ? acc + getPrice(m.price) : acc, 0);
  const vat = subtotal * VAT_RATE;
  const grandTotal = subtotal + vat;

  const features = {
	hris: ['Employee Self-Service & Face-ID', 'Automated Payroll & WPS Export', 'Shift Scheduling & Master Directory'],
	operations: ['Live ANPR Camera Auto-Log', 'Valet Performance Matrix Tracking', 'Automated Ticket & QR Invoicing'],
	fmis: ['Corporate Ledger Reconciliation', 'ZATCA Phase 2 Integration Matrix', 'Automated Budgetloop Estimations'],
	care: ['Voice-to-Text Clinical Synthesis', 'Electronic Patient Health History', 'Secure Physician/Nurse Environment'],
  };

  // ─── SUBMISSION LOGIC ───
  const handleCheckoutSubmit = async (e) => {
	e.preventDefault();
	setIsSubmitting(true);
	const cycleText = billingCycle === 'yearly' ? 'Annual Billing (20% Discount)' : 'Monthly Billing';
	const selectedModules = Object.values(modules).filter(m => m.active).map(m => m.title).join(', ');

	const adminBody = `NEW ENTERPRISE SUBSCRIPTION REQUEST\n\nContact: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nSize: ${formData.employees}\n\nModules: ${selectedModules}\nCycle: ${cycleText}\nSubtotal: SAR ${subtotal.toLocaleString()}\nVAT: SAR ${vat.toLocaleString()}\nTotal: SAR ${grandTotal.toLocaleString()} / mo`;

	const htmlInvoice = `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;padding:40px;border-radius:12px;background:#fff"><h1 style="color:#1e2d40;margin-top:0">OPERIX Solutions</h1><p style="color:#64748b;font-size:14px">Enterprise Subscription Quotation (inc. 15% VAT)</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0"/><h3 style="color:#1e2d40">Client Details</h3><p style="font-size:14px;line-height:1.6;color:#333"><strong>Company:</strong> ${formData.company}<br/><strong>Contact:</strong> ${formData.name}<br/><strong>Email:</strong> ${formData.email}</p><h3 style="color:#1e2d40;margin-top:32px">Subscription Plan</h3><table style="width:100%;border-collapse:collapse;font-size:14px">${Object.values(modules).filter(m=>m.active).map(m=>`<tr style="border-bottom:1px solid #e2e8f0"><td style="padding:12px;font-weight:bold">${m.title}</td><td style="padding:12px;text-align:right">SAR ${getPrice(m.price).toLocaleString()}</td></tr>`).join('')}</table><div style="margin-top:24px;padding:20px;background:#f8fafc;border-radius:8px"><div style="display:flex;justify-content:space-between;font-size:14px;color:#475569"><span>VAT (15%)</span><span>SAR ${vat.toLocaleString()}</span></div><hr style="border:none;border-top:1px solid #cbd5e1;margin:8px 0"/><div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:#1e2d40"><span>Grand Total</span><span style="color:#d4af37">SAR ${grandTotal.toLocaleString()} /mo</span></div></div></div>`;

	try {
	  await fetch(OPS_API,  { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `Subscription: ${formData.company}`, body: adminBody }) });
	  await fetch(DOCS_API, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ action: 'sendContract', email: formData.email, subject: 'Your OPERIX Subscription Quotation', htmlBody: htmlInvoice }) });
	  alert(isAr ? `تم الإرسال! تم إرسال التسعيرة إلى ${formData.email}.` : `Success! Quotation sent to ${formData.email}.`);
	  setShowModal(false);
	  setFormData({ name: '', email: '', company: '', employees: '1-50' });
	} catch {
	  alert('Error processing request. Please try again.');
	} finally {
	  setIsSubmitting(false);
	}
  };

  return (
	<div className="py-12 space-y-8 animate-in" style={{ fontFamily: 'system-ui, sans-serif' }}>
	  <div className="max-w-4xl mx-auto text-center space-y-6 px-6">
		<h1 className="text-4xl font-black bg-gradient-to-r from-[#1e2d40] to-[#d4af37] bg-clip-text text-transparent">
		  {isAr ? "إدارة هيكلية منشأتك الرقمية" : "Configure your enterprise architecture."}
		</h1>
		
		{/* Billing Cycle Controls */}
		<div className="inline-flex p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200">
		  <button onClick={() => setBillingCycle('monthly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${billingCycle === 'monthly' ? 'bg-white shadow text-[#1e2d40]' : 'text-slate-400'}`}>
			{isAr ? "شهري" : "Monthly"}
		  </button>
		  <button onClick={() => setBillingCycle('yearly')} className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-white shadow text-[#1e2d40]' : 'text-slate-400'}`}>
			{isAr ? "سنوي" : "Annual"}
			<span className="bg-[#d4af37] text-[#1e2d40] text-[9px] font-black px-2 py-0.5 rounded-full">-20%</span>
		  </button>
		</div>

		{/* Navigation Tabs */}
		<div className="flex justify-center gap-4 border-b border-slate-200 pb-4">
		  <button onClick={() => setActiveView('modules')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-colors ${activeView === 'modules' ? 'bg-[#1e2d40] text-[#d4af37] border-transparent' : 'bg-white text-slate-500 border-slate-200'}`}>
			<Zap size={14}/> {isAr ? "مكونات النظام" : "Module Configurator"}
		  </button>
		  <button onClick={() => setActiveView('ledger')} className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 border transition-colors ${activeView === 'ledger' ? 'bg-[#1e2d40] text-[#d4af37] border-transparent' : 'bg-white text-slate-500 border-slate-200'}`}>
			<FileText size={14}/> {isAr ? "السجل المالي للمنشأة" : "Financial Ledger"}
		  </button>
		</div>
	  </div>

	  {activeView === 'modules' ? (
		<div className="max-w-7xl mx-auto px-6 py-4 space-y-6">
		  
		  {/* Main 4-Column Responsive Layout Matrix */}
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{Object.entries(modules).map(([key, mod]) => (
			  <div key={key} className={`bg-white border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 shadow-sm ${mod.active ? 'border-[#d4af37] ring-1 ring-[#d4af37]/20 shadow-lg' : 'border-slate-200 hover:bg-slate-50 hover:-translate-y-1'}`}>
				<div>
				  <div className="flex justify-between items-start mb-4">
					<div className={`w-11 h-11 rounded-xl ${mod.gradient} text-white flex items-center justify-center shadow-md ${mod.active ? 'scale-110 transition-transform' : ''}`}>
					  {mod.icon}
					</div>
					{mod.active && <span className="bg-[#d4af37] text-[#1e2d40] text-[9px] font-black uppercase px-2.5 py-1 rounded-full">{isAr ? "مفعّل" : "Installed"}</span>}
				  </div>
				  <h3 className="text-sm font-black uppercase tracking-tight text-[#1e2d40]">{mod.title}</h3>
				  <p className="text-xs text-slate-500 mt-1 mb-4 font-semibold min-h-[32px]">{mod.desc}</p>
				  
				  <ul className="space-y-2 border-t border-slate-100 pt-4 mb-6 m-0 p-0">
					{features[key].map((f, i) => (
					  <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-slate-500">
						<Check size={14} className="text-[#d4af37] shrink-0 mt-0.5" />
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
					className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${mod.active ? 'bg-slate-50 border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50' : 'bg-[#1e2d40] text-white border-transparent shadow-md hover:bg-opacity-90'}`}
				  >
					{mod.active ? <Minus size={13}/> : <Plus size={13}/ >}
					{mod.active ? (isAr ? "إزالة" : "Remove") : (isAr ? "إضافة" : "Add Module")}
				  </button>
				</div>
			  </div>
			))}
		  </div>

		  {/* Checkout Panel Card */}
		  <div className="bg-[#1e2d40] text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl mt-6 border border-slate-800">
			<div>
			  <div className="text-3xl font-black font-mono text-[#d4af37]">
				SAR {grandTotal.toLocaleString()}
				<span className="text-xs font-normal text-slate-400 font-sans ml-2">/mo</span>
			  </div>
			  <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider flex items-center gap-2">
				{isAr ? "شامل ضريبة القيمة المضافة 15%" : "Includes 15% VAT calculation parameters"}
				{billingCycle === 'yearly' && <span className="text-[#d4af37]">- 20% Applied</span>}
			  </p>
			</div>
			<button 
			  onClick={() => setShowModal(true)}
			  className="bg-[#d4af37] text-[#1e2d40] font-black px-8 py-4 rounded-xl text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
			>
			  {isAr ? "المتابعة لإصدار العقد" : "Proceed to Checkout"}
			</button>
		  </div>
		</div>
	  ) : (
		<div className="max-w-7xl mx-auto px-6 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm p-6">
		  <table className="w-full text-left text-xs border-collapse">
			<thead>
			  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-[#d4af37]">
				<th className="p-4">Invoice Ref</th>
				<th className="p-4">Issue Date</th>
				<th className="p-4">Ecosystem Licenses</th>
				<th className="p-4">Amount</th>
				<th className="p-4">Status</th>
			  </tr>
			</thead>
			<tbody>
			  <tr className="font-semibold text-slate-600 border-b border-slate-100 hover:bg-slate-50 transition-colors">
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

	  {/* ─── CHECKOUT MODAL ─── */}
	  {showModal && (
		<div className="fixed inset-0 bg-[#1e2d40]/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-6" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
		  <div className="w-full max-w-md rounded-2xl p-8 border border-slate-200 bg-white shadow-2xl">
			<div className="flex items-start justify-between mb-6">
			  <div>
				<div className="text-xl font-black text-[#1e2d40]">{isAr ? "تفاصيل الإشتراك" : "Checkout Details"}</div>
				<div className="text-sm mt-1 text-slate-500 font-semibold">{isAr ? "أكمل إعداد مساحة العمل الخاصة بك." : "Complete your workspace configuration."}</div>
			  </div>
			  <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">×</button>
			</div>

			<form onSubmit={handleCheckoutSubmit} className="space-y-4">
			  {[
				{ label: isAr ? 'الاسم' : 'Full Name', field: 'name', type: 'text', placeholder: 'John Smith' },
				{ label: isAr ? 'البريد' : 'Work Email', field: 'email', type: 'email', placeholder: 'john@company.com' },
			  ].map(({ label, field, type, placeholder }) => (
				<div key={field}>
				  <label className="block text-[11px] font-black uppercase tracking-widest mb-1.5 text-slate-500">{label}</label>
				  <input type={type} placeholder={placeholder} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 bg-slate-50 text-[#1e2d40]"/>
				</div>
			  ))}

			  <div className="grid grid-cols-2 gap-3">
				{[
				  { label: isAr ? 'الشركة' : 'Company', field: 'company', type: 'text', placeholder: 'Your Company' },
				  { label: isAr ? 'الحجم' : 'Company Size', field: 'employees', type: 'select', options: ['1-50','51-200','201-500','500+'] },
				].map(({ label, field, type, placeholder, options }) => (
				  <div key={field}>
					<label className="block text-[11px] font-black uppercase tracking-widest mb-1.5 text-slate-500">{label}</label>
					{type === 'select' ? (
					  <select value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 bg-slate-50 text-[#1e2d40]">
						{options.map(o => <option key={o} value={o}>{o}</option>)}
					  </select>
					) : (
					  <input type={type} placeholder={placeholder} value={formData[field]} onChange={e => setFormData({ ...formData, [field]: e.target.value })} required className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none transition-all focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 bg-slate-50 text-[#1e2d40]"/>
					)}
				  </div>
				))}
			  </div>

			  <div className="rounded-xl p-4 border border-slate-200 bg-slate-50 mt-4">
				<div className="text-[11px] font-black uppercase tracking-widest mb-3 text-[#1e2d40]">Order Summary</div>
				<div className="space-y-1.5 pt-2">
				  <div className="flex justify-between items-center border-t border-slate-200 pt-2">
					<span className="text-xs font-black uppercase text-[#1e2d40]">Grand Total</span>
					<span className="text-lg font-black font-mono text-[#d4af37]">SAR {grandTotal.toLocaleString()} <span className="text-[11px] font-normal ml-1 text-slate-500">/mo</span></span>
				  </div>
				</div>
			  </div>

			  <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-[#1e2d40] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2">
				{isSubmitting ? (isAr ? 'جاري المعالجة...' : 'Processing Order…') : (isAr ? 'تأكيد الإشتراك' : 'Confirm Subscription')}
			  </button>
			</form>
		  </div>
		</div>
	  )}
	</div>
  );
}