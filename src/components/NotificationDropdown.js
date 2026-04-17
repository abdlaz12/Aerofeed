import { Bell, CircleAlert, Zap, Fish, Check } from "lucide-react";

const notifications = [
  { 
    id: 1, 
    type: 'alert', 
    icon: CircleAlert, 
    title: 'High pH Level!', 
    time: '2 mins ago', 
    desc: 'pH reached 8.5 in Tank A1', 
    color: 'text-red-500', 
    bg: 'bg-red-50' 
  },
  { 
    id: 2, 
    type: 'power', 
    icon: Zap, 
    title: 'Survival Mode Active', 
    time: '1 hour ago', 
    desc: 'Switched to battery mode', 
    color: 'text-amber-500', 
    bg: 'bg-amber-50' 
  },
  { 
    id: 3, 
    type: 'feed', 
    icon: Fish, 
    title: 'Feeding Successful', 
    time: '12:00 PM', 
    desc: 'Medium portion dispensed', 
    color: 'text-cyan-600', 
    bg: 'bg-cyan-50' 
  },
];

export default function NotificationDropdown() {
  return (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-5 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Notifications</h3>
        <span className="text-[10px] font-bold text-cyan-600 cursor-pointer hover:underline">Mark all as read</span>
      </div>

      <div className="max-h-[350px] overflow-y-auto">
        {notifications.map((n) => (
          <div key={n.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-none">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.bg} ${n.color}`}>
              <n.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-xs font-black text-slate-900">{n.title}</p>
                <span className="text-[9px] text-slate-400 font-bold">{n.time}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 text-center bg-slate-50/30 border-t border-slate-50">
        <button className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-cyan-600 transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
}