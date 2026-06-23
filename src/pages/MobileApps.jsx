import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Play, CheckCircle, Users, X, Activity, Settings, BookOpen, Globe, ChevronRight, Zap, Shield, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/* ─────────────────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────────────────── */
const translations = {
  en: {
	heroBadge: 'Native iOS Ecosystem',
	heroTitle: 'Enterprise.\nIn your pocket.',
	heroSub: 'Native iOS applications built for the OPERIX platform — fast, secure, and synchronized with your command center in real time.',
	loginArch: 'Login Architecture',
	loginText1: 'All apps enforce a strict two-step auth: users resolve their unique ',
	workspaceDomain: 'Workspace Domain',
	loginText2: ' before accessing the secure login portal.',
	builtFor: 'Built For',
	coreCap: 'Core Capabilities',
	launchPreview: 'Watch Preview',
	livePreview: 'Live Preview',
	previewDesc: 'Recorded directly from a native iOS device.',
	tapToWatch: 'Tap to watch',
	apps: [
	  {
		id: 'ops-hr',
		title: 'OPERIX Hub',
		subtitle: 'Ops & HR',
		badge: 'Enterprise Mobility',
		accentColor: '#3b82f6',
		accentLight: 'rgba(59,130,246,0.10)',
		icon: <Settings size={20} />,
		desc: "Unified mobile command for HR and field operations. Enter your workspace domain, authenticate, and your entire operational environment is at your fingertips.",
		accomplishments: 'Eliminates paper logs, automates attendance, and bridges managers with frontline staff.',
		audience: 'Field Staff · Operations Managers · General Employees',
		capabilities: [
		  'Dedicated Ops tab for assigned tasks',
		  'Face ID punch in/out & auto timesheets',
		  'Instant payslip & leave request access',
		  'Full employee file with documents',
		],
		videoUrl: '/videos/ops-hr-mobile.MP4',
		poster: '/projects/mobile-poster-ops.jpg',
	  },
	  {
		id: 'care',
		title: 'OPERIX Care',
		subtitle: 'Clinical Mobile',
		badge: 'Clinical Operations',
		accentColor: '#f43f5e',
		accentLight: 'rgba(244,63,94,0.10)',
		icon: <Activity size={20} />,
		desc: "Full clinical and hospital management on the go. Medical staff log in via their hospital workspace domain for instant access to patient data and workflows.",
		accomplishments: 'Speeds up triage, simplifies billing, and gives Pharmacy and Blood Bank real-time data access.',
		audience: 'Physicians · Nurses · Receptionists · Clinicians',
		capabilities: [
		  'Reception: invoices, tickets & emergencies',
		  'Secure dedicated tabs for Doctors & Nurses',
		  'Pharmacy, Operations & Blood Bank mgmt',
		  'Comprehensive live patient file access',
		],
		videoUrl: '/videos/ops-care-mobile.MP4',
		poster: '/projects/mobile-poster-care.jpg',
	  },
	  {
		id: 'binabbas',
		title: 'Bin Abbas',
		subtitle: 'Community Portal',
		badge: 'Education & Community',
		accentColor: '#10b981',
		accentLight: 'rgba(16,185,129,0.10)',
		icon: <BookOpen size={20} />,
		desc: "A dedicated iOS app for students and community members to access Islamic resources, educational profiles, and institutional updates — all via their workspace domain.",
		accomplishments: 'Digitizes the student journey with a hub for Islamic learning, prayer times, and institutional engagement.',
		audience: 'Students · Community Members · Institute Staff',
		capabilities: [
		  'Interactive Moshaf with Tafsir & audio',
		  'Accurate prayer timers & Adhan alerts',
		  'Live news feed & institutional updates',
		  'Instant digital certificate export',
		],
		videoUrl: '/videos/bin-abbas-mobile.MP4',
		poster: '/projects/mobile-poster-abbas.jpg',
	  },
	],
  },
  ar: {
	heroBadge: 'نظام iOS الأصلي',
	heroTitle: 'المؤسسة.\nفي جيبك.',
	heroSub: 'تطبيقات iOS أصلية مبنية لمنصة أوبيريكس — سريعة وآمنة ومتزامنة مع مركز القيادة في الوقت الفعلي.',
	loginArch: 'هيكلة تسجيل الدخول',
	loginText1: 'تطبق جميع التطبيقات مصادقة من خطوتين: يجب إدخال ',
	workspaceDomain: 'نطاق مساحة العمل',
	loginText2: ' قبل الوصول إلى بوابة الدخول الآمنة.',
	builtFor: 'مصمم من أجل',
	coreCap: 'القدرات الأساسية',
	launchPreview: 'مشاهدة العرض',
	livePreview: 'عرض مباشر',
	previewDesc: 'مسجل مباشرة من جهاز iOS حقيقي.',
	tapToWatch: 'اضغط للمشاهدة',
	apps: [
	  {
		id: 'ops-hr',
		title: 'أوبيريكس هب',
		subtitle: 'العمليات والموارد',
		badge: 'تنقل المؤسسة',
		accentColor: '#3b82f6',
		accentLight: 'rgba(59,130,246,0.10)',
		icon: <Settings size={20} />,
		desc: 'واجهة جوال موحدة للموارد البشرية والعمليات الميدانية. أدخل نطاق مؤسستك وسجل دخولك للوصول الفوري.',
		accomplishments: 'يقضي على السجلات الورقية ويؤتمت الحضور ويربط المديرين بموظفي الخطوط الأمامية.',
		audience: 'الموظفون الميدانيون · مديرو العمليات · كافة الموظفين',
		capabilities: [
		  'قسم خاص للعمليات والمهام المعينة',
		  'تسجيل الحضور بـ Face ID وجداول آلية',
		  'وصول فوري لمسير الرواتب والطلبات',
		  'ملف موظف كامل بالمعلومات والمستندات',
		],
		videoUrl: '/videos/ops-hr-mobile.MP4',
		poster: '/projects/mobile-poster-ops.jpg',
	  },
	  {
		id: 'care',
		title: 'أوبيريكس كير',
		subtitle: 'الرعاية السريرية',
		badge: 'العمليات السريرية',
		accentColor: '#f43f5e',
		accentLight: 'rgba(244,63,94,0.10)',
		icon: <Activity size={20} />,
		desc: 'إدارة سريرية ومستشفيات شاملة أثناء التنقل. يسجل الطاقم الطبي دخوله عبر نطاق مساحة عمل المستشفى.',
		accomplishments: 'يسرع فرز المرضى ويبسط الفوترة ويمنح الأقسام المتخصصة وصولاً فورياً.',
		audience: 'الأطباء · الممرضون · موظفو الاستقبال · السريريون',
		capabilities: [
		  'الاستقبال: الفواتير والتذاكر والطوارئ',
		  'أقسام آمنة مخصصة للأطباء والممرضين',
		  'إدارة الصيدلية والعمليات وبنك الدم',
		  'وصول شامل لملف المريض الحي',
		],
		videoUrl: '/videos/ops-care-mobile.MP4',
		poster: '/projects/mobile-poster-care.jpg',
	  },
	  {
		id: 'binabbas',
		title: 'بوابة ابن عباس',
		subtitle: 'المجتمع والتعليم',
		badge: 'التعليم والمجتمع',
		accentColor: '#10b981',
		accentLight: 'rgba(16,185,129,0.10)',
		icon: <BookOpen size={20} />,
		desc: 'تطبيق iOS مخصص للطلاب وأعضاء المجتمع للوصول إلى الموارد الإسلامية والملفات التعليمية.',
		accomplishments: 'يرقمن رحلة الطالب ويخلق مركزاً للتعلم الإسلامي والصلوات والمشاركة المؤسسية.',
		audience: 'الطلاب · أعضاء المجتمع · موظفو المعهد',
		capabilities: [
		  'مصحف تفاعلي مع التفسير والتلاوة',
		  'مواقيت صلاة دقيقة وتنبيهات الأذان',
		  'موجز أخبار حي وتحديثات مؤسسية',
		  'تصدير فوري للشهادات الرقمية',
		],
		videoUrl: '/videos/bin-abbas-mobile.MP4',
		poster: '/projects/mobile-poster-abbas.jpg',
	  },
	],
  },
};

