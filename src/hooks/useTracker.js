import { useEffect } from 'react';
import { supabaseClient as supabase } from '../config/supabase';

export function useTracker() {
  useEffect(() => {
	async function trackVisitor() {
	  try {
		const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
		const data = await response.json();
		const countryCode = data.country_code || 'SA';

		// Capture the current browser path
		const currentPage = window.location.pathname;

		const { error } = await supabase
		  .from('operix_visitor_logs')
		  .insert([{ 
			ip_country: countryCode, 
			page_visited: currentPage, // Now providing the required field
			created_at: new Date().toISOString() 
		  }]);

		if (error) console.error("Tracker Insert Error:", error.message);
	  } catch (err) {
		console.error("Tracker Failure:", err.message);
	  }
	}
	trackVisitor();
  }, []);
}