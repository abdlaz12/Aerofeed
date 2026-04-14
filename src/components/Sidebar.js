import { LayoutDashboard, CalendarClock, BatteryCharging, UserCircle2, Bell, LogOut } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { name: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Schedule', icon: CalendarClock, path: '/schedule' },
    { name: 'Power', icon: BatteryCharging, path: '/energy' },
    { name: 'Profile', icon: UserCircle2, path: '/profile' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col p-6 z-50">
      {/* Brand Logo (image_489723.png) */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-cyan-100">A</div>
        <div>
          <h1 className="text-slate-900 font-bold leading-none tracking-tight">AeroFeed</h1>
          <span className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest">Lite Edition</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-2">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 px-2">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = router.pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all cursor-pointer relative ${
                isActive ? 'bg-cyan-50 text-cyan-600 shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-sm ${isActive ? 'font-black' : 'font-bold'}`}>{item.name}</span>
                {isActive && (
                  <div className="absolute right-0 w-1.5 h-6 bg-cyan-600 rounded-l-full shadow-[0_0_10px_rgba(8,145,178,0.5)]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Card (image_489a4c.jpg) */}
      <div className="mt-auto">
        <div className="p-4 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center gap-3 relative overflow-hidden group">
          <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white font-black text-xs shadow-sm">AZ</div>
          <div className="overflow-hidden">
            <p className="text-slate-900 font-bold text-xs truncate">Abdul Aziz</p>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-tighter italic">PRO Plan Recipient</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-green-500 border-2 border-white shadow-sm ring-4 ring-green-500/10" />
        </div>
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 text-red-400 hover:text-red-500 text-xs font-bold transition-colors">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </aside>
  );
}