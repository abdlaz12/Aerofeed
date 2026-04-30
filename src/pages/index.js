import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  BarChart3, 
  UserCircle2,
  ChevronRight,
  Activity,
  Sprout
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900 selection:bg-cyan-200">
      
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                A
              </div>
              <span className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                AeroFeed
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="hidden md:block text-slate-600 hover:text-slate-900 font-semibold px-4 transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10">
                Launch App
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-cyan-100/50 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/40 blur-3xl -z-10 rounded-full" />
        <div className="absolute -left-40 top-40 w-[600px] h-[600px] bg-emerald-50/50 blur-3xl -z-10 rounded-full" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                AeroFeed 2.0 is Live
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-[1.05] mb-6 md:mb-8 tracking-tighter">
              Precision Aquaculture{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600">
                Powered by AI.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-500 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-2 sm:px-0">
              Transform your fish farming with intelligent IoT sensors and real-time machine learning analytics. Maximize growth, minimize waste.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-4 sm:px-0">
              <Link href="/login" className="w-full sm:w-auto">
                <button className="w-full bg-slate-900 text-white px-6 sm:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-1 transition-all duration-300">
                  Try SmartFin Demo <ArrowRight size={20} />
                </button>
              </Link>
              <button className="w-full sm:w-auto bg-white text-slate-700 px-6 sm:px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300">
                View Research <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mt-12 md:mt-20 px-2 sm:px-0"
          >
            {/* Fade overlay bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 bg-white/50 backdrop-blur-xl p-2 sm:p-4 md:p-6 mx-auto max-w-4xl">
              {/* Responsive IoT Dashboard Mockup — fallback jika file tidak ada */}
              <div className="w-full aspect-[16/9] rounded-[1rem] sm:rounded-[1.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 flex flex-col items-center justify-center text-white relative overflow-hidden">
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                {/* Blob */}
                <div className="absolute top-4 right-4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl" />
                {/* Content */}
                <Activity size={40} className="text-cyan-400 mb-3 animate-pulse sm:w-16 sm:h-16" />
                <h3 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight mb-1 text-white">AeroFeed Smart Dashboard</h3>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">Real-time IoT Monitoring</p>
                {/* Fake sensor bars */}
                <div className="flex gap-3 mt-4 sm:mt-6">
                  {[85, 60, 92, 78].map((v, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-6 sm:w-8 bg-slate-700 rounded-full overflow-hidden" style={{ height: 48 }}>
                        <div className="w-full bg-cyan-500 rounded-full transition-all duration-1000" style={{ height: `${v}%`, marginTop: `${100 - v}%` }} />
                      </div>
                      <span className="text-[8px] sm:text-[10px] text-slate-500 font-bold">{v}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="py-10 border-y border-slate-200/50 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100 text-center">
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">98<span className="text-cyan-500">%</span></div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Sensor Accuracy</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">24<span className="text-cyan-500">/</span>7</div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Monitoring</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2"><span className="text-cyan-500">+</span>15<span className="text-cyan-500">%</span></div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Growth Rate</div>
            </div>
            <div className="px-4">
              <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2"><span className="text-cyan-500">-</span>20<span className="text-cyan-500">%</span></div>
              <div className="text-slate-500 text-sm font-bold uppercase tracking-widest">Feed Waste</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE TECH ── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Engineered for Excellence.</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              We bring enterprise-grade agricultural technology to everyday aquaculture operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu size={28} />,
                title: "AI-Driven Analytics",
                desc: "Our proprietary algorithms analyze pH, dissolved oxygen, and temperature patterns to deliver precise, automated feeding schedules.",
                color: "text-cyan-600 bg-cyan-50 border-cyan-100",
                shadow: "shadow-cyan-100/50"
              },
              {
                icon: <BarChart3 size={28} />,
                title: "Data-Backed Growth",
                desc: "Validated through comprehensive Life Cycle Assessment research in intensive Indonesian aquaculture systems.",
                color: "text-blue-600 bg-blue-50 border-blue-100",
                shadow: "shadow-blue-100/50"
              },
              {
                icon: <Sprout size={28} />,
                title: "Sustainable Yield",
                desc: "Dedicated to improving food security while minimizing environmental footprint through hyper-efficient resource allocation.",
                color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                shadow: "shadow-emerald-100/50"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className={`bg-white p-10 rounded-[2rem] shadow-xl ${feature.shadow} border border-slate-100 transition-all duration-300 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110"></div>
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-8 border`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight">
                Built by Visionaries. <br/> <span className="text-cyan-400">Driven by Impact.</span>
              </h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Founded by a dedicated team of Engineering students from Universitas Prasetiya Mulya, combining expertise in software, IoT, and renewable energy.
              </p>
              
              <ul className="space-y-4 text-slate-300 font-medium mb-10">
                <li className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-1.5 rounded-full"><CheckCircle2 className="text-cyan-400" size={16} /></div> 
                  Cross-disciplinary Engineering Team
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-1.5 rounded-full"><CheckCircle2 className="text-cyan-400" size={16} /></div> 
                  Integrated IoT & AI Research Group
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 p-1.5 rounded-full"><CheckCircle2 className="text-cyan-400" size={16} /></div> 
                  Universitas Prasetiya Mulya Alumni
                </li>
              </ul>
              
              <blockquote className="border-l-4 border-cyan-500 pl-6 my-8">
                <p className="text-xl font-bold text-slate-200 italic leading-relaxed">
                  "AeroFeed bukan sekadar alat, tapi komitmen kami untuk memajukan efisiensi akuakultur di Indonesia melalui teknologi presisi."
                </p>
                <footer className="mt-4 text-sm font-semibold text-cyan-400 uppercase tracking-wider">— The AeroFeed Team</footer>
              </blockquote>
            </div>
            
            <div className="md:w-1/2 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: "Abdul Aziz", role: "Software Eng.", color: "from-blue-500 to-cyan-500" },
                  { name: "Habil", role: "Software Eng.", color: "from-indigo-500 to-blue-500" },
                  { name: "Taufik", role: "Energy Eng.", color: "from-emerald-500 to-teal-500" },
                  { name: "Bagas", role: "Energy Eng.", color: "from-teal-500 to-cyan-500" },
                  { name: "Josep", role: "Software Eng.", color: "from-cyan-500 to-blue-500" }
                ].map((founder, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-5 rounded-2xl text-center hover:bg-slate-800 transition-colors group">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${founder.color} p-[2px] mb-4`}>
                      <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                        <UserCircle2 size={32} className="text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">{founder.name}</h4>
                    <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{founder.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA & FOOTER ── */}
      <footer className="bg-slate-950 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/20 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight text-white">
            Ready to lead the <span className="text-cyan-400">aquaculture revolution?</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10">Join forward-thinking farmers optimizing their yield with AeroFeed.</p>
          
          <Link href="/login">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 inline-flex items-center gap-2">
              Get Started with AeroFeed <ArrowRight size={20} />
            </button>
          </Link>
          
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-500 rounded flex items-center justify-center text-white font-black text-xs">A</div>
              <span className="text-lg font-black tracking-tighter text-white">AeroFeed</span>
            </div>
            <div className="text-slate-500 text-sm font-medium">
              © 2026 AeroFeed Technology Group. South Tangerang, Indonesia.
            </div>
            <div className="flex gap-4 text-slate-500">
              <Link href="#" className="hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-cyan-400 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}