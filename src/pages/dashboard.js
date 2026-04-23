import { useEffect, useState, useRef } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { 
  Wifi, 
  Fish, 
  ChevronRight, 
  CheckCircle2, 
  Bell, 
  Sparkles, 
  ChevronDown, 
  Monitor,
  Activity,
  Zap 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function DashboardPage() {
  const [sensor, setSensor] = useState({ ph: '--', temp: '--' });
  const [feeding, setFeeding] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  
  // State untuk Multi-Device Selection
  const [selectedDevice, setSelectedDevice] = useState("AF-AQU-001");
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const devices = [
    { id: "AF-AQU-001", name: "Aquarium Arwana Utama" },
    { id: "AF-AQU-002", name: "Aquarium Channa Kamar" }
  ];

  const notifRef = useRef(null);
  const deviceRef = useRef(null);

  // Helper untuk menentukan status kesehatan air
  const getStatusColor = (val, min, max) => {
    if (val === '--') return 'text-slate-400';
    const num = parseFloat(val);
    if (num < min || num > max) return 'text-red-400';
    return 'text-green-400';
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (deviceRef.current && !deviceRef.current.contains(event.target)) {
        setIsDeviceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/sensor?device_id=${selectedDevice}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setSensor({ ph: data[0].ph, temp: data[0].temp });
        }
      } catch (err) { console.error("Error Fetching Data:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, [selectedDevice]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* ── TOP HEADER ── */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Dashboard Overview</h2>
          <p className="text-slate-500 font-medium text-sm">Monitoring your aquatic ecosystem in real-time.</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* CUSTOM DEVICE SELECTOR */}
          <div className="relative flex-1 md:flex-none" ref={deviceRef}>
            <button 
              onClick={() => setIsDeviceOpen(!isDeviceOpen)}
              className="w-full flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm hover:border-cyan-200 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                <Monitor size={18} />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">Active Device</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-800 truncate">
                    {devices.find(d => d.id === selectedDevice)?.name}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 shrink-0 ${isDeviceOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            {isDeviceOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-xl border border-slate-50 py-2 z-[100] animate-in fade-in slide-in-from-top-2">
                {devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => { setSelectedDevice(device.id); setIsDeviceOpen(false); }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm font-bold transition-colors
                      ${selectedDevice === device.id ? 'text-cyan-600 bg-cyan-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {device.name}
                    {selectedDevice === device.id && <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* NOTIFICATION BELL */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-cyan-600 transition-all relative"
            >
              <Bell size={22} />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            {showNotif && <NotificationDropdown />}
          </div>
        </div>
      </header>

      {/* ── MAIN MONITORING (Dark Mode High-End Card) ── */}
      <section className="bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <div className={`w-2 h-2 rounded-full animate-pulse ${sensor.ph !== '--' ? 'bg-green-400' : 'bg-slate-500'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Live Monitoring</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            {/* pH Value */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-4">
                <p className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{sensor.ph}</p>
                <div className={`text-sm font-black italic uppercase ${getStatusColor(sensor.ph, 6.5, 8.5)}`}>
                  {sensor.ph > 8.5 ? '▲ Critical' : sensor.ph < 6.5 ? '▼ Acidic' : '● Stable'}
                </div>
              </div>
              <p className="text-xs font-bold opacity-40 uppercase tracking-[0.3em]">pH Level Acidity</p>
            </div>

            {/* Temp Value */}
            <div className="md:border-l md:border-white/10 md:pl-12 space-y-2">
              <div className="flex items-baseline gap-4">
                <p className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{sensor.temp}°</p>
                <div className="text-cyan-400 text-sm font-black italic uppercase tracking-widest">● Optimal</div>
              </div>
              <p className="text-xs font-bold opacity-40 uppercase tracking-[0.3em]">Water Temperature</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400"><Activity size={16} /></div>
              <div><p className="text-[9px] font-black opacity-40 uppercase">Sync Rate</p><p className="text-xs font-bold">10 Seconds</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-amber-400"><Zap size={16} /></div>
              <div><p className="text-[9px] font-black opacity-40 uppercase">Power Source</p><p className="text-xs font-bold">Primary AC</p></div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]" />
      </section>

      {/* ── ECOSYSTEM ANALYSIS (Filling the gap) ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
              <Sparkles size={18} className="text-cyan-600" /> AI Ecosystem Analysis
            </h3>
            <Link href="/chat" className="text-xs font-bold text-cyan-600 hover:underline tracking-tighter uppercase">View Detail</Link>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
            "Kondisi air stabil. Analisis AI menunjukkan metabolisme ikan Arwana dalam performa puncak. Pertahankan jadwal pakan otomatis di jam 12:00 PM."
          </p>
        </div>
        
        <div className="bg-cyan-600 rounded-[2.5rem] p-8 text-white flex flex-col justify-center text-center shadow-lg shadow-cyan-100 relative overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Overall Score</p>
          <p className="text-4xl font-black tracking-tighter">EXCELLENT</p>
          <div className="mt-4 flex justify-center gap-1.5 opacity-40">
            {[1,2,3,4,5].map(i => <div key={i} className="w-5 h-1 bg-white rounded-full"/>)}
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FEEDING HISTORY */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-3 text-lg">
              <Fish size={22} className="text-cyan-600" /> Feeding History
            </h3>
            <ChevronRight size={20} className="text-slate-300" />
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-50 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-cyan-600 shrink-0">
                  <Fish size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Medium Portion</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Today, 12:00 PM</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MANUAL FEED CONTROL */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center mb-10">
             <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight leading-none mb-2">Emergency Feed</h3>
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Manual pellet dispenser control</p>
          </div>
          <motion.button
            onClick={() => { setFeeding(true); setTimeout(() => setFeeding(false), 3000); }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white border-[12px] border-slate-50 shadow-2xl transition-all duration-500 
              ${feeding ? 'bg-green-500 shadow-green-100' : 'bg-cyan-600 shadow-cyan-100 feed-button-pulse'}`}
          >
            <Fish size={48} />
            <span className="font-black tracking-[0.2em] text-[10px] uppercase mt-4 italic">
              {feeding ? 'Dispensing...' : 'Feed Now'}
            </span>
          </motion.button>
          <div className="mt-10 flex items-center gap-2 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
             <span className="w-2 h-2 rounded-full bg-cyan-600 animate-ping" />
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest italic leading-none">Ready to dispense pellets</p>
          </div>
        </section>
      </div>
    </div>
  );
}