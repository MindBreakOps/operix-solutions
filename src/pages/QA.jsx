import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  HelpCircle, ChevronDown, ChevronUp, MessageCircle,
  Phone, Mail, Globe, ShieldCheck, Users,
  Stethoscope, Settings, GraduationCap, ArrowRight,
  Database, Zap, Lock
} from 'lucide-react';

/* ── Reveal hook (Standard across Operix) ─────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold, rootMargin: '0px 0px -20px 0px' }
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
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      willChange: 'opacity, transform',
      ...style
    }} {...rest}>
      {children}
    </Tag>
  );
}

/* ── Scroll Progress Bar ─────────────────────────────────────── */
function ScrollProgress() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-1 bg-[#d4af37] z-[60] transition-all duration-100 ease-out" style={{ width: `${width}%` }} />
  );
}

/* ── Accordion Item with Enhanced Styling ────────────────────── */
function FAQItem({ question, answer, isOpen, onClick, isAr }) {
  return (
    <div
      className={`group border border-slate-200 rounded-2xl overflow-hidden mb-4 transition-all duration-500 ${
        isOpen
          ? 'shadow-xl shadow-[#d4af37]/5 border-[#d4af37]/40 ring-1 ring-[#d4af37]/20 bg-white'
          : 'bg-white hover:border-slate-300'
      }`}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 md:py-6 flex items-center justify-between text-left gap-4 transition-colors"
        style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
      >
        <span className={`text-sm md:text-base font-bold tracking-tight transition-colors duration-300 ${
          isOpen ? 'text-[#1e2d40]' : 'text-slate-600 group-hover:text-[#1e2d40]'
        }`}>
          {question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-[#d4af37] text-white rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
        }`}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <div
          className="px-6 pb-6 md:pb-8 text-[13px] md:text-sm text-slate-500 leading-relaxed border-t border-slate-50 pt-5 bg-gradient-to-b from-slate-50/50 to-white"
          style={{ direction: isAr ? 'rtl' : 'ltr', textAlign: isAr ? 'right' : 'left' }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ── Category Header with Liquid Glass ───────────────────────── */
function CategorySection({ title, icon: Icon, faqs, isAr, delay }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <Reveal delay={delay} className="mb-16">
      <div
        className="flex items-center gap-4 mb-8 sticky top-20 z-20 py-4 bg-[#f8fafc]/90 backdrop-blur-md"
        style={{ direction: isAr ? 'rtl' : 'ltr' }}
      >
        <div className="w-12 h-12 rounded-2xl bg-[#1e2d40] text-[#d4af37] flex items-center justify-center shadow-lg shadow-[#1e2d40]/10">
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black font-serif text-[#1e2d40] tracking-tight">{title}</h2>
          <div className={`h-1 w-12 bg-[#d4af37] mt-1 rounded-full ${isAr ? 'mr-0' : 'ml-0'}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1">
        {faqs.map((faq, idx) => (
          <FAQItem
            key={idx}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            isAr={isAr}
          />
        ))}
      </div>
    </Reveal>
  );
}

export default function QA() {
  const { t, isAr } = useLanguage();

  const categories = [
    {
      title: t.catGeneral,
      icon: Globe,
      faqs: [
        { q: t.faqG1_Q, a: t.faqG1_A },
        { q: t.faqG2_Q, a: t.faqG2_A },
        { q: t.faqG3_Q, a: t.faqG3_A },
      ]
    },
    {
      title: t.catFinancial,
      icon: ShieldCheck,
      faqs: [
        { q: t.faqF1_Q, a: t.faqF1_A },
        { q: t.faqF2_Q, a: t.faqF2_A },
      ]
    },
    {
      title: t.catHuman,
      icon: Users,
      faqs: [
        { q: t.faqH1_Q, a: t.faqH1_A },
      ]
    },
    {
      title: t.catHealthcare,
      icon: Stethoscope,
      faqs: [
        { q: t.faqC1_Q, a: t.faqC1_A },
        { q: t.faqC2_Q, a: t.faqC2_A },
      ]
    },
    {
      title: t.catOperations,
      icon: Settings,
      faqs: [
        { q: t.faqO1_Q, a: t.faqO1_A },
        { q: t.faqO2_Q, a: t.faqO2_A },
      ]
    },
    {
      title: t.catEducation,
      icon: GraduationCap,
      faqs: [
        { q: t.faqE1_Q, a: t.faqE1_A },
      ]
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans selection:bg-[#d4af37]/30">
      <ScrollProgress />

      <style>{`
        @keyframes floatGlow {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.1; }
          50%       { transform: translateY(-20px) scale(1.05); opacity: 0.2; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-tag { animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both; }
        .hero-h1  { animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both; }
        .hero-p   { animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both; }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1e2d40] border-b border-slate-700 pt-32 pb-24 md:pt-40 md:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-[#d4af37]/10 pointer-events-none" style={{ animation: 'floatGlow 10s infinite' }} />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] bg-blue-500/5 pointer-events-none" style={{ animation: 'floatGlow 8s infinite reverse' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="hero-tag inline-block text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] bg-[#d4af37]/10 px-5 py-2 rounded-full border border-[#d4af37]/20 mb-6">
            {isAr ? "قاعدة المعرفة والوثائق" : "Knowledge Base & Documentation"}
          </span>
          <h1 className="hero-h1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight font-serif text-white max-w-4xl mx-auto leading-[1.15] mb-6">
            {t.qaTitle}
          </h1>
          <p className="hero-p text-slate-300 text-sm md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            {t.qaSub}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">

        {/* ── FEATURES GRID (Micro-Info) ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {[
            { icon: Lock, label: isAr ? "أمان البيانات" : "Data Sovereignty", sub: isAr ? "مراكز بيانات محلية" : "KSA Data Residency" },
            { icon: Zap, label: isAr ? "تزامن حي" : "Real-time Power", sub: isAr ? "صفر تأخير" : "Zero-latency sync" },
            { icon: Database, label: isAr ? "بنية متطورة" : "Modern Stack", sub: isAr ? "بنية تحتية سحابية" : "Cloud Infrastructure" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100} className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-lg transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#d4af37]">
                <item.icon size={20} />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-widest text-[#1e2d40]">{item.label}</div>
                <div className="text-[10px] text-slate-500 font-medium">{item.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── CATEGORIES ────────────────────────────────────────── */}
        <div className="space-y-4">
          {categories.map((cat, i) => (
            <CategorySection
              key={i}
              title={cat.title}
              icon={cat.icon}
              faqs={cat.faqs}
              isAr={isAr}
              delay={i * 50}
            />
          ))}
        </div>

        {/* ── CONTACT CTA ──────────────────────────────────────── */}
        <Reveal delay={200} className="mt-20">
          <div className="bg-[#1e2d40] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden group">
            {/* Liquid Glass Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent opacity-30 group-hover:opacity-40 transition-opacity duration-700" />

            <div className="relative z-10">
              <div className="w-20 h-20 bg-[#d4af37] rounded-3xl flex items-center justify-center text-[#1e2d40] mx-auto mb-8 shadow-2xl shadow-[#d4af37]/20 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <MessageCircle size={36} strokeWidth={2} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-white mb-6">
                {isAr ? "هل تحتاج إلى استشارة فنية؟" : "Need a Technical Consultation?"}
              </h2>
              <p className="text-slate-300 text-sm md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                {isAr
                  ? "مهندسونا جاهزون لمناقشة خارطة طريق التحول الرقمي لمؤسستك وتقديم حلول مخصصة."
                  : "Our systems architects are ready to discuss your digital transformation roadmap and provide tailored solutions."}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="/contact" className="group/btn bg-[#d4af37] hover:bg-white text-[#1e2d40] px-10 py-5 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-95 flex items-center gap-3">
                  {isAr ? "احجز موعداً الآن" : "SCHEDULE NOW"}
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── FOOTER CONTACT INFO ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <Reveal delay={300}>
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#d4af37] shadow-sm">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{isAr ? "الاتصال المباشر" : "Direct Line"}</div>
                <div className="text-lg font-black text-[#1e2d40]">+966 500 823 643</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="glass-card p-8 rounded-3xl flex flex-col items-center text-center gap-4 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#d4af37] shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{isAr ? "المراسلات الرسمية" : "Official Mail"}</div>
                <div className="text-lg font-black text-[#1e2d40] tracking-tight">info@operix-solutions.com</div>
              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </div>
  );
}
