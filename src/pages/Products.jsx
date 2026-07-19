import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, Settings, Activity, CreditCard, ExternalLink, 
  Building2, Globe, Landmark, ShieldCheck, Shield,
  ImageIcon, X, ChevronRight, ChevronLeft, Info, GraduationCap,
  Play, Zap, ArrowUpRight, Monitor, CheckCircle, Mail, Phone, Briefcase, Send
} from 'lucide-react';

// Import Logos
import logoOps from "../logos/opx-ops.png";
import logoFmis from "../logos/opx-fmis.png";
import logoHris from "../logos/opx-hris.png";
import logoCare from "../logos/opx-care.jpg";
import logoEdu from "../logos/opx-edu.png";
import logoBinAbbas from "../logos/binabbas.png";
import logoHasad from "../logos/hasad.png";

const OPS_API = 'https://script.google.com/macros/s/AKfycby7xDEoYBzGM7sAAAkX0LDTKNHo63LjbgmaC-0VLXESPFj7BSl10GE-sIqM-Ss3wE8/exec';
const TARGET_EMAIL = 'info@operix-solutions.com';

/* ── REVEAL HOOK ───────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold, rootMargin: '0px 0px -40px 0px' }
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
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      willChange: 'opacity, transform',
      ...style
    }} {...rest}>
      {children}
    </Tag>
  );
}

/* ── ANIMATED COUNTER ────────────────────────────────── */
function StatCounter({ target, duration = 1600, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return <span ref={ref} className="tabular-nums">{val.toLocaleString()}{suffix}</span>;
}

/* ── INFINITE MARQUEE ────────────────────────────────── */
function InfiniteMarquee({ items }) {
  return (
    <div className="w-full overflow-hidden py-12 bg-transparent" dir="ltr">
      <div className="marquee-content flex items-center gap-12 whitespace-nowrap animate-marquee-scroll">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl group hover:bg-white/10 transition-all duration-500">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden p-2.5">
              <img src={item.logo} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500" alt="Partner" />
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#d4af37] transition-colors">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── MULTI-STEP LEAD FORM ────────────────────────────── */
function LeadForm({ isAr }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', modules: [], scale: 'Standard', requirements: ''
  });

  const modules = [
    { id: 'fmis', label: isAr ? 'نظام FMIS' : 'FMIS Financials' },
    { id: 'hris', label: isAr ? 'نظام HRIS' : 'HRIS Human Capital' },
    { id: 'ops', label: isAr ? 'نظام OPS' : 'OPS Operations' },
    { id: 'care', label: isAr ? 'نظام Care' : 'Care Healthcare' },
    { id: 'edu', label: isAr ? 'نظام Edu' : 'Edu Education' },
  ];

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const toggleModule = (label) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(label)
        ? prev.modules.filter(m => m !== label)
        : [...prev.modules, label]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const body = `NEW CONTACT LEAD\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\nModules: ${formData.modules.join(', ')}\nScale: ${formData.scale}\nRequirements: ${formData.requirements || 'None'}`;

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

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-[2.5rem] p-20 text-center space-y-6 shadow-2xl border border-slate-100">
        <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-emerald-100">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>
        <h3 className="text-3xl font-black font-serif text-[#1e2d40]">{isAr ? 'تم الإرسال بنجاح' : 'Dispatched Successfully'}</h3>
        <p className="text-slate-500 font-medium">{isAr ? 'سيتواصل معك مهندسونا قريباً للتشاور.' : 'Our engineers will contact you shortly for a technical consultation.'}</p>
        <button onClick={() => setSubmitted(false)} className="text-[#d4af37] font-black uppercase tracking-widest text-xs hover:underline">{isAr ? 'إرسال طلب آخر' : 'Send Another Request'}</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden relative group">
      <div className="absolute top-0 left-0 h-1.5 bg-[#d4af37]/20 w-full">
        <div className="h-full bg-[#d4af37] transition-all duration-500" style={{ width: `${(step/3) * 100}%` }} />
      </div>

      <div className="p-10 md:p-14">
        {step === 1 && (
          <Reveal className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Step 01 / 03</span>
              <h3 className="text-3xl font-black font-serif text-[#1e2d40]">{isAr ? 'من أنت؟' : 'Identity'}</h3>
              <p className="text-sm text-slate-400 font-medium">{isAr ? 'أخبرنا قليلاً عن مؤسستك.' : 'Tell us about your enterprise.'}</p>
            </div>
            <div className="space-y-4">
              <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} type="text" placeholder={isAr ? 'اسم المنشأة' : 'Company Name'} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] focus:bg-white transition-all outline-none text-sm font-bold text-[#1e2d40]" />
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder={isAr ? 'اسمك' : 'Contact Person'} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] focus:bg-white transition-all outline-none text-sm font-bold text-[#1e2d40]" />
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" placeholder={isAr ? 'البريد الإلكتروني' : 'Official Email'} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-[#d4af37] focus:bg-white transition-all outline-none text-sm font-bold text-[#1e2d40]" />
            </div>
            <button disabled={!formData.company || !formData.email} onClick={handleNext} className="w-full py-5 bg-[#1e2d40] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#1e2d40] disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-slate-200 flex items-center justify-center gap-2">
              {isAr ? 'التالي' : 'CONTINUE'} <ArrowUpRight size={16} />
            </button>
          </Reveal>
        )}

        {step === 2 && (
          <Reveal className="space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Step 02 / 03</span>
              <h3 className="text-3xl font-black font-serif text-[#1e2d40]">{isAr ? 'ماذا تحتاج؟' : 'Module Selection'}</h3>
              <p className="text-sm text-slate-400 font-medium">{isAr ? 'اختر الأنظمة التي ترغب في تفعيلها.' : 'Select the modules you wish to deploy.'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {modules.map(m => (
                <div key={m.id} onClick={() => toggleModule(m.label)} className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${formData.modules.includes(m.label) ? 'border-[#d4af37] bg-[#d4af37]/5 ring-1 ring-[#d4af37]' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${formData.modules.includes(m.label) ? 'bg-[#d4af37] border-[#d4af37]' : 'border-slate-300 bg-white'}`}>
                    {formData.modules.includes(m.label) && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <span className="text-xs font-bold text-[#1e2d40]">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button onClick={handlePrev} className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">{isAr ? 'السابق' : 'BACK'}</button>
              <button onClick={handleNext} className="flex-[2] py-5 bg-[#1e2d40] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#1e2d40] transition-all shadow-xl shadow-slate-200">{isAr ? 'التالي' : 'CONTINUE'}</button>
            </div>
          </Reveal>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <Reveal className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]">Step 03 / 03</span>
                <h3 className="text-3xl font-black font-serif text-[#1e2d40]">{isAr ? 'حجم النشر' : 'Project Scope'}</h3>
                <p className="text-sm text-slate-400 font-medium">{isAr ? 'حدد النطاق التشغيلي لشركتك.' : 'Define your operational footprint.'}</p>
              </div>
              <div className="space-y-4">
                <select value={formData.scale} onChange={e => setFormData({...formData, scale: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-bold text-[#1e2d40]">
                  <option>50-100 Employees</option>
                  <option>100-500 Employees</option>
                  <option>500+ Employees</option>
                </select>
                <textarea value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} placeholder={isAr ? 'متطلبات إضافية' : 'Additional Requirements'} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl h-32 outline-none text-sm font-bold text-[#1e2d40]" />
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={handlePrev} className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">{isAr ? 'السابق' : 'BACK'}</button>
                <button type="submit" disabled={isSubmitting} className="flex-[2] py-5 bg-[#d4af37] text-[#1e2d40] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1e2d40] hover:text-white transition-all shadow-2xl shadow-[#d4af37]/20 flex items-center justify-center gap-2">
                  {isSubmitting ? (isAr ? 'جاري الإرسال...' : 'SENDING...') : (isAr ? 'إرسال الطلب' : 'SUBMIT REQUEST')} <Send size={16} />
                </button>
              </div>
            </Reveal>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const { isAr } = useLanguage();
  
  const [activePreview, setActivePreview] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const translations = {
    en: {
      builtFor: 'BUILT FOR',
      workspaceDomain: 'Workspace Domain',
      loginText1: 'All apps enforce a strict two-step auth: users resolve their unique ',
      loginText2: ' before accessing the secure login portal.',
      launchPreview: 'Watch Preview',
    },
    ar: {
      builtFor: 'مصمم من أجل',
      workspaceDomain: 'نطاق مساحة العمل',
      loginText1: 'تطبق جميع التطبيقات مصادقة من خطوتين: يجب إدخال ',
      loginText2: ' قبل الوصول إلى بوابة الدخول الآمنة.',
      launchPreview: 'مشاهدة العرض',
    }
  };

  const t = translations[isAr ? 'ar' : 'en'];

  // ─── DATA RESTORATION ───
  const corePlatforms = [
    {
      id: 'operations',
      titleEn: 'OPERIX Operations',
      titleAr: 'أوبيريكس لإدارة العمليات',
      subEn: 'Fleet & Workforce Matrix',
      subAr: 'إدارة أسطول العمليات والقوى العاملة',
      descEn: 'The core operations hub replacing manual logbooks. Features comprehensive ANPR parking, valet management, and real-time gig workforce deployment tracking.',
      descAr: 'محور العمليات الأساسي الذي يحل محل دفاتر السجلات اليدوية. إدارة متكاملة لمواقف السيارات بكاميرات التعرف الذكي (ANPR)، وتوجيه القوى العاملة.',
      url: 'https://www.ops.operix-solutions.online',
      icon: <Settings size={24} />,
      accentColor: '#3b82f6',
      accentLight: 'rgba(59,130,246,0.1)',
      image: '/projects/ops.png',
      previews: [
        { url: '/projects/ops/exe-dash.png', titleEn: 'Executive Command Center', titleAr: 'مركز القيادة التنفيذية', descEn: 'High-level administrative hub for C-Suite approvals, IT operations, and identity access management.', descAr: 'مركز إداري رفيع المستوى لاعتمادات الإدارة التنفيذية، وعمليات تقنية المعلومات، وإدارة هويات الوصول.' },
        { url: '/projects/ops/ops-dash.mp4', titleEn: 'Enterprise Operations Matrix', titleAr: 'مصفوفة عمليات المؤسسة', descEn: 'Direct access to ANPR scanners, task hubs, inventory control, and fleet tracking modules.', descAr: 'وصول مباشر لماسحات ANPR، ومراكز المهام، والتحكم في المخزون، ووحدات تتبع الأسطول.' },
        { url: '/projects/ops/ai-email-ops.png', titleEn: 'AI Communications Core', titleAr: 'مركز الاتصالات الذكي', descEn: 'Generative AI email drafting with pre-configured corporate templates.', descAr: 'صياغة رسائل البريد الإلكتروني بالذكاء الاصطناعي مع قوالب مؤسسية مسبقة.' },
        { url: '/projects/ops/analyticsandreports-ops.png', titleEn: 'Advanced Analytics', titleAr: 'التحليلات المتقدمة', descEn: 'Dynamic data visualization and custom report generation.', descAr: 'تصوير مرئي ديناميكي للبيانات وإنشاء تقارير مخصصة.' },
        { url: '/projects/ops/crm-ops.png', titleEn: 'CRM & Pipeline', titleAr: 'إدارة علاقات العملاء', descEn: 'Marketing workspace tracking ad spend and lead conversion funnels.', descAr: 'مساحة عمل تسويقية لتتبع الإنفاق الإعلاني ومسارات التحويل.' },
        { url: '/projects/ops/doc-generateandsendemail-ops.png', titleEn: 'Document Generator', titleAr: 'منشئ المستندات', descEn: 'Automated employment offers and internal memos with secure archiving.', descAr: 'إنشاء فوري لعروض العمل والمذكرات الداخلية مع أرشفة آمنة.' },
        { url: '/projects/ops/external-standaloneapps-ops.png', titleEn: 'Decentralized Portals', titleAr: 'البوابات اللامركزية', descEn: 'Manage public-facing touchpoints for gig workers and VIP clients.', descAr: 'إدارة نقاط الاتصال العامة للمستقلين والعملاء المتميزين.' },
        { url: '/projects/ops/facilitandtraining-ops.png', titleEn: 'Facility Academy', titleAr: 'إدارة المرافق والأكاديمية', descEn: 'Configure complex project environments and manage training capacities.', descAr: 'تهيئة بيئات مشاريع معقدة وإدارة السعات التدريبية.' },
        { url: '/projects/ops/hr-ops.png', titleEn: 'Master HR Directory', titleAr: 'دليل الموارد البشرية', descEn: 'Global view of human capital and shift assignments.', descAr: 'عرض شامل لرأس المال البشري ومهام الورديات.' },
        { url: '/projects/ops/it-ops.png', titleEn: 'IT Infrastructure Control', titleAr: 'التحكم في البنية التحتية', descEn: 'Identity and Access Management (IAM) and infrastructure monitoring.', descAr: 'إدارة هويات الوصول ومراقبة البنية التحتية.' },
        { url: '/projects/ops/performance-ops.png', titleEn: 'Operational KPIs', titleAr: 'مؤشرات الأداء التشغيلي', descEn: 'Real-time overview of global enterprise metrics.', descAr: 'نظرة عامة لحظية على مقاييس المؤسسة العالمية.' },
        { url: '/projects/ops/setshift-ops.png', titleEn: 'Geofenced Orchestration', titleAr: 'توزيع العمل الجغرافي', descEn: 'GPS radius limits to guarantee accurate field staff attendance.', descAr: 'حدود نطاق جغرافي لضمان دقة حضور الموظفين.' }
      ]
    },
    {
      id: 'fmis',
      titleEn: 'OPERIX FMIS',
      titleAr: 'أوبيريكس للإدارة المالية',
      subEn: 'Finance & Retail ERP',
      subAr: 'نظام إدارة المالية والتجزئة',
      descEn: 'Complete financial management ecosystem, corporate ledger reconciliation, Retail & POS operations, and ZATCA Phase 2 integration.',
      descAr: 'نظام متكامل لإدارة الشؤون المالية، وتسوية السجلات، وعمليات التجزئة ونقاط البيع، مع ربط ZATCA المرحلة الثانية.',
      url: 'https://www.fmis.operix-solutions.online',
      icon: <CreditCard size={24} />,
      accentColor: '#10b981',
      accentLight: 'rgba(16,185,129,0.1)',
      image: '/projects/fmis.png',
      previews: [
        { url: '/projects/fmis/dash-fmis.png', titleEn: 'Executive P&L', titleAr: 'لوحة الأرباح والخسائر', descEn: 'Real-time overview of revenue pipelines and pending liabilities.', descAr: 'نظرة عامة لحظية على تدفقات الإيرادات والالتزامات المعلقة.' },
        { url: '/projects/fmis/opx-ai-fmis.png', titleEn: 'AI Copilot Integration', titleAr: 'مساعد الذكاء الاصطناعي', descEn: 'Embedded AI assistant for financial database analysis.', descAr: 'مساعد ذكاء اصطناعي مدمج لتحليل البيانات المالية.' },
        { url: '/projects/fmis/quot-fmis.png', titleEn: 'Quotation Builder', titleAr: 'منشئ عروض الأسعار', descEn: 'Streamlined proposal generation mapped to CRM.', descAr: 'إنشاء عروض أسعار متطور مرتبط بنظام CRM.' },
        { url: '/projects/fmis/help-fmis.png', titleEn: 'Architecture Matrix', titleAr: 'مصفوفة هيكلية النظام', descEn: 'Built-in documentation for GL and WBS workflows.', descAr: 'وثائق مدمجة لسير عمل الأستاذ العام وهيكلة المشاريع.' },
        { url: '/projects/fmis/fmis-gl.png', titleEn: 'General Ledger', titleAr: 'دفتر الأستاذ العام', descEn: 'Strict double-entry journal logs and balance tracking.', descAr: 'سجلات قيود مزدوجة صارمة وتتبع الأرصدة.' },
        { url: '/projects/fmis/fmis-pos.png', titleEn: 'Point of Sale', titleAr: 'نقطة البيع', descEn: 'Lightning-fast checkout with barcode support.', descAr: 'واجهة دفع سريعة تدعم مسح الباركود.' },
        { url: '/projects/fmis/fmis-prod.png', titleEn: 'Inventory Management', titleAr: 'إدارة المخزون', descEn: 'Tracking SKUs, barcodes, and reorder points.', descAr: 'تتبع رموز التخزين والباركود ونقاط الطلب.' },
        { url: '/projects/fmis/fmis-purchase.png', titleEn: 'Purchase Orders', titleAr: 'أوامر الشراء', descEn: 'Seamless procurement and stock replenishment.', descAr: 'عمليات شراء وتوريد مخزون سلسة.' },
        { url: '/projects/fmis/fmis-supplier.png', titleEn: 'Supplier Directory', titleAr: 'دليل الموردين', descEn: 'Centralized database for procurement relationships.', descAr: 'قاعدة بيانات مركزية لعلاقات المشتريات.' }
      ]
    },
    {
      id: 'hris',
      titleEn: 'OPERIX HRIS',
      titleAr: 'أوبيريكس للموارد البشرية',
      subEn: 'Human Capital Infrastructure',
      subAr: 'بنية رأس المال البشري',
      descEn: 'Complete HR automation — GPS-enforced attendance tracking, automated salary deductions, and employee self-service pipelines.',
      descAr: 'أتمتة كاملة للموارد البشرية — تسجيل الحضور بنطاق GPS، ومحرك احتساب الاستقطاعات التلقائي للرواتب.',
      url: 'https://www.hris.operix-solutions.online',
      icon: <Users size={24} />,
      accentColor: '#6366f1',
      accentLight: 'rgba(99,102,241,0.1)',
      image: '/projects/hris.png',
      previews: [
        { url: '/projects/hris/ai-scanner-hris.png', titleEn: 'AI CV Scanner', titleAr: 'ماسح السير الذاتية', descEn: 'Edge AI parsing and scoring of applicant CVs.', descAr: 'فرز وتقييم السير الذاتية بالذكاء الاصطناعي.' },
        { url: '/projects/hris/resutl-ats-hris.png', titleEn: 'ATS Match Analysis', titleAr: 'تحليل تطابق التوظيف', descEn: 'Skill gap analysis and role matching probabilities.', descAr: 'تحليل فجوات المهارات واحتمالات التطابق الوظيفي.' },
        { url: '/projects/hris/emp-pro-hris.png', titleEn: 'Employee Profiles', titleAr: 'ملفات الموظفين', descEn: 'Digital twin of workforce documents and contracts.', descAr: 'توأمة رقمية لمستندات وعقود القوى العاملة.' },
        { url: '/projects/hris/pipline-hris.png', titleEn: 'Kanban Pipeline', titleAr: 'مسار كانبان للتوظيف', descEn: 'Visual drag-and-drop applicant tracking.', descAr: 'نظام تتبع متقدم للمتقدمين بالسحب والإفلات.' },
        { url: '/projects/hris/visa-mgm-hris.png', titleEn: 'Muqeem API', titleAr: 'ربط مقيم', descEn: 'Direct integration for visa and Iqama validities.', descAr: 'ربط مباشر لإدارة التأشيرات وصلاحية الإقامة.' },
        { url: '/projects/hris/doc-hris.png', titleEn: 'Document Builder', titleAr: 'منشئ المستندات', descEn: 'Automated corporate letterhead and certificates.', descAr: 'إنشاء آلي للخطابات والشهادات الرسمية.' },
        { url: '/projects/hris/external-apps-hris.png', titleEn: 'Public Gateways', titleAr: 'البوابات العامة', descEn: 'Secure portals for gig workers credentials.', descAr: 'بوابات آمنة لبيانات العاملين المستقلين.' }
      ]
    },
    {
      id: 'care',
      titleEn: 'OPERIX Health Care',
      titleAr: 'أوبيريكس للرعاية الطبية',
      subEn: 'Clinical Management Core',
      subAr: 'منظومة الإدارة السريرية',
      descEn: 'Advanced hospital management ecosystem. End-to-end clinical workflow from intake to surgical treasury.',
      descAr: 'منظومة متكاملة لإدارة المستشفيات. سير عمل سريري شامل من الاستقبال حتى الخزانة الجراحية.',
      url: 'https://www.care.operix-solutions.online',
      icon: <Activity size={24} />,
      accentColor: '#f43f5e',
      accentLight: 'rgba(244,63,94,0.1)',
      image: '/projects/care.png',
      previews: [
        { url: '/projects/care/admin-care.png', titleEn: 'Admin Console', titleAr: 'لوحة الإدارة', descEn: 'Enterprise analytics and access control hub.', descAr: 'تحليلات المؤسسة ومركز التحكم في الوصول.' },
        { url: '/projects/care/reception-care.png', titleEn: 'Patient Enrollment', titleAr: 'تسجيل المرضى', descEn: 'Patient intake form capturing full demographics.', descAr: 'نموذج استقبال المريض والبيانات الديموغرافية.' },
        { url: '/projects/care/appoint-care.png', titleEn: 'Dual-panel Scheduling', titleAr: 'مركز الجدولة والمواعيد', descEn: 'Schedule and track treating physician assignments.', descAr: 'جدولة وتتبع مهام الأطباء المعالجين.' },
        { url: '/projects/care/doc-workspace-care.png', titleEn: 'Doctor Board', titleAr: 'لوحة الطبيب', descEn: 'Live triage board showing patients awaiting consult.', descAr: 'لوحة فرز حي للمرضى في انتظار الاستشارة.' },
        { url: '/projects/care/doc-care.png', titleEn: 'Diagnosis Workspace', titleAr: 'مساحة عمل التشخيص', descEn: 'Clinical encounter workspace with voice dictation.', descAr: 'مساحة عمل سريرية تدعم الإملاء الصوتي.' },
        { url: '/projects/care/chemist-care.png', titleEn: 'Pharmacy Portal', titleAr: 'بوابة الصيدلية', descEn: 'MRN-driven dispensary and inventory portal.', descAr: 'بوابة صرف الأدوية والمخزون الطبي.' },
        { url: '/projects/care/pharm-inven-care.png', titleEn: 'Master Formulary', titleAr: 'سجل الأدوية الرئيسي', descEn: 'Pharmaceutical inventory and currency matrix.', descAr: 'إدارة مخزون الأدوية ومصفوفة العملات.' },
        { url: '/projects/care/ops-care.png', titleEn: 'Surgical Board', titleAr: 'لوحة العمليات', descEn: 'Real-time surgical scheduling with blood availability.', descAr: 'جدولة العمليات الجراحية وإتاحة الدم لحظياً.' },
        { url: '/projects/care/bloodbank-care.png', titleEn: 'Blood Bank', titleAr: 'بنك الدم', descEn: 'Enterprise hemotherapy dispensing and tracking.', descAr: 'صرف وتتبع مستحضرات الدم للمؤسسة.' },
        { url: '/projects/care/inside-file-care.png', titleEn: 'Clinical Timeline', titleAr: 'الجدول السريري', descEn: 'Complete longitudinal patient record and encounters.', descAr: 'السجل الطولي الكامل للمريض والزيارات.' },
        { url: '/projects/care/financial-care.png', titleEn: 'Corporate Treasury', titleAr: 'الخزانة المؤسسية', descEn: 'Live financial ledger for the medical facility.', descAr: 'السجل المالي الحي للمنشأة الطبية.' },
        { url: '/projects/care/radio-lab-care.png', titleEn: 'Diagnostic Lab', titleAr: 'مختبر التشخيص', descEn: 'Imaging portal for MRI, CT and X-Ray requests.', descAr: 'بوابة صور الأشعة وطلبات التشخيص.' }
      ]
    },
    {
      id: 'edu',
      titleEn: 'OPERIX Edu',
      titleAr: 'أوبيريكس للتعليم',
      subEn: 'School Management Platform',
      subAr: 'منظومة الإدارة المدرسية',
      descEn: 'Cloud-based platform built for academic governance and school leadership empowerment.',
      descAr: 'منصة سحابية مصممة للإدارة الأكاديمية وتمكين القيادات المدرسية.',
      url: 'https://www.edu.operix-solutions.online',
      icon: <GraduationCap size={24} />,
      accentColor: '#f59e0b',
      accentLight: 'rgba(245,158,11,0.1)',
      image: '/projects/opx-edu-cover.jpeg',
      previews: [
        { url: '/projects/edu/edu-dash.png', titleEn: 'School Command Center', titleAr: 'مركز القيادة المدرسية', descEn: 'High-level overview of students, schedules and KPIs.', descAr: 'نظرة عامة على الطلاب والجداول ومؤشرات الأداء.' },
        { url: '/projects/edu/edu-dox.png', titleEn: 'Dox Studio', titleAr: 'دوكس ستوديو', descEn: 'Automated 4K printing-ready certificates engine.', descAr: 'محرك آلي لإنشاء شهادات جاهزة للطباعة 4K.' },
        { url: '/projects/edu/edu-fees.png', titleEn: 'Fees & Treasury', titleAr: 'الرسوم والخزانة', descEn: 'Comprehensive student registration and fee collection.', descAr: 'تسجيل الطلاب وتحصيل الرسوم المدرسية.' },
        { url: '/projects/edu/edu-studs.png', titleEn: 'Student Registry', titleAr: 'سجل الطلاب', descEn: 'Centralized history and academic profiles.', descAr: 'سجل تاريخي مركزي للملفات الأكاديمية.' },
        { url: '/projects/edu/edu-par.png', titleEn: 'Parent Portal', titleAr: 'بوابة أولياء الأمور', descEn: 'Direct linkage for communication and progress logs.', descAr: 'ربط مباشر للتواصل وسجلات التقدم.' },
        { url: '/projects/edu/edu-sub.png', titleEn: 'Curriculum Engine', titleAr: 'محرك المناهج', descEn: 'Advanced subject and grading configuration.', descAr: 'إعدادات متقدمة للمواد والتقييم.' },
        { url: '/projects/edu/edu-res.png', titleEn: 'Results Records', titleAr: 'سجلات النتائج', descEn: 'Precise academic recording and GPA computation.', descAr: 'رصد أكاديمي دقيق واحتساب المعدلات.' }
      ]
    }
  ];

  const specialPortals = [
    {
      id: 'abdullah',
      titleEn: 'Abdullah Bin Abbas',
      titleAr: 'مركز عبدالله بن عباس',
      subEn: 'Institutional Portal',
      subAr: 'البوابة المؤسسية',
      descEn: 'Administrative portal for resource planning and community outreach tracking.',
      descAr: 'بوابة إدارية لتخطيط الموارد وتتبع التواصل المجتمعي.',
      url: 'https://www.bin-abbas.operix-solutions.online',
      icon: <Landmark size={24} />,
      accentColor: '#10b981',
      accentLight: 'rgba(16,185,129,0.1)',
      image: '/projects/abbas.png',
      previews: []
    },
    {
      id: 'hasad',
      titleEn: 'Hasad Hub',
      titleAr: 'مركز حصاد الذكي',
      subEn: 'Smart Community Platform',
      subAr: 'منصة المجتمع الذكي',
      descEn: 'Real estate management handling resident requests and billing cycles.',
      descAr: 'إدارة العقارات للتعامل مع طلبات السكان ودورات الفوترة.',
      url: 'https://www.hasad.operix-solutions.online/Naseem_City',
      icon: <Building2 size={24} />,
      accentColor: '#f43f5e',
      accentLight: 'rgba(244,63,94,0.1)',
      image: '/projects/naseem.png',
      previews: []
    },
    {
      id: 'mamey',
      titleEn: 'Mamey Platform',
      titleAr: 'منصة مامي التجارية',
      subEn: 'General Trading & Logistics',
      subAr: 'التجارة العامة والخدمات اللوجستية',
      descEn: 'A specialized platform for the supply of foodstuffs and building materials.',
      descAr: 'منصة متخصصة لتوريد المواد الغذائية ومواد البناء واللوجستيات.',
      url: 'https://mamey.vercel.app',
      icon: <Globe size={24} />,
      accentColor: '#38bdf8',
      accentLight: 'rgba(56,189,248,0.1)',
      image: '/projects/mamey.png',
      previews: []
    }
  ];

  const allProducts = [...corePlatforms, ...specialPortals];
  const totalScreens = corePlatforms.reduce((a, p) => a + p.previews.length, 0);

  const partners = [
    { name: 'Abdullah Bin Abbas', logo: logoBinAbbas },
    { name: 'Hasad Community', logo: logoHasad },
    { name: 'OPERIX HRIS', logo: logoHris },
    { name: 'OPERIX Care', logo: logoCare },
    { name: 'OPERIX FMIS', logo: logoFmis },
    { name: 'OPERIX OPS', logo: logoOps }
  ];

  // ─── MODAL NAV ───
  const openPreview = useCallback((platform) => {
    setActivePreview(platform);
    setCurrentImgIndex(0);
  }, []);

  const nextImg = useCallback(() => {
    if (activePreview) {
      setImgLoaded(false);
      setCurrentImgIndex((prev) => (prev + 1) % activePreview.previews.length);
    }
  }, [activePreview]);

  const prevImg = useCallback(() => {
    if (activePreview) {
      setImgLoaded(false);
      setCurrentImgIndex((prev) => (prev === 0 ? activePreview.previews.length - 1 : prev - 1));
    }
  }, [activePreview]);

  useEffect(() => {
    const onKey = (e) => {
      if (!activePreview) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextImg();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevImg();
      if (e.key === 'Escape') setActivePreview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activePreview, nextImg, prevImg]);

  return (
    <div className="w-full bg-[#fdfdfd] min-h-screen font-sans selection:bg-[#d4af37]/30" dir={isAr ? 'rtl' : 'ltr'}>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-scroll {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ══════════════════════════════════════
           HERO (Cinematic UX)
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#1e2d40] pt-40 pb-32 md:pt-48 md:pb-40 border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Shield size={12} fill="currentColor" />
              {isAr ? 'هندسة الأنظمة المؤسسية' : 'Enterprise Systems Architecture'}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-serif text-white tracking-tight leading-[0.9] mb-10">
              {isAr ? <>كل شاشة<br /><span className="text-[#d4af37]">تروي قصة .</span></> : <>Every Screen<br /><span className="text-[#d4af37]">Tells a Story .</span></>}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-[#94a3b8] text-lg md:text-xl font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
              {isAr
                ? 'استكشف مصفوفة الأنظمة المستضافة والنشطة ضمن منظومة أوبيريكس للحلول المتكاملة.'
                : 'Explore the matrix of live, deployed platforms within the OPERIX Solutions ecosystem.'}
            </p>
          </Reveal>

          <Reveal delay={300} className="flex flex-wrap justify-center gap-6">
            <button onClick={() => openPreview(corePlatforms[0])} className="group px-10 py-5 bg-[#d4af37] text-[#1e2d40] rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-white hover:scale-105 active:scale-95 shadow-2xl shadow-[#d4af37]/20 flex items-center gap-3">
              <Play size={20} fill="currentColor" />
              {isAr ? 'مشاهدة العرض' : 'WATCH SHOWREEL'}
            </button>
            <a href="#quote-form" className="px-10 py-5 bg-white/5 border border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-white/10 flex items-center gap-3">
              {isAr ? 'طلب عرض سعر' : 'GET A QUOTE'}
              <ChevronRight size={20} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
           STATS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { n: 9, s: '', label: isAr ? 'وحدة متكاملة' : 'System Modules' },
            { n: totalScreens, s: '+', label: isAr ? 'شاشة نشطة' : 'Active Screens' },
            { n: 41, s: '+', label: isAr ? 'مشروع مؤسسي' : 'Enterprise Projects' },
            { n: 99.9, s: '%', label: isAr ? 'وقت التشغيل' : 'Uptime SLA' }
          ].map((s, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-5xl md:text-6xl font-black font-serif text-[#1e2d40]">
                <StatCounter target={s.n} suffix={s.s} />
              </div>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#d4af37]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
           MARQUEE (Navy Section)
      ══════════════════════════════════════ */}
      <section className="bg-[#1e2d40] py-24 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 0%, transparent 50%)' }} />

        <Reveal>
          <div className="text-center mb-12 relative z-10">
            <span className="text-[12px] font-black text-[#d4af37] uppercase tracking-[0.6em]">{isAr ? 'منظومة أوبيريكس' : 'THE OPERIX ECOSYSTEM'}</span>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-6 rounded-full opacity-40" />
          </div>
          <InfiniteMarquee items={partners} />
        </Reveal>
      </section>

      {/* ══════════════════════════════════════
           PRODUCT SHOWCASE
      ══════════════════════════════════════ */}
      <section className="py-40 space-y-40">
        {allProducts.map((sys, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <Reveal key={sys.id} className="max-w-7xl mx-auto px-6">
              <div className={`flex flex-col lg:items-center gap-16 lg:gap-24 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                <div className="flex-1 relative group cursor-pointer" onClick={() => sys.previews.length > 0 && openPreview(sys)}>
                  <div className="absolute inset-0 bg-slate-100 rounded-[3rem] -rotate-2 scale-[0.98] group-hover:rotate-0 transition-transform duration-700" />
                  <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200/50">
                    <img src={sys.image} className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" alt={sys.titleEn} />
                    {sys.previews.length > 0 && (
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl text-[#1e2d40]">
                          <ImageIcon size={32} />
                        </div>
                      </div>
                    )}
                  </div>
                  {sys.previews.length > 0 && (
                    <div className="absolute -bottom-6 -right-6 lg:-right-10 p-6 bg-white rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 z-20">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-[#d4af37] flex items-center justify-center">
                        <Monitor size={24} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'معاينة' : 'INTERACTIVE'}</div>
                        <div className="text-sm font-black text-[#1e2d40]">{sys.previews.length} {isAr ? 'شاشات' : 'Screens'}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-10">
                  <div className="space-y-4">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#d4af37]">{isAr ? sys.subAr : sys.subEn}</span>
                    <h2 className="text-5xl md:text-6xl font-black font-serif text-[#1e2d40] leading-[0.9]">{isAr ? sys.titleAr : sys.titleEn}</h2>
                  </div>
                  <p className="text-xl text-slate-500 leading-relaxed font-medium">{isAr ? sys.descAr : sys.descEn}</p>

                  <div className="space-y-4 border-t border-slate-100 pt-10">
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-emerald-500" />
                      <span className="text-sm font-bold text-[#1e2d40]">{isAr ? 'ربط سحابي فوري' : 'Real-time Cloud Integration'}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle size={20} className="text-emerald-500" />
                      <span className="text-sm font-bold text-[#1e2d40]">{isAr ? 'أمان بمستوى بنكي' : 'Bank-grade Operational Security'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <a href={sys.url} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#1e2d40] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-[#d4af37] hover:text-[#1e2d40] transition-all">
                      {isAr ? 'دخول المنصة' : 'LAUNCH PLATFORM'} <ArrowUpRight size={16} />
                    </a>
                    {sys.previews.length > 0 && (
                      <button onClick={() => openPreview(sys)} className="px-8 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-white hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
                        {isAr ? 'استعراض الواجهات' : 'PREVIEW UI'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ══════════════════════════════════════
           CONVERSION
      ══════════════════════════════════════ */}
      <section id="quote-form" className="py-40 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-6">
          <Reveal>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#d4af37]">{isAr ? 'طلب تفعيل الأنظمة' : 'INITIALIZE DEPLOYMENT'}</span>
            <h2 className="text-5xl md:text-6xl font-black font-serif text-[#1e2d40]">{isAr ? 'ابدأ التحول الرقمي .' : 'Start Your Journey .'}</h2>
            <p className="text-[#94a3b8] font-medium max-w-xl mx-auto">{isAr ? 'أدخل مواصفات مؤسستك أدناه لجدولة جلسة استشارية فنية.' : 'Provide your enterprise specifications below to consult with our implementation architects.'}</p>
          </Reveal>
        </div>
        <LeadForm isAr={isAr} />
      </section>

      {/* ══════════════════════════════════════
           PREVIEW MODAL
      ══════════════════════════════════════ */}
      {activePreview && activePreview.previews.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#04080e]/98 backdrop-blur-3xl" onClick={() => setActivePreview(null)} />
          <div className="relative w-full max-w-7xl max-h-[90vh] bg-[#0d1520] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col z-10">

            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-xl" style={{ background: activePreview.accentColor }}>{activePreview.icon}</div>
                <div>
                  <h4 className="font-serif font-black text-white text-xl">{isAr ? activePreview.titleAr : activePreview.titleEn}</h4>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{isAr ? 'معاينة النظام' : 'SYSTEM PREVIEW'}</span>
                </div>
              </div>
              <button onClick={() => setActivePreview(null)} className="w-12 h-12 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-red-500 transition-all"><X size={24} /></button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row min-h-0">
              <div className="flex-1 bg-black relative flex items-center justify-center p-4 group">
                {activePreview.previews[currentImgIndex].url.endsWith('.mp4') ? (
                  <video key={currentImgIndex} src={activePreview.previews[currentImgIndex].url} controls autoPlay muted loop className="max-w-full max-h-full object-contain" />
                ) : (
                  <img key={currentImgIndex} src={activePreview.previews[currentImgIndex].url} className="max-w-full max-h-full object-contain shadow-2xl" alt="Preview" />
                )}
                <button onClick={prevImg} className="absolute left-6 w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#d4af37] hover:text-[#1e2d40]"><ChevronLeft size={32} /></button>
                <button onClick={nextImg} className="absolute right-6 w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-[#d4af37] hover:text-[#1e2d40]"><ChevronRight size={32} /></button>
              </div>

              <div className="lg:w-96 bg-[#0a111b] p-8 md:p-12 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col">
                <div className="mb-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] mb-2 block">Module {currentImgIndex + 1} / {activePreview.previews.length}</span>
                  <h5 className="text-2xl font-black font-serif text-white mb-6 leading-tight">{isAr ? activePreview.previews[currentImgIndex].titleAr : activePreview.previews[currentImgIndex].titleEn}</h5>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{isAr ? activePreview.previews[currentImgIndex].descAr : activePreview.previews[currentImgIndex].descEn}</p>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {activePreview.previews.map((_, i) => (
                      <button key={i} onClick={() => setCurrentImgIndex(i)} className={`w-3 h-3 rounded-full transition-all ${i === currentImgIndex ? 'bg-[#d4af37] w-8' : 'bg-white/10 hover:bg-white/20'}`} />
                    ))}
                  </div>
                  <a href={activePreview.url} target="_blank" rel="noreferrer" className="w-full py-5 bg-[#d4af37] text-[#1e2d40] rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-95">
                    {isAr ? 'دخول المنصة' : 'LAUNCH PLATFORM'} <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
