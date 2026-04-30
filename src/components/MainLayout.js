// src/components/MainLayout.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen relative overflow-x-hidden">

      {/* ── HAMBURGER: muncul hanya di mobile/tablet ── */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open menu"
        className="lg:hidden fixed top-5 left-5 z-[60] bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-slate-600 hover:text-cyan-600 transition-colors no-min-height"
      >
        <Menu size={22} />
      </button>

      {/* ── SIDEBAR ── */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* ── OVERLAY (mobile) ── */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── MAIN CONTENT ── */}
      {/* 
        - pt-20: ruang untuk hamburger button di mobile
        - lg:pt-0: tidak perlu di desktop karena sidebar selalu tampil
        - pb-8: padding bawah aman
        - lg:ml-64: geser konten ke kanan sejauh lebar sidebar di desktop
      */}
      <main className="flex-1 lg:ml-64 min-w-0 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 lg:pt-10 pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}