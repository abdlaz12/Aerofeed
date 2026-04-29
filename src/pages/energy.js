import { useState } from "react";
import { BatteryCharging, Zap, Activity, Clock, AlertTriangle, ZapOff } from "lucide-react";
import ProtectedRoute from '../components/ProtectedRoute';
// Komponen Gauge Responsif
function CircularProgress({ pct, label, charging }) {
  const r = 65; 
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct <= 20 ? "#EF4444" : "#0891B2";

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative flex items-center justify-center">
        {/* Ukuran SVG mengecil di Mobile (w-32) dan membesar di Desktop (md:w-44) */}
        <svg viewBox="0 0 180 180" className="transform -rotate-90 w-32 h-32 md:w-44 md:h-44">
          <circle cx="90" cy="90" r={r} stroke="#F1F5F9" strokeWidth="14" fill="transparent" />
          <circle 
            cx="90" cy="90" r={r} stroke={color} strokeWidth="14" fill="transparent"
            strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl md:text-4xl font-black text-slate-900">{pct}%</span>
          <span className={`text-[8px] md:text-[10px] font-black mt-1 ${charging ? 'text-green-500' : 'text-slate-400'}`}>
            {charging ? "● CHARGING" : "● STANDBY"}
          </span>
        </div>
      </div>
      <p className="mt-4 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest text-center">{label}</p>
    </div>
  );
}

export default function EnergyPage() {
  const [survival, setSurvival] = useState(true);

  return (
    <ProtectedRoute>
    <div className="space-y-6 md:space-y-8 pb-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">Power Management</h1>
          <p className="text-slate-500 text-sm font-medium">Monitoring battery health and emergency protocols.</p>
        </div>
        <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-2xl flex items-center gap-2 text-green-600 font-bold text-xs md:text-sm shadow-sm">
          <Zap size={16} /> Power: ON
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Gauges Section - Stack di mobile, Row di desktop */}
        <section className="lg:col-span-2 bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-around items-center gap-8">
          <CircularProgress pct={85} label="Main Unit Battery" charging={true} />
          <div className="hidden sm:block w-px h-32 bg-slate-100" />
          <CircularProgress pct={60} label="Backup UPS System" charging={false} />
        </section>

        {/* Quick Stats Grid - 2 Kolom di mobile, 1 Kolom di desktop */}
        <section className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {[
            { icon: Zap, val: "220 V", label: "Voltage Input", bg: "bg-cyan-50", col: "text-cyan-600" },
            { icon: Activity, val: "12 W", label: "Current Draw", bg: "bg-purple-50", col: "text-purple-600" },
            { icon: Clock, val: "48 h", label: "System Uptime", bg: "bg-amber-50", col: "text-amber-600" },
            { icon: AlertTriangle, val: "Good", label: "Health", bg: "bg-green-50", col: "text-green-600" }
          ].map((s, i) => (
            <div key={i} className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-3 md:gap-5 border border-slate-100 shadow-sm text-center sm:text-left">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${s.bg} ${s.col}`}>
                <s.icon size={20} />
              </div>
              <div className="overflow-hidden">
                <p className="text-slate-900 text-lg md:text-xl font-black">{s.val}</p>
                <p className="text-slate-400 text-[9px] md:text-xs font-bold uppercase tracking-widest truncate">{s.label}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Survival Mode Control */}
        <section className={`rounded-[2.5rem] p-6 md:p-8 border-2 transition-all bg-white
          ${survival ? 'border-amber-200 shadow-xl shadow-amber-50' : 'border-slate-50'}`}>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <AlertTriangle size={28} />
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-slate-900 text-lg md:text-xl font-black">Survival Mode</h3>
                <button 
                  onClick={() => setSurvival(!survival)}
                  className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ${survival ? 'bg-cyan-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${survival ? 'left-[24px]' : 'left-1'}`} />
                </button>
              </div>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-4">
                Protects your fish during power outages. If battery drops below 20%, feeding is disabled to prioritize the aerator.
              </p>
              {survival && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-xl text-[10px] font-bold italic">
                    ● Active — watching power source
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Power History Logs */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-6 md:px-8 py-4 md:py-5 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
            <ZapOff size={16} className="text-slate-400" />
            <h3 className="text-slate-800 text-[10px] md:text-sm font-black uppercase tracking-widest">Incident History</h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[300px] overflow-y-auto">
            {[
              { title: "Power went OFF", time: "Today, 10:00 AM", dur: "45 min", type: "off" },
              { title: "Power came back", time: "Today, 10:45 AM", type: "on" },
              { title: "Battery was low", time: "Yesterday, 8:30 PM", type: "low" }
            ].map((log, i) => (
              <div key={i} className="px-6 md:px-8 py-4 md:py-5 flex items-center gap-4 hover:bg-slate-50/30 transition-colors">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                  ${log.type === 'off' ? 'bg-red-50 text-red-500' : log.type === 'on' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
                  {log.type === 'off' ? <ZapOff size={18} /> : log.type === 'on' ? <Zap size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-xs md:text-sm font-bold truncate">{log.title}</p>
                  <p className="text-slate-400 text-[10px] font-medium">{log.time}</p>
                </div>
                {log.dur && (
                  <span className="bg-red-50 text-red-500 text-[8px] md:text-[10px] font-black px-2 py-1 rounded-md italic shrink-0">{log.dur}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </ProtectedRoute>
  );
}