import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, Mail, AlertTriangle, Eye, EyeOff } from 'lucide-react';

export default function CmsLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isAr } = useLanguage();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const brandName = "OPERIX Solutions";

  const handleSubmit = async (e) => {
	e.preventDefault();
	setError('');
	setLoading(true);
	try {
	  const { error: authError } = await login(email, password);
	  if (authError) throw authError;
	  navigate('/admindashboard');
	} catch (err) {
	  setError(err.message || 'Access Denied. Invalid credential signature.');
	  setShake(true);
	  setTimeout(() => setShake(false), 600);
	} finally { setLoading(false); }
  };

  return (
	<div className="min-h-screen flex items-center justify-center px-4 py-12 select-none relative overflow-hidden"
	  style={{ backgroundColor: '#0f1621', fontFamily: "'Inter', system-ui, sans-serif" }}>

	  <style>{`
		@keyframes floatOrb {
		  0%, 100% { transform: translate(0,0) scale(1); opacity: 0.12; }
		  33%       { transform: translate(20px,-30px) scale(1.08); opacity: 0.18; }
		  66%       { transform: translate(-15px,20px) scale(0.96); opacity: 0.1; }
		}
		@keyframes gridPulse {
		  0%, 100% { opacity: 0.02; }
		  50%       { opacity: 0.05; }
		}
		@keyframes fadeSlideUp {
		  from { opacity: 0; transform: translateY(28px) scale(0.98); }
		  to   { opacity: 1; transform: translateY(0) scale(1); }
		}
		@keyframes shake {
		  0%,100% { transform: translateX(0); }
		  20%      { transform: translateX(-6px); }
		  40%      { transform: translateX(6px); }
		  60%      { transform: translateX(-4px); }
		  80%      { transform: translateX(4px); }
		}
		@keyframes errorSlide {
		  from { opacity: 0; transform: translateY(-8px); }
		  to   { opacity: 1; transform: translateY(0); }
		}
		@keyframes spin {
		  to { transform: rotate(360deg); }
		}
		.panel-animate {
		  animation: fadeSlideUp 0.7s cubic-bezier(0.22,1,0.36,1) both;
		}
		.shake-anim {
		  animation: shake 0.5s cubic-bezier(0.22,1,0.36,1);
		}
		.error-slide {
		  animation: errorSlide 0.35s cubic-bezier(0.22,1,0.36,1);
		}
		.input-field { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
		.input-field:focus-within { box-shadow: 0 0 0 3px rgba(212,175,55,0.18); }
		.submit-glow { transition: all 0.25s cubic-bezier(0.22,1,0.36,1); }
		.submit-glow:hover:not(:disabled) { box-shadow: 0 8px 28px rgba(212,175,55,0.35); transform: translateY(-1px); }
		.submit-glow:active:not(:disabled) { transform: translateY(0); }
		.orb { animation: floatOrb var(--dur, 8s) ease-in-out infinite var(--delay, 0s); }
		.grid-bg { animation: gridPulse 6s ease-in-out infinite; }
	  `}</style>

	  {/* ── Ambient orbs ─────────────────────────────────────── */}
	  <div className="orb absolute w-[500px] h-[500px] rounded-full pointer-events-none"
		style={{ background: 'radial-gradient(ellipse, #d4af3720 0%, transparent 65%)', top: '-10%', left: '-10%', '--dur': '10s', '--delay': '0s' }} />
	  <div className="orb absolute w-[360px] h-[360px] rounded-full pointer-events-none"
		style={{ background: 'radial-gradient(ellipse, #3b82f612 0%, transparent 65%)', bottom: '5%', right: '5%', '--dur': '13s', '--delay': '-4s' }} />

	  {/* ── Grid ────────────────────────────────────────────── */}
	  <div className="grid-bg absolute inset-0 pointer-events-none"
		style={{
		  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
		  backgroundSize: '44px 44px'
		}} />

	  {/* ── Card ─────────────────────────────────────────────── */}
	  <div className={`relative w-full max-w-md ${shake ? 'shake-anim' : ''} ${mounted ? 'panel-animate' : 'opacity-0'}`}>

		{/* Outer glow ring */}
		<div className="absolute -inset-px rounded-[28px] pointer-events-none"
		  style={{ background: 'linear-gradient(135deg, #d4af3730 0%, transparent 50%, #d4af3718 100%)' }} />

		<div className="relative bg-[#0f1824] border border-white/[0.08] rounded-[26px] p-8 sm:p-10 shadow-2xl backdrop-blur-sm">

		  {/* ── Brand ───────────────────────────────────────── */}
		  <div className="flex flex-col items-center text-center mb-8">
			<div className="relative mb-4">
			  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-inner">
				<img src="/logo.png" alt={`${brandName} Logo`} className="w-8 h-8 object-contain" />
			  </div>
			  {/* Subtle shine */}
			  <div className="absolute inset-0 rounded-2xl pointer-events-none"
				style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%)' }} />
			</div>
			<h1 className="text-lg font-black uppercase tracking-tight text-white mb-0.5">
			  {brandName}
			</h1>
			<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
			  {isAr ? "لوحة التحكم الإدارية السحابية" : "Cloud Governance Core"}
			</p>
		  </div>

		  {/* ── Error ───────────────────────────────────────── */}
		  {error && (
			<div className="error-slide p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-400 text-xs font-semibold mb-6">
			  <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
			  <span>{error}</span>
			</div>
		  )}

		  {/* ── Form ────────────────────────────────────────── */}
		  <form onSubmit={handleSubmit} className="space-y-4">

			{/* Email */}
			<div className="space-y-1.5">
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
				{isAr ? "البريد الإلكتروني" : "Work Email"}
			  </label>
			  <div className="input-field relative bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-[#d4af37]/60">
				<Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
				<input
				  type="email" required placeholder="admin@operix.com"
				  value={email} onChange={e => setEmail(e.target.value)}
				  className="w-full bg-transparent pl-10 pr-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
				/>
			  </div>
			</div>

			{/* Password */}
			<div className="space-y-1.5">
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">
				{isAr ? "كلمة المرور" : "Password"}
			  </label>
			  <div className="input-field relative bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-[#d4af37]/60">
				<Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
				<input
				  type={showPwd ? 'text' : 'password'} required placeholder="••••••••"
				  value={password} onChange={e => setPassword(e.target.value)}
				  className="w-full bg-transparent pl-10 pr-11 py-3 text-sm font-semibold text-white outline-none placeholder:text-slate-600"
				/>
				<button
				  type="button" onClick={() => setShowPwd(p => !p)}
				  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#d4af37] transition-colors cursor-pointer"
				>
				  {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
				</button>
			  </div>
			</div>

			{/* Submit */}
			<button
			  type="submit" disabled={loading}
			  className="submit-glow w-full mt-2 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-wider text-[#1e2d40] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 shadow-lg"
			  style={{ background: loading ? '#c9a84c' : 'linear-gradient(135deg, #d4af37 0%, #f0cb55 100%)' }}
			>
			  {loading ? (
				<>
				  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
				  </svg>
				  {isAr ? "جاري التحقق..." : "Authorizing..."}
				</>
			  ) : (
				<>{isAr ? "تسجيل الدخول" : "Verify Authority Signature"}</>
			  )}
			</button>
		  </form>

		  {/* ── Footer stamp ────────────────────────────────── */}
		  <div className="mt-7 border-t border-white/[0.06] pt-5 flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
			<ShieldCheck size={11} className="text-[#d4af37]" />
			{isAr ? "اتصال آمن بـ SSL" : "SSL Encrypted Access Protocol"}
		  </div>
		</div>
	  </div>
	</div>
  );
}