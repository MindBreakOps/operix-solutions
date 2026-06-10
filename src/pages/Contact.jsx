import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Shield } from 'lucide-react';

export default function Contact() {
  const { t, isAr } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'HRIS' });

  const handleFormSubmit = async (e) => {
	e.preventDefault();
	setLoading(true);
	const payload = {
	  action: 'sendEmail',
	  to: 'operixsolution@gmail.com',
	  subject: `Corporate Request: ${form.company}`,
	  body: `OPERIX REQUEST ARCHIVE\n\nContact: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nModule Requested: ${form.type}`,
	  senderName: 'Operix Corporate Portal',
	  senderEmail: 'system@operix.com'
	};

	try {
	  await fetch(import.meta.env.VITE_OPS_API_URL, {
		method: 'POST',
		mode: 'no-cors',
		cache: 'no-cache',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify(payload)
	  });
	  alert(isAr ? "تم إرسال مواصفات منشأتك بنجاح. سيتواصل معك مهندسو الأنظمة قريباً." : "Enterprise parameters dispatched successfully.");
	  setForm({ name: '', email: '', company: '', type: 'HRIS' });
	} catch {
	  alert("Network timeout. Please try again.");
	} finally {
	  setLoading(false);
	}
  };

  return (
	<div className="contact-wrapper animate-in">
	  <div className="contact-info-panel">
		<h1 className="text-4xl font-black text-[#1e2d40]">{t.contactTitle || "Initialize Enterprise Transformation"}</h1>
		<p className="text-slate-500 text-sm leading-relaxed font-medium">{t.contactSub || "Submit your corporate specifications below to consult with our system implementation architects."}</p>
		<div className="space-y-4 pt-4 font-sans">
		  <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase">
			<Mail size={16} className="text-[#c9a84c]" />
			<span>operixsolution@gmail.com</span>
		  </div>
		  <div className="flex items-center gap-3 text-xs font-bold text-slate-600 uppercase">
			<Shield size={16} className="text-[#c9a84c]" />
			<span>{isAr ? "استشارات وحلول فنية مخصصة لإدارة المرافق" : "Proprietary Technical Facility Consulting"}</span>
		  </div>
		</div>
	  </div>

	  <div className="contact-form-panel">
		<form onSubmit={handleFormSubmit} className="space-y-4">
		  <div>
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? "الاسم الكريم" : "Your Name"}</label>
			<input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="contact-input" />
		  </div>
		  <div>
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? "البريد الإلكتروني للعمل" : "Work Email"}</label>
			<input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="contact-input" />
		  </div>
		  <div>
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? "اسم الشركة / المنشأة" : "Company Name"}</label>
			<input type="text" required value={form.company} onChange={e => setForm({...form, company: e.target.value})} className="contact-input" />
		  </div>
		  <div>
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{isAr ? "النظام المطلوب" : "Target Architecture Selection"}</label>
			<select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="contact-input cursor-pointer font-bold text-xs uppercase text-slate-600">
			  <option value="HRIS">OPERIX HRIS</option>
			  <option value="OPERATIONS">OPERIX OPERATIONS</option>
			  <option value="FMIS">OPERIX FMIS</option>
			  <option value="CARE">OPERIX Care (Full HIS Suite)</option>
			  <option value="WHITE_LABEL">{isAr ? "تطوير نظام بهوية خاصة" : "Custom Identity Deployment"}</option>
			</select>
		  </div>
		  <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#1e2d40] text-white rounded-xl font-extrabold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity disabled:opacity-50 mt-2">
			{loading ? "Processing..." : (isAr ? "إرسال البيانات لمركز التصميم" : "Dispatch Parameters")}
		  </button>
		</form>
	  </div>
	</div>
  );
}