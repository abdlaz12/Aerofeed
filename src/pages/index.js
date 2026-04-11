import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Award, 
  UserCircle2 
} from "lucide-react"; // Import sudah diperbaiki di sini
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="bg-white font-sans text-slate-900">
      
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center text-white font-black">A</div>
            <span className="text-xl font-black tracking-tighter text-cyan-900">AeroFeed</span>
          </div>
          <Link href="/dashboard">
            <button className="bg-cyan-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-700 transition-all">
              Launch App
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
          >
            <Award size={14} /> Canada-ASEAN SEED Research Project 2026
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Revolutionizing <span className="text-cyan-600">Aquaculture</span> with AI.
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            AeroFeed integrates IoT sensors and machine learning to optimize fish nutrition, 
            reducing waste by 30% while maximizing growth.
          </p>
          <Link href="/dashboard">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mx-auto">
              Try SmartFin Demo <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── CORE TECH ── */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Cpu size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Driven Framework</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our proprietary algorithms analyze pH and temperature patterns to deliver precise nutrition.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data-Backed Growth</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Based on published Life Cycle Assessment research in Indonesian agriculture systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability First</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mission to improve public nutrition programs through technology-driven aquaculture efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="w-full aspect-square bg-cyan-100 rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl flex items-center justify-center">
                 <UserCircle2 size={200} className="text-cyan-300" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-50 max-w-[240px]">
                <p className="text-xs font-black text-cyan-600 uppercase mb-2">Lead Developer</p>
                <p className="text-sm font-bold text-slate-800 italic">"Technology is the bridge to a more sustainable food future."</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-left">
            <h2 className="text-4xl font-black mb-6 tracking-tight">Meet the Visionary.</h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Founded by <strong>Abdul Aziz Setiadi Haryanto</strong>, a Software Engineering student 
              at Universitas Prasetiya Mulya and Bhakti Prasetiya Mulya Scholarship awardee.
            </p>
            <ul className="space-y-4 text-slate-700 font-medium">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500" size={20} /> Software Engineering Student at Universitas Prasetiya Mulya
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500" size={20} /> Canada-ASEAN SEED Scholarship Recipient 2026
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500" size={20} /> Cloud Computing Expert (AWS Certified)
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-cyan-500" size={20} /> Published Agricultural Researcher
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-16 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Ready to join the aquaculture revolution?</h2>
          <Link href="/dashboard">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black hover:bg-cyan-50 transition-all">
              Get Started with AeroFeed
            </button>
          </Link>
          <div className="mt-16 pt-8 border-t border-white/10 text-white/40 text-sm">
            © 2026 AeroFeed Technology Group. South Tangerang, Indonesia.
          </div>
        </div>
      </footer>
    </div>
  );
}