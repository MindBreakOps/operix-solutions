import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Play, CheckCircle, Users, X, Activity, Settings, BookOpen, Globe, ChevronRight, Zap, Shield, Star, Home, Monitor, Cloud, Laptop, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Import Logos
import logoOps from "../logos/opx-ops.png";
import logoCare from "../logos/opx-care.jpg";
import logoEdu from "../logos/opx-edu.png";
import logoBinAbbas from "../logos/binabbas.png";
import logoHasad from "../logos/hasad.png";
import logoHris from "../logos/opx-hris.png";

/* ─────────────────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────────────────── */
const translations = {
  en: {
    heroBadge: 'Unified Mobility Ecosystem',
    heroTitle: 'Enterprise Mobility.\nEverywhere.',
    heroSub: 'High-performance applications built for iOS, Android, and Web — synchronized with your command center in real time.',
    tabIos: 'iOS Ecosystem',
    tabAndroid: 'Android Ecosystem',
    tabPwa: 'Cloud PWA',
    pwaDesc: 'Our Progressive Web Apps (PWA) provide a desktop-class experience on mobile browsers. No app store friction—just log in and work.',
    builtFor: 'BUILT FOR',
    workspaceDomain: 'Workspace Domain',
    loginText1: 'All apps enforce a strict two-step auth: users resolve their unique ',
    loginText2: ' before accessing the secure login portal.',
    launchPreview: 'Watch Preview',
    livePreview: 'Live Preview',
    tapToWatch: 'TAP TO WATCH',
    iosApps: [
      {
        id: 'hasad-ios',
        title: 'Hasad App',
        subtitle: 'SMART COMMUNITY HUB',
        badge: 'REAL ESTATE & PROPERTY',
        accentColor: '#f43f5e',
        accentLight: 'rgba(244,63,94,0.10)',
        icon: <Home size={18} />,
        appLogo: logoHasad,
        desc: "Real estate and property management ecosystem handling resident requests, facility maintenance logs, and community billing cycles.",
        audience: 'Residents · Property Managers · Maintenance Teams',
        capabilities: ['Smart Dashboards with live KPIs', 'Instant Fast Certification', 'Precise Role-based Access', 'Advanced Data Visualizations'],
        videoUrl: '/videos/hasad.MP4',
        platform: 'ios'
      },
      {
        id: 'ops-hr-ios',
        title: 'OPERIX Hub',
        subtitle: 'OPS & HR',
        badge: 'ENTERPRISE MOBILITY',
        accentColor: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.10)',
        icon: <Settings size={18} />,
        appLogo: logoOps,
        desc: "Unified mobile command for HR and field operations. Enter your workspace domain, authenticate, and your entire operational environment is at your fingertips.",
        audience: 'Field Staff · Operations Managers · General Employees',
        capabilities: ['Dedicated Ops tab for assigned tasks', 'Face ID punch in/out & auto timesheets', 'Instant payslip & leave request access', 'Full employee file with documents'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'ios'
      },
      {
        id: 'care-ios',
        title: 'OPERIX Care',
        subtitle: 'CLINICAL MOBILE',
        badge: 'CLINICAL OPERATIONS',
        accentColor: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.10)',
        icon: <Activity size={18} />,
        appLogo: logoCare,
        desc: "Full clinical and hospital management on the go. Medical staff log in via their hospital workspace domain for instant access to patient data and workflows.",
        audience: 'Physicians · Nurses · Receptionists · Clinicians',
        capabilities: ['Reception: invoices, tickets & emergencies', 'Secure dedicated tabs for Doctors & Nurses', 'Pharmacy, Operations & Blood Bank mgmt', 'Comprehensive live patient file access'],
        videoUrl: '/videos/ops-care-mobile.MP4',
        platform: 'ios'
      },
      {
        id: 'binabbas-ios',
        title: 'Bin Abbas',
        subtitle: 'COMMUNITY PORTAL',
        badge: 'EDUCATION & COMMUNITY',
        accentColor: '#10b981',
        accentLight: 'rgba(16,185,129,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoBinAbbas,
        desc: "A dedicated iOS app for students and community members to access Islamic resources, educational profiles, and institutional updates — all via their workspace domain.",
        audience: 'Students · Community Members · Institute Staff',
        capabilities: ['Interactive Moshaf with Tafsir & audio', 'Accurate prayer timers & Adhan alerts', 'Live news feed & institutional updates', 'Instant digital certificate export'],
        videoUrl: '/videos/bin-abbas-mobile.MP4',
        platform: 'ios'
      }
    ],
    androidApps: [
      {
        id: 'teacher-android',
        title: 'OPERIX Teacher',
        subtitle: 'ACADEMIC MANAGEMENT',
        badge: 'EDUCATION & SCHOOLS',
        accentColor: '#f97316', // Orange Accent
        accentLight: 'rgba(249,115,22,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoEdu,
        desc: "The next-generation Android app for teachers. Manage attendance, exams, and student behavior directly from the classroom via workspace domain.",
        audience: 'Teachers · Academic Supervisors · School Admins',
        capabilities: ['Live Attendance & real-time sync', 'Fast Grade Entry for multiple subjects', 'Behavioral Tracking & points system', 'Academic Schedule & lesson planning'],
        videoUrl: '/videos/opx-teacher-android.mov',
        platform: 'android'
      },
      {
        id: 'hr-android',
        title: 'OPERIX HR',
        subtitle: 'ANDROID WORKFORCE',
        badge: 'HUMAN CAPITAL',
        accentColor: '#d4af37', // Gold Accent
        accentLight: 'rgba(212,175,55,0.10)',
        icon: <Users size={18} />,
        appLogo: logoHris,
        desc: "Optimized for high-frequency workforce management and biometric tracking on Android devices.",
        audience: 'Field Staff · Site Supervisors · All Employees',
        capabilities: ['Biometric Punch-in with GPS lock', 'Instant Leave Requests & approvals', 'Live Announcements & push alerts', 'Digital ID & Secure Document locker'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'android'
      }
    ],
    pwaApps: [
      {
        id: 'ops-pwa',
        title: 'OPERIX OPS',
        subtitle: 'CLOUD OPERATIONS',
        badge: 'FLAGSHIP PWA',
        accentColor: '#1e2d40',
        accentLight: 'rgba(30,45,64,0.10)',
        icon: <Zap size={18} />,
        appLogo: logoOps,
        desc: "The flagship operations command center as a PWA. Run full enterprise logistics from any mobile browser with zero lag.",
        audience: 'Admin · Logistics · Field Managers',
        capabilities: ['Real-time Logistics & asset tracking', 'Inventory & Warehouse management', 'No Install required on any platform', 'Cross-platform desktop-grade power'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'pwa'
      },
      {
        id: 'hr-pwa',
        title: 'OPERIX HR',
        subtitle: 'WEB WORKFORCE',
        badge: 'HUMAN CAPITAL',
        accentColor: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.10)',
        icon: <Users size={18} />,
        appLogo: logoHris,
        desc: "Manage your workforce from any browser. Access employee records, attendance, and payroll securely via cloud-optimized interface.",
        audience: 'HR Staff · Managers · Admin',
        capabilities: ['Universal browser accessibility', 'Automated payroll report generation', 'Real-time attendance dashboards', 'Secure cloud document hosting'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'pwa'
      },
      {
        id: 'binabbas-pwa',
        title: 'Bin Abbas',
        subtitle: 'WEB PORTAL',
        badge: 'COMMUNITY & EDU',
        accentColor: '#10b981',
        accentLight: 'rgba(16,185,129,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoBinAbbas,
        desc: "Access Islamic resources and institutional updates directly via your web browser with zero installation.",
        audience: 'Students · Community Members · Staff',
        capabilities: ['Web-optimized Moshaf reader', 'Live institutional bulletin board', 'Digital certificate verification', 'Cross-device responsive access'],
        videoUrl: '/videos/bin-abbas-mobile.MP4',
        platform: 'pwa'
      }
    ]
  },
  ar: {
    heroBadge: 'نظام تنقل موحد',
    heroTitle: 'تنقل المؤسسة.\nفي كل مكان.',
    heroSub: 'تطبيقات عالية الأداء مبنية لأنظمة iOS و Android والويب — متزامنة مع مركز القيادة في الوقت الفعلي.',
    tabIos: 'نظام iOS',
    tabAndroid: 'نظام Android',
    tabPwa: 'تطبيقات الويب (PWA)',
    pwaDesc: 'توفر تطبيقات الويب التقدمية (PWA) تجربة برامج سطح المكتب على متصفحات الجوال. لا حاجة لمتاجر التطبيقات — فقط سجل دخولك وابدأ العمل.',
    builtFor: 'مصمم من أجل',
    workspaceDomain: 'نطاق مساحة العمل',
    loginText1: 'تطبق جميع التطبيقات مصادقة من خطوتين: يجب إدخال ',
    loginText2: ' قبل الوصول إلى بوابة الدخول الآمنة.',
    launchPreview: 'مشاهدة العرض',
    livePreview: 'عرض مباشر',
    tapToWatch: 'اضغط للمشاهدة',
    iosApps: [
      {
        id: 'hasad-ios',
        title: 'تطبيق حصاد',
        subtitle: 'مركز المجتمع الذكي',
        badge: 'العقارات وإدارة الأملاك',
        accentColor: '#f43f5e',
        accentLight: 'rgba(244,63,94,0.10)',
        icon: <Home size={18} />,
        appLogo: logoHasad,
        desc: 'إدارة رقمية متكاملة لمجتمعك السكني. نظام بيئي للتعامل مع طلبات السكان وسجلات الصيانة ودورات الفوترة.',
        audience: 'السكان · مديرو العقارات · فرق الصيانة',
        capabilities: ['لوحات قيادة ذكية ومؤشرات حية', 'إصدار فوري للشهادات المعتمدة', 'تحكم دقيق في صلاحيات الأدوار', 'تحليلات بمرئيات بيانية متطورة'],
        videoUrl: '/videos/hasad.MP4',
        platform: 'ios'
      },
      {
        id: 'ops-hr-ios',
        title: 'أوبيريكس هب',
        subtitle: 'العمليات والموارد',
        badge: 'تنقل المؤسسة',
        accentColor: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.10)',
        icon: <Settings size={18} />,
        appLogo: logoOps,
        desc: 'واجهة جوال موحدة للموارد البشرية والعمليات الميدانية. أدخل نطاق مؤسستك وسجل دخولك للوصول الفوري.',
        audience: 'الموظفون الميدانيون · مديرو الموارد · الموظفون',
        capabilities: ['قسم خاص للعمليات والمهام', 'تسجيل حضور بالبصمة وGPS', 'وصول فوري لمسيرات الرواتب', 'ملف موظف آمن بالكامل'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'ios'
      },
      {
        id: 'care-ios',
        title: 'أوبيريكس كير',
        subtitle: 'الرعاية السريرية',
        badge: 'العمليات السريرية',
        accentColor: '#8b5cf6',
        accentLight: 'rgba(139,92,246,0.10)',
        icon: <Activity size={18} />,
        appLogo: logoCare,
        desc: 'إدارة سريرية ومستشفيات شاملة أثناء التنقل. يسجل الطاقم الطبي دخوله عبر نطاق مساحة العمل للوصول الفوري.',
        audience: 'الأطباء · الممرضون · السريريون',
        capabilities: ['نظام الاستقبال والفرز', 'أقسام مخصصة للأطباء والممرضين', 'إدارة الصيدلية وبنك الدم', 'وصول شامل لملف المريض الحي'],
        videoUrl: '/videos/ops-care-mobile.MP4',
        platform: 'ios'
      },
      {
        id: 'binabbas-ios',
        title: 'بوابة ابن عباس',
        subtitle: 'المجتمع والتعليم',
        badge: 'التعليم والمجتمع',
        accentColor: '#10b981',
        accentLight: 'rgba(16,185,129,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoBinAbbas,
        desc: 'تطبيق مخصص للطلاب وأعضاء المجتمع للوصول إلى الموارد الإسلامية والتحديثات المؤسسية عبر نطاق مساحة العمل.',
        audience: 'الطلاب · أعضاء المجتمع · الموظفون',
        capabilities: ['مصحف تفاعلي مع التلاوة', 'تنبيهات أذان دقيقة ومواقيت', 'تحديثات مؤسسية فورية', 'تصدير الشهادات الرقمية'],
        videoUrl: '/videos/bin-abbas-mobile.MP4',
        platform: 'ios'
      }
    ],
    androidApps: [
      {
        id: 'teacher-android',
        title: 'أوبيريكس المعلم',
        subtitle: 'الإدارة الأكاديمية',
        badge: 'التعليم والمدارس',
        accentColor: '#f97316',
        accentLight: 'rgba(249,115,22,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoEdu,
        desc: 'أدر الحضور والاختبارات وسلوك الطلاب مباشرة من الفصل الدراسي عبر نطاق مساحة العمل على نظام أندرويد.',
        audience: 'المعلمون · المشرفون الأكاديميون · الإدارة',
        capabilities: ['تحضير طلاب حي ومزامنة', 'رصد درجات سريع للمواد', 'نظام نقاط السلوك الطلابي', 'جدول أكاديمي وتخطيط حصص'],
        videoUrl: '/videos/opx-teacher-android.mov',
        platform: 'android'
      },
      {
        id: 'hr-android',
        title: 'أوبيريكس HR',
        subtitle: 'إدارة القوى العاملة',
        badge: 'رأس المال البشري',
        accentColor: '#d4af37',
        accentLight: 'rgba(212,175,55,0.10)',
        icon: <Users size={18} />,
        appLogo: logoHris,
        desc: 'نسخة أندرويد الجديدة من نظام الموارد البشرية لإدارة القوى العاملة والتتبع الحيوي.',
        audience: 'الموظفون الميدانيون · مشرفو المواقع · الموظفون',
        capabilities: ['بصمة حيوية مع تأكيد GPS', 'إدارة إجازات واعتمادات فورية', 'تنبيهات وإعلانات مباشرة', 'هوية رقمية وخزنة مستندات'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'android'
      }
    ],
    pwaApps: [
      {
        id: 'ops-pwa',
        title: 'أوبيريكس OPS',
        subtitle: 'العمليات السحابية',
        badge: 'لوجستيات الويب',
        accentColor: '#1e2d40',
        accentLight: 'rgba(30,45,64,0.10)',
        icon: <Zap size={18} />,
        appLogo: logoOps,
        desc: 'منصة العمليات الرائدة كـ PWA. أدر العمليات اللوجستية من أي متصفح جوال بكفاءة عالية.',
        audience: 'الإدارة · اللوجستيات · مديرو الميدان',
        capabilities: ['تتبع حي للوجستيات والأصول', 'إدارة المخزون والمستودعات', 'لا يتطلب تثبيت على أي جهاز', 'قوة سطح المكتب في المتصفح'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'pwa'
      },
      {
        id: 'hr-pwa',
        title: 'أوبيريكس HR',
        subtitle: 'إدارة الويب',
        badge: 'رأس المال البشري PWA',
        accentColor: '#3b82f6',
        accentLight: 'rgba(59,130,246,0.10)',
        icon: <Users size={18} />,
        appLogo: logoHris,
        desc: 'إدارة القوى العاملة من أي متصفح. الوصول إلى السجلات والحضور والرواتب بأمان على أي جهاز.',
        audience: 'موظفو HR · المديرون · الإدارة',
        capabilities: ['دخول عالمي عبر المتصفح', 'توليد تقارير رواتب آلي', 'لوحات حضور فورية', 'استضافة مستندات سحابية'],
        videoUrl: '/videos/ops-hr-mobile.MP4',
        platform: 'pwa'
      },
      {
        id: 'binabbas-pwa',
        title: 'بوابة ابن عباس',
        subtitle: 'بوابة الويب',
        badge: 'المجتمع والتعليم PWA',
        accentColor: '#10b981',
        accentLight: 'rgba(16,185,129,0.10)',
        icon: <BookOpen size={18} />,
        appLogo: logoBinAbbas,
        desc: 'الوصول إلى الموارد الإسلامية والتحديثات المؤسسية مباشرة عبر متصفح الويب دون تثبيت.',
        audience: 'الطلاب · أعضاء المجتمع',
        capabilities: ['قارئ مصحف محسن للويب', 'لوحة إعلانات حية', 'التحقق من الشهادات', 'وصول مرن عبر المتصفح'],
        videoUrl: '/videos/bin-abbas-mobile.MP4',
        platform: 'pwa'
      }
    ]
  },
};

/* ─────────────────────────────────────────────────────────
   PHONE FRAMES
───────────────────────────────────────────────────────── */
function IPhone17({ appLogo }) {
  return (
    <div className="iphone17-body">
      <div className="iphone17-screen-wrap">
        <div className="iphone17-dynamic-island" />
        <div className="flex items-center justify-center h-full bg-black">
          <div className="logo-circle w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <img src={appLogo} className="w-16 h-16 object-contain" alt="Logo" />
          </div>
        </div>
        <div className="iphone17-home-bar" />
      </div>
    </div>
  );
}

function AndroidPhone({ appLogo }) {
  return (
    <div className="android-body">
      <div className="android-screen-wrap">
        <div className="flex items-center justify-center h-full bg-black">
          <div className="logo-circle w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <img src={appLogo} className="w-16 h-16 object-contain" alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PWAFrame({ appLogo }) {
  return (
    <div className="pwa-shell">
      <div className="pwa-browser-bar"><div className="pwa-dots"><span/><span/><span/></div></div>
      <div className="flex items-center justify-center flex-1 bg-black">
        <div className="logo-circle w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]">
          <img src={appLogo} className="w-16 h-16 object-contain" alt="Logo" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────── */
function VideoModal({ app, onClose, isAr, t }) {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);

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

  if (!app) return null;

  return (
    <div className="modal-backdrop" style={{ opacity: visible ? 1 : 0 }} onClick={handleClose}>
      <button className="modal-close" style={{ [isAr ? 'left' : 'right']: '2rem' }} onClick={handleClose}><X size={32} /></button>
      <div className="modal-content" style={{ transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)', opacity: visible ? 1 : 0 }} onClick={(e) => e.stopPropagation()}>
        <div className={`modal-info ${isAr ? 'modal-info-rtl' : ''}`}>
          <span className="modal-tag" style={{ background: app.accentColor }}>{t.livePreview}</span>
          <h2 className="modal-app-title">{app.title}</h2>
          <p className="modal-app-sub">{app.subtitle}</p>
          <div className="modal-caps">
            {app.capabilities.map((c, i) => (
              <div key={i} className="modal-cap-item"><CheckCircle size={22} className="text-[#d4af37]" /> {c}</div>
            ))}
          </div>
        </div>
        <div className="modal-video-wrap">
           <video ref={videoRef} src={app.videoUrl} autoPlay loop muted playsInline className="rounded-[3rem] border-[12px] border-slate-800 bg-black shadow-2xl" />
        </div>
      </div>
    </div>
  );
}

function AppCard({ app, onOpen, isAr, t, index }) {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`wide-card group ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex-col`}>
      {/* Device Side */}
      <div className="wide-device-side">
        <div className="device-glow" style={{ background: app.accentColor }} />
        <div className="relative z-10 transition-transform duration-700 group-hover:scale-105">
          {app.platform === 'android' ? <AndroidPhone appLogo={app.appLogo} /> : app.platform === 'pwa' ? <PWAFrame appLogo={app.appLogo} /> : <IPhone17 appLogo={app.appLogo} />}
        </div>
        <button onClick={() => onOpen(app)} className="preview-trigger" style={{ background: app.accentColor }}>
          <Play size={28} fill="white" />
        </button>
      </div>

      {/* Content Side */}
      <div className="wide-content-side">
        <div className="flex items-center justify-between mb-8">
          <span className="px-4 py-1.5 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-100">
            {app.badge}
          </span>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: app.accentLight, color: app.accentColor }}>
            {app.icon}
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-black font-serif text-[#1e2d40] mb-2">{app.title}</h2>
        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-8">{app.subtitle}</p>

        <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl">
          {app.desc}
        </p>

        {/* Built For Block */}
        <div className="built-for-block">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
            <Users size={14} /> {t.builtFor}
          </div>
          <p className="text-lg font-bold text-[#1e2d40]">{app.audience}</p>
        </div>

        {/* Auth Note Block */}
        <div className="auth-box">
          <Globe size={20} className="text-blue-500 mt-1 shrink-0" />
          <p className="text-[13px] text-slate-600 leading-relaxed">
            {t.loginText1} <strong className="text-blue-600 underline decoration-blue-200 underline-offset-4">{t.workspaceDomain}</strong> {t.loginText2}
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 mb-12">
          {app.capabilities.map((cap, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle size={20} className="text-emerald-500 shrink-0" />
              <span className="text-[14px] font-bold text-[#1e2d40]">{cap}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-slate-100">
          <button
            onClick={() => onOpen(app)}
            className="px-10 py-5 rounded-2xl bg-[#10b981] hover:bg-[#059669] text-white text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center gap-3"
          >
            <Play size={18} fill="white" /> {t.launchPreview} <ChevronRight size={18} />
          </button>

          <div className="flex items-center gap-4">
            {app.platform === 'ios' && <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 hover:opacity-80 transition-opacity cursor-pointer"/>}
            {app.platform === 'android' && <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12 hover:opacity-80 transition-opacity cursor-pointer"/>}
            {app.platform === 'pwa' && (
              <div className="pwa-web-badge flex items-center gap-2"><Cloud size={16} /><span>Available on Web</span></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MobileApps() {
  const { isAr } = useLanguage();
  const t = translations[isAr ? 'ar' : 'en'];
  const [activeTab, setActiveTab] = useState('ios');
  const [activeApp, setActiveApp] = useState(null);

  useEffect(() => {
    document.body.style.overflow = activeApp ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeApp]);

  const apps = activeTab === 'ios' ? t.iosApps : activeTab === 'android' ? t.androidApps : t.pwaApps;

  return (
    <div className={`mobile-page ${isAr ? 'rtl' : 'ltr'}`}>
      <style>{`
        .mobile-page { min-height: 100vh; background: #fff; padding-bottom: 15rem; }
        .mobile-page.rtl { text-align: right; }
        .hero { background: #1e2d40; padding: 12rem 1.5rem 10rem; text-align: center; color: #fff; position: relative; overflow: hidden; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 800; letter-spacing: 0.4em; color: #d4af37; margin-bottom: 2rem; padding: 10px 20px; border: 1px solid rgba(212,175,55,0.3); border-radius: 100px; background: rgba(212,175,55,0.1); text-transform: uppercase; }
        .hero-title { font-size: clamp(3rem, 10vw, 5.5rem); font-weight: 900; line-height: 0.95; letter-spacing: -0.05em; margin-bottom: 2.5rem; white-space: pre-line; }
        .hero-sub { font-size: 1.25rem; color: rgba(255,255,255,0.6); max-width: 750px; margin: 0 auto; line-height: 1.8; }

        /* TAB BAR */
        .tab-bar { max-width: 1100px; margin: -60px auto 10rem; padding: 0 1.5rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; position: relative; z-index: 50; }
        .tab-item { background: #fff; border: 1px solid #e2e8f0; padding: 2.5rem; border-radius: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem; transition: all 0.5s cubic-bezier(0.16,1,0.3,1); box-shadow: 0 20px 40px rgba(0,0,0,0.05); cursor: pointer; }
        .tab-item:hover { transform: translateY(-10px); box-shadow: 0 30px 50px rgba(0,0,0,0.1); }
        .tab-item.active { border-color: #d4af37; background: #1e2d40; color: #fff; transform: translateY(-15px); box-shadow: 0 40px 70px rgba(30,45,64,0.3); }
        .tab-badge-img { height: 50px; filter: grayscale(1); opacity: 0.5; transition: 0.5s; }
        .tab-item.active .tab-badge-img { filter: grayscale(0); opacity: 1; }
        .tab-label { font-size: 14px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; }

        /* CARDS LIST */
        .cards-list { max-width: 1400px; margin: 0 auto; padding: 0 2rem; display: flex; flex-direction: column; gap: 18rem; }
        .wide-card { display: flex; align-items: center; gap: 8rem; }
        .wide-device-side { flex: 1; position: relative; display: flex; align-items: center; justify-content: center; }
        .device-glow { position: absolute; width: 450px; height: 450px; border-radius: 50%; filter: blur(120px); opacity: 0.1; }

        .preview-trigger { position: absolute; z-index: 30; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transform: translate(-50%, -50%) scale(0.8); top: 50%; left: 50%; transition: all 0.4s; border: none; cursor: pointer; color: #fff; }
        .wide-card:hover .preview-trigger { opacity: 1; transform: translate(-50%, -50%) scale(1); }

        .wide-content-side { flex: 1.2; }
        .built-for-block { background: #f8fafc; padding: 2rem; border-radius: 2rem; border: 1px solid #e2e8f0; margin-bottom: 2.5rem; }
        .auth-box { display: flex; gap: 1.25rem; background: #f0f7ff; padding: 1.5rem; border-radius: 1.5rem; border: 1px solid #dbeafe; margin-bottom: 3rem; font-size: 13px; color: #475569; }
        .pwa-web-badge { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 20px; border-radius: 15px; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; }

        /* DEVICE FRAMES */
        .iphone17-body, .android-body, .pwa-shell { width: 280px; height: 580px; position: relative; }
        .iphone17-body { background: #111; border-radius: 54px; border: 5px solid #1a1a1e; }
        .iphone17-screen-wrap { position: absolute; inset: 10px; border-radius: 44px; overflow: hidden; background: #000; }
        .iphone17-dynamic-island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 64px; height: 18px; background: #000; border-radius: 20px; z-index: 20; }
        .iphone17-home-bar { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); width: 100px; height: 4px; background: rgba(255,255,255,0.25); border-radius: 10px; }

        .android-body { background: #0a0a0a; border-radius: 50px; border: 6px solid #111; }
        .android-screen-wrap { position: absolute; inset: 6px; border-radius: 44px; overflow: hidden; background: #000; }

        .pwa-shell { background: #fff; border-radius: 50px; border: 14px solid #1e2d40; overflow: hidden; display: flex; flex-direction: column; }
        .pwa-browser-bar { height: 44px; background: #f1f5f9; display: flex; align-items: center; padding: 0 20px; gap: 10px; border-bottom: 1px solid #e2e8f0; }
        .pwa-dots { display: flex; gap: 6px; }
        .pwa-dots span { width: 8px; height: 8px; border-radius: 50%; background: #cbd5e1; }

        .logo-circle { width: 100px; height: 100px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; shadow: 0 0 30px rgba(255,255,255,0.2); }

        /* MODAL */
        .modal-backdrop { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,0.98); backdrop-filter: blur(40px); display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-close { position: absolute; top: 3rem; width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.05); color: #fff; display: flex; align-items: center; justify-content: center; transition: 0.4s ease; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; }
        .modal-close:hover { background: rgba(255,255,255,0.15); transform: rotate(90deg) scale(1.1); }
        .modal-content { display: flex; flex-direction: column; align-items: center; gap: 6rem; max-width: 1300px; width: 100%; }
        @media (min-width: 1024px) { .modal-content { flex-direction: row; } }
        .modal-info { flex: 1; color: #fff; }
        .modal-app-title { font-size: clamp(3.5rem, 8vw, 6rem); font-weight: 900; letter-spacing: -0.05em; line-height: 0.9; margin-bottom: 2rem; font-family: serif; }
        .modal-video-wrap { width: 360px; height: 740px; flex-shrink: 0; }
        .modal-video-wrap video { width: 100%; height: 100%; object-fit: cover; }

        @media (max-width: 1024px) {
          .tab-bar { grid-template-columns: 1fr; margin-top: -30px; gap: 1rem; }
          .wide-card { gap: 5rem; }
          .cards-list { gap: 10rem; }
        }
      `}</style>

      <header className="hero">
        <div className="hero-badge"><Smartphone size={16} />{t.heroBadge}</div>
        <h1 className="hero-title">{t.heroTitle.split('\n').map((l, i) => i === 0 ? <span key={i}>{l}<br /></span> : <span key={i} style={{ color: '#d4af37' }}>{l}</span>)}</h1>
        <p className="hero-sub">{t.heroSub}</p>
      </header>

      <nav className="tab-bar">
        <div className={`tab-item ${activeTab === 'ios' ? 'active' : ''}`} onClick={() => setActiveTab('ios')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" className="tab-badge-img" alt="iOS" />
          <span className="tab-label">{t.tabIos}</span>
        </div>
        <div className={`tab-item ${activeTab === 'android' ? 'active' : ''}`} onClick={() => setActiveTab('android')}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" className="tab-badge-img" alt="Android" />
          <span className="tab-label">{t.tabAndroid}</span>
        </div>
        <div className={`tab-item ${activeTab === 'pwa' ? 'active' : ''}`} onClick={() => setActiveTab('pwa')}>
          <div className="tab-badge-img flex items-center justify-center bg-slate-100 rounded-2xl px-6"><Cloud size={40} className="text-slate-500" /></div>
          <span className="tab-label">{t.tabPwa}</span>
        </div>
      </nav>

      <main className="cards-list">
        {activeTab === 'pwa' && (
          <div className="max-w-4xl mx-auto text-center -mb-20">
            <p className="text-slate-500 text-xl leading-relaxed">{t.pwaDesc}</p>
          </div>
        )}
        {apps.map((app, i) => (
          <AppCard key={app.id} app={app} onOpen={setActiveApp} isAr={isAr} t={t} index={i} />
        ))}
      </main>

      {activeApp && <VideoModal app={activeApp} onClose={() => setActiveApp(null)} isAr={isAr} t={t} />}
    </div>
  );
}
