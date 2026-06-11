import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ExternalLink } from 'lucide-react';

export default function Clients() {
  const { isAr } = useLanguage();

  // ─── CMS READY DATA ARRAY ───
  // Replace this with: const [clientsData, setClientsData] = useState([]); useEffect(() => fetch(...))
  const clientsData = [
	{
	  id: 1,
	  name: isAr ? "مدينة النسيم" : "Naseem City",
	  contractDetails: isAr ? "إدارة مجتمعية ذكية وصيانة مرافق" : "Smart Community Hub & Facility Maintenance",
	  logoUrl: "/projects/naseem.png"
	},
	{
	  id: 2,
	  name: isAr ? "مؤسسة مامي" : "Mamey Enterprise",
	  contractDetails: isAr ? "تجارة عامة واستثمار ولوجستيات" : "General Trading, Investment & Logistics",
	  logoUrl: "/projects/mamey.png" // Using the image you uploaded
	},
	{
	  id: 3,
	  name: isAr ? "مركز عبدالله بن عباس" : "Abdullah Bin Abbas Center",
	  contractDetails: isAr ? "إدارة مؤسسية وأرشفة رقمية" : "Institutional Management & Digital Archiving",
	  logoUrl: "/projects/abbas.png"
	},
	{
	id: 3,
	  name: isAr ? "Mind Break Cafe" : "VIP VALET SERVICE",
	  contractDetails: isAr ? "خدمة صف سيارات وادارة مواقف ذكية" : "VIP VALET SERVICE and Parking System ANPR",
	  logoUrl: "/projects/valet.png"
	}
  ];

  return (
	<div className="w-full bg-[#f8fafc] min-h-screen py-20 px-4 md:px-6 font-sans">
	  <div className="max-w-6xl mx-auto space-y-16">
		
		<div className="text-center space-y-4">
		  <h1 className="text-4xl md:text-5xl font-black text-[#1e2d40] font-serif tracking-tight">
			{isAr ? "شركاء النجاح والمنظومات" : "Clients & Corporate Partners"}
		  </h1>
		  <p className="text-slate-600 text-sm md:text-base font-medium">
			{isAr 
			  ? "ندير البنية التحتية الرقمية لأكبر الكيانات الاقتصادية والمنشآت." 
			  : "Empowering industry leaders across the region with customized architecture solutions."}
		  </p>
		</div>

		{/* DYNAMIC CMS GRID */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		  {clientsData.map((client) => (
			<div key={client.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
			  <div className="h-40 bg-slate-100 flex items-center justify-center p-6 border-b border-slate-100">
				<img 
				  src={client.logoUrl} 
				  alt={client.name} 
				  className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
				  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="text-slate-300 font-black tracking-widest uppercase">LOGO</div>'; }}
				/>
			  </div>
			  <div className="p-6 space-y-2">
				<h3 className="text-lg font-black text-[#1e2d40]">{client.name}</h3>
				<p className="text-xs text-slate-500 font-medium leading-relaxed uppercase tracking-wider">{client.contractDetails}</p>
			  </div>
			</div>
		  ))}
		</div>

	  </div>
	</div>
  );
}