/* ─────────────────────────────────────────────────────────
   IPHONE 17 FRAME — pill Dynamic Island, no notch, flat
   titanium-style edges
───────────────────────────────────────────────────────── */
function IPhone17({ videoUrl, accentColor, isPlaying = true }) {
  const videoRef = useRef(null);

  useEffect(() => {
	const v = videoRef.current;
	if (!v) return;
	v.load();
	if (isPlaying) v.play().catch(() => {});
  }, [videoUrl, isPlaying]);

  return (
	<div className="iphone17-shell" style={{ '--accent': accentColor }}>
	  {/* Outer shell */}
	  <div className="iphone17-body">
		{/* Side buttons */}
		<div className="iphone17-btn-mute" />
		<div className="iphone17-btn-vol1" />
		<div className="iphone17-btn-vol2" />
		<div className="iphone17-btn-power" />

		{/* Screen bezel */}
		<div className="iphone17-screen-wrap">
		  {/* Dynamic Island pill */}
		  <div className="iphone17-dynamic-island" />

		  {/* Video content */}
		  <div className="iphone17-screen">
			<video
			  ref={videoRef}
			  src={videoUrl}
			  autoPlay
			  loop
			  muted
			  playsInline
			  className="iphone17-video"
			/>
		  </div>

		  {/* Home bar */}
		  <div className="iphone17-home-bar" />
		</div>
	  </div>
	</div>
  );
}

