import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-cyan-600 rounded-[2rem] flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-cyan-100 mb-4">A</div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Sign in to manage your ecosystem</p>
        </div>

        {/* Login Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="aziz@aerofeed.id" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 focus:bg-white transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 text-slate-300 group-focus-within:text-cyan-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-cyan-100 focus:bg-white transition-all text-sm font-bold text-slate-700"
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 mt-4">
              Sign In <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm font-bold text-slate-400">
          Don't have an account? <Link href="/register" className="text-cyan-600 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
}