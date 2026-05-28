import { motion } from 'motion/react';
import { MessageSquareText, UsersRound } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-slate-950" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-10 sm:p-14 text-center shadow-2xl"
        >
          {/* Ambient glowing radial light overlay */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-4xl justify-center flex mb-6 animate-bounce">
              🤔
            </div>
            <h2 className="text-2xl sm:text-3.5xl font-black text-white leading-tight tracking-tight mb-4">
              Need Custom Project Architecture <br />
              <span className="text-emerald-400">Before Ordering?</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mb-10 leading-relaxed font-normal">
              Let our technology integration analysts map your milestones and recommend the exact specialized professional suited for your production requirements.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 group hover:-translate-y-0.5"
              >
                <MessageSquareText className="w-5 h-5" />
                Consult via WhatsApp Terminal
              </a>
              <a
                href="#sellers"
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-sm rounded-xl transition-colors border border-slate-800 flex items-center justify-center gap-2"
              >
                <UsersRound className="w-4 h-4 text-emerald-400" />
                View Active Profiles
              </a>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-slate-500 text-xs font-semibold">
              <span className="flex h-1.5 w-1.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Mean response latency averages below 30 minutes
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
