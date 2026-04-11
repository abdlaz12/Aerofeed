import { useState } from "react";
import { 
  BatteryCharging, Zap, ZapOff, AlertTriangle, Clock, Activity,
  LayoutDashboard, CalendarClock, UserCircle2 
} from "lucide-react";
import Link from 'next/link';

// Komponen Kecil untuk Grafik Bulat (image_9796a9.png)
function CircularProgress({ pct, label, sub, charging }) {
  const r = 60;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct <= 20 ? "#EF4444" : "#0891B2"; // Merah jika low, Cyan jika oke

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 150 150" className="transform -rotate-90">
        <circle cx="75" cy="75" r={r} stroke="#F3F4F6" strokeWidth="12" fill="transparent" />
        <circle 
          cx="75" cy="75" r={r} stroke={color} strokeWidth="12" fill="transparent"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center mt-10">
        <span className="text-3xl font-black text-[#111827] leading-none">{pct}%</span>
        <span className="text-[10px] text-[#6B7280] font-bold uppercase mt-1">{label}</span>
        <span className={`text-[10px] font-bold mt-1 ${charging ? 'text-[#22C55E]' : 'text-[#9CA3AF]'}`}>
          {charging ? "● Charging" : "● Standby"}
        </span>
      </div>
    </div>
  );
}

export default function EnergyPage() {
  const [survival, setSurvival] = useState(true);

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F0F4F8] font-sans shadow-2xl relative overflow-hidden">
      
      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-8">
        
        {/* Header (image_9796a9.png) */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BatteryCharging size={24} className="text-[#0891B2]" />
              <h1 className="text-[#111827] text-[24px] font-bold">Power Status</h1>
            </div>
            <p className="text-[#6B7280] text-[14px]">Check battery and power settings</p>
          </div>
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span className="text-[#16A34A] text-[12px] font-bold">Power: ON</span>
          </div>
        </header>

        {/* Gauges Section (image_9796a9.png) */}
        <section className="bg-white rounded-[32px] p-6 mb-4 flex items-center justify-around shadow-sm border border-[#F3F4F6]">
          <div className="relative flex justify-center items-center">
            <CircularProgress pct={80} label="Main Battery" charging={true} />
          </div>
          <div className="w-px h-24 bg-[#F3F4F6]" />
          <div className="relative flex justify-center items-center">
            <CircularProgress pct={65} label="Backup (UPS)" charging={false} />
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: Zap, val: "220 V", label: "Voltage", bg: "#E0F7FA", col: "#0891B2" },
            { icon: Activity, val: "12 W", label: "Power Use", bg: "#F3E8FF", col: "#7C3AED" },
            { icon: Clock, val: "48 h", label: "Uptime", bg: "#FEF3C7", col: "#D97706" }
          ].map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl flex flex-col items-center border border-[#F3F4F6] shadow-sm text-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2`} style={{ background: s.bg }}>
                <s.icon size={18} style={{ color: s.col }} />
              </div>
              <p className="text-[#111827] text-[14px] font-black leading-none">{s.val}</p>
              <p className="text-[#9CA3AF] text-[10px] mt-1 font-bold">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Survival Mode Card (image_9796c7.png) */}
        <section className={`rounded-[24px] p-5 mb-4 border-2 transition-all duration-300 bg-white
          ${survival ? 'border-[#FCD34D] shadow-[0_4px_20px_rgba(245,158,11,0.1)]' : 'border-transparent opacity-80'}`}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706] shrink-0">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[#111827] text-base font-bold">Survival Mode</h3>
                {/* Custom Toggle */}
                <button 
                  onClick={() => setSurvival(!survival)}
                  className={`w-12 h-7 rounded-full relative transition-colors duration-300
                    ${survival ? 'bg-[#0891B2]' : 'bg-[#D1D5DB]'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300
                    ${survival ? 'translate-x-6' : 'translate-x-1'}`} 
                  />
                </button>
              </div>
              <p className="text-[#6B7280] text-[13px] leading-relaxed">
                When battery drops below <span className="text-[#D97706] font-bold">20%</span>, feeding stops but aerator keeps running.
              </p>
              {survival && (
                <div className="mt-3 bg-[#F0FDF4] border border-[#BBF7D0] py-2 px-3 rounded-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  <span className="text-[#16A34A] text-[11px] font-bold italic">Active — watching battery level</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Power History (image_9796c7.png) */}
        <section className="bg-white rounded-[24px] border border-[#F3F4F6] overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-[#F9FAFB] flex items-center gap-2">
            <ZapOff size={16} className="text-[#6B7280]" />
            <h3 className="text-[#111827] text-sm font-bold">Power History</h3>
          </div>
          <div className="divide-y divide-[#F9FAFB]">
            {[
              { title: "Power went OFF", time: "Today, 10:00 AM", dur: "45 min", type: "off" },
              { title: "Power came back", time: "Today, 10:45 AM", dur: null, type: "on" },
              { title: "Battery was low", time: "Yesterday, 8:30 PM", dur: null, type: "low" }
            ].map((log, i) => (
              <div key={i} className="px-5 py-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                  ${log.type === 'off' ? 'bg-[#FEF2F2] text-[#EF4444]' : log.type === 'on' ? 'bg-[#F0FDF4] text-[#22C55E]' : 'bg-[#FEF3C7] text-[#D97706]'}`}>
                  {log.type === 'off' ? <ZapOff size={16} /> : log.type === 'on' ? <Zap size={16} /> : <AlertTriangle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-[#111827] text-[13px] font-bold leading-none mb-1">{log.title}</p>
                  <p className="text-[#9CA3AF] text-[11px]">{log.time}</p>
                </div>
                {log.dur && (
                  <span className="bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold px-2 py-1 rounded-lg">{log.dur}</span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ── BOTTOM NAV (Statis) ── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-3">
        <div className="flex justify-around items-center">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
            <LayoutDashboard size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Home</span>
          </Link>
          <Link href="/schedule" className="flex flex-col items-center gap-1 group">
            <CalendarClock size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Schedule</span>
          </Link>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#E0F7FA] p-2 rounded-xl">
              <BatteryCharging size={22} className="text-[#0891B2]" />
            </div>
            <span className="text-[10px] text-[#0891B2] font-bold">Power</span>
          </div>
          <Link href="/profile" className="flex flex-col items-center gap-1 group">
            <UserCircle2 size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}