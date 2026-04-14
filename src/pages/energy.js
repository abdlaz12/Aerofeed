import { useState } from "react";
import { BatteryCharging, Zap, Activity, Clock, AlertTriangle, ZapOff } from "lucide-react";

// Komponen Gauge untuk Desktop
function CircularProgress({ pct, label, charging }) {
  const r = 70; // Ukuran diperbesar untuk desktop
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct <= 20 ? "#EF4444" : "#0891B2";

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative flex items-center justify-center">
        <svg width="180" height="180" viewBox="0 0 180 180" className="transform -rotate-90">
          <circle cx="90" cy="90" r={r} stroke="#F1F5F9" strokeWidth="14" fill="transparent" />
          <circle 
            cx="90" cy="90" r={r} stroke={color} strokeWidth="14" fill="transparent"
            strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-black text-slate-900">{pct}%</span>
          <span className={`text-[10px] font-black mt-1 ${charging ? 'text-green-500' : 'text-slate-400'}`}>
            {charging ? "● CHARGING" : "● STANDBY"}
          </span>
        </div>
      </div>
      <p className="mt-4 text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}

export default function EnergyPage() {
  const [survival, setSurvival] = useState(true);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Power Management</h1>
          <p className="text-slate-500 font-medium">Monitoring battery health and emergency protocols.</p>
        </div>
        <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-2xl flex items-center gap-2 text-green-600 font-bold text-sm">
          <Zap size={18} /> Power: ON
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Gauges Section */}
        <section className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex justify-around items-center">
          <CircularProgress pct={85} label="Main Unit Battery" charging={true} />
          <div className="w-px h-32 bg-slate-100" />
          <CircularProgress pct={60} label="Backup UPS System" charging={false} />
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 gap-4">
          {[
            { icon: Zap, val: "220 V", label: "Voltage Input", bg: "bg-cyan-50", col: "text-cyan-600" },
            { icon: Activity, val: "12 W", label: "Current Draw", bg: "bg-purple-50", col: "text-purple-600" },
            { icon: Clock, val: "48 h", label: "System Uptime", bg: "bg-amber-50", col: "text-amber-600" }
          ].map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] flex items-center gap-5 border border-slate-100 shadow-sm">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg} ${s.col}`}>
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-slate-900 text-xl font-black">{s.val}</p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{s.label}</p>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Survival Mode Control */}
        <section className={`rounded-[2.5rem] p-8 border-2 transition-all bg-white
          ${survival ? 'border-amber-200 shadow-xl shadow-amber-50' : 'border-slate-50'}`}>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertTriangle size={32} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-slate-900 text-xl font-black">Survival Mode</h3>
                <button 
                  onClick={() => setSurvival(!survival)}
                  className={`w-14 h-8 rounded-full relative transition-colors ${survival ? 'bg-cyan-600' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full transition-all ${survival ? 'left-[30px]' : 'left-1.5'}`} />
                </button>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Protects your fish during power outages. If battery drops below 20%, feeding is disabled to prioritize the aerator.
              </p>
              {survival && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-xs font-bold italic">
                   ● Active — watching power source
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Power History Logs */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-slate-50 flex items-center gap-3 bg-slate-50/50">
            <ZapOff size={18} className="text-slate-400" />
            <h3 className="text-slate-800 text-sm font-black uppercase tracking-widest">Incident History</h3>
          </div>
          <div className="divide-y divide-slate-50 max-h-[250px] overflow-y-auto">
            {[
              { title: "Power went OFF", time: "Today, 10:00 AM", dur: "45 min", type: "off" },
              { title: "Power came back", time: "Today, 10:45 AM", type: "on" },
              { title: "Battery was low", time: "Yesterday, 8:30 PM", type: "low" }
            ].map((log, i) => (
              <div key={i} className="px-8 py-5 flex items-center gap-4 hover:bg-slate-50/30">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${log.type === 'off' ? 'bg-red-50 text-red-500' : log.type === 'on' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
                  {log.type === 'off' ? <ZapOff size={18} /> : log.type === 'on' ? <Zap size={18} /> : <AlertTriangle size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 text-sm font-bold">{log.title}</p>
                  <p className="text-slate-400 text-[11px] font-medium">{log.time}</p>
                </div>
                {log.dur && (
                  <span className="bg-red-50 text-red-500 text-[10px] font-black px-3 py-1 rounded-lg italic">{log.dur}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}