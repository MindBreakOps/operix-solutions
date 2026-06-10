import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, Mail, AlertTriangle } from 'lucide-react';

export default function CmsLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isAr } = useLanguage();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const brandName = "OPERIX Solutions";

  const handleCmsAuthSubmit = async (e) => {
	e.preventDefault();
	setError('');
	setLoading(true);

	try {
	  const { error: authError } = await login(email, password);
	  if (authError) throw authError;
	  
	  // Push directly to verified light console
	  navigate('/admindashboard');
	} catch (err) {
	  setError(err.message || 'Access Denied. Invalid credential signature.');
	} finally {
	  setLoading(false);
	}
  };

  return (
	<div className="min-h-screen flex items-center justify-center px-6 py-12 select-none" style={{ backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
	  <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl transition-all duration-300">
		
		{/* BRAND SYMBOL LAYER */}
		<div className="flex flex-col items-center text-center space-y-3 mb-8">
		  <img src="/logo.png" alt={`${brandName} Logo`} className="w-12 h-12 object-contain" />
		  <div>
			<h1 className="text-xl font-black uppercase tracking-tight m-0" style={{ color: '#1e2d40' }}>
			  {brandName}
			</h1>
			<p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">
			  {isAr ? "لوحة التحكم الإدارية السحابية" : "Cloud Governance Core"}
			</p>
		  </div>
		</div>

		{/* ERROR DISPATCH DISPLAY */}
		{error && (
		  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-rose-700 text-xs font-semibold mb-6 animate-in">
			<AlertTriangle size={16} className="shrink-0 mt-0.5" />
			<div>{error}</div>
		  </div>
		)}

		{/* CREDENTIAL SECURITY FORM */}
		<form onSubmit={handleCmsAuthSubmit} className="space-y-5">
		  <div className="space-y-1.5">
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
			  {isAr ? "البريد الإلكتروني للعمل" : "Work Email Anchor"}
			</label>
			<div className="relative">
			  <Mail size={16} className="absolute left-4 top-3.5 text-slate-400" />
			  <input 
				type="email" 
				required 
				placeholder="admin@operix.com"
				value={email} 
				onChange={e => setEmail(e.target.value)} 
				className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#1e2d40] outline-none transition-all focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10" 
			  />
			</div>
		  </div>

		  <div className="space-y-1.5">
			<label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">
			  {isAr ? "كلمة المرور المشفرة" : "Secure Password Core"}
			</label>
			<div className="relative">
			  <Lock size={16} className="absolute left-4 top-3.5 text-slate-400" />
			  <input 
				type="password" 
				required 
				placeholder="••••••••"
				value={password} 
				onChange={e => setPassword(e.target.value)} 
				className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-[#1e2d40] outline-none transition-all focus:bg-white focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/10" 
			  />
			</div>
		  </div>

		  <button 
			type="submit" 
			disabled={loading}
			className="w-full py-3.5 text-white rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95"
			style={{ backgroundColor: '#1e2d40' }}
		  >
			{loading ? (isAr ? "جاري التحقق..." : "Authorizing Matrix...") : (isAr ? "تسجيل الدخول" : "Verify Authority Signature")}
		  </button>
		</form>

		{/* SECURITY AUDIT STAMP */}
		<div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
		  <ShieldCheck size={12} className="text-[#c9a84c]" />
		  <span>{isAr ? "اتصال آمن بـ SSL ومقيد بمحرك التشفير" : "SSL Encrypted Access Protocol"}</span>
		</div>

	  </div>
	</div>
  );
}