/* ─────────────────────────────────────────────────────────
   MODAL
───────────────────────────────────────────────────────── */
function VideoModal({ app, onClose, isAr, t }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
	requestAnimationFrame(() => setVisible(true));
	const onKey = (e) => e.key === 'Escape' && handleClose();
	window.addEventListener('keydown', onKey);
	return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleClose() {
	setVisible(false);
	setTimeout(onClose, 320);
  }

  return (
	<div
	  className="modal-backdrop"
	  style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.32s ease' }}
	  onClick={handleClose}
	>
	  {/* Close */}
	  <button
		className="modal-close"
		style={{ [isAr ? 'left' : 'right']: '1.5rem', top: '1.5rem' }}
		onClick={handleClose}
	  >
		<X size={20} />
	  </button>

	  {/* Content */}
	  <div
		className="modal-content"
		style={{
		  transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
		  opacity: visible ? 1 : 0,
		  transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.32s ease',
		}}
		onClick={(e) => e.stopPropagation()}
	  >
		{/* Left info panel */}
		<div className={`modal-info ${isAr ? 'modal-info-rtl' : ''}`}>
		  <span className="modal-tag" style={{ background: app.accentColor }}>
			{t.livePreview}
		  </span>
		  <h2 className="modal-app-title">{app.title}</h2>
		  <p className="modal-app-sub">{app.subtitle}</p>
		  <p className="modal-preview-desc">{t.previewDesc}</p>

		  <div className="modal-caps">
			{app.capabilities.map((c, i) => (
			  <div key={i} className="modal-cap-item">
				<span className="modal-cap-dot" style={{ background: app.accentColor }} />
				{c}
			  </div>
			))}
		  </div>
		</div>

		{/* Phone */}
		<div className="modal-phone">
		  <IPhone17 videoUrl={app.videoUrl} accentColor={app.accentColor} />
		</div>
	  </div>
	</div>
  );
}

