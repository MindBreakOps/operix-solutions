import React, { useEffect, useState } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useLanguage } from '../context/LanguageContext';


export default function Services() {
  const { isAr } = useLanguage();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	async function fetchServices() {
	  const { data, error } = await supabase
		.from('operix_cms_content')
		.select('*')
		.eq('page', 'services');

	  if (!error && data) {
		setServicesData(data);
	  }
	  setLoading(false);
	}
	
	fetchServices();
  }, []);

  if (loading) {
	return <div className="text-center py-20 font-bold">Loading Ecosystem Profile...</div>;
  }

  return (
	<div className="services-container">
	  <div className="services-header">
		<h1 className="text-4xl font-black text-[var(--color-navy)]">
		  {isAr ? "خدمات المنظومة الرقمية" : "Our Ecosystem Offerings"}
		</h1>
		<p className="text-slate-500">
		  {isAr ? "حلول تشغيلية فورية متكاملة ومصممة خصيصاً لإدارة عملياتك بذكاء." : "Real-time infrastructure architectures built to manage corporate deployment modules seamlessly."}
		</p>
	  </div>

	  <div className="services-grid">
		{servicesData.map((service) => (
		  <div key={service.id} className="service-card">
			<div>
			  {service.media_url && (
				<img 
				  src={service.media_url} 
				  alt="Dynamic Service Data" 
				  className="service-media"
				  loading="lazy"
				/>
			  )}
			  <h3 className="service-title">
				{isAr ? service.title_ar : service.title_en}
			  </h3>
			  <p className="service-body">
				{isAr ? service.body_ar : service.body_en}
			  </p>
			</div>
		  </div>
		))}
	  </div>
	</div>
  );
}