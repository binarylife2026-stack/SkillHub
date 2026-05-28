import { motion } from 'motion/react';
import { ArrowDown, CheckCircle, ShieldCheck, Zap, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 overflow-hidden pt-36 pb-20">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wide uppercase mb-8 shadow-sm shadow-emerald-500/5"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Hand-Picked Elite Freelancers — Verified and Audited ✅
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6"
        >
          Top Tier Freelancing Experts <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(52,211,153,0.3)]">
            On-Demand at Freelancer Hub
          </span>
        </motion.h1>

        {/* Hero Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          We source, interview, and catalog individual industry high-performers directly from Fiverr. 
          Compare transparent operational ratings, test delivery times, and secure your transactions risk-free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
        >
          <a
            href="#sellers"
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-base rounded-2xl transition-all duration-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:-translate-y-1 flex items-center justify-center gap-2 group"
          >
            Explore Vetted Profiles
            <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#how"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-200 font-bold text-base rounded-2xl transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            See Verification Process
          </a>
        </motion.div>

        {/* Absolute Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {/* Trust item 1 */}
          <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl backdrop-blur-sm shadow-xl shadow-slate-950/25">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/10 to-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-extrabold text-white text-base">Fiverr Vetted</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Elite Tier Candidates</div>
            </div>
          </div>

          {/* Trust item 2 */}
          <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl backdrop-blur-sm shadow-xl shadow-slate-950/25">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from- emerald-500/10 to-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="font-extrabold text-white text-base">SSL Secured</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Encrypted Escrow protection</div>
            </div>
          </div>

          {/* Trust item 3 */}
          <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 p-5 rounded-2xl backdrop-blur-sm shadow-xl shadow-slate-950/25">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500/10 to-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="font-extrabold text-white text-base">100% Assurance</div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Risk-Free Client Protection</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
