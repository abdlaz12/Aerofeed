import { useState } from "react";
import { CalendarClock, Clock, Trash2, Plus, Sparkles } from "lucide-react";

const initialSchedules = [
  { id: 1, time: "06:00", period: "AM", label: "Morning Feed", portion: "Medium", color: "bg-cyan-50 text-cyan-600", enabled: true },
  { id: 2, time: "12:00", period: "PM", label: "Lunch Break", portion: "Medium", color: "bg-cyan-50 text-cyan-600", enabled: true },
  { id: 3, time: "18:00", period: "PM", label: "Night Dinner", portion: "Large", color: "bg-purple-50 text-purple-600", enabled: true },
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState(initialSchedules);

  const toggleSchedule = (id) => {
    setSchedules(schedules.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Feeding Schedule</h1>
          <p className="text-slate-500 font-medium">Automate your aquarium nutrition cycles.</p>
        </div>
        <button className="bg-cyan-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100">
          <Plus size={20} /> Add New Time
        </button>
      </header>

      {/* AI Optimized Banner */}
      <div className="bg-white border border-cyan-100 rounded-[2rem] p-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-inner">
            <Sparkles size={28} />
          </div>
          <div>
            <p className="text-slate-900 font-bold">AI Optimized Schedule</p>
            <p className="text-slate-400 text-xs font-medium">Your current setup provides 100% nutrition for Arwana.</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-slate-50 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100">
          Auto-Sync Active
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedules.map((item) => (
          <div key={item.id} className={`bg-white rounded-[2.5rem] p-8 border transition-all ${item.enabled ? 'border-cyan-100 shadow-md' : 'border-slate-50 opacity-60'}`}>
            <div className="flex justify-between items-start mb-8">
              <div className="bg-cyan-50 w-20 h-20 rounded-3xl flex flex-col items-center justify-center border border-cyan-100/50">
                <span className="text-cyan-600 text-2xl font-black leading-none">{item.time}</span>
                <span className="text-cyan-600 text-[10px] font-black mt-1">{item.period}</span>
              </div>
              <button 
                onClick={() => toggleSchedule(item.id)}
                className={`w-12 h-7 rounded-full relative transition-colors ${item.enabled ? 'bg-cyan-600' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${item.enabled ? 'left-[24px]' : 'left-1'}`} />
              </button>
            </div>
            
            <h3 className="text-slate-900 text-xl font-black mb-1">{item.label}</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">{item.portion} Portion</p>
            
            <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
              <button className="text-slate-300 hover:text-red-400 transition-colors">
                <Trash2 size={18} />
              </button>
              <div className="text-[10px] font-black text-cyan-600 uppercase tracking-tighter italic">
                Device Synced 
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}