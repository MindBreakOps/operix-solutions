import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Shield, MapPin, Send, CheckCircle, ChevronDown } from 'lucide-react';

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

/* ── Reveal ──────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
	const el = ref.current;
	if (!el) return;
	const io = new IntersectionObserver(
	  ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
	  { threshold, rootMargin: '0px 0px -30px 0px' }
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
	  transform: visible ? 'translateY(0)' : 'translateY(24px)',
	  transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
	  willChange: 'opacity, transform', ...style
	}} {...rest}>
	  {children}
	</Tag>
  );
}

/* ── Floating label input ────────────────────────────────────── */
function FloatInput({ label, type = 'text', value, onChange, required, placeholder }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
	<div className="relative">
	  <label className={`absolute left-3.5 pointer-events-none font-bold transition-all duration-200 ${active ? 'top-2 text-[10px] text-[#d4af37]' : 'top-3.5 text-sm text-slate-400'} uppercase tracking-widest`}>
		{label}
	  </label>
	  <input
		type={type} value={value} onChange={onChange} required={required}
		placeholder={focused ? placeholder : ''}
		onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
		className={`w-full bg-slate-50 border rounded-xl px-3.5 pt-6 pb-2.5 text-sm font-semibold text-[#1e2d40] outline-none transition-all duration-200 ${active ? 'border-[#d4af37] bg-white shadow-[0_0_0_3px_rgba(212,175,55,0.12)]' : 'border-slate-200 hover:border-slate-300'}`}
	  />
	</div>
  );
}

/* ── Float textarea ──────────────────────────────────────────── */
function FloatTextarea({ label, value, onChange, rows = 4, placeholder }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  return (
	<div className="relative">
	  <label className={`absolute left-3.5 pointer-events-none font-bold transition-all duration-200 ${active ? 'top-2 text-[10px] text-[#d4af37]' : 'top-3.5 text-sm text-slate-400'} uppercase tracking-widest`}>
		{label}
	  </label>
	  <textarea
		value={value} onChange={onChange} rows={rows}
		placeholder={focused ? placeholder : ''}
		onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
		className={`w-full bg-slate-50 border rounded-xl px-3.5 pt-6 pb-2.5 text-sm font-semibold text-[#1e2d40] outline-none transition-all duration-200 resize-none ${active ? 'border-[#d4af37] bg-white shadow-[0_0_0_3px_rgba(212,175,55,0.12)]' : 'border-slate-200 hover:border-slate-300'}`}
	  />
	</div>
  );
}

