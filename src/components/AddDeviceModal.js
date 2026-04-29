// src/pages/dashboard.js
import { useEffect, useState, useRef } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { 
  Wifi, Fish, ChevronRight, CheckCircle2, Bell, 
  Sparkles, ChevronDown, Monitor, Activity, Zap, Plus, Loader2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import AddDeviceModal from '../components/AddDeviceModal';

export default function DashboardPage() {
  const [sensor, setSensor] = useState({ ph: '--', temp: '--' });
  const [feeding, setFeeding] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  
  // State untuk Multi-Device
  const [devices, setDevices] = useState([]); 
  const [selectedDevice, setSelectedDevice] = useState(null); // Menyimpan object tank yang aktif
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const notifRef = useRef(null);
  const deviceRef = useRef(null);

  // 1. FETCH DAFTAR TANK DARI MONGODB
  const fetchUserDevices = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) return;

    try {
      const res = await fetch(`/api/tank/list?user_id=${savedUser.id}`);
      const result = await res.json();
      if (result.success && result.data.length > 0) {
        setDevices(result.data);
        // Set device pertama sebagai default jika belum ada yang dipilih
        if (!selectedDevice) setSelectedDevice(result.data[0]);
      }
    } catch (error) {
      console.error("Failed to fetch devices:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. FETCH DATA SENSOR TERBARU (Interval 5 detik)
  useEffect(() => {
    fetchUserDevices();
  }, []);

  useEffect(() => {
    if (!selectedDevice) return;

    const fetchSensorData = async () => {
      try {
        const res = await fetch(`/api/sensor/latest?device_id=${selectedDevice.device_id}`);
        const result = await res.json();
        if (result.success) {
          setSensor({ 
            ph: result.data.ph.toFixed(1), 
            temp: result.data.temp.toFixed(1) 
          });
        }
      } catch (error) {
        console.error("Sensor fetch error:", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000);
    return () => clearInterval(interval);
  }, [selectedDevice]);

  // Helper Warna Status
  const getStatusColor = (val, min, max) => {
    if (val === '--') return 'text-slate-500';
    const n = parseFloat(val);
    return (n >= min && n <= max) ? 'text-green-400' : 'text-red-400';
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8 pb-10">
        {/* HEADER & DEVICE SELECTOR */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="relative" ref={deviceRef}>
            <button 
              onClick={() => setIsDeviceOpen(!isDeviceOpen)}
              className="group flex items-center gap-4 bg-white px-6 py-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                <Monitor size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-cyan-600 uppercase tracking-widest leading-none mb-1">Active Device</p>
                <h2 className="text-slate-900 font-bold text-sm flex items-center gap-2">
                  {selectedDevice ? selectedDevice.name : "No Device"} 
                  <ChevronDown size={14} className={`transition-transform ${isDeviceOpen ? 'rotate-180' : ''}`} />
                </h2>
              </div>
            </button>

            <AnimatePresence>
              {isDeviceOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-3 w-72 bg-white rounded-[2rem] shadow-2xl border border-slate-50 p-3 z-50"
                >
                  {devices.map((dev) => (
                    <button 
                      key={dev._id}
                      onClick={() => { setSelectedDevice(dev); setIsDeviceOpen(false); }}
                      className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all ${
                        selectedDevice?.device_id === dev.device_id ? 'bg-cyan-50 text-cyan-600' : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${selectedDevice?.device_id === dev.device_id ? 'bg-cyan-600' : 'bg-slate-300'}`} />
                      <span className="text-sm font-bold">{dev.name}</span>
                    </button>
                  ))}
                  <button 
                    onClick={() => { setIsAddModalOpen(true); setIsDeviceOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 p-4 mt-2 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 hover:text-cyan-600 hover:border-cyan-200 transition-all text-sm font-bold"
                  >
                    <Plus size={16} /> Add New Tank
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="flex-1 md:flex-none bg-white px-6 py-4 rounded-[2rem] border border-slate-100 flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-tight">System Online</span>
             </div>
             <button onClick={() => setShowNotif(!showNotif)} className="p-4 bg-white rounded-2xl border border-slate-100 text-slate-400 hover:text-cyan-600 transition-all relative">
                <Bell size={22} />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
             </button>
          </div>
        </header>

        {/* MONITORING CARD */}
        <section className="bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <p className="text-7xl md:text-8xl font-black tracking-tighter">{sensor.ph}</p>
                <p className={`text-sm font-black uppercase ${getStatusColor(sensor.ph, 6.5, 8.5)}`}>pH Level Status</p>
              </div>
              <div className="md:border-l md:border-white/10 md:pl-12 space-y-2">
                <p className="text-7xl md:text-8xl font-black tracking-tighter">{sensor.temp}°</p>
                <p className="text-sm font-black text-cyan-400 uppercase">Water Temperature</p>
              </div>
            </div>
          </div>
          {/* Decorative background circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-700" />
        </section>

        {/* QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center mb-10">
               <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight leading-none mb-2">Emergency Feed</h3>
               <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Manual control for {selectedDevice?.name}</p>
            </div>
            
            <motion.button
              onClick={() => { setFeeding(true); setTimeout(() => setFeeding(false), 3000); }}
              disabled={feeding || !selectedDevice}
              whileTap={{ scale: 0.95 }}
              className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white border-[12px] border-slate-50 shadow-2xl transition-all duration-500 
                ${feeding ? 'bg-green-500' : 'bg-cyan-600 feed-button-pulse'} ${!selectedDevice ? 'opacity-50 grayscale' : ''}`}
            >
              <Fish size={48} />
              <span className="font-black tracking-[0.2em] text-[10px] uppercase mt-4">
                {feeding ? 'Dispensing...' : 'Feed Now'}
              </span>
            </motion.button>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm group hover:border-cyan-100 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-amber-50 rounded-2xl text-amber-600"><Zap size={24} /></div>
                <ChevronRight className="text-slate-300 group-hover:text-cyan-600 transition-all" />
              </div>
              <h4 className="text-slate-900 font-black text-lg mb-1">Energy Saver</h4>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">Optimization active for {selectedDevice?.fish_species || 'Unknown'}</p>
            </div>

            <Link href="/schedule" className="block bg-cyan-600 rounded-[2.5rem] p-8 text-white shadow-lg shadow-cyan-100 group hover:bg-cyan-700 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-white/10 rounded-2xl"><Activity size={24} /></div>
                <Sparkles className="text-white/40 group-hover:rotate-12 transition-transform" />
              </div>
              <h4 className="font-black text-lg mb-1">Feeding Schedule</h4>
              <p className="text-cyan-100 text-xs font-bold">Manage automated intervals</p>
            </Link>
          </div>
        </div>

        {/* Modal Add Device */}
        <AddDeviceModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={(newTank) => {
            setDevices([...devices, newTank]);
            setSelectedDevice(newTank);
          }} 
        />
      </div>
    </ProtectedRoute>
  );
}