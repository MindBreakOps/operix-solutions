import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Shield, MapPin, Send } from 'lucide-react';

// ─── API CONFIG ───
const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

export default function Contact() {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', architecture: 'OPERIX HRIS', customArchitecture: '', message: '' });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
	"OPERIX HRIS",
	"OPERIX Operations",
	"OPERIX FMIS",
	"OPERIX Care HIS",
	"Facility & Parking Management",
	"VIP Valet & Event Operations",
	"Custom White-Label Engineering",
	"Other / Unlisted Requirement"
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
	const adminBody = `NEW CONTACT LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nTarget Architecture: ${finalArch}\nMessage: ${formData.message || 'No message provided.'}`;

	try {
	  await fetch(OPS_API, {
		method: 'POST',
		mode: 'no-cors',
		headers: { 'Content-Type': 'text/plain' },
		body: JSON.stringify({
		  action: 'sendEmail',
		  to: TARGET_EMAIL,
		  subject: `New Lead: ${formData.company || formData.name}`,
		  body: adminBody
		})
	  });
	  
	  alert(isAr ? 'تم إرسال رسالتك بنجاح. سيتواصل معك فريقنا قريباً.' : 'Message dispatched successfully. Our team will contact you shortly.');
	  setFormData({ name: '', email: '', company: '', architecture: 'OPERIX HRIS', customArchitecture: '', message: '' });
	  setShowCustomInput(false);
	} catch (error) {
	  alert(isAr ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.' : 'An error occurred while sending. Please try again.');
	} finally {
	  setIsSubmitting(false);
	}
  };

  return (
	<div className="w-full min-h-screen bg-[#f8fafc] py-16 font-sans">
	  
	  {/* Strict max-w-6xl bounding box for professional scaling */}
	  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		
		<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
		  
		  {/* ─── LEFT: CONTACT INFO (Dark Panel) ─── */}
		  <div className="w-full lg:w-2/5 bg-[#1e2d40] text-white p-8 md:p-12 flex flex-col justify-between">
			<div>
			  <h1 className="text-3xl font-black font-serif text-[#d4af37] mb-4">
				{isAr ? "بدء التحول المؤسسي" : "Initialize Enterprise Transformation"}
			  </h1>
			  <p className="text-sm text-slate-300 leading-relaxed mb-10">
				{isAr 
				  ? "أدخل مواصفات منشأتك أدناه للتشاور مع مهندسي تنفيذ الأنظمة لدينا."
				  : "Submit your corporate specifications below to consult with our system implementation architects."}
			  </p>
			  
			  <div className="space-y-6">
				<div className="flex items-start gap-4">
				  <div className="p-2 bg-white/10 rounded-lg shrink-0 text-[#d4af37]"><Mail size={18} /></div>
				  <div>
					<div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{isAr ? "البريد الإلكتروني" : "General Inquiries"}</div>
					<a href={`mailto:${TARGET_EMAIL}`} className="text-sm font-semibold hover:text-[#d4af37] transition-colors">{TARGET_EMAIL}</a>
				  </div>
				</div>
				
				<div className="flex items-start gap-4">
				  <div className="p-2 bg-white/10 rounded-lg shrink-0 text-[#d4af37]"><MapPin size={18} /></div>
				  <div>
					<div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{isAr ? "المقرات" : "Locations"}</div>
					<div className="text-sm font-semibold mb-1">Riyadh, Saudi Arabia</div>
					<div className="text-sm font-semibold">Khartoum, Sudan</div>
				  </div>
				</div>
				
				<div className="flex items-start gap-4">
				  <div className="p-2 bg-white/10 rounded-lg shrink-0 text-[#d4af37]"><Shield size={18} /></div>
				  <div>
					<div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{isAr ? "دعم الأنظمة" : "Enterprise Support"}</div>
					<div className="text-sm font-semibold">{isAr ? "استشارات تقنية خاصة بالمرافق" : "Proprietary Technical Facility Consulting"}</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		  {/* ─── RIGHT: CONTACT FORM (Light Panel) ─── */}
		  <div className="w-full lg:w-3/5 p-8 md:p-12">
			<form onSubmit={handleSubmit} className="space-y-5">
			  
			  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<div className="space-y-1.5">
				  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
					{isAr ? "الاسم الكامل" : "Your Name"}
				  </label>
				  <input 
					type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
					className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#d4af37] transition-colors"
				  />
				</div>

				<div className="space-y-1.5">
				  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
					{isAr ? "البريد الإلكتروني للعمل" : "Work Email"}
				  </label>
				  <input 
					type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
					className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#d4af37] transition-colors"
				  />
				</div>
			  </div>

			  <div className="space-y-1.5">
				<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
				  {isAr ? "اسم الشركة" : "Company Name"}
				</label>
				<input 
				  type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder={isAr ? "اختياري" : "Optional"}
				  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#d4af37] transition-colors"
				/>
			  </div>

			  <div className="space-y-1.5">
				<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
				  {isAr ? "تحديد بنية النظام المستهدف" : "Target Architecture"}
				</label>
				<select 
				  value={formData.architecture} onChange={handleServiceChange}
				  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#d4af37] transition-colors appearance-none cursor-pointer"
				>
				  {servicesList.map(service => <option key={service} value={service}>{service}</option>)}
				</select>
			  </div>

			  {showCustomInput && (
				<div className="space-y-1.5 animate-in slide-in-from-top-2">
				  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#d4af37]">
					{isAr ? "يرجى تحديد الخدمة المطلوبة" : "Please Specify Requirement"}
				  </label>
				  <input 
					type="text" required={showCustomInput} placeholder={isAr ? "أكتب تفاصيل طلبك هنا..." : "Type your specific request here..."} value={formData.customArchitecture} onChange={e => setFormData({...formData, customArchitecture: e.target.value})}
					className="w-full bg-white border border-[#d4af37]/50 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:border-[#d4af37] transition-colors shadow-inner"
				  />
				</div>
			  )}

			  <div className="space-y-1.5">
				<label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
				  {isAr ? "تفاصيل إضافية" : "Additional Details"}
				</label>
				<textarea 
				  rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
				  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#d4af37] transition-colors resize-none"
				/>
			  </div>

			  <div className="pt-2">
				<button 
				  type="submit" 
				  disabled={isSubmitting}
				  className="w-full bg-[#1e2d40] text-white py-3.5 rounded-md text-[11px] font-black uppercase tracking-widest hover:bg-[#d4af37] transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-2"
				>
				  {isSubmitting ? (isAr ? "جاري الإرسال..." : "DISPATCHING...") : (isAr ? "إرسال المعطيات" : "DISPATCH PARAMETERS")}
				  {!isSubmitting && <Send size={14} />}
				</button>
			  </div>
			</form>
		  </div>

		</div>
	  </div>
	</div>
  );
}