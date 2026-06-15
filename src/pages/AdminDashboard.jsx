import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';
import { Eye, Globe, Layers, Trash2, Edit3, PlusCircle, LogOut, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  
  // Analytics State
  const [visitorCount, setVisitorCount] = useState(0);
  const [countryLogs, setCountryLogs] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  // CRUD CMS State
  const [cmsItems, setCmsItems] = useState([]);
  const [editingId, setEditingId] = useState(null); // null means "Create mode"
  const [targetPage, setTargetPage] = useState('news');
  const [sectionKey, setSectionKey] = useState('');
  const [formData, setFormData] = useState({
	title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: ''
  });

  // Load analytics metrics and content records
  useEffect(() => {
	fetchAnalytics();
	fetchCmsContent();
  }, []);

  async function fetchAnalytics() {
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

  // Handle Edit selection
  const handleSelectEdit = (item) => {
	setEditingId(item.id);
	setTargetPage(item.page);
	setSectionKey(item.section_key);
	setFormData({
	  title_en: item.title_en || '',
	  title_ar: item.title_ar || '',
	  body_en: item.body_en || '',
	  body_ar: item.body_ar || '',
	  media_url: item.media_url || ''
	});
  };

  // Clear form back to Create mode
  const resetFormState = () => {
	setEditingId(null);
	setSectionKey('');
	setFormData({ title_en: '', title_ar: '', body_en: '', body_ar: '', media_url: '' });
  };

  // ─── HELPER: Convert Google Drive links to Direct Image Links ───
// ─── HELPER: Convert Google Drive links to Direct Image Links ───
	const processMediaUrl = (url) => {
	  if (!url) return '';
	  // Look for Google Drive ID in standard share links
	  const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
	  
	  if (driveMatch && driveMatch[1]) {
		// Uses the Thumbnail API bypass (w1000 means width 1000px for high quality)
		return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
	  }
	  return url; // If not Google Drive, return as-is
	};

  // Create or Update Record
  const handleSaveItem = async (e) => {
	e.preventDefault();
	
	// Automatically convert Drive links before saving
	const formattedMediaUrl = processMediaUrl(formData.media_url);
	
	const payload = {
	  page: targetPage,
	  section_key: sectionKey || `custom_${Date.now()}`,
	  title_en: formData.title_en,
	  title_ar: formData.title_ar,
	  body_en: formData.body_en,
	  body_ar: formData.body_ar,
	  media_url: formattedMediaUrl,
	  updated_at: new Date().toISOString()
	};

	if (editingId) {
	  // Update
	  const { error } = await supabase
		.from('operix_cms_content')
		.update(payload)
		.eq('id', editingId);

	  if (error) alert(`Update failed: ${error.message}`);
	  else alert("CMS database record synchronized successfully!");
	} else {
	  // Create
	  const { error } = await supabase
		.from('operix_cms_content')
		.insert([payload]);

	  if (error) alert(`Creation failed: ${error.message}`);
	  else alert("New operational asset created successfully!");
	}

	resetFormState();
	fetchCmsContent();
  };

  // Delete Record
  const handleDeleteItem = async (id) => {
	if (!window.confirm("Are you sure you want to delete this operational entry?")) return;
	
	const { error } = await supabase
	  .from('operix_cms_content')
	  .delete()
	  .eq('id', id);

	if (error) alert(`Deletion failed: ${error.message}`);
	else {
	  alert("Entry purged from core storage.");
	  fetchCmsContent();
	}
  };

  return (
	<div className="min-h-screen p-0 m-0 font-sans select-none" style={{ backgroundColor: '#f8fafc', color: '#1e2d40' }}>
	  
	  {/* HEADER PANELS */}
	  <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
		<div className="flex items-center gap-3">
		  <img src="/logo.png" alt="OPERIX Solutions Logo" className="w-8 h-8 object-contain" />
		  <div>
			<h1 className="text-sm font-black uppercase tracking-wider m-0" style={{ color: '#1e2d40' }}>OPERIX Solutions</h1>
			<p className="text-[10px] text-slate-400 font-bold m-0 uppercase tracking-widest">Global Administrative switchboard</p>
		  </div>
		</div>
		<div className="flex items-center gap-4">
		  <span className="text-xs font-mono font-bold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-500">{user?.email}</span>
		  <button onClick={logout} className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all cursor-pointer">
			<LogOut size={16} />
		  </button>
		</div>
	  </header>

	  {/* WORKSPACE */}
	  <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
		
		{/* TELEMETRY ANALYTICS GRID */}
		<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
		  <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm relative overflow-hidden">
			<div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#1e2d40] bg-slate-50 border border-slate-100"><Eye size={20} /></div>
			<div>
			  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Total Database Access Hits</span>
			  <div className="text-3xl font-black font-mono tracking-tight mt-0.5" style={{ color: '#1e2d40' }}>{loadingMetrics ? '---' : visitorCount.toLocaleString()}</div>
			</div>
		  </div>
		  
		  <div className="bg-white border border-slate-200 rounded-3xl p-6 flex items-center gap-5 shadow-sm relative overflow-hidden">
			<div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[#c9a84c] bg-amber-50 border border-amber-100"><Globe size={20} /></div>
			<div>
			  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Territories Logged</span>
			  <div className="text-3xl font-black font-mono tracking-tight mt-0.5" style={{ color: '#1e2d40' }}>{loadingMetrics ? '---' : countryLogs.length}</div>
			</div>
		  </div>

		  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center">
			<span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Live Visitor Footprints</span>
			<div className="flex flex-wrap gap-2 max-h-[44px] overflow-y-auto pr-1">
			  {countryLogs.map(([country, count]) => (
				<div key={country} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold font-mono text-[#1e2d40]">
				  {country}: {count}
				</div>
			  ))}
			</div>
		  </div>
		</div>

		{/* CMS CRUD FORM ENGAGEMENT BOX */}
		<div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
		  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
			<div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider" style={{ color: '#1e2d40' }}>
			  <Layers size={16} className="text-[#c9a84c]" />
			  {editingId ? "Update Existing Asset Profile" : "Initialize New Ecosystem Module Content"}
			</div>
			{editingId && (
			  <button onClick={resetFormState} className="text-xs font-black uppercase tracking-wider text-slate-400 hover:text-[#1e2d40] border border-slate-200 bg-white px-3 py-1 rounded-lg">
				Cancel Edit
			  </button>
			)}
		  </div>

		  <form onSubmit={handleSaveItem} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
			<div>
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Target Web Module</label>
			  <select value={targetPage} onChange={e => setTargetPage(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none text-[#1e2d40] cursor-pointer focus:bg-white focus:border-[#c9a84c]">
				<option value="news">News & Intelligence Feed</option>
				  <option value="home">Home Page Presentation</option>
				  <option value="about">About Strategy Overview</option>
				  <option value="services">Services Matrix</option>
				  <option value="clients">Clients & Partners Matrix</option>
			  </select>
			</div>

			<div>
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Structural Section Allocation Key</label>
			  <input type="text" required value={sectionKey} onChange={e => setSectionKey(e.target.value)} placeholder="e.g., news_item_01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none text-[#1e2d40] focus:bg-white focus:border-[#c9a84c]" />
			</div>

			<div>
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">English Heading Identifier</label>
			  <input type="text" value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} placeholder="English Title Text..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none text-[#1e2d40] focus:bg-white focus:border-[#c9a84c]" />
			</div>

			<div>
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Arabic Heading Identifier (العنوان العربي)</label>
			  <input type="text" value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} placeholder="العنوان باللغة العربية..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none text-[#1e2d40] focus:bg-white focus:border-[#c9a84c] text-right" style={{ direction: 'rtl' }} />
			</div>

			<div className="md:col-span-2">
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">English Descriptive Narrative Narrative Body</label>
			  <textarea rows={2} value={formData.body_en} onChange={e => setFormData({...formData, body_en: e.target.value})} placeholder="Enter English details..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none text-[#1e2d40] resize-none focus:bg-white focus:border-[#c9a84c]" />
			</div>

			<div className="md:col-span-2">
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Arabic Descriptive Narrative Narrative Body (المحتوى التشغيلي)</label>
			  <textarea rows={2} value={formData.body_ar} onChange={e => setFormData({...formData, body_ar: e.target.value})} placeholder="المحتوى التشغيلي باللغة العربية..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none text-[#1e2d40] resize-none focus:bg-white focus:border-[#c9a84c] text-right" style={{ direction: 'rtl' }} />
			</div>

			<div className="md:col-span-2">
			  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">GAS API Media Asset Stream Pipeline URL (Paste Drive Link)</label>
			  <input type="url" value={formData.media_url} onChange={e => setFormData({...formData, media_url: e.target.value})} placeholder="https://drive.google.com/file/d/..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono outline-none text-[#1e2d40] focus:bg-white focus:border-[#c9a84c]" />
			</div>

			<div className="md:col-span-2 text-right pt-2">
			  <button type="submit" className="px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all shadow-md cursor-pointer hover:opacity-90" style={{ backgroundColor: '#1e2d40' }}>
				{editingId ? "Commit Updates to Core Storage" : "Deploy Live Asset Instance"}
			  </button>
			</div>
		  </form>
		</div>

		{/* CRUD DATA STORAGE TABLE LEDGER */}
		<div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
		  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
			<h3 className="text-sm font-black uppercase tracking-wider m-0" style={{ color: '#1e2d40' }}>Active Content Manifest Database Ledger</h3>
		  </div>
		  <div className="overflow-x-auto">
			<table className="w-full text-left text-xs border-collapse">
			  <thead>
				<tr className="bg-slate-50 border-b border-slate-200 font-black uppercase tracking-widest" style={{ color: '#c9a84c' }}>
				  <th className="p-4">Module</th>
				  <th className="p-4">Section Key</th>
				  <th className="p-4">Heading Layout (EN / AR)</th>
				  <th className="p-4 text-center">Actions</th>
				</tr>
			  </thead>
			  <tbody className="font-semibold text-slate-600">
				{cmsItems.length === 0 ? (
				  <tr>
					<td colSpan={4} className="p-8 text-center text-slate-400 font-medium">No system records discovered in current matrix.</td>
				  </tr>
				) : (
				  cmsItems.map((item) => (
					<tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors">
					  <td className="p-4 font-black uppercase text-[#1e2d40]">{item.page}</td>
					  <td className="p-4 font-mono font-bold text-slate-400">{item.section_key}</td>
					  <td className="p-4 max-w-sm truncate">
						<div className="font-bold text-[#1e2d40]">{item.title_en || '---'}</div>
						<div className="text-[11px] text-slate-400 font-bold text-right mt-0.5" style={{ direction: 'rtl' }}>{item.title_ar || '---'}</div>
					  </td>
					  <td className="p-4">
						<div className="flex items-center justify-center gap-3">
						  <button onClick={() => handleSelectEdit(item)} className="p-2 bg-slate-100 text-[#1e2d40] border border-slate-200 rounded-xl hover:bg-[#c9a84c] hover:text-white hover:border-transparent transition-all cursor-pointer">
							<Edit3 size={14} />
						  </button>
						  <button onClick={() => handleDeleteItem(item.id)} className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white hover:border-transparent transition-all cursor-pointer">
							<Trash2 size={14} />
						  </button>
						</div>
					  </td>
					</tr>
				  ))
				)}
			  </tbody>
			</table>
		  </div>
		</div>

	  </main>
	</div>
  );
}