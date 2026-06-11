import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Shield } from 'lucide-react';

export default function Contact() {
  const { isAr } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', company: '', architecture: 'OPERIX HRIS', customArchitecture: '' });
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Dynamic Service List based on your operations
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

  const handleSubmit = (e) => {
	e.preventDefault();
	const finalData = {
	  ...formData,
	  architecture: showCustomInput ? formData.customArchitecture : formData.architecture
	};
	console.log("Dispatching:", finalData);
	// Add Supabase insert logic here
  };

  return (
	<div className="w-full min-h-screen bg-[#f8fafc] flex flex-col justify-center py-20 px-4 md:px-6 font-sans">
	  <div className="max-w-4xl mx-auto w-full bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-slate-200">
		
		<div className="space-y-4 mb-12">
		  <h1 className="text-3xl md:text-5xl font-black text-[#1e2d40] tracking-tight font-serif">
			{isAr ? "بدء التحول المؤسسي" : "Initialize Enterprise Transformation"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium">
			{isAr 
			  ? "أدخل مواصفات منشأتك أدناه للتشاور مع مهندسي تنفيذ الأنظمة لدينا."
			  : "Submit your corporate specifications below to consult with our system implementation architects."}
		  </p>
		  <div className="pt-2 space-y-2">
			<div className="flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest text-[#1e2d40] uppercase">
			  <Mail size={14} className="text-[#c9a84c]" /> OPERIXSOLUTION@GMAIL.COM
			</div>
			<div className="flex items-center gap-2 text-[10px] md:text-xs font-black tracking-widest text-[#1e2d40] uppercase">
			  <Shield size={14} className="text-[#c9a84c]" /> PROPRIETARY TECHNICAL FACILITY CONSULTING
			</div>
		  </div>
		</div>

		<form onSubmit={handleSubmit} className="space-y-6">
		  <div className="space-y-2">
			<label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#1e2d40]">
			  {isAr ? "الاسم الكامل" : "YOUR NAME"}
			</label>
			<input 
			  type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
			  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#1e2d40] transition-colors"
			/>
		  </div>

		  <div className="space-y-2">
			<label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#1e2d40]">
			  {isAr ? "البريد الإلكتروني للعمل" : "WORK EMAIL"}
			</label>
			<input 
			  type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
			  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#1e2d40] transition-colors"
			/>
		  </div>

		  <div className="space-y-2">
			<label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#1e2d40]">
			  {isAr ? "تحديد بنية النظام المستهدف" : "TARGET ARCHITECTURE SELECTION"}
			</label>
			<select 
			  value={formData.architecture} onChange={handleServiceChange}
			  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 text-sm font-semibold text-[#1e2d40] outline-none focus:bg-white focus:border-[#1e2d40] transition-colors cursor-pointer"
			>
			  {servicesList.map(service => <option key={service} value={service}>{service}</option>)}
			</select>
		  </div>

		  {/* Conditional "Other" Input */}
		  {showCustomInput && (
			<div className="space-y-2 animate-in slide-in-from-top-2">
			  <label className="block text-[10px] md:text-[11px] font-black uppercase tracking-widest text-[#c9a84c]">
				{isAr ? "يرجى تحديد الخدمة المطلوبة" : "PLEASE SPECIFY YOUR REQUIREMENT"}
			  </label>
			  <input 
				type="text" required={showCustomInput} placeholder={isAr ? "أكتب تفاصيل طلبك هنا..." : "Type your specific request here..."} value={formData.customArchitecture} onChange={e => setFormData({...formData, customArchitecture: e.target.value})}
				className="w-full bg-white border border-[#c9a84c]/50 rounded-lg px-4 py-3.5 text-sm font-semibold text-[#1e2d40] outline-none focus:border-[#c9a84c] transition-colors shadow-inner"
			  />
			</div>
		  )}

		  <div className="pt-6">
			<button type="submit" className="w-full bg-[#1e2d40] text-white py-4 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#c9a84c] transition-colors shadow-md">
			  {isAr ? "إرسال المعطيات" : "DISPATCH PARAMETERS"}
			</button>
		  </div>
		</form>

	  </div>
	</div>
  );
}