// src/components/MainLayout.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, X } from 'lucide-react';

export default function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen relative">
      {/* Tombol Menu Mobile (Hanya muncul di layar kecil) */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-[60] bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-slate-600"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar dengan props untuk handle mobile state */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Overlay Hitam saat Sidebar terbuka di mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Konten Utama: ml-0 di mobile, ml-64 di desktop */}
      <main className="flex-1 lg:ml-64 p-6 md:p-10 transition-all duration-300">
        <div className="max-w-6xl mx-auto pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}