import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTracker } from '../hooks/useTracker'; 
import Navbar from './Navbar'; // Fixed import path
import Footer from './Footer'; // Fixed import path

export default function GlobalLayout() {
  useTracker(); 

  return (
	<div className="min-h-screen flex flex-col bg-[#f8fafc] text-[#1e2d40] font-sans w-full overflow-x-hidden">
	  <Navbar />
	  
	  {/* Removed the collapsing h-full wrapper. 
		This allows your pages to render their natural height perfectly. 
	  */}
	  <main className="flex-grow w-full flex flex-col">
		<Outlet />
	  </main>
	  
	  <Footer />
	</div>
  );
}