import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Brain, Activity, Loader2, Thermometer, Droplets, RefreshCw, AlertTriangle } from "lucide-react";
import ProtectedRoute from '../components/ProtectedRoute';

export default function AIChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // State untuk data real dari database
  const [sensor, setSensor] = useState({ ph: null, temp: null, timestamp: null });
  const [tank, setTank] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isFetchingSensor, setIsFetchingSensor] = useState(true);
  const [sensorError, setSensorError] = useState(false);

  const scrollRef = useRef(null);

  // ──────────────────────────────────────────────
  // 1. LOAD TANK & SENSOR REAL SAAT MOUNT
  // ──────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      setIsFetchingSensor(true);
      setSensorError(false);

      try {
        // Ambil user dari localStorage (sama dengan cara dashboard)
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const userName = user?.name || "Kawan";

        // Fetch daftar tank milik user
        let activeTank = null;
        let activeDeviceId = null;
        let latestPh = null;
        let latestTemp = null;
        let latestTimestamp = null;

        if (user?.id) {
          const tankRes = await fetch(`/api/tank/list?user_id=${user.id}`);
          const tankData = await tankRes.json();

          if (tankData.success && tankData.data.length > 0) {
            activeTank = tankData.data[0]; // Gunakan tank pertama sebagai default
            activeDeviceId = activeTank.device_id;
            setTank(activeTank);
            setDeviceId(activeDeviceId);

            // Fetch sensor terbaru untuk tank ini
            const sensorRes = await fetch(`/api/sensor/latest?device_id=${activeDeviceId}`);
            const sensorData = await sensorRes.json();

            if (sensorData.success && sensorData.data) {
              latestPh = sensorData.data.ph;
              latestTemp = sensorData.data.temp;
              latestTimestamp = sensorData.data.timestamp;
              setSensor({ ph: latestPh, temp: latestTemp, timestamp: latestTimestamp });
            }
          }
        }

        // Greeting dinamis berdasarkan kondisi sensor
        let greeting = "";
        if (activeTank && latestPh !== null) {
          const phOk = latestPh >= (activeTank.ph_min || 6.5) && latestPh <= (activeTank.ph_max || 8.5);
          const tempOk = latestTemp >= (activeTank.temp_min || 25) && latestTemp <= (activeTank.temp_max || 30);

          if (phOk && tempOk) {
            greeting = `Halo ${userName}! 👋 Kondisi tank "${activeTank.name}" Anda saat ini sedang baik-baik saja. pH tercatat ${latestPh?.toFixed(2)} dan suhu ${latestTemp?.toFixed(1)}°C — semuanya dalam batas normal. Ada yang ingin dikonsultasikan hari ini?`;
          } else {
            const issues = [];
            if (!phOk) issues.push(`pH ${latestPh?.toFixed(2)} (di luar batas ${activeTank.ph_min}–${activeTank.ph_max})`);
            if (!tempOk) issues.push(`suhu ${latestTemp?.toFixed(1)}°C (di luar batas ${activeTank.temp_min}–${activeTank.temp_max}°C)`);
            greeting = `⚠️ Halo ${userName}! Perhatian — tank "${activeTank.name}" terdeteksi kondisi tidak normal: ${issues.join(' dan ')}. Saya siap membantu analisis dan solusinya!`;
          }
        } else if (activeTank) {
          greeting = `Halo ${userName}! Tank "${activeTank.name}" terdaftar, namun sensor Wokwi belum mengirim data. Pastikan perangkat IoT Anda aktif dan terhubung.`;
        } else {
          greeting = `Halo ${userName}! Saya asisten AeroFeed. Anda belum mendaftarkan tank. Silakan tambah tank di dashboard terlebih dahulu, atau tanyakan seputar budidaya ikan kepada saya!`;
        }

        setMessages([{ role: 'ai', content: greeting }]);

      } catch (err) {
        console.error("Gagal inisialisasi chat:", err);
        setSensorError(true);
        setMessages([{ role: 'ai', content: 'Halo! Saya asisten AeroFeed. Saat ini saya kesulitan mengambil data sensor Anda, tapi Anda tetap bisa bertanya seputar aquaculture kepada saya!' }]);
      } finally {
        setIsFetchingSensor(false);
      }
    };

    init();
  }, []);

  // ──────────────────────────────────────────────
  // 2. AUTO REFRESH SENSOR TIAP 15 DETIK
  // ──────────────────────────────────────────────
  useEffect(() => {
    if (!deviceId) return;

    const refreshSensor = async () => {
      try {
        const res = await fetch(`/api/sensor/latest?device_id=${deviceId}`);
        const data = await res.json();
        if (data.success && data.data) {
          setSensor({ ph: data.data.ph, temp: data.data.temp, timestamp: data.data.timestamp });
        }
      } catch (_) { /* silent refresh */ }
    };

    const interval = setInterval(refreshSensor, 15000);
    return () => clearInterval(interval);
  }, [deviceId]);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // ──────────────────────────────────────────────
  // 3. KIRIM PESAN KE AI DENGAN KONTEKS REAL
  // ──────────────────────────────────────────────
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: currentInput,
          device_id: deviceId, // Kirim device_id agar backend query sensor dari DB
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'ai', content: data.analysis }]);

        // Update sensor di panel kanan jika AI menggunakan data sensor terbaru
        if (data.sensorUsed) {
          setSensor({
            ph: data.sensorUsed.ph,
            temp: data.sensorUsed.temp,
            timestamp: data.sensorUsed.timestamp,
          });
        }
      } else {
        throw new Error(data.message || "AI error");
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: 'Maaf, terjadi kendala saat menghubungkan ke otak AI. Coba lagi sebentar ya! 🙏'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // ──────────────────────────────────────────────
  // HELPERS
  // ──────────────────────────────────────────────
  const getPhStatus = (ph) => {
    if (ph === null) return { label: 'Menunggu...', color: 'text-slate-400', bg: 'bg-slate-50 border-slate-100' };
    const min = tank?.ph_min || 6.5;
    const max = tank?.ph_max || 8.5;
    if (ph >= min && ph <= max) return { label: 'Normal ✓', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' };
    return { label: 'Waspada!', color: 'text-red-600', bg: 'bg-red-50 border-red-100' };
  };

  const getTempStatus = (temp) => {
    if (temp === null) return { label: 'Menunggu...', color: 'text-slate-400', bg: 'bg-slate-50 border-slate-100' };
    const min = tank?.temp_min || 25;
    const max = tank?.temp_max || 30;
    if (temp >= min && temp <= max) return { label: 'Normal ✓', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100' };
    return { label: 'Waspada!', color: 'text-red-600', bg: 'bg-red-50 border-red-100' };
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'Belum ada data';
    return new Date(ts).toLocaleString('id-ID', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      timeZone: 'Asia/Jakarta'
    });
  };

  const phStatus = getPhStatus(sensor.ph);
  const tempStatus = getTempStatus(sensor.temp);

  const quickQuestions = [
    "Apakah kondisi air kolam saya aman?",
    "Kapan waktu terbaik memberi makan?",
    "Berapa pH ideal untuk ikan ini?",
    "Apa tanda-tanda stres pada ikan?",
  ];

  return (
    <ProtectedRoute>
      <div className="flex gap-4 lg:gap-6" style={{ height: 'calc(100dvh - 80px)' }}>

        {/* ── KOLOM KIRI: MAIN CHAT ── */}
        <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">

          {/* Chat Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-100">
                <Brain size={24} />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 tracking-tight">AeroFeed Smart Assistant</h2>
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-bounce' : 'bg-emerald-500 animate-pulse'}`} />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {isLoading ? 'AI sedang berpikir...' : deviceId ? `Connected · ${deviceId}` : 'Powered by Gemini AI'}
                  </p>
                </div>
              </div>
            </div>
            {isFetchingSensor && (
              <div className="flex items-center gap-2 text-slate-400">
                <RefreshCw size={14} className="animate-spin" />
                <span className="text-xs font-semibold">Memuat sensor...</span>
              </div>
            )}
          </div>

          {/* Message Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-6 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.role === 'ai' ? 'bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600 border border-cyan-100' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {msg.role === 'ai' ? <Bot size={18} /> : <User size={18} />}
                  </div>
                  <div className={`p-5 rounded-[1.75rem] text-sm font-medium leading-relaxed shadow-sm ${
                    msg.role === 'ai'
                      ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
                      : 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-lg shadow-cyan-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600">
                    <Bot size={18} />
                  </div>
                  <div className="bg-white border border-slate-100 p-5 rounded-[1.75rem] rounded-tl-none flex items-center gap-3">
                    <Loader2 size={16} className="animate-spin text-cyan-600" />
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0ms]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:150ms]"></span>
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:300ms]"></span>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Menganalisis data sensor...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && !isLoading && (
            <div className="px-6 pb-2 flex gap-2 flex-wrap">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(q); }}
                  className="text-xs font-semibold text-slate-500 bg-slate-50 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-200 hover:border-cyan-200 px-4 py-2 rounded-full transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100">
            <div className="flex items-center gap-3 bg-white p-2 rounded-[1.5rem] border border-slate-200 focus-within:ring-2 ring-cyan-100 focus-within:border-cyan-200 transition-all shadow-sm">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={isLoading}
                placeholder={isLoading ? "Mohon tunggu..." : "Tanyakan tentang kondisi kolam Anda..."}
                className="flex-1 bg-transparent px-4 py-2 outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center hover:opacity-90 hover:shadow-lg transition-all shadow-md shadow-cyan-200 disabled:opacity-40 disabled:shadow-none"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── KOLOM KANAN: CONTEXT PANEL ── */}
        <div className="w-72 lg:w-80 space-y-5 hidden lg:flex lg:flex-col flex-shrink-0">

          {/* Tank Info */}
          <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
              <Activity size={12} className="text-cyan-600" /> Konteks Aktif
            </h3>

            {tank ? (
              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tank Aktif</p>
                  <p className="font-black text-lg leading-tight">{tank.name}</p>
                  {tank.fish_species && (
                    <p className="text-xs text-cyan-400 font-semibold mt-1">{tank.fish_species}</p>
                  )}
                  <p className="text-[10px] text-slate-500 font-mono mt-2">{tank.device_id}</p>
                </div>

                {/* pH Card */}
                <div className={`p-4 rounded-2xl border ${phStatus.bg} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Droplets size={16} className={phStatus.color} />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">pH Air</p>
                      <p className={`text-2xl font-black ${phStatus.color}`}>
                        {sensor.ph !== null ? sensor.ph.toFixed(2) : '--'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${phStatus.color} bg-white/60`}>
                    {phStatus.label}
                  </span>
                </div>

                {/* Temp Card */}
                <div className={`p-4 rounded-2xl border ${tempStatus.bg} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Thermometer size={16} className={tempStatus.color} />
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase">Suhu</p>
                      <p className={`text-2xl font-black ${tempStatus.color}`}>
                        {sensor.temp !== null ? `${sensor.temp.toFixed(1)}°` : '--°'}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${tempStatus.color} bg-white/60`}>
                    {tempStatus.label}
                  </span>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-[10px] text-slate-400 font-semibold">
                    Update: {formatTimestamp(sensor.timestamp)}
                  </p>
                </div>

                {/* Range Info */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <p className="font-black text-slate-500 uppercase tracking-wider text-[10px] mb-2">Range Aman</p>
                  <p className="text-slate-600 font-semibold">pH: <span className="text-slate-900">{tank.ph_min} – {tank.ph_max}</span></p>
                  <p className="text-slate-600 font-semibold">Suhu: <span className="text-slate-900">{tank.temp_min}°C – {tank.temp_max}°C</span></p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                {isFetchingSensor ? (
                  <Loader2 size={24} className="animate-spin text-cyan-500 mx-auto mb-3" />
                ) : (
                  <AlertTriangle size={24} className="text-amber-400 mx-auto mb-3" />
                )}
                <p className="text-sm font-bold text-slate-500">
                  {isFetchingSensor ? 'Memuat data tank...' : 'Belum ada tank terdaftar'}
                </p>
              </div>
            )}
          </div>

          {/* AI Tips Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-sm relative overflow-hidden flex-1">
            <Sparkles className="text-cyan-400 mb-4" size={22} />
            <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">Tips AI</p>
            <p className="text-sm font-semibold leading-relaxed text-slate-300">
              {sensor.ph !== null && sensor.ph < (tank?.ph_min || 6.5)
                ? `pH terlalu rendah (${sensor.ph?.toFixed(2)}). Tambahkan kapur pertanian (CaCO₃) secara bertahap untuk menaikkan pH.`
                : sensor.ph !== null && sensor.ph > (tank?.ph_max || 8.5)
                ? `pH terlalu tinggi (${sensor.ph?.toFixed(2)}). Kurangi aerasi berlebih dan lakukan penggantian air parsial 20%.`
                : sensor.temp !== null && sensor.temp > (tank?.temp_max || 30)
                ? `Suhu terlalu panas (${sensor.temp?.toFixed(1)}°C). Aktifkan aerator tambahan dan kurangi paparan sinar matahari langsung.`
                : "Pantau pH dan suhu secara konsisten. Perubahan mendadak lebih berbahaya dari nilai yang sedikit di luar batas."
              }
            </p>
            <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" />
          </div>
        </div>

      </div>
    </ProtectedRoute>
  );
}