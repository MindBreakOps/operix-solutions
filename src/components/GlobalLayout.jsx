import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTracker } from '../hooks/useTracker'; // Import analytics engine
import Navbar from './Navbar';
import Footer from './Footer';

export default function GlobalLayout() {
  useTracker(); // Tracks every path change directly across public portals

  return (
	<div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1e2d40] font-sans relative">
	  
	  {/* ─── GLOBAL FIXED BACKGROUND WATERMARK ─── */}
	  <div 
		className="fixed inset-0 z-0 opacity-5 pointer-events-none"
		style={{ 
		  /* Make sure the extension matches your file perfectly (.jpg or .jpeg) */
		  backgroundImage: 'url(/projects/operix-bg.jpg)', 
		  backgroundSize: 'cover', 
		  backgroundPosition: 'center',
		  backgroundRepeat: 'no-repeat'
		}}
	  ></div>

	  {/* ─── FOREGROUND APPLICATION CONTENT ─── */}
	  <div className="relative z-10 flex flex-col min-h-screen">
		<Navbar />
		<main className="flex-grow w-full">
		  <Outlet />
		</main>
		<Footer />
	  </div>
	  
	</div>
  );
}