import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTracker } from '../hooks/useTracker'; // Import analytics engine
import Navbar from './Navbar';
import Footer from './Footer';

export default function GlobalLayout() {
  useTracker(); // Tracks every path change directly across public portals

  return (
	<div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
	  <Navbar />
	  <main className="flex-grow">
		<Outlet />
	  </main>
	  <Footer />
	</div>
  );
}