/* ─────────────────────────────────────────────────────────
   APP CARD
───────────────────────────────────────────────────────── */
function AppCard({ app, onOpen, isAr, t, index }) {
  const [hovered, setHovered] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
	<div
	  className={`app-card ${isReversed ? 'app-card-reverse' : ''}`}
	  style={{ '--accent': app.accentColor, '--accent-light': app.accentLight }}
	>
	  {/* ── TEXT SIDE ── */}
	  <div className="app-card-text">
		{/* Badge */}
		<span className="app-badge" style={{ color: app.accentColor, background: app.accentLight }}>
		  {app.badge}
		</span>

		{/* Title */}
		<div className="app-title-row">
		  <div className="app-icon-wrap" style={{ background: app.accentLight }}>
			<span style={{ color: app.accentColor }}>{app.icon}</span>
		  </div>
		  <div>
			<h2 className="app-name">{app.title}</h2>
			<p className="app-subtitle-label">{app.subtitle}</p>
		  </div>
		</div>

		<p className="app-desc">{app.desc}</p>

		{/* Audience */}
		<div className="app-info-block">
		  <span className="app-info-label">
			<Users size={12} style={{ display: 'inline', marginRight: 4 }} />
			{t.builtFor}
		  </span>
		  <p className="app-audience">{app.audience}</p>
		</div>

		{/* Login note */}
		<div className="app-login-block">
		  <Globe size={12} className="app-login-icon" style={{ color: app.accentColor }} />
		  <p>
			{t.loginText1}
			<strong style={{ color: app.accentColor }}>{t.workspaceDomain}</strong>
			{t.loginText2}
		  </p>
		</div>

		{/* Capabilities */}
		<div className="app-caps-grid">
		  {app.capabilities.map((c, i) => (
			<div key={i} className="app-cap">
			  <CheckCircle size={14} style={{ color: app.accentColor, flexShrink: 0 }} />
			  <span>{c}</span>
			</div>
		  ))}
		</div>

		{/* CTA */}
		<button
		  className="app-cta"
		  style={{ '--accent': app.accentColor }}
		  onClick={() => onOpen(app)}
		>
		  <Play size={15} fill="currentColor" />
		  {t.launchPreview}
		  <ChevronRight size={15} />
		</button>
	  </div>

	  {/* ── PHONE SIDE ── */}
	  <div
		className="app-card-phone"
		onMouseEnter={() => setHovered(true)}
		onMouseLeave={() => setHovered(false)}
		onClick={() => onOpen(app)}
	  >
		{/* Ambient glow */}
		<div
		  className="phone-glow"
		  style={{
			background: app.accentColor,
			opacity: hovered ? 0.22 : 0.1,
			transition: 'opacity 0.5s ease',
		  }}
		/>

		{/* The phone */}
		<div
		  className="phone-wrapper"
		  style={{
			transform: hovered ? 'translateY(-10px) rotateY(-4deg) scale(1.03)' : 'translateY(0) rotateY(0deg) scale(1)',
			transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
		  }}
		>
		  {/* Static poster preview (not full interactive video in card) */}
		  <div className="iphone17-shell" style={{ '--accent': app.accentColor }}>
			<div className="iphone17-body">
			  <div className="iphone17-btn-mute" />
			  <div className="iphone17-btn-vol1" />
			  <div className="iphone17-btn-vol2" />
			  <div className="iphone17-btn-power" />
			  <div className="iphone17-screen-wrap">
				<div className="iphone17-dynamic-island" />
				<div className="iphone17-screen">
				  {app.poster ? (
					<img src={app.poster} alt={app.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
				  ) : (
					<div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e2d40, #0f1621)' }} />
				  )}
				</div>
				<div className="iphone17-home-bar" />
			  </div>
			</div>
		  </div>

		  {/* Play overlay */}
		  <div
			className="phone-play-overlay"
			style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease' }}
		  >
			<div
			  className="phone-play-btn"
			  style={{ background: app.accentColor }}
			>
			  <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
			</div>
			<span className="phone-tap-label">{t.tapToWatch}</span>
		  </div>
		</div>
	  </div>
	</div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function MobileApps() {
  const { isAr } = useLanguage();
  const t = translations[isAr ? 'ar' : 'en'];
  const [activeApp, setActiveApp] = useState(null);

  useEffect(() => {
	document.body.style.overflow = activeApp ? 'hidden' : '';
	return () => { document.body.style.overflow = ''; };
  }, [activeApp]);

  const heroLines = t.heroTitle.split('\n');

  return (
	<>
	  {/* ── GLOBAL STYLES ── */}
	  <style>{`
		/* ── iPhone 17 Shell ── */
		.iphone17-shell {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  width: 100%;
		  height: 100%;
		}
		.iphone17-body {
		  position: relative;
		  width: 270px;
		  height: 585px;
		  background: linear-gradient(160deg, #2a2a2e 0%, #1a1a1e 50%, #2a2a2e 100%);
		  border-radius: 44px;
		  box-shadow:
			0 0 0 1.5px rgba(255,255,255,0.18),
			0 0 0 3px #111114,
			0 0 0 4px rgba(255,255,255,0.07),
			0 32px 80px rgba(0,0,0,0.6),
			0 8px 24px rgba(0,0,0,0.4),
			inset 0 1px 0 rgba(255,255,255,0.12);
		  flex-shrink: 0;
		}

		/* Side buttons — left */
		.iphone17-btn-mute {
		  position: absolute;
		  left: -3px;
		  top: 90px;
		  width: 3px;
		  height: 28px;
		  background: linear-gradient(180deg, #3a3a3e, #222226);
		  border-radius: 2px 0 0 2px;
		  box-shadow: -1px 0 3px rgba(0,0,0,0.5);
		}
		.iphone17-btn-vol1 {
		  position: absolute;
		  left: -3px;
		  top: 132px;
		  width: 3px;
		  height: 48px;
		  background: linear-gradient(180deg, #3a3a3e, #222226);
		  border-radius: 2px 0 0 2px;
		  box-shadow: -1px 0 3px rgba(0,0,0,0.5);
		}
		.iphone17-btn-vol2 {
		  position: absolute;
		  left: -3px;
		  top: 192px;
		  width: 3px;
		  height: 48px;
		  background: linear-gradient(180deg, #3a3a3e, #222226);
		  border-radius: 2px 0 0 2px;
		  box-shadow: -1px 0 3px rgba(0,0,0,0.5);
		}
		/* Power — right */
		.iphone17-btn-power {
		  position: absolute;
		  right: -3px;
		  top: 148px;
		  width: 3px;
		  height: 64px;
		  background: linear-gradient(180deg, #3a3a3e, #222226);
		  border-radius: 0 2px 2px 0;
		  box-shadow: 1px 0 3px rgba(0,0,0,0.5);
		}

		/* Screen area */
		.iphone17-screen-wrap {
		  position: absolute;
		  inset: 10px;
		  border-radius: 36px;
		  overflow: hidden;
		  background: #000;
		  display: flex;
		  flex-direction: column;
		}

		/* Dynamic Island — pill, centered top */
		.iphone17-dynamic-island {
		  position: absolute;
		  top: 10px;
		  left: 50%;
		  transform: translateX(-50%);
		  width: 62px;
		  height: 20px;
		  background: #000;
		  border-radius: 20px;
		  z-index: 10;
		  box-shadow: 0 0 0 1px rgba(255,255,255,0.04);
		}

		.iphone17-screen {
		  position: absolute;
		  inset: 0;
		}
		.iphone17-video {
		  width: 100%;
		  height: 100%;
		  object-fit: cover;
		  display: block;
		}

		/* Home bar */
		.iphone17-home-bar {
		  position: absolute;
		  bottom: 8px;
		  left: 50%;
		  transform: translateX(-50%);
		  width: 100px;
		  height: 4px;
		  background: rgba(255,255,255,0.45);
		  border-radius: 4px;
		  z-index: 10;
		}

		/* ── Page ── */
		.mobile-page {
		  min-height: 100vh;
		  background: #f8fafc;
		  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif;
		  padding-bottom: 6rem;
		}

		/* ── Hero ── */
		.hero {
		  background: #1e2d40;
		  padding: 7rem 1.5rem 5rem;
		  text-align: center;
		  position: relative;
		  overflow: hidden;
		}
		.hero-glow {
		  position: absolute;
		  top: -80px;
		  left: 50%;
		  transform: translateX(-50%);
		  width: 600px;
		  height: 400px;
		  background: radial-gradient(ellipse, rgba(212,175,55,0.18) 0%, transparent 70%);
		  pointer-events: none;
		}
		.hero-badge {
		  display: inline-flex;
		  align-items: center;
		  gap: 6px;
		  font-size: 10px;
		  font-weight: 800;
		  letter-spacing: 0.18em;
		  text-transform: uppercase;
		  color: #d4af37;
		  margin-bottom: 1.5rem;
		  padding: 6px 14px;
		  border: 1px solid rgba(212,175,55,0.25);
		  border-radius: 100px;
		  background: rgba(212,175,55,0.07);
		}
		.hero-title {
		  font-size: clamp(2.8rem, 6vw, 4.5rem);
		  font-weight: 900;
		  color: #fff;
		  line-height: 1.05;
		  letter-spacing: -0.03em;
		  margin-bottom: 1.25rem;
		  white-space: pre-line;
		}
		.hero-title-accent {
		  color: #d4af37;
		}
		.hero-sub {
		  font-size: 0.95rem;
		  color: rgba(255,255,255,0.5);
		  max-width: 520px;
		  margin: 0 auto;
		  line-height: 1.75;
		  font-weight: 400;
		}

		/* ── App Cards ── */
		.cards-wrapper {
		  max-width: 1100px;
		  margin: 5rem auto;
		  padding: 0 1.5rem;
		  display: flex;
		  flex-direction: column;
		  gap: 7rem;
		}

		.app-card {
		  display: flex;
		  flex-direction: column;
		  gap: 3rem;
		  align-items: center;
		}
		@media (min-width: 1024px) {
		  .app-card { flex-direction: row; gap: 5rem; }
		  .app-card-reverse { flex-direction: row-reverse; }
		}

		.app-card-text {
		  flex: 1;
		  display: flex;
		  flex-direction: column;
		  gap: 1.25rem;
		}

		.app-badge {
		  display: inline-block;
		  font-size: 9px;
		  font-weight: 800;
		  letter-spacing: 0.15em;
		  text-transform: uppercase;
		  padding: 4px 10px;
		  border-radius: 100px;
		}

		.app-title-row {
		  display: flex;
		  align-items: center;
		  gap: 14px;
		}
		.app-icon-wrap {
		  width: 48px;
		  height: 48px;
		  border-radius: 14px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  flex-shrink: 0;
		}
		.app-name {
		  font-size: 1.75rem;
		  font-weight: 900;
		  color: #0f1621;
		  letter-spacing: -0.03em;
		  line-height: 1;
		}
		.app-subtitle-label {
		  font-size: 0.7rem;
		  font-weight: 700;
		  color: #94a3b8;
		  letter-spacing: 0.1em;
		  text-transform: uppercase;
		  margin-top: 2px;
		}
		.app-desc {
		  font-size: 0.88rem;
		  color: #475569;
		  line-height: 1.8;
		  font-weight: 400;
		}

		.app-info-block {
		  background: #fff;
		  border: 1px solid #e2e8f0;
		  border-radius: 14px;
		  padding: 14px 16px;
		}
		.app-info-label {
		  display: flex;
		  align-items: center;
		  font-size: 9px;
		  font-weight: 800;
		  letter-spacing: 0.15em;
		  text-transform: uppercase;
		  color: #94a3b8;
		  margin-bottom: 6px;
		}
		.app-audience {
		  font-size: 0.78rem;
		  font-weight: 600;
		  color: #1e2d40;
		  line-height: 1.6;
		}

		.app-login-block {
		  display: flex;
		  align-items: flex-start;
		  gap: 8px;
		  font-size: 0.75rem;
		  color: #64748b;
		  line-height: 1.7;
		  background: #f8fafc;
		  border: 1px solid #e2e8f0;
		  border-radius: 12px;
		  padding: 12px 14px;
		}
		.app-login-icon { flex-shrink: 0; margin-top: 2px; }

		.app-caps-grid {
		  display: grid;
		  grid-template-columns: 1fr 1fr;
		  gap: 10px;
		}
		.app-cap {
		  display: flex;
		  align-items: flex-start;
		  gap: 8px;
		  font-size: 0.75rem;
		  font-weight: 600;
		  color: #1e2d40;
		  line-height: 1.5;
		}

		.app-cta {
		  display: inline-flex;
		  align-items: center;
		  gap: 8px;
		  padding: 12px 22px;
		  border-radius: 100px;
		  background: var(--accent);
		  color: #fff;
		  font-size: 0.82rem;
		  font-weight: 700;
		  border: none;
		  cursor: pointer;
		  letter-spacing: 0.01em;
		  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
		  align-self: flex-start;
		}
		.app-cta:hover {
		  transform: translateY(-2px);
		  filter: brightness(1.1);
		  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
		}
		.app-cta:active { transform: translateY(0); }

		/* ── Phone wrapper in card ── */
		.app-card-phone {
		  flex: 1;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  cursor: pointer;
		  perspective: 800px;
		  min-height: 620px;
		  position: relative;
		}
		.phone-glow {
		  position: absolute;
		  width: 300px;
		  height: 300px;
		  border-radius: 50%;
		  filter: blur(80px);
		  pointer-events: none;
		}
		.phone-wrapper {
		  position: relative;
		  z-index: 1;
		  transform-style: preserve-3d;
		}
		.phone-play-overlay {
		  position: absolute;
		  inset: 0;
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  z-index: 20;
		  pointer-events: none;
		}
		.phone-play-btn {
		  width: 60px;
		  height: 60px;
		  border-radius: 50%;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
		  backdrop-filter: blur(8px);
		}
		.phone-tap-label {
		  margin-top: 10px;
		  font-size: 11px;
		  font-weight: 700;
		  letter-spacing: 0.12em;
		  text-transform: uppercase;
		  color: #fff;
		  text-shadow: 0 1px 8px rgba(0,0,0,0.6);
		  background: rgba(15,22,33,0.55);
		  padding: 4px 12px;
		  border-radius: 100px;
		}

		/* ── Modal ── */
		.modal-backdrop {
		  position: fixed;
		  inset: 0;
		  z-index: 200;
		  background: rgba(5,8,16,0.92);
		  backdrop-filter: blur(16px);
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  padding: 1rem;
		}
		.modal-close {
		  position: absolute;
		  z-index: 10;
		  width: 44px;
		  height: 44px;
		  border-radius: 50%;
		  background: rgba(255,255,255,0.08);
		  border: 1px solid rgba(255,255,255,0.15);
		  color: #fff;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  cursor: pointer;
		  transition: background 0.2s;
		}
		.modal-close:hover { background: rgba(255,255,255,0.16); }

		.modal-content {
		  display: flex;
		  flex-direction: column;
		  align-items: center;
		  gap: 3rem;
		  max-width: 900px;
		  width: 100%;
		}
		@media (min-width: 900px) {
		  .modal-content { flex-direction: row; align-items: center; }
		}

		.modal-info {
		  flex: 1;
		  color: #fff;
		  text-align: left;
		}
		.modal-info-rtl { text-align: right; }

		.modal-tag {
		  display: inline-block;
		  font-size: 9px;
		  font-weight: 800;
		  letter-spacing: 0.2em;
		  text-transform: uppercase;
		  color: #0f1621;
		  padding: 4px 12px;
		  border-radius: 100px;
		  margin-bottom: 1rem;
		}
		.modal-app-title {
		  font-size: 2.2rem;
		  font-weight: 900;
		  letter-spacing: -0.03em;
		  line-height: 1;
		  margin-bottom: 4px;
		}
		.modal-app-sub {
		  font-size: 0.75rem;
		  font-weight: 600;
		  color: rgba(255,255,255,0.4);
		  letter-spacing: 0.1em;
		  text-transform: uppercase;
		  margin-bottom: 1rem;
		}
		.modal-preview-desc {
		  font-size: 0.82rem;
		  color: rgba(255,255,255,0.45);
		  line-height: 1.7;
		  margin-bottom: 1.5rem;
		}
		.modal-caps {
		  display: flex;
		  flex-direction: column;
		  gap: 10px;
		}
		.modal-cap-item {
		  display: flex;
		  align-items: center;
		  gap: 10px;
		  font-size: 0.8rem;
		  color: rgba(255,255,255,0.7);
		  font-weight: 500;
		}
		.modal-cap-dot {
		  width: 6px;
		  height: 6px;
		  border-radius: 50%;
		  flex-shrink: 0;
		}

		.modal-phone {
		  flex-shrink: 0;
		  width: 290px;
		  height: 630px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		}
		.modal-phone .iphone17-body {
		  width: 268px;
		  height: 580px;
		}

		/* ── Divider between cards ── */
		.cards-divider {
		  width: 1px;
		  height: 80px;
		  background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
		  margin: 0 auto;
		}

		@media (prefers-reduced-motion: reduce) {
		  * { transition: none !important; animation: none !important; }
		}
	  `}</style>

	  <div className={`mobile-page ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>

		{/* ── HERO ── */}
		<header className="hero">
		  <div className="hero-glow" />
		  <div style={{ position: 'relative', zIndex: 1 }}>
			<div className="hero-badge">
			  <Smartphone size={12} />
			  {t.heroBadge}
			</div>
			<h1 className="hero-title">
			  {heroLines.map((line, i) =>
				i === 0
				  ? <span key={i}>{line}<br /></span>
				  : <span key={i} className="hero-title-accent">{line}</span>
			  )}
			</h1>
			<p className="hero-sub">{t.heroSub}</p>
		  </div>
		</header>

		{/* ── APP CARDS ── */}
		<main className="cards-wrapper">
		  {t.apps.map((app, index) => (
			<React.Fragment key={app.id}>
			  {index > 0 && <div className="cards-divider" />}
			  <AppCard
				app={app}
				onOpen={setActiveApp}
				isAr={isAr}
				t={t}
				index={index}
			  />
			</React.Fragment>
		  ))}
		</main>

	  </div>

	  {/* ── MODAL ── */}
	  {activeApp && (
		<VideoModal
		  app={activeApp}
		  onClose={() => setActiveApp(null)}
		  isAr={isAr}
		  t={t}
		/>
	  )}
	</>
  );
}