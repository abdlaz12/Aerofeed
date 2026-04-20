import { useEffect, useState, useRef } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { Wifi, Fish, ChevronRight, CheckCircle2, Bell, Sparkles, ChevronDown, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function DashboardPage() {
  const [sensor, setSensor] = useState({ ph: '--', temp: '--' });
  const [feeding, setFeeding] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  
  // State untuk Multi-Device Selection
  const [selectedDevice, setSelectedDevice] = useState("AF-AQU-001");
  const [isDeviceOpen, setIsDeviceOpen] = useState(false); // State baru untuk Dropdown
  const devices = [
    { id: "AF-AQU-001", name: "Aquarium Arwana Utama" },
    { id: "AF-AQU-002", name: "Aquarium Channa Kamar" }
  ];

  const notifRef = useRef(null);
  const deviceRef = useRef(null); // Ref baru untuk Device Dropdown
  
  // Menutup dropdown (Notif & Device) jika klik di luar area
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

  // --- LOGIKA FETCH DATA IoT ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/sensor?deviceId=${selectedDevice}`);
        const text = await res.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("Response bukan JSON:", text);
        }
        if (data && data.length > 0) {
          setSensor({ ph: data[0].ph, temp: data[0].temp });
        }
      } catch (err) { console.error("Error:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000); 
    return () => clearInterval(interval);
  }, [selectedDevice]);

  return (
    <div className="space-y-8 pb-10">
      
      {/* ── TOP HEADER (Desktop Style) ── */}
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-slate-500 font-medium">Monitoring your aquatic ecosystem in real-time.</p>
        </div>

        <div className="flex items-center gap-4">
          {/* ── CUSTOM DEVICE SELECTOR ── */}
          <div className="relative" ref={deviceRef}>
            <button 
              onClick={() => setIsDeviceOpen(!isDeviceOpen)}
              className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-slate-100 shadow-sm hover:border-cyan-200 transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                <Monitor size={18} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1">Active Device</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-slate-800">
                    {devices.find(d => d.id === selectedDevice)?.name}
                  </span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDeviceOpen ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </button>

            {/* Custom Dropdown Menu Area */}
            {isDeviceOpen && (
              <div className="absolute top-full mt-3 w-64 bg-white rounded-[1.5rem] shadow-xl border border-slate-50 py-2 z-[100] animate-in fade-in slide-in-from-top-2">
                {devices.map((device) => (
                  <button
                    key={device.id}
                    onClick={() => {
                      setSelectedDevice(device.id);
                      setIsDeviceOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3 text-sm font-bold transition-colors
                      ${selectedDevice === device.id ? 'text-cyan-600 bg-cyan-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {device.name}
                    {selectedDevice === device.id && <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />}
                  </button>
                ))}
                <div className="border-t border-slate-50 mt-2 pt-2 px-5 pb-1">
                  <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-cyan-600 transition-colors">
                    + Add New Device
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Tombol Lonceng dengan Dropdown */}
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
        <div className="flex items-center gap-3">
          <Link href="/chat">
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-md shadow-cyan-100">
              Consult AI
            </button>
          </Link>
          <div className="px-4 py-2 bg-slate-50 rounded-xl text-slate-500 text-[10px] font-black uppercase tracking-widest border border-slate-100">
            Auto-Sync
          </div>
        </div>
      </div>
      
      {/* ── MAIN MONITORING (Gradient Card) ── */}
      <section className="bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-[3rem] p-10 text-white shadow-2xl shadow-cyan-100 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
              Live Monitoring
            </span>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <Wifi size={16} className="text-green-300" />
              <span className="text-[10px] font-bold uppercase">Connected</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-7xl font-black tracking-tighter">{sensor.ph}</p>
              <p className="text-xs font-bold opacity-70 uppercase mt-2 tracking-[0.2em]">pH Level</p>
            </div>
            <div className="border-l border-white/20 pl-12 text-center md:text-left">
              <p className="text-7xl font-black tracking-tighter">{sensor.temp}°</p>
              <p className="text-xs font-bold opacity-70 uppercase mt-2 tracking-[0.2em]">Celsius</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </section>

      <div className="grid md:grid-cols-2 gap-8">
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
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-cyan-600">
                  <Fish size={22} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Medium Portion</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Today, 12:00 PM</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[350px]">
          <div className="text-center mb-8">
             <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Manual Feed</h3>
             <p className="text-slate-400 text-xs font-medium">Emergency feeding for your fish.</p>
          </div>
          <motion.button
            onClick={() => { setFeeding(true); setTimeout(() => setFeeding(false), 3000); }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={`w-44 h-44 rounded-full flex flex-col items-center justify-center text-white border-[10px] border-slate-50 shadow-2xl shadow-cyan-100 transition-all duration-500 
              ${feeding ? 'bg-green-500' : 'bg-cyan-600 feed-button-pulse'}`}
          >
            <Fish size={44} />
            <span className="font-black tracking-widest text-[11px] uppercase mt-3 italic">
              {feeding ? 'Feeding...' : 'Feed Now'}
            </span>
          </motion.button>
          <div className="mt-8 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
             <span className="w-2 h-2 rounded-full bg-cyan-600" />
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">Tap button to dispense pellets</p>
          </div>
        </section>
      </div>
    </div>
  );
}