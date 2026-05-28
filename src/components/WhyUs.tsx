import { motion } from 'motion/react';
import { ShieldAlert, Timer, CheckCircle, Headphones, Star, CircleCheck } from 'lucide-react';

export default function WhyUs() {
  const protocols = [
    {
      icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
      title: "Continuous Vetting",
      desc: "We actively monitor feedback scores weekly. Underperforming assets are instantly culled from indices."
    },
    {
      icon: <Timer className="w-5 h-5 text-blue-400" />,
      title: "Pristine Timelines",
      desc: "Featured professionals maintain rigorous milestone habits. Late hand-offs remain strictly below 0.8%."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-purple-400" />,
      title: "Value Audited Rates",
      desc: "Procure premium human intellectual properties aligned precisely within competitive market parameters."
    },
    {
      icon: <Headphones className="w-5 h-5 text-pink-400" />,
      title: "Solution Architects",
      desc: "Confused by project definitions? Reach out directly via active links for expert pipeline structuring."
    },
    {
      icon: <Star className="w-5 h-5 text-amber-400" fill="currentColor" />,
      title: "Elite Tier Exclusivity",
      desc: "We restrict admissions inside our vetted index to operators registering stellar 4.7+ average weights."
    },
    {
      icon: <CircleCheck className="w-5 h-5 text-cyan-400" />,
      title: "Absolute Escrow Cover",
      desc: "Operate safely inside standard escrow frameworks. Zero financial exposure until performance passes."
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900" id="why">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header information */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            💎 Elite Curations
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Strict Vetting <span className="text-emerald-400">Protocols</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Fiverr aggregates millions of listings—we screen out anomalies and track continuous scores to guard your active workflows.
          </p>
        </div>

        {/* Protocol features list grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {protocols.map((pt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 p-8 rounded-2xl hover:bg-slate-900/40 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-950 flex items-center justify-center mb-5 border border-slate-800">
                {pt.icon}
              </div>
              <h3 className="text-base font-black text-white mb-2">
                {pt.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