/* ── Success overlay ─────────────────────────────────────────── */
function SuccessView({ isAr, onReset }) {
  return (
	<div className="flex flex-col items-center justify-center py-12 text-center gap-5 animate-in fade-in duration-500">
	  <div className="w-20 h-20 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center">
		<CheckCircle size={36} className="text-emerald-500" strokeWidth={1.5} />
	  </div>
	  <div>
		<h3 className="text-xl font-black text-[#1e2d40] mb-1">
		  {isAr ? "تم الإرسال بنجاح" : "Dispatched Successfully"}
		</h3>
		<p className="text-sm text-slate-500 font-medium max-w-xs">
		  {isAr ? "سيتواصل معك فريقنا قريباً." : "Our team will contact you shortly."}
		</p>
	  </div>
	  <button onClick={onReset}
		className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:text-[#1e2d40] transition-colors">
		{isAr ? "إرسال رسالة أخرى" : "Send Another"}
	  </button>
	</div>
  );
}

export default function Contact() {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', architecture: 'OPERIX HRIS', customArchitecture: '', message: '' });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const servicesList = [
	"OPERIX HRIS", "OPERIX Operations", "OPERIX FMIS", "OPERIX Care HIS",
	"Facility & Parking Management", "VIP Valet & Event Operations",
	"Custom White-Label Engineering", "Other / Unlisted Requirement"
  ];

  const handleServiceChange = (e) => {
	const val = e.target.value;
	setFormData({ ...formData, architecture: val });
	setShowCustomInput(val === "Other / Unlisted Requirement");
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
	setIsSubmitting(true);
	const finalArch = showCustomInput ? formData.customArchitecture : formData.architecture;
	const body = `NEW CONTACT LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nTarget Architecture: ${finalArch}\nMessage: ${formData.message || 'No message provided.'}`;
	try {
	  await fetch(OPS_API, {
		method: 'POST', mode: 'no-cors',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({ action: 'sendEmail', to: TARGET_EMAIL, subject: `New Lead: ${formData.company || formData.name}`, body })
	  });
	  setSubmitted(true);
	} catch {
	  alert(isAr ? 'حدث خطأ. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again.');
	} finally { setIsSubmitting(false); }
  };

  const infoItems = [
	{
	  icon: <Mail size={17} />,
	  label: isAr ? "البريد الإلكتروني" : "General Inquiries",
	  content: <a href={`mailto:${TARGET_EMAIL}`} className="text-sm font-semibold hover:text-[#d4af37] transition-colors">{TARGET_EMAIL}</a>
	},
	{
	  icon: <MapPin size={17} />,
	  label: isAr ? "المقرات" : "Locations",
	  content: <><div className="text-sm font-semibold">Riyadh, Saudi Arabia</div><div className="text-sm font-semibold text-slate-400">Khartoum, Sudan</div></>
	},
	{
	  icon: <Shield size={17} />,
	  label: isAr ? "دعم الأنظمة" : "Enterprise Support",
	  content: <div className="text-sm font-semibold">{isAr ? "استشارات تقنية خاصة بالمرافق" : "Proprietary Technical Facility Consulting"}</div>
	},
  ];

  return (
	<div className="w-full min-h-screen bg-[#f8fafc] font-sans" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

	  <style>{`
		@keyframes floatGlow {
		  0%, 100% { transform: translateY(0); opacity: 0.08; }
		  50%       { transform: translateY(-16px); opacity: 0.14; }
		}
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(24px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		.submit-btn { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.submit-btn:not(:disabled):hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(30,45,64,0.25); }
		.info-item { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.info-item:hover { transform: translateX(3px); }
		.hero-tag { animation: fadeSlideUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
		.hero-h1  { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
		.hero-p   { animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s both; }
		.custom-select-wrapper select { -webkit-appearance: none; appearance: none; }
	  `}</style>

	  {/* ── PAGE HEADER ─────────────────────────────────────────── */}
	  <div className="relative overflow-hidden bg-white border-b border-slate-200">
		<div className="absolute -top-16 right-1/4 w-[400px] h-[280px] rounded-full pointer-events-none"
		  style={{ background: 'radial-gradient(ellipse, #d4af3715 0%, transparent 70%)', animation: 'floatGlow 7s ease-in-out infinite' }} />
		<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
		  <span className="hero-tag inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20 mb-4">
			{isAr ? "تواصل معنا" : "Get in Touch"}
		  </span>
		  <h1 className="hero-h1 text-3xl md:text-4xl font-black font-serif text-[#1e2d40] mb-3 leading-tight">
			{isAr ? "بدء التحول المؤسسي" : "Initialize Enterprise Transformation"}
		  </h1>
		  <p className="hero-p text-sm text-slate-500 font-medium max-w-xl">
			{isAr
			  ? "أدخل مواصفات منشأتك للتشاور مع مهندسي تنفيذ الأنظمة لدينا."
			  : "Submit your specifications to consult with our system implementation architects."}
		  </p>
		</div>
	  </div>

	  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<Reveal>
		  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">

			{/* ── DARK PANEL ───────────────────────────────────── */}
			<div className="w-full lg:w-2/5 bg-[#1e2d40] p-8 md:p-10 flex flex-col relative overflow-hidden">
			  {/* Decorative */}
			  <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full pointer-events-none"
				style={{ background: 'radial-gradient(ellipse, #d4af3712 0%, transparent 70%)' }} />
			  <div className="absolute top-1/2 -left-10 w-32 h-32 rounded-full pointer-events-none"
				style={{ background: 'radial-gradient(ellipse, #ffffff05 0%, transparent 70%)' }} />

			  <div className="relative z-10">
				<div className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-6">
				  {isAr ? "معلومات التواصل" : "Contact Information"}
				</div>

				<div className="space-y-5 mb-10">
				  {infoItems.map((item, i) => (
					<div key={i} className="info-item flex items-start gap-4 cursor-default">
					  <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-[#d4af37] flex-shrink-0 mt-0.5">
						{item.icon}
					  </div>
					  <div>
						<div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
						<div className="text-white">{item.content}</div>
					  </div>
					</div>
				  ))}
				</div>

				{/* Decorative divider */}
				<div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8" />

				{/* Status badge */}
				<div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
				  <span className="relative flex h-2 w-2">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
					<span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
				  </span>
				  {isAr ? "متاح للاستشارة الآن" : "Available for consultation"}
				</div>
			  </div>
			</div>

			{/* ── FORM PANEL ───────────────────────────────────── */}
			<div className="w-full lg:w-3/5 p-8 md:p-10">
			  {submitted ? (
				<SuccessView isAr={isAr} onReset={() => {
				  setSubmitted(false);
				  setFormData({ name: '', email: '', company: '', architecture: 'OPERIX HRIS', customArchitecture: '', message: '' });
				  setShowCustomInput(false);
				}} />
			  ) : (
				<form onSubmit={handleSubmit} className="space-y-5">
				  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<FloatInput
					  label={isAr ? "الاسم الكامل" : "Your Name"}
					  value={formData.name}
					  onChange={e => setFormData({ ...formData, name: e.target.value })}
					  required
					/>
					<FloatInput
					  label={isAr ? "البريد الإلكتروني" : "Work Email"}
					  type="email"
					  value={formData.email}
					  onChange={e => setFormData({ ...formData, email: e.target.value })}
					  required
					/>
				  </div>

				  <FloatInput
					label={isAr ? "اسم الشركة" : "Company Name"}
					value={formData.company}
					onChange={e => setFormData({ ...formData, company: e.target.value })}
					placeholder={isAr ? "اختياري" : "Optional"}
				  />

				  {/* Custom select */}
				  <div className="custom-select-wrapper relative">
					<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
					  {isAr ? "تحديد بنية النظام المستهدف" : "Target Architecture"}
					</label>
					<div className="relative">
					  <select
						value={formData.architecture} onChange={handleServiceChange}
						className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#d4af37] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.12)] rounded-xl px-3.5 py-3 text-sm font-semibold text-[#1e2d40] outline-none transition-all duration-200 pr-10 cursor-pointer"
					  >
						{servicesList.map(s => <option key={s} value={s}>{s}</option>)}
					  </select>
					  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
					</div>
				  </div>

				  {/* Custom architecture input */}
				  {showCustomInput && (
					<div className="animate-in slide-in-from-top-2 duration-300">
					  <FloatInput
						label={isAr ? "يرجى تحديد الخدمة المطلوبة" : "Please Specify Requirement"}
						value={formData.customArchitecture}
						onChange={e => setFormData({ ...formData, customArchitecture: e.target.value })}
						required={showCustomInput}
						placeholder={isAr ? "اكتب تفاصيل طلبك..." : "Type your specific request..."}
					  />
					</div>
				  )}

				  <FloatTextarea
					label={isAr ? "تفاصيل إضافية" : "Additional Details"}
					value={formData.message}
					onChange={e => setFormData({ ...formData, message: e.target.value })}
					rows={4}
					placeholder={isAr ? "أي تفاصيل إضافية..." : "Any additional details..."}
				  />

				  <div className="pt-1">
					<button
					  type="submit" disabled={isSubmitting}
					  className="submit-btn w-full bg-[#1e2d40] hover:bg-[#2d4460] text-white py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
					>
					  {isSubmitting ? (
						<>
						  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
						  </svg>
						  {isAr ? "جاري الإرسال..." : "DISPATCHING..."}
						</>
					  ) : (
						<>{isAr ? "إرسال المعطيات" : "DISPATCH PARAMETERS"} <Send size={13} /></>
					  )}
					</button>
				  </div>

				  {/* Security note */}
				  <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
					<Shield size={11} className="text-[#d4af37]" />
					{isAr ? "اتصال آمن بـ SSL" : "SSL Encrypted · Secure Submission"}
				  </div>
				</form>
			  )}
			</div>
		  </div>
		</Reveal>
	  </div>
	</div>
  );
}