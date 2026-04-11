import {
  UserCircle2, Wifi, Shield, CreditCard, Bell,
  ChevronRight, LogOut, HelpCircle, Star, Fish,
  Smartphone, CheckCircle2, Settings, LayoutDashboard, CalendarClock, BatteryCharging
} from "lucide-react";
import Link from 'next/link';

// Data groups (Plain JS)
const groups = [
  {
    title: "My Device",
    rows: [
      { icon: Wifi,        label: "Device",       sub: "AeroFeed Unit A1",        value: "Connected", iconBg: "#E0F7FA", iconColor: "#0891B2" },
      { icon: Fish,        label: "Feed Type",     sub: "Pellet dispenser",        value: "Active",    iconBg: "#E0F7FA", iconColor: "#0891B2" },
      { icon: Smartphone,  label: "App Version",   sub: "AeroFeed Lite v2.4.1",    value: "Latest",    iconBg: "#F3F4F6", iconColor: "#6B7280" },
    ],
  },
  {
    title: "My Account",
    rows: [
      { icon: CreditCard,  label: "Subscription",  sub: "Renews June 2026",        badge: "PRO",    iconBg: "#E0F7FA", iconColor: "#0891B2" },
      { icon: Shield,      label: "Security",       sub: "Two-factor login on",     value: "Secure", iconBg: "#F0FDF4", iconColor: "#16A34A" },
      { icon: Bell,        label: "Notifications",  sub: "Feed alerts & power alerts", value: "On", iconBg: "#FEF3C7", iconColor: "#D97706" },
    ],
  },
  {
    title: "Help",
    rows: [
      { icon: HelpCircle,  label: "Help Center",    sub: "How to use AeroFeed",     iconBg: "#F3F4F6", iconColor: "#6B7280" },
      { icon: Star,        label: "Rate the App",   sub: "Tell us what you think",  iconBg: "#FEF3C7", iconColor: "#D97706" },
      { icon: Settings,    label: "Advanced",       sub: "For tech-savvy users",    iconBg: "#F3E8FF", iconColor: "#7C3AED" },
    ],
  },
];

export default function Profile() {
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F0F4F8] font-sans shadow-2xl relative overflow-hidden">
      
      {/* ── AREA UTAMA (Scrollable) ── */}
      <div className="flex-1 overflow-y-auto pb-32 px-4 pt-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-0.5">
            <UserCircle2 size={20} className="text-[#0891B2]" />
            <h1 className="text-[#111827] text-[22px] font-bold">My Profile</h1>
          </div>
          <p className="text-[#6B7280] text-[13px]">Settings & subscription</p>
        </div>

        {/* Profile card */}
        <div
          className="rounded-[32px] p-5 mb-5 text-white shadow-[0_8px_24px_rgba(8,145,178,0.28)] bg-gradient-to-br from-[#0891B2] to-[#06B6D4]"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/20 border-2 border-white/60"
              >
                <span className="text-white text-[26px] font-black uppercase">AZ</span>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-[#22C55E] border-2 border-white"
              >
                <CheckCircle2 size={11} className="text-white" />
              </div>
            </div>

            <div>
              <p className="text-[18px] font-black tracking-tight">Abdul Aziz</p>
              <p className="text-white/80 text-[12px]">aziz@aerofeed.id</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/25">★ PRO</span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-green-500/20 border border-green-400/50">Active Plan</span>
              </div>
            </div>
          </div>

          <div className="flex mt-6 pt-4 border-t border-white/20 font-sans">
            {[
              { val: "Aerofeed Farm", lbl: "Farm Name" },
              { val: "5",             lbl: "Ponds"     },
              { val: "2 Units",       lbl: "Devices"   },
            ].map((s, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-[15px] font-black">{s.val}</p>
                <p className="text-white/70 text-[11px] font-medium uppercase tracking-wider">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Setting groups */}
        {groups.map((grp, gi) => (
          <div key={gi} className="mb-4">
            <p className="text-[#9CA3AF] text-[11px] font-extrabold uppercase tracking-widest mb-2 pl-1">
              {grp.title}
            </p>
            <div className="rounded-2xl overflow-hidden bg-white border border-[#F3F4F6] shadow-sm">
              {grp.rows.map((row, ri) => (
                <button 
                  key={ri} 
                  className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-gray-50 active:bg-gray-100 border-b border-[#F9FAFB] last:border-none"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: row.iconBg }}>
                    <row.icon size={17} style={{ color: row.iconColor }} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[#111827] text-[14px] font-bold">{row.label}</p>
                    <p className="text-[#9CA3AF] text-[11px]">{row.sub}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {row.badge && ( <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#E0F7FA] text-[#0891B2] font-bold"> {row.badge} </span> )}
                    {row.value && ( <span className="text-[#9CA3AF] text-[12px] font-medium">{row.value}</span> )}
                    <ChevronRight size={16} className="text-[#D1D5DB]" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl mt-2 bg-red-50 border border-red-100 text-red-500 font-bold hover:bg-red-100 transition-colors">
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>

      </div> {/* Penutup area scrollable */}

      {/* ── NAVIGASI BAWAH ── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-3">
        <div className="flex items-center justify-around">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
            <LayoutDashboard size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF] font-medium">Home</span>
          </Link>
          <Link href="/schedule" className="flex flex-col items-center gap-1 group">
            <CalendarClock size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF] font-medium">Schedule</span>
          </Link>
          <Link href="/energy" className="flex flex-col items-center gap-1 group">
            <BatteryCharging size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF] font-medium">Power</span>
          </Link>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#E0F7FA] p-2 rounded-xl">
              <UserCircle2 size={22} className="text-[#0891B2]" />
            </div>
            <span className="text-[10px] text-[#0891B2] font-bold">Profile</span>
          </div>
        </div>
      </nav>

    </div>
  );
}