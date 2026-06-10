import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseClient as supabase } from '../config/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [pendingLogin, setPendingLogin] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
	let mounted = true;
  
	// ─── THE GLOBAL SECURITY GATEKEEPER (X-RAY MODE) ───
const verifyAndSetSession = async (currentSession) => {
	  if (!currentSession) {
		if (mounted) {
		  setSession(null); setUser(null); setLoading(false);
		}
		return;
	  }
	
	  try {
		// 1. Fetch from our isolated website admin table
		const { data: adminData, error: adminError } = await supabase
		  .from('operix_website_admins')
		  .select('*')
		  .eq('email', currentSession.user.email)
		  .maybeSingle();
	
		if (adminError) throw new Error(`[DB Error]: ${adminError.message}`);
		
		// If they aren't in our website admin whitelist, kick them out cleanly
		if (!adminData) {
		  await supabase.auth.signOut();
		  throw new Error(`[Access Denied]: ${currentSession.user.email} is not authorized to manage this website.`);
		}
	
		// 2. PASSED ALL CHECKS!
		if (mounted) {
		  setSession(currentSession);
		  setUser(currentSession.user);
		  setAuthError(''); 
		  setLoading(false);
		  
		  // If they are on a login page, send them to the hidden dashboard
		  if (window.location.pathname === '/cms-login') {
			navigate('/admindashboard', { replace: true });
		  }
		}
	
	  } catch (err) {
		console.error("Website Security Block:", err.message);
		if (mounted) {
		  setSession(null); 
		  setUser(null);
		  setAuthError(err.message); 
		  setLoading(false);
		  navigate('/cms-login', { replace: true }); 
		}
	  }
	};
  
	// 1. Check active session on initial app load
	supabase.auth.getSession().then(({ data: { session } }) => {
	  verifyAndSetSession(session);
	});
  
	// 2. Listen for Auth changes
	const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
	  if (event === 'SIGNED_OUT') {
		setSession(null);
		setUser(null);
		navigate('/cms-login', { replace: true });
	  } else if (event === 'SIGNED_IN') {
		setLoading(true);
		verifyAndSetSession(newSession);
	  }
	});
  
	return () => {
	  mounted = false;
	  subscription?.unsubscribe();
	};
  }, [navigate]);

  const login = async (email, password) => {
	setIsAuthenticating(true);
	setAuthError('');
	try {
	  const { error } = await supabase.auth.signInWithPassword({ email, password });
	  if (error) throw error;
	} catch (err) {
	  setAuthError(err.message);
	} finally {
	  setIsAuthenticating(false);
	}
  };

  const logout = async () => {
	await supabase.auth.signOut();
  };

  return (
	<AuthContext.Provider value={{ 
	  user, 
	  session, 
	  loading, 
	  login, 
	  logout,
	  isAuthenticating,
	  authError,
	  pendingLogin 
	}}>
	  {!loading && children}
	</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);