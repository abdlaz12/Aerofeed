// src/components/Sidebar.js
import { X, LayoutDashboard, CalendarClock, BatteryCharging, UserCircle2, LogOut } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar({ isOpen, onClose }) {
  const router = useRouter();

  const menuItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Schedule', icon: CalendarClock, path: '/schedule' },
    { name: 'Power', icon: BatteryCharging, path: '/energy' },
    { name: 'Profile', icon: UserCircle2, path: '/profile' },
  ];

  const handleLogout = () => {
  // 1. Hapus data user dari localStorage
  localStorage.removeItem('user');
  
  // 2. Arahkan pengguna kembali ke halaman login
  router.push('/login');
};

  return (
    <aside className={`
      fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-[100]
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:translate-x-0 lg:w-64
    `}>
      {/* Tombol Close di Mobile */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-8 right-6 text-slate-400 hover:text-slate-900 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Brand Logo */}
      <div className="flex items-center gap-3 mb-16">
        <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-cyan-100">A</div>
        <div>
          <h1 className="text-slate-900 font-bold leading-none tracking-tight">AeroFeed</h1>
          <span className="text-cyan-600 text-[10px] font-black uppercase tracking-widest">System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link href={item.path} key={item.name} onClick={onClose}>
              <div className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
                isActive ? 'bg-cyan-50 text-cyan-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-sm ${isActive ? 'font-black' : 'font-bold'}`}>{item.name}</span>
                {isActive && (
                  <div className="absolute right-0 w-1 h-6 bg-cyan-600 rounded-l-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout di bawah */}
      <div className="mt-auto space-y-4">
        <div className="p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black text-xs">AZ</div>
          <div className="overflow-hidden">
            <p className="text-slate-900 font-bold text-xs truncate">Abdul Aziz</p>
            <p className="text-slate-400 text-[9px] font-black uppercase">Standard Plan</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-4 md:py-5 rounded-[2rem] bg-white text-red-500 font-black text-sm hover:bg-red-50 transition-all border border-red-50 shadow-sm">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}