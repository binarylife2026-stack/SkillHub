import { motion } from 'motion/react';
import { Search, UserCheck, CreditCard, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Search className="w-6 h-6 text-blue-400" />,
      title: "Isolate Requirements",
      desc: "Filter down individual expert cards based on metrics, live review weights, or core skill competencies.",
      bg: "from-blue-500/10 to-blue-600/5",
      border: "group-hover:border-blue-500/30"
    },
    {
      step: "02",
      icon: <UserCheck className="w-6 h-6 text-emerald-400" />,
      title: "Verify Integrity",
      desc: "Analyze pre-vetted score parameters, live execution benchmarks, and absolute timeline delivery charts.",
      bg: "from-emerald-500/10 to-emerald-600/5",
      border: "group-hover:border-emerald-500/30"
    },
    {
      step: "03",
      icon: <CreditCard className="w-6 h-6 text-purple-400" />,
      title: "Engage Escrow",
      desc: "Triggering order actions directly forwards requests into Fiverr's protected multi-layered milestone systems.",
      bg: "from-purple-500/10 to-purple-600/5",
      border: "group-hover:border-purple-500/30"
    },
    {
      step: "04",
      icon: <Rocket className="w-6 h-6 text-orange-400" />,
      title: "Deploy Production",
      desc: "Receive pristine outputs directly on schedule. Full refund rights preserved if delivery metrics collapse.",
      bg: "from-orange-500/10 to-orange-600/5",
      border: "group-hover:border-orange-500/30"
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900/80" id="how">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section title header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            🔄 Procurement Flowchart
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Seamless 3-Minute <span className="text-emerald-400">Hand-off</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Secure top specialized contractors within simple, structured execution steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative bg-slate-900/40 hover:bg-slate-900/60 border border-slate-900/80 p-8 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Massive background step number */}
              <div className="absolute top-4 right-6 text-5xl font-black text-slate-800/15 group-hover:text-slate-700/15 select-none transition-colors">
                {st.step}
              </div>

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${st.bg} flex items-center justify-center mb-6 border border-white/5`}>
                {st.icon}
              </div>

              {/* Titles */}
              <h3 className="text-base font-black text-white mb-2 tracking-tight">
                {st.title}
              </h3>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
