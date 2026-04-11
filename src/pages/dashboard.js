import { useEffect, useState } from 'react';
import { Wifi, Fish, BatteryMedium, Bell, ChevronRight, CheckCircle2, LayoutDashboard, CalendarClock, BatteryCharging, UserCircle2 } from "lucide-react";
import Link from 'next/link';
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [sensor, setSensor] = useState({ ph: '--', temp: '--' });
  const [feeding, setFeeding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/sensor');
        const data = await res.json();
        if (data && data.length > 0) {
          setSensor({ ph: data[0].ph, temp: data[0].temp });
        }
      } catch (err) { console.error("Error:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mobile-container">
      <div className="flex-1 overflow-y-auto pb-32 px-5 pt-8">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">AeroFeed Lite</p>
            <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400">
            <Bell size={20} />
          </button>
        </header>

        {/* Status Sensor (Card Gradient) */}
        <section className="card-gradient mb-6">
          <div className="flex justify-between items-start mb-6">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter uppercase">Live Monitoring</span>
            <Wifi size={18} className="text-green-300" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-5xl font-black">{sensor.ph}</p>
              <p className="text-[10px] opacity-70 font-bold uppercase mt-1">pH Level</p>
            </div>
            <div className="h-12 w-[1px] bg-white/20" />
            <div>
              <p className="text-5xl font-black">{sensor.temp}°</p>
              <p className="text-[10px] opacity-70 font-bold uppercase mt-1">Celsius</p>
            </div>
          </div>
        </section>

        {/* Feed History */}
        <section className="card-premium mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Feeding History</h3>
            <ChevronRight size={18} className="text-slate-300" />
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
              <Fish size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Medium Portion</p>
              <p className="text-[10px] text-slate-400 font-medium">Today, 12:00 PM</p>
            </div>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
        </section>

        {/* Feed Button */}
        <div className="flex flex-col items-center">
          <motion.button
            onClick={() => { setFeeding(true); setTimeout(() => setFeeding(false), 3000); }}
            whileTap={{ scale: 0.9 }}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white border-[6px] border-white shadow-2xl transition-all duration-500 ${feeding ? 'bg-green-500' : 'bg-cyan-600 feed-button-pulse'}`}
          >
            <Fish size={48} />
            <span className="font-black tracking-widest text-sm uppercase">{feeding ? 'Feeding...' : 'Feed Now'}</span>
          </motion.button>
        </div>
      </div>

      {/* Navigasi Bawah */}
      <nav className="bottom-nav">
        <div className="flex items-center justify-around">
          <Link href="/dashboard" className="flex flex-col items-center gap-1">
            <div className="bg-cyan-50 p-2 rounded-xl text-cyan-600"><LayoutDashboard size={22} /></div>
            <span className="text-[10px] font-bold text-cyan-600">Home</span>
          </Link>
          <Link href="/schedule" className="flex flex-col items-center gap-1 text-slate-300">
            <CalendarClock size={22} />
            <span className="text-[10px]">Schedule</span>
          </Link>
          <Link href="/energy" className="flex flex-col items-center gap-1 text-slate-300">
            <BatteryCharging size={22} />
            <span className="text-[10px]">Power</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-300">
            <UserCircle2 size={22} />
            <span className="text-[10px]">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}