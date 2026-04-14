import {
  UserCircle2, Wifi, Shield, CreditCard, Bell,
  ChevronRight, LogOut, HelpCircle, Star, Fish,
  Smartphone, CheckCircle2, Settings, Award, Globe
} from "lucide-react";
import Link from 'next/link';

// Data groups (Organized for Desktop View)
const groups = [
  {
    title: "My Device",
    rows: [
      { icon: Wifi,        label: "Device Status", sub: "AeroFeed Unit A1",        value: "Connected", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      { icon: Fish,        label: "Feed System",   sub: "Pellet dispenser active",  value: "Ready",     iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      { icon: Smartphone,  label: "Software",      sub: "AeroFeed Desktop v2.4.1", value: "Up to date", iconBg: "bg-slate-100", iconColor: "text-slate-500" },
    ],
  },
  {
    title: "Account & Security",
    rows: [
      { icon: CreditCard,  label: "Subscription",  sub: "Renews June 10, 2026",    badge: "PRO",    iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      { icon: Shield,      label: "Two-Factor",    sub: "Biometric login active",  value: "Secure", iconBg: "bg-green-50", iconColor: "text-green-600" },
      { icon: Bell,        label: "Alerts",        sub: "Push & Email notifications", value: "On",     iconBg: "bg-amber-50", iconColor: "text-amber-600" },
    ],
  },
  {
    title: "Support",
    rows: [
      { icon: HelpCircle,  label: "Knowledge Base", sub: "Tutorials & API Docs",    iconBg: "bg-slate-100", iconColor: "text-slate-500" },
      { icon: Star,        label: "Feedback",       sub: "Help us improve AeroFeed", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
      { icon: Settings,    label: "Advanced",       sub: "Developer mode & Webhooks", iconBg: "bg-purple-50", iconColor: "text-purple-600" },
    ],
  },
];

export default function Profile() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* ── HEADER ── */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 font-medium">Manage your farm profile and device preferences.</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ── LEFT: PROFILE CARD ── */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-[3rem] p-8 text-white shadow-xl shadow-cyan-100 relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-[2rem] bg-white/20 border-4 border-white/40 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl font-black">AZ</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-green-500 border-4 border-white flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-black mb-1 tracking-tight">Abdul Aziz</h2>
              <p className="text-cyan-100 text-sm font-medium mb-4">aziz@aerofeed.id</p>
              
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10">★ PRO USER</span>
                <span className="px-3 py-1 bg-green-500/30 rounded-full text-[10px] font-black tracking-widest uppercase border border-green-400/30">Active</span>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/5">
                <Award size={20} className="text-amber-300" />
                <p className="text-[10px] font-bold leading-tight">Canada-ASEAN SEED Scholar 2026</p>
              </div>
            </div>

            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-3xl">
              <p className="text-2xl font-black text-slate-900">2</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Units</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-3xl">
              <p className="text-2xl font-black text-slate-900">5</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ponds</p>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 rounded-[2rem] bg-red-50 text-red-500 font-black text-sm hover:bg-red-100 transition-all border border-red-100/50">
            <LogOut size={18} /> Sign Out from AeroFeed
          </button>
        </div>

        {/* ── RIGHT: SETTINGS GROUPS ── */}
        <div className="lg:col-span-2 space-y-6">
          {groups.map((grp, gi) => (
            <div key={gi} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/30">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{grp.title}</p>
              </div>
              <div className="divide-y divide-slate-50">
                {grp.rows.map((row, ri) => (
                  <button key={ri} className="w-full flex items-center gap-4 px-8 py-5 hover:bg-slate-50/50 transition-colors group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${row.iconBg} ${row.iconColor} shadow-sm`}>
                      <row.icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900 text-sm font-black">{row.label}</p>
                      <p className="text-slate-400 text-[11px] font-medium">{row.sub}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {row.badge && ( <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-black rounded-lg"> {row.badge} </span> )}
                      {row.value && ( <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">{row.value}</span> )}
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
  );
}