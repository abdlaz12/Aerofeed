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
  const [devices, setDevices] = useState([]); 
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [loading, setLoading] = useState(true);

  const deviceRef = useRef(null);

  // 1. FETCH DAFTAR TANK (Hanya jalan 1x saat mount)
  useEffect(() => {
    const loadInitialTanks = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      
      try {
        const user = JSON.parse(userStr);
        const res = await fetch(`/api/tank/list?user_id=${user.id}`);
        const result = await res.json();
        
        if (result.success && result.data.length > 0) {
          setDevices(result.data);
          // Set tank pertama sebagai default jika belum ada yang terpilih
          setSelectedDeviceId(result.data[0].device_id);
        }
      } catch (err) {
        console.error("Gagal load tank:", err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialTanks();
  }, []); // Array kosong memastikan tidak ada loop fetch list

  // 2. FETCH DATA SENSOR (Jalan saat selectedDeviceId berubah atau interval 10 detik)
  useEffect(() => {
    if (!selectedDeviceId) return;

    const getSensorLog = async () => {
      try {
        const res = await fetch(`/api/sensor/latest?device_id=${selectedDeviceId}`);
        const result = await res.json();
        if (result.success && result.data) {
          setSensor({ 
            ph: result.data.ph?.toFixed(1) || '--', 
            temp: result.data.temp?.toFixed(1) || '--' 
          });
        }
      } catch (err) {
        console.error("Gagal load sensor:", err);
      }
    };

    getSensorLog();
    const timer = setInterval(getSensorLog, 10000); // Update tiap 10 detik
    return () => clearInterval(timer);
  }, [selectedDeviceId]);

  const activeDevice = devices.find(d => d.device_id === selectedDeviceId);

  // Fungsi pembantu untuk warna status pH
  const getStatusColor = (value) => {
    if (value === '--') return "text-slate-400";
    const ph = parseFloat(value);
    if (ph >= 6.5 && ph <= 8.5) return "text-emerald-400";
    return "text-red-400";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-cyan-600" size={40} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h2>
            <p className="text-slate-500 font-bold text-sm mt-1">Monitoring real-time ekosistem air Anda</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* DEVICE SELECTOR */}
            <div className="relative" ref={deviceRef}>
              <button 
                onClick={() => setIsDeviceOpen(!isDeviceOpen)} 
                className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                  <Monitor size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Tank</p>
                  <p className="text-sm font-black text-slate-800">{activeDevice?.name || "Pilih Tank"}</p>
                </div>
                <ChevronDown size={16} className={`text-slate-400 transition-transform ${isDeviceOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isDeviceOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }} 
                    className="absolute top-full right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-50 py-3 z-[100] overflow-hidden"
                  >
                    {devices.map((dev) => (
                      <button 
                        key={dev.device_id} 
                        onClick={() => { setSelectedDeviceId(dev.device_id); setIsDeviceOpen(false); }} 
                        className={`w-full text-left px-6 py-4 text-sm font-bold flex items-center justify-between transition-colors ${selectedDeviceId === dev.device_id ? 'text-cyan-600 bg-cyan-50' : 'text-slate-500 hover:bg-slate-50'}`}
                      >
                        {dev.name}
                        {selectedDeviceId === dev.device_id && <CheckCircle2 size={16} />}
                      </button>
                    ))}
                    <button 
                      onClick={() => { setIsAddModalOpen(true); setIsDeviceOpen(false); }} 
                      className="w-full text-left px-6 py-4 text-xs font-black text-cyan-600 border-t border-slate-50 mt-2 flex items-center gap-2 hover:bg-cyan-50/50"
                    >
                      <Plus size={14} /> TAMBAH TANK BARU
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 relative hover:text-cyan-600 transition-all"
            >
              <Bell size={22} />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* MONITORING CARD */}
        <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <Activity size={20} />
                <p className="text-xs font-black uppercase tracking-[0.2em]">Live pH Level</p>
              </div>
              <p className="text-8xl md:text-9xl font-black tracking-tighter">{sensor.ph}</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold ${getStatusColor(sensor.ph)}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${sensor.ph !== '--' ? 'bg-current' : 'bg-slate-500'}`} />
                {sensor.ph === '--' ? 'Menunggu Data' : 'Status Optimal'}
              </div>
            </div>

            <div className="md:border-l md:border-white/10 md:pl-20 space-y-4">
              <div className="flex items-center gap-3 text-cyan-400">
                <Zap size={20} />
                <p className="text-xs font-black uppercase tracking-[0.2em]">Water Temp</p>
              </div>
              <p className="text-8xl md:text-9xl font-black tracking-tighter">{sensor.temp}°</p>
              <p className="text-sm font-bold text-slate-400">Suhu ideal untuk {activeDevice?.fish_species || 'ikan'} Anda</p>
            </div>
          </div>
        </section>

        {/* FOOTER INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
              <Wifi size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Device Status</p>
              <p className="text-lg font-black text-slate-900">Connected</p>
            </div>
          </div>

          {/* BAGIAN AI YANG DIUBAH MENJADI LINK KE CHAT */}
          <Link href="/chat" className="md:col-span-2">
            <div className="bg-cyan-600 p-8 rounded-[2.5rem] text-white flex items-center justify-between shadow-lg shadow-cyan-100 hover:bg-cyan-700 transition-all cursor-pointer group">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">AI Recommendation</p>
                  <p className="font-bold">Sistem berjalan dengan sangat baik. Klik untuk konsultasi dengan AI.</p>
                </div>
              </div>
              <ChevronRight className="opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </div>
          </Link>
        </div>

        <AddDeviceModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={(newTank) => setDevices(prev => [...prev, newTank])} 
        />
      </div>
    </ProtectedRoute>
  );
}