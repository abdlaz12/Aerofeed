import { useState } from "react";
import { 
  CalendarClock, 
  Clock, 
  Trash2, 
  Plus, 
  LayoutDashboard, 
  BatteryCharging, 
  UserCircle2 
} from "lucide-react";
import Link from 'next/link';

// Data awal jadwal (Berdasarkan image_97928a.png)
const initialSchedules = [
  { id: 1, time: "6:00", period: "AM", label: "Morning", portion: "Medium Portion", color: "bg-[#E0F7FA] text-[#0891B2]", enabled: true },
  { id: 2, time: "12:00", period: "PM", label: "Afternoon", portion: "Medium Portion", color: "bg-[#E0F7FA] text-[#0891B2]", enabled: true },
  { id: 3, time: "6:00", period: "PM", label: "Evening", portion: "Large Portion", color: "bg-[#F3E8FF] text-[#7C3AED]", enabled: true },
  { id: 4, time: "9:00", period: "PM", label: "Night", portion: "Small Portion", color: "bg-[#FEF3C7] text-[#D97706]", enabled: false },
];

export default function SchedulePage() {
  const [schedules, setSchedules] = useState(initialSchedules);

  // Fungsi Toggle On/Off
  const toggleSchedule = (id) => {
    setSchedules(schedules.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  // Fungsi Hapus Jadwal
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(item => item.id !== id));
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-[#F0F4F8] font-sans shadow-2xl relative overflow-hidden">
      
      {/* ── CONTENT AREA ── */}
      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-8">
        
        {/* Header (image_97928a.png) */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <CalendarClock size={24} className="text-[#0891B2]" />
            <h1 className="text-[#111827] text-[24px] font-bold">Feeding Schedule</h1>
          </div>
          <p className="text-[#6B7280] text-[14px]">Set when your fish get fed automatically</p>
        </header>

        {/* Status Banner */}
        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-sm border border-[#F3F4F6]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E0F7FA] flex items-center justify-center text-[#0891B2]">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[#111827] text-[14px] font-bold">
                {schedules.filter(s => s.enabled).length} feedings scheduled today
              </p>
              <p className="text-[#9CA3AF] text-[12px]">Fish will be fed automatically</p>
            </div>
          </div>
          <span className="bg-[#E0F7FA] text-[#0891B2] text-[10px] font-bold px-2.5 py-1 rounded-lg">ON</span>
        </div>

        {/* List Jadwal (image_97928d.png) */}
        <div className="space-y-4 mb-6">
          {schedules.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm border transition-all
                ${item.enabled ? 'border-[#E0F7FA]' : 'border-transparent opacity-60'}`}
            >
              {/* Time Box */}
              <div className="bg-[#E0F7FA] w-16 h-16 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-[#0891B2] text-xl font-black leading-none">{item.time}</span>
                <span className="text-[#0891B2] text-[10px] font-bold mt-1">{item.period}</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-[#111827] text-base font-bold">{item.label}</h3>
                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold mt-1 ${item.color}`}>
                  {item.portion}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => deleteSchedule(item.id)}
                  className="w-9 h-9 rounded-xl bg-[#FEF2F2] flex items-center justify-center text-[#EF4444] hover:scale-105 transition-transform"
                >
                  <Trash2 size={16} />
                </button>

                {/* Toggle Switch Custom */}
                <button 
                  onClick={() => toggleSchedule(item.id)}
                  className={`w-12 h-7 rounded-full relative transition-colors duration-300
                    ${item.enabled ? 'bg-[#0891B2]' : 'bg-[#D1D5DB]'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300
                    ${item.enabled ? 'translate-x-6' : 'translate-x-1'}`} 
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Feeding Time (image_97928d.png) */}
        <button className="w-full py-4 rounded-2xl border-2 border-dashed border-[#0891B2] flex items-center justify-center gap-2 text-[#0891B2] hover:bg-cyan-50 transition-colors">
          <Plus size={20} strokeWidth={3} />
          <span className="text-base font-bold">Add a Feeding Time</span>
        </button>
      </div>

      {/* ── BOTTOM NAV (Statis) ── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-2 py-3">
        <div className="flex justify-around items-center">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 group">
            <LayoutDashboard size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Home</span>
          </Link>
          <div className="flex flex-col items-center gap-1">
            <div className="bg-[#E0F7FA] p-2 rounded-xl">
              <CalendarClock size={22} className="text-[#0891B2]" />
            </div>
            <span className="text-[10px] text-[#0891B2] font-bold">Schedule</span>
          </div>
          <Link href="/energy" className="flex flex-col items-center gap-1 group">
            <BatteryCharging size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Power</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 group">
            <UserCircle2 size={22} className="text-[#9CA3AF] group-hover:text-[#0891B2]" />
            <span className="text-[10px] text-[#9CA3AF]">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}