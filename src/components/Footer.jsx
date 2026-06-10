import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, isAr } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
	<footer className="footer-wrapper" style={{ backgroundColor: '#1e2d40', borderTop: '1px solid #1e293b' }}>
	  <div className="footer-grid">
		
		{/* Column 1: Brand Logotype & Description */}
		<div className="footer-brand-column">
		  <div className="flex items-center gap-2.5 text-white font-black text-lg">
			<img src="/logo.png" alt="OPERIX Solutions Logo" className="w-7 h-7 object-contain" />
			<span className="font-sans uppercase tracking-tight font-black" style={{ color: '#ffffff' }}>OPERIX Solutions</span>
		  </div>
		  <p className="footer-desc-text" style={{ color: '#94a3b8' }}>
			{isAr 
			  ? "نظام تشغيل وإدارة موحد للمنشآت الكبرى يجمع العمليات التشغيلية، الرعاية الصحية، والموارد البشرية في منصة رقمية موحدة."
			  : "A unified enterprise command suite coordinating operations, medical workflows, and human capital life-cycles into a singular control core."}
		  </p>
		  <div className="text-[11px] font-mono" style={{ color: '#94a3b8' }}>
			E: operixsolution@gmail.com
		  </div>
		</div>

		{/* Column 2: Deployed Platform Portals */}
		<div>
		  <span className="footer-column-title" style={{ color: '#c9a84c' }}>{isAr ? "منصات المنظومة" : "Cloud Portals"}</span>
		  <ul className="footer-list">
			<li><a href="https://operix-hris.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-list-link" style={{ color: '#94a3b8' }}>OPERIX HRIS</a></li>
			<li><a href="https://operix-operations.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-list-link" style={{ color: '#94a3b8' }}>OPERIX Operations</a></li>
			<li><a href="https://operix-care.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-list-link" style={{ color: '#94a3b8' }}>OPERIX Care HIS</a></li>
			<li><a href="https://operix-fmis.vercel.app" target="_blank" rel="noopener noreferrer" className="footer-list-link" style={{ color: '#94a3b8' }}>OPERIX FMIS</a></li>
		  </ul>
		</div>

		{/* Column 3: Corporate Page Links */}
		<div>
		  <span className="footer-column-title" style={{ color: '#c9a84c' }}>{isAr ? "دليل الشركات" : "Corporate Directory"}</span>
		  <ul className="footer-list">
			<li><Link to="/" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navHome || 'Home'}</Link></li>
			<li><Link to="/about" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navAbout || 'About Us'}</Link></li>
			<li><Link to="/services" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navServices || 'Our Services'}</Link></li>
			<li><Link to="/projects" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navProjects || 'Projects & Operations'}</Link></li>
			<li><Link to="/clients" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navClients || 'Clients & Partners'}</Link></li>
			<li><Link to="/news" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navNews || 'News'}</Link></li>
			<li><Link to="/contact" className="footer-list-link" style={{ color: '#94a3b8' }}>{t.navContact || 'Contact'}</Link></li>
		  </ul>
		</div>

		{/* Column 4: Governance Framework & Tab Entries */}
		<div>
		  <span className="footer-column-title" style={{ color: '#c9a84c' }}>{isAr ? "الحوكمة والامتثال" : "Legal Framework"}</span>
		  <ul className="footer-list">
			<li><Link to="/legal" className="footer-list-link" style={{ color: '#94a3b8' }}>{isAr ? "الامتثال والوثائق القانونية" : "Regulatory Compliance"}</Link></li>
			<li><Link to="/legal?tab=terms" className="footer-list-link" style={{ color: '#94a3b8' }}>{isAr ? "شروط الاستخدام والخدمة" : "Terms of Service"}</Link></li>
			<li><Link to="/legal?tab=privacy" className="footer-list-link" style={{ color: '#94a3b8' }}>{isAr ? "سياسة الخصوصية وحماية البيانات" : "Privacy & Data Sovereignty"}</Link></li>
		  </ul>
		</div>

	  </div>

	  <div className="footer-bottom-bar" style={{ borderTop: '1px solid #1e293b' }}>
		<div style={{ color: '#64748b' }}>{t.copyright || `© ${currentYear} OPERIX Solutions. All rights reserved.`}</div>
		<div style={{ color: '#64748b' }} className="font-mono text-xs">Riyadh, Kingdom of Saudi Arabia</div>
	  </div>
	</footer>
  );
}