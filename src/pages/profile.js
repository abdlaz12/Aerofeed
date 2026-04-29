import {
  UserCircle2, Wifi, Shield, CreditCard, Bell,
  ChevronRight, LogOut, HelpCircle, Star, Fish,
  Smartphone, CheckCircle2, Settings, Award, Globe, Activity
} from "lucide-react";
import Link from 'next/link';

// Data groups (Organized for Responsive View)
const groups = [
  {
    title: "My Device",
    rows: [
      { icon: Wifi, label: "Device Status", sub: "AeroFeed Unit A1", value: "Connected", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      { icon: Fish, label: "Feed System", sub: "Pellet dispenser active", value: "Ready", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
    ],
  },
  {
    title: "Account & Security",
    rows: [
      { icon: CreditCard, label: "Subscription", sub: "Renews June 10, 2026", badge: "PRO", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      { icon: Bell, label: "Alerts", sub: "Push & Email notifications", value: "On", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    ],
  },
  {
    title: "Support",
    rows: [
      { icon: HelpCircle, label: "Contact Us", sub: "For Help and Information", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
    ],
  },
];

export default function Profile() {
  return (
    <ProtectedRoute>
    <div className="space-y-6 md:space-y-8 pb-10 px-1 md:px-0">
      
      {/* ── HEADER ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">Account Settings</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your farm profile and device preferences.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
        
        {/* ── LEFT: PROFILE CARD ── */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2.5rem] bg-cyan-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-cyan-900/20">
                  AZ
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-green-500 border-4 border-slate-900 flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black mb-1 tracking-tight">Abdul Aziz</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Software Engineering</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1.5 bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase border border-white/5 backdrop-blur-md">PRO Plan</span>
                <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-xl text-[9px] font-black tracking-widest uppercase border border-green-500/20">Active User</span>
              </div>
            </div>

            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
          </div>

          {/* Quick Stats Grid */}
          <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
            <div className="text-center p-5 bg-slate-50/50 rounded-3xl border border-slate-50">
              <p className="text-2xl font-black text-slate-900">2</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Devices</p>
            </div>
            <div className="text-center p-5 bg-slate-50/50 rounded-3xl border border-slate-50">
              <p className="text-2xl font-black text-slate-900">5</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Ponds</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 md:py-5 rounded-[2rem] bg-white text-red-500 font-black text-sm hover:bg-red-50 transition-all border border-red-50 shadow-sm">
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        {/* ── RIGHT: SETTINGS GROUPS ── */}
        <div className="lg:col-span-2 space-y-6">
          {groups.map((grp, gi) => (
            <div key={gi} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/20">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-none">{grp.title}</p>
              </div>
              <div className="divide-y divide-slate-50">
                {grp.rows.map((row, ri) => (
                  <button key={ri} className="w-full flex items-center gap-4 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all group">
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 ${row.iconBg} ${row.iconColor} shadow-sm group-hover:scale-105 transition-transform`}>
                      <row.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-slate-900 text-sm font-black truncate">{row.label}</p>
                      <p className="text-slate-400 text-[10px] md:text-[11px] font-medium truncate">{row.sub}</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 shrink-0">
                      {row.badge && ( <span className="px-3 py-1 bg-cyan-600 text-white text-[9px] font-black rounded-lg shadow-lg shadow-cyan-100"> {row.badge} </span> )}
                      {row.value && ( <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-tighter">{row.value}</span> )}
                      <ChevronRight size={18} className="text-slate-200 group-hover:text-cyan-600 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </ProtectedRoute>
  );
}