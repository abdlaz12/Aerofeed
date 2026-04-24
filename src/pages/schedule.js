import { useState } from "react";
import { CalendarClock, Clock, Trash2, Plus, Sparkles, ChevronRight, Settings2 } from "lucide-react";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";

const initialSchedules = [
  { id: 1, time: "06:00", period: "AM", label: "Morning Feed", portion: "Medium", enabled: true },
  { id: 2, time: "12:00", period: "PM", label: "Lunch Break", portion: "Medium", enabled: true },
  { id: 3, time: "18:00", period: "PM", label: "Night Dinner", portion: "Large", enabled: true },
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState(initialSchedules);

  const toggleSchedule = (id) => {
    setSchedules(schedules.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item));
  };

  return (
    <div className="space-y-8 pb-10">
      {/* ── HEADER ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Feeding Schedule</h1>
          <p className="text-slate-500 font-medium text-sm">Automate your aquarium nutrition cycles.</p>
        </div>
        <button className="w-full md:w-auto bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
          <Plus size={18} /> Add New Time
        </button>
      </header>

      {/* ── AI RECOMMENDATION CARD (Lebih Minimalis) ── */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-[2.5rem] p-6 md:p-8 text-white shadow-2xl shadow-cyan-100 relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Sparkles size={32} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-black leading-tight">AI Optimization Active</p>
              <p className="text-cyan-100 text-xs font-medium opacity-90 mt-1">Sistem menyarankan penambahan porsi 5% untuk Ikan Arwana Anda hari ini.</p>
            </div>
          </div>
          <Link href="/chat">
            <button className="bg-white text-cyan-600 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-cyan-50 transition-all shadow-lg">
              Adjust with AI
            </button>
          </Link>
        </div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* ── SCHEDULE LIST ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {schedules.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className={`group relative bg-white rounded-[2.5rem] p-8 border transition-all duration-500 ${
                item.enabled 
                ? 'border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50' 
                : 'border-slate-50 opacity-50 grayscale'
              }`}
            >
              <div className="flex justify-between items-start mb-10">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center transition-colors ${item.enabled ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-400'}`}>
                    <span className="text-2xl font-black leading-none">{item.time.split(':')[0]}</span>
                    <span className="text-[10px] font-black uppercase">{item.period}</span>
                  </div>
                  <div>
                    <h3 className="text-slate-900 text-lg font-black leading-none mb-1">{item.label}</h3>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${item.enabled ? 'text-cyan-600' : 'text-slate-400'}`}>
                      {item.portion} Portion
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={() => toggleSchedule(item.id)}
                  className={`w-14 h-8 rounded-full relative transition-all duration-300 ${item.enabled ? 'bg-cyan-600 shadow-lg shadow-cyan-100' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${item.enabled ? 'left-[30px]' : 'left-1.5'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex gap-2">
                  <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                    <Settings2 size={18} />
                  </button>
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.enabled ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    {item.enabled ? 'Synced to IoT' : 'Disabled'}
                  </span>
                </div>
              </div>

              {/* Decorative Accent */}
              {item.enabled && (
                <div className="absolute top-0 right-12 w-8 h-1 bg-cyan-600 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add New Placeholder (Dashed) */}
        <button className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-cyan-300 hover:text-cyan-600 hover:bg-cyan-50/30 transition-all min-h-[220px] group">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-cyan-100 transition-colors">
            <Plus size={24} />
          </div>
          <span className="font-black text-xs uppercase tracking-widest">Add Schedule</span>
        </button>
      </div>
    </div>
  );
}