import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-cyan-600 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-cyan-100 mb-4">A</div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Start your smart farming journey</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="space-y-5">
            {/* Field: full_name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Abdul Aziz"
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Field: email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="aziz@aerofeed.id"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            {/* Field Baru: phone_number */}
            <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp / Phone</label>
            <div className="relative group">
                <div className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors flex items-center gap-1 font-bold text-sm">
                +62
                </div>
                <input 
                type="tel" 
                placeholder="8123456789"
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                className="w-full pl-16 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold text-slate-700"
                />
            </div>
            </div>
            {/* Field: password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            <button className="w-full bg-cyan-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-100 mt-4 flex items-center justify-center gap-2">
              Register Account <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm font-bold text-slate-400">
          Already have an account? <Link href="/login" className="text-cyan-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}