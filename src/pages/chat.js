import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Sparkles, Brain, Activity, Loader2 } from "lucide-react";
import ProtectedRoute from '../components/ProtectedRoute';

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Halo Aziz! Saya asisten AeroFeed. Ada yang ingin dikonsultasikan mengenai kondisi aquarium Anda hari ini?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Panggil API Gemini di backend
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: input,
          // Context tambahan agar AI lebih pintar
          ph: 7.2, 
          temp: 28,
          fish_species: "Ikan Arwana"
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'ai', content: data.analysis }]);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Maaf Aziz, terjadi kendala saat menghubungkan ke otak AI. Coba lagi nanti ya!' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex gap-6 h-[calc(100vh-100px)]">
      
      {/* ── KOLOM KIRI: MAIN CHAT ── */}
      <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        {/* Chat Header */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-100">
              <Brain size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">AeroFeed Smart Assistant</h2>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-bounce' : 'bg-green-500 animate-pulse'}`} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {isLoading ? 'AI is thinking...' : 'Powered by Gemini AI'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'ai' ? 'bg-cyan-50 text-cyan-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {msg.role === 'ai' ? <Bot size={20} /> : <User size={20} />}
                </div>
                <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-sm transition-all ${
                  msg.role === 'ai' 
                  ? 'bg-white border border-slate-100 text-slate-800 rounded-tl-none' 
                  : 'bg-cyan-600 text-white rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-pulse">
               <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-cyan-600" />
                 <span className="text-xs font-bold text-slate-400">Mengetik balasan...</span>
               </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-50">
          <div className="flex items-center gap-3 bg-white p-2 rounded-[1.5rem] border border-slate-100 focus-within:ring-2 ring-cyan-100 transition-all shadow-sm">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isLoading}
              placeholder={isLoading ? "Mohon tunggu..." : "Tanyakan analisis air atau saran pakan..."}
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm font-bold text-slate-700 disabled:opacity-50"
            />
            <button 
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="w-12 h-12 bg-cyan-600 text-white rounded-2xl flex items-center justify-center hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100 disabled:bg-slate-300 disabled:shadow-none"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── KOLOM KANAN: CONTEXT PANEL ── */}
      <div className="w-80 space-y-6 hidden xl:block">
        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <Activity size={14} className="text-cyan-600" /> Current Context
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100">
              <p className="text-[10px] font-bold text-cyan-600 uppercase mb-1">Target Fish</p>
              <p className="text-sm font-black text-slate-800 italic">Ikan Arwana</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <p className="text-xl font-black text-slate-800">7.2</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">pH Level</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <p className="text-xl font-black text-slate-800">28°</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase">Temp</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white shadow-sm relative overflow-hidden">
          <Sparkles className="text-cyan-400 mb-4" size={24} />
          <p className="text-xs font-bold leading-relaxed opacity-80 italic">
            "Saran AI: Menjaga pH stabil di angka 7-8 adalah kunci pertumbuhan Arwana. Gunakan AeroFeed untuk otomatisasi pH."
          </p>
          <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}