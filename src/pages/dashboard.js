import { useEffect, useState, useRef } from 'react';
import NotificationDropdown from '../components/NotificationDropdown';
import { 
  Wifi, Fish, ChevronRight, CheckCircle2, Bell, 
  Sparkles, ChevronDown, Monitor, Activity, Zap, Plus 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import ProtectedRoute from '../components/ProtectedRoute';
import AddDeviceModal from '../components/AddDeviceModal';

export default function DashboardPage() {
  const [sensor, setSensor] = useState({ ph: '--', temp: '--' });
  const [feeding, setFeeding] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  
  // State untuk Multi-Device
  const [devices, setDevices] = useState([]); 
  const [selectedDevice, setSelectedDevice] = useState("");
  const [isDeviceOpen, setIsDeviceOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State Modal

  const notifRef = useRef(null);
  const deviceRef = useRef(null);

  // 1. FETCH DAFTAR TANK MILIK USER
  const fetchUserDevices = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (!savedUser) return;

    try {
      const res = await fetch(`/api/tank/list?user_id=${savedUser.id}`);
      const result = await res.json();
      if (result.success && result.data.length > 0) {
        setDevices(result.data);
        // Hanya set default jika sebelumnya kosong
        if (!selectedDevice) setSelectedDevice(result.data[0].device_id);
      }
    } catch (err) { console.error("Error fetching devices:", err); }
  };

  useEffect(() => {
    fetchUserDevices();
  }, []);

  // 2. FETCH DATA SENSOR
  useEffect(() => {
    if (!selectedDevice) return;

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

  // 3. HANDLER TAMBAH DEVICE
  const handleAddDevice = async (formData) => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    try {
      const res = await fetch('/api/tank/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, user_id: savedUser.id }),
      });
      const result = await res.json();
      if (result.success) {
        fetchUserDevices(); // Refresh list
        setIsAddModalOpen(false);
      } else {
        alert(result.message);
      }
    } catch (err) { console.error("Error adding device:", err); }
  };

  const getStatusColor = (val, min, max) => {
    if (val === '--') return 'text-slate-400';
    const num = parseFloat(val);
    if (num < min || num > max) return 'text-red-400';
    return 'text-green-400';
  };

  const activeDeviceName = devices.find(d => d.device_id === selectedDevice)?.name || "Select Device";

  return (
    <ProtectedRoute>
      <div className="space-y-8 pb-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Dashboard Overview</h2>
            <p className="text-slate-500 font-medium text-sm">Monitoring your aquatic ecosystem in real-time.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
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
                    <span className="text-sm font-black text-slate-800 truncate">{activeDeviceName}</span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 shrink-0 ${isDeviceOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {isDeviceOpen && (
                <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-[1.5rem] shadow-xl border border-slate-50 py-2 z-[100] animate-in fade-in slide-in-from-top-2">
                  <div className="max-h-48 overflow-y-auto">
                    {devices.length === 0 ? (
                      <p className="px-5 py-3 text-xs text-slate-400 font-bold uppercase italic">No Device Found</p>
                    ) : (
                      devices.map((device) => (
                        <button
                          key={device.device_id}
                          onClick={() => { setSelectedDevice(device.device_id); setIsDeviceOpen(false); }}
                          className={`w-full flex items-center justify-between px-5 py-3 text-sm font-bold transition-colors
                            ${selectedDevice === device.device_id ? 'text-cyan-600 bg-cyan-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                        >
                          {device.name}
                          {selectedDevice === device.device_id && <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />}
                        </button>
                      ))
                    )}
                  </div>
                  {/* TOMBOL ADD NEW DEVICE DI DROPDOWN */}
                  <div className="border-t border-slate-50 mt-2 pt-2">
                    <button 
                      onClick={() => { setIsAddModalOpen(true); setIsDeviceOpen(false); }}
                      className="w-full px-5 py-3 text-xs font-black text-cyan-600 hover:bg-cyan-50 transition-colors flex items-center gap-2 uppercase tracking-widest"
                    >
                      <Plus size={14} /> Add New Tank
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={notifRef}>
              <button onClick={() => setShowNotif(!showNotif)} className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-cyan-600 transition-all relative">
                <Bell size={22} />
                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              </button>
              {showNotif && <NotificationDropdown />}
            </div>
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
        </section>

        {/* MODAL KOMPONEN */}
        <AddDeviceModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddDevice} 
        />
      </div>
    </ProtectedRoute>
  );
}