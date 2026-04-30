import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  UserCircle2, Wifi, CreditCard, Bell,
  ChevronRight, HelpCircle, Fish,
  CheckCircle2, Loader2
} from "lucide-react";
import ProtectedRoute from '../components/ProtectedRoute';

export default function Profile() {
  const router = useRouter();
  
  // State untuk menyimpan data user yang login
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    phone_number: ''
  });

  // State untuk statistik perangkat riil
  const [stats, setStats] = useState({ devices: 0, ponds: 0 });
  const [loading, setLoading] = useState(true);

  // 1. Logic: Ambil data dari localStorage & Fetch Stats saat halaman dimuat
  useEffect(() => {
    const loadData = async () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          // Pastikan mapping properti sesuai dengan data dari API Login Anda
          const name = parsedUser.full_name || parsedUser.name || 'AeroFeed User';
          
          setUserData({
            full_name: name,
            email: parsedUser.email,
            // Gunakan phone_number atau job sesuai struktur data login Anda
            phone_number :parsedUser.phone_number
          });

          // Panggil fungsi untuk menghitung jumlah device milik user berdasarkan ID
          if (parsedUser.id || parsedUser._id) {
            await fetchUserStats(parsedUser.id || parsedUser._id);
          }
        } catch (err) {
          console.error("Error loading user data:", err);
        }
      }
      setLoading(false);
    };

    loadData();
  }, []);

  // Fungsi untuk mengambil jumlah perangkat dari MongoDB
  const fetchUserStats = async (userId) => {
    try {
      const res = await fetch(`/api/tank/list?user_id=${userId}`);
      const result = await res.json();
      if (result.success) {
        setStats({
          devices: result.data.length,
          ponds: result.data.length // Asumsi 1 device per pond
        });
      }
    } catch (err) {
      console.error("Gagal mengambil statistik:", err);
    }
  };

  const groups = [
    {
      title: "My Device",
      rows: [
        { 
          icon: Wifi, 
          label: "Device Status", 
          sub: stats.devices > 0 ? "AeroFeed Unit Active" : "No device found", 
          value: stats.devices > 0 ? "Connected" : "Disconnected", 
          iconBg: "bg-cyan-50", 
          iconColor: "text-cyan-600" 
        },
        { icon: Fish, label: "Feed System", sub: "Pellet dispenser status", value: "Ready", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
      ],
    },
    {
      title: "Account & Security",
      rows: [
        { icon: CreditCard, label: "Subscription", sub: "Renews June 10, 2026", badge: "PRO", iconBg: "bg-cyan-50", iconColor: "text-cyan-600" },
        { icon: Bell, label: "Alerts", sub: "Push & Email notifications", value: "On", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
      ],
    },
    {
      title: "Support",
      rows: [
        { icon: HelpCircle, label: "Contact Us", sub: "For Help and Information", iconBg: "bg-slate-50", iconColor: "text-slate-500" },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-cyan-600" size={32} />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6 md:space-y-8 pb-10 px-1 md:px-0">
        
        <header>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">Account Settings</h1>
          <p className="text-slate-500 font-medium text-sm">Manage your farm profile and device preferences.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          
          {/* ── LEFT: PROFILE CARD ── */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] md:rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2.5rem] bg-cyan-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-cyan-900/20 uppercase">
                    {userData.full_name ? userData.full_name.substring(0, 2) : 'AF'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-2xl bg-green-500 border-4 border-slate-900 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-black mb-1 tracking-tight">{userData.full_name}</h2>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">{userData.job}</p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1.5 bg-white/10 rounded-xl text-[9px] font-black tracking-widest uppercase border border-white/5 backdrop-blur-md">PRO Plan</span>
                  <span className="px-3 py-1.5 bg-green-500/20 text-green-400 rounded-xl text-[9px] font-black tracking-widest uppercase border border-green-500/20">Active User</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm grid grid-cols-2 gap-4">
              <div className="text-center p-5 bg-slate-50/50 rounded-3xl border border-slate-50">
                <p className="text-2xl font-black text-slate-900">{stats.devices}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Devices</p>
              </div>
              <div className="text-center p-5 bg-slate-50/50 rounded-3xl border border-slate-50">
                <p className="text-2xl font-black text-slate-900">{stats.ponds}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Ponds</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: SETTINGS GROUPS ── */}
          <div className="lg:col-span-2 space-y-6">
            {groups.map((grp, gi) => (
              <div key={gi} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-50 bg-slate-50/20">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-none">{grp.title}</p>
                </div>
                <div className="divide-y divide-slate-50">
                  {grp.rows.map((row, ri) => (
                    <button key={ri} className="w-full flex items-center gap-4 px-6 md:px-8 py-5 hover:bg-slate-50/50 transition-all group">
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 ${row.iconBg} ${row.iconColor} shadow-sm group-hover:scale-105 transition-transform`}>
                        <row.icon size={20} strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-slate-900 text-sm font-black truncate">{row.label}</p>
                        <p className="text-slate-400 text-[10px] md:text-[11px] font-medium truncate">{row.sub}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 shrink-0">
                        {row.badge && ( <span className="px-3 py-1 bg-cyan-600 text-white text-[9px] font-black rounded-lg"> {row.badge} </span> )}
                        {row.value && ( <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-tighter">{row.value}</span> )}
                        <ChevronRight size={18} className="text-slate-200 group-hover:text-cyan-600 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}