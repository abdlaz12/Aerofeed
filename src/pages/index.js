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
} from "lucide-react";
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
          {/* UBAH: Diarahkan ke /login */}
          <Link href="/login">
            <button className="bg-cyan-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-700 transition-all">
              Launch App
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Revolutionizing <span className="text-cyan-600">Aquaculture</span> with AI.
          </h1>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            AeroFeed integrates IoT sensors and machine learning to optimize fish nutrition and maximizing growth.
          </p>
          
          <div className="relative mt-12 mb-20">
            <div className="absolute inset-0 bg-cyan-200/30 blur-3xl rounded-full scale-75 -z-10"></div>
            <img 
              src="/iot-device-mockup.png" 
              alt="AeroFeed IoT Device"
              className="w-full max-w-2xl mx-auto rounded-3xl shadow-2xl border-4 border-white"
            />
          </div>

          {/* UBAH: Diarahkan ke /login */}
          <Link href="/login">
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mx-auto">
              Try SmartFin Demo <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ── CORE TECH (Tetap Sama) ── */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* ── IMPACT STATS ── */}
      <section className="py-12 bg-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black mb-1">98%</div>
              <div className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Sensor Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">24/7</div>
              <div className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Real-time Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">15%</div>
              <div className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Feed Efficiency</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-1">IoT</div>
              <div className="text-cyan-300 text-xs font-bold uppercase tracking-widest">Integrated</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight text-slate-900">Meet the Visionaries.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Founded by <strong>Abdul Aziz Setiadi Haryanto</strong> and a dedicated team of Software Engineering students from Universitas Prasetiya Mulya.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
            {[
              { name: "Abdul Aziz", role: "Software Engineering" },
              { name: "Habil", role: "Software Engineering" },
              { name: "Taufik", role: "Renewable Energy Engineering" },
              { name: "Bagas", role: "Renewable Energy Engineering" },
              { name: "Josep", role: "Software Engineering" }
            ].map((founder, index) => (
              <div key={index} className="text-center">
                <div className="w-full aspect-square bg-slate-100 rounded-3xl mb-4 flex items-center justify-center border-2 border-slate-50 shadow-inner">
                  <UserCircle2 size={48} className="text-slate-300" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{founder.name}</h4>
                <p className="text-xs text-cyan-600 font-medium">{founder.role}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <ul className="space-y-4 text-slate-700 font-bold text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-cyan-500" size={20} /> STEM Students at Universitas Prasetiya Mulya
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-cyan-500" size={20} /> Prasetiya Mulya University Students
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="text-cyan-500" size={20} /> Integrated IoT & AI Research Group
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 border-l border-slate-200 md:pl-12">
              <p className="text-xl font-bold text-slate-800 italic leading-relaxed">
                "AeroFeed bukan sekadar alat, tapi komitmen kami untuk efisiensi akuakultur di Indonesia melalui teknologi presisi."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-16 px-6 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 tracking-tight">Ready to join the aquaculture revolution?</h2>
          {/* UBAH: Diarahkan ke /login */}
          <Link href="/login">
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