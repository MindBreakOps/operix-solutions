import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabaseClient as supabase } from '../config/supabase';

export function useTracker() {
  const location = useLocation();

  useEffect(() => {
	async function trackVisitorSignature() {
	  // Establish default values in case the api fetch gets blocked
	  let countryCode = 'SA';
	  let clientIp = '0.0.0.0';

	  try {
		const geoResponse = await fetch('https://ipapi.co/json/');
		if (geoResponse.ok) {
		  const geoData = await geoResponse.json();
		  countryCode = geoData.country_code || 'SA';
		  clientIp = geoData.ip || '0.0.0.0';
		}
	  } catch (err) {
		// Quietly catch the block without showing unhandled errors in the console
		console.log("Privacy shield detected. Using default telemetry routing alignment.");
	  }

	  // Proceed with writing to Supabase using either live data or safe fallbacks
	  try {
		await supabase.from('operix_visitor_logs').insert([{
		  page_visited: location.pathname,
		  ip_country: countryCode,
		  visitor_ip: clientIp,
		  user_agent: navigator.userAgent
		}]);
	  } catch (dbErr) {
		console.error("Telemetry database write error:", dbErr.message);
	  }
	}

	trackVisitorSignature();
  }, [location]);
}