import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, Globe, Trash2, Edit3, LogOut, 
  UploadCloud, FileText, CheckCircle, Activity, LayoutGrid,
  Home, Info, Briefcase, Newspaper, Users // New Category Icons
} from 'lucide-react';

// Centralized Category Configuration
const CATEGORIES = {
  services: { 
	label: "Our Services", 
	icon: Briefcase, 
	badge: "bg-purple-50 text-purple-700 border-purple-200",
	tabActive: "bg-purple-600 text-white shadow-md shadow-purple-200",
	counter: "bg-purple-700 text-white"
  },
  news: { 
	label: "Blog & News", 
	icon: Newspaper, 
	badge: "bg-amber-50 text-amber-700 border-amber-200",
	tabActive: "bg-amber-500 text-white shadow-md shadow-amber-200",
	counter: "bg-amber-600 text-white"
  },
  clients: { 
	label: "Clients & Partners", 
	icon: Users, 
	badge: "bg-rose-50 text-rose-700 border-rose-200",
	tabActive: "bg-rose-600 text-white shadow-md shadow-rose-200",
	counter: "bg-rose-700 text-white"
  },
  home: { 
	label: "Home Page", 
	icon: Home, 
	badge: "bg-blue-50 text-blue-700 border-blue-200",
	tabActive: "bg-blue-600 text-white shadow-md shadow-blue-200",
	counter: "bg-blue-700 text-white"
  },
  about: { 
	label: "About Strategy", 
	icon: Info, 
	badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
	tabActive: "bg-emerald-600 text-white shadow-md shadow-emerald-200",
	counter: "bg-emerald-700 text-white"
  }
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  
  // Analytics State
  const [visitorCount, setVisitorCount] = useState(0);
  const [countryLogs, setCountryLogs] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // CRUD CMS State
  const [cmsItems, setCmsItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); 
  
  const [hiddenSectionKey, setHiddenSectionKey] = useState('');
  
  const [targetPage, setTargetPage] = useState('services');
  const [formData, setFormData] = useState(() => {
	const cachedData = localStorage.getItem('operix_form_cache');
	return cachedData ? JSON.parse(cachedData) : {
	  title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: ''
	};
  });

  useEffect(() => {
	if (!editingId) {
	  localStorage.setItem('operix_form_cache', JSON.stringify(formData));
	}
  }, [formData, editingId]);

  useEffect(() => {
	fetchAnalytics();
	fetchCmsContent();
  }, []);

  async function fetchAnalytics() {
	setLoadingMetrics(true);
	const { count } = await supabase
	  .from('operix_visitor_logs')
	  .select('*', { count: 'exact', head: true });
	if (count) setVisitorCount(count);

	const { data } = await supabase.from('operix_visitor_logs').select('ip_country');
	if (data) {
	  const counts = data.reduce((acc, log) => {
		const code = log.ip_country ? log.ip_country.toUpperCase() : 'UNKNOWN';
		acc[code] = (acc[code] || 0) + 1;
		return acc;
	  }, {});
	  setCountryLogs(Object.entries(counts).sort((a, b) => b[1] - a[1]));
	}
	setLoadingMetrics(false);
  }

  async function fetchCmsContent() {
	const { data, error } = await supabase
	  .from('operix_cms_content')
	  .select('*')
	  .order('updated_at', { ascending: false });
	if (!error && data) setCmsItems(data);
  }

  const handleSelectEdit = (item) => {
	setEditingId(item.id);
	setTargetPage(item.page);
	setHiddenSectionKey(item.section_key); 
	setFormData({
	  title_en: item.title_en || '',
	  title_ar: item.title_ar || '',
	  body_en: item.body_en || '',
	  body_ar: item.body_ar || '',
	  media_url: item.media_url || ''
	});
  };

  const resetFormState = () => {
	setEditingId(null);
	setHiddenSectionKey('');
	setFormData({ title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: '' });
	localStorage.removeItem('operix_form_cache');
  };

  const processMediaUrl = (url) => {
	if (!url) return '';
	if (url.includes('/preview')) return url; 
	const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
	if (driveMatch && driveMatch[1]) {
	  return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
	}
	return url; 
  };

  const handleSaveItem = async (e) => {
	e.preventDefault();
	const formattedMediaUrl = processMediaUrl(formData.media_url);
	
	const generatedKey = editingId 
	  ? hiddenSectionKey 
	  : `${targetPage.toLowerCase()}_${Math.floor(Date.now() / 1000)}`;
	
	const payload = {
	  page: targetPage,
	  section_key: generatedKey,
	  title_en: formData.title_en,
	  title_ar: formData.title_ar,
	  body_en: formData.body_en,
	  body_ar: formData.body_ar,
	  media_url: formattedMediaUrl,
	  updated_at: new Date().toISOString()
	};

	if (editingId) {
	  const { error } = await supabase.from('operix_cms_content').update(payload).eq('id', editingId);
	  if (error) alert(`Update failed: ${error.message}`);
	} else {
	  const { error } = await supabase.from('operix_cms_content').insert([payload]);
	  if (error) alert(`Creation failed: ${error.message}`);
	  setActiveTab(targetPage); 
	}

	resetFormState();
	fetchCmsContent();
  };

  const handleDeleteItem = async (id) => {
	if (!window.confirm("Purge this record from the database?")) return;
	const { error } = await supabase.from('operix_cms_content').delete().eq('id', id);
	if (!error) fetchCmsContent();
  };

  const filteredItems = activeTab === 'all' 
	? cmsItems 
	: cmsItems.filter(item => item.page === activeTab);

  return (
	<div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans select-none">
	  
	  {/* HEADER */}
	  <header className="bg-[#1e2d40] border-b border-[#2a3b52] px-8 py-5 flex items-center justify-between sticky top-0 z-50 shadow-md">
		<div>
		  <h1 className="text-2xl font-black tracking-tight text-white font-serif">Content Management</h1>
		  <p className="text-xs text-slate-400 font-medium mt-1">
			Logged in as <span className="text-white font-bold">{user?.email || 'admin@operix.local'}</span> · {cmsItems.length} records
		  </p>
		</div>
		<button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-[#2a3b52] border border-[#3b4c63] rounded-lg text-sm font-semibold text-white hover:bg-[#3b4c63] transition-colors shadow-sm">
		  <LogOut size={16} /> Sign Out
		</button>
	  </header>

	  {/* WORKSPACE */}
	  <main className="p-8 max-w-[1600px] mx-auto space-y-8 flex-1 w-full">
		
		{/* TOP TELEMETRY GRID */}
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
			<div>
			  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Traffic</p>
			  <h3 className="text-2xl font-black text-[#1e2d40] mt-1">{loadingMetrics ? '...' : visitorCount.toLocaleString()}</h3>
			</div>
			<div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={20} /></div>
		  </div>
		  
		  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
			<div>
			  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Regions</p>
			  <h3 className="text-2xl font-black text-[#1e2d40] mt-1">{loadingMetrics ? '...' : countryLogs.length}</h3>
			</div>
			<div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Globe size={20} /></div>
		  </div>
		  
		  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
			<p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Visitor Origins</p>
			<div className="flex flex-wrap gap-2 overflow-y-auto max-h-[48px] pr-2 custom-scrollbar">
			  {countryLogs.length === 0 && <span className="text-xs font-semibold text-slate-400">Awaiting data...</span>}
			  {countryLogs.map(([country, count]) => (
				<span key={country} className="text-[11px] font-black text-[#1e2d40] bg-slate-100 border border-slate-200 px-2 py-1 rounded-md">
				  {country}: {count}
				</span>
			  ))}
			</div>
		  </div>
		  
		  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
			<div>
			  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Status</p>
			  <h3 className="text-xl font-black text-[#1e2d40] mt-1 flex items-center gap-2">
				<span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
			  </h3>
			</div>
			<div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600"><Activity size={20} /></div>
		  </div>
		</div>

		{/* SPLIT LAYOUT */}
		<div className="flex flex-col xl:flex-row gap-8 items-start">
		  
		  {/* DATA ENTRY FORM */}
		  <div className="w-full xl:w-[400px] flex-shrink-0 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden sticky top-32">
			<div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
			  <UploadCloud size={18} className="text-[#1e2d40]" />
			  <h2 className="text-sm font-bold text-[#1e2d40] tracking-wide uppercase">
				{editingId ? "Update Entry" : "New Entry"}
			  </h2>
			</div>
			
			<form onSubmit={handleSaveItem} className="p-6 space-y-5">
			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</label>
				<select 
				  value={targetPage} 
				  onChange={e => setTargetPage(e.target.value)} 
				  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-[#1e2d40] focus:border-[#1e2d40] focus:ring-1 focus:ring-[#1e2d40] outline-none transition-all cursor-pointer"
				>
				  {Object.entries(CATEGORIES).map(([key, config]) => (
					<option key={key} value={key}>{config.label}</option>
				  ))}
				</select>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title / Headline (EN) *</label>
				<input 
				  type="text" required value={formData.title_en} 
				  onChange={e => setFormData({...formData, title_en: e.target.value})} 
				  placeholder="Enter title..." 
				  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-[#1e2d40] focus:border-[#1e2d40] focus:ring-1 focus:ring-[#1e2d40] outline-none transition-all" 
				/>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right block">العنوان / الرئيسي (AR)</label>
				<input 
				  type="text" value={formData.title_ar} 
				  onChange={e => setFormData({...formData, title_ar: e.target.value})} 
				  placeholder="أدخل العنوان..." 
				  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-[#1e2d40] focus:border-[#1e2d40] focus:ring-1 focus:ring-[#1e2d40] outline-none transition-all text-right" style={{ direction: 'rtl' }}
				/>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Description / Content (EN)</label>
				<textarea 
				  rows={4} value={formData.body_en} 
				  onChange={e => setFormData({...formData, body_en: e.target.value})} 
				  placeholder="Write your content here..." 
				  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-[#1e2d40] focus:border-[#1e2d40] focus:ring-1 focus:ring-[#1e2d40] outline-none transition-all resize-none" 
				/>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right block">الوصف / المحتوى (AR)</label>
				<textarea 
				  rows={3} value={formData.body_ar} 
				  onChange={e => setFormData({...formData, body_ar: e.target.value})} 
				  placeholder="اكتب المحتوى هنا..." 
				  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm text-[#1e2d40] focus:border-[#1e2d40] focus:ring-1 focus:ring-[#1e2d40] outline-none transition-all resize-none text-right" style={{ direction: 'rtl' }}
				/>
			  </div>

			  <div className="space-y-1.5">
				<label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Media Attachment (Drive URL)</label>
				<div className="border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 text-center hover:bg-slate-100 transition-colors">
				  <FileText size={24} className="mx-auto text-slate-400 mb-2" />
				  <input 
					type="url" value={formData.media_url} 
					onChange={e => setFormData({...formData, media_url: e.target.value})} 
					placeholder="Paste Drive Link Here..." 
					className="w-full bg-transparent text-xs text-center font-mono outline-none text-[#1e2d40] placeholder:text-slate-400" 
				  />
				</div>
			  </div>

			  <div className="pt-4 flex flex-col gap-3">
				<button type="submit" className="w-full py-3.5 bg-[#1e2d40] hover:bg-[#2a3b52] text-white rounded-xl text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-md">
				  {editingId ? <CheckCircle size={18} /> : <UploadCloud size={18} />}
				  {editingId ? "Update Live Site" : "Deploy to Live Site"}
				</button>
				{editingId && (
				  <button type="button" onClick={resetFormState} className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
					Cancel Edit
				  </button>
				)}
			  </div>
			</form>
		  </div>

		  {/* DYNAMIC TABBED DATABASE */}
		  <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
			
			<div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
			  <div className="flex items-center gap-2">
				<LayoutGrid size={18} className="text-[#1e2d40]" />
				<h2 className="text-sm font-bold text-[#1e2d40] tracking-wide uppercase">Live Content Database</h2>
			  </div>
			  <span className="text-xs font-semibold text-slate-400">Showing {filteredItems.length} of {cmsItems.length} records</span>
			</div>

			{/* TAB MENU */}
			<div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center gap-3 overflow-x-auto custom-scrollbar">
			  
			  {/* 'All Records' Tab */}
			  <button
				onClick={() => setActiveTab('all')}
				className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 ${
				  activeTab === 'all'
					? 'bg-[#1e2d40] text-white shadow-md'
					: 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'
				}`}
			  >
				<LayoutGrid size={14} />
				All Records
				<span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
				  activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'
				}`}>
				  {cmsItems.length}
				</span>
			  </button>

			  {/* Dynamic Category Tabs */}
			  {Object.entries(CATEGORIES).map(([key, config]) => {
				const count = cmsItems.filter(i => i.page === key).length;
				const isActive = activeTab === key;
				const Icon = config.icon;
				
				return (
				  <button
					key={key}
					onClick={() => setActiveTab(key)}
					className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all flex items-center gap-2 border ${
					  isActive 
						? `${config.tabActive} border-transparent` 
						: 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
					}`}
				  >
					<Icon size={14} className={isActive ? 'opacity-100' : 'opacity-50'} />
					{config.label}
					<span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
					  isActive ? config.counter : 'bg-slate-100 text-slate-400'
					}`}>
					  {count}
					</span>
				  </button>
				);
			  })}
			</div>

			{/* TABLE */}
			<div className="overflow-x-auto">
			  <table className="w-full text-left text-sm border-collapse">
				<thead>
				  <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50/50">
					<th className="px-6 py-4 w-44">Category</th>
					<th className="px-6 py-4">Title / Description</th>
					<th className="px-6 py-4 w-48 font-mono text-[10px]">Auto Key</th>
					<th className="px-6 py-4 w-32 text-right">Actions</th>
				  </tr>
				</thead>
				<tbody className="divide-y divide-slate-100">
				  {filteredItems.length === 0 ? (
					<tr>
					  <td colSpan={4} className="px-6 py-16 text-center">
						<FileText size={32} className="mx-auto text-slate-300 mb-3" />
						<p className="text-sm text-slate-500 font-semibold">No entries found for this category.</p>
					  </td>
					</tr>
				  ) : (
					filteredItems.map((item) => {
					  const categoryData = CATEGORIES[item.page] || { 
						label: item.page, 
						icon: FileText, 
						badge: 'bg-slate-100 text-slate-600 border-slate-200' 
					  };
					  const CatIcon = categoryData.icon;

					  return (
						<tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
						  
						  <td className="px-6 py-5 align-top">
							<span className={`px-3 py-1.5 rounded-md text-[10px] font-black border uppercase tracking-wider flex items-center gap-1.5 w-fit ${categoryData.badge}`}>
							  <CatIcon size={12} />
							  {categoryData.label}
							</span>
						  </td>
						  
						  <td className="px-6 py-5">
							<div className="font-bold text-[#1e2d40] text-base mb-1">{item.title_en || 'Untitled Entry'}</div>
							<div className="text-xs text-slate-500 line-clamp-2 leading-relaxed max-w-2xl">
							  {item.body_en || 'No description provided.'}
							</div>
							{item.title_ar && (
							  <div className="text-xs font-semibold text-slate-400 mt-2 text-right" style={{ direction: 'rtl' }}>
								{item.title_ar}
							  </div>
							)}
						  </td>

						  <td className="px-6 py-5 align-top">
							<span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-200 truncate max-w-[150px] inline-block shadow-sm">
							  {item.section_key}
							</span>
						  </td>
						  
						  <td className="px-6 py-5 align-top text-right">
							<div className="flex items-center justify-end gap-2">
							  <button 
								onClick={() => handleSelectEdit(item)} 
								className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-md hover:border-[#1e2d40] hover:text-[#1e2d40] transition-colors shadow-sm"
							  >
								<Edit3 size={12} /> Edit
							  </button>
							  <button 
								onClick={() => handleDeleteItem(item.id)} 
								className="px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-red-500 bg-white border border-red-100 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm"
							  >
								<Trash2 size={12} /> Trash
							  </button>
							</div>
						  </td>

						</tr>
					  );
					})
				  )}
				</tbody>
			  </table>
			</div>
		  </div>

		</div>
	  </main>

	  {/* FOOTER */}
	  <footer className="bg-[#1e2d40] border-t border-[#2a3b52] px-8 py-4 mt-auto shadow-inner">
		<p className="text-xs text-slate-400 text-center font-semibold tracking-wider uppercase">
		  OPERIX Solutions © {new Date().getFullYear()} — Global Administrative Switchboard
		</p>
	  </footer>

	</div>
  